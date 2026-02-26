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
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Terms of Service</h1>
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
                            <a href="#acceptance" @click="activeSection = 'acceptance'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'acceptance' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">1. Acceptance of Terms</a>
                        </li>
                        <li>
                            <a href="#description" @click="activeSection = 'description'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'description' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">2. Description of Service</a>
                        </li>
                        <li>
                            <a href="#responsibilities" @click="activeSection = 'responsibilities'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'responsibilities' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">3. User Responsibilities</a>
                        </li>
                        <li>
                            <a href="#pricing" @click="activeSection = 'pricing'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'pricing' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">4. Pricing and Payment</a>
                        </li>
                        <li>
                            <a href="#availability" @click="activeSection = 'availability'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'availability' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">5. Service Availability</a>
                        </li>
                        <li>
                            <a href="#liability" @click="activeSection = 'liability'" :class="[
                                'block pl-4 py-1 border-l-2 transition-colors',
                                activeSection === 'liability' ? 'border-brand-blue text-brand-blue dark:text-brand-green font-bold' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            ]">6. Limitation of Liability</a>
                        </li>
                    </ul>
                </div>
            </aside>

            <!-- Main Content Card -->
            <div
                class="flex-grow bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-14 text-slate-600 dark:text-slate-400 leading-relaxed">
                <div class="space-y-12">

                    <section id="acceptance" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">1. Acceptance of Terms</h2>
                        <p class="mb-4">By accessing or using Feltech SMS ("the Service"), operated by Feltech ("us",
                            "we", or
                            "our"), you agree to be bound by these Terms of Service. If you disagree with any part of
                            the terms then you may not access the Service.</p>
                        <p>These terms apply to all visitors, users, developers and others who access or use the Service
                            via our web interface or API.</p>
                    </section>

                    <section id="description" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">2. Description of Service
                        </h2>
                        <p class="mb-4">Feltech SMS provides an application programming interface (API) and web
                            interface that allows
                            developers to send and receive SMS messages across Zambian telecommunication networks.</p>
                        <p>We may modify, suspend, or discontinue the Service at any time, including the availability of
                            any feature, database, or content. We may also impose limits on certain features and
                            services or restrict your access to parts or all of the Service without notice or liability.
                        </p>
                    </section>

                    <section id="responsibilities" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">3. User Responsibilities</h2>
                        <p class="mb-4">You must provide accurate and complete information when creating an account. You
                            are solely
                            responsible for managing and securing your API keys. You must notify us immediately of any
                            breach of security or unauthorized use of your account.</p>
                        <p class="mb-4">You agree not to use the Service strictly to:</p>
                        <ul class="list-disc list-inside space-y-2 ml-4">
                            <li>Transmit any spam, unsolicited messages, or phishing attempts.</li>
                            <li>Send any material that is defamatory, obscene, or abusive.</li>
                            <li>Violate any local, state, national, or international laws, particularly the regulations
                                set forth by ZICTA in Zambia.</li>
                        </ul>
                    </section>

                    <section id="pricing" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">4. Pricing and Payment</h2>
                        <p class="mb-4">Fees for our services are detailed on our Pricing page. You agree to pay all
                            applicable fees
                            related to your use of the Service. We reserve the right to change our prices at any time
                            upon thirty (30) days notice, which applies exclusively to subsequent usage.</p>
                        <p>All payments are non-refundable unless expressly stated otherwise in these Terms or required
                            by applicable law.</p>
                    </section>

                    <section id="availability" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">5. Service Availability</h2>
                        <p class="mb-4">While we strive for a 99.9% uptime SLA, the Service relies on upstream
                            telecommunication
                            providers. We do not guarantee that the Service will be uninterrupted, timely, secure, or
                            error-free at all times.</p>
                        <p>We shall not be liable for any delivery failures or delays caused by matters beyond our
                            reasonable control.</p>
                    </section>

                    <section id="liability" class="scroll-mt-32">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">6. Limitation of Liability
                        </h2>
                        <p>In no event shall Feltech SMS, nor its directors, employees, partners, agents, suppliers, or
                            affiliates, be liable for any indirect, incidental, special, consequential or punitive
                            damages, including without limitation, loss of profits, data, use, goodwill, or other
                            intangible losses, resulting from your access to or use of or inability to access or use the
                            Service.</p>
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

const activeSection = ref('acceptance')

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSection.value = entry.target.id
            }
        })
    }, { rootMargin: '-20% 0px -70% 0px' })

    const sections = ['acceptance', 'description', 'responsibilities', 'pricing', 'availability', 'liability']
    sections.forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
    })
})
</script>
