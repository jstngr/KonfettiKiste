import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Addons from "@/components/Addons";
import Booking from "@/components/Booking";
import DeliveryInfo from "@/components/DeliveryInfo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Packages />
      <Addons />
      <div id="lieferung">
        <DeliveryInfo />
      </div>
      <Booking />
      <Footer />
    </div>
  );
};

export default Index;
