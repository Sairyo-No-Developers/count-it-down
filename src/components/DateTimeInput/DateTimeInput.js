import s from './DateTimeInput.module.scss';

const DateTimeInput = ({ label, background = '#36fa92', color = 'black', time, setTime }) => {
	const handleInputChange = (e) => {
		const time1 = new Date(e.target.value);
		let currTime;
		if (time1 < new Date()) {
			currTime = new Date();
		} else {
			currTime = time1;
		}
		setTime(currTime);
	};
	return (
		<div className={s.main}>
			<label>{label}</label>
			<input type="datetime-local" onChange={handleInputChange} style={{ background, color }} />
		</div>
	);
};

export default DateTimeInput;
