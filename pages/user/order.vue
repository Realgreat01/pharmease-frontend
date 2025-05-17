<template>
  <div class="grid gap-8">
    <div class="flex items-center justify-between py-8">
      <h2 class="text-2xl font-semibold">Order History</h2>

      <UButton class="!px-8" @click="isCreateOrderModalOpen = true"
        >Create New Order</UButton
      >
    </div>

    <UTable :rows="orders" :columns="columns">
      <!-- Empty state -->
      <template #empty-state>
        <div class="py-10 text-center text-gray-500">No orders found.</div>
      </template>

      <!-- Products Column -->
      <template #products-data="{ row }">
        <div class="flex flex-wrap items-center gap-2">
          <template v-for="(product, index) in row.products" :key="index">
            <UBadge variant="subtle" color="primary">{{
              product.productId.name
            }}</UBadge>
          </template>
        </div>
      </template>

      <!-- Total Cost Column -->
      <template #total_cost-data="{ row }">
        <div class="text-sm text-gray-800">
          {{
            phNumbers.formatCurrency(
              row.total_cost.amount,
              row.total_cost.currency,
            )
          }}
        </div>
      </template>

      <!-- Created At Column -->
      <template #createdAt-data="{ row }">
        <div class="text-sm text-gray-600">
          {{ phDates.getCreatedAt(row.createdAt) }}
        </div>
      </template>

      <!-- Payment Info Column -->
      <template #payment_info-data="{ row }">
        <UButton
          size="xs"
          :class="[
            'rounded-full px-3 py-1 text-sm font-medium capitalize',
            statusClasses[row.payment_info.status] ||
              'bg-gray-200 text-gray-800',
          ]"
        >
          {{ row.payment_info.status }}
        </UButton>
      </template>

      <!-- Action Column -->
      <template #action-data="{ row }">
        <div class="flex items-center gap-2">
          <UButton size="sm" icon="eye" @click="selectOrder(row)">
            View
          </UButton>
        </div>
      </template>
    </UTable>

    <UModal v-model="isPreviewOrderModalOpen">
      <UCard v-if="order">
        <!-- Header -->
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ order.buyerId.firstname }} {{ order.buyerId.lastname }}
          </h2>
          <span
            class="rounded-full px-3 py-1 text-sm font-medium capitalize"
            :class="statusClasses[order.payment_info.status]"
          >
            {{ order.payment_info.status }}
          </span>
        </div>

        <!-- Product List -->
        <div class="mb-4 space-y-4">
          <div
            v-for="item in order.products"
            :key="item._id"
            class="rounded-lg border bg-gray-50 p-3"
          >
            <div class="font-medium text-gray-900">
              {{ item.productId.name }}
            </div>
            <div class="mt-1 flex justify-between text-sm text-gray-600">
              <span>Qty: {{ item.quantity }}</span>
              <span>
                {{ item.productId.price.amount }}
                {{ item.productId.price.currency }}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="flex items-center justify-between border-t pt-4 text-sm text-gray-700"
        >
          <div class="text-lg font-semibold text-green-600">
            {{ phNumbers.formatCurrency(order.total_cost.amount, "NGN") }}
          </div>
          <div class="text-gray-500">
            {{ phDates.formatDate(order.createdAt) }}
          </div>
        </div>
        <ph-paystack class="w-full" />
      </UCard>
    </UModal>

    <UModal v-model="isCreateOrderModalOpen">
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
                v-model="delivery_type"
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
import { storeToRefs } from "pinia";
import type {
  OrderPaymentStatus,
  OrderProduct,
  ProductOrder,
} from "~/types/order";

const { orders, selectedOrder: order } = storeToRefs(useOrderStore());
const { drugs } = storeToRefs(useDrugStore());

const orderStore = useOrderStore();

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
  name: PH_ROUTES.DASHBOARD.ORDERS,
});

const isPreviewOrderModalOpen = ref(false);
const isCreateOrderModalOpen = ref(false);

const openOrderModal = () => {
  isPreviewOrderModalOpen.value = true;
};
const closeOrderModal = () => {
  isPreviewOrderModalOpen.value = false;
};

const selectOrder = (order: ProductOrder) => {
  orderStore.selectOrder(order);
  openOrderModal();
};

const statusClasses: any = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "",
};

const state = ref({
  productId: "",
  quantity: 0,
});

const delivery_type = ref("");

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
    delivery_type: delivery_type.value,
  });

  products.value = [];
  delivery_type.value = "";
  closeOrderModal();
};

const columns = ref([
  { key: "products", label: "Drug Name" },
  { key: "total_cost", label: "Amount" },
  { key: "delivery_type", label: "Delivery Service" },
  { key: "createdAt", label: "Created" },
  { key: "status", label: "Order Status" },
  { key: "payment_info", label: "Payment" },
  { key: "action", label: "Action" },
]);

const schema = Yup.object({});
</script>

<style scoped></style>
