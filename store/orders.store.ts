import { defineStore } from "pinia";
import { OrderService } from "~/services/order.service";
import type { Order, ProductOrder } from "~/types/order";

interface OrderStore {
  Orders: ProductOrder[];
  PaystackData: any | object;
  SelectedOrder: ProductOrder | null;
  OrderLoadingStates: {
    paystack: boolean;
  };
}

const toast = useToast();

export const useOrderStore = defineStore("OrderStore", {
  state: (): OrderStore => {
    return {
      Orders: [],
      PaystackData: {},
      SelectedOrder: null,
      OrderLoadingStates: {
        paystack: false,
      },
    };
  },

  getters: {
    orders: (state: OrderStore) => state.Orders,
    paystackData: (state: OrderStore) => state.PaystackData,
    selectedOrder: (state: OrderStore) => state.SelectedOrder,
    orderLoadingStates: (state: OrderStore) => state.OrderLoadingStates,
  },

  actions: {
    async createOrder(order: Order) {
      const res = await OrderService.createOrder(order);
      if (res.success) {
        this.getOrders();
      }
    },

    async initOrderPayment() {
      this.OrderLoadingStates.paystack = true;
      const res = await OrderService.initOrderPayment(this.selectedOrder!.id);
      if (res.success) {
        this.PaystackData = res.data;
        this.getOrders();
      } else {
        toast.add({
          title: "Payment Error",
          description: res.message,
          color: "red",
        });
      }
      this.OrderLoadingStates.paystack = false;
      return res;
    },

    async getOrders() {
      const res = await OrderService.orders();
      if (res.success) {
        this.Orders = res.data;
      }
    },

    selectOrder(order: ProductOrder) {
      this.SelectedOrder = order;
    },
  },
  persist: true,
});
