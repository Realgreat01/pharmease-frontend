interface OrderProduct {
  productId: string;
  quantity: number;
}
interface Order {
  products: OrderProduct[];
  delivery_type: "PICKUP" | "LOCAL" | string;
}
