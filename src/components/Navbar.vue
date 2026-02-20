<template>
    <nav
        class="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center gap-2">
                    <div class="bg-indigo-600 p-1.5 rounded-lg">
                        <ChatBubbleBottomCenterTextIcon class="h-6 w-6 text-white" />
                    </div>
                    <router-link to="/"
                        class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Feltech
                        SMS</router-link>
                </div>

                <!-- Desktop Nav -->
                <div class="hidden md:flex items-center gap-8">
                    <a href="#features"
                        class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
                    <a href="#pricing"
                        class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a>
                    <a href="#"
                        class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">API
                        Docs</a>
                    <div class="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>

                    <!-- Theme Toggle -->
                    <button @click="toggleTheme"
                        class="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
                        aria-label="Toggle theme">
                        <SunIcon v-if="isDark" class="h-5 w-5" />
                        <MoonIcon v-else class="h-5 w-5" />
                    </button>

                    <router-link to="/login"
                        class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Login</router-link>
                    <router-link to="/signup"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:shadow-md">
                        Get Started
                    </router-link>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden flex items-center gap-4">
                    <button @click="toggleTheme" class="p-2 text-slate-500 dark:text-slate-400"
                        aria-label="Toggle theme">
                        <SunIcon v-if="isDark" class="h-5 w-5" />
                        <MoonIcon v-else class="h-5 w-5" />
                    </button>
                    <button @click="isOpen = !isOpen" class="text-slate-600 dark:text-slate-300 p-2">
                        <Bars3Icon v-if="!isOpen" class="h-6 w-6" />
                        <XMarkIcon v-else class="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile menu -->
        <div v-if="isOpen"
            class="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 py-4 space-y-3">
            <a href="#features"
                class="block text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600">Features</a>
            <a href="#pricing"
                class="block text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600">Pricing</a>
            <a href="#" class="block text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600">API
                Docs</a>
            <router-link to="/login"
                class="block text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600">Login</router-link>
            <router-link to="/signup"
                class="block w-full text-center px-4 py-3 text-base font-semibold rounded-xl text-white bg-indigo-600">Get
                Started</router-link>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ChatBubbleBottomCenterTextIcon, Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)
const isDark = ref(false)

onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
})

const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}
</script>
