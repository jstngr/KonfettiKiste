import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Addon {
  name: string;
  price: number;
  description: string;
  emoji: string;
}

const addons: Addon[] = [
  { name: "Extra Hüpfburg-Stunde", price: 40, description: "Noch mehr Hüpfspaß!", emoji: "🏰" },
  { name: "Candy Bar", price: 35, description: "Süßigkeiten-Buffet mit Naschereien", emoji: "🍬" },
  { name: "Glitzer-Tattoos", price: 20, description: "Temporäre Tattoos für alle Kids", emoji: "✨" },
  { name: "Extra Popcorn-Nachfüllung", price: 10, description: "250g extra Popcorn-Mais", emoji: "🍿" },
  { name: "LED Partylicht-Set", price: 25, description: "Bunte Lichter für die Partyzone", emoji: "💡" },
  { name: "Pinata mit Füllung", price: 30, description: "Bunte Pinata inkl. Süßigkeiten", emoji: "🪅" },
];

const Addons = () => {
  const [selected, setSelected] = useState<Record<string, number>>({});

  const toggle = (name: string, delta: number) => {
    setSelected((prev) => {
      const current = prev[name] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: next };
    });
  };

  const total = Object.entries(selected).reduce(
    (sum, [name, qty]) => sum + (addons.find((a) => a.name === name)?.price || 0) * qty,
    0
  );

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
            const qty = selected[addon.name] || 0;
            return (
              <div
                key={addon.name}
                className={cn(
                  "bg-card rounded-xl border-2 p-5 transition-all duration-200",
                  qty > 0 ? "border-primary shadow-party" : "border-border hover:border-primary/30"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl mr-2">{addon.emoji}</span>
                    <span className="font-bold font-display text-lg">{addon.name}</span>
                  </div>
                  <span className="font-bold text-primary text-lg">{addon.price}€</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{addon.description}</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggle(addon.name, -1)}
                    className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-30"
                    disabled={qty === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-lg w-6 text-center">{qty}</span>
                  <button
                    onClick={() => toggle(addon.name, 1)}
                    className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
