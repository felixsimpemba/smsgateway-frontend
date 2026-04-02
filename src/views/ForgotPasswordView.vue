<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <router-link to="/" class="flex justify-center items-center mb-6">
                <img src="/logo.png" alt="Feltech SMS Logo" class="h-16 w-auto" />
            </router-link>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
                Reset your password
            </h2>
            <p class="mt-2 text-center text-sm text-slate-600">
                Or
                <router-link to="/login" class="font-medium text-brand-blue hover:text-brand-blue/80">
                    return to login
                </router-link>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
                <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 mb-4">
                    {{ error }}
                </div>
                <div v-if="successMsg" class="bg-green-50 text-green-600 p-3 rounded-xl text-sm border border-green-100 mb-4">
                    {{ successMsg }}
                </div>

                <!-- Step 1: Request Code -->
                <form v-if="step === 1" class="space-y-6" @submit.prevent="handleSendCode">
                    <div>
                        <label for="email" class="block text-sm font-semibold text-slate-700">Email address</label>
                        <div class="mt-1">
                            <input id="email" v-model="form.email" type="email" required
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                placeholder="name@company.com" :disabled="loading" />
                        </div>
                    </div>
                    <button type="submit" :disabled="loading"
                        class="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all disabled:opacity-50">
                        <span v-if="loading">Sending Code...</span>
                        <span v-else>Send Verification Code</span>
                    </button>
                </form>

                <!-- Step 2: Verify Code -->
                <form v-if="step === 2" class="space-y-6" @submit.prevent="handleVerifyCode">
                    <p class="text-sm text-slate-600">We've sent a 6-digit verification code to <strong>{{ form.email }}</strong>. Please enter it below.</p>
                    <div>
                        <label for="code" class="block text-sm font-semibold text-slate-700">Verification Code</label>
                        <div class="mt-1">
                            <input id="code" v-model="form.code" type="text" maxlength="6" required pattern="[0-9]{6}"
                                class="appearance-none block w-full px-4 py-3 text-center tracking-widest text-2xl font-mono border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                placeholder="000000" :disabled="loading" />
                        </div>
                    </div>
                    <button type="submit" :disabled="loading"
                        class="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all disabled:opacity-50">
                        <span v-if="loading">Verifying...</span>
                        <span v-else>Verify Code</span>
                    </button>
                    <div class="text-center mt-4">
                        <button type="button" @click="step = 1" class="text-sm text-brand-blue hover:underline">
                            Change email
                        </button>
                    </div>
                </form>

                <!-- Step 3: Reset Password -->
                <form v-if="step === 3" class="space-y-6" @submit.prevent="handleResetPassword">
                    <div>
                        <label for="password" class="block text-sm font-semibold text-slate-700">New Password</label>
                        <div class="mt-1">
                            <input id="password" v-model="form.password" type="password" required minlength="8"
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                placeholder="••••••••" :disabled="loading" />
                        </div>
                    </div>
                    <div>
                        <label for="password_confirmation" class="block text-sm font-semibold text-slate-700">Confirm Password</label>
                        <div class="mt-1">
                            <input id="password_confirmation" v-model="form.password_confirmation" type="password" required minlength="8"
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                                placeholder="••••••••" :disabled="loading" />
                        </div>
                    </div>
                    <button type="submit" :disabled="loading"
                        class="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all disabled:opacity-50">
                        <span v-if="loading">Resetting...</span>
                        <span v-else>Reset Password</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const step = ref(1)
const loading = ref(false)
const error = ref('')
const successMsg = ref('')

const form = reactive({
    email: '',
    code: '',
    password: '',
    password_confirmation: ''
})

const handleSendCode = async () => {
    loading.value = true
    error.value = ''
    successMsg.value = ''
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/forgot-password`, { email: form.email })
        step.value = 2
        successMsg.value = 'Code sent! Please check your email.'
    } catch (err) {
        error.value = err.response?.data?.message || err.response?.data?.errors?.email?.[0] || 'Unable to send code.'
    } finally {
        loading.value = false
    }
}

const handleVerifyCode = async () => {
    loading.value = true
    error.value = ''
    successMsg.value = ''
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/verify-reset-code`, { 
            email: form.email, 
            code: form.code 
        })
        step.value = 3
        successMsg.value = 'Code verified. Please enter your new password.'
    } catch (err) {
        error.value = err.response?.data?.message || err.response?.data?.errors?.code?.[0] || 'Invalid verification code.'
    } finally {
        loading.value = false
    }
}

const handleResetPassword = async () => {
    if (form.password !== form.password_confirmation) {
        error.value = "Passwords do not match."
        return
    }

    loading.value = true
    error.value = ''
    successMsg.value = ''
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/reset-password`, { 
            email: form.email,
            code: form.code,
            password: form.password,
            password_confirmation: form.password_confirmation
        })
        successMsg.value = 'Password reset successfully!'
        
        setTimeout(() => {
            router.push('/login')
        }, 2000)
    } catch (err) {
        error.value = err.response?.data?.message || err.response?.data?.errors?.password?.[0] || 'Unable to reset password.'
    } finally {
        loading.value = false
    }
}
</script>
