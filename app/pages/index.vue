<script lang="ts" setup>
import {
    ArrowRight,
} from 'lucide-vue-next';
import {
    createOrganizationStructuredData,
    createSoftwareApplicationStructuredData,
    createWebsiteStructuredData,
} from '~/composables/useSEO';

const { t, locale } = useI18n();
const localePath = useLocalePath();

const sampleResumeSrc = computed(() => `/sample-resume-${locale.value}.svg`);

interface PublicStats {
    users: number;
    resumes: number;
    downloads: number;
}

const { data: stats } = await useFetch<PublicStats>('/api/stats', {
    key: 'public-stats',
    default: () => ({ users: 0, resumes: 0, downloads: 0 }),
});

const formatNumber = (n: number) => n.toLocaleString('en-US');



useHead({
    title: t('homepage.heroTitle'),
    meta: [
        {
            name: 'description',
            content: t('homepage.heroDescription'),
        },
        {
            name: 'keywords',
            content: 'free resume builder, resume for free, free resume maker, no registration resume builder, privacy resume builder, PDF resume download, resume builder no signup, free CV maker, ATS friendly resume, resume builder no watermark',
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            property: 'og:site_name',
            content: 'NewCv',
        },
        {
            property: 'og:title',
            content: t('homepage.heroTitle'),
        },
        {
            property: 'og:description',
            content: t('homepage.heroDescription'),
        },
        {
            property: 'og:url',
            content: 'https://newcv.com',
        },
        {
            property: 'og:image',
            content: 'https://newcv.com/og-image.png',
        },
        {
            property: 'og:image:width',
            content: '1200',
        },
        {
            property: 'og:image:height',
            content: '630',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: t('homepage.heroTitle'),
        },
        {
            name: 'twitter:description',
            content: t('homepage.heroDescription'),
        },
        {
            name: 'twitter:image',
            content: 'https://newcv.com/og-image.png',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://newcv.com',
        },
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify(createWebsiteStructuredData()),
        },
        {
            type: 'application/ld+json',
            children: JSON.stringify(createSoftwareApplicationStructuredData()),
        },
        {
            type: 'application/ld+json',
            children: JSON.stringify(createOrganizationStructuredData()),
        },

    ],
});
</script>

