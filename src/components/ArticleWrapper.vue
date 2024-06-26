<script lang="ts" setup>
import dayjs from 'dayjs'
import Giscus from '@giscus/vue';
import { useMyDark } from '~/composables/dark';
import { Heading } from '~/utils/types';

const { frontmatter } = defineProps<{
    frontmatter: {
        coverImage?: string,
        date: string,
        tags: string[],
        title: string,
        headings: Heading
    }
}>();

const headings = frontmatter.headings;

useHead({
    title: frontmatter.title,
    meta: [
        {
            property: 'og:title',
            content: frontmatter.title,
        }
    ]
})

const [isDark, _] = useMyDark();
const discusTheme = computed(() => isDark.value ? 'dark' : 'light');

const showGiscus = ref(true);
watch(isDark, () => {
    showGiscus.value = false;
    nextTick(() => {
        showGiscus.value = true;
    })
});


</script>

<template>
    <shadow-box>
        <template #left-toc>
            <article-heading :headings="headings" />
        </template>
        <template #title-content>
            <div class="h-55 -mt-55 flex flex-col items-center text-white">
                <div class="font-bold text-3xl">{{ frontmatter.title }}</div>
                <div class="text-lg mt-2">{{ dayjs(frontmatter.date).format('YYYY-MM-DD') }}</div>
                <div class="mt-2 italic">{{ (frontmatter.tags || []).map(x => `#${x}`).join(' ') }}</div>
            </div>
        </template>
        <div class="flex items-start wrapper">
            <div class="content-wrapper">
                <slot></slot>
                <div class="rounded bg-gray mt-10 p-1 text-white italic indent-md text-lg">
                    CC BY-SA 3.0协议 。转载请注明出处!
                </div>
                <div class="mt-20">
                    <Giscus v-if="showGiscus" ref="giscusRef" id="comments" repo="ChenKS12138/ChenKS12138.github.io"
                        repoId="MDEwOlJlcG9zaXRvcnkyNzA4Njc3ODM=" category="Announcements"
                        categoryId="DIC_kwDOECUdR84Cd10_" mapping="og:title" reactionsEnabled="1" emitMetadata="0"
                        inputPosition="bottom" :theme="discusTheme" lang="zh-CN" loading="lazy" />
                </div>
            </div>
        </div>
    </shadow-box>
</template>

<style scoped>
.wrapper {
    @media screen and (max-width: 770px) {
        margin-left: 0rem;
        flex-direction: column;
        align-items: flex-start;
    }
}

.content-wrapper {
    width: 100%;
}
</style>

<style>
* {
    scroll-behavior: smooth;
}
</style>