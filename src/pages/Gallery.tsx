import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

const galleryCategories = [
  { label: "Photo Booth Setup", emoji: "📸" },
  { label: "Kinder & Photo Booth", emoji: "👧" },
  { label: "Ausdrucke", emoji: "🖼️" },
  { label: "Hintergründe", emoji: "🎨" },
  { label: "Party Atmosphäre", emoji: "🎉" },
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-5 py-2 mb-6">
              <Camera className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Impressionen</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Unsere <span className="text-gradient-party">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Einblicke in unvergessliche Momente – so sieht eine KonfettiKiste Party aus!
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {galleryCategories.map((cat) => (
              <div
                key={cat.label}
                className="bg-card rounded-full border-2 border-border px-5 py-2 text-sm font-semibold hover:border-primary/40 transition-colors cursor-pointer"
              >
                {cat.emoji} {cat.label}
              </div>
            ))}
          </div>

          {/* Placeholder grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed border-border"
              >
                <div className="text-center">
                  <span className="text-4xl block mb-2">📷</span>
                  <span className="text-sm text-muted-foreground">Bild {i + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Bilder werden in Kürze hinzugefügt. Folgen Sie uns auf Instagram für aktuelle Eindrücke!
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Möchten Sie Teil unserer <span className="text-gradient-party">Gallery</span> werden?
          </h2>
          <p className="text-muted-foreground mb-8">
            Buchen Sie jetzt Ihr Erlebnis und schaffen Sie Erinnerungen für die Ewigkeit.
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-6 bg-gradient-party shadow-party hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/kontakt">Termin anfragen</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
