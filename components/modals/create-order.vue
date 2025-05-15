<template>
  <ph-modal title="Create Order">
    <div class="flex h-[300px] flex-col gap-2">
      <ph-input
        v-model="drugName"
        name="Drugs to buy"
        label="Drugs to buy"
        as="textarea"
      />
      <ph-input v-model="quantity" name="Quantity" label="Quantity" />

      <ph-button class="!h-12" @click="createOrder"> Create Order </ph-button>
    </div>
  </ph-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDrugStore } from "@/store/drugs.store";

const drugName = ref("");
const quantity = ref("");
const { drugs } = storeToRefs(useDrugStore());

const createOrder = async () => {
  const newOrder = {
    drug_name: drugName.value,
    pharmacy: "Health Pharmacy",
    quantity: quantity.value,
    amount: 10000,
    status: "Pending",
  };

  drugName.value = "";
  quantity.value = "";
};
</script>

<style scoped></style>
