import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/SignupView.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/auth/callback',
        name: 'AuthCallback',
        component: () => import('../views/AuthCallback.vue')
    },
    {
        path: '/docs',
        name: 'ApiDocs',
        component: () => import('../views/ApiDocsView.vue')
    },
    {
        path: '/auth/2fa',
        name: 'TwoFactorChallenge',
        component: () => import('../views/TwoFactorChallenge.vue')
    },
    {
        path: '/features',
        name: 'Features',
        component: () => import('../views/FeaturesView.vue')
    },
    {
        path: '/pricing',
        name: 'Pricing',
        component: () => import('../views/PricingView.vue')
    },
    {
        path: '/terms',
        name: 'Terms',
        component: () => import('../views/TermsView.vue')
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('../views/PrivacyView.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/ContactView.vue')
    },
    {
        path: '/cookie-policy',
        name: 'CookiePolicy',
        component: () => import('../views/CookiePolicyView.vue')
    },
    {
        path: '/dashboard',
        component: () => import('../views/DashboardView.vue'),
        meta: { requiresAuth: true },
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
                path: 'billing',
                name: 'Billing',
                component: () => import('../views/dashboard/Billing.vue')
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import('../views/dashboard/Settings.vue')
            }
        ]
    },
    // Payment gateway callbacks
    {
        path: '/payments/success',
        name: 'PaymentSuccess',
        component: () => import('../views/PaymentSuccess.vue')
    },
    {
        path: '/payments/failed',
        name: 'PaymentFailed',
        component: () => import('../views/PaymentFailed.vue')
    },
    // Catch-all 404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/HomeView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            try {
                if (document.querySelector(to.hash)) {
                    return { el: to.hash, behavior: 'smooth' }
                }
            } catch (e) {
                // Invalid selector — ignore
            }
        }
        return savedPosition || { top: 0 }
    }
})

// ─── Global Navigation Guard ────────────────────────────────────────────────
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
    const requiresGuest = to.matched.some(r => r.meta.requiresGuest)
    const token = localStorage.getItem('token')

    // ── Route requires authentication ──
    if (requiresAuth) {
        if (!token) {
            // No token at all → go to login, remember where they wanted to go
            return next({ name: 'Login', query: { redirect: to.fullPath } })
        }

        // Token present but user not yet loaded in Vuex (e.g. after page refresh)
        if (!store.state.auth.user) {
            try {
                await store.dispatch('auth/fetchUser')
                // fetchUser succeeded → user is now set in Vuex
            } catch {
                // fetchUser threw (401 from backend) → token is invalid/expired
                // auth-module already called LOGOUT; send to login with redirect
                return next({ name: 'Login', query: { redirect: to.fullPath } })
            }
        }

        return next()
    }

    // ── Route requires guest (login / signup) ──
    if (requiresGuest && token && store.state.auth.user) {
        return next({ name: 'DashboardOverview' })
    }

    next()
})

export default router