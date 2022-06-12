import { cssVar } from './getCssVariable';

export const customStyles = {
	control: (provided, state) => ({
		...provided,
		outline: state.isFocused
			? `2px solid ${cssVar('--clr-primary')}`
			: `1px solid ${cssVar('--clr-text-secondary')}`,
	}),
};

export const customTheme = (theme) => ({
	...theme,
	colors: {
		...theme.colors,
		primary25: cssVar('--clr-hover'),
		primary: cssVar('--clr-primary'),
		neutral40: cssVar('--clr-primary'),
		neutral20: cssVar('--clr-text-secondary'),
		// input text color
		neutral80: cssVar('--clr-text-primary'),
		primary50: cssVar('--clr-primary'),
	},
});
