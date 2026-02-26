<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="flex justify-center items-center gap-2 mb-6">
                <div class="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-200">
                    <ShieldCheckIcon class="h-6 w-6 text-white" />
                </div>
                <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Secure Login</span>
            </div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
                Two-Factor Authentication
            </h2>
            <p class="mt-2 text-center text-sm text-slate-600">
                Enter the 6-digit code from your {{ methodName }} to continue.
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
                <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 mb-6 animate-pulse">
                    {{ error }}
                </div>

                <div v-if="message" class="bg-green-50 text-green-700 p-3 rounded-xl text-sm border border-green-100 mb-6">
                    {{ message }}
                </div>

                <form @submit.prevent="handleVerify" class="space-y-6">
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                            Verification Code
                        </label>
                        <input v-model="code" type="text" maxlength="6" required
                            class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-2xl font-bold tracking-[0.5em]"
                            placeholder="000000" :disabled="loading" autofocus>
                    </div>

                    <button type="submit"
                        class="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
                        :disabled="loading">
                        {{ loading ? 'Verifying...' : 'Verify & Continue' }}
                    </button>
                </form>

                <div v-if="method !== 'totp'" class="mt-6 text-center">
                    <button @click="resendCode" :disabled="resending" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50">
                        {{ resending ? 'Sending...' : "Didn't receive a code? Resend" }}
                    </button>
                </div>
                
                <div class="mt-4 text-center">
                    <router-link to="/login" class="text-xs text-slate-500 hover:text-slate-700">
                        Back to login
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ShieldCheckIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const route = useRoute()
const store = useStore()

const userId = ref(sessionStorage.getItem('2fa_user_id'))
const method = ref(sessionStorage.getItem('2fa_method'))
const code = ref('')
const loading = ref(false)
const resending = ref(false)
const error = ref('')
const message = ref('')

const methodName = computed(() => {
    switch (method.value) {
        case 'totp': return 'authenticator app'
        case 'email': return 'email'
        case 'sms': return 'phone'
        default: return 'device'
    }
})

onMounted(() => {
    if (!userId.value) {
        router.push('/login')
        return
    }
    
    // Auto-send code if method is email or sms
    if (method.value !== 'totp') {
        resendCode()
    }
})

const handleVerify = async () => {
    loading.value = true
    error.value = ''
    try {
        await store.dispatch('auth/verifyTwoFactor', {
            user_id: userId.value,
            code: code.value
        })
        sessionStorage.removeItem('2fa_user_id')
        sessionStorage.removeItem('2fa_method')
        router.push('/dashboard')
    } catch (err) {
        error.value = err.response?.data?.message || 'Invalid verification code'
    } finally {
        loading.value = false
    }
}

const resendCode = async () => {
    resending.value = true
    error.value = ''
    try {
        await store.dispatch('auth/sendTwoFactorChallengeCode', userId.value)
        message.value = 'A new code has been sent to your ' + methodName.value
        setTimeout(() => message.value = '', 5000)
    } catch (err) {
        error.value = 'Failed to resend code'
    } finally {
        resending.value = false
    }
}
</script>
