import styles from "@/components/layout/public/client-listing-layout/collection-layout/collection-layout.module.scss";
const CollectionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>{children}</section>
    </div>
  );
};

export default CollectionLayout;
