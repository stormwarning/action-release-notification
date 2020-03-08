module.exports = {
    env: {
        node: true,
        es6: true,
        'jest/globals': true,
    },
    extends: ['standard'],
    plugins: ['jest', '@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 9,
        sourceType: 'module',
        // project: './tsconfig.json',
    },
    rules: {
        'arrow-parens': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],

        // Allow async-await
        'generator-star-spacing': 'off',

        indent: ['error', 4],
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'prefer-const': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
    },
}
