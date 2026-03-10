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
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

  const { active, progress } = useProgress();

  const [threeReady, setThreeReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const [threeDFontReady, setThreeDFontReady] = useState(false);

  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) setAssetsLoaded(true);
  }, [active, progress]);

  const handleSceneReady = useCallback(() => {
    setThreeReady(true);
  }, []);

  useEffect(() => {
    fetch("/fonts/DelaGothicOne-Regular.ttf")
      .then((res) => res.arrayBuffer())
      .then(() => setThreeDFontReady(true))
      .catch(() => setThreeDFontReady(true));
  }, []);

  useEffect(() => {
    const checkFont = async () => {
      await document.fonts.ready;
      try {
        await document.fonts.load('700 16px "Dela Gothic One"');
      } catch (_) {}
      setFontsReady(true);
    };
    checkFont();
  }, []);

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

    const handler = () => {
      if (tryResolve()) return;
      const interval = setInterval(() => {
        if (tryResolve()) clearInterval(interval);
      }, 200);
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

  const canDismiss =
    threeReady && assetsLoaded && fontsReady && domReady && threeDFontReady;

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

      <Overlay />

      <div id="smooth-wrapper">
        <div id="smooth-content" style={{ height: `${SCENES * 400}dvh` }} />
      </div>

      <Navbar />

      <TextContent
        getTimelineRef={(tl) => (textTimelineRef.current = tl)}
        currentScene={currentScene}
        scenes={SCENES}
      />

      <Loader canDismiss={canDismiss} onComplete={handleLoaderComplete} />
    </>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    const el = document.getElementById("pre-loader");
    if (el) {
      el.style.opacity = "0";
      const timer = setTimeout(() => el.remove(), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  // On every route change: kill leftover GSAP from previous page + reset body
  useEffect(() => {
    setLoaderDone(false);

    const smoother = ScrollSmoother.get();
    if (smoother) smoother.kill();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    ScrollTrigger.clearMatchMedia();
    ScrollTrigger.normalizeScroll(false);

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
  }, [location.pathname]);

  return (
    <>
      {typeof children === "object" && children !== null
        ? // Clone children to inject loaderDone prop
          (() => {
            const child = children as React.ReactElement<{
              loaderDone?: boolean;
            }>;
            return <child.type {...child.props} loaderDone={loaderDone} />;
          })()
        : children}
      <Loader
        key={location.pathname}
        canDismiss={true}
        minDisplayMs={750}
        fadeOutMs={600}
        onComplete={() => setLoaderDone(true)}
      />
    </>
  );
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
