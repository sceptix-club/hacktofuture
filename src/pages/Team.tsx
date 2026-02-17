import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import Navbar from "../components/ui/Navbar";
import Footer from "../scenes/Footer";
import { TEAM_MEMBERS } from "../content/team";
import type { TeamMember } from "../content/team";
import "../App.css";
import { Stats } from "@react-three/drei";

/* ─── Precomputed speed lines (avoid Math.random in render) ─── */
const SPEED_LINES = Array.from({ length: 8 }, (_, i) => ({
  top: `${8 + (i / 8) * 84}%`,
  left: `${(i * 13) % 15}%`,
  width: `${35 + ((i * 7) % 45)}%`,
  height: i % 2 === 0 ? 2 : 1,
  animDuration: `${2.5 + (i % 3)}s`,
  animDelay: `${(i * 0.7) % 3}s`,
}));

/* ─── Simple CSS-based floating dots (replaces Three.js Canvas entirely) ─── */
function FloatingDots() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 1px)",
        backgroundSize: "20px 20px",
        animation: "float-dots 60s linear infinite",
        willChange: "transform",
      }}
    />
  );
}

/* ─── Page Turn Card (only renders active + adjacent cards) ─── */
interface PageCardProps {
  member: TeamMember;
  index: number;
  isActive: boolean;
  direction: "enter" | "exit" | "idle";
}

