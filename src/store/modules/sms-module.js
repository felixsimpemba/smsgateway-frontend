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
    async sendSMS({ commit }, payload) {
        commit('SET_SENDING', true);
        console.log('Sending SMS:', payload);
        await new Promise(resolve => setTimeout(resolve, 1000));
        commit('SET_SENDING', false);
        commit('SET_STATUS', 'success');
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
