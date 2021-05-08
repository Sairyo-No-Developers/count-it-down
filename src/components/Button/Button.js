import s from './Button.module.scss';

const Button = ({
	text = 'Button',
	alignItems = 'center',
	background = '#f5f5f5',
	color = 'black',
	onClick = () => {}
}) => {
	return (
		<div className={s.main} style={{ alignItems }}>
			<button style={{ background, color }} onClick={onClick}>
				{text}
			</button>
		</div>
	);
};

export default Button;
