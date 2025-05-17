<template>
  <div>
    <UButton
      @click="createOrder"
      :loading="orderLoadingStates.paystack"
      class="!w-full px-8 py-4 font-semibold"
    >
      <div class="">Pay</div>
    </UButton>

    <paystack
      ref="paystackButton"
      buttonClass="hidden"
      buttonText="Pay Online"
      v-bind="paymentData"
      :onSuccess="onSuccessfulPayment"
      :onCanel="onCancelledPayment"
    ></paystack>
  </div>
</template>
<script setup lang="ts">
import paystack from "vue3-paystack";
import { useOrderStore } from "~/store/orders.store";

const emit = defineEmits(["success", "failed"]);

const { paystackData, orderLoadingStates } = storeToRefs(useOrderStore());
const orderStore = useOrderStore();

const paymentData = computed(() => {
  return {
    ...paystack.value?.customer,
    email: paystackData.value?.customer?.email,
    amount: paystackData.value?.amount,
    customer: paystackData.value?.customer,
    currency: "NGN",
    reference: paystackData.value.reference,
    publicKey: paystackData.value.publicKey,
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "Name",
          value: paystackData.value?.customer?.name ?? "User",
        },
      ],
    },
  };
});

const paystackButton = ref<HTMLButtonElement | undefined>();

function onSuccessfulPayment() {
  emit("success");
}

function onCancelledPayment() {
  emit("failed");
}

const createOrder = async () => {
  const res = await orderStore.initOrderPayment();
  if (res.success) {
    setTimeout(() => {
      (paystackButton.value as any)?.$el?.click();
    }, 1000);
  }
  console.log({ paystackRef: paystackData.value.reference });
};
</script>
