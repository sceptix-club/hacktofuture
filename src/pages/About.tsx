import { useEffect, useRef, useState } from "react";
import "../App.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../scenes/Footer";
import gsap from "gsap";

export default function About() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFooter, setShowFooter] = useState(false);
  const isFooterVisible = useRef(false);
  const touchStartY = useRef(0);

  // Animate footer in/out when showFooter changes
  useEffect(() => {
    if (!footerRef.current) return;
    if (showFooter) {
      gsap.to(footerRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(footerRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
    isFooterVisible.current = showFooter;
  }, [showFooter]);

  // Wheel to trigger footer
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && !isFooterVisible.current) {
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 10;
        if (atBottom) setShowFooter(true);
      } else if (e.deltaY < 0 && isFooterVisible.current) {
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
        // Swiped up
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 10;
        if (atBottom) setShowFooter(true);
      } else if (deltaY < -threshold && isFooterVisible.current) {
        // Swiped down
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
    };
  }, []);

  return (
    <>
      <Navbar />

      <section
        className="relative min-h-screen flex items-center justify-center px-4 py-16"
        style={{ background: "#0a0a0a" }}
      >
        {/* Halftone background accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div
          className="relative max-w-3xl w-full"
          style={{
            background: "#FFFEF2",
            border: "4px solid #000",
            boxShadow: "8px 8px 0px #000",
            padding: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          {/* Halftone dot cluster — top right corner */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: 12,
              right: 16,
              width: 90,
              height: 90,
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)",
              backgroundSize: "8px 8px",
            }}
          />

          {/* Speech bubble */}
          <div
            className="relative inline-block mb-8"
            style={{
              background: "#fff",
              border: "3px solid #000",
              borderRadius: "18px 18px 18px 4px",
              padding: "6px 16px",
              boxShadow: "3px 3px 0px #000",
            }}
          >
            <span
              className="comic-sans text-black"
              style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.85rem)" }}
            >
              Est. 2021 · St Joseph Engineering College
            </span>
            {/* Bubble tail */}
            <div
              style={{
                position: "absolute",
                bottom: -14,
                left: 18,
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "14px solid #000",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -10,
                left: 20,
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "11px solid #fff",
              }}
            />
          </div>

          {/* Heading */}
          <div className="mt-4 mb-2">
            <div
              className="inline-block"
              style={{
                background: "#000",
                transform: "skewX(-2deg)",
                boxShadow: "4px 4px 0px #DA100C",
                padding: "6px 20px",
                marginBottom: "1.5rem",
              }}
            >
              <h1
                className="hero-title text-white"
                style={{
                  fontSize: "clamp(2rem, 7vw, 4rem)",
                  transform: "skewX(2deg)",
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                }}
              >
                ABOUT HTF
              </h1>
            </div>
          </div>

          {/* Divider */}
          <div
            className="mb-6"
            style={{
              height: 3,
              background: "linear-gradient(90deg, #000 60%, transparent)",
              width: "100%",
            }}
          />

          {/* Body text */}
          <p
            className="comic-sans text-black/85 leading-relaxed mb-6"
            style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)" }}
          >
            HackToFuture is a 36-hour intercollegiate hackathon hosted annually
            by the Sceptix Club at St Joseph Engineering College, Mangaluru. Now
            in its fourth edition, it brings together the brightest student
            minds to build, break, and ship real products under pressure — no
            tutorials, no safety nets, just ideas and execution.
          </p>

          <p
            className="comic-sans text-black/70 leading-relaxed"
            style={{ fontSize: "clamp(0.85rem, 1.6vw, 1rem)" }}
          >
            From machine learning pipelines to decentralised protocols, from
            health-tech tools to open innovation experiments — HTF has always
            been a stage for students who refuse to wait for permission to build
            the future. Every year the stakes get higher. Every year the builds
            get bolder.
          </p>

          {/* Bottom rule with decorative element */}
          <div className="mt-8 flex items-center gap-4">
            <div
              style={{
                height: 3,
                flex: 1,
                background: "linear-gradient(90deg, #000, transparent)",
              }}
            />
            <svg width="22" height="22" viewBox="0 0 100 100">
              <polygon
                points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
                fill="#DA100C"
              />
            </svg>
            <div
              style={{
                height: 3,
                flex: 1,
                background: "linear-gradient(270deg, #000, transparent)",
              }}
            />
          </div>

          {/* Page tag */}
          <div
            className="absolute bottom-0 right-0 hero-title text-white"
            style={{
              background: "#000",
              fontSize: "0.55rem",
              padding: "3px 10px",
              letterSpacing: "0.15em",
            }}
          >
            HTF 4.0 · COMIC EDITION
          </div>
        </div>
      </section>

      <Footer ref={footerRef} />
    </>
  );
}
