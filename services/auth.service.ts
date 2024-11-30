import type { LOGIN_PAYLOAD, REGISTER_USER_PAYLOAD } from "~/types/auth";
import ApiService from "./api-service.service";

export class AuthService {
  static currentUser = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/auth/user",
    });
  };
  static login = async (data: LOGIN_PAYLOAD) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/auth/login",
      data,
    });
  };

  static register = async (data: REGISTER_USER_PAYLOAD) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/auth/register",
      data,
    });
  };

  static forgotPassword = async (data: { email: string }) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/auth/forgot-password",
      data,
    });
  };
}
