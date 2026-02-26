<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p class="text-gray-500 dark:text-slate-400 text-sm mt-1">
          Welcome back{{ user ? ', ' + user.name : '' }} &mdash; here's a snapshot of your messaging activity.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <select v-model="selectedPeriod"
          class="text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 rounded-xl px-4 py-2 font-semibold focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
        <button @click="refresh"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
          <ArrowPathIcon class="w-4 h-4" :class="{ 'animate-spin': refreshing }" />
          Refresh
        </button>
      </div>
    </div>

    <!-- KPI Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in statCards" :key="stat.name"
        class="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div :class="['p-2.5 rounded-xl', stat.bgLight, stat.bgDark]">
            <component :is="stat.icon" :class="['w-5 h-5', stat.textLight, stat.textDark]" />
          </div>
          <button v-if="stat.action" @click="stat.action"
            :class="['text-xs font-bold px-2 py-1 rounded-lg transition-colors', stat.badgeBg, stat.badgeText]">
            {{ stat.trend }}
          </button>
          <span v-else :class="['text-xs font-bold px-2 py-1 rounded-lg', stat.badgeBg, stat.badgeText]">
            {{ stat.trend }}
          </span>
        </div>
        <p class="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{{ stat.name }}</p>
        <p class="text-3xl font-extrabold text-gray-900 dark:text-white mt-1 tracking-tight">{{ stat.value }}</p>
        <p class="text-xs text-gray-400 dark:text-slate-500 mt-2">{{ stat.sub }}</p>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Bar Chart: Message Activity -->
      <div
        class="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-base font-bold text-gray-900 dark:text-white">Message Activity</h3>
          <div class="flex items-center gap-4 text-xs font-semibold text-gray-400 dark:text-slate-500">
            <span class="flex items-center gap-1.5"><span
                class="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>Sent</span>
            <span class="flex items-center gap-1.5"><span
                class="w-3 h-3 rounded-full bg-green-500 inline-block"></span>Delivered</span>
            <span class="flex items-center gap-1.5"><span
                class="w-3 h-3 rounded-full bg-red-400 inline-block"></span>Failed</span>
          </div>
        </div>
        <!-- SVG Bar Chart -->
        <div class="w-full overflow-x-auto">
          <svg viewBox="0 0 560 200" class="w-full" style="min-width:320px">
            <defs>
              <linearGradient id="grad-sent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3b82f6" />
                <stop offset="100%" stop-color="#2563eb" />
              </linearGradient>
              <linearGradient id="grad-delivered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#22c55e" />
                <stop offset="100%" stop-color="#16a34a" />
              </linearGradient>
              <linearGradient id="grad-failed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f87171" />
                <stop offset="100%" stop-color="#ef4444" />
              </linearGradient>
            </defs>
            <!-- Grid lines -->
            <line v-for="y in [40, 80, 120, 160, 195]" :key="y" :y1="y" :y2="y" x1="32" x2="556" stroke="currentColor"
              stroke-width="0.5" class="text-gray-200 dark:text-slate-800" />
            <!-- Y labels -->
            <text v-for="(label, i) in yLabels" :key="i" :x="28" :y="label.y" text-anchor="end"
              class="fill-gray-400 dark:fill-slate-500" style="font-size:9px;font-weight:600">{{ label.v }}</text>
            <!-- Bars -->
            <template v-for="(bar, i) in chartBars" :key="i">
              <rect :x="bar.x" :y="bar.sentY" :width="bar.w" :height="bar.sentH" rx="3" fill="url(#grad-sent)"
                opacity="0.9" />
              <rect :x="bar.x + bar.w + 2" :y="bar.delY" :width="bar.w" :height="bar.delH" rx="3"
                fill="url(#grad-delivered)" opacity="0.9" />
              <rect :x="bar.x + bar.w * 2 + 4" :y="bar.faiY" :width="bar.w" :height="bar.faiH" rx="3"
                fill="url(#grad-failed)" opacity="0.85" />
              <text :x="bar.x + bar.w * 1.5 + 2" y="198" text-anchor="middle" class="fill-gray-400 dark:fill-slate-600"
                style="font-size:8px;font-weight:700">{{ bar.label }}</text>
            </template>
          </svg>
        </div>
      </div>

      <!-- Donut Chart: Delivery Rate -->
      <div
        class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col">
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-6">Delivery Breakdown</h3>
        <div class="flex-1 flex flex-col items-center justify-center">
          <!-- SVG Donut -->
          <svg viewBox="0 0 160 160" class="w-40 h-40">
            <circle cx="80" cy="80" r="60" fill="none" stroke="#e2e8f0" stroke-width="22"
              class="dark:stroke-slate-800" />
            <!-- Delivered segment -->
            <circle cx="80" cy="80" r="60" fill="none" stroke="#22c55e" stroke-width="22"
              :stroke-dasharray="`${deliveredArc} ${circumference}`" stroke-dashoffset="0" stroke-linecap="round"
              transform="rotate(-90 80 80)" style="transition: stroke-dasharray 1s ease" />
            <!-- Failed segment -->
            <circle cx="80" cy="80" r="60" fill="none" stroke="#f87171" stroke-width="22"
              :stroke-dasharray="`${failedArc} ${circumference}`" :stroke-dashoffset="`-${deliveredArc}`"
              transform="rotate(-90 80 80)" style="transition: stroke-dasharray 1s ease" />
            <!-- Pending segment -->
            <circle cx="80" cy="80" r="60" fill="none" stroke="#fbbf24" stroke-width="22"
              :stroke-dasharray="`${pendingArc} ${circumference}`" :stroke-dashoffset="`-${deliveredArc + failedArc}`"
              transform="rotate(-90 80 80)" style="transition: stroke-dasharray 1s ease" />
            <text x="80" y="75" text-anchor="middle" class="fill-gray-900 dark:fill-white"
              style="font-size:18px;font-weight:800">{{ deliveryRate }}%</text>
            <text x="80" y="92" text-anchor="middle" class="fill-gray-400 dark:fill-slate-500"
              style="font-size:9px;font-weight:600">DELIVERY RATE</text>
          </svg>
          <div class="mt-6 w-full space-y-2">
            <div v-for="seg in donutSegments" :key="seg.label"
              class="flex items-center justify-between text-xs font-semibold">
              <span class="flex items-center gap-2"><span :class="['w-2.5 h-2.5 rounded-full', seg.dot]"></span>
                <span class="text-gray-500 dark:text-slate-400">{{ seg.label }}</span>
              </span>
              <span class="text-gray-900 dark:text-white font-bold">{{ seg.pct }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Trend Sparklines + Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Trends Column -->
      <div class="space-y-4">
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Trends</h3>
        <div v-for="trend in trends" :key="trend.label"
          class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div :class="['p-2.5 rounded-xl flex-shrink-0', trend.iconBg]">
            <component :is="trend.icon" :class="['w-5 h-5', trend.iconColor]" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{{ trend.label }}
            </p>
            <p class="text-xl font-extrabold text-gray-900 dark:text-white">{{ trend.value }}</p>
          </div>
          <!-- Sparkline SVG -->
          <svg :viewBox="`0 0 80 32`" class="w-20 h-8 flex-shrink-0">
            <polyline :points="sparkline(trend.data)" fill="none" :stroke="trend.lineColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Recent Activity -->
      <div
        class="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-base font-bold text-gray-900 dark:text-white">Recent Activity</h3>
          <router-link to="/dashboard/logs"
            class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">View
            all →</router-link>
        </div>
        <div class="space-y-4">
          <template v-if="overviewStats.recent_activity?.length">
            <div v-for="log in overviewStats.recent_activity" :key="log.id"
              class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
              <div
                :class="['w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-lg', log.status === 'Delivered' ? 'bg-green-500 shadow-green-500/50' : log.status === 'Failed' ? 'bg-red-500 shadow-red-500/50' : 'bg-amber-400 shadow-amber-400/50']">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-gray-900 dark:text-white truncate">To: {{ log.recipient }}</p>
                <p class="text-xs text-gray-400 dark:text-slate-500">{{ formatDate(log.created_at) }}</p>
              </div>
              <span :class="['text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide flex-shrink-0',
                log.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                  log.status === 'Failed' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                    'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400']">
                {{ log.status }}
              </span>
            </div>
          </template>
          <div v-else class="py-12 flex flex-col items-center text-center">
            <InboxIcon class="w-12 h-12 text-gray-200 dark:text-slate-700 mb-3" />
            <p class="text-sm font-semibold text-gray-400 dark:text-slate-500">No recent activity</p>
            <router-link to="/dashboard/send"
              class="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Send your first message
              →</router-link>
          </div>
        </div>
      </div>
    </div> <!-- End of Bottom Row Grid -->

    <!-- TopUp Modal placed outside the grid system -->
    <TopUpModal :isOpen="showModal" @close="showModal = false" />
  </div> <!-- End of main Overview div -->
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import TopUpModal from '../../components/dashboard/TopUpModal.vue'
import {
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  SignalIcon,
  InboxIcon
} from '@heroicons/vue/24/outline'

