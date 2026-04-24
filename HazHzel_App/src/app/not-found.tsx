import Link from "next/link";
import { Button } from "antd";
import style from "@/components/common/not-found.module.scss"; // Import SCSS module

export default function NotFound() {
  const particles1 = Array.from({ length: 20 }, (_, i) => i);
  const particles2 = Array.from({ length: 20 }, (_, i) => i);

  return (
    <main className={style.notFoundContainer}>
      {particles1.map((i) => (
        <span key={`p1-${i}`} className={style.particle}>
          4
        </span>
      ))}

      {particles2.map((i) => (
        <span key={`p2-${i}`} className={style.particle}>
          0
        </span>
      ))}

      <article className={style.content}>
        <p>Oops! It looks like you have taken a wrong turn.</p>
        <p>
          The page you have looking for is not available. But do not worry,
          there are plenty of exciting products waiting for you in our store!
        </p>
        <p>
          <strong>404</strong> error — Page not found.
        </p>
        <p>
          <Link href="/">
            <Button type="default" size="large" className={style.homeButton}>
              Return to the Home
            </Button>
          </Link>
        </p>
        <p>Or, check out some of our featured categories below:</p>
        <div className={style.featuredLinks}>
          <Link href="/stores/clothing">
            <Button type="link">Product Stores</Button>
          </Link>
          <Link href="/collections/clothing">
            <Button type="link">Product Collections</Button>
          </Link>
          <Link href="/categories/clothing">
            <Button type="link">Product Categories</Button>
          </Link>
        </div>
      </article>
    </main>
  );
}
