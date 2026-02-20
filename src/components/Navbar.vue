<template>
    <nav class="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center gap-2">
                    <div class="bg-indigo-600 p-1.5 rounded-lg">
                        <ChatBubbleBottomCenterTextIcon class="h-6 w-6 text-white" />
                    </div>
                    <span
                        class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">FELSMS</span>
                </div>

                <!-- Desktop Nav -->
                <div class="hidden md:flex items-center gap-8">
                    <a href="#features"
                        class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
                    <a href="#pricing"
                        class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
                    <a href="#" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">API
                        Docs</a>
                    <div class="h-4 w-px bg-slate-200"></div>
                    <a href="#"
                        class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Login</a>
                    <a href="#"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:shadow-md">
                        Get Started
                    </a>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @click="isOpen = !isOpen" class="text-slate-600 p-2">
                        <Bars3Icon v-if="!isOpen" class="h-6 w-6" />
                        <XMarkIcon v-else class="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile menu -->
        <div v-if="isOpen" class="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-3">
            <a href="#features" class="block text-base font-medium text-slate-600 hover:text-indigo-600">Features</a>
            <a href="#pricing" class="block text-base font-medium text-slate-600 hover:text-indigo-600">Pricing</a>
            <a href="#" class="block text-base font-medium text-slate-600 hover:text-indigo-600">API Docs</a>
            <a href="#" class="block text-base font-medium text-slate-600 hover:text-indigo-600">Login</a>
            <a href="#"
                class="block w-full text-center px-4 py-3 text-base font-semibold rounded-xl text-white bg-indigo-600">Get
                Started</a>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { ChatBubbleBottomCenterTextIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)
</script>
