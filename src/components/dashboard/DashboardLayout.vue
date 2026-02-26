<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">

    <!-- Fixed Sidebar -->
    <aside
      :class="['fixed top-0 left-0 z-40 h-screen bg-slate-900 transition-all duration-300 flex-shrink-0 flex flex-col', sidebarOpen ? 'w-64' : 'w-20']">
      <div class="h-20 flex items-center px-6 border-b border-slate-800">
        <router-link to="/dashboard" class="flex items-center overflow-hidden">
          <img src="/logo.png" alt="Logo"
            :class="['transition-all duration-300 object-contain', sidebarOpen ? 'h-10' : 'h-8 mx-auto']" />
        </router-link>
      </div>

      <nav class="mt-6 flex-1 px-4 space-y-1 overflow-y-auto overflow-x-hidden">
        <router-link v-for="item in navigation" :key="item.name" :to="item.href"
          class="flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 group"
          :class="[$route.path === item.href ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white']">
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0 transition-colors"
            :class="[$route.path === item.href ? 'text-white' : 'text-slate-500 group-hover:text-slate-300']" />
          <span v-if="sidebarOpen" class="ml-3 truncate whitespace-nowrap">{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-slate-800 flex-shrink-0">
        <button @click="handleLogout"
          class="w-full flex items-center px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <ArrowLeftOnRectangleIcon class="w-5 h-5 flex-shrink-0 text-slate-500" />
          <span v-if="sidebarOpen" class="ml-3">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content — push right by sidebar width -->
    <div :class="['flex flex-col min-h-screen transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-20']">
      <!-- Sticky Header -->
      <header
        class="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 h-16 flex items-center justify-between px-8 transition-colors duration-300">
        <button @click="sidebarOpen = !sidebarOpen"
          class="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex items-center space-x-4">
          <div v-if="user" class="hidden md:flex flex-col items-end mr-2">
            <span class="text-sm font-bold text-gray-900 dark:text-white">{{ user.name }}</span>
            <span class="text-xs text-gray-500 dark:text-slate-400">{{ user.email }}</span>
          </div>

          <ThemeToggle />
          <button
            class="p-2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 relative transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div v-if="user?.avatar"
            class="h-9 w-9 rounded-full overflow-hidden border border-gray-200 dark:border-slate-700">
            <img :src="user.avatar" :alt="user.name" class="h-full w-full object-cover" />
          </div>
          <div v-else
            class="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800/50 transition-colors uppercase">
            {{ userInitials }}
          </div>
        </div>
      </header>

      <!-- Scrollable Page Content -->
      <main class="flex-1 overflow-y-auto p-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {
  HomeIcon,
  PaperAirplaneIcon,
  ClockIcon,
  UserGroupIcon,
  KeyIcon,
  Cog6ToothIcon,
  IdentificationIcon,
  CurrencyDollarIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/vue/24/outline'
import ThemeToggle from '../ThemeToggle.vue'

const store = useStore()
const router = useRouter()
const sidebarOpen = ref(true)

const user = computed(() => store.getters['auth/currentUser'])
const userInitials = computed(() => {
  if (!user.value?.name) return '?'
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
})

const handleLogout = async () => {
  await store.dispatch('auth/logout')
  router.push('/login')
}

onMounted(() => {
  if (!user.value) {
    store.dispatch('auth/fetchUser')
  }
})

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon },
  { name: 'Billing', href: '/dashboard/billing', icon: CurrencyDollarIcon },
  { name: 'Send SMS', href: '/dashboard/send', icon: PaperAirplaneIcon },
  { name: 'Sender IDs', href: '/dashboard/sender-ids', icon: IdentificationIcon },
  { name: 'Logs', href: '/dashboard/logs', icon: ClockIcon },
  { name: 'Contacts', href: '/dashboard/contacts', icon: UserGroupIcon },
  { name: 'API Keys', href: '/dashboard/keys', icon: KeyIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]
</script>
