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

  const HtfDate = Date.parse("2026-04-15T18:36:20+05:30");

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
        src="/comi.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
        onLoad={(e) => {
          console.log(e);
        }}
      />

      <div
        className="relative mr-7 mt-4 z-10 grid grid-cols-4 place-items-center"
        style={{
          width: "65%",
          gap: "3%",
          paddingBottom: "5%",
        }}
      >
        {blocks.map(({ value, label }) => (
          <div
            key={label}
            className="flex  flex-col items-center"
            style={{ gap: "0.6cqi" }}
          >
            <span
              className="comic-sans  text-white  leading-none tabular-nums"
              style={{
                fontSize: "9cqi",
                textShadow:
                  "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, " +
                  "1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
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

// ✅ CHANGED: Timeline now accepts `interactive` prop
function Timeline({ interactive }: { interactive: boolean }) {
  const peek = 32;
  const [currentCard, setCurrentCard] = useState(0);
  const [currentButton, setCurrentButton] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

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

  const buttonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    // ✅ CHANGED: block clicks when not interactive
    if (!interactive) return;

    const nextCard = Number(event.currentTarget.id);
    let difference = currentCard - nextCard;
    let animateCards: Function;

    setCurrentButton(nextCard);

    if (difference > 0) {
      animateCards = flipBackward;
    } else {
      animateCards = flipForward;
    }

    difference = Math.abs(difference);
    let i = 0;
    for (; i < difference; i++) {
      setTimeout(animateCards, 700 * i);
    }

    if (timelineRef.current) {
      timelineRef.current.style.pointerEvents = "none";
    }

    setTimeout(() => {
      if (timelineRef.current) {
        timelineRef.current.style.pointerEvents = "auto";
      }
    }, 700 * i);
  };

  const flipForward = (updateButton: Boolean | undefined) => {
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

      if (updateButton) {
        setCurrentButton(next);
      }

      cardRefs.current.forEach((card, i) => {
        if (i === prev) return;
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

  const flipBackward = (updateButton: Boolean | undefined) => {
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
        if (i === prev) return;
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
      if (updateButton) {
        setCurrentButton(prev);
      }
      return prev;
    });
  };

  const [rendered, setRendered] = useState(false);

  const cardClicked = (event: React.MouseEvent<HTMLDivElement>) => {
    // ✅ CHANGED: block clicks when not interactive
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
    }, 700);
    if (x > midpoint) {
      flipForward(true);
    } else {
      flipBackward(true);
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
      style={{
        paddingBottom: "clamp(3rem, 6vh, 4.5rem)",
        // ✅ CHANGED: visual feedback when locked
        opacity: interactive ? 1 : 0.5,
        transition: "opacity 0.4s ease",
      }}
      ref={timelineRef}
    >
      <div className="flex gap-2 sm:gap-4 mb-2 sm:mb-3">
        {dayLabels.map((label, i) => (
          <div key={i} className="htf-panel">
            <button
              id={String(i)}
              onClick={buttonClicked}
              // ✅ CHANGED: disable button when not interactive
              disabled={!interactive}
              className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm border-2 transition-all comic-sans flex items-center gap-1
                ${!interactive ? "cursor-not-allowed" : "cursor-pointer"}
                ${
                  i === currentButton
                    ? "scale-110"
                    : "border-[#fece00] bg-black/60 text-white/70"
                }`}
              style={
                i === currentButton
                  ? {
                      background: cardColors[i],
                      color: buttonTextColors[i],
                      borderColor: "#000",
                      boxShadow: "3px 3px 0 #000",
                    }
                  : {}
              }
            >
              {i === currentButton && <span className="text-[0.6rem]">▶</span>}
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
              // ✅ CHANGED: block card clicks when not interactive
              pointerEvents: interactive ? "auto" : "none",
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

  
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ UPDATED TimerTimeline with scroll-based unlock
export default function TimerTimeline() {
  const [isSettled, setIsSettled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use IntersectionObserver to detect when section is fully in view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          // ✅ Section is mostly visible — wait a beat for scroll animation to finish
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          scrollTimeoutRef.current = setTimeout(() => {
            setIsSettled(true);
          }, 600); // 600ms after intersection to let scroll-snap / GSAP settle
        } else {
          // ✅ Section scrled away — lock again
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = null;
          }
          setIsSettled(false);
        }
      },
      {
        threshold: [0, 0.3, 0.6, 1.0],
      }
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
      className="flex flex-col items-center justify-center gap-4 lg:gap-6 w-full px-4 select-none"
    >
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

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 w-full max-w-[1300px] mx-auto">
        <div className="htf-panel w-full lg:w-1/2 max-w-[620px] min-w-0">
          <Timer />
        </div>
        <div className="w-full lg:w-1/2 max-w-[620px] min-w-0">
          {/* ✅ CHANGED: pass interactive prop */}
          <Timeline interactive={isSettled} />
        </div>
      </div>
    </div>
  );
}