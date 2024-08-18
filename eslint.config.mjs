import pluginJs from '@eslint/js';
import prettie from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules', 'dist', '.env', 'eslint.config.mjs'],
    languageOptions: { globals: globals.node }
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      prettie: prettie
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      quotes: ['error', 'single'], // Força o uso de aspas duplas
      semi: ['warn', 'always'], // Força o uso de ponto e vírgula no final das linhas
      'no-trailing-spaces': ['error'], // Não permite espaços em branco no final das linhas
      'eol-last': ['error', 'always'], // Exige uma linha vazia no final do arquivo
      'no-multiple-empty-lines': ['error', { max: 1 }], // Não permite múltiplas linhas vazias
      // 'sort-imports': ['error', {
      //   'ignoreCase': true,
      //   'ignoreDeclarationSort': false,
      //   'ignoreMemberSort': false,
      //   'allowSeparatedGroups': true
      // }],
      // 'simple-import-sort/imports': 'error',
      // 'simple-import-sort/exports': 'error'
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroupsExcludedImportTypes: [],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'linebreak-style': ['warn', 'windows'],
      'prettier/prettier': ['warn']
    }
  }
];
