import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackVisit } from "./lib/analytics";

import { CookieBanner } from "./components/CookieBanner";
import { useConsent } from "./hooks/useConsent";

import Index from "./pages/Index";
import PhotoBooth from "./pages/PhotoBooth";
import PartyPakete from "./pages/PartyPakete";
import AddonsPage from "./pages/AddonsPage";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BusinessEvents from "./pages/BusinessEvents";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const getBasename = () => {
  const base = import.meta.env.BASE_URL;
  if (base === "./" || base === "") return "/";
  return base;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
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
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/photo-booth" element={<PhotoBooth />} />
            <Route path="/party-pakete" element={<PartyPakete />} />
            <Route path="/add-ons" element={<AddonsPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/business-events" element={<BusinessEvents />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
