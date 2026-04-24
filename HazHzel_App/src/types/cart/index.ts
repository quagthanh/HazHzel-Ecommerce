export interface AddToCartDTO {
  userId: string;
  payload: {
    items: {
      productId: string;
      variantId: string;
      quantity: number;
    }[];
  };
}
