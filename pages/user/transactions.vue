<template>
  <div class="">
    <div class="flex items-center justify-between py-8">
      <h2 class="text-2xl font-semibold">Nearby Pharmacy</h2>
    </div>
    <UTable :rows="activities" :columns="rows">
      <template #date-data="{ row }">
        {{ phDates.formatDate(row.date) }}
      </template>
      <template #cost-data="{ row }">
        {{ row.cost }}
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
  name: PH_ROUTES.DASHBOARD.HISTORY,
});

const activities = ref([
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

const rows = ref([
  { key: "id", label: "ID" },
  { key: "date", label: "Date" },
  { key: "activity", label: "Activity" },
  { key: "cost", label: "Cost" },
]);
</script>

<style scoped></style>
