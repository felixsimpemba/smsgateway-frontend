const state = {
    overview: {
        sent: 12845,
        delivered: 12201,
        failed: 644,
        balance: 425.50
    }
};

const mutations = {
    SET_STATS(state, stats) {
        state.overview = stats;
    }
};

const actions = {
    async fetchStats({ commit }) {
        console.log('Fetching stats...');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
