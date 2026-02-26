import api from '../../services/api';

const state = {
    plans: [],
    loading: false,
    error: null,
};

const mutations = {
    SET_PLANS(state, plans) {
        state.plans = plans;
    },
    SET_LOADING(state, value) {
        state.loading = value;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
};

const actions = {
    async fetchPlans({ commit }) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        try {
            const response = await api.get('/pricing/plans');
            commit('SET_PLANS', response.data);
        } catch (error) {
            console.error('Failed to fetch pricing plans:', error);
            commit('SET_ERROR', 'Unable to load pricing plans. Please try again later.');
        } finally {
            commit('SET_LOADING', false);
        }
    },
};

const getters = {
    plans: (state) => state.plans,
    loading: (state) => state.loading,
    error: (state) => state.error,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
