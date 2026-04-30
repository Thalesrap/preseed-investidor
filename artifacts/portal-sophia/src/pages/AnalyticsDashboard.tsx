import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.BASE_URL ?? "/";

interface SectionStat {
  section: string;
  eventType: string;
  total: number;
}

interface DailyCount {
  date: string;
  total: number;
}

interface RecentEvent {
  id: number;
  eventType: string;
  section: string;
  metadata: Record<string, unknown> | null;
  sessionId: string | null;
  createdAt: string;
}

interface Summary {
  totalEvents: number;
  bySection: SectionStat[];
  recentEvents: RecentEvent[];
  dailyCounts: DailyCount[];
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  section_view: "Visualização",
  slider_change: "Slider",
  cta_click: "CTA Click",
};

const EVENT_TYPE_COLORS: Record<string, string> = {
  section_view: "#9955ff",
  slider_change: "#ffaa44",
  cta_click: "#44ffaa",
};

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  fundador: "Fundador",
  narrativa: "Narrativa",
  simulador: "Simulador ROI",
  canteiro: "Canteiro de Obras",
  "the-ask": "The Ask",
  conversao: "Conversão",
  floating: "WhatsApp Flutuante",
  navbar: "NavBar",
};

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div
      className="p-5 rounded-xl"
      style={{
        background: "rgba(20, 0, 50, 0.7)",
        border: "1px solid rgba(102, 0, 102, 0.4)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="text-xs uppercase tracking-widest text-purple-400 mb-1">{label}</div>
      <div
        className="text-3xl font-black font-display"
        style={{ color: "#cc88ff" }}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-purple-500 mt-1">{sub}</div>}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  async function fetchSummary() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}api/analytics/summary`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSummary(data);
      setLastRefresh(new Date());
    } catch (e) {
      setError("Falha ao carregar dados de analytics.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
    const interval = setInterval(fetchSummary, 30000);
    return () => clearInterval(interval);
  }, []);

  const sectionViews = summary?.bySection.filter((s) => s.eventType === "section_view") ?? [];
  const ctaClicks = summary?.bySection.filter((s) => s.eventType === "cta_click") ?? [];
  const sliderChanges = summary?.bySection.filter((s) => s.eventType === "slider_change") ?? [];

  const maxSectionViews = Math.max(...sectionViews.map((s) => Number(s.total)), 1);

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{ background: "linear-gradient(135deg, #000022 0%, #0a0030 100%)" }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <img src="/logo-sophia.png" alt="SophIA" className="w-8 h-8 object-contain" />
              <span
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: "#cc88ff" }}
              >
                Oráculo de SophIA
              </span>
            </div>
            <h1
              className="text-2xl md:text-3xl font-black font-display"
              style={{ color: "#fff" }}
            >
              Analytics do Portal
            </h1>
            <p className="text-xs text-purple-400 mt-1">
              Atualizado automaticamente a cada 30s · Último: {lastRefresh.toLocaleTimeString("pt-BR")}
            </p>
          </div>
          <button
            onClick={fetchSummary}
            className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
            style={{
              background: "rgba(102,0,102,0.3)",
              border: "1px solid rgba(102,0,102,0.6)",
              color: "#cc88ff",
            }}
          >
            ↻ Atualizar
          </button>
        </div>

        {error && (
          <div
            className="p-4 rounded-lg text-sm"
            style={{ background: "rgba(200,0,0,0.2)", border: "1px solid rgba(200,0,0,0.5)", color: "#ff8888" }}
          >
            {error}
          </div>
        )}

        {loading && !summary && (
          <div className="text-center py-20 text-purple-400">Carregando dados...</div>
        )}

        {summary && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="Total de Eventos" value={summary.totalEvents} />
              <StatCard label="Seções Vistas" value={sectionViews.reduce((a, s) => a + Number(s.total), 0)} />
              <StatCard label="CTAs Clicados" value={ctaClicks.reduce((a, s) => a + Number(s.total), 0)} />
              <StatCard label="Interações Slider" value={sliderChanges.reduce((a, s) => a + Number(s.total), 0)} />
            </div>

            <div
              className="rounded-xl p-6"
              style={{
                background: "rgba(20, 0, 50, 0.7)",
                border: "1px solid rgba(102, 0, 102, 0.4)",
              }}
            >
              <h2 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">
                Visualizações por Seção
              </h2>
              {sectionViews.length === 0 ? (
                <p className="text-purple-400 text-sm">Sem dados ainda.</p>
              ) : (
                <div className="space-y-3">
                  {sectionViews
                    .sort((a, b) => Number(b.total) - Number(a.total))
                    .map((s) => (
                      <div key={s.section}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-purple-200">
                            {SECTION_LABELS[s.section] ?? s.section}
                          </span>
                          <span className="text-purple-400 font-bold">{s.total}</span>
                        </div>
                        <div className="h-2 rounded-full" style={{ background: "rgba(102,0,102,0.2)" }}>
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${(Number(s.total) / maxSectionViews) * 100}%`,
                              background: "linear-gradient(90deg, #660066, #cc44cc)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="rounded-xl p-6"
                style={{
                  background: "rgba(20, 0, 50, 0.7)",
                  border: "1px solid rgba(102, 0, 102, 0.4)",
                }}
              >
                <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                  Clicks em CTAs
                </h2>
                {ctaClicks.length === 0 ? (
                  <p className="text-purple-400 text-sm">Sem dados ainda.</p>
                ) : (
                  <div className="space-y-2">
                    {ctaClicks
                      .sort((a, b) => Number(b.total) - Number(a.total))
                      .map((s) => (
                        <div
                          key={s.section}
                          className="flex justify-between items-center p-3 rounded-lg"
                          style={{ background: "rgba(0,200,100,0.07)", border: "1px solid rgba(0,200,100,0.15)" }}
                        >
                          <span className="text-xs text-emerald-300">
                            {SECTION_LABELS[s.section] ?? s.section}
                          </span>
                          <span
                            className="text-sm font-black"
                            style={{ color: "#44ffaa" }}
                          >
                            {s.total}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div
                className="rounded-xl p-6"
                style={{
                  background: "rgba(20, 0, 50, 0.7)",
                  border: "1px solid rgba(102, 0, 102, 0.4)",
                }}
              >
                <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                  Atividade por Dia
                </h2>
                {summary.dailyCounts.length === 0 ? (
                  <p className="text-purple-400 text-sm">Sem dados ainda.</p>
                ) : (
                  <div className="space-y-2">
                    {summary.dailyCounts.slice(0, 7).map((d) => (
                      <div
                        key={d.date}
                        className="flex justify-between items-center p-2 rounded-lg"
                        style={{ background: "rgba(102,0,102,0.1)" }}
                      >
                        <span className="text-xs text-purple-300">{d.date}</span>
                        <span className="text-sm font-bold text-purple-200">{d.total} eventos</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className="rounded-xl p-6"
              style={{
                background: "rgba(20, 0, 50, 0.7)",
                border: "1px solid rgba(102, 0, 102, 0.4)",
              }}
            >
              <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                Eventos Recentes
              </h2>
              {summary.recentEvents.length === 0 ? (
                <p className="text-purple-400 text-sm">Sem dados ainda.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-purple-500 uppercase tracking-wider">
                        <th className="text-left pb-3 pr-4">Tipo</th>
                        <th className="text-left pb-3 pr-4">Seção</th>
                        <th className="text-left pb-3 pr-4">Detalhes</th>
                        <th className="text-left pb-3">Horário</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-900">
                      {summary.recentEvents.map((e) => (
                        <tr key={e.id}>
                          <td className="py-2 pr-4">
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{
                                background: `${EVENT_TYPE_COLORS[e.eventType] ?? "#888"}22`,
                                color: EVENT_TYPE_COLORS[e.eventType] ?? "#888",
                                border: `1px solid ${EVENT_TYPE_COLORS[e.eventType] ?? "#888"}44`,
                              }}
                            >
                              {EVENT_TYPE_LABELS[e.eventType] ?? e.eventType}
                            </span>
                          </td>
                          <td className="py-2 pr-4 text-purple-300">
                            {SECTION_LABELS[e.section] ?? e.section}
                          </td>
                          <td className="py-2 pr-4 text-purple-400">
                            {e.metadata
                              ? Object.entries(e.metadata)
                                  .map(([k, v]) => `${k}: ${v}`)
                                  .join(", ")
                              : "—"}
                          </td>
                          <td className="py-2 text-purple-500">
                            {new Date(e.createdAt).toLocaleTimeString("pt-BR")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
