import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { trackVisit } from "./lib/analytics";
import heroImage from "@/assets/hero-party.jpg";
import { CookieBanner } from "./components/CookieBanner";
import { useConsent } from "./hooks/useConsent";
import { PartyCartProvider } from "./context/PartyCartContext";
import PartyCartFloat from "./components/PartyCartFloat";

import Index from "./pages/Index";
import PhotoBooth from "./pages/PhotoBooth";
import PartyPakete from "./pages/PartyPakete";
import AddonsPage from "./pages/AddonsPage";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BusinessEvents from "./pages/BusinessEvents";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Button } from "./components/ui/button";

const queryClient = new QueryClient();

const getBasename = () => {
  const base = import.meta.env.BASE_URL;
  if (base === "./" || base === "") return "/";
  return base;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const { consent } = useConsent();
  const [showProduction] = useState(
    () => localStorage.getItem("konfettikiste-production") === "true",
  );
  const [clickCount, setClickCount] = useState(0);

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      localStorage.setItem("konfettikiste-production", "true");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (consent === true) {
      trackVisit();
    }
  }, [consent]);

  if (!showProduction && window.location.origin.includes("konfettikiste.com")) {
    return (
      <div className="min-h-dvh bg-background">
        <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/65 to-background" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-5 py-2 mb-8 shadow-party">
              <span className="text-sm font-semibold text-foreground">
                🎉 Party-Erlebnisse in Köln, Brühl & Umgebung
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-primary-foreground drop-shadow-lg font-display cursor-pointer"
              onClick={handleTitleClick}
            >
              Konfetti<span className="text-secondary">Kiste</span>
            </h1>

            <p className="text-lg md:text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Wir stecken mitten in den Vorbereitungen – bald geht's los!
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PartyCartProvider>
          <Toaster />
          <Sonner />
          <CookieBanner />
          <BrowserRouter basename={getBasename()}>
            <ScrollToTop />
            <PartyCartFloat />
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
        </PartyCartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
