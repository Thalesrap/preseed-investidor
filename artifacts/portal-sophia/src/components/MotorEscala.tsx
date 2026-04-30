import { useEffect, useRef, useState } from "react";
import { useSectionViewTracker, useTrackSlider } from "@/hooks/useAnalytics";
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

function formatCurrency(value: number, locale: string): string {
  const isBR = locale === "pt-BR";
  const symbol = isBR ? "R$ " : "$";
  const fmt = (n: number, decimals: number) =>
    n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  if (value >= 1_000_000) return `${symbol}${fmt(value / 1_000_000, 2)}M`;
  if (value >= 1_000) return `${symbol}${fmt(value / 1_000, 1)}k`;
  return `${symbol}${fmt(value, 2)}`;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(2)} GB`;
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(2)} MB`;
  return `${(bytes / 1_000).toFixed(1)} KB`;
}

interface SliderProps {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  color: string;
  onTrack: (v: number) => void;
  locale: string;
  displayValue?: string;
}

function SliderBlock({ label, sublabel, value, min, max, step, onChange, color, onTrack, locale, displayValue }: SliderProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(v: number) {
    onChange(v);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onTrack(v), 600);
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div>
          <div className="font-semibold text-white text-sm">{label}</div>
          <div className="text-xs text-purple-400">{sublabel}</div>
        </div>
        <div className="font-display font-bold text-lg" style={{ color }}>
          {displayValue ?? value.toLocaleString(locale)}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="slider-sophia"
      />
      <div className="flex justify-between text-xs text-purple-500">
        <span>{displayValue !== undefined ? (min === 0 ? "0" : min.toLocaleString(locale)) : min.toLocaleString(locale)}</span>
        <span>{displayValue !== undefined ? formatPercent(max) : max.toLocaleString(locale)}</span>
      </div>
    </div>
  );
}

