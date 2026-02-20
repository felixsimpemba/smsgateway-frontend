<template>
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-6 border border-indigo-100">
                    <span class="relative flex h-2 w-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    New: Global SMS Delivery API
                </div>
                <h1
                    class="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight md:leading-tight">
                    Reliable SMS Gateway <br class="hidden md:block" />
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">for
                        Developers</span>
                </h1>
                <p class="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
                    Send fast and secure SMS messages across Zambia and beyond through a simple, powerful API. Built for
                    scale, designed for simplicity.
                </p>
                <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#"
                        class="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-95">
                        Start Sending SMS
                    </a>
                    <a href="#"
                        class="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-y-1 active:scale-95">
                        View API Docs
                    </a>
                </div>
            </div>

            <!-- SMS-themed mockup/illustration placeholder -->
            <div class="mt-20 relative max-w-5xl mx-auto">
                <div
                    class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-3xl blur opacity-20">
                </div>
                <div
                    class="relative bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden aspect-video md:aspect-auto md:h-[500px] flex items-center justify-center">
                    <!-- Modern App Mockup Simulation -->
                    <div class="w-full h-full bg-slate-50 flex items-center justify-center p-8">
                        <div
                            class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-slate-100 animate-pulse">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <PaperAirplaneIcon class="h-5 w-5 text-indigo-600" />
                                </div>
                                <div class="h-4 w-32 bg-slate-100 rounded-full"></div>
                            </div>
                            <div class="space-y-4">
                                <div class="h-3 w-full bg-slate-100 rounded-full"></div>
                                <div class="h-3 w-5/6 bg-slate-100 rounded-full"></div>
                                <div class="h-3 w-4/6 bg-slate-100 rounded-full"></div>
                            </div>
                            <div class="mt-8 flex justify-end">
                                <div class="h-8 w-24 bg-indigo-100 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <!-- Trusted By Section -->
            <div class="mt-24 pt-10 border-t border-slate-100">
                <p class="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                    Trusted by forward-thinking companies
                </p>
                <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
                    <div v-for="i in 5" :key="i" class="h-8 w-24 bg-slate-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>

        <!-- Background Accents -->
        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08)_0%,transparent_50%)]">
        </div>
    </section>
</template>

<script setup>
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'
</script>
