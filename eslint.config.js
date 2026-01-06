import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      js,
      prettier: eslintPluginPrettier,
    },
    extends: ['js/recommended', pluginReact.configs.flat.recommended, eslintConfigPrettier],
    languageOptions: { globals: globals.browser },
    rules: {
      ...eslintPluginPrettier.configs.recommended.rules,
      'no-console': 'warn',
      eqeqeq: 'warn',
      curly: 'warn',
      'no-else-return': 'warn',
      'react/prop-types': 'off',
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
])
