import Hero from "@/components/Hero";
import GabineteCentauro from "@/components/GabineteCentauro";
import NarrativeSection from "@/components/NarrativeSection";
import MotorEscala from "@/components/MotorEscala";
import CanteiroObras from "@/components/CanteiroObras";
import TheAsk from "@/components/TheAsk";
import VerifiedBadge from "@/components/VerifiedBadge";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useTrackCta } from "@/hooks/useAnalytics";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

function Divider() {
  return <hr className="section-divider mx-auto max-w-2xl" />;
}

function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className="flex items-center rounded-lg overflow-hidden text-xs font-bold"
      style={{
        border: "1px solid rgba(102,0,102,0.5)",
        background: "rgba(20,0,50,0.6)",
      }}
    >
      <button
        onClick={() => setLang("pt")}
        className="px-2 py-1 transition-all duration-200 flex items-center gap-1"
        style={{
          background: lang === "pt" ? "rgba(102,0,102,0.7)" : "transparent",
          color: lang === "pt" ? "#fff" : "#a855f7",
        }}
        aria-label="Português"
      >
        🇧🇷 PT
      </button>
      <div style={{ width: "1px", background: "rgba(102,0,102,0.5)", alignSelf: "stretch" }} />
      <button
        onClick={() => setLang("en")}
        className="px-2 py-1 transition-all duration-200 flex items-center gap-1"
        style={{
          background: lang === "en" ? "rgba(102,0,102,0.7)" : "transparent",
          color: lang === "en" ? "#fff" : "#a855f7",
        }}
        aria-label="English"
      >
        🇺🇸 EN
      </button>
    </div>
  );
}

function NavBar() {
  const trackCta = useTrackCta();
  const { t } = useLanguage();
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 py-3 px-4"
      style={{
        background: "rgba(0, 0, 34, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(102, 0, 102, 0.3)",
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo-sophia.png" alt="SophIA" className="w-8 h-8 object-contain" />
          <span className="font-display font-bold text-sm text-white hidden sm:block">
            Oráculo de Soph<span className="ia-highlight">IA</span>
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          {[
            { href: "#simulador", label: t.nav.simulator },
            { href: "#canteiro", label: t.nav.demo },
            { href: "#the-ask", label: t.nav.theAsk },
            { href: "#contato", label: t.nav.contact },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm text-purple-300 hover:text-yellow-400 transition-colors px-2 py-1 rounded"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/oraculo"
            className="hidden sm:flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors"
            style={{ color: "rgba(102,0,102,0.7)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#660066")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(102,0,102,0.7)")}
            title="Painel Administrativo"
          >
            🔮
          </a>
          <LanguageToggle />
          <a
            href="https://wa.me/5516999999179"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-xs px-3 py-1.5 rounded-lg font-bold transition-all"
            style={{
              background: "linear-gradient(135deg, #660066, #990099)",
              color: "#fff",
              border: "1px solid rgba(255,255,0,0.2)",
            }}
            onClick={() => trackCta("navbar", t.nav.scheduleButton, "https://wa.me/5516999999179")}
          >
            {t.nav.scheduleButton}
          </a>
        </div>
      </div>
    </nav>
  );
}

function AppInner() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--sophia-night)" }}
    >
      <NavBar />
      <main className="pt-14">
        <Hero />
        <Divider />
        <GabineteCentauro />
        <Divider />
        <NarrativeSection />
        <Divider />
        <MotorEscala />
        <Divider />
        <CanteiroObras />
        <Divider />
        <TheAsk />
        <Divider />
        <VerifiedBadge />
        <Divider />
        <ContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
