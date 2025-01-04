import type { LoginPayload, SignUpPayload } from "~/types/auth";
import ApiService from "./api-service.service";

export class AuthService {
  static currentUser = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/auth/user",
    });
  };
  static login = async (data: LoginPayload) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/auth/login",
      data,
    });
  };

  static register = async (data: SignUpPayload) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/auth/signup",
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
