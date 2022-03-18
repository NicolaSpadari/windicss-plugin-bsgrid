# @spada/windicss-plugin-bsgrid

[![License: MIT][license-badge]][license]

Bootstrap 5 barebone grid system for WindiCSS

## Installation

```shell
npm i @spada/windicss-plugin-bsgrid -D
```

```js
/* main.ts */
import { defineConfig } from "vite-plugin-windicss";
import BsGrid from "@spada/windicss-plugin-bsgrid";

export default defineConfig({
	// ...
	plugins: [
		BsGrid({
			// Optional options
		})
	]
	// ...
});
```

This plugin generates the grid classes under the `components` layer, so you must include it such as:

```css
/* main.ts */
import "virtual:windi-base.css";
import "virtual:windi-components.css"; <---
import "virtual:windi-utilities.css";
```

or just import the whole thing:

```css
/* main.ts */
import "virtual:windi.css";
```

Remember to disable the core plugin of the default `.container` class:

```js
// windi.config.ts
export default defineConfig({
	// ...
	corePlugins: {
		container: false
	}
	// ...
});
```

## Options

-   `gridColumns` (default 12)
-   `gridGutterWidth` (default 1.5rem)
-   `respectImportant` (default true) to respect the windi config setting

If you want to set custom breakpoints, set them in the windi config file as it follows (nested objects and min/max are not supported):

```js
// windi.config.ts
export default defineConfig({
	// ...
	corePlugins: {
		container: false
	},
	// ...
	screens: {
		sm: "576px",
		md: "768px",
		lg: "992px",
		xl: "1200px",
		xxl: "1400px"
	}
});
```

## Related

Heavily inspired by karolis-sh's [tailwind-bootstrap-grid](https://github.com/karolis-sh/tailwind-bootstrap-grid)

[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license]: https://opensource.org/licenses/MIT
