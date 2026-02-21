import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  CalendarIcon,
  Clock,
  MapPin,
  Send,
  Sparkles,
  FileText,
  Truck,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { calculateDeliveryFee, type DeliveryResult } from "@/lib/delivery";
import type { AddonSelection } from "@/pages/Index";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

interface BookingProps {
  selectedAddons: AddonSelection[];
  selectedPackage: string;
  onPackageChange: (pkg: string) => void;
}

const Booking = ({
  selectedAddons,
  selectedPackage,
  onPackageChange,
}: BookingProps) => {
  const [inquiryMode, setInquiryMode] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [street, setStreet] = useState("");
  const [plz, setPlz] = useState("");
  const [city, setCity] = useState("");
  const [differentBilling, setDifferentBilling] = useState(false);
  const [billingStreet, setBillingStreet] = useState("");
  const [billingPlz, setBillingPlz] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [deliveryResult, setDeliveryResult] = useState<DeliveryResult | null>(
    null,
  );
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [addressNotFound, setAddressNotFound] = useState(false);
  // Debounced delivery fee calculation
  const checkDelivery = useCallback(async (s: string, p: string, c: string) => {
    if (!s.trim() || !c.trim() || !/^\d{5}$/.test(p)) {
      setDeliveryResult(null);
      setAddressNotFound(false);
      return;
    }
    setDeliveryLoading(true);
    setAddressNotFound(false);
    const result = await calculateDeliveryFee(s, p, c);
    setDeliveryResult(result);
    setAddressNotFound(result === null);
    setDeliveryLoading(false);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => checkDelivery(street, plz, city), 800);
    return () => clearTimeout(timeout);
  }, [street, plz, city, checkDelivery]);

  const packagePrices: Record<string, number> = {
    basis: 89,
    spass: 149,
    premium: 249,
    vip: 399,
  };

  const deliveryFee = deliveryResult?.fee ?? 0;
  const extrasTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  const packagePrice = selectedPackage ? packagePrices[selectedPackage] : 0;
  const grandTotal = packagePrice + extrasTotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryMode) {
      if (!name || !email || !message.trim()) {
        toast.error("Bitte fülle Name, E-Mail und Nachricht aus.");
        return;
      }
      toast.success("Nachricht gesendet! Wir melden uns bei dir. 🎉");
      return;
    }
    if (!date || !time || !name || !email || !selectedPackage) {
      toast.error("Bitte fülle alle Pflichtfelder aus.");
      return;
    }
    if (deliveryResult?.tooFar) {
      toast.error("Die Adresse liegt leider außerhalb unseres Liefergebiets.");
      return;
    }
    toast.success("Anfrage gesendet! Wir melden uns bei dir. 🎉");
  };

  return (
    <section id="buchung" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Termin <span className="text-gradient-party">buchen</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wähle deinen Wunschtermin und wir kümmern uns um den Rest!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-party space-y-8"
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
                  : "bg-muted/40 text-muted-foreground hover:text-foreground",
              )}
            >
              🎉 Termin buchen
            </button>
            <button
              type="button"
              onClick={() => setInquiryMode(true)}
              className={cn(
                "flex-1 py-2.5 text-sm font-semibold transition-colors",
                inquiryMode
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground",
              )}
            >
              ✉️ Frage stellen
            </button>
          </div>

          {/* Section: Personal info */}
          <fieldset className="space-y-4">
            <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
              👤 Persönliche Daten
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-muted-foreground">
                  Name *
                </label>
                <Input
                  placeholder="Max Mustermann"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-muted-foreground">
                  E-Mail *
                </label>
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
              <label className="text-sm font-semibold text-muted-foreground">
                Telefon
              </label>
              <Input
                placeholder="+49 123 456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl h-11"
              />
            </div>
          </fieldset>

          {!inquiryMode && (
            <>
              {/* Section: Address */}
              <fieldset className="space-y-4">
                <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" /> Adresse
                </legend>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-muted-foreground">
                    Straße & Hausnummer *
                  </label>
                  <Input
                    placeholder="Musterstraße 12"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-muted-foreground">
                      PLZ *
                    </label>
                    <Input
                      placeholder="50321"
                      value={plz}
                      onChange={(e) => setPlz(e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-sm font-semibold text-muted-foreground">
                      Ort *
                    </label>
                    <Input
                      placeholder="Brühl"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Delivery distance info */}
              {deliveryLoading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Entfernung wird berechnet…
                </div>
              )}
              {!deliveryLoading && deliveryResult && (
                <div
                  className={cn(
                    "rounded-xl p-3 text-sm flex items-start gap-2",
                    deliveryResult.tooFar
                      ? "bg-destructive/10 text-destructive"
                      : deliveryResult.fee > 0
                        ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                        : "bg-green-500/10 text-green-600 dark:text-green-400",
                  )}
                >
                  {deliveryResult.tooFar ? (
                    <>
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>
                        Die Adresse liegt {deliveryResult.distanceKm} km entfernt –
                        leider außerhalb unseres Liefergebiets (max. 100 km).
                      </span>
                    </>
                  ) : deliveryResult.fee > 0 ? (
                    <>
                      <Truck className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>
                        {deliveryResult.distanceKm} km Entfernung – Liefergebühr:{" "}
                        <strong>{deliveryResult.fee}€</strong> (
                        {deliveryResult.distanceKm - 10} km × 5€)
                      </span>
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>
                        {deliveryResult.distanceKm} km Entfernung –{" "}
                        <strong>Kostenlose Lieferung!</strong> 🎉
                      </span>
                    </>
                  )}
                </div>
              )}
              {!deliveryLoading && addressNotFound && (
                <div className="rounded-xl p-3 text-sm flex items-start gap-2 bg-destructive/10 text-destructive">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    Adresse nicht gefunden. Bitte überprüfe deine Eingabe (Straße,
                    PLZ, Ort).
                  </span>
                </div>
              )}

              <div className="border-t border-border" />

              {/* Section: Different billing address */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={differentBilling}
                  onClick={() => setDifferentBilling(!differentBilling)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    differentBilling ? "bg-primary" : "bg-input",
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
                      differentBilling ? "translate-x-5" : "translate-x-0",
                    )}
                  />
                </button>
                <label
                  className="text-sm font-semibold text-muted-foreground cursor-pointer"
                  onClick={() => setDifferentBilling(!differentBilling)}
                >
                  Abweichende Rechnungsadresse
                </label>
              </div>

              {differentBilling && (
                <fieldset className="space-y-4 animate-in slide-in-from-top-2 fade-in duration-300">
                  <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-primary" /> Rechnungsadresse
                  </legend>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-muted-foreground">
                      Straße & Hausnummer *
                    </label>
                    <Input
                      placeholder="Musterstraße 12"
                      value={billingStreet}
                      onChange={(e) => setBillingStreet(e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-muted-foreground">
                        PLZ *
                      </label>
                      <Input
                        placeholder="50321"
                        value={billingPlz}
                        onChange={(e) => setBillingPlz(e.target.value)}
                        className="rounded-xl h-11"
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-sm font-semibold text-muted-foreground">
                        Ort *
                      </label>
                      <Input
                        placeholder="Brühl"
                        value={billingCity}
                        onChange={(e) => setBillingCity(e.target.value)}
                        className="rounded-xl h-11"
                      />
                    </div>
                  </div>
                </fieldset>
              )}

              <div className="border-t border-border" />

              {/* Section: Package & Date */}
              <fieldset className="space-y-4">
                <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
                  🎁 Paket & Termin
                </legend>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-muted-foreground">
                    Paket *
                  </label>
                  <Select value={selectedPackage} onValueChange={onPackageChange}>
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Paket auswählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basis">Basis – 89€</SelectItem>
                      <SelectItem value="spass">Spaß – 149€</SelectItem>
                      <SelectItem value="premium">Premium – 249€</SelectItem>
                      <SelectItem value="vip">VIP – 399€</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-muted-foreground flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" /> Datum *
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal rounded-xl h-11",
                            !date && "text-muted-foreground",
                          )}
                        >
                          {date
                            ? format(date, "PPP", { locale: de })
                            : "Datum wählen"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) => d < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Uhrzeit *
                    </label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="rounded-xl h-11">
                        <SelectValue placeholder="Uhrzeit wählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t} Uhr
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </fieldset>

              {/* Addon CTA if none selected */}
              {selectedAddons.length === 0 && (
                <>
                  <div className="border-t border-border" />
                  <div className="rounded-2xl border-2 border-dashed border-secondary/50 bg-secondary/10 p-5 flex flex-col items-center gap-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Noch keine Extras gewählt
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Hüpfburg, Popcorn & mehr – perfekt für jede Party!
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-secondary/60 hover:bg-secondary/20 hover:text-button w-full max-w-xs"
                      onClick={() =>
                        document
                          .getElementById("extras")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      Extras entdecken
                    </Button>
                  </div>
                </>
              )}

              {/* Order summary */}
              {selectedPackage && (
                <>
                  <div className="border-t border-border" />
                  <div className="space-y-3">
                    <h3 className="text-base font-bold font-display text-foreground flex items-center gap-2">
                      🧾 Zusammenfassung
                    </h3>
                    <div className="bg-muted/40 rounded-2xl p-5 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          📦 Paket:{" "}
                          {selectedPackage.charAt(0).toUpperCase() +
                            selectedPackage.slice(1)}
                        </span>
                        <span className="font-bold">{packagePrice}€</span>
                      </div>
                      {selectedAddons.map((addon) => (
                        <div
                          key={addon.name}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {addon.emoji} {addon.name}
                          </span>
                          <span className="font-bold">{addon.price}€</span>
                        </div>
                      ))}
                      {deliveryFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            🚚 Liefergebühr ({deliveryResult!.distanceKm} km)
                          </span>
                          <span className="font-bold">{deliveryFee}€</span>
                        </div>
                      )}
                      {deliveryResult &&
                        !deliveryResult.tooFar &&
                        deliveryFee === 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              🚚 Lieferung
                            </span>
                            <span className="font-bold text-primary">
                              Kostenlos
                            </span>
                          </div>
                        )}
                      <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold text-xl">
                        <span>Gesamt</span>
                        <span className="text-gradient-party">{grandTotal}€</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Message textarea */}
          <fieldset className="space-y-4">
            <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
              💬 Nachricht {inquiryMode && "*"}
            </legend>
            <Textarea
              placeholder={
                inquiryMode
                  ? "Deine Frage oder Nachricht…"
                  : "Besondere Wünsche, Anmerkungen… (optional)"
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl min-h-[100px]"
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
      </div>
    </section>
  );
};

export default Booking;
