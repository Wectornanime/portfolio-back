import pluginJs from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: [
      'node_modules',
      'dist',
      '.env',
      'eslint.config.mjs'
    ],
    languageOptions: { globals: globals.node }
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'quotes': ['error', 'single'],                                    // Força o uso de aspas duplas
      'semi': ['error', 'always'],                                      // Força o uso de ponto e vírgula no final das linhas
      'no-trailing-spaces': ['error'],                                  // Não permite espaços em branco no final das linhas
      'eol-last': ['error', 'always'],                                  // Exige uma linha vazia no final do arquivo
      'no-multiple-empty-lines': ['error', {                            // Não permite múltiplas linhas vazias
        'max': 1, 'maxEOF': 1, 'maxBOF': 0
      }],
      // 'sort-imports': ['error', {
      //   'ignoreCase': true,
      //   'ignoreDeclarationSort': false,
      //   'ignoreMemberSort': false,
      //   'allowSeparatedGroups': true
      // }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  }
];
