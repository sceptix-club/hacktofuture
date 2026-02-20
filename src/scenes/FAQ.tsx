import { useState, forwardRef } from "react";

const faqs = [
  {
    question: "WHO GETS INTERNSHIPS?",
    answer:
      "The top 15 best participants win an opportunity for a paid internship.",
  },
  {
    question: "WHAT IS THE TEAM SIZE?",
    answer:
      "Teams can consist of 2 to 4 members. Solo participation is not allowed.",
  },
  {
    question: "IS THERE A REGISTRATION FEE?",
    answer: "No, participation in HackToFuture is completely free of charge.",
  },
  {
    question: "DO I NEED TO BE AN AI EXPERT?",
    answer:
      "Not at all! We welcome participants of all skill levels. Curiosity and creativity matter more than expertise.",
  },
  {
    question: "WHAT SHOULD I BRING?",
    answer:
      "Bring your laptop, charger, student ID, and your hacker spirit. Everything else will be provided.",
  },
];

// HackToFuture yellow & red (matching CTA / brand)
const HTF_YELLOW = "#FFE105";
const HTF_RED = "#E8003D";

const FAQ = forwardRef<HTMLDivElement>((_, ref) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-40 w-full h-screen flex flex-col items-center justify-center overflow-hidden max-md:-mt-12 -mt-6"
      style={{
        transform: "translateY(100%)",
        willChange: "transform, opacity",
        opacity: 0,
      }}
    >
      {/* ── LAYER 1: Same halftone dot bg as CTA ── */}
      <div className="comic-halftone absolute inset-0" />

      {/* ── LAYER 2: Radial gradient vignette (same as CTA) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* ── LAYER 3: Top-to-bottom colour gradient overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,225,5,0.07) 0%, rgba(232,0,61,0.07) 100%)",
        }}
      />

      {/* ── Corner panel frames (same as CTA) ── */}
      <div className="absolute top-4 left-4 w-24 h-24 md:w-36 md:h-36 comic-panel-border rounded-sm pointer-events-none" />
      <div className="absolute top-4 right-4 w-20 h-32 md:w-28 md:h-44 comic-panel-border rounded-sm pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-28 h-20 md:w-40 md:h-28 comic-panel-border rounded-sm pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-24 h-24 md:w-32 md:h-32 comic-panel-border rounded-sm pointer-events-none" />

      {/* ── Dot cluster accents (same as CTA ComicDots) ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "5%",
          right: "5%",
          width: 120,
          height: 120,
          backgroundImage:
            "radial-gradient(circle, rgba(255,225,5,0.12) 2px, transparent 2px)",
          backgroundSize: "8px 8px",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: "8%",
          left: "5%",
          width: 100,
          height: 100,
          backgroundImage:
            "radial-gradient(circle, rgba(232,0,61,0.12) 2px, transparent 2px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div
        className="relative z-10 w-full flex flex-col items-center
                   px-4 py-6
                   -mt-8 sm:mt-0"           /* phone: nudge up */
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        {/* ── Title block ── */}
        <div className="text-center mb-6 md:mb-8">
          {/* Eyebrow line */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div
              className="h-0.5 w-10 md:w-16"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.4))",
              }}
            />
            <span
              className="hero-title tracking-[0.3em] text-white/60"
              style={{ fontSize: "clamp(0.55rem, 1.2vw, 0.75rem)" }}
            >
              ★ INTEL BRIEFING ★
            </span>
            <div
              className="h-0.5 w-10 md:w-16"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(255,255,255,0.4))",
              }}
            />
          </div>

          <h1
            className="hero-title font-black uppercase leading-none"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 5.5rem)",
              letterSpacing: "0.02em",
              textShadow: "4px 4px 0 rgba(0,0,0,0.35)",
            }}
          >
            <span className="text-white">THE </span>
            <span style={{ color: HTF_YELLOW }}>FAQS</span>
          </h1>

          <p
            className="comic-sans text-white/70 uppercase tracking-widest mt-2"
            style={{ fontSize: "clamp(0.6rem, 1.4vw, 0.82rem)" }}
          >
            INTELLIGENCE BRIEFING &amp; PROTOCOLS
          </p>
        </div>

        {/* ── Accordion ── */}
        <div
          className="w-full"
          style={{ maxWidth: "min(680px, 90vw)" }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="mb-2 md:mb-3 overflow-hidden"
                style={{
                  border: "0.28rem solid #000",
                  boxShadow: isOpen
                    ? `4px 4px 0 #000`
                    : `3px 3px 0 #000`,
                  transition: "box-shadow 0.2s",
                }}
              >
                {/* ── Question row — halftone white with dot SVG bg ── */}
                <button
                  className="w-full flex items-center justify-between px-4 md:px-5 py-3 md:py-4 text-left"
                  style={{
                    background: `url("data:image/svg+xml;utf8,<svg width='100' height='100' opacity='0.08' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23250E17'><circle cx='25' cy='25' r='6'/><circle cx='75' cy='75' r='6'/><circle cx='75' cy='25' r='6'/><circle cx='25' cy='75' r='6'/></g></svg>"), rgba(255,255,255,0.92)`,
                    backgroundSize: "14px 14px, 100% 100%",
                    cursor: "pointer",
                    border: "none",
                    outline: "none",
                  }}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span
                    className="comic-sans font-black uppercase"
                    style={{
                      fontSize: "clamp(0.8rem, 2vw, 1.05rem)",
                      color: "#111",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {faq.question}
                  </span>

                  {/* ── Toggle icon — yellow (+) / red (−) ── */}
                  <span
                    className="flex items-center justify-center font-black text-black flex-shrink-0 ml-3 rounded-sm"
                    style={{
                      background: isOpen ? HTF_RED : HTF_YELLOW,
                      width: "clamp(26px, 3.5vw, 36px)",
                      height: "clamp(26px, 3.5vw, 36px)",
                      fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                      lineHeight: 1,
                      border: "0.2rem solid #000",
                      boxShadow: "2px 2px 0 #000",
                      color: isOpen ? "#fff" : "#000",
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* ── Answer ── */}
                <div
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                    background: "rgba(255,255,255,0.06)",
                    borderTop: isOpen ? "0.2rem solid #000" : "none",
                  }}
                >
                  <p
                    className="comic-sans px-4 md:px-5 py-3 md:py-4 text-white/85"
                    style={{
                      fontSize: "clamp(0.78rem, 1.7vw, 0.98rem)",
                      lineHeight: 1.65,
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

FAQ.displayName = "FAQ";
export default FAQ;