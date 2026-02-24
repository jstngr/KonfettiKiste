import { useState } from "react";
import { usePartyCart } from "@/context/PartyCartContext";
import { PartyPopper, X, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const PartyCartFloat = () => {
  const [open, setOpen] = useState(false);
  const {
    selectedPackage,
    addons,
    photoBoothStandalone,
    totalPrice,
    itemCount,
    setPackage,
    removeAddon,
    setPhotoBoothStandalone,
    clearCart,
  } = usePartyCart();

  if (itemCount === 0) return null;

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-gradient-party text-primary-foreground px-5 py-3.5 rounded-2xl shadow-party hover:shadow-card-hover transition-shadow"
        >
          <PartyPopper className="w-5 h-5" />
          <div className="text-left">
            <p className="text-xs font-medium opacity-90">Deine Party</p>
            <p className="text-sm font-bold">{totalPrice}€</p>
          </div>
          <span className="bg-white/20 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {itemCount}
          </span>
        </motion.button>
      </AnimatePresence>

      {/* Drawer */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-display flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-primary" />
                Deine Party
              </DrawerTitle>
              <DrawerClose asChild>
                <button className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="px-4 pb-2 space-y-3 overflow-y-auto flex-1">
            {/* Package */}
            {selectedPackage && (
              <CartItem
                label={selectedPackage.category}
                name={selectedPackage.name}
                price={selectedPackage.price}
                onRemove={() => setPackage(null)}
              />
            )}

            {/* Photo Booth standalone */}
            {photoBoothStandalone && (
              <CartItem
                label="Fotobox"
                name="Fotobox Erlebnis (Standalone)"
                price={349}
                onRemove={() => setPhotoBoothStandalone(false)}
              />
            )}

            {/* Addons */}
            {addons.map((addon) => (
              <CartItem
                key={addon.name}
                label="Add-on"
                name={addon.name}
                price={addon.price}
                onRemove={() => removeAddon(addon.name)}
              />
            ))}

            {/* Hinweis */}
            <p className="text-xs text-muted-foreground pt-2">
              Lieferkosten werden nach Eingabe Ihrer Adresse berechnet.
            </p>
          </div>

          <DrawerFooter>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Zwischensumme</span>
              <span className="text-2xl font-bold font-display text-gradient-party">
                {totalPrice}€
              </span>
            </div>
            <Button
              size="lg"
              className="w-full bg-gradient-party shadow-party hover:scale-[1.02] transition-transform text-lg"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link to="/kontakt">
                Termin anfragen
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <button
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors mt-1 flex items-center justify-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Auswahl leeren
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const CartItem = ({
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
  <div className="flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3">
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-semibold truncate">{name}</p>
    </div>
    <div className="flex items-center gap-3 shrink-0">
      <span className="font-bold text-primary">{price}€</span>
      <button
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default PartyCartFloat;
