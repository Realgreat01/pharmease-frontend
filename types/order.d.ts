interface OrderProduct {
  productId: string;
  quantity: number;
}
interface Order {
  products: OrderProduct[];
  delivery_type: "PICKUP" | "LOCAL" | string;
}

interface Price {
  amount: number;
  currency: Currency;
}

interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
}

interface Pharmacist extends User {
  role: UserTypes;
}

interface Product {
  _id: string;
  name: string;
  price: Price;
  pharmacistId: Pharmacist;
}
interface OrderedProduct {
  _id: string;
  quantity: number;
  productId: Product;
}

export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
  DISPUTED = "DISPUTED",
}

interface StatusHistoryEntry {
  status: OrderStatus;
  timestamp: string;
}

export enum OrderPaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

type DeliveryType = "PICKUP" | "DELIVERY";

interface ProductOrder {
  id: string;
  buyerId: User;
  products: OrderedProduct[];
  status: OrderStatus;
  status_history: StatusHistoryEntry[];
  payment_info: {
    status: OrderPaymentStatus;
    payment_method: string;
    transactionId: string;
    timestamp: string;
  };
  delivery_type: DeliveryType;
  createdAt: string;
  updatedAt: string;
  total_cost: Price;
}
