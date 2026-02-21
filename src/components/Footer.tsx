import { PartyPopper, Mail, Phone, MapPin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PartyPopper className="w-6 h-6 text-secondary" />
              <span className="text-2xl font-bold font-display">
                Konfetti<span className="text-secondary">Kiste</span>
              </span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Wir machen Partys unvergesslich! Equipment, Erlebnisse & jede Menge Spaß –
              direkt zu euch nach Hause geliefert.
            </p>
          </div>

          <div>
            <h4 className="font-bold font-display text-lg mb-4">Kontakt</h4>
            <ul className="space-y-3 text-background/70 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                hallo@konfettikiste.de
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary" />
                +49 2232 123456
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                50321 Brühl, NRW
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-display text-lg mb-4">Folge uns</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-background/50 text-xs mt-6">
              © {new Date().getFullYear()} KonfettiKiste. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
