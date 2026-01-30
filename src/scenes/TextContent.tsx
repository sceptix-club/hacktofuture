import { useEffect, useRef } from "react";
import gsap from "gsap";

type TextContentProps = {
  currentScene: number
}

const TextContent = ({ currentScene }: TextContentProps) => {
  const scene2TextRef = useRef<HTMLDivElement>(null);
  const scene3TextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (scene2TextRef.current) {
      gsap.fromTo(
        scene2TextRef.current,
        {
          y: "100vh",
          opacity: 0,
        },
        {
          y: "0vh",
          opacity: 1,
          scrollTrigger: {
            trigger: "#smooth-content",
            start: "20% top",
            end: "40% top",
            scrub: true,
          },
        }
      );

      gsap.to(scene2TextRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: "#smooth-content",
          start: "45% top",
          end: "48% top",
          scrub: true,
        },
      });
    }

    // Animate Scene 3 text: from bottom to middle, replacing scene 2 text
    if (scene3TextRef.current) {
      gsap.fromTo(
        scene3TextRef.current,
        {
          y: "100vh",
          opacity: 0,
        },
        {
          y: "0vh",
          opacity: 1,
          scrollTrigger: {
            trigger: "#smooth-content",
            start: "60% top",
            end: "75% top",
            scrub: true,
          },
        }
      );
    }

  })

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
  )
}

export default TextContent
