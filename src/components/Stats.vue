<template>
    <section class="py-20 bg-indigo-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div v-for="stat in stats" :key="stat.label">
                    <div class="text-4xl md:text-5xl font-extrabold mb-2">{{ stat.value }}</div>
                    <div class="text-indigo-200 text-sm md:text-base font-medium">{{ stat.label }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const stats = [
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '200+', label: 'Countries Covered' },
    { value: '5ms', label: 'API Latency' },
    { value: '10M+', label: 'Messages Daily' }
]
</script>
