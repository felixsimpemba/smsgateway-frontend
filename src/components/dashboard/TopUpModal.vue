<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="close"></div>

        <!-- Modal Panel -->
        <div
            class="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all border border-gray-100 dark:border-slate-800">
            <div class="px-6 py-6 sm:p-8">

                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Top Up Balance</h3>
                    <button @click="close"
                        class="text-gray-400 hover:text-gray-500 dark:hover:text-slate-300 transition-colors">
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <p class="text-sm text-gray-500 dark:text-slate-400 mb-8">
                    Enter the amount you want to top up. Pay securely via our gateway. The equivalent SMS credits will
                    be instantly added to your account based on your tier rate.
                </p>

                <!-- Amount Input -->
                <div class="mb-6">
                    <label class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Amount to pay
                        (ZMW)</label>
                    <div class="relative">
                        <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 font-bold">
                            ZMW
                        </div>
                        <input v-model="amount" type="number" min="10" @input="debouncedCalculate"
                            class="block w-full rounded-xl pl-16 py-4 text-xl font-bold bg-slate-50 dark:bg-slate-950 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            placeholder="0.00" />
                    </div>
                </div>

                <!-- Estimate Info -->
                <div
                    class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-900/50 mb-8 flex justify-between items-center">
                    <div>
                        <p class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">You
                            will receive approx</p>
                        <p class="text-2xl font-extrabold text-blue-900 dark:text-blue-100">
                            <span v-if="calculating" class="animate-pulse">...</span>
                            <span v-else>{{ smsEstimate.toLocaleString() }} SMS</span>
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                            Effective Rate</p>
                        <p class="text-lg font-bold text-blue-900 dark:text-blue-100">{{ effectiveRate }}</p>
                    </div>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold">
                    {{ error }}
                </div>

                <!-- Actions -->
                <button @click="submit" :disabled="initializing || amount < 10"
                    class="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-600/20 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]">
                    <ArrowPathIcon v-if="initializing" class="w-5 h-5 animate-spin" />
                    <CreditCardIcon v-else class="w-5 h-5" />
                    {{ initializing ? 'Connecting window...' : 'Proceed to Payment' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { XMarkIcon, ArrowPathIcon, CreditCardIcon } from '@heroicons/vue/24/outline'
import api from '../../services/api'

const props = defineProps({
    isOpen: Boolean
})
const emit = defineEmits(['close'])

const store = useStore()

const amount = ref(350)
const smsEstimate = ref(1000)
const effectiveRate = ref('0.350')
const calculating = ref(false)
const initializing = ref(false)
const error = ref('')
let calcTimeout = null

// Call backend calculate API when input changes
const calculate = async () => {
    if (!amount.value || amount.value <= 0) {
        smsEstimate.value = 0
        effectiveRate.value = '0.000'
        return
    }
    calculating.value = true
    try {
        const res = await api.get(`/pricing/calculate?zmw=${amount.value}`)
        smsEstimate.value = res.data.sms_count
        effectiveRate.value = res.data.effective_rate
    } catch (err) {
        console.error(err)
    } finally {
        calculating.value = false
    }
}

const debouncedCalculate = () => {
    clearTimeout(calcTimeout)
    calcTimeout = setTimeout(calculate, 400)
}

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        amount.value = 350
        error.value = ''
        calculate()
    }
})

const submit = async () => {
    if (amount.value < 10) return
    error.value = ''
    initializing.value = true
    try {
        await store.dispatch('billing/initializePayment', amount.value)
        // The Vuex action handles redirecting to the payment gateway
    } catch (err) {
        error.value = store.state.billing.error || 'Failed to start payment.'
    } finally {
        initializing.value = false
    }
}

const close = () => {
    if (!initializing.value) emit('close')
}
</script>
