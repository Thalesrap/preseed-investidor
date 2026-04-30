import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import "./index.css";

const queryClient = new QueryClient();

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const pathname = window.location.pathname;
const isAnalytics = pathname === `${BASE}/analytics` || pathname === `${BASE}/analytics/`;

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    {isAnalytics ? <AnalyticsDashboard /> : <App />}
  </QueryClientProvider>
);
