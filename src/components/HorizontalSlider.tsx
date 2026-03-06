import React, { useRef, useEffect } from "react";
import Core from "smooothy";

export interface SlideItem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface HorizontalSliderProps {
  slides: SlideItem[];
  leftPanelContent: React.ReactNode;
  onReachEnd?: () => void;
  onLeaveEnd?: () => void;
}

export default function HorizontalSlider({
  slides,
  leftPanelContent,
  onReachEnd,
  onLeaveEnd,
}: HorizontalSliderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animIdRef = useRef<number>(0);

  // Use refs for callbacks so the wheel handler always sees fresh values
  const onReachEndRef = useRef(onReachEnd);
  const onLeaveEndRef = useRef(onLeaveEnd);
  useEffect(() => {
    onReachEndRef.current = onReachEnd;
  }, [onReachEnd]);
  useEffect(() => {
    onLeaveEndRef.current = onLeaveEnd;
  }, [onLeaveEnd]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const slideEls = [...wrapper.children] as HTMLElement[];

    const preventSelect = (e: Event) => e.preventDefault();
    wrapper.addEventListener("selectstart", preventSelect);
    wrapper.style.userSelect = "none";
    (wrapper.style as any).webkitUserSelect = "none";
    wrapper.style.touchAction = "none";

    const slider = new Core(wrapper, {
      infinite: false,
      snap: false,
      variableWidth: true,
      lerpFactor: 0.02,
      speedDecay: 0.97,
      bounceLimit: 0,
      setOffset: ({
        itemWidth,
        totalWidth,
      }: {
        itemWidth: number;
        totalWidth: number;
      }) => {
        const gap = window.innerWidth * 0.02;
        const lastSlideOffset = (slides.length - 1) * (itemWidth + gap);
        return totalWidth - lastSlideOffset;
      },
      onUpdate: (instance: any) => {
        const vwOffset = window.innerWidth * 0.1;
        slideEls.forEach((slide, i) => {
          const slideWidth = slide.offsetWidth;
          const slideLeft = slide.offsetLeft + instance.current;
          const bgColor = slides[i].color;
          const isLast = i === slides.length - 1;

          if (slideLeft < 0 && !isLast) {
            const ratio = Math.min(1, Math.abs(slideLeft) / slideWidth);
            slide.style.cssText = `
              background-color: ${bgColor};
              border: 3px solid #000;
              transform-origin: left 80%;
              transform: translateX(${
                instance.current + Math.abs(slideLeft) + ratio * vwOffset
              }px) rotate(${-15 * ratio}deg) scale(${1 - ratio * 0.4});
              position: relative;
              z-index: ${i + 1};
              box-shadow: 6px 6px 0px #000;
            `;
          } else {
            slide.style.cssText = `
              background-color: ${bgColor};
              border: 3px solid #000;
              transform: translateX(${instance.current}px);
              z-index: ${i + 1};
              box-shadow: 6px 6px 0px #000;
            `;
          }
        });
      },
    });

    let momentum = 0;
    let wasDragging = false;
    const MOMENTUM_MULTIPLIER = 10;
    const MOMENTUM_DECAY = 0.96;

    function animate() {
      slider.update();
      if (slider.isDragging) {
        wasDragging = true;
        momentum = 0;
      } else if (wasDragging) {
        momentum = slider.speed * MOMENTUM_MULTIPLIER;
        wasDragging = false;
      }
      if (Math.abs(momentum) > 0.5) {
        slider.target += momentum;
        momentum *= MOMENTUM_DECAY;
        slider.target = Math.max(slider.maxScroll, Math.min(0, slider.target));
      }
      animIdRef.current = requestAnimationFrame(animate);
    }
    animate();

    // ── Scroll state machine ──
    // "free"     → slider scrolls normally
    // "atEnd"    → slider is at the right end, next DOWN fires onReachEnd
    // "atStart"  → slider is at the left start, next UP fires onLeaveEnd
    type ScrollState = "free" | "atEnd" | "atStart";
    let scrollState: ScrollState = "free";
    let cooldown = false;

    const setCooldown = (ms = 700) => {
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, ms);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (cooldown) return;

      const atStart = slider.target >= -5;
      const atEnd = slider.target <= slider.maxScroll + 5;
      const goingRight = e.deltaY > 0; // scroll down = move slider right→left

      // ── At the right end ──
      if (atEnd && goingRight) {
        if (scrollState !== "atEnd") {
          // First time hitting the end — just latch the state, don't fire yet
          scrollState = "atEnd";
          return;
        }
        // Second scroll down while latched → fire onReachEnd
        setCooldown();
        scrollState = "free";
        onReachEndRef.current?.();
        return;
      }

      // ── At the left start ──
      if (atStart && !goingRight) {
        if (scrollState !== "atStart") {
          scrollState = "atStart";
          return;
        }
        // Second scroll up while latched → fire onLeaveEnd
        setCooldown();
        scrollState = "free";
        onLeaveEndRef.current?.();
        return;
      }

      // ── Normal slider scroll ──
      scrollState = "free";
      slider.target -= e.deltaY;
      slider.target = Math.max(slider.maxScroll, Math.min(0, slider.target));
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    // ── Touch ──
    let touchStartX = 0;
    let touchStartY = 0;
    let touchLastX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchLastX = touchStartX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dx = touchLastX - e.touches[0].clientX;
      touchLastX = e.touches[0].clientX;
      slider.target -= dx;
      slider.target = Math.max(slider.maxScroll, Math.min(0, slider.target));
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      const dy = touchStartY - e.changedTouches[0].clientY;

      // Only trigger if primarily horizontal swipe
      if (Math.abs(dx) < Math.abs(dy)) return;

      const atEnd = slider.target <= slider.maxScroll + 5;
      const atStart = slider.target >= -5;

      if (atEnd && dx > 40) {
        onReachEndRef.current?.();
      } else if (atStart && dx < -40) {
        onLeaveEndRef.current?.();
      }
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animIdRef.current);
      wrapper.removeEventListener("selectstart", preventSelect);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      slider.destroy();
    };
  }, [slides]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col md:flex-row items-center gap-[2vw]"
      style={{ touchAction: "none" }}
    >
      {/* Left panel */}
      <div className="w-full md:w-[40%] h-auto md:h-full flex flex-col items-center md:items-start px-[6vw] md:px-[4vw] justify-center pt-16 md:pt-0 pb-4 md:pb-0 text-center md:text-left">
        {leftPanelContent}
      </div>

      {/* Right slider panel */}
      <div className="w-full md:w-[60%] h-[45vh] md:h-full overflow-clip relative">
        <div
          ref={wrapperRef}
          className="flex h-full items-center will-change-transform"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`shrink-0 pointer-events-none w-[60vw] h-[72vw] md:w-[28vw] md:h-[36vw] max-w-[420px] max-h-[540px] rounded-[2vw] flex flex-col justify-between p-[4vw] md:p-[2vw] ${
                index < slides.length - 1 ? "mr-[4vw] md:mr-[2vw]" : ""
              }`}
              style={{
                backgroundColor: slide.color,
                border: "3px solid #000",
                boxShadow: "6px 6px 0px #000",
              }}
            >
              {/* Icon */}
              <div>
                <span
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 3rem)",
                    display: "block",
                    marginBottom: "1vw",
                  }}
                >
                  {slide.icon}
                </span>
                <div
                  className="inline-block px-2 py-0.5 mb-[1vw]"
                  style={{
                    background: "#000",
                    color: "#fff",
                    borderRadius: "4px",
                    fontFamily: "'Dela Gothic One', sans-serif",
                    fontSize: "clamp(0.5rem, 0.9vw, 0.8rem)",
                  }}
                >
                  #{index + 1}
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex-1 flex flex-col justify-center">
                <h3
                  className="font-bold leading-tight text-black"
                  style={{
                    fontFamily: "'Dela Gothic One', sans-serif",
                    fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)",
                    marginBottom: "1vw",
                  }}
                >
                  {slide.title}
                </h3>
                <p
                  className="font-sans font-medium leading-snug text-black/70"
                  style={{ fontSize: "clamp(0.6rem, 1vw, 0.9rem)" }}
                >
                  {slide.description}
                </p>
              </div>

              {/* Bottom decorative */}
              <div className="flex items-center justify-between">
                <div
                  className="h-[3px] w-12"
                  style={{
                    background: "linear-gradient(90deg, #000, transparent)",
                  }}
                />
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 100 100"
                  className="opacity-20"
                >
                  <polygon
                    points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
                    fill="#000"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
