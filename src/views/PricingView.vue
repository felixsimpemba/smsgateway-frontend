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
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Pricing</h1>
                <p class="text-blue-100 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl">
                    Simple, transparent pricing. Pay only for what you send.
                </p>
            </div>
        </div>

        <main class="flex-grow">
            <!-- Calculator Section -->
            <section class="py-16 bg-slate-50 dark:bg-slate-900">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-8">Calculate Your Costs</h2>

                    <div
                        class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700">
                        <div class="grid md:grid-cols-2 gap-8 items-center">

                            <!-- SMS Input -->
                            <div class="text-left">
                                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Number of
                                    SMS</label>
                                <div class="relative">
                                    <input type="number" v-model="smsAmount" @input="calculateFromSMS" min="1"
                                        class="block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-lg p-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                                        placeholder="Enter SMS volume..." />
                                </div>
                            </div>

                            <!-- Price Output -->
                            <div class="text-left">
                                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Estimated
                                    Cost (ZMW)</label>
                                <div class="relative">
                                    <span
                                        class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 font-bold">ZMW</span>
                                    <input type="number" v-model="zmwCost" @input="calculateFromZMW" min="0" step="0.01"
                                        class="block w-full rounded-xl pl-16 border-slate-300 dark:border-slate-600 shadow-sm focus:border-brand-blue focus:ring-brand-blue font-bold sm:text-2xl p-4 bg-brand-blue/5 dark:bg-slate-900 text-brand-blue dark:text-brand-green"
                                        placeholder="0.00" />
                                </div>
                                <p class="text-sm mt-2 text-slate-500 text-right">Effective Rate: ZMW {{ effectiveRate
                                    }} / SMS</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Pricing />
        </main>

        <Footer class="mt-auto" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import Pricing from '../components/Pricing.vue'
import Footer from '../components/Footer.vue'

const smsAmount = ref(1000)
const zmwCost = ref(350.00)

// Tier definitions based on existing plans
// Up to 230 SMS: 100 ZMW -> ~0.435/SMS
// Up to 1000 SMS: 350 ZMW -> 0.35/SMS
// Up to 4000 SMS: 1000 ZMW -> 0.25/SMS
// Up to 10000 SMS: 2000 ZMW -> 0.20/SMS

const calculateFromSMS = () => {
    let count = parseInt(smsAmount.value) || 0;
    if (count <= 5) zmwCost.value = 0;
    else if (count <= 230) zmwCost.value = (count * 0.4347).toFixed(2);
    else if (count <= 1000) zmwCost.value = (count * 0.35).toFixed(2);
    else if (count <= 4000) zmwCost.value = (count * 0.25).toFixed(2);
    else zmwCost.value = (count * 0.20).toFixed(2);
}

const calculateFromZMW = () => {
    let cost = parseFloat(zmwCost.value) || 0;
    if (cost <= 0) smsAmount.value = 5;
    else if (cost <= 100) smsAmount.value = Math.floor(cost / 0.4347);
    else if (cost <= 350) smsAmount.value = Math.floor(cost / 0.35);
    else if (cost <= 1000) smsAmount.value = Math.floor(cost / 0.25);
    else smsAmount.value = Math.floor(cost / 0.20);
}

const effectiveRate = computed(() => {
    let count = parseInt(smsAmount.value) || 0;
    let cost = parseFloat(zmwCost.value) || 0;
    if (count === 0) return "0.00";
    return (cost / count).toFixed(3);
})
</script>
