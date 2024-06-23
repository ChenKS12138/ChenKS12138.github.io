<script lang="ts" setup>

useHead({
  title: '关于'
})

const go = (externalUrl: string) => {
  window.open(externalUrl, '_blank');
}

const config = {
  name: 'ChenKS',
  avatar: 'https://avatars.githubusercontent.com/u/42082890?v=4',
  intro: [
    'Enjoy Coding.',
    'Enjoy C++/JavaScript/TypeScript/Rust/Golang/Swift.',
  ]
};
</script>

<template>
  <shadow-box>
    <div class="about-container">
      <img class="avatar mb-2" :src="config.avatar" alt="avatar">
      <div class="text-3xl mb-2">{{ config.name }}</div>
      <div class="leading-loose italic" v-for="item in config.intro" :key="item">{{ item }}</div>
    </div>
    <div class="about-icon-container mt-2">
      <a class="block" target="_blank" href="https://github.com/ChenKS12138">
        <div class="i-carbon-logo-github text-2xl bg-dark dark:bg-white" />
      </a>
      <a class="block" target="_blank" href="https://twitter.com/ChenKS12138">
        <div class="i-carbon-logo-twitter text-2xl bg-dark dark:bg-white" />
      </a>
    </div>
  </shadow-box>
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