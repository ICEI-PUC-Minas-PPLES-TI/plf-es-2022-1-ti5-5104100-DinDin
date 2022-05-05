import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

export default ({ store }) => {
    createPersistedState({
        key: "dindin-cookies",
        paths: [],
        storage: {
            getItem: (key) => Cookies.get(key),
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) =>
                Cookies.set(key, value, { expires: 3, secure: false }),
            removeItem: (key) => Cookies.remove(key),
        },
    })(store);
};
