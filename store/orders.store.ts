import { defineStore } from "pinia";
import PH_CONSTANTS from "~/constants";
import { PH_ROUTES } from "~/constants/routes";
import ApiService from "~/services/api-service.service";
import { OrderService } from "~/services/order.service";
import { PharmacyService } from "~/services/pharmacy.service";

interface OrderStore {
  Orders: any[];
}

export const useOrderStore = defineStore("OrderStore", {
  state: (): OrderStore => {
    return {
      Orders: [],
    };
  },

  getters: {
    orders(): any {
      return this.Orders;
    },
  },

  actions: {
    async getOrders() {
      const res = await OrderService.orders();
      if (res.success) {
        this.Orders = res.data;
      }
    },
  },
  persist: true,
});
