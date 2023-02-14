const checkKeyDown = (e, fn) => {
	// Call the passed function only when "Enter" or "Space" keys are pressed
	let keycode = e.keyCode || e.which;
	if (keycode === 32 || keycode === 13) {
		// Prevent scroll when pressing the "Space Key" & prevent a click event from firing when
		// focused on a button and pressing either the "Space" or "Enter" keys.
		e.preventDefault();
		fn();
	}
};

export default checkKeyDown;
