import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SponsorsBento } from "../assets/Sponsor";
import CTA from "./CTA";
import FAQ from "./FAQ";
import Footer from "./Footer";

const handleThemeNavigate = (slug: string) => {
  window.location.href = `/theme/${slug}`;
};

import TimerTimeline from "../components/TimerTimeline";

import { ruleBookLink } from "../lib/utils";

type TextContentProps = {
  currentScene: number;
  scenes: number;
  getTimelineRef?: (tl: gsap.core.Timeline) => void;
};

const TextContent = ({
  currentScene: _currentScene,
  getTimelineRef,
}: TextContentProps) => {
  const timerSettledRef = useRef<((settled: boolean) => void) | null>(null);

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
        { y: "100vh", opacity: 0, pointerEvents: "none" },
        { y: "20vh", opacity: 1, duration: 0.4, pointerEvents: "auto" },
        1.0
      );
      tl.to(
        scene2TextRef.current,
        { opacity: 0, duration: 0.2, pointerEvents: "none" },
        2.0
      );
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
          onComplete: () => timerSettledRef.current?.(true),
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
          onStart: () => timerSettledRef.current?.(false),
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
        8.1
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
        9.2
      );
    }

    // FAQ
    if (faqRef.current) {
      gsap.set(faqRef.current, { y: "100%", opacity: 0 });
      tl.to(
        faqRef.current,
        { y: "0%", opacity: 1, duration: 0.4, ease: "power2.out" },
        9.3
      );
      tl.to(
        faqRef.current,
        { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" },
        10.4
      );
    }

    // Footer: fade in from bottom, matching CTA/FAQ pattern
    if (footerRef.current) {
      gsap.set(footerRef.current, { y: "100%", opacity: 0 });
      tl.to(
        footerRef.current,
        {
          y: "0%",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          force3D: true,
        },
        10.5
      );
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
        className="hero-title fixed left-0 right-0 top-1/2  -translate-y-1/2 z-30 flex justify-center"
        style={{
          fontSize: "clamp(10px, 3vw, 20px)",
          opacity: 0,
          color: "white",
          cursor: "pointer",
          textShadow:
            "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
          pointerEvents: "none",
        }}
      >
        <a
          href={`${ruleBookLink}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            pointerEvents: "inherit",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          DOWNLOAD RULEBOOK
        </a>
      </div>

      <div
        ref={scene3TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
      >
        <SponsorsBento
          title={{ name: "EGDK", logo: "/sponsors/egdk-black.png" }}
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
            slug: "agentic-cloud-architecture",
            title: "Agentic Cloud Architecture",
          },
          {
            slug: "agentic-devops",
            title: "Agentic DevOps",
          },
          {
            slug: "agentic-cybersecurity",
            title: "Agentic Cybersecurity",
          },
          {
            slug: "open-innovation",
            title: "Open Innovation",
          },
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
                className="text-white hero-title"
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 3rem)",
                  textShadow:
                    "0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black",
                }}
              >
                THEME {n}: {title}
              </h2>
              <p
                className="text-white/50 mt-3 uppercase tracking-widest"
                style={{
                  fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
                  textShadow: "0 0 1px black",
                }}
              >
                Click to explore →
              </p>
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
