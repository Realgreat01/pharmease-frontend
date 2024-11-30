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
import { ref } from 'vue';
import { getDatabase, ref as dbRef, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const drugName = ref('');
const quantity = ref('');

const createOrder = async () => {
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const ordersRef = dbRef(db, `orders/${user.uid}`);

    const newOrder = {
      drug_name: drugName.value,
      pharmacy: 'Health Pharmacy',
      quantity: quantity.value,
      amount: 10000,
      status: 'Pending',
    };

    await push(ordersRef, newOrder);

    drugName.value = '';
    quantity.value = '';
  } else {
    console.error('User is not authenticated');
  }
};
</script>

<style scoped></style>
