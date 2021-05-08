import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import s from './CountDown.module.scss';

const CountDown = ({
	title = 'CountDown',
	datetime = new Date('May 12, 2021 16:25:02'),
	setTargetTime,
	setTargetTitle,
	setTimerSet
}) => {
	const calcGaps = () => {
		let targetTime = datetime.getTime();
		let currTime = new Date().getTime();
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
		return calcGaps();
	});
	const reset = () => {
		setTargetTime(null);
		localStorage.setItem('count-down-timers', JSON.stringify([]));
		setTargetTitle('');
		setTimerSet(false);
	};
	useEffect(() => {
		let i = setInterval(() => {
			let gaps = calcGaps();
			console.log(gaps);
			setCountdownItems(gaps);
		}, 1000);
		return () => {
			clearInterval(i);
		};
	}, []);
	return (
		<div className={s.main}>
			<h1>{title}</h1>
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
				{countdownItems[3] > 0 || countdownItems[2] > 0 ? (
					<div>
						<h2 className={s.item}>{countdownItems[3]}</h2>
						<h2>Second</h2>
					</div>
				) : (
					''
				)}
			</div>
			<Button text="Reset" onClick={reset} />
		</div>
	);
};

export default CountDown;
