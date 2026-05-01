import { useEffect, useRef } from "react";
import { useSectionViewTracker } from "@/hooks/useAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";

const LINKEDIN_URL = "https://www.linkedin.com/in/thalexrapia";

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

function renderBio(bio: string) {
  const paragraphs = bio.split("\n\n");
  return paragraphs.map((para, pi) => {
    const parts = para.split(/<strong>|<\/strong>/);
    return (
      <p key={pi} className="text-sm md:text-base text-purple-100 leading-relaxed whitespace-pre-line">
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} className="font-bold text-white">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    );
  });
}

export default function GabineteCentauro() {
  const ref = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  useSectionViewTracker(sectionRef, "fundador");
  const { t } = useLanguage();
  const f = t.founder;

  return (
    <section id="fundador" ref={sectionRef} className="py-20 px-4 max-w-5xl mx-auto">
      <div ref={ref} className="section-hidden">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-yellow-400 glass-card mb-4">
            {f.sectionLabel}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">
            {f.title}<span className="ia-highlight">IA</span>
          </h2>
          <p className="text-purple-300 mt-3 text-sm md:text-base max-w-xl mx-auto">
            {f.subtitle}
          </p>
        </div>

        <div className="glass-card purple-glow p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-start border-animate">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto">
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0"
              style={{
                border: "3px solid #660066",
                boxShadow: "0 0 24px rgba(102,0,102,0.7), 0 0 48px rgba(102,0,102,0.3)",
              }}
            >
              <img
                src="/centauro.png"
                alt="Thales Rodrigues Andrade Pires"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="text-center lg:text-left">
              <div className="font-display font-bold text-lg text-white">Thales Rodrigues Andrade Pires</div>
              <div className="text-purple-300 text-xs mt-1 max-w-[220px] leading-snug">{f.role}</div>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{
                background: "rgba(0, 100, 200, 0.25)",
                border: "1px solid rgba(0, 140, 255, 0.5)",
                color: "#60b0ff",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {f.tags.map((tag) => (
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

          <div className="flex-1 space-y-6 min-w-0">
            <div
              className="space-y-3 pr-2 overflow-y-auto"
              style={{
                maxHeight: "260px",
                scrollbarWidth: "thin",
                scrollbarColor: "#660066 transparent",
              }}
            >
              {renderBio(f.bio)}
            </div>

            <p className="text-sm md:text-base text-purple-200 leading-relaxed">
              {f.quote.split("<yellow>").map((part, i) => {
                if (i === 0) return part;
                const [highlighted, rest] = part.split("</yellow>");
                return (
                  <span key={i}>
                    <span className="text-yellow-400 font-semibold">{highlighted}</span>
                    {rest}
                  </span>
                );
              })}
            </p>

            <div className="space-y-4 pt-2">
              <div className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
                {f.badgesLabel}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{
                    background: "rgba(0, 50, 120, 0.3)",
                    border: "1px solid rgba(0, 100, 200, 0.5)",
                  }}
                >
                  <div className="text-xl flex-shrink-0 mt-0.5">🛡️</div>
                  <div className="min-w-0">
                    <div className="font-bold text-blue-300 text-xs leading-tight">{f.certCisco}</div>
                    <div className="text-xs text-blue-400 opacity-80 mt-0.5">{f.certCiscoSub}</div>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{
                    background: "rgba(0, 80, 40, 0.3)",
                    border: "1px solid rgba(0, 160, 80, 0.5)",
                  }}
                >
                  <div className="text-xl flex-shrink-0 mt-0.5">🔍</div>
                  <div className="min-w-0">
                    <div className="font-bold text-green-300 text-xs leading-tight">{f.certForensic}</div>
                    <div className="text-xs text-green-400 opacity-80 mt-0.5">{f.certForensicSub}</div>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{
                    background: "rgba(80, 20, 0, 0.3)",
                    border: "1px solid rgba(200, 120, 0, 0.5)",
                  }}
                >
                  <div className="text-xl flex-shrink-0 mt-0.5">🚀</div>
                  <div className="min-w-0">
                    <div className="font-bold text-orange-300 text-xs leading-tight">{f.certNasa}</div>
                    <div className="text-xs text-orange-400 opacity-80 mt-0.5">{f.certNasaSub}</div>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{
                    background: "rgba(60, 0, 100, 0.35)",
                    border: "1px solid rgba(160, 0, 220, 0.5)",
                  }}
                >
                  <div className="text-xl flex-shrink-0 mt-0.5">🎓</div>
                  <div className="min-w-0">
                    <div className="font-bold text-violet-300 text-xs leading-tight">{f.certGrad}</div>
                    <div className="text-xs text-violet-400 opacity-80 mt-0.5">{f.certGradSub}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {f.achievements.map((item) => (
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
