<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button class="cursor-pointer text-white bg-transparent py-0.75 px-2.5 text-sm" @click="toggleDark()">
    <span class="inline-block align-middle dark:i-carbon-moon i-carbon-sun" />
    <!-- <span class="pl-2">{{ isDark ? 'Dark' : 'Light' }}</span> -->
  </button>
</template>
