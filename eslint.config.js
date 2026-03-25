const js = require('@eslint/js');
const pluginVue = require('eslint-plugin-vue');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        expect: 'readonly',
        process: 'readonly',
        require: 'readonly',
      }
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      semi: ['error', 'always'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    }
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    }
  }
];
