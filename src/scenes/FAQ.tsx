import { useState, forwardRef } from "react";

const faqs = [
  {
    question: "WHO CAN PARTICIPATE?",
    answer:
      "The hackathon is open to all BE, B.Tech, BCA, MCA and MBA students.",
  },
  {
    question: "DO I HAVE TO PAY TO PARTICIPATE?",
    answer: "No, participation is completely free.",
  },
  {
    question: "WHAT IS THE TEAM SIZE FOR PARTICIPATION?",
    answer: "Teams should consist of 2 to 4 members.",
  },
  {
    question: "ARE INTER-COLLEGE TEAMS ALLOWED?",
    answer: "No, teams must be formed within the same college.",
  },
];

const HTF_YELLOW = "#FFE105";
const HTF_RED = "#E8003D";

const FAQ = forwardRef<HTMLDivElement>((_, ref) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-30 w-full h-screen"
      style={{
        transform: "translateY(100%)",
        willChange: "transform, opacity",
        opacity: 0,
        /* hide scrollbar cross-browser while still allowing scroll if needed */
        overflow: "hidden",
      }}
    >
      {/* ── LAYER 2: Radial gradient vignette ── */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* ── LAYER 3: Top-to-bottom colour gradient overlay ── */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* ── Corner panel frames ── */}
      <div className="absolute top-4 left-4 w-40 h-24 md:w-68 md:h-36 comic-panel-border rounded-sm pointer-events-none" />
      <div className="absolute top-4 right-4 w-20 h-32 md:w-28 md:h-44 comic-panel-border rounded-sm pointer-events-none" />

      {/* ── Dot cluster accents ── */}

      {/* ── SCROLLABLE CONTENT — scrollbar hidden ── */}
      <div
        className="relative z-10 w-full h-full flex flex-col items-center px-4 pt-28 pb-16 -mt-4 sm:mt-0"
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          /* Firefox */
          scrollbarWidth: "none",
          /* IE / Edge legacy */
          msOverflowStyle: "none",
        }}
      >
        {/* hide webkit scrollbar via a style tag injected inline */}
        <style>{`
          .faq-scroll::-webkit-scrollbar { display: none; }
        `}</style>

        {/* re-apply class so the style tag above targets it */}
        <div
          className="faq-scroll w-full flex flex-col items-center"
          style={{ minHeight: "100%" }}
        >
          {/* ── Title block ── */}
          <div className="text-center mb-6 md:mb-8 mt-8 md:-mt-12">
            <h1
              className="hero-title font-black uppercase leading-none"
              style={{
                fontSize: "clamp(2.8rem, 9vw, 5.5rem)",
                letterSpacing: "0.02em",
                textShadow: "4px 4px 0 rgba(0,0,0,0.35)",
              }}
            >
              <span style={{ color: HTF_YELLOW }}>FAQ</span>
            </h1>
          </div>

          {/* ── Accordion ── */}
          <div className="w-full" style={{ maxWidth: "min(680px, 90vw)" }}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="mb-2 md:mb-3"
                  style={{
                    border: "0.28rem solid #000",
                    boxShadow: isOpen ? `4px 4px 0 #000` : `3px 3px 0 #000`,
                    transition: "box-shadow 0.2s",
                  }}
                >
                  {/* ── Question row ── */}
                  <button
                    className="w-full flex items-center justify-between px-4 md:px-5 py-3 md:py-4 text-left"
                    style={{
                      background: `url("data:image/svg+xml;utf8,<svg width='100' height='100' opacity='0.08' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23250E17'><circle cx='25' cy='25' r='6'/><circle cx='75' cy='75' r='6'/><circle cx='75' cy='25' r='6'/><circle cx='25' cy='75' r='6'/></g></svg>"), rgba(255,255,255,0.92)`,
                      backgroundSize: "14px 14px, 100% 100%",
                      cursor: "pointer",
                      border: "none",
                      outline: "none",
                      width: "100%",
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

                    {/* ── Toggle icon ── */}
                    <span
                      className="flex items-center justify-center font-black flex-shrink-0 ml-3 rounded-sm"
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

                  {/* ── Answer — grows downward via grid trick ── */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.35s ease",
                      background: "rgba(255,255,255,0.06)",
                      borderTop: isOpen ? "0.2rem solid #000" : "none",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

FAQ.displayName = "FAQ";
export default FAQ;
