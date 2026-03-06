import { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import TextContent from "./scenes/TextContent";
import Navbar from "./components/ui/Navbar";
import Loader from "./components/Loader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Team from "./pages/Team";
import { Environment, useProgress } from "@react-three/drei";
import Sponsors from "./pages/Sponsors";
import Themes from "./pages/Themes";
import About from "./pages/About";
import { Overlay } from "./scenes/Overlay";
import PSPage from "./pages/ps";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function LoaderOverlay() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const max = useRef(0);

  if (progress > max.current) max.current = progress;

  useEffect(() => {
    if (!active) {
      const t = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(t);
    }
  }, [active]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <Loader progress={max.current} />
    </div>
  );
}

function HomePage() {
  const SCENES = 4;
  const scrollProgressRef = useRef(0);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const textTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [currentScene, setCurrentScene] = useState<number>(0);
  const { active } = useProgress();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!active) {
      const t = setTimeout(() => setLoaded(true), 600);
      return () => clearTimeout(t);
    }
  }, [active]);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.config({ ignoreMobileResize: true });
      // this fixes the address bar hiding on scroll on mobile devices
      ScrollTrigger.normalizeScroll(true);

      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.0,
        effects: true,
        smoothTouch: 0.3,
      });

      ScrollTrigger.create({
        trigger: "#smooth-content",
        start: "top top",
        end: "bottom bottom",
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
      <LoaderOverlay />
      {loaded && <Navbar />}
      <Overlay />
      <div id="smooth-wrapper">
        <div id="smooth-content" style={{ height: `${SCENES * 400}dvh` }}></div>
      </div>

      <div className="fixed inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 45, near: 0.1, far: 5000 }}
          shadows
        >
          <Suspense fallback={null}>
            <Experience scrollProgressRef={scrollProgressRef} scenes={SCENES} />
            <Environment
              files="/textures/background.jpg"
              background
              blur={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {loaded && (
        <TextContent
          getTimelineRef={(tl) => (textTimelineRef.current = tl)}
          currentScene={currentScene}
          scenes={SCENES}
        />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/themes" element={<Themes />} />
        <Route path="/about" element={<About />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/theme/:theme" element={<PSPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
