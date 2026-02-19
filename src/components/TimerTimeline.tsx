import { useState, useEffect, useRef } from "react"
// import "@/styles/Timer.css" //TODO: figure out how to fix this
import "../styles/Timer.css";
import "../styles/TimerTimeline.css";
import {gsap} from "gsap";

function Timer() {

	const [timer, setTimer] = useState({ seconds: 0, minutes: 0, hours: 0, days: 0 })

	//TODO: make sure that the timezone will always be IST no matter where the code is running
	const HtfDate = Date.parse("February 18, 2026 18:36:20")

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
		const tick = () => setTimeLeft();
		const id = setInterval(tick, 1000)
		return () => clearInterval(id)
	})

	return (
		<div className="timer-wrap">
			<div className="timer">
				<div className="time-block">
					<div className="digits">{timer.days > 9 ? "" : "0"}{timer.days}</div>
					<div className="time-unit">days</div>
				</div>
				<div className="time-block">
					<div className="digits">{timer.hours > 9 ? "" : "0"}{timer.hours}</div>
					<div className="time-unit">hours</div>
				</div>
				<div className="time-block">
					<div className="digits">{timer.minutes > 9 ? "" : "0"}{timer.minutes}</div>
					<div className="time-unit">minutes</div>
				</div>
				<div className="time-block">
					<div className="digits">{timer.seconds > 9 ? "" : "0"}{timer.seconds}</div>
					<div className="time-unit">seconds</div>
				</div>
			</div>
		</div>
	)
}

function Timeline() {

	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const peek = 32
	const [currentCard, setCurrentCard] = useState(0)

	const originalPos = [
		{ x: 0, y: 0, rotation: 0, scale: 1, zIndex: 30 },
		{ x: -peek, y: 4, rotation: -2, scale: 0.97, zIndex: 20 },
		{ x: peek / 3, y: 4 + peek, rotation: 2, scale: 0.97, zIndex: 10 },
		{ x: peek, y: 4 + peek / 4, rotation: -1, scale: 0.97, zIndex: 10 },
	];

	const fanned = { x: -260, y: 20, rotation: -18, scale: 1, zIndex: 20 }

	//TODO: change the grid-rows depending on the number of events within a card

	const cards = [
		[
			{
				time: "3:00AM",
				event: "Dinner"
			},
			{
				time: "5:00AM",
				event: "Dinner"
			},
			{
				time: "15:00AM",
				event: "Toilet"
			},
			{
				time: "15:00AM",
				event: "Toilet"
			},
		],
		[
			{
				time: "3:00AM",
				event: "coombaya"
			},
			{
				time: "5:00AM",
				event: "coombaya"
			},
			{
				time: "15:00AM",
				event: "lgima"
			},
			{
				time: "15:00AM",
				event: "lgima"
			},
		]
	]
	let rowCount = Array(cards.length).fill(null).map((_, i) => cards[i].length / 2)

	useEffect(() => {
		cardRefs.current.forEach((card, i) => {
			gsap.set(card, originalPos[i]);
		});
	});

	//when > is clicked, the current card should be moved in a certain way
	//when < is clicked, the previous card should be moved in a certain way

	const flipForward = () => {
		//fan the current card
		console.log("click registered")
		gsap.to(cardRefs[currentCard], {
			...fanned[currentCard],
			duration: 0.6,
			ease: "back.out(1.4)",
			delay: 0.05,
		})
		setCurrentCard(currentCard => currentCard + 1)
	}
	const flipBackward = () => {
		console.log("click registered")
		setCurrentCard(currentCard => currentCard - 1)
	}

	//error detecting useEffect
	useEffect(() => {
		console.log("val of rowCount is ", rowCount)
		// if (originalPos.length != cards.length) {
		// 	console.error("CARDS COUNT IS INVALID")
		// }
	})

	//cards contains a card which has details for today
	return (
		<div className="timeline">
			{
				currentCard != 0
				&&
				(<button className="card-btn" onClick={flipBackward}>{'<'}</button>)
			}
			<div className="cards">
				{
					cards.map((card, i) => (
						<div className="card"
							ref={(el) => (cardRefs.current[i] = el)}
							style={{
								gridTemplateRows: `repeat(${rowCount[i]}, 1fr)`,
								gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							}}
						>
							{card.map((info) => (
								<div className="card-block">
									<div className="card-event">{info.event}</div>
									<div className="card-time">{info.time}</div>
								</div>
							))}
						</div>
					))
				}
			</div>
			{
				currentCard != cards.length
				&&
				(<button className="card-btn m-19" onClick={flipForward}>{'>'}</button>)
			}
		</div>
	)
}

export default function TimerTimeline() {

	return (
		<div className="h-full grid grid-rows-[1fr_3fr]">
			<Timer />
			<Timeline />
		</div>
	)

}
