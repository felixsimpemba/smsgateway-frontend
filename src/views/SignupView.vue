<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <!-- Logo & Header -->
        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
            <router-link to="/" class="inline-flex items-center gap-2 mb-4 group">
                <div class="p-2 bg-brand-blue rounded-xl group-hover:rotate-12 transition-transform">
                    <ChatBubbleBottomCenterTextIcon class="h-8 w-8 text-white" />
                </div>
                <span class="text-2xl font-black text-slate-900 tracking-tight">Feltech<span
                        class="text-brand-blue">SMS</span></span>
            </router-link>


        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-xl">
            <div
                class="bg-white py-10 px-6 sm:px-12 shadow-2xl shadow-slate-200/60 rounded-[2.5rem] border border-white relative overflow-hidden transition-all duration-500">
                <!-- Background Decoration -->
                <div class="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full mix-blend-multiply opacity-70">
                </div>

                <div v-if="error"
                    class="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm flex items-center gap-3 animate-head-shake">
                    <ExclamationCircleIcon class="h-5 w-5 flex-shrink-0" />
                    {{ error }}
                </div>

                <!-- Add Logout for partially onboarded users -->
                <div v-if="step !== 'account'" class="absolute top-8 right-8 z-20">
                    <button @click="handleLogout"
                        class="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 uppercase tracking-widest">
                        <span>Sign Out</span>
                        <ArrowRightIcon class="h-3 w-3" />
                    </button>
                </div>

                <transition name="step-slide" mode="out-in">
                    <!-- Step 1: Account Creation -->
                    <div v-if="step === 'account'" :key="'step1'" class="space-y-6">
                        <div>
                            <h2 class="text-3xl font-black text-slate-900 leading-tight">
                                {{ store.state.auth.isAuthenticated ? 'Update your details' : 'Create your account' }}
                            </h2>
                            <p class="text-slate-500 mt-2 font-medium">Join thousands of businesses sending with
                                Feltech.</p>
                        </div>

                        <form @submit.prevent="handleSignup" class="space-y-5">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <label class="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                    <input v-model="form.name" type="text" required class="signup-input"
                                        placeholder="Full name" :disabled="loading" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                                    <div class="relative flex items-center">
                                        <div class="absolute left-0 pl-3">
                                            <select v-model="selectedCountryCode"
                                                class="h-full bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-600 cursor-pointer">
                                                <option v-for="c in countries" :key="c.code" :value="c.code">
                                                    {{ c.flag }} {{ c.code }}
                                                </option>
                                            </select>
                                        </div>
                                        <input v-model="form.phone" type="tel" required
                                            class="signup-input font-mono !pl-24" placeholder="971234567"
                                            :disabled="loading" />
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="text-sm font-bold text-slate-700 ml-1">Email address</label>
                                <input v-model="form.email" type="email" required class="signup-input"
                                    placeholder="name@company.com" :disabled="loading" />
                            </div>

                            <div v-if="!store.state.auth.isAuthenticated" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div class="space-y-2 relative">
                                    <label class="text-sm font-bold text-slate-700 ml-1">Password</label>
                                    <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required
                                        class="signup-input" placeholder="••••••••" :disabled="loading" />
                                    <button type="button" @click="showPassword = !showPassword"
                                        class="absolute right-4 top-[2.4rem] text-slate-400 hover:text-slate-600 transition-colors">
                                        <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                                        <EyeSlashIcon v-else class="h-5 w-5" />
                                    </button>
                                </div>
                                <div class="space-y-2 relative">
                                    <label class="text-sm font-bold text-slate-700 ml-1">Confirm</label>
                                    <input v-model="form.password_confirmation"
                                        :type="showConfirmPassword ? 'text' : 'password'" required class="signup-input"
                                        placeholder="••••••••" :disabled="loading" />
                                    <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                        class="absolute right-4 top-[2.4rem] text-slate-400 hover:text-slate-600 transition-colors">
                                        <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5" />
                                        <EyeSlashIcon v-else class="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <div v-if="!store.state.auth.isAuthenticated" class="flex items-start gap-3 py-2">
                                <input v-model="form.terms" id="terms" type="checkbox" required
                                    class="mt-1 h-5 w-5 rounded-lg border-slate-200 text-brand-blue focus:ring-brand-blue/20 transition-all cursor-pointer" />
                                <label for="terms" class="text-sm text-slate-500 font-medium leading-relaxed">
                                    I agree to the <a href="#" class="text-brand-blue font-bold hover:underline">Terms
                                        of Service</a> and <a href="#"
                                        class="text-brand-blue font-bold hover:underline">Privacy Policy</a>.
                                </label>
                            </div>

                            <button type="submit" class="primary-button group overflow-hidden" :disabled="loading">
                                <div class="flex items-center justify-center gap-3 relative z-10">
                                    <template v-if="loading">
                                        <ArrowPathIcon class="animate-spin h-5 w-5" />
                                        Processing...
                                    </template>
                                    <template v-else>
                                        {{ store.state.auth.isAuthenticated ? 'Save & Continue' : 'Get Started' }}
                                        <ArrowRightIcon
                                            class="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </template>
                                </div>
                            </button>
                        </form>

                        <div v-if="!store.state.auth.isAuthenticated" class="text-center pt-4">
                            <p class="text-sm text-slate-500 font-medium">Already have an account? <router-link
                                    to="/login" class="text-brand-blue font-bold hover:underline">Sign in</router-link>
                            </p>
                        </div>
                    </div>

                    <!-- Step 2: Email Verification -->
                    <div v-else-if="step === 'email-verif'" :key="'step2'" class="space-y-8 text-center py-4">
                        <div class="inline-flex p-4 bg-orange-50 rounded-3xl mb-2 animate-bounce-subtle">
                            <EnvelopeIcon class="h-12 w-12 text-orange-500" />
                        </div>
                        <div>
                            <h2 class="text-3xl font-black text-slate-900 leading-tight">Check your email</h2>
                            <p class="text-slate-500 mt-2 font-medium">We sent a 6-digit verification code to
                                <br /><span class="text-slate-900 font-bold underline">{{ form.email }}</span>
                            </p>
                        </div>

                        <div class="max-w-xs mx-auto space-y-4">
                            <input v-model="verificationCode" type="text" maxlength="6" class="verification-input"
                                placeholder="000 000" />
                            <button @click="verifyEmail" class="primary-button"
                                :disabled="loading || verificationCode.length < 6">
                                {{ loading ? 'Verifying...' : 'Verify Email' }}
                            </button>

                            <div class="flex flex-col gap-3 pt-2">
                                <button @click="sendEmailCode"
                                    class="text-sm font-bold text-brand-blue hover:text-brand-blue/80 transition-colors">
                                    Resend Code
                                </button>
                                <button @click="step = 'account'"
                                    class="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                    Edit Email address
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Phone Verification -->
                    <div v-else-if="step === 'phone-verif'" :key="'step3'" class="space-y-8 text-center py-4">
                        <div class="inline-flex p-4 bg-purple-50 rounded-3xl mb-2 animate-bounce-subtle">
                            <DevicePhoneMobileIcon class="h-12 w-12 text-purple-600" />
                        </div>
                        <div>
                            <h2 class="text-3xl font-black text-slate-900 leading-tight">Verify your phone</h2>
                            <p class="text-slate-500 mt-2 font-medium">An SMS code was sent to <br /><span
                                    class="text-slate-900 font-bold underline">{{ form.phone }}</span></p>
                        </div>

                        <div class="max-w-xs mx-auto space-y-4">
                            <input v-model="verificationCode" type="text" maxlength="6" class="verification-input"
                                placeholder="000 000" />
                            <button @click="verifyPhone" class="primary-button"
                                :disabled="loading || verificationCode.length < 6">
                                {{ loading ? 'Confirm' : 'Verify Phone' }}
                            </button>

                            <div class="flex flex-col gap-3 pt-2">
                                <button @click="sendPhoneCode"
                                    class="text-sm font-bold text-brand-blue hover:text-brand-blue/80 transition-colors">
                                    Resend SMS
                                </button>
                                <button @click="step = 'account'"
                                    class="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                    Edit Phone number
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: 2FA Setup -->
                    <div v-else-if="step === '2fa-setup'" :key="'step4'" class="space-y-8 py-2">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-black text-slate-900 leading-tight">Secure your account</h2>
                            <p class="text-slate-500 mt-2 font-medium">Choose your primary two-factor method.</p>
                        </div>

                        <div v-if="!selected2FaMethod" class="grid grid-cols-1 gap-4">
                            <button v-for="m in twoFactorMethods" :key="m.id" @click="select2FaMethod(m.id)"
                                class="flex items-center gap-5 p-6 border-2 border-slate-100 rounded-[2rem] hover:border-brand-blue hover:bg-blue-50/30 transition-all text-left group active:scale-95 duration-200">
                                <div
                                    :class="['p-4 rounded-[1.5rem] group-hover:scale-110 transition-transform shadow-sm', m.color]">
                                    <component :is="m.icon" class="h-8 w-8" />
                                </div>
                                <div>
                                    <span class="block text-lg font-black text-slate-900">{{ m.title }}</span>
                                    <span class="text-sm font-medium text-slate-500">{{ m.desc }}</span>
                                </div>
                            </button>
                            <button @click="step = 'phone-verif'"
                                class="mt-4 text-sm font-bold text-slate-400 hover:text-slate-600 text-center w-full">
                                Go back to phone verification
                            </button>
                        </div>

                        <!-- TOTP Instructions -->
                        <div v-if="selected2FaMethod === 'totp'" class="space-y-8 animate-fade-in">
                            <div v-if="totpData" class="flex flex-col items-center text-center">
                                <div
                                    class="p-5 bg-white border-4 border-slate-50 rounded-3xl shadow-xl shadow-brand-blue/5 mb-6 hover:scale-105 transition-transform duration-500">
                                    <img :src="totpData.qr_code_url" alt="QR Code" class="h-44 w-44" />
                                </div>

                                <div class="w-full text-left space-y-6">
                                    <div class="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100">
                                        <h3 class="font-black text-slate-900 mb-4 flex items-center gap-2 italic">
                                            <div
                                                class="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-[10px] non-italic">
                                                1</div>
                                            Setup Guide
                                        </h3>
                                        <ol class="space-y-3">
                                            <li class="flex gap-3 text-sm font-medium text-slate-600">
                                                <span class="text-brand-blue">•</span> Install <strong>Google
                                                    Authenticator</strong> from
                                                App Store.
                                            </li>
                                            <li class="flex gap-3 text-sm font-medium text-slate-600">
                                                <span class="text-brand-blue">•</span> Open the app and tap the
                                                <strong>"+"</strong> button.
                                            </li>
                                            <li class="flex gap-3 text-sm font-medium text-slate-600">
                                                <span class="text-brand-blue">•</span> Scan the <strong>QR Code</strong>
                                                above.
                                            </li>
                                        </ol>
                                    </div>

                                    <div class="space-y-2">
                                        <label class="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                            <div
                                                class="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-[10px]">
                                                2</div>
                                            Enter Authentication Code
                                        </label>
                                        <input v-model="verificationCode" type="text" maxlength="6"
                                            class="signup-input font-mono tracking-[0.5em] text-center text-xl"
                                            placeholder="000000" />
                                    </div>
                                </div>

                                <button @click="completeOnboarding" class="primary-button mt-4"
                                    :disabled="loading || verificationCode.length < 6">
                                    {{ loading ? 'Processing...' : 'Verify & Continue' }}
                                </button>
                                <button @click="selected2FaMethod = null"
                                    class="mt-4 text-sm font-bold text-slate-400 hover:text-slate-600">Change
                                    method</button>
                            </div>
                            <div v-else class="text-center py-12">
                                <ArrowPathIcon class="animate-spin h-8 w-8 text-brand-blue mx-auto" />
                            </div>
                        </div>

                        <!-- Email/SMS directly finish step 4 -->
                        <div v-if="selected2FaMethod && selected2FaMethod !== 'totp'"
                            class="text-center py-8 space-y-6 animate-fade-in">
                            <button @click="completeOnboarding" class="primary-button" :disabled="loading">
                                Ready for the final step
                            </button>
                            <button @click="selected2FaMethod = null"
                                class="mt-4 text-sm font-bold text-slate-400 hover:text-slate-600">Change
                                method</button>
                        </div>
                    </div>

                    <!-- Step 5: Plan Selection -->
                    <div v-else-if="step === 'plan-selection'" :key="'step5'" class="space-y-8 animate-fade-in">
                        <div class="text-center">
                            <h2 class="text-3xl font-black text-slate-900 leading-tight">Pick a Plan</h2>
                            <p class="text-slate-500 mt-2 font-medium">Choose a package to start sending SMS today.</p>
                        </div>

                        <div class="grid grid-cols-1 gap-4">
                            <button v-for="p in pricingPlans" :key="p.id" @click="handlePlanSelect(p.id)"
                                class="relative flex items-center gap-5 p-6 border-2 border-slate-100 rounded-[2rem] hover:border-brand-blue hover:shadow-xl hover:shadow-brand-blue/10 bg-white transition-all text-left group active:scale-95 duration-200 overflow-hidden">
                                <div v-if="p.badge"
                                    class="absolute top-0 right-0 py-1 px-4 bg-brand-blue text-[10px] font-black text-white rounded-bl-xl uppercase tracking-widest">
                                    {{ p.badge }}
                                </div>
                                <div
                                    :class="['p-4 rounded-[1.5rem] group-hover:rotate-6 transition-transform shadow-sm', p.color]">
                                    <component :is="p.icon" class="h-8 w-8" />
                                </div>
                                <div class="flex-grow">
                                    <div class="flex items-center justify-between">
                                        <span class="block text-lg font-black text-slate-900">{{ p.name }}</span>
                                        <span class="text-xl font-black text-brand-blue">{{ p.price }}</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium text-slate-500">{{ p.desc }}</span>
                                        <span class="text-xs font-bold text-slate-400 italic">~{{ p.rate }} / SMS</span>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="bg-slate-50 p-6 rounded-[2rem] flex items-center gap-4 border border-slate-100">
                            <div class="p-3 bg-brand-green/20 text-brand-green rounded-2xl">
                                <GiftIcon class="h-6 w-6" />
                            </div>
                            <p class="text-xs font-medium text-slate-600 leading-relaxed">
                                Choosing the <strong>Trial Pack</strong> will credit you with <strong>5 SMS</strong>
                                immediately.
                                Paid plans will redirect you to secure billing.
                            </p>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    UserIcon,
    ArrowRightIcon,
    ArrowPathIcon,
    ExclamationCircleIcon,
    ChatBubbleBottomCenterTextIcon,
    EnvelopeIcon,
    DevicePhoneMobileIcon,
    ShieldCheckIcon,
    KeyIcon,
    CheckBadgeIcon,
    TicketIcon,
    BriefcaseIcon,
    RocketLaunchIcon,
    CurrencyDollarIcon,
    GiftIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/vue/24/outline'
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const loading = ref(false)
const error = ref('')
const verificationCode = ref('')
const step = ref('account') // account, email-verif, phone-verif, 2fa-setup, plan-selection
const selected2FaMethod = ref(null)
const totpData = ref(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const countries = [
    { name: 'Zambia', code: '+260', flag: '🇿🇲' },
    { name: 'South Africa', code: '+27', flag: '🇿🇦' },
    { name: 'Zimbabwe', code: '+263', flag: '🇿🇼' },
    { name: 'Namibia', code: '+264', flag: '🇳🇦' },
    { name: 'Kenya', code: '+254', flag: '🇰🇪' },
    { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
    { name: 'USA/Canada', code: '+1', flag: '🇺🇸' },
    { name: 'UK', code: '+44', flag: '🇬🇧' },
]
const selectedCountryCode = ref('+260')

const form = reactive({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    terms: false
})

onMounted(async () => {
    // If we have a user but onboarding is not complete, find the correct step
    if (store.state.auth.user && !store.state.auth.user.onboarding_completed_at) {
        syncFormData()
        await resumeOnboarding()
    }
})

const syncFormData = () => {
    const user = store.state.auth.user
    form.name = user.name
    form.email = user.email
    form.phone = user.two_factor_phone || user.phone || ''
}

const resumeOnboarding = async () => {
    // Refresh user to ensure we have the latest verification status
    await store.dispatch('auth/fetchUser')
    const user = store.state.auth.user
    if (!user.email_verified_at) {
        step.value = 'email-verif'
        await sendEmailCode()
    } else if (!user.phone_verified_at) {
        step.value = 'phone-verif'
        await sendPhoneCode()
    } else if (!user.two_factor_enabled) {
        step.value = '2fa-setup'
    } else {
        step.value = 'plan-selection'
    }
}

const handleLogout = async () => {
    await store.dispatch('auth/logout')
    router.push('/login')
}





const twoFactorMethods = [
    { id: 'totp', title: 'Authenticator App', desc: 'Secure one-time codes from app.', icon: KeyIcon, color: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' },
    { id: 'sms', title: 'SMS Message', desc: 'Verify via text message.', icon: DevicePhoneMobileIcon, color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' },
    { id: 'email', title: 'Email Code', desc: 'Fast codes to your inbox.', icon: EnvelopeIcon, color: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white' },
]

const pricingPlans = [
    { id: 'trial', name: 'Trial Pack', price: '0 ZMW', amount: 0, desc: '5 Free SMS to test', icon: TicketIcon, color: 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white', rate: '0.00', badge: 'Free' },
    { id: 'basic', name: 'Basic Pack', price: '100 ZMW', amount: 100, desc: 'Up to 230 SMS', icon: BriefcaseIcon, color: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white', rate: '0.43' },
    { id: 'standard', name: 'Standard Pack', price: '350 ZMW', amount: 350, desc: 'Up to 1,000 SMS', icon: RocketLaunchIcon, color: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white', rate: '0.35', badge: 'Hot' },
    { id: 'premium', name: 'Premium Pack', price: '2000 ZMW', amount: 2000, desc: 'Up to 10,000 SMS', icon: CurrencyDollarIcon, color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white', rate: '0.20' },
]

const handleSignup = async () => {
    try {
        error.value = ''
        loading.value = true

        if (store.state.auth.isAuthenticated) {
            const phoneWithCode = selectedCountryCode.value + form.phone
            await store.dispatch('auth/updateProfile', {
                name: form.name,
                email: form.email,
                phone: phoneWithCode
            })
            await resumeOnboarding()
        } else {
            if (form.password !== form.password_confirmation) {
                error.value = 'Passwords do not match'; return
            }
            if (!form.terms) {
                error.value = 'Please agree to terms'; return
            }
            const phoneWithCode = selectedCountryCode.value + form.phone
            await store.dispatch('auth/register', { ...form, phone: phoneWithCode })
            await resumeOnboarding()
        }
    } catch (err) {
        error.value = err.response?.data?.message || 'Action failed'
    } finally {
        loading.value = false
    }
}

const sendEmailCode = async () => {
    try { await store.dispatch('auth/sendOnboardingEmail') } catch (err) { error.value = 'Failed to send email' }
}

const verifyEmail = async () => {
    try {
        loading.value = true
        await store.dispatch('auth/verifyOnboardingEmail', verificationCode.value)
        verificationCode.value = ''
        await resumeOnboarding()
    } catch (err) { error.value = 'Invalid code' } finally { loading.value = false }
}

const sendPhoneCode = async () => {
    try { await store.dispatch('auth/sendOnboardingPhone') } catch (err) { error.value = 'Failed to send SMS' }
}

const verifyPhone = async () => {
    try {
        loading.value = true
        await store.dispatch('auth/verifyOnboardingPhone', verificationCode.value)
        verificationCode.value = ''
        await resumeOnboarding()
    } catch (err) { error.value = 'Invalid code' } finally { loading.value = false }
}

const select2FaMethod = async (m) => {
    selected2FaMethod.value = m
    if (m === 'totp') {
        try { totpData.value = await store.dispatch('auth/getOnboarding2FaSetup') } catch (err) { error.value = 'Failed load' }
    }
}

const completeOnboarding = async () => {
    try {
        loading.value = true
        await store.dispatch('auth/completeOnboarding', {
            method: selected2FaMethod.value,
            code: verificationCode.value
        })
        step.value = 'plan-selection'
    } catch (err) { error.value = err.response?.data?.message || 'Setup failed' } finally { loading.value = false }
}

const handlePlanSelect = async (planId) => {
    try {
        loading.value = true
        const plan = pricingPlans.find(p => p.id === planId)

        // Always finalize onboarding first to get the +5 bonus
        await store.dispatch('auth/selectOnboardingPlan', planId)

        if (planId === 'trial') {
            router.push('/dashboard')
        } else {
            // Directly initiate payment for paid plans
            await store.dispatch('billing/initializePayment', plan.amount)
        }
    } catch (err) {
        error.value = err.response?.data?.error || 'Plan selection failed'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
@reference "../style.css";

.signup-input {
    @apply appearance-none block w-full px-5 py-4 border-2 border-slate-100 rounded-2xl bg-slate-50 placeholder-slate-400 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue focus:bg-white transition-all duration-300;
}

.primary-button {
    @apply w-full flex items-center justify-center gap-3 py-5 px-6 border border-transparent rounded-[2rem] shadow-xl shadow-brand-blue/20 text-lg font-black text-white bg-brand-blue hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-brand-blue transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100;
}

.verification-input {
    @apply w-full text-center text-4xl font-black tracking-[0.5em] py-6 border-2 border-slate-100 rounded-[2.5rem] bg-slate-50 text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue focus:bg-white transition-all duration-300;
}

.animate-head-shake {
    animation: head-shake 0.5s ease-in-out;
}

@keyframes head-shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-10px);
    }

    50% {
        transform: translateX(10px);
    }

    75% {
        transform: translateX(-5px);
    }
}

.animate-fade-in {
    animation: fade-in 0.4s ease-out;
}

.animate-bounce-subtle {
    animation: bounce-subtle 3s ease-in-out infinite;
}

@keyframes bounce-subtle {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Step Slide Transition */
.step-slide-enter-active,
.step-slide-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-slide-enter-from {
    opacity: 0;
    transform: translateX(40px);
}

.step-slide-leave-to {
    opacity: 0;
    transform: translateX(-40px);
}
</style>