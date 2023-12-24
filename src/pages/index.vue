<script lang="ts" setup>
import originalArticles from 'virtual:resolve-md';

const articles = originalArticles.slice(0, 8);
const router = useRouter();
const go = (urlPath: string) => router.push(urlPath);


useHead({
    title: '首页'
})

</script>
<template>
    <div v-for="(article, idx) in articles" :key="article.path" class="article-item flex-col md:(flex-row)"
        @click="go(article.path)">
        <div class="md:(pr-4 w-4\/5)">
            <div class="article-item-title">{{ article.data.title }}</div>
            <div class="article-item-brief">{{ article.brief }}</div>
            <div class="article-item-meta">
                <span class="mr-6 ">{{ article.data.date }}</span>
                <span class="italic">{{ (article.data.tags).join(", ") }}</span>
            </div>
        </div>
        <div class="h-40 " v-if="article.data.coverImage">
            <img :src="article.data.coverImage" class="article-item-image" alt="">
        </div>
    </div>
    <router-link class="text--link" to="/article-list">
        <div class="dark:text-white">查看全部</div>
    </router-link>
</template>


<style scoped>
.article-item-image {
    @apply h-35 w-50;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19) !important;

    @media screen and (max-width: 770px) {
        width: 100%;
    }
}

.article-item {
    @apply px-4 cursor-pointer flex;
}

html.dark .article-item:not(:last-child) {
    border-color: rgba(255, 255, 255, 0.5);
}

.article-item:not(:last-child) {
    @apply pb-8 mb-8 border-b color-border-gray-lighter;
}


.article-item-title {
    @apply color-black text-2xl mb-2;
}

.article-item-brief {
    @apply leading-6;
    word-wrap: break-word;
    word-break: break-all;
}

.article-item-meta {
    @apply: mt-2;
}

.text--link {
    @apply mx-2 cursor-pointer decoration-none text-center block color-text-comm;
}
</style>