<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Send New Message</h1>
      <p class="text-gray-600 dark:text-slate-400">Compose and send SMS messages to your contacts or individual numbers.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Form -->
      <div class="lg:col-span-2 space-y-6">
        <div
          class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <form @submit.prevent="sendMessage" class="space-y-6">
            <div>
              <label for="recipients"
                class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Recipients</label>
              <textarea id="recipients" rows="3" v-model="form.recipients" placeholder="+1234567890, +0987654321..."
                class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-slate-500"></textarea>
              <p class="mt-2 text-xs text-gray-500 dark:text-slate-500 font-medium">Enter phone numbers separated by
                commas or new lines.</p>
            </div>

            <div>
              <label for="message"
                class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Message</label>
              <div class="relative">
                <textarea id="message" rows="5" v-model="form.message" maxlength="160"
                  placeholder="Type your message here..."
                  class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-slate-500"></textarea>
                <div class="absolute bottom-3 right-3 text-[10px] font-bold tracking-wider uppercase"
                  :class="messageCount > 140 ? 'text-orange-500' : 'text-gray-400 dark:text-slate-500'">
                  {{ messageCount }}/160 • {{ smsSegments }} SMS
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <button type="submit"
                class="flex-1 bg-blue-600 text-white font-extrabold py-4 px-6 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                :disabled="isSending">
                <PaperAirplaneIcon v-if="!isSending" class="w-5 h-5" />
                <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                <span>{{ isSending ? 'Sending...' : 'Send Message' }}</span>
              </button>

              <button type="button"
                class="px-6 py-4 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                Save Draft
              </button>
            </div>
          </form>
        </div>

        <!-- Scheduling Options -->
        <div
          class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">Schedule Delivery</h3>
              <p class="text-xs text-gray-500 dark:text-slate-500">Pick a future date and time for your message.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="form.isScheduled" class="sr-only peer">
              <div
                class="w-12 h-6 bg-gray-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
              </div>
            </label>
          </div>

          <div v-if="form.isScheduled" class="grid grid-cols-2 gap-4 animate-fade-in">
            <div>
              <label
                class="block text-[10px] font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">Date</label>
              <input type="date" v-model="form.scheduleDate"
                class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            </div>
            <div>
              <label
                class="block text-[10px] font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">Time</label>
              <input type="time" v-model="form.scheduleTime"
                class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            </div>
          </div>
        </div>
      </div>

      <!-- Preview & Help -->
      <div class="space-y-8">
        <div
          class="bg-slate-900 dark:bg-black rounded-[3rem] p-5 border-[10px] border-slate-800 dark:border-slate-900 shadow-2xl aspect-[9/18] max-w-[280px] mx-auto relative overflow-hidden transition-colors">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 dark:bg-slate-900 rounded-b-3xl">
          </div>

          <div class="mt-14 space-y-4 px-2">
            <div class="bg-slate-700/50 dark:bg-slate-800/50 rounded-2xl p-4 max-w-[85%]">
              <p class="text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-tight">Yesterday, 4:20 PM</p>
              <p class="text-[11px] text-white leading-relaxed">Your verification code is: 5829</p>
            </div>

            <div v-if="form.message"
              class="bg-blue-600 rounded-2xl p-4 max-w-[85%] ml-auto shadow-lg shadow-blue-600/20">
              <p class="text-[11px] text-white leading-relaxed">{{ form.message }}</p>
            </div>
          </div>

          <div
            class="absolute bottom-8 left-5 right-5 h-12 bg-slate-800/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full flex items-center px-5 border border-white/5">
            <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">iMessage</span>
          </div>
        </div>

        <div
          class="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-800/30 transition-colors">
          <h4 class="font-extrabold text-blue-900 dark:text-blue-400 mb-4 uppercase text-xs tracking-widest">Pro Tips
          </h4>
          <ul class="text-sm text-blue-800 dark:text-blue-300/80 space-y-4 font-medium">
            <li class="flex items-start">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-3"></div>
              Use {name} for personalization
            </li>
            <li class="flex items-start">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-3"></div>
              International format (+1...) is recommended
            </li>
            <li class="flex items-start">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-3"></div>
              160 characters = 1 SMS segment
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'

const store = useStore()

const form = ref({
  recipients: '',
  message: '',
  isScheduled: false,
  scheduleDate: '',
  scheduleTime: ''
})

const isSending = computed(() => store.getters['sms/isSending'])

const messageCount = computed(() => form.value.message.length)
const smsSegments = computed(() => Math.ceil(messageCount.value / 160) || 1)

const sendMessage = async () => {
  if (!form.value.recipients || !form.value.message) {
    alert('Please fill in all required fields.')
    return
  }

  await store.dispatch('sms/sendSMS', {
    ...form.value
  })

  if (store.getters['sms/lastSentStatus'] === 'success') {
    alert('Message sent successfully!')
    form.value.message = ''
    form.value.recipients = ''
  } else {
    alert('Failed to send message.')
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
