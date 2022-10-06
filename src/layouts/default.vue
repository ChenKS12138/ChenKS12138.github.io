<script lang="ts" setup>
import DarkMode from '~/components/DarkMode.vue'
import { useImageColor } from '~/composables/color';

const router = useRouter();

const bgSrc = ref<string>(router.currentRoute.value.meta.coverImage as string || '/bg1.png')
const cssBgSrc = ref(`url("${bgSrc.value}")`);
const { y } = useWindowScroll();
const isCollapsed = computed(() => y.value > 30);
const navigationColor = useImageColor(bgSrc);

const links = [
    {
        to: '/',
        label: 'Home'
    },
    {
        to: '/article-list',
        label: 'Articles'
    },
    {
        to: '/about',
        label: 'About'
    },
    {
        to: '/RSS',
        label: 'RSS'
    }
]

</script>

<template>
    <header class="w-full fixed z-99">
        <div class="header-navigation  text--layout flex items-center justify-center"
            :style="{ height: isCollapsed ? '50px' : '64px', backgroundColor: isCollapsed?  navigationColor: 'transparent' }">
            <div class="flex justify-between items-center w-3xl <md:(w-full)">
                <div>
                    <router-link class="text--link" to="/">ChenKS</router-link>
                </div>
                <div class="flex text-sm font-400 items-center">
                    <router-link class="text--link" v-for="(item) in links" :key="item.to" :to="item.to">{{item.label}}
                    </router-link>
                    <DarkMode />
                </div>
            </div>
        </div>
    </header>
    <div class="w-full header-cover-bg min-h-lg"></div>
    <div class="content-container-wrapper dark:bg-dark">
        <div class="content-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.text--layout {
    @apply decoration-none font-600 text-xl text-white;
}

.text--link {
    @apply mx-2 cursor-pointer decoration-none text-white;
}

.header-navigation {
    transition: all 0.5s ease-in-out;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.header-bg {
    background-color: rgb(71, 101, 124);
}

.header-cover-bg {
    @apply relative;
    background-image: v-bind("cssBgSrc");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
}

.header-cover-bg::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
    content: "";
}

.content-container-wrapper {
    @apply <lg: text-sm;
    background-color: rgb(235, 235, 235);
}

.content-container {
    @apply min-h-2xl p-5 relative max-w-4/5 bg-white <lg: (p-2) lg: w-4xl color-text-comm dark:(color-bg-dark text-white);
    top: -80px;
    z-index: 4;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
