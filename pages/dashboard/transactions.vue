<template>
  <div class="">
    <div class="flex items-center justify-between py-8">
      <h2 class="text-2xl font-semibold">Nearby Pharmacy</h2>
    </div>
    <ph-card>
      <div class="mb-4 grid grid-cols-4 border-b pb-4">
        <div
          class="flex items-center text-sm font-medium capitalize"
          v-for="item in Object.keys(userHistory[0]).slice(0, 4)">
          {{ item.replaceAll("_", " ") }}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="border-b text-xs capitalize" v-for="item in userHistory">
          <div class="grid grid-cols-4">
            <h2 class="">{{ item.date.toISOString() }}</h2>
            <h2 class="">{{ item.activity }}</h2>
            <h2 class="">{{ item.item }}</h2>
            <h2 class="">{{ item.cost }}</h2>
          </div>
        </div>
      </div>
    </ph-card>
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
  name: PH_ROUTES.DASHBOARD.HISTORY,
});

const userHistory = ref([
  {
    date: new Date(),
    activity: "Bought Drugs",
    item: "Paracetamol",
    cost: 5800,
  },
  {
    date: new Date(),
    activity: "Consultation",
    item: "Dr Adelati",
    cost: 2000,
  },
]);
</script>

<style scoped></style>
