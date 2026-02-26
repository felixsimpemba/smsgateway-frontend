<template>
  <div>
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Sender IDs</h1>
        <p class="text-gray-600 dark:text-slate-400">Manage and register branded alphanumeric sender IDs for your
          messages.</p>
      </div>
      <button @click="showRequestModal = true"
        class="bg-blue-600 text-white px-6 py-3 rounded-xl font-extrabold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center active:scale-[0.98]">
        <PlusIcon class="w-5 h-5 mr-2" />
        Register New ID
      </button>
    </div>

    <!-- Stats summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div v-for="stat in summary" :key="stat.label"
        class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <p class="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">{{ stat.label }}
        </p>
        <p :class="['text-2xl font-extrabold tracking-tight', stat.colorClass || 'text-gray-900 dark:text-white']">{{
          stat.value }}</p>
      </div>
    </div>

    <!-- Sender IDs Table -->
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
            <th class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
              Sender ID</th>
            <th class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Use
              Case</th>
            <th class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
              Status</th>
            <th class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
              Date Added</th>
            <th
              class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest text-right">
              Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-slate-800">
          <tr v-for="id in senderIds" :key="id.id"
            class="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
            <td class="px-6 py-5">
              <div class="font-extrabold text-gray-900 dark:text-white tracking-wider font-mono">{{ id.name }}</div>
            </td>
            <td class="px-6 py-5">
              <div class="text-sm font-medium text-gray-600 dark:text-slate-300">{{ id.use_case }}</div>
            </td>
            <td class="px-6 py-5">
              <span :class="[
                'px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider',
                id.status === 'Approved' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                  id.status === 'Pending' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400' :
                    'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
              ]">
                {{ id.status }}
              </span>
            </td>
            <td class="px-6 py-5 text-sm font-bold text-gray-500 dark:text-slate-500">
                {{ new Date(id.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) }}
            </td>
            <td class="px-6 py-5 text-right">
              <button
                class="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 p-1 transition-colors">
                <EllipsisHorizontalIcon class="w-6 h-6" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Registration Modal -->
    <div v-if="showRequestModal"
      class="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        class="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up border border-white/10">
        <div
          class="p-8 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
          <h2 class="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Register Sender ID</h2>
          <button @click="showRequestModal = false"
            class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="submitRequest" class="p-10 space-y-6">
          <div>
            <label
              class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-3">Requested
              ID</label>
            <input v-model="newId.name" type="text" maxlength="11" placeholder="e.g. MYCOMPANY"
              class="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-gray-900 dark:text-white rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono font-extrabold uppercase tracking-widest placeholder-gray-400 dark:placeholder-slate-500">
          </div>

          <div>
            <label
              class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-3">Primary
              Use Case</label>
            <select v-model="newId.useCase"
              class="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-gray-900 dark:text-white rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold">
              <option value="">Select a use case</option>
              <option>OTP / Authentication</option>
              <option>Marketing / Promotions</option>
              <option>Service Notifications</option>
            </select>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/30">
            <p class="text-xs text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
              <strong class="font-extrabold">Notice:</strong> Verification takes 1-3 business days. You'll receive a
              notification once your ID is approved.
            </p>
          </div>

          <div class="flex space-x-4 pt-4">
            <button type="button" @click="showRequestModal = false"
              class="flex-1 px-6 py-4 border border-gray-200 dark:border-slate-700 rounded-2xl font-extrabold text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
              Cancel
            </button>
            <button type="submit"
              class="flex-1 px-6 py-4 bg-blue-600 text-white rounded-2xl font-extrabold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import {
  PlusIcon,
  EllipsisHorizontalIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const store = useStore()
const showRequestModal = ref(false)

const summary = computed(() => store.getters['senderids/summaryStats'])
const senderIds = computed(() => store.getters['senderids/allSenderIds'])

const newId = ref({ name: '', useCase: '' })

const submitRequest = async () => {
  if (!newId.value.name || !newId.value.useCase) {
    alert('Please fill in all fields.')
    return
  }

  await store.dispatch('senderids/requestSenderId', { ...newId.value })
  alert('Application submitted!')
  showRequestModal.value = false
  newId.value = { name: '', useCase: '' }
}
onMounted(() => {
  store.dispatch('senderids/fetchSenderIds')
})
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
