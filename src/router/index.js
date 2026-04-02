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
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('../views/ForgotPasswordView.vue'),
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
router.beforeEach(async (to, from) => {
    const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
    const requiresGuest = to.matched.some(r => r.meta.requiresGuest)
    const token = localStorage.getItem('token')

    // ── Route requires authentication ──
    if (requiresAuth) {
        if (!token) {
            return { name: 'Login', query: { redirect: to.fullPath } }
        }

        if (!store.state.auth.user) {
            try {
                await store.dispatch('auth/fetchUser')
            } catch {
                return { name: 'Login', query: { redirect: to.fullPath } }
            }
        }

        // Check onboarding completion
        if (!store.state.auth.user.onboarding_completed_at && to.name !== 'Signup') {
            return { name: 'Signup' }
        }

        return true
    }

    // ── Route requires guest (login / signup) ──
    if (requiresGuest && token) {
        // If they have a token, we need to check if they've finished onboarding
        if (!store.state.auth.user) {
            try {
                await store.dispatch('auth/fetchUser')
            } catch {
                return true // Token invalid, stay on guest page
            }
        }

        if (store.state.auth.user.onboarding_completed_at) {
            return { name: 'DashboardOverview' }
        }
        
        // If on login but onboarding incomplete, go to signup
        if (to.name === 'Login') {
            return { name: 'Signup' }
        }

        return true // Allow staying on Signup if onboarding is incomplete
    }

    return true
})

export default router