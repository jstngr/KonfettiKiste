import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { trackVisit } from "./lib/analytics";

import { CookieBanner } from "./components/CookieBanner";
import { useConsent } from "./hooks/useConsent";

const queryClient = new QueryClient();

// Get the correct basename for React Router
// If Vite's base is relative (e.g., "./"), React Router will fail to match URLs if we pass it directly.
// In that case, we default to "/" or the actual subfolder if needed.
const getBasename = () => {
  const base = import.meta.env.BASE_URL;
  if (base === "./" || base === "") {
    // In GH pages with custom domain, we are at the root
    return "/";
  }
  return base;
};

const App = () => {
  const { consent } = useConsent();

  useEffect(() => {
    if (consent === true) {
      trackVisit();
    }
  }, [consent]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CookieBanner />
        <BrowserRouter basename={getBasename()}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
