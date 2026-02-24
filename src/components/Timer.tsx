import { useState, useEffect } from "react";
import "../styles/Timer.css";

export default function Timer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const HtfDate = Date.parse("2026-04-15T18:36:20+05:30");

  function setTimeLeft() {
    const difference = HtfDate - Date.now();
    if (difference <= 0)
      return setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const total = Math.floor(difference / 1000);
    const seconds = total % 60;
    const minutes = Math.floor(total / 60) % 60;
    const hours = Math.floor(total / 3600) % 24;
    const days = Math.floor(total / 86400);
    setTimer({ days, hours, minutes, seconds });
  }

  useEffect(() => {
    setTimeLeft();
    const id = setInterval(() => setTimeLeft(), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    /* outer wrapper centers in whatever container TextContent gives it */
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p
        className="comic-sans md:mt-16 uppercase tracking-widest text-white/60 mb-2"
        style={{ fontSize: "clamp(0.75rem, 1.4vw, 1rem)" }}
      >
        Countdown to HTF 4.0
      </p>

      {/* comic-dialog background lives here */}
      <div className="timer-wrap">
        <div className="timer">
          {[
            { value: timer.days, label: "days" },
            { value: timer.hours, label: "hours" },
            { value: timer.minutes, label: "minutes" },
            { value: timer.seconds, label: "seconds" },
          ].map(({ value, label }) => (
            <div className="time-block comic-sans" key={label}>
              <div className="digits">
                {value > 9 ? "" : "0"}
                {value}
              </div>
              <div className="time-unit">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
