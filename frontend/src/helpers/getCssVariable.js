export const cssVar = async (variable) => {
	// await new Promise((resolve) => setTimeout(resolve, 10));
	return `${getComputedStyle(document.body).getPropertyValue(variable)}`;
};