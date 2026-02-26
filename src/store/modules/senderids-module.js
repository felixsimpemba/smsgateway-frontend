import api from '../../services/api';

const state = {
    senderIds: [],
    summary: [
        { label: 'Total Active', value: '0' },
        { label: 'Pending Review', value: '0', colorClass: 'text-orange-500 dark:text-orange-400' },
        { label: 'Global Coverage', value: '0', colorClass: 'text-blue-600 dark:text-blue-400' },
    ]
};

const mutations = {
    SET_SENDER_IDS(state, senderIds) {
        state.senderIds = senderIds;
        
        // Update summary
        const activeCount = senderIds.filter(s => s.status === 'Approved').length;
        const pendingCount = senderIds.filter(s => s.status === 'Pending').length;
        
        state.summary = [
            { label: 'Total Active', value: activeCount.toString() },
            { label: 'Pending Review', value: pendingCount.toString(), colorClass: 'text-orange-500 dark:text-orange-400' },
            { label: 'Global Coverage', value: '190+', colorClass: 'text-blue-600 dark:text-blue-400' },
        ];
    },
    ADD_SENDER_ID(state, payload) {
        state.senderIds.unshift(payload);
    }
};

const actions = {
    async fetchSenderIds({ commit }) {
        try {
            const response = await api.get('/sender-ids');
            commit('SET_SENDER_IDS', response.data);
        } catch (error) {
            console.error('Failed to fetch sender IDs:', error);
        }
    },
    async requestSenderId({ commit, dispatch }, payload) {
        try {
            // Correct the field name to match backend (use_case vs useCase)
            const backendData = {
                name: payload.name,
                use_case: payload.useCase
            };
            const response = await api.post('/sender-ids', backendData);
            commit('ADD_SENDER_ID', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to request sender ID:', error);
            throw error;
        }
    }
};

const getters = {
    allSenderIds: state => state.senderIds,
    summaryStats: state => state.summary
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
