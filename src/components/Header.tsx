import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Diensten", path: "/diensten" },
    { name: "Projecten", path: "/projecten" },
    { name: "Over Ons", path: "/over-ons" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="font-display text-2xl text-primary-foreground font-bold">T</span>
            </div>
            <span className="font-display text-2xl tracking-wider text-foreground">
              TITAN<span className="text-primary">BREKERS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium uppercase tracking-wider text-sm transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+31612345678" className="flex items-center gap-2 text-primary font-semibold">
              <Phone className="w-5 h-5" />
              <span>06-12345678</span>
            </a>
            <Link to="/contact" className="btn-power text-sm py-3 px-6">
              Offerte Aanvragen
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium uppercase tracking-wider text-lg transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:+31612345678" className="flex items-center gap-2 text-primary font-semibold mt-4">
              <Phone className="w-5 h-5" />
              <span>06-12345678</span>
            </a>
            <Link to="/contact" className="btn-power text-center mt-2" onClick={() => setIsMenuOpen(false)}>
              Offerte Aanvragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
