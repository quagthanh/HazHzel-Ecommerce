import styles from "@/components/layout/public/client-listing-layout/listing-layout.module.scss";
import FilterSidebar from "@/components/common/customer/filter-sidebar.tsx";

export default function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <FilterSidebar />
      </aside>
      <section className={styles.content}>{children}</section>
    </div>
  );
}
