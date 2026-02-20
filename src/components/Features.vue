<template>
    <section id="features" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20">
                <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Everything you need to send SMS at scale
                </h2>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    Powerful features designed for modern applications. Reliable, fast, and incredibly easy to
                    integrate.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="feature in features" :key="feature.name"
                    class="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50 transition-all group">
                    <div
                        class="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                        <component :is="feature.icon"
                            class="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">{{ feature.name }}</h3>
                    <p class="text-slate-600 leading-relaxed">{{ feature.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import {
    RocketLaunchIcon,
    CurrencyDollarIcon,
    CommandLineIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    ArrowPathIcon
} from '@heroicons/vue/24/outline'

const features = [
    {
        name: "Fast & Reliable Delivery",
        description: "Highly optimized routing ensures your messages reach recipients in seconds, with 99.9% uptime and low latency across all Zambian networks.",
        icon: RocketLaunchIcon
    },
    {
        name: "Affordable Pricing",
        description: "Transparent pay-as-you-go pricing with tiered bulk discounts. Only pay for delivered messages with no hidden monthly fees.",
        icon: CurrencyDollarIcon
    },
    {
        name: "Simple REST API",
        description: "Developer-first design with comprehensive documentation, SDKs, and a sandboxed environment for testing your integration.",
        icon: CommandLineIcon
    },
    {
        name: "Real-time Analytics",
        description: "Gain deep insights into your messaging performance with detailed delivery reports, open rates, and conversion tracking.",
        icon: ChartBarIcon
    },
    {
        name: "Sender ID Branding",
        description: "Enhance brand trust by using custom alphanumeric sender IDs. We handle the registration and compliance process for you.",
        icon: ShieldCheckIcon
    },
    {
        name: "Two-Way Messaging",
        description: "Enable interactive conversations with shortcodes and long-codes, allowing users to reply directly to your messages.",
        icon: ArrowPathIcon
    }
]
</script>
