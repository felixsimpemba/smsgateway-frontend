<template>
    <div
        class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300 pb-20">
        <Navbar />

        <!-- Header -->
        <div
            class="bg-brand-blue dark:bg-slate-900 pt-32 pb-16 text-white border-b border-brand-blue/20 dark:border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">API Reference</h1>
                <p class="text-brand-blue/30 dark:text-slate-400 max-w-2xl text-lg">
                    Integrate Feltech SMS into your application in minutes with our robust, RESTful API.
                </p>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow flex flex-col md:flex-row gap-12 items-start">

            <!-- Sidebar Navigation -->
            <aside
                class="w-full md:w-64 flex-shrink-0 md:sticky md:top-24 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                <nav class="space-y-1">
                    <div v-for="section in sections" :key="section.id">
                        <h3
                            class="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-3 mt-6 first:mt-0">
                            {{ section.title }}</h3>
                        <ul class="space-y-1.5 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
                            <li v-for="item in section.items" :key="item.id">
                                <a :href="'#' + item.id" @click="activeSection = item.id" :class="[
                                    'block pl-4 py-1 text-sm transition-all duration-200 -ml-[2px]',
                                    activeSection === item.id
                                        ? 'text-brand-blue dark:text-brand-blue font-bold border-l-2 border-brand-blue'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-l-2 hover:border-slate-300 dark:hover:border-slate-600'
                                ]">
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>

            <!-- Documentation Content -->
            <main class="flex-1 min-w-0 grid gap-16">

                <!-- Authentication -->
                <section id="authentication" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Authentication</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            Authenticate your API requests by including your secret API key in the <code
                                class="bg-slate-100 dark:bg-slate-800 text-brand-blue dark:text-brand-blue px-2 py-1 rounded text-sm font-mono">Authorization</code>
                            header as a Bearer token.
                        </p>
                    </div>
                    <div
                        class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div
                            class="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                            <span
                                class="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Header
                                Example</span>
                        </div>
                        <div class="p-6">
                            <pre
                                class="bg-slate-900 dark:bg-slate-950 text-brand-green/80 p-4 rounded-xl font-mono text-sm overflow-x-auto"><code>Authorization: Bearer YOUR_API_KEY</code></pre>
                            <div
                                class="mt-4 flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 rounded-r-xl">
                                <ShieldExclamationIcon class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <p class="text-sm text-amber-800 dark:text-amber-200">Keep your API keys completely
                                    hidden. Do not hardcode them into public repositories or client-side applications.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Send SMS -->
                <section id="send-sms" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="bg-brand-green text-white px-3 py-1 rounded-lg text-sm font-bold tracking-wider uppercase">POST</span>
                            <code class="text-slate-900 dark:text-white font-mono text-lg">/v1/sms/send</code>
                        </div>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Send an SMS</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            Sends an SMS message to a single recipient.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-8 items-start">
                        <!-- Request Parameters -->
                        <div>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Body Parameters</h3>
                            <div
                                class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr
                                            class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Parameter</th>
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Description</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    to</div>
                                                <div class="text-xs text-brand-blue font-medium mt-1">string, required
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                The recipient's phone number in E.164 format (e.g., <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-300">+260977000000</code>).
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    message</div>
                                                <div class="text-xs text-brand-blue font-medium mt-1">string, required
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                The content of the SMS message. Maximum of 160 characters for a standard
                                                SMS.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    sender_id</div>
                                                <div class="text-xs text-slate-500 font-medium mt-1">string, optional
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                The Sender ID to use. Defaults to <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-300">Feltech SMS</code>
                                                if not provided.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Code Examples & Response -->
                        <div
                            class="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-slate-800 overflow-hidden sticky top-24">
                            <!-- Example Tabs -->
                            <div class="flex bg-slate-800/50 border-b border-slate-800 px-2 pt-2">
                                <button v-for="lang in ['cURL', 'Node.js', 'PHP']" :key="lang"
                                    @click="activeExample = lang" :class="[
                                        'px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-t-lg',
                                        activeExample === lang
                                            ? 'bg-slate-900 text-brand-blue'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                                    ]">
                                    {{ lang }}
                                </button>
                            </div>

                            <!-- Code Previews -->
                            <div class="p-4 relative group">
                                <button
                                    class="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                                    <DocumentDuplicateIcon class="w-4 h-4" />
                                </button>
                                <div class="h-48 overflow-y-auto custom-scrollbar">
                                    <pre v-show="activeExample === 'cURL'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>curl -X POST https://api.feltechsms.com/v1/sms/send \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"to": "+260977000000", "message": "Hello World", "sender_id": "Feltech SMS"}'</code></pre>

                                    <pre v-show="activeExample === 'Node.js'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>const fetch = require('node-fetch');

