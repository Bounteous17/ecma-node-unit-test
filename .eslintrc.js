module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  ignorePatterns: ['__tests__/fixtures/interpreter/to-interpretate.js'],
  rules: {
  },
};
