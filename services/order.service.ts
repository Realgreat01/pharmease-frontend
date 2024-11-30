import ApiService from "./api-service.service";

export class OrderService {
  static orders = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/order",
    });
  };
}
