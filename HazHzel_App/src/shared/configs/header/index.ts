import { typeNavMenuItem } from "@/types/enum";
import { NavMenuItem } from "@/types/navbar";
export const announcements = [
  "extra 30% off sale | code EXTRA30",
  "free shipping on all orders over $99",
  "New Arrivals are here! Shop now.",
];

export const staticItemsConfig: NavMenuItem[] = [
  { type: typeNavMenuItem.STATIC, label: "Collections", href: "/collections" },
];
