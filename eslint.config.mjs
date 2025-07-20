
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["src/schemas/openapi3/openapi.schema.d.ts"],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReactConfig,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
        ...pluginReactConfig.rules,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off",
    }
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "varsIgnorePattern": "^_",
          "argsIgnorePattern": "^_"
        }
      ],
      "@typescript-eslint/no-empty-object-type": "off"
    }
  },
  prettierConfig,
];
