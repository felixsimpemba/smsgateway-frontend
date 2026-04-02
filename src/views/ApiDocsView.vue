<template>
    <div
        class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300 pb-20">
        <Navbar />

        <!-- Header -->
        <div
            class="bg-sky-600 dark:bg-slate-900 pt-32 pb-16 text-white border-b border-sky-700/30 dark:border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p class="text-sky-200 dark:text-slate-500 text-sm font-mono mb-3">
                    Base URL: <span class="font-bold text-white dark:text-slate-300">https://api.feltechsms.com/api</span>
                </p>
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">API Reference</h1>
                <p class="text-white/80 dark:text-slate-400 max-w-2xl text-lg">
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

                <!-- ── Authentication ── -->
                <section id="authentication" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Authentication</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            All API requests must include your secret API key in the
                            <code class="bg-slate-100 dark:bg-slate-800 text-brand-blue px-2 py-1 rounded text-sm font-mono">Authorization</code>
                            header as a Bearer token. Generate API keys from
                            <strong class="text-slate-800 dark:text-slate-200">Dashboard → API Keys</strong>.
                        </p>
                    </div>
                    <div
                        class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div
                            class="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                            <span
                                class="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Required
                                Header</span>
                        </div>
                        <div class="p-6">
                            <pre
                                class="bg-slate-900 dark:bg-slate-950 text-brand-green/80 p-4 rounded-xl font-mono text-sm overflow-x-auto"><code>Authorization: Bearer YOUR_API_KEY</code></pre>
                            <div
                                class="mt-4 flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 rounded-r-xl">
                                <ShieldExclamationIcon class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <p class="text-sm text-amber-800 dark:text-amber-200">Keep your API keys secret. Never
                                    expose them client-side or in public repositories. All keys start with
                                    <code class="font-mono">ftms_live_</code>.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ── Rate Limits ── -->
                <section id="rate-limits" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Rate Limits</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            To ensure fair usage, rate limits are enforced per IP address.
                            Exceeding the limit returns a
                            <code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm font-mono">429
                                Too Many Requests</code> response.
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
                                        Endpoint Group</th>
                                    <th
                                        class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Limit</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                <tr>
                                    <td class="py-4 px-4 font-mono text-sm text-slate-900 dark:text-white">SMS &
                                        Sender ID (API Key routes)</td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">60 requests /
                                        minute</td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4 font-mono text-sm text-slate-900 dark:text-white">Auth
                                        (login, register)</td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">5 requests /
                                        minute</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <!-- ── Send SMS ── -->
                <section id="send-sms" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="bg-brand-green text-white px-3 py-1 rounded-lg text-sm font-bold tracking-wider uppercase">POST</span>
                            <code class="text-slate-900 dark:text-white font-mono text-lg">/api/v1/sms/send</code>
                        </div>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Send an SMS</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            Sends an SMS message to a single recipient. 1 SMS credit is deducted per 160-character
                            part. Optionally supply an
                            <code
                                class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm font-mono">Idempotency-Key</code>
                            header to safely retry without double-sending.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-8 items-start">
                        <!-- Parameters -->
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
                                                Recipient phone number. E.164 preferred (e.g. <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">+260977000000</code>).
                                                Zambian local formats are auto-converted.
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
                                                SMS content (160 chars = 1 credit; multi-part uses 153 chars/part, each
                                                costing 1 credit).
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
                                                Approved Sender ID. Defaults to <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">FeltechSMS</code>.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 mt-8">Optional Headers
                            </h3>
                            <div
                                class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr
                                            class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                                Header</th>
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                                Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    Idempotency-Key</div>
                                                <div class="text-xs text-slate-500 mt-1">string, optional</div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">A unique
                                                key per request. Repeated requests with the same key return the cached
                                                response without re-sending (cached 24 hrs).</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Code Examples -->
                        <div
                            class="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-slate-800 overflow-hidden sticky top-24">
                            <div class="flex bg-slate-800/50 border-b border-slate-800 px-2 pt-2">
                                <button v-for="lang in ['cURL', 'Node.js', 'PHP']" :key="lang"
                                    @click="activeExample = lang" :class="[
                                        'px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-t-lg',
                                        activeExample === lang
                                            ? 'bg-slate-900 text-brand-blue'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                                    ]">{{ lang }}</button>
                            </div>
                            <div class="p-4">
                                <div class="h-52 overflow-y-auto custom-scrollbar">
                                    <pre v-show="activeExample === 'cURL'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>curl -X POST https://api.feltechsms.com/api/v1/sms/send \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+260977000000",
    "message": "Hello from Feltech SMS!",
    "sender_id": "MyBrand"
  }'</code></pre>

                                    <pre v-show="activeExample === 'Node.js'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>const response = await fetch(
  'https://api.feltechsms.com/api/v1/sms/send',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: '+260977000000',
      message: 'Hello from Feltech SMS!',
      sender_id: 'MyBrand'
    })
  }
);
const data = await response.json();</code></pre>

                                    <pre v-show="activeExample === 'PHP'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>$ch = curl_init('https://api.feltechsms.com/api/v1/sms/send');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'to'        => '+260977000000',
    'message'   => 'Hello from Feltech SMS!',
    'sender_id' => 'MyBrand'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
