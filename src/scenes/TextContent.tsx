import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SponsorsBento } from "../assets/Sponsor";
import CTA from "./CTA";
import FAQ from "./FAQ";

const handleThemeNavigate = (slug: string) => {
  window.open(`/theme/${slug}`, "_blank", "noopener,noreferrer");
};
import TimerTimeline from "../components/TimerTimeline";

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

  useLayoutEffect(() => {
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

    // Scene 4
    if (scene4TextRef.current) {
      const panels = scene4TextRef.current.querySelectorAll(".htf-panel");
      const enterX = [0, -1800, -800, 0, 800, 1800, 1800, -1800];
      const enterY = [-800, -300, -1000, -1200, -1000, 600, -600, 600];

      gsap.set(panels, {
        x: (i) => enterX[i] ?? 0,
        y: (i) => enterY[i] ?? 0,
        opacity: 0,
      });
      tl.to(
        panels,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(0.8)",
        },
        3.2
      );
      tl.to(
        panels,
        {
          x: (i) => enterX[i] ?? 0,
          y: (i) => enterY[i] ?? 0,
          opacity: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "back.in(0.8)",
        },
        4.2
      );
    }

    // Card 1
    if (card1TextRef.current) {
      tl.fromTo(
        card1TextRef.current,
        { opacity: 0, scale: 0.8, pointerEvents: "none" },
        { opacity: 1, scale: 1, duration: 0.15, pointerEvents: "auto" },
        4.55
      );
      tl.to(
        card1TextRef.current,
        { opacity: 0, duration: 0.1, pointerEvents: "none" },
        4.95
      );
    }
    // Card 2
    if (card2TextRef.current) {
      tl.fromTo(
        card2TextRef.current,
        { opacity: 0, scale: 0.8, pointerEvents: "none" },
        { opacity: 1, scale: 1, duration: 0.1, pointerEvents: "auto" },
        5.35
      );
      tl.to(
        card2TextRef.current,
        { opacity: 0, duration: 0.1, pointerEvents: "none" },
        5.65
      );
    }
    // Card 3
    if (card3TextRef.current) {
      tl.fromTo(
        card3TextRef.current,
        { opacity: 0, scale: 0.8, pointerEvents: "none" },
        { opacity: 1, scale: 1, duration: 0.1, pointerEvents: "auto" },
        6.05
      );
      tl.to(
        card3TextRef.current,
        { opacity: 0, duration: 0.1, pointerEvents: "none" },
        6.35
      );
    }
    // Card 4
    if (card4TextRef.current) {
      tl.fromTo(
        card4TextRef.current,
        { opacity: 0, scale: 0.8, pointerEvents: "none" },
        { opacity: 1, scale: 1, duration: 0.1, pointerEvents: "auto" },
        6.75
      );
      tl.to(
        card4TextRef.current,
        { opacity: 0, duration: 0.15, pointerEvents: "none" },
        7.05
      );
    }

    // CTA
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: "100%", opacity: 0 });
      tl.to(
        ctaRef.current,
        { y: "0%", opacity: 1, duration: 0.4, ease: "power2.out" },
        8.0
      );
      tl.to(
        ctaRef.current,
        { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" },
        8.8
      );
    }

    // FAQ
    if (faqRef.current) {
      gsap.set(faqRef.current, { y: "100%", opacity: 0 });
      tl.to(
        faqRef.current,
        { y: "0%", opacity: 1, duration: 0.4, ease: "power2.out" },
        8.9
      );
      tl.to(
        faqRef.current,
        { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" },
        10.4
      );
    }

    // Footer: ONLY slide in — NO letter animation here
    if (footerRef.current) {
      gsap.set(footerRef.current, { y: "100%" });
      tl.to(
        footerRef.current,
        { y: "0%", duration: 0.4, ease: "power2.out", force3D: true },
        10.2
      );

      // ❌ REMOVED: the htfLetters scroll animation was here
      // Letters now animate themselves inside Footer.tsx on visibility
    }

    tl.set({}, {}, 12.2);

    if (getTimelineRef) getTimelineRef(tl);
    return () => {
      tl.kill();
    };
  }, [getTimelineRef]);

  return (
    <>
      <div
        ref={scene1TextRef}
        className="hero-title fixed left-0 right-0 bottom-[12vh] z-20 flex justify-center"
      ></div>

      <div
        ref={scene2TextRef}
        className={`hero-title fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center ${
          _currentScene === 1 ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          fontSize: "clamp(10px, 3vw, 20px)",
          opacity: 0,
        }}
        aria-hidden={_currentScene !== 1}
      >
        CLICK TO DOWNLOAD RULEBOOK
      </div>

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

      <div
        ref={scene4TextRef}
        className="fixed left-0 right-0 top-[50%] -translate-y-1/2 z-20 flex items-center justify-center px-4"
      >
        <TimerTimeline />
      </div>

      {[1, 2, 3, 4].map((n, i) => {
        const themeData = [
          {
            slug: "healthcare-and-citizen-welfare",
            title: "Healthcare & Citizen Welfare",
          },
          { slug: "industry-and-trade", title: "Industry & Trade" },
          {
            slug: "infrastructure-and-smart-cities",
            title: "Infrastructure & Smart Cities",
          },
          { slug: "open-innovation", title: "Open Innovation" },
        ];
        const { slug, title } = themeData[i];

        return (
          <div
            key={n}
            ref={[card1TextRef, card2TextRef, card3TextRef, card4TextRef][i]}
            className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center"
            style={{ opacity: 0, pointerEvents: "none", cursor: "pointer" }}
            onClick={() => handleThemeNavigate(slug)}
          >
            <div className="max-w-[95vw] overflow-hidden text-center">
              <h2
                className="text-white font-bold"
                style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}
              >
                THEME {n}: {title}
              </h2>
              <p
                className="text-white/80 mt-2"
                style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)" }}
              >
                Click to view problem statements
              </p>
              <p
                className="text-white/50 mt-3 uppercase tracking-widest"
                style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)" }}
              >
                Click to explore →
              </p>
            </div>
          </div>
        );
      })}

      <CTA ref={ctaRef} />
      <FAQ ref={faqRef} />
      {/* <Footer ref={footerRef} /> */}
    </>
  );
};

export default TextContent;