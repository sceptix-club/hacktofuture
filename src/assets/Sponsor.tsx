type Sponsor = {
  name: string;
  logo?: string;
};

type SponsorsProps = {
  title: Sponsor;
  platinum: Sponsor[];
  gold: Sponsor[];
  silver: Sponsor[];
  prizePool?: string;
};

export function SponsorsBento({
  title,
  platinum,
  gold,
  prizePool = "₹3,50,000",
}: SponsorsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-0 p-3 md:p-4 pt-0 pb-24 md:pb-6">
      {/* Title row */}
      <div className="sponsor-panel mb-3 md:mb-4">
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-3 md:gap-6">
          {/* SPONSORS heading */}
          <div
            className="inline-block relative px-2 shrink-0"
            style={{ transform: "rotate(-2deg)" }}
          >
            <h2
              className="text-white px-3 md:px-8 py-2 md:py-4 font-black leading-tight text-center"
              style={{
                textShadow: "2px 2px 0 #000, 4px 4px 0 rgba(0,0,0,0.3)",
                letterSpacing: "0.03em",
                fontFamily: "Dela Gothic One",
                WebkitTextStroke: "1.5px black",
                fontSize: "clamp(2rem, 6vw, 5.5rem)",
              }}
            >
              SPONSORS & REWARDS
            </h2>
          </div>
        </div>
      </div>

      {/* Sponsors Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {/* Title sponsor */}
        <div
          className="sponsor-panel col-span-2 md:row-span-2 relative min-h-[110px] md:min-h-0"
          style={{
            background: "linear-gradient(135deg, #FFE105 0%, #FFD700 100%)",
            border: "4px solid #000",
            borderRadius: "4px",
            boxShadow:
              "6px 6px 0 rgba(0,0,0,0.3), inset -2px -2px 0 rgba(0,0,0,0.2)",
            transform: "rotate(-1deg)",
          }}
        >
          <div className="absolute -top-2 -left-2 bg-black text-white px-3 py-1 font-bold text-xs tracking-wider rotate-[-3deg] border-2 border-white">
            TITLE SPONSOR
          </div>
          <div className="h-full flex items-center justify-center p-4 md:p-8">
            <div className="text-center">
              {title.logo ? (
                <img
                  src={title.logo}
                  className="max-h-16 md:max-h-24 object-contain"
                  alt={title.name}
                />
              ) : (
                <span
                  className="text-black font-black tracking-tight"
                  style={{
                    textShadow:
                      "2px 2px 0 rgba(255,255,255,0.5), -1px -1px 0 rgba(0,0,0,0.3)",
                    fontFamily: '"Bangers", "Impact", sans-serif',
                    fontSize: "clamp(1.5rem, 6vw, 3rem)",
                  }}
                >
                  {title.name}
                </span>
              )}
            </div>
          </div>
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, black 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />
        </div>

        {/* Prize Pool — large wide panel */}
        <div
          className="sponsor-panel col-span-2 relative"
          style={{
            transform: "rotate(0.5deg)",
          }}
        >
          {/* Inner card with overflow hidden */}
          <div
            className="relative w-full h-full"
            style={{
              background: "linear-gradient(135deg, #50BAEA 0%, #1a8fc7 100%)",
              border: "4px solid #000",
              borderRadius: "4px",
              boxShadow: "6px 6px 0 rgba(0,0,0,0.3)",
              minHeight: "110px",
              overflow: "hidden",
            }}
          >
            {/* Starburst decorative background shape */}
            <div
              className="absolute pointer-events-none"
              style={{
                right: "-60px",
                top: "-60px",
                width: "280px",
                height: "280px",
                background: "rgba(255,255,255,0.12)",
                clipPath:
                  "polygon(0% 0%, 27% 24%, 28% 0%, 46% 24%, 60% 0%, 71% 28%, 99% 1%, 83% 30%, 99% 28%, 84% 40%, 100% 51%, 82% 60%, 100% 69%, 78% 73%, 100% 100%, 66% 79%, 61% 100%, 45% 78%, 33% 100%, 28% 81%, 0% 85%, 21% 65%, 0% 61%, 24% 47%, 0% 32%, 15% 28%)",
              }}
            />
            {/* Second starburst bottom-left */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "-40px",
                bottom: "-50px",
                width: "180px",
                height: "180px",
                background: "rgba(255,255,255,0.08)",
                clipPath:
                  "polygon(0% 0%, 27% 24%, 28% 0%, 46% 24%, 60% 0%, 71% 28%, 99% 1%, 83% 30%, 99% 28%, 84% 40%, 100% 51%, 82% 60%, 100% 69%, 78% 73%, 100% 100%, 66% 79%, 61% 100%, 45% 78%, 33% 100%, 28% 81%, 0% 85%, 21% 65%, 0% 61%, 24% 47%, 0% 32%, 15% 28%)",
              }}
            />
            {/* Halftone dots overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, black 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4 md:p-8 gap-1.5 md:gap-2">
              <span
                className="font-black uppercase tracking-widest text-black leading-none"
                style={{
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(0.7rem, 2vw, 1rem)",
                  letterSpacing: "0.25em",
                  textShadow: "1px 1px 0 rgba(255,255,255,0.5)",
                }}
              >
                TOTAL PRIZE POOL
              </span>
              <span
                className="font-black text-black leading-none"
                style={{
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(2rem, 8vw, 5.5rem)",
                  textShadow:
                    "3px 3px 0 #fff, -2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, 5px 5px 0 rgba(0,0,0,0.2)",
                  letterSpacing: "-0.01em",
                }}
              >
                {prizePool}
              </span>
              <span
                className="font-black uppercase text-black opacity-70"
                style={{
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
                  letterSpacing: "0.2em",
                }}
              >
                UP FOR GRABS
              </span>
            </div>
          </div>

          <div className="absolute -top-2 -right-2 bg-black text-white px-3 py-1 font-bold text-xs tracking-wider rotate-[3deg] border-2 border-white z-20">
            PRIZE POOL
          </div>
        </div>

        {/* Platinum sponsors */}
        <div
          className="sponsor-panel col-span-1 relative"
          style={{
            background: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)",
            border: "4px solid #000",
            borderRadius: "4px",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.25)",
            transform: "rotate(-0.5deg)",
          }}
        >
          <div className="absolute -top-2 -left-2 bg-black text-white px-2 md:px-3 py-1 font-bold text-xs tracking-wider rotate-[-2deg] border-2 border-white">
            PLATINUM
          </div>
          <div className="p-2 md:p-4 pt-5 md:pt-7">
            <div className="space-y-1.5 md:space-y-2.5">
              {platinum.map((s, i) => (
                <div
                  key={i}
                  className="h-10 md:h-12 flex items-center justify-center bg-white border-2 md:border-3 border-black rounded p-2"
                  style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}
                >
                  {s.logo ? (
                    <img
                      src={s.logo}
                      className="max-h-6 md:max-h-7 object-contain"
                      alt={s.name}
                    />
                  ) : (
                    <span className="text-black font-bold text-xs uppercase tracking-wide text-center">
                      {s.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, black 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          />
        </div>

        {/* Gold sponsors */}
        <div
          className="sponsor-panel col-span-1 relative"
          style={{
            background: "linear-gradient(135deg, #DA100C 0%, #DA100B 100%)",
            border: "4px solid #000",
            borderRadius: "4px",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.25)",
            transform: "rotate(0.5deg)",
          }}
        >
          <div className="absolute -top-2 -right-2 bg-black text-white px-2 md:px-3 py-1 font-bold text-xs tracking-wider rotate-[2deg] border-2 border-white">
            GOLD
          </div>
          <div className="p-2 md:p-4 pt-5 md:pt-7">
            <div className="space-y-1.5 md:space-y-2.5">
              {gold.map((s, i) => (
                <div
                  key={i}
                  className="h-10 md:h-12 flex items-center justify-center bg-white border-2 md:border-3 border-black rounded p-2"
                  style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}
                >
                  {s.logo ? (
                    <img
                      src={s.logo}
                      className="max-h-6 md:max-h-7 object-contain"
                      alt={s.name}
                    />
                  ) : (
                    <span className="text-black font-bold text-xs uppercase tracking-wide text-center">
                      {s.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, black 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
