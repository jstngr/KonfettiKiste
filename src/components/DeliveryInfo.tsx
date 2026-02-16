import { MapPin, Truck, Info } from "lucide-react";

const DeliveryInfo = () => {
  return (
    <section className="py-24 px-4 bg-muted/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Liefer<span className="text-gradient-party">gebiet</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir liefern, bauen auf und holen wieder ab – ganz ohne Stress für euch!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl border-2 border-accent p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold font-display mb-2">Kostenlose Lieferung</h3>
            <p className="text-muted-foreground">
              Im Umkreis von <span className="font-bold text-accent">10 km</span> um Brühl liefern wir komplett kostenlos!
            </p>
          </div>

          <div className="bg-card rounded-2xl border-2 border-secondary p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold font-display mb-2">Erweiterte Lieferung</h3>
            <p className="text-muted-foreground">
              Über 10 km: <span className="font-bold text-secondary">10€ pro Kilometer</span> extra. Wir kommen bis zu 100 km weit!
            </p>
          </div>

          <div className="bg-card rounded-2xl border-2 border-primary p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold font-display mb-2">Rundum-Sorglos</h3>
            <p className="text-muted-foreground">
              Lieferung, Aufbau, Einweisung & Abbau – alles inklusive. Ihr feiert, wir kümmern uns!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
