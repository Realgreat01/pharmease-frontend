<template>
  <div class="grid gap-8">
    <div class="flex items-center justify-between py-8">
      <h2 class="text-2xl font-semibold">Order History</h2>
      <UButton class="!px-8" @click="openOrderModal">Create New Order</UButton>
    </div>

    <UTable :rows="orders" :columns="columns">
      <template #empty-state></template>
      <template #products-data="{ row }">
        <div class="flex-wrap gap-2 flex items-center">
          <template v-for="{ productId } in row.products">
            <UBadge>{{ productId.name }}</UBadge>
          </template>
        </div>
      </template>
      <template #total_cost-data="{ row }">
        <div class="flex items-center gap-2">
          {{
            phNumbers.formatCurrency(
              row.total_cost.amount,
              row.total_cost.currency,
            )
          }}
        </div>
      </template>
      <template #createdAt-data="{ row }">
        <div class="flex items-center gap-2">
          {{ phDates.getCreatedAt(row.createdAt) }}
        </div>
      </template>
    </UTable>

    <UModal v-model="isOrderModalOpen">
      <UCard>
        <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
          <UForm
            :state="state"
            :schema="schema"
            class="grid gap-2"
            @submit.prevent="handleSubmit($event, createOrder)"
          >
            <UFormGroup label="Drug Name">
              <USelectMenu
                searchable
                v-model="state.productId"
                :options="drugs"
                color="primary"
                optionAttribute="name"
                value-attribute="id"
                size="lg"
              />
            </UFormGroup>

            <UFormGroup label="Quantity">
              <UInput v-model.number="state.quantity" />
            </UFormGroup>

            <div class="mb-5 flex gap-2">
              <div class="" v-for="(product, index) in products">
                <UBadge
                  color="pink"
                  class="cursor-pointer hover:!bg-purple-800"
                  @click="products.splice(index, 1)"
                >
                  {{
                    drugs.find((drug: any) => drug.id === product.productId)
                      .name
                  }}
                  {{ product.quantity }}
                </UBadge>
              </div>
            </div>
            <UButton
              label="Add More"
              color="black"
              block
              class="ml-auto w-1/3"
              v-if="state.productId && state.quantity"
              @click="addMoreProducts(state)"
            />
            <UFormGroup label="Delivery Type">
              <USelectMenu
                searchable
                v-model="order.delivery_type"
                :options="['PICKUP', 'LOCAL']"
                color="primary"
                size="lg"
              />
            </UFormGroup>

            <UButton
              label="Place Order"
              block
              type="submit"
              :loading="isSubmitting"
              :disabled="Object.keys(errors).length !== 0 || isSubmitting"
            />
          </UForm>
        </VeeForm>
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
import { quartersInYear } from "date-fns/constants";

const { orders } = storeToRefs(useOrderStore());
const { drugs } = storeToRefs(useDrugStore());
const { pharmacies } = storeToRefs(usePharmacyStore());

const orderStore = useOrderStore();

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
  name: PH_ROUTES.DASHBOARD.ORDERS,
});

const router = useRouter();

const selectedDrugs = ref([]);

const state = ref({
  productId: "",
  quantity: 0,
});

const order = ref({
  delivery_type: "",
});

const isOrderModalOpen = ref(false);
const openOrderModal = () => {
  isOrderModalOpen.value = true;
};
const closeOrderModal = () => {
  isOrderModalOpen.value = false;
};

const products = ref<OrderProduct[]>([]);

const addMoreProducts = (order: OrderProduct) => {
  const product = products.value.find(
    (product) => product.productId === order.productId,
  );
  if (product) {
    product.quantity = order.quantity;
  } else products.value.push(order);

  state.value = {
    productId: "",
    quantity: 0,
  };
};

const createOrder = async () => {
  addMoreProducts(state.value);
  await orderStore.createOrder({
    products: products.value,
    delivery_type: order.value.delivery_type,
  });

  products.value = [];
  order.value.delivery_type = "";
  closeOrderModal();
};

const columns = ref([
  { key: "products", label: "Drug Name" },
  { key: "total_cost", label: "Amount" },
  { key: "delivery_type", label: "Delivery Service" },
  { key: "createdAt", label: "Order Time" },
  { key: "status", label: "Order Status" },
  { key: "action", label: "Action" },
]);

const schema = Yup.object({});
</script>

<style scoped></style>
