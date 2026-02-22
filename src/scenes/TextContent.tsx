import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SponsorsBento } from "../assets/Sponsor";
import Footer from "./Footer";
import CTA from "./CTA";
import Timer from "../components/Timer";
import FAQ from "./FAQ";

type TextContentProps = {
  currentScene: number;
  scenes: number;
  getTimelineRef?: (tl: gsap.core.Timeline) => void;
};

const TextContent = ({
  currentScene: _currentScene,
  getTimelineRef,
}: TextContentProps) => {
  const scene1TextRef = useRef<HTMLDivElement>(null);
  const scene2TextRef = useRef<HTMLDivElement>(null);
  const scene3TextRef = useRef<HTMLDivElement>(null);
  const scene4TextRef = useRef<HTMLDivElement>(null);
  const card1TextRef = useRef<HTMLDivElement>(null);
  const card2TextRef = useRef<HTMLDivElement>(null);
  const card3TextRef = useRef<HTMLDivElement>(null);
  const card4TextRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    // Scene 1
    if (scene1TextRef.current) {
      tl.fromTo(
        scene1TextRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.1 },
        0.05
      );
    }

    // Scene 2
    if (scene2TextRef.current) {
      tl.fromTo(
        scene2TextRef.current,
        { y: "100vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 0.4 },
        1.0
      );
      tl.to(scene2TextRef.current, { opacity: 0, duration: 0.2 }, 2.0);
    }

    // Scene 3
    if (scene3TextRef.current) {
      const panels = scene3TextRef.current.querySelectorAll(".sponsor-panel");
      gsap.set(panels, {
        x: (index) => {
          const positions = [2000, -2000, 1500, 0, 2000, -1500];
          return positions[index] || 0;
        },
        y: (index) => {
          const positions = [-2000, -2000, 0, 1500, 2000, 1500];
          return positions[index] || 0;
        },
        opacity: 0,
      });
      tl.to(
        panels,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.01,
          ease: "back.out(0.8)",
        },
        2.0
      );
      tl.to(
        panels,
        {
          x: (index) => {
            const positions = [0, -2000, 1500, 0, 0, -1500];
            return positions[index] || 0;
          },
          y: (index) => {
            const positions = [-1000, 2000, -1500, 1500, 2000, 1500];
            return positions[index] || 0;
          },
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.in(0.8)",
        },
        2.6
      );
    }

    // Scene 4
    if (scene4TextRef.current) {
      tl.fromTo(
        scene4TextRef.current,
        { scale: 0.6, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        3.2
      );
      tl.to(
        scene4TextRef.current,
        { opacity: 0, scale: 1.1, duration: 0.25 },
        3.8
      );
    }

    // Cards
    if (card1TextRef.current) {
      tl.fromTo(
        card1TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.1 },
        4.0
      );
      tl.to(card1TextRef.current, { opacity: 0, duration: 0.1 }, 4.5);
    }
    if (card2TextRef.current) {
      tl.fromTo(
        card2TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.1 },
        4.8
      );
      tl.to(card2TextRef.current, { opacity: 0, duration: 0.1 }, 5.0);
    }
    if (card3TextRef.current) {
      tl.fromTo(
        card3TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.1 },
        5.3
      );
      tl.to(card3TextRef.current, { opacity: 0, duration: 0.1 }, 5.5);
    }
    if (card4TextRef.current) {
      tl.fromTo(
        card4TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.1 },
        5.8
      );
      tl.to(card4TextRef.current, { opacity: 0, duration: 0.1 }, 6.0);
    }

    // ── CTA: slides in at 6.0, slides OUT at 7.0 ──
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: "100%", opacity: 0 });
      // Slide in
      tl.to(
        ctaRef.current,
        { y: "0%", opacity: 1, duration: 0.4, ease: "power2.out" },
        6.0
      );
      // Slide out before FAQ arrives
      tl.to(
        ctaRef.current,
        { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" },
        6.8
      );
    }

    // ── FAQ: slides in at 7.0, slides OUT at 8.0 ──
    if (faqRef.current) {
      gsap.set(faqRef.current, { y: "100%", opacity: 0 });
      // Slide in
      tl.to(
        faqRef.current,
        { y: "0%", opacity: 1, duration: 0.4, ease: "power2.out" },
        7.0
      );
      // Slide out before Footer arrives
      tl.to(
        faqRef.current,
        { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" },
        8.2
      );
    }

    // ── Footer: slides in at 8.0 ──
    if (footerRef.current) {
      gsap.set(footerRef.current, { y: "100%" });
      tl.to(
        footerRef.current,
        { y: "0%", duration: 0.4, ease: "power2.out", force3D: true },
        8.0
      );

      // HackToFuture letters animate at 8.3
      const htfLetters = footerRef.current.querySelectorAll(
        ".hero-title.inline-block"
      );
      if (htfLetters.length) {
        tl.fromTo(
          htfLetters,
          { y: 200, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: "back.out(1.4)",
          },
          8.3
        );
      }
    }

    tl.set({}, {}, 10.0);

    if (getTimelineRef) getTimelineRef(tl);
    return () => {
      tl.kill();
    };
  }, [getTimelineRef]);

  return (
    <>
      {/* Scene 1 */}
      <div
        ref={scene1TextRef}
        className="hero-title fixed left-0 right-0 bottom-[12vh] z-20 flex justify-center"
      >
      </div>

      {/* Scene 2 */}
      <div
        ref={scene2TextRef}
        className={`fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center ${_currentScene === 1 ? "pointer-events-auto" : "pointer-events-none"
          }`}
        style={{ opacity: 0 }}
        aria-hidden={_currentScene !== 1}
      >
      </div>

      {/* Scene 3 */}
      <div
        ref={scene3TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
      >
        <SponsorsBento
          title={{ name: "EGDK" }}
          platinum={[{ name: "Company A" }, { name: "Company B" }]}
          gold={[{ name: "Company C" }, { name: "Company D" }]}
          silver={[
            { name: "Company E" },
            { name: "Company F" },
            { name: "Company G" },
          ]}
        />
      </div>

      {/* Scene 4 */}
      <div
        ref={scene4TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[95vw] overflow-hidden text-center">
          <Timer />
        </div>
      </div>

      {/* Cards 1-4 */}
      {[1, 2, 3, 4].map((n, i) => (
        <div
          key={n}
          ref={[card1TextRef, card2TextRef, card3TextRef, card4TextRef][i]}
          className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="max-w-[95vw] overflow-hidden text-center">
            <h2
              className="text-white font-bold"
              style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}
            >
              THEME {n}
            </h2>
            <p
              className="text-white/80 mt-2"
              style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)" }}
            >
              Theme {n} description here
            </p>
          </div>
        </div>
      ))}

      <CTA ref={ctaRef} />
      <FAQ ref={faqRef} />
      <Footer ref={footerRef} />
    </>
  );
};

export default TextContent;
