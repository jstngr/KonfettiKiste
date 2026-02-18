import heroImage from "@/assets/hero-party.jpg";
import { Button } from "@/components/ui/button";
import { PartyPopper, ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToPackages = () => {
    document.getElementById("pakete")?.scrollIntoView({ behavior: "smooth" });
  };

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
          <PartyPopper className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Unvergessliche Kinderpartys in Brühl & Umgebung
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-primary-foreground drop-shadow-lg font-display">
          Konfetti<span className="text-secondary">Kiste</span>
        </h1>

        <p className="text-xl md:text-2xl mb-10 text-primary-foreground max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Wir bringen die Party zu euch! Hüpfburgen, Popcornmaschinen,
          Seifenblasen & mehr – für den besten Kindergeburtstag aller Zeiten.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-party shadow-party hover:scale-105 transition-transform"
            onClick={scrollToPackages}
          >
            Pakete entdecken
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-card/80 backdrop-blur-sm border-card hover:text-primary hover:bg-card/80 transition-all"
            onClick={() =>
              document
                .getElementById("buchung")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Jetzt buchen
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToPackages}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce text-primary-foreground/70 hover:text-primary-foreground transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
