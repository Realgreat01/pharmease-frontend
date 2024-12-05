<template>
  <div
    class="sticky top-0 z-50 mx-auto flex h-20 items-center justify-between bg-black p-4"
  >
    <ph-logo />

    <UButton
      :ui="{ rounded: 'rounded-full', font: 'bold' }"
      class="w-48"
      block
      @click="loginUser"
      label="Get Started"
    />
  </div>
</template>

<script setup lang="ts">
// import { Menu1Icon, CloseCircleIcon } from "@placetopay/iconsax-vue/outline";
import { PH_ROUTES } from "~/constants/routes";

const router = useRouter();

const loginUser = () => router.push({ name: PH_ROUTES.LOGIN });
const registerUser = () => router.push({ name: PH_ROUTES.REGISTER });
const showMenu = ref(true);
</script>

<style scoped></style>
