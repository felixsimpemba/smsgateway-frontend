import api from '../../services/api';

const state = {
    logs: [],
    loading: false,
    filters: {
        search: '',
        status: 'All Statuses',
        dateRange: 'Last 7 Days'
    }
};

const mutations = {
    SET_LOGS(state, logs) {
        state.logs = logs;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    UPDATE_FILTERS(state, filters) {
        state.filters = { ...state.filters, ...filters };
    }
};

const actions = {
    async fetchLogs({ commit, state }) {
        commit('SET_LOADING', true);
        try {
            const params = { ...state.filters };
            if (params.status === 'All Statuses') delete params.status;
            
            const response = await api.get('/sms/logs', { params });
            // The backend returns { data: { data: [...], ... } } for pagination
            commit('SET_LOGS', response.data.data.data || []);
        } catch (error) {
            console.error('Failed to fetch logs:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },
    async exportLogs({ state }) {
        console.log('Exporting logs as CSV...');
        // Real export logic would go here
    }
};

const getters = {
    allLogs: state => state.logs,
    isLoading: state => state.loading,
    currentFilters: state => state.filters
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
