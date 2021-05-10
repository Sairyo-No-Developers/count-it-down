import { Fragment, useEffect, useState } from 'react';
import Button from '../Button/Button';
import s from './CountDown.module.scss';
import beerSvg from '../../assets/images/undraw_Beer_celebration_cefj.svg';
import { Player } from '@lottiefiles/react-lottie-player';

const CountDown = ({
	title = 'CountDown',
	datetime = new Date('May 12, 2021 16:25:02'),
	setTargetTime,
	setTargetTitle,
	setTimerSet,
	timerNo,
	timers,
	setTimers
}) => {
	const [ finished, setFinished ] = useState(false);
	const calcGaps = (targetTime) => {
		let currTime = new Date().getTime();
		if (currTime >= targetTime) {
			setFinished(true);
		}
		let gap = targetTime - currTime;
		let second = 1000;
		let minute = second * 60;
		let hour = minute * 60;
		let day = hour * 24;
		return [
			Math.floor(gap / day),
			Math.floor((gap % day) / hour),
			Math.floor((gap % hour) / minute),
			Math.floor((gap % minute) / second)
		];
	};
	const [ countdownItems, setCountdownItems ] = useState(() => {
		return calcGaps(datetime.getTime());
	});
	const reset = () => {
		setTargetTime(null);
		let getTimers = JSON.parse(localStorage.getItem('count-down-timers'));
		getTimers.splice(timerNo, 1);
		localStorage.setItem('count-down-timers', JSON.stringify(getTimers));
		let newList = [];
		getTimers.map((e, i) => {
			newList.push({
				text: e.targetTitle,
				time: new Date(e.targetTime),
				no: i
			});
		});
		setTimers(newList);
		setTargetTitle('');
		setTimerSet(false);
	};
	useEffect(
		() => {
			let i = setInterval(() => {
				let gaps = calcGaps(datetime.getTime());
				console.log(gaps);
				setCountdownItems(gaps);
			}, 1000);
			return () => {
				clearInterval(i);
			};
		},
		[ datetime ]
	);
	return (
		<div className={s.container}>
			{!finished ? (
				<div className={s.timer}>
					<h1>{title}</h1>
					<h1>{datetime.toLocaleString()}</h1>
					<div className={s.CountDown}>
						{countdownItems[0] > 0 && (
							<div>
								<h2 className={s.item}>{countdownItems[0]}</h2>
								<h2>Day</h2>
							</div>
						)}
						{countdownItems[1] > 0 || countdownItems[0] > 0 ? (
							<div>
								<h2 className={s.item}>{countdownItems[1]}</h2>
								<h2>Hour</h2>
							</div>
						) : (
							''
						)}
						{countdownItems[2] > 0 || countdownItems[1] > 0 ? (
							<div>
								<h2 className={s.item}>{countdownItems[2]}</h2>
								<h2>Minute</h2>
							</div>
						) : (
							''
						)}
						<div>
							<h2 className={s.item}>{countdownItems[3]}</h2>
							<h2>Second</h2>
						</div>
					</div>
					<Button text="Reset" onClick={reset} />
				</div>
			) : (
				<div className={s.timer}>
					<Player
						autoplay={true}
						loop={false}
						controls={false}
						src="https://assets2.lottiefiles.com/packages/lf20_u4yrau.json"
						className={s.player}
					/>
					<img src={beerSvg} alt="Celebration" />
					<h2>Hooray! Your Wait Has Ended</h2>
					<Button text="Reset" onClick={reset} />
				</div>
			)}
		</div>
	);
};

export default CountDown;