const response = await fetch('https://api.feltechsms.com/v1/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+260977000000',
    message: 'Hello World',
    sender_id: 'Feltech SMS'
  })
});
const data = await response.json();</code></pre>

                                    <pre v-show="activeExample === 'PHP'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>$ch = curl_init('https://api.feltechsms.com/v1/sms/send');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'to' => '+260977000000',
    'message' => 'Hello World',
    'sender_id' => 'Feltech SMS'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
$response = curl_exec($ch);
curl_close($ch);</code></pre>
                                </div>
                            </div>

                            <!-- Response Preview -->
                            <div class="bg-black/20 border-t border-slate-800 p-4">
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Response
                                        (200 OK)</span>
                                </div>
                                <pre class="text-sm font-mono text-emerald-400"><code>{
  "status": "success",
  "message_id": "msg_987654321"
}</code></pre>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Send SMS Bulk -->
                <section id="send-bulk" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="bg-brand-green text-white px-3 py-1 rounded-lg text-sm font-bold tracking-wider uppercase">POST</span>
                            <code class="text-slate-900 dark:text-white font-mono text-lg">/v1/sms/send-bulk</code>
                        </div>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Send SMS in Bulk</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            Sends an SMS message to multiple recipients at once.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-8 items-start">
                        <!-- Request Parameters -->
                        <div>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Body Parameters</h3>
                            <div
                                class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr
                                            class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Parameter</th>
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Description</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    to</div>
                                                <div class="text-xs text-brand-blue font-medium mt-1">array of strings,
                                                    required</div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                An array of recipient phone numbers in E.164 format (e.g., <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-300">["+260977000000", "+260977111111"]</code>).
                                                Limit 500 per request.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    message</div>
                                                <div class="text-xs text-brand-blue font-medium mt-1">string, required
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                The content of the SMS message. Maximum of 160 characters for a standard
                                                SMS.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    sender_id</div>
                                                <div class="text-xs text-slate-500 font-medium mt-1">string, optional
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                The Sender ID to use. Defaults to <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-300">Feltech SMS</code>
                                                if not provided.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Code Examples & Response -->
                        <div
                            class="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-slate-800 overflow-hidden sticky top-24">
                            <!-- Example Tabs -->
                            <div class="flex bg-slate-800/50 border-b border-slate-800 px-2 pt-2">
                                <button v-for="lang in ['cURL', 'Node.js', 'PHP']" :key="'bulk-' + lang"
                                    @click="activeBulkExample = lang" :class="[
                                        'px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-t-lg',
                                        activeBulkExample === lang
                                            ? 'bg-slate-900 text-brand-blue'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                                    ]">
                                    {{ lang }}
                                </button>
                            </div>

                            <!-- Code Previews -->
                            <div class="p-4 relative group">
                                <button
                                    class="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                                    <DocumentDuplicateIcon class="w-4 h-4" />
                                </button>
                                <div class="h-48 overflow-y-auto custom-scrollbar">
                                    <pre v-show="activeBulkExample === 'cURL'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>curl -X POST https://api.feltechsms.com/v1/sms/send-bulk \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"to": ["+260977000000", "+260977111111"], "message": "Special offer valid today only!", "sender_id": "Feltech SMS"}'</code></pre>

                                    <pre v-show="activeBulkExample === 'Node.js'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>const fetch = require('node-fetch');

const response = await fetch('https://api.feltechsms.com/v1/sms/send-bulk', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: ['+260977000000', '+260977111111'],
    message: 'Special offer valid today only!',
    sender_id: 'Feltech SMS'
  })
});
const data = await response.json();</code></pre>

                                    <pre v-show="activeBulkExample === 'PHP'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>$ch = curl_init('https://api.feltechsms.com/v1/sms/send-bulk');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'to' => ['+260977000000', '+260977111111'],
    'message' => 'Special offer valid today only!',
    'sender_id' => 'Feltech SMS'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
