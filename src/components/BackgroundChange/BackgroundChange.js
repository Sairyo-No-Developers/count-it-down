import { faCog, faEyeDropper, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, useState } from 'react';
import Button from '../Button/Button';
import s from './BackgroundChange.module.scss';
import onClickOutside from 'react-onclickoutside';

class TempDropdown extends Component {
	handleClickOutside() {
		this.props.setVisible(false);
	}
	render() {
		return (
			<div className={s.dropdown} style={{ display: this.props.visible ? 'flex' : 'none' }}>
				<label>
					<FontAwesomeIcon icon={faEyeDropper} /> Select Background Color
				</label>
				<input type="color" value={this.props.backgroundColor} onChange={this.props.handleBackgroundColor} />
				<button
					onClick={() => {
						this.props.handleBackgroundColor();
					}}
				>
					<FontAwesomeIcon icon={faSync} />
				</button>
			</div>
		);
	}
}

const Dropdown = onClickOutside(TempDropdown);

const BackgroundChange = ({ backgroundColor, setBackgroundColor, timerNo }) => {
	const [ visible, setVisible ] = useState(false);
	const handleBackgroundColor = (e = { target: { value: '#1f1f1f' } }) => {
		document.body.style.backgroundColor = e.target.value;
		setBackgroundColor(e.target.value);
		let timers = localStorage.getItem('count-down-timers');
		if (timers) {
			timers = JSON.parse(timers);
			timers.map((e, i) => {
				let newTimers = [];
				if (i === timerNo) {
					newTimers = timers.slice(0, i + 1);
					newTimers.push({ ...e, backgroundColor });
					newTimers.concat(timers.slice(i + 1));
				}
				return localStorage.setItem('count-down-timers', JSON.stringify(newTimers));
			});
		}
	};
	return (
		<div className={s.main}>
			<button
				className={s.settings}
				onFocus={() => {
					setVisible(true);
				}}
			>
				<FontAwesomeIcon icon={faCog} />
				<Dropdown
					backgroundColor={backgroundColor}
					handleBackgroundColor={handleBackgroundColor}
					visible={visible}
					setVisible={setVisible}
				/>
			</button>
		</div>
	);
};

export default BackgroundChange;
