<script lang="ts" setup>

useHead({
  title: 'About'
})

const go = (externalUrl: string) => {
  window.open(externalUrl, '_blank');
}

const config = {
  name: 'ChenKS',
  avatar: 'https://avatars.githubusercontent.com/u/42082890?v=4',
  intro: [
    'Enjoy JavaScript/TypeScript/Rust/Golang.',
    'Enjoy Coding.'
  ],
  links: [

    {
      name: "xichi",
      avatar: "https://avatars3.githubusercontent.com/u/48639990?s=460&v=4",
      link: "https://blog.xichi.xyz/",
    },
    {
      name: "yizero",
      avatar: "https://avatars3.githubusercontent.com/u/45324620?s=460&v=4",
      link: "https://yizero10.github.io/",
    },
    {
      name: "pikanglong",
      avatar: "https://avatars1.githubusercontent.com/u/26516046?s=400&v=4",
      link: "https://www.pikanglong.com/",
    },
    {
      name: "X3ZvaWQ",
      avatar: "https://avatars3.githubusercontent.com/u/47066861?s=460&v=4",
      link: "http://blog.x3zvawq.xyz",
    },
    {
      name: "0xfaner",
      avatar: "https://avatars2.githubusercontent.com/u/44130614?s=460&v=4",
      link: "https://blog.0xfaner.site",
    },
    {
      name: "yiayaz",
      avatar: "https://avatars0.githubusercontent.com/u/44493388?s=460&v=4",
      link: "https://yiayaz.github.io/",
    },
    {
      name: "Brethland",
      avatar:
        "https://avatars0.githubusercontent.com/u/44054691?s=400&u=9dcfe768ad2ce2b45a06e809dd283b36fd7a7b47&v=4",
      link: "http://www.yuki.systems/",
    },
    {
      name: "xjzsq",
      avatar: "https://avatars0.githubusercontent.com/u/13806783?s=460&v=4",
      link: "http://xjzsq.ren/",
    },
    {
      name: "baiyecha404",
      avatar:
        "https://avatars2.githubusercontent.com/u/43843620?s=460&u=abdb1e7400fc7415c5208530e2c4ebe4ab8a2bba&v=4",
      link: "https://bycsec.top",
    },
  ]

};
</script>

<template>
  <div class="about-container">
    <img class="avatar mb-2" :src="config.avatar" alt="avatar">
    <div class="text-3xl mb-2">{{config.name}}</div>
    <div class="leading-loose italic" v-for="item in config.intro" :key="item">{{item}}</div>
  </div>
  <div class="about-icon-container mt-2">
    <a class="block" target="_blank" href="https://github.com/ChenKS12138">
      <div class="i-carbon-logo-github text-2xl bg-dark dark:bg-white" />
    </a>
    <a class="block" target="_blank" href="https://twitter.com/ChenKS12138">
      <div class="i-carbon-logo-twitter text-2xl bg-dark dark:bg-white" />
    </a>
  </div>
  <div class="about-divider border-t dark:border-white"></div>
  <div class="links-title">Links</div>
  <div class="about-link-container">
    <div class="flex items-center my-2 mx-1 cursor-pointer" v-for="item in config.links" @click="go(item.link)">
      <img class="h-8 w-8 rounded-1\/2" :src="item.avatar" alt="">
      <span class="text-sm ml-1">{{item.name}}</span>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  @apply flex flex-col items-center;
  margin-top: -8rem;
}

.about-icon-container {
  @apply flex justify-center;
}

.avatar {
  @apply h-40;
  border-radius: 50%;
}

.about-divider {
  @apply my-2;
}

.links-title {
  @apply text-xl text-center font-bold;
}

.about-link-container {
  @apply flex flex-wrap justify-center;
}
</style>