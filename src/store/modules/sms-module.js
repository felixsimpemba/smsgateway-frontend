import api from '../../services/api';

const state = {
    sending: false,
    lastStatus: null
};

const mutations = {
    SET_SENDING(state, status) {
        state.sending = status;
    },
    SET_STATUS(state, status) {
        state.lastStatus = status;
    }
};

const actions = {
    async sendSMS({ commit }, smsData) {
        commit('SET_SENDING', true);
        try {
            const response = await api.post('/sms/send', smsData);
            commit('SET_STATUS', 'success');
            return response.data;
        } catch (error) {
            console.error('Failed to send SMS:', error);
            commit('SET_STATUS', 'failed');
            throw error;
        } finally {
            commit('SET_SENDING', false);
        }
    }
};

const getters = {
    isSending: state => state.sending,
    lastSentStatus: state => state.lastStatus
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
