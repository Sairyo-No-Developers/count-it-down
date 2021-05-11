import s from './Navbar.module.scss';
import Dropdown from '../Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import BackgroundChange from '../BackgroundChange/BackgroundChange';

const Navbar = ({
	setTimerSet,
	timers,
	targetTitle,
	timerSet,
	setTargetTitle,
	targetTime,
	setTargetTime,
	timerNo,
	setTimerNo,
	backgroundColor,
	setBackgroundColor
}) => {
	const [ time, setTime ] = useState('');
	useEffect(() => {
		let i = setInterval(() => {
			setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
		}, 1000);
	});
	return (
		<nav className={s.nav}>
			<div className={s.left}>
				<Dropdown
					setTimerSet={setTimerSet}
					setTargetTitle={setTargetTitle}
					setTimerNo={setTimerNo}
					setTargetTime={setTargetTime}
					listItems={timers}
					text={targetTitle.length > 0 ? targetTitle : 'Select Countdown'}
					setBackgroundColor={setBackgroundColor}
				/>
				<button
					className={s.button}
					onClick={() => {
						setTimerSet(false);
					}}
				>
					<FontAwesomeIcon icon={faPlusCircle} />
				</button>
			</div>
			<div className={s.time}>
				<span>{time}</span>
				<BackgroundChange
					timerNo={timerNo}
					setTimerNo={setTimerNo}
					backgroundColor={backgroundColor}
					setBackgroundColor={setBackgroundColor}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
