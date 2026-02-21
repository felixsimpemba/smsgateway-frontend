const state = {
    apiKeys: [
        { id: 1, name: 'Production App', value: 'YOUR_LIVE_API_KEY', created: 'Jan 12, 2026', active: true, show: false },
        { id: 2, name: 'Testing/Development', value: 'YOUR_TEST_API_KEY', created: 'Feb 05, 2026', active: true, show: false },
    ]
};

const mutations = {
    SET_KEYS(state, keys) {
        state.apiKeys = keys;
    },
    ADD_KEY(state, key) {
        state.apiKeys.push(key);
    },
    REMOVE_KEY(state, id) {
        state.apiKeys = state.apiKeys.filter(k => k.id !== id);
    },
    TOGGLE_KEY_VISIBILITY(state, id) {
        const key = state.apiKeys.find(k => k.id === id);
        if (key) {
            key.show = !key.show;
        }
    }
};

const actions = {
    async fetchKeys({ commit }) {
        // Simulate API call
        console.log('Fetching API keys...');
    },
    async generateKey({ commit }, name) {
        const newKey = {
            id: Date.now(),
            name: name || 'New API Key',
            value: 'ftms_live_' + Math.random().toString(36).substring(7),
            created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            active: true,
            show: false
        };
        commit('ADD_KEY', newKey);
    },
    async deleteKey({ commit }, id) {
        commit('REMOVE_KEY', id);
    }
};

const getters = {
    allKeys: state => state.apiKeys
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
