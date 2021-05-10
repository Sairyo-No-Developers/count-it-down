import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import sfx from './assets/sound/notification_up.mp3';

export const toastIt = (msg) => {
	let audio = new Audio(sfx);
	audio.play();
	toast.success(msg);
};

export const useBackgroundCheck = () => {
	const [ i, setI ] = useState([]);
	const flags = useRef({});
	const setup = () => {
		i.map((e) => {
			return clearInterval(e);
		});
		let timers = localStorage.getItem('count-down-timers');
		let newI = [];
		if (timers) {
			timers = JSON.parse(timers);
			console.log(timers);
			timers.map((e, i) => {
				flags.current = { ...flags.current, [i]: 0 };
				return newI.push(
					setInterval(() => {
						let targetTime = new Date(e.targetTime).getTime();
						let sessionFlags = sessionStorage.getItem('count-down-timers');
						if (sessionFlags) {
							sessionFlags = JSON.parse(sessionFlags);
						} else {
							sessionFlags = {};
						}
						let currTime = new Date().getTime();
						if (currTime >= targetTime) {
							if (flags.current[String(i)] === 0) {
								if (!sessionFlags[String(i)] || sessionFlags[String(i)] === 0) {
									toastIt(`${e.targetTitle} Reached!`);
									flags.current = { ...flags.current, [i]: 1 };
									sessionStorage.setItem(
										'count-down-timers',
										JSON.stringify({ ...sessionFlags, [i]: 1 })
									);
								}
							}
						} else {
							sessionStorage.setItem('count-down-timers', JSON.stringify({ ...sessionFlags, [i]: 0 }));
						}
					}, 1000)
				);
			});
		}
		setI(newI);
	};
	return setup;
};
