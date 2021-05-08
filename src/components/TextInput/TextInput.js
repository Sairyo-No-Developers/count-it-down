import s from './TextInput.module.scss';

const TextInput = ({ label, placeholder = '', background = '#ec8b8b', color = 'black', text, setText }) => {
	return (
		<div className={s.main}>
			<label>{label}</label>
			<input
				type="text"
				style={{ background, color }}
				placeholder={placeholder}
				value={text}
				onChange={(e) => {
					setText(e.target.value);
				}}
			/>
		</div>
	);
};
export default TextInput;