$response = curl_exec($ch);
curl_close($ch);</code></pre>
                                </div>
                            </div>
                            <div class="bg-black/20 border-t border-slate-800 p-4">
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <span
                                        class="text-xs font-bold text-slate-400 uppercase tracking-widest">Response
                                        (200 OK)</span>
                                </div>
                                <pre
                                    class="text-sm font-mono text-emerald-400"><code>{
  "status": "success",
  "message_id": "msg_42"
}</code></pre>
                                <div class="mt-3 pt-3 border-t border-slate-800">
                                    <div class="flex items-center gap-2 mb-2">
                                        <div class="w-2 h-2 rounded-full bg-red-500"></div>
                                        <span
                                            class="text-xs font-bold text-slate-400 uppercase tracking-widest">402
                                            Insufficient Balance</span>
                                    </div>
                                    <pre
                                        class="text-sm font-mono text-red-400"><code>{
  "status": "error",
  "message": "Insufficient SMS balance.",
  "required": 1,
  "available": 0
}</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ── Send Bulk SMS ── -->
                <section id="send-bulk" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="bg-brand-green text-white px-3 py-1 rounded-lg text-sm font-bold tracking-wider uppercase">POST</span>
                            <code class="text-slate-900 dark:text-white font-mono text-lg">/api/v1/sms/send-bulk</code>
                        </div>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Send Bulk SMS</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            Sends the same SMS to multiple recipients. Up to 500 numbers per request.
                            Credits deducted = message parts × number of recipients.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-8 items-start">
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
                                                Array of recipient phone numbers (min 1, max 500). E.g.
                                                <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">["+260977000000", "+260955111111"]</code>
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
                                                The SMS content sent to all recipients.
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
                                                Approved Sender ID. Defaults to <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">FeltechSMS</code>.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Code Examples -->
                        <div
                            class="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-slate-800 overflow-hidden sticky top-24">
                            <div class="flex bg-slate-800/50 border-b border-slate-800 px-2 pt-2">
                                <button v-for="lang in ['cURL', 'Node.js', 'PHP']" :key="'bulk-' + lang"
                                    @click="activeBulkExample = lang" :class="[
                                        'px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-t-lg',
                                        activeBulkExample === lang
                                            ? 'bg-slate-900 text-brand-blue'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                                    ]">{{ lang }}</button>
                            </div>
                            <div class="p-4">
                                <div class="h-52 overflow-y-auto custom-scrollbar">
                                    <pre v-show="activeBulkExample === 'cURL'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>curl -X POST https://api.feltechsms.com/api/v1/sms/send-bulk \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["+260977000000", "+260955111111"],
    "message": "Special offer valid today only!",
    "sender_id": "MyBrand"
  }'</code></pre>

                                    <pre v-show="activeBulkExample === 'Node.js'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>const response = await fetch(
  'https://api.feltechsms.com/api/v1/sms/send-bulk',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: ['+260977000000', '+260955111111'],
      message: 'Special offer valid today only!',
      sender_id: 'MyBrand'
    })
  }
);
const data = await response.json();</code></pre>

                                    <pre v-show="activeBulkExample === 'PHP'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>$ch = curl_init('https://api.feltechsms.com/api/v1/sms/send-bulk');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'to'        => ['+260977000000', '+260955111111'],
    'message'   => 'Special offer valid today only!',
    'sender_id' => 'MyBrand'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
