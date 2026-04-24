"use client";

import DetailPage from "@/components/common/customer/detail-product-page";
import { IProductDetail } from "@/types/interface";
const PublicProductDetailPage = ({
  product,
  userId,
}: {
  product: IProductDetail;
  userId: string;
}) => {
  return <DetailPage product={product} userId={userId} />;
};
export default PublicProductDetailPage;
