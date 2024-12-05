<template>
  <div class="grid gap-8">
    <div class="flex items-center justify-between py-8">
      <h2 class="text-2xl font-semibold">Order History</h2>
      <UButton class="!px-8" @click="openOrderModal">Create New Order</UButton>
    </div>

    <UCard>
      <UTable :rows="orders" :columns="columns" />
    </UCard>

    <UModal v-model="isOrderModalOpen">
      <UCard>
        <USelectMenu
          searchable
          selected-icon="i-heroicons-hand-thumb-up-solid"
          v-model="selectedDrugs"
          :options="drugs"
          value-attribute="id"
          color="primary"
          option-attribute="name">
        </USelectMenu>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { PH_ROUTES } from "~/constants/routes";
import { useDrugStore } from "~/store/drugs.store";
import { useOrderStore } from "~/store/orders.store";
const { orders } = storeToRefs(useOrderStore());
const { drugs } = storeToRefs(useDrugStore());

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
  name: PH_ROUTES.DASHBOARD.ORDERS,
});

const router = useRouter();

const selectedDrugs = ref([]);

const isOrderModalOpen = ref(false);
const openOrderModal = () => {
  isOrderModalOpen.value = true;
};
const closeOrderModal = () => {
  isOrderModalOpen.value = false;
};

const columns = ref([{ key: "id", label: "ID" }]);
</script>

<style scoped></style>
