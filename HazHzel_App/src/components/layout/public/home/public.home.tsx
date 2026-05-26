import Catwalk from "@/components/common/customer/catwalk";
import FeaturedBrands from "@/components/common/customer/featured-brands";
import HeroPublic from "@/components/common/customer/hero";
import MarqueeText from "@/components/common/customer/marquee-text";
import NewBrand from "@/components/common/customer/new-brand";
import ShopFavorites from "@/components/common/customer/shop-favorite";
import SkeletonProduct from "@/components/common/customer/skeleton/product";
import UnisexCollections from "@/components/common/customer/unisex-collections";
import { getHomeProductBySupplier } from "@/services/product.api";
import { getTopSuppliers } from "@/services/supplier.api";
import { Suspense } from "react";
import ShopFavoritesContainer from "./public.newbrand";
import SkeletonGrid from "@/components/common/customer/skeleton/product";
import CartInitializer from "@/utils/cartInitializer";
interface PublicHomePageProps {
  shouldClearCart: boolean;
}
const PublicHomePage = async ({ shouldClearCart }: PublicHomePageProps) => {
  let topSuppliers: any = [];
  const topSuppliersData = getTopSuppliers();
  const [resultTopSupplier] = await Promise.allSettled([topSuppliersData]);
  if (resultTopSupplier.status === "fulfilled") {
    const res = resultTopSupplier.value;
    if (res?.data) {
      topSuppliers = res.data || [];
    }
  } else {
    console.error(
      `Error when fetch top suppliers : ${resultTopSupplier.reason}`,
    );
  }
  return (
    <>
      <CartInitializer shouldClear={shouldClearCart} />
      <MarqueeText />
      <HeroPublic />
      <UnisexCollections />
      {/* <Catwalk /> */}
      <Suspense fallback={<SkeletonGrid />}>
        <ShopFavoritesContainer />
      </Suspense>
      <FeaturedBrands brands={topSuppliers} />
      <NewBrand />
    </>
  );
};

export default PublicHomePage;
