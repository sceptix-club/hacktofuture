import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Themes", href: "#themes" },
    { name: "Sponsors", href: "#sponsors" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-6`}
    >
      <div
        className={`bg-black/80 backdrop-blur-md mx-auto max-w-7xl rounded-full py-3 px-6 transition-all duration-300 ${
          isScrolled ? "w-full sm:w-fit px-10" : "w-full"
        }`}
      >
        <div className="flex items-center gap-8">
          {/* Left: Logo */}
          <div className="shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="h-10 w-10 z-10 relative">
              <img
                src="/src/assets/logo_white.png"
                alt="Logo"
                className="object-cover h-full w-full"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center ml-3 mr-3 space-x-8 comic-sans">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm font-bold tracking-wide transition-colors duration-200 relative group"
              >
                {link.name}
                {/* Underline hover effect */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFE105] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 ml-auto">
            <button className="px-5 py-2 text-sm comic-sans font-bold text-white bg-[#DA100C] rounded-lg hover:bg-red-700 transition-all duration-300">
              Rulebook
            </button>
            <button className="px-5 py-2 text-sm font-bold comic-sans text-white bg-[#50BAEA] rounded-lg hover:bg-blue-400 transition-all duration-300">
              Register
            </button>
          </div>

          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-[#FFE105] text-lg font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
            <button className="w-full px-5 py-3 text-center font-bold text-white bg-[#DA1005] rounded-lg hover:bg-red-700 transition-all">
              Rulebook
            </button>
            <button className="w-full px-5 py-3 text-center font-bold text-white bg-[#50BAEA] rounded-lg hover:bg-blue-400 transition-all">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
