import { forwardRef, useMemo } from "react";
import Button from "../components/ui/Button";

type CTAProps = {
  title?: string;
  body?: string;
  buttonText?: string;
};

/* ── tiny SVG helpers (inline, no extra files) ── */

const Starburst = ({
  size,
  className,
  style,
}: {
  size: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    style={style}
  >
    <polygon
      points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
      fill="currentColor"
    />
  </svg>
);

const Lightning = ({
  size,
  className,
  style,
}: {
  size: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size * 1.6}
    viewBox="0 0 60 96"
    className={className}
    style={style}
  >
    <polygon
      points="38,0 12,42 28,42 8,96 52,38 34,38 56,0"
      fill="currentColor"
    />
  </svg>
);

const Explosion = ({
  size,
  className,
  style,
}: {
  size: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    className={className}
    style={style}
  >
    <path
      d="M60,5 L68,38 L95,15 L78,45 L115,50 L82,62 L110,88 L72,72 L68,110 L55,75 L30,105 L42,68 L5,72 L38,55 L8,30 L45,42 L40,8 L55,40 Z"
      fill="currentColor"
    />
  </svg>
);

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


/* ── Speed lines ── */
const SpeedLines = () => {
  const lines = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        top: `${5 + (i / 18) * 90}%`,
        width: `${30 + Math.random() * 50}%`,
        left: `${Math.random() * 20}%`,
        height: Math.random() > 0.5 ? 2 : 1,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <>
      {lines.map((l, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: l.top,
            left: l.left,
            width: l.width,
            height: l.height,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            animation: `speed-lines-pulse ${2.5 + Math.random() * 2}s ease-in-out ${l.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
};

/* ── Floating comic shapes (semi-transparent background objects) ── */
const FloatingShapes = () => {
  const shapes = useMemo(
    () => [
      /* starbursts */
      { type: "star", x: "8%", y: "15%", size: 90, color: "rgba(255,255,0,0.07)", dur: 18, delay: 0 },
      { type: "star", x: "85%", y: "20%", size: 70, color: "rgba(0,200,255,0.06)", dur: 22, delay: 2 },
      { type: "star", x: "75%", y: "70%", size: 110, color: "rgba(255,100,100,0.06)", dur: 20, delay: 4 },
      { type: "star", x: "15%", y: "75%", size: 60, color: "rgba(100,255,100,0.07)", dur: 24, delay: 1 },
      /* lightning bolts */
      { type: "bolt", x: "92%", y: "50%", size: 50, color: "rgba(255,255,0,0.09)", dur: 16, delay: 1 },
      { type: "bolt", x: "4%", y: "55%", size: 40, color: "rgba(255,200,0,0.08)", dur: 19, delay: 3 },
      /* explosions */
      { type: "boom", x: "50%", y: "12%", size: 100, color: "rgba(255,80,80,0.05)", dur: 25, delay: 2 },
      { type: "boom", x: "30%", y: "82%", size: 80, color: "rgba(255,165,0,0.05)", dur: 21, delay: 0 },
      /* circles / orbs */
      { type: "orb", x: "20%", y: "30%", size: 140, color: "rgba(180,100,255,0.05)", dur: 28, delay: 1 },
      { type: "orb", x: "70%", y: "45%", size: 100, color: "rgba(0,200,200,0.04)", dur: 30, delay: 3 },
      { type: "orb", x: "55%", y: "80%", size: 80, color: "rgba(255,200,100,0.05)", dur: 26, delay: 2 },
      { type: "orb", x: "40%", y: "10%", size: 60, color: "rgba(100,200,255,0.04)", dur: 32, delay: 0 },
    ],
    []
  );

  return (
    <>
      {shapes.map((s, i) => {
        const common: React.CSSProperties = {
          position: "absolute",
          left: s.x,
          top: s.y,
          color: s.color,
          animation: `comic-drift ${s.dur}s ease-in-out ${s.delay}s infinite`,
          pointerEvents: "none",
        };

        if (s.type === "star")
          return <Starburst key={i} size={s.size} style={common} />;
        if (s.type === "bolt")
          return <Lightning key={i} size={s.size} style={common} />;
        if (s.type === "boom")
          return <Explosion key={i} size={s.size} style={common} />;
        /* orb */
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              ...common,
              width: s.size,
              height: s.size,
              background: `radial-gradient(circle, ${s.color}, transparent 70%)`,
              animation: `comic-pulse ${s.dur * 0.6}s ease-in-out ${s.delay}s infinite`,
              "--base-o": "0.08",
            } as React.CSSProperties}
          />
        );
      })}
    </>
  );
};

/* ── Speech bubbles (semi-transparent) ── */
const SpeechBubbles = () => (
  <>
    <div
      className="comic-speech-bubble"
      style={{
        top: "14%",
        left: "18%",
        width: 80,
        height: 55,
        animation: "comic-float 5s ease-in-out infinite",
        "--rot": "-6deg",
      } as React.CSSProperties}
    />
    <div
      className="comic-speech-bubble"
      style={{
        top: "60%",
        right: "10%",
        width: 100,
        height: 65,
        animation: "comic-float 6s ease-in-out 1.5s infinite",
        "--rot": "4deg",
      } as React.CSSProperties}
    />
    <div
      className="comic-speech-bubble"
      style={{
        bottom: "18%",
        left: "8%",
        width: 60,
        height: 42,
        animation: "comic-float 5.5s ease-in-out 2.8s infinite",
        "--rot": "8deg",
      } as React.CSSProperties}
    />
    <div
      className="comic-speech-bubble"
      style={{
        top: "30%",
        right: "22%",
        width: 70,
        height: 48,
        animation: "comic-float 7s ease-in-out 0.5s infinite",
        "--rot": "-10deg",
      } as React.CSSProperties}
    />
  </>
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
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(100%)",
        }}
      >
        {/* ── LAYER 1: Halftone dot overlay ── */}
        <div className="comic-halftone absolute inset-0" />

        {/* ── LAYER 2: Radial gradient vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* ── LAYER 3: Speed lines ── */}
        <SpeedLines />

        {/* ── LAYER 4: Floating semi-transparent shapes ── */}
        <FloatingShapes />

        {/* ── LAYER 5: Speech bubbles ── */}
        <SpeechBubbles />

        {/* ── LAYER 6: Comic dot clusters ── */}
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
        <ComicDots
          style={{
            top: "50%",
            left: "50%",
            width: 180,
            height: 180,
            color: "rgba(255,100,200,0.05)",
            transform: "translate(-50%,-50%)",
          }}
        />

        {/* ── LAYER 7: Spinning starburst behind text ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            width: "min(90vw, 700px)",
            height: "min(90vw, 700px)",
            animation: "starburst-rotate 40s linear infinite",
          }}
        >
          <Starburst
            size={700}
            style={{
              width: "100%",
              height: "100%",
              color: "rgba(255,255,255,0.03)",
            }}
          />
        </div>

        {/* ── LAYER 8: Corner panel frames ── */}
        <div
          className="absolute top-4 left-4 w-24 h-24 md:w-36 md:h-36 comic-panel-border rounded-sm pointer-events-none"
          style={{ borderRadius: "4px" }}
        />
        <div
          className="absolute top-4 right-4 w-20 h-32 md:w-28 md:h-44 comic-panel-border rounded-sm pointer-events-none"
          style={{ borderRadius: "4px" }}
        />
        <div
          className="absolute bottom-4 left-4 w-28 h-20 md:w-40 md:h-28 comic-panel-border rounded-sm pointer-events-none"
          style={{ borderRadius: "4px" }}
        />
        <div
          className="absolute bottom-4 right-4 w-24 h-24 md:w-32 md:h-32 comic-panel-border rounded-sm pointer-events-none"
          style={{ borderRadius: "4px" }}
        />

        {/* ── MAIN CONTENT (centered) ── */}
        <div className="relative z-10 max-w-[85vw] text-center">

          {/* ── Bubble text box ── */}
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
            {/* Decorative top line */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[2px] w-12 md:w-20" style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.3))" }} />
              <span
                className="hero-title tracking-[0.3em]"
                style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.8rem)", color: "#555" }}
              >
                ★ COMIC EDITION ★
              </span>
              <div className="h-[2px] w-12 md:w-20" style={{ background: "linear-gradient(to left, transparent, rgba(0,0,0,0.3))" }} />
            </div>

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
                className="hover:cursor-pointer font-bold tracking-wide"
                style={{
                  background: "#FFE105",
                  color: "#000",
                  border: "0.25rem solid #000",
                  boxShadow: "4px 4px 0 #000",
                  fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
                  padding: "12px 32px",
                  fontFamily: '"Dekko", cursive',
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #000";
                }}
              >
                {buttonText}
              </Button>

              {/* Decorative diagonal tag */}
              <div
                className="absolute -bottom-2 -right-3 bg-black text-white px-2 md:px-3 py-1 font-bold text-xs tracking-wider border-2 border-white"
                style={{
                  fontFamily: '"Dekko", cursive',
                  transform: "rotate(-2deg)",
                  fontSize: "clamp(0.55rem, 1vw, 0.75rem)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                ▸ 36 HOURS ▸ LIMITED SEATS ▸ INFINITE CHAOS ▸
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
