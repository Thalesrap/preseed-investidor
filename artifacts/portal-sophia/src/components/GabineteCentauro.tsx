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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function GabineteCentauro() {
  const ref = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  useSectionViewTracker(sectionRef, "fundador");

  return (
    <section id="fundador" ref={sectionRef} className="py-20 px-4 max-w-5xl mx-auto">
      <div ref={ref} className="section-hidden">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-yellow-400 glass-card mb-4">
            O Fundador
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">
            Gabinete do Centauro · Soph<span className="ia-highlight">IA</span>
          </h2>
          <p className="text-purple-300 mt-3 text-sm md:text-base max-w-xl mx-auto">
            A fusão da ética humana com a velocidade do silício
          </p>
        </div>

        <div className="glass-card purple-glow p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-start border-animate">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto">
            <div
              className="w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center text-5xl md:text-6xl"
              style={{
                background: "linear-gradient(135deg, #330033, #660066)",
                border: "2px solid rgba(102,0,102,0.8)",
                boxShadow: "0 0 30px rgba(102,0,102,0.5)",
              }}
            >
              ⚖️
            </div>
            <div className="text-center lg:text-left">
              <div className="font-display font-bold text-lg text-white">Thales Pires</div>
              <div className="text-purple-300 text-sm">Founder & CEO</div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {["Direito Estratégico", "IA / ML", "LGPD", "Web Summit Rio Alpha"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full"
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

          <div className="flex-1 space-y-6">
            <p className="text-base md:text-lg text-purple-100 leading-relaxed">
              <span className="font-bold text-white">O Centauro:</span> 25 anos de magistratura
              intelectual no Direito Estratégico fusionados à graduação em Inteligência Artificial.
              Não é um garoto de 20 anos brincando de Python — é a fusão do rigor jurídico com a
              velocidade do silício.
            </p>

            <p className="text-sm md:text-base text-purple-200 leading-relaxed">
              "A IA sem curadoria é um trem de alta velocidade sem freios. Nós construímos o sistema
              de freios — o Oráculo de SophIA é o <span className="text-yellow-400 font-semibold">Freio ABS indispensável</span> para a
              governança de dados no Brasil."
            </p>

            <div className="space-y-4 pt-2">
              <div className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
                Selos de Resiliência Técnica
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-lg flex-1"
                  style={{
                    background: "rgba(0, 50, 120, 0.3)",
                    border: "1px solid rgba(0, 100, 200, 0.5)",
                  }}
                >
                  <div className="text-2xl">🛡️</div>
                  <div>
                    <div className="font-bold text-blue-300 text-sm">Cibersegurança Cisco</div>
                    <div className="text-xs text-blue-400 opacity-80">Certified Security Professional</div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-lg flex-1"
                  style={{
                    background: "rgba(0, 80, 40, 0.3)",
                    border: "1px solid rgba(0, 160, 80, 0.5)",
                  }}
                >
                  <div className="text-2xl">🔍</div>
                  <div>
                    <div className="font-bold text-green-300 text-sm">Forense Digital</div>
                    <div className="text-xs text-green-400 opacity-80">Hackers do Bem — CISA/SENAI</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { icon: "🏛️", label: "25 Anos Direito" },
                { icon: "🤖", label: "IA / ML Grad." },
                { icon: "🌐", label: "Web Summit Rio" },
                { icon: "📘", label: "Autor Amazon" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1 p-3 rounded-lg text-center"
                  style={{
                    background: "rgba(102,0,102,0.1)",
                    border: "1px solid rgba(102,0,102,0.3)",
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs text-purple-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
