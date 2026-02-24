import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Sparkles, Star, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { usePartyCart, type CartPackage } from "@/context/PartyCartContext";

interface PackageData {
  name: string;
  price: number;
  includes: string[];
  addons: { name: string; price: number }[];
  popular?: boolean;
}

const indoorPackages: PackageData[] = [
  {
    name: "KonfettiKiste Mini Disco",
    price: 179,
    includes: ["Party Lautsprecher", "Disco Beleuchtung", "Ballon Dekoration Set", "Konfetti Party Set"],
    addons: [
      { name: "Fotobox Erlebnis", price: 199 },
      { name: "Premium Ballonbogen", price: 79 },
      { name: "Popcorn Maschine", price: 49 },
      { name: "Zuckerwatte Maschine", price: 59 },
      { name: "Premium Hintergrund", price: 79 },
    ],
  },
  {
    name: "KonfettiKiste Konfetti Party",
    price: 349,
    popular: true,
    includes: ["Fotobox Erlebnis", "Sofortdruck inklusive", "Digitale Galerie", "Party Beleuchtung", "Ballon Dekoration"],
    addons: [
      { name: "Premium Hintergrund", price: 79 },
      { name: "Premium Ballonbogen", price: 79 },
      { name: "Popcorn Maschine", price: 49 },
      { name: "Zuckerwatte Maschine", price: 59 },
    ],
  },
  {
    name: "KonfettiKiste Celebration",
    price: 449,
    includes: ["Fotobox Erlebnis", "Sofortdruck inklusive", "Digitale Galerie", "Premium Hintergrund", "Party Beleuchtung", "Premium Ballon Dekoration"],
    addons: [
      { name: "Premium Ballonbogen", price: 79 },
      { name: "Popcorn Maschine", price: 49 },
      { name: "Zuckerwatte Maschine", price: 59 },
    ],
  },
];

const summerPackages: PackageData[] = [
  {
    name: "KonfettiKiste Garden Disco",
    price: 229,
    includes: ["Lautsprecher", "Disco Beleuchtung", "Ballon Dekoration", "Konfetti Set"],
    addons: [
      { name: "Fotobox Erlebnis", price: 199 },
      { name: "Premium Ballonbogen", price: 79 },
      { name: "Popcorn Maschine", price: 49 },
      { name: "Zuckerwatte Maschine", price: 59 },
    ],
  },
  {
    name: "KonfettiKiste Konfetti Fest",
    price: 449,
    includes: ["Fotobox Erlebnis", "Sofortdruck inklusive", "Digitale Galerie", "Premium Hintergrund", "Party Beleuchtung", "Ballon Dekoration"],
    addons: [
      { name: "Premium Ballonbogen", price: 79 },
      { name: "Popcorn Maschine", price: 49 },
      { name: "Zuckerwatte Maschine", price: 59 },
    ],
  },
  {
    name: "KonfettiKiste Garden Festival",
    price: 599,
    includes: ["Fotobox Erlebnis", "Sofortdruck inklusive", "Digitale Galerie", "Premium Hintergrund", "Premium Ballon Dekoration", "Party Beleuchtung"],
    addons: [
      { name: "Popcorn Maschine", price: 49 },
      { name: "Zuckerwatte Maschine", price: 59 },
      { name: "Premium Ballonbogen", price: 79 },
    ],
  },
];

const nightPackages: PackageData[] = [
  {
    name: "KonfettiKiste Night Experience",
    price: 399,
    includes: ["Fotobox Erlebnis", "Sofortdruck inklusive", "Digitale Galerie", "Premium Hintergrund", "Disco Beleuchtung"],
    addons: [
      { name: "Premium Ballonbogen", price: 79 },
      { name: "Individuelles Druckdesign", price: 49 },
      { name: "Konfetti Set", price: 29 },
    ],
  },
];

const businessPackages: PackageData[] = [
  {
    name: "KonfettiKiste Business Experience",
    price: 549,
    includes: ["Fotobox Erlebnis", "Sofortdruck inklusive", "Digitale Galerie", "Premium Hintergrund", "Professionelle Beleuchtung"],
    addons: [
      { name: "Individuelles Druckdesign mit Firmenlogo", price: 49 },
      { name: "Premium Hintergrund Auswahl", price: 79 },
      { name: "Zweiter Drucksatz (Branding Variante)", price: 49 },
    ],
  },
];

