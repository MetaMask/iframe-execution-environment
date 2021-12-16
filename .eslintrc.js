module.exports = {
  root: true,

  extends: ['@metamask/eslint-config'],

  overrides: [
    {
      files: ['*.ts'],
      extends: ['@metamask/eslint-config-typescript'],
    },

    {
      files: ['./*.js'],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'script',
      },
      extends: ['@metamask/eslint-config-nodejs'],
    },

    {
      files: ['src/**/*.js', 'src/**/*.ts'],
      env: {
        browser: true,
      },
      globals: {
        Compartment: 'readonly',
        globalThis: 'readonly',
        harden: 'readonly',
        lockdown: 'readonly',
      },
    },

    {
      files: ['src/lockdown/*.js'],
      rules: {
        'import/unambiguous': 'off',
      },
    },

    {
      files: ['*.test.ts', '*.test.js'],
      extends: ['@metamask/eslint-config-jest'],
    },
  ],

  ignorePatterns: [
    '!.eslintrc.js',
    '!.prettierrc.js',
    'dist/',
    'public/',
    'src/__GENERATED_TYPES__',
  ],
};
