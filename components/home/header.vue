<template>
  <div
    class="sticky top-0 z-50 mx-auto flex h-20 bg-black items-center justify-between p-4">
    <ph-logo />

    <div class="hidden items-center gap-x-4 lg:flex">
      <u-button
        :ui="{ rounded: 'rounded-full', font: 'bold' }"
        class="w-48"
        block
        @click="loginUser"
        label="Login" />

      <u-button
        class="w-48 bg-white text-primary"
        block
        font="font-semibold"
        color="black"
        variant="solid"
        :ui="{ rounded: 'rounded-full' }"
        label="Create Account"
        @click="registerUser" />
    </div>

    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
      class="w-[90 vw] absolute right-0 top-20 rounded-lg border bg-white p-10 lg:hidden">
      <div class="grid w-full items-center justify-end gap-4" v-if="showMenu">
        <u-button class="block" block @click="loginUser">Login </u-button>
        <u-button class="w-40" @click="registerUser">Create Account </u-button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
// import { Menu1Icon, CloseCircleIcon } from "@placetopay/iconsax-vue/outline";
import { PH_ROUTES } from "~/constants/routes";

const router = useRouter();

const loginUser = () => router.push({ name: PH_ROUTES.LOGIN });
const registerUser = () => router.push({ name: PH_ROUTES.REGISTER });
const showMenu = ref(false);
</script>

<style scoped></style>
