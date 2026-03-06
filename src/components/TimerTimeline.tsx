import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

function Timer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const HtfDate = Date.parse("February 18, 2026 18:36:20");

  function setTimeLeft() {
    const difference = HtfDate - Date.now();
    if (difference <= 0)
      return setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const total = Math.floor(difference / 1000);
    const seconds = total % 60;
    const minutes = Math.floor(total / 60) % 60;
    const hours = Math.floor(total / 3600) % 24;
    const days = Math.floor(total / 86400);
    setTimer({ days, hours, minutes, seconds });
  }

  useEffect(() => {
    const tick = () => setTimeLeft();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  });

  return (
    <div
      className="relative flex items-center justify-center w-full"
      style={{
        width: "clamp(280px, 60vw, 620px)",
        aspectRatio: "3 / 2",
      }}
    >
      {/* Background bubble */}
      <img
        src="/comic-dialog.png"
        alt=""
        className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none"
      />
      {/* Timer content centered inside bubble */}
      <div className="relative z-10 grid grid-cols-4 items-center gap-[clamp(0.2rem,2vw,2rem)] px-[8%] pb-[4%]">
        {[
          { value: timer.days, label: "days" },
          { value: timer.hours, label: "hours" },
          { value: timer.minutes, label: "minutes" },
          { value: timer.seconds, label: "seconds" },
        ].map((block, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="text-white leading-none"
              style={{
                fontFamily: "Super Squad",
                fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
                textShadow:
                  "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
              }}
            >
              {block.value > 9 ? "" : "0"}
              {block.value}
            </div>
            <div
              className="text-black"
              style={{
                fontFamily: "Badabom",
                fontSize: "clamp(0.75rem, 1.8vw, 1.2rem)",
              }}
            >
              {block.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  const peek = 32;
  const [currentCard, setCurrentCard] = useState(0);

  const originalPos = [
    { x: 0, y: 0, rotation: 0, scale: 1 },
    { x: -peek, y: 4, rotation: -2, scale: 0.97 },
    { x: peek / 3, y: 4 + peek, rotation: 3, scale: 0.97 },
  ];

  const fannedForward = { x: "90%", y: 100, rotation: 5, scale: 1 };
  const fannedBack = { x: "90%", y: 100, rotation: 5, scale: 1 };

  const cards = [
    [
      { time: "3:00PM", event: "Start Registrations" },
      { time: "4:00PM", event: "Snacks" },
      { time: "5:00PM", event: "Event inauguration" },
      { time: "6:00AM", event: "Hackathon Officially Begins" },
      { time: "7:00PM", event: "Dinner" },
    ],
    [
      { time: "1:00AM", event: "Refreshments" },
      { time: "8:00AM", event: "Breakfast" },
      { time: "10:00AM", event: "Lunch" },
      { time: "4:00PM", event: "Snacks" },
      { time: "4:30PM", event: "Mentoring session" },
      { time: "7:30PM", event: "Cultural Program in Amphitheatre" },
      { time: "7:00PM", event: "Dinner" },
    ],
    [
      { time: "1:00AM", event: "Refreshments" },
      { time: "5:00AM", event: "Participation certificate" },
      { time: "6:00AM", event: "Hackathon ends" },
      { event: "Breakfast", time: "8:00AM" },
      { time: "9:30AM", event: "Team presentation" },
      { time: "12:00PM", event: "Valedictory ceremony" },
      { time: "1:00PM", event: "Lunch and networking" },
    ],
  ];
  const totalCards = cards.length;

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setZIndex = (curr: number) => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      if (i < curr) {
        card.style.zIndex = String(curr - i);
      } else {
        card.style.zIndex = String(totalCards - Math.abs(curr - i));
      }
    });
  };

  const flipForward = () => {
    setCurrentCard((prev) => {
      const next = prev === totalCards - 1 ? 0 : prev + 1;

      const prevCard = cardRefs.current[prev];
      if (prevCard) {
        const tl1 = gsap.timeline();
        tl1
          .to(prevCard, {
            ...fannedForward,
            duration: 0.5,
            ease: "back.in(1.4)",
            rotationY: 60,
            delay: 0.05,
          })
          .to(prevCard, {
            ...originalPos[next],
            zIndex: 1,
            rotationY: 0,
            duration: 0.5,
            ease: "back.in(1.4)",
          });
      }

      setTimeout(() => {
        setZIndex(next);
      }, 500);

      const filterCards = cardRefs.current.filter(
        (card, i): card is HTMLDivElement => card != null && i !== prev
      );
      const tl2 = gsap.timeline();
      tl2
        .to(filterCards, {
          x: "-5%",
          duration: 0.5,
          ease: "back.in(1.4)",
        })
        .to(filterCards, {
          x: 0,
          duration: 0.5,
          ease: "back.in(1.4)",
        });

      return next;
    });
  };

  const flipBackward = () => {
    setCurrentCard((next) => {
      const prev = next === 0 ? totalCards - 1 : next - 1;

      const prevCard = cardRefs.current[prev];
      if (prevCard) {
        const tl = gsap.timeline();
        tl.to(prevCard, {
          ...fannedBack,
          duration: 0.5,
          ease: "back.in(1.4)",
          rotationY: 60,
          delay: 0.05,
        }).to(prevCard, {
          ...originalPos[next],
          zIndex: 60,
          rotationY: 0,
          duration: 0.5,
          ease: "back.in(1.4)",
          delay: 0.05,
        });
      }

      const filterCards = cardRefs.current.filter(
        (card, i): card is HTMLDivElement => card != null && i !== prev
      );
      const tl2 = gsap.timeline();
      tl2
        .to(filterCards, {
          x: "-5%",
          duration: 0.5,
          ease: "back.in(1.4)",
        })
        .to(filterCards, {
          x: 0,
          duration: 0.5,
          ease: "back.in(1.4)",
        });

      setTimeout(() => {
        setZIndex(prev);
      }, 800);
      return prev;
    });
  };

  const [rendered, setRendered] = useState(false);

  const cardClicked = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentEl = cardRefs.current[currentCard];
    if (!currentEl) return;
    const rect = currentEl.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const midpoint = rect.width / 2;
    if (x > midpoint) {
      flipForward();
    } else {
      flipBackward();
    }
  };

  useEffect(() => {
    if (!rendered) {
      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.set(card, originalPos[i]);
        }
      });
      setZIndex(currentCard);
      setRendered(true);
    }

    if (originalPos.length !== cards.length) {
      console.error("CARDS COUNT IS INVALID");
    }
  });

  const Header = ["15th April", "16th April", "17th April"];
  const dayLabels = ["Day 1", "Day 2", "Day 3"];
  const cardColors = ["#DA100C", "#FFE105", "#50BAEA"];
  const headerTextColors = ["#111", "#111", "#111"];
  const buttonTextColors = ["#000", "#000", "#000"];

  return (
    <div
      className="flex flex-col items-center justify-center w-full px-2 sm:px-4"
      style={{ paddingBottom: "clamp(3rem, 6vh, 4.5rem)" }}
    >
      {/* Day indicator — each button is its own panel */}
      <div className="flex gap-2 sm:gap-4 mb-2 sm:mb-3">
        {dayLabels.map((label, i) => (
          <div key={i} className="htf-panel">
            <button
              onClick={() =>
                i > currentCard
                  ? flipForward()
                  : i < currentCard
                  ? flipBackward()
                  : null
              }
              className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm border-2 transition-all cursor-pointer comic-sans flex items-center gap-1
                ${
                  i === currentCard
                    ? "scale-110"
                    : "border-[#fece00] bg-black/60 text-white/70"
                }`}
              style={
                i === currentCard
                  ? { background: cardColors[i], color: buttonTextColors[i], borderColor: "#000", boxShadow: "3px 3px 0 #000" }
                  : {}
              }
            >
              {i === currentCard && <span className="text-[0.6rem]">▶</span>}
              {label}
            </button>
          </div>
        ))}
      </div>

      {/* Cards stack */}
      <div
        className="relative grid items-start"
        style={{ width: "clamp(280px, 60vw, 620px)" }}
      >
        {cards.map((card, i) => (
          <div
            className="htf-panel grid [grid-area:stack] grid-rows-[auto_1fr_auto] cursor-pointer overflow-hidden"
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            key={i}
            style={{
              width: "clamp(280px, 60vw, 620px)",
              border: "0.35rem solid #000",
              boxShadow: "6px 6px 0 #000",
            }}
          >
            {/* Card header */}
            <div
              className="px-3 py-1.5 text-base sm:text-xl md:text-2xl lg:text-3xl hero-title" 
              style={{
                background: cardColors[i],
                color: headerTextColors[i],
                borderBottom: "0.25rem solid #000",
              }}
            >
              {Header[i]}
            </div>

            {/* Card content */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 p-3 sm:p-4 md:p-5 select-none comic-sans"
              onClick={cardClicked}
              style={{
                background: `url("data:image/svg+xml;utf8,<svg width='100' height='100' transform='rotate(25)' opacity='0.15' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23250E17'><circle cx='25' cy='25' r='8'/><circle cx='75' cy='75' r='8'/><circle cx='75' cy='25' r='8'/><circle cx='25' cy='75' r='8'/></g></svg>"), #fff`,
                backgroundSize: "16px 16px, 100% 100%",
              }}
            >
              {card.map((info, j) => (
                <div
                  key={j}
                  className="flex items-baseline gap-2 border-b border-black/10 pb-1"
                >
                  <span
                    className="font-extrabold text-xs sm:text-sm md:text-base whitespace-nowrap hero-title"
                    style={{ color: cardColors[i] }}
                  >
                    {info.time}
                  </span>
                  <span className="text-black text-xs sm:text-sm md:text-base leading-snug">
                    {info.event}
                  </span>
                </div>
              ))}
            </div>

            {/* Tap hint */}
            <div className="bg-black text-white/50 text-[10px] text-center py-0.5 select-none comic-sans">
              tap left / right to switch day
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TimerTimeline() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 lg:gap-6 w-full px-4">
      {/* Heading – centered, own panel */}
      <div className="htf-panel w-full flex justify-center">
        <h2
          className="text-white"
          style={{
            fontFamily: "Dela Gothic One",
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            letterSpacing: "0.05em",
            WebkitTextStroke: "1.5px black",
            textShadow:
              "3px 3px 0 #000, -2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000",
          }}
        >
          TIMELINE
        </h2>
      </div>

      {/* Mobile: stacked | Laptop (lg+): side by side */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 w-full">
        {/* Timer */}
        <div className="htf-panel flex-shrink-0">
          <Timer />
        </div>

        {/* Timeline cards (each card already has htf-panel) */}
        <div className="flex-shrink-0">
          <Timeline />
        </div>
      </div>
    </div>
  );
}
