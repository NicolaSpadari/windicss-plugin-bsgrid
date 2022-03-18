import plugin from "windicss/plugin";

export default plugin.withOptions<{
	gridColumns?: number;
	gridGutterWidth?: string;
	respectImportant?: boolean;
}>(({ gridColumns = 12, gridGutterWidth = "1.5rem", respectImportant = true } = {}) => {
	return function ({ addComponents, theme, config }) {
		const important = config("important");
		const screens = theme("screens") as Record<string, string>;
		const screenKeys = Object.keys(screens);
		const columns = Array.from(Array(gridColumns), (_, index) => index + 1);
		const rowColSteps = columns.slice(0, Math.floor(gridColumns / 2));

		const setImportant = (value: string): string => {
			return (respectImportant || important) && value != null ? `${value} !important` : value;
		};

		// Containers
		addComponents(
			[
				{
					".container, .container-fluid": {
						width: setImportant("100%"),
						marginRight: setImportant("auto"),
						marginLeft: setImportant("auto"),
						paddingRight: setImportant(`var(--bs-gutter-x, calc(${gridGutterWidth} / 2))`),
						paddingLeft: setImportant(`var(--bs-gutter-x, calc(${gridGutterWidth} / 2))`),
					},
				},
				//   Currently broken using @screen
				//   ...screenKeys.map(size => ({
				//     [`@screen ${size}`]: {
				//       ".container": {
				//         maxWidth: setImportant(screens[size])
				//       }
				//     }
				//   }))
				...screenKeys.map((size) => ({
					[`@media (min-width: ${screens[size]})`]: {
						".container": {
							maxWidth: setImportant(screens[size]),
						},
					},
				})),
			],
			{ respectImportant }
		);

		// Rows
		addComponents(
			{
				".row": {
					"--bs-gutter-x": gridGutterWidth,
					"--bs-gutter-y": "0",
					"display": "flex",
					"flexWrap": "wrap",
					"marginTop": "calc(var(--bs-gutter-y) * -1)",
					"marginRight": "calc(var(--bs-gutter-x) / -2)",
					"marginLeft": "calc(var(--bs-gutter-x) / -2)",
					'> [class*="col-"]': {
						boxSizing: "border-box",
						flexShrink: "0",
						width: "100%",
						maxWidth: "100%",
						paddingRight: "calc(var(--bs-gutter-x) / 2)",
						paddingLeft: "calc(var(--bs-gutter-x) / 2)",
						marginTop: "var(--bs-gutter-y)",
					},
				},
			},
			{ respectImportant }
		);

		// Cols
		addComponents(
			[
				{
					".col": {
						flex: "1 0 0%",
					},
					".row-cols-auto": {
						'> [class*="col-"]': {
							flex: "0 0 auto",
							width: "auto",
						},
					},
				},
				...rowColSteps.map((rowCol) => ({
					[`.row-cols-${rowCol}`]: {
						'> [class*="col-"]': {
							flex: "0 0 auto",
							width: setImportant(`${100 / rowCol}%`),
						},
					},
				})),
				{
					".col-auto": {
						flex: "0 0 auto",
						width: "auto",
					},
				},
				...columns.map((size) => ({
					[`.col-${size}`]: {
						flex: "0 0 auto",
						width: setImportant(`${(100 / gridColumns) * size}%`),
					},
				})),
			],
			{ respectImportant }
		);

		// Offsets
		addComponents(
			[
				...[0, ...columns.slice(0, -1)].map((size) => {
					const margin = `${(100 / gridColumns) * size}%`;
					return {
						[`.offset-${size}`]: { marginLeft: margin },
					};
				}),
			],
			{ respectImportant }
		);
	};
});
