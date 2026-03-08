import { useEffect, useState } from "react";

interface BookBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
  height: number;
}

export default function ComicDecorations({
  bookRef,
}: {
  bookRef: React.RefObject<HTMLDivElement>;
}) {
  const [bounds, setBounds] = useState<BookBounds | null>(null);

  useEffect(() => {
    function measure() {
      if (!bookRef.current) return;
      const r = bookRef.current.getBoundingClientRect();
      setBounds({
        left: r.left,
        right: window.innerWidth - r.right,
        top: r.top,
        bottom: window.innerHeight - r.bottom,
        height: r.height,
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [bookRef]);

  if (!bounds) return null;

  const { left, right, height } = bounds;
  const midY = bounds.top + height / 2;
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Torn paper top edge points — jagged teeth across full width
  const tornTop = (() => {
    const pts: string[] = [`0,0`, `0,38`];
    const steps = 36;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const y = 38 + (i % 2 === 0 ? 0 : 18) + Math.sin(i * 1.7) * 6;
      pts.push(`${x},${y}`);
    }
    pts.push(`${W},0`);
    return pts.join(" ");
  })();

  // Torn paper bottom edge points
  const tornBottom = (() => {
    const pts: string[] = [`0,${H}`, `0,${H - 38}`];
    const steps = 36;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const y = H - 38 - (i % 2 === 0 ? 0 : 18) - Math.sin(i * 2.1) * 5;
      pts.push(`${x},${y}`);
    }
    pts.push(`${W},${H}`);
    return pts.join(" ");
  })();

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* ══════════════════════════════════════════
          TORN PAPER — top & bottom strips
          z-index 5: above background, below book (z-20)
          ══════════════════════════════════════════ */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: 72,
          opacity: 0.18,
        }}
        viewBox={`0 0 ${W} 72`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id="paper-shadow-top"
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor="#000"
              floodOpacity="0.45"
            />
          </filter>
        </defs>
        <polygon
          points={tornTop}
          fill="#fffdf3"
          filter="url(#paper-shadow-top)"
        />
      </svg>

      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: W,
          height: 72,
          opacity: 0.18,
        }}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id="paper-shadow-bottom"
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
          >
            <feDropShadow
              dx="0"
              dy="-4"
              stdDeviation="4"
              floodColor="#000"
              floodOpacity="0.45"
            />
          </filter>
        </defs>
        <polygon
          points={tornBottom}
          fill="#fffdf3"
          filter="url(#paper-shadow-bottom)"
        />
      </svg>

      {/* Torn paper LEFT strip */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 64,
          height: H,
          opacity: 0.14,
        }}
        viewBox={`0 0 64 ${H}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="paper-shadow-left">
            <feDropShadow
              dx="4"
              dy="0"
              stdDeviation="4"
              floodColor="#000"
              floodOpacity="0.4"
            />
          </filter>
        </defs>
        {(() => {
          const steps = 32;
          const pts: string[] = [`0,0`, `38,0`];
          for (let i = 0; i <= steps; i++) {
            const y = (i / steps) * H;
            const x = 38 + (i % 2 === 0 ? 0 : 16) + Math.sin(i * 1.9) * 5;
            pts.push(`${x},${y}`);
          }
          pts.push(`0,${H}`);
          return (
            <polygon
              points={pts.join(" ")}
              fill="#fffdf3"
              filter="url(#paper-shadow-left)"
            />
          );
        })()}
      </svg>

      {/* Torn paper RIGHT strip */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 64,
          height: H,
          opacity: 0.14,
        }}
        viewBox={`0 0 64 ${H}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="paper-shadow-right">
            <feDropShadow
              dx="-4"
              dy="0"
              stdDeviation="4"
              floodColor="#000"
              floodOpacity="0.4"
            />
          </filter>
        </defs>
        {(() => {
          const steps = 32;
          const pts: string[] = [`64,0`, `26,0`];
          for (let i = 0; i <= steps; i++) {
            const y = (i / steps) * H;
            const x = 26 - (i % 2 === 0 ? 0 : 16) - Math.sin(i * 2.3) * 5;
            pts.push(`${x},${y}`);
          }
          pts.push(`64,${H}`);
          return (
            <polygon
              points={pts.join(" ")}
              fill="#fffdf3"
              filter="url(#paper-shadow-right)"
            />
          );
        })()}
      </svg>

      {/* ══════════════════════════════════════════
          DECORATIONS — z-index 20, above book bg
          ══════════════════════════════════════════ */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 20 }}
      >
        {/* ── LEFT SIDE ── */}

        {/* Halftone dot grid */}
        <svg
          style={{
            position: "absolute",
            left: Math.max(8, left - 200),
            top: midY - 400,
            width: 88,
            height: 160,
            opacity: 0.3,
          }}
          viewBox="0 0 88 160"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <circle
                key={`ld-${row}-${col}`}
                cx={col * 18 + 9}
                cy={row * 18 + 9}
                r={Math.max(2, 5.5 - (row + col) * 0.35)}
                fill="#fff"
              />
            ))
          )}
        </svg>

        {/* Speech bubble */}
        <div
          style={{
            position: "absolute",
            left: Math.max(8, left - 250),
            top: midY - 120,
            background: "#fff",
            border: "3px solid #000",
            borderRadius: 10,
            padding: "9px 15px",
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: "0.78rem",
            color: "#000",
            boxShadow: "5px 5px 0 #000",
            whiteSpace: "nowrap",
            transform: "rotate(-4deg)",
          }}
        >
          MEET THE CREW!
          <span
            style={{
              position: "absolute",
              top: "50%",
              right: -14,
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderLeft: "14px solid #000",
              display: "block",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              right: -10,
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "11px solid #fff",
              display: "block",
            }}
          />
        </div>

        {/* ZAP! badge */}
        <div
          style={{
            position: "absolute",
            left: Math.max(8, left - 200),
            top: midY + 100,
            background: "#DA100C",
            color: "#fff",
            border: "3px solid #000",
            borderRadius: 8,
            padding: "6px 14px",
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: "0.78rem",
            boxShadow: "5px 5px 0 #000",
            transform: "rotate(5deg)",
            whiteSpace: "nowrap",
          }}
        >
          ZAP!
        </div>

        {/* Left stars */}
        <svg
          style={{
            position: "absolute",
            left: Math.max(8, left - 140),
            top: midY,
            width: 44,
            height: 44,
            opacity: 0.9,
          }}
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
            fill="#fff"
            stroke="#000"
            strokeWidth="4"
          />
        </svg>
        <svg
          style={{
            position: "absolute",
            left: Math.max(8, left - 96),
            top: midY + 30,
            width: 28,
            height: 28,
            opacity: 0.75,
          }}
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
            fill="#DA100C"
            stroke="#000"
            strokeWidth="4"
          />
        </svg>

        {/* Left radial burst */}
        <svg
          style={{
            position: "absolute",
            left: Math.max(0, left - 300),
            top: midY + 200,
            width: 160,
            height: 160,
            opacity: 0.25,
          }}
          viewBox="0 0 120 120"
        >
          {[...Array(16)].map((_, i) => (
            <line
              key={i}
              x1="60"
              y1="60"
              x2={60 + 56 * Math.cos((i * Math.PI * 2) / 16)}
              y2={60 + 56 * Math.sin((i * Math.PI * 2) / 16)}
              stroke="#fff"
              strokeWidth="2.5"
            />
          ))}
          <circle cx="60" cy="60" r="9" fill="#fff" />
        </svg>

        {/* ── RIGHT SIDE (mirroring left) ── */}

        {/* Halftone dot grid */}
        <svg
          style={{
            position: "absolute",
            right: Math.max(8, right - 200),
            top: midY - 400,
            width: 88,
            height: 160,
            opacity: 0.3,
          }}
          viewBox="0 0 88 160"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <circle
                key={`rd-${row}-${col}`}
                cx={col * 18 + 9}
                cy={row * 18 + 9}
                r={Math.max(2, 5.5 - (row + col) * 0.35)}
                fill="#DA100C"
              />
            ))
          )}
        </svg>

        {/* WOW! thought bubble — mirroring speech bubble, tail points LEFT toward book */}
        <div
          style={{
            position: "absolute",
            right: Math.max(8, right - 250),
            top: midY - 120,
            background: "#fff",
            border: "3px solid #000",
            borderRadius: 10,
            padding: "9px 15px",
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: "0.78rem",
            color: "#DA100C",
            boxShadow: "5px 5px 0 #000",
            whiteSpace: "nowrap",
            transform: "rotate(4deg)",
          }}
        >
          WOW! SO COOL!
          {/* tail pointing LEFT toward book */}
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: -14,
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: "14px solid #000",
              display: "block",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: -10,
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: "11px solid #fff",
              display: "block",
            }}
          />
        </div>

        {/* HTF 4.0 badge — mirroring ZAP! badge */}
        <div
          style={{
            position: "absolute",
            right: Math.max(8, right - 200),
            top: midY + 100,
            background: "#DA100C",
            color: "#fff",
            border: "3px solid #000",
            borderRadius: 8,
            padding: "6px 14px",
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: "0.78rem",
            boxShadow: "5px 5px 0 #000",
            transform: "rotate(-5deg)",
            whiteSpace: "nowrap",
          }}
        >
          ⚡ HTF 4.0
        </div>

        {/* Right stars */}
        <svg
          style={{
            position: "absolute",
            right: Math.max(8, right - 140),
            top: midY,
            width: 44,
            height: 44,
            opacity: 0.9,
          }}
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
            fill="#DA100C"
            stroke="#000"
            strokeWidth="4"
          />
        </svg>
        <svg
          style={{
            position: "absolute",
            right: Math.max(8, right - 96),
            top: midY + 30,
            width: 28,
            height: 28,
            opacity: 0.75,
          }}
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
            fill="#fff"
            stroke="#000"
            strokeWidth="4"
          />
        </svg>

        {/* Right radial burst */}
        <svg
          style={{
            position: "absolute",
            right: Math.max(0, right - 300),
            top: midY + 200,
            width: 160,
            height: 160,
            opacity: 0.25,
          }}
          viewBox="0 0 120 120"
        >
          {[...Array(16)].map((_, i) => (
            <line
              key={i}
              x1="60"
              y1="60"
              x2={60 + 56 * Math.cos((i * Math.PI * 2) / 16)}
              y2={60 + 56 * Math.sin((i * Math.PI * 2) / 16)}
              stroke="#DA100C"
              strokeWidth="2.5"
            />
          ))}
          <circle cx="60" cy="60" r="9" fill="#DA100C" />
        </svg>

        {/* ── EDGE LABELS ── */}
        <div
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.3em",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          HACKTOFUTURE · SINCE 2023
        </div>
        <div
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: "0.6rem",
            color: "rgba(218,16,12,0.7)",
            letterSpacing: "0.3em",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          HACKTOFUTURE · SINCE 2023
        </div>
      </div>
    </div>
  );
}
