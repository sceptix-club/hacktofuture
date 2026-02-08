import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollIndicator from "../components/Scrollindicator";
import Button from "../components/ui/Button";
import { SponsorsBento } from "../assets/Sponsor";

type TextContentProps = {
  currentScene: number;
  scenes: number;
  getTimelineRef?: (tl: gsap.core.Timeline) => void;
};

const TextContent = ({ currentScene, getTimelineRef }: TextContentProps) => {
  const scene1TextRef = useRef<HTMLDivElement>(null);
  const scene2TextRef = useRef<HTMLDivElement>(null);
  const scene3TextRef = useRef<HTMLDivElement>(null);
  const scene4TextRef = useRef<HTMLDivElement>(null);
  const card1TextRef = useRef<HTMLDivElement>(null);
  const card2TextRef = useRef<HTMLDivElement>(null);
  const card3TextRef = useRef<HTMLDivElement>(null);
  const card4TextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    if (scene1TextRef.current) {
      tl.fromTo(
        scene1TextRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.1 },
        0.9
      );
    }

    if (scene2TextRef.current) {
      tl.fromTo(
        scene2TextRef.current,
        { y: "100vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 0.5 },
        1.0
      ).to(scene2TextRef.current, { opacity: 0, duration: 0.2 }, 1.8);
    }

    // Scene 3 text (Sponsors)
    if (scene3TextRef.current) {
      const panels = scene3TextRef.current.querySelectorAll('.sponsor-panel');
      gsap.set(panels, {
        x: (index) => { const positions = [2000, -2000, 1500, 0, 2000]; return positions[index] || 0; },
        y: (index) => { const positions = [-2000, -2000, 0, 1500, 2000]; return positions[index] || 0; },
        opacity: 0
      });
      // Animate them flying in
      tl.to(panels, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.01,
        ease: "back.out(0.8)",
      }, 2.0);

      tl.to(panels, {
        x: (index) => { const positions = [0, -2000, 1500, 0, 0]; return positions[index] || 0; },
        y: (index) => { const positions = [-1000, 2000, -1500, 1500, 2000]; return positions[index] || 0; },
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.in(0.8)",
      }, 2.8);
    }

    if (scene4TextRef.current) {
      tl.fromTo(
        scene4TextRef.current,
        { scale: 0.6, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        3.0
      );

      tl.to(
        scene4TextRef.current,
        { opacity: 0, scale: 1.1, duration: 0.25 },
        3.8);
    }

    // Card 1 text (4.0 - 4.5)
    if (card1TextRef.current) {
      tl.fromTo(
        card1TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2 },
        4.0
      );
      tl.to(card1TextRef.current, { opacity: 0, duration: 0.15 }, 4.45);
    }

    // Card 2 text (4.5 - 5.0)
    if (card2TextRef.current) {
      tl.fromTo(
        card2TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2 },
        4.5
      );
      tl.to(card2TextRef.current, { opacity: 0, duration: 0.15 }, 4.95);
    }

    // Card 3 text (5.0 - 5.5)
    if (card3TextRef.current) {
      tl.fromTo(
        card3TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2 },
        5.0
      );
      tl.to(card3TextRef.current, { opacity: 0, duration: 0.15 }, 5.45);
    }

    // Card 4 text (5.5 - 5.8)
    if (card4TextRef.current) {
      tl.fromTo(
        card4TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2 },
        5.5
      );
    }

    if (getTimelineRef) {
      getTimelineRef(tl);
    }

    return () => {
      tl.kill();
    };
  }, [getTimelineRef]);

  return (
    <>
      {/* Scene 1 text - static at bottom */}
      {(
        <div ref={scene1TextRef} className=" hero-title fixed left-0 right-0 bottom-[12vh] z-20 flex justify-center">
          <div className="max-w-[95vw] overflow-hidden">
            <ScrollIndicator />
            <h2
              className="text-white whitespace-nowrap font-bold"
              style={{ fontSize: "clamp(0.5rem, 4vw, 1.0rem)" }}
            >
              Scroll To Explore
            </h2>
          </div>
        </div>
      )}

      {/* Scene 2 text */}
      <div
        ref={scene2TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[75vw] overflow-hidden text-center">
          <h2
            className="text-white font-bold hero-title"
            style={{ fontSize: "clamp(1.5rem, 6vw, 3.5rem)" }}
          >
            ABOUT HACKTOFUTURE
          </h2>
          <p
            className="text-white/80 mt-4 comic-sans"
            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
          >
            “The clock starts ticking… 36 hours. Infinite chaos.”
            <br />
            <br />
            HackToFuture 4.0 is back this April (x–y), where ideas collide,
            caffeine fuels creativity, and legends are coded. Whether you’re a
            seasoned hacker or a first-time hero.
          </p>

          <div className="mt-6 flex justify-center pointer-events-auto">
            <a href="/rulebook.pdf" download>
              <Button className="bg-white text-black shadow-md hover:bg-white/90 hover:cursor-pointer">
                Download Rulebook
              </Button>
            </a>
          </div>
        </div>
      </div>



      {/* Scene 3 text */}
      <div
        ref={scene3TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
      >
        <SponsorsBento
          title={{ name: "EGDK" }}
          platinum={[{ name: "Company A" }, { name: "Company B" }]}
          gold={[{ name: "Company C" }, { name: "Company D" }]}
          silver={[{ name: "Company E" }, { name: "Company F" }, { name: "Company G" }]}
        />
      </div>

      {/* Scene 4 text */}
      <div
        ref={scene4TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[95vw] overflow-hidden text-center">
          <h2
            className="text-white font-bold hero-title"
            style={{ fontSize: "clamp(2.0rem, 8vw, 4.5rem)" }}
          >
            COUNTDOWN
          </h2>
          <p
            className="text-white/80 mt-4 comic-sans"
            style={{ fontSize: "clamp(1.0rem, 3vw, 1.5rem)" }}
          >
            + TIMELINE
          </p>
        </div>
      </div>

      {/* Card 1 text */}
      <div
        ref={card1TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[95vw] overflow-hidden text-center">
          <h2
            className="text-white font-bold"
            style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}
          >
            THEME 1
          </h2>
          <p
            className="text-white/80 mt-2"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)" }}
          >
            Theme 1 description here
          </p>
        </div>
      </div>

      {/* Card 2 text */}
      <div
        ref={card2TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[95vw] overflow-hidden text-center">
          <h2
            className="text-white font-bold"
            style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}
          >
            THEME 2
          </h2>
          <p
            className="text-white/80 mt-2"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)" }}
          >
            Theme 2 description here
          </p>
        </div>
      </div>

      {/* Card 3 text */}
      <div
        ref={card3TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[95vw] overflow-hidden text-center">
          <h2
            className="text-white font-bold"
            style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}
          >
            THEME 3
          </h2>
          <p
            className="text-white/80 mt-2"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)" }}
          >
            Theme 3 description here
          </p>
        </div>
      </div>

      {/* Card 4 text */}
      <div
        ref={card4TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[95vw] overflow-hidden text-center">
          <h2
            className="text-white font-bold"
            style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}
          >
            THEME 4
          </h2>
          <p
            className="text-white/80 mt-2"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)" }}
          >
            Theme 4 description here
          </p>
        </div>
      </div>
    </>
  );
};

export default TextContent;
