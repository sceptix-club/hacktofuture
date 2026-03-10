import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./Experience";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import TextContent from "./scenes/TextContent";
import Navbar from "./components/ui/Navbar";
import Loader from "./components/Loader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Team from "./pages/Team";
import { Environment, Preload, useProgress } from "@react-three/drei";
import Sponsors from "./pages/Sponsors";
import Themes from "./pages/Themes";
import About from "./pages/About";
import { Overlay } from "./scenes/Overlay";
import PSPage from "./pages/ps";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Sits inside <Canvas> <Suspense> — only runs after all suspended
// content has mounted. Checks that 3D meshes actually have geometry
// (troika Text renders geometry async after mount).
function FrameSignal({ onReady }: { onReady: () => void }) {
  const fired = useRef(false);
  const { scene } = useThree();

  useFrame(() => {
    if (fired.current) return;

    // Check if there's at least one mesh with actual geometry in the scene
    // (troika Text creates geometry asynchronously after mount)
    let hasMeshWithGeometry = false;
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (
        mesh.isMesh &&
        mesh.geometry &&
        (mesh.geometry.attributes.position?.count ?? 0) > 0
      ) {
        hasMeshWithGeometry = true;
      }
    });

    if (hasMeshWithGeometry) {
      fired.current = true;
      onReady();
    }
  });

  return null;
}

function HomePage() {
  const SCENES = 4;
  const scrollProgressRef = useRef(0);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const textTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [currentScene, setCurrentScene] = useState<number>(0);

  const { active, progress } = useProgress();

  // ── readiness flags ──
  const [threeReady, setThreeReady] = useState(false);   // drei assets + scene has real geometry
  const [fontsReady, setFontsReady] = useState(false);
  const [domReady, setDomReady] = useState(false);        // window load + all <img> loaded
  const [threeDFontReady, setThreeDFontReady] = useState(false); // troika 3D font file cached

  // ── 1. Three.js: drei progress done ──
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) setAssetsLoaded(true);
  }, [active, progress]);

  // Called from FrameSignal inside <Suspense> once meshes have real geometry
  const handleSceneReady = useCallback(() => {
    setThreeReady(true);
  }, []);

  // ── 1b. Preload the 3D font used by HackToFuture text ──
  useEffect(() => {
    fetch("/fonts/DelaGothicOne-Regular.ttf")
      .then(res => res.arrayBuffer())
      .then(() => setThreeDFontReady(true))
      .catch(() => setThreeDFontReady(true)); // don't block on failure
  }, []);

  // ── 2. Fonts — check Dela Gothic One specifically ──
  useEffect(() => {
    const checkFont = async () => {
      await document.fonts.ready;
      // Explicitly wait for the critical overlay font
      try {
        await document.fonts.load('700 16px "Dela Gothic One"');
      } catch (_) {
        // font load can reject if already loaded, that's fine
      }
      setFontsReady(true);
    };
    checkFont();
  }, []);

  // ── 3. DOM: window.load + all <img> elements ──
  useEffect(() => {
    const checkAllImages = () => {
      const images = Array.from(document.querySelectorAll("img"));
      return images.every((img) => img.complete && img.naturalHeight > 0);
    };

    const tryResolve = () => {
      if (document.readyState === "complete" && checkAllImages()) {
        setDomReady(true);
        return true;
      }
      return false;
    };

    if (tryResolve()) return;

    // Poll images every 200ms after window.load
    const handler = () => {
      if (tryResolve()) return;
      const interval = setInterval(() => {
        if (tryResolve()) clearInterval(interval);
      }, 200);
      // Safety: stop polling after 15s
      setTimeout(() => {
        clearInterval(interval);
        setDomReady(true);
      }, 15000);
    };

    if (document.readyState === "complete") {
      handler();
    } else {
      window.addEventListener("load", handler);
      return () => window.removeEventListener("load", handler);
    }
  }, []);

  // ── 4. All conditions ──
  const canDismiss = threeReady && assetsLoaded && fontsReady && domReady && threeDFontReady;

  // ── Fade out pre-loader from index.html once React Loader is mounted ──
  useEffect(() => {
    const el = document.getElementById("pre-loader");
    if (el) {
      // Fade it out smoothly behind the React Loader (z-99999 vs z-999999)
      el.style.opacity = "0";
      // Remove from DOM after transition completes
      const timer = setTimeout(() => el.remove(), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  // ── When Loader fade-out finishes ──
  const handleLoaderComplete = useCallback(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.config({ ignoreMobileResize: true });
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
      if (smootherRef.current) smootherRef.current.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ===== CANVAS — always mounted, black by default ===== */}
      <div className="fixed inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 45, near: 0.1, far: 5000 }}
          shadows
          gl={{ alpha: false, antialias: true }}
          style={{ background: "#000" }}
          onCreated={({ gl }) => {
            gl.setClearColor("#000000", 1);
          }}
        >
          {/* Force black before environment loads */}
          <color attach="background" args={["#000000"]} />

          <Suspense fallback={null}>
            <Experience scrollProgressRef={scrollProgressRef} scenes={SCENES} />
            <Environment
              files="/textures/background.jpg"
              background
              blur={0.5}
            />
            <Preload all />
            <FrameSignal onReady={handleSceneReady} />
          </Suspense>
        </Canvas>
      </div>

      {/* ===== SCROLL STRUCTURE — renders behind the loader ===== */}
      <Overlay />

      <div id="smooth-wrapper">
        <div id="smooth-content" style={{ height: `${SCENES * 400}dvh` }} />
      </div>

      {/* ===== Navbar ===== */}
      <Navbar />

      <TextContent
        getTimelineRef={(tl) => (textTimelineRef.current = tl)}
        currentScene={currentScene}
        scenes={SCENES}
      />

      {/* ===== LOADER — always mounted, on top of everything ===== */}
      <Loader canDismiss={canDismiss} onComplete={handleLoaderComplete} />
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
