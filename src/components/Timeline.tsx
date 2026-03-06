import { useState, useEffect, useRef } from "react";
import "../styles/TimerTimeline.css";
import { gsap } from "gsap";

export default function Timeline() {
  const peek = 32;
  const [currentCard, setCurrentCard] = useState(0);

  const originalPos = [
    { x: 0, y: 0, rotation: 0, scale: 1 },
    { x: -peek, y: 4, rotation: -2, scale: 0.97 },
    { x: peek / 3, y: 4 + peek, rotation: 3, scale: 0.97 },
  ];

  const fannedBack = { x: "90%", y: 100, rotation: 5, scale: 1 };
  const fannedForward = { x: "90%", y: 100, rotation: 5, scale: 1 };
  const shiftStart = { x: "-5%", duration: 0.5, ease: "back.in(1.4)" };

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
      { time: "7:00PM", event: "Dinner" },
      { time: "7:30PM", event: "Cultural Program in Amphitheatre" },
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
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const rowCount = cards.map((card) => Math.ceil(card.length / 2));

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
      gsap
        .timeline()
        .to(cardRefs.current[prev], {
          ...fannedForward,
          duration: 0.5,
          ease: "back.in(1.4)",
          rotationY: 60,
          delay: 0.05,
        })
        .to(cardRefs.current[prev], {
          ...originalPos[next],
          zIndex: 1,
          rotationY: 0,
          duration: 0.5,
          ease: "back.in(1.4)",
        });

      setTimeout(() => setZIndex(next), 500);

      const filterCards = cardRefs.current.filter((_, i) => i !== prev);
      gsap
        .timeline()
        .to(filterCards, { x: "-5%", duration: 0.5, ease: "back.in(1.4)" })
        .to(filterCards, { x: 0, duration: 0.5, ease: "back.in(1.4)" });

      return next;
    });
  };

  const flipBackward = () => {
    setCurrentCard((next) => {
      const prev = next === 0 ? totalCards - 1 : next - 1;
      gsap
        .timeline()
        .to(cardRefs.current[prev], {
          ...fannedBack,
          duration: 0.5,
          ease: "back.in(1.4)",
          rotationY: 60,
          delay: 0.05,
        })
        .to(cardRefs.current[prev], {
          ...originalPos[next],
          zIndex: 60,
          rotationY: 0,
          duration: 0.5,
          ease: "back.in(1.4)",
          delay: 0.05,
        });

      const filterCards = cardRefs.current.filter((_, i) => i !== prev);
      gsap
        .timeline()
        .to(filterCards, { ...shiftStart })
        .to(filterCards, { x: 0, duration: 0.5, ease: "back.in(1.4)" });

      setTimeout(() => setZIndex(prev), 800);
      return prev;
    });
  };

  const [rendered, setRendered] = useState(false);

  const cardClicked = (event: React.MouseEvent) => {
    const card = cardRefs.current[currentCard];
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    if (x > bounds.width / 2) {
      flipForward();
    } else {
      flipBackward();
    }
  };

  useEffect(() => {
    if (!rendered) {
      cardRefs.current.forEach((card, i) => {
        if (card) gsap.set(card, originalPos[i]);
      });
      setZIndex(currentCard);
      setRendered(true);

      if (originalPos.length !== cards.length) {
        console.error("CARDS COUNT IS INVALID: originalPos length mismatch");
      }
    }
  }, []);

  const Header = ["15th April", "16th April", "17th April"];
  const times = ["15", "16", "17"];

  return (
    <div className="timeline w-full h-full flex flex-col items-center px-2 sm:px-4">
      {/* Date indicator */}
      <div
        className="timeline-indicator w-full max-w-xl mb-3 sm:mb-4"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${times.length}, 1fr)`,
        }}
      >
        {times.map((time) => (
          <div
            key={time}
            className="time text-white/60 text-center text-xs sm:text-sm tracking-widest uppercase"
          >
            {time}
          </div>
        ))}
      </div>

      {/* Card stack */}
      <div className="cards text-left relative w-full max-w-xl sm:max-w-2xl min-h-[260px] sm:min-h-[320px]">
        {cards.map((card, i) => (
          <div
            className="card-wrapper absolute w-full"
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            key={i}
          >
            <div className="card-header text-white font-bold text-sm sm:text-base md:text-lg px-3 pt-3">
              {Header[i]}
            </div>
            <div
              className="card-content grid p-2 sm:p-3 gap-1 sm:gap-2 cursor-pointer"
              onClick={cardClicked}
              style={{
                gridTemplateRows: `repeat(${rowCount[i]}, auto)`,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              {card.map((info, j) => (
                <div
                  className="card-block flex flex-col p-1.5 sm:p-2 rounded"
                  key={j}
                >
                  <div className="card-event text-white text-[11px] sm:text-xs md:text-sm font-medium leading-tight">
                    {info.event}
                  </div>
                  <div className="card-time text-white/50 text-[10px] sm:text-xs mt-0.5">
                    {info.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation hint */}
      <p className="text-white/30 text-[10px] sm:text-xs mt-auto pt-2 tracking-wider">
        TAP LEFT / RIGHT TO NAVIGATE
      </p>
    </div>
  );
}
