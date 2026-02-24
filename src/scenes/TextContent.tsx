import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SponsorsBento } from "../assets/Sponsor";
import Footer from "./Footer";
import CTA from "./CTA";
import FAQ from "./FAQ";
import Timer from "../components/Timer";
import Timeline from "../components/Timeline";

const handleThemeNavigate = (slug: string) => {
  window.location.href = `/theme/${slug}`;
};

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
  const scene4TextRef = useRef<HTMLDivElement>(null); // Timer
  const scene4bTextRef = useRef<HTMLDivElement>(null); // Timeline
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
        { y: "20vh", opacity: 1, duration: 0.4 },
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

    // Scene 4a: Timer — slides in at 3.2, slides out at 3.7
    if (scene4TextRef.current) {
      gsap.set(scene4TextRef.current, { y: "60px", opacity: 0 });
      tl.to(
        scene4TextRef.current,
        { y: "0px", opacity: 1, duration: 0.4, ease: "power3.out" },
        3.2
      );
      tl.to(
        scene4TextRef.current,
        { y: "-60px", opacity: 0, duration: 0.25, ease: "power2.in" },
        3.7
      );
    }

    // Scene 4b: Timeline — slides in at 3.8, slides out at 4.0
    if (scene4bTextRef.current) {
      gsap.set(scene4bTextRef.current, { y: "60px", opacity: 0 });
      tl.to(
        scene4bTextRef.current,
        { y: "0px", opacity: 1, duration: 0.4, ease: "power3.out" },
        3.8
      );
      tl.to(
        scene4bTextRef.current,
        { y: "-60px", opacity: 0, duration: 0.25, ease: "power2.in" },
        4.9
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

    // CTA
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: "100%", opacity: 0 });
      tl.to(
        ctaRef.current,
        { y: "0%", opacity: 1, duration: 0.4, ease: "power2.out" },
        6.0
      );
      tl.to(
        ctaRef.current,
        { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" },
        6.8
      );
    }

    // FAQ
    if (faqRef.current) {
      gsap.set(faqRef.current, { y: "100%", opacity: 0 });
      tl.to(
        faqRef.current,
        { y: "0%", opacity: 1, duration: 0.4, ease: "power2.out" },
        7.0
      );
      tl.to(
        faqRef.current,
        { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" },
        8.2
      );
    }

    // Footer
    if (footerRef.current) {
      gsap.set(footerRef.current, { y: "100%" });
      tl.to(
        footerRef.current,
        { y: "0%", duration: 0.4, ease: "power2.out", force3D: true },
        8.0
      );

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
      />

      {/* Scene 2 */}
      <div
        ref={scene2TextRef}
        className={`hero-title fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center ${
          _currentScene === 1 ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ fontSize: "clamp(10px, 3vw, 20px)", opacity: 0 }}
        aria-hidden={_currentScene !== 1}
      >
        CLICK TO DOWNLOAD RULEBOOK
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

      {/* Scene 4a: Timer */}
      <div
        ref={scene4TextRef}
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none px-4"
        style={{ opacity: 0 }}
      >
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl">
          <Timer />
        </div>
      </div>

      {/* Scene 4b: Timeline */}
      <div
        ref={scene4bTextRef}
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-auto px-2 sm:px-4"
        style={{ opacity: 0 }}
      >
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl h-full max-h-[80vh] flex items-center">
          <Timeline />
        </div>
      </div>

      {/* Cards 1-4 */}
      {[1, 2, 3, 4].map((n, i) => {
        const slugs: (string | null)[] = [
          "healthcare-and-citizen-welfare",
          "industry-and-trade",
          "infrastructure-and-smart-cities",
          null,
        ];
        const slug = slugs[i];
        const isClickable = slug !== null;

        return (
          <div
            key={n}
            ref={[card1TextRef, card2TextRef, card3TextRef, card4TextRef][i]}
            className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center px-4"
            style={{
              opacity: 0,
              pointerEvents: isClickable ? "auto" : "none",
              cursor: isClickable ? "pointer" : "default",
            }}
            onClick={() => {
              if (slug) handleThemeNavigate(slug);
            }}
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
              {isClickable && (
                <p
                  className="text-white/50 mt-3 uppercase tracking-widest"
                  style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)" }}
                >
                  Click to explore →
                </p>
              )}
            </div>
          </div>
        );
      })}

      <CTA ref={ctaRef} />
      <FAQ ref={faqRef} />
      <Footer ref={footerRef} />
    </>
  );
};

export default TextContent;
