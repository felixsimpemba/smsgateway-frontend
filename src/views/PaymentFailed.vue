<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div
            class="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-gray-100 dark:border-slate-800">
            <div
                class="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircleIcon class="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>

            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Failed</h1>
            <p class="text-gray-500 dark:text-slate-400 mb-8">
                We were unable to process your payment. Your card was not charged. Please try again or use a different
                payment method.
            </p>

            <div class="space-y-3">
                <router-link to="/dashboard/billing"
                    class="inline-flex w-full justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                    Try Again
                </router-link>
                <router-link to="/dashboard"
                    class="inline-flex w-full justify-center items-center text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-white font-bold py-3 transition-colors">
                    Return to Dashboard
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { XCircleIcon } from '@heroicons/vue/24/outline'
</script>
