export const cssVar = (variable) => {
	return `${getComputedStyle(document.documentElement).getPropertyValue(variable)}`;
};
