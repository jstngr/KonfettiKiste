import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import FadeIn from "@/components/animations/FadeIn";

const Contact = () => {
  const [inquiryMode, setInquiryMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message.trim()) {
      toast.error("Bitte füllen Sie Name, E-Mail und Nachricht aus.");
      return;
    }
    toast.success("Anfrage gesendet! Wir melden uns bei Ihnen. 🎉");
  };

  const whatsappNumber = "4922321234567";
  const whatsappMessage = encodeURIComponent("Hallo KonfettiKiste! Ich interessiere mich für eine Buchung. 🎉");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Termin <span className="text-gradient-party">anfragen</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schreiben Sie uns oder rufen Sie an – wir freuen uns auf Ihre Anfrage!
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <FadeIn direction="left" delay={0.1}>
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-card rounded-2xl border-2 border-border p-6">
                  <h3 className="font-bold font-display text-lg mb-4">Kontaktdaten</h3>
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">E-Mail</p>
                        <p className="font-semibold">hallo@konfettikiste.de</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Telefon</p>
                        <p className="font-semibold">+49 2232 123456</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Standort</p>
                        <p className="font-semibold">Köln / Brühl, NRW</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[hsl(142,70%,45%)] text-white rounded-2xl p-5 hover:scale-[1.02] transition-transform shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Auf WhatsApp schreiben</p>
                    <p className="text-white/80 text-sm">Schnelle Antwort garantiert!</p>
                  </div>
                </a>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn direction="right" delay={0.2} className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-party space-y-6"
              >
                {/* Mode toggle */}
                <div className="flex rounded-xl border border-border overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setInquiryMode(false)}
                    className={cn(
                      "flex-1 py-2.5 text-sm font-semibold transition-colors",
                      !inquiryMode
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/40 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    🎉 Termin anfragen
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryMode(true)}
                    className={cn(
                      "flex-1 py-2.5 text-sm font-semibold transition-colors",
                      inquiryMode
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/40 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    ✉️ Frage stellen
                  </button>
                </div>

                {/* Personal info */}
                <fieldset className="space-y-4">
                  <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
                    👤 Persönliche Daten
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-muted-foreground">Name *</label>
                      <Input
                        placeholder="Max Mustermann"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-xl h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-muted-foreground">E-Mail *</label>
                      <Input
                        type="email"
                        placeholder="max@beispiel.de"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-muted-foreground">Telefon</label>
                    <Input
                      placeholder="+49 123 456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                </fieldset>

                {!inquiryMode && (
                  <fieldset className="space-y-4">
                    <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
                      🎁 Event Details
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-muted-foreground">Art des Events</label>
                        <Input
                          placeholder="z.B. Kindergeburtstag, Firmenfeier..."
                          value={eventType}
                          onChange={(e) => setEventType(e.target.value)}
                          className="rounded-xl h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-muted-foreground">Wunschtermin</label>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="rounded-xl h-11"
                        />
                      </div>
                    </div>
                  </fieldset>
                )}

                {/* Message */}
                <fieldset className="space-y-4">
                  <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
                    💬 Nachricht *
                  </legend>
                  <Textarea
                    placeholder={
                      inquiryMode
                        ? "Ihre Frage oder Nachricht…"
                        : "Erzählen Sie uns von Ihrer geplanten Feier – Paket, Gästeanzahl, besondere Wünsche…"
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-xl min-h-[120px]"
                  />
                </fieldset>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg rounded-xl h-12 bg-gradient-party shadow-party hover:scale-[1.02] transition-transform"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {inquiryMode ? "Nachricht senden" : "Anfrage senden"}
                </Button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
