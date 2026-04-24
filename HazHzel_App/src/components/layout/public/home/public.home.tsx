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

const PublicHomePage = async () => {
  let topSuppliers: any = [];
  const topSuppliersData = getTopSuppliers();
  const [resultTopSupplier] = await Promise.allSettled([topSuppliersData]);
  if (resultTopSupplier.status === "fulfilled") {
    const res1 = resultTopSupplier.value;
    if (res1?.data) {
      topSuppliers = res1.data || [];
    }
  } else {
    console.error(
      `Error when fetch top suppliers : ${resultTopSupplier.reason}`,
    );
  }
  return (
    <>
      <HeroPublic />
      <UnisexCollections />
      <Catwalk />

      <MarqueeText />
      <FeaturedBrands brands={topSuppliers} />
      <Suspense fallback={<SkeletonGrid />}>
        <ShopFavoritesContainer />
      </Suspense>
      <NewBrand />
    </>
  );
};

export default PublicHomePage;
