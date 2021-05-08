import { Fragment, useEffect, useState } from 'react';
import './App.scss';
import Button from './components/Button/Button';
import CountDown from './components/CountDown/CountDown';
import Landing from './components/Landing/Landing';

const App = () => {
	const [ targetTime, setTargetTime ] = useState(null);
	const [ targetTitle, setTargetTitle ] = useState('');
	const [ timerSet, setTimerSet ] = useState(false);
	const [ error, setError ] = useState('');
	useEffect(() => {
		let timers = localStorage.getItem('count-down-timers');
		if (timers) {
			let currTimer = JSON.parse(timers);
			if (currTimer.length > 0) {
				setTargetTime(new Date(currTimer[0].targetTime));
				setTargetTitle(currTimer[0].targetTitle);
				setTimerSet(true);
			}
		}
	}, []);
	return (
		<Fragment>
			{timerSet ? (
				<CountDown
					datetime={targetTime}
					title={targetTitle}
					setTimerSet={setTimerSet}
					setTargetTime={setTargetTime}
					setTargetTitle={setTargetTitle}
				/>
			) : (
				<Landing
					targetTime={targetTime}
					targetTitle={targetTitle}
					setTimerSet={setTimerSet}
					setTargetTitle={setTargetTitle}
					setTargetTime={setTargetTime}
					setError={setError}
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
		</Fragment>
	);
};

export default App;
