import { Router, type IRouter } from "express";
import * as zod from "zod";
import { db } from "@workspace/db";
import { analyticsEventsTable } from "@workspace/db";
import { count, desc, sql } from "drizzle-orm";

const router: IRouter = Router();

const EventBodyStrict = zod.object({
  eventType: zod.enum(["section_view", "slider_change", "cta_click"]),
  section: zod.string().min(1).max(100),
  metadata: zod.record(zod.unknown()).optional(),
  sessionId: zod.string().max(100).optional(),
});

router.post("/analytics/events", async (req, res) => {
  const parsed = EventBodyStrict.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request data" });
    return;
  }

  try {
    await db.insert(analyticsEventsTable).values({
      eventType: parsed.data.eventType,
      section: parsed.data.section,
      metadata: parsed.data.metadata ?? null,
      sessionId: parsed.data.sessionId ?? null,
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    req.log.error(err, "Failed to insert analytics event");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/analytics/summary", async (req, res) => {
  try {
    const bySection = await db
      .select({
        section: analyticsEventsTable.section,
        eventType: analyticsEventsTable.eventType,
        total: count(),
      })
      .from(analyticsEventsTable)
      .groupBy(analyticsEventsTable.section, analyticsEventsTable.eventType)
      .orderBy(desc(count()));

    const totalEvents = await db
      .select({ total: count() })
      .from(analyticsEventsTable);

    const recentEvents = await db
      .select()
      .from(analyticsEventsTable)
      .orderBy(desc(analyticsEventsTable.createdAt))
      .limit(20);

    const dailyCounts = await db
      .select({
        date: sql<string>`DATE(${analyticsEventsTable.createdAt})`.as("date"),
        total: count(),
      })
      .from(analyticsEventsTable)
      .groupBy(sql`DATE(${analyticsEventsTable.createdAt})`)
      .orderBy(sql`DATE(${analyticsEventsTable.createdAt}) DESC`)
      .limit(14);

    res.json({
      totalEvents: totalEvents[0]?.total ?? 0,
      bySection,
      recentEvents,
      dailyCounts,
    });
  } catch (err) {
    req.log.error(err, "Failed to fetch analytics summary");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
