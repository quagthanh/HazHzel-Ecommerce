// "use client";
// import styles from "@/components/common/customer/category-content/style.module.scss";
// import FilterSidebar from "../filter-sidebar.tsx";
// import { Pagination } from "antd";
// import type { PaginationProps } from "antd";

// import ProductGrid from "@/components/common/customer/product-grid";
// const MainContent = () => {
//   const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
//     current,
//     pageSize
//   ) => {};
//   return (
//     <div className={styles.container}>
//       <aside className={styles.sidebar}>
//         <FilterSidebar />
//       </aside>
//       <section className={styles.content}>
//         <div className={styles.grid}>
//           <ProductGrid />
//         </div>
//         <nav className={styles.paginationCategory}>
//           <Pagination
//             showSizeChanger
//             onShowSizeChange={onShowSizeChange}
//             defaultCurrent={3}
//             total={500}
//           />
//         </nav>
//       </section>
//     </div>
//   );
// };
// export default MainContent;
