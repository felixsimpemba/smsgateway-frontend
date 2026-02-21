<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-600">Configure your account, billing, and notification preferences.</p>
    </div>

    <div class="space-y-6">
      <!-- Profile Section -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <h3 class="font-bold text-gray-900">Profile Information</h3>
          <p class="text-sm text-gray-500">Update your account details and email address.</p>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" :value="user.firstName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" :value="user.lastName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" :value="user.email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
          </div>
          <div class="flex justify-end">
            <button @click="saveProfile"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- Security Section -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <h3 class="font-bold text-gray-900">Security</h3>
          <p class="text-sm text-gray-500">Manage your password and security settings.</p>
        </div>
        <div class="p-6 space-y-4">
          <button class="text-sm font-bold text-blue-600 hover:underline">Change Password</button>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-bold text-gray-900">Two-Factor Authentication</p>
              <p class="text-xs text-gray-500">Add an extra layer of security to your account.</p>
            </div>
            <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold hover:bg-white">Enable</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const user = computed(() => store.state.auth.user || {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com'
})

const saveProfile = () => {
  console.log('Saving profile...', user.value)
  alert('Profile updated successfully!')
}
</script>
