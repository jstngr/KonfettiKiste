import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, Phone, Mail, MapPin, Truck, PartyPopper, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import FadeIn from "@/components/animations/FadeIn";
import { usePartyCart } from "@/context/PartyCartContext";
import { calculateDeliveryFee, type DeliveryResult } from "@/lib/delivery";

const Contact = () => {
  const cart = usePartyCart();
  const hasCartItems = cart.itemCount > 0;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");

  // Address
  const [street, setStreet] = useState("");
  const [plz, setPlz] = useState("");
  const [city, setCity] = useState("");

  // Billing
  const [differentBilling, setDifferentBilling] = useState(false);
  const [billingName, setBillingName] = useState("");
  const [billingStreet, setBillingStreet] = useState("");
  const [billingPlz, setBillingPlz] = useState("");
  const [billingCity, setBillingCity] = useState("");

  // Delivery
  const [delivery, setDelivery] = useState<DeliveryResult | null>(null);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");

  // Calculate delivery when address changes
  useEffect(() => {
    if (!street || !plz || !city || plz.length !== 5) {
      setDelivery(null);
      setDeliveryError("");
      return;
    }

    const timeout = setTimeout(async () => {
      setDeliveryLoading(true);
      setDeliveryError("");
      const result = await calculateDeliveryFee(street, plz, city);
      setDeliveryLoading(false);
      if (!result) {
        setDeliveryError("Adresse konnte nicht gefunden werden.");
        setDelivery(null);
      } else if (result.tooFar) {
        setDeliveryError(`Die Entfernung (${result.distanceKm} km) liegt leider außerhalb unseres Liefergebiets (max. 100 km).`);
        setDelivery(null);
      } else {
        setDelivery(result);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [street, plz, city]);

  const grandTotal = cart.totalPrice + (delivery?.fee ?? 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message.trim()) {
      toast.error("Bitte füllen Sie Name, E-Mail und Nachricht aus.");
      return;
    }
    if (hasCartItems && (!street || !plz || !city)) {
      toast.error("Bitte geben Sie eine Lieferadresse ein.");
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
            {/* Left sidebar */}
            <FadeIn direction="left" delay={0.1}>
              <div className="space-y-6">
                {/* Cart Summary */}
                {hasCartItems && (
                  <div className="bg-card rounded-2xl border-2 border-primary/30 p-6 shadow-party">
                    <h3 className="font-bold font-display text-lg mb-4 flex items-center gap-2">
                      <PartyPopper className="w-5 h-5 text-primary" />
                      Deine Party
                    </h3>
                    <div className="space-y-3">
                      {cart.selectedPackage && (
                        <CartLine
                          label={cart.selectedPackage.category}
                          name={cart.selectedPackage.name}
                          price={cart.selectedPackage.price}
                          onRemove={() => cart.setPackage(null)}
                        />
                      )}
                      {cart.photoBoothStandalone && (
                        <CartLine
                          label="Fotobox"
                          name="Fotobox Erlebnis"
                          price={349}
                          onRemove={() => cart.setPhotoBoothStandalone(false)}
                        />
                      )}
                      {cart.addons.map((a) => (
                        <CartLine
                          key={a.name}
                          label="Add-on"
                          name={a.name}
                          price={a.price}
                          onRemove={() => cart.removeAddon(a.name)}
                        />
                      ))}

                      <div className="border-t border-border pt-3 mt-3 space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Zwischensumme</span>
                          <span className="font-semibold">{cart.totalPrice}€</span>
                        </div>
                        {delivery && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Truck className="w-3.5 h-3.5" />
                              Lieferung ({delivery.distanceKm} km)
                            </span>
                            <span className={cn("font-semibold", delivery.fee === 0 ? "text-accent" : "text-foreground")}>
                              {delivery.fee === 0 ? "Kostenlos" : `${delivery.fee}€`}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-lg font-bold pt-1">
                          <span>Gesamt</span>
                          <span className="text-gradient-party">{grandTotal}€</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Info */}
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

                {/* WhatsApp */}
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
                {/* Personal info */}
                <fieldset className="space-y-4">
                  <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
                    👤 Persönliche Daten
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-muted-foreground">Name *</label>
                      <Input placeholder="Max Mustermann" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-muted-foreground">E-Mail *</label>
                      <Input type="email" placeholder="max@beispiel.de" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl h-11" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-muted-foreground">Telefon</label>
                    <Input placeholder="+49 123 456789" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl h-11" />
                  </div>
                </fieldset>

                {/* Event Details */}
                <fieldset className="space-y-4">
                  <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
                    🎁 Event Details
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-muted-foreground">Art des Events</label>
                      <Input placeholder="z.B. Kindergeburtstag, Firmenfeier..." value={eventType} onChange={(e) => setEventType(e.target.value)} className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-muted-foreground">Wunschtermin</label>
                      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl h-11" />
                    </div>
                  </div>
                </fieldset>

                {/* Delivery Address */}
                <fieldset className="space-y-4">
                  <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
                    📍 Lieferadresse {hasCartItems && "*"}
                  </legend>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-muted-foreground">Straße & Hausnr.</label>
                    <Input placeholder="Musterstraße 1" value={street} onChange={(e) => setStreet(e.target.value)} className="rounded-xl h-11" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-muted-foreground">PLZ</label>
                      <Input
                        placeholder="50321"
                        value={plz}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                          setPlz(val);
                        }}
                        className="rounded-xl h-11"
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-muted-foreground">Ort</label>
                      <Input placeholder="Brühl" value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl h-11" />
                    </div>
                  </div>

                  {/* Delivery status */}
                  {deliveryLoading && (
                    <p className="text-sm text-muted-foreground animate-pulse">Lieferkosten werden berechnet…</p>
                  )}
                  {deliveryError && (
                    <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-2">{deliveryError}</p>
                  )}
                  {delivery && (
                    <div className={cn(
                      "text-sm rounded-xl px-4 py-2 flex items-center gap-2",
                      delivery.fee === 0 ? "bg-accent/10 text-accent" : "bg-secondary/10 text-secondary-foreground",
                    )}>
                      <Truck className="w-4 h-4 shrink-0" />
                      {delivery.fee === 0
                        ? `Kostenlose Lieferung (${delivery.distanceKm} km – im 10 km Radius)`
                        : `Liefergebühr: ${delivery.fee}€ (${delivery.distanceKm} km, ${delivery.distanceKm - 10} km × 5€/km)`}
                    </div>
                  )}
                </fieldset>

                {/* Billing Address */}
                <div>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setDifferentBilling(!differentBilling)}
                  >
                    {differentBilling ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    Abweichende Rechnungsadresse
                  </button>

                  {differentBilling && (
                    <fieldset className="space-y-4 mt-4 pl-4 border-l-2 border-border">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-muted-foreground">Rechnungsname</label>
                        <Input placeholder="Firma / Name" value={billingName} onChange={(e) => setBillingName(e.target.value)} className="rounded-xl h-11" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-muted-foreground">Straße & Hausnr.</label>
                        <Input placeholder="Musterstraße 1" value={billingStreet} onChange={(e) => setBillingStreet(e.target.value)} className="rounded-xl h-11" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-muted-foreground">PLZ</label>
                          <Input
                            placeholder="50321"
                            value={billingPlz}
                            onChange={(e) => setBillingPlz(e.target.value.replace(/\D/g, "").slice(0, 5))}
                            className="rounded-xl h-11"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-muted-foreground">Ort</label>
                          <Input placeholder="Köln" value={billingCity} onChange={(e) => setBillingCity(e.target.value)} className="rounded-xl h-11" />
                        </div>
                      </div>
                    </fieldset>
                  )}
                </div>

                {/* Message */}
                <fieldset className="space-y-4">
                  <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
                    💬 Nachricht *
                  </legend>
                  <Textarea
                    placeholder="Erzählen Sie uns von Ihrer geplanten Feier – Gästeanzahl, besondere Wünsche…"
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
                  Anfrage senden
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

const CartLine = ({
  label,
  name,
  price,
  onRemove,
}: {
  label: string;
  name: string;
  price: number;
  onRemove: () => void;
}) => (
  <div className="flex items-center justify-between text-sm">
    <div className="min-w-0 flex-1">
      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{label}</p>
      <p className="font-semibold truncate">{name}</p>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <span className="font-bold text-primary">{price}€</span>
      <button onClick={onRemove} className="text-muted-foreground hover:text-destructive transition-colors">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

export default Contact;
