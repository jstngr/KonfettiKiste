import heroImage from "@/assets/hero-party.jpg";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary-foreground drop-shadow-lg font-display leading-tight">
          Unvergessliche Party-Erlebnisse für Kindergeburtstage und private Feiern
        </h1>

        <p className="text-lg md:text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Mit der KonfettiKiste Photo Booth und liebevoll gestalteten Party Paketen wird Ihre Feier zu einem echten Highlight.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-party shadow-party hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/photo-booth">Photo Booth entdecken</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-card/80 backdrop-blur-sm border-card hover:text-primary hover:bg-card/80 transition-all"
            asChild
          >
            <Link to="/party-pakete">Party Pakete ansehen</Link>
          </Button>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-party hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/kontakt">Termin anfragen</Link>
          </Button>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce text-primary-foreground/70 hover:text-primary-foreground transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
