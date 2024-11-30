import { defineStore } from "pinia";
import { DrugService } from "~/services/drug.service";
import { OrderService } from "~/services/order.service";

interface DrugStore {
  Drugs: any[];
}

export const useDrugStore = defineStore("DrugStore", {
  state: (): DrugStore => {
    return {
      Drugs: [],
    };
  },

  getters: {
    drugs(): any {
      return this.Drugs;
    },
  },

  actions: {
    async getDrugs() {
      const res = await DrugService.drugs();
      if (res.success) {
        this.Drugs = res.data;
      }
    },
  },
  persist: true,
});
