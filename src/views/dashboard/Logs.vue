<template>
  <div>
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Message Logs</h1>
        <p class="text-gray-600 dark:text-slate-400">Track and manage your sent and received messages.</p>
      </div>
      <div class="flex items-center space-x-3">
        <button @click="exportLogs"
          class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center transition-all">
          <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
          Export CSV
        </button>
        <button @click="refreshLogs"
          class="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
          :disabled="loading">
          {{ loading ? 'Loading...' : 'Refresh' }}
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm mb-6 flex flex-wrap gap-4 transition-colors">
      <div class="flex-1 min-w-[200px]">
        <div class="relative">
          <MagnifyingGlassIcon
            class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
          <input type="text" :value="filters.search" @input="updateFilter('search', $event.target.value)"
            placeholder="Search by number or content..."
            class="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-gray-900 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
        </div>
      </div>
      <select :value="filters.status" @change="updateFilter('status', $event.target.value)"
        class="bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all">
        <option>All Statuses</option>
        <option>Delivered</option>
        <option>Pending</option>
        <option>Failed</option>
      </select>
      <select :value="filters.dateRange" @change="updateFilter('dateRange', $event.target.value)"
        class="bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all">
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
        <option>This Month</option>
      </select>
    </div>

    <!-- Table -->
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
              <th class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                Recipient</th>
              <th class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                Message</th>
              <th class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                Status</th>
              <th class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                Date/Time</th>
              <th
                class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest text-right">
                Cost</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-slate-800">
            <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
              <td class="px-6 py-5">
                <div class="font-bold text-gray-900 dark:text-white">{{ log.recipient }}</div>
                <div class="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tight mt-0.5">
                  United States</div>
              </td>
              <td class="px-6 py-5">
                <div class="text-sm text-gray-600 dark:text-slate-300 truncate max-w-xs font-medium">{{ log.message }}
                </div>
              </td>
              <td class="px-6 py-5">
                <span :class="[
                  'px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider',
                  log.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                    log.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                      'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                ]">
                  {{ log.status }}
                </span>
              </td>
              <td class="px-6 py-5">
                <div class="text-sm font-bold text-gray-900 dark:text-white">{{ log.date }}</div>
                <div class="text-xs font-medium text-gray-500 dark:text-slate-500">{{ log.time }}</div>
              </td>
              <td class="px-6 py-5 text-right">
                <div class="text-sm font-extrabold text-gray-900 dark:text-white tracking-tight">${{ log.cost }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="px-6 py-5 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 flex items-center justify-between transition-colors">
        <span class="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tight">Showing 1 to 10 of
          1,284 results</span>
        <div class="flex space-x-2">
          <button
            class="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl text-xs font-bold text-gray-400 dark:text-slate-500 disabled:opacity-50"
            disabled>Previous</button>
          <button
            class="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

const store = useStore()

const logs = computed(() => store.getters['logs/allLogs'])
const loading = computed(() => store.getters['logs/isLoading'])
const filters = computed(() => store.state.logs.filters)

const updateFilter = (key, value) => {
  store.commit('logs/UPDATE_FILTERS', { [key]: value })
  store.dispatch('logs/fetchLogs')
}

const refreshLogs = () => {
  store.dispatch('logs/fetchLogs')
}

const exportLogs = () => {
  store.dispatch('logs/exportLogs')
}

onMounted(() => {
  store.dispatch('logs/fetchLogs')
})
</script>
