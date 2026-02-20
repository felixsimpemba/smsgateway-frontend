<template>
    <section id="pricing" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20">
                <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Simple, transparent pricing</h2>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    No hidden fees or complex contracts. Pay only for what you send.
                </p>
                <div class="mt-6 inline-flex p-1 bg-slate-100 rounded-xl">
                    <button class="px-6 py-2 bg-white rounded-lg shadow-sm text-sm font-bold text-indigo-600">Pay As You
                        Go</button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div v-for="plan in plans" :key="plan.name" :class="[
                    'p-8 rounded-3xl border transition-all hover:-translate-y-2',
                    plan.featured ? 'border-indigo-600 bg-white ring-4 ring-indigo-50 shadow-2xl relative' : 'border-slate-100 bg-slate-50'
                ]">
                    <div v-if="plan.featured"
                        class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                        Most Popular
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">{{ plan.name }}</h3>
                    <div class="flex items-baseline gap-1 mb-6">
                        <span class="text-4xl font-extrabold text-slate-900">{{ plan.price }}</span>
                        <span class="text-slate-500 font-medium">/ SMS</span>
                    </div>
                    <p class="text-slate-600 mb-8">{{ plan.description }}</p>
                    <ul class="space-y-4 mb-8">
                        <li v-for="feature in plan.features" :key="feature" class="flex gap-3 text-sm text-slate-600">
                            <CheckCircleIcon class="h-5 w-5 text-indigo-500 flex-shrink-0" />
                            {{ feature }}
                        </li>
                    </ul>
                    <a href="#" :class="[
                        'block w-full text-center py-4 rounded-2xl font-bold transition-all',
                        plan.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200' : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50'
                    ]">
                        {{ plan.buttonText }}
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/20/solid'

const plans = [
    {
        name: "Basic",
        price: "ZMW 0.25",
        description: "Perfect for small businesses and hobbyist projects.",
        buttonText: "Get Started",
        features: ["Shared Sender ID", "Real-time Reports", "API Integration", "Community Support"]
    },
    {
        name: "Standard",
        price: "ZMW 0.22",
        description: "Ideal for growing startups and medium-sized enterprises.",
        featured: true,
        buttonText: "Start Free Trial",
        features: ["Custom Sender ID", "Priority Routing", "Dedicated Webhooks", "Email Support", "Campaign Manager"]
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Custom solutions for high-volume requirements.",
        buttonText: "Contact Sales",
        features: ["Dedicated Account Manager", "Custom Rate Limits", "SLA Guarantee", "On-premise Options", "24/7 Support"]
    }
]
</script>
