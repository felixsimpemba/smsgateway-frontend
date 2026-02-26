<template>
    <nav
        class="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <router-link to="/" class="flex items-center gap-3 group">
                    <div class="p-1 rounded-xl transition-transform group-hover:scale-105">
                        <img src="@/assets/logo.png" alt="Feltech SMS Logo" class="h-10 w-auto" />
                    </div>
                </router-link>

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
                    <ThemeToggle />

                    <router-link to="/login"
                        class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Login</router-link>
                    <router-link to="/signup"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:shadow-md">
                        Get Started
                    </router-link>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden flex items-center gap-4">
                    <ThemeToggle />
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
import { ref } from 'vue'
import { ChatBubbleBottomCenterTextIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import ThemeToggle from './ThemeToggle.vue'

const isOpen = ref(false)
</script>
