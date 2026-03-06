import { useEffect, useState, useRef } from "react"

type LoaderProps = {
  progress: number
  onComplete?: () => void
}

export default function Loader({ progress, onComplete }: LoaderProps) {
  const [dots, setDots] = useState(".")
  const [phase, setPhase] = useState<"loading" | "closing" | "done">("loading")
  const completedRef = useRef(false)

  // Animate dots
  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."))
    }, 400)
    return () => clearInterval(id)
  }, [])

  // Trigger close sequence when progress hits 100
  useEffect(() => {
    if (progress >= 100 && !completedRef.current) {
      completedRef.current = true
      // Small delay so user sees "100%" for a moment
      setTimeout(() => {
        setPhase("closing")
        // After close animation finishes, call onComplete
        setTimeout(() => {
          setPhase("done")
          onComplete?.()
        }, 700)
      }, 600)
    }
  }, [progress, onComplete])

  const getMessage = () => {
    if (progress < 25) return "BOOTING SYSTEMS"
    if (progress < 50) return "LOADING ASSETS"
    if (progress < 75) return "HACKING THE FUTURE"
    if (progress < 95) return "ALMOST THERE"
    return "LAUNCHING"
  }

  const filled = Math.round(progress / 5)

  if (phase === "done") return null

  return (
    <>
      <style>{`
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.4; }
        }
        @keyframes htf-pulse {
          0%, 100% { transform: scale(1) rotate(-1deg); }
          50% { transform: scale(1.04) rotate(1deg); }
        }
        @keyframes spin-gear {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-gear-rev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes pop-in {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          70% { transform: scale(1.15) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes float-dot {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        /* Shutter close: two halves slide to center */
        @keyframes shutter-top {
          from { transform: scaleY(0); transform-origin: top; }
          to   { transform: scaleY(1); transform-origin: top; }
        }
        @keyframes shutter-bottom {
          from { transform: scaleY(0); transform-origin: bottom; }
          to   { transform: scaleY(1); transform-origin: bottom; }
        }
        @keyframes bg-fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        .loader-root {
          position: fixed;
          inset: 0;
          background: #1a0a00;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          font-family: 'VT323', monospace;
        }
        .loader-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #c0392b22 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
        }
        .loader-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px
          );
          pointer-events: none;
          z-index: 10;
        }

        .loader-root.closing {
          animation: bg-fade-out 0.7s ease forwards;
          animation-delay: 0.1s;
        }

        /* Shutter panels */
        .shutter-top, .shutter-bottom {
          position: absolute;
          left: 0; right: 0;
          height: 50%;
          background: #111;
          z-index: 100;
          transform: scaleY(0);
        }
        .shutter-top {
          top: 0;
          transform-origin: top;
          animation: shutter-top 0.55s cubic-bezier(0.7, 0, 0.3, 1) forwards;
        }
        .shutter-bottom {
          bottom: 0;
          transform-origin: bottom;
          animation: shutter-bottom 0.55s cubic-bezier(0.7, 0, 0.3, 1) forwards;
        }

        .card {
          position: relative;
          width: min(520px, 92vw);
          background: #fff;
          border: 5px solid #111;
          box-shadow: 8px 8px 0 #111, 16px 16px 0 #c0392b;
          padding: 0;
          animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          z-index: 20;
        }
        .card-header {
          background: #c0392b;
          border-bottom: 4px solid #111;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .htf-title {
          font-family: 'Bangers', cursive;
          font-size: clamp(22px, 5vw, 32px);
          color: #fff;
          letter-spacing: 3px;
          text-shadow: 2px 2px 0 #111;
          animation: htf-pulse 2s ease-in-out infinite;
          display: inline-block;
        }
        .badge {
          background: #111;
          color: #fff;
          font-family: 'VT323', monospace;
          font-size: 15px;
          padding: 3px 10px;
          border: 2px solid #fff;
          letter-spacing: 1px;
        }
        .card-body {
          padding: 24px 20px 20px;
          background: #fffdf8;
          position: relative;
        }
        .card-body::after {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          width: 2px;
          height: 100%;
          background: rgba(0,0,0,0.06);
          pointer-events: none;
        }
        .robot-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }
        .robot { width: 64px; height: 64px; flex-shrink: 0; }
        .robot svg { width: 100%; height: 100%; }
        .speech-bubble {
          flex: 1;
          background: #fff;
          border: 3px solid #111;
          border-radius: 0 12px 12px 12px;
          padding: 8px 12px;
          position: relative;
          font-family: 'Bangers', cursive;
          font-size: clamp(16px, 3.5vw, 22px);
          letter-spacing: 2px;
          color: #111;
          min-height: 48px;
          display: flex;
          align-items: center;
        }
        .speech-bubble::before {
          content: '';
          position: absolute;
          left: -14px; top: 10px;
          border: 8px solid transparent;
          border-right-color: #111;
        }
        .speech-bubble::after {
          content: '';
          position: absolute;
          left: -9px; top: 12px;
          border: 6px solid transparent;
          border-right-color: #fff;
        }
        .dots-text { color: #c0392b; animation: flicker 2s infinite; }
        .progress-label {
          font-family: 'VT323', monospace;
          font-size: 14px;
          color: #555;
          letter-spacing: 1px;
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
        }
        .progress-track {
          width: 100%;
          height: 28px;
          border: 3px solid #111;
          background: #f0e8d8;
          position: relative;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .progress-fill {
          height: 100%;
          background: repeating-linear-gradient(
            45deg, #c0392b, #c0392b 10px, #e74c3c 10px, #e74c3c 20px
          );
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-right: 3px solid #111;
        }
        .progress-pct {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bangers', cursive;
          font-size: 20px;
          letter-spacing: 2px;
          color: #fff;
          text-shadow: 1px 1px 0 #111, -1px -1px 0 #111, 1px -1px 0 #111, -1px 1px 0 #111;
          z-index: 2;
          pointer-events: none;
        }
        .seg-row { display: flex; gap: 3px; margin-bottom: 18px; }
        .seg { flex: 1; height: 10px; border: 2px solid #111; transition: background 0.2s; }
        .seg.on { background: #111; }
        .seg.off { background: #f0e8d8; }
        .gear-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-top: 3px solid #111;
          padding-top: 14px;
        }
        .gear { animation: spin-gear 3s linear infinite; color: #c0392b; }
        .gear.rev { animation: spin-gear-rev 2s linear infinite; color: #111; }
        .status-text {
          font-family: 'VT323', monospace;
          font-size: 13px;
          letter-spacing: 2px;
          color: #888;
          text-align: center;
          flex: 1;
        }
        .corner-deco {
          position: absolute;
          font-family: 'Bangers', cursive;
          font-size: 11px;
          letter-spacing: 1px;
          color: #c0392b;
          opacity: 0.5;
        }
        .corner-deco.tl { top: 6px; left: 8px; }
        .corner-deco.br { bottom: 6px; right: 8px; }
        .action-word {
          position: absolute;
          font-family: 'Bangers', cursive;
          letter-spacing: 3px;
          pointer-events: none;
          opacity: 0.12;
          user-select: none;
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=VT323&display=swap" rel="stylesheet" />

      <div className={`loader-root${phase === "closing" ? " closing" : ""}`}>
        {/* Shutter panels — only render when closing */}
        {phase === "closing" && (
          <>
            <div className="shutter-top" />
            <div className="shutter-bottom" />
          </>
        )}

        {/* BG action words */}
        {[
          { text: "POW!", top: "8%", left: "5%", size: 48, rot: -12 },
          { text: "HACK!", top: "15%", right: "4%", size: 36, rot: 8 },
          { text: "ZAP!", bottom: "10%", left: "8%", size: 42, rot: 6 },
          { text: "BOOM!", bottom: "18%", right: "6%", size: 38, rot: -8 },
        ].map((w, i) => (
          <div
            key={i}
            className="action-word"
            style={{
              top: w.top, left: (w as any).left, right: (w as any).right, bottom: w.bottom,
              fontSize: w.size, transform: `rotate(${w.rot}deg)`,
              color: i % 2 === 0 ? "#c0392b" : "#111",
              animation: `float-dot ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {w.text}
          </div>
        ))}

        <div className="card">
          <div className="card-header">
            <span className="htf-title">HACKTOFUTURE</span>
            <span className="badge">4.0</span>
          </div>
          <div className="card-body">
            <div className="corner-deco tl">36HR</div>
            <div className="corner-deco br">SJEC</div>

            <div className="robot-row">
              <div className="robot">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="32" y1="4" x2="32" y2="12" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="32" cy="3" r="3" fill="#c0392b" stroke="#111" strokeWidth="2"/>
                  <rect x="14" y="12" width="36" height="26" rx="4" fill="#fffdf8" stroke="#111" strokeWidth="2.5"/>
                  <rect x="19" y="19" width="10" height="8" rx="2" fill="#111"/>
                  <rect x="35" y="19" width="10" height="8" rx="2" fill="#111"/>
                  <circle cx="24" cy="23" r="3" fill="#c0392b"/>
                  <circle cx="40" cy="23" r="3" fill="#c0392b"/>
                  <path d="M22 31 Q32 37 42 31" stroke="#111" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <rect x="20" y="39" width="24" height="18" rx="3" fill="#c0392b" stroke="#111" strokeWidth="2.5"/>
                  <rect x="25" y="44" width="14" height="8" rx="2" fill="#111" opacity="0.3"/>
                  <rect x="22" y="56" width="8" height="6" rx="2" fill="#111"/>
                  <rect x="34" y="56" width="8" height="6" rx="2" fill="#111"/>
                  <rect x="8" y="40" width="12" height="6" rx="3" fill="#fffdf8" stroke="#111" strokeWidth="2"/>
                  <rect x="44" y="40" width="12" height="6" rx="3" fill="#fffdf8" stroke="#111" strokeWidth="2"/>
                </svg>
              </div>
              <div className="speech-bubble">
                {getMessage()}
                <span className="dots-text">{dots}</span>
              </div>
            </div>

            <div className="progress-label">
              <span>PROGRESS</span>
              <span style={{ color: "#c0392b", fontWeight: "bold" }}>{progress.toFixed(0)}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
              <div className="progress-pct">{progress.toFixed(0)}%</div>
            </div>

            <div className="seg-row">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={`seg ${i < filled ? "on" : "off"}`} />
              ))}
            </div>

            <div className="gear-row">
              <svg className="gear" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.92c.04-.3.07-.6.07-.93s-.03-.63-.07-.93l2-1.56c.18-.14.23-.41.12-.61l-1.9-3.29c-.12-.2-.37-.26-.57-.2l-2.36.95a6.9 6.9 0 00-1.6-.93l-.36-2.51A.484.484 0 0014 2h-4c-.25 0-.46.18-.5.42l-.36 2.51a6.9 6.9 0 00-1.61.93L5.17 4.9c-.2-.07-.45 0-.57.2L2.7 8.39c-.11.2-.06.47.12.61l2 1.56c-.04.3-.07.61-.07.94s.03.63.07.93l-2 1.56c-.18.14-.23.41-.12.61l1.9 3.29c.12.2.37.26.57.2l2.36-.95a6.9 6.9 0 001.6.93l.36 2.51c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.36-2.51a6.9 6.9 0 001.61-.93l2.36.95c.2.07.45 0 .57-.2l1.9-3.29c.11-.2.06-.47-.12-.61l-2-1.56z"/>
              </svg>
              <div className="status-text">
                {progress >= 100 ? "SYSTEM READY" : `INITIALIZING... ${progress.toFixed(0)}%`}
              </div>
              <svg className="gear rev" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.92c.04-.3.07-.6.07-.93s-.03-.63-.07-.93l2-1.56c.18-.14.23-.41.12-.61l-1.9-3.29c-.12-.2-.37-.26-.57-.2l-2.36.95a6.9 6.9 0 00-1.6-.93l-.36-2.51A.484.484 0 0014 2h-4c-.25 0-.46.18-.5.42l-.36 2.51a6.9 6.9 0 00-1.61.93L5.17 4.9c-.2-.07-.45 0-.57.2L2.7 8.39c-.11.2-.06.47.12.61l2 1.56c-.04.3-.07.61-.07.94s.03.63.07.93l-2 1.56c-.18.14-.23.41-.12.61l1.9 3.29c.12.2.37.26.57.2l2.36-.95a6.9 6.9 0 001.6.93l.36 2.51c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.36-2.51a6.9 6.9 0 001.61-.93l2.36.95c.2.07.45 0 .57-.2l1.9-3.29c.11-.2.06-.47-.12-.61l-2-1.56z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}