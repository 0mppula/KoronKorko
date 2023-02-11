import { useCallback, useEffect, useRef } from 'react';

export default (wrapperRef, isOpen, trapCondition = true) => {
	// A hook for trapping the focus inside of the passed "wrapperRef" element.
	// The trap condition parameter can be used to enable focus trapping  only in certain conditions
	// eg. after data fetching.

	let firstFocusableElementRef = useRef();
	let lastFocusableElementRef = useRef();

	const handler = useCallback(
		(e) => {
			if (
				document.activeElement === lastFocusableElementRef.current &&
				e.key === 'Tab' &&
				!e.shiftKey
			) {
				e.preventDefault();
				firstFocusableElementRef.current?.focus();
			}
			if (
				document.activeElement === firstFocusableElementRef.current &&
				e.key === 'Tab' &&
				e.shiftKey
			) {
				e.preventDefault();
				lastFocusableElementRef.current?.focus();
			}
		},
		[isOpen, trapCondition]
	);

	useEffect(() => {
		if (isOpen && trapCondition) {
			const focusableElements = [
				...(wrapperRef.current?.querySelectorAll('[tabindex]') || []),
			];

			firstFocusableElementRef.current = focusableElements[0];
			lastFocusableElementRef.current = [...focusableElements].pop();

			// On open focus on the first element, thus trapping the focus inside of the modal.
			firstFocusableElementRef.current?.focus();

			wrapperRef.current?.addEventListener('keydown', handler);
		}

		// Clean up.
		return () => wrapperRef.current?.removeEventListener('keydown', handler);
	}, [isOpen, trapCondition]);
};