function PageCard({ member, index, isActive, direction }: PageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Kill any running tween before starting a new one
    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }

    if (isActive && direction === "enter") {
      tweenRef.current = gsap.fromTo(
        cardRef.current,
        {
          x: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          force3D: true,
        }
      );
    } else if (!isActive && direction === "exit") {
      tweenRef.current = gsap.to(cardRef.current, {
        x: -80,
        opacity: 0,
        scale: 0.95,
        duration: 0.35,
        ease: "power2.in",
        force3D: true,
      });
    }

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
    };
  }, [isActive, direction]);

  // Don't render DOM at all if not active and idle
  if (!isActive && direction === "idle") return null;

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        willChange: "transform, opacity",
        contain: "layout style paint",
      }}
    >
      {/* Card — responsive sizing */}
      <div
        className="relative w-[95vw] max-w-[900px] h-[55vh] sm:h-[60vh] md:h-[70vh] max-h-[550px] flex flex-col sm:flex-row overflow-hidden"
        style={{
          border: "4px solid #000",
          borderRadius: "8px",
          boxShadow: "8px 8px 0px #000",
          background: "#FFFEF2",
          contain: "content",
        }}
      >
        {/* Comic panel divider */}
        <div className="hidden sm:block absolute top-0 bottom-0 left-1/2 w-[4px] bg-black z-10" />
        <div className="block sm:hidden absolute left-0 right-0 top-[40%] h-[4px] bg-black z-10" />

        {/* Left Page — Photo */}
        <div className="w-full sm:w-1/2 h-[40%] sm:h-full flex flex-col items-center justify-center p-3 sm:p-6 relative">
          {/* Page number */}
          <div
            className="absolute top-2 left-3 sm:top-3 sm:left-4 hero-title text-black/30"
            style={{ fontSize: "0.6rem" }}
          >
            PAGE {index * 2 + 1}
          </div>

          {/* Photo frame */}
          <div
            className="relative"
            style={{
              border: "3px solid #000",
              borderRadius: "4px",
              boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
              padding: "6px",
              background: "#fff",
              transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
            }}
          >
            <img
              src={member.photo}
              alt={member.name}
              loading="lazy"
              decoding="async"
              className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover"
              style={{
                border: "2px solid #000",
                borderRadius: "2px",
                filter: "contrast(1.1) saturate(1.2)",
                contentVisibility: "auto",
              }}
            />
            <div
              className="text-center mt-1 sm:mt-2 hero-title text-black"
              style={{ fontSize: "clamp(0.5rem, 1.2vw, 0.8rem)" }}
            >
              ★ MEMBER #{index + 1} ★
            </div>
          </div>
        </div>

        {/* Right Page — Info */}
        <div className="w-full sm:w-1/2 h-[60%] sm:h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 relative">
          {/* Page number */}
          <div
            className="absolute top-2 right-3 sm:top-3 sm:right-4 hero-title text-black/30"
            style={{ fontSize: "0.6rem" }}
          >
            PAGE {index * 2 + 2}
          </div>

          {/* Name banner */}
          <div
            className="mb-1 sm:mb-2 inline-block px-2 sm:px-3 py-1 self-start"
            style={{
              background: "#000",
              color: "#fff",
              transform: "skewX(-3deg)",
              boxShadow: "3px 3px 0px rgba(218,16,12,0.8)",
            }}
          >
            <h2
              className="hero-title"
              style={{
                fontSize: "clamp(0.9rem, 3vw, 2rem)",
                transform: "skewX(3deg)",
              }}
            >
              {member.name}
            </h2>
          </div>

          {/* Role badge */}
          <div
            className="mb-2 sm:mb-4 inline-block self-start px-2 sm:px-3 py-1"
            style={{
              border: "2px solid #DA100C",
              borderRadius: "4px",
              color: "#DA100C",
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: "clamp(0.6rem, 1.3vw, 0.9rem)",
              boxShadow: "2px 2px 0px rgba(0,0,0,0.2)",
            }}
          >
            {member.role}
          </div>

          {/* Bio */}
          <p
            className="comic-sans text-black/80 mb-3 sm:mb-6 leading-relaxed"
            style={{ fontSize: "clamp(0.7rem, 1.5vw, 1rem)" }}
          >
            "{member.bio}"
          </p>

          {/* Action line */}
          <div
            className="h-[3px] w-12 sm:w-16 mb-3 sm:mb-4"
            style={{
              background: "linear-gradient(90deg, #DA100C, #000)",
            }}
          />

          {/* Links */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {member.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="comic-sans text-white hover:scale-105 transition-transform"
                style={{
                  background: "#000",
                  border: "2px solid #000",
                  borderRadius: "4px",
                  padding: "3px 8px",
                  fontSize: "clamp(0.55rem, 1.1vw, 0.8rem)",
                  boxShadow: "2px 2px 0px rgba(218,16,12,0.6)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Corner starburst */}
          <svg
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-10"
            width="40"
            height="40"
            viewBox="0 0 100 100"
          >
            <polygon
              points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
              fill="#DA100C"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Team Page ─── */
export default function Team() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<"enter" | "exit" | "idle">(
    "enter"
  );
  const [showFooter, setShowFooter] = useState(false);
  // Track which cards should be rendered (active + previous for exit animation)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set([0]));
  const isScrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const totalPages = TEAM_MEMBERS.length;

  // Memoize speed lines JSX
  const speedLinesJSX = useMemo(
    () =>
      SPEED_LINES.map((line, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: line.top,
            left: line.left,
            width: line.width,
            height: line.height,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            animation: `speed-lines-pulse ${line.animDuration} ease-in-out ${line.animDelay} infinite`,
            willChange: "opacity",
          }}
        />
      )),
    []
  );

  // Update visible cards when currentPage changes
  useEffect(() => {
    setVisibleCards((prev) => {
      const next = new Set(prev);
      next.add(currentPage);
      return next;
    });

    // Clean up old cards after exit animation completes
    const timer = setTimeout(() => {
      setVisibleCards(new Set([currentPage]));
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage]);

  // Animate footer in/out
  useEffect(() => {
    if (!footerRef.current) return;
    if (showFooter) {
      gsap.to(footerRef.current, {
        y: "0%",
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
      });
    } else {
      gsap.to(footerRef.current, {
        y: "100%",
        duration: 0.35,
        ease: "power2.in",
        force3D: true,
      });
    }
  }, [showFooter]);

  // Unified navigation handler
  const navigate = useCallback(
    (deltaDirection: 1 | -1) => {
      if (isScrolling.current) return;

      const isDown = deltaDirection > 0;
      const isUp = deltaDirection < 0;

      // Footer logic
      if (showFooter && isUp) {
        isScrolling.current = true;
        setShowFooter(false);
        setTimeout(() => {
          isScrolling.current = false;
        }, 500);
        return;
      }
      if (showFooter && isDown) return;
      if (currentPage === 0 && isUp) return;
      if (currentPage === totalPages - 1 && isDown) {
        isScrolling.current = true;
        setShowFooter(true);
        setTimeout(() => {
          isScrolling.current = false;
        }, 500);
        return;
      }

      isScrolling.current = true;
      setDirection("exit");

      // Use requestAnimationFrame for smoother transition timing
      requestAnimationFrame(() => {
        setTimeout(() => {
          setCurrentPage((prev) => {
            if (isDown) return Math.min(prev + 1, totalPages - 1);
            return Math.max(prev - 1, 0);
          });
          setDirection("enter");

          setTimeout(() => {
            isScrolling.current = false;
          }, 400);
        }, 250);
      });
    },
    [totalPages, currentPage, showFooter]
  );

  // Scroll / wheel based page turn
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 30) return;
      navigate(e.deltaY > 0 ? 1 : -1);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (el) el.removeEventListener("wheel", handleWheel);
    };
  }, [navigate]);

  // Touch support
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return;
      navigate(deltaY > 0 ? 1 : -1);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("touchstart", handleTouchStart, { passive: true });
      el.addEventListener("touchmove", handleTouchMove, { passive: false });
      el.addEventListener("touchend", handleTouchEnd, { passive: true });
    }
    return () => {
      if (el) {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchmove", handleTouchMove);
        el.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const isDown = e.key === "ArrowDown" || e.key === "ArrowRight";
      const isUp = e.key === "ArrowUp" || e.key === "ArrowLeft";
      if (!isDown && !isUp) return;
      navigate(isDown ? 1 : -1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  return (
    <>
      <Stats />
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden"
        style={{
          background: "#0a0a0a",
          overscrollBehavior: "none",
          touchAction: "none",
        }}
      >
        {/* Background layers */}
        <div className="absolute inset-0 z-0" style={{ contain: "strict" }}>
          {/* Halftone dot background */}
          <div className="comic-halftone absolute inset-0" />

          {/* Radial vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Speed lines - memoized */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {speedLinesJSX}
          </div>

          {/* CSS floating dots (replaces Three.js Canvas) */}
          <FloatingDots />
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center pt-4 sm:pt-6">
          <div
            className="px-4 sm:px-6 py-1.5 sm:py-2 relative"
            style={{
              background: "#DA100C",
              border: "3px solid #000",
              boxShadow: "4px 4px 0px #000",
              transform: "skewX(-3deg)",
            }}
          >
            <h1
              className="hero-title text-white"
              style={{
                fontSize: "clamp(0.9rem, 3vw, 2rem)",
                transform: "skewX(3deg)",
              }}
            >
              ★ OUR TEAM ★
            </h1>
          </div>
        </div>

        {/* Page cards — only render visible cards */}
        <div className="absolute inset-0 z-20">
          {TEAM_MEMBERS.map(
            (member, index) =>
              visibleCards.has(index) && (
                <PageCard
                  key={member.name}
                  member={member}
                  index={index}
                  isActive={index === currentPage}
                  direction={index === currentPage ? direction : "exit"}
                />
              )
          )}
        </div>

        {/* Page counter */}
        <div className="absolute bottom-20 right-3 sm:right-6 z-30">
          <span
            className="hero-title text-white/60"
            style={{ fontSize: "clamp(0.6rem, 1.3vw, 0.9rem)" }}
          >
            {String(currentPage + 1).padStart(2, "0")}{" "}
            <span className="text-white/30">/</span>{" "}
            <span className="text-white/30">
              {String(totalPages).padStart(2, "0")}
            </span>
          </span>
        </div>

        {/* Footer */}
        <Footer ref={footerRef} />
      </div>
      <Navbar />
    </>
  );
}
