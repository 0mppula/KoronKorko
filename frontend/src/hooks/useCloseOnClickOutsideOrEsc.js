import { useEffect } from 'react';

export default (wrapperRef, open, setOpen) => {
	// Hook for closing an element with the "escape" key or by clicking outside of the
	// wrapper element.
	useEffect(() => {
		const handler = (e) => {
			if (open) {
				const clickedOutsideWrapper =
					(e.type === 'click' || e.type === 'touchstart') &&
					!wrapperRef.current?.contains(e.target);

				if (clickedOutsideWrapper || e.key === 'Escape') {
					setOpen(false);
				}
			}
		};

		['click', 'touchstart', 'keydown'].forEach((event) => {
			document.addEventListener(event, handler);
		});

		// Clean up.
		return () => {
			['click', 'touchstart', 'keydown'].forEach((event) => {
				document.removeEventListener(event, handler);
			});
		};
	}, [open]);
};
