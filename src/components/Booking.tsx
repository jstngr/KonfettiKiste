import { useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon, Clock, MapPin, Send } from "lucide-react";
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
}

const Booking = ({ selectedAddons }: BookingProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [plz, setPlz] = useState("");
  const [city, setCity] = useState("");
  const [pkg, setPkg] = useState<string>();

  const packagePrices: Record<string, number> = {
    basis: 89, spass: 149, premium: 249, vip: 399,
  };

  const extrasTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  const packagePrice = pkg ? packagePrices[pkg] : 0;
  const grandTotal = packagePrice + extrasTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !name || !email || !pkg) {
      toast.error("Bitte fülle alle Pflichtfelder aus.");
      return;
    }
    toast.success("Anfrage gesendet! Wir melden uns bald bei dir. 🎉");
  };

  return (
    <section id="buchung" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Termin <span className="text-gradient-party">buchen</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wähle deinen Wunschtermin und wir kümmern uns um den Rest!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border-2 border-border p-8 shadow-party space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Name *</label>
              <Input placeholder="Max Mustermann" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">E-Mail *</label>
              <Input type="email" placeholder="max@beispiel.de" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Straße & Hausnummer *</label>
            <Input placeholder="Musterstraße 12" value={street} onChange={(e) => setStreet(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">PLZ *</label>
              <Input placeholder="50321" value={plz} onChange={(e) => setPlz(e.target.value)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold">Ort *</label>
              <Input placeholder="Brühl" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Telefon</label>
              <Input placeholder="+49 123 456789" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Paket *</label>
            <Select value={pkg} onValueChange={setPkg}>
              <SelectTrigger>
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
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" /> Datum *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
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

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-1">
                <Clock className="w-4 h-4" /> Uhrzeit *
              </label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
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

          {/* Order summary */}
          {pkg && (
            <div className="space-y-2">
              <label className="text-sm font-semibold">Zusammenfassung</label>
              <div className="bg-muted/50 rounded-lg p-4 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>📦 Paket: {pkg.charAt(0).toUpperCase() + pkg.slice(1)}</span>
                  <span className="font-semibold">{packagePrice}€</span>
                </div>
                {selectedAddons.map((addon) => (
                  <div key={addon.name} className="flex justify-between text-sm">
                    <span>{addon.emoji} {addon.name}</span>
                    <span className="font-semibold">{addon.price}€</span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Gesamtsumme</span>
                  <span className="text-primary">{grandTotal}€</span>
                </div>
              </div>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full text-lg bg-gradient-party shadow-party hover:scale-[1.02] transition-transform">
            <Send className="w-5 h-5 mr-2" />
            Anfrage senden
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Booking;
