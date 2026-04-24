"use client";
import { EyeOutlined } from "@ant-design/icons";
import { Form, FormInstance, UploadFile } from "antd";
import styles from "./style.module.scss";

interface ProductCardPreviewProps {
  form: FormInstance;
  dataUpdate: any;
  fileList: UploadFile[];
}

export const ProductCardPreview = ({
  form,
  dataUpdate,
  fileList,
}: ProductCardPreviewProps) => {
  // Lấy ảnh đầu tiên để hiển thị
  const currentPreviewImage =
    fileList.length > 0 ? fileList[0].url || fileList[0].preview : null;

  // Lấy giá trị real-time từ form
  const formName = Form.useWatch("name", form);

  // Hiển thị tên category: Cần xử lý logic lấy name từ ID nếu form lưu ID
  // Ở đây hiển thị tạm từ dataUpdate hoặc placeholder
  const categoryName = dataUpdate?.categoryId?.name || "Category";

  return (
    <div className={styles.previewSection}>
      <h3 className={styles.previewTitle}>
        <span className={styles.eyeIcon}>
          <EyeOutlined />
        </span>
        Product Card Preview
      </h3>

      <div className={styles.productCard}>
        <div className={styles.imageWrapper}>
          {currentPreviewImage ? (
            <img
              src={currentPreviewImage}
              alt="Product preview"
              className={styles.productImage}
            />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
          <div className={styles.heartIcon}>♡</div>
        </div>

        <div className={styles.imageIndicators}>
          {fileList.slice(0, 3).map((_, index) => (
            <span
              key={index}
              className={
                index === 0 ? styles.indicatorActive : styles.indicator
              }
            />
          ))}
        </div>

        <div className={styles.productInfo}>
          <div className={styles.price}>${dataUpdate?.price || "36.87"}</div>

          <div className={styles.productName}>
            {formName || dataUpdate?.name || "Product Name"}
          </div>

          <div className={styles.category}>{categoryName}</div>

          <div className={styles.colorOptions}>
            <span className={styles.colorBlue}></span>
            <span className={styles.colorPink}></span>
            <span className={styles.colorGreen}></span>
            <span className={styles.colorRed}></span>
          </div>

          <div className={styles.sizeOptions}>
            <span className={styles.size}>S</span>
            <span className={styles.size}>M</span>
            <span className={styles.size}>L</span>
            <span className={styles.size}>XL</span>
            <span className={styles.size}>2XL</span>
          </div>

          <button className={styles.buyButton}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardPreview;
