<template>
  <div class="flex flex-1 flex-col gap-2 px-4 pt-4">
    <RouterLink
      v-for="nav in sidebar"
      :to="{ name: nav.route }"
      @click="$emit('close')"
      :class="
        route.meta.name?.includes(nav.route) ? 'router-link-exact-active' : ''
      "
      class="flex gap-x-2 rounded px-4 py-2"
    >
      <UIcon :name="nav.icon" class="icon h-5 w-5" />
      <h2 class="">{{ nav.title }}</h2>
    </RouterLink>

    <div
      class="flex cursor-pointer gap-x-2 rounded px-4 py-2 text-rose-600"
      @click="authStore.logout"
    >
      <UIcon name="mdi-light-logout" class="icon h-5 w-5" />
      <h2>Logout</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";
defineEmits(["close"]);

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

interface Sidebar {
  title: string;
  icon: string;
  route: string;
}
const sidebar = shallowRef<Sidebar[]>([
  {
    title: "Dashboard",
    icon: "hugeicons-grid-view",
    route: PH_ROUTES.DASHBOARD.HOME,
  },
  {
    title: "Orders",
    icon: "mdi-light-cart",
    route: PH_ROUTES.DASHBOARD.ORDERS,
  },
  {
    title: "Consultations",
    icon: "fluent-video-people-32-regular",
    route: PH_ROUTES.DASHBOARD.CONSULTATIONS,
  },
  {
    title: "Pharmacy NearBy",
    icon: "solar-hospital-outline",
    route: PH_ROUTES.DASHBOARD.NEARBY,
  },
  {
    title: "Transactions",
    icon: "carbon-user-activity",
    route: PH_ROUTES.DASHBOARD.HISTORY,
  },
]);
</script>

<style scoped lang="scss">
.router-link-exact-active {
  @apply bg-primary text-white;
}
</style>
