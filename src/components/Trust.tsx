import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Die Party war der absolute Wahnsinn! Die Kinder hatten so viel Spaß mit der Hüpfburg und der Zuckerwattemaschine. Absolut stressfrei für uns Eltern!",
    rating: 5,
  },
  {
    name: "Thomas K.",
    text: "Mini Festival gebucht und es war jeden Cent wert. Aufbau, Einweisung, Abbau – alles perfekt organisiert. Nächstes Jahr wieder!",
    rating: 5,
  },
  {
    name: "Lisa R.",
    text: "Wir hatten die Foam Party als Add-on und die Gäste reden heute noch davon. Einfach genial!",
    rating: 5,
  },
];

const Trust = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Das sagen<span className="text-gradient-party"> unsere Gäste</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Echte Erfahrungen von echten Familien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card rounded-2xl border p-8 relative"
            >
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
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm">
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
          <span>Brühl & Umgebung</span>
        </div>
      </div>
    </section>
  );
};

export default Trust;
