import React from 'react';

import { RiCloseLine } from 'react-icons/ri';

const ToastCloseButton = ({ closeToast }) => {
	return (
		<span className="Toastify-button-container">
			<RiCloseLine />
		</span>
	);
};

export default ToastCloseButton;
