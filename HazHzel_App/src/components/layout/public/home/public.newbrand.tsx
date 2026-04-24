import ShopFavoritesUI from "@/components/common/customer/shop-favorite";
import { getHomeProductBySupplier } from "@/services/product.api";

export default async function ShopFavoritesContainer() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await getHomeProductBySupplier();
  const products = res?.data?.result || [];

  return <ShopFavoritesUI products={products} />;
}
