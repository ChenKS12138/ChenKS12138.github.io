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

console.log(frontmatter.headings)

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
    <div class="flex items-start wrapper">
        <div class="headings">
            <div class="headings-content">
                <article-heading :headings="headings" />
            </div>
        </div>
        <div class="content-wrapper">
            <div class="h-55 -mt-55 flex flex-col items-center text-white">
                <div class="font-bold text-3xl">{{ frontmatter.title }}</div>
                <div class="text-lg mt-2">{{ dayjs(frontmatter.date).format('YYYY-MM-DD') }}</div>
                <div class="mt-2 italic">{{ (frontmatter.tags || []).map(x => `#${x}`).join(' ') }}</div>
            </div>
            <slot></slot>
            <!-- <div class="rounded bg-gray mt-10 p-1 text-white italic indent-md text-lg">
                CC BY-SA 3.0协议 。转载请注明出处!
            </div> -->
            <div class="mt-20">
                <Giscus v-if="showGiscus" ref="giscusRef" id="comments" repo="ChenKS12138/ChenKS12138.github.io"
                    repoId="MDEwOlJlcG9zaXRvcnkyNzA4Njc3ODM=" category="Announcements" categoryId="DIC_kwDOECUdR84Cd10_"
                    mapping="og:title" reactionsEnabled="1" emitMetadata="0" inputPosition="bottom" :theme="discusTheme"
                    lang="zh-CN" loading="lazy" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    margin-left: -23rem;

    @media screen and (max-width: 770px) {
        margin-left: 0rem;
        flex-direction: column;
        align-items: flex-start;
    }
}

.headings {
    min-width: 23rem;
    position: sticky;
    top: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: flex-end;
    width: 0;

    @media screen and (max-width: 770px) {
        justify-content: flex-start;

        /* display: none; */
    }
}

.headings-content {
    max-width: 15rem;
    max-height: 50rem;
    overflow-y: scroll;
    @apply mr-8 pr-4 mt-20;

    @media screen and (max-width: 770px) {
        display: none;
    }
}

.content-wrapper {
    width: calc(100% - 23rem)
}
</style>

<style>
* {
    scroll-behavior: smooth;
}
</style>