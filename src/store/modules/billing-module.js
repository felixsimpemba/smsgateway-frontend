import api from '../../services/api';

const state = {
    transactions: [],
    loading: false,
    initializing: false,
    error: null,
};

const mutations = {
    SET_TRANSACTIONS(state, transactions) {
        state.transactions = transactions;
    },
    SET_LOADING(state, value) {
        state.loading = value;
    },
    SET_INITIALIZING(state, value) {
        state.initializing = value;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
};

const actions = {
    async fetchTransactions({ commit }, page = 1) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        try {
            const response = await api.get(`/billing/transactions?page=${page}`);
            commit('SET_TRANSACTIONS', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            commit('SET_ERROR', 'Unable to load transaction history.');
            throw error;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async initializePayment({ commit }, amount) {
        commit('SET_INITIALIZING', true);
        commit('SET_ERROR', null);
        try {
            const response = await api.post('/payments/initialize', { amount });
            if (response.data.pay_url) {
                // Open gateway hosted checkout in new tab or current window
                window.location.href = response.data.pay_url;
            }
            return response.data;
        } catch (error) {
            console.error('Payment init failed:', error);
            commit('SET_ERROR', error.response?.data?.error || 'Unable to start payment process.');
            throw error;
        } finally {
            commit('SET_INITIALIZING', false);
        }
    }
};

const getters = {
    transactions: (state) => state.transactions,
    loading: (state) => state.loading,
    initializing: (state) => state.initializing,
    error: (state) => state.error,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
