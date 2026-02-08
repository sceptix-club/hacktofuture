import { forwardRef, useRef } from "react";

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const letters = ["H", "A", "C", "K", "T", "O", "F", "U", "T", "U", "R", "E", "4", ".", "0"];

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col bg-black w-full h-screen overflow-hidden"
      style={{ transform: "translateY(100%)", willChange: "transform" }}
    >
  
      <div className="absolute inset-0 grid-bg" />


      <div className="relative z-10 flex flex-col flex-1">


        <div className="flex flex-col items-center gap-3 px-4 text-center pt-10 pb-6">
          <h1
            className="hero-title text-white font-bold"
            style={{ fontSize: "clamp(1.8rem, 6vw, 4rem)" }}
          >
            HACK TO FUTURE
          </h1>
          <p
            className="text-white/70 comic-sans max-w-2xl"
            style={{ fontSize: "clamp(0.8rem, 1.8vw, 1.1rem)" }}
          >
            Built with passion. Code the future.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-12 lg:px-20 pb-6">


          <div className="rounded-xl overflow-hidden border border-white/10 flex items-center justify-center" style={{ minHeight: 200 }}>
            <span className="text-white/40 hero-title text-lg">MAP</span>
          </div>


          <div className="flex flex-col gap-4">
            <h3 className="hero-title text-white font-bold text-lg">QUERIES & CONTACT</h3>

            <div className="flex flex-col gap-2 comic-sans">
              <a
                href="mailto:hacktofuture@gmail.com"
                className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}
              >
                hacktofuture@gmail.com
              </a>
              <a
                href="tel:+919876543210"
                className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}
              >
                +91 98765 43210
              </a>
              <a
                href="tel:+919876543211"
                className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}
              >
                +91 98765 43211
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="hero-title text-white font-bold text-lg">FOLLOW US</h3>

            <div className="grid grid-cols-2 gap-2 comic-sans">
              <a href="#" className="text-white/70 hover:text-white transition-colors py-1" style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}>
                Instagram
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors py-1" style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}>
                Twitter / X
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors py-1" style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}>
                Discord
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors py-1" style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}>
                LinkedIn
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors py-1" style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}>
                GitHub
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors py-1" style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}>
                YouTube
              </a>
            </div>
          </div>
        </div>

      
        <div className="w-full flex-1 overflow-hidden border-t border-white/10 flex flex-col justify-end">
          <div className="flex justify-center items-end w-full px-4" style={{ flex: 1 }}>
            <div className="flex items-baseline overflow-hidden">
              {letters.map((letter, i) => (
                <span
                  key={i}
                  ref={(el) => { lettersRef.current[i] = el; }}
                  className="hero-title inline-block"
                  style={{
                    fontSize: "clamp(1.5rem, 6.5vw, 8rem)",
                    color: "white",
                    WebkitTextStroke: "1.5px white",
                    lineHeight: 1,
                    opacity: 0,
                    willChange: "transform, opacity",
                    transform: "translate3d(0, 0, 0)",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center  px-6 md:px-12 lg:px-20 py-2">
            <span className="text-white/40 comic-sans" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)" }}>
              © 2026 Hack to Future. All rights reserved.
            </span>
            <span className="text-white/40 comic-sans" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)" }}>
              Built by{" "}
              <a href="#" className="text-white/60 hover:text-white transition-colors underline underline-offset-2">
                Sceptix
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

Footer.displayName = "Footer";

export default Footer;