const store = useStore()
const selectedPeriod = ref('30')
const refreshing = ref(false)
const showModal = ref(false)

const overviewStats = computed(() => store.state.stats?.overview ?? {
  sent: 0, delivered: 0, failed: 0, balance: 0, pending: 0, recent_activity: []
})
const user = computed(() => store.getters['auth/currentUser'])

// ----------- KPI Cards -----------
const statCards = computed(() => {
  const s = overviewStats.value
  const sent = Number(s.sent ?? 0)
  const delivered = Number(s.delivered ?? 0)
  const failed = Number(s.failed ?? 0)
  const balance = Number(s.balance ?? 0)
  const pending = Number(s.pending ?? 0)
  const rate = sent > 0 ? ((delivered / sent) * 100).toFixed(1) : '0.0'
  return [
    {
      name: 'Total Sent', value: sent.toLocaleString(), trend: '+12%', sub: `${pending} pending`,
      icon: PaperAirplaneIcon,
      bgLight: 'bg-blue-50', bgDark: 'dark:bg-blue-900/20',
      textLight: 'text-blue-600', textDark: 'dark:text-blue-400',
      badgeBg: 'bg-green-100 dark:bg-green-900/20', badgeText: 'text-green-700 dark:text-green-400'
    },
    {
      name: 'Delivered', value: delivered.toLocaleString(), trend: `${rate}% rate`, sub: 'Successfully delivered',
      icon: CheckCircleIcon,
      bgLight: 'bg-green-50', bgDark: 'dark:bg-green-900/20',
      textLight: 'text-green-600', textDark: 'dark:text-green-400',
      badgeBg: 'bg-green-100 dark:bg-green-900/20', badgeText: 'text-green-700 dark:text-green-400'
    },
    {
      name: 'Failed', value: failed.toLocaleString(), trend: `${sent > 0 ? ((failed / sent) * 100).toFixed(1) : 0}% rate`, sub: 'Delivery failures',
      icon: XCircleIcon,
      bgLight: 'bg-red-50', bgDark: 'dark:bg-red-900/20',
      textLight: 'text-red-500', textDark: 'dark:text-red-400',
      badgeBg: 'bg-red-100 dark:bg-red-900/20', badgeText: 'text-red-600 dark:text-red-400'
    },
    {
      name: 'Account Balance', value: `$${balance.toFixed(2)}`, trend: 'Top up →', sub: `~${Number(s.sms_balance ?? 0).toLocaleString()} SMS`,
      icon: CurrencyDollarIcon,
      bgLight: 'bg-purple-50', bgDark: 'dark:bg-purple-900/20',
      textLight: 'text-purple-600', textDark: 'dark:text-purple-400',
      badgeBg: 'bg-purple-100 dark:bg-purple-900/20 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-900/40', badgeText: 'text-purple-700 dark:text-purple-400',
      action: () => showModal.value = true
    },
  ]
})

