import { useState, useEffect } from "react";
import { PartyPopper, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Pakete", href: "#pakete" },
  { label: "Extras", href: "#extras" },
  { label: "Lieferung", href: "#lieferung" },
  { label: "Buchen", href: "#buchung" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-card/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
          <PartyPopper className={cn("w-6 h-6", scrolled ? "text-primary" : "text-secondary")} />
          <span className={cn("text-xl font-bold font-display", scrolled ? "text-foreground" : "text-primary-foreground")}>
            Konfetti<span className="text-secondary">Kiste</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className={cn(
                "font-semibold text-sm transition-colors hover:text-primary",
                scrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? (
            <X className={cn("w-6 h-6", scrolled ? "text-foreground" : "text-primary-foreground")} />
          ) : (
            <Menu className={cn("w-6 h-6", scrolled ? "text-foreground" : "text-primary-foreground")} />
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="block w-full text-left font-semibold text-foreground hover:text-primary py-2"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
