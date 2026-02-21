const state = {
    senderIds: [
        { name: 'SMS_GATE', useCase: 'OTP / Alerts', status: 'Active', date: 'Jan 15, 2026' },
        { name: 'S_GATE_MKT', useCase: 'Marketing', status: 'Active', date: 'Jan 20, 2026' },
        { name: 'VERIFY_NOW', useCase: 'OTP', status: 'Pending', date: 'Feb 18, 2026' },
    ],
    summary: [
        { label: 'Total Active', value: '4' },
        { label: 'Pending Review', value: '1', colorClass: 'text-orange-500 dark:text-orange-400' },
        { label: 'Global Coverage', value: '120+', colorClass: 'text-blue-600 dark:text-blue-400' },
    ]
};

const mutations = {
    ADD_SENDER_ID(state, payload) {
        state.senderIds.push({
            ...payload,
            status: 'Pending',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        });
    }
};

const actions = {
    async requestSenderId({ commit }, payload) {
        // Simulate API call
        console.log('Requesting new sender ID:', payload);
        await new Promise(resolve => setTimeout(resolve, 1000));
        commit('ADD_SENDER_ID', payload);
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
