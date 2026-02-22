import { useConsent } from "@/hooks/useConsent";
import { Button } from "./ui/button";

export function CookieBanner() {
  const { consent, accept, decline } = useConsent();

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg sm:p-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground flex-1">
          <p className="font-semibold text-foreground mb-1">Wir verwenden Cookies</p>
          Wir nutzen Cookies und ähnliche Technologien (wie Firebase Analytics), um unsere Website zu verbessern und die Nutzung zu analysieren.
          Bitte stimmen Sie der Verwendung zu, damit wir Ihnen das bestmögliche Erlebnis bieten können.
          Weitere Informationen finden Sie in unserer Datenschutzerklärung.
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={decline} className="w-full sm:w-auto">
            Nur notwendige
          </Button>
          <Button onClick={accept} className="w-full sm:w-auto">
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
