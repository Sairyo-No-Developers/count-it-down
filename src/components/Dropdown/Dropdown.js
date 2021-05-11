import { Component, useState } from 'react';
import s from './Dropdown.module.scss';
import { nanoid } from 'nanoid';
import onClickOutside from 'react-onclickoutside';

class TempList extends Component {
	handleClickOutside = () => {
		this.props.toggleVisible();
	};
	render() {
		return (
			<div key={nanoid()} className={s.list} style={{ display: this.props.clicked ? 'flex' : 'none' }}>
				{this.props.listItems.map((e) => (
					<div
						onClick={() => {
							this.props.setTargetTitle(e.text);
							this.props.setTargetTime(e.time);
							this.props.setTimerNo(e.no);
							this.props.setTimerSet(true);
							this.props.toggleVisible();
							let timers = localStorage.getItem('count-down-timers');
							if (timers) {
								timers = JSON.parse(timers);
								timers.map((e, i) => {
									if (i === e.no) {
										this.props.setBackgroundColor(e.backgroundColor || '#1f1f1f');
									}
								});
							}
						}}
					>
						{e.text}
					</div>
				))}
			</div>
		);
	}
}

const List = onClickOutside(TempList);

const Dropdown = ({
	setTimerSet,
	setTargetTitle,
	setTargetTime,
	setTimerNo,
	listItems = [ { text: '1', onClick: () => {} } ],
	text = 'Select Countdown',
	setBackgroundColor
}) => {
	const [ clicked, setClicked ] = useState(false);
	return (
		<div className={s.main}>
			<button
				className={s.button}
				onFocus={() => {
					setClicked(true);
				}}
			>
				{text}
			</button>
			{listItems && (
				<List
					listItems={listItems}
					toggleVisible={() => {
						setClicked(false);
					}}
					setTimerSet={setTimerSet}
					clicked={clicked}
					setTargetTime={setTargetTime}
					setTargetTitle={setTargetTitle}
					setTimerNo={setTimerNo}
					setBackgroundColor={setBackgroundColor}
				/>
			)}
		</div>
	);
};

export default Dropdown;
