import { useEffect, useRef } from "react";
import { useSectionViewTracker } from "@/hooks/useAnalytics";

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
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const slides = [
  {
    num: "01",
    title: "O Gancho",
    subtitle: "A Patologia do Progresso",
    content:
      "O mundo sofre de duas patologias terminais: a Ociosidade Funcional — onde o humano perde sua utilidade para a automação — e a Alucinação Sistêmica — onde empresas perdem bilhões confiando em LLMs estrangeiras. A IA sem curadoria é um trem de alta velocidade sem freios.",
    highlight: "Freio ABS",
    icon: "🚂",
    color: "#cc44cc",
  },
  {
    num: "02",
    title: "O Problema",
    subtitle: "O Extrativismo de Dados",
    content:
      "O Brasil é o 'sul global' sendo minerado. Entregamos nossa sabedoria para modelos americanos e não recebemos um centavo de MRR em troca. Isso gera um vazio de soberania e uma crise de saúde mental nas corporações que tentam implementar IA 'crua'.",
    highlight: "Soberania",
    icon: "⛏️",
    color: "#ff6644",
  },
  {
    num: "03",
    title: "A Solução",
    subtitle: "O Oráculo e o Guardião",
    content:
      "Invertemos a lógica. Criamos o ecossistema onde a Vivência é o ativo. O Oráculo processa, mas o Guardião (o especialista humano) valida. É a 'tropicalização' da verdade. Transformamos conhecimento tácito em dados validados e monetizáveis.",
    highlight: "HITL",
    icon: "🛡️",
    color: "#44cccc",
  },
  {
    num: "04",
    title: "Unit Economics",
    subtitle: "A Matemática do Lucro",
    content:
      "Take Rate de 40% (R$ 4,00 por validação). B2C: LTV/CAC de 61x. B2B: LTV/CAC de 67x. Marketplace de sabedoria com efeito de rede e Churn tendendo a zero devido ao Lock-in de confiança.",
    highlight: "67x LTV/CAC",
    icon: "📊",
    color: "#FFFF00",
  },
  {
    num: "09",
    title: "O Moonshot",
    subtitle: "B2G e a Auditoria da Realidade",
    content:
      "O Oráculo de SophIA tem o potencial de se tornar a infraestrutura de Estado para a Distribuição de Renda via Saber. É o Bolsa Família da Era da Inteligência — o cidadão remunerado por ser o tutor da máquina. O Brasil liderando a governança de IA no Sul Global.",
    highlight: "RBU Digital",
    icon: "🌍",
    color: "#44aaff",
  },
];

export default function NarrativeSection() {
  const ref = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  useSectionViewTracker(sectionRef, "narrativa", 0.05);

  return (
    <section id="narrativa" ref={sectionRef} className="py-20 px-4 max-w-5xl mx-auto">
      <div ref={ref} className="section-hidden">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-yellow-400 glass-card mb-4">
            Roteiro Estratégico
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">
            A Tese da Soph<span className="ia-highlight">IA</span>
          </h2>
          <p className="text-purple-300 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Do gancho ao moonshot — a tese completa para o primeiro unicórnio de soberania digital do Brasil
          </p>
        </div>

        <div className="space-y-4">
          {slides.map((slide, i) => (
            <div
              key={slide.num}
              className="glass-card p-5 md:p-6 flex gap-4 md:gap-6 items-start transition-all duration-300 hover:purple-glow cursor-default"
              style={{
                borderLeft: `3px solid ${slide.color}`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="text-2xl">{slide.icon}</div>
                <div
                  className="font-display text-xs font-bold opacity-50"
                  style={{ color: slide.color }}
                >
                  {slide.num}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 items-baseline mb-1">
                  <h3 className="font-display font-bold text-base text-white">{slide.title}</h3>
                  <span className="text-xs text-purple-400">— {slide.subtitle}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold ml-auto flex-shrink-0"
                    style={{
                      background: `${slide.color}22`,
                      border: `1px solid ${slide.color}66`,
                      color: slide.color,
                    }}
                  >
                    {slide.highlight}
                  </span>
                </div>
                <p className="text-sm text-purple-200 leading-relaxed">{slide.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
