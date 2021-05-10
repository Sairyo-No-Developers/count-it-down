import s from './Landing.module.scss';
import LargeFull from '../../assets/images/Large_Full.png';
import DateTimeInput from '../DateTimeInput/DateTimeInput';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

const Landing = ({
	targetTitle,
	setTimerNo,
	setTimers,
	setTargetTitle,
	targetTime,
	setTargetTime,
	setTimerSet,
	setError,
	setup,
	textInput,
	setTextInput
}) => {
	const handleStartButton = () => {
		if (textInput.length > 0 && targetTime) {
			if (targetTime < new Date()) {
				return setError('Select Future Date');
			}
			setTimerSet(true);
			const getTimers = localStorage.getItem('count-down-timers');
			const thisTimer = {
				targetTitle: textInput,
				targetTime
			};
			let timers;
			if (getTimers) {
				timers = JSON.parse(getTimers);
				timers.push(thisTimer);
			} else {
				timers = [ thisTimer ];
			}
			let newList = [];
			timers.map((e, i) => {
				newList.push({
					text: e.targetTitle,
					time: new Date(e.targetTime),
					no: i
				});
			});
			setTargetTitle(textInput);
			setTimers(newList);
			setTimerNo(timers.length - 1);
			setTextInput('');
			localStorage.setItem('count-down-timers', JSON.stringify(timers));
			setup();
		} else {
			if (textInput.length < 1) {
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
				text={textInput}
				setText={setTextInput}
			/>
			<div className={s.date}>
				<DateTimeInput label={'Enter Target Date & Time'} time={targetTime} setTime={setTargetTime} />
				<Button text="Start" alignItems="flex-end" background="#93C2FF" onClick={handleStartButton} />
			</div>
		</div>
	);
};

export default Landing;
