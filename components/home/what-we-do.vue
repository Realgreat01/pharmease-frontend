<template>
  <div class="grid gap-10 my-10 lg:grid-cols-3">
    <u-card class="h-72" v-for="feature in features">
      <u-icon :name="feature.icon" class="h-20 block text-primary w-20" />
      <h2 class="font-semibold my-2">{{ feature.label }}</h2>
      <p class="">{{ feature.description }}</p>
    </u-card>
  </div>
</template>

<script setup lang="ts">
const features = ref([
  {
    label: "Patients",
    icon: "i-healthicons-man",
    description:
      "Connect with healthcare providers instantly, get personalized care, and avoid waiting times at hospitals with quick access to virtual consultations.",
  },
  {
    label: "Pharmacy",
    icon: "i-healthicons-pharmacy",
    description:
      "Find and order medications from nearby pharmacies with ease. Access a variety of healthcare products, all available for convenient home delivery.",
  },
  {
    label: "Doctors",
    icon: "i-healthicons-doctor",
    description:
      "Schedule online consultations with certified doctors, view their profiles, and receive medical advice from the comfort of your home.",
  },
]);
</script>

<style scoped></style>
