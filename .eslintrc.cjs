module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true, // Ensure ESLint understands it's a Node.js environment
  },
  rules: {
    // Add or override any rules as needed
  },
};
