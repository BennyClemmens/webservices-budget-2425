import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

// 👇 helper function to get IntelliSense in our configuration
export default tseslint.config(
  eslint.configs.recommended, // 👈 starting configs imported from eslint
  ...tseslint.configs.recommended, // 👈 starting configs imported from typescript eslint including needed config to read .ts-files
  {ignores: ["build/**"]}, // source: https://github.com/eslint/eslint/discussions/18304
  {
    // 👇 our own config
    files: ['**/*.ts', '**/*.spec.ts'],
    plugins: {
      '@stylistic': stylistic, // added the @stylistic plugin to help us check the coding style
    },
    rules: { // our own rules, starting with the prefix of the plugin property
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/no-tabs': ['error'],
      '@stylistic/max-len': [
        'error',
        {
          code: 120,
          tabWidth: 2,
        },
      ],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      '@stylistic/no-inner-declarations': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
);
