import { Router, type IRouter } from "express";
import * as zod from "zod";
import { db } from "@workspace/db";
import { leadsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();
const ADMIN_KEY = "Formulario@890iop";

const LeadBodyStrict = zod.object({
  name: zod.string().min(1, "Name is required").max(200),
  email: zod.string().email("Invalid email address").max(500),
  company: zod.string().min(1, "Company is required").max(200),
  investmentInterest: zod.string().min(1, "Investment interest is required").max(200),
  message: zod.string().min(1, "Message is required").max(5000),
});

router.get("/leads", async (req, res) => {
  if (req.headers["x-admin-key"] !== ADMIN_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const leads = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt));
    res.json(leads);
  } catch (err) {
    req.log.error(err, "Failed to fetch leads");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/leads", async (req, res) => {
  const parsed = LeadBodyStrict.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request data" });
    return;
  }

  try {
    const [lead] = await db
      .insert(leadsTable)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        investmentInterest: parsed.data.investmentInterest,
        message: parsed.data.message,
      })
      .returning();

    res.status(201).json({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      investmentInterest: lead.investmentInterest,
      message: lead.message,
      createdAt: lead.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Failed to insert lead");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
