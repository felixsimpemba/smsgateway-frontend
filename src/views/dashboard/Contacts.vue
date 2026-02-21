<template>
  <div>
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Contacts</h1>
        <p class="text-gray-600 dark:text-slate-400">Manage your contact lists and groups for bulk messaging.</p>
      </div>
      <div class="flex items-center space-x-3">
        <button
          class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center transition-all">
          <ArrowUpTrayIcon class="w-4 h-4 mr-2" />
          Import
        </button>
        <button
          class="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 flex items-center transition-all active:scale-[0.98]">
          <PlusIcon class="w-4 h-4 mr-2" />
          Add Contact
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar / Groups -->
      <div class="lg:col-span-1">
        <div
          class="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div class="p-5 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
            <h3 class="font-extrabold text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest">Groups
            </h3>
          </div>
          <nav class="p-3 space-y-1">
            <button v-for="group in groups" :key="group.name" @click="setActiveGroup(group.name)"
              class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold rounded-xl transition-all"
              :class="group.active ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'">
              <div class="flex items-center">
                <TagIcon class="w-4 h-4 mr-3"
                  :class="group.active ? 'text-blue-500' : 'text-gray-400 dark:text-slate-600'" />
                {{ group.name }}
              </div>
              <span
                class="text-[10px] font-extrabold bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg text-gray-500 dark:text-slate-500">{{
                  group.count }}</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Contact List -->
      <div class="lg:col-span-3">
        <div
          class="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div
            class="p-5 border-b border-gray-100 dark:border-slate-800 flex flex-wrap gap-4 bg-gray-50/30 dark:bg-slate-800/20">
            <div class="flex-1 min-w-[200px] relative">
              <MagnifyingGlassIcon
                class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
              <input type="text" placeholder="Search contacts..."
                class="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                  <th
                    class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                    Contact</th>
                  <th
                    class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                    Phone Number</th>
                  <th
                    class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                    Group</th>
                  <th
                    class="px-6 py-4 text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-slate-800">
                <tr v-for="contact in contacts" :key="contact.id"
                  class="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        class="h-9 w-9 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-xs font-extrabold text-gray-600 dark:text-slate-400 mr-4 border border-gray-200 dark:border-slate-700">
                        {{ contact.initials }}
                      </div>
                      <div class="font-bold text-gray-900 dark:text-white tracking-tight">{{ contact.name }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600 dark:text-slate-300 font-mono font-bold tracking-tight">{{
                    contact.phone }}</td>
                  <td class="px-6 py-4">
                    <span
                      class="px-2.5 py-1 text-[10px] font-extrabold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg uppercase tracking-wider">
                      {{ contact.group }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button
                      class="text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-white p-1 transition-colors">
                      <EllipsisVerticalIcon class="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="px-6 py-5 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 flex items-center justify-between transition-colors">
            <span class="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tight">Showing 5 of 124
              contacts</span>
            <button
              class="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline">View
              All →</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  PlusIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  TagIcon,
  EllipsisVerticalIcon
} from '@heroicons/vue/24/outline'

const store = useStore()

const groups = computed(() => store.getters['contacts/allGroups'])
const contacts = computed(() => store.getters['contacts/allContacts'])

const setActiveGroup = (groupName) => {
  store.commit('contacts/SET_ACTIVE_GROUP', groupName)
}

onMounted(() => {
  store.dispatch('contacts/fetchContacts')
})
</script>
