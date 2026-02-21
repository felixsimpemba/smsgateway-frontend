const state = {
    contacts: [
        { id: 1, name: 'Alice Johnson', initials: 'AJ', phone: '+1 234 567 8901', group: 'Customers' },
        { id: 2, name: 'Bob Smith', initials: 'BS', phone: '+1 987 654 3210', group: 'VIP Members' },
        { id: 3, name: 'Charlie Davis', initials: 'CD', phone: '+44 7700 900077', group: 'Customers' },
        { id: 4, name: 'Diana Prince', initials: 'DP', phone: '+1 555 010 9988', group: 'Marketing List' },
        { id: 5, name: 'Edward Norton', initials: 'EN', phone: '+49 151 23456789', group: 'Customers' },
    ],
    groups: [
        { name: 'All Contacts', count: 124, active: true },
        { name: 'Customers', count: 85, active: false },
        { name: 'VIP Members', count: 12, active: false },
        { name: 'Marketing List', count: 27, active: false },
    ]
};

const mutations = {
    SET_CONTACTS(state, contacts) {
        state.contacts = contacts;
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
        console.log('Fetching contacts...');
    }
};

const getters = {
    allContacts: state => state.contacts,
    allGroups: state => state.groups
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
