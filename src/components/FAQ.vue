<template>
    <section class="py-24 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
                <p class="mt-4 text-lg text-slate-600">
                    Everything you need to know about FELSMS.
                </p>
            </div>

            <div class="space-y-4">
                <div v-for="(faq, index) in faqs" :key="index"
                    class="rounded-2xl border border-slate-100 overflow-hidden">
                    <button @click="activeIndex = activeIndex === index ? null : index"
                        class="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors">
                        <span class="text-lg font-bold text-slate-800">{{ faq.question }}</span>
                        <ChevronDownIcon
                            :class="['h-5 w-5 text-slate-400 transition-transform duration-300', activeIndex === index ? 'rotate-180' : '']" />
                    </button>
                    <div v-show="activeIndex === index"
                        class="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                        {{ faq.answer }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const activeIndex = ref(0)

const faqs = [
    {
        question: "What is an SMS gateway?",
        answer: "An SMS gateway allows your application to send text messages to mobile phones over the telecommunications network. FELSMS provides a simple REST API that bridges the gap between your web/mobile app and various mobile carriers."
    },
    {
        question: "How fast is delivery?",
        answer: "We use direct connections with major carriers in Zambia and high-quality international routes. Messages are typically delivered within 2-10 seconds of being sent via our API."
    },
    {
        question: "Do you support bulk SMS?",
        answer: "Yes! Our infrastructure is designed to handle high volumes. Whether you're sending a single OTP or a million marketing messages, our system scales automatically to meet your needs."
    },
    {
        question: "Can I use my own Sender ID?",
        answer: "Absolutely. Once your account is verified, you can register custom Sender IDs (e.g., your brand name) for a professional look and better open rates. Registration follows local regulatory guidelines."
    },
    {
        question: "Do you provide delivery reports?",
        answer: "Yes, we provide real-time delivery reports (DLRs) for every message. You can check the status via our dashboard or receive automated updates via webhooks."
    },
    {
        question: "How do I top up my account?",
        answer: "You can top up your account balance using Credit/Debit cards, Mobile Money (Airtel/MTN), or Bank Transfers directly from your dashboard. Credits never expire."
    }
]
</script>
