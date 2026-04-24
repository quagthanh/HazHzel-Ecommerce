// "use client";

// import { Modal } from "antd";
// import Image from "next/image";
// import Link from "next/link";
// import { IProduct, IProductDetail } from "@/types/interface";
// import styles from "./style.module.scss";
// import SizeSelector from "../size-selection";
// import CustomButton from "@/components/common/customer/public-button";
// import { CloseOutlined } from "@ant-design/icons";
// import { useProductVariants } from "@/utils/hooks/useProductVariants";

// interface QuickViewModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   product: IProduct | null;
//   onAddToCart: (product: IProduct, variantId: string, quantity: number) => void;
// }

// const QuickViewModal = ({
//   isOpen,
//   onClose,
//   product,
//   onAddToCart,
// }: QuickViewModalProps) => {
//   console.log("QuickViewModal product:", product);
//   if (!product) return null;

//   const {
//     uniqueAttributes,
//     selectedOptions,
//     currentVariant,
//     handleOptionChange,
//     isOptionAvailable,
//   } = useProductVariants(product as any);

//   const formatPrice = (price: number) =>
//     new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     }).format(price);

//   const price = currentVariant
//     ? currentVariant.currentPrice
//     : product.currentPrice || 0;

//   const stock = currentVariant ? currentVariant.stock : 0;

//   const displayImage =
//     currentVariant?.images?.[0]?.secure_url ||
//     product.images?.[0]?.secure_url ||
//     "/placeholder.webp";

//   const handleAddToCartClick = () => {
//     if (currentVariant) {
//       onAddToCart(product, currentVariant._id, 1);
//     }
//   };

//   return (
//     <Modal
//       open={isOpen}
//       onCancel={onClose}
//       footer={null}
//       width={900}
//       centered
//       closeIcon={<CloseOutlined style={{ fontSize: "20px", color: "#333" }} />}
//       className={styles.quickViewModal}
//       destroyOnClose
//     >
//       <div className={styles.container}>
//         {/* Cột trái: Hình ảnh */}
//         <div className={styles.imageSection}>
//           <div className={styles.imageWrapper}>
//             <img
//               src={displayImage}
//               alt={product.name}
//               className={styles.productImage}
//             />
//           </div>
//         </div>

//         {/* Cột phải: Thông tin */}
//         <div className={styles.infoSection}>
//           <div className={styles.brand}>
//             {product.supplierId?.name || "BRAND"}
//           </div>
//           <h2 className={styles.productName}>{product.name}</h2>
//           <div className={styles.price}>{formatPrice(price)}</div>

//           {/* Selector Variants */}
//           <div className={styles.selectors}>
//             {uniqueAttributes.map((attr) => (
//               <SizeSelector
//                 key={attr.name}
//                 label={attr.name}
//                 options={attr.values}
//                 selected={selectedOptions[attr.name]}
//                 onChange={(val) => handleOptionChange(attr.name, val)}
//                 checkDisabled={(val) => !isOptionAvailable(attr.name, val)}
//               />
//             ))}
//           </div>

//           {/* Nút thao tác */}
//           <div className={styles.actions}>
//             <CustomButton
//               onClick={handleAddToCartClick}
//               disabled={!currentVariant || stock === 0}
//               className={styles.addToCartBtn} // Thêm class để override style nếu cần
//             >
//               {stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
//             </CustomButton>

//             <button className={styles.buyWithShopBtn}>
//               Buy with <span>shop</span>
//             </button>

//             <div className={styles.morePayment}>
//               <a href="#">More payment options</a>
//             </div>
//           </div>

//           <div className={styles.divider}></div>

//           {/* View Details Link */}
//           <div className={styles.viewDetails}>
//             <Link href={`/product/${product.slug}`} onClick={onClose}>
//               View details
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default QuickViewModal;
