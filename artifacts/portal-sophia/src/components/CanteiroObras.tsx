import { useEffect, useRef } from "react";
import { useSectionViewTracker } from "@/hooks/useAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";

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

export default function CanteiroObras() {
  const ref = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  useSectionViewTracker(sectionRef, "canteiro");
  const { t, lang } = useLanguage();
  const p = t.proof;

  return (
    <section id="canteiro" ref={sectionRef} className="py-20 px-4 max-w-5xl mx-auto">
      <div ref={ref} className="section-hidden">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-yellow-400 glass-card mb-4">
            {p.sectionLabel}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">
            {lang === "en" ? (
              <>Soph<span className="ia-highlight">IA</span>{p.titleSuffix}</>
            ) : (
              <>Canteiro de Obras da Soph<span className="ia-highlight">IA</span></>
            )}
          </h2>
          <p className="text-purple-300 mt-3 text-sm md:text-base max-w-xl mx-auto">
            {p.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card purple-glow overflow-hidden border-animate">
            <div className="p-4 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-yellow-400 font-semibold">{p.mvpLabel}</span>
              </div>
              <h3 className="font-bold text-white text-base">{p.mvpTitle}</h3>
              <p className="text-xs text-purple-300 mt-1">{p.mvpDesc}</p>
            </div>
            <div className="video-container mx-4 mb-4">
              <iframe
                src="https://www.youtube.com/embed/2D7x5QGZSwM"
                title="Demo MVP Oráculo de SophIA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="glass-card purple-glow overflow-hidden border-animate">
            <div className="p-4 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-green-400 font-semibold">{p.thesisLabel}</span>
              </div>
              <h3 className="font-bold text-white text-base">{p.thesisTitle}</h3>
              <p className="text-xs text-purple-300 mt-1">{p.thesisDesc}</p>
            </div>
            <div className="video-container mx-4 mb-4">
              <iframe
                src="https://www.youtube.com/embed/USFeNUfXILE"
                title="Tese de Empregabilidade"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {p.milestones.map((item) => (
            <div
              key={item.title}
              className="glass-card p-4 text-center space-y-2"
              style={{ border: "1px solid rgba(102,0,102,0.3)" }}
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="font-bold text-white text-xs">{item.title}</div>
              <div className="text-xs text-purple-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
