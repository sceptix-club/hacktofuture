import { useRef, useEffect, useState, useCallback } from "react";
import Navbar from "../components/ui/Navbar";
import gsap from "gsap";

/* ─── Types ─── */
interface Sponsor {
  name: string;
  logo: string;
  url?: string;
  description?: string;
  founded?: string;
  headquarters?: string;
  industry?: string;
}

/* ─── Sponsor Data ─── */
const TITLE_SPONSORS: Sponsor[] = [
  {
    name: "EGDK India",
    logo: "/sponsors/egdk.png",
    url: "#",
    description:
      "EGDK India is a leading technology partner committed to fostering innovation and supporting emerging talent across India's startup ecosystem.",
    founded: "2015",
    headquarters: "Bangalore, India",
    industry: "Technology",
  },
];

const GOLD_SPONSORS: Sponsor[] = [
  {
    name: "Amazon",
    logo: "/sponsors/amazon.png",
    url: "https://amazon.com",
    description:
      "Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.",
    founded: "1994",
    headquarters: "Seattle, USA",
    industry: "E-Commerce / Cloud",
  },
  {
    name: "Google",
    logo: "/sponsors/google.png",
    url: "https://google.com",
    description:
      "Google's mission is to organize the world's information and make it universally accessible and useful.",
    founded: "1998",
    headquarters: "Mountain View, USA",
    industry: "Internet / AI",
  },
  {
    name: "Microsoft",
    logo: "/sponsors/microsoft.png",
    url: "https://microsoft.com",
    description:
      "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
    founded: "1975",
    headquarters: "Redmond, USA",
    industry: "Software / Cloud",
  },
];

const SILVER_SPONSORS: Sponsor[] = [
  {
    name: "IBM",
    logo: "/sponsors/ibm.png",
    url: "https://ibm.com",
    description:
      "IBM is a global technology and consulting company helping clients build smarter businesses.",
    founded: "1911",
    headquarters: "Armonk, USA",
    industry: "Enterprise Tech",
  },
  {
    name: "Intel",
    logo: "/sponsors/intel.png",
    url: "https://intel.com",
    description:
      "Intel delivers world-changing technology that enriches the lives of every person on earth.",
    founded: "1968",
    headquarters: "Santa Clara, USA",
    industry: "Semiconductors",
  },
  {
    name: "Evernote",
    logo: "/sponsors/evernote.png",
    url: "https://evernote.com",
    description:
      "Evernote helps individuals and teams capture ideas, manage tasks, and stay organized.",
    founded: "2004",
    headquarters: "Redwood City, USA",
    industry: "Productivity",
  },
  {
    name: "Oracle",
    logo: "/sponsors/oracle.png",
    url: "https://oracle.com",
    description:
      "Oracle offers integrated suites of applications plus secure, autonomous infrastructure in the Oracle Cloud.",
    founded: "1977",
    headquarters: "Austin, USA",
    industry: "Enterprise Software",
  },
];

const BRONZE_SPONSORS: Sponsor[] = [
  {
    name: "Sponsor A",
    logo: "/sponsors/a.png",
    url: "#",
    description: "Coming soon.",
  },
  {
    name: "Sponsor B",
    logo: "/sponsors/b.png",
    url: "#",
    description: "Coming soon.",
  },
  {
    name: "Sponsor C",
    logo: "/sponsors/c.png",
    url: "#",
    description: "Coming soon.",
  },
  {
    name: "Sponsor D",
    logo: "/sponsors/d.png",
    url: "#",
    description: "Coming soon.",
  },
  {
    name: "Sponsor E",
    logo: "/sponsors/e.png",
    url: "#",
    description: "Coming soon.",
  },
];

const TIER_COLORS = {
  title: "#E8003D",
  gold: "#C8980A",
  silver: "#7A7A7A",
  bronze: "#A0522D",
};

