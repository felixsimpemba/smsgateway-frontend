import api from '../../services/api';

const state = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
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
    LOGOUT(state) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
    }
};

const actions = {
    async login({ commit, dispatch }, credentials) {
        try {
            const response = await api.post('/login', credentials);
            
            if (response.data.two_factor_required) {
                return response.data; // Return { two_factor_required: true, user_id, method }
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
    async sendTwoFactorChallengeCode({ commit }, userId) {
        try {
            await api.post('/auth/2fa/challenge/send', { user_id: userId });
        } catch (error) {
            console.error('Failed to send challenge code:', error);
            throw error;
        }
    },
    async handleCallback({ commit, dispatch }, token) {
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
    async register({ commit, dispatch }, userData) {
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
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            commit('LOGOUT');
        }
    },
    async fetchUser({ commit }) {
        try {
            const response = await api.get('/user');
            commit('SET_USER', response.data);
        } catch (error) {
            console.error('Fetch user failed:', error);
            commit('LOGOUT');
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
    }
};

const getters = {
    currentUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    token: state => state.token
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
