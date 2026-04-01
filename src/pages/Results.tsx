import { useRef, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Trophy, Shield, Cloud, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/* ─── Types ─── */
interface Team {
  rank: number;
  teamName: string;
  college: string;
}

interface ThemeResults {
  theme: string;
  teams: Team[];
}

/* ─── Theme Config ─── */
const THEME_CONFIG: Record<
  string,
  {
    color: string;
    textColor: string;
    icon: React.ReactNode;
    label: string;
  }
> = {
  devops: {
    color: "#DA100C",
    textColor: "#000",
    icon: <Trophy size={20} />,
    label: "DevOps",
  },
  cybersecurity: {
    color: "#FFE105",
    textColor: "#000",
    icon: <Shield size={20} />,
    label: "Cybersecurity",
  },
  cloud: {
    color: "#50BAEA",
    textColor: "#000",
    icon: <Cloud size={20} />,
    label: "Cloud Architecture",
  },
  "open innovation": {
    color: "#A855F7",
    textColor: "#000",
    icon: <Lightbulb size={20} />,
    label: "Open Innovation",
  },
};

/* ─── Rank Badge ─── */
function RankBadge({ rank }: { rank: number }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: 36,
        height: 36,
        background: "#FFFEF2",
        border: `3px solid #000`,
        borderRadius: 0,
        boxShadow: "2px 2px 0 #000",
        fontFamily: "inherit",
        flexShrink: 0,
      }}
    >
      <span
        className="hero-title font-black"
        style={{ fontSize: "0.75rem", color: "#444", lineHeight: 1 }}
      >
        {rank}
      </span>
    </div>
  );
}

/* ─── Team Row ─── */
function TeamRow({
  team,
  index,
}: {
  team: Team;
  accent: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: index * 0.055,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );
  }, [index]);

  return (
    <div
      ref={ref}
      className="flex items-center gap-3 w-full"
      style={{
        padding: "0.65rem 1rem",
        background: "#FFFEF2",
        border: "2px solid #000",
        borderLeft: "3px solid rgba(0,0,0,0.15)",
        borderRadius: 0,
        boxShadow: "2px 2px 0 rgba(0,0,0,0.25)",
        marginBottom: "0.4rem",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          y: -3,
          boxShadow: "5px 5px 0 rgba(0,0,0,0.5)",
          duration: 0.2,
        });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          y: 0,
          boxShadow: "2px 2px 0 rgba(0,0,0,0.25)",
          duration: 0.2,
        });
      }}
    >
      <RankBadge rank={team.rank} />

      <div className="flex flex-col flex-1 min-w-0">
        <span
          className="hero-title font-black uppercase truncate"
          style={{
            fontSize: "clamp(0.75rem, 1.6vw, 0.9rem)",
            color: "#111",
            lineHeight: 1.15,
            letterSpacing: "0.03em",
          }}
        >
          {team.teamName}
        </span>
        <span
          className="comic-sans truncate"
          style={{
            fontSize: "clamp(0.6rem, 1.1vw, 0.72rem)",
            color: "rgba(0,0,0,0.5)",
            letterSpacing: "0.04em",
            marginTop: 2,
            textTransform: "uppercase",
          }}
        >
          {team.college}
        </span>
      </div>
    </div>
  );
}

