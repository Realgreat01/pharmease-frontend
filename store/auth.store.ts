import { defineStore } from "pinia";
import PH_CONSTANTS from "~/constants";
import { PH_ROUTES } from "~/constants/routes";
import ApiService from "~/services/api-service.service";

import { AuthService } from "~/services/auth.service";

import type {} from "~/types/";
import type { LoginPayload, SignUpPayload } from "~/types/auth";

const toast = useToast();

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
    async LoginUser(data: LoginPayload) {
      const route = useRoute();
      const router = useRouter();
      const res = await AuthService.login(data);
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

    async register(data: SignUpPayload) {
      const router = useRouter();
      const res = await AuthService.register(data);
      if (res.success) {
        const login = await AuthService.login({
          email: data.email,
          password: data.password,
        });
        if (login.success) {
          ApiService.setToken(login.data.access_token);
          PH_CONSTANTS.SET_USER_TYPE(login.data.role);
          router.replace({ name: PH_ROUTES.DASHBOARD.HOME });
        }
        toast.add({ title: "Registeration successful" });
      } else {
        toast.add({
          title: "Registration Error",
          description: res.message,
          color: "red",
        });
      }
    },

    async authUser() {
      const res = await AuthService.currentUser();
      if (res.success) {
        this.User = res.data;
      }
    },

    logout() {
      localStorage.clear();
      const router = useRouter();
      router.replace("/");
      toast.add({
        title: "Logout Successful",
        description: "User logged out successfully!",
        color: "red",
      });
    },
  },
  persist: true,
});
