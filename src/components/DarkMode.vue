<script setup lang="ts">
import { useMyDark } from '~/composables/dark';
const [_, toggleDark] = useMyDark();
</script>

<template>
  <button class="cursor-pointer text-white bg-transparent py-0.75 px-2.5 text-sm" @click="toggleDark()">
    <span class="inline-block align-middle dark:i-carbon-moon i-carbon-sun" />
  </button>
</template>
