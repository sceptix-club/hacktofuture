import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../ui/Navbar";
import type { Theme } from "../../content/data";
import Background from "../Background";
import { useWebHaptics } from "web-haptics/react";

type Props = {
  data: Theme;
};

export default function PSPageClient({ data }: Props) {
  const [activePSId, setActivePSId] = useState<string>(
    data.problemStatements[0].id
  );
  const navigate = useNavigate();
  const { trigger } = useWebHaptics({debug: true});
  const contentRef = useRef<HTMLDivElement>(null);

  const activePS = data.problemStatements.find((ps) => ps.id === activePSId)!;

  // Reset active PS when theme changes
  useEffect(() => {
    setActivePSId(data.problemStatements[0].id);
  }, [data]);

  // Animate content on PS change
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [activePSId]);

  return (
    <>
      <Navbar />

      <main
        className="relative min-h-screen text-white"
        style={{
          background: "#0a0a0a",
          backgroundImage: "url('/textures/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ── 3D Background ── */}
        <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <Background />
        </div>

        {/* ── Foreground ── */}
        <div className="relative" style={{ zIndex: 1 }}>
          <div className="max-w-5xl mx-auto px-6 md:px-12 pt-28 pb-24 -mt-12">
            {/* Back button */}
            <button
              onClick={() => { trigger("heavy"); navigate(-1); }}
              className="flex items-center gap-2 transition-colors mb-10 comic-sans px-4 py-2"
              style={{
                fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
                backgroundColor: "white",
                color: "black",
                borderRadius: "8px",
              }}
            >
              <span>←</span> Back
            </button>

            {/* Theme Title */}
            <h1
              className="hero-title font-black uppercase mb-8"
              style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
            >
              {data.label}
            </h1>

            {/* PS Navigation Buttons */}
            <div className="flex gap-3 mb-12 flex-wrap">
              {data.problemStatements.map((ps) => (
                <button
                  key={ps.id}
                  onClick={() => { trigger("heavy");  setActivePSId(ps.id)}}
                  className="hover:cursor-pointer px-5 py-2 text-sm font-medium transition-all comic-sans"
                  style={{
                    background: activePSId === ps.id ? "#fff" : "transparent",
                    color: activePSId === ps.id ? "#000" : "#fff",
                    border: "2px solid",
                    borderRadius: "8px",
                    borderColor:
                      activePSId === ps.id ? "#fff" : "rgba(255,255,255,0.3)",
                    boxShadow:
                      activePSId === ps.id
                        ? "3px 3px 0 rgba(255,255,255,0.2)"
                        : "none",
                  }}
                >
                  {ps.id}
                </button>
              ))}
            </div>

            {/* Icon */}
            {/* <div className="flex justify-center mb-14">
              <div
                className="relative w-52 h-52 md:w-64 md:h-64 flex items-center justify-center overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                  border: "2px solid rgba(255,255,255,0.1)",
                  borderRadius: "1.5rem",
                  boxShadow: "0 0 40px rgba(255,255,255,0.05)",
                }}
              >
                <img
                  src={data.icon}
                  alt={data.label}
                  className="w-4/5 h-4/5 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div> */}

            {/* Divider */}
            <div
              className="mb-10"
              style={{
                height: 2,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)",
              }}
            />

            {/* Problem Statement Content — animated on change */}
            <section ref={contentRef}>
              {/* PS ID tag */}
              <p
                className="comic-sans uppercase tracking-widest mb-3"
                style={{
                  fontSize: "clamp(0.7rem, 1.3vw, 0.85rem)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                T2 · {activePS.id}
              </p>

              {/* PS Title */}
              <h2
                className="hero-title font-black mb-8"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
              >
                {activePS.title}
              </h2>

              {/* The Problem */}
              <div
                className="mb-8 p-6 md:p-8"
                style={{
                  background: "#FFFEF2",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.04) 28px, rgba(0,0,0,0.04) 29px)",
                  border: "3px solid #000",
                  borderLeft: "4px solid #E8003D",
                  borderRadius: "0.75rem",
                  boxShadow: "4px 4px 0px rgba(0,0,0,0.5)",
                }}
              >
                <h3
                  className="hero-title font-bold mb-3"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    color: "#E8003D",
                  }}
                >
                  THE PROBLEM
                </h3>
                <p
                  className="comic-sans leading-relaxed"
                  style={{
                    fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                    color: "rgba(0,0,0,0.7)",
                  }}
                >
                  {activePS.problem}
                </p>
              </div>

              {/* The Solution */}
              {activePS.solution && (
                <div
                  className="p-6 md:p-8"
                  style={{
                    background: "#FFFEF2",
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.04) 28px, rgba(0,0,0,0.04) 29px)",
                    border: "3px solid #000",
                    borderLeft: "4px solid #FFE105",
                    borderRadius: "0.75rem",
                    boxShadow: "4px 4px 0px rgba(0,0,0,0.5)",
                  }}
                >
                  <h3
                    className="hero-title font-bold mb-3"
                    style={{
                      fontSize: "clamp(1rem, 2vw, 1.2rem)",
                      color: "#b8a000",
                    }}
                  >
                    THE SOLUTION
                  </h3>
                  <p
                    className="comic-sans leading-relaxed"
                    style={{
                      fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                      color: "rgba(0,0,0,0.7)",
                    }}
                  >
                    {activePS.solution}
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
