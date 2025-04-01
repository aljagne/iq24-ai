// packages/config/eslint/eslint.base.js
const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");
const prettierConfig = require("eslint-config-prettier");
const tseslint = require("typescript-eslint");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const nextPlugin = require("@next/eslint-plugin-next"); // For Next.js specific rules

// Helper to mimic __dirname in ESM modules if needed, or for compatibility layer
const { fileURLToPath } = require("url");
// const __filename = fileURLToPath(import.meta.url); // Use if running as ESM module
// const __dirname = path.dirname(__filename); // Use if running as ESM module
const dirname = __dirname; // Use traditional __dirname if running as CJS (likely for eslint.config.js)

// FlatCompat allows using older config formats within the flat config structure
const compat = new FlatCompat({
    baseDirectory: dirname,
});

module.exports = tseslint.config(
    // TypeScript Parser and Plugin configuration
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true, // Important: enables type-aware linting rules
                               // Assumes tsconfig.json exists in consuming package/app
            },
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
             // React Plugin Setup (for TSX)
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            // Next Plugin (can be added here or in the Next.js specific config)
            '@next/next': nextPlugin,
        },
        rules: {
            // Recommended rules from TypeScript ESLint
            ...tseslint.configs.recommended.rules,
            ...tseslint.configs.stylistic.rules, // Optional: for style consistency

            // React Recommended Rules (apply to TSX)
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,

            // Next.js Core Web Vitals rules (apply globally if desired)
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,

            // Custom Rules (Examples)
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Warn unused vars, allow underscore prefix
            "@typescript-eslint/no-explicit-any": "warn", // Warn against using 'any'
            "react/react-in-jsx-scope": "off", // Not needed with React 17+ JSX transform
            "react/prop-types": "off", // Not needed when using TypeScript

            // Add other base rules applicable to both frontend and backend TS code
        },
        settings: {
            react: {
                version: "detect", // Automatically detect React version
            },
        },
    },
    // JavaScript files configuration (if you have JS files)
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            globals: { // Define global variables if needed (e.g., for browser or Node environments)
                // browser: true,
                // node: true,
            }
        },
        rules: {
             // Add JS-specific rules here if necessary
        }
    },
    // Apply Prettier compatibility rules LAST to override others
    {
        rules: prettierConfig.rules,
    }

    // You could potentially use compat.extends() here if you need to load
    // older eslintrc configs, but the above defines things directly.
    // Example: ...compat.extends("eslint-config-some-legacy-package")
);
