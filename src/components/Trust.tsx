import { Star, Quote } from "lucide-react";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Die Fotobox war das absolute Highlight! Die Kinder hatten so viel Spaß und die Ausdrucke sind wunderschöne Erinnerungen.",
    rating: 5,
  },
  {
    name: "Thomas K.",
    text: "Konfetti Party gebucht und es war perfekt organisiert. Die Fotobox mit Sofortdruck hat alle begeistert. Nächstes Jahr wieder!",
    rating: 5,
  },
  {
    name: "Lisa R.",
    text: "Tolles Business-Event mit der KonfettiKiste Fotobox. Professionell, hochwertig und unsere Mitarbeiter reden heute noch davon!",
    rating: 5,
  },
];

const Trust = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Das sagen<span className="text-gradient-party"> unsere Gäste</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Echte Erfahrungen von echten Familien.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {testimonials.map((t) => (
            <StaggerItem
              key={t.name}
            >
              <div className="bg-card rounded-2xl border p-8 relative h-full">
                <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t.text}
                </p>
                <p className="font-bold font-display">{t.name}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm" delay={0.2}>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-secondary text-secondary"
                />
              ))}
            </div>
            <span className="font-semibold">5.0 auf Google</span>
          </div>
          <span className="hidden md:inline text-muted-foreground/30">|</span>
          <span>100+ glückliche Gäste</span>
          <span className="hidden md:inline text-muted-foreground/30">|</span>
          <span>Köln, Brühl & Umgebung</span>
        </FadeIn>
      </div>
    </section>
  );
};

export default Trust;
