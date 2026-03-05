import { useRef, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../scenes/Footer";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { themes, type ThemeSlug } from "../content/data";
import Background from "../components/Background";

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
      y: -8,
      scale: 1.02,
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
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderTop: `3px solid ${theme.accent}`,
        borderRadius: "0.75rem",
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        minHeight: "clamp(280px, 35vh, 380px)",
        backdropFilter: "blur(12px)",
        willChange: "transform",
        transition: "box-shadow 0.3s ease",
        boxShadow: `0 0 0 rgba(0,0,0,0)`,
      }}
    >
      {/* Number badge */}
      <div className="flex items-start justify-between mb-6">
        <span
          className="hero-title font-black"
          style={{
            fontSize: "clamp(3rem, 7vw, 5rem)",
            color: theme.accent,
            opacity: 0.15,
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
            width: 36,
            height: 36,
            border: `1px solid ${theme.accent}`,
            borderRadius: "50%",
            color: theme.accent,
            flexShrink: 0,
          }}
        >
          <svg
            width="14"
            height="14"
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
        className="hero-title font-black uppercase mb-4"
        style={{
          fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)",
          color: "#fff",
          lineHeight: 1.1,
        }}
      >
        {theme.title}
      </h3>

      {/* Description */}
      <p
        className="comic-sans"
        style={{
          fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.6,
          flexGrow: 1,
        }}
      >
        {theme.description}
      </p>

      {/* Bottom — PS count + CTA */}
      <div
        className="flex items-center justify-between mt-6 pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span
          className="comic-sans"
          style={{
            fontSize: "clamp(0.7rem, 1.1vw, 0.8rem)",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          {themes[theme.slug].problemStatements.length} Problem Statement
          {themes[theme.slug].problemStatements.length > 1 ? "s" : ""}
        </span>

        <span
          className="comic-sans"
          style={{
            fontSize: "clamp(0.7rem, 1.1vw, 0.8rem)",
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
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFooter, setShowFooter] = useState(false);
  const isFooterVisible = useRef(false);
  const touchStartY = useRef(0);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  // Footer animation
  useEffect(() => {
    if (!footerRef.current) return;
    if (showFooter) {
      gsap.to(footerRef.current, { y: 0, duration: 1.0, ease: "power3.out" }); 
    } else {
      gsap.to(footerRef.current, {
        y: "100%",
        duration: 0.6,
        ease: "power3.in",
      });
    }
    isFooterVisible.current = showFooter;
  }, [showFooter]);

  // Footer scroll trigger
  useEffect(() => {
    let footerTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && !isFooterVisible.current) {
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 10;
        if (atBottom) {
          if (!footerTimeout) {
            footerTimeout = setTimeout(() => {
              setShowFooter(true);
              footerTimeout = null;
            }, 600); // delay before footer appears
          }
        }
      } else if (e.deltaY < 0 && isFooterVisible.current) {
        if (footerTimeout) {
          clearTimeout(footerTimeout);
          footerTimeout = null;
        }
        setShowFooter(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (deltaY > 40 && !isFooterVisible.current) {
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 10;
        if (atBottom) {
          footerTimeout = setTimeout(() => {
            setShowFooter(true);
            footerTimeout = null;
          }, 600);
        }
      } else if (deltaY < -40 && isFooterVisible.current) {
        if (footerTimeout) {
          clearTimeout(footerTimeout);
          footerTimeout = null;
        }
        setShowFooter(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (footerTimeout) clearTimeout(footerTimeout);
    };
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="relative w-full min-h-screen"
        style={{ background: "#0a0a0a" }}
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
          <div ref={headerRef} className="-mt-12 mb-14">
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

          {/* Cards grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          >
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
        </div>
      </div>

      <Footer ref={footerRef} />
    </>
  );
}