/* ─── Theme Section ─── */
function ThemeSection({ data }: { data: ThemeResults }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const key = data.theme.toLowerCase();
  const config = THEME_CONFIG[key] ?? {
    color: "#E8003D",
    textColor: "#000",
    icon: <Trophy size={20} />,
    label: data.theme,
  };

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  return (
    <div ref={sectionRef} className="w-full flex flex-col items-center gap-6">
      {/* Theme Header */}
      <div ref={headerRef} className="flex items-center gap-4 w-full max-w-3xl">
        <div
          style={{
            height: 3,
            flex: 1,
            background: config.color,
            boxShadow: "2px 2px 0 #000",
          }}
        />
        <div
          className="flex items-center gap-2"
          style={{
            background: config.color,
            color: config.textColor,
            padding: "0.45rem 1.1rem",
            border: "3px solid #000",
            boxShadow: "3px 3px 0 #000",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            {config.icon}
          </span>
          <span
            className="comic-sans font-bold"
            style={{
              fontSize: "clamp(0.75rem, 1.3vw, 0.9rem)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {config.label}
          </span>
        </div>
        <div
          style={{
            height: 3,
            flex: 1,
            background: config.color,
            boxShadow: "2px 2px 0 #000",
          }}
        />
      </div>

      {/* Teams Grid */}
      <div
        className="w-full max-w-3xl flex flex-col"
        style={{ paddingBottom: "0.5rem" }}
      >
        {data.teams.map((team, i) => (
          <TeamRow
            key={`${team.teamName}-${i}`}
            team={team}
            accent={config.color}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Placeholder / Loading ─── */
function ResultsSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-3xl">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "100%",
            height: 56,
            background: "rgba(255,255,255,0.08)",
            border: "2px solid rgba(255,255,255,0.15)",
            borderRadius: 0,
            animation: "pulse 1.5s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function Results({
  loaderDone,
  showResults = true,
}: {
  loaderDone?: boolean;
  showResults?: boolean;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  // ── Replace this with your actual fetch ──
  const [results, setResults] = useState<ThemeResults[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    if (!showResults) return;

    // TODO: replace with your actual JSON endpoint
    // fetch("/api/results.json")
    //   .then((r) => r.json())
    //   .then((data) => { setResults(data); setLoading(false); })
    //   .catch(() => { setError("Failed to load results."); setLoading(false); });

    // ── Demo data (remove once you wire up the fetch above) ──
    const demo: ThemeResults[] = [
      {
        theme: "DevOps",
        teams: Array.from({ length: 10 }, (_, i) => ({
          rank: i + 1,
          teamName: `Team ${["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet"][i]}`,
          college: `St. Joseph's Engineering College`,
        })),
      },
      {
        theme: "Cybersecurity",
        teams: Array.from({ length: 10 }, (_, i) => ({
          rank: i + 1,
          teamName: `Team ${["Phantom", "Cipher", "Ghost", "Venom", "Stealth", "Specter", "Shadow", "Nexus", "Recon", "Siege"][i]}`,
          college: `NMAM Institute of Technology`,
        })),
      },
      {
        theme: "Cloud Architecture",
        teams: Array.from({ length: 10 }, (_, i) => ({
          rank: i + 1,
          teamName: `Team ${["Nimbus", "Stratus", "Cirrus", "Cumulus", "Aurora", "Zephyr", "Aether", "Nimbostratus", "Altus", "Celesta"][i]}`,
          college: `Manipal Institute of Technology`,
        })),
      },
      {
        theme: "Open Innovation",
        teams: Array.from({ length: 10 }, (_, i) => ({
          rank: i + 1,
          teamName: `Team ${["Forge", "Spark", "Blaze", "Flux", "Pioneer", "Vanguard", "Odyssey", "Zenith", "Apex", "Nova"][i]}`,
          college: `Sahyadri College of Engineering`,
        })),
      },
    ];
    setTimeout(() => {
      setResults(demo);
      setLoading(false);
    }, 600);
  }, [showResults]);

  /* Header animation */
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 },
    );
  }, []);

  /* ScrollSmoother — only after loader */
  useEffect(() => {
    if (!loaderDone) return;
    const timer = setTimeout(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#results-smooth-wrapper",
        content: "#results-smooth-content",
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
      {/* Background */}
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

      {/* Dot grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          zIndex: 1,
        }}
      />

      <Navbar />

      <div id="results-smooth-wrapper" style={{ zIndex: 2 }}>
        <div id="results-smooth-content">
          <div className="relative w-full min-h-screen">
            <div className="relative px-6 md:px-12 lg:px-20 pt-28 pb-24 flex flex-col items-center gap-16 md:gap-20">
              {/* ── Page Header ── */}
              <div
                ref={headerRef}
                className="-mt-12 mb-6 flex flex-col items-center"
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
                  className="hero-title text-center font-black uppercase"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 5rem)",
                    lineHeight: 0.9,
                    color: "#fff",
                  }}
                >
                  Results
                </h1>

                <div
                  className="mt-4"
                  style={{
                    height: 5,
                    width: "clamp(60px, 10vw, 120px)",
                    background: "#E8003D",
                    boxShadow: "2px 2px 0 #000",
                  }}
                />

                {showResults && (
                  <p
                    className="comic-sans text-center mt-5 max-w-lg -mb-[6vw]"
                    style={{
                      fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.6,
                    }}
                  >
                    Congratulations to all the finalists and winners of
                    HackToFuture 4.0 across all four tracks.
                  </p>
                )}
              </div>

              {/* ── Results ── */}
              {!showResults ? (
                <div
                  className="flex flex-col items-center justify-center gap-4"
                  style={{ minHeight: "30vh", textAlign: "center" }}
                >
                  <div
                    style={{
                      background: "#FFFEF2",
                      border: "3px solid #000",
                      boxShadow: "5px 5px 0 #000",
                      padding: "2.5rem 3rem",
                    }}
                  >
                    <p
                      className="hero-title font-black uppercase"
                      style={{
                        fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                        color: "#DA100C",
                        letterSpacing: "0.04em",
                        lineHeight: 1.2,
                      }}
                    >
                      Results coming soon...
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {loading && <ResultsSkeleton />}

                  {error && (
                    <div
                      className="comic-sans text-center"
                      style={{
                        color: "#DA100C",
                        background: "#FFFEF2",
                        border: "3px solid #000",
                        padding: "1.5rem 2rem",
                        boxShadow: "4px 4px 0 #000",
                        fontSize: "0.9rem",
                      }}
                    >
                      ⚠ {error}
                    </div>
                  )}

                  {!loading &&
                    !error &&
                    results &&
                    results.map((themeData) => (
                      <ThemeSection key={themeData.theme} data={themeData} />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
}
