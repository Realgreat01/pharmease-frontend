<template>
  <DoctorDashboard />
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";

definePageMeta({
  name: PH_ROUTES.DOCTOR.DASHBOARD,
  layout: "doctor",
  middleware: "auth",
});
</script>

<style scoped></style>
