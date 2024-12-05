<template>
  <UCard
    :ui="{
      body: {
        padding: 'px-0 py-0 sm:p-0',
      },
    }"
  >
    <div class="">
      <img
        src="/bg.jpg"
        alt=""
        class="block h-20 w-full bg-cover object-cover"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.router-link-exact-active {
  @apply bg-primary text-white;
}
</style>
