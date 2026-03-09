import { useEffect, useRef, useState } from "react"
import logoWhite from "../assets/logo_white.png"

type LoaderProps = {
  canDismiss: boolean
  onComplete?: () => void
}

export default function Loader({ canDismiss, onComplete }: LoaderProps) {
  // visible → fading → done
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible")
  const minTimeReachedRef = useRef(false)
  const canDismissRef = useRef(false)

  const MIN_DISPLAY_MS = 3000
  const FADE_OUT_MS = 1200

  useEffect(() => {
    canDismissRef.current = canDismiss
  }, [canDismiss])

  // Minimum display timer
  useEffect(() => {
    const timer = setTimeout(() => {
      minTimeReachedRef.current = true
      if (canDismissRef.current) setPhase("fading")
    }, MIN_DISPLAY_MS)
    return () => clearTimeout(timer)
  }, [])

  // When canDismiss flips true AND min time elapsed
  useEffect(() => {
    if (canDismiss && minTimeReachedRef.current && phase === "visible") {
      setPhase("fading")
    }
  }, [canDismiss, phase])

  // When fading starts, use a reliable JS timeout for completion
  useEffect(() => {
    if (phase !== "fading") return
    const timer = setTimeout(() => {
      setPhase("done")
      onComplete?.()
    }, FADE_OUT_MS)
    return () => clearTimeout(timer)
  }, [phase, onComplete])

  if (phase === "done") return null

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
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity ${FADE_OUT_MS}ms ease-out;
        }

        .htf-loader.fading {
          opacity: 0;
          pointer-events: none;
        }

        .htf-loader.fading .htf-loader-logo {
          animation: none;
          opacity: 1;
        }

        .htf-loader-logo {
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
        <img
          src={logoWhite}
          alt="HackToFuture"
          className="htf-loader-logo"
          draggable={false}
        />
      </div>
    </>
  )
}