<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div
            class="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-gray-100 dark:border-slate-800">
            <div
                class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon class="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>

            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h1>
            <p class="text-gray-500 dark:text-slate-400 mb-8">
                Your top-up was processed successfully. The SMS credits have been added to your balance.
            </p>

            <router-link to="/dashboard/billing"
                class="inline-flex w-full justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                View Transaction History
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
</script>
