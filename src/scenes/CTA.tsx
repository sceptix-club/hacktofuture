import { forwardRef } from "react";
import Button from "../components/ui/Button";

type CTAProps = {
  title?: string;
  body?: string;
  buttonText?: string;
};

const handleRedirect = () => {
  window.open(
    "https://unstop.com/hackathons/hacktofuture-40-st-joseph-engineering-college-vamanjoor-1654291",
    "_blank"
  );
};

const ComicDots = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`absolute rounded-full ${className ?? ""}`}
    style={{
      backgroundImage:
        "radial-gradient(circle, currentColor 2px, transparent 2px)",
      backgroundSize: "8px 8px",
      ...style,
    }}
  />
);


const CTA = forwardRef<HTMLDivElement, CTAProps>(
  (
    {
      title = "READY TO BUILD THE FUTURE?",
      body = "Join HackToFuture 4.0 and turn your wildest ideas into real products. Limited seats. Big energy.",
      buttonText = "Register Now",
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden"
        style={{
          // DO NOT use contain:strict or willChange here on mount —
          // Chrome allocates a GPU layer immediately for any fixed element
          // with those properties, even if translateY(100%) off-screen.
          // GSAP will set transform/opacity/visibility imperatively.
          transform: "translateY(100%)",
          opacity: 0,
        }}
      >
     

        <ComicDots
          style={{
            top: "5%",
            right: "5%",
            width: 120,
            height: 120,
            color: "rgba(255,200,0,0.08)",
          }}
        />
        <ComicDots
          style={{
            bottom: "8%",
            left: "5%",
            width: 100,
            height: 100,
            color: "rgba(100,200,255,0.08)",
          }}
        />

        {/* ── Corner panel frames ── */}
        <div className="absolute top-4 left-4 w-40 h-24 md:w-68 md:h-36 comic-panel-border rounded-sm pointer-events-none" />
        <div className="absolute top-4 right-4 w-20 h-32 md:w-28 md:h-44 comic-panel-border rounded-sm pointer-events-none" />

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 max-w-[85vw] text-center">
          <div
            style={{
              maxWidth: "min(85vw, 900px)",
              margin: "0 auto",
              padding: "1.5rem 2rem 1.75rem",
              background: `url("data:image/svg+xml;utf8,<svg width='100' height='100' transform='rotate(25)' opacity='0.15' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23250E17'><circle cx='25' cy='25' r='8'/><circle cx='75' cy='75' r='8'/><circle cx='75' cy='25' r='8'/><circle cx='25' cy='75' r='8'/></g></svg>"), #fff`,
              backgroundSize: "16px 16px, 100% 100%",
              border: "0.35rem solid #000",
              position: "relative",
              boxShadow: "6px 6px 0 #000",
            }}
          >
            <h2
              className="hero-title font-bold relative"
              style={{
                fontSize: "clamp(1.6rem, 5.5vw, 3.25rem)",
                color: "#111",
                textShadow: "3px 3px 0 rgba(0,0,0,0.12)",
                letterSpacing: "0.05em",
              }}
            >
              {title}
            </h2>

            <p
              className="comic-sans mt-4"
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
                color: "#333",
                lineHeight: 1.55,
              }}
            >
              {body}
            </p>

            <div className="mt-7 flex flex-col items-center gap-3">
              <Button
                className="hover:cursor-pointer font-bold tracking-wide comic-sans"
                style={{
                  background: "#FFE105",
                  color: "#000",
                  border: "0.25rem solid #000",
                  boxShadow: "4px 4px 0 #000",
                  fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
                  padding: "12px 32px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translate(-2px,-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "6px 6px 0 #000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translate(0,0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "4px 4px 0 #000";
                }}
                onClick={handleRedirect}
              >
                {buttonText}
              </Button>

              <div
                className="absolute -bottom-2 -right-3 bg-black text-white px-2 md:px-3 py-1 font-bold text-xs tracking-wider border-2 border-white"
                style={{
                  fontFamily: "comic-sans",
                  transform: "rotate(-2deg)",
                  fontSize: "clamp(0.55rem, 1vw, 0.75rem)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                ▸ FREE REGISTRATION ▸ 36 HOURS ▸ INFINITE CHAOS ▸
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CTA.displayName = "CTA";
export default CTA;
