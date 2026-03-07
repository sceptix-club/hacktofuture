import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

// ✅ UPDATED Timer component
function Timer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const HtfDate = Date.parse("2026-04-15T18:36:20+05:30"); // ✅ CHANGED: consistent date

  function setTimeLeft() {
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
  }

  // ✅ CHANGED: added dependency array [] and immediate first tick
  useEffect(() => {
    setTimeLeft();
    const id = setInterval(setTimeLeft, 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { value: timer.days, label: "Days" },
    { value: timer.hours, label: "Hrs" },
    { value: timer.minutes, label: "Min" },
    { value: timer.seconds, label: "Sec" },
  ];

  // ✅ CHANGED: entire return block
  return (
    <div
      className="relative flex items-center justify-center w-full mx-auto"
      style={{
        maxWidth: 620,
        aspectRatio: "612/408",            
        containerType: "inline-size",
      }}
    >

      <img
        src="/comic-dialog.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
        onLoad={(e) => {
    const img = e.currentTarget;
    console.log(`Width: ${img.naturalWidth}, Height: ${img.naturalHeight}`);
  }}
      />

      <div
        className="relative z-10 grid grid-cols-4 place-items-center"
        style={{
          width: "65%",
          gap: "3%",
          paddingBottom: "5%",
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
                fontSize: "10cqi",
                textShadow:
                  "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, " +
                  "1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
              }}
            >
              {String(value).padStart(2, "0")}
            </span>

            <span
              className="comic-sans text-black uppercase tracking-wider font-bold"
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

// ⬇️ Timeline stays exactly the same — no changes needed
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
        const finalPosIdx = (prev - next + totalCards) % totalCards;
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
            ...originalPos[finalPosIdx],
            rotationY: 0,
            duration: 0.5,
            ease: "back.in(1.4)",
          });
      }

      setTimeout(() => {
        setZIndex(next);
      }, 500);

      cardRefs.current.forEach((card, i) => {
        if (i === prev || !card) return;
        const finalPosIdx = (i - next + totalCards) % totalCards;
        gsap.to(card, {
          ...originalPos[finalPosIdx],
          duration: 1.0,
          ease: "back.out(1.2)",
        });
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
          ...originalPos[0],
          rotationY: 0,
          duration: 0.5,
          ease: "back.in(1.4)",
          delay: 0.05,
        });
      }

      cardRefs.current.forEach((card, i) => {
        if (i === prev || !card) return;
        const finalPosIdx = (i - prev + totalCards) % totalCards;
        gsap.to(card, {
          ...originalPos[finalPosIdx],
          duration: 1.0,
          ease: "back.out(1.2)",
        });
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
                  ? {
                      background: cardColors[i],
                      color: buttonTextColors[i],
                      borderColor: "#000",
                      boxShadow: "3px 3px 0 #000",
                    }
                  : {}
              }
            >
              {i === currentCard && <span className="text-[0.6rem]">▶</span>}
              {label}
            </button>
          </div>
        ))}
      </div>

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
                  <span className="font-extrabold text-xs sm:text-sm md:text-base whitespace-nowrap hero-title text-black/80">
                    {info.time}
                  </span>
                  <span className="text-black text-xs sm:text-sm md:text-base leading-snug">
                    {info.event}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-black text-white/50 text-[10px] text-center py-0.5 select-none comic-sans">
              tap left / right to switch day
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ UPDATED TimerTimeline layout
export default function TimerTimeline() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 lg:gap-6 w-full px-4">
      {/* Heading */}
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

      {/* ✅ CHANGED: w-full + max-w + min-w-0 so both halves resize properly */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 w-full max-w-[1300px] mx-auto">
        <div className="htf-panel w-full lg:w-1/2 max-w-[620px] min-w-0">
          <Timer />
        </div>
        <div className="w-full lg:w-1/2 max-w-[620px] min-w-0">
          <Timeline />
        </div>
      </div>
    </div>
  );
}