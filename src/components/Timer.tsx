import { useState, useEffect } from "react"
// import "@/styles/Timer.css" //TODO: figure out how to fix this
import "../styles/Timer.css";

export default function Timer() {

	const [timer, setTimer] = useState({seconds: 0, minutes: 0, hours: 0, days:0})
	
	//TODO: make sure that the timezone will always be IST no matter where the code is running
	const HtfDate= Date.parse("February 18, 2026 18:36:20")

	function setTimeLeft() {
		const difference = HtfDate - Date.now();
		if (difference <= 0) 
			return setTimer({ days:0, hours:0, minutes:0, seconds:0});
		const total   = Math.floor(difference / 1000);
		const seconds = total % 60;
		const minutes = Math.floor(total / 60) % 60;
		const hours   = Math.floor(total / 3600) % 24;
		const days    = Math.floor(total / 86400);
		setTimer({ days, hours, minutes, seconds});
	}


	useEffect(()=>{
		const tick = () => setTimeLeft();
		const id = setInterval(tick, 1000)
		return () => clearInterval(id)
	})

  return (
	  <div className="timer-wrap">
		  <div className="timer">
			  <div className="time-block">
				  <div className="digits">{timer.days > 9 ?"":"0"}{timer.days}</div>
				  <div className="time-unit">days</div>
			  </div>
			  <div className="time-block">
				  <div className="digits">{timer.hours > 9 ?"":"0"}{timer.hours}</div>
				  <div className="time-unit">hours</div>
			  </div>
			  <div className="time-block">
				  <div className="digits">{timer.minutes > 9 ?"":"0"}{timer.minutes}</div>
				  <div className="time-unit">minutes</div>
			  </div>
			  <div className="time-block">
				  <div className="digits">{timer.seconds > 9 ?"":"0"}{timer.seconds}</div>
				  <div className="time-unit">seconds</div>
			  </div>
		  </div>
	  </div>
  )
}

