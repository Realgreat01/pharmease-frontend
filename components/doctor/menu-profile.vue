<template>
  <div class="flex flex-1 flex-col gap-2 px-4 pt-4">
    <RouterLink
      v-for="nav in sidebar"
      :to="{ name: nav.route }"
      :class="
        route.meta.name?.includes(nav.route) ? 'router-link-exact-active' : ''
      "
      class="flex gap-x-2 rounded px-4 py-2"
    >
      <UIcon :name="nav.icon" class="icon h-5 w-5" />
      <h2 class="">{{ nav.title }}</h2>
    </RouterLink>

    <div
      class="flex gap-x-2 rounded px-4 py-2 text-rose-600"
      @click="logOutUser"
    >
      <UIcon name="mdi-light-logout" class="icon h-5 w-5" />
      <h2>Logout</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";
const route = useRoute();
const router = useRouter();

const logOutUser = async () => {};

interface Sidebar {
  title: string;
  icon: string;
  route: string;
}
const sidebar = shallowRef<Sidebar[]>([
  {
    title: "Dashboard",
    icon: "hugeicons-grid-view",
    route: PH_ROUTES.DOCTOR.DASHBOARD,
  },
  {
    title: "Consultations",
    icon: "mdi-light-cart",
    route: PH_ROUTES.DOCTOR.DASHBOARD,
  },
  {
    title: "Patients",
    icon: "fluent-video-people-32-regular",
    route: PH_ROUTES.DOCTOR.DASHBOARD,
  },
  {
    title: "Messages",
    icon: "solar-hospital-outline",
    route: PH_ROUTES.DOCTOR.DASHBOARD,
  },
  {
    title: "Transactions",
    icon: "carbon-user-activity",
    route: PH_ROUTES.DOCTOR.DASHBOARD,
  },
]);
</script>

<style scoped></style>
