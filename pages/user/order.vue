<template>
  <div class="grid gap-8">
    <div class="flex items-center justify-between py-8">
      <h2 class="text-2xl font-semibold">Order History</h2>
      <UButton class="!px-8" @click="openOrderModal">Create New Order</UButton>
    </div>

    <UTable :rows="orders" :columns="columns" />

    <UModal v-model="isOrderModalOpen">
      <UCard>
        <UForm :state="state" :schema="schema" class="grid gap-2">
          <UFormGroup label="Drug Name">
            <UInput />
          </UFormGroup>

          <UFormGroup label="Quantity">
            <UInput />
          </UFormGroup>
          <UFormGroup label="Drug Strength ">
            <UInput />
          </UFormGroup>
          <UFormGroup label="Dosage Form">
            <USelectMenu
              searchable
              v-model="state.dosage_form"
              :options="Object.values(DosageForm)"
              color="primary"
              size="lg"
            >
            </USelectMenu>
          </UFormGroup>
          <UFormGroup label="Delivery Pharmacy">
            <USelectMenu
              searchable
              :options="pharmacies"
              v-model="state.pharmacy"
              value-attribute="id"
              color="primary"
              size="lg"
              option-attribute="name"
            >
            </USelectMenu>
          </UFormGroup>
          <UButton label="Place Order" block />
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Form as VeeForm } from "vee-validate";
import * as Yup from "yup";
import { PH_ROUTES } from "~/constants/routes";
import { useDrugStore } from "~/store/drugs.store";
import { useOrderStore } from "~/store/orders.store";
import { usePharmacyStore } from "~/store/pharmacy.store";
import { DosageForm } from "~/types/drugs";

const { orders } = storeToRefs(useOrderStore());
const { drugs } = storeToRefs(useDrugStore());
const { pharmacies } = storeToRefs(usePharmacyStore());

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

const columns = ref([
  { key: "id", label: "ID" },
  { key: "drugName", label: "Drug Name" },
  { key: "amount", label: "Amount" },
  { key: "pharmacist", label: "Pharmacist" },
  { key: "delivery", label: "Delivery Service" },
  { key: "order_time", label: "Order Time" },
  { key: "status", label: "Order Status" },
  { key: "delivery", label: "Delivery Time" },
]);

const state = ref({
  dosage_form: "",
  pharmacy: "",
});

const schema = Yup.object({
  email: ValidationRules.userDetails.email,
  firstname: ValidationRules.userDetails.firstname,
  lastname: ValidationRules.userDetails.lastname,
  username: ValidationRules.userDetails.username,
  phone_number: ValidationRules.userDetails.phone_number,
});
</script>

<style scoped></style>
