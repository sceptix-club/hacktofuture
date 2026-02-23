import { useState, useEffect, useRef } from "react"
// import "@/styles/Timer.css" //TODO: figure out how to fix this
import "../styles/Timer.css";
import "../styles/TimerTimeline.css";
import { gsap } from "gsap";

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

	const peek = 32
	const [currentCard, setCurrentCard] = useState(0)

	const originalPos = [
		{ x: 0, y: 0, rotation: 0, scale: 1 },
		{ x: -peek, y: 4, rotation: -2, scale: 0.97 },
		{ x: peek / 3, y: 4 + peek, rotation: 3, scale: 0.97 },
		{ x: peek, y: 4 + peek / 4, rotation: -3, scale: 0.97 },
	];

	const fannedBack = { x: "90%", y: 100, rotation: 5, scale: 1 }
	const fannedForward = { x: "90%", y: 100, rotation: 5, scale: 1 }
	const shiftStart = { x: "-5%", duration: 0.5, ease: "back.in(1.4)" }
	const shiftEnd = { x: 0, duration: 0.5, ease: "back.in(1.4)" }

	const cards = [
		[
			{
				time: "3:00PM",
				event: "Start Registrations"
			},
			{
				time: "4:00PM",
				event: "Snacks"
			},
			{
				time: "5:00PM",
				event: "Event inauguration"
			},
			{
				time: "6:00AM",
				event: "Hackathon Officially Begins"
			},
			{
				time: "7:00PM",
				event: "Dinner"
			},
		],
		[
			{
				time: "1:00AM",
				event: "Refreshments"
			},
			{
				time: "8:00AM",
				event: "Breakfast"
			},
			{
				time: "10:00AM",
				event: "Lunch"
			},
			{
				time: "4:00PM",
				event: "Snacks"
			},
			{
				time: "4:30PM",
				event: "Mentoring session"
			},
			{
				time: "7:30PM",
				event: "Cultural Program in Amphitheatre"
			},
			{
				time: "7:00PM",
				event: "Dinner"
			},
		],
		[
			{
				time: "Refreshments",
				event: "1:00AM"
			},
			{
				time: "5:00AM",
				event: "Participation certificate"
			},
			{
				time: "6:00AM",
				event: "Hackathon ends"
			},
			{
				time: "Breakfast",
				event: "8:00AM"
			},
			{
				time: "9:30AM",
				event: "Team presentation"
			},
			{
				time: "12:00PM",
				event: "Valedictory ceremony"
			},
			{
				time: "1:00PM",
				event: "Lunch and networking"
			}
		]
	]
	const totalCards = cards.length

	const cardRefs = useRef();
	cardRefs.current = Array(cards.length).fill(null).map((_) => useRef())

	//INFO: array that contains the number of rows that should be present in each card
	let rowCount = Array(cards.length).fill(null).map((_, i) => Math.ceil(cards[i].length / 2))
	const maxRow = rowCount.slice().sort((a, b) => b - a)[0]

	// move the current to last

	const setZIndex = (curr) => {
		cardRefs.current.forEach((card, i) => {
			if (i < curr) {
				card.style.zIndex = totalCards - curr
			}
			else {
				card.style.zIndex = totalCards - Math.abs(curr - i)
			}
			console.log(i, "z-index: ", card.zIndex)
		});

	}

	//TODO: make the rest of the deck shuffle too
	const flipForward = () => {
		setCurrentCard(prev => {
			const next = prev + 1
			const tl1 = gsap.timeline()
			tl1.to(cardRefs.current[prev], {
				...fannedForward,
				duration: 0.5,
				ease: "back.in(1.4)",
				rotationY: 60,
				delay: 0.05,
			}).to(cardRefs.current[prev], {
				...originalPos[next], // also fix typo here
				zIndex: 1,
				rotationY: 0,
				duration: 0.5,
				ease: "back.in(1.4)",
			})
			setTimeout(() => {
				setZIndex(next);
			}, 500)

			//INFO: animate the remaining cards as well
			const filterCards = cardRefs.current.filter((card, i) => i != prev)
			const tl2 = gsap.timeline()
			tl2.to(filterCards, {
				x: "-5%",
				// y: 10,
				duration: 0.5,
				ease: "back.in(1.4)",
			}).to(filterCards, {
				x: 0,
				duration: 0.5,
				ease: "back.in(1.4)",
			})

			return next
		})
	}

	const flipBackward = () => {
		setCurrentCard(next => {
			const prev = next - 1
			const tl = gsap.timeline()
			tl.to(cardRefs.current[prev], {
				...fannedBack,
				duration: 0.5,
				ease: "back.in(1.4)",
				rotationY: 60,
				delay: 0.05,
			}).to(cardRefs.current[prev], {
				...originalPos[next], // also fix typo here
				zIndex: 60,
				rotationY: 0,
				duration: 0.5,
				ease: "back.in(1.4)",
				delay: 0.05,
			})

			const filterCards = cardRefs.current.filter((card, i) => i != prev)
			const tl2 = gsap.timeline()
			tl2.to(filterCards, {
				...shiftStart
			}).to(filterCards, {
			})

			setTimeout(() => {
				setZIndex(prev);
			}, 800)
			return prev
		})
	}

	//INFO: this shit is so restarded
	const [rendered, setRendered] = useState(false)

	useEffect(() => {
		if (!rendered) {
			cardRefs.current.forEach((card, i) => {
				gsap.set(card, originalPos[i]);
			})
			setZIndex(currentCard)
			setRendered(rendered => true)
		}

		if (originalPos.length != cards.length) {
			console.error("CARDS COUNT IS INVALID")
		}
	})

	const Header = ["6th April", "7th April", "8th April"]

	//cards contains a card which has details for today
	return (
		<div className="timeline">
			<div className="cards text-left">
				{
					cards.map((card, i) => (

						<div className="card-wrapper"
						ref={(el) => (cardRefs.current[i] = el)}
						>
						<div className="card-header">{Header[i]}</div>
							<div className="card-content top-1/9"
								style={{
									// gridTemplateRows: `repeat(${rowCount[i]}, 1fr)`,
									gridTemplateRows: `repeat(${maxRow}, 1fr)`,
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
						</div>
					))
				}
			</div>
			<div className="card-btns">

				<button className="card-btn"
					onClick={flipBackward}
					style={{
						opacity: (currentCard == 0) ? 0 : 1,
						pointerEvents: (currentCard == 0) ? "none" : "all"
					}}
				>{'<'}
				</button>

				<button className="card-btn"
					onClick={flipForward}
					style={{
						opacity: (currentCard == totalCards - 1) ? 0 : 1,
						pointerEvents: (currentCard == totalCards - 1) ? "none" : "all"
					}}
				>{'>'}
				</button>

			</div>
		</div>
	)
}

export default function TimerTimeline() {

	return (
		// <div className="h-screen w-full grid grid-rows-[1fr_3fr] justify-items-center">
		<div className="h-full w-full grid grid-rows-[auto_1fr] justify-items-center">
			<Timer />
			<Timeline />
		</div>
	)

}
