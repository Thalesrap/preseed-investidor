import { useEffect, useRef, useState } from "react";

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

function formatBRL(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(1)}k`;
  return `R$ ${value.toFixed(2)}`;
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
}

function SliderBlock({ label, sublabel, value, min, max, step, onChange, color }: SliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div>
          <div className="font-semibold text-white text-sm">{label}</div>
          <div className="text-xs text-purple-400">{sublabel}</div>
        </div>
        <div className="font-display font-bold text-lg" style={{ color }}>{value.toLocaleString("pt-BR")}</div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-sophia"
      />
      <div className="flex justify-between text-xs text-purple-500">
        <span>{min.toLocaleString("pt-BR")}</span>
        <span>{max.toLocaleString("pt-BR")}</span>
      </div>
    </div>
  );
}

export default function MotorEscala() {
  const ref = useScrollReveal();

  const [guardioes, setGuardioes] = useState(500);
  const [validacoes, setValidacoes] = useState(200);
  const [b2bContratos, setB2bContratos] = useState(10);
  const [soberania, setSoberania] = useState(3);

  const receita_b2c_saas = guardioes * 19.90;
  const receita_validacoes = validacoes * 99.00;
  const receita_humano = receita_validacoes * 0.60;
  const receita_oraculo = receita_validacoes * 0.40;
  const receita_b2b = b2bContratos * 2500;
  const soberaniaMultiplier = [1, 1.5, 3, 5, 10][soberania - 1];
  const receita_b2g_projection = (receita_b2c_saas + receita_validacoes + receita_b2b) * soberaniaMultiplier * 10 * 12;

  const totalConsultas = validacoes + guardioes * 5;
  const presalVolume = totalConsultas * 2 * 1024;

  const mrr_total = receita_b2c_saas + receita_validacoes + receita_b2b;

  return (
    <section id="simulador" className="py-20 px-4 max-w-5xl mx-auto">
      <div ref={ref} className="section-hidden">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-yellow-400 glass-card mb-4">
            Simulador de ROI
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">
            Motor de Escala Panor<span className="ia-highlight">âm</span>ico
          </h2>
          <p className="text-purple-300 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Ajuste os sliders e veja a matemática do lucro em tempo real
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card purple-glow p-6 space-y-6">
            <SliderBlock
              label="Slider A — Guardiões B2C"
              sublabel="Assinantes SaaS × R$ 19,90/mês"
              value={guardioes}
              min={100}
              max={10000}
              step={100}
              onChange={setGuardioes}
              color="#FFFF00"
            />
            <div className="glass-card-strong p-3 flex justify-between items-center">
              <span className="text-xs text-purple-300">Receita Recorrente SaaS</span>
              <span className="font-display font-bold text-yellow-400">{formatBRL(receita_b2c_saas)}/mês</span>
            </div>

            <SliderBlock
              label="Slider B — Validações B2C"
              sublabel="Consultas × R$ 99,00 (split 60/40)"
              value={validacoes}
              min={50}
              max={5000}
              step={50}
              onChange={setValidacoes}
              color="#cc88ff"
            />
            <div className="glass-card-strong p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-green-400">👤 60% Humano</span>
                <span className="font-bold text-green-400">{formatBRL(receita_humano)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-purple-300">🤖 40% Oráculo</span>
                <span className="font-bold text-purple-300">{formatBRL(receita_oraculo)}</span>
              </div>
            </div>

            <SliderBlock
              label="Slider C — Contratos B2B"
              sublabel="MRR Corporativo × R$ 2.500/contrato"
              value={b2bContratos}
              min={1}
              max={100}
              step={1}
              onChange={setB2bContratos}
              color="#66ffcc"
            />
            <div className="glass-card-strong p-3 flex justify-between items-center">
              <span className="text-xs text-purple-300">Receita B2B</span>
              <span className="font-display font-bold text-emerald-400">{formatBRL(receita_b2b)}/mês</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card purple-glow p-6 space-y-5">
              <SliderBlock
                label="Slider D — Nível de Soberania B2G"
                sublabel="Escala geopolítica (1=Local → 5=Global UBI)"
                value={soberania}
                min={1}
                max={5}
                step={1}
                onChange={setSoberania}
                color="#ff9944"
              />
              <div className="space-y-2">
                {[
                  { n: 1, label: "Local — Atuação Regional" },
                  { n: 2, label: "Nacional — Plataforma Brasil" },
                  { n: 3, label: "Sul Global — Exportação Cultural" },
                  { n: 4, label: "Big Tech Partnership" },
                  { n: 5, label: "🌍 UBI — Renda Básica via Saber" },
                ].map((level) => (
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
                <div className="text-xs text-orange-400 mb-1">Projeção 10 Anos (Cenário Moonshot)</div>
                <div className="font-display font-black text-xl text-orange-300">
                  {formatBRL(receita_b2g_projection)}
                </div>
                <div className="text-xs text-purple-400 mt-1">Big Techs financiam como RBU Tropicalizado</div>
              </div>
            </div>

            <div
              className="glass-card p-6 space-y-4"
              style={{ border: "1px solid rgba(255,255,0,0.3)", boxShadow: "0 0 20px rgba(255,255,0,0.1)" }}
            >
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-yellow-400 mb-2">MRR Total Projetado</div>
                <div className="font-display text-3xl md:text-4xl font-black neon-text">
                  {formatBRL(mrr_total)}
                </div>
                <div className="text-xs text-purple-400 mt-1">por mês, nível atual</div>
              </div>

              <hr className="section-divider" />

              <div
                className="p-4 rounded-lg"
                style={{ background: "rgba(0,20,80,0.4)", border: "1px solid rgba(0,100,200,0.4)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🛢️</span>
                  <span className="text-sm font-bold text-blue-300">Volume do Pré-Sal Digital</span>
                </div>
                <div className="font-display text-xl font-bold text-blue-200">
                  {formatBytes(presalVolume)}
                </div>
                <div className="text-xs text-blue-400 mt-1">
                  {totalConsultas.toLocaleString("pt-BR")} consultas × 2KB RLHF proprietários
                </div>
                <div
                  className="mt-2 text-xs font-semibold px-2 py-1 rounded inline-block"
                  style={{ background: "rgba(0,200,100,0.15)", color: "#00cc66", border: "1px solid rgba(0,200,100,0.3)" }}
                >
                  ✅ Dados 100% protegidos contra treinamento externo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
