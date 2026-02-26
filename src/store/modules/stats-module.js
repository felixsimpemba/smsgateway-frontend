import api from '../../services/api';

const state = {
    overview: {
        sent: 0,
        delivered: 0,
        failed: 0,
        balance: 0,
        recent_activity: []
    }
};

const mutations = {
    SET_STATS(state, stats) {
        state.overview = stats;
    }
};

const actions = {
    async fetchStats({ commit }) {
        try {
            const response = await api.get('/stats/overview');
            commit('SET_STATS', response.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
