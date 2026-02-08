import { forwardRef } from "react";
import Button from "../components/ui/Button";

type CTAProps = {
  title?: string;
  body?: string;
  buttonText?: string;
};

const CTA = forwardRef<HTMLDivElement, CTAProps>(
  (
    {
      title = "READY TO BUILD THE FUTURE?",
      body = "Join HackToFuture 4.0 and turn your wildest ideas into real products. Limited seats. Big energy.",
      buttonText = "Register Now",
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="fixed inset-0 z-20 flex items-center justify-center"
        style={{
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(100%)",
        }}
      >
        <div className="max-w-[85vw] text-center">
          <h2
            className="hero-title text-white font-bold"
            style={{ fontSize: "clamp(1.75rem, 6.5vw, 4rem)" }}
          >
            {title}
          </h2>
          <p
            className="comic-sans text-white/80 mt-4"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.35rem)" }}
          >
            {body}
          </p>
          <Button className="mt-6 bg-white text-black hover:cursor-pointer">
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }
);

CTA.displayName = "CTA";

export default CTA;
