<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="flex justify-center items-center gap-2 mb-8">
                <div class="bg-indigo-600 p-2 rounded-2xl shadow-xl shadow-indigo-200">
                    <ShieldCheckIcon class="h-8 w-8 text-white" />
                </div>
                <span class="text-3xl font-extrabold tracking-tight text-slate-900">FeltechSMS</span>
            </div>
            
            <div class="bg-white py-10 px-6 shadow-2xl shadow-slate-200/60 sm:rounded-[2.5rem] sm:px-12 border border-slate-100">
                <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold text-slate-900">
                        {{ showMethodSelection ? 'Choose Verification Method' : 'Two-Factor Authentication' }}
                    </h2>
                    <p class="mt-2 text-sm text-slate-500">
                        {{ showMethodSelection ? 'Select how you want to receive your code' : `Enter the 6-digit code sent via ${methodLabel}` }}
                    </p>
                </div>

                <div v-if="error" class="mb-6 animate-shake">
                    <div class="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 flex items-center gap-3">
                        <ExclamationTriangleIcon class="h-5 w-5 flex-shrink-0" />
                        {{ error }}
                    </div>
                </div>

                <div v-if="message" class="mb-6">
                    <div class="bg-green-50 text-green-700 p-4 rounded-2xl text-sm border border-green-100 flex items-center gap-3">
                        <CheckCircleIcon class="h-5 w-5 flex-shrink-0" />
                        {{ message }}
                    </div>
                </div>

                <!-- Method Selection -->
                <div v-if="showMethodSelection" class="space-y-4">
                    <button v-for="m in availableMethods" :key="m" @click="selectMethod(m)"
                        class="w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all hover:bg-slate-50 active:scale-[0.98]"
                        :class="m === method ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 bg-white hover:border-slate-200'">
                        <div class="p-2 rounded-xl" :class="m === method ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'">
                            <component :is="getMethodIcon(m)" class="h-6 w-6" />
                        </div>
                        <div class="text-left">
                            <div class="font-bold text-slate-900">{{ getMethodName(m) }}</div>
                            <div class="text-xs text-slate-500">{{ getMethodDescription(m) }}</div>
                        </div>
                        <ChevronRightIcon class="h-5 w-5 ml-auto text-slate-300" />
                    </button>
                    
                    <button @click="showMethodSelection = false" class="w-full py-3 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                        Cancel
                    </button>
                </div>

                <!-- Verification Form -->
                <form v-else @submit.prevent="handleVerify" class="space-y-8">
                    <div class="relative">
                        <div class="flex justify-between gap-2 max-w-[300px] mx-auto">
                            <div v-for="i in 6" :key="i" 
                                class="w-10 h-14 border-2 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-200"
                                :class="[
                                    code.length >= i ? 'border-indigo-600 text-indigo-600 bg-indigo-50/20' : 'border-slate-200 text-slate-300',
                                    (code.length === i - 1 && !loading) ? 'border-indigo-400 ring-4 ring-indigo-50' : ''
                                ]">
                                {{ code[i-1] || '' }}
                            </div>
                        </div>
                        <input v-model="code" type="text" maxlength="6" required ref="codeInput"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-default"
                            :disabled="loading" autofocus @input="handleInput">
                    </div>

                    <div class="space-y-4">
                        <button type="submit"
                            class="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-indigo-200 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:hover:translate-y-0"
                            :disabled="loading || code.length !== 6">
                            <span v-if="loading" class="flex items-center gap-2">
                                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Verifying...
                            </span>
                            <span v-else>Verify & Continue</span>
                        </button>

                        <div class="flex flex-col gap-3 items-center pt-2">
                            <button v-if="method !== 'totp'" type="button" @click="resendCode" :disabled="resending || countdown > 0"
                                class="text-sm font-semibold text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:text-slate-400 group flex items-center gap-2">
                                <ArrowPathIcon class="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" :class="{'animate-spin': resending}"/>
                                {{ countdown > 0 ? `Resend code in ${countdown}s` : "Didn't receive a code? Resend" }}
                            </button>
                            
                            <button v-if="availableMethods.length > 1" type="button" @click="showMethodSelection = true"
                                class="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                                Try another way
                            </button>
                        </div>
                    </div>
                </form>

                <div class="mt-8 pt-6 border-t border-slate-50 text-center text-xs text-slate-400">
                    Not you? <router-link to="/login" class="text-slate-600 font-medium hover:underline">Sign in as different user</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { 
    ShieldCheckIcon, 
    DevicePhoneMobileIcon, 
    EnvelopeIcon, 
    KeyIcon, 
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    ArrowPathIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const store = useStore()
const codeInput = ref(null)

const userId = ref(sessionStorage.getItem('2fa_user_id'))
const method = ref(sessionStorage.getItem('2fa_method'))
const availableMethods = ref([])
const showMethodSelection = ref(false)

const code = ref('')
const loading = ref(false)
const resending = ref(false)
const error = ref('')
const message = ref('')
const countdown = ref(0)
let timer = null

const methodLabel = computed(() => {
    switch (method.value) {
        case 'totp': return 'authenticator app'
        case 'email': return 'email'
        case 'sms': return 'phone'
        default: return 'device'
    }
})

onMounted(async () => {
    if (!userId.value) {
        router.push('/login')
        return
    }

    try {
        const data = await store.dispatch('auth/getAvailable2FaMethods', userId.value)
        availableMethods.value = data.methods
        
        // If current method is not available or not set, use default from backend
        if (!method.value || !availableMethods.value.includes(method.value)) {
            method.value = data.default_method
            sessionStorage.setItem('2fa_method', method.value)
        }
        
        // Auto-send if it's not app-based
        if (method.value !== 'totp') {
            resendCode()
        }
    } catch (err) {
        error.value = 'Security session expired. Please login again.'
        setTimeout(() => router.push('/login'), 3000)
    }
})

const startCountdown = () => {
    countdown.value = 60
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) clearInterval(timer)
    }, 1000)
}

