module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: ["plugin:vue/recommended", "eslint:recommended", "prettier"],
    rules: {
        "vue/component-name-in-template-casing": ["error", "PascalCase"],
    },
    globals: {
        $nuxt: true,
    },
    parserOptions: {
        parser: "babel-eslint",
    },
};
