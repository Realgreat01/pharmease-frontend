import ApiService from "./api-service.service";

export class OrderService {
  static createOrder = async (order: Order) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/order",
      data: order,
    });
  };
  static initOrderPayment = async (orderId: string) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/payment/init",
      data: { orderId },
    });
  };
  static orders = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/order",
    });
  };
}
