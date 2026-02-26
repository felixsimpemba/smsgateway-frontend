<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Send Message</h1>
        <p class="text-gray-500 dark:text-slate-400 text-sm mt-1">
          Send single messages, bulk campaigns, or set up automation.
        </p>
      </div>
    </div>

    <!-- Mode Tabs -->
    <div class="flex gap-1 mb-8 bg-gray-100 dark:bg-slate-800 p-1 rounded-2xl w-fit">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="['flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200',
        activeTab === tab.id
          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
          : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300']">
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ── SINGLE SMS TAB ── -->
    <div v-if="activeTab === 'single'" class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <!-- Form -->
      <div class="lg:col-span-3 space-y-6">
        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <!-- Success / Error Banner -->
          <transition name="fade">
            <div v-if="toast.show"
              :class="['flex items-center gap-3 p-4 rounded-xl mb-6 text-sm font-semibold',
                toast.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/40' :
                  'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/40']">
              <CheckCircleIcon v-if="toast.type === 'success'" class="w-5 h-5 flex-shrink-0" />
              <ExclamationCircleIcon v-else class="w-5 h-5 flex-shrink-0" />
              {{ toast.message }}
            </div>
          </transition>

          <form @submit.prevent="handleSingleSend" class="space-y-6">
            <!-- Sender ID -->
            <div>
              <label
                class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">
                Sender ID <span class="text-gray-300 dark:text-slate-600 normal-case font-medium">(optional)</span>
              </label>
              <select v-model="single.senderId"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-sm">
                <option value="">Use default</option>
                <option v-for="sid in approvedSenderIds" :key="sid.id" :value="sid.name">{{ sid.name }}</option>
              </select>
            </div>

            <!-- Recipient -->
            <div>
              <label
                class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">Recipient</label>
              <div class="flex gap-2">
                <div class="relative flex-1">
                  <input v-model="single.recipient" type="tel" placeholder="+26097XXXXXXX"
                    class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-semibold placeholder-gray-400 dark:placeholder-slate-600" />
                </div>
                <button type="button" @click="openContactPicker"
                  class="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                  <UserGroupIcon class="w-4 h-4" />
                  Contacts
                </button>
              </div>
              <p class="mt-1.5 text-[11px] text-gray-400 dark:text-slate-600 font-medium">Zambian format: +260 97X XXX
                XXX or 097X XXX XXX</p>
            </div>

            <!-- Message -->
            <div>
              <label
                class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">Message</label>
              <div class="relative">
                <textarea v-model="single.message" rows="5" maxlength="480"
                  placeholder="Type your message... Use {name} for personalization."
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm placeholder-gray-400 dark:placeholder-slate-600"></textarea>
                <div
                  class="absolute bottom-3 right-3 text-[10px] font-bold tracking-wider uppercase pointer-events-none"
                  :class="single.message.length > 140 ? 'text-orange-500' : 'text-gray-300 dark:text-slate-600'">
                  {{ single.message.length }}/160 &bull; {{ Math.ceil(single.message.length / 160) || 1 }} seg
                </div>
              </div>
            </div>

            <!-- Schedule Toggle -->
            <SchedulePanel v-model:isScheduled="single.isScheduled" v-model:date="single.scheduleDate"
              v-model:time="single.scheduleTime" />

            <!-- Actions -->
            <div class="flex gap-3">
              <button type="submit" :disabled="isSending"
                class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                <Spinner v-if="isSending" />
                <PaperAirplaneIcon v-else class="w-4 h-4" />
                {{ isSending ? 'Sending…' : 'Send Now' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Tips Sidebar -->
      <div class="lg:col-span-2 space-y-5">
        <div class="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-6">
          <h4 class="text-xs font-extrabold text-blue-900 dark:text-blue-400 uppercase tracking-widest mb-4">💡 Tips
          </h4>
          <ul class="space-y-3 text-sm text-blue-800 dark:text-blue-300/80 font-medium">
            <li class="flex gap-2"><span class="text-blue-400">•</span> Zambian numbers start with <span
                class="font-extrabold">+260</span> e.g. <span class="font-mono font-bold">+260971234567</span></li>
            <li class="flex gap-2"><span class="text-blue-400">•</span> Use <code
                class="bg-blue-100 dark:bg-blue-900/40 px-1 rounded font-bold">{name}</code> for first-name
              personalization</li>
            <li class="flex gap-2"><span class="text-blue-400">•</span> 160 chars = 1 segment. Longer messages count as
              2+</li>
            <li class="flex gap-2"><span class="text-blue-400">•</span> Schedule messages to send at the right time</li>
          </ul>
        </div>
        <div class="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6">
          <h4 class="text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">Message
            Preview</h4>
          <div
            class="bg-gray-100 dark:bg-slate-800 rounded-xl p-4 min-h-[80px] text-sm text-gray-800 dark:text-slate-200 leading-relaxed font-medium whitespace-pre-wrap break-words">
            {{ single.message || 'Your message will appear here…' }}
          </div>
          <p class="text-[11px] text-gray-400 dark:text-slate-600 mt-2 font-semibold">
            {{ single.message.length }} characters &bull; {{ Math.ceil(single.message.length / 160) || 1 }} SMS
            segment{{ Math.ceil(single.message.length / 160) > 1 ? 's' : '' }}
          </p>
        </div>
      </div>
    </div>

    <!-- ── BULK / CAMPAIGN TAB ── -->
    <div v-if="activeTab === 'bulk'" class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-6">
        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <!-- Banner -->
          <transition name="fade">
            <div v-if="toast.show"
              :class="['flex items-center gap-3 p-4 rounded-xl mb-6 text-sm font-semibold',
                toast.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/40' :
                  'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/40']">
              <CheckCircleIcon v-if="toast.type === 'success'" class="w-5 h-5 flex-shrink-0" />
              <ExclamationCircleIcon v-else class="w-5 h-5 flex-shrink-0" />
              {{ toast.message }}
            </div>
          </transition>

          <form @submit.prevent="handleBulkSend" class="space-y-6">
            <!-- Campaign Name -->
            <div>
              <label
                class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">Campaign
                Name</label>
              <input v-model="bulk.campaignName" type="text" placeholder="e.g. March Promotions"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold placeholder-gray-400 dark:placeholder-slate-600" />
            </div>

            <!-- Sender ID -->
            <div>
              <label
                class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">Sender
                ID</label>
              <select v-model="bulk.senderId"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-sm">
                <option value="">Use default</option>
                <option v-for="sid in approvedSenderIds" :key="sid.id" :value="sid.name">{{ sid.name }}</option>
              </select>
            </div>

            <!-- Recipients Input Method -->
            <div>
              <label
                class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-3">Recipients</label>
              <div class="flex gap-2 mb-3">
                <button type="button" @click="bulkInputMode = 'manual'"
                  :class="['flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all', bulkInputMode === 'manual' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400' : 'border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800']">
                  Manual Input
                </button>
                <button type="button" @click="bulkInputMode = 'contacts'"
                  :class="['flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all', bulkInputMode === 'contacts' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400' : 'border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800']">
                  From Contacts
                </button>
              </div>

              <!-- Manual numbers -->
              <div v-if="bulkInputMode === 'manual'">
                <textarea v-model="bulk.numbersRaw" rows="4"
                  placeholder="+26097XXXXXXX&#10;+26096XXXXXXX&#10;+26077XXXXXXX"
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm font-mono placeholder-gray-400 dark:placeholder-slate-600"></textarea>
                <p class="mt-1.5 text-[11px] text-gray-400 dark:text-slate-600 font-medium">
                  {{ parsedBulkNumbers.length }} number{{ parsedBulkNumbers.length !== 1 ? 's' : '' }} detected &bull;
                  One per line or comma-separated
                </p>
              </div>

              <!-- From Contacts -->
              <div v-else>
                <div v-if="contactsLoading" class="flex items-center justify-center py-8 gap-3 text-gray-400">
                  <Spinner class="text-blue-500" /> Loading contacts…
                </div>
                <div v-else-if="allContacts.length === 0"
                  class="text-center py-8 text-gray-400 dark:text-slate-500 text-sm font-semibold">
                  No contacts found. <router-link to="/dashboard/contacts"
                    class="text-blue-600 dark:text-blue-400 hover:underline">Add contacts →</router-link>
                </div>
                <div v-else class="space-y-2 max-h-56 overflow-y-auto pr-1">
                  <label v-for="c in allContacts" :key="c.id"
                    class="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-700">
                    <input type="checkbox" :value="c.phone" v-model="bulk.selectedContacts"
                      class="w-4 h-4 rounded text-blue-600 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-blue-500" />
                    <div
                      class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center text-xs font-extrabold uppercase flex-shrink-0">
                      {{ (c.name || c.phone || '?')[0] }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ c.name || 'Unknown' }}</p>
                      <p class="text-xs text-gray-400 dark:text-slate-500 font-mono">{{ c.phone }}</p>
                    </div>
                  </label>
                </div>
                <div class="flex items-center justify-between mt-2">
                  <p class="text-[11px] text-gray-400 dark:text-slate-600 font-medium">{{ bulk.selectedContacts.length
                    }} selected</p>
                  <button type="button" @click="toggleSelectAll"
                    class="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
                    {{ bulk.selectedContacts.length === allContacts.length ? 'Deselect all' : 'Select all' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Message -->
            <div>
              <label
                class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">Message</label>
              <div class="relative">
                <textarea v-model="bulk.message" rows="5"
                  placeholder="Type your campaign message… Use {name} for personalization."
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm placeholder-gray-400 dark:placeholder-slate-600"></textarea>
                <div
                  class="absolute bottom-3 right-3 text-[10px] font-bold tracking-wider uppercase pointer-events-none"
                  :class="bulk.message.length > 140 ? 'text-orange-500' : 'text-gray-300 dark:text-slate-600'">
                  {{ bulk.message.length }}/160 &bull; {{ Math.ceil(bulk.message.length / 160) || 1 }} seg
                </div>
              </div>
            </div>

            <!-- Schedule -->
            <SchedulePanel v-model:isScheduled="bulk.isScheduled" v-model:date="bulk.scheduleDate"
              v-model:time="bulk.scheduleTime" />

            <!-- Summary banner -->
            <div v-if="totalBulkRecipients > 0"
              class="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-xl px-4 py-3 text-sm font-bold text-blue-800 dark:text-blue-300">
              <InformationCircleIcon class="w-4 h-4 flex-shrink-0 text-blue-500" />
              Sending to <span class="font-extrabold">{{ totalBulkRecipients }}</span> recipient{{ totalBulkRecipients
                !== 1 ? 's' : '' }}
              &bull; Est. <span class="font-extrabold">{{ Math.ceil(bulk.message.length / 160) || 1 }}</span> segment{{
                Math.ceil(bulk.message.length / 160) > 1 ? 's' : '' }} each
            </div>

            <button type="submit" :disabled="isSending || totalBulkRecipients === 0"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98]">
              <Spinner v-if="isSending" />
              <RocketLaunchIcon v-else class="w-4 h-4" />
              {{ isSending ? 'Launching Campaign…' : 'Launch Campaign' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Campaign tips sidebar -->
      <div class="lg:col-span-2 space-y-5">
        <div
          class="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30 rounded-2xl p-6">
          <h4 class="text-xs font-extrabold text-purple-900 dark:text-purple-400 uppercase tracking-widest mb-4">🚀
            Campaign Tips</h4>
          <ul class="space-y-3 text-sm text-purple-800 dark:text-purple-300/80 font-medium">
            <li class="flex gap-2"><span class="text-purple-400">•</span> Always include an opt-out option in marketing
              messages</li>
            <li class="flex gap-2"><span class="text-purple-400">•</span> Use <code
                class="bg-purple-100 dark:bg-purple-900/40 px-1 rounded font-bold">{name}</code> to personalise at scale
            </li>
            <li class="flex gap-2"><span class="text-purple-400">•</span> Best send times: weekdays 9am–12pm or 4pm–6pm
              CAT</li>
            <li class="flex gap-2"><span class="text-purple-400">•</span> Keep messages under 160 chars to reduce cost
              per segment</li>
          </ul>
        </div>
        <div class="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6">
          <h4 class="text-xs font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3">Message
            Preview</h4>
          <div
            class="bg-gray-100 dark:bg-slate-800 rounded-xl p-4 min-h-[80px] text-sm text-gray-800 dark:text-slate-200 leading-relaxed font-medium whitespace-pre-wrap break-words">
            {{ bulk.message || 'Your campaign message will appear here…' }}
          </div>
        </div>
      </div>
    </div>

    <!-- ── AUTOMATION TAB ── -->
    <div v-if="activeTab === 'automation'">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="rule in automationRules" :key="rule.id"
          class="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div class="flex items-start justify-between mb-4">
            <div :class="['p-2.5 rounded-xl', rule.iconBg]">
              <component :is="rule.icon" :class="['w-5 h-5', rule.iconColor]" />
            </div>
            <!-- Toggle -->
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="rule.enabled" class="sr-only peer" @change="saveRule(rule)">
              <div
                class="w-10 h-5 bg-gray-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600">
              </div>
            </label>
          </div>
          <h3 class="font-bold text-gray-900 dark:text-white text-sm mb-1">{{ rule.name }}</h3>
          <p class="text-xs text-gray-500 dark:text-slate-500 mb-4">{{ rule.description }}</p>
          <div class="text-[11px] font-bold uppercase tracking-widest"
            :class="rule.enabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-slate-600'">
            {{ rule.enabled ? '● Active' : '○ Inactive' }}
          </div>
        </div>
      </div>

      <!-- Create Automation -->
      <div class="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-6">Create Automation Rule</h3>
        <form @submit.prevent="createAutomation" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">Rule
              Name</label>
            <input v-model="automation.name" type="text" placeholder="e.g. Welcome message"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold placeholder-gray-400" />
          </div>
          <div>
            <label
              class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">Trigger</label>
            <select v-model="automation.trigger"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold">
              <option value="">Select trigger…</option>
              <option value="contact_added">New contact added</option>
              <option value="keyword">Keyword reply received</option>
              <option value="scheduled">Scheduled (recurring)</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label
              class="block text-xs font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">Message
              Template</label>
            <textarea v-model="automation.message" rows="3"
              placeholder="Hi {name}, welcome to FelTech SMS! Reply STOP to opt-out."
              class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm placeholder-gray-400"></textarea>
          </div>
          <div class="md:col-span-2 flex justify-end">
            <button type="submit"
              class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
              <BoltIcon class="w-4 h-4" />
              Save Automation
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Contact Picker Modal -->
    <div v-if="showContactPicker"
      class="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="showContactPicker = false">
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10">
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-slate-800">
          <h3 class="font-extrabold text-gray-900 dark:text-white">Select Contact</h3>
          <button @click="showContactPicker = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4 border-b border-gray-100 dark:border-slate-800">
          <input v-model="contactSearch" type="text" placeholder="Search by name or number…"
            class="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold placeholder-gray-400" />
        </div>
        <div v-if="contactsLoading" class="flex items-center justify-center py-10 gap-2 text-gray-400">
          <Spinner class="text-blue-500" /> Loading…
        </div>
        <div class="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-800">
          <button v-for="c in filteredContacts" :key="c.id" type="button" @click="pickContact(c)"
            class="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left">
            <div
              class="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center text-sm font-extrabold uppercase flex-shrink-0">
              {{ (c.name || c.phone || '?')[0] }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-bold text-sm text-gray-900 dark:text-white truncate">{{ c.name || 'Unknown' }}</p>
              <p class="text-xs text-gray-400 dark:text-slate-500 font-mono">{{ c.phone }}</p>
            </div>
          </button>
          <div v-if="filteredContacts.length === 0 && !contactsLoading"
            class="py-10 text-center text-sm text-gray-400 dark:text-slate-500">No contacts found.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineComponent, h } from 'vue'
import { useStore } from 'vuex'
import {
  PaperAirplaneIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  BoltIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline'

// ── Inline sub-components ────────────────────────────────────────────────────

// Spinner
const Spinner = defineComponent({
  setup() {
    return () => h('svg', {
      class: 'animate-spin h-4 w-4',
      xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24'
    }, [
      h('circle', { class: 'opacity-25', cx: '12', cy: '12', r: '10', stroke: 'currentColor', 'stroke-width': '4' }),
      h('path', { class: 'opacity-75', fill: 'currentColor', d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' }),
    ])
  }
})

// SchedulePanel
const SchedulePanel = defineComponent({
  props: { isScheduled: Boolean, date: String, time: String },
  emits: ['update:isScheduled', 'update:date', 'update:time'],
  setup(props, { emit }) {
    return () => h('div', { class: 'bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 border border-gray-200 dark:border-slate-700' }, [
      h('div', { class: 'flex items-center justify-between' }, [
        h('div', {}, [
          h('p', { class: 'text-sm font-bold text-gray-700 dark:text-slate-300' }, 'Schedule Delivery'),
          h('p', { class: 'text-xs text-gray-400 dark:text-slate-500' }, 'Send at a future date & time'),
        ]),
        h('label', { class: 'relative inline-flex items-center cursor-pointer' }, [
          h('input', { type: 'checkbox', class: 'sr-only peer', checked: props.isScheduled, onChange: e => emit('update:isScheduled', e.target.checked) }),
          h('div', { class: 'w-11 h-6 bg-gray-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600' })
        ])
      ]),
      props.isScheduled ? h('div', { class: 'grid grid-cols-2 gap-4 mt-4' }, [
        h('div', {}, [
          h('label', { class: 'block text-[10px] font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-1.5' }, 'Date'),
          h('input', { type: 'date', value: props.date, class: 'w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm', onInput: e => emit('update:date', e.target.value) }),
        ]),
        h('div', {}, [
          h('label', { class: 'block text-[10px] font-extrabold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-1.5' }, 'Time (CAT)'),
          h('input', { type: 'time', value: props.time, class: 'w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm', onInput: e => emit('update:time', e.target.value) }),
        ]),
      ]) : null
    ])
  }
})

// ── Setup ────────────────────────────────────────────────────────────────────
const store = useStore()

const activeTab = ref('single')
const tabs = [
  { id: 'single', label: 'Single SMS', icon: ChatBubbleLeftRightIcon },
  { id: 'bulk', label: 'Campaign', icon: RocketLaunchIcon },
  { id: 'automation', label: 'Automation', icon: BoltIcon },
]

// Store bindings
const isSending = computed(() => store.getters['sms/isSending'])
const allContacts = computed(() => store.getters['contacts/allContacts'] || [])
const contactsLoading = computed(() => store.state.contacts?.loading ?? false)
const approvedSenderIds = computed(() =>
  (store.getters['senderids/allSenderIds'] || []).filter(s => s.status === 'Approved')
)

// ── Toast ────────────────────────────────────────────────────────────────────
const toast = ref({ show: false, type: 'success', message: '' })
let toastTimer = null
const showToast = (type, message) => {
  clearTimeout(toastTimer)
  toast.value = { show: true, type, message }
  toastTimer = setTimeout(() => { toast.value.show = false }, 4000)
}

// ── Single SMS ───────────────────────────────────────────────────────────────
const single = ref({ recipient: '', message: '', senderId: '', isScheduled: false, scheduleDate: '', scheduleTime: '' })

const handleSingleSend = async () => {
  if (!single.value.recipient || !single.value.message) {
    showToast('error', 'Please fill in recipient and message.')
    return
  }
  try {
    await store.dispatch('sms/sendSMS', {
      recipients: single.value.recipient,
      message: single.value.message,
      senderId: single.value.senderId,
      isScheduled: single.value.isScheduled,
      scheduleDate: single.value.scheduleDate,
      scheduleTime: single.value.scheduleTime,
    })
    showToast('success', single.value.isScheduled ? 'Message scheduled successfully!' : 'Message sent successfully!')
    single.value.recipient = ''
    single.value.message = ''
    single.value.isScheduled = false
  } catch (e) {
    showToast('error', store.getters['sms/lastError'] || 'Failed to send message.')
  }
}

// ── Bulk / Campaign ──────────────────────────────────────────────────────────
const bulk = ref({
  campaignName: '', senderId: '', numbersRaw: '', selectedContacts: [],
  message: '', isScheduled: false, scheduleDate: '', scheduleTime: ''
})
const bulkInputMode = ref('manual')

const parsedBulkNumbers = computed(() => {
  if (!bulk.value.numbersRaw.trim()) return []
  return bulk.value.numbersRaw
    .split(/[\n,]+/)
    .map(n => n.trim())
    .filter(n => n.length > 3)
})

const totalBulkRecipients = computed(() => {
  if (bulkInputMode.value === 'manual') return parsedBulkNumbers.value.length
  return bulk.value.selectedContacts.length
})

const toggleSelectAll = () => {
  if (bulk.value.selectedContacts.length === allContacts.value.length) {
    bulk.value.selectedContacts = []
  } else {
    bulk.value.selectedContacts = allContacts.value.map(c => c.phone)
  }
}

const handleBulkSend = async () => {
  if (!bulk.value.message) { showToast('error', 'Please write a message.'); return }
  const recipients = bulkInputMode.value === 'manual' ? parsedBulkNumbers.value : bulk.value.selectedContacts
  if (!recipients.length) { showToast('error', 'Please add at least one recipient.'); return }
  try {
    await store.dispatch('sms/sendBulk', {
      recipients,
      message: bulk.value.message,
      senderId: bulk.value.senderId,
      campaignName: bulk.value.campaignName,
      isScheduled: bulk.value.isScheduled,
      scheduleDate: bulk.value.scheduleDate,
      scheduleTime: bulk.value.scheduleTime,
    })
    showToast('success', `Campaign "${bulk.value.campaignName || 'Untitled'}" launched to ${recipients.length} recipients!`)
    bulk.value = { campaignName: '', senderId: '', numbersRaw: '', selectedContacts: [], message: '', isScheduled: false, scheduleDate: '', scheduleTime: '' }
  } catch (e) {
    showToast('error', store.getters['sms/lastError'] || 'Failed to launch campaign.')
  }
}

// ── Automation ───────────────────────────────────────────────────────────────
const automationRules = ref([
  {
    id: 1, name: 'Welcome Message', description: 'Auto-send a greeting when a new contact is added.',
    trigger: 'contact_added', enabled: false,
    icon: ChatBubbleLeftRightIcon, iconBg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 2, name: 'Keyword Auto-Reply', description: 'Reply automatically when a keyword is received.',
    trigger: 'keyword', enabled: false,
    icon: ArrowPathIcon, iconBg: 'bg-green-50 dark:bg-green-900/20', iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    id: 3, name: 'Daily Digest', description: 'Send a scheduled report to admins every morning.',
    trigger: 'scheduled', enabled: false,
    icon: ClockIcon, iconBg: 'bg-purple-50 dark:bg-purple-900/20', iconColor: 'text-purple-600 dark:text-purple-400'
  },
])

const automation = ref({ name: '', trigger: '', message: '' })
const saveRule = (rule) => {
  // Persist rule toggle state (extend with API call when backend supports it)
  console.log('Rule toggled:', rule.name, rule.enabled)
}
const createAutomation = () => {
  if (!automation.value.name || !automation.value.trigger || !automation.value.message) {
    showToast('error', 'Please fill in all automation fields.')
    return
  }
  const icons = { contact_added: ChatBubbleLeftRightIcon, keyword: ArrowPathIcon, scheduled: ClockIcon }
  const bgs = { contact_added: 'bg-blue-50 dark:bg-blue-900/20', keyword: 'bg-green-50 dark:bg-green-900/20', scheduled: 'bg-purple-50 dark:bg-purple-900/20' }
  const colors = { contact_added: 'text-blue-600 dark:text-blue-400', keyword: 'text-green-600 dark:text-green-400', scheduled: 'text-purple-600 dark:text-purple-400' }
  const descriptions = { contact_added: 'Auto-send when a new contact is added.', keyword: 'Reply when a keyword is received.', scheduled: 'Runs on a schedule.' }
  automationRules.value.push({
    id: Date.now(),
    name: automation.value.name,
    description: descriptions[automation.value.trigger],
    trigger: automation.value.trigger,
    enabled: true,
    icon: icons[automation.value.trigger],
    iconBg: bgs[automation.value.trigger],
    iconColor: colors[automation.value.trigger],
  })
  showToast('success', `Automation "${automation.value.name}" created!`)
  automation.value = { name: '', trigger: '', message: '' }
}

// ── Contact Picker ───────────────────────────────────────────────────────────
const showContactPicker = ref(false)
const contactSearch = ref('')
const filteredContacts = computed(() => {
  const q = contactSearch.value.toLowerCase()
  return allContacts.value.filter(c =>
    !q || (c.name || '').toLowerCase().includes(q) || (c.phone || '').includes(q)
  )
})
const openContactPicker = () => {
  contactSearch.value = ''
  showContactPicker.value = true
}
const pickContact = (c) => {
  single.value.recipient = c.phone
  showContactPicker.value = false
}

// ── Mount ────────────────────────────────────────────────────────────────────
onMounted(() => {
  store.dispatch('contacts/fetchContacts')
  store.dispatch('senderids/fetchSenderIds')
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
