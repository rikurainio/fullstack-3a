module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'never',
    ],
    eqeqeq: 'error',
    'no-trailing-spaces': [
      'error',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],

    'no-underscore-dangle': 'off',

    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'no-console': 0,
  },
}
