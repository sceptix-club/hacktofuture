import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useIsMobile } from "../hooks/useIsMobile";

function Timer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const HtfDate = Date.parse("2026-04-15T18:30:00+05:30");

  const setTimeLeft = useCallback(() => {
    const difference = HtfDate - Date.now();
    if (difference <= 0)
      return setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const total = Math.floor(difference / 1000);
    setTimer({
      days: Math.floor(total / 86400),
      hours: Math.floor(total / 3600) % 24,
      minutes: Math.floor(total / 60) % 60,
      seconds: total % 60,
    });
  }, [HtfDate]);

  useEffect(() => {
    setTimeLeft();
    const id = setInterval(setTimeLeft, 1000);
    return () => clearInterval(id);
  }, [setTimeLeft]);

  const blocks = [
    { value: timer.days, label: "Days" },
    { value: timer.hours, label: "Hrs" },
    { value: timer.minutes, label: "Min" },
    { value: timer.seconds, label: "Sec" },
  ];

  const blockColors = ["#DA100C", "#FFE105", "#50BAEA", "#DA100C"];

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        border: "0.175rem solid #000",
        boxShadow: "0.25rem 0.25rem 0 #000",
        borderRadius: "0.25rem",
      }}
    >
      <div
        style={{
          height: 4,
          background:
            "linear-gradient(to right, #DA100C 33.33%, #FFE105 33.33%, #FFE105 66.66%, #50BAEA 66.66%)",
        }}
      />

      <div
        className="relative timer-card-body"
        style={{
          padding: "clamp(0.6rem, 2.5vw, 1.5rem)",
          background: `url("data:image/svg+xml;utf8,<svg width='100' height='100' transform='rotate(25)' opacity='0.15' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23250E17'><circle cx='25' cy='25' r='8'/><circle cx='75' cy='75' r='8'/><circle cx='75' cy='25' r='8'/><circle cx='25' cy='75' r='8'/></g></svg>"), #fff`,
          backgroundSize: "1rem 1rem, 100% 100%",
        }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            right: 0,
            width: "65%",
            height: "65%",
            backgroundImage: `radial-gradient(circle, rgba(6,0,0,0.1) 1.5px, transparent 1.5px)`,
            backgroundSize: "8px 8px",
            maskImage:
              "radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 30%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 30%, transparent 65%)",
          }}
        />

        <div
          className="flex items-start justify-between timer-accent-row"
          style={{ marginBottom: "clamp(0.25rem, 1vw, 0.75rem)" }}
        >
          <span
            className="hero-title font-black"
            style={{
              fontSize: "clamp(1.4rem, 4.5vw, 3rem)",
              color: "#DA100C",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            //
          </span>
        </div>

        <h3
          className="hero-title font-black uppercase"
          style={{
            fontSize: "clamp(0.7rem, 1.8vw, 1.25rem)",
            color: "#111",
            lineHeight: 1.15,
            marginBottom: "clamp(0.125rem, 0.5vw, 0.5rem)",
          }}
        >
          Event Starts In
        </h3>

        <div
          style={{
            width: "clamp(20px, 5vw, 44px)",
            height: 2,
            background: "#DA100C",
            marginBottom: "clamp(0.5rem, 2vw, 1.5rem)",
          }}
        />

        <div
          className="relative grid grid-cols-4"
          style={{ gap: "clamp(0.3rem, 1.5vw, 0.875rem)" }}
        >
          {blocks.map(({ value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center"
              style={{
                background: "#fff",
                border: "2px solid #000",
                boxShadow: `2px 2px 0 ${blockColors[i]}`,
                padding: "clamp(0.35rem, 1.2vw, 1rem) 0.25rem",
              }}
            >
              <span
                className="hero-title font-black tabular-nums leading-none"
                style={{
                  fontSize: "clamp(1.3rem, 4.5vw, 3rem)",
                  color: "#111",
                }}
              >
                {String(value).padStart(2, "0")}
              </span>
              <div
                style={{
                  width: "55%",
                  height: 2,
                  background: blockColors[i],
                  margin: "0.2rem 0 0.15rem",
                }}
              />
              <span
                className="comic-sans uppercase tracking-wider font-bold"
                style={{
                  fontSize: "clamp(0.4rem, 1vw, 0.65rem)",
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-between"
          style={{
            borderTop: "0.0625rem solid rgba(0,0,0,0.1)",
            marginTop: "clamp(0.5rem, 1.5vw, 1rem)",
            paddingTop: "clamp(0.35rem, 1vw, 0.75rem)",
          }}
        >
          <div className="flex items-baseline" style={{ gap: "0.5rem" }}>
            <span
              className="hero-title"
              style={{
                fontWeight: 800,
                fontSize: "clamp(0.55rem, 1.2vw, 0.875rem)",
                whiteSpace: "nowrap",
                color: "rgba(0,0,0,0.8)",
              }}
            >
              15th April, 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline ────────────────────────────────────────────
function Timeline({ interactive = false }: { interactive?: boolean }) {
  const totalCards = 3;
  const [currentCard, setCurrentCard] = useState(0);
  const [currentButton, setCurrentButton] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rendered, setRendered] = useState(false);

  const cards = [
    [
      { time: "3:00PM", event: "Start Registrations" },
      { time: "4:00PM", event: "Snacks" },
      { time: "5:00PM", event: "Event Inauguration" },
      { time: "6:00PM", event: "Hackathon Officially Begins" },
      { time: "7:00PM", event: "Dinner" },
    ],
    [
      { time: "1:00AM", event: "Refreshments" },
      { time: "8:00AM", event: "Breakfast" },
      { time: "10:00AM", event: "Lunch" },
      { time: "4:00PM", event: "Snacks" },
      { time: "4:30PM", event: "Mentoring Session" },
      { time: "7:30PM", event: "Cultural Program" },
      { time: "7:00PM", event: "Dinner" },
    ],
    [
      { time: "1:00AM", event: "Refreshments" },
      { time: "5:00AM", event: "Participation Certificate" },
      { time: "6:00AM", event: "Hackathon Ends" },
      { time: "8:00AM", event: "Breakfast" },
      { time: "9:30AM", event: "Team Presentation" },
      { time: "12:00PM", event: "Valedictory Ceremony" },
      { time: "1:00PM", event: "Lunch & Networking" },
    ],
  ];

  const Header = ["15th April", "16th April", "17th April"];
  const dayLabels = ["Day 1", "Day 2", "Day 3"];
  const cardColors = ["#DA100C", "#FFE105", "#50BAEA"];

  // Helper: hide non-current cards behind the active one (same position, invisible)
  const showCard = useCallback((idx: number) => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      if (i === idx) {
        card.style.zIndex = "3";
        card.style.visibility = "visible";
        card.style.pointerEvents = "auto";
        gsap.set(card, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
      } else {
        card.style.zIndex = "1";
        card.style.visibility = "hidden";
        card.style.pointerEvents = "none";
        gsap.set(card, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 0 });
      }
    });
  }, []);

  const animateTo = useCallback(
    (from: number, to: number, direction: "forward" | "backward") => {
      const fromCard = cardRefs.current[from];
      const toCard = cardRefs.current[to];
      if (!fromCard || !toCard) return;

      // Make the departing card visible for animation
      fromCard.style.zIndex = "3";
      fromCard.style.visibility = "visible";
      fromCard.style.pointerEvents = "none";

      // Prepare incoming card off-screen on the opposite side
      toCard.style.zIndex = "2";
      toCard.style.visibility = "visible";
      toCard.style.pointerEvents = "none";

      const exitX = direction === "forward" ? "-110%" : "110%";
      const enterX = direction === "forward" ? "110%" : "-110%";

      gsap.set(toCard, { x: enterX, y: 0, rotation: 0, scale: 1, opacity: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          // After animation, clean up
          fromCard.style.visibility = "hidden";
          fromCard.style.pointerEvents = "none";
          gsap.set(fromCard, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 0 });

          toCard.style.zIndex = "3";
          toCard.style.pointerEvents = "auto";
        },
      });

      tl.to(fromCard, {
        x: exitX,
        duration: 0.4,
        ease: "power2.in",
      }).to(
        toCard,
        {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0.15
      );
    },
    []
  );

  // const goToCard = useCallback(
  //   (nextIdx: number, updateButton?: boolean) => {
  //     setCurrentCard((prev) => {
  //       if (prev === nextIdx) return prev;
  //       const direction = nextIdx > prev ? "forward" : "backward";
  //       animateTo(prev, nextIdx, direction);
  //       if (updateButton) setCurrentButton(nextIdx);
  //       return nextIdx;
  //     });
  //   },
  //   [animateTo]
  // );

  const flipForward = useCallback(
    (updateButton?: boolean) => {
      setCurrentCard((prev) => {
        const next = prev === totalCards - 1 ? 0 : prev + 1;
        animateTo(prev, next, "forward");
        if (updateButton) setCurrentButton(next);
        return next;
      });
    },
    [totalCards, animateTo]
  );

  const flipBackward = useCallback(
    (updateButton?: boolean) => {
      setCurrentCard((prev) => {
        const next = prev === 0 ? totalCards - 1 : prev - 1;
        animateTo(prev, next, "backward");
        if (updateButton) setCurrentButton(next);
        return next;
      });
    },
    [totalCards, animateTo]
  );

  const buttonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!interactive) return;
    const nextCard = Number(event.currentTarget.id);
    const difference = currentCard - nextCard;
    const animateCards = difference > 0 ? flipBackward : flipForward;

    setCurrentButton(nextCard);

    const absDiff = Math.abs(difference);
    for (let i = 0; i < absDiff; i++) {
      setTimeout(() => animateCards(), 700 * i);
    }

    if (timelineRef.current) {
      timelineRef.current.style.pointerEvents = "none";
    }
    setTimeout(() => {
      if (timelineRef.current) {
        timelineRef.current.style.pointerEvents = "auto";
      }
    }, 700 * absDiff);
  };

  const cardClicked = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const currentEl = cardRefs.current[currentCard];
    if (!currentEl) return;
    const rect = currentEl.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const midpoint = rect.width / 2;

    if (timelineRef.current) {
      timelineRef.current.style.pointerEvents = "none";
    }
    setTimeout(() => {
      if (timelineRef.current) {
        timelineRef.current.style.pointerEvents = "auto";
      }
    }, 600);

    if (x > midpoint) {
      flipForward(true);
    } else {
      flipBackward(true);
    }
  };

  useEffect(() => {
    if (!rendered) {
      showCard(currentCard);
      setRendered(true);
    }
  }, [rendered, currentCard, showCard]);

  return (
    <div
      ref={timelineRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingBottom: "clamp(0.75rem, 4vh, 3rem)",
      }}
    >
      {/* Day buttons — always interactive, pulled out of pointer-events blocking */}
      <div
        style={{
          display: "flex",
          gap: "clamp(0.35rem, 1vw, 0.75rem)",
          marginBottom: "clamp(1rem, 2vw, 2rem)",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          pointerEvents: interactive ? "auto" : "none",
        }}
      >
        {dayLabels.map((label, i) => (
          <div key={i} className="htf-panel">
            <button
              id={String(i)}
              onClick={buttonClicked}
              className="comic-sans"
              style={{
                padding:
                  "clamp(0.2rem, 0.5vw, 0.375rem) clamp(0.4rem, 1vw, 0.75rem)",
                fontSize: "clamp(0.6rem, 1.2vw, 0.875rem)",
                border:
                  i === currentButton
                    ? "0.125rem solid #000"
                    : "0.125rem solid #fece00",
                background:
                  i === currentButton ? cardColors[i] : "rgba(0,0,0,0.6)",
                color: i === currentButton ? "#000" : "rgba(255,255,255,0.7)",
                boxShadow:
                  i === currentButton ? "0.1875rem 0.1875rem 0 #000" : "none",
                transform: i === currentButton ? "scale(1.1)" : "scale(1)",
                transition: "all 0.2s ease",
                cursor: interactive ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                borderRadius: "0.125rem",
                fontWeight: 700,
              }}
            >
              {i === currentButton && (
                <span style={{ fontSize: "0.5rem" }}>▶</span>
              )}
              {label}
            </button>
          </div>
        ))}
      </div>

      {/* Card stack — overflow hidden to clip sliding cards */}
      <div
        style={{
          position: "relative",
          width: "min(92%, 38rem)",
          overflow: "hidden",
          borderRadius: "0.25rem",
        }}
      >
        {cards.map((card, i) => (
          <div
            className="htf-panel"
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            key={i}
            style={{
              position: i === 0 ? "relative" : "absolute",
              top: i === 0 ? undefined : 0,
              left: i === 0 ? undefined : 0,
              width: "100%",
              border: "0.175rem solid #000",
              boxShadow: "0.25rem 0.25rem 0 #000",
              cursor: interactive ? "pointer" : "default",
              overflow: "hidden",
              borderRadius: "0.25rem",
              transformOrigin: "center center",
              visibility: i === 0 ? "visible" : "hidden",
            }}
          >
            {/* Card header */}
            <div
              className="hero-title"
              style={{
                padding:
                  "clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)",
                fontSize: "clamp(0.8rem, 2.5vw, 1.75rem)",
                background: cardColors[i],
                color: "#111",
                borderBottom: "0.125rem solid #000",
              }}
            >
              {Header[i]}
            </div>

            {/* Card body — event grid */}
            <div
              onClick={cardClicked}
              className="comic-sans"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
                gap: "clamp(0.2rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 1rem)",
                padding: "clamp(0.4rem, 1vw, 0.75rem) clamp(0.5rem, 1vw, 1rem)",
                background: `url("data:image/svg+xml;utf8,<svg width='100' height='100' transform='rotate(25)' opacity='0.15' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23250E17'><circle cx='25' cy='25' r='8'/><circle cx='75' cy='75' r='8'/><circle cx='75' cy='25' r='8'/><circle cx='25' cy='75' r='8'/></g></svg>"), #fff`,
                backgroundSize: "1rem 1rem, 100% 100%",
                userSelect: "none",
              }}
            >
              {card.map((info, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "clamp(0.25rem, 0.5vw, 0.5rem)",
                    borderBottom: "0.0625rem solid rgba(0,0,0,0.1)",
                    paddingBottom: "clamp(0.2rem, 0.4vw, 0.375rem)",
                  }}
                >
                  <span
                    className="hero-title"
                    style={{
                      fontWeight: 800,
                      fontSize: "clamp(0.55rem, 1.2vw, 0.875rem)",
                      whiteSpace: "nowrap",
                      color: "rgba(0,0,0,0.8)",
                    }}
                  >
                    {info.time}
                  </span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "clamp(0.55rem, 1.2vw, 0.875rem)",
                      lineHeight: 1.3,
                    }}
                  >
                    {info.event}
                  </span>
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div
              className="comic-sans"
              style={{
                background: "#000",
                color: "rgba(255,255,255,0.5)",
                fontSize: "clamp(0.45rem, 0.8vw, 0.625rem)",
                textAlign: "center",
                padding: "clamp(0.125rem, 0.3vw, 0.25rem) 0",
                userSelect: "none",
              }}
            >
              tap left / right to switch day
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── TimerTimeline ───────────────────── */
export default function TimerTimeline({
  onSettledChange,
}: {
  onSettledChange?: (cb: (settled: boolean) => void) => void;
}) {
  const [isSettled, setIsSettled] = useState(!onSettledChange);
  const isMobile = useIsMobile();

  useEffect(() => {
    onSettledChange?.((settled) => setIsSettled(settled));
  }, [onSettledChange]);

  return (
    <div
      className="flex flex-col items-center justify-center w-full select-none"
      style={{
        gap: "clamp(0.5rem, 2vw, 1.5rem)",
        padding: "0 clamp(0.25rem, 2vw, 1.5rem)",
      }}
    >
      {/* Heading */}
      <div className="htf-panel w-full flex justify-center">
        {!isMobile && (
          <h2
            className="text-white"
            style={{
              fontFamily: "Dela Gothic One",
              fontSize: "clamp(1.5rem, 4vw + 0.5rem, 4rem)",
              letterSpacing: "0.05em",
              WebkitTextStroke: "0.09375rem black",
              textShadow:
                "0.1875rem 0.1875rem 0 #000, -0.125rem 0.125rem 0 #000, -0.125rem -0.125rem 0 #000, 0.125rem -0.125rem 0 #000",
            }}
          >
            TIMELINE
          </h2>
        )}
      </div>

      {/* Timer + Timeline row */}
      <div
        className="flex items-center justify-center w-full"
        style={{
          flexDirection: "column",
          gap: "clamp(0.75rem, 3vw, 2.5rem)",
          maxWidth: "80rem",
          margin: "0 auto",
        }}
      >
        <style>{`
          @media (min-width: 64rem) {
            .timer-timeline-row {
              flex-direction: row !important;
            }
            .timer-timeline-row > * {
              flex: 1 1 0%;
              max-width: 38.75rem;
            }
          }
        `}</style>
        <div
          className="timer-timeline-row flex items-center justify-center w-full"
          style={{
            flexDirection: "column",
            gap: "clamp(0.75rem, 3vw, 2.5rem)",
            maxWidth: "80rem",
          }}
        >
          <div
            className="htf-panel w-full"
            style={{ maxWidth: "38.75rem", minWidth: 0 }}
          >
            <Timer />
          </div>
          <div
            className="w-full"
            style={{
              maxWidth: "38.75rem",
              minWidth: 0,
              marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            <Timeline interactive={isSettled} />
          </div>
        </div>
      </div>
    </div>
  );
}
