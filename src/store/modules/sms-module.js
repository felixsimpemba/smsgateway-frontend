import api from '../../services/api';

const state = {
    sending: false,
    lastStatus: null,
    lastError: null,
    campaigns: [],
    campaignLoading: false,
};

const mutations = {
    SET_SENDING(state, status) { state.sending = status; },
    SET_STATUS(state, status) { state.lastStatus = status; },
    SET_ERROR(state, error) { state.lastError = error; },
    SET_CAMPAIGNS(state, campaigns) { state.campaigns = campaigns; },
    SET_CAMPAIGN_LOADING(state, status) { state.campaignLoading = status; },
    ADD_CAMPAIGN(state, campaign) { state.campaigns.unshift(campaign); },
};

const actions = {
    // Single SMS send
    async sendSMS({ commit }, smsData) {
        commit('SET_SENDING', true);
        commit('SET_ERROR', null);
        try {
            const payload = {
                to: smsData.recipients,
                message: smsData.message,
                sender_id: smsData.senderId || undefined,
                scheduled_at: smsData.isScheduled && smsData.scheduleDate && smsData.scheduleTime
                    ? `${smsData.scheduleDate}T${smsData.scheduleTime}:00`
                    : undefined,
            };
            const response = await api.post('/sms/send', payload);
            commit('SET_STATUS', 'success');
            return response.data;
        } catch (error) {
            const msg = error?.response?.data?.message || 'Failed to send SMS';
            commit('SET_STATUS', 'failed');
            commit('SET_ERROR', msg);
            throw error;
        } finally {
            commit('SET_SENDING', false);
        }
    },

    // Bulk SMS send (campaign)
    async sendBulk({ commit }, bulkData) {
        commit('SET_SENDING', true);
        commit('SET_ERROR', null);
        try {
            const payload = {
                to: bulkData.recipients, // backend expects 'to' as array
                message: bulkData.message,
                sender_id: bulkData.senderId || undefined,
                campaign_name: bulkData.campaignName || undefined,
                scheduled_at: bulkData.isScheduled && bulkData.scheduleDate && bulkData.scheduleTime
                    ? `${bulkData.scheduleDate}T${bulkData.scheduleTime}:00`
                    : undefined,
            };
            const response = await api.post('/sms/send-bulk', payload);
            commit('SET_STATUS', 'success');
            return response.data;
        } catch (error) {
            const msg = error?.response?.data?.message || 'Failed to send bulk SMS';
            commit('SET_STATUS', 'failed');
            commit('SET_ERROR', msg);
            throw error;
        } finally {
            commit('SET_SENDING', false);
        }
    },
};

const getters = {
    isSending: state => state.sending,
    lastSentStatus: state => state.lastStatus,
    lastError: state => state.lastError,
    campaigns: state => state.campaigns,
    isCampaignLoading: state => state.campaignLoading,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
