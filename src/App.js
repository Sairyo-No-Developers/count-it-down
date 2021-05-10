import { Fragment, useEffect, useState } from 'react';
import './App.scss';
import Button from './components/Button/Button';
import CountDown from './components/CountDown/CountDown';
import Dropdown from './components/Dropdown/Dropdown';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';

const App = () => {
	const [ targetTime, setTargetTime ] = useState(null);
	const [ targetTitle, setTargetTitle ] = useState('');
	const [ timerSet, setTimerSet ] = useState(false);
	const [ timers, setTimers ] = useState([]);
	const [ timerNo, setTimerNo ] = useState(0);
	const [ error, setError ] = useState('');
	useEffect(() => {
		let timers = localStorage.getItem('count-down-timers');
		if (timers) {
			let currTimer = JSON.parse(timers);
			if (currTimer.length > 0) {
				setTargetTime(new Date(currTimer[0].targetTime));
				setTargetTitle(currTimer[0].targetTitle);
				let newList = [];
				currTimer.map((e, i) => {
					newList.push({
						text: e.targetTitle,
						time: new Date(e.targetTime),
						no: i
					});
				});
				setTimers(newList);
				setTimerSet(true);
			}
		}
	}, []);
	return (
		<div className="main">
			<Navbar
				setTimerSet={setTimerSet}
				setTargetTime={setTargetTime}
				setTargetTitle={setTargetTitle}
				setTimerNo={setTimerNo}
				timers={timers}
				targetTitle={targetTitle}
				timerSet={timerSet}
			/>
			{timerSet ? (
				<CountDown
					datetime={targetTime}
					title={targetTitle}
					setTimerSet={setTimerSet}
					setTargetTime={setTargetTime}
					timerNo={timerNo}
					setTargetTitle={setTargetTitle}
					timers={timers}
					setTimers={setTimers}
				/>
			) : (
				<Landing
					targetTime={targetTime}
					targetTitle={targetTitle}
					setTimerSet={setTimerSet}
					setTargetTitle={setTargetTitle}
					setTargetTime={setTargetTime}
					setError={setError}
					setTimers={setTimers}
					setTimerNo={setTimerNo}
				/>
			)}
			{error.length > 0 && (
				<div className="error">
					<div>
						<h3>{error}</h3>
						<button
							onClick={() => {
								setError('');
							}}
						>
							Close
						</button>
					</div>
				</div>
			)}
			<footer>Soumik is lallu</footer>
		</div>
	);
};

export default App;
