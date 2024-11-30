import PH_CONSTANTS from "~/constants";
import { PH_ROUTES } from "~/constants/routes";
import { qhSecuredLS } from "~/utils/secure-ls";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    let token = qhSecuredLS.get(PH_CONSTANTS.AUTH_TOKEN);
    if (token) {
      return true;
    } else {
      return navigateTo({ name: PH_ROUTES.LOGIN });
    }
  }
});
