import { useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon, Clock, MapPin, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { AddonSelection } from "@/pages/Index";

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

interface BookingProps {
  selectedAddons: AddonSelection[];
  selectedPackage: string;
  onPackageChange: (pkg: string) => void;
}

const Booking = ({ selectedAddons, selectedPackage, onPackageChange }: BookingProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [plz, setPlz] = useState("");
  const [city, setCity] = useState("");

  const packagePrices: Record<string, number> = {
    basis: 89, spass: 149, premium: 249, vip: 399,
  };

  const extrasTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  const packagePrice = selectedPackage ? packagePrices[selectedPackage] : 0;
  const grandTotal = packagePrice + extrasTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !name || !email || !selectedPackage) {
      toast.error("Bitte fülle alle Pflichtfelder aus.");
      return;
    }
    toast.success("Anfrage gesendet! Wir melden uns bald bei dir. 🎉");
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

        <form onSubmit={handleSubmit} className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-party space-y-8">
          {/* Section: Personal info */}
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

          <div className="border-t border-border" />

          {/* Section: Address */}
          <fieldset className="space-y-4">
            <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" /> Adresse
            </legend>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-muted-foreground">Straße & Hausnummer *</label>
              <Input placeholder="Musterstraße 12" value={street} onChange={(e) => setStreet(e.target.value)} className="rounded-xl h-11" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-muted-foreground">PLZ *</label>
                <Input placeholder="50321" value={plz} onChange={(e) => setPlz(e.target.value)} className="rounded-xl h-11" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className="text-sm font-semibold text-muted-foreground">Ort *</label>
                <Input placeholder="Brühl" value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl h-11" />
              </div>
            </div>
          </fieldset>

          <div className="border-t border-border" />

          {/* Section: Package & Date */}
          <fieldset className="space-y-4">
            <legend className="text-base font-bold font-display text-foreground flex items-center gap-2 mb-2">
              🎁 Paket & Termin
            </legend>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-muted-foreground">Paket *</label>
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
                      className={cn("w-full justify-start text-left font-normal rounded-xl h-11", !date && "text-muted-foreground")}
                    >
                      {date ? format(date, "PPP", { locale: de }) : "Datum wählen"}
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
                      <SelectItem key={t} value={t}>{t} Uhr</SelectItem>
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
                  <p className="font-semibold text-foreground text-sm">Noch keine Extras gewählt</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Hüpfburg, Popcorn & mehr – perfekt für jede Party!</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-secondary/60 hover:bg-secondary/20 w-full max-w-xs"
                  onClick={() => document.getElementById("extras")?.scrollIntoView({ behavior: "smooth" })}
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
                    <span className="text-muted-foreground">📦 Paket: {selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)}</span>
                    <span className="font-bold">{packagePrice}€</span>
                  </div>
                  {selectedAddons.map((addon) => (
                    <div key={addon.name} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{addon.emoji} {addon.name}</span>
                      <span className="font-bold">{addon.price}€</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold text-xl">
                    <span>Gesamt</span>
                    <span className="text-gradient-party">{grandTotal}€</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <Button type="submit" size="lg" className="w-full text-lg rounded-xl h-12 bg-gradient-party shadow-party hover:scale-[1.02] transition-transform">
            <Send className="w-5 h-5 mr-2" />
            Anfrage senden
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Booking;
