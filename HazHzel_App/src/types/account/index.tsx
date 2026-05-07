export interface AccountUser {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
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
