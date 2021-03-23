module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    // Personal preference
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    // Conflicts with prettier
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/react-in-jsx-scope': 'off',
    'implicit-arrow-linebreak': 'off',
    // Props spreading is fine by me for delegated props
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};
