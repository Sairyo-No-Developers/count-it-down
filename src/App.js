import { useEffect, useState } from 'react';
import './App.scss';
import CountDown from './components/CountDown/CountDown';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBackgroundCheck } from './utils';

const App = () => {
	const [ targetTime, setTargetTime ] = useState(null);
	const [ targetTitle, setTargetTitle ] = useState('');
	const [ textInput, setTextInput ] = useState('');
	const [ timerSet, setTimerSet ] = useState(false);
	const [ timers, setTimers ] = useState([]);
	const [ timerNo, setTimerNo ] = useState(0);
	const [ error, setError ] = useState('');
	const setup = useBackgroundCheck();
	useEffect(() => {
		setup();
		let timers = localStorage.getItem('count-down-timers');
		if (timers) {
			let currTimer = JSON.parse(timers);
			if (currTimer.length > 0) {
				setTargetTime(new Date(currTimer[0].targetTime));
				setTargetTitle(currTimer[0].targetTitle);
				let newList = [];
				currTimer.map((e, i) => {
					return newList.push({
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
			<ToastContainer position="bottom-right" />
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
					setup={setup}
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
					setup={setup}
					textInput={textInput}
					setTextInput={setTextInput}
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
			<footer>
				Made with ❤️ by <a href="https://www.abhishekadhikari.rocks/">Abhishek Adhikari</a>,{' '}
				<a href="https://github.com/AniketdCR7/">Aniket Datta</a> and{' '}
				<a href="https://github.com/Amartya0">Amartya Jash</a>.
			</footer>
		</div>
	);
};

export default App;
