import { useState, useEffect } from "react";
import { PartyPopper, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Photo Booth", href: "/photo-booth" },
  { label: "Party Pakete", href: "/party-pakete" },
  { label: "Add-ons", href: "/add-ons" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Business Events", href: "/business-events" },
  { label: "Kontakt", href: "/kontakt" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showSolid = scrolled || !isHome;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        showSolid ? "bg-card/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <PartyPopper className={cn("w-6 h-6", showSolid ? "text-primary" : "text-secondary")} />
          <span className={cn("text-xl font-bold font-display", showSolid ? "text-foreground" : "text-primary-foreground")}>
            Konfetti<span className="text-secondary">Kiste</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "font-semibold text-sm transition-colors hover:text-primary",
                location.pathname === item.href ? "text-primary" : showSolid ? "text-foreground" : "text-primary-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/kontakt"
            className="bg-gradient-party text-primary-foreground font-semibold text-sm px-5 py-2 rounded-full shadow-party hover:scale-105 transition-transform"
          >
            Termin anfragen
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden">
          {open ? (
            <X className={cn("w-6 h-6", showSolid ? "text-foreground" : "text-primary-foreground")} />
          ) : (
            <Menu className={cn("w-6 h-6", showSolid ? "text-foreground" : "text-primary-foreground")} />
          )}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block w-full text-left font-semibold hover:text-primary py-2",
                location.pathname === item.href ? "text-primary" : "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/kontakt"
            onClick={() => setOpen(false)}
            className="block w-full text-center mt-3 bg-gradient-party text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-full shadow-party"
          >
            Termin anfragen
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
