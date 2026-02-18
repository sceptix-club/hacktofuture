import { Info, Users, Lightbulb, Heart, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isTeamPage = location.pathname === "/team";

  const navItems = [
    { icon: Info, href: "#about", label: "About", route: "/about" },
    { icon: Users, href: "#team", label: "Team", route: "/team" },
    { icon: Lightbulb, href: "#themes", label: "Themes", route: "/themes" },
    { icon: Heart, href: "#sponsors", label: "Sponsors", route: null },
  ];

  return (
    <nav
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 ${
        className ?? ""
      }`}
    >
      <div
        className="relative bg-white px-6 py-3 flex items-center gap-6 h-full w-full"
        style={{
          border: "3px solid #000",
          borderRadius: "8px",
          boxShadow: "6px 6px 0px #000",
        }}
      >
        {/* Comic tail */}
        <div
          className="absolute -bottom-3.5 left-8 w-0 h-0"
          style={{
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "14px solid #000",
          }}
        />
        <div
          className="absolute -bottom-2.5 left-[34px] w-0 h-0"
          style={{
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "12px solid #FFF",
          }}
        />

        {/* Logo */}
        <a
          href="/"
          className="shrink-0"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
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
          <button
            key={item.label}
            onClick={() => {
              if (item.route) {
                navigate(item.route);
              } else if (item.href) {
                if (isTeamPage) {
                  navigate("/");
                }
              }
            }}
            className="group relative flex items-center justify-center w-10 h-10 rounded-md bg-black text-[#FFF] hover:bg-[#DA100C] hover:text-white transition-all duration-200 cursor-pointer"
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
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
