import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollIndicator from "../components/Scrollindicator";

type TextContentProps = {
  currentScene: number;
  scenes: number;
  getTimelineRef?: (tl: gsap.core.Timeline) => void;
};

const TextContent = ({ currentScene, getTimelineRef }: TextContentProps) => {
  const scene2TextRef = useRef<HTMLDivElement>(null);
  const scene3TextRef = useRef<HTMLDivElement>(null);
  const card1TextRef = useRef<HTMLDivElement>(null);
  const card2TextRef = useRef<HTMLDivElement>(null);
  const card3TextRef = useRef<HTMLDivElement>(null);
  const card4TextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    // Scene 2 text
    if (scene2TextRef.current) {
      tl.fromTo(
        scene2TextRef.current,
        { y: "100vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 0.6 },
        1.0
      ).to(scene2TextRef.current, { opacity: 0, duration: 0.2 }, 2.0);
    }

    // Scene 3 text
    if (scene3TextRef.current) {
      tl.fromTo(
        scene3TextRef.current,
        { y: "100vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 0.5 },
        2.1
      );
      tl.to(scene3TextRef.current, { opacity: 0, duration: 0.2 }, 2.6);
    }

    // Card 1 text (3.0 - 3.5)
    if (card1TextRef.current) {
      tl.fromTo(
        card1TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2 },
        3.0
      );
      tl.to(card1TextRef.current, { opacity: 0, duration: 0.15 }, 3.35);
    }

    // Card 2 text (3.5 - 4.0)
    if (card2TextRef.current) {
      tl.fromTo(
        card2TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2 },
        3.5
      );
      tl.to(card2TextRef.current, { opacity: 0, duration: 0.15 }, 3.85);
    }

    // Card 3 text (4.0 - 4.5) - Note: this extends beyond scene 3
    if (card3TextRef.current) {
      tl.fromTo(
        card3TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2 },
        4.0
      );
      tl.to(card3TextRef.current, { opacity: 0, duration: 0.15 }, 4.35);
    }

    // Card 4 text (4.5 - 5.0)
    if (card4TextRef.current) {
      tl.fromTo(
        card4TextRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2 },
        4.5
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
      {currentScene === 0 && (
        <div className="fixed left-0 right-0 bottom-[12vh] z-20 flex justify-center pointer-events-none">
          <div className="max-w-[95vw] overflow-hidden">
            <ScrollIndicator/>
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
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
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
            style={{ fontSize: "clamp(0.8rem, 2vw, 1.2rem)" }}
            >
            “The clock starts ticking… 36 hours. Infinite chaos.”<br />
            HackToFuture 4.0 is back this April (x–y), where ideas collide,
            caffeine fuels creativity, and legends are coded. Whether you’re a
            seasoned hacker or a first-time hero.
            </p>
        </div>
      </div>

      {/* Scene 3 text */}
      <div
        ref={scene3TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[95vw] overflow-hidden text-center">
          <h2
            className="text-white font-bold hero-title"
            style={{ fontSize: "clamp(2.0rem, 8vw, 4.5rem)" }}
          >
            COMING SOON!
          </h2>
          <p
            className="text-white/80 mt-4 comic-sans"
            style={{ fontSize: "clamp(1.0rem, 3vw, 1.5rem)" }}
          >
            36 Hour Hackathon
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
