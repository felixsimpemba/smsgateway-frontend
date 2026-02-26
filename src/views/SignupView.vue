<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <router-link to="/" class="flex justify-center items-center mb-6">
                <img src="/logo.png" alt="Feltech SMS Logo" class="h-16 w-auto" />
            </router-link>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
                Start sending in minutes
            </h2>
            <p class="mt-2 text-center text-sm text-slate-600">
                Already have an account?
                <router-link to="/login" class="font-medium text-brand-blue hover:text-brand-blue/80">
                    Sign in here
                </router-link>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                class="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
                <form class="space-y-6" @submit.prevent="handleSignup">
                    <div v-if="error"
                        class="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 mb-4 transition-all animate-pulse">
                        {{ error }}
                    </div>

                    <div>
                        <label for="name" class="block text-sm font-semibold text-slate-700">
                            Full Name
                        </label>
                        <div class="mt-1">
                            <input id="name" v-model="form.name" name="name" type="text" autocomplete="name" required
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                placeholder="John Doe" :disabled="loading" />
                        </div>
                    </div>

                    <div>
                        <label for="company" class="block text-sm font-semibold text-slate-700">
                            Company (optional)
                        </label>
                        <div class="mt-1">
                            <input id="company" v-model="form.company" name="company" type="text"
                                autocomplete="organization"
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                placeholder="The Tech Group" :disabled="loading" />
                        </div>
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

                    <div>
                        <label for="password" class="block text-sm font-semibold text-slate-700">
                            Password
                        </label>
                        <div class="mt-1">
                            <input id="password" v-model="form.password" name="password" type="password"
                                autocomplete="new-password" required
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                placeholder="••••••••" :disabled="loading" />
                        </div>
                        <p class="mt-2 text-xs text-slate-500">Must be at least 8 characters long.</p>
                    </div>

                    <div>
                        <label for="password_confirmation" class="block text-sm font-semibold text-slate-700">
                            Confirm Password
                        </label>
                        <div class="mt-1">
                            <input id="password_confirmation" v-model="form.password_confirmation"
                                name="password_confirmation" type="password" autocomplete="new-password" required
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                :class="{ 'border-red-300 focus:ring-red-500': passwordMismatch }"
                                placeholder="••••••••" :disabled="loading" />
                        </div>
                        <p v-if="passwordMismatch && form.password_confirmation" class="mt-2 text-xs text-red-600">
                            Passwords don't match
                        </p>
                    </div>

                    <div class="flex items-center">
                        <input id="terms" v-model="form.terms" name="terms" type="checkbox" required
                            class="h-4 w-4 text-brand-blue focus:ring-brand-blue border-slate-300 rounded" />
                        <label for="terms" class="ml-2 block text-sm text-slate-600">
                            I agree to the
                            <a href="#" class="font-medium text-brand-blue hover:text-brand-blue/80">Terms of
                                Service</a>
                            and
                            <a href="#" class="font-medium text-brand-blue hover:text-brand-blue/80">Privacy Policy</a>.
                        </label>
                    </div>

                    <div>
                        <button type="submit"
                            class="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="loading || passwordMismatch">
                            <template v-if="loading">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Creating account...
                            </template>
                            <template v-else>
                                Create my free account
                            </template>
                        </button>
                    </div>
                </form>

                <div class="mt-6">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline'
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const loading = ref(false)
const error = ref('')
const form = reactive({
    name: '',
    company: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false
})

const loginWithGoogle = () => {
    // Redirect to backend Google auth route
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
}


const passwordMismatch = computed(() => {
    return form.password && form.password_confirmation && form.password !== form.password_confirmation
})

const handleSignup = async () => {
    try {
        // Clear any previous errors
        error.value = ''

        // Validate password match
        if (form.password !== form.password_confirmation) {
            error.value = 'Passwords do not match'
            return
        }

        // Validate password length
        if (form.password.length < 8) {
            error.value = 'Password must be at least 8 characters long'
            return
        }

        // Validate terms acceptance
        if (!form.terms) {
            error.value = 'You must agree to the Terms of Service and Privacy Policy'
            return
        }

        loading.value = true

        await store.dispatch('auth/register', {
            name: form.name,
            company: form.company,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation
        })

        // Redirect to dashboard on success
        router.push('/dashboard')
    } catch (err) {
        console.error('Signup error:', err)
        error.value = err.response?.data?.message || err.message || 'An error occurred during signup. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>