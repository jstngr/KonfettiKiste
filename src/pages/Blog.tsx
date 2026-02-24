import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

const blogPosts = [
  {
    title: "10 Ideen für einen unvergesslichen Kindergeburtstag",
    excerpt:
      "Von der Fotobox bis zur Zuckerwatte – so wird der nächste Geburtstag zum Highlight für alle Kinder.",
    category: "Kindergeburtstag",
    date: "15. Februar 2026",
  },
  {
    title: "Fotobox vs. Selfie-Station: Was lohnt sich wirklich?",
    excerpt:
      "Warum eine professionelle DSLR Fotobox mehr ist als nur ein Foto-Automat – und wie sie Ihre Feier aufwertet.",
    category: "Fotobox",
    date: "8. Februar 2026",
  },
  {
    title: "Die perfekte Gartenparty im Sommer planen",
    excerpt:
      "Tipps und Tricks für eine unvergessliche Outdoor-Feier mit Kindern – inkl. Checkliste zum Download.",
    category: "Sommer Party",
    date: "1. Februar 2026",
  },
  {
    title: "Warum Unternehmen auf Fotoboxs setzen",
    excerpt:
      "Team-Events, Messen und Firmenfeiern – wie Fotoboxs das Employer Branding stärken.",
    category: "Business",
    date: "25. Januar 2026",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-lavender/10 rounded-full px-5 py-2 mb-6">
              <BookOpen className="w-5 h-5 text-lavender" />
              <span className="text-sm font-semibold text-lavender">Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Inspiration für{" "}
              <span className="text-gradient-party">Kindergeburtstage</span> und
              Feiern
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tipps, Ideen und Inspiration rund um unvergessliche Partys und
              Events.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.12}>
            {blogPosts.map((post) => (
              <StaggerItem key={post.title}>
                <article className="bg-card rounded-2xl border-2 border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <span className="text-5xl">📝</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.date}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <Button
                      variant="ghost"
                      className="text-primary font-semibold px-0 hover:bg-transparent hover:text-primary/80"
                    >
                      Weiterlesen →
                    </Button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="text-center mt-12" delay={0.3}>
            <p className="text-muted-foreground">
              Weitere Artikel folgen in Kürze. Bleiben Sie gespannt!
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-muted/50">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Inspiriert? Lassen Sie uns Ihre{" "}
            <span className="text-gradient-party">Party</span> planen!
          </h2>
          <p className="text-muted-foreground mb-8">
            Kontaktieren Sie uns und wir machen Ihre Feier zu einem
            unvergesslichen Erlebnis.
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-6 bg-gradient-party shadow-party hover:scale-105 transition-transform"
            asChild
          >
            <Link to="/kontakt">Termin anfragen</Link>
          </Button>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
