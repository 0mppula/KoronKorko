export default (error) => {
	const message =
		(error.response && error.response.data && error.response.data.message) ||
		error.mesage ||
		error.toString();

	return message;
};
