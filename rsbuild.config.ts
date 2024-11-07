import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
	html: {
		inject: 'body',
		template: './index.html',
	},

	source: {
		alias: {
			'@': './src',
		},
	},

	plugins: [
		pluginReact(),
		pluginSvgr({
			svgrOptions: {
				exportType: 'named',
			},
		}),
	],
});
