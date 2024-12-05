<template>
  <div
    class="border-brand-gray flex h-[76px] w-full items-center justify-between border-b p-4"
  >
    <h2 class="font-semibold">
      {{ getGreetings }},
      <span class="text-primary hidden text-xl font-bold lg:block">
        {{ user.firstname }} {{ user.lastname }}
      </span>
    </h2>

    <div class="flex items-start gap-4">
      <div
        class="h-10 w-10 rounded-full bg-gray-100 p-2.5"
        v-for="nav in NavbarIcons"
        :class="nav.class"
      >
        <UIcon :name="nav.icon" @click="nav.click" class="h-6 w-6" />
      </div>
    </div>

    <USlideover v-model="openNotification" :overlay="false">
      <ModalsNotifications />
    </USlideover>
    <USlideover v-model="openMenu" :overlay="false">
      <UserMenuProfile @close="openMenu = false" />
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import { useUtilsStore } from "~/store/utils.store";

const searchedTerm = ref("");
const openProfile = ref(false);
const openMenu = ref(false);
const openNotification = ref(false);

const { user } = storeToRefs(useAuthStore());

const { getGreetings } = storeToRefs(useUtilsStore());
const toggleNotification = () => {
  openNotification.value = true;
};

const toggleProfile = () => {
  openProfile.value = true;
};
const toggleMenu = () => {
  openMenu.value = true;
};

const NavbarIcons = ref([
  {
    icon: "mdi-light-bell",
    class: "",
    click: toggleNotification,
  },
  {
    icon: "solar-user-outline",
    class: "",
    click: toggleProfile,
  },
  {
    icon: "i-healthicons-ui-menu",
    class: "lg:hidden",
    click: toggleMenu,
  },
]);
</script>

<style scoped></style>
