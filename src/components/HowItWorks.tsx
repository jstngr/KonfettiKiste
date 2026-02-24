import { Search, Sparkles, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Erlebnis wählen",
    description:
      "Wählen Sie Ihre Fotobox, ein Party Paket oder beides – ganz nach Ihren Wünschen.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Extras hinzufügen",
    description:
      "Ballonbogen, Popcorn, Zuckerwatte – machen Sie Ihre Feier noch besonderer.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: <PartyPopper className="w-8 h-8" />,
    title: "Feiern & Genießen",
    description:
      "Wir liefern, bauen auf und kümmern uns um alles. Sie genießen einfach die Party!",
    color: "bg-coral/10 text-coral",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-muted/50">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            So <span className="text-gradient-party">funktioniert's</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In nur 3 Schritten zur perfekten Party – einfacher geht's nicht.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {steps.map((step, i) => (
            <StaggerItem key={step.title} className="text-center">
              <div className="relative inline-block mb-6">
                <div
                  className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mx-auto`}
                >
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold font-display mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="text-center mt-12" delay={0.3}>
          <Button
            size="lg"
            className="bg-gradient-party shadow-party hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/kontakt">Termin anfragen</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default HowItWorks;
