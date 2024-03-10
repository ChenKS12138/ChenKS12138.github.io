<script lang="ts" setup>
import articles from "virtual:resolve-md";
import dayjs from "dayjs";

useHead({
    title: '文章'
})

const allTags = Array.from(
    articles.reduce((prev, curr) => {
        curr.data?.tags?.forEach((tag: any) => prev.add(tag));
        return prev;
    }, new Set<any>())
);

const selectedTag = ref("");

const filteredArticles = computed(() => selectedTag.value.length
    ? articles.filter((one) => one.data?.tags.includes(selectedTag.value))
    : articles);

const parsedArticles = computed(() => filteredArticles.value.map((one) => {
    const { path, data } = one;
    const date = dayjs(data.date);
    return {
        path,
        title: data.title,
        year: date.year(),
        monthAndDay: date.format("MM-DD"),
    };
}));

const groupedArticles = computed(() => Array.from(
    parsedArticles.value
        .reduce((prev, curr) => {
            if (!prev.get(curr.year)) {
                prev.set(curr.year, []);
            }
            prev.get(curr.year)!.push(curr);
            return prev;
        }, new Map<number, any[]>())
        .entries()
));
</script>

<template>
    <div class="tag-container">
        <div class="tag-item" :data-selected="selectedTag === ''" @click="selectedTag = ''">
            ALL
        </div>
        <div class="tag-item" :data-selected="selectedTag === tagItem ? 'true' : ''" v-for="tagItem in allTags"
            @click="selectedTag = tagItem">
            {{ tagItem }}
        </div>
    </div>
    <div class="articles-container">
        <div>Total: {{ articles.length }}</div>
        <div class="articles-divider border-t dark:border-white"></div>
        <div class="mt-2" v-for="[year, yearArticles] in groupedArticles" :key="year">
            <div class="text-xl">{{ year }}</div>
            <div class="ml-5 mt-2 mb-8">
                <router-link class="article-link" v-for="article in yearArticles" :to="article.path">
                    <div class="flex justify-between my-3 dark:text-white">
                        <div>{{ article.title }}</div>
                        <div>{{ article.monthAndDay }}</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tag-container {
    @apply flex mx-10 flex-wrap;
}

.tag-item {
    @apply m-2 cursor-pointer p-2 select-none;
}

.tag-item[data-selected="true"] {
    @apply color-white;
    background-color: rgb(255, 79, 94);
    border-radius: 0.25rem;
    box-shadow: rgb(0 0 0 / 16%) 0px 2px 5px 0px,
        rgb(0 0 0 / 12%) 0px 2px 10px 0px;
}

.articles-container {
    @apply mx-8 mt-5;
}

.articles-divider {
    @apply w-full mt-2;
}

.article-link {
    @apply cursor-pointer decoration-none leading-8 color-text-comm color-text-comm dark: (text-white);
}

.article-link:hover {
    text-decoration: underline dashed;
}
</style>
