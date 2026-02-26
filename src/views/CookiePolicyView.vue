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
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Cookie Policy</h1>
                <p class="text-blue-100 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl">
                    Effective Date: {{ new Date().toLocaleDateString() }}
                </p>
            </div>
        </div>

        <main class="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <div
                class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-14 text-slate-600 dark:text-slate-400 leading-relaxed space-y-8">
                <section>
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. What are Cookies?</h2>
                    <p>
                        Cookies are small text files that are stored on your device when you visit our website. They
                        help us understand how you use our site and allow us to provide a better, more personalized
                        experience.
                    </p>
                </section>
                <section>
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. How We Use Cookies</h2>
                    <p class="mb-4">
                        We use cookies for the following purposes:
                    </p>
                    <ul class="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Essential Cookies:</strong> These are necessary for the website to function
                            properly, such as maintaining your session when logged in.</li>
                        <li><strong>Performance & Analytics:</strong> To help us understand how visitors interact with
                            our website by collecting and reporting information anonymously.</li>
                        <li><strong>Functional Cookies:</strong> To remember your preferences, such as your chosen theme
                            (light/dark mode).</li>
                    </ul>
                </section>
                <section>
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Managing Cookies</h2>
                    <p>
                        You can control and manage cookies through your browser settings. Please note that removing or
                        blocking cookies can impact your user experience and parts of our website may no longer be fully
                        accessible.
                    </p>
                </section>
            </div>
        </main>

        <Footer class="mt-auto" />
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>
