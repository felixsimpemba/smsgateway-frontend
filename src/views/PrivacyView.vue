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
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Privacy Policy</h1>
                <p class="text-blue-100 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl">
                    Effective Date: {{ new Date().toLocaleDateString() }}
                </p>
            </div>
        </div>

        <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-12 w-full">

            <!-- Sidebar Navigation -->
            <aside class="w-full md:w-64 flex-shrink-0">
                <div class="sticky top-24 relative">
                    <div class="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800"></div>
                    <ul class="space-y-4 text-sm relative z-10">
                        <li>
                            <a href="#collection" @click="activeSection = 'collection'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'collection' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">1. Information We Collect</a>
                        </li>
                        <li>
                            <a href="#usage" @click="activeSection = 'usage'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'usage' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">2. How We Use Information</a>
                        </li>
                        <li>
                            <a href="#security" @click="activeSection = 'security'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'security' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">3. Data Security</a>
                        </li>
                        <li>
                            <a href="#sharing" @click="activeSection = 'sharing'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'sharing' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">4. Sharing of Information</a>
                        </li>
                        <li>
                            <a href="#rights" @click="activeSection = 'rights'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'rights' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">5. Your Rights & Choices</a>
                        </li>
                    </ul>
                </div>
            </aside>

            <!-- Main Content Card -->
            <div
                class="flex-grow bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-14 text-slate-600 dark:text-slate-400 leading-relaxed">
                <div class="space-y-12">

                    <section id="collection" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">1. Information We Collect
                        </h2>
                        <p class="mb-6">We believe in being transparent about the data we collect. We only collect data
                            necessary to
                            provide and improve the Feltech SMS Service. This includes information you provide directly
                            to us, such as when you create an account, update your profile, or use the interactive
                            features of our API.</p>

                        <div class="grid md:grid-cols-2 gap-6 mt-8">
                            <div
                                class="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <h3 class="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </svg>
                                    Account Information
                                </h3>
                                <ul class="text-sm space-y-2 list-disc list-inside">
                                    <li>Name, email address, API keys</li>
                                    <li>Billing and payment details</li>
                                    <li>Company profile data</li>
                                </ul>
                            </div>
                            <div
                                class="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <h3 class="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                        </path>
                                    </svg>
                                    Usage Information
                                </h3>
                                <ul class="text-sm space-y-2 list-disc list-inside">
                                    <li>Message payloads and metadata</li>
                                    <li>Recipient contact numbers</li>
                                    <li>Delivery status and timestamps</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section id="usage" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">2. How We Use Your
                            Information</h2>
                        <p class="mb-4">We use the information we collect to operate, maintain, and provide the features
                            and
                            functionality of the Service. Crucially, we use this data to:</p>
                        <ul class="list-disc list-inside space-y-2 ml-4">
                            <li>Authenticate your API requests and web sessions.</li>
                            <li>Process transactions, calculate billing, and generate invoices.</li>
                            <li>Route SMS messages via upstream carrier networks and track delivery status.</li>
                            <li>Detect, investigate, and prevent fraudulent transactions, spam, and other illegal
                                activities.</li>
                        </ul>
                    </section>

                    <section id="security" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">3. Data Security</h2>
                        <p class="mb-4">We implement appropriate technical, administrative, and organizational security
                            measures
                            designed to protect your personal information against accidental or unlawful destruction,
                            loss, alteration, unauthorized disclosure, or access.</p>
                        <p>All sensitive information, such as API keys and passwords, are encrypted at rest. Traffic
                            between your applications and our API is strictly enforced over TLS (HTTPS).</p>
                    </section>

                    <section id="sharing" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">4. Sharing of Information
                        </h2>
                        <p class="mb-4">We do not sell your personal information or your message data. We share your
                            information in
                            the following circumstances:</p>
                        <ul class="list-disc list-inside space-y-3 ml-4">
                            <li><strong class="text-slate-900 dark:text-white">Telecommunication Carriers:</strong> We
                                must share recipient numbers and message
                                content with MNOs (Mobile Network Operators) in order to successfully deliver the SMS.
                            </li>
                            <li><strong class="text-slate-900 dark:text-white">Service Providers:</strong> We employ
                                third parties to facilitate our Service
                                (e.g., payment gateways, cloud infrastructure providers).</li>
                            <li><strong class="text-slate-900 dark:text-white">Legal Compliance:</strong> We may
                                disclose information if legally required to do
                                so to comply with applicable law or legal process.</li>
                        </ul>
                    </section>

                    <section id="rights" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">5. Your Rights & Choices</h2>
                        <p class="mb-4">You have the right to access, update, change or delete your personal information
                            at any time.
                            You can do this by logging into your account settings via the dashboard or by contacting our
                            support team directly.</p>
                        <p>If you wish to terminate your account and erase your payload history, you may initiate a
                            deletion request, which we will comply with in accordance with our data retention policies.
                        </p>
                    </section>

                </div>
            </div>
        </main>

        <Footer class="mt-auto" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const activeSection = ref('collection')

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSection.value = entry.target.id
            }
        })
    }, { rootMargin: '-20% 0px -70% 0px' })

    const sections = ['collection', 'usage', 'security', 'sharing', 'rights']
    sections.forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
    })
})
</script>
