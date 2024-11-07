import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/**
 * @type {import('eslint').Linter.Config[]}
 * */

export default [
	js.configs.recommended,
	pluginPrettierRecommended,
	...ts.configs.recommended,
	...ts.configs.stylistic,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
	},
	{
		languageOptions: {
			globals: globals.browser,
		},
	},
	{
		plugins: {
			react: pluginReact,
			'react-hooks': pluginReactHooks,
			'react-refresh': pluginReactRefresh,
		},
	},
	{
		rules: {
			'prettier/prettier': ['warn', {}],
			...pluginReactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		},
	},
];