// ----------- Bar chart -----------
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// Demo data — replace with real API data
const rawData = [
  { sent: 320, delivered: 290, failed: 30 },
  { sent: 480, delivered: 440, failed: 40 },
  { sent: 250, delivered: 220, failed: 30 },
  { sent: 600, delivered: 560, failed: 40 },
  { sent: 380, delivered: 350, failed: 30 },
  { sent: 500, delivered: 465, failed: 35 },
  { sent: 420, delivered: 400, failed: 20 },
  { sent: 540, delivered: 510, failed: 30 },
  { sent: 470, delivered: 440, failed: 30 },
  { sent: 610, delivered: 575, failed: 35 },
  { sent: 390, delivered: 360, failed: 30 },
  { sent: 280, delivered: 260, failed: 20 },
]
const maxVal = Math.max(...rawData.map(d => d.sent))
const chartH = 180
const chartBars = computed(() => {
  const bw = 10
  const groupW = bw * 3 + 4 + 8
  return rawData.map((d, i) => {
    const x = 36 + i * groupW
    const scale = v => chartH - (v / maxVal) * chartH
    return {
      x, w: bw, label: months[i],
      sentY: scale(d.sent), sentH: (d.sent / maxVal) * chartH,
      delY: scale(d.delivered), delH: (d.delivered / maxVal) * chartH,
      faiY: scale(d.failed), faiH: (d.failed / maxVal) * chartH,
    }
  })
})
const yLabels = [
  { v: maxVal, y: 44 }, { v: Math.round(maxVal * 0.75), y: 84 },
  { v: Math.round(maxVal * 0.5), y: 124 }, { v: Math.round(maxVal * 0.25), y: 164 }, { v: 0, y: 198 },
]

