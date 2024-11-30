import { defineStore } from "pinia";
import PH_CONSTANTS from "~/constants";
import { PH_ROUTES } from "~/constants/routes";
import ApiService from "~/services/api-service.service";

import { AuthService } from "~/services/auth.service";

import type {} from "~/types/";
import type { LOGIN_PAYLOAD } from "~/types/auth";

interface UserAuth {
  User: any;
}

export const useAuthStore = defineStore("AuthStore", {
  state: (): UserAuth => {
    return {
      User: {},
    };
  },

  getters: {
    user(): any {
      return this.User;
    },
  },

  actions: {
    async LoginUser(data: LOGIN_PAYLOAD) {
      const toast = useToast();
      const route = useRoute();
      const router = useRouter();
      const res = await AuthService.login(data);
      console.log(res);
      if (res.success) {
        ApiService.setToken(res.data.access_token);
        PH_CONSTANTS.SET_USER_TYPE(res.data.role);
        toast.add({ title: "Login Successful" });
        if (route.redirectedFrom) {
          router.replace({ path: route.redirectedFrom.fullPath });
        } else router.replace({ name: PH_ROUTES.DASHBOARD.HOME });
      } else
        toast.add({
          title: res.message ?? "Invalid Credentials",
          color: "red",
        });
    },

    async authUser() {
      const res = await AuthService.currentUser();
      if (res.success) {
        this.User = res.data;
      }
    },
  },
  persist: true,
});
