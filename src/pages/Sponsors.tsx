import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import gsap from "gsap";
import HorizontalSlider from "../components/HorizontalSlider";
import type { SlideItem } from "../components/HorizontalSlider";

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

const TITLE_SPONSORS: SlideItem[] = [
  {
    title: "EGDK India",
    description:
      "Title sponsor description goes here. They make this event possible.",
    icon: "🏆",
    color: "#FFFF00",
  },
];

const GOLD_SPONSORS: SlideItem[] = [
  {
    title: "Gold Corp",
    description: "Gold sponsor powering innovation at every level.",
    icon: "🥇",
    color: "#FFD700",
  },
  {
    title: "Gold Tech",
    description: "Supporting builders and makers across the globe.",
    icon: "💡",
    color: "#E9CCFF",
  },
  {
    title: "Gold Ventures",
    description: "Investing in the next generation of technology leaders.",
    icon: "🚀",
    color: "#FB4903",
  },
];

const PLATINUM_SPONSORS: SlideItem[] = [
  {
    title: "Plat Systems",
    description: "Platinum tier excellence — shaping the future of tech.",
    icon: "💎",
    color: "#E0E0E0",
  },
  {
    title: "Plat Labs",
    description: "Research-driven sponsor committed to open innovation.",
    icon: "🔬",
    color: "#FFCDD2",
  },
];

interface SponsorSectionProps {
  label: string;
  accentColor: string;
  slides: SlideItem[];
  leftHeading: React.ReactNode;
  onReachEnd?: () => void;
  onLeaveEnd?: () => void;
}

function SponsorSection({
  label,
  accentColor,
  slides,
  leftHeading,
  onReachEnd,
  onLeaveEnd,
}: SponsorSectionProps) {
  return (
    <div className="w-full h-screen flex-shrink-0 relative flex flex-col">
      {/* Section badge — centered on mobile */}
      <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
        <div
          className="px-3 md:px-4 py-1 md:py-1.5"
          style={{
            background: accentColor,
            border: "3px solid #000",
            boxShadow: "4px 4px 0px #000",
            transform: "skewX(-3deg)",
          }}
        >
          <span
            className="hero-title text-white"
            style={{
              fontSize: "clamp(0.6rem, 2vw, 1rem)",
              transform: "skewX(3deg)",
              display: "block",
            }}
          >
            ★ {label} ★
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="flex-1 pt-12 md:pt-0">
        <HorizontalSlider
          slides={slides}
          leftPanelContent={leftHeading}
          onReachEnd={onReachEnd}
          onLeaveEnd={onLeaveEnd}
        />
      </div>
    </div>
  );
}

export default function Sponsors() {
  const outerRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState(0);
  const activeSectionRef = useRef(0);
  const totalSections = 3;

  // Keep refs in sync
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Scroll outer container per section
  useEffect(() => {
    if (!outerRef.current) return;
    gsap.to(outerRef.current, {
      y: `-${activeSection * 100}vh`,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, [activeSection]);

  const goNext = () =>
    setActiveSection((prev) => Math.min(prev + 1, totalSections - 1));

  const goPrev = () => setActiveSection((prev) => Math.max(prev - 1, 0));

  // Left heading builder
  const makeHeading = (
    line1: string,
    line2: string,
    accentColor: string,
    subtitle: string
  ) => (
    <div className="flex flex-col items-center md:items-start gap-3 md:gap-[1.5vw]">
      <h2
        className="hero-title text-white uppercase leading-[0.85] text-center md:text-left"
        style={{ fontSize: "clamp(1.8rem, 6vw, 4rem)" }}
      >
        {line1}
        <br />
        <span style={{ color: accentColor }}>{line2}</span>
      </h2>
      <p
        className="comic-sans text-white/50 w-[85%] md:w-[80%] text-center md:text-left"
        style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.95rem)" }}
      >
        {subtitle}
      </p>
    </div>
  );

  return (
    <>
      <div
        className="fixed inset-0 overflow-hidden"
        style={{
          background: "#0a0a0a",
          backgroundImage: "url('/textures/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overscrollBehavior: "none",
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

        {/* Sections */}
        <div
          ref={outerRef}
          className="absolute inset-x-0 z-20 will-change-transform"
          style={{ top: 0 }}
        >
          <SponsorSection
            label="TITLE SPONSORS"
            accentColor="#DA100C"
            slides={TITLE_SPONSORS}
            leftHeading={makeHeading(
              "Title",
              "Sponsors",
              "#DA100C",
              "Our premier partners who make this event possible. Scroll to explore →"
            )}
            onReachEnd={goNext}
            onLeaveEnd={goPrev}
          />

          <SponsorSection
            label="GOLD SPONSORS"
            accentColor="#B8860B"
            slides={GOLD_SPONSORS}
            leftHeading={makeHeading(
              "Gold",
              "Sponsors",
              "#FFD700",
              "Gold-tier supporters fueling innovation. Scroll to explore →"
            )}
            onReachEnd={goNext}
            onLeaveEnd={goPrev}
          />

          <SponsorSection
            label="PLATINUM SPONSORS"
            accentColor="#5C5C8A"
            slides={PLATINUM_SPONSORS}
            leftHeading={makeHeading(
              "Platinum",
              "Sponsors",
              "#E0E0E0",
              "Our platinum partners — the backbone of HTF. Scroll to explore →"
            )}
          />
        </div>
      </div>
      <Navbar />
    </>
  );
}
