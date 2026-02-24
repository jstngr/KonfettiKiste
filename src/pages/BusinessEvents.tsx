import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";

const includes = [
  "Fotobox Erlebnis",
  "Sofortdruck inklusive",
  "Digitale Galerie",
  "Premium Hintergrund",
  "Professionelle Beleuchtung",
];

const addons = [
  { name: "Individuelles Druckdesign mit Firmenlogo", price: 49 },
  { name: "Premium Hintergrund Auswahl", price: 79 },
  { name: "Zweiter Drucksatz (Branding Variante)", price: 49 },
];

const benefits = [
  "Stärken Sie Ihr Employer Branding",
  "Perfekt für Firmenfeiern, Messen & Team-Events",
  "Individuelles Branding auf allen Ausdrucken",
  "Professioneller Auf- und Abbau",
  "Digitale Galerie zum Teilen im Unternehmen",
];

const BusinessEvents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-lavender/10 rounded-full px-5 py-2 mb-6">
              <Building2 className="w-5 h-5 text-lavender" />
              <span className="text-sm font-semibold text-lavender">
                Für Unternehmen
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Business <span className="text-gradient-party">Events</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Machen Sie Ihr nächstes Firmenevent, Ihre Messe oder Team-Feier zu
              einem unvergesslichen Erlebnis mit der KonfettiKiste Business
              Experience.
            </p>
          </FadeIn>

          {/* Benefits */}
          <FadeIn delay={0.15}>
            <div className="bg-card rounded-3xl border-2 border-lavender/30 p-8 md:p-10 mb-12">
              <h2 className="text-2xl font-bold font-display mb-6">
                Warum KonfettiKiste für Ihr Event?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-lavender/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-lavender" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeIn direction="left" delay={0.2}>
              <div className="bg-card rounded-3xl border-2 border-border p-8 md:p-10">
                <h2 className="text-2xl font-bold font-display mb-2">
                  KonfettiKiste Business Experience
                </h2>
                <div className="mb-6">
                  <span className="text-5xl font-bold font-display text-gradient-party">
                    549€
                  </span>
                  <span className="text-muted-foreground ml-1 text-lg">ab</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className="w-full text-lg py-6 bg-gradient-party shadow-party hover:scale-[1.02] transition-transform"
                  asChild
                >
                  <Link to="/kontakt">Termin anfragen</Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.3}>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-secondary" />
                <h2 className="text-2xl font-bold font-display">
                  Business Add-ons
                </h2>
              </div>
              <div className="space-y-4">
                {addons.map((addon) => (
                  <div
                    key={addon.name}
                    className="bg-card rounded-2xl border-2 border-border p-5 flex items-center justify-between hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <span className="font-semibold">{addon.name}</span>
                    <span className="font-bold text-primary text-lg">
                      +{addon.price}€
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-muted/50 rounded-2xl p-6 text-center">
                <p className="text-muted-foreground mb-4">
                  Individuelle Anforderungen? Wir erstellen gerne ein
                  maßgeschneidertes Angebot.
                </p>
                <Button variant="outline" asChild className="rounded-xl">
                  <Link to="/kontakt">Kontakt aufnehmen</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessEvents;
