import { Info, Users, Lightbulb, Heart, LogIn, BookText } from "lucide-react";
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
    { icon: Heart, href: "#sponsors", label: "Sponsors", route: "/sponsors" },
    { icon: BookText, href: "/rulebook.pdf", label: "Rulebook", route: "/rulebook.pdf" },
    { icon: LogIn, href: "https://unstop.com/", label: "UnStop", route: null },
  ];

  return (
    <nav
      className={`fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-[60] ${
        className ?? ""
      }`}
    >
      <div
        className="relative bg-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 flex items-center justify-center gap-2 sm:gap-3 md:gap-6"
        style={{
          border: "3px solid #000",
          borderRadius: "8px",
          boxShadow: "4px 4px 0px #000",
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
          className="shrink-0 flex items-center justify-center"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <div className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 relative">
            <img
              src="/src/assets/logo_white.png"
              alt="Logo"
              className="object-cover h-full w-full drop-shadow-md"
              style={{ filter: "invert(1)" }}
            />
          </div>
        </a>

        {/* Divider */}
        <div className="w-[2px] sm:w-[3px] h-6 sm:h-7 md:h-8 bg-black rounded-full shrink-0" />

        {/* Nav Icons */}
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              if (item.route) {
                navigate(item.route);
              } else if (item.href) {
                window.open(item.href, "_blank");
                if (isTeamPage) {
                  navigate("/");
                }
              }
            }}
            className="group relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md bg-black text-[#FFF] hover:bg-[#DA100C] hover:text-white transition-all duration-200 cursor-pointer active:translate-y-0.5 shrink-0"
            style={{
              border: "2px solid #000",
              boxShadow: "2px 2px 0px #000",
            }}
            title={item.label}
          >
            <item.icon 
              className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5"
              strokeWidth={2.5} 
            />
            {/* Tooltip - hidden on mobile, visible on hover for desktop */}
            <span
              className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold comic-sans px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
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