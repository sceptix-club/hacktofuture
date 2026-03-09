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

function FrameSignal({ onReady }: { onReady: () => void }) {
  const fired = useRef(false);
  const { scene } = useThree();

  useFrame(() => {
    if (fired.current) return;

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
  const mountedRef = useRef(true);

  const { active, progress } = useProgress();

  // ── readiness flags ──
  const [threeReady, setThreeReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const [threeDFontReady, setThreeDFontReady] = useState(false);

  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Track mount state for safe async updates
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!active && progress === 100) setAssetsLoaded(true);
  }, [active, progress]);

  const handleSceneReady = useCallback(() => {
    if (mountedRef.current) setThreeReady(true);
  }, []);

  // ── Preload the 3D font ──
  useEffect(() => {
    const controller = new AbortController();
    fetch("/fonts/DelaGothicOne-Regular.ttf", { signal: controller.signal })
      .then((res) => res.arrayBuffer())
      .then(() => {
        if (mountedRef.current) setThreeDFontReady(true);
      })
      .catch(() => {
        if (mountedRef.current) setThreeDFontReady(true);
      });
    return () => controller.abort();
  }, []);

  // ── Fonts ──
  useEffect(() => {
    let cancelled = false;
    const checkFont = async () => {
      try {
        await document.fonts.ready;
        await document.fonts.load('700 16px "Dela Gothic One"');
      } catch (_) {
        // fine
      }
      if (!cancelled) setFontsReady(true);
    };
    checkFont();
    // Safety timeout — never block forever
    const timeout = setTimeout(() => {
      if (!cancelled) setFontsReady(true);
    }, 5000);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  // ── DOM ready ──
  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | undefined;

    const checkAllImages = () => {
      const images = Array.from(document.querySelectorAll("img"));
      return images.length === 0 || images.every((img) => img.complete && img.naturalHeight > 0);
    };

    const tryResolve = () => {
      if (cancelled) return true;
      if (document.readyState === "complete" && checkAllImages()) {
        setDomReady(true);
        return true;
      }
      return false;
    };

    if (tryResolve()) return;

    const handler = () => {
      if (tryResolve()) return;
      interval = setInterval(() => {
        if (tryResolve()) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 200);
    };

    if (document.readyState === "complete") {
      handler();
    } else {
      window.addEventListener("load", handler);
    }

    // Safety: always resolve after 10s
    const safetyTimeout = setTimeout(() => {
      if (!cancelled) setDomReady(true);
    }, 10000);

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
      clearTimeout(safetyTimeout);
      window.removeEventListener("load", handler);
    };
  }, []);

  const canDismiss = threeReady && assetsLoaded && fontsReady && domReady && threeDFontReady;

  // ── Fade out pre-loader from index.html ──
  useEffect(() => {
    const el = document.getElementById("pre-loader");
    if (el) {
      el.style.opacity = "0";
      const timer = setTimeout(() => el.remove(), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLoaderComplete = useCallback(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  // ── GSAP ScrollSmoother + ScrollTrigger ──
  useEffect(() => {
    // Ensure wrapper/content exist before initializing
    const wrapper = document.getElementById("smooth-wrapper");
    const content = document.getElementById("smooth-content");
    if (!wrapper || !content) return;

    const timer = setTimeout(() => {
      if (!mountedRef.current) return;

      ScrollTrigger.config({ ignoreMobileResize: true });

      const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
      if (!isIOS) {
        ScrollTrigger.normalizeScroll(true);
      }

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
          if (!mountedRef.current) return;
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

      // Kill ScrollSmoother first
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }

      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((t) => t.kill());

      // Disable normalizeScroll so it doesn't affect other pages
      ScrollTrigger.normalizeScroll(false);

      // Clear any inline styles GSAP may have added to body/html
      ScrollTrigger.clearScrollMemory();
      
      // Reset body/html scroll styles that ScrollSmoother may have set
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, []);

  return (
    <>
      {/* ===== CANVAS ===== */}
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

      {/* ===== SCROLL STRUCTURE ===== */}
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

      {/* ===== LOADER ===== */}
      <Loader canDismiss={canDismiss} onComplete={handleLoaderComplete} />
    </>
  );
}

// ── Layout wrapper for non-homepage routes ──
function PageLayout({ children }: { children: React.ReactNode }) {
  // Remove the pre-loader on non-home pages too
  useEffect(() => {
    const el = document.getElementById("pre-loader");
    if (el) {
      el.style.opacity = "0";
      const timer = setTimeout(() => el.remove(), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  // Clean up any leftover GSAP scroll state from HomePage
  useEffect(() => {
    // Ensure body is scrollable on these pages
    document.documentElement.style.overflow = "";
    document.documentElement.style.height = "";
    document.body.style.overflow = "";
    document.body.style.height = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/team"
          element={
            <PageLayout>
              <Team />
            </PageLayout>
          }
        />
        <Route
          path="/themes"
          element={
            <PageLayout>
              <Themes />
            </PageLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PageLayout>
              <About />
            </PageLayout>
          }
        />
        <Route
          path="/sponsors"
          element={
            <PageLayout>
              <Sponsors />
            </PageLayout>
          }
        />
        <Route
          path="/theme/:theme"
          element={
            <PageLayout>
              <PSPage />
            </PageLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;