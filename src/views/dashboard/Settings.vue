<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p class="text-gray-600 dark:text-slate-400">Configure your account, billing, and notification preferences.</p>
    </div>

    <div class="space-y-6">
      <!-- Profile Section -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div class="p-6 border-b border-gray-200 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/20">
          <h3 class="font-bold text-gray-900 dark:text-white">Profile Information</h3>
          <p class="text-sm text-gray-500 dark:text-slate-500">Update your account details and email address.</p>
        </div>
        <div class="p-6 space-y-6">
          <div v-if="profileMessage" :class="['p-4 rounded-xl text-sm font-medium', profileMessage.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400']">
            {{ profileMessage.text }}
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Full Name</label>
            <input v-model="profileForm.name" type="text"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              :disabled="loading">
          </div>
          
          <div>
            <label class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Email Address</label>
            <input v-model="profileForm.email" type="email"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              :disabled="loading">
          </div>
          <div class="flex justify-end pt-2">
            <button @click="saveProfile"
              class="bg-blue-600 text-white px-8 py-3 rounded-xl font-extrabold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
              :disabled="loading">
              {{ loading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Security Section -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div class="p-6 border-b border-gray-200 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/20">
          <h3 class="font-bold text-gray-900 dark:text-white">Security</h3>
          <p class="text-sm text-gray-500 dark:text-slate-500">Manage your password and security settings.</p>
        </div>
        <div class="p-6 space-y-6">
          <div v-if="!showPasswordForm">
            <button @click="showPasswordForm = true" class="text-sm font-extrabold text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-wider">
              Change Password
            </button>
          </div>
          
          <div v-else class="space-y-4 animate-scale-up">
            <div v-if="passwordMessage" :class="['p-4 rounded-xl text-sm font-medium', passwordMessage.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400']">
              {{ passwordMessage.text }}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Current Password</label>
                <input v-model="passwordForm.current_password" type="password"
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 uppercase tracking-wide">New Password</label>
                <input v-model="passwordForm.password" type="password"
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Confirm New Password</label>
                <input v-model="passwordForm.password_confirmation" type="password"
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
              </div>
            </div>
            <div class="flex space-x-3 pt-2">
              <button @click="showPasswordForm = false"
                class="flex-1 px-6 py-3 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                Cancel
              </button>
              <button @click="savePassword"
                class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-extrabold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
                :disabled="passwordLoading">
                {{ passwordLoading ? 'Updating...' : 'Update Password' }}
              </button>
            </div>
          </div>

          <div class="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="font-extrabold text-gray-900 dark:text-white tracking-tight">Two-Factor Authentication</p>
                <p class="text-xs text-gray-500 dark:text-slate-500 font-medium">Add an extra layer of security to your account.</p>
              </div>
              <span v-if="user?.two_factor_enabled" class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Active</span>
              <span v-else class="px-3 py-1 bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Disabled</span>
            </div>
            
            <div v-if="user?.two_factor_enabled" class="space-y-4">
              <div class="flex items-center text-sm text-gray-600 dark:text-slate-300">
                <CheckIcon class="w-4 h-4 text-green-500 mr-2" />
                Enabled via <span class="font-bold ml-1 uppercase">{{ user.two_factor_method }}</span>
                <span v-if="user.two_factor_phone" class="ml-1">({{ user.two_factor_phone }})</span>
              </div>
              <button @click="disable2FA" class="text-xs font-extrabold text-red-600 dark:text-red-400 uppercase tracking-widest hover:underline">
                Disable 2FA
              </button>
            </div>
            <button v-else @click="show2FAModal = true" class="w-full mt-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 2FA Modal -->
    <TwoFactorModal v-model="show2FAModal" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { CheckIcon } from '@heroicons/vue/24/outline'
import TwoFactorModal from '../../components/dashboard/TwoFactorModal.vue'

const store = useStore()

const user = computed(() => store.getters['auth/currentUser'])
const loading = ref(false)
const profileMessage = ref(null)

const profileForm = reactive({
  name: '',
  email: ''
})

const showPasswordForm = ref(false)
const passwordLoading = ref(false)
const passwordMessage = ref(null)
const passwordForm = reactive({
  current_password: '',
  password: '',
  password_confirmation: ''
})

const show2FAModal = ref(false)

// Initialize form with user data
const initForm = () => {
  if (user.value) {
    profileForm.name = user.value.name || ''
    profileForm.email = user.value.email || ''
  }
}

onMounted(initForm)
watch(user, initForm)

const saveProfile = async () => {
  loading.value = true
  profileMessage.value = null
  try {
    await store.dispatch('auth/updateProfile', { ...profileForm })
    profileMessage.value = { type: 'success', text: 'Profile updated successfully!' }
  } catch (error) {
    profileMessage.value = { 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile. Please try again.' 
    }
  } finally {
    loading.value = false
  }
}

const savePassword = async () => {
    if (passwordForm.password !== passwordForm.password_confirmation) {
        passwordMessage.value = { type: 'error', text: 'Passwords do not match.' }
        return
    }

    passwordLoading.value = true
    passwordMessage.value = null
    try {
        await store.dispatch('auth/updatePassword', { ...passwordForm })
        passwordMessage.value = { type: 'success', text: 'Password updated successfully!' }
        // Reset form
        passwordForm.current_password = ''
        passwordForm.password = ''
        passwordForm.password_confirmation = ''
        // Hide form after delay
        setTimeout(() => {
            showPasswordForm.value = false
            passwordMessage.value = null
        }, 3000)
    } catch (error) {
        passwordMessage.value = { 
            type: 'error', 
            text: error.response?.data?.message || 'Failed to update password. Please try again.' 
        }
    } finally {
        passwordLoading.value = false
    }
}

const disable2FA = async () => {
    const password = prompt('Please enter your password to disable 2FA:')
    if (!password) return
    
    try {
        await store.dispatch('auth/disableTwoFactor', password)
        alert('2FA has been disabled.')
    } catch (error) {
        alert(error.response?.data?.message || 'Failed to disable 2FA.')
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
    transform: scale(0.98) translateY(5px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
