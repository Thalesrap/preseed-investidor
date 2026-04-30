import { useEffect, useRef } from "react";
import { useSectionViewTracker, useTrackCta } from "@/hooks/useAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const trackCta = useTrackCta();
  const { t } = useLanguage();

  useSectionViewTracker(ref as React.RefObject<HTMLElement>, "hero", 0.1);

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

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 stars-bg particles overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-900 opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-800 opacity-5 blur-3xl"></div>
      </div>

      <div ref={ref} className="section-hidden relative z-10 flex flex-col items-center gap-8 max-w-4xl mx-auto">
        <div className="mb-2">
          <img
            src="/logo-sophia.png"
            alt="Oráculo de SophIA — Coruja Cibernética"
            className="owl-logo mx-auto w-24 md:w-36 lg:w-[150px] h-auto"
          />
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card border-animate text-xs md:text-sm tracking-widest uppercase font-medium text-purple-300">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            {t.hero.badge}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Oráculo de Soph<span className="ia-highlight">IA</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-200 mt-2 block">
              {t.hero.tagline}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed opacity-90">
            {t.hero.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4">
          <a
            href="#the-ask"
            className="px-8 py-3 rounded-lg font-bold text-sm md:text-base tracking-wide uppercase transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #660066, #990099)",
              border: "1px solid rgba(255,255,0,0.3)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(102,0,102,0.5)",
            }}
            onClick={() => trackCta("hero", t.hero.ctaPrimary, "#the-ask")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(102,0,102,0.8), 0 0 50px rgba(255,255,0,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(102,0,102,0.5)";
            }}
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#simulador"
            className="px-8 py-3 rounded-lg font-bold text-sm md:text-base tracking-wide uppercase border transition-all duration-300"
            style={{
              border: "1px solid rgba(255,255,0,0.5)",
              color: "#FFFF00",
              background: "rgba(255,255,0,0.05)",
            }}
            onClick={() => trackCta("hero", t.hero.ctaSecondary, "#simulador")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,0,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,0,0.05)";
            }}
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-lg">
          {t.hero.stats.map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center purple-glow">
              <div className="font-display text-2xl md:text-3xl font-black neon-text">{stat.value}</div>
              <div className="text-xs text-purple-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-purple-400 text-xs animate-bounce">
        <span>{t.hero.explore}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  );
}
