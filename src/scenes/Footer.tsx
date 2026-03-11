import { forwardRef } from "react";
import { Instagram, Linkedin, Github, Youtube } from "lucide-react";

// Discord icon
const DiscordIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
    <path d="M7.5 7.5c1.4-.5 2.9-.8 4.5-.8s3.1.3 4.5.8" />
    <path d="M7.5 16.5c1.4.5 2.9.8 4.5.8s3.1-.3 4.5-.8" />
    <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5" />
    <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.476-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5" />
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
          bottom: "8%",
          left: "4%",
          width: 90,
          height: 90,
          backgroundImage:
            "radial-gradient(circle, rgba(255,225,5,0.35) 2px, transparent 2px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Corner panel frames — same as CTA */}
      <div className="absolute top-4 left-4 w-20 h-20 md:w-28 md:h-28 comic-panel-border rounded-sm pointer-events-none" />
      <div className="absolute top-4 right-4 w-16 h-24 md:w-24 md:h-36 comic-panel-border rounded-sm pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-24 h-16 md:w-36 md:h-24 comic-panel-border rounded-sm pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-20 h-20 md:w-28 md:h-28 comic-panel-border rounded-sm pointer-events-none" />

      {/* pb-20 on mobile clears the floating navbar */}
      <div className="relative z-10 flex flex-col min-h-full overflow-y-auto justify-center px-4 md:px-12 lg:px-20 pt-4 pb-20 md:py-8">
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
