import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default (isError, isSuccess, message) => {
  // Hook for toastifying the error and success states resulting from dispathced redux actions.
	useEffect(() => {
		if (isError && message) {
			toast.error(message);
		}

		if (isSuccess && message) {
			toast.success(message);
		}
	}, [isError, message, isSuccess]);
};
