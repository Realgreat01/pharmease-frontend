<template>
  <div
    class="mx-auto flex min-h-[50vh] w-11/12 items-center justify-center lg:h-[90vh]"
  >
    <p class="text-center text-3xl font-bold leading-relaxed lg:text-6xl">
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
