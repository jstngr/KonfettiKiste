import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const addons = [
  {
    name: "Photo Booth Erlebnis",
    price: 199,
    emoji: "📸",
    description: "Professionelle DSLR Photo Booth mit Sofortdruck – Spaß und Erinnerungen für Ihre Gäste.",
  },
  {
    name: "Premium Ballonbogen",
    price: 79,
    emoji: "🎈",
    description: "Ein eleganter Ballonbogen als atemberaubender Hingucker für Fotos und Dekoration.",
  },
  {
    name: "Premium Hintergrund",
    price: 79,
    emoji: "🖼️",
    description: "Stilvoller Hintergrund für perfekte Erinnerungsfotos mit professionellem Look.",
  },
  {
    name: "Popcorn Maschine",
    price: 49,
    emoji: "🍿",
    description: "Frisches Popcorn – der Duft allein sorgt schon für gute Laune bei Groß und Klein.",
  },
  {
    name: "Zuckerwatte Maschine",
    price: 59,
    emoji: "🍭",
    description: "Fluffige, süße Zuckerwatte – ein magisches Erlebnis für kleine und große Naschkatzen.",
  },
  {
    name: "Konfetti Party Set",
    price: 29,
    emoji: "🎊",
    description: "Buntes Konfetti-Set für den perfekten Party-Moment voller Farbe und Freude.",
  },
  {
    name: "Individuelles Druckdesign",
    price: 49,
    emoji: "🎨",
    description: "Personalisiertes Fotodesign mit Ihrem Namen, Logo oder Motto auf jedem Ausdruck.",
  },
];

const AddonsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm font-semibold text-secondary-foreground">Premium Extras</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Zusätzliche <span className="text-gradient-party">Highlights</span> für Ihre Feier
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Machen Sie Ihre Feier noch besonderer mit unseren handverlesenen Premium Add-ons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="bg-card rounded-2xl border-2 border-border p-6 hover:border-primary/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="text-4xl mb-4">{addon.emoji}</div>
                <h3 className="text-xl font-bold font-display mb-2">{addon.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{addon.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-display text-primary">+{addon.price}€</span>
                  <Button variant="outline" size="sm" asChild className="rounded-xl">
                    <Link to="/kontakt">Anfragen</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Add-ons mit einem Paket kombinieren?
          </h2>
          <p className="text-muted-foreground mb-8">
            Entdecken Sie unsere Party Pakete und fügen Sie Ihre Lieblings-Extras hinzu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-party shadow-party hover:scale-105 transition-transform" asChild>
              <Link to="/party-pakete">Party Pakete ansehen</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/kontakt">Termin anfragen</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AddonsPage;
