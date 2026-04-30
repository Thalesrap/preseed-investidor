import Hero from "@/components/Hero";
import GabineteCentauro from "@/components/GabineteCentauro";
import NarrativeSection from "@/components/NarrativeSection";
import MotorEscala from "@/components/MotorEscala";
import CanteiroObras from "@/components/CanteiroObras";
import TheAsk from "@/components/TheAsk";
import VerifiedBadge from "@/components/VerifiedBadge";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

function Divider() {
  return <hr className="section-divider mx-auto max-w-2xl" />;
}

function NavBar() {
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
        <div className="flex items-center gap-1 sm:gap-4">
          {[
            { href: "#simulador", label: "Simulador" },
            { href: "#canteiro", label: "Demo" },
            { href: "#the-ask", label: "The Ask" },
            { href: "#contato", label: "Contato" },
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
            href="https://wa.me/5516999999179"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-xs px-3 py-1.5 rounded-lg font-bold transition-all"
            style={{
              background: "linear-gradient(135deg, #660066, #990099)",
              color: "#fff",
              border: "1px solid rgba(255,255,0,0.2)",
            }}
          >
            Agendar Pitch
          </a>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
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
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
