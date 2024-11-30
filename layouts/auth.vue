<template>
  <div class="flex items-center justify-center">
    <div class="bg-neutral -darkCharcoal h-screen flex-1">
      <img src="/auth.svg" alt="" class="w-3/4" />
    </div>
    <div
      class="flex h-screen w-[600px] flex-col items-center justify-center gap-8 border-l p-4"
    >
      <ph-logo mode="dark" />
      <div class="flex flex-col items-center justify-center gap-2">
        <h2 class="text-2xl font-semibold">{{ route.meta?.title }}</h2>
        <h2 class="text-sm font-medium">{{ route.meta?.pageHint }}</h2>
      </div>

      <div class="hide-scrollbar max-h-[60%] w-full overflow-scroll">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
