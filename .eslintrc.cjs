module.exports = {
  env: { browser: true, es2021: true, jest: true },
  extends: ['airbnb-base', 'plugin:security/recommended'],
  plugins: ['security'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-console': 'warn',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'import/extensions': ['error', 'always'],
    'import/prefer-default-export': 'off',
  },
};
