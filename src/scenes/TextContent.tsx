import { useEffect, useRef } from "react";
import gsap from "gsap";

type TextContentProps = {
  currentScene: number;
  scenes: number;
};

const TextContent = ({ currentScene, scenes }: TextContentProps) => {
  const scene2TextRef = useRef<HTMLDivElement>(null);
  const scene3TextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width =
      typeof window !== "undefined" ? window.innerWidth : (1024 as number);
    const multiplier = width <= 640 ? 650 : 1000;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#smooth-content",
        start: "top top",
        end: `+=${scenes * multiplier}`,
        scrub: true,
        pin: false,
      },
    });

    if (scene2TextRef.current) {
      tl.fromTo(
        scene2TextRef.current,
        { y: "100vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 0.4 },
        1.0
      ).to(scene2TextRef.current, { opacity: 0, duration: 0.2 }, 1.4);
    }

    // Animate Scene 3 text: from bottom to middle, replacing scene 2 text
    if (scene3TextRef.current) {
      tl.fromTo(
        scene3TextRef.current,
        {
          y: "100vh",
          opacity: 0,
        },
        {
          y: "0vh",
          opacity: 1,
          duration: 0.3,
        },
        1.8
      );
      tl.to(scene3TextRef.current, { opacity: 0 }, 2.8);
    }
  });

  return (
    <>
      {/* Scene 1 text - static at bottom */}
      {currentScene === 0 && (
        <div className="fixed left-0 right-0 bottom-[12vh] z-20 flex justify-center pointer-events-none">
          <div className="max-w-[95vw] overflow-hidden">
            <h2
              className="text-white whitespace-nowrap font-bold"
              style={{ fontSize: "clamp(1.0rem, 4vw, 2.0rem)" }}
            >
              REGISTER NOW!!!
            </h2>
          </div>
        </div>
      )}

      {/* Scene 2 text - animates from bottom to middle */}
      <div
        ref={scene2TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[95vw] overflow-hidden text-center">
          <h2
            className="text-white font-bold"
            style={{ fontSize: "clamp(1.5rem, 6vw, 3.5rem)" }}
          >
            ABOUT HACKTOFUTURE
          </h2>
          <p
            className="text-white/80 mt-4"
            style={{ fontSize: "clamp(0.8rem, 2vw, 1.2rem)" }}
          >
            Download the Rulebook here
          </p>
        </div>
      </div>

      {/* Scene 3 text - animates from bottom to middle */}
      <div
        ref={scene3TextRef}
        className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[95vw] overflow-hidden text-center">
          <h2
            className="text-white font-bold"
            style={{ fontSize: "clamp(2.0rem, 8vw, 4.5rem)" }}
          >
            COMING SOON!
          </h2>
          <p
            className="text-white/80 mt-4"
            style={{ fontSize: "clamp(1.0rem, 3vw, 1.5rem)" }}
          >
            36 Hour Hackathon
          </p>
        </div>
      </div>
    </>
  );
};

export default TextContent;
