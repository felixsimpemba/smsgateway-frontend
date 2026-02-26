<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Billing & Top Up</h1>
                <p class="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage your balance and view transaction
                    history.</p>
            </div>
            <div>
                <button @click="showModal = true"
                    class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                    <PlusIcon class="w-5 h-5" />
                    Top Up Balance
                </button>
            </div>
        </div>

        <!-- Cards Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
                class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-600/20">
                <div class="flex items-center gap-3 text-blue-100 mb-2">
                    <CurrencyDollarIcon class="w-5 h-5" />
                    <span class="text-sm font-bold uppercase tracking-wider">Current Balance</span>
                </div>
                <div class="text-4xl font-extrabold tracking-tight">ZMW {{ Number(overviewStats.balance || 0).toFixed(2)
                    }}</div>
                <div class="mt-4 text-blue-100 text-sm bg-black/10 inline-block px-3 py-1 rounded-lg">
                    Equivalent to ~<span class="font-bold text-white">{{ Number(overviewStats.sms_balance ||
                        0).toLocaleString() }} SMS</span>
                </div>
            </div>
        </div>

        <!-- Transaction History -->
        <div
            class="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">Transaction History</h2>
                <button @click="loadTransactions" class="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <ArrowPathIcon class="w-5 h-5" :class="{ 'animate-spin': loading }" />
                </button>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 top-0">
                        <tr>
                            <th class="px-6 py-4 font-bold">Date</th>
                            <th class="px-6 py-4 font-bold">Description</th>
                            <th class="px-6 py-4 font-bold">Type</th>
                            <th class="px-6 py-4 font-bold text-right">Amount (ZMW)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-slate-800"
                        v-if="!loading && transactions.data?.length">
                        <tr v-for="tx in transactions.data" :key="tx.id"
                            class="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {{ formatDate(tx.created_at) }}
                            </td>
                            <td class="px-6 py-4 text-gray-600 dark:text-slate-300">
                                {{ tx.description }}
                            </td>
                            <td class="px-6 py-4">
                                <span :class="[
                                    'px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider',
                                    tx.type === 'deposit' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                ]">
                                    {{ tx.type }}
                                </span>
                            </td>
                            <td
                                :class="['px-6 py-4 text-right font-bold whitespace-nowrap', tx.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white']">
                                {{ tx.type === 'deposit' ? '+' : '' }}{{ Number(tx.amount).toFixed(2) }}
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="loading">
                        <tr>
                            <td colspan="4" class="px-6 py-12 text-center text-gray-400">Loading transactions...</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="4" class="px-6 py-12 text-center text-gray-400">No transactions found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div v-if="transactions.last_page > 1"
                class="p-6 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <button @click="loadPage(transactions.current_page - 1)" :disabled="transactions.current_page === 1"
                    class="px-4 py-2 text-sm font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border dark:border-slate-700 rounded-lg">
                    Previous
                </button>
                <span class="text-sm text-gray-500">Page {{ transactions.current_page }} of {{ transactions.last_page
                    }}</span>
                <button @click="loadPage(transactions.current_page + 1)"
                    :disabled="transactions.current_page === transactions.last_page"
                    class="px-4 py-2 text-sm font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border dark:border-slate-700 rounded-lg">
                    Next
                </button>
            </div>
        </div>

        <TopUpModal :isOpen="showModal" @close="showModal = false" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { PlusIcon, CurrencyDollarIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import TopUpModal from '../../components/dashboard/TopUpModal.vue'

const store = useStore()
const showModal = ref(false)

const overviewStats = computed(() => store.state.stats?.overview ?? {})
const transactions = ref({ data: [], current_page: 1, last_page: 1 })
const loading = ref(false)

const loadTransactions = async (page = 1) => {
    loading.value = true
    try {
        const data = await store.dispatch('billing/fetchTransactions', page)
        transactions.value = data
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const loadPage = (page) => {
    if (page > 0 && page <= transactions.value.last_page) {
        loadTransactions(page)
    }
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

onMounted(() => {
    loadTransactions(1)
    store.dispatch('stats/fetchStats')
})
</script>
