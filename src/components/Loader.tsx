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

  // Use requestAnimationFrame for smooth 60fps progress
  const tick = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const canFinish = canDismissRef.current;
    const min = minDisplayMsRef.current;
    const minTimeReached = elapsed >= min;

    let target: number;

    if (canFinish && minTimeReached) {
      // Both conditions met — race to 100%
      target = 100;
      const next = progressRef.current + (target - progressRef.current) * 0.08;
      progressRef.current = next >= 99.5 ? 100 : next;
    } else if (canFinish && !minTimeReached) {
      // Content loaded but we're still within min display time
      const ratio = Math.min(elapsed / min, 1);
      target = 10 + ratio * 80; // 10% → 90% over minDisplayMs
      progressRef.current = Math.max(progressRef.current, target);
    } else {
      // Still loading — ease toward 70% based on elapsed time
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
          gap: 40px;
          opacity: 1;
          transition: opacity ${FADE_OUT_MS}ms ease-out;
          overflow: hidden;
          will-change: opacity;
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
          inset: -20px;
          background-image: url('/textures/background.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          filter: blur(8px);
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
          width: min(280px, 60vw);
          height: auto;
          object-fit: contain;
          user-select: none;
          -webkit-user-drag: none;
          animation: loaderPulse 2s ease-in-out infinite;
        }

        /* Progress container */
        .htf-progress-wrapper {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          width: min(360px, 75vw);
        }

        .htf-progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 99px;
          overflow: hidden;
          backdrop-filter: blur(4px);
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
          box-shadow: 0 0 12px rgba(168, 130, 255, 0.4);
        }

        .htf-progress-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .htf-progress-text {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }

        .htf-progress-percent {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          min-width: 36px;
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
