module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "prettier"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": "error",
    },
    overrides: [
        {
            files: ["*.vue"],
            rules: {
                "vue/multi-word-component-names": 0,
            },
        },
    ],
    globals: {
        $nuxt: true,
    },
    parserOptions: {
        ecmaVersion: 11,
    },
};
