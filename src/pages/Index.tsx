import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Addons from "@/components/Addons";
import Booking from "@/components/Booking";
import DeliveryInfo from "@/components/DeliveryInfo";
import Footer from "@/components/Footer";

export interface AddonSelection {
  name: string;
  price: number;
  qty: number;
  emoji: string;
}

const Index = () => {
  const [selectedAddons, setSelectedAddons] = useState<AddonSelection[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Packages />
      <Addons onSelectionChange={setSelectedAddons} />
      <div id="lieferung">
        <DeliveryInfo />
      </div>
      <Booking selectedAddons={selectedAddons} />
      <Footer />
    </div>
  );
};

export default Index;
