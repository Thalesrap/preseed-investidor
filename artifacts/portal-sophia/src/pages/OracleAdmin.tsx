import { useState, useEffect } from "react";

const ADMIN_PWD = "Formulario@890iop";
const BASE = ((import.meta.env.VITE_API_URL as string | undefined) ?? "").replace(/\/$/, "");
const STORAGE_KEY = "sophia-oracle-auth";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  investmentInterest: string;
  message: string;
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OracleAdmin() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(STORAGE_KEY) === "1");
  const [pwdInput, setPwdInput] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pwdInput === ADMIN_PWD) {
      localStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
      setPwdError(false);
    } else {
      setPwdError(true);
      setPwdInput("");
    }
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setLeads([]);
  }

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch(`${BASE}/api/leads`, {
      headers: { "x-admin-key": ADMIN_PWD },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Lead[]) => {
        setLeads(data);
        setFetchError("");
      })
      .catch((err) => setFetchError(`Erro ao carregar: ${err.message}`))
      .finally(() => setLoading(false));
  }, [authed]);

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "#000022" }}
      >
        <div
          className="w-full max-w-sm p-8 rounded-2xl space-y-6"
          style={{
            background: "rgba(10,0,40,0.9)",
            border: "1px solid rgba(102,0,102,0.6)",
            boxShadow: "0 0 40px rgba(102,0,102,0.3)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="text-center">
            <img src="/logo-sophia.png" alt="SophIA" className="w-16 h-16 mx-auto mb-4 object-contain" style={{ filter: "drop-shadow(0 0 12px rgba(102,0,102,0.8))" }} />
            <h1 className="font-display text-xl font-black text-white">
              Oráculo de Soph<span style={{ color: "#FFFF00" }}>IA</span>
            </h1>
            <p className="text-purple-400 text-sm mt-1">Painel Administrativo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-purple-400 mb-1 font-semibold uppercase tracking-widest">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={pwdInput}
                onChange={(e) => { setPwdInput(e.target.value); setPwdError(false); }}
                placeholder="••••••••••••••"
                autoFocus
                className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all"
                style={{
                  background: "rgba(102,0,102,0.1)",
                  border: pwdError ? "1px solid rgba(255,60,60,0.8)" : "1px solid rgba(102,0,102,0.5)",
                  caretColor: "#FFFF00",
                }}
              />
              {pwdError && (
                <p className="text-red-400 text-xs mt-1">Senha incorreta. Tente novamente.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-sm transition-all duration-200 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #660066, #990099)",
                color: "#fff",
                border: "1px solid rgba(255,255,0,0.2)",
              }}
            >
              Acessar Painel →
            </button>
          </form>

          <p className="text-center text-xs text-purple-600">
            <a href="/" className="hover:text-purple-400 transition-colors">← Voltar ao Portal</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: "#000022" }}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-sophia.png" alt="SophIA" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="font-display text-xl font-black text-white">
                Oráculo de Soph<span style={{ color: "#FFFF00" }}>IA</span>
              </h1>
              <p className="text-purple-400 text-xs">Painel · Leads de Investidores</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs text-purple-400 hover:text-purple-200 transition-colors"
            >
              ← Portal
            </a>
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: "rgba(102,0,102,0.2)",
                border: "1px solid rgba(102,0,102,0.4)",
                color: "#cc88cc",
              }}
            >
              Sair
            </button>
          </div>
        </div>

        <div
          className="p-4 rounded-xl flex items-center gap-4"
          style={{
            background: "rgba(102,0,102,0.1)",
            border: "1px solid rgba(102,0,102,0.3)",
          }}
        >
          <div className="text-center px-4">
            <div className="font-display text-3xl font-black" style={{ color: "#FFFF00" }}>
              {leads.length}
            </div>
            <div className="text-xs text-purple-400">Total de Leads</div>
          </div>
          <div className="w-px h-10 bg-purple-800" />
          <div className="text-center px-4">
            <div className="font-display text-3xl font-black text-white">
              {leads.filter((l) => {
                const d = new Date(l.createdAt);
                const now = new Date();
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              }).length}
            </div>
            <div className="text-xs text-purple-400">Este Mês</div>
          </div>
          <div className="w-px h-10 bg-purple-800" />
          <div className="text-center px-4">
            <div className="font-display text-3xl font-black text-white">
              {leads.filter((l) => {
                const d = new Date(l.createdAt);
                const now = new Date();
                return now.getTime() - d.getTime() < 7 * 24 * 60 * 60 * 1000;
              }).length}
            </div>
            <div className="text-xs text-purple-400">Últimos 7 Dias</div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-20 text-purple-400">Carregando leads...</div>
        )}
        {fetchError && (
          <div
            className="p-4 rounded-lg text-red-300 text-sm"
            style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.3)" }}
          >
            {fetchError}
          </div>
        )}

        {!loading && !fetchError && leads.length === 0 && (
          <div className="text-center py-20 text-purple-500">
            Nenhum lead recebido ainda.
          </div>
        )}

        {!loading && leads.length > 0 && (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(102,0,102,0.3)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(102,0,102,0.25)", borderBottom: "1px solid rgba(102,0,102,0.4)" }}>
                    {["Data", "Nome", "E-mail", "Empresa", "Interesse", ""].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-purple-300">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr
                      key={lead.id}
                      style={{
                        background: i % 2 === 0 ? "rgba(10,0,40,0.8)" : "rgba(20,0,50,0.7)",
                        borderBottom: "1px solid rgba(102,0,102,0.15)",
                      }}
                    >
                      <td className="px-4 py-3 text-purple-300 whitespace-nowrap text-xs">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-white font-medium">{lead.name}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-blue-400 hover:text-blue-200 transition-colors"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-purple-200">{lead.company}</td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: "rgba(102,0,102,0.3)",
                            border: "1px solid rgba(102,0,102,0.5)",
                            color: "#cc88ff",
                          }}
                        >
                          {lead.investmentInterest}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="text-xs px-3 py-1 rounded-lg transition-all hover:opacity-80"
                          style={{
                            background: "rgba(102,0,102,0.3)",
                            border: "1px solid rgba(102,0,102,0.5)",
                            color: "#FFFF00",
                          }}
                        >
                          Ver Mensagem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="w-full max-w-lg p-6 rounded-2xl space-y-4"
            style={{
              background: "rgba(10,0,40,0.98)",
              border: "1px solid rgba(102,0,102,0.7)",
              boxShadow: "0 0 40px rgba(102,0,102,0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-display font-bold text-lg text-white">{selectedLead.name}</div>
                <div className="text-xs text-purple-400 mt-0.5">{formatDate(selectedLead.createdAt)}</div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-purple-400 hover:text-white transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2"><span className="text-purple-400 w-20">E-mail:</span><a href={`mailto:${selectedLead.email}`} className="text-blue-400">{selectedLead.email}</a></div>
              <div className="flex gap-2"><span className="text-purple-400 w-20">Empresa:</span><span className="text-white">{selectedLead.company}</span></div>
              <div className="flex gap-2"><span className="text-purple-400 w-20">Interesse:</span><span className="text-yellow-300">{selectedLead.investmentInterest}</span></div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ background: "rgba(102,0,102,0.1)", border: "1px solid rgba(102,0,102,0.3)" }}
            >
              <div className="text-xs text-purple-400 uppercase tracking-wider mb-2">Mensagem</div>
              <p className="text-purple-100 text-sm leading-relaxed whitespace-pre-wrap">{selectedLead.message}</p>
            </div>
            <a
              href={`mailto:${selectedLead.email}?subject=Re: Oráculo de SophIA — Investor Contact`}
              className="block text-center py-2.5 rounded-lg font-bold text-sm transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #660066, #990099)",
                color: "#fff",
                border: "1px solid rgba(255,255,0,0.2)",
              }}
            >
              Responder por E-mail →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
