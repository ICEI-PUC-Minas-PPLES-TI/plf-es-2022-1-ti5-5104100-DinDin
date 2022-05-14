export const state = () => ({
    token: null,
    userId: null,
});

export const mutations = {
    LOGIN(state, token) {
        state.token = token;
    },
    LOGOUT(state) {
        state.token = null;
    },
    SETUSERID(state, id) {
        state.userId = id;
    },
};

export const actions = {
    userLogin({ commit }, { loginData, router /*, axios*/ }) {
        commit("LOGIN", loginData);
        router.push("/dashboard");
    },
    setToken({ commit }, token) {
        return commit("LOGIN", token);
    },
    setUserId({ commit }, id) {
        return commit("SETUSERID", id);
    },
    async userLogout({ commit }, { router }) {
        if (router) await router.push("/login");
        commit("LOGOUT");
    },
};

export const getters = {
    token(state) {
        return state.token;
    },
    userId(state) {
        return state.userId;
    },
};
