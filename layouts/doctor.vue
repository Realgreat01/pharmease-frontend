<template>
  <UContainer class="no-scrollbar relative flex">
    <LayoutsDoctorSidebar
      class="sticky top-0 hidden !w-[257px] !min-w-[257px] !max-w-[257px] lg:block"
    />
    <div class="flex-1">
      <LayoutsDoctorNavbar class="sticky top-0 z-10 bg-white" />
      <div
        class="no-scrollbar max-h-[ calc(100vh-76px)] w-full overflow-y-scroll p-4"
      >
        <slot />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { PH_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";
import { useDrugStore } from "~/store/drugs.store";
import { useOrderStore } from "~/store/orders.store";
import { usePharmacyStore } from "~/store/pharmacy.store";
const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const pharmacyStore = usePharmacyStore();
const orderStore = useOrderStore();
const drugStore = useDrugStore();

const closeModal = () => {
  router.replace({});
};

const modalController = computed(() => {
  return {
    bookSession: route.query.action === PH_ROUTES.DASHBOARD.CONSULTATIONS,
    createOrder: route.query.action === PH_ROUTES.DASHBOARD.ORDERS,
  };
});

onMounted(async () => {
  authStore.authUser();
  pharmacyStore.getPharmacies();
  orderStore.getOrders();
  drugStore.getDrugs();
});
</script>

<style scoped></style>