export default function MotorEscala() {
  const ref = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  useSectionViewTracker(sectionRef, "simulador", 0.05);
  const trackSlider = useTrackSlider("simulador");
  const { t, lang } = useLanguage();
  const s = t.simulator;
  const locale = lang === "pt" ? "pt-BR" : "en-US";

  const [guardioes, setGuardioes] = useState(500);
  const [validacoes, setValidacoes] = useState(200);
  const [b2bContratos, setB2bContratos] = useState(10);
  const [soberania, setSoberania] = useState(3);
  const [cac, setCac] = useState(50);
  const [churnRate, setChurnRate] = useState(5);

  const guardioes_efetivos = Math.round(guardioes * (1 - churnRate / 100));

  const receita_b2c_saas = guardioes_efetivos * 19.90;
  const receita_validacoes = validacoes * 99.00;
  const receita_humano = receita_validacoes * 0.60;
  const receita_oraculo = receita_validacoes * 0.40;
  const receita_b2b = b2bContratos * 2500;
  const soberaniaMultiplier = [1, 1.5, 3, 5, 10][soberania - 1];
  const receita_b2g_projection = (receita_b2c_saas + receita_validacoes + receita_b2b) * soberaniaMultiplier * 10 * 12;

  const totalConsultas = validacoes + guardioes_efetivos * 5;
  const presalVolume = totalConsultas * 2 * 1024;

  const cac_total = guardioes * cac;
  const lucro_bruto = (receita_b2c_saas + receita_validacoes + receita_b2b) - cac_total;

  return (
    <section id="simulador" ref={sectionRef} className="py-20 px-4 max-w-5xl mx-auto">
      <div ref={ref} className="section-hidden">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-yellow-400 glass-card mb-4">
            {s.sectionLabel}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">
            {s.title}<span className="ia-highlight">IA</span>
          </h2>
          <p className="text-purple-300 mt-3 text-sm md:text-base max-w-xl mx-auto">
            {s.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card purple-glow p-6 space-y-6">
            <SliderBlock
              label={s.sliderA.label}
              sublabel={s.sliderA.sublabel}
              value={guardioes}
              min={0}
              max={10000}
              step={100}
              onChange={setGuardioes}
              color="#FFFF00"
              onTrack={(v) => trackSlider("guardioes_b2c", v)}
              locale={locale}
            />
            <div className="glass-card-strong p-3 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-purple-300">{s.saasRevenue}</span>
                <span className="font-display font-bold text-yellow-400">{formatCurrency(receita_b2c_saas, locale)}{s.perMonth}</span>
              </div>
              {churnRate > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-orange-400">{s.churnImpact} {guardioes_efetivos.toLocaleString(locale)}</span>
                  <span className="text-xs text-orange-400">−{formatPercent(churnRate)}</span>
                </div>
              )}
            </div>

            <SliderBlock
              label={s.sliderB.label}
              sublabel={s.sliderB.sublabel}
              value={validacoes}
              min={0}
              max={5000}
              step={50}
              onChange={setValidacoes}
              color="#cc88ff"
              onTrack={(v) => trackSlider("validacoes_b2c", v)}
              locale={locale}
            />
            <div className="glass-card-strong p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-green-400">{s.humanShare}</span>
                <span className="font-bold text-green-400">{formatCurrency(receita_humano, locale)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-purple-300">{s.oracleShare}</span>
                <span className="font-bold text-purple-300">{formatCurrency(receita_oraculo, locale)}</span>
              </div>
            </div>

            <SliderBlock
              label={s.sliderC.label}
              sublabel={s.sliderC.sublabel}
              value={b2bContratos}
              min={0}
              max={100}
              step={1}
              onChange={setB2bContratos}
              color="#66ffcc"
              onTrack={(v) => trackSlider("contratos_b2b", v)}
              locale={locale}
            />
            <div className="glass-card-strong p-3 flex justify-between items-center">
              <span className="text-xs text-purple-300">{s.b2bRevenue}</span>
              <span className="font-display font-bold text-emerald-400">{formatCurrency(receita_b2b, locale)}{s.perMonth}</span>
            </div>

            <div
              className="rounded-lg p-4 space-y-4"
              style={{ background: "rgba(30,0,50,0.5)", border: "1px solid rgba(200,100,255,0.2)" }}
            >
              <div className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
                {s.efficiencyLabel}
              </div>
              <SliderBlock
                label={s.sliderE.label}
                sublabel={s.sliderE.sublabel}
                value={cac}
                min={0}
                max={100}
                step={5}
                onChange={setCac}
                color="#ff6688"
                onTrack={(v) => trackSlider("cac", v)}
                locale={locale}
                displayValue={formatCurrency(cac, locale)}
              />
              <SliderBlock
                label={s.sliderF.label}
                sublabel={s.sliderF.sublabel}
                value={churnRate}
                min={0}
                max={20}
                step={1}
                onChange={setChurnRate}
                color="#ffaa44"
                onTrack={(v) => trackSlider("churn_rate", v)}
                locale={locale}
                displayValue={formatPercent(churnRate)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card purple-glow p-6 space-y-5">
              <SliderBlock
                label={s.sliderD.label}
                sublabel={s.sliderD.sublabel}
                value={soberania}
                min={1}
                max={5}
                step={1}
                onChange={setSoberania}
                color="#ff9944"
                onTrack={(v) => trackSlider("soberania_b2g", v)}
                locale={locale}
              />
              <div className="space-y-2">
                {s.sovereigntyLevels.map((level) => (
                  <div
                    key={level.n}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-all duration-300"
                    style={{
                      background: soberania >= level.n ? "rgba(102,0,102,0.3)" : "rgba(102,0,102,0.05)",
                      border: soberania === level.n ? "1px solid rgba(255,255,0,0.5)" : "1px solid rgba(102,0,102,0.2)",
                      color: soberania >= level.n ? "#e0b8e0" : "#664466",
                    }}
                  >
                    <span className="font-bold" style={{ color: soberania >= level.n ? "#FFFF00" : "#443344" }}>
                      {level.n}
                    </span>
                    <span>{level.label}</span>
                  </div>
                ))}
              </div>
              <div className="glass-card-strong p-3">
                <div className="text-xs text-orange-400 mb-1">{s.moonshot10y}</div>
                <div className="font-display font-black text-xl text-orange-300">
                  {formatCurrency(receita_b2g_projection, locale)}
                </div>
                <div className="text-xs text-purple-400 mt-1">{s.moonshotNote}</div>
              </div>
            </div>

            <div
              className="glass-card p-6 space-y-4"
              style={{ border: "1px solid rgba(255,255,0,0.3)", boxShadow: "0 0 20px rgba(255,255,0,0.1)" }}
            >
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-yellow-400 mb-2">{s.grossProfitLabel}</div>
                <div
                  className="font-display text-3xl md:text-4xl font-black"
                  style={{ color: lucro_bruto >= 0 ? "#FFFF00" : "#ff4444", textShadow: lucro_bruto >= 0 ? "0 0 20px rgba(255,255,0,0.5)" : "0 0 20px rgba(255,0,0,0.5)" }}
                >
                  {formatCurrency(Math.abs(lucro_bruto), locale)}
                  {lucro_bruto < 0 && <span className="text-lg ml-1">↓</span>}
                </div>
                <div className="text-xs text-purple-400 mt-1">{s.grossProfitSub}</div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-300">{s.saasRevenue}</span>
                  <span className="text-yellow-300">{formatCurrency(receita_b2c_saas, locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">{s.b2bRevenue} B2C</span>
                  <span className="text-purple-300">{formatCurrency(receita_validacoes, locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">{s.b2bRevenue}</span>
                  <span className="text-emerald-400">{formatCurrency(receita_b2b, locale)}</span>
                </div>
                <div className="flex justify-between border-t border-purple-800 pt-2">
                  <span className="text-red-400">{s.cacDeduction} ({guardioes.toLocaleString(locale)} × {formatCurrency(cac, locale)})</span>
                  <span className="text-red-400">−{formatCurrency(cac_total, locale)}</span>
                </div>
              </div>

              <hr className="section-divider" />

              <div
                className="p-4 rounded-lg"
                style={{ background: "rgba(0,20,80,0.4)", border: "1px solid rgba(0,100,200,0.4)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🛢️</span>
                  <span className="text-sm font-bold text-blue-300">{s.presalTitle}</span>
                </div>
                <div className="font-display text-xl font-bold text-blue-200">
                  {formatBytes(presalVolume)}
                </div>
                <div className="text-xs text-blue-400 mt-1">
                  {totalConsultas.toLocaleString(locale)} {s.presalNote}
                </div>
                <div
                  className="mt-2 text-xs font-semibold px-2 py-1 rounded inline-block"
                  style={{ background: "rgba(0,200,100,0.15)", color: "#00cc66", border: "1px solid rgba(0,200,100,0.3)" }}
                >
                  {s.presalProtected}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
