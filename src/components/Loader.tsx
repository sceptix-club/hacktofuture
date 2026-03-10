import { useEffect, useRef, useState } from "react";
import logoWhite from "../assets/logo_white.png";

type LoaderProps = {
  canDismiss: boolean;
  onComplete?: () => void;
};

export default function Loader({ canDismiss, onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");
  const minTimeReachedRef = useRef(false);
  const canDismissRef = useRef(false);

  const MIN_DISPLAY_MS = 3000;
  const FADE_OUT_MS = 1200;

  useEffect(() => {
    canDismissRef.current = canDismiss;
  }, [canDismiss]);

  useEffect(() => {
    const timer = setTimeout(() => {
      minTimeReachedRef.current = true;
      if (canDismissRef.current) setPhase("fading");
    }, MIN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (canDismiss && minTimeReachedRef.current && phase === "visible") {
      setPhase("fading");
    }
  }, [canDismiss, phase]);

  useEffect(() => {
    if (phase !== "fading") return;
    const timer = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, FADE_OUT_MS);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <>
      <style>{`
        @keyframes fadeInOut {
          0%   { opacity: 0; }
          50%  { opacity: 1; }
          100% { opacity: 0; }
        }

        .htf-loader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity ${FADE_OUT_MS}ms ease-out;
          overflow: hidden;
        }

        .htf-loader.fading {
          opacity: 0;
          pointer-events: none;
        }

        .htf-loader.fading .htf-loader-logo {
          animation: none;
          opacity: 1;
        }

        /* Background layer — blurred texture, separate from content */
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

        /* Dark overlay on top of the blurred bg */
        .htf-loader-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 1;
        }

        .htf-loader-logo {
          position: relative;
          z-index: 2;
          width: min(320px, 70vw);
          height: auto;
          object-fit: contain;
          user-select: none;
          -webkit-user-drag: none;
          opacity: 0;
          animation: fadeInOut 2s ease-in-out infinite;
        }
      `}</style>

      <div className={`htf-loader${phase === "fading" ? " fading" : ""}`}>
        {/* Blurred background — inset: -20px so blur edges don't show */}
        <div className="htf-loader-bg" />

        {/* Dark tint overlay */}
        <div className="htf-loader-overlay" />

        {/* Logo on top */}
        <img
          src={logoWhite}
          alt="HackToFuture"
          className="htf-loader-logo"
          draggable={false}
        />
      </div>
    </>
  );
}
