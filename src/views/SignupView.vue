<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <router-link to="/" class="flex justify-center items-center gap-2 mb-6">
                <div class="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-200">
                    <ChatBubbleBottomCenterTextIcon class="h-6 w-6 text-white" />
                </div>
                <span
                    class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Feltech
                    SMS</span>
            </router-link>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
                Start sending in minutes
            </h2>
            <p class="mt-2 text-center text-sm text-slate-600">
                Already have an account?
                <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in here
                </router-link>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                class="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
                <form class="space-y-6" @submit.prevent="handleSignup">
                    <div>
                        <label for="name" class="block text-sm font-semibold text-slate-700">
                            Full Name
                        </label>
                        <div class="mt-1">
                            <input id="name" name="name" type="text" autocomplete="name" required
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="John Doe" />
                        </div>
                    </div>

                    <div>
                        <label for="company" class="block text-sm font-semibold text-slate-700">
                            Company (optional)
                        </label>
                        <div class="mt-1">
                            <input id="company" name="company" type="text" autocomplete="organization"
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="The Tech Group" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-semibold text-slate-700">
                            Email address
                        </label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" autocomplete="email" required
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="name@company.com" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-semibold text-slate-700">
                            Password
                        </label>
                        <div class="mt-1">
                            <input id="password" name="password" type="password" autocomplete="new-password" required
                                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="••••••••" />
                        </div>
                        <p class="mt-2 text-xs text-slate-500">Must be at least 8 characters long.</p>
                    </div>

                    <div class="flex items-center">
                        <input id="terms" name="terms" type="checkbox" required
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded" />
                        <label for="terms" class="ml-2 block text-sm text-slate-600">
                            I agree to the
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Terms of Service</a>
                            and
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
                        </label>
                    </div>

                    <div>
                        <button type="submit"
                            class="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:-translate-y-0.5 active:scale-95">
                            Create my free account
                        </button>
                    </div>
                </form>

                <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-slate-200"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-slate-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div class="mt-6">
                        <button
                            class="w-full inline-flex justify-center py-3 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
                            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.224 1.224-3.136 2.552-6.712 2.552-5.44 0-9.76-4.4-9.76-9.84s4.32-9.84 9.76-9.84c2.952 0 5.176 1.152 6.76 2.68l2.304-2.304C18.592 1.392 15.832 0 12.48 0 5.592 0 0 5.592 0 12.48S5.592 24.96 12.48 24.96c3.752 0 6.592-1.24 8.76-3.52 2.24-2.24 2.944-5.408 2.944-8.032 0-.768-.064-1.504-.184-2.192H12.48z" />
                            </svg>
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline'

const handleSignup = () => {
    // Implement signup logic here
    console.log('Signup submitted')
}
</script>
