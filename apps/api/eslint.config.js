const baseConfig = require('@iq24/config/eslint/eslint.base');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
    ...baseConfig, // Spread the base configuration arrays

    // Add api-specific configurations or overrides here
    {
        files: ["**/*.{ts,tsx}"], // Use tsx if you ever plan to use JSX in backend (unlikely)
        languageOptions: {
            parserOptions: {
                 // Ensure the project path points to the api's tsconfig
                project: ["./tsconfig.json"],
            },
             globals: {
                 // Add Node.js specific globals if base doesn't include them
                 "process": "readonly",
                 "__dirname": "readonly" // If using CommonJS modules still
             }
        },
        rules: {
             // Disable React rules if they were included in the base and not needed here
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react-hooks/rules-of-hooks": "off",
            "react-hooks/exhaustive-deps": "off",
            // Add specific backend rules
            // "@typescript-eslint/no-floating-promises": "error" // Good rule for backend async code
        },
        // Remove React settings if not applicable
        // settings: {
        //     react: undefined
        // }
    }
);
