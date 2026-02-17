import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AddonSelection } from "@/pages/Index";

interface Addon {
  name: string;
  price: number;
  description: string;
  emoji: string;
}

interface AddonsProps {
  onSelectionChange: (addons: AddonSelection[]) => void;
}

const addons: Addon[] = [
  { name: "Extra Hüpfburg-Stunde", price: 40, description: "Noch mehr Hüpfspaß!", emoji: "🏰" },
  { name: "Candy Bar", price: 35, description: "Süßigkeiten-Buffet mit Naschereien", emoji: "🍬" },
  { name: "Glitzer-Tattoos", price: 20, description: "Temporäre Tattoos für alle Kids", emoji: "✨" },
  { name: "Extra Popcorn-Nachfüllung", price: 10, description: "250g extra Popcorn-Mais", emoji: "🍿" },
  { name: "LED Partylicht-Set", price: 25, description: "Bunte Lichter für die Partyzone", emoji: "💡" },
  { name: "Pinata mit Füllung", price: 30, description: "Bunte Pinata inkl. Süßigkeiten", emoji: "🪅" },
];

const Addons = ({ onSelectionChange }: AddonsProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const list = addons
      .filter((a) => selected.has(a.name))
      .map((a) => ({ name: a.name, price: a.price, emoji: a.emoji }));
    onSelectionChange(list);
  }, [selected, onSelectionChange]);

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const total = addons
    .filter((a) => selected.has(a.name))
    .reduce((sum, a) => sum + a.price, 0);

  return (
    <section id="extras" className="py-24 px-4 bg-muted/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Extras & <span className="text-gradient-party">Add-ons</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mach deine Party noch besonderer! Wähle aus unseren beliebten Extras.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addons.map((addon) => {
            const isSelected = selected.has(addon.name);
            return (
              <button
                key={addon.name}
                type="button"
                onClick={() => toggle(addon.name)}
                className={cn(
                  "bg-card rounded-xl border-2 p-5 transition-all duration-200 text-left relative cursor-pointer group",
                  isSelected
                    ? "border-primary shadow-party ring-2 ring-primary/20"
                    : "border-border hover:border-primary/40 hover:shadow-md"
                )}
              >
                {/* Checkbox indicator */}
                <div className={cn(
                  "absolute top-3 right-3 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200",
                  isSelected
                    ? "bg-primary border-primary"
                    : "border-muted-foreground/30 group-hover:border-primary/50"
                )}>
                  {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>
                <div className="flex items-start justify-between mb-3 pr-8">
                  <div>
                    <span className="text-2xl mr-2">{addon.emoji}</span>
                    <span className="font-bold font-display text-lg">{addon.name}</span>
                  </div>
                  <span className="font-bold text-primary text-lg">+{addon.price}€</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
                <span className={cn(
                  "text-xs font-semibold px-3 py-1 rounded-full transition-colors",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground group-hover:text-primary"
                )}>
                  {isSelected ? "✓ Ausgewählt" : "Auswählen"}
                </span>
              </button>
            );
          })}
        </div>

        {total > 0 && (
          <div className="mt-8 text-center bg-card rounded-xl border-2 border-primary p-4 shadow-party">
            <span className="text-muted-foreground">Extras gesamt: </span>
            <span className="text-2xl font-bold font-display text-primary">+{total}€</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Addons;
