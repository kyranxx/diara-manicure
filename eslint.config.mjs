import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Allow unused variables prefixed with underscore
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
    "*.config.js",
    "*.config.mjs",
    "*.config.ts",
    "seo-test.js",
    "lib/security-monitor.ts",
    "public/**",
  ]),
]);

export default eslintConfig;
