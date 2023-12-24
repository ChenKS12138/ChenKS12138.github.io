<script lang="ts" setup>
import dayjs from 'dayjs'
const { frontmatter } = defineProps<{
    frontmatter: {
        coverImage?: string,
        date: string,
        tags: string[],
        title: string,
    }
}>();

useHead({
    title: frontmatter.title
})

</script>

<template>
    <div class="h-55 -mt-55 flex flex-col items-center text-white">
        <div class="font-bold text-3xl">{{ frontmatter.title }}</div>
        <div class="text-lg mt-2">{{ dayjs(frontmatter.date).format('YYYY-MM-DD') }}</div>
        <div class="mt-2 italic">{{ (frontmatter.tags || []).map(x => `#${x}`).join(' ') }}</div>
    </div>
    <slot></slot>
    <!-- <div class="rounded bg-gray mt-10 p-1 text-white italic indent-md text-lg">
        CC BY-SA 3.0协议 。转载请注明出处!
    </div> -->
</template>