<template>
  <div class="grid gap-4">
    <div class="flex flex-wrap gap-8">
      <UCard class="w-full gap-3 p-8 lg:w-2/5">
        <h2 class="text-xl font-semibold">Total Spent</h2>
        <h2 class="text-2xl font-medium">NGN 298,900</h2>
      </UCard>
      <UCard class="w-full gap-3 p-8 lg:w-2/5">
        <h2 class="text-xl font-semibold">Wallet Balance</h2>
        <h2 class="text-2xl font-medium">NGN 88,900</h2>
      </UCard>
      <UCard class="w-full gap-3 p-8 lg:w-2/5">
        <h2 class="font-semibold">Orders</h2>
        <p class="text-centers">NO Orders Yet!</p>
        <!-- <UButton class="!h-12">Create New Order</UButton> -->
      </UCard>
      <UCard class="w-full gap-3 p-8 lg:w-2/5">
        <h2 class="font-semibold">Consultations</h2>
        <p class="text-centers">No Consultations sessions Yet!</p>
        <!-- <UButton class="!h-12">Book Session</UButton> -->
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