const PackageCard = ({ pkg, category }: { pkg: PackageData; category: string }) => {
  const { selectedPackage, setPackage, toggleAddon, hasAddon } = usePartyCart();
  const isSelected = selectedPackage?.name === pkg.name;

  const handleSelect = () => {
    if (isSelected) {
      setPackage(null);
    } else {
      setPackage({ name: pkg.name, price: pkg.price, category });
    }
  };

  return (
    <div
      className={cn(
        "bg-card rounded-2xl border-2 p-6 md:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover relative",
        isSelected ? "border-primary shadow-party ring-2 ring-primary/20" : pkg.popular ? "border-primary shadow-party" : "border-border",
      )}
    >
      {pkg.popular && !isSelected && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-gradient-party text-primary-foreground text-sm font-bold px-4 py-1 rounded-full flex items-center gap-1 whitespace-nowrap shadow-md">
          <Star className="w-3.5 h-3.5" /> Bestseller
        </div>
      )}
      {isSelected && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-accent text-accent-foreground text-sm font-bold px-4 py-1 rounded-full flex items-center gap-1 whitespace-nowrap shadow-md">
          <CheckCircle2 className="w-3.5 h-3.5" /> Ausgewählt
        </div>
      )}

      <h3 className="text-xl md:text-2xl font-bold font-display mb-2">{pkg.name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold font-display text-gradient-party">{pkg.price}€</span>
        <span className="text-muted-foreground ml-1">ab</span>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Inklusive</h4>
        <ul className="space-y-2.5">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 flex-1">
        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Add-ons
        </h4>
        <ul className="space-y-2">
          {pkg.addons.map((addon) => {
            const addonSelected = hasAddon(addon.name);
            return (
              <li
                key={addon.name}
                className={cn(
                  "flex items-center justify-between text-sm rounded-lg px-2 py-1.5 -mx-2 cursor-pointer transition-colors",
                  addonSelected ? "bg-accent/10" : "hover:bg-muted/50",
                )}
                onClick={() => isSelected && toggleAddon(addon)}
              >
                <span className={cn("text-muted-foreground", addonSelected && "text-foreground font-medium")}>
                  {addonSelected && <Check className="w-3 h-3 inline mr-1 text-accent" />}
                  {addon.name}
                </span>
                <span className="font-semibold text-primary">+{addon.price}€</span>
              </li>
            );
          })}
        </ul>
        {!isSelected && (
          <p className="text-[11px] text-muted-foreground mt-2 italic">
            Paket wählen, um Add-ons hinzuzufügen
          </p>
        )}
      </div>

      <Button
        className={cn(
          "w-full",
          isSelected
            ? "bg-accent text-accent-foreground hover:bg-accent/90"
            : pkg.popular
            ? "bg-gradient-party shadow-party hover:scale-105 transition-transform"
            : "",
        )}
        variant={isSelected ? "default" : pkg.popular ? "default" : "outline"}
        onClick={handleSelect}
      >
        {isSelected ? (
          <>
            <CheckCircle2 className="w-4 h-4 mr-1" /> Ausgewählt
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-1" /> Paket wählen
          </>
        )}
      </Button>
    </div>
  );
};

const PackageGrid = ({ packages, category }: { packages: PackageData[]; category: string }) => (
  <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.12}>
    {packages.map((pkg) => (
      <StaggerItem key={pkg.name}>
        <PackageCard pkg={pkg} category={category} />
      </StaggerItem>
    ))}
  </StaggerContainer>
);

const PartyPakete = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Unsere <span className="text-gradient-party">Party Pakete</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Von der kleinen Disco bis zum großen Festival – wählen Sie das perfekte Paket für Ihre Feier.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Tabs defaultValue="indoor" className="w-full">
              <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 h-auto p-1.5 bg-muted rounded-xl mb-12">
                <TabsTrigger value="indoor" className="rounded-lg py-2.5 text-sm font-semibold data-[state=active]:bg-gradient-party data-[state=active]:text-primary-foreground">
                  🏠 Indoor
                </TabsTrigger>
                <TabsTrigger value="summer" className="rounded-lg py-2.5 text-sm font-semibold data-[state=active]:bg-gradient-party data-[state=active]:text-primary-foreground">
                  ☀️ Summer
                </TabsTrigger>
                <TabsTrigger value="night" className="rounded-lg py-2.5 text-sm font-semibold data-[state=active]:bg-gradient-party data-[state=active]:text-primary-foreground">
                  🌙 Night Party
                </TabsTrigger>
                <TabsTrigger value="business" className="rounded-lg py-2.5 text-sm font-semibold data-[state=active]:bg-gradient-party data-[state=active]:text-primary-foreground">
                  💼 Business
                </TabsTrigger>
              </TabsList>

              <TabsContent value="indoor">
                <PackageGrid packages={indoorPackages} category="Indoor Paket" />
              </TabsContent>
              <TabsContent value="summer">
                <PackageGrid packages={summerPackages} category="Summer Paket" />
              </TabsContent>
              <TabsContent value="night">
                <PackageGrid packages={nightPackages} category="Night Party Paket" />
              </TabsContent>
              <TabsContent value="business">
                <PackageGrid packages={businessPackages} category="Business Paket" />
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-muted/50">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Nicht sicher, welches Paket passt?
          </h2>
          <p className="text-muted-foreground mb-8">
            Kontaktieren Sie uns – wir beraten Sie gerne und finden das perfekte Paket für Ihre Feier.
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-6 bg-gradient-party shadow-party hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/kontakt">Termin anfragen</Link>
          </Button>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
};

export default PartyPakete;
