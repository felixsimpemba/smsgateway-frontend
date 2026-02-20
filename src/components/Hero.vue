<template>
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="lg:grid lg:grid-cols-2 gap-16 items-center">
                <!-- Left Content -->
                <div class="text-left mb-12 lg:mb-0">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-300 text-xs font-semibold mb-6 border border-indigo-700/50 backdrop-blur-sm">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        v2.0 is live: Global SMS Delivery
                    </div>
                    <h1
                        class="text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight md:leading-tight">
                        The API for <br />
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                            Reliable Messaging
                        </span>
                    </h1>
                    <p class="mt-6 text-lg text-slate-400 leading-relaxed max-w-lg">
                        Connect with customers globally through our ultra-low latency SMS gateway.
                        Engineered for developers who demand 99.99% uptime and instant delivery reports.
                    </p>

                    <div class="mt-10 flex flex-col sm:flex-row gap-4">
                        <router-link to="/signup"
                            class="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-900/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                            Get API Key
                            <ArrowRightIcon class="h-5 w-5" />
                        </router-link>
                        <router-link to="/docs"
                            class="px-8 py-4 bg-slate-800 text-slate-300 font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-all hover:-translate-y-1 active:scale-95 text-center">
                            Read Documentation
                        </router-link>
                    </div>

                    <div class="mt-12 pt-8 border-t border-slate-800">
                        <p class="text-sm font-medium text-slate-500 mb-4">TRUSTED BY ENGINEERING TEAMS AT</p>
                        <div class="flex gap-6 grayscale opacity-60">
                            <!-- Placeholder Logos (CSS Shapes) -->
                            <div class="h-6 w-20 bg-slate-600/50 rounded"></div>
                            <div class="h-6 w-20 bg-slate-600/50 rounded"></div>
                            <div class="h-6 w-20 bg-slate-600/50 rounded"></div>
                            <div class="h-6 w-20 bg-slate-600/50 rounded hidden sm:block"></div>
                        </div>
                    </div>
                </div>

                <!-- Right Visual (Code Window) -->
                <div class="relative mx-auto w-full max-w-lg lg:max-w-none">
                    <!-- Decorate Blobs -->
                    <div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
                    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>

                    <div
                        class="relative bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden group">
                        <!-- Window Controls -->
                        <div class="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
                            <div class="w-3 h-3 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors">
                            </div>
                            <div
                                class="w-3 h-3 rounded-full bg-amber-500/20 group-hover:bg-amber-500 transition-colors">
                            </div>
                            <div
                                class="w-3 h-3 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors">
                            </div>
                            <div class="ml-auto text-xs font-mono text-slate-500">curl-request.sh</div>
                        </div>

                        <!-- Code Content -->
                        <div class="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-slate-300">
                            <div class="flex">
                                <span class="text-slate-600 select-none w-6 text-right mr-4">1</span>
                                <span><span class="text-indigo-400">curl</span> -X POST https://api.Feltech
                                    SMS.com/v1/messages \</span>
                            </div>
                            <div class="flex">
                                <span class="text-slate-600 select-none w-6 text-right mr-4">2</span>
                                <span>&nbsp;&nbsp;-H <span class="text-emerald-400">"Authorization: Bearer
                                        sk_live_..."</span> \</span>
                            </div>
                            <div class="flex">
                                <span class="text-slate-600 select-none w-6 text-right mr-4">3</span>
                                <span>&nbsp;&nbsp;-H <span class="text-emerald-400">"Content-Type:
                                        application/json"</span> \</span>
                            </div>
                            <div class="flex">
                                <span class="text-slate-600 select-none w-6 text-right mr-4">4</span>
                                <span>&nbsp;&nbsp;-d <span class="text-amber-300">'{</span></span>
                            </div>
                            <div class="flex">
                                <span class="text-slate-600 select-none w-6 text-right mr-4">5</span>
                                <span><span class="text-amber-300">&nbsp;&nbsp;&nbsp;&nbsp;"to":
                                        "+260970000000",</span></span>
                            </div>
                            <div class="flex">
                                <span class="text-slate-600 select-none w-6 text-right mr-4">6</span>
                                <span><span class="text-amber-300">&nbsp;&nbsp;&nbsp;&nbsp;"body": "Your verification
                                        code is: 8439"</span></span>
                            </div>
                            <div class="flex">
                                <span class="text-slate-600 select-none w-6 text-right mr-4">7</span>
                                <span><span class="text-amber-300">&nbsp;&nbsp;}'</span></span>
                            </div>

                            <!-- Animated Response Overlay -->
                            <div class="mt-6 p-4 bg-slate-900 rounded border border-slate-800 animate-pulse">
                                <div class="text-xs text-slate-500 mb-2 uppercase tracking-wider">Response 200 OK</div>
                                <div class="text-emerald-400">
                                    {<br />
                                    &nbsp;&nbsp;"id": "msg_8923023",<br />
                                    &nbsp;&nbsp;"status": "queued"<br />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Grid Background -->
        <div
            class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        </div>
    </section>
</template>

<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
</script>
