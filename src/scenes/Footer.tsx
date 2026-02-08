import { forwardRef, useRef } from "react";
import Barcode from "../components/Barcode";

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const letters = [
    "H",
    "A",
    "C",
    "K",
    "T",
    "O",
    "F",
    "U",
    "T",
    "U",
    "R",
    "E",
    "4",
    ".",
    "0",
  ];

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col bg-black w-full h-screen overflow-hidden"
      style={{ transform: "translateY(100%)", willChange: "transform" }}
    >
      <div className="absolute inset-0 grid-bg" />

      <div className="relative z-10 flex flex-col flex-1 justify-center">
        <div className="px-6 md:px-12 lg:px-20 pt-6">
          <div className="w-full rounded-xl overflow-hidden border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4263.66930063788!2d74.89606981102712!3d12.91077313734648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba359dfac132663%3A0xa7bf228838232d32!2sSt%20Joseph%20Engineering%20College!5e1!3m2!1sen!2sin!4v1770539822992!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St Joseph Engineering College Map"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-12 lg:px-20 pb-6 mt-6">
          <div
            className="rounded-xl overflow-hidden border border-white/10 flex items-center justify-center"
            style={{ minHeight: 200 }}
          >
            <Barcode height={40}/>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="hero-title text-white font-bold text-lg">
              QUERIES & CONTACT
            </h3>

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
            <h3 className="hero-title text-white font-bold text-lg">
              FOLLOW US
            </h3>

            <div className="grid grid-cols-2 gap-2 comic-sans">
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors py-1"
                style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors py-1"
                style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}
              >
                Twitter / X
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors py-1"
                style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}
              >
                Discord
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors py-1"
                style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors py-1"
                style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors py-1"
                style={{ fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)" }}
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="w-full flex-1 overflow-hidden border-t border-white/10 flex flex-col justify-end">
          <div
            className="flex justify-center items-end w-full px-4"
            style={{ flex: 1 }}
          >
            <div className="flex items-baseline overflow-hidden">
              {letters.map((letter, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    lettersRef.current[i] = el;
                  }}
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
            <span
              className="text-white/40 comic-sans"
              style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)" }}
            >
              © 2026 Hack to Future. All rights reserved.
            </span>
            <span
              className="text-white/40 comic-sans"
              style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)" }}
            >
              Built by{" "}
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
              >
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
