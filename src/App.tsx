import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Stats } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import TextContent from "./scenes/TextContent";
import Navbar from "./components/ui/Navbar";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const SCENES = 4;
  const scrollProgressRef = useRef(0);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const textTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [currentScene, setCurrentScene] = useState<number>(0);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.0,
        effects: true,
        smoothTouch: 1.0,
      });

      ScrollTrigger.create({
        trigger: "#smooth-content",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          const time = self.progress * SCENES;
          const current = Math.min(Math.floor(time), SCENES - 1);
          setCurrentScene(current);
          if (textTimelineRef.current) {
            textTimelineRef.current.progress(self.progress);
          }
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content" style={{ height: `${SCENES * 200}dvh` }}></div>
      </div>
      <div className="fixed inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 45, near: 0.1, far: 5000 }}
          shadows
        >
          {/* <Stats /> */}
          <Experience scrollProgressRef={scrollProgressRef} scenes={SCENES} />
          <color attach="background" args={["#000000"]} />
        </Canvas>
      </div>
      <TextContent
        getTimelineRef={(tl) => (textTimelineRef.current = tl)}
        currentScene={currentScene}
        scenes={SCENES}
      />
    </>
  );
}

export default App;
