import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../ui/Navbar";
import Footer from "../../scenes/Footer";
import type { Theme } from "../../content/data";
import Background from "../Background";

type Props = {
  data: Theme;
};

export default function PSPageClient({ data }: Props) {
  const [activePSId, setActivePSId] = useState<string>(
    data.problemStatements[0].id
  );
  const navigate = useNavigate();
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFooter, setShowFooter] = useState(false);
  const isFooterVisible = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const activePS = data.problemStatements.find((ps) => ps.id === activePSId)!;

  // Reset active PS when theme changes
  useEffect(() => {
    setActivePSId(data.problemStatements[0].id);
  }, [data]);

  // Footer slide animation
  useEffect(() => {
    if (!footerRef.current) return;
    if (showFooter) {
      gsap.to(footerRef.current, { y: 0, duration: 1.0, ease: "power3.out" });
    } else {
      gsap.to(footerRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
    isFooterVisible.current = showFooter;
  }, [showFooter]);

  // Footer show/hide on scroll
  useEffect(() => {
    let footerTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && !isFooterVisible.current) {
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 10;
        if (atBottom) {
          if (!footerTimeout) {
            footerTimeout = setTimeout(() => {
              setShowFooter(true);
              footerTimeout = null;
            }, 1000);
          }
        }
      } else if (e.deltaY < 0 && isFooterVisible.current) {
        if (footerTimeout) {
          clearTimeout(footerTimeout);
          footerTimeout = null;
        }
        setShowFooter(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const threshold = 40;
      if (deltaY > threshold && !isFooterVisible.current) {
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 10;
        if (atBottom) {
          footerTimeout = setTimeout(() => {
            setShowFooter(true);
            footerTimeout = null;
          }, 600);
        }
      } else if (deltaY < -threshold && isFooterVisible.current) {
        if (footerTimeout) {
          clearTimeout(footerTimeout);
          footerTimeout = null;
        }
        setShowFooter(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (footerTimeout) clearTimeout(footerTimeout);
    };
  }, []);

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
        style={{ background: "#0a0a0a" }}
      >
        {/* ── 3D Background ── */}
        <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <Background path="Circle" dotScale={0.5} className="w-full h-full" />
        </div>

        {/* ── Foreground ── */}
        <div className="relative" style={{ zIndex: 1 }}>
          <div className="max-w-5xl mx-auto px-6 md:px-12 pt-28 pb-24">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 comic-sans"
              style={{ fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)" }}
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
                  onClick={() => setActivePSId(ps.id)}
                  className="px-5 py-2 text-sm font-medium transition-all comic-sans"
                  style={{
                    background: activePSId === ps.id ? "#fff" : "transparent",
                    color: activePSId === ps.id ? "#000" : "#fff",
                    border: "2px solid",
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
            <div className="flex justify-center mb-14">
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
            </div>

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
                  color: "rgba(255,255,255,0.4)",
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
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: "3px solid rgba(232, 0, 61, 0.7)",
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
                    color: "rgba(255,255,255,0.75)",
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
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: "3px solid rgba(255, 225, 5, 0.7)",
                  }}
                >
                  <h3
                    className="hero-title font-bold mb-3"
                    style={{
                      fontSize: "clamp(1rem, 2vw, 1.2rem)",
                      color: "#FFE105",
                    }}
                  >
                    THE SOLUTION
                  </h3>
                  <p
                    className="comic-sans leading-relaxed"
                    style={{
                      fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                      color: "rgba(255,255,255,0.75)",
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

      <Footer ref={footerRef} />
    </>
  );
}
