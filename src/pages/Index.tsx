import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Camera, PartyPopper, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Highlights Section */}
      <section id="highlights" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Unsere <span className="text-gradient-party">Erlebnisse</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Von der professionellen Fotobox bis zum komplett organisierten
              Partypaket – wir machen Ihre Feier unvergesslich.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl border-2 border-border p-8 text-center hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">Fotobox</h3>
              <p className="text-muted-foreground mb-6">
                Professionelle DSLR Fotobox mit Sofortdruck – das Highlight
                jeder Feier.
              </p>
              <p className="text-2xl font-bold font-display text-primary mb-4">
                Ab 349€
              </p>
              <Button
                asChild
                className="w-full group-hover:bg-gradient-party transition-all"
              >
                <Link to="/photo-booth">
                  Mehr erfahren <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="bg-card rounded-2xl border-2 border-border p-8 text-center hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-coral/20 transition-colors">
                <PartyPopper className="w-8 h-8 text-coral" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">
                Party Pakete
              </h3>
              <p className="text-muted-foreground mb-6">
                Komplett-Pakete für Indoor, Sommer, Nacht und Business Events.
              </p>
              <p className="text-2xl font-bold font-display text-primary mb-4">
                Ab 179€
              </p>
              <Button asChild className="w-full">
                <Link to="/party-pakete">
                  Pakete ansehen <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="bg-card rounded-2xl border-2 border-border p-8 text-center hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">Add-ons</h3>
              <p className="text-muted-foreground mb-6">
                Premium Extras wie Ballonbogen, Popcorn & Zuckerwatte für noch
                mehr Spaß.
              </p>
              <p className="text-2xl font-bold font-display text-primary mb-4">
                Ab 29€
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
              >
                <Link to="/add-ons">
                  Add-ons entdecken <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Trust />

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Bereit für eine{" "}
            <span className="text-gradient-party">unvergessliche</span> Feier?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Kontaktieren Sie uns jetzt und lassen Sie uns gemeinsam Ihre
            perfekte Party planen.
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

export default Index;