$response = curl_exec($ch);
curl_close($ch);</code></pre>
                                </div>
                            </div>
                            <div class="bg-black/20 border-t border-slate-800 p-4">
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <span
                                        class="text-xs font-bold text-slate-400 uppercase tracking-widest">Response
                                        (200 OK)</span>
                                </div>
                                <pre
                                    class="text-sm font-mono text-emerald-400"><code>{
  "status": "success",
  "batch_id": "batch_1743601234",
  "queued": 2,
  "log_ids": [101, 102]
}</code></pre>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ── Check Message Status ── -->
                <section id="message-status" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="bg-brand-blue text-white px-3 py-1 rounded-lg text-sm font-bold tracking-wider uppercase">GET</span>
                            <code
                                class="text-slate-900 dark:text-white font-mono text-lg">/api/v1/sms/status/{message_id}</code>
                        </div>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Check Message Status</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            Retrieves the delivery status of a sent SMS. Use the
                            <code
                                class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm font-mono">message_id</code>
                            returned from the send call (e.g. <code
                                class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">msg_42</code>).
                            Possible <code
                                class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">delivery_status</code>
                            values: <code class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">pending</code>,
                            <code class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">sent</code>,
                            <code class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">failed</code>.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-8 items-start">
                        <div>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Path Parameters</h3>
                            <div
                                class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr
                                            class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                                Parameter</th>
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                                Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    message_id</div>
                                                <div class="text-xs text-brand-blue font-medium mt-1">string, required
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                The <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">message_id</code>
                                                returned when the message was sent (format:
                                                <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">msg_{id}</code>).
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Code Examples -->
                        <div
                            class="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-slate-800 overflow-hidden sticky top-24">
                            <div class="flex bg-slate-800/50 border-b border-slate-800 px-2 pt-2">
                                <button v-for="lang in ['cURL', 'Node.js', 'PHP']" :key="'status-' + lang"
                                    @click="activeStatusExample = lang" :class="[
                                        'px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-t-lg',
                                        activeStatusExample === lang
                                            ? 'bg-slate-900 text-brand-blue'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                                    ]">{{ lang }}</button>
                            </div>
                            <div class="p-4">
                                <div class="h-36 overflow-y-auto custom-scrollbar">
                                    <pre v-show="activeStatusExample === 'cURL'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>curl -X GET \
  https://api.feltechsms.com/api/v1/sms/status/msg_42 \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre>

                                    <pre v-show="activeStatusExample === 'Node.js'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>const response = await fetch(
  'https://api.feltechsms.com/api/v1/sms/status/msg_42',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);
