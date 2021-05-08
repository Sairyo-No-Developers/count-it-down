import { useEffect, useRef, useState } from 'react';

const TestComp = () => {
	const fileInput = useRef(null);
	const [ color, setColor ] = useState('gainsboro');
	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};
	const setBackgroundImg = (base64) => {
		var img = new Image();
		img.src = base64;
		document.body.style.background = `url("${img.src}")`;
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundPosition = 'center';
	};
	const handleFileRead = async (e) => {
		try {
			const file = e.target.files[0];
			const base64 = await convertBase64(file);
			localStorage.setItem('count-it-down-background-img', base64);
			setBackgroundImg(base64);
		} catch (error) {
			// Error handling to be added
		}
	};
	const handleColorChange = (e) => {
		setColor(e.target.value);
	};
	useEffect(() => {
		const backgroundImg = localStorage.getItem('count-it-down-background-img');
		if (backgroundImg) {
			setBackgroundImg(backgroundImg);
		}
	}, []);
	return (
		<div>
			<button
				onClick={() => {
					fileInput.current.click();
				}}
			>
				Change Background
			</button>
			<h1 style={{ color: color }}>Countdown</h1>
			<input type="color" onChange={handleColorChange} />
			<input ref={fileInput} type="file" onChange={handleFileRead} style={{ display: 'none' }} />
		</div>
	);
};

export default TestComp;
