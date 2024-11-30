<template>
  <div class="grid gap-4">
    <div class="grid grid-cols-2 gap-8">
      <UCard class="grid gap-3 p-8">
        <h2 class="text-xl font-semibold">Total Spent</h2>
        <h2 class="text-2xl font-medium">NGN 298,900</h2>
      </UCard>
      <UCard class="grid gap-3 p-8">
        <h2 class="text-xl font-semibold">Wallet Balance</h2>
        <h2 class="text-2xl font-medium">NGN 88,900</h2>
      </UCard>
    </div>

    <div class="grid grid-cols-2 gap-8">
      <UCard class="flex h-[340px] flex-col items-center justify-center gap-10">
        <h2 class="font-semibold">Orders</h2>
        <p class="text-center">NO Orders Yet!</p>
        <UButton class="!h-12">Create New Order</UButton>
      </UCard>
      <UCard class="flex h-[340px] flex-col items-center justify-center gap-10">
        <h2 class="font-semibold">Consultations</h2>
        <p class="text-center">No Consultations sessions Yet!</p>
        <UButton class="!h-12">Book Session</UButton>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
  name: PH_ROUTES.DASHBOARD.HOME,
});
</script>

<style scoped></style>
