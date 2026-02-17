import React, { useRef, useEffect, useState } from "react";
import Core from "smooothy";
import Navbar from "../components/ui/Navbar";
import Footer from "../scenes/Footer";
import gsap from "gsap";
import { Stats } from "@react-three/drei";

/* ─── Theme data ─── */
const THEMES = [
  {
    title: "AI & Machine Learning",
    description:
      "Build intelligent systems that learn, adapt, and transform the way we interact with technology. From neural networks to natural language processing, push the boundaries of what machines can do.",
    icon: "🤖",
    color: "#FFFF00",
  },
  {
    title: "Web3 & Blockchain",
    description:
      "Decentralize the future. Create trustless applications, smart contracts, and decentralized protocols that empower users and redefine ownership in the digital age.",
    icon: "⛓️",
    color: "#55DB9C",
  },
  {
    title: "Health & Sustainability",
    description:
      "Hack for a healthier planet and healthier people. Tackle climate change, optimize healthcare delivery, and build solutions that create lasting positive impact on our world.",
    icon: "🌍",
    color: "#E9CCFF",
  },
  {
    title: "Open Innovation",
    description:
      "No limits, no boundaries. Bring your wildest ideas to life — from creative tools to productivity hacks, gaming experiences to social platforms. If you can dream it, you can build it.",
    icon: "🚀",
    color: "#FB4903",
  },
];

/* ─── Halftone floating dots background ─── */
function HalftoneDots() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 1px)",
        backgroundSize: "20px 20px",
        animation: "float-dots 60s linear infinite",
        willChange: "transform",
      }}
    />
  );
}

