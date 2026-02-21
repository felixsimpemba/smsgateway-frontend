import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/SignupView.vue')
    },
    {
        path: '/dashboard',
        component: () => import('../views/DashboardView.vue'),
        children: [
            {
                path: '',
                name: 'DashboardOverview',
                component: () => import('../views/dashboard/Overview.vue')
            },
            {
                path: 'send',
                name: 'SendSMS',
                component: () => import('../views/dashboard/SendSMS.vue')
            },
            {
                path: 'sender-ids',
                name: 'SenderIDs',
                component: () => import('../views/dashboard/SenderIDs.vue')
            },
            {
                path: 'logs',
                name: 'Logs',
                component: () => import('../views/dashboard/Logs.vue')
            },
            {
                path: 'contacts',
                name: 'Contacts',
                component: () => import('../views/dashboard/Contacts.vue')
            },
            {
                path: 'keys',
                name: 'APIKeys',
                component: () => import('../views/dashboard/APIKeys.vue')
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import('../views/dashboard/Settings.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router