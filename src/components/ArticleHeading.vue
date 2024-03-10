<script lang="ts" setup>
import { Heading } from '~/utils/types';

const { headings, prefix } = defineProps<{
    prefix?: string,
    headings: Heading[],
}>();

const computedPrefix = computed(() => prefix ? prefix + '.' : '');

</script>

<template>
    <ol class="article-heading">
        <li v-for="(item, index) in headings" :key="item.title">
            <a :href="'#' + item.title"><span class="article-heading-title">{{ computedPrefix + (index + 1) }}. {{
                item.title
            }}</span></a>
            <article-heading v-if="item.children.length" :headings="item.children" :prefix="String(index + 1)" />
        </li>
    </ol>
</template>


<style scoped>
.article-heading a {
    color: initial;
    text-decoration: initial;
}

ol.article-heading {
    margin: 0px 0;
    padding: 0;
    list-style: inside none;
}

ol.article-heading li {
    margin: 0px;
    padding: 0px;
    text-indent: -1em;
    margin-left: 1em;
    line-height: 1.8rem;

}

.article-heading-title {
    cursor: pointer;
}

.article-heading-title:hover {
    text-decoration: underline dashed;
}
</style>