<template>
    <section class="py-24 bg-slate-50 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20">
                <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Trusted by Zambia's leading startups</h2>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    Hear from the developers and entrepreneurs who rely on FELSMS every day.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="(testimonial, index) in testimonials" :key="index"
                    class="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm relative transition-all hover:shadow-md">
                    <div
                        class="absolute -top-4 -left-2 text-indigo-100 italic font-serif text-8xl leading-none select-none">
                        “</div>
                    <div class="relative">
                        <p class="text-slate-700 leading-relaxed mb-8 italic">
                            {{ testimonial.quote }}
                        </p>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-indigo-50">
                                <img :src="testimonial.avatar" :alt="testimonial.author"
                                    class="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div class="font-bold text-slate-900 leading-none mb-1">{{ testimonial.author }}</div>
                                <div class="text-sm text-slate-500">{{ testimonial.role }} at <span
                                        class="text-indigo-600">{{ testimonial.company }}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const testimonials = [
    {
        author: "Mwelwa Mulenga",
        role: "CTO",
        company: "Zedge Pay",
        quote: "Integrating FELSMS was a breeze. Their API is one of the most stable we've used in the Zambian market. Highly recommended for any serious developer.",
        avatar: "https://i.pravatar.cc/150?u=mwelwa"
    },
    {
        author: "Chama Mwape",
        role: "Founder",
        company: "Lusaka Logistics",
        quote: "Our delivery notifications are sent instantly now. The real-time reporting feature has significantly improved our customer satisfaction rates.",
        avatar: "https://i.pravatar.cc/150?u=chama"
    },
    {
        author: "Kunda Bwalya",
        role: "Lead Engineer",
        company: "EduTech Hub",
        quote: "The pricing is unmatched. We moved from an international gateway and saved over 40% on our monthly SMS costs, with better delivery rates.",
        avatar: "https://i.pravatar.cc/150?u=kunda"
    }
]
</script>
