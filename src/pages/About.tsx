import { useRef, useEffect } from "react";
import "../App.css";
import Navbar from "../components/ui/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  // Entrance animation
  useEffect(() => {
    if (
      !headerRef.current ||
      !contentRef.current ||
      !statsRef.current ||
      !tickerRef.current
    )
      return;

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
    );

    gsap.fromTo(
      tickerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", delay: 0.2 }
    );

    const cards = [
      contentRef.current,
      ...Array.from(statsRef.current.children),
    ];

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.3,
      }
    );
  }, []);

  // ScrollSmoother — same config as Sponsors.tsx
  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#about-smooth-wrapper",
      content: "#about-smooth-content",
      smooth: 0.75,
      effects: false,
      smoothTouch: 0.25,
      normalizeScroll: true,
    });
    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const stats = [
    { label: "PRIZE POOL", value: "₹3,80,000", color: "#E8003D" },
    { label: "TEAMS", value: "40", color: "#00C6FF" },
    { label: "DATES", value: "15-17 APR", color: "#FFE105" },
    { label: "THEMES", value: "3", color: "#A855F7" },
    { label: "VENUE", value: "Kalam Hall", color: "#FF8A00", colSpan: 2 },
  ];

  return (
    <>
      <Navbar />

      {/* Fixed background — same as Sponsors.tsx */}
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

      {/* Dot grid overlay — same as Sponsors.tsx */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          zIndex: 1,
        }}
      />

      <div id="about-smooth-wrapper" style={{ zIndex: 2 }}>
        <div id="about-smooth-content">
          <div className="relative w-full min-h-screen" ref={containerRef}>
            <div
              className="relative px-6 md:px-12 lg:px-20 pt-28 pb-24 min-h-screen flex flex-col items-center"
              style={{ zIndex: 1 }}
            >
              {/* Header */}
              <div
                ref={headerRef}
                className="-mt-12 mb-8 flex flex-col items-center"
              >
                <p
                  className="comic-sans uppercase tracking-widest mb-3 text-center"
                  style={{
                    fontSize: "clamp(0.7rem, 1.3vw, 0.85rem)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  HackToFuture 4.0
                </p>
                <h1
                  className="hero-title font-black uppercase text-center"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 5rem)",
                    lineHeight: 0.9,
                    color: "#fff",
                  }}
                >
                  About
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

              {/* Main Layout Grid */}
              <div className="w-full flex flex-col lg:flex-row gap-8 max-w-[1200px]">
                {/* Left: Main Content Card */}
                <div className="w-full lg:w-3/5" ref={contentRef}>
                  <div
                    className="relative flex flex-col justify-between h-full"
                    style={{
                      background: "#FFFEF2",
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.04) 28px, rgba(0,0,0,0.04) 29px)",
                      border: "3px solid #000",
                      borderTop: `5px solid #E8003D`,
                      borderRadius: "0.75rem",
                      padding: "clamp(1.5rem, 3vw, 2.5rem)",
                      boxShadow: "6px 6px 0px rgba(0,0,0,0.8)",
                    }}
                  >
                    {/* Number/Icon badge */}
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className="hero-title font-black"
                        style={{
                          fontSize: "clamp(2rem, 4vw, 3rem)",
                          color: "#E8003D",
                          opacity: 0.15,
                          lineHeight: 1,
                          userSelect: "none",
                        }}
                      >
                        ORIGIN
                      </span>

                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: 40,
                          height: 40,
                          border: `3px solid #000`,
                          background: "#E8003D",
                          borderRadius: "50%",
                          color: "#fff",
                          flexShrink: 0,
                          boxShadow: "2px 2px 0 #000",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                    </div>

                    <h3
                      className="hero-title font-black uppercase mb-5"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                        color: "#111",
                        lineHeight: 1.1,
                      }}
                    >
                      The Hackathon
                    </h3>

                    <div
                      className="comic-sans font-medium space-y-5"
                      style={{
                        fontSize: "clamp(0.9rem, 1.25vw, 1.1rem)",
                        color: "rgba(0,0,0,0.8)",
                        lineHeight: 1.8,
                      }}
                    >
                      <p>
                        <strong className="text-black font-bold">
                          HackToFuture
                        </strong>{" "}
                        is a 36-hour intercollegiate hackathon hosted annually
                        by the Sceptix Club at St Joseph Engineering College,
                        Mangaluru. Now in its fourth edition, it brings together
                        the brightest student minds to build, break, and ship
                        real products under pressure — no tutorials, no safety
                        nets, just ideas and execution.
                      </p>
                      <p>
                        From machine learning pipelines to decentralised
                        protocols, from health-tech tools to open innovation
                        experiments — HTF has always been a stage for students
                        who refuse to wait for permission to build the future.
                        Every year the stakes get higher. Every year the builds
                        get bolder.
                      </p>
                    </div>

                    <div
                      className="mt-8 pt-5 flex items-center justify-between"
                      style={{ borderTop: "2px solid rgba(0,0,0,0.1)" }}
                    >
                      <span
                        className="comic-sans font-bold"
                        style={{
                          fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
                          color: "rgba(0,0,0,0.5)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      >
                        EST. 2023
                      </span>
                      <span
                        className="comic-sans font-bold px-3 py-1"
                        style={{
                          fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
                          color: "#fff",
                          background: "#000",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      >
                        SJEC MANGALURU
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Stats Grid */}
                <div
                  className="w-full lg:w-3/5 grid grid-cols-2 gap-4 lg:gap-6"
                  ref={statsRef}
                >
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className={`flex flex-col items-center justify-center text-center group cursor-pointer ${
                        stat.colSpan === 2 ? "col-span-2" : ""
                      }`}
                      style={{
                        background: "#FFFEF2",
                        border: "3px solid #000",
                        borderBottom: `6px solid ${stat.color}`,
                        borderRadius: "0.75rem",
                        padding: "1.5rem 0.5rem",
                        boxShadow: "4px 4px 0px rgba(0,0,0,0.8)",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          y: -4,
                          boxShadow: "6px 8px 0px rgba(0,0,0,0.8)",
                          duration: 0.2,
                        });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          y: 0,
                          boxShadow: "4px 4px 0px rgba(0,0,0,0.8)",
                          duration: 0.2,
                        });
                      }}
                    >
                      <div
                        className="hero-title font-black mb-1"
                        style={{
                          fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
                          color: "#000",
                          lineHeight: 1,
                          wordBreak: "break-all",
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="comic-sans font-bold uppercase tracking-widest"
                        style={{
                          fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
                          color: stat.color,
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}

                  {/* Extra comic-style graphic card */}
                  <div
                    className="col-span-2 relative overflow-hidden flex items-center justify-center"
                    style={{
                      background: "#000",
                      border: "3px solid #000",
                      borderRadius: "0.75rem",
                      padding: "1.5rem",
                      boxShadow: "4px 4px 0px #E8003D",
                      minHeight: "140px",
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
                        backgroundSize: "8px 8px",
                      }}
                    />
                    <h3
                      className="hero-title text-white text-center z-10"
                      style={{
                        fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                        lineHeight: 1.2,
                      }}
                    >
                      NO TUTORIALS.
                      <br />
                      <span style={{ color: "#FFE105" }}>JUST EXECUTION.</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
