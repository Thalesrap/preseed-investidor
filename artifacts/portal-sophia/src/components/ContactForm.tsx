import { useEffect, useRef, useState } from "react";
import { useCreateLead } from "@workspace/api-client-react";

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

const INVESTMENT_OPTIONS = [
  "Investimento Anjo (até R$ 500k)",
  "Seed (R$ 500k – R$ 2M)",
  "Série A (R$ 2M – R$ 10M)",
  "Série B+ (acima de R$ 10M)",
  "Parceria Estratégica",
  "Ainda explorando",
];

export default function ContactForm() {
  const ref = useScrollReveal();
  const mutation = useCreateLead();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    investmentInterest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Nome é obrigatório";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Email válido é obrigatório";
    if (!form.company.trim()) errors.company = "Empresa é obrigatória";
    if (!form.investmentInterest) errors.investmentInterest = "Selecione um nível";
    if (!form.message.trim()) errors.message = "Mensagem é obrigatória";
    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    mutation.mutate(
      { data: form },
      {
        onSuccess: () => setSubmitted(true),
      }
    );
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg text-sm text-white placeholder-purple-400 outline-none transition-all duration-200 focus:ring-2";
  const inputStyle = {
    background: "rgba(20, 0, 50, 0.7)",
    border: "1px solid rgba(102, 0, 102, 0.5)",
  };
  const inputFocusRing = "focus:ring-purple-500";

  return (
    <section id="formulario-contato" className="py-20 px-4 max-w-2xl mx-auto">
      <div ref={ref} className="section-hidden">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-yellow-400 glass-card mb-2">
            Contato Direto
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">
            Vamos Conversar sobre o{" "}
            <span className="ia-highlight">Futuro</span>
          </h2>
          <p className="text-purple-300 text-sm md:text-base max-w-xl mx-auto">
            Preencha o formulário abaixo e entraremos em contato para agendar
            uma conversa sobre como podemos construir juntos.
          </p>
        </div>

        <div
          className="glass-card p-8 rounded-2xl"
          style={{
            border: "1px solid rgba(102,0,102,0.5)",
            boxShadow: "0 0 40px rgba(102,0,102,0.15)",
          }}
        >
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="text-5xl">✅</div>
              <h3 className="font-display text-xl font-bold text-white">
                Mensagem Enviada!
              </h3>
              <p className="text-purple-300 text-sm max-w-sm mx-auto">
                Obrigado pelo seu interesse. Nossa equipe entrará em contato em
                até 48 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-purple-300 mb-1 font-semibold uppercase tracking-wider">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className={`${inputClass} ${inputFocusRing}`}
                    style={inputStyle}
                  />
                  {fieldErrors.name && (
                    <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-purple-300 mb-1 font-semibold uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className={`${inputClass} ${inputFocusRing}`}
                    style={inputStyle}
                  />
                  {fieldErrors.email && (
                    <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs text-purple-300 mb-1 font-semibold uppercase tracking-wider">
                  Empresa *
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa ou fundo"
                  className={`${inputClass} ${inputFocusRing}`}
                  style={inputStyle}
                />
                {fieldErrors.company && (
                  <p className="text-red-400 text-xs mt-1">{fieldErrors.company}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-purple-300 mb-1 font-semibold uppercase tracking-wider">
                  Interesse de Investimento *
                </label>
                <select
                  name="investmentInterest"
                  value={form.investmentInterest}
                  onChange={handleChange}
                  className={`${inputClass} ${inputFocusRing}`}
                  style={{ ...inputStyle, color: form.investmentInterest ? "#fff" : "#a855f7" }}
                >
                  <option value="" disabled style={{ background: "#0a0022" }}>
                    Selecione o nível de interesse
                  </option>
                  {INVESTMENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} style={{ background: "#0a0022" }}>
                      {opt}
                    </option>
                  ))}
                </select>
                {fieldErrors.investmentInterest && (
                  <p className="text-red-400 text-xs mt-1">{fieldErrors.investmentInterest}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-purple-300 mb-1 font-semibold uppercase tracking-wider">
                  Mensagem *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Conte um pouco sobre seu interesse e como podemos colaborar..."
                  className={`${inputClass} ${inputFocusRing} resize-none`}
                  style={inputStyle}
                />
                {fieldErrors.message && (
                  <p className="text-red-400 text-xs mt-1">{fieldErrors.message}</p>
                )}
              </div>

              {mutation.isError && (
                <p className="text-red-400 text-sm text-center">
                  Ocorreu um erro ao enviar. Por favor, tente novamente.
                </p>
              )}

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-4 rounded-xl font-display font-bold text-sm tracking-wider transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: mutation.isPending
                    ? "rgba(102,0,102,0.5)"
                    : "linear-gradient(135deg, #660066, #990099)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,0,0.2)",
                  boxShadow: mutation.isPending ? "none" : "0 0 30px rgba(153,0,153,0.4)",
                }}
              >
                {mutation.isPending ? "Enviando..." : "Enviar Mensagem →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
