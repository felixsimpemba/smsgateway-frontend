<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <router-link to="/" class="flex justify-center items-center mb-6">
                <img src="/logo.png" alt="Feltech SMS Logo" class="h-16 w-auto" />
            </router-link>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
                Welcome back
            </h2>
            <p class="mt-2 text-center text-sm text-slate-600">
                Or
                <router-link to="/signup" class="font-medium text-brand-blue hover:text-brand-blue/80">
                    create a new account for free
                </router-link>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                class="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
                <form class="space-y-6" @submit.prevent="handleLogin">
                    <div v-if="error"
                        class="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 mb-4 transition-all animate-pulse">
                        {{ error }}
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-semibold text-slate-700">
                            Email address
                        </label>
                        <div class="mt-1">
                            <input id="email" v-model="form.email" name="email" type="email" autocomplete="email"
                                required
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                placeholder="name@company.com" :disabled="loading" />
                        </div>
                    </div>

                    <div class="relative">
                        <label for="password" class="block text-sm font-semibold text-slate-700">
                            Password
                        </label>
                        <div class="mt-1 relative">
                            <input id="password" v-model="form.password" name="password"
                                :type="showPassword ? 'text' : 'password'" autocomplete="current-password" required
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                placeholder="••••••••" :disabled="loading" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors">
                                <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                                <EyeSlashIcon v-else class="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                class="h-4 w-4 text-brand-blue focus:ring-brand-blue border-slate-300 rounded" />
                            <label for="remember-me" class="ml-2 block text-sm text-slate-600">
                                Remember me
                            </label>
                        </div>

                        <div class="text-sm">
                            <router-link to="/forgot-password"
                                class="font-medium text-brand-blue hover:text-brand-blue/80">
                                Forgot your password?
                            </router-link>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="loading">
                            <template v-if="loading">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Signing in...
                            </template>
                            <template v-else>
                                Sign in to your account
                            </template>
                        </button>
                    </div>
                </form>

                <!-- <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-slate-200"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-slate-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div class="mt-6">
                        <button @click="loginWithGoogle"
                            class="w-full inline-flex justify-center py-3 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
                            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.224 1.224-3.136 2.552-6.712 2.552-5.44 0-9.76-4.4-9.76-9.84s4.32-9.84 9.76-9.84c2.952 0 5.176 1.152 6.76 2.68l2.304-2.304C18.592 1.392 15.832 0 12.48 0 5.592 0 0 5.592 0 12.48S5.592 24.96 12.48 24.96c3.752 0 6.592-1.24 8.76-3.52 2.24-2.24 2.944-5.408 2.944-8.032 0-.768-.064-1.504-.184-2.192H12.48z" />
                            </svg>
                            Google
                        </button>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const store = useStore()
const router = useRouter()
const route = useRoute()

const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const form = reactive({
    email: '',
    password: ''
})

const loginWithGoogle = () => {
    // Redirect to backend Google auth route
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
}

const handleLogin = async () => {
    if (!form.email || !form.password) {
        error.value = 'Please enter both email and password.'
        return
    }

    loading.value = true
    error.value = ''
    try {
        const data = await store.dispatch('auth/login', {
            email: form.email,
            password: form.password
        })

        if (data?.two_factor_required) {
            sessionStorage.setItem('2fa_user_id', data.user_id)
            sessionStorage.setItem('2fa_method', data.method)
            router.push('/auth/2fa')
            return
        }

        // Redirect to original destination or fallback to dashboard
        const redirect = route.query.redirect || '/dashboard'
        router.push(decodeURIComponent(redirect))
    } catch (err) {
        // Handle specific error messages if returned by API
        const responseData = err.response?.data
        if (responseData?.errors) {
            // Get the first error message from the first field that has an error
            const firstField = Object.keys(responseData.errors)[0]
            error.value = responseData.errors[firstField][0]
        } else {
            error.value = responseData?.message || 'Invalid email or password. Please try again.'
        }
        console.error('Login error:', err)
    } finally {
        loading.value = false
    }
}
</script>
