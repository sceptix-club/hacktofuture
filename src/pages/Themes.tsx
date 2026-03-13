import { useRef, useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useNavigate } from "react-router-dom";
import { type ThemeSlug } from "../content/data";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const colors = {
  red: "#DA100C",
  yellow: "#FFE105",
  blue: "#50BAEA",
};

/* ─── Theme card data ─── */
const THEME_CARDS = [
  {
    slug: "cloud-architecture" as ThemeSlug,
    title: "Cloud Architecture",
    description:
      "Design self-healing and intelligent cloud systems where autonomous agents monitor infrastructure, diagnose failures, optimize resource allocation, and maintain resilient Kubernetes environments.",
    accent: colors.blue,
    number: "01",
  },
  {
    slug: "devops" as ThemeSlug,
    title: "DevOps",
    description:
      "Reimagine modern DevOps with autonomous agents that monitor pipelines, diagnose failures, repair CI/CD workflows, and orchestrate intelligent software releases while maintaining human oversight.",
    accent: colors.red,
    number: "02",
  },
  {
    slug: "cybersecurity" as ThemeSlug,
    title: "Cybersecurity",
    description:
      "Build the next generation of AI-driven security systems capable of continuously verifying identities, simulating cyber attacks, detecting threats, and autonomously defending enterprise infrastructure.",
    accent: colors.yellow,
    number: "03",
  },
  {
    slug: "open-innovation" as ThemeSlug,
    title: "Open Innovation",
    description:
      "No boundaries. No predefined problems. Bring your boldest ideas, experiment freely, and build something extraordinary. This track celebrates creativity, originality, and fearless execution.",
    accent: "#A855F7",
    number: "04",
  },
];

/* ─── Individual Theme Card ─── */
function ThemeCard({
  theme,
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
    gsap.to(cardRef.current, {
      boxShadow: "8px 8px 0 #000",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "5px 5px 0 #000",
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
      className="relative flex flex-col justify-between cursor-pointer select-none overflow-hidden"
      style={{
        height: "100%",
        background: "#FFFEF2",
        border: "3px solid #000",
        padding: 0,
        willChange: "transform",
        boxShadow: "5px 5px 0 #000",
      }}
    >
      <div style={{ height: 6, background: theme.accent }} />

      <div
        className="absolute pointer-events-none"
        style={{
          top: 6,
          right: 0,
          width: "70%",
          height: "70%",
          backgroundImage: `radial-gradient(circle, rgba(6,0,0,0.1) 1.5px, transparent 1.5px)`,
          backgroundSize: "8px 8px",
          maskImage:
            "radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 30%, transparent 65%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 30%, transparent 65%)",
        }}
      />

      <div
        className="relative flex flex-col justify-between h-full"
        style={{ padding: "clamp(1.25rem, 2.5vw, 2rem)" }}
      >
        <div className="flex items-start justify-between mb-4">
          <span
            className="hero-title font-black"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              color: theme.accent,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {theme.number}
          </span>
        </div>

        <h3
          className="hero-title font-black uppercase mb-3"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.4rem)",
            color: "#111",
            lineHeight: 1.15,
            minHeight: "2.3em",
          }}
        >
          {theme.title}
        </h3>

        <div
          style={{
            width: "clamp(30px, 6vw, 50px)",
            height: 3,
            background: theme.accent,
            marginBottom: "0.75rem",
          }}
        />

        <p
          className="comic-sans"
          style={{
            fontSize: "clamp(0.75rem, 1.2vw, 0.88rem)",
            color: "rgba(0,0,0,0.6)",
            lineHeight: 1.65,
            flexGrow: 1,
          }}
        >
          {theme.description}
        </p>

        <div
          className="flex items-center justify-between mt-5 pt-4"
          style={{ borderTop: "2px solid rgba(0,0,0,0.08)" }}
        >
          <span
            className="comic-sans font-bold flex items-center gap-1"
            style={{
              fontSize: "clamp(0.65rem, 1vw, 0.78rem)",
              color: theme.accent === colors.yellow ? "#b8a000" : theme.accent,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Explore More ...
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Themes Page ─── */
export default function Themes({ loaderDone }: { loaderDone?: boolean }) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const smootherRef = useRef<ScrollSmoother | null>(null);

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

  // ScrollSmoother — only create after loader is done
  useEffect(() => {
    if (!loaderDone) return;

    const timer = setTimeout(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-page-wrapper",
        content: "#smooth-page-content",
        smooth: 0.75,
        effects: false,
        smoothTouch: 0.25,
        normalizeScroll: true,
      });
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      smootherRef.current?.kill();
      smootherRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loaderDone]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/textures/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
          zIndex: 0,
          pointerEvents: "none",
          willChange: "unset",
          transform: "none",
        }}
      />

      <Navbar />

      <div id="smooth-page-wrapper">
        <div id="smooth-page-content">
          <div className="relative w-full min-h-screen">
            <div
              className="relative px-6 md:px-12 lg:px-20 pt-28 pb-24"
              style={{ zIndex: 2 }}
            >
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
                    height: 5,
                    width: "clamp(60px, 10vw, 120px)",
                    background: colors.red,
                    boxShadow: "2px 2px 0 #000",
                  }}
                />

                <p
                  className="comic-sans text-center mt-5 max-w-lg"
                  style={{
                    fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.6,
                  }}
                >
                  Choose a theme and explore the problem statements. Each one is
                  a chance to build something that matters.
                </p>
              </div>

              <div ref={cardsRef} className="max-w-5xl mx-auto">
                <div className="flex flex-col gap-6 md:hidden">
                  {THEME_CARDS.map((theme, index) => (
                    <div
                      key={theme.slug}
                      className="theme-card-wrapper"
                      style={{ minHeight: 320 }}
                    >
                      <ThemeCard
                        theme={theme}
                        index={index}
                        onClick={() => navigate(`/theme/${theme.slug}`)}
                      />
                    </div>
                  ))}
                </div>

                <div
                  className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8"
                  style={{ gridAutoRows: "1fr" }}
                >
                  {THEME_CARDS.map((theme, index) => (
                    <div
                      key={theme.slug}
                      className="theme-card-wrapper"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 380,
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

              <div className="flex items-center justify-center mt-14 gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === 2 ? 32 : i === 1 || i === 3 ? 16 : 8,
                      height: 3,
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
