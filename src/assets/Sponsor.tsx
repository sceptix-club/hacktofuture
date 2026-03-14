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

const cardHeight = "clamp(12rem, 34vw, 18rem)";

export function SponsorsBento({
  title,
  prizePool = "₹4,00,000+",
}: SponsorsProps) {
  return (
    <div
      className="w-full mx-auto flex flex-col items-center justify-center"
      style={{
        maxWidth: "75rem",
        padding: "0.75rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
      }}
    >
      {/* Title row */}
      <div
        className="sponsor-panel"
        style={{ marginBottom: "0.75rem", width: "100%" }}
      >
        <div
          className="flex flex-col items-center md:flex-row md:items-center md:justify-center"
          style={{ gap: "0.75rem" }}
        >
          {/* SPONSORS heading */}
        </div>
      </div>

      {/* Sponsors Grid - Responsive layout */}
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2"
        style={{
          gap: "0.75rem",
        }}
      >
        {/* Title sponsor - Left column on desktop, spans both rows */}
        <div
          className="sponsor-panel relative"
          style={{
            background: "linear-gradient(135deg, #FFE105 0%, #FFD700 100%)",
            border: "0.2rem solid #000",
            borderRadius: "0.5rem",
            boxShadow:
              "0.3rem 0.3rem 0 rgba(0,0,0,0.3), inset -0.1rem -0.1rem 0 rgba(0,0,0,0.2)",
            transform: "rotate(-1deg)",
            height: cardHeight,
          }}
        >
          <div
            className="absolute bg-black text-white font-bold tracking-wider"
            style={{
              top: "-0.5rem",
              left: "-0.5rem",
              padding: "0.25rem 0.6rem",
              fontSize: "0.65rem",
              transform: "rotate(-3deg)",
              border: "0.1rem solid white",
              zIndex: 20,
            }}
          >
            TITLE SPONSOR
          </div>
          <div
            className="h-full flex items-center justify-center"
            style={{ padding: "1.5rem 1.5rem" }}
          >
            <div
              className="flex flex-col items-center justify-center"
              style={{ gap: "1rem" }}
            >
              {title.logo && (
                <img
                  src={title.logo}
                  alt={title.name}
                  style={{
                    maxHeight: "5rem",
                    objectFit: "contain",
                    zIndex: 10,
                  }}
                  className="md:!max-h-[8rem]"
                />
              )}
              <span
                className="text-black font-black tracking-tight text-center"
                style={{
                  textShadow:
                    "0.1rem 0.1rem 0 rgba(255,255,255,0.5), -0.05rem -0.05rem 0 rgba(0,0,0,0.3)",
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(1.5rem, 5vw, 4rem)",
                }}
              >
                {title.name}
              </span>
            </div>
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.1,
              backgroundImage:
                "radial-gradient(circle, black 0.06rem, transparent 0.06rem)",
              backgroundSize: "0.5rem 0.5rem",
            }}
          />
        </div>

        {/* Prize Pool - Right column top on desktop */}
        <div
          className="sponsor-panel relative"
          style={{
            transform: "rotate(0.5deg)",
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              background: "linear-gradient(135deg, #50BAEA 0%, #1a8fc7 100%)",
              border: "0.2rem solid #000",
              borderRadius: "0.5rem",
              boxShadow: "0.3rem 0.3rem 0 rgba(0,0,0,0.3)",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* Starburst top-right */}
            <div
              className="absolute pointer-events-none"
              style={{
                right: "-3rem",
                top: "-3rem",
                width: "10rem",
                height: "10rem",
                background: "rgba(255,255,255,0.12)",
                clipPath:
                  "polygon(0% 0%, 27% 24%, 28% 0%, 46% 24%, 60% 0%, 71% 28%, 99% 1%, 83% 30%, 99% 28%, 84% 40%, 100% 51%, 82% 60%, 100% 69%, 78% 73%, 100% 100%, 66% 79%, 61% 100%, 45% 78%, 33% 100%, 28% 81%, 0% 85%, 21% 65%, 0% 61%, 24% 47%, 0% 32%, 15% 28%)",
              }}
            />
            {/* Starburst bottom-left */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "-2rem",
                bottom: "-2.5rem",
                width: "8rem",
                height: "8rem",
                background: "rgba(255,255,255,0.08)",
                clipPath:
                  "polygon(0% 0%, 27% 24%, 28% 0%, 46% 24%, 60% 0%, 71% 28%, 99% 1%, 83% 30%, 99% 28%, 84% 40%, 100% 51%, 82% 60%, 100% 69%, 78% 73%, 100% 100%, 66% 79%, 61% 100%, 45% 78%, 33% 100%, 28% 81%, 0% 85%, 21% 65%, 0% 61%, 24% 47%, 0% 32%, 15% 28%)",
              }}
            />
            {/* Halftone */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.1,
                backgroundImage:
                  "radial-gradient(circle, black 0.06rem, transparent 0.06rem)",
                backgroundSize: "0.5rem 0.5rem",
              }}
            />

            <div
              className="relative flex flex-col items-center justify-center text-center h-full"
              style={{
                zIndex: 10,
                padding: "1rem 1.25rem",
                gap: "0.3rem",
              }}
            >
              <span
                className="font-black uppercase text-black leading-none"
                style={{
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(0.55rem, 1.8vw, 1rem)",
                  letterSpacing: "0.25em",
                  textShadow: "0.05rem 0.05rem 0 rgba(255,255,255,0.5)",
                }}
              >
                TOTAL PRIZES WORTH
              </span>
              <span
                className="font-black text-black leading-none"
                style={{
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(1.6rem, 5vw, 4rem)",
                  textShadow:
                    "0.15rem 0.15rem 0 #fff, -0.1rem 0.1rem 0 #fff, -0.1rem -0.1rem 0 #fff, 0.1rem -0.1rem 0 #fff, 0.25rem 0.25rem 0 rgba(0,0,0,0.2)",
                  letterSpacing: "-0.01em",
                }}
              >
                {prizePool}
              </span>
              <span
                className="font-black uppercase text-black leading-none"
                style={{
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(0.45rem, 1.2vw, 0.85rem)",
                  letterSpacing: "0.2em",
                  opacity: 0.7,
                }}
              >
                UP FOR GRABS
              </span>
            </div>
          </div>

          <div
            className="absolute bg-black text-white font-bold tracking-wider"
            style={{
              top: "-0.5rem",
              right: "-0.5rem",
              padding: "0.25rem 0.6rem",
              fontSize: "0.65rem",
              transform: "rotate(3deg)",
              border: "0.1rem solid white",
              zIndex: 20,
            }}
          >
            PRIZES
          </div>
        </div>

        {/* Goodies - Right column bottom on desktop */}
      </div>
    </div>
  );
}