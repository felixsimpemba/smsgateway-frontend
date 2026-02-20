<template>
    <section class="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:flex items-center gap-16">
                <div class="lg:w-1/2 mb-12 lg:mb-0">
                    <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl mb-12">Start sending
                        in minutes</h2>
                    <div class="space-y-12">
                        <div v-for="(step, index) in steps" :key="index" class="flex gap-6">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                                {{ index + 1 }}
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ step.title }}</h3>
                                <p class="text-slate-600 dark:text-slate-400">{{ step.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:w-1/2">
                    <div
                        class="bg-slate-900 dark:bg-slate-950 rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden relative group border border-slate-800">
                        <div class="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                            <div class="flex gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
                            </div>
                            <div class="flex gap-4 ml-6">
                                <button v-for="lang in Object.keys(codeExamples)" :key="lang" @click="activeLang = lang"
                                    :class="['text-xs font-mono uppercase tracking-widest transition-colors', activeLang === lang ? 'text-indigo-400 border-b border-indigo-400' : 'text-slate-500 hover:text-slate-300']">
                                    {{ lang }}
                                </button>
                            </div>
                        </div>
                        <pre
                            class="text-indigo-300 font-mono text-sm md:text-base leading-relaxed overflow-x-auto h-[300px]"><code>{{ codeExamples[activeLang] }}</code></pre>

                        <!-- Glow Effect -->
                        <div
                            class="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity pointer-events-none">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const activeLang = ref('javascript')

const steps = [
    {
        title: "Create an Account",
        description: "Sign up for free and get access to your dashboard instantly."
    },
    {
        title: "Generate Your API Key",
        description: "Create a secure API key to authenticate your requests."
    },
    {
        title: "Send SMS with a Single API Call",
        description: "Integrate our light-weight REST API into your application and start sending."
    }
]

const codeExamples = {
    javascript: `// Send SMS using JavaScript
const response = await fetch("https://api.Feltech SMS.com/v1/sms/send", {
  method: "POST",
  headers: { 
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ 
    to: "+260977000000", 
    message: "Hello World" 
  })
});

const data = await response.json();
console.log(data.status); // "delivered"`,

    python: `# Send SMS using Python
import requests

url = "https://api.Feltech SMS.com/v1/sms/send"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "to": "+260977000000",
    "message": "Hello World"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json().get("status")) # "delivered"`,

    php: `<?php
// Send SMS using PHP
$ch = curl_init("https://api.Feltech SMS.com/v1/sms/send");
$payload = json_encode([
    "to" => "+260977000000",
    "message" => "Hello World"
]);

curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer YOUR_API_KEY",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);
curl_close($ch);
echo json_decode($result)->status; // "delivered"
?>`
}
</script>
