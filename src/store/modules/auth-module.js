const state = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
        state.isAuthenticated = !!user;
    },
    SET_TOKEN(state, token) {
        state.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    },
    LOGOUT(state) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
    }
};

const actions = {
    async login({ commit }, credentials) {
        // Placeholder for login logic
        // const response = await api.post('/login', credentials);
        // commit('SET_TOKEN', response.data.token);
        // commit('SET_USER', response.data.user);
        console.log('Login action triggered', credentials);
    },
    logout({ commit }) {
        commit('LOGOUT');
    },
    async fetchUser({ commit }) {
        // Placeholder for fetching user profile
        console.log('Fetch user action triggered');
    }
};

const getters = {
    currentUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    token: state => state.token
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
