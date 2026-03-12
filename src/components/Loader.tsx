import { useEffect, useRef, useState, useCallback } from "react";
import logoWhite from "../assets/logo_white.png";

type LoaderProps = {
  canDismiss: boolean;
  onComplete?: () => void;
  minDisplayMs?: number;
  fadeOutMs?: number;
};

export default function Loader({
  canDismiss,
  onComplete,
  minDisplayMs = 3000,
  fadeOutMs = 1200,
}: LoaderProps) {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");
  const [progress, setProgress] = useState(0);

  const canDismissRef = useRef(false);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef(Date.now());
  const minDisplayMsRef = useRef(minDisplayMs);

  const FADE_OUT_MS = fadeOutMs;

  useEffect(() => {
    canDismissRef.current = canDismiss;
  }, [canDismiss]);

  useEffect(() => {
    minDisplayMsRef.current = minDisplayMs;
  }, [minDisplayMs]);

  // Lock ALL scrolling while loader is active (visible or fading)
  useEffect(() => {
    if (phase === "done") return;

    const scrollY = window.scrollY;

    // Lock body
    const origOverflow = document.body.style.overflow;
    const origPosition = document.body.style.position;
    const origWidth = document.body.style.width;
    const origTop = document.body.style.top;
    const origTouchAction = document.body.style.touchAction;
    const origOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.touchAction = "none";
    document.body.style.overscrollBehavior = "none";

    // Also lock <html>
    const htmlEl = document.documentElement;
    const origHtmlOverflow = htmlEl.style.overflow;
    const origHtmlOverscroll = htmlEl.style.overscrollBehavior;
    htmlEl.style.overflow = "hidden";
    htmlEl.style.overscrollBehavior = "none";

    // Block all scroll-causing events at the window/document level
    const prevent = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Space",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        "Tab",
      ];
      if (keys.includes(e.code)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Use capture phase to intercept before anything else
    window.addEventListener("wheel", prevent, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchmove", prevent, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchstart", prevent, {
      capture: true,
      passive: false,
    });
    window.addEventListener("keydown", preventKeyScroll, {
      capture: true,
      passive: false,
    });
    window.addEventListener("scroll", prevent, {
      capture: true,
      passive: false,
    });

    return () => {
      // Restore body
      document.body.style.overflow = origOverflow;
      document.body.style.position = origPosition;
      document.body.style.width = origWidth;
      document.body.style.top = origTop;
      document.body.style.touchAction = origTouchAction;
      document.body.style.overscrollBehavior = origOverscroll;

      // Restore html
      htmlEl.style.overflow = origHtmlOverflow;
      htmlEl.style.overscrollBehavior = origHtmlOverscroll;

      // Restore scroll position
      window.scrollTo(0, scrollY);

      // Remove listeners
      window.removeEventListener("wheel", prevent, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener("touchmove", prevent, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener("touchstart", prevent, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener("keydown", preventKeyScroll, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener("scroll", prevent, {
        capture: true,
      } as EventListenerOptions);
    };
  }, [phase]);

  // Use requestAnimationFrame for smooth 60fps progress
  const tick = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const canFinish = canDismissRef.current;
    const min = minDisplayMsRef.current;
    const minTimeReached = elapsed >= min;

    let target: number;

    if (canFinish && minTimeReached) {
      target = 100;
      const next = progressRef.current + (target - progressRef.current) * 0.08;
      progressRef.current = next >= 99.5 ? 100 : next;
    } else if (canFinish && !minTimeReached) {
      const ratio = Math.min(elapsed / min, 1);
      target = 10 + ratio * 80;
      progressRef.current = Math.max(progressRef.current, target);
    } else {
      const ratio = Math.min(elapsed / (min * 2), 1);
      target = 70 * (1 - Math.pow(1 - ratio, 3));
      progressRef.current = Math.max(progressRef.current, target);
    }

    setProgress(progressRef.current);

    if (progressRef.current >= 100) {
      setPhase((prev) => (prev === "visible" ? "fading" : prev));
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Start the rAF loop
  useEffect(() => {
    startTimeRef.current = Date.now();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  // Handle fade-out → done
  useEffect(() => {
    if (phase !== "fading") return;
    const timer = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, FADE_OUT_MS);
    return () => clearTimeout(timer);
  }, [phase, onComplete, FADE_OUT_MS]);

  if (phase === "done") return null;

  const roundedProgress = Math.round(progress);
  const statusText =
    roundedProgress < 30
      ? "Initializing…"
      : roundedProgress < 60
      ? "Loading resources…"
      : roundedProgress < 95
      ? "Almost there…"
      : "Ready!";

  return (
    <>
      <style>{`
        @keyframes loaderPulse {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }

        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .htf-loader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          opacity: 1;
          transition: opacity ${FADE_OUT_MS}ms ease-out;
          overflow: hidden;
          will-change: opacity;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          overscroll-behavior: none;
          -webkit-overflow-scrolling: auto;
          pointer-events: all;
        }

        .htf-loader.fading {
          opacity: 0;
          pointer-events: none;
        }

        .htf-loader.fading .htf-loader-logo {
          animation: none;
          opacity: 1;
        }

        .htf-loader-bg {
          position: absolute;
          inset: -1.25rem;
          background-image: url('/textures/background.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          filter: blur(0.5rem);
          z-index: 0;
        }

        .htf-loader-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 1;
        }

        .htf-loader-logo {
          position: relative;
          z-index: 2;
          width: min(17.5rem, 60vw);
          height: auto;
          object-fit: contain;
          user-select: none;
          -webkit-user-drag: none;
          animation: loaderPulse 2s ease-in-out infinite;
        }

        .htf-progress-wrapper {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.875rem;
          width: min(22.5rem, 75vw);
        }

        .htf-progress-track {
          width: 100%;
          height: 0.25rem;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 99px;
          overflow: hidden;
          backdrop-filter: blur(0.25rem);
        }

        .htf-progress-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.9)
          );
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
          will-change: width;
          box-shadow: 0 0 0.75rem rgba(168, 130, 255, 0.4);
        }

        .htf-progress-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .htf-progress-text {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.03rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }

        .htf-progress-percent {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          min-width: 2.25rem;
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
      `}</style>

      <div className={`htf-loader${phase === "fading" ? " fading" : ""}`}>
        <div className="htf-loader-bg" />
        <div className="htf-loader-overlay" />

        <img
          src={logoWhite}
          alt="HackToFuture"
          className="htf-loader-logo"
          draggable={false}
        />

        <div className="htf-progress-wrapper">
          <div className="htf-progress-track">
            <div
              className="htf-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="htf-progress-info">
            <span className="htf-progress-text">{statusText}</span>
            <span className="htf-progress-percent">{roundedProgress}%</span>
          </div>
        </div>
      </div>
    </>
  );
}