const selectMethod = (m) => {
    method.value = m
    sessionStorage.setItem('2fa_method', m)
    showMethodSelection.value = false
    code.value = ''
    if (m !== 'totp') {
        resendCode()
    }
}

const handleInput = (e) => {
    code.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
    if (code.value.length === 6) {
        handleVerify()
    }
}

const handleVerify = async () => {
    if (loading.value || code.value.length !== 6) return
    
    loading.value = true
    error.value = ''
    try {
        await store.dispatch('auth/verifyTwoFactor', {
            user_id: userId.value,
            code: code.value,
            method: method.value
        })
        sessionStorage.removeItem('2fa_user_id')
        sessionStorage.removeItem('2fa_method')
        router.push('/dashboard')
    } catch (err) {
        error.value = err.response?.data?.message || 'Invalid verification code'
        code.value = ''
    } finally {
        loading.value = false
    }
}

const resendCode = async () => {
    if (resending.value || countdown.value > 0) return
    
    resending.value = true
    error.value = ''
    try {
        await store.dispatch('auth/sendTwoFactorChallengeCode', { 
            userId: userId.value, 
            method: method.value 
        })
        message.value = 'A new code has been sent successfully'
        startCountdown()
        setTimeout(() => message.value = '', 5000)
    } catch (err) {
        error.value = 'Too many requests. Please try again later.'
    } finally {
        resending.value = false
    }
}

const getMethodIcon = (m) => {
    switch (m) {
        case 'totp': return KeyIcon
        case 'email': return EnvelopeIcon
        case 'sms': return DevicePhoneMobileIcon
        default: return ShieldCheckIcon
    }
}

const getMethodName = (m) => {
    switch (m) {
        case 'totp': return 'Authenticator App'
        case 'email': return 'Email Verification'
        case 'sms': return 'SMS Text Message'
        default: return m
    }
}

const getMethodDescription = (m) => {
    switch (m) {
        case 'totp': return 'Use Google Authenticator or similar'
        case 'email': return 'Code sent to your registered email'
        case 'sms': return 'Code sent to your mobile phone'
        default: return ''
    }
}
</script>

<style scoped>
.animate-shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
