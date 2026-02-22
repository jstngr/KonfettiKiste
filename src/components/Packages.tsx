import { Check, Star, Crown, Sparkles, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Package {
  name: string;
  price: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
  color: string;
}

const packages: Package[] = [
  {
    name: "Spark Party",
    price: "149",
    description: "Geburtstagsmagie in wenigen Minuten",
    icon: <Sparkles className="w-8 h-8" />,
    color: "bg-accent text-accent-foreground",
    features: [
      "JBL Musikbox",
      "Mini Disco Lichter",
      "Seifenblasenmaschine",
      "Bis zu 3 Stunden",
    ],
  },
  {
    name: "Sweet Fun Party",
    price: "249",
    description: "Tanzen, lachen und süße Momente",
    icon: <PartyPopper className="w-8 h-8" />,
    color: "bg-secondary text-secondary-foreground",
    features: [
      "JBL Musikbox",
      "Mini Disco Lichter",
      "Zuckerwattemaschine",
      "Popcornmaschine",
      "Bis zu 3 Stunden",
    ],
  },
  {
    name: "Mini Festival",
    price: "449",
    description: "Ein echtes Geburtstags-Event",
    icon: <Star className="w-8 h-8" />,
    color: "bg-coral text-coral-foreground",
    popular: true,
    features: [
      "Hüpfburg",
      "JBL Musikbox",
      "Mini Disco Lichter",
      "Popcornmaschine",
      "Bis zu 4 Stunden",
    ],
  },
  {
    name: "Ultimate Birthday",
    price: "699",
    description: "Das unvergessliche Geburtstags-Erlebnis",
    icon: <Crown className="w-8 h-8" />,
    color: "bg-lavender text-lavender-foreground",
    features: [
      "Hüpfburg",
      "Schaummaschine",
      "JBL Musikbox",
      "Mini Disco Lichter",
      "Nebelmaschine",
      "Zuckerwatte ODER Popcorn",
      "Bis zu 5 Stunden",
    ],
  },
];

interface PackagesProps {
  onBookPackage: (pkg: string) => void;
}

const Packages = ({ onBookPackage }: PackagesProps) => {
  return (
    <section id="pakete" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Unsere <span className="text-gradient-party">Erlebnisse</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von kleinen Feiern bis zu spektakulären Geburtstagen – wählt euer perfektes Erlebnis und erweitert es mit Extras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={cn(
                "relative bg-card rounded-2xl border-2 p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover",
                pkg.popular ? "border-primary shadow-party" : "border-border"
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-party text-primary-foreground text-sm font-bold px-4 py-1 rounded-full">
                  Beliebteste Wahl
                </div>
              )}

              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4", pkg.color)}>
                {pkg.icon}
              </div>

              <h3 className="text-2xl font-bold font-display mb-1">{pkg.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold font-display">{pkg.price}€</span>
                <span className="text-muted-foreground ml-1">/Event</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full",
                  pkg.popular
                    ? "bg-gradient-party shadow-party hover:scale-105 transition-transform"
                    : ""
                )}
                variant={pkg.popular ? "default" : "outline"}
                onClick={() => onBookPackage(pkg.name.toLowerCase().replace(/\s+/g, "-"))}
              >
                Jetzt buchen
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
