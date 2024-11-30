import { defineStore } from "pinia";
import PH_CONSTANTS from "~/constants";
import { PH_ROUTES } from "~/constants/routes";
import ApiService from "~/services/api-service.service";
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
