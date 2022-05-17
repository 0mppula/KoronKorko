export const cssVar = (variable) => {
	return `${getComputedStyle(document.body).getPropertyValue(variable)}`;
};