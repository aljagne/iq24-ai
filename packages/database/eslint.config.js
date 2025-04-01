const baseConfig = require('@iq24/config/eslint/eslint.base');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
    ...baseConfig, // Spread the base configuration arrays
    {
        files: ["**/*.ts"],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },
        rules: {
             // Disable React-specific rules if they are in the base config
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react-hooks/rules-of-hooks": "off",
            "react-hooks/exhaustive-deps": "off",
            // Add any specific backend/db rules if needed
        }
    }
);
