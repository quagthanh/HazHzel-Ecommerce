import {
  addToCart,
  deleteCartItem,
  getCartByUserId,
  updateCartItem,
} from "@/services/cart.api";
import { create } from "zustand";

interface CartState {
  items: any[];
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToStoreCart: (
    userId: string,
    productId: string,
    variantId: string,
    quantity: number,
  ) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await getCartByUserId();
      set({ items: res?.data?.items, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch cart in useCartStore:", error);
      set({ isLoading: false });
    }
  },

  addToStoreCart: async (userId, productId, variantId, quantity) => {
    try {
      await addToCart({
        userId,
        payload: {
          items: [{ productId, variantId, quantity }],
        },
      });

      await get().fetchCart();
    } catch (error) {
      throw error;
    }
  },

  updateQuantity: async (cartItemId, quantity) => {
    set({ isLoading: true });
    try {
      const res = await updateCartItem(cartItemId, quantity);
      set({ items: res?.data?.items, isLoading: false });
    } catch (error) {
      console.error("Failed to update cart item:", error);
      set({ isLoading: false });
    }
  },

  removeItem: async (cartItemId) => {
    set({ isLoading: true });
    try {
      const res = await deleteCartItem(cartItemId);
      set({ items: res?.data?.items, isLoading: false });
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      set({ isLoading: false });
    }
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      const price = item?.variantId?.currentPrice ?? 0;
      const quantity = item?.quantity ?? 0;
      return total + price * quantity;
    }, 0);
  },
}));
