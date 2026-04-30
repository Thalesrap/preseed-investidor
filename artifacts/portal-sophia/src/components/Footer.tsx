import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer
      className="relative py-12 px-4 text-center"
      style={{
        background: "linear-gradient(to top, rgba(102,0,102,0.08), transparent)",
        borderTop: "1px solid rgba(102,0,102,0.3)",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/logo-sophia.png"
            alt="Oráculo de SophIA"
            className="owl-logo w-16 h-auto mx-auto opacity-90"
          />
          <div>
            <div className="font-display font-black text-xl tracking-wider text-white">
              Oráculo de Soph<span className="ia-highlight">IA</span>
            </div>
            <div className="text-xs text-purple-400 mt-1">{f.tagline}</div>
          </div>
        </div>

        <p className="text-sm text-purple-300 max-w-lg mx-auto">
          {f.description}
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs text-purple-400">
          <a
            href="https://wa.me/5516999999179"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            WhatsApp
          </a>
          <span className="text-purple-700">·</span>
          <a
            href="https://www.linkedin.com/in/thalespires"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-purple-700">·</span>
          <a
            href="https://www.amazon.com/author/thalespires"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-colors"
          >
            Amazon
          </a>
        </div>

        <div className="text-xs text-purple-700 pt-4 border-t border-purple-900">
          {f.copyright}
        </div>
      </div>
    </footer>
  );
}