<template>
    <main>
        <!-- ─── Hero ─────────────────────────────────────────────────────── -->
        <section class="border-b border-rule py-[72px] md:py-[88px]">
            <div class="max-w-[1180px] mx-auto px-6">
                <div class="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
                    <!-- Left: copy -->
                    <div>
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-ink">
                            {{ $t('homepage.hero.title') }}
                        </h1>
                        <p class="text-lg text-ink-3 mt-4 max-w-xl leading-relaxed">
                            {{ $t('homepage.hero.sub') }}
                        </p>

                        <div class="flex flex-wrap gap-2.5 mt-7">
                            <NuxtLink :to="localePath('/builder')">
                                <button class="inline-flex items-center gap-2 h-[46px] px-[22px] rounded-lg bg-primary text-white font-medium text-[15px] hover:bg-primary/90 transition-colors shadow-sm">
                                    {{ $t('homepage.hero.ctaBuild') }}
                                    <ArrowRight class="w-4 h-4" />
                                </button>
                            </NuxtLink>
                        </div>

                        <p class="text-sm text-ink-4 mt-3.5">
                            {{ $t('homepage.hero.note') }}
                        </p>

                        <p class="text-xs text-ink-4 mt-2">
                            {{ $t('homepage.termsAgreement') }}
                            <NuxtLink
                                :to="localePath('/terms')"
                                class="text-primary underline underline-offset-2 hover:text-primary/90"
                            >
                                {{ $t('homepage.termsLink') }}
                            </NuxtLink>
                        </p>

                        <!-- Stats row -->
                        <div class="mt-10 pt-6 border-t border-rule grid grid-cols-3 gap-8">
                            <div>
                                <div class="text-[22px] font-bold tracking-tight text-ink">
                                    {{ formatNumber(stats.users) }}
                                </div>
                                <div class="text-xs text-ink-4 mt-0.5">
                                    {{ $t('homepage.hero.stat1Label') }}
                                </div>
                            </div>
                            <div>
                                <div class="text-[22px] font-bold tracking-tight text-ink">
                                    {{ formatNumber(stats.downloads) }}
                                </div>
                                <div class="text-xs text-ink-4 mt-0.5">
                                    {{ $t('homepage.hero.stat2Label') }}
                                </div>
                            </div>
                            <div>
                                <div class="text-[22px] font-bold tracking-tight text-ink">
                                    $0
                                </div>
                                <div class="text-xs text-ink-4 mt-0.5">
                                    {{ $t('homepage.hero.stat3Label') }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: sample resume preview (SVG as object; content isn't indexed as page content) -->
                    <div class="hidden lg:flex justify-center">
                        <object
                            :data="sampleResumeSrc"
                            type="image/svg+xml"
                            :aria-label="$t('homepage.sampleResume.alt')"
                            class="w-[420px] aspect-[596/842] rounded-[14px] border border-rule bg-card pointer-events-none"
                            style="box-shadow: 0 1px 2px rgb(15 23 42 / 0.04), 0 24px 48px -16px rgb(15 23 42 / 0.16);"
                        />
                    </div>
                </div>
            </div>
        </section>



        <!-- ─── How It Works ──────────────────────────────────────────────── -->
        <section class="py-[88px] bg-bg-dark border-t border-b border-border/20">
            <div class="max-w-[1180px] mx-auto px-6">
                <div class="text-center max-w-[640px] mx-auto mb-12">
                    <div class="text-xs uppercase tracking-widest font-semibold text-white mb-3">
                        {{ $t('homepage.howItWorks.eyebrow') }}
                    </div>
                    <h2 class="text-[clamp(28px,3.5vw,40px)] font-semibold tracking-tight leading-tight text-white">
                        {{ $t('homepage.howItWorks.title') }}
                    </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        v-for="step in [
                            { n: '1', title: t('homepage.howItWorks.step1.title'), body: t('homepage.howItWorks.step1.description') },
                            { n: '2', title: t('homepage.howItWorks.step2.title'), body: t('homepage.howItWorks.step2.description') },
                            { n: '3', title: t('homepage.howItWorks.step3.title'), body: t('homepage.howItWorks.step3.description') },
                        ]"
                        :key="step.n"
                        class="bg-bg-card-dark border border-border/20 rounded-[14px] p-7"
                    >
                        <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold mb-[18px]">
                            {{ step.n }}
                        </div>
                        <h3 class="text-[17px] font-semibold tracking-tight text-white">
                            {{ step.title }}
                        </h3>
                        <p class="text-sm text-white mt-2 leading-relaxed">
                            {{ step.body }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── Final CTA ─────────────────────────────────────────────────── -->
        <section class="py-[88px] bg-bg-dark border-t border-border/20">
            <div class="max-w-[640px] mx-auto px-6 text-center">
                <h2 class="text-[clamp(30px,4vw,44px)] font-semibold tracking-tight leading-tight text-white">
                    {{ t('homepage.finalCta.title') }}
                </h2>
                <p class="text-[17px] text-white mt-3.5">
                    {{ $t('homepage.finalCta.sub') }}
                </p>
                <div class="flex flex-wrap gap-2.5 justify-center mt-6">
                    <NuxtLink :to="localePath('/builder')">
                        <button class="inline-flex items-center gap-2 h-[46px] px-[22px] rounded-lg bg-primary text-white font-medium text-[15px] hover:bg-primary/90 transition-colors shadow-sm">
                            {{ $t('homepage.finalCta.ctaBuild') }}
                            <ArrowRight class="w-4 h-4" />
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>
