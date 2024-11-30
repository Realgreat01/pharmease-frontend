import { defineStore } from "pinia";
import PH_CONSTANTS from "~/constants";
import { PH_ROUTES } from "~/constants/routes";
import ApiService from "~/services/api-service.service";

interface Utils {}

export const useUtilsStore = defineStore("UtilsStore", {
  state: (): Utils => {
    return {};
  },

  getters: {
    getGreetings() {
      const hour = new Date().getHours();
      if (hour <= 12) return "Good Morning";
      if (hour > 12 && hour < 15) return "Good Afternoon";
      if (hour > 15) return "Good Evening";
    },
  },

  actions: {},
  persist: true,
});
