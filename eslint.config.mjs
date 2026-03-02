import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import functional from "eslint-plugin-functional";
import immutable from "eslint-plugin-immutable";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Functional + immutable + no default export (except app/)
  {
    plugins: {
      functional,
      immutable,
      import: importPlugin,
    },
    rules: {
      "functional/no-let": "error",
      "functional/prefer-readonly-type": "error",
      "no-var": "error",
      "import/no-default-export": "error",
      "no-implicit-coercion": "error",
    },
  },
  // Allow default export in App Router files and root config files
  {
    files: [
      "src/app/**/*.ts",
      "src/app/**/*.tsx",
      "eslint.config.mjs",
      "next.config.*",
      "postcss.config.*",
      "drizzle.config.*",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },
]);

export default eslintConfig;
