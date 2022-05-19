export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "dindin",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        "~/assets/css/main.scss",
        "~/assets/css/fontawesome.css",
        "~/assets/css/solid.min.css",
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: "~/plugins/axios.js", ssr: true },
        { src: "~/plugins/localStorage.js", ssr: false },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ["@nuxtjs/vuetify"],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        [
            "@nuxtjs/firebase",
            {
                config: {
                    apiKey: "AIzaSyC38_lJL-jncuQgjmr6P1wclR_WZ2vOkRU",
                    authDomain: "dindinfinance.firebaseapp.com",
                    projectId: "dindinfinance",
                    storageBucket: "dindinfinance.appspot.com",
                    messagingSenderId: "125881301157",
                    appId: "1:125881301157:web:b29d2fde8dbfbe54dcf54c",
                    measurementId: "G-S6JFL3JQYG",
                },
                services: {
                    auth: {
                        initialize: {
                            onAuthStateChangedMutation:
                                "ON_AUTH_STATE_CHANGED_MUTATION",
                            // onAuthStateChangedAction: 'onAuthStateChangedAction'
                        },
                    },
                },
            },
        ],
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.AXIOS_URL,
    },

    vuetify: {
        //customVariables: ['~/assets/scss/vuetifyvar.scss'],
        treeShake: true,
        theme: {
            light: true,
            themes: {
                light: {
                    primary: "#5BD098",
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    watchers: {
        webpack: {
            poll: true,
        },
    },
};
