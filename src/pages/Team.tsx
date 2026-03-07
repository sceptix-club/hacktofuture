import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import Navbar from "../components/ui/Navbar";
import "../App.css";
import { TEAM_MEMBERS } from "../content/team";
import type { TeamMember } from "../content/team";
import { coreTeamPrefix } from "../lib/utils";

const TOTAL_MEMBERS = TEAM_MEMBERS.length;
const TOTAL_SHEETS = TOTAL_MEMBERS - 1;

const paperStyle: CSSProperties = {
  background: "#fffdf3",
  backgroundImage: `
    radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 28px,
      rgba(0,0,0,0.03) 28px,
      rgba(0,0,0,0.03) 29px
    )
  `,
  backgroundSize: "8px 8px, auto",
};

const pageBlockerStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#fffdf3",
  zIndex: 0,
};

function useIsMobile(breakpoint = 900) {
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

function getPhotoSrc(member: TeamMember) {
  return member.photo ? `${coreTeamPrefix}${member.photo}` : undefined;
}

function PhotoContent({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const photoSrc = getPhotoSrc(member);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative"
      style={{ padding: "16px 24px 16px 40px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={paperStyle}
      />
      <div
        className="absolute hero-title text-black/25"
        style={{ fontSize: "0.55rem", top: 12, left: 16 }}
      >
        PAGE {index * 2 + 1}
      </div>

      <div className="relative z-10">
        <div
          style={{
            position: "absolute",
            width: 34,
            height: 12,
            background: "rgba(255, 224, 130, 0.85)",
            border: "2px solid rgba(0,0,0,0.15)",
            top: -8,
            left: 12,
            transform: "rotate(-12deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 34,
            height: 12,
            background: "rgba(255, 224, 130, 0.85)",
            border: "2px solid rgba(0,0,0,0.15)",
            top: -6,
            right: 10,
            transform: "rotate(10deg)",
          }}
        />
        <div
          style={{
            border: "3px solid #000",
            borderRadius: 4,
            boxShadow: "6px 6px 0 rgba(0,0,0,0.28)",
            padding: 8,
            background: "#fff",
            transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
          }}
        >
          <img
            src={photoSrc}
            alt={member.name}
            loading="eager"
            decoding="async"
            style={{
              width: 190,
              height: 240,
              objectFit: "cover",
              border: "2px solid #000",
              borderRadius: 2,
              filter: "contrast(1.04) saturate(1.06)",
            }}
          />
          <div
            className="text-center mt-1 hero-title text-black"
            style={{ fontSize: "0.7rem" }}
          >
            ★ MEMBER #{index + 1} ★
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailsContent({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center relative"
      style={{ padding: "16px 24px 16px 40px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={paperStyle}
      />
      <div
        className="absolute hero-title text-black/25"
        style={{ fontSize: "0.55rem", top: 12, right: 16 }}
      >
        PAGE {index * 2 + 2}
      </div>

      <div
        className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.07), transparent)",
        }}
      />

      <div
        className="absolute top-6 right-5 pointer-events-none"
        style={{
          padding: "4px 10px",
          border: "2px dashed #DA100C",
          color: "#DA100C",
          fontSize: "0.55rem",
          fontFamily: "'Dela Gothic One', sans-serif",
          transform: "rotate(7deg)",
          background: "rgba(255,255,255,0.85)",
        }}
      >
        TEAM FILE
      </div>

      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ maxWidth: 400 }}
      >
        <div
          className="mb-2 inline-block"
          style={{
            background: "#000",
            color: "#fff",
            transform: "skewX(-3deg)",
            boxShadow: "4px 4px 0 rgba(218,16,12,0.85)",
            padding: "8px 18px",
          }}
        >
          <h2
            className="hero-title text-center"
            style={{
              fontSize: "clamp(1rem, 3vw, 2.2rem)",
              transform: "skewX(3deg)",
            }}
          >
            {member.name}
          </h2>
        </div>

        <div
          className="mb-3 mt-2 inline-block px-3 py-1"
          style={{
            border: "2px solid #DA100C",
            borderRadius: 4,
            color: "#DA100C",
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: "clamp(0.65rem, 1.2vw, 1rem)",
            boxShadow: "2px 2px 0 rgba(0,0,0,0.18)",
            background: "rgba(255,255,255,0.9)",
          }}
        >
          {member.role}
        </div>
{/* 
        <p
          className="comic-sans text-black/80 leading-relaxed text-center"
          style={{
            fontSize: "clamp(0.78rem, 1.4vw, 1.02rem)",
            marginBottom: 18,
            maxWidth: 400,
          }}
        >
          {member.bio}
        </p> */}

        <div
          style={{
            height: 3,
            width: 52,
            background: "linear-gradient(90deg, #DA100C, #000)",
            marginBottom: 14,
          }}
        />

        <div className="flex flex-wrap justify-center gap-2 pb-1">
          {member.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="comic-sans text-white"
              style={{
                background: "#000",
                border: "2px solid #000",
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: "0.65rem",
                boxShadow: "2px 2px 0 rgba(218,16,12,0.65)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

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
    </div>
  );
}

function MobileMemberCard({
  member,
  index,
  dragX,
}: {
  member: TeamMember;
  index: number;
  dragX: number;
}) {
  const photoSrc = getPhotoSrc(member);
  const rotation = dragX * 0.04;
  const likeOpacity = Math.max(0, Math.min(1, dragX / 80));
  const nopeOpacity = Math.max(0, Math.min(1, -dragX / 80));

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        ...paperStyle,
        border: "3px solid #000",
        borderRadius: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35), 5px 5px 0 rgba(0,0,0,0.25)",
        width: 250,
        height: 350,
        transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
        transition:
          dragX === 0
            ? "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)"
            : "none",
        cursor: "grab",
        willChange: "transform",
      }}
    >
      {/* Like indicator */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 12,
          zIndex: 20,
          border: "3px solid #22c55e",
          borderRadius: 6,
          padding: "2px 8px",
          color: "#22c55e",
          fontFamily: "'Dela Gothic One', sans-serif",
          fontSize: "0.75rem",
          transform: "rotate(-20deg)",
          opacity: likeOpacity,
          pointerEvents: "none",
        }}
      >
        NEXT
      </div>

      {/* Nope indicator */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 12,
          zIndex: 20,
          border: "3px solid #DA100C",
          borderRadius: 6,
          padding: "2px 8px",
          color: "#DA100C",
          fontFamily: "'Dela Gothic One', sans-serif",
          fontSize: "0.75rem",
          transform: "rotate(20deg)",
          opacity: nopeOpacity,
          pointerEvents: "none",
        }}
      >
        BACK
      </div>

      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{ background: "linear-gradient(90deg, #DA100C, #000, #DA100C)" }}
      />
      <div
        className="absolute top-3 left-3"
        style={{
          padding: "3px 8px",
          background: "#000",
          color: "#fff",
          borderRadius: 999,
          fontSize: "0.6rem",
          fontFamily: "'Dela Gothic One', sans-serif",
        }}
      >
        #{String(index + 1).padStart(2, "0")}
      </div>

      <div className="p-3 pt-7 mt-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div
              style={{
                position: "absolute",
                width: 28,
                height: 8,
                background: "rgba(255, 224, 130, 0.85)",
                border: "2px solid rgba(0,0,0,0.15)",
                top: -5,
                left: 10,
                transform: "rotate(-14deg)",
              }}
            />
            <div
              style={{
                border: "3px solid #000",
                borderRadius: 6,
                background: "#fff",
                padding: 5,
                boxShadow: "3px 3px 0 rgba(0,0,0,0.24)",
                transform: "rotate(-2deg)",
              }}
            >
              <img
                src={photoSrc}
                alt={member.name}
                loading="eager"
                decoding="async"
                style={{
                  width: 130,
                  height: 155,
                  objectFit: "cover",
                  borderRadius: 4,
                  border: "2px solid #000",
                }}
              />
            </div>
          </div>

          <div
            style={{
              background: "#000",
              color: "#fff",
              display: "inline-block",
              padding: "5px 10px",
              transform: "skewX(-4deg)",
              boxShadow: "3px 3px 0 rgba(218,16,12,0.8)",
              marginBottom: 6,
            }}
          >
            <h2
              className="hero-title"
              style={{
                transform: "skewX(4deg)",
                fontSize: "clamp(0.85rem, 4vw, 1.2rem)",
                lineHeight: 1,
              }}
            >
              {member.name}
            </h2>
          </div>

          <div
            style={{
              border: "2px solid #DA100C",
              color: "#DA100C",
              borderRadius: 6,
              padding: "2px 7px",
              fontSize: "0.6rem",
              fontFamily: "'Dela Gothic One', sans-serif",
              background: "rgba(255,255,255,0.92)",
              marginBottom: 8,
            }}
          >
            {member.role}
          </div>

          <div
            style={{
              height: 3,
              width: 36,
              background: "linear-gradient(90deg, #DA100C, #000)",
              marginBottom: 8,
            }}
          />

          <div className="flex flex-wrap justify-center gap-2 pb-1">
            {member.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="comic-sans text-white"
                style={{
                  background: "#000",
                  border: "2px solid #000",
                  borderRadius: 6,
                  padding: "3px 8px",
                  fontSize: "0.6rem",
                  boxShadow: "2px 2px 0 rgba(218,16,12,0.65)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const isMobile = useIsMobile();
  const [displayPage, setDisplayPage] = useState(0);
  const [dragX, setDragX] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const sheetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentMemberRef = useRef(0);
  const isAnimating = useRef(false);
  const flippedState = useRef<boolean[]>(new Array(TOTAL_SHEETS).fill(false));

  // Tinder swipe state
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  useEffect(() => {
    currentMemberRef.current = displayPage;
  }, [displayPage]);

  useEffect(() => {
    TEAM_MEMBERS.forEach((member) => {
      const src = getPhotoSrc(member);
      if (!src) return;
      const img = new Image();
      img.src = src;
      img.decoding = "async";
      img.decode?.().catch(() => {});
    });
  }, []);

  const setSheetRef = (index: number) => (el: HTMLDivElement | null) => {
    sheetRefs.current[index] = el;
  };

  const rebuildZIndices = () => {
    sheetRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        zIndex: flippedState.current[i] ? i + 1 : TOTAL_SHEETS - i,
      });
    });
  };

  useEffect(() => {
    if (isMobile) return;

    sheetRefs.current.forEach((el, i) => {
      if (!el) return;
      const flipped = i < displayPage;
      flippedState.current[i] = flipped;
      gsap.set(el, { rotateY: flipped ? -180 : 0 });
    });

    rebuildZIndices();
  }, [isMobile, displayPage]);

  useEffect(() => {
    const target = isMobile ? mobileCardRef.current : bookRef.current;
    if (!target) return;

    gsap.fromTo(
      target,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" }
    );
  }, [isMobile]);

  const flipForward = () => {
    if (isAnimating.current) return;

    if (isMobile) {
      if (currentMemberRef.current >= TOTAL_MEMBERS - 1) {
        setDragX(0);
        return;
      }
      const next = currentMemberRef.current + 1;
      currentMemberRef.current = next;
      setDragX(0);
      setDisplayPage(next);
      return;
    }

    const cur = currentMemberRef.current;
    if (cur >= TOTAL_MEMBERS - 1) return;

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
        const next = cur + 1;
        currentMemberRef.current = next;
        setDisplayPage(next);
        rebuildZIndices();
        isAnimating.current = false;
      },
    });
  };

  const flipBackward = () => {
    if (isAnimating.current) return;

    if (isMobile) {
      if (currentMemberRef.current <= 0) {
        setDragX(0);
        return;
      }
      const next = currentMemberRef.current - 1;
      currentMemberRef.current = next;
      setDragX(0);
      setDisplayPage(next);
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
        const next = cur - 1;
        currentMemberRef.current = next;
        setDisplayPage(next);
        rebuildZIndices();
        isAnimating.current = false;
      },
    });
  };

  const jumpToPage = (target: number) => {
    if (target < 0 || target >= TOTAL_MEMBERS) return;
    if (isAnimating.current) return;

    if (isMobile) {
      currentMemberRef.current = target;
      setDragX(0);
      setDisplayPage(target);
      return;
    }

    isAnimating.current = true;

    sheetRefs.current.forEach((el, i) => {
      if (!el) return;
      const flipped = i < target;
      flippedState.current[i] = flipped;
      gsap.set(el, { rotateY: flipped ? -180 : 0 });
    });

    rebuildZIndices();
    currentMemberRef.current = target;
    setDisplayPage(target);

    setTimeout(() => {
      isAnimating.current = false;
    }, 100);
  };

  // Tinder swipe handlers for mobile
  useEffect(() => {
    if (!isMobile) return;

    const SWIPE_THRESHOLD = 60;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      dragStartX.current = e.touches[0].clientX;
      isDragging.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;

      if (!isDragging.current) {
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
          isDragging.current = true;
        } else if (Math.abs(dy) > 8) {
          return;
        }
      }

      if (isDragging.current) {
        e.preventDefault();
        const cur = currentMemberRef.current;
        const clampedDx =
          (dx > 0 && cur === 0) || (dx < 0 && cur === TOTAL_MEMBERS - 1)
            ? dx * 0.2
            : dx;
        setDragX(clampedDx);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const dx = e.changedTouches[0].clientX - touchStartX.current;

      if (dx < -SWIPE_THRESHOLD) {
        flipForward();
      } else if (dx > SWIPE_THRESHOLD) {
        flipBackward();
      } else {
        setDragX(0);
      }
    };

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile]);

  // Desktop wheel + touch
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 28) return;
      if (e.deltaY > 0) flipForward();
      else flipBackward();
    };

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (tracking) e.preventDefault();
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

      if (absDX < 36 && absDY < 36) return;

      if (absDY >= absDX) {
        if (deltaY > 0) flipForward();
        else flipBackward();
      } else {
        if (deltaX > 0) flipForward();
        else flipBackward();
      }
    };

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") flipForward();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") flipBackward();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobile]);

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
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg) translateZ(1px)",
            overflow: "hidden",
            ...paperStyle,
            border: "4px solid #000",
            borderLeft: "2px solid #000",
            borderRadius: "0 8px 8px 0",
            boxShadow: "6px 6px 0 rgba(0,0,0,0.35)",
          }}
        >
          <div style={pageBlockerStyle} />
          <div className="relative z-10 w-full h-full">
            <DetailsContent member={TEAM_MEMBERS[i]} index={i} />
          </div>
        </div>

        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
            overflow: "hidden",
            ...paperStyle,
            border: "4px solid #000",
            borderRight: "2px solid #000",
            borderRadius: "8px 0 0 8px",
            boxShadow: "-6px 6px 0 rgba(0,0,0,0.35)",
          }}
        >
          <div style={pageBlockerStyle} />
          <div className="relative z-10 w-full h-full">
            <PhotoContent member={TEAM_MEMBERS[i + 1]} index={i + 1} />
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
                "radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.75) 100%)",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-6 md:px-12 pt-6 pb-4 flex flex-col items-center max-md:mt-6">
          <p
            className="comic-sans uppercase tracking-widest mb-3 text-center"
            style={{
              fontSize: "clamp(0.68rem, 1.3vw, 0.85rem)",
              color: "rgba(255,255,255,0.64)",
            }}
          >
            HackToFuture 4.0
          </p>

          <h1
            className="hero-title font-black uppercase text-center"
            style={{
              fontSize: "clamp(2.2rem, 9vw, 5rem)",
              lineHeight: 0.92,
              color: "#fff",
            }}
          >
            Our Team
          </h1>

          <div
            className="mt-4"
            style={{
              height: 3,
              width: "clamp(60px, 10vw, 100px)",
              background: "#E8003D",
            }}
          />
        </div>

        {isMobile ? (
          <div
            className="absolute inset-x-0 z-20 flex items-center justify-center"
            style={{ top: 140, bottom: 110 }}
          >
            <div ref={mobileCardRef} className="flex justify-center">
              <MobileMemberCard
                member={TEAM_MEMBERS[displayPage]}
                index={displayPage}
                dragX={dragX}
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
            <div
              ref={bookRef}
              style={{
                width: "min(92vw, 980px)",
                height: "min(62vh, 520px)",
                perspective: "2500px",
                perspectiveOrigin: "50% 50%",
                position: "relative",
                marginTop: 48,
              }}
            >
              <div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute left-0 top-0 w-1/2 h-full overflow-hidden"
                  style={{
                    ...paperStyle,
                    border: "4px solid #000",
                    borderRight: "2px solid #000",
                    borderRadius: "8px 0 0 8px",
                    boxShadow: "-6px 6px 0 rgba(0,0,0,0.35)",
                    zIndex: 0,
                  }}
                >
                  <div style={pageBlockerStyle} />
                  <div className="relative z-10 w-full h-full">
                    <PhotoContent member={TEAM_MEMBERS[0]} index={0} />
                  </div>
                </div>

                <div
                  className="absolute right-0 top-0 w-1/2 h-full overflow-hidden"
                  style={{
                    ...paperStyle,
                    border: "4px solid #000",
                    borderLeft: "2px solid #000",
                    borderRadius: "0 8px 8px 0",
                    boxShadow: "6px 6px 0 rgba(0,0,0,0.35)",
                    zIndex: 0,
                  }}
                >
                  <div style={pageBlockerStyle} />
                  <div className="relative z-10 w-full h-full">
                    <DetailsContent
                      member={TEAM_MEMBERS[TOTAL_MEMBERS - 1]}
                      index={TOTAL_MEMBERS - 1}
                    />
                  </div>
                </div>

                {renderSheets()}

                <div
                  className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{
                    width: 12,
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
                    borderRadius: 2,
                    zIndex: TOTAL_SHEETS + 20,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div
          className="absolute z-30 flex gap-2 items-center"
          style={
            isMobile
              ? {
                  left: "50%",
                  bottom: 72,
                  transform: "translateX(-50%)",
                }
              : {
                  right: 24,
                  top: "50%",
                  transform: "translateY(-50%)",
                  flexDirection: "column",
                }
          }
        >
          {TEAM_MEMBERS.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpToPage(i)}
              style={{
                width: displayPage === i ? 14 : 8,
                height: displayPage === i ? 14 : 8,
                borderRadius: 2,
                background:
                  displayPage === i ? "#DA100C" : "rgba(255,255,255,0.28)",
                border: `2px solid ${
                  displayPage === i ? "#000" : "rgba(255,255,255,0.18)"
                }`,
                boxShadow: displayPage === i ? "2px 2px 0 #000" : "none",
                transform: `rotate(${displayPage === i ? 45 : 0}deg)`,
                cursor: "pointer",
              }}
              title={`Member ${i + 1}`}
              aria-label={`Go to member ${i + 1}`}
            />
          ))}
        </div>

        <div
          className="absolute z-30"
          style={
            isMobile
              ? { bottom: 100, left: "50%", transform: "translateX(-50%)" }
              : { right: 24, bottom: 80 }
          }
        >
          <span
            className="hero-title text-white/60"
            style={{ fontSize: isMobile ? "0.72rem" : "0.9rem" }}
          >
            {String(displayPage + 1).padStart(2, "0")}{" "}
            <span className="text-white/30">/</span>{" "}
            <span className="text-white/30">
              {String(TOTAL_MEMBERS).padStart(2, "0")}
            </span>
          </span>
        </div>

        {isMobile && (
          <div
            className="absolute left-1/2 z-30 flex items-center gap-3"
            style={{ bottom: 20, transform: "translateX(-50%)" }}
          >
            <button
              onClick={flipBackward}
              disabled={displayPage === 0}
              style={{
                padding: "8px 14px",
                borderRadius: 12,
                border: "2px solid #000",
                background: displayPage === 0 ? "#bdbdbd" : "#fff",
                color: "#000",
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: "0.72rem",
                boxShadow: "3px 3px 0 rgba(0,0,0,0.25)",
                opacity: displayPage === 0 ? 0.6 : 1,
              }}
            >
              ← Prev
            </button>

            <button
              onClick={flipForward}
              disabled={displayPage === TOTAL_MEMBERS - 1}
              style={{
                padding: "8px 14px",
                borderRadius: 12,
                border: "2px solid #000",
                background:
                  displayPage === TOTAL_MEMBERS - 1 ? "#bdbdbd" : "#DA100C",
                color: "#fff",
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: "0.72rem",
                boxShadow: "3px 3px 0 rgba(0,0,0,0.25)",
                opacity: displayPage === TOTAL_MEMBERS - 1 ? 0.6 : 1,
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <Navbar />
    </>
  );
}
