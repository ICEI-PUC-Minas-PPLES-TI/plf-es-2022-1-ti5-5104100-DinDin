import axios from "axios";
import { getAuth } from "firebase/auth";

export const state = () => ({
    user: false,
});

export const mutations = {
    ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser /*, claims*/ }) => {
        if (authUser) {
            state.user = {
                uid: authUser.uid,
            };
        } else {
            state.user = false;
        }
    },
};

export const actions = {
    async nuxtServerInit(
        { dispatch /*, commit*/, getters },
        { req, redirect }
    ) {
        let x = JSON.parse(getCookie("dindin-cookies", req.headers.cookie));

        if (x && req.url != "/login" && req.url != "/register") {
            if (x.login) {
                if (!x.login.token) {
                    const firebaseUser = getAuth().currentUser;
                    if (firebaseUser) {
                        const firebaseToken = await firebaseUser.getIdToken();
                        const res = await axios.post("/auth/login", {
                            token: firebaseToken,
                        });

                        await dispatch("login/setToken", res.data.token);
                    } else redirect("/login");
                } else await dispatch("login/setToken", x.login.token);

                axios.defaults.headers.common["x-access-token"] =
                    getters["login/token"];
            } else redirect("/login");
        } else if (req.url != "/register") redirect("/login");
    },
};

function getCookie(cookieName, stringCookie) {
    let strCookie = new RegExp("" + cookieName + "[^;]+").exec(stringCookie);
    if (strCookie == null) return null;
    else
        return unescape(
            strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, "") : ""
        );
}
