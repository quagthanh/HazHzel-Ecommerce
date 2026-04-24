"use client";
import React, { useState, useEffect } from "react";
import { Drawer, Col, Row, Input, Empty, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import {
  SearchOutlined,
  CloseOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import styles from "@/components/common/customer/drawer/search-drawer/style.module.scss";
import logo from "@/../public/assets/test6.png";
import { SearchDrawerProps } from "@/types/interface";
import { useDebounce } from "@/utils/hooks/useDebounce";
import {
  PRODUCT_LIMIT,
  SearchCollectionResult,
  SearchProductResult,
} from "@/types/search";
import {
  getTopViewedProducts,
  searchCollections,
  searchProducts,
} from "@/services/search.api";
import CustomButton from "../../public-button";
import { ProductSkeleton } from "../../skeleton/search";

const SearchDrawer: React.FC<SearchDrawerProps> = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 500);
  const [activeTab, setActiveTab] = useState<"products" | "collections">(
    "products",
  );
  const [suggestions, setSuggestions] = useState<SearchProductResult[]>([]);
  const [products, setProducts] = useState<SearchProductResult[]>([]);
  const [collections, setCollections] = useState<SearchCollectionResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  useEffect(() => {
    if (open) {
      const fetchSuggestions = async () => {
        try {
          setSuggestionsLoading(true);
          const res = await getTopViewedProducts();
          if (res?.data) setSuggestions(res?.data);
        } catch (error) {
          console.error("Failed to fetch top viewed products", error);
        }
        setSuggestionsLoading(false);
      };
      fetchSuggestions();
    }
  }, [open, suggestions.length]);
  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setProducts([]);
      setCollections([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const [prodRes, colRes] = await Promise.all([
          searchProducts(debouncedTerm),
          searchCollections(debouncedTerm),
        ]);

        if (prodRes?.data) setProducts(prodRes.data);
        if (colRes?.data) setCollections(colRes.data);
      } catch (error) {
        console.error("Search error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedTerm]);
  useEffect(() => {
    if (!open) {
      setSearchTerm("");
    }
  }, [open]);
  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={i} style={{ color: "black", fontWeight: 700 }}>
              {part}
            </b>
          ) : (
            <span key={i} style={{ color: "#777" }}>
              {part}
            </span>
          ),
        )}
      </span>
    );
  };

  return (
    <Drawer
      open={open}
      placement="top"
      height="100vh"
      style={{ backgroundColor: "rgb(255, 251, 245)" }}
      onClose={onClose}
      closable={false}
      maskClosable={true}
    >
      <div className={styles.headerWrapper}>
        <Row align="middle" gutter={[16, 0]}>
          <Col xs={4} sm={3} md={2}>
            <div className={styles.logoContainer}>
              <Image
                src={logo}
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Col>

          <Col xs={16} sm={19} md={20}>
            <div className={styles.searchBox}>
              <SearchOutlined className={styles.searchIcon} />
              <Input
                placeholder="SEARCH"
                variant="borderless"
                className={styles.transparentInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </Col>

          <Col xs={4} sm={2} md={2} style={{ textAlign: "right" }}>
            <CloseOutlined className={styles.closeIcon} onClick={onClose} />
          </Col>
        </Row>
      </div>

      <div className={styles.contentWrapper}>
        <Row gutter={[40, 40]}>
          <Col xs={24} md={6}>
            <h4 className={styles.sectionTitle}>SUGGESTIONS</h4>
            <ul className={styles.suggestionList}>
              {suggestionsLoading ? (
                <Skeleton paragraph={{ rows: 10 }} />
              ) : (
                suggestions.map((item) => (
                  <li key={item._id} onClick={() => setSearchTerm(item.name)}>
                    {searchTerm
                      ? getHighlightedText(item.name, debouncedTerm)
                      : item.name}
                  </li>
                ))
              )}
            </ul>
          </Col>

          <Col xs={24} md={18}>
            {!debouncedTerm && !loading && (
              <div style={{ opacity: 0.5, marginTop: 50, textAlign: "center" }}>
                Start typing to see products...
              </div>
            )}
            {loading && (
              <div style={{ padding: "20px 0" }}>
                <div className={styles.tabsHeader} style={{ marginBottom: 20 }}>
                  <Skeleton.Button
                    active
                    style={{ width: 120, marginRight: 10 }}
                  />
                  <Skeleton.Button active style={{ width: 120 }} />
                </div>
                <ProductSkeleton />
              </div>
            )}
            {debouncedTerm && !loading && (
              <>
                <div className={styles.tabsHeader}>
                  <button
                    className={`${styles.tabBtn} ${
                      activeTab === "products" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("products")}
                  >
                    PRODUCTS ({products.length})
                  </button>
                  <button
                    className={`${styles.tabBtn} ${
                      activeTab === "collections" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("collections")}
                  >
                    COLLECTIONS ({collections.length})
                  </button>
                </div>

                <div className={styles.tabContent}>
                  {activeTab === "products" ? (
                    <>
                      {products.length > 0 ? (
                        <Row gutter={[20, 30]}>
                          {products.slice(0, 4).map((product) => (
                            <Col key={product._id} xs={12} sm={12} md={6}>
                              <Link
                                href={`/products/${product.slug}`}
                                onClick={onClose}
                              >
                                <div className={styles.productCard}>
                                  <div className={styles.productImage}>
                                    <Image
                                      src={
                                        product.images?.[0]?.secure_url ||
                                        "/placeholder.webp"
                                      }
                                      alt={product.name}
                                      fill
                                      sizes="(max-width: 768px) 100vw, 33vw"
                                      style={{ objectFit: "cover" }}
                                    />
                                  </div>
                                  <div className={styles.productInfo}>
                                    <p className={styles.brand}>
                                      {product.supplier}
                                    </p>
                                    <h5 className={styles.name}>
                                      {getHighlightedText(
                                        product.name,
                                        debouncedTerm,
                                      )}
                                    </h5>
                                  </div>
                                </div>
                              </Link>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <Empty
                          description="No products found"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}

                      {products.length > PRODUCT_LIMIT && (
                        <div className={styles.viewAllContainer}>
                          <Link
                            href={`/search?keyword=${debouncedTerm}`}
                            onClick={onClose}
                          >
                            <CustomButton>
                              VIEW ALL PRODUCTS ({products.length})
                              <ArrowRightOutlined />
                            </CustomButton>
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={styles.collectionsList}>
                      {collections.length > 0 ? (
                        collections.map((col) => (
                          <Link
                            href={`/collections/${col.slug}`}
                            key={col._id}
                            onClick={onClose}
                          >
                            <div className={styles.collectionItem}>
                              <h3>
                                {getHighlightedText(col.name, debouncedTerm)}
                              </h3>
                              <span>View collection &rarr;</span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <Empty
                          description="No collections found"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </Drawer>
  );
};

export default SearchDrawer;