$response = curl_exec($ch);
curl_close($ch);</code></pre>
                                </div>
                            </div>

                            <!-- Response Preview -->
                            <div class="bg-black/20 border-t border-slate-800 p-4">
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Response
                                        (200 OK)</span>
                                </div>
                                <pre class="text-sm font-mono text-emerald-400"><code>{
  "status": "success",
  "batch_id": "batch_11223344",
  "queued": 2
}</code></pre>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Check Message Status -->
                <section id="message-status" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="bg-brand-blue text-white px-3 py-1 rounded-lg text-sm font-bold tracking-wider uppercase">GET</span>
                            <code
                                class="text-slate-900 dark:text-white font-mono text-lg">/v1/sms/status/{message_id}</code>
                        </div>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Check Message Status</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            Retrieves the current delivery status of a previously sent SMS message.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-8 items-start">
                        <!-- Request Parameters -->
                        <div>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Path Parameters</h3>
                            <div
                                class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-8">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr
                                            class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Parameter</th>
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Description</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    message_id</div>
                                                <div class="text-xs text-brand-blue font-medium mt-1">string, required
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                The unique message identifier returned when the message was initially
                                                sent.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Code Examples & Response -->
                        <div
                            class="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-slate-800 overflow-hidden sticky top-24">
                            <!-- Example Tabs -->
                            <div class="flex bg-slate-800/50 border-b border-slate-800 px-2 pt-2">
                                <button v-for="lang in ['cURL', 'Node.js', 'PHP']" :key="'status-' + lang"
                                    @click="activeStatusExample = lang" :class="[
                                        'px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-t-lg',
                                        activeStatusExample === lang
                                            ? 'bg-slate-900 text-brand-blue'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                                    ]">
                                    {{ lang }}
                                </button>
                            </div>

                            <!-- Code Previews -->
                            <div class="p-4 relative group">
                                <button
                                    class="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                                    <DocumentDuplicateIcon class="w-4 h-4" />
                                </button>
                                <div class="h-48 overflow-y-auto custom-scrollbar">
                                    <pre v-show="activeStatusExample === 'cURL'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>curl -X GET https://api.feltechsms.com/v1/sms/status/msg_987654321 \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre>

                                    <pre v-show="activeStatusExample === 'Node.js'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>const fetch = require('node-fetch');

const response = await fetch('https://api.feltechsms.com/v1/sms/status/msg_987654321', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const data = await response.json();</code></pre>

                                    <pre v-show="activeStatusExample === 'PHP'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>$ch = curl_init('https://api.feltechsms.com/v1/sms/status/msg_987654321');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPGET, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY'
]);
$response = curl_exec($ch);
curl_close($ch);</code></pre>
                                </div>
                            </div>

                            <!-- Response Preview -->
                            <div class="bg-black/20 border-t border-slate-800 p-4">
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Response
                                        (200 OK)</span>
                                </div>
                                <pre class="text-sm font-mono text-emerald-400"><code>{
  "status": "success",
  "data": {
    "message_id": "msg_987654321",
    "delivery_status": "delivered",
    "delivered_at": "2026-02-26T18:05:00Z"
  }
}</code></pre>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Errors -->
                <section id="errors" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Errors</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            Feltech SMS uses standard HTTP response codes to indicate the success or failure of an API
                            request.
                        </p>
                    </div>

                    <div
                        class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr
                                    class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th
                                        class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Code</th>
                                    <th
                                        class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Description</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                <tr>
                                    <td class="py-4 px-4 align-top">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">200 - OK
                                        </div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                        Everything worked as expected.
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4 align-top">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">400 -
                                            Bad Request</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                        The request was unacceptable, often due to missing a required parameter or
                                        invalid data format.
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4 align-top">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">401 -
                                            Unauthorized</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                        No valid API key provided. Check your <code
                                            class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-300">Authorization</code>
                                        header.
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4 align-top">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">402 -
                                            Request Failed</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                        The parameters were valid but the request failed (e.g., insufficient balance).
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4 align-top">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">403 -
                                            Forbidden</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                        The API key doesn't have permissions to perform the request.
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4 align-top">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">429 -
                                            Too Many Requests</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                        Too many requests hit the API too quickly. Rate limits are in effect.
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4 align-top">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">500,
                                            502, 503, 504</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                        Server Errors. Something went wrong on Feltech SMS's end.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

            </main>
        </div>

        <Footer class="mt-auto" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import {
    ShieldExclamationIcon,
    DocumentDuplicateIcon
} from '@heroicons/vue/24/outline'

const activeSection = ref('authentication')
const activeExample = ref('cURL')
const activeBulkExample = ref('cURL')
const activeStatusExample = ref('cURL')

const sections = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        items: [
            { id: 'authentication', name: 'Authentication' },
            { id: 'rate-limits', name: 'Rate Limits' },
            { id: 'errors', name: 'Errors' }
        ]
    },
    {
        id: 'sms',
        title: 'SMS API',
        items: [
            { id: 'send-sms', name: 'Send SMS' },
            { id: 'send-bulk', name: 'Send Bulk SMS' },
            { id: 'message-status', name: 'Check Status' }
        ]
    }
]
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}
</style>
