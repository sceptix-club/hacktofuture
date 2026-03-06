import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../components/ui/Navbar";
import "../App.css";
import { TEAM_MEMBERS } from "../content/team";
import type { TeamMember } from "../content/team";
import { coreTeamPrefix } from "../lib/utils";

const TOTAL_MEMBERS = TEAM_MEMBERS.length;
const TOTAL_SHEETS = TOTAL_MEMBERS - 1;

/* ─── Photo Page Content ─── */
function PhotoContent({
  member,
  index,
  isMobile,
}: {
  member: TeamMember;
  index: number;
  isMobile: boolean;
}) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative"
      style={{ padding: isMobile ? "10px 16px" : "16px 24px 16px 40px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />
      <div
        className="absolute hero-title text-black/25"
        style={{
          fontSize: "0.55rem",
          top: isMobile ? 8 : 12,
          left: isMobile ? 12 : 16,
        }}
      >
        PAGE {index * 2 + 1}
      </div>
      <div className="relative z-10">
        <div
          style={{
            border: "3px solid #000",
            borderRadius: "4px",
            boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
            padding: isMobile ? "5px" : "8px",
            background: "#fff",
            transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
          }}
        >
          <img
            src={member.photo ? `${coreTeamPrefix}${member.photo}` : undefined}
            alt={member.name}
            loading="eager"
            decoding="async"
            style={{
              width: isMobile ? "100px" : undefined,
              height: isMobile ? "120px" : undefined,
              objectFit: "cover",
              border: "2px solid #000",
              borderRadius: "2px",
              filter: "contrast(1.1) saturate(1.2)",
              willChange: "transform",
            }}
            className={
              isMobile
                ? ""
                : "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-cover"
            }
          />
          <div
            className="text-center mt-1 hero-title text-black"
            style={{
              fontSize: isMobile ? "0.45rem" : "clamp(0.5rem, 1.2vw, 0.8rem)",
            }}
          >
            ★ MEMBER #{index + 1} ★
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Details Page Content ─── */
function DetailsContent({
  member,
  index,
  isMobile,
}: {
  member: TeamMember;
  index: number;
  isMobile: boolean;
}) {
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center relative"
      style={{ padding: isMobile ? "10px 16px" : "16px 24px 16px 40px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />
      <div
        className="absolute hero-title text-black/25"
        style={{
          fontSize: "0.55rem",
          top: isMobile ? 8 : 12,
          right: isMobile ? 12 : 16,
        }}
      >
        PAGE {index * 2 + 2}
      </div>
      {!isMobile && (
        <div
          className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.06), transparent)",
          }}
        />
      )}
      {isMobile && (
        <div
          className="absolute top-0 left-0 right-0 h-4 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.06), transparent)",
          }}
        />
      )}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ maxWidth: 400 }}
      >
        {/* Name - full width banner */}
        <div
          className="mb-1 inline-block"
          style={{
            background: "#000",
            color: "#fff",
            transform: "skewX(-3deg)",
            boxShadow: "3px 3px 0px rgba(218,16,12,0.8)",
            padding: isMobile ? "3px 10px" : "6px 16px",
          }}
        >
          <h2
            className="hero-title text-center"
            style={{
              fontSize: isMobile ? "0.95rem" : "clamp(1rem, 3.5vw, 2.2rem)",
              transform: "skewX(3deg)",
            }}
          >
            {member.name}
          </h2>
        </div>

        {/* Role & Links - side by side on mobile */}
        {isMobile ? (
          <div className="flex items-center justify-center mt-2 gap-2 mb-2 flex-wrap">
            <div
              className="inline-block px-2 py-0.5"
              style={{
                border: "2px solid #DA100C",
                borderRadius: "4px",
                color: "#DA100C",
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: "0.6rem",
                boxShadow: "2px 2px 0px rgba(0,0,0,0.2)",
              }}
            >
              {member.role}
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
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
                    padding: "2px 8px",
                    fontSize: "0.55rem",
                    boxShadow: "2px 2px 0px rgba(218,16,12,0.6)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="mb-2 mt-2 inline-block px-2 py-0.5"
            style={{
              border: "2px solid #DA100C",
              borderRadius: "4px",
              color: "#DA100C",
              fontFamily: "'Dela Gothic One', sans-serif",
              fontSize: "clamp(0.65rem, 1.4vw, 1rem)",
              boxShadow: "2px 2px 0px rgba(0,0,0,0.2)",
            }}
          >
            {member.role}
          </div>
        )}

        {/* Quote */}
        {!isMobile && (
          <p
            className="comic-sans text-black/80 leading-relaxed text-center"
            style={{
              fontSize: isMobile ? "0.7rem" : "clamp(0.75rem, 1.6vw, 1.05rem)",
              marginBottom: isMobile ? "8px" : "20px",
              maxWidth: "400px",
            }}
          >
            "{member.bio}"
          </p>
        )}
        <div
          style={{
            height: 3,
            width: isMobile ? 40 : 60,
            background: "linear-gradient(90deg, #DA100C, #000)",
            marginBottom: isMobile ? 8 : 16,
          }}
        />

        {/* Links - only on desktop (already rendered above for mobile) */}
        {!isMobile && (
          <div className="flex flex-wrap justify-center gap-1.5">
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
                  padding: "4px 10px",
                  fontSize: "clamp(0.6rem, 1.2vw, 0.85rem)",
                  boxShadow: "2px 2px 0px rgba(218,16,12,0.6)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
      {!isMobile && (
        <svg
          className="absolute bottom-4 right-4 opacity-10"
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
            fill="#DA100C"
          />
        </svg>
      )}
    </div>
  );
}