/* ─── Main Themes Page ─── */
export default function Themes() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFooter, setShowFooter] = useState(false);
  const sliderRef = useRef<any>(null);
  const animIdRef = useRef<number>(0);
  const isFooterVisible = useRef(false);

  // Footer animation
  useEffect(() => {
    if (!footerRef.current) return;
    if (showFooter) {
      gsap.to(footerRef.current, {
        y: "0%",
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
      });
    } else {
      gsap.to(footerRef.current, {
        y: "100%",
        duration: 0.35,
        ease: "power2.in",
        force3D: true,
      });
    }
    isFooterVisible.current = showFooter;
  }, [showFooter]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const slides = [...wrapper.children] as HTMLElement[];

    const preventSelect = (e: Event) => e.preventDefault();
    wrapper.addEventListener("selectstart", preventSelect);
    wrapper.style.userSelect = "none";
    wrapper.style.webkitUserSelect = "none";
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
        const lastSlideOffset = (THEMES.length - 1) * (itemWidth + gap);
        return totalWidth - lastSlideOffset;
      },
      onUpdate: (instance: any) => {
        const vwOffset = window.innerWidth * 0.1;

        slides.forEach((slide, i) => {
          const slideWidth = slide.offsetWidth;
          const slideLeft = slide.offsetLeft + instance.current;
          const bgColor = THEMES[i].color;
          const isLast = i === THEMES.length - 1;

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

    sliderRef.current = slider;

    // Animation loop
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

    // ─── Scroll-driven navigation ───
    const SCROLL_SENSITIVITY = 1.0;
    let scrollCooldown = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Check if slider is at the end (scrolled to max) and scrolling down → show footer
      const atEnd = slider.target <= slider.maxScroll + 5;
      const atStart = slider.target >= -5;

      if (atEnd && e.deltaY > 0) {
        if (!isFooterVisible.current && !scrollCooldown) {
          scrollCooldown = true;
          setShowFooter(true);
          setTimeout(() => {
            scrollCooldown = false;
          }, 600);
        }
        return;
      }

      if (isFooterVisible.current && e.deltaY < 0) {
        if (!scrollCooldown) {
          scrollCooldown = true;
          setShowFooter(false);
          setTimeout(() => {
            scrollCooldown = false;
          }, 600);
        }
        return;
      }

      if (isFooterVisible.current) return;

      // Drive the slider with scroll
      const delta = e.deltaY * SCROLL_SENSITIVITY;
      slider.target -= delta;
      slider.target = Math.max(slider.maxScroll, Math.min(0, slider.target));
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    // ─── Touch-based scroll ───
    let touchStartY = 0;
    let touchLastY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const delta = (touchLastY - currentY) * SCROLL_SENSITIVITY;
      touchLastY = currentY;

      if (isFooterVisible.current) return;

      slider.target -= delta;
      slider.target = Math.max(slider.maxScroll, Math.min(0, slider.target));
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const totalDelta = touchStartY - e.changedTouches[0].clientY;
      const atEnd = slider.target <= slider.maxScroll + 5;

      if (atEnd && totalDelta > 50 && !isFooterVisible.current) {
        setShowFooter(true);
      } else if (isFooterVisible.current && totalDelta < -50) {
        setShowFooter(false);
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
  }, []);

  return (
    <>
      <Stats />
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden"
        style={{
          background: "#0a0a0a",
          overscrollBehavior: "none",
          touchAction: "none",
        }}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0" style={{ contain: "strict" }}>
          <div className="comic-halftone absolute inset-0" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
            }}
          />
          <HalftoneDots />
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center pt-4 sm:pt-6">
          <div
            className="px-4 sm:px-6 py-1.5 sm:py-2 relative"
            style={{
              background: "#DA100C",
              border: "3px solid #000",
              boxShadow: "4px 4px 0px #000",
              transform: "skewX(-3deg)",
            }}
          >
            <h1
              className="hero-title text-white"
              style={{
                fontSize: "clamp(0.9rem, 3vw, 2rem)",
                transform: "skewX(3deg)",
              }}
            >
              ★ THEMES ★
            </h1>
          </div>
        </div>

        {/* Slider area */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="w-full h-full flex flex-col md:flex-row items-center gap-[2vw]">
            {/* Left/Top text panel */}
            <div className="w-full md:w-[40%] h-auto md:h-full flex flex-col items-start px-[6vw] md:px-[4vw] justify-center pt-20 md:pt-0 pb-2 md:pb-0">
              <h2
                className="hero-title text-white uppercase leading-[0.85]"
                style={{ fontSize: "clamp(2rem, 10vw, 6rem)" }}
              >
                Pick
                <br />
                Your
                <br />
                <span style={{ color: "#DA100C" }}>Theme</span>
              </h2>
              <p
                className="comic-sans text-white/50 mt-[2vw] w-[90%] md:w-[80%]"
                style={{ fontSize: "clamp(0.75rem, 1.3vw, 1.1rem)" }}
              >
                Choose from one of our exciting tracks and build something
                extraordinary. Scroll to explore →
              </p>
            </div>

            {/* Right/Bottom slider panel */}
            <div className="w-full md:w-[60%] h-[50vh] md:h-full overflow-clip relative">
              <div
                ref={wrapperRef}
                className="flex h-full items-center will-change-transform"
              >
                {THEMES.map((theme, index) => (
                  <div
                    key={index}
                    className={`shrink-0 pointer-events-none w-[60vw] h-[75vw] md:w-[30vw] md:h-[40vw] max-w-[450px] max-h-[600px] rounded-[2vw] flex flex-col justify-between p-[4vw] md:p-[2vw] ${
                      index < THEMES.length - 1 ? "mr-[4vw] md:mr-[2vw]" : ""
                    }`}
                    style={{
                      backgroundColor: theme.color,
                      border: "3px solid #000",
                      boxShadow: "6px 6px 0px #000",
                    }}
                  >
                    {/* Icon */}
                    <div>
                      <span
                        style={{
                          fontSize: "clamp(2rem, 4vw, 4rem)",
                          display: "block",
                          marginBottom: "1vw",
                        }}
                      >
                        {theme.icon}
                      </span>
                      {/* Theme number badge */}
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
                        THEME #{index + 1}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3
                        className="font-bold leading-tight text-black"
                        style={{
                          fontFamily: "'Dela Gothic One', sans-serif",
                          fontSize: "clamp(1rem, 2.2vw, 2.2rem)",
                          marginBottom: "1vw",
                        }}
                      >
                        {theme.title}
                      </h3>
                      <p
                        className="font-sans font-medium leading-snug text-black/70"
                        style={{
                          fontSize: "clamp(0.65rem, 1.1vw, 1rem)",
                        }}
                      >
                        {theme.description}
                      </p>
                    </div>

                    {/* Bottom decorative element */}
                    <div className="flex items-center justify-between">
                      <div
                        className="h-[3px] w-12"
                        style={{
                          background:
                            "linear-gradient(90deg, #000, transparent)",
                        }}
                      />
                      <svg
                        width="30"
                        height="30"
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
        </div>

        {/* Footer */}
        <Footer ref={footerRef} />
      </div>
      <Navbar />

      {/* Inline keyframes for scroll hint */}
      <style>{`
        @keyframes scroll-hint {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
