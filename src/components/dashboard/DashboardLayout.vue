<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-950 flex transition-colors duration-300">
    <!-- Sidebar -->
    <aside :class="['bg-slate-900 transition-all duration-300 flex-shrink-0 flex flex-col', sidebarOpen ? 'w-64' : 'w-20']">
      <div class="h-20 flex items-center px-6">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span v-if="sidebarOpen" class="font-extrabold text-xl text-white tracking-tight">SMSGate</span>
        </div>
      </div>

      <nav class="mt-6 flex-1 px-4 space-y-2">
        <router-link 
          v-for="item in navigation" 
          :key="item.name" 
          :to="item.href"
          class="flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 group"
          :class="[$route.path === item.href ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white']"
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0 transition-colors" :class="[$route.path === item.href ? 'text-white' : 'text-slate-500 group-hover:text-slate-300']" />
          <span v-if="sidebarOpen" class="ml-3">{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-slate-800">
        <button class="w-full flex items-center px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <ArrowLeftOnRectangleIcon class="w-5 h-5 flex-shrink-0 text-slate-500" />
          <span v-if="sidebarOpen" class="ml-3">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Header -->
      <header class="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 h-16 flex items-center justify-between px-8 transition-colors duration-300">
        <button @click="sidebarOpen = !sidebarOpen" class="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex items-center space-x-4">
          <ThemeToggle />
          <button class="p-2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 relative transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div
            class="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-800/50 transition-colors">
            JD
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  HomeIcon, 
  PaperAirplaneIcon, 
  ClockIcon, 
  UserGroupIcon, 
  KeyIcon, 
  Cog6ToothIcon,
  IdentificationIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/vue/24/outline'
import ThemeToggle from '../ThemeToggle.vue'

const sidebarOpen = ref(true)

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon },
  { name: 'Send SMS', href: '/dashboard/send', icon: PaperAirplaneIcon },
  { name: 'Sender IDs', href: '/dashboard/sender-ids', icon: IdentificationIcon },
  { name: 'Logs', href: '/dashboard/logs', icon: ClockIcon },
  { name: 'Contacts', href: '/dashboard/contacts', icon: UserGroupIcon },
  { name: 'API Keys', href: '/dashboard/keys', icon: KeyIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]
</script>
