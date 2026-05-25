export interface AccountUser {
  name: string;
  email: string;
  phone: string;
}

export interface AccountData {
  user: AccountUser;
  latestOrder: Order | null;
}

export interface UserProfile {
  email: string;
  title: "MR" | "MRS" | "MS";
  firstName: string;
  lastName: string;
  phoneCode: string;
  phoneNumber: string;
  birthdate?: string;
  newsletterSubscribed: boolean;
  smsSubscribed: boolean;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  apt?: string;
  city: string;
  zip: string;
  state: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod = "BANK_TRANSFER" | "COD" | "CREDIT_CARD" | "MOMO";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface ShippingAddress {
  _id: string;
  name: string;
  street: string;
  ward: string;
  city: string;
  country?: string;
  zipCode?: string;
  phone: string;
  typeAddress: "HOMEADDRESS" | "WORKADDRESS";
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  method: PaymentMethod;
  status: PaymentStatus;
  paymentDate: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  subTotal: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  shippingCost: number;
  discount: string | null;
  status: OrderStatus;
  payment: Payment;
  createdAt: string;
  updatedAt: string;
}
