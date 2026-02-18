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
    name: "Basis",
    price: "89",
    description: "Ein toller Start für kleine Feiern",
    icon: <PartyPopper className="w-8 h-8" />,
    color: "bg-accent text-accent-foreground",
    features: [
      "Seifenblasenmaschine",
      "Partydekoration (Ballons & Girlanden)",
      "Kindgerechtes Geschirr-Set",
      "Partymusik-Playlist (Bluetooth-Box)",
      "Auf- & Abbau inklusive",
    ],
  },
  {
    name: "Spaß",
    price: "149",
    description: "Mehr Action, mehr Freude",
    icon: <Sparkles className="w-8 h-8" />,
    color: "bg-secondary text-secondary-foreground",
    features: [
      "Alles aus dem Basis-Paket",
      "Popcornmaschine mit Zutaten",
      "Musikbox mit Partylichtern",
      "Kinderspiele-Set (Sackhüpfen & Co.)",
      "2 Stunden Mietdauer",
    ],
  },
  {
    name: "Premium",
    price: "249",
    description: "Das volle Party-Erlebnis",
    icon: <Star className="w-8 h-8" />,
    color: "bg-coral text-coral-foreground",
    popular: true,
    features: [
      "Alles aus dem Spaß-Paket",
      "Hüpfburg (3x3m)",
      "Zuckerwattemaschine",
      "Profi-Fotobox mit Requisiten",
      "3 Stunden Mietdauer",
    ],
  },
  {
    name: "VIP",
    price: "399",
    description: "Die ultimative Traumparty",
    icon: <Crown className="w-8 h-8" />,
    color: "bg-lavender text-lavender-foreground",
    features: [
      "Alles aus dem Premium-Paket",
      "XXL Hüpfburg mit Rutsche",
      "Slush-Eis-Maschine",
      "Kinderschminken-Set",
      "Persönlicher Party-Betreuer",
      "4 Stunden Mietdauer",
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
            Unsere <span className="text-gradient-party">Pakete</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von klein bis groß – wähle das perfekte Paket für euren Kindergeburtstag.
            Jedes Paket kann mit Extras erweitert werden!
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
                onClick={() => onBookPackage(pkg.name.toLowerCase())}
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
