<template>
  <div class="flex items-center justify-between gap-2 justify-full w-full">
    <UCard v-for="data in summary" :color="data.color" class="flex-1">
      <UButton
        :padded="false"
        :color="data.color"
        :label="data.title"
        variant="ghost" />
      <UBadge class="block w-fit" square :color="data.color" variant="soft">{{
        data.count
      }}</UBadge>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface SummaryData {
  title: string;
  count: number;
  change: number;
  duration: "week" | "year";
  color: "primary" | "blue" | "green" | "orange" | "red";
}
const summary = ref<SummaryData[]>([
  {
    title: "Appointment",
    count: 320,
    change: 30,
    duration: "week",
    color: "primary",
  },
  {
    title: "Patients",
    count: 247,
    change: 20,
    duration: "week",
    color: "blue",
  },
  {
    title: "Urgent",
    count: 420,
    change: 34.5,
    duration: "week",
    color: "orange",
  },
  {
    title: "Cancelled",
    count: 473,
    change: 30,
    duration: "week",
    color: "red",
  },
]);
</script>

<style scoped></style>
