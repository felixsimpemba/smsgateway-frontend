import api from '../../services/api';

const state = {
    contacts: [],
    loading: false,
    groups: [
        { name: 'All Contacts', count: 0, active: true },
    ]
};

const mutations = {
    SET_CONTACTS(state, contacts) {
        state.contacts = contacts;
    },
    SET_LOADING(state, val) {
        state.loading = val;
    },
    SET_GROUPS(state, groups) {
        state.groups = groups;
    },
    ADD_CONTACT(state, contact) {
        state.contacts.push(contact);
    },
    SET_ACTIVE_GROUP(state, groupName) {
        state.groups.forEach(g => {
            g.active = g.name === groupName;
        });
    }
};

const actions = {
    async fetchContacts({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await api.get('/contacts');
            commit('SET_CONTACTS', response.data.contacts || []);
            if (response.data.groups) commit('SET_GROUPS', response.data.groups);
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    }
};

const getters = {
    allContacts: state => state.contacts,
    allGroups: state => state.groups,
    isLoading: state => state.loading
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
