<template>
    <nav
        class="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <router-link to="/" class="flex items-center gap-3 group">
                    <div class="p-1 rounded-xl transition-transform group-hover:scale-105">
                        <img src="/logo.png" alt="Feltech SMS Logo" class="h-30 w-auto" />
                    </div>
                </router-link>

                <!-- Desktop Nav -->
                <div class="hidden md:flex items-center gap-8">
                    <router-link to="/#hero"
                        :class="['text-sm transition-colors', activeSection === 'hero' && $route.path === '/' ? 'text-brand-blue dark:text-brand-green font-bold' : 'font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-green']">
                        Home
                    </router-link>
                    <router-link to="/features"
                        :class="['text-sm transition-colors', $route.path === '/features' ? 'text-brand-blue dark:text-brand-green font-bold' : 'font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-green']">
                        Features
                    </router-link>
                    <router-link to="/pricing"
                        :class="['text-sm transition-colors', $route.path === '/pricing' ? 'text-brand-blue dark:text-brand-green font-bold' : 'font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-green']">
                        Pricing
                    </router-link>
                    <router-link to="/docs"
                        :class="['text-sm transition-colors', $route.path === '/docs' ? 'text-brand-blue dark:text-brand-green font-bold' : 'font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-green']">
                        API Docs
                    </router-link>
                    <div class="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>

                    <!-- Theme Toggle -->
                    <ThemeToggle />

                    <router-link to="/login"
                        class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-green transition-colors">Login</router-link>
                    <router-link to="/signup"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-full text-white bg-brand-blue hover:bg-brand-blue/90 shadow-sm transition-all hover:shadow-md">
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
            <router-link to="/#hero" @click="isOpen = false"
                :class="['block text-base transition-colors', activeSection === 'hero' && $route.path === '/' ? 'text-brand-blue dark:text-brand-green font-bold' : 'font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue']">
                Home
            </router-link>
            <router-link to="/features" @click="isOpen = false"
                :class="['block text-base transition-colors', $route.path === '/features' ? 'text-brand-blue dark:text-brand-green font-bold' : 'font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue']">
                Features
            </router-link>
            <router-link to="/pricing" @click="isOpen = false"
                :class="['block text-base transition-colors', $route.path === '/pricing' ? 'text-brand-blue dark:text-brand-green font-bold' : 'font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue']">
                Pricing
            </router-link>
            <router-link to="/docs" @click="isOpen = false"
                :class="['block text-base transition-colors', $route.path === '/docs' ? 'text-brand-blue dark:text-brand-green font-bold' : 'font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue']">
                API Docs
            </router-link>
            <router-link to="/login"
                class="block text-base font-medium text-slate-600 dark:text-slate-300 hover:text-brand-blue">Login</router-link>
            <router-link to="/signup"
                class="block w-full text-center px-4 py-3 text-base font-semibold rounded-xl text-white bg-brand-blue hover:bg-brand-blue/90">Get
                Started</router-link>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ChatBubbleBottomCenterTextIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import ThemeToggle from './ThemeToggle.vue'

const isOpen = ref(false)
const route = useRoute()
const activeSection = ref('')

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && route.path === '/') {
                activeSection.value = entry.target.id
            }
        })
    }, { threshold: 0.3 })

    const observeSections = () => {
        ['hero'].forEach(id => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
    }

    setTimeout(observeSections, 500)

    watch(() => route.path, (newPath) => {
        if (newPath === '/') {
            setTimeout(observeSections, 500)
        } else {
            activeSection.value = ''
        }
    })
})
</script>
