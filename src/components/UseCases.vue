<template>
    <section class="py-24 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20">
                <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Built for every use case</h2>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    From startups to enterprises, FELSMS powers communication across all industries.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div v-for="useCase in useCases" :key="useCase.title"
                    class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
                        <component :is="useCase.icon" class="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">{{ useCase.title }}</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">{{ useCase.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import {
    ShieldCheckIcon,
    ShoppingBagIcon,
    BellAlertIcon,
    UserGroupIcon
} from '@heroicons/vue/24/outline'

const useCases = [
    {
        title: "Two-Factor Auth",
        description: "Secure your users with reliable OTP delivery. Low latency ensures a seamless login experience.",
        icon: ShieldCheckIcon
    },
    {
        title: "Marketing Campaigns",
        description: "Reach your customers directly with high-conversion SMS marketing tools and bulk sending.",
        icon: ShoppingBagIcon
    },
    {
        title: "Transaction Alerts",
        description: "Send instant notifications for bank transactions, order updates, and delivery status.",
        icon: BellAlertIcon
    },
    {
        title: "Customer Support",
        description: "Engage in two-way conversations with your customers to provide better service.",
        icon: UserGroupIcon
    }
]
</script>
