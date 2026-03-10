import { forwardRef, useRef, useEffect } from "react";
import gsap from "gsap";
import Barcode from "../components/Barcode";

const LETTERS = "HACKTOFUTURE4.0".split("");

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const letterContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const els = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!els.length || !letterContainerRef.current) return;

    gsap.set(els, { y: 200, opacity: 0 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: "back.out(1.4)",
          });
        } else {
          gsap.set(els, { y: 200, opacity: 0 });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(letterContainerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col w-full bg-black"
      style={{
        transform: "translateY(100%)",
        willChange: "transform",
        overflow: "hidden",
        height: "100%",
        minHeight: "-webkit-fill-available",
      }}
    >
      <div className="absolute inset-0 bg-black/70 pointer-events-none z-[1]" />
      <div className="absolute inset-0 grid-bg pointer-events-none z-[2]" />

      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-col h-full justify-between">
          {/* Scrollable content */}
          <div className="flex-1 flex flex-col justify-start min-h-0 overflow-y-auto overscroll-none">
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
                  title="Location Map"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 px-4 md:px-12 lg:px-20 pb-2 md:pb-6 mt-3 md:mt-6">
              <div className="col-span-2 md:col-span-1 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center py-3 md:py-0 min-h-[60px]">
                <Barcode height={50} />
              </div>

              <div className="flex flex-col gap-1 md:gap-4">
                <h3 className="hero-title text-white font-bold text-[10px] md:text-lg">
                  QUERIES & CONTACT
                </h3>
                <div className="flex flex-col gap-0.5 md:gap-2 comic-sans">
                  {[
                    { href: "mailto:hacktofuture@gmail.com", label: "hacktofuture@gmail.com" },
                    { href: "tel:+919876543210", label: "+91 98765 43210" },
                    { href: "tel:+919876543211", label: "+91 98765 43211" },
                  ].map(({ href, label }) => (
                    <a
                      key={href}
                      href={href}
                      className="text-white/70 hover:text-white transition-colors flex items-center gap-2 truncate text-[10px] md:text-sm"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1 md:gap-4">
                <h3 className="hero-title text-white font-bold text-[10px] md:text-lg">
                  FOLLOW US
                </h3>
                <div className="grid grid-cols-2 gap-0.5 md:gap-2 comic-sans">
                  {["Instagram", "Twitter / X", "Discord", "LinkedIn", "GitHub", "YouTube"].map(
                    (name) => (
                      <a
                        key={name}
                        href="#"
                        className="text-white/70 hover:text-white transition-colors py-0.5 text-[10px] md:text-sm"
                      >
                        {name}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pinned bottom */}
          <div className="w-full border-t border-white/10 flex flex-col shrink-0">
            <div
              ref={letterContainerRef}
              className="flex justify-center items-center w-full px-1 md:px-4"
              style={{ height: "clamp(2.5rem, 10vw, 10rem)" }}
            >
              <div
                className="flex items-center justify-center"
                style={{ gap: "clamp(0px, 0.5vw, 4px)" }}
              >
                {LETTERS.map((letter, i) => (
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
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center px-4 md:px-12 lg:px-20 py-1 md:py-2 pb-[max(0.25rem,calc(env(safe-area-inset-bottom)+0.25rem))]">
              <span className="text-white/40 comic-sans text-[8px] md:text-xs">
                © 2026 Hack to Future. All rights reserved.
              </span>
              <span className="text-white/40 comic-sans text-[8px] md:text-xs">
                Built by{" "}
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
                >
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