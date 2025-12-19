import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules', 'dist', '.env', 'eslint.config.mjs'],
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      quotes: ['warn', 'single'], // Força o uso de aspas duplas
      semi: ['warn', 'always'], // Força o uso de ponto e vírgula no final das linhas
      'no-trailing-spaces': ['warn'], // Não permite espaços em branco no final das linhas
      'eol-last': ['warn', 'always'], // Exige uma linha vazia no final do arquivo
      'no-multiple-empty-lines': ['warn', { max: 1 }], // Não permite múltiplas linhas vazias
      // 'sort-imports': ['error', {
      //   'ignoreCase': true,
      //   'ignoreDeclarationSort': false,
      //   'ignoreMemberSort': false,
      //   'allowSeparatedGroups': true
      // }],
      'linebreak-style': ['warn', 'unix']
    }
  }
];
