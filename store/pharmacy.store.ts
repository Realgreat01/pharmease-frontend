import { defineStore } from "pinia";
import { PharmacyService } from "~/services/pharmacy.service";

interface PharmacyStore {
  Pharmacies: any[];
}

export const usePharmacyStore = defineStore("PharmacyStore", {
  state: (): PharmacyStore => {
    return {
      Pharmacies: [],
    };
  },

  getters: {
    pharmacies(): any {
      return this.Pharmacies;
    },
  },

  actions: {
    async getPharmacies() {
      const res = await PharmacyService.pharmacies();
      if (res.success) {
        this.Pharmacies = res.data;
      }
    },
  },
  persist: true,
});