/* ─── Dialog ─── */
function SponsorDialog({
  sponsor,
  accent,
  onClose,
}: {
  sponsor: Sponsor;
  accent: string;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // entrance
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25 }
    );
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
    );
    // lock scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const close = useCallback(() => {
    gsap.to(cardRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.96,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: onClose,
    });
  }, [onClose]);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === backdropRef.current) close();
      }}
    >
      <div
        ref={cardRef}
        className="relative w-full flex flex-col md:flex-row overflow-hidden"
        style={{
          maxWidth: "min(780px, 95vw)",
          background: "#FFFEF2",
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.04) 28px,rgba(0,0,0,0.04) 29px)",
          border: "3px solid #000",
          borderTop: `5px solid ${accent}`,
          borderRadius: "0.75rem",
          boxShadow: "6px 6px 0 rgba(0,0,0,0.7)",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 z-10 flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            border: "2px solid #000",
            borderRadius: "50%",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 900,
            fontSize: 16,
            color: "#111",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Left — logo panel */}
        <div
          className="flex flex-col items-center justify-center p-8 md:p-10 gap-4"
          style={{
            minWidth: "clamp(140px, 30%, 220px)",
            borderBottom: "3px solid #000",
            /* on desktop, right border instead */
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: "clamp(80px, 18vw, 130px)",
              height: "clamp(80px, 18vw, 130px)",
              background: "#fff",
              border: "2.5px solid #000",
              borderRadius: "0.5rem",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.4)",
              padding: 12,
            }}
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const p = (e.currentTarget as HTMLImageElement).parentElement;
                if (p && !p.querySelector(".fb")) {
                  const s = document.createElement("span");
                  s.className = "fb";
                  s.textContent = sponsor.name[0];
                  s.style.cssText = `font-weight:900;font-size:1.4rem;color:${accent};`;
                  p.appendChild(s);
                }
              }}
            />
          </div>

          {sponsor.url && sponsor.url !== "#" && (
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="comic-sans uppercase tracking-widest"
              style={{
                fontSize: "0.65rem",
                color: accent,
                borderBottom: `1px solid ${accent}`,
                paddingBottom: 1,
              }}
            >
              Visit Website →
            </a>
          )}
        </div>

        {/* Divider — vertical on desktop, horizontal on mobile (CSS handles it) */}
        <div
          className="hidden md:block flex-shrink-0"
          style={{ width: 3, background: "#000" }}
        />

        {/* Right — info panel */}
        <div className="flex flex-col gap-4 p-6 md:p-8 flex-1">
          {/* Name + tagline */}
          <div>
            <h2
              className="hero-title font-black uppercase"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2rem)",
                color: "#111",
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {sponsor.name}
            </h2>
          </div>

          {/* Divider */}
          <div style={{ height: 2, background: "#000", opacity: 0.1 }} />

          {/* Description */}
          {sponsor.description && (
            <p
              className="comic-sans"
              style={{
                fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
                color: "rgba(0,0,0,0.7)",
                lineHeight: 1.7,
              }}
            >
              {sponsor.description}
            </p>
          )}

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {sponsor.industry && (
              <span
                className="comic-sans uppercase tracking-wider"
                style={{
                  fontSize: "0.65rem",
                  padding: "3px 10px",
                  border: `2px solid ${accent}`,
                  borderRadius: 2,
                  color: accent,
                  background: `${accent}18`,
                }}
              >
                {sponsor.industry}
              </span>
            )}
            {sponsor.founded && (
              <span
                className="comic-sans uppercase tracking-wider"
                style={{
                  fontSize: "0.65rem",
                  padding: "3px 10px",
                  border: "2px solid #000",
                  borderRadius: 2,
                  color: "#444",
                  background: "rgba(0,0,0,0.05)",
                }}
              >
                Est. {sponsor.founded}
              </span>
            )}
            {sponsor.headquarters && (
              <span
                className="comic-sans uppercase tracking-wider"
                style={{
                  fontSize: "0.65rem",
                  padding: "3px 10px",
                  border: "2px solid #000",
                  borderRadius: 2,
                  color: "#444",
                  background: "rgba(0,0,0,0.05)",
                }}
              >
                📍 {sponsor.headquarters}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Single sponsor card ─── */
function SponsorCard({
  sponsor,
  size,
  accent,
  onOpen,
}: {
  sponsor: Sponsor;
  size: "lg" | "md" | "sm";
  accent: string;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const imgSize = size === "lg" ? 72 : size === "md" ? 54 : 42;

  const cardW =
    size === "lg"
      ? "min(300px, 44vw)"
      : size === "md"
      ? "min(185px, 40vw)"
      : "min(150px, 36vw)";

  const cardH =
    size === "lg"
      ? "min(300px, 44vw)"
      : size === "md"
      ? "min(185px, 40vw)"
      : "min(150px, 36vw)";

  const onEnter = () =>
    gsap.to(ref.current, {
      y: -6,
      scale: 1.04,
      duration: 0.25,
      ease: "power2.out",
    });
  const onLeave = () =>
    gsap.to(ref.current, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });

  return (
    <button
      ref={ref}
      onClick={onOpen}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="flex flex-col items-center justify-center gap-3 cursor-pointer"
      style={{
        width: cardW,
        height: cardH,
        paddingTop: size === "lg" ? 20 : 14,
        paddingBottom: size === "lg" ? 20 : 14,
        paddingLeft: 12,
        paddingRight: 12,
        background: "#FFFEF2",
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.04) 28px,rgba(0,0,0,0.04) 29px)",
        border: "2.5px solid #000",
        borderTop: `4px solid ${accent}`,
        borderRadius: "0.6rem",
        boxShadow: "4px 4px 0 rgba(0,0,0,0.55)",
        willChange: "transform",
        flexShrink: 0,
        textAlign: "center",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center justify-center"
        style={{
          width: imgSize + 16,
          height: imgSize,
        }}
      >
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          style={{
            maxWidth: imgSize,
            maxHeight: imgSize * 0.7,
            objectFit: "contain",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const p = (e.currentTarget as HTMLImageElement).parentElement;
            if (p && !p.querySelector(".fb")) {
              const s = document.createElement("span");
              s.className = "fb";
              s.textContent = sponsor.name[0];
              s.style.cssText = `font-weight:900;font-size:1.4rem;color:${accent};`;
              p.appendChild(s);
            }
          }}
        />
      </div>

      {/* Divider */}
      <div
        style={{ width: "60%", height: 1.5, background: "#000", opacity: 0.1 }}
      />

      {/* Name */}
      <span
        className="hero-title uppercase"
        style={{
          fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
          color: "#111",
          letterSpacing: "0.05em",
          lineHeight: 1.2,
        }}
      >
        {sponsor.name}
      </span>

      {/* Learn more hint */}
      <span
        className="comic-sans"
        style={{
          fontSize: "0.6rem",
          color: accent,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0.8,
        }}
      >
        tap to learn more
      </span>
    </button>
  );
}

/* ─── Tier row ─── */
function TierRow({
  label,
  accent,
  sponsors,
  size,
}: {
  label: string;
  accent: string;
  sponsors: Sponsor[];
  size: "lg" | "md" | "sm";
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Sponsor | null>(null);

  useEffect(() => {
    if (!rowRef.current) return;
    const cards = rowRef.current.querySelectorAll(".sponsor-card-wrap");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.1,
      }
    );
  }, []);

  return (
    <>
      {active && (
        <SponsorDialog
          sponsor={active}
          accent={accent}
          onClose={() => setActive(null)}
        />
      )}

      <div className="flex flex-col items-center gap-5 w-full">
        {/* Tier label */}
        <div className="flex items-center gap-3 w-full max-w-4xl">
          <div
            style={{ flex: 1, height: 2, background: accent, opacity: 0.4 }}
          />
          <div
            className="px-4 py-1"
            style={{ border: `2px solid ${accent}`, borderRadius: "2px" }}
          >
            <span
              className="hero-title uppercase tracking-widest"
              style={{
                fontSize: "clamp(0.6rem, 1.4vw, 0.8rem)",
                color: accent,
              }}
            >
              {label}
            </span>
          </div>
          <div
            style={{ flex: 1, height: 2, background: accent, opacity: 0.4 }}
          />
        </div>

        {/* Cards */}
        <div
          ref={rowRef}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {sponsors.map((s) => (
            <div key={s.name} className="sponsor-card-wrap">
              <SponsorCard
                sponsor={s}
                size={size}
                accent={accent}
                onOpen={() => setActive(s)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Main Page ─── */
export default function Sponsors() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
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
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            zIndex: 0,
          }}
        />

        <div
          className="relative px-6 md:px-12 lg:px-20 pt-28 pb-24 flex flex-col items-center gap-14 md:gap-20"
          style={{ zIndex: 1 }}
        >
          {/* Header */}
          <div ref={headerRef} className="flex flex-col -mt-12 items-center">
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
              className="hero-title text-center font-black uppercase"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                lineHeight: 0.9,
                color: "#fff",
              }}
            >
              Sponsors
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

          <TierRow
            label="Title Sponsors"
            accent={TIER_COLORS.title}
            sponsors={TITLE_SPONSORS}
            size="lg"
          />
          <TierRow
            label="Gold Sponsors"
            accent={TIER_COLORS.gold}
            sponsors={GOLD_SPONSORS}
            size="lg"
          />
          <TierRow
            label="Silver Sponsors"
            accent={TIER_COLORS.silver}
            sponsors={SILVER_SPONSORS}
            size="md"
          />
          <TierRow
            label="Bronze Sponsors"
            accent={TIER_COLORS.bronze}
            sponsors={BRONZE_SPONSORS}
            size="sm"
          />
        </div>
      </div>
    </>
  );
}
