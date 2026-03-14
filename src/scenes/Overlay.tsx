export function Overlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: "20px 24px",
        paddingBottom: "calc(90px + env(safe-area-inset-bottom))",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        pointerEvents: "none",
        zIndex: 40,
        boxSizing: "border-box",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          width: "100%",
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flex: "1 1 0%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <p
            style={{
              fontFamily: "Dela Gothic One",
              fontSize: "clamp(14px, 3vw, 30px)",
              fontWeight: "700",
              lineHeight: 1,
              color: "white",
              letterSpacing: -1,
              margin: 0,
            }}
          >
            HACKTOFUTURE
          </p>
          <p
            style={{
              fontSize: "clamp(8px, 1.5vw, 11px)",
              color: "white",
              margin: 0,
              letterSpacing: 1,
            }}
          >
            36 HOUR HACKATHON
          </p>
        </div>
        <div style={{ flex: "1 1 0%", display: "flex", gap: "2em" }} />
        <div style={{ flex: "1 1 0%", display: "flex", gap: "2em" }} />
        <img
          src="/sponsors/egdk.png"
          alt="logo"
          style={{
            height: "clamp(30px, 3vw, 60px)",
            objectFit: "contain",
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "auto",
          }}
        />
        <div style={{ width: "1rem" }} />
        <img
          src="/sjec-gold.png"
          alt="logo"
          style={{
            height: "clamp(30px, 3vw, 60px)",
            objectFit: "contain",
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "auto",
          }}
        />
        <div style={{ width: "1rem" }} />
        <img
          src="/sceptix-logo.png"
          alt="logo"
          style={{
            height: "clamp(30px, 3vw, 60px)",
            objectFit: "contain",
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "auto",
            filter: "invert(1)"
          }}
        />
      </div>

      <div style={{ height: "1rem" }} />

      {/* Sub-header */}
      <div
        style={{
          width: "100%",
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            flex: "1 1 0%",
            fontSize: "clamp(9px, 2vw, 14px)",
            lineHeight: "1.5em",
            color: "white",
            margin: 0,
          }}
        >
          <b>EGDK India Private Limited</b>
          <br />
          St Joseph Engineering College
          <br />
        </p>
        <div style={{ width: 10 }} />
        {/* <p
          style={{
            transform: "rotate3d(0, 0, 1, 90deg) translate3d(100%,10px,0)",
            transformOrigin: "right",
            fontSize: "clamp(9px, 2vw, 11px)",
            fontWeight: "700",
            lineHeight: "100%",
            textAlign: "right",
            color: "white",
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          COMICS
        </p> */}
      </div>

      {/* Spacer */}
      <div style={{ flex: "1 1 0%" }} />

      {/* Bottom bar */}
      {/* <div style={{
        pointerEvents: "all",
        width: "100%",
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
      }}>
        <p style={{ whiteSpace: "nowrap", flex: "1 1 0%", fontSize: "clamp(9px, 2vw, 11px)", lineHeight: "1.5em", color: "white", margin: 0 }}>
          <b>WHERE DREAMS LIVE</b>
          <br />
          ●&nbsp;●&nbsp;●&nbsp;
        </p>
        <p style={{ flex: "1 1 0%", fontSize: "clamp(9px, 2vw, 11px)", lineHeight: "1em", textAlign: "right", color: "white", margin: 0 }} />
      </div> */}
    </div>
  );
}
