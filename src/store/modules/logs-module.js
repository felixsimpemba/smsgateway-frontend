const state = {
    logs: [
        { id: 1, recipient: '+1 234 567 8901', message: 'Your verification code is 4829. Do not share it.', status: 'Delivered', date: 'Feb 21, 2026', time: '10:45 AM', cost: '0.015' },
        { id: 2, recipient: '+44 7700 900077', message: 'Hey! Don\'t forget our meeting at 3 PM today.', status: 'Delivered', date: 'Feb 21, 2026', time: '09:30 AM', cost: '0.042' },
        { id: 3, recipient: '+1 987 654 3210', message: 'Appointment confirmation: Tuesday at 11 AM.', status: 'Pending', date: 'Feb 21, 2026', time: '08:15 AM', cost: '0.015' },
        { id: 4, recipient: '+1 555 010 9988', message: 'Flash Sale! Get 20% off with code FLASH20.', status: 'Failed', date: 'Feb 20, 2026', time: '06:20 PM', cost: '0.000' },
        { id: 5, recipient: '+33 6 12 34 56 78', message: 'Bienvenue chez SMSGate. Votre compte est actif.', status: 'Delivered', date: 'Feb 20, 2026', time: '04:15 PM', cost: '0.038' },
    ],
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
        // Simulate API call
        console.log('Fetching logs with filters:', state.filters);
        await new Promise(resolve => setTimeout(resolve, 500));
        commit('SET_LOADING', false);
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
