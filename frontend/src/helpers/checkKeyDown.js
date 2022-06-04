const checkKeyDown = (e, fn) => {
	// Call the passed function only when "Enter" or "Space" keys are pressed
	let keycode = e.keyCode || e.which;
	if (keycode == '32') {
		// Prevent scroll on when pressing the "Space Key"
		e.preventDefault();
		fn();
	} else if (keycode == '13') {
		fn();
	}
};

export default checkKeyDown;
