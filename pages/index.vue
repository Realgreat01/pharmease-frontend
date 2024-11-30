<template>
  <div>
    <home-header />
    <UContainer class="flex flex-col gap-y-10">
      <home-hero />
      <home-what-we-do />
      <home-faq />
    </UContainer>
    <home-footer />
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";

definePageMeta({
  name: PH_ROUTES.HOME,
});
</script>

<style scoped></style>
