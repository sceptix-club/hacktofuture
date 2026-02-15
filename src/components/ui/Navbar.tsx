import { Info, Users, Lightbulb, Heart } from "lucide-react";

const Navbar = () => {
  const navItems = [
    { icon: Info, href: "#about", label: "About" },
    { icon: Users, href: "#team", label: "Team" },
    { icon: Lightbulb, href: "#themes", label: "Themes" },
    { icon: Heart, href: "#sponsors", label: "Sponsors" },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className="relative bg-white px-6 py-3 flex items-center gap-6"
        style={{
          border: "3px solid #000",
          borderRadius: "8px",
          boxShadow: "6px 6px 0px #000",
        }}
      >
        {/* Comic tail */}
        <div
          className="absolute -bottom-[14px] left-8 w-0 h-0"
          style={{
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "14px solid #000",
          }}
        />
        <div
          className="absolute -bottom-[10px] left-[34px] w-0 h-0"
          style={{
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "12px solid #FFF",
          }}
        />

        {/* Logo */}
        <a href="#" className="shrink-0">
          <div className="h-9 w-9 relative">
            <img
              src="/src/assets/logo_white.png"
              alt="Logo"
              className="object-cover h-full w-full drop-shadow-md"
              style={{ filter: "invert(1)" }}
            />
          </div>
        </a>

        {/* Divider */}
        <div className="w-[3px] h-8 bg-black rounded-full" />

        {/* Nav Icons */}
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group relative flex items-center justify-center w-10 h-10 rounded-md bg-black text-[#FFF] hover:bg-[#DA100C] hover:text-white transition-all duration-200"
            style={{
              border: "2px solid #000",
              boxShadow: "2px 2px 0px #000",
            }}
            title={item.label}
          >
            <item.icon size={20} strokeWidth={2.5} />
            {/* Tooltip */}
            <span
              className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold comic-sans px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
              style={{ border: "2px solid #FFF" }}
            >
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
