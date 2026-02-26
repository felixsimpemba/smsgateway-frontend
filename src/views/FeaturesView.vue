<template>
    <div
        class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300 pb-20">
        <Navbar />

        <!-- Header -->
        <div
            class="relative bg-brand-blue dark:bg-slate-900 pt-32 pb-24 text-white overflow-hidden border-b border-brand-blue/20 dark:border-slate-800">
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div
                    class="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-brand-green/20 dark:bg-brand-green/10 rounded-full blur-3xl">
                </div>
            </div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Features</h1>
                <p class="text-blue-100 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl">
                    Everything you need to send SMS at scale. Reliable, fast, and easy to integrate.
                </p>
            </div>
        </div>

        <main class="flex-grow">
            <Features />
        </main>

        <Footer class="mt-auto" />
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Features from '../components/Features.vue'
import Footer from '../components/Footer.vue'
</script>
