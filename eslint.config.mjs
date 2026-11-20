import js from "@eslint/js";
import globals from "globals";

// Flat-config migration of .eslintrc.json for ESLint >= 9 (eslintrc support
// removed in ESLint 10). Same intent: eslint:recommended, browser + ES2022
// globals, module sources, unused-vars warning with _-prefixed args ignored,
// empty blocks allowed only for catch.
export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
];
