import api from '../../services/api';

const state = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
        state.isAuthenticated = !!user;
    },
    SET_TOKEN(state, token) {
        state.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    },
    SET_LOADING(state, val) {
        state.loading = val;
    },
    LOGOUT(state) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
    }
};

const actions = {
    async login({ commit }, credentials) {
        try {
            const response = await api.post('/login', credentials);

            if (response.data.two_factor_required) {
                return response.data;
            }

            const { token, user } = response.data;
            commit('SET_TOKEN', token);
            commit('SET_USER', user);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },
    async verifyTwoFactor({ commit }, payload) {
        try {
            const response = await api.post('/auth/2fa/verify', payload);
            const { token, user } = response.data;
            commit('SET_TOKEN', token);
            commit('SET_USER', user);
            return response.data;
        } catch (error) {
            console.error('2FA verification failed:', error);
            throw error;
        }
    },
    async sendTwoFactorChallengeCode({ commit }, { userId, method = null }) {
        try {
            await api.post('/auth/2fa/challenge/send', { 
                user_id: userId,
                method: method 
            });
        } catch (error) {
            console.error('Failed to send challenge code:', error);
            throw error;
        }
    },
    async getAvailable2FaMethods({ commit }, userId) {
        try {
            const response = await api.get('/auth/2fa/methods', { 
                params: { user_id: userId } 
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch 2FA methods:', error);
            throw error;
        }
    },
    async handleCallback({ commit }, token) {
        commit('SET_TOKEN', token);
        try {
            const response = await api.get('/user');
            commit('SET_USER', response.data);
            return response.data;
        } catch (error) {
            commit('LOGOUT');
            throw error;
        }
    },
    async register({ commit }, userData) {
        try {
            const response = await api.post('/register', userData);
            const { token, user } = response.data;
            commit('SET_TOKEN', token);
            commit('SET_USER', user);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    },
    async logout({ commit }) {
        try {
            await api.post('/logout');
        } catch {
            // Ignore — always clear local session
        } finally {
            commit('LOGOUT');
        }
    },
    async fetchUser({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await api.get('/user');
            commit('SET_USER', response.data);
            return response.data;
        } catch (error) {
            // Token is invalid / expired
            commit('LOGOUT');
            throw error; // Re-throw so router guard can handle redirect
        } finally {
            commit('SET_LOADING', false);
        }
    },
    async updateProfile({ commit }, userData) {
        try {
            const response = await api.put('/user', userData);
            commit('SET_USER', response.data.user);
            return response.data;
        } catch (error) {
            console.error('Update profile failed:', error);
            throw error;
        }
    },
    async updatePassword({ commit }, passwordData) {
        try {
            const response = await api.put('/user/password', passwordData);
            return response.data;
        } catch (error) {
            console.error('Update password failed:', error);
            throw error;
        }
    },
    async setupTwoFactor({ commit }, method) {
        try {
            const response = await api.get('/two-factor/setup', { params: { method } });
            return response.data;
        } catch (error) {
            console.error('2FA setup failed:', error);
            throw error;
        }
    },
    async sendTwoFactorCode({ commit }, payload) {
        try {
            const response = await api.post('/two-factor/send-code', payload);
            return response.data;
        } catch (error) {
            console.error('Failed to send 2FA code:', error);
            throw error;
        }
    },
    async enableTwoFactor({ commit, dispatch }, payload) {
        try {
            const response = await api.post('/two-factor/enable', payload);
            await dispatch('fetchUser');
            return response.data;
        } catch (error) {
            console.error('Failed to enable 2FA:', error);
            throw error;
        }
    },
    async disableTwoFactor({ commit, dispatch }, password) {
        try {
            const response = await api.post('/two-factor/disable', { password });
            await dispatch('fetchUser');
            return response.data;
        } catch (error) {
            console.error('Failed to disable 2FA:', error);
            throw error;
        }
    },
    async sendOnboardingEmail({ commit }) {
        try {
            const response = await api.post('/onboarding/email/send');
            return response.data;
        } catch (error) {
            console.error('Failed to send onboarding email:', error);
            throw error;
        }
    },
    async verifyOnboardingEmail({ dispatch }, code) {
        try {
            const response = await api.post('/onboarding/email/verify', { code });
            await dispatch('fetchUser');
            return response.data;
        } catch (error) {
            console.error('Failed to verify onboarding email:', error);
            throw error;
        }
    },
    async sendOnboardingPhone({ commit }) {
        try {
            const response = await api.post('/onboarding/phone/send');
            return response.data;
        } catch (error) {
            console.error('Failed to send onboarding phone:', error);
            throw error;
        }
    },
    async verifyOnboardingPhone({ dispatch }, code) {
        try {
            const response = await api.post('/onboarding/phone/verify', { code });
            await dispatch('fetchUser');
            return response.data;
        } catch (error) {
            console.error('Failed to verify onboarding phone:', error);
            throw error;
        }
    },
    async getOnboarding2FaSetup({ commit }) {
        try {
            const response = await api.get('/onboarding/2fa/setup');
            return response.data;
        } catch (error) {
            console.error('Failed to get onboarding 2FA setup:', error);
            throw error;
        }
    },
    async completeOnboarding({ commit, dispatch }, payload) {
        try {
            const response = await api.post('/onboarding/complete', payload);
            await dispatch('fetchUser');
            return response.data;
        } catch (error) {
            console.error('Failed to complete onboarding:', error);
            throw error;
        }
    },
    async selectOnboardingPlan({ commit, dispatch }, plan) {
        try {
            const response = await api.post('/onboarding/plan', { plan });
            await dispatch('fetchUser');
            return response.data;
        } catch (error) {
            console.error('Failed to select onboarding plan:', error);
            throw error;
        }
    }
};

const getters = {
    currentUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    token: state => state.token,
    isLoading: state => state.loading,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
