"use client";

import { useState, useMemo } from "react";
import styles from "@/components/common/customer/detail-product-page/style.module.scss";
import ThumbnailList from "../thumbnail-list";
import ProductInfo from "../product-detail-info";
import { MainImage } from "../main-detail-image";
import { IProductDetail } from "@/types/interface";
import { message } from "antd";
import { isMissingUserId } from "@/constants";
import { useCartStore } from "@/library/stores/useCartStore";

const DetailPage = ({
  product,
  userId,
}: {
  product: IProductDetail;
  userId: string;
}) => {
  const addToStoreCart = useCartStore((state) => state.addToStoreCart);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    if (product.variants && product.variants.length > 0) {
      const defaults: Record<string, string> = {};
      const firstVariant = product.variants[0].attributes;
      for (let i = 0; i < firstVariant.length; i++) {
        defaults[firstVariant[i].k] = firstVariant[i].v;
      }

      return defaults;
    }
    return {};
  });

  const uniqueAttributes = useMemo(() => {
    const options: Record<string, Set<string>> = {};
    product?.variants?.forEach((variant) => {
      variant?.attributes?.forEach((attr) => {
        if (!options[attr.k]) {
          options[attr.k] = new Set();
        }
        options[attr.k].add(attr.v);
      });
    });
    return Object.entries(options).map(([key, values]) => ({
      name: key,
      values: Array.from(values),
    }));
  }, [product]);
  const currentVariant = useMemo(() => {
    if (!product?.variants) return null;

    return (
      product.variants.find((v) =>
        v.attributes.every((attr) => selectedOptions[attr.k] === attr.v),
      ) || null
    );
  }, [selectedOptions, product]);

  const handleOptionChange = (key: string, value: string) => {
    let newOptions = { ...selectedOptions, [key]: value };

    const isValidCombination = product.variants?.some((v) =>
      v.attributes.every(
        (attr) => newOptions[attr.k] === attr.v && v.stock > 0,
      ),
    );

    if (!isValidCombination) {
      const fallbackVariant = product.variants?.find((v) =>
        v.attributes.some(
          (attr) => attr.k === key && attr.v === value && v.stock > 0,
        ),
      );

      if (fallbackVariant) {
        const newDefaults: Record<string, string> = {};
        fallbackVariant.attributes.forEach((attr) => {
          newDefaults[attr.k] = attr.v;
        });
        newOptions = newDefaults;
      }
    }

    setSelectedOptions(newOptions);
  };

  const imagesToShow = useMemo(() => {
    if (currentVariant?.images && currentVariant.images.length > 0) {
      return currentVariant.images.map((img) => img.secure_url);
    }
    if (product?.images && product.images.length > 0) {
      return product.images.map((img) => img.secure_url);
    }
    return ["/placeholder.webp"];
  }, [currentVariant, product]);
  const isOptionAvailable = (attributeName: string, value: string): boolean => {
    const matchingVariant = product.variants?.find((variant) =>
      variant.attributes.some(
        (attr) =>
          attr.k === attributeName && attr.v === value && variant.stock > 0,
      ),
    );

    return !!matchingVariant;
  };
  const handleAddToCart = async (variantId: string, quantity: number) => {
    if (!userId || userId == isMissingUserId) {
      message.warning("Please login to add items to cart");
      return;
    }

    try {
      await addToStoreCart(userId, product._id, variantId, quantity);
      message.success("Added to cart successfully!");
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Failed to add to cart");
    }
  };
  return (
    <div className={`${styles.productPage} ${styles.colorSchema}`}>
      <div className={styles.productGrid}>
        <ThumbnailList images={imagesToShow} />
        <MainImage images={imagesToShow} />
        <ProductInfo
          product={product}
          currentVariant={currentVariant}
          uniqueAttributes={uniqueAttributes}
          selectedOptions={selectedOptions}
          isOptionDisabled={(k, v) => !isOptionAvailable(k, v)}
          onOptionChange={handleOptionChange}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default DetailPage;
