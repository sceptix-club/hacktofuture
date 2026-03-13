import { forwardRef } from "react";
import { Instagram, Linkedin, Github, Youtube } from "lucide-react";

const sponsorLogos = [
  {
    label: "St Joseph Engineering College",
    logoName: "/sjec-gold.png",
    website: "https://www.sjec.ac.in/",
  },
  {
    label: "The Sceptix Club",
    logoName: "/sceptix-logo.png",
    website: "https://sceptix.in/",
  },
  {
    label: "EGDK India",
    logoName: "/sponsors/egdk.png",
    website: "https://egsoftware.com/",
  },
];
// Discord icon
const DiscordIcon = ({
  size = 32,
  strokeWidth = 1.75,
}: {
  size?: number;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "inline-block" }}
  >
    <path
      d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);
const DOT_BG = `url("data:image/svg+xml;utf8,<svg width='100' height='100' transform='rotate(25)' opacity='0.12' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23000'><circle cx='25' cy='25' r='7'/><circle cx='75' cy='75' r='7'/><circle cx='75' cy='25' r='7'/><circle cx='25' cy='75' r='7'/></g></svg>"), #fff`;

const socialLinks = [
  {
    href: "https://www.instagram.com/hack_to_future?igsh=anhuZzR0N2Z1dHVv",
    label: "Instagram",
    icon: Instagram,
  },

  {
    href: "https://discord.gg/NBF5uF9jDz",
    label: "Discord",
    icon: DiscordIcon,
  },
  {
    href: "https://www.linkedin.com/company/hack-to-future/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "https://github.com/sceptix-club", label: "GitHub", icon: Github },
  {
    href: "https://youtube.com/@hack_to_future?si=PBM78Nwirkfpe0mN",
    label: "YouTube",
    icon: Youtube,
  },
];

const contactLinks = [
  { href: "mailto:hacktofuture@sjec.ac.in", label: "hacktofuture@sjec.ac.in" },
];

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col w-full"
      style={{
        transform: "translateY(100%)",
        willChange: "transform",
        overflow: "hidden",
        height: "100%",
        minHeight: "-webkit-fill-available",
      }}
    >
      {/* Comic dot cluster — top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "4%",
          right: "5%",
          width: 110,
          height: 110,
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.18) 2px, transparent 2px)",
          backgroundSize: "8px 8px",
        }}
      />
      {/* Comic dot cluster — bottom-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          left: "4%",
          width: 90,
          height: 90,
          backgroundImage:
            "radial-gradient(circle, rgba(255,225,5,0.35) 2px, transparent 2px)",
          backgroundSize: "8px 8px",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          right: "4%",
          width: 90,
          height: 90,
          backgroundImage:
            "radial-gradient(circle, rgba(255,225,5,0.35) 2px, transparent 2px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Corner panel frames — same as CTA */}
      <div className="absolute top-4 left-4 w-40 h-24 md:w-68 md:h-36 comic-panel-border rounded-sm pointer-events-none" />
      <div className="absolute top-4 right-4 w-20 h-32 md:w-28 md:h-44 comic-panel-border rounded-sm pointer-events-none" />

      {/* pb-20 on mobile clears the floating navbar */}
      <div className="relative z-10 flex flex-col min-h-full overflow-y-auto justify-center px-4 md:px-12 lg:px-20 pt-4 pb-5 md:py-8">
        {/* Main comic card */}
        <div
          className="w-full relative"
          style={{
            background: DOT_BG,
            backgroundSize: "14px 14px, 100% 100%",
            border: "0.3rem solid #000",
            boxShadow: "6px 6px 0 #000",
          }}
        >
          {/* Tri-colour accent bar */}
          <div className="flex w-full" style={{ height: "6px" }}>
            <div className="flex-1" style={{ background: "#DA100C" }} />
            <div className="flex-1" style={{ background: "#FFE105" }} />
            <div className="flex-1" style={{ background: "#50BAEA" }} />
          </div>

          {/* Card body */}
          <div className="p-4 sm:p-6 md:p-10 lg:p-12">
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
              {/* Top: Branding + Link columns — equal 3 cols on md+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {/* Branding */}
                <div className="flex flex-col gap-2 sm:gap-3">
                  <h2
                    className="hero-title font-bold tracking-tight"
                    style={{
                      fontSize: "clamp(1.1rem, 4vw, 1.8rem)",
                      color: "#111",
                      textShadow: "2px 2px 0 rgba(0,0,0,0.1)",
                    }}
                  >
                    Hack to Future 4.0
                  </h2>
                  <p
                    className="comic-sans leading-relaxed"
                    style={{
                      fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                      color: "#444",
                    }}
                  >
                    A national-level hackathon hosted by The Sceptix Club at St
                    Joseph Engineering College — building tomorrow's solutions,
                    today.
                  </p>
                  {/* Social icons */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-0.5">
                    {socialLinks.map(({ href, label, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="transition-colors"
                        style={{ color: "#555" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "#000")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "#555")
                        }
                      >
                        <Icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Queries & Contact */}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <h3
                    className="hero-title font-bold"
                    style={{
                      fontSize: "clamp(0.6rem, 1.4vw, 0.8rem)",
                      color: "#111",
                      letterSpacing: "0.04em",
                    }}
                  >
                    QUERIES & CONTACT
                  </h3>
                  <div className="flex flex-col gap-1 sm:gap-1.5 comic-sans">
                    {contactLinks.map(({ href, label }) => (
                      <a
                        key={href}
                        href={href}
                        className="transition-colors break-all"
                        style={{
                          fontSize: "clamp(0.65rem, 1.3vw, 0.82rem)",
                          color: "#555",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "#000")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "#555")
                        }
                      >
                        {label}
                      </a>
                    ))}
                  </div>

                  {/* Supported by section */}
                  <div className="flex flex-col gap-2 mt-2">
                    <h4
                      className="hero-title font-bold"
                      style={{
                        fontSize: "clamp(0.6rem, 1.4vw, 0.8rem)",
                        color: "#111",
                        letterSpacing: "0.04em",
                      }}
                    >
                      SUPPORTED BY
                    </h4>
                    <div className="flex flex-row gap-2 sm:gap-3 flex-wrap items-center">
                      {sponsorLogos.map(({ label, logoName, website }) => (
                        <a
                          key={label}
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="transition-opacity hover:opacity-75 text-black/80"
                        >
                          <img
                            src={`${logoName}`}
                            style={{
                              height: "clamp(1.5rem, 3vw, 2.5rem)",
                              objectFit: "contain",
                            }}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Venue — full-width on mobile */}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <h3
                    className="hero-title font-bold"
                    style={{
                      fontSize: "clamp(0.6rem, 1.4vw, 0.8rem)",
                      color: "#111",
                      letterSpacing: "0.04em",
                    }}
                  >
                    VENUE
                  </h3>
                  <div className="flex flex-col gap-1 sm:gap-1.5 comic-sans">
                    <span
                      style={{
                        fontSize: "clamp(0.65rem, 1.3vw, 0.82rem)",
                        color: "#555",
                        lineHeight: 1.5,
                      }}
                    >
                      St Joseph Engineering College, Vamanjoor, Mangaluru,
                      Karnataka 575028
                    </span>
                    <a
                      href="https://maps.google.com/?q=St+Joseph+Engineering+College+Mangaluru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors underline underline-offset-2"
                      style={{
                        fontSize: "clamp(0.65rem, 1.3vw, 0.82rem)",
                        color: "#555",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#000")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#555")
                      }
                    >
                      View on Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar — black strip like the CTA banner */}
          <div
            className="flex flex-col sm:flex-row justify-between items-center gap-1 px-4 sm:px-6 md:px-10 lg:px-12 py-2.5 sm:py-3"
            style={{ background: "#000", borderTop: "0.25rem solid #000" }}
          >
            <span
              className="comic-sans text-white/70 text-center sm:text-left"
              style={{
                fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
                letterSpacing: "0.05em",
              }}
            >
              © 2026 HACK TO FUTURE. ALL RIGHTS RESERVED.
            </span>
            <span
              className="comic-sans text-white/70 text-center sm:text-right"
              style={{
                fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
                letterSpacing: "0.05em",
              }}
            >
              BUILT BY{" "}
              <a
                href="https://sceptix.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#FFE105] transition-colors underline underline-offset-2"
              >
                THE SCEPTIX CLUB
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
