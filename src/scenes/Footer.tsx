import { forwardRef } from "react";
import {
  Instagram,
  Linkedin,
  Github,
  Youtube,
} from "lucide-react";


// Discord icon 
const DiscordIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561 19.9312 19.9312 0 005.9932 3.0294.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057 13.1073 13.1073 0 01-1.872-.8923.0766.0766 0 01-.0076-.127 10.2332 10.2332 0 00.3722-.2917.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3731.2927a.0766.0766 0 01-.0066.1276 12.2986 12.2986 0 01-1.8731.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286 19.8975 19.8975 0 006.0023-3.0294.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
  </svg>
);

const DOT_BG = `url("data:image/svg+xml;utf8,<svg width='100' height='100' transform='rotate(25)' opacity='0.12' version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='%23000'><circle cx='25' cy='25' r='7'/><circle cx='75' cy='75' r='7'/><circle cx='75' cy='25' r='7'/><circle cx='25' cy='75' r='7'/></g></svg>"), #fff`;

const socialLinks = [
  { href: "#", label: "Instagram", icon: Instagram },
 
  { href: "#", label: "Discord", icon: DiscordIcon },
  { href: "#", label: "LinkedIn", icon: Linkedin },
  { href: "#", label: "GitHub", icon: Github },
  { href: "#", label: "YouTube", icon: Youtube },
];

const contactLinks = [
  { href: "mailto:hacktofuture@gmail.com", label: "hacktofuture@gmail.com" },
  { href: "tel:+919876543210", label: "+91 98765 43210" },
  { href: "tel:+919876543211", label: "+91 98765 43211" },
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
                    A national-level hackathon hosted by The Sceptix Club at
                    St Joseph Engineering College — building tomorrow's
                    solutions, today.
                  </p>
                  {/* Social icons */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-0.5">
                    {socialLinks.map(({ href, label, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="transition-colors"
                        style={{ color: "#555" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color = "#000")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color = "#555")
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
              style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", letterSpacing: "0.05em" }}
            >
              © 2026 HACK TO FUTURE. ALL RIGHTS RESERVED.
            </span>
            <span
              className="comic-sans text-white/70 text-center sm:text-right"
              style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", letterSpacing: "0.05em" }}
            >
              BUILT BY{" "}
              <a
                href="#"
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