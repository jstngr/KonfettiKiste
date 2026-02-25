import { createContext, useContext, useState, type ReactNode } from "react";

export interface CartPackage {
  name: string;
  price: number;
  category: string;
}

export interface CartAddon {
  name: string;
  price: number;
}

interface PartyCartState {
  selectedPackage: CartPackage | null;
  addons: CartAddon[];
  photoBoothStandalone: boolean;
}

interface PartyCartContextType extends PartyCartState {
  setPackage: (pkg: CartPackage | null) => void;
  toggleAddon: (addon: CartAddon) => void;
  hasAddon: (name: string) => boolean;
  setPhotoBoothStandalone: (val: boolean) => void;
  removeAddon: (name: string) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
}

const PartyCartContext = createContext<PartyCartContextType | null>(null);

export const usePartyCart = () => {
  const ctx = useContext(PartyCartContext);
  if (!ctx) throw new Error("usePartyCart must be used within PartyCartProvider");
  return ctx;
};

export const PartyCartProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPackage, setSelectedPackage] = useState<CartPackage | null>(null);
  const [addons, setAddons] = useState<CartAddon[]>([]);
  const [photoBoothStandalone, setPhotoBoothStandaloneRaw] = useState(false);

  const setPhotoBoothStandalone = (val: boolean) => {
    setPhotoBoothStandaloneRaw(val);
    // Clear addons when deselecting photo booth standalone (if no package selected)
    if (!val && !selectedPackage) {
      setAddons([]);
    }
  };

  const setPackage = (pkg: CartPackage | null) => {
    setSelectedPackage(pkg);
    if (pkg) {
      setPhotoBoothStandalone(false);
    }
    // Clear addons when deselecting package (if no photo booth standalone)
    if (!pkg && !photoBoothStandalone) {
      setAddons([]);
    }
  };

  const toggleAddon = (addon: CartAddon) => {
    setAddons((prev) => {
      const exists = prev.find((a) => a.name === addon.name);
      if (exists) return prev.filter((a) => a.name !== addon.name);
      return [...prev, addon];
    });
  };

  const hasAddon = (name: string) => addons.some((a) => a.name === name);

  const removeAddon = (name: string) => {
    setAddons((prev) => prev.filter((a) => a.name !== name));
  };

  const clearCart = () => {
    setSelectedPackage(null);
    setAddons([]);
    setPhotoBoothStandalone(false);
  };

  const totalPrice =
    (selectedPackage?.price ?? 0) +
    addons.reduce((sum, a) => sum + a.price, 0) +
    (photoBoothStandalone ? 349 : 0);

  const itemCount =
    (selectedPackage ? 1 : 0) +
    addons.length +
    (photoBoothStandalone ? 1 : 0);

  return (
    <PartyCartContext.Provider
      value={{
        selectedPackage,
        addons,
        photoBoothStandalone,
        setPackage,
        toggleAddon,
        hasAddon,
        setPhotoBoothStandalone,
        removeAddon,
        clearCart,
        totalPrice,
        itemCount,
      }}
    >
      {children}
    </PartyCartContext.Provider>
  );
};
