export default function ScrollIndicator() {
  return (
    <div className="fixed bottom-[2em] left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/90">
      <div className="relative h-12 w-7 text-center rounded-full border-2 border-white">
        <span
          className="
            absolute top-2 left-[1.2em] h-2 w-1 -translate-x-1/2 rounded-full bg-white
            animate-[scroll_1.6s_ease-in-out_infinite]
          "
          style={{
            animationName: "scroll",
          }}
        />
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              opacity: 0;
              transform: translate(-50%, 0);
            }
            30% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translate(-50%, 16px);
            }
          }
        `}
      </style>
    </div>
  );
}
