<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="close"></div>

        <!-- Modal Panel -->
        <div
            class="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all border border-gray-100 dark:border-slate-800">
            <div class="px-6 py-6 sm:p-8">

                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Generate API Key</h3>
                    <button @click="close"
                        class="text-gray-400 hover:text-gray-500 dark:hover:text-slate-300 transition-colors">
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <p class="text-sm text-gray-500 dark:text-slate-400 mb-8">
                    Give your API key a descriptive name to help you identify it later (e.g., "Production Website" or "ERP Integration").
                </p>

                <!-- Name Input -->
                <div class="mb-8">
                    <label class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Key Name</label>
                    <input v-model="name" type="text"
                        class="block w-full rounded-xl px-5 py-4 text-lg font-medium bg-slate-50 dark:bg-slate-950 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="e.g. My Website API" @keyup.enter="submit" />
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-3">
                    <button @click="close"
                        class="flex-1 py-4 px-4 rounded-xl text-sm font-bold text-gray-600 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all active:scale-[0.98]">
                        Cancel
                    </button>
                    <button @click="submit" :disabled="!name.trim()"
                        class="flex-1 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]">
                        Generate Key
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    isOpen: Boolean
})
const emit = defineEmits(['close', 'generate'])

const name = ref('Production Key')

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        name.value = 'Production Key'
    }
})

const submit = () => {
    if (name.value.trim()) {
        emit('generate', name.value.trim())
    }
}

const close = () => {
    emit('close')
}
</script>
