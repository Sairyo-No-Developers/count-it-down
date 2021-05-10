import s from './Navbar.module.scss';
import Dropdown from '../Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({
	setTimerSet,
	timers,
	targetTitle,
	timerSet,
	setTargetTitle,
	targetTime,
	setTargetTime,
	timerNo,
	setTimerNo
}) => {
	const [ time, setTime ] = useState('');
	useEffect(() => {
		let i = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
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
			<div className={s.time}>{time}</div>
		</nav>
	);
};

export default Navbar;
