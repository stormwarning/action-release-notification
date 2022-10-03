module.exports = {
	extends: [
		'@zazen',
		'@zazen/eslint-config/node',
		'@zazen/eslint-config/typescript',
	],
	env: {
		node: true,
	},
	parserOptions: {
		project: 'tsconfig.node.json',
	},
	rules: {
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/consistent-type-imports': 'off',
		'@typescript-eslint/naming-convention': 'off',

		'import/extensions': ['error', { ts: 'never' }],

		'unicorn/prevent-abbreviations': [
			'error',
			{ allowList: { args: true } },
		],
	},
}
