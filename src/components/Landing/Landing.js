import s from './Landing.module.scss';
import LargeFull from '../../assets/images/Large_Full.png';
import DateTimeInput from '../DateTimeInput/DateTimeInput';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

const Landing = ({ targetTitle, setTargetTitle, targetTime, setTargetTime, setTimerSet, setError }) => {
	const handleStartButton = () => {
		if (targetTitle.length > 0 && targetTime) {
			if (targetTime < new Date()) {
				return setError('Select Future Date');
			}
			setTimerSet(true);
			const getTimers = localStorage.getItem('count-down-timers');
			const thisTimer = {
				targetTitle,
				targetTime
			};
			let timers;
			if (getTimers) {
				timers = JSON.parse(getTimers);
				timers.push(thisTimer);
			} else {
				timers = [ thisTimer ];
				localStorage.setItem('count-down-timers', JSON.stringify(timers));
			}
		} else {
			if (targetTitle.length < 1) {
				return setError('Enter a title');
			}
			if (targetTime === null) {
				return setError('Select a date and time');
			}
		}
	};
	return (
		<div className={s.main}>
			<img src={LargeFull} alt="Count It Down" />
			<TextInput
				label="What Are You Waiting For?"
				placeholder="Type It While You Wait..."
				text={targetTitle}
				setText={setTargetTitle}
			/>
			<div className={s.date}>
				<DateTimeInput label={'Enter Target Date & Time'} time={targetTime} setTime={setTargetTime} />
				<Button text="Start" alignItems="flex-end" background="#93C2FF" onClick={handleStartButton} />
			</div>
		</div>
	);
};

export default Landing;
