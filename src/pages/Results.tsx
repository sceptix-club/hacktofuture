import { useRef, useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Trophy, Shield, Cloud, Lightbulb } from "lucide-react";
import resultsData from "../content/results.json";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/* ─── Types ─── */
interface Team {
  teamName: string;
  college: string;
  teamLeader?: string;
}

interface ThemeResults {
  theme: string;
  teams: Team[];
}

/* ─── Theme Config ─── */
const THEME_CONFIG: Record<
  string,
  { color: string; textColor: string; icon: React.ReactNode; label: string }
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

/* ─── Team Row — no GSAP, always visible ─── */
function TeamRow({ team }: { team: Team }) {
  return (
    <div
      className="flex items-center gap-4 w-full"
      style={{
        padding: "0.85rem 1.1rem",
        background: "#FFFEF2",
        border: "2px solid #000",
        boxShadow: "2px 2px 0 rgba(0,0,0,0.3)",
        marginBottom: "0.5rem",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-3px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "5px 5px 0 rgba(0,0,0,0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "2px 2px 0 rgba(0,0,0,0.3)";
      }}
    >
      <div className="flex flex-col flex-1 min-w-0">
        <span
          className="hero-title font-black uppercase truncate"
          style={{
            fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
            color: "#111",
            lineHeight: 1.1,
            letterSpacing: "0.03em",
          }}
        >
          {team.teamName}
        </span>

        {/* Separator Line */}
        <div 
          style={{ 
            height: "1px", 
            background: "rgba(0,0,0,0.1)", 
            margin: "6px 0 4px 0",
            width: "100%"
          }} 
        />

        <div className="flex flex-col gap-0.5">
          <span
            className="comic-sans truncate"
            style={{
              fontSize: "clamp(0.6rem, 1.1vw, 0.72rem)",
              color: "rgba(0,0,0,0.6)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Leader: {team.teamLeader || "Not Specified"}
          </span>
          <span
            className="comic-sans truncate"
            style={{
              fontSize: "clamp(0.6rem, 1.1vw, 0.72rem)",
              color: "rgba(0,0,0,0.45)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {team.college}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Theme Section — no GSAP on rows ─── */
function ThemeSection({ data }: { data: ThemeResults }) {
  const key = data.theme.toLowerCase().trim();
  const config = THEME_CONFIG[key] ?? {
    color: "#E8003D",
    textColor: "#000",
    icon: <Trophy size={20} />,
    label: data.theme,
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Theme Header */}
      <div className="flex items-center gap-4 w-full max-w-3xl">
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

      {/* Teams */}
      <div
        className="w-full max-w-3xl flex flex-col"
        style={{ paddingBottom: "0.5rem" }}
      >
        {data.teams.map((team, i) => (
          <TeamRow key={`${team.teamName}-${i}`} team={team} />
        ))}
      </div>
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

  const results = resultsData as ThemeResults[];

  /* Only animate the page header — nothing else touches GSAP */
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.15 },
    );
  }, []);

  /* ScrollSmoother */
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
              {/* Page Header */}
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
                  <>
                    <p
                      className="comic-sans text-center mt-5 max-w-lg -mb-[3vh]"
                      style={{
                        fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.6,
                      }}
                    >
                      Meet the teams shortlisted for HackToFuture 4.0 across all
                      four tracks.
                    </p>
                    {/* <p
                      className="comic-sans text-center mt-5 max-w-lg -mb-[3vh]"
                      style={{
                        fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.6,
                      }}
                    >
                      To those who were not shortlisted, your journey does not
                      end here. Thank you for your participation, It truly means
                      a lot to us. Keep building, Keep innovating.
                    </p> */}
                  </>
                )}
              </div>

              {/* Teams or Coming Soon */}
              {!showResults ? (
                <div
                  className="flex items-center justify-center"
                  style={{ minHeight: "30vh" }}
                >
                  <div
                    style={{
                      background: "#FFFEF2",
                      border: "3px solid #000",
                      boxShadow: "5px 5px 0 #000",
                      padding: "2.5rem 3rem",
                      textAlign: "center",
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
                results.map((themeData) => (
                  <ThemeSection key={themeData.theme} data={themeData} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
