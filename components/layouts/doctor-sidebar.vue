<template>
  <div class="border-brand-gray flex h-screen w-[257px] flex-col border-r">
    <div class="border-brand-gray sticky top-0 h-[76px] border-b p-4">
      <ph-logo mode="dark" />
    </div>
    <DoctorMenuProfile />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.router-link-exact-active {
  @apply bg-primary text-white;
}
</style>
