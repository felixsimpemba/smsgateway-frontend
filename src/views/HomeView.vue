<template>
    <div
        class="min-h-screen bg-white dark:bg-slate-950 selection:bg-indigo-100 selection:text-indigo-700 transition-colors duration-300">
        <Navbar />
        <main>
            <Hero />
            <Stats />
            <Features />
            <UseCases />
            <HowItWorks />
            <Pricing />
            <FAQ />
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import Stats from '../components/Stats.vue'
import Features from '../components/Features.vue'
import UseCases from '../components/UseCases.vue'
import HowItWorks from '../components/HowItWorks.vue'
import Pricing from '../components/Pricing.vue'
import Testimonials from '../components/Testimonials.vue'
import FAQ from '../components/FAQ.vue'
import Footer from '../components/Footer.vue'
</script>

<style>
/* Smooth scrolling for anchor links */
html {
    scroll-behavior: smooth;
}
</style>