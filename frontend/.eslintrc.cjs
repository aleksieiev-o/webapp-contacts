module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: { version: 'detect' },
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['dist', '.eslintrc.js', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    'prefer-const': 'warn',
    'no-empty': 0,
    semi: 2,
    'no-var': 'error',
    'arrow-body-style': 0,
    camelcase: 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    indent: 0,
    'import/no-dynamic-require': 0,
    'import/no-unresolved': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/order': 0,
    'import/extensions': 0,
    'import/first': 0,
    'linebreak-style': 0,
    'max-len': [2, { code: 150 }],
    'no-console': [1, { allow: ['warn', 'error'] }],
    'no-debugger': 1,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-multiple-empty-lines': [2, { max: 1, maxBOF: 3, maxEOF: 1 }],
    quotes: [2, 'single', { allowTemplateLiterals: true }],
  },
};