const data = await response.json();</code></pre>

                                    <pre v-show="activeStatusExample === 'PHP'"
                                        class="text-sm font-mono text-indigo-300 leading-relaxed"><code>$ch = curl_init(
  'https://api.feltechsms.com/api/v1/sms/status/msg_42'
);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY'
]);
$response = curl_exec($ch);
curl_close($ch);</code></pre>
                                </div>
                            </div>
                            <div class="bg-black/20 border-t border-slate-800 p-4">
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <span
                                        class="text-xs font-bold text-slate-400 uppercase tracking-widest">Response
                                        (200 OK)</span>
                                </div>
                                <pre
                                    class="text-sm font-mono text-emerald-400"><code>{
  "status": "success",
  "data": {
    "message_id": "msg_42",
    "delivery_status": "sent",
    "Sent_at": "2026-04-02T12:00:00.000000Z"
  }
}</code></pre>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ── SMS Logs ── -->
                <section id="sms-logs" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="bg-brand-blue text-white px-3 py-1 rounded-lg text-sm font-bold tracking-wider uppercase">GET</span>
                            <code class="text-slate-900 dark:text-white font-mono text-lg">/api/sms/logs</code>
                        </div>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">SMS Logs</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            Returns a paginated list of all SMS messages sent by this account. Results are newest
                            first, 20 per page.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-8 items-start">
                        <div>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Query Parameters</h3>
                            <div
                                class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr
                                            class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                                Parameter</th>
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                                Description</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    search</div>
                                                <div class="text-xs text-slate-500 mt-1">string, optional</div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Filter by
                                                recipient number or message content.</td>
                                        </tr>
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    status</div>
                                                <div class="text-xs text-slate-500 mt-1">string, optional</div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Filter by
                                                status: <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">Pending</code>,
                                                <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">Sent</code>,
                                                <code
                                                    class="bg-slate-100 dark:bg-slate-800 px-1 rounded">Failed</code>.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Response -->
                        <div
                            class="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-slate-800 overflow-hidden sticky top-24">
                            <div class="p-4 border-b border-slate-800">
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Example
                                    Request</span>
                            </div>
                            <div class="p-4">
                                <pre
                                    class="text-sm font-mono text-indigo-300 leading-relaxed"><code>curl -X GET \
  "https://api.feltechsms.com/api/sms/logs?status=Sent" \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre>
                            </div>
                            <div class="bg-black/20 border-t border-slate-800 p-4">
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <span
                                        class="text-xs font-bold text-slate-400 uppercase tracking-widest">Response
                                        (200 OK)</span>
                                </div>
                                <pre
                                    class="text-sm font-mono text-emerald-400 overflow-x-auto"><code>{
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 42,
        "recipient": "+260977000000",
        "message": "Hello from Feltech SMS!",
        "sender_id": "MyBrand",
        "status": "Sent",
        "cost": 1,
        "sent_at": "2026-04-02T12:00:00.000000Z",
        "created_at": "2026-04-02T11:59:55.000000Z"
      }
    ],
    "per_page": 20,
    "total": 1
  }
}</code></pre>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ── Request Sender ID ── -->
                <section id="sender-ids" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="bg-brand-green text-white px-3 py-1 rounded-lg text-sm font-bold tracking-wider uppercase">POST</span>
                            <code class="text-slate-900 dark:text-white font-mono text-lg">/api/sender-ids</code>
                        </div>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Request a Sender ID</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            Submits a new Sender ID for review. Once approved by an admin, you can use that name in
                            your SMS requests.
                            Names are limited to 11 characters (GSM standard). Duplicate requests return
                            <code
                                class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">409 Conflict</code>.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-8 items-start">
                        <div>
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Body Parameters</h3>
                            <div
                                class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr
                                            class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                                Parameter</th>
                                            <th
                                                class="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                                Description</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    name</div>
                                                <div class="text-xs text-brand-blue font-medium mt-1">string, required
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">The
                                                Sender ID text shown to recipients (max 11 characters).</td>
                                        </tr>
                                        <tr>
                                            <td class="py-4 px-4 align-top">
                                                <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                                    use_case</div>
                                                <div class="text-xs text-brand-blue font-medium mt-1">string, required
                                                </div>
                                            </td>
                                            <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Describe
                                                how you intend to use this Sender ID.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Code Example -->
                        <div
                            class="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-slate-800 overflow-hidden sticky top-24">
                            <div class="p-4 border-b border-slate-800">
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Example
                                    Request (cURL)</span>
                            </div>
                            <div class="p-4">
                                <pre
                                    class="text-sm font-mono text-indigo-300 leading-relaxed"><code>curl -X POST \
  https://api.feltechsms.com/api/sender-ids \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MyBrand",
    "use_case": "Promotional offers for e-commerce"
  }'</code></pre>
                            </div>
                            <div class="bg-black/20 border-t border-slate-800 p-4">
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="w-2 h-2 rounded-full bg-brand-green"></div>
                                    <span
                                        class="text-xs font-bold text-slate-400 uppercase tracking-widest">Response
                                        (201 Created)</span>
                                </div>
                                <pre
                                    class="text-sm font-mono text-emerald-400"><code>{
  "id": 7,
  "user_id": 3,
  "name": "MyBrand",
  "use_case": "Promotional offers for e-commerce",
  "status": "Pending",
  "created_at": "2026-04-02T12:00:00.000000Z"
}</code></pre>
                                <div class="mt-3 pt-3 border-t border-slate-800">
                                    <div class="flex items-center gap-2 mb-2">
                                        <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <span
                                            class="text-xs font-bold text-slate-400 uppercase tracking-widest">409
                                            Already Requested</span>
                                    </div>
                                    <pre
                                        class="text-sm font-mono text-yellow-400"><code>{
  "message": "You have already requested this Sender ID."
}</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ── Errors ── -->
                <section id="errors" class="scroll-mt-32">
                    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Errors</h2>
                        <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            The API uses standard HTTP status codes. All error responses include a JSON body with a
                            <code
                                class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">message</code>
                            field.
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
                                        Meaning</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                                <tr>
                                    <td class="py-4 px-4">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">200 OK
                                        </div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Request
                                        succeeded.</td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">201
                                            Created</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Resource created
                                        successfully.</td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">401
                                            Unauthorized</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Missing or invalid
                                        <code
                                            class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">Authorization</code>
                                        header / API key.
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">402
                                            Payment Required</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Insufficient SMS
                                        balance. Top up your account to continue sending.</td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">409
                                            Conflict</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Resource already
                                        exists (e.g. duplicate Sender ID request).</td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">422
                                            Unprocessable</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Validation failed.
                                        Check the
                                        <code
                                            class="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono">errors</code>
                                        field for details.
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">429 Too
                                            Many Requests</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Rate limit
                                        exceeded. Use exponential back-off before retrying.</td>
                                </tr>
                                <tr>
                                    <td class="py-4 px-4">
                                        <div class="font-mono text-sm font-bold text-slate-900 dark:text-white">500 /
                                            502 / 503</div>
                                    </td>
                                    <td class="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">Server error on
                                        our end. Retry with exponential back-off.</td>
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
import { ShieldExclamationIcon } from '@heroicons/vue/24/outline'

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
            { id: 'errors', name: 'Errors' },
        ]
    },
    {
        id: 'sms',
        title: 'SMS API',
        items: [
            { id: 'send-sms', name: 'Send SMS' },
            { id: 'send-bulk', name: 'Send Bulk SMS' },
            { id: 'message-status', name: 'Check Status' },
            { id: 'sms-logs', name: 'SMS Logs' },
        ]
    },
    {
        id: 'senderids',
        title: 'Sender IDs',
        items: [
            { id: 'sender-ids', name: 'Request Sender ID' },
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
