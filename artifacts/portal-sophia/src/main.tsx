import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import OracleAdmin from "./pages/OracleAdmin";
import "./index.css";

const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
if (apiUrl) setBaseUrl(apiUrl);

const queryClient = new QueryClient();

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const pathname = window.location.pathname;
const isAnalytics = pathname === `${BASE}/analytics` || pathname === `${BASE}/analytics/`;
const isOracle = pathname === `${BASE}/oraculo` || pathname === `${BASE}/oraculo/`;

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    {isAnalytics ? <AnalyticsDashboard /> : isOracle ? <OracleAdmin /> : <App />}
  </QueryClientProvider>
);
