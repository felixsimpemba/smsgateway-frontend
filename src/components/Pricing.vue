<template>
    <section id="pricing" class="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20">
                <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Simple, transparent
                    pricing</h2>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
                    No hidden fees or complex contracts. Pay only for what you send.
                </p>
                <div class="mt-6 inline-flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
                </div>
            </div>

            <!-- Loading skeleton -->
            <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div v-for="n in 6" :key="n"
                    class="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 animate-pulse">
                    <div class="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                    <div class="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
                    <div class="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-8"></div>
                    <div class="space-y-3">
                        <div v-for="i in 4" :key="i" class="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="text-center py-12 text-red-500 dark:text-red-400">
                <p>{{ error }}</p>
                <button @click="load"
                    class="mt-4 px-6 py-2 bg-brand-blue text-white rounded-xl hover:bg-brand-blue/90 transition-all">
                    Retry
                </button>
            </div>

            <!-- Plans grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div v-for="plan in plans" :key="plan.slug" :class="[
                    'p-8 rounded-3xl border transition-all hover:-translate-y-2',
                    plan.is_featured ? 'border-brand-blue dark:border-brand-blue bg-white dark:bg-slate-900 ring-4 ring-brand-blue/10 dark:ring-brand-blue/20 shadow-2xl relative' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'
                ]">
                    <div v-if="plan.is_featured"
                        class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-blue text-white text-xs font-bold rounded-full uppercase tracking-widest">
                        Most Popular
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ plan.name }}</h3>
                    <div class="flex items-baseline gap-1 mb-6">
                        <span class="text-4xl font-extrabold text-slate-900 dark:text-white">
                            {{ plan.price == 0 && plan.slug !== 'free' ? 'Custom' : `${plan.currency}
                            ${Number(plan.price).toLocaleString()}` }}
                        </span>
                        <span class="text-slate-500 dark:text-slate-400 font-medium"></span>
                    </div>
                    <p class="text-slate-600 dark:text-slate-400 mb-8">{{ plan.description }}</p>
                    <ul class="space-y-4 mb-8">
                        <li v-for="feature in plan.features" :key="feature"
                            class="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <CheckCircleIcon class="h-5 w-5 text-brand-blue flex-shrink-0" />
                            {{ feature }}
                        </li>
                    </ul>
                    <a href="#" :class="[
                        'block w-full text-center py-4 rounded-2xl font-bold transition-all',
                        plan.is_featured ? 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-xl shadow-brand-blue/20 dark:shadow-brand-blue/20' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    ]">
                        {{ plan.button_text }}
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { CheckCircleIcon } from '@heroicons/vue/20/solid';

const store = useStore();

const plans = computed(() => store.getters['pricing/plans']);
const loading = computed(() => store.getters['pricing/loading']);
const error = computed(() => store.getters['pricing/error']);

function load() {
    store.dispatch('pricing/fetchPlans');
}

onMounted(() => {
    load();
});
</script>
