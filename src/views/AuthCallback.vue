<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-50">
        <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent mb-4"></div>
            <p class="text-slate-600 font-medium">Completing sign in...</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()

onMounted(async () => {
    const token = route.query.token

    if (token) {
        try {
            // Save token and fetch user
            await store.dispatch('auth/handleCallback', token)
            router.push('/dashboard')
        } catch (error) {
            console.error('Auth callback error:', error)
            router.push('/login?error=auth_failed')
        }
    } else {
        router.push('/login')
    }
})
</script>
