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
  prizePool = "₹4,00,000+",
}: SponsorsProps) {
  return (
    <div
      className="w-full mx-auto flex flex-col items-center justify-center"
      style={{
        maxWidth: "60rem",
        padding: "0.75rem",
        paddingTop: "2rem",
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

      {/* Sponsors Grid */}
      <div
        className="w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
        }}
      >
        {/* Title sponsor */}
        <div
          className="sponsor-panel relative"
          style={{
            gridColumn: "1 / -1",
            background: "linear-gradient(135deg, #FFE105 0%, #FFD700 100%)",
            border: "0.25rem solid #000",
            borderRadius: "0.25rem",
            boxShadow:
              "0.375rem 0.375rem 0 rgba(0,0,0,0.3), inset -0.125rem -0.125rem 0 rgba(0,0,0,0.2)",
            transform: "rotate(-1deg)",
            minHeight: "12rem",
          }}
        >
          <div
            className="absolute bg-black text-white font-bold tracking-wider"
            style={{
              top: "-0.5rem",
              left: "-0.5rem",
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
              transform: "rotate(-3deg)",
              border: "0.125rem solid white",
            }}
          >
            TITLE SPONSOR
          </div>
          <div
            className="h-full flex items-center justify-center"
            style={{ padding: "1rem 2rem" }}
          >
            <div
              className="flex flex-row items-center justify-center"
              style={{ gap: "2rem" }}
            >
              {title.logo && (
                <img
                  src={title.logo}
                  alt={title.name}
                  style={{ maxHeight: "5rem", objectFit: "contain" }}
                />
              )}
              <span
                className="text-black font-black  tracking-tight"
                style={{
                  textShadow:
                    "0.125rem 0.125rem 0 rgba(255,255,255,0.5), -0.0625rem -0.0625rem 0 rgba(0,0,0,0.3)",
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(1.5rem, 5vw, 3rem)",
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
                "radial-gradient(circle, black 0.0625rem, transparent 0.0625rem)",
              backgroundSize: "0.5rem 0.5rem",
            }}
          />
        </div>

        {/* Prize Pool */}
        <div
          className="sponsor-panel relative"
          style={{
            gridColumn: "1 / -1",
            transform: "rotate(0.5deg)",
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              background: "linear-gradient(135deg, #50BAEA 0%, #1a8fc7 100%)",
              border: "0.25rem solid #000",
              borderRadius: "0.25rem",
              boxShadow: "0.375rem 0.375rem 0 rgba(0,0,0,0.3)",
              minHeight: "7rem",
              overflow: "hidden",
            }}
          >
            {/* Starburst top-right */}
            <div
              className="absolute pointer-events-none"
              style={{
                right: "-3.75rem",
                top: "-3.75rem",
                width: "17.5rem",
                height: "17.5rem",
                background: "rgba(255,255,255,0.12)",
                clipPath:
                  "polygon(0% 0%, 27% 24%, 28% 0%, 46% 24%, 60% 0%, 71% 28%, 99% 1%, 83% 30%, 99% 28%, 84% 40%, 100% 51%, 82% 60%, 100% 69%, 78% 73%, 100% 100%, 66% 79%, 61% 100%, 45% 78%, 33% 100%, 28% 81%, 0% 85%, 21% 65%, 0% 61%, 24% 47%, 0% 32%, 15% 28%)",
              }}
            />
            {/* Starburst bottom-left */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "-2.5rem",
                bottom: "-3.125rem",
                width: "11.25rem",
                height: "11.25rem",
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
                  "radial-gradient(circle, black 0.0625rem, transparent 0.0625rem)",
                backgroundSize: "0.5rem 0.5rem",
              }}
            />

            <div
              className="relative flex flex-col items-center justify-center text-center"
              style={{
                zIndex: 10,
                padding: "1rem 2rem",
                gap: "0.375rem",
              }}
            >
              <span
                className="font-black uppercase text-black leading-none"
                style={{
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(0.625rem, 1.8vw, 0.875rem)",
                  letterSpacing: "0.25em",
                  textShadow: "0.0625rem 0.0625rem 0 rgba(255,255,255,0.5)",
                }}
              >
                TOTAL PRIZE POOL
              </span>
              <span
                className="font-black text-black leading-none"
                style={{
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(2rem, 7vw, 5rem)",
                  textShadow:
                    "0.1875rem 0.1875rem 0 #fff, -0.125rem 0.125rem 0 #fff, -0.125rem -0.125rem 0 #fff, 0.125rem -0.125rem 0 #fff, 0.3125rem 0.3125rem 0 rgba(0,0,0,0.2)",
                  letterSpacing: "-0.01em",
                }}
              >
                {prizePool}
              </span>
              <span
                className="font-black uppercase text-black leading-none"
                style={{
                  fontFamily: '"Bangers", "Impact", sans-serif',
                  fontSize: "clamp(0.5rem, 1.3vw, 0.75rem)",
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
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
              transform: "rotate(3deg)",
              border: "0.125rem solid white",
              zIndex: 20,
            }}
          >
            PRIZE POOL
          </div>
        </div>

        {/* Prize Pool */}
        <div
          className="sponsor-panel relative"
          style={{
            gridColumn: "1 / -1",
            background: "linear-gradient(135deg, #DA100C 0%, #b00d0a 100%)",
            border: "0.25rem solid #000",
            borderRadius: "0.25rem",
            boxShadow: "0.25rem 0.25rem 0 rgba(0,0,0,0.25)",
            transform: "rotate(-0.5deg)",
            overflow: "hidden",
            minHeight: "5.5rem",
          }}
        >
          {/* Starburst right */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: "-2rem",
              top: "-2rem",
              width: "10rem",
              height: "10rem",
              background: "rgba(255,255,255,0.1)",
              clipPath:
                "polygon(0% 0%, 27% 24%, 28% 0%, 46% 24%, 60% 0%, 71% 28%, 99% 1%, 83% 30%, 99% 28%, 84% 40%, 100% 51%, 82% 60%, 100% 69%, 78% 73%, 100% 100%, 66% 79%, 61% 100%, 45% 78%, 33% 100%, 28% 81%, 0% 85%, 21% 65%, 0% 61%, 24% 47%, 0% 32%, 15% 28%)",
            }}
          />
          {/* Starburst left */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "-2rem",
              bottom: "-2rem",
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
              opacity: 0.05,
              backgroundImage:
                "radial-gradient(circle, black 0.0625rem, transparent 0.0625rem)",
              backgroundSize: "0.375rem 0.375rem",
            }}
          />

          <div
            className="relative flex flex-col items-center justify-center text-center"
            style={{
              zIndex: 10,
              padding: "1rem 2rem",
              gap: "0.375rem",
            }}
          >
            <span
              className="font-black uppercase text-white leading-none"
              style={{
                fontFamily: '"Bangers", "Impact", sans-serif',
                fontSize: "clamp(0.625rem, 1.8vw, 0.875rem)",
                letterSpacing: "0.25em",
                textShadow: "0.0625rem 0.0625rem 0 rgba(0,0,0,0.5)",
              }}
            >
              GOODIES WORTH
            </span>
            <span
              className="font-black text-white leading-none"
              style={{
                fontFamily: '"Bangers", "Impact", sans-serif',
                fontSize: "clamp(2rem, 7vw, 5rem)",
                textShadow:
                  "0.1875rem 0.1875rem 0 rgba(0,0,0,0.4), -0.125rem 0.125rem 0 rgba(0,0,0,0.2)",
                letterSpacing: "-0.01em",
              }}
            >
              ₹1,30,000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
