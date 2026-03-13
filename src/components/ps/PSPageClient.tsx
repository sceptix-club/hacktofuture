import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Navbar from "../ui/Navbar";
import type { Theme } from "../../content/data";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type Props = {
  data: Theme;
  loaderDone?: boolean;
};

export default function PSPageClient({ data, loaderDone }: Props) {
  const [activePSId, setActivePSId] = useState<string>(
    data.problemStatements[0].id
  );
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  const activePS = data.problemStatements.find((ps) => ps.id === activePSId)!;
  const activeIndex = data.problemStatements.findIndex(
    (ps) => ps.id === activePSId
  );

  useEffect(() => {
    setActivePSId(data.problemStatements[0].id);
  }, [data]);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activePSId]);

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

  const colors = {
    red: "#DA100C",
    yellow: "#FFE105",
    blue: "#50BAEA",
  };

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
          <main className="relative min-h-screen text-white">
            {/* ── Foreground ── */}
            <div className="relative" style={{ zIndex: 2 }}>
              <div className="max-w-5xl mx-auto px-6 md:px-12 pt-28 pb-24 -mt-12">
                {/* ── Back button ── */}
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 comic-sans font-bold cursor-pointer
                         transition-all duration-200 hover:-translate-y-0.5
                         active:translate-y-0 mb-10"
                  style={{
                    fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
                    background: colors.yellow,
                    color: "#000",
                    padding: "0.5rem 1.25rem",
                    border: "3px solid #000",
                    boxShadow: "3px 3px 0 #000",
                  }}
                >
                  <span style={{ fontSize: "1.1em" }}>←</span> Back
                </button>

                {/* ── Theme Title ── */}
                <div className="mb-10 min-w-0">
                  <h1
                    className="hero-title font-black uppercase wrap-break-word"
                    style={{
                      fontSize: "clamp(2rem, 6vw, 3.5rem)",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                      hyphens: "auto",
                    }}
                  >
                    {data.label}
                  </h1>
                  <div
                    style={{
                      width: "clamp(60px, 12vw, 120px)",
                      height: 5,
                      background: colors.red,
                      marginTop: "0.75rem",
                      boxShadow: "2px 2px 0 #000",
                    }}
                  />
                </div>

                {/* ── PS Navigation ── */}
                <div className="flex gap-3 mb-10 flex-wrap">
                  {data.problemStatements.map((ps) => {
                    const isActive = activePSId === ps.id;
                    return (
                      <button
                        key={ps.id}
                        onClick={() => setActivePSId(ps.id)}
                        className="cursor-pointer px-5 py-2.5 font-bold comic-sans
                               transition-all duration-200 hover:-translate-y-0.5
                               active:translate-y-0"
                        style={{
                          fontSize: "clamp(0.75rem, 1.3vw, 0.9rem)",
                          background: isActive ? colors.red : "rgba(0,0,0,0.5)",
                          color: "#fff",
                          border: "3px solid #000",
                          boxShadow: isActive
                            ? "4px 4px 0 #000"
                            : "2px 2px 0 rgba(0,0,0,0.5)",
                          backdropFilter: isActive ? "none" : "blur(4px)",
                        }}
                      >
                        {ps.id}
                      </button>
                    );
                  })}
                </div>

                {/* ── PS Content ── */}
                <section ref={contentRef}>
                  {/* Caption box */}
                  <div className="flex items-center gap-4 mb-6 flex-wrap">
                    <div
                      className="inline-block"
                      style={{
                        background: colors.yellow,
                        color: "#000",
                        padding: "0.4rem 1rem",
                        border: "3px solid #000",
                        boxShadow: "3px 3px 0 #000",
                      }}
                    >
                      <span
                        className="comic-sans font-bold"
                        style={{
                          fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {activePS.id}
                      </span>
                    </div>

                    <span
                      className="comic-sans"
                      style={{
                        fontSize: "clamp(0.7rem, 1.2vw, 0.8rem)",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      {activeIndex + 1} of {data.problemStatements.length}
                    </span>
                  </div>

                  {/* PS Title */}
                  <h2
                    className="hero-title font-black mb-10"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
                  >
                    {activePS.title}
                  </h2>

                  {/* ── The Problem ── */}
                  <div
                    className="relative mb-10 overflow-hidden"
                    style={{
                      background: "#FFFEF2",
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.025) 28px, rgba(0,0,0,0.025) 29px)",
                      border: "3px solid #000",
                      boxShadow: "6px 6px 0 #000",
                    }}
                  >
                    <div style={{ height: 6, background: colors.red }} />

                    {/* Large fading halftone from top-right */}
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        top: 6,
                        right: 0,
                        width: "70%",
                        height: "70%",
                        backgroundImage: `radial-gradient(circle, rgba(0,0,255,0.15) 1.5px, transparent 1.5px)`,
                        backgroundSize: "8px 8px",
                        maskImage:
                          "radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%, transparent 65%)",
                        WebkitMaskImage:
                          "radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%, transparent 65%)",
                      }}
                    />

                    <div className="relative p-6 md:p-8">
                      <h3
                        className="hero-title font-bold mb-4 flex items-center gap-3"
                        style={{
                          fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                          color: colors.red,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "clamp(16px, 2.5vw, 24px)",
                            height: 3,
                            background: colors.red,
                          }}
                        />
                        THE PROBLEM
                      </h3>
                      <p
                        className="comic-sans leading-relaxed"
                        style={{
                          fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                          color: "rgba(0,0,0,0.75)",
                          lineHeight: 1.8,
                        }}
                      >
                        {activePS.problem}
                      </p>
                    </div>
                  </div>

                  {/* ── The Solution ── */}
                  {activePS.prerequisites && (
                    <div
                      className="relative overflow-hidden"
                      style={{
                        background: "#FFFEF2",
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.025) 28px, rgba(0,0,0,0.025) 29px)",
                        border: "3px solid #000",
                        boxShadow: "6px 6px 0 #000",
                      }}
                    >
                      <div style={{ height: 6, background: colors.blue }} />

                      {/*  Large fading halftone from top-right */}
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          top: 6,
                          right: 0,
                          width: "70%",
                          height: "70%",
                          backgroundImage: `radial-gradient(circle, rgba(0,0,255,0.15) 1.5px, transparent 1.5px)`,
                          backgroundSize: "8px 8px",
                          maskImage:
                            "radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%, transparent 65%)",
                          WebkitMaskImage:
                            "radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%, transparent 65%)",
                        }}
                      />

                      <div className="relative p-6 md:p-8">
                        <h3
                          className="hero-title font-bold mb-4 flex items-center gap-3"
                          style={{
                            fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                            color: colors.blue,
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: "clamp(16px, 2.5vw, 24px)",
                              height: 3,
                              background: colors.blue,
                            }}
                          />
                          GOOD TO KNOW
                        </h3>
                        <p
                          className="comic-sans leading-relaxed"
                          style={{
                            fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                            color: "rgba(0,0,0,0.75)",
                            lineHeight: 1.8,
                          }}
                        >
                          {activePS.prerequisites}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Speed-line connector */}
                  <div
                    className="flex items-center justify-center my-6"
                    style={{ gap: "6px" }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: i === 1 ? 24 : 12,
                          height: 3,
                          background: "rgba(255,255,255,0.15)",
                          borderRadius: 2,
                        }}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
