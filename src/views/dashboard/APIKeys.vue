<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">API Access</h1>
      <p class="text-gray-600 dark:text-slate-400">Manage your API keys to integrate SMSGate into your own applications.
      </p>
    </div>

    <!-- API Keys List -->
    <div class="space-y-8">
      <div
        class="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div
          class="px-8 py-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-gray-50/50 dark:bg-slate-800/50">
          <h3 class="font-extrabold text-gray-900 dark:text-white tracking-tight">Your API Keys</h3>
          <button @click="isModalOpen = true"
            class="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all">
            Generate New Key
          </button>
        </div>

        <div class="divide-y divide-gray-100 dark:divide-slate-800">
          <div v-for="key in apiKeys" :key="key.id" class="p-8">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h4 class="font-extrabold text-gray-900 dark:text-white tracking-tight">{{ key.name }}</h4>
                <p class="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                  Created on {{ key.created_at }}</p>
              </div>
              <div class="flex items-center space-x-3">
                <span
                  :class="['px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg', key.is_active ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-500']">
                  {{ key.is_active ? 'Active' : 'Inactive' }}
                </span>
                <button @click="deleteKey(key.id)"
                  class="text-gray-400 dark:text-slate-600 hover:text-red-600 dark:hover:text-red-400 p-1.5 transition-colors">
                  <TrashIcon class="w-5 h-5" />
                </button>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <div
                class="flex-1 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 font-mono text-sm text-gray-600 dark:text-slate-300 relative group transition-colors">
                <code class="tracking-tighter">{{ key.show ? key.key : '••••••••••••••••••••••••••••••••' }}</code>
                <button @click="toggleVisibility(key.id)"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-white transition-colors">
                  <EyeIcon v-if="!key.show" class="w-4 h-4" />
                  <EyeSlashIcon v-else class="w-4 h-4" />
                </button>
              </div>
              <button @click="copyKey(key.key, key.id)"
                class="p-3.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400 transition-all active:scale-[0.95] flex items-center gap-2">
                <CheckIcon v-if="copiedId === key.id" class="w-5 h-5 text-green-500" />
                <ClipboardDocumentIcon v-else class="w-5 h-5" />
                <span v-if="copiedId === key.id" class="text-xs font-bold text-green-500">Copied</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Documentation -->

    </div>

    <!-- API Key Modal -->
    <ApiKeyModal 
      :is-open="isModalOpen" 
      @close="isModalOpen = false" 
      @generate="onGenerate" 
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import {
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  CommandLineIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'
import ApiKeyModal from '../../components/dashboard/ApiKeyModal.vue'

const store = useStore()

const apiKeys = computed(() => store.getters['apikeys/allKeys'])

const isModalOpen = ref(false)
const copiedId = ref(null)

const onGenerate = async (name) => {
  isModalOpen.value = false
  await store.dispatch('apikeys/generateKey', name)
}

const deleteKey = (id) => {
  if (confirm('Are you sure you want to delete this API key?')) {
    store.dispatch('apikeys/deleteKey', id)
  }
}

const toggleVisibility = (id) => {
  store.commit('apikeys/TOGGLE_KEY_VISIBILITY', id)
}

const copyKey = (value, id) => {
  navigator.clipboard.writeText(value)
  copiedId.value = id
  setTimeout(() => {
    if (copiedId.value === id) {
      copiedId.value = null
    }
  }, 2000)
}

onMounted(() => {
  store.dispatch('apikeys/fetchKeys')
})
</script>
