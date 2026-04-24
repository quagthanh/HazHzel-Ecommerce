import { auth } from "@/auth";
import PublicProductDetailPage from "@/components/layout/public/client-detail-product/public.detail.product";
import { isMissingUserId } from "@/constants";
import { getDetailProduct } from "@/services/product.api";
import { ListPageProps } from "@/types/interface";

const ProductDetailPage = async ({ params }: ListPageProps) => {
  const session = await auth();
  const userId = session?.user?._id || isMissingUserId;
  const { slug } = params;
  const state = { color: "", size: "" };
  let productData: any = [];
  try {
    const res = await getDetailProduct(slug, state);
    if (res?.data) {
      productData = res.data;
    }
  } catch (error) {
    console.error("Fetch detail product error:", error);
  }
  if (!productData) return <div>Product not found</div>;
  return <PublicProductDetailPage product={productData} userId={userId} />;
};
export default ProductDetailPage;
