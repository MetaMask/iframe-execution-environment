module.exports = {
  root: true,

  extends: ['@metamask/eslint-config'],

  overrides: [
    {
      files: ['*.ts'],
      extends: ['@metamask/eslint-config-typescript'],
    },
    {
      files: ['*.ts'],
      env: {
        browser: true,
      },
      rules: {
        'node/no-unpublished-import': 'off',
      },
    },
    {
      files: ['*.js'],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'script',
      },
      extends: ['@metamask/eslint-config-nodejs'],
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
