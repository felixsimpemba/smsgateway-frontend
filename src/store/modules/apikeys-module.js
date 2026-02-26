import api from '../../services/api';

const state = {
    apiKeys: []
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
        try {
            const response = await api.get('/api-keys');
            commit('SET_KEYS', response.data);
        } catch (error) {
            console.error('Failed to fetch API keys:', error);
        }
    },
    async generateKey({ commit }, name) {
        try {
            const response = await api.post('/api-keys', { name });
            commit('ADD_KEY', { ...response.data, show: false });
        } catch (error) {
            console.error('Failed to generate API key:', error);
        }
    },
    async deleteKey({ commit }, id) {
        try {
            await api.delete(`/api-keys/${id}`);
            commit('REMOVE_KEY', id);
        } catch (error) {
            console.error('Failed to delete API key:', error);
        }
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
