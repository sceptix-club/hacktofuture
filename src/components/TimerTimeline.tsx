import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useIsMobile } from "../hooks/useIsMobile";

/* ───────────────────────── Timer ───────────────────────── */
function Timer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const HtfDate = Date.parse("2026-04-15T18:36:20+05:30");

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

  return (
    <div
      className="relative flex items-center justify-center w-full mx-auto"
      style={{
        maxWidth: "38.75rem",
        aspectRatio: "612 / 408",
        containerType: "inline-size",
      }}
    >
      <img
        src="/comi.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
        style={{ maxWidth: "100%", height: "auto" }}
      />

      <div
        className="relative z-10 grid grid-cols-4 place-items-center"
        style={{
          width: "65%",
          gap: "3%",
          paddingBottom: "5%",
          marginRight: "1.75rem",
          marginTop: "1rem",
        }}
      >
        {blocks.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center"
            style={{ gap: "0.6cqi" }}
          >
            <span
              className="comic-sans text-white leading-none tabular-nums"
              style={{
                fontSize: "9cqi",
                textShadow:
                  "0.125rem 0 #000, -0.125rem 0 #000, 0 0.125rem #000, 0 -0.125rem #000, " +
                  "0.0625rem 0.0625rem #000, -0.0625rem -0.0625rem #000, 0.0625rem -0.0625rem #000, -0.0625rem 0.0625rem #000",
              }}
            >
              {String(value).padStart(2, "0")}
            </span>

            <span
              className="comic-sans text-[#DA100C] uppercase tracking-wider font-bold"
              style={{ fontSize: "2.8cqi" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Timeline ───────────────────────── */
const cards = [
  [
    { time: "3:00PM", event: "Start Registrations" },
    { time: "4:00PM", event: "Snacks" },
    { time: "5:00PM", event: "Event inauguration" },
    { time: "6:00PM", event: "Hackathon Officially Begins" },
    { time: "7:00PM", event: "Dinner" },
  ],
  [
    { time: "1:00AM", event: "Refreshments" },
    { time: "8:00AM", event: "Breakfast" },
    { time: "10:00AM", event: "Lunch" },
    { time: "4:00PM", event: "Snacks" },
    { time: "4:30PM", event: "Mentoring session" },
    { time: "7:30PM", event: "Cultural Program" },
    { time: "7:00PM", event: "Dinner" },
  ],
  [
    { time: "1:00AM", event: "Refreshments" },
    { time: "5:00AM", event: "Participation certificate" },
    { time: "6:00AM", event: "Hackathon ends" },
    { time: "8:00AM", event: "Breakfast" },
    { time: "9:30AM", event: "Team presentation" },
    { time: "12:00PM", event: "Valedictory ceremony" },
    { time: "1:00PM", event: "Lunch and networking" },
  ],
];

const totalCards = cards.length;
const Header = ["15th April", "16th April", "17th April"];
const dayLabels = ["Day 1", "Day 2", "Day 3"];
const cardColors = ["#DA100C", "#FFE105", "#50BAEA"];

function Timeline({ interactive }: { interactive: boolean }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [currentButton, setCurrentButton] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentCardRef = useRef(0);
  const isAnimating = useRef(false);
  const initialized = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    currentCardRef.current = currentCard;
  }, [currentCard]);

  const getOriginalPos = useCallback(() => {
    const peek = Math.min(32, window.innerWidth * 0.04);
    return [
      { x: 0, y: 0, rotation: 0, scale: 1 },
      { x: -peek, y: 4, rotation: -2, scale: 0.97 },
      { x: peek / 3, y: 4 + peek, rotation: 3, scale: 0.97 },
    ];
  }, []);

  const setZIndex = useCallback((curr: number) => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      if (i < curr) {
        card.style.zIndex = String(totalCards + 1 - (curr - i));
      } else if (i === curr) {
        card.style.zIndex = String(totalCards + 1);
      } else {
        card.style.zIndex = String(totalCards - (i - curr));
      }
    });
  }, []);

  // Initialize card positions — run once
  useEffect(() => {
    if (initialized.current) return;
    const positions = getOriginalPos();
    cardRefs.current.forEach((card, i) => {
      if (card) {
        gsap.set(card, positions[i]);
      }
    });
    setZIndex(0);
    initialized.current = true;
  }, [getOriginalPos, setZIndex]);

  const flipForward = useCallback(
    (updateBtn: boolean) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const prev = currentCardRef.current;
      const next = (prev + 1) % totalCards;
      const positions = getOriginalPos();
      const prevCard = cardRefs.current[prev];

      if (prevCard) {
        const finalPosIdx = (prev - next + totalCards) % totalCards;
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating.current = false;
          },
        });
        tl.to(prevCard, {
          x: "60%",
          y: 60,
          rotation: 5,
          scale: 1,
          rotationY: 60,
          duration: 0.4,
          ease: "back.in(1.4)",
        }).to(prevCard, {
          ...positions[finalPosIdx],
          rotationY: 0,
          duration: 0.4,
          ease: "back.out(1.2)",
        });
      }

      // Move other cards
      cardRefs.current.forEach((card, i) => {
        if (i === prev || !card) return;
        const finalPosIdx = (i - next + totalCards) % totalCards;
        gsap.to(card, {
          ...positions[finalPosIdx],
          duration: 0.6,
          ease: "back.out(1.2)",
        });
      });

      setTimeout(() => setZIndex(next), 400);

      setCurrentCard(next);
      currentCardRef.current = next;
      if (updateBtn) setCurrentButton(next);
    },
    [getOriginalPos, setZIndex]
  );

  const flipBackward = useCallback(
    (updateBtn: boolean) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const curr = currentCardRef.current;
      const prev = (curr - 1 + totalCards) % totalCards;
      const positions = getOriginalPos();
      const prevCard = cardRefs.current[prev];

      if (prevCard) {
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating.current = false;
          },
        });
        tl.to(prevCard, {
          x: "60%",
          y: 60,
          rotation: 5,
          scale: 1,
          rotationY: 60,
          duration: 0.4,
          ease: "back.in(1.4)",
        }).to(prevCard, {
          ...positions[0],
          rotationY: 0,
          duration: 0.4,
          ease: "back.out(1.2)",
        });
      }

      cardRefs.current.forEach((card, i) => {
        if (i === prev || !card) return;
        const finalPosIdx = (i - prev + totalCards) % totalCards;
        gsap.to(card, {
          ...positions[finalPosIdx],
          duration: 0.6,
          ease: "back.out(1.2)",
        });
      });

      setTimeout(() => setZIndex(prev), 400);

      setCurrentCard(prev);
      currentCardRef.current = prev;
      if (updateBtn) setCurrentButton(prev);
    },
    [getOriginalPos, setZIndex]
  );

  const buttonClicked = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!interactive || isAnimating.current) return;

      const nextCard = Number(event.currentTarget.id);
      const curr = currentCardRef.current;
      if (nextCard === curr) return;

      let diff = nextCard - curr;
      // Normalize: positive = forward, negative = backward
      if (diff > 0) {
        // forward diff times
        const step = (i: number) => {
          setTimeout(() => flipForward(false), i * 700);
        };
        for (let i = 0; i < diff; i++) step(i);
      } else {
        const absDiff = Math.abs(diff);
        const step = (i: number) => {
          setTimeout(() => flipBackward(false), i * 700);
        };
        for (let i = 0; i < absDiff; i++) step(i);
      }

      setCurrentButton(nextCard);
    },
    [interactive, flipForward, flipBackward]
  );

  const cardClicked = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || isAnimating.current) return;

      const currentEl = cardRefs.current[currentCardRef.current];
      if (!currentEl) return;
      const rect = currentEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const midpoint = rect.width / 2;

      if (x > midpoint) {
        flipForward(true);
      } else {
        flipBackward(true);
      }
    },
    [interactive, flipForward, flipBackward]
  );

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        paddingBottom: "clamp(1.5rem, 4vh, 3rem)",
        opacity: interactive ? 1 : 0.5,
        transition: "opacity 0.4s ease",
      }}
      ref={timelineRef}
    >
      {/* Day buttons */}
      <div
        className="flex flex-wrap items-center justify-center"
        style={{ gap: "0.75rem", marginBottom: "0.75rem" }}
      >
        {dayLabels.map((label, i) => (
          <div key={i} className="htf-panel">
            <button
              id={String(i)}
              onClick={buttonClicked}
              disabled={!interactive}
              className={`comic-sans flex items-center transition-all
                ${!interactive ? "cursor-not-allowed" : "cursor-pointer"}
                ${
                  i !== currentButton
                    ? "border-[#fece00] bg-black/60 text-white/70"
                    : ""
                }`}
              style={{
                padding: "0.375rem 0.75rem",
                fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
                borderWidth: "0.125rem",
                borderStyle: "solid",
                gap: "0.25rem",
                borderRadius: "0.125rem",
                ...(i === currentButton
                  ? {
                      background: cardColors[i],
                      color: "#000",
                      borderColor: "#000",
                      boxShadow: "0.1875rem 0.1875rem 0 #000",
                      transform: "scale(1.1)",
                    }
                  : {
                      borderColor: "#fece00",
                    }),
              }}
            >
              {i === currentButton && (
                <span style={{ fontSize: "0.6rem" }}>▶</span>
              )}
              {label}
            </button>
          </div>
        ))}
      </div>

      {/* Card stack container */}
      <div
        className="relative"
        style={{
          width: "min(90%, 38rem)",
          /* Reserve height for the tallest card + peek offset */
          minHeight: "clamp(14rem, 30vw, 22rem)",
        }}
      >
        {cards.map((card, i) => (
          <div
            className="htf-panel cursor-pointer overflow-hidden"
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              display: "grid",
              gridTemplateRows: "auto 1fr",
              border: "0.25rem solid #000",
              boxShadow: "0.375rem 0.375rem 0 #000",
              borderRadius: "0.375rem",
              pointerEvents: interactive ? "auto" : "none",
              willChange: "transform",
            }}
          >
            {/* Card header */}
            <div
              className="hero-title"
              style={{
                padding: "0.5rem 0.75rem",
                fontSize: "clamp(1rem, 2.5vw, 1.75rem)",
                background: cardColors[i],
                color: "#111",
                borderBottom: "0.1875rem solid #000",
              }}
            >
              {Header[i]}
            </div>

            {/* Card body */}
            <div
              className="comic-sans select-none"
              onClick={cardClicked}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 12rem), 1fr))",
                gap: "0.375rem 1rem",
                padding: "clamp(0.625rem, 2vw, 1.25rem)",
                background: `url("data:image/svg+xml;utf8,<svg width='100' height='100' transform='rotate(25)' opacity='0.15' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23250E17'><circle cx='25' cy='25' r='8'/><circle cx='75' cy='75' r='8'/><circle cx='75' cy='25' r='8'/><circle cx='25' cy='75' r='8'/></g></svg>"), #fff`,
                backgroundSize: "1rem 1rem, 100% 100%",
              }}
            >
              {card.map((info, j) => (
                <div
                  key={j}
                  className="flex items-baseline"
                  style={{
                    gap: "0.5rem",
                    borderBottom: "0.0625rem solid rgba(0,0,0,0.1)",
                    paddingBottom: "0.25rem",
                  }}
                >
                  <span
                    className="font-extrabold hero-title whitespace-nowrap"
                    style={{
                      fontSize: "clamp(0.7rem, 1.4vw, 0.9rem)",
                      color: "rgba(0,0,0,0.8)",
                    }}
                  >
                    {info.time}
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(0.7rem, 1.4vw, 0.9rem)",
                      color: "#000",
                      lineHeight: 1.4,
                    }}
                  >
                    {info.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── TimerTimeline ───────────────────── */
export default function TimerTimeline() {
  const [isSettled, setIsSettled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          scrollTimeoutRef.current = setTimeout(() => {
            setIsSettled(true);
          }, 600);
        } else {
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = null;
          }
          setIsSettled(false);
        }
      },
      { threshold: [0, 0.3, 0.6, 1.0] }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center w-full select-none"
      style={{
        gap: "clamp(1rem, 2vw, 1.5rem)",
        padding: "0 clamp(0.5rem, 2vw, 1.5rem)",
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
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
          maxWidth: "80rem",
          margin: "0 auto",
        }}
      >
        {/* Use a media-query-like approach via CSS container */}
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
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
            maxWidth: "80rem",
          }}
        >
          <div
            className="htf-panel w-full"
            style={{ maxWidth: "38.75rem", minWidth: 0 }}
          >
            <Timer />
          </div>
          <div className="w-full" style={{ maxWidth: "38.75rem", minWidth: 0 }}>
            <Timeline interactive={isSettled} />
          </div>
        </div>
      </div>
    </div>
  );
}
