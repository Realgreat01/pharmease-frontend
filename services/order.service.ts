import ApiService from "./api-service.service";

export class OrderService {
  static createOrder = async (order: Order) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/order",
      data: order,
    });
  };
  static orders = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/order",
    });
  };
}
