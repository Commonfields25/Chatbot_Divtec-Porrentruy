// eslint.config.js
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";

export default tseslint.config(
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
        ...tseslint.configs.recommended,
    ],
    plugins: {
      react: reactPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
        ...reactPlugin.configs.recommended.rules,
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs["core-web-vitals"].rules,
        "@typescript-eslint/no-explicit-any": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
  }
);
