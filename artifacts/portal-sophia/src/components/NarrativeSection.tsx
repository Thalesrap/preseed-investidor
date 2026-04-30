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
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function NarrativeSection() {
  const ref = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  useSectionViewTracker(sectionRef, "narrativa", 0.05);
  const { t } = useLanguage();
  const n = t.narrative;

  return (
    <section id="narrativa" ref={sectionRef} className="py-20 px-4 max-w-5xl mx-auto">
      <div ref={ref} className="section-hidden">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-yellow-400 glass-card mb-4">
            {n.sectionLabel}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">
            {n.title}<span className="ia-highlight">IA</span>
          </h2>
          <p className="text-purple-300 mt-3 text-sm md:text-base max-w-xl mx-auto">
            {n.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {n.slides.map((slide, i) => (
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