const pageBase: React.CSSProperties = {
  background: "#FFFEF2",
  backgroundImage:
    "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.04) 28px, rgba(0,0,0,0.04) 29px)",
};

/* ─── Opaque blocker that sits behind content on each face ─── */
const pageBlockerStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#FFFEF2",
  zIndex: 0,
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

/* ─── Main ─── */
export default function Team() {
  const [displayPage, setDisplayPage] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const isMobile = useIsMobile();

  // Preload & pre-decode all team photos so flips never stall
  useEffect(() => {
    TEAM_MEMBERS.forEach((m) => {
      if (!m.photo) return;
      const img = new Image();
      img.src = m.photo;
      img.decoding = "async";
      img.decode?.().catch(() => {});
    });
  }, []);

  const currentMemberRef = useRef(0);
  const isAnimating = useRef(false);
  const showFooterRef = useRef(false);
  const isMobileRef = useRef(isMobile);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const sheetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flippedState = useRef<boolean[]>(new Array(TOTAL_SHEETS).fill(false));

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  const setSheetRef = (index: number) => (el: HTMLDivElement | null) => {
    sheetRefs.current[index] = el;
  };

  const rebuildZIndices = () => {
    sheetRefs.current.forEach((el, i) => {
      if (!el) return;
      if (flippedState.current[i]) {
        gsap.set(el, { zIndex: i + 1 });
      } else {
        gsap.set(el, { zIndex: TOTAL_SHEETS - i });
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      rebuildZIndices();
      sheetRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          rotateY: flippedState.current[i] ? -180 : 0,
        });
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if (bookRef.current) {
      gsap.fromTo(
        bookRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
    rebuildZIndices();
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;
    if (showFooter) {
      gsap.to(footerRef.current, {
        y: "0%",
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      gsap.to(footerRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [showFooter]);

  const flipForwardRef = useRef(() => {});
  const flipBackwardRef = useRef(() => {});

  flipForwardRef.current = () => {
    if (isAnimating.current) return;
    const cur = currentMemberRef.current;
    if (cur >= TOTAL_MEMBERS - 1) {
      if (showFooterRef.current) return;
      isAnimating.current = true;
      showFooterRef.current = true;
      setShowFooter(true);
      setTimeout(() => {
        isAnimating.current = false;
      }, 700);
      return;
    }
    const sheetEl = sheetRefs.current[cur];
    if (!sheetEl) return;
    isAnimating.current = true;
    flippedState.current[cur] = true;
    gsap.set(sheetEl, { zIndex: TOTAL_SHEETS + 10 });
    gsap.to(sheetEl, {
      rotateY: -180,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        currentMemberRef.current = cur + 1;
        rebuildZIndices();
        setDisplayPage(cur + 1);
        isAnimating.current = false;
      },
    });
  };

  flipBackwardRef.current = () => {
    if (isAnimating.current) return;
    if (showFooterRef.current) {
      isAnimating.current = true;
      showFooterRef.current = false;
      setShowFooter(false);
      setTimeout(() => {
        isAnimating.current = false;
      }, 700);
      return;
    }
    const cur = currentMemberRef.current;
    if (cur <= 0) return;
    const sheetIndex = cur - 1;
    const sheetEl = sheetRefs.current[sheetIndex];
    if (!sheetEl) return;
    isAnimating.current = true;
    flippedState.current[sheetIndex] = false;
    gsap.set(sheetEl, { zIndex: TOTAL_SHEETS + 10 });
    gsap.to(sheetEl, {
      rotateY: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        currentMemberRef.current = cur - 1;
        rebuildZIndices();
        setDisplayPage(cur - 1);
        isAnimating.current = false;
      },
    });
  };

  const jumpToPage = (target: number) => {
    if (isAnimating.current) return;
    if (target === currentMemberRef.current) return;
    isAnimating.current = true;
    if (showFooterRef.current) {
      showFooterRef.current = false;
      setShowFooter(false);
    }
    sheetRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i < target) {
        gsap.set(el, { rotateY: -180 });
        flippedState.current[i] = true;
      } else {
        gsap.set(el, { rotateY: 0 });
        flippedState.current[i] = false;
      }
    });
    rebuildZIndices();
    currentMemberRef.current = target;
    setDisplayPage(target);
    setTimeout(() => {
      isAnimating.current = false;
    }, 100);
  };

  // Wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 30) return;
      if (e.deltaY > 0) flipForwardRef.current();
      else flipBackwardRef.current();
    };
    const el = containerRef.current;
    if (el) el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      if (el) el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Touch
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (tracking) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      if (isAnimating.current) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      const absDX = Math.abs(deltaX);
      const absDY = Math.abs(deltaY);

      if (absDX < 30 && absDY < 30) return;

      let goForward: boolean;
      if (absDY >= absDX) {
        goForward = deltaY > 0;
      } else {
        goForward = deltaX > 0;
      }

      if (goForward) flipForwardRef.current();
      else flipBackwardRef.current();
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
  }, []);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight")
        flipForwardRef.current();
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        flipBackwardRef.current();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* ─── Sheet renderer — each face is a self-contained opaque layer ─── */
  const renderSheets = () =>
    Array.from({ length: TOTAL_SHEETS }, (_, i) => (
      <div
        key={`sheet-${i}`}
        ref={setSheetRef(i)}
        className="absolute right-0 top-0 w-1/2 h-full"
        style={{
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* ── FRONT FACE: Details[i] ── */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            MozBackfaceVisibility: "hidden" as any,
            transform: "rotateY(0deg) translateZ(1px)",
            overflow: "hidden",
            ...pageBase,
            border: isMobile ? "3px solid #000" : "4px solid #000",
            borderLeft: isMobile ? "1.5px solid #000" : "2px solid #000",
            borderRadius: isMobile ? "0 6px 6px 0" : "0 8px 8px 0",
            boxShadow: isMobile
              ? "4px 4px 0px rgba(0,0,0,0.4)"
              : "6px 6px 0px rgba(0,0,0,0.4)",
          }}
        >
          {/* Solid opaque blocker behind content */}
          <div style={pageBlockerStyle} />
          <div className="relative z-10 w-full h-full">
            {isMobile ? (
              <div
                className="w-full h-full"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "center center",
                }}
              >
                <DetailsContent member={TEAM_MEMBERS[i]} index={i} isMobile />
              </div>
            ) : (
              <DetailsContent
                member={TEAM_MEMBERS[i]}
                index={i}
                isMobile={false}
              />
            )}
          </div>
        </div>

        {/* ── BACK FACE: Photo[i+1] ── */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            MozBackfaceVisibility: "hidden" as any,
            transform: "rotateY(180deg) translateZ(1px)",
            overflow: "hidden",
            ...pageBase,
            border: isMobile ? "3px solid #000" : "4px solid #000",
            borderRight: isMobile ? "1.5px solid #000" : "2px solid #000",
            borderRadius: isMobile ? "6px 0 0 6px" : "8px 0 0 8px",
            boxShadow: isMobile
              ? "-4px 4px 0px rgba(0,0,0,0.4)"
              : "-6px 6px 0px rgba(0,0,0,0.4)",
          }}
        >
          {/* Solid opaque blocker behind content */}
          <div style={pageBlockerStyle} />
          <div className="relative z-10 w-full h-full">
            {isMobile ? (
              <div
                className="w-full h-full"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "center center",
                }}
              >
                <PhotoContent
                  member={TEAM_MEMBERS[i + 1]}
                  index={i + 1}
                  isMobile
                />
              </div>
            ) : (
              <PhotoContent
                member={TEAM_MEMBERS[i + 1]}
                index={i + 1}
                isMobile={false}
              />
            )}
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden"
        style={{
          background: "#0a0a0a",
          backgroundImage: "url('/textures/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          touchAction: "none",
          overscrollBehavior: "none",
        }}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  top: `${8 + (i / 12) * 84}%`,
                  left: `${5 + ((i * 3) % 15)}%`,
                  width: `${35 + ((i * 7) % 45)}%`,
                  height: i % 2 === 0 ? 2 : 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                  animation: `speed-lines-pulse ${2.5 + (i % 3)}s ease-in-out ${
                    (i * 0.4) % 3
                  }s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="absolute max-md:mt-4 mt-8 top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-6 pb-4 flex flex-col items-center">
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
            Our Team
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

        {/* ─── BOOK ─── */}
        <div className="absolute mt-20 max-md:mt-5 inset-0 z-20 flex items-center justify-center">
          <div
            ref={bookRef}
            style={
              isMobile
                ? {
                    width: "72vh",
                    height: "75vw",
                    maxWidth: "500px",
                    maxHeight: "320px",
                    transform: "rotate(90deg)",
                    perspective: "2500px",
                    perspectiveOrigin: "50% 50%",
                    position: "relative",
                  }
                : {
                    width: "82vw",
                    height: "60vh",
                    maxWidth: "950px",
                    maxHeight: "490px",
                    perspective: "2500px",
                    perspectiveOrigin: "50% 50%",
                    position: "relative",
                  }
            }
          >
            <div
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Static left base: Photo[0] */}
              <div
                className="absolute left-0 top-0 w-1/2 h-full overflow-hidden"
                style={{
                  ...pageBase,
                  border: isMobile ? "3px solid #000" : "4px solid #000",
                  borderRight: isMobile ? "1.5px solid #000" : "2px solid #000",
                  borderRadius: isMobile ? "6px 0 0 6px" : "8px 0 0 8px",
                  boxShadow: isMobile
                    ? "-4px 4px 0px rgba(0,0,0,0.4)"
                    : "-6px 6px 0px rgba(0,0,0,0.4)",
                  zIndex: 0,
                }}
              >
                <div style={pageBlockerStyle} />
                <div className="relative z-10 w-full h-full">
                  {isMobile ? (
                    <div
                      className="w-full h-full"
                      style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "center center",
                      }}
                    >
                      <PhotoContent
                        member={TEAM_MEMBERS[0]}
                        index={0}
                        isMobile
                      />
                    </div>
                  ) : (
                    <PhotoContent
                      member={TEAM_MEMBERS[0]}
                      index={0}
                      isMobile={false}
                    />
                  )}
                </div>
              </div>

              {/* Static right base: Details[last] */}
              <div
                className="absolute right-0 top-0 w-1/2 h-full overflow-hidden"
                style={{
                  ...pageBase,
                  border: isMobile ? "3px solid #000" : "4px solid #000",
                  borderLeft: isMobile ? "1.5px solid #000" : "2px solid #000",
                  borderRadius: isMobile ? "0 6px 6px 0" : "0 8px 8px 0",
                  boxShadow: isMobile
                    ? "4px 4px 0px rgba(0,0,0,0.4)"
                    : "6px 6px 0px rgba(0,0,0,0.4)",
                  zIndex: 0,
                }}
              >
                <div style={pageBlockerStyle} />
                <div className="relative z-10 w-full h-full">
                  {isMobile ? (
                    <div
                      className="w-full h-full"
                      style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "center center",
                      }}
                    >
                      <DetailsContent
                        member={TEAM_MEMBERS[TOTAL_MEMBERS - 1]}
                        index={TOTAL_MEMBERS - 1}
                        isMobile
                      />
                    </div>
                  ) : (
                    <DetailsContent
                      member={TEAM_MEMBERS[TOTAL_MEMBERS - 1]}
                      index={TOTAL_MEMBERS - 1}
                      isMobile={false}
                    />
                  )}
                </div>
              </div>

              {/* Flippable sheets */}
              {renderSheets()}

              {/* Book spine */}
              <div
                className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  width: isMobile ? 8 : 12,
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
                  borderRadius: "2px",
                  zIndex: TOTAL_SHEETS + 20,
                }}
              />
            </div>
          </div>
        </div>

        {/* Page dots */}
        <div
          className="absolute z-30 flex gap-1.5 sm:gap-2"
          style={
            isMobile
              ? {
                  bottom: 72,
                  left: "50%",
                  transform: "translateX(-50%)",
                  flexDirection: "row",
                  alignItems: "center",
                }
              : {
                  right: 24,
                  top: "50%",
                  transform: "translateY(-50%)",
                  flexDirection: "column",
                  alignItems: "center",
                }
          }
        >
          {TEAM_MEMBERS.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpToPage(i)}
              className="transition-all duration-300 cursor-pointer"
              style={{
                width: displayPage === i ? 14 : 8,
                height: displayPage === i ? 14 : 8,
                borderRadius: "2px",
                background:
                  displayPage === i ? "#DA100C" : "rgba(255,255,255,0.3)",
                border: `2px solid ${
                  displayPage === i ? "#000" : "rgba(255,255,255,0.2)"
                }`,
                boxShadow: displayPage === i ? "2px 2px 0px #000" : "none",
                transform: `rotate(${displayPage === i ? 45 : 0}deg)`,
              }}
              title={`Member ${i + 1}`}
            />
          ))}
          <div
            style={{
              width: isMobile ? 8 : 1,
              height: isMobile ? 1 : 8,
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <button
            onClick={() => {
              if (isAnimating.current) return;
              showFooterRef.current = true;
              setShowFooter(true);
            }}
            className="transition-all duration-300 cursor-pointer"
            style={{
              width: showFooter ? 14 : 8,
              height: showFooter ? 14 : 8,
              borderRadius: "50%",
              background: showFooter ? "#fff" : "rgba(255,255,255,0.2)",
              border: `2px solid ${
                showFooter ? "#000" : "rgba(255,255,255,0.15)"
              }`,
              boxShadow: showFooter ? "2px 2px 0px #000" : "none",
            }}
            title="Footer"
          />
        </div>

        {/* Page counter */}
        <div
          className="absolute z-30"
          style={
            isMobile
              ? { bottom: 100, left: "50%", transform: "translateX(-50%)" }
              : { bottom: 80, right: 24 }
          }
        >
          <span
            className="hero-title text-white/60"
            style={{
              fontSize: isMobile ? "0.65rem" : "clamp(0.6rem, 1.3vw, 0.9rem)",
            }}
          >
            {String(displayPage + 1).padStart(2, "0")}{" "}
            <span className="text-white/30">/</span>{" "}
            <span className="text-white/30">
              {String(TOTAL_MEMBERS).padStart(2, "0")}
            </span>
          </span>
        </div>
      </div>
      <Navbar />
    </>
  );
}
