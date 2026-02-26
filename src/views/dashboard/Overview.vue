<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
      <p class="text-gray-600 dark:text-slate-400">Welcome back{{ user ? ', ' + user.name : '' }}, here's what's happening with your messages.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.name"
        class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div class="flex items-center justify-between mb-4">
          <div :class="['p-2 rounded-xl', stat.bgClass, stat.darkBgClass]">
            <component :is="stat.icon" :class="['w-6 h-6', stat.textClass, stat.darkTextClass]" />
          </div>
          <span
            class="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">+{{
              stat.trend }}%</span>
        </div>
        <h3 class="text-gray-500 dark:text-slate-400 text-sm font-medium">{{ stat.name }}</h3>
        <p class="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 tracking-tight">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Charts/Detailed Stats Placeholder -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div
        class="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Message Activity</h3>
        <div class="h-64 flex items-end justify-between space-x-2">
          <div v-for="i in 12" :key="i"
            class="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-t-lg hover:bg-blue-600 dark:hover:bg-blue-500 transition-all relative group"
            :style="{ height: Math.random() * 80 + 20 + '%' }">
            <div
              class="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
              {{ Math.floor(Math.random() * 500) }}
            </div>
          </div>
        </div>
        <div
          class="flex justify-between mt-6 text-xs text-gray-400 dark:text-slate-500 font-bold px-1 uppercase tracking-wider">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
      </div>

      <div
        class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div class="space-y-6">
          <template v-if="overviewStats.recent_activity?.length">
            <div v-for="log in overviewStats.recent_activity" :key="log.id" class="flex items-start space-x-4">
              <div :class="['w-2.5 h-2.5 mt-1.5 rounded-full shadow-lg shadow-blue-500/50', log.status === 'Delivered' ? 'bg-green-500' : 'bg-blue-500']"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-gray-900 dark:text-white truncate">Message to {{ log.recipient }}</p>
                <p class="text-xs text-gray-500 dark:text-slate-500 font-medium">{{ formatDate(log.created_at) }}</p>
              </div>
            </div>
          </template>
          <div v-else class="text-center py-4 text-gray-500 text-sm">
            No recent activity
          </div>
        </div>
        <router-link to="/dashboard/logs"
          class="w-full mt-8 py-3 block text-center text-sm text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors">
          View all activity →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline'

const store = useStore()

const overviewStats = computed(() => store.state.stats.overview)
const user = computed(() => store.getters['auth/currentUser'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
  return date.toLocaleDateString()
}

const stats = computed(() => [
  {
    name: 'Total Sent',
    value: overviewStats.value.sent.toLocaleString(),
    trend: '12',
    icon: PaperAirplaneIcon,
    bgClass: 'bg-blue-50',
    darkBgClass: 'dark:bg-blue-900/20',
    textClass: 'text-blue-600',
    darkTextClass: 'dark:text-blue-400'
  },
  {
    name: 'Delivered',
    value: overviewStats.value.delivered.toLocaleString(),
    trend: '8',
    icon: CheckCircleIcon,
    bgClass: 'bg-green-50',
    darkBgClass: 'dark:bg-green-900/20',
    textClass: 'text-green-600',
    darkTextClass: 'dark:text-green-400'
  },
  {
    name: 'Failed',
    value: overviewStats.value.failed.toLocaleString(),
    trend: '2',
    icon: XCircleIcon,
    bgClass: 'bg-red-50',
    darkBgClass: 'dark:bg-red-900/20',
    textClass: 'text-red-600',
    darkTextClass: 'dark:text-red-400'
  },
  {
    name: 'Balance',
    value: `$${overviewStats.value.balance.toFixed(2)}`,
    trend: '0',
    icon: CurrencyDollarIcon,
    bgClass: 'bg-purple-50',
    darkBgClass: 'dark:bg-purple-900/20',
    textClass: 'text-purple-600',
    darkTextClass: 'dark:text-purple-400'
  },
])

onMounted(() => {
  store.dispatch('stats/fetchStats')
})
</script>
