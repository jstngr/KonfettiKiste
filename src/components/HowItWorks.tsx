import { PartyPopper, Sparkles, Heart } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Erlebnis wählen",
    description: "Wählt das Paket, das perfekt zu eurer Party passt.",
    icon: PartyPopper,
  },
  {
    number: "2",
    title: "Extras hinzufügen",
    description:
      "Erweitert eure Party mit besonderen Highlights und individuellen Add-ons.",
    icon: Sparkles,
  },
  {
    number: "3",
    title: "Feiern",
    description: "Wir bringen den Spaß – ihr genießt den Moment.",
    icon: Heart,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            So funktioniert<span className="text-gradient-party"> es</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In nur drei Schritten zur unvergesslichen Party.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-9 h-9 text-primary" />
              </div>
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-6xl font-bold text-primary/10 font-display pointer-events-none select-none">
                {step.number}
              </span>
              <h3 className="text-xl font-bold font-display mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
