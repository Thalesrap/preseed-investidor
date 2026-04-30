import { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSectionViewTracker } from "@/hooks/useAnalytics";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type TooltipItem,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("section-hidden");
          el.classList.add("section-visible");
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const allocationData = {
  labels: [
    "Operação / CEO Full-time",
    "Cloud / Segurança",
    "Jurídico / LGPD",
    "RP / Eventos",
    "Reserva Estratégica",
  ],
  datasets: [
    {
      data: [270, 90, 60, 40, 40],
      backgroundColor: [
        "rgba(102, 0, 102, 0.85)",
        "rgba(0, 120, 200, 0.85)",
        "rgba(200, 80, 0, 0.85)",
        "rgba(0, 160, 100, 0.85)",
        "rgba(180, 180, 0, 0.85)",
      ],
      borderColor: [
        "rgba(180, 0, 180, 1)",
        "rgba(0, 180, 255, 1)",
        "rgba(255, 120, 0, 1)",
        "rgba(0, 220, 140, 1)",
        "rgba(255, 255, 0, 1)",
      ],
      borderWidth: 2,
      hoverOffset: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"doughnut">) => {
          const value = context.raw as number;
          return ` R$ ${value}k — ${context.label}`;
        },
      },
      backgroundColor: "rgba(10, 5, 30, 0.95)",
      borderColor: "rgba(102, 0, 102, 0.7)",
      borderWidth: 1,
      titleColor: "#cc88cc",
      bodyColor: "#e0d0e0",
      padding: 10,
    },
  },
  animation: {
    animateRotate: true,
    duration: 1500,
  },
};

export default function TheAsk() {
  const ref = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  useSectionViewTracker(sectionRef, "the-ask");

  const allocations = [
    { label: "Operação / CEO Full-time", value: 270, color: "rgba(180, 0, 180, 1)", pct: 54, note: "R$ 15k/mês pro-labore · execução kamikaze" },
    { label: "Cloud / Segurança", value: 90, color: "rgba(0, 180, 255, 1)", pct: 18, note: "Infraestrutura robusta e escalável" },
    { label: "Jurídico / LGPD", value: 60, color: "rgba(255, 120, 0, 1)", pct: 12, note: "Compliance é produto. Nossa base é a lei." },
    { label: "RP / Eventos", value: 40, color: "rgba(0, 220, 140, 1)", pct: 8, note: "Tração viral e autoridade cultural" },
    { label: "Reserva Estratégica", value: 40, color: "rgba(255, 255, 0, 1)", pct: 8, note: "Proteção e oportunidades táticas" },
  ];

  return (
    <section id="the-ask" ref={sectionRef} className="py-20 px-4 max-w-5xl mx-auto">
      <div ref={ref} className="section-hidden">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-yellow-400 glass-card mb-4">
            Plano de Voo
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">
            Invista na Soph<span className="ia-highlight">IA</span> — R$ 500k
          </h2>
          <p className="text-purple-300 mt-3 text-sm md:text-base max-w-xl mx-auto">
            18 meses de dominância. Alocação estratégica para conquista total.
          </p>
        </div>

        <div
          className="glass-card p-6 md:p-8 mb-8 text-center"
          style={{
            border: "1px solid rgba(255,255,0,0.4)",
            boxShadow: "0 0 40px rgba(102,0,102,0.3), 0 0 20px rgba(255,255,0,0.1)",
          }}
        >
          <div className="text-xs uppercase tracking-widest text-yellow-400 mb-2">Rodada Pre-Seed</div>
          <div className="font-display text-4xl md:text-6xl font-black neon-text mb-2">
            R$ 500.000
          </div>
          <div className="text-purple-300 text-sm md:text-base">para 18 meses de execução total</div>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {["Capital Inicial", "Equity Negociável", "Board Participation", "18 Meses Runway"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(102,0,102,0.2)",
                  border: "1px solid rgba(102,0,102,0.5)",
                  color: "#cc88cc",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs mx-auto">
              <Doughnut data={allocationData} options={chartOptions} />
            </div>
            <div className="text-center mt-4">
              <div className="font-display text-xl font-bold text-white">R$ 500k</div>
              <div className="text-xs text-purple-400">Alocação Estratégica Total</div>
            </div>
          </div>

          <div className="space-y-3">
            {allocations.map((item) => (
              <div
                key={item.label}
                className="glass-card p-4 flex items-start gap-3"
                style={{ borderColor: "rgba(102,0,102,0.3)" }}
              >
                <div
                  className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold text-sm text-white leading-tight">{item.label}</span>
                    <span className="font-display font-bold text-base flex-shrink-0" style={{ color: item.color }}>
                      R$ {item.value}k
                    </span>
                  </div>
                  <div className="text-xs text-purple-400 mt-1">{item.note}</div>
                  <div className="mt-2 h-1.5 rounded-full bg-purple-900 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <div className="text-xs text-purple-500 mt-0.5">{item.pct}% do total</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
