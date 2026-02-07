type Sponsor = {
  name: string;
  logo?: string;
};

type SponsorsProps = {
  title: Sponsor;
  platinum: Sponsor[];
  gold: Sponsor[];
  silver: Sponsor[];
};

export function SponsorsBento({ title, platinum, gold, silver }: SponsorsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-4 md:mt-8 p-3 md:p-4">
      <div className="sponsor-panel text-center mb-6 md:mb-8">
        <div
          className="inline-block relative px-2"
          style={{
            transform: 'rotate(-2deg)',
          }}
        >
          <h2
            className="text-white px-3 md:px-8 py-2 md:py-4 font-black leading-tight"
            style={{
              textShadow: '2px 2px 0 #000, 4px 4px 0 rgba(0,0,0,0.3)',
              letterSpacing: '0.03em',
              fontFamily: 'Dela Gothic One',
              WebkitTextStroke: '1.5px black',
              fontSize: "clamp(2rem, 10vw, 6rem)"
            }}
          >
            SPONSORS
          </h2>
        </div>
      </div>

      {/* Sponsors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {/* Title sponsor — big comic panel */}
        <div
          className="sponsor-panel md:col-span-2 md:row-span-2 relative min-h-[200px] md:min-h-0"
          style={{
            background: 'linear-gradient(135deg, #FFE105 0%, #FFD700 100%)',
            border: '4px solid #000',
            borderRadius: '4px',
            boxShadow: '6px 6px 0 rgba(0,0,0,0.3), inset -2px -2px 0 rgba(0,0,0,0.2)',
            transform: 'rotate(-1deg)',
          }}
        >
          <div className="absolute -top-2 -left-2 bg-black text-white px-3 py-1 font-bold text-xs tracking-wider rotate-[-3deg] border-2 border-white">
            TITLE SPONSOR
          </div>
          <div className="h-full flex items-center justify-center p-6 md:p-8">
            <div className="text-center">
              {title.logo ? (
                <img src={title.logo} className="max-h-16 md:max-h-24 object-contain" alt={title.name} />
              ) : (
                <span
                  className="text-black font-black tracking-tight"
                  style={{
                    textShadow: '2px 2px 0 rgba(255,255,255,0.5), -1px -1px 0 rgba(0,0,0,0.3)',
                    fontFamily: '"Bangers", "Impact", sans-serif',
                    fontSize: "clamp(1.5rem, 6vw, 3rem)"
                  }}
                >
                  {title.name}
                </span>
              )}
            </div>
          </div>
          {/* Comic dots pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }}
          />
        </div>

        {/* Platinum sponsors */}
        <div
          className="sponsor-panel md:col-span-2 relative"
          style={{
            background: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)',
            border: '4px solid #000',
            borderRadius: '4px',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.25)',
            transform: 'rotate(0.5deg)',
          }}
        >
          <div className="absolute -top-2 -right-2 bg-black text-white px-2 md:px-3 py-1 font-bold text-xs tracking-wider rotate-[2deg] border-2 border-white">
            PLATINUM
          </div>
          <div className="p-4 md:p-5 pt-7 md:pt-8">
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {platinum.map((s, i) => (
                <div
                  key={i}
                  className="h-14 md:h-16 flex items-center justify-center bg-white border-2 md:border-3 border-black rounded p-2"
                  style={{
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  {s.logo ? (
                    <img src={s.logo} className="max-h-8 md:max-h-10 object-contain" alt={s.name} />
                  ) : (
                    <span className="text-black font-bold text-xs md:text-sm uppercase tracking-wide text-center">
                      {s.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Comic halftone */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
              backgroundSize: '6px 6px',
            }}
          />
        </div>

        {/* Gold sponsors */}
        <div
          className="sponsor-panel md:col-span-1 relative"
          style={{
            background: 'linear-gradient(135deg, #DA100C 0%, #DA100B 100%)',
            border: '4px solid #000',
            borderRadius: '4px',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.25)',
            transform: 'rotate(-0.5deg)',
          }}
        >
          <div className="absolute -top-2 -left-2 bg-black text-white px-2 md:px-3 py-1 font-bold text-xs tracking-wider rotate-[-2deg] border-2 border-white">
            GOLD
          </div>
          <div className="p-3 md:p-4 pt-6 md:pt-7">
            <div className="space-y-2 md:space-y-2.5">
              {gold.map((s, i) => (
                <div
                  key={i}
                  className="h-10 md:h-12 flex items-center justify-center bg-white border-2 md:border-3 border-black rounded p-2"
                  style={{
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  {s.logo ? (
                    <img src={s.logo} className="max-h-6 md:max-h-7 object-contain" alt={s.name} />
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
              backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
              backgroundSize: '6px 6px',
            }}
          />
        </div>

        {/* Silver sponsors */}
        <div
          className="sponsor-panel md:col-span-1 relative"
          style={{
            background: 'linear-gradient(135deg, #B8B8B8 0%, #909090 100%)',
            border: '4px solid #000',
            borderRadius: '4px',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.25)',
            transform: 'rotate(1deg)',
          }}
        >
          <div className="absolute -top-2 -right-2 bg-black text-white px-2 md:px-3 py-1 font-bold text-xs tracking-wider rotate-[3deg] border-2 border-white">
            SILVER
          </div>
          <div className="p-3 md:p-4 pt-6 md:pt-7">
            <div className="space-y-2 md:space-y-2.5">
              {silver.map((s, i) => (
                <div
                  key={i}
                  className="h-9 md:h-10 flex items-center justify-center bg-white border-2 md:border-3 border-black rounded p-2"
                  style={{
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  {s.logo ? (
                    <img src={s.logo} className="max-h-5 md:max-h-6 object-contain" alt={s.name} />
                  ) : (
                    <span className="text-black font-semibold text-xs uppercase tracking-wide text-center">
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
              backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
              backgroundSize: '6px 6px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
