<template>
  <div class="h-[90vh] flex mx-auto items-center justify-center w-11/12">
    <p class="text-5xl lg:text-6xl font-bold leading-relaxed text-center">
      Connecting <span class="text-primary font-bold">Patients</span> to
      <span class="text-primary font-bold">Pharmacists</span> &
      <span class="text-primary font-bold">Doctors</span> in Minutes
    </p>
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";
const router = useRouter();
const registerUser = () => router.push({ name: PH_ROUTES.REGISTER });
</script>

<style scoped></style>
