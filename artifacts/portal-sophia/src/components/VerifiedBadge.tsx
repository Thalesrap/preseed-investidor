import { useEffect, useRef } from "react";
import { useSectionViewTracker, useTrackCta } from "@/hooks/useAnalytics";
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

export default function VerifiedBadge() {
  const ref = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  useSectionViewTracker(sectionRef, "conversao");
  const trackCta = useTrackCta();
  const { t } = useLanguage();
  const v = t.verified;

  return (
    <section id="contato" ref={sectionRef} className="py-20 px-4 max-w-3xl mx-auto text-center">
      <div ref={ref} className="section-hidden space-y-10">
        <div>
          <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-yellow-400 glass-card mb-4">
            {v.sectionLabel}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">
            {v.title}<span className="ia-highlight">IA</span>{v.titleSuffix}
          </h2>
          <p className="text-purple-300 mt-3 text-sm md:text-base max-w-xl mx-auto">
            {v.subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <div
            className="badge-pulse inline-flex items-center gap-3 px-8 py-4 rounded-full cursor-default"
            style={{
              background: "rgba(0, 40, 120, 0.5)",
              border: "2px solid rgba(0, 100, 255, 0.7)",
              color: "#88ccff",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-display font-bold tracking-wider text-lg">{v.badge}</span>
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
          </div>
        </div>

        <div
          className="glass-card p-8 space-y-6"
          style={{ border: "1px solid rgba(102,0,102,0.5)", boxShadow: "0 0 40px rgba(102,0,102,0.2)" }}
        >
          <blockquote className="text-base md:text-lg text-purple-100 italic leading-relaxed">
            {v.quote}
          </blockquote>
          <div className="text-sm text-purple-400">{v.quoteAuthor}</div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <a
              href="https://wa.me/5516999999179"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #128C7E, #25D366)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(37, 211, 102, 0.3)",
              }}
              onClick={() => trackCta("conversao", "WhatsApp", "https://wa.me/5516999999179")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(37, 211, 102, 0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(37, 211, 102, 0.3)";
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {v.ctaWhatsApp}
            </a>

            <a
              href="https://www.linkedin.com/in/thalexrapia/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300"
              style={{
                background: "rgba(0, 100, 180, 0.3)",
                border: "1px solid rgba(0, 120, 200, 0.6)",
                color: "#66aaff",
              }}
              onClick={() => trackCta("conversao", "LinkedIn", "https://www.linkedin.com/in/thalexrapia/")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0, 100, 180, 0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0, 100, 180, 0.3)";
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              {v.ctaLinkedIn}
            </a>

            <a
              href="https://www.amazon.com/author/thalespires"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300"
              style={{
                background: "rgba(255, 160, 0, 0.15)",
                border: "1px solid rgba(255, 160, 0, 0.5)",
                color: "#ffaa44",
              }}
              onClick={() => trackCta("conversao", "Livro Amazon", "https://www.amazon.com/author/thalespires")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255, 160, 0, 0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255, 160, 0, 0.15)";
              }}
            >
              {v.ctaAmazon}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
