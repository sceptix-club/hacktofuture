import { forwardRef, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import Barcode from "../components/Barcode";

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const letterContainerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useRef(false);

  const letters = [
    "H", "A", "C", "K", "T", "O", "F", "U", "T", "U", "R", "E", "4", ".", "0",
  ];

  const triggerLetterAnimation = useCallback(() => {
    const els = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (els.length === 0) return;

    // Reset to hidden state first
    gsap.set(els, { y: 200, opacity: 0 });

    // Then animate in
    gsap.to(els, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      stagger: 0.04,
      ease: "back.out(1.4)",
    });
  }, []);

  const resetLetters = useCallback(() => {
    const els = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (els.length === 0) return;

    gsap.set(els, { y: 200, opacity: 0 });
  }, []);

  useEffect(() => {
    // Set initial hidden state
    const els = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    gsap.set(els, { y: 200, opacity: 0 });

    // Poll for visibility
    const interval = setInterval(() => {
      const container = letterContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const nowVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.width > 0 &&
        rect.height > 0;

      // Entered view
      if (nowVisible && !isVisible.current) {
        isVisible.current = true;
        triggerLetterAnimation();
      }

      // Left view
      if (!nowVisible && isVisible.current) {
        isVisible.current = false;
        resetLetters();
      }
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, [triggerLetterAnimation, resetLetters]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col w-full"
      style={{
        transform: "translateY(100%)",
        willChange: "transform",
        overflow: "hidden",
        height: "100dvh",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="absolute inset-[-8px] pointer-events-none z-[0]"
        style={{
          backgroundImage: "url(/textures/background.jpg)",
          filter: "blur(4px)",
        }}
      />
      <div className="absolute inset-0 bg-black/70 pointer-events-none z-[1]" />
      <div className="absolute inset-0 grid-bg pointer-events-none z-[2]" />

      <div
        className="relative z-10 flex flex-col flex-1"
        style={{ overflow: "hidden", height: "100%" }}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex-1 flex flex-col justify-start min-h-0 overflow-y-auto">
            <div className="px-4 md:px-12 lg:px-20 pt-4 md:pt-6">
              <div className="w-full rounded-xl overflow-hidden border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7777.959147664792!2d74.892065!3d12.9090343!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba359dfac132663%3A0xa7bf228838232d32!2sSt%20Joseph%20Engineering%20College!5e0!3m2!1sen!2sin!4v1771914591035!5m2!1sen!2sin"
                  width="100%"
                  className="h-[320px] md:h-[300px] lg:h-[300px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 px-4 md:px-12 lg:px-20 pb-2 md:pb-6 mt-3 md:mt-6">
              <div
                className="col-span-2 md:col-span-1 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center py-3 md:py-0"
                style={{ minHeight: "60px" }}
              >
                <Barcode height={50} />
              </div>

              <div className="flex flex-col gap-1 md:gap-4">
                <h3 className="hero-title text-white font-bold text-[10px] md:text-lg">
                  QUERIES & CONTACT
                </h3>
                <div className="flex flex-col gap-0.5 md:gap-2 comic-sans">
                  <a href="mailto:hacktofuture@gmail.com" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 truncate text-[10px] md:text-sm">hacktofuture@gmail.com</a>
                  <a href="tel:+919876543210" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-[10px] md:text-sm">+91 98765 43210</a>
                  <a href="tel:+919876543211" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-[10px] md:text-sm">+91 98765 43211</a>
                </div>
              </div>

              <div className="flex flex-col gap-1 md:gap-4">
                <h3 className="hero-title text-white font-bold text-[10px] md:text-lg">
                  FOLLOW US
                </h3>
                <div className="grid grid-cols-2 gap-0.5 md:gap-2 comic-sans">
                  <a href="#" className="text-white/70 hover:text-white transition-colors py-0.5 text-[10px] md:text-sm">Instagram</a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors py-0.5 text-[10px] md:text-sm">Twitter / X</a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors py-0.5 text-[10px] md:text-sm">Discord</a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors py-0.5 text-[10px] md:text-sm">LinkedIn</a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors py-0.5 text-[10px] md:text-sm">GitHub</a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors py-0.5 text-[10px] md:text-sm">YouTube</a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-white/10 flex flex-col shrink-0">
            <div
              ref={letterContainerRef}
              className="flex justify-center items-center w-full px-1 md:px-4"
              style={{
                height: "clamp(2.5rem, 10vw, 10rem)",
                minHeight: "2.5rem",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{ gap: "clamp(0px, 0.5vw, 4px)" }}
              >
                {letters.map((letter, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      lettersRef.current[i] = el;
                    }}
                    className="hero-title inline-block"
                    style={{
                      fontSize: "clamp(1.2rem, 5.5vw, 8rem)",
                      color: "white",
                      WebkitTextStroke: "1px white",
                      lineHeight: 1,
                      willChange: "transform, opacity",
                      transform: "translate3d(0, 0, 0)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="flex justify-between items-center px-4 md:px-12 lg:px-20 py-1 md:py-2"
              style={{
                paddingBottom: "max(0.25rem, calc(env(safe-area-inset-bottom, 0px) + 0.25rem))",
              }}
            >
              <span className="text-white/40 comic-sans text-[8px] md:text-xs">
                © 2026 Hack to Future. All rights reserved.
              </span>
              <span className="text-white/40 comic-sans text-[8px] md:text-xs">
                Built by{" "}
                <a href="#" className="text-white/60 hover:text-white transition-colors underline underline-offset-2">
                  The Sceptix Club
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Footer.displayName = "Footer";

export default Footer;