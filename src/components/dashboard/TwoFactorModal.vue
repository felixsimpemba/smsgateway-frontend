<template>
  <div v-if="modelValue"
    class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
    <div
      class="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/10 animate-scale-up">
      <div
        class="p-8 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
        <h2 class="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Enable 2FA</h2>
        <button @click="$emit('update:modelValue', false)"
          class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <div class="p-10">
        <!-- Step 1: Select Method -->
        <div v-if="step === 'select'" class="space-y-6">
          <p class="text-sm text-gray-600 dark:text-slate-400 font-medium">Choose your preferred two-factor
            authentication method.</p>
          <div class="grid grid-cols-1 gap-4">
            <button @click="selectMethod('totp')"
              class="flex items-center p-5 border border-gray-100 dark:border-slate-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all text-left group">
              <div
                class="p-3 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <DevicePhoneMobileIcon class="w-6 h-6 text-brand-blue dark:text-brand-blue" />
              </div>
              <div>
                <p class="font-bold text-gray-900 dark:text-white">Authenticator App</p>
                <p class="text-xs text-gray-500 dark:text-slate-500">Google Authenticator, Authy, etc.</p>
              </div>
            </button>
            <button @click="selectMethod('email')"
              class="flex items-center p-5 border border-gray-100 dark:border-slate-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all text-left group">
              <div
                class="p-3 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <EnvelopeIcon class="w-6 h-6 text-brand-blue dark:text-brand-blue" />
              </div>
              <div>
                <p class="font-bold text-gray-900 dark:text-white">Email Verification</p>
                <p class="text-xs text-gray-500 dark:text-slate-500">Receive codes via your email.</p>
              </div>
            </button>
            <button @click="selectMethod('sms')"
              class="flex items-center p-5 border border-gray-100 dark:border-slate-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all text-left group">
              <div
                class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                <ChatBubbleLeftRightIcon class="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p class="font-bold text-gray-900 dark:text-white">SMS Verification</p>
                <p class="text-xs text-gray-500 dark:text-slate-500">Receive codes on your phone.</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Step 2: Setup TOTP -->
        <div v-if="step === 'totp-setup'" class="space-y-6 text-center">
          <p class="text-sm text-gray-600 dark:text-slate-400 font-medium">Scan this QR code with your authenticator
            app.</p>
          <div class="bg-white p-4 inline-block rounded-2xl border border-gray-100 mx-auto">
            <img v-if="setupData?.qr_code_url"
              :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupData.qr_code_url)}`"
              alt="QR Code" class="w-48 h-48" />
          </div>
          <div class="text-left bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl">
            <p class="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">Manual Key
            </p>
            <code class="text-sm font-bold text-gray-900 dark:text-white break-all">{{ setupData?.secret }}</code>
          </div>
          <button @click="step = 'verify'"
            class="w-full bg-brand-blue text-white py-4 rounded-xl font-extrabold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20">Next:
            Verify Code</button>
        </div>

        <!-- Step 2: Setup SMS -->
        <div v-if="step === 'sms-setup'" class="space-y-6">
          <p class="text-sm text-gray-600 dark:text-slate-400 font-medium">Enter your phone number to receive codes.</p>
          <input v-model="phone" type="text" placeholder="+1234567890"
            class="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-gray-900 dark:text-white rounded-2xl focus:ring-2 focus:ring-brand-blue outline-none transition-all font-mono font-bold tracking-wider">
          <button @click="sendSmsCode"
            class="w-full bg-brand-blue text-white py-4 rounded-xl font-extrabold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20"
            :disabled="loading">
            {{ loading ? 'Sending...' : 'Send Verification Code' }}
          </button>
        </div>

        <div v-if="step === 'verify'" class="space-y-6">
          <p class="text-sm text-gray-600 dark:text-slate-400 font-medium text-center">Enter the 6-digit code to verify
            your setup.</p>
          <input v-model="verifyCode" type="text" maxlength="6"
            class="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-gray-900 dark:text-white rounded-2xl focus:ring-2 focus:ring-brand-blue outline-none transition-all text-center text-2xl font-bold tracking-[0.5em]"
            placeholder="000000">
          <div v-if="error" class="text-center text-xs text-red-600 font-bold">{{ error }}</div>
          <button @click="verifyAndEnable"
            class="w-full bg-brand-blue text-white py-4 rounded-xl font-extrabold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20"
            :disabled="loading">
            {{ loading ? 'Verifying...' : 'Enable 2FA' }}
          </button>
        </div>

        <!-- Step 4: Success / Recovery Codes -->
        <div v-if="step === 'success'" class="space-y-6">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon class="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">2FA Enabled Successfully!</h3>
            <p class="text-sm text-gray-500 dark:text-slate-500 mt-2">Store these recovery codes in a safe place. They
              can be used to access your account if you lose your device.</p>
          </div>
          <div
            class="grid grid-cols-2 gap-3 bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
            <code v-for="code in recoveryCodes" :key="code"
              class="text-xs font-bold text-gray-700 dark:text-slate-300">{{ code }}</code>
          </div>
          <button @click="$emit('update:modelValue', false)"
            class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-extrabold hover:opacity-90 transition-all">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import {
  XMarkIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const store = useStore()

const step = ref('select')
const method = ref('')
const setupData = ref(null)
const phone = ref('')
const verifyCode = ref('')
const loading = ref(false)
const error = ref('')
const recoveryCodes = ref([])

const selectMethod = async (m) => {
  method.value = m
  if (m === 'totp') {
    loading.value = true
    try {
      setupData.value = await store.dispatch('auth/setupTwoFactor', 'totp')
      step.value = 'totp-setup'
    } catch (err) {
      error.value = 'Failed to initiate setup'
    } finally {
      loading.value = false
    }
  } else if (m === 'email') {
    loading.value = true
    try {
      await store.dispatch('auth/sendTwoFactorCode', { method: 'email' })
      step.value = 'verify'
    } catch (err) {
      error.value = 'Failed to send email code'
    } finally {
      loading.value = false
    }
  } else if (m === 'sms') {
    step.value = 'sms-setup'
  }
}

const sendSmsCode = async () => {
  if (!phone.value) return
  loading.value = true
  try {
    await store.dispatch('auth/sendTwoFactorCode', { method: 'sms', phone: phone.value })
    step.value = 'verify'
  } catch (err) {
    error.value = 'Failed to send SMS code'
  } finally {
    loading.value = false
  }
}

const verifyAndEnable = async () => {
  if (!verifyCode.value) return
  loading.value = true
  error.value = ''
  try {
    const data = await store.dispatch('auth/enableTwoFactor', {
      method: method.value,
      code: verifyCode.value,
      phone: phone.value
    })
    recoveryCodes.value = data.recovery_codes
    step.value = 'success'
  } catch (err) {
    error.value = 'Invalid verification code'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.animate-scale-up {
  animation: scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