// ----------- Donut chart -----------
const circumference = 2 * Math.PI * 60
const deliveryRate = computed(() => {
  const s = overviewStats.value
  const sent = Number(s.sent ?? 0)
  const delivered = Number(s.delivered ?? 0)
  return sent > 0 ? Math.round((delivered / sent) * 100) : 0
})
const deliveredArc = computed(() => (deliveryRate.value / 100) * circumference)
const failedPct = computed(() => {
  const s = overviewStats.value
  const sent = Number(s.sent ?? 0)
  const failed = Number(s.failed ?? 0)
  return sent > 0 ? Math.round((failed / sent) * 100) : 0
})
const failedArc = computed(() => (failedPct.value / 100) * circumference)
const pendingPct = computed(() => Math.max(0, 100 - deliveryRate.value - failedPct.value))
const pendingArc = computed(() => (pendingPct.value / 100) * circumference)

const donutSegments = computed(() => [
  { label: 'Delivered', pct: deliveryRate.value, dot: 'bg-green-500' },
  { label: 'Failed', pct: failedPct.value, dot: 'bg-red-400' },
  { label: 'Pending', pct: pendingPct.value, dot: 'bg-amber-400' },
])

// ----------- Sparklines -----------
const sparkline = (data) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  return data.map((v, i) => `${(i / (data.length - 1)) * 80},${28 - ((v - min) / range) * 26}`).join(' ')
}
const trends = [
  {
    label: 'Avg. Response Time', value: '1.2s',
    icon: ClockIcon, iconBg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-600 dark:text-blue-400',
    lineColor: '#3b82f6',
    data: [1.8, 1.5, 1.6, 1.4, 1.2, 1.3, 1.1, 1.2, 1.0, 1.2],
  },
  {
    label: 'Delivery Rate (30d)', value: `${deliveryRate.value}%`,
    icon: SignalIcon, iconBg: 'bg-green-50 dark:bg-green-900/20', iconColor: 'text-green-600 dark:text-green-400',
    lineColor: '#22c55e',
    data: [82, 85, 87, 83, 88, 90, 86, 91, 89, 92],
  },
  {
    label: 'Msgs / Day', value: '42',
    icon: ArrowTrendingUpIcon, iconBg: 'bg-purple-50 dark:bg-purple-900/20', iconColor: 'text-purple-600 dark:text-purple-400',
    lineColor: '#a855f7',
    data: [30, 38, 42, 35, 48, 44, 50, 46, 42, 55],
  },
]

// ----------- Helpers -----------
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now - date) / (1000 * 60))
  if (diff < 1) return 'Just now'
  if (diff < 60) return `${diff}m ago`
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
  return date.toLocaleDateString()
}

const refresh = async () => {
  refreshing.value = true
  await store.dispatch('stats/fetchStats')
  setTimeout(() => { refreshing.value = false }, 800)
}

onMounted(() => {
  store.dispatch('stats/fetchStats')
})
</script>