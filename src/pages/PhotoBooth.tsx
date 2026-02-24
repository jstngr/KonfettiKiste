import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Camera, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const includes = [
  "DSLR Kamera in Studioqualität",
  "Sofortdruck für Ihre Gäste während der gesamten Mietdauer inklusive",
  "Digitale Galerie aller Fotos",
  "Elegantes Setup mit Beleuchtung",
  "Intuitive Bedienung",
  "Lieferung und Aufbau optional",
];

const addons = [
  { name: "Premium Hintergrund", price: 79 },
  { name: "Premium Ballonbogen", price: 79 },
  { name: "Popcorn Maschine", price: 49 },
  { name: "Zuckerwatte Maschine", price: 59 },
  { name: "Individuelles Druckdesign", price: 49 },
];

const PhotoBooth = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Das <span className="text-gradient-party">Fotobox</span> Erlebnis
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Unsere professionelle Spiegelreflexkamera Fotobox sorgt für Spaß,
              Emotionen und unvergessliche Erinnerungen. Ihre Gäste können
              hochwertige Fotos aufnehmen und direkt Ausdrucke mit nach Hause
              nehmen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Includes */}
            <div className="bg-card rounded-3xl border-2 border-border p-8 md:p-10">
              <h2 className="text-2xl font-bold font-display mb-6">
                Inklusive Leistungen
              </h2>
              <ul className="space-y-4">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold font-display text-gradient-party">
                    349€
                  </span>
                  <span className="text-muted-foreground text-lg">ab</span>
                </div>
                <Button
                  size="lg"
                  className="w-full text-lg py-6 bg-gradient-party shadow-party hover:scale-[1.02] transition-transform"
                  asChild
                >
                  <Link to="/kontakt">Termin anfragen</Link>
                </Button>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-secondary" />
                <h2 className="text-2xl font-bold font-display">
                  Verfügbare Add-ons
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
                  Sie möchten die Fotobox als Teil eines Pakets? Entdecken Sie
                  unsere Party Pakete!
                </p>
                <Button variant="outline" asChild className="rounded-xl">
                  <Link to="/party-pakete">Party Pakete ansehen</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Bereit für unvergessliche{" "}
            <span className="text-gradient-party">Erinnerungen</span>?
          </h2>
          <p className="text-muted-foreground mb-8">
            Sichern Sie sich jetzt Ihren Wunschtermin für die Fotobox.
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

export default PhotoBooth;
