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
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Contact Us</h1>
                <p class="text-blue-100 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl">
                    Get in touch with our support and sales teams.
                </p>
            </div>
        </div>

        <main class="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <div
                class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-14 text-slate-600 dark:text-slate-400 leading-relaxed">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">We'd love to hear from you</h2>
                <p class="mb-6">
                    Whether you have a question about our API, pricing, or need technical support, our team is ready to
                    answer all your questions.
                </p>
                <div class="grid md:grid-cols-2 gap-6">
                    <div
                        class="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <h3 class="font-bold text-slate-900 dark:text-white mb-2">Support</h3>
                        <p class="text-sm">For technical questions and account assistance.</p>
                        <a href="mailto:support@feltechsms.com"
                            class="text-brand-blue dark:text-brand-green font-bold mt-2 inline-block">support@feltechsms.com</a>
                    </div>
                    <div
                        class="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <h3 class="font-bold text-slate-900 dark:text-white mb-2">Sales</h3>
                        <p class="text-sm">For enterprise plans and custom solutions.</p>
                        <a href="mailto:sales@feltechsms.com"
                            class="text-brand-blue dark:text-brand-green font-bold mt-2 inline-block">sales@feltechsms.com</a>
                    </div>
                </div>
            </div>
        </main>

        <Footer class="mt-auto" />
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>
