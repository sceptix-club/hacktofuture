import { useRef, useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { themes, type ThemeSlug } from "../content/data";
import Background from "../components/Background";
import { useWebHaptics } from "web-haptics/react";

/* ─── Theme card data ─── */
const THEME_CARDS = [
  {
    slug: "healthcare-and-citizen-welfare" as ThemeSlug,
    title: "Healthcare & Citizen Welfare",
    description:
      "Build solutions that improve public health outcomes, enhance citizen welfare, and make healthcare accessible for all. From diagnostics to mental health, drive meaningful change.",
    accent: "#E8003D",
    number: "01",
  },
  {
    slug: "industry-and-trade" as ThemeSlug,
    title: "Industry & Trade",
    description:
      "Optimize supply chains, streamline manufacturing, and empower businesses with intelligent tools for procurement, forecasting, and trade compliance.",
    accent: "#FFE105",
    number: "02",
  },
  {
    slug: "infrastructure-and-smart-cities" as ThemeSlug,
    title: "Infrastructure & Smart Cities",
    description:
      "Design the cities of tomorrow — smarter waste management, connected transit, road safety systems, and data-driven urban planning for a better quality of life.",
    accent: "#00C6FF",
    number: "03",
  },
  {
    slug: "open-innovation" as ThemeSlug,
    title: "Open Innovation",
    description:
      "Push the boundaries of what's possible — tackle unconventional problems, build creative solutions, and leverage open collaboration to drive breakthrough innovation.",
    accent: "#A855F7",
    number: "04",
  },
];

/* ─── Individual Theme Card ─── */
function ThemeCard({
  theme,
  index,
  onClick,
}: {
  theme: (typeof THEME_CARDS)[number];
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -6,
      scale: 1.01,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col justify-between cursor-pointer select-none"
      style={{
        /* ── cream-white page look (matches book pages in Team.tsx) ── */
        background: "#FFFEF2",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.04) 28px, rgba(0,0,0,0.04) 29px)",
        border: "3px solid #000",
        borderTop: `4px solid ${theme.accent}`,
        borderRadius: "0.75rem",
        padding: "clamp(1.25rem, 2.5vw, 2rem)",
        willChange: "transform",
        transition: "box-shadow 0.3s ease",
        boxShadow: "4px 4px 0px rgba(0,0,0,0.5)",
      }}
    >
      {/* Number badge */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="hero-title font-black"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            color: theme.accent,
            opacity: 0.2,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {theme.number}
        </span>

        {/* Arrow icon */}
        <div
          className="flex items-center justify-center"
          style={{
            width: 34,
            height: 34,
            border: `2px solid ${theme.accent}`,
            borderRadius: "50%",
            color: theme.accent,
            flexShrink: 0,
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h3
        className="hero-title font-black uppercase mb-3"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.5rem)",
          color: "#111",
          lineHeight: 1.1,
        }}
      >
        {theme.title}
      </h3>

      {/* Description */}
      <p
        className="comic-sans"
        style={{
          fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
          color: "rgba(0,0,0,0.6)",
          lineHeight: 1.6,
          flexGrow: 1,
        }}
      >
        {theme.description}
      </p>

      {/* Bottom — PS count + CTA */}
      <div
        className="flex items-center justify-between mt-5 pt-4"
        style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }}
      >
        <span
          className="comic-sans"
          style={{
            fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
            color: "rgba(0,0,0,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          {themes[theme.slug].problemStatements.length} Problem Statement
          {themes[theme.slug].problemStatements.length > 1 ? "s" : ""}
        </span>

        <span
          className="comic-sans font-bold"
          style={{
            fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
            color: theme.accent,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Explore →
        </span>
      </div>
    </div>
  );
}

/* ─── Main Themes Page ─── */
export default function Themes() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { trigger } = useWebHaptics();

  // Entrance animation
  useEffect(() => {
    if (!cardsRef.current || !headerRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".theme-card-wrapper");

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.25,
      }
    );
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="relative w-full min-h-screen"
        style={{
          background: "#0a0a0a",
          backgroundImage: "url('/textures/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ── Same 3D background as HomePage ── */}
        <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <Background />
        </div>

        {/* ── Foreground ── */}
        <div
          className="relative px-6 md:px-12 lg:px-20 pt-28 pb-24"
          style={{ zIndex: 1 }}
        >
          {/* Header */}
          <div
            ref={headerRef}
            className="-mt-12 mb-14 flex flex-col items-center"
          >
            <p
              className="comic-sans uppercase tracking-widest mb-3"
              style={{
                fontSize: "clamp(0.7rem, 1.3vw, 0.85rem)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              HackToFuture 4.0
            </p>
            <h1
              className="hero-title font-black uppercase"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                lineHeight: 0.9,
                color: "#fff",
              }}
            >
              Themes
            </h1>
            <div
              className="mt-4"
              style={{
                height: 3,
                width: "clamp(60px, 8vw, 100px)",
                background: "#E8003D",
              }}
            />
          </div>

          {/* ── Cards ── */}
          <div ref={cardsRef}>
            {/* Mobile: single column stack (unchanged) */}
            <div className="flex flex-col gap-5 md:hidden">
              {THEME_CARDS.map((theme, index) => (
                <div key={theme.slug} className="theme-card-wrapper">
                  <ThemeCard
                    theme={theme}
                    index={index}
                    onClick={() => navigate(`/theme/${theme.slug}`)}
                  />
                </div>
              ))}
            </div>

            {/* Desktop: centered column stack at 25% width */}
            <div className="hidden md:flex flex-col items-center gap-6 mb-16">
              {THEME_CARDS.map((theme, index) => (
                <div
                  key={theme.slug}
                  className="theme-card-wrapper w-full"
                  style={{
                    maxWidth: "max(72vw, 360px)",
                    minWidth: "280px",
                  }}
                >
                  <ThemeCard
                    theme={theme}
                    index={index}
                    onClick={() => navigate(`/theme/${theme.slug}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
