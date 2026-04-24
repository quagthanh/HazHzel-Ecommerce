"use client";
import {
  FacebookOutlined,
  InstagramOutlined,
  PinterestOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import styles from "@/components/common/customer/public-footer/style.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo + About + Social */}
        <div className={styles.col}>
          <h2 className={styles.logo}>HazHzel</h2>
          <p>
            Gravida massa volutpat aenean odio. Amet, turpis erat nullam
            fringilla elementum diam in. Nisi, purus vitae, ultrices nunc. Sit
            ac sit suscipit hendrerit.
          </p>
          <div className={styles.socials}>
            <FacebookOutlined />
            <TwitterOutlined />
            <YoutubeOutlined />
            <PinterestOutlined />
            <InstagramOutlined />
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h3>QUICK LINKS</h3>
          <ul>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>SERVICES</li>
            <li>SINGLE ITEM</li>
            <li>CONTACT</li>
          </ul>
        </div>

        {/* Help & Info */}
        <div className={styles.col}>
          <h3>HELP & INFO</h3>
          <ul>
            <li>TRACK YOUR ORDER</li>
            <li>RETURNS + EXCHANGES</li>
            <li>SHIPPING + DELIVERY</li>
            <li>CONTACT US</li>
            <li>FIND US EASY</li>
            <li>FAQS</li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h3>CONTACT US</h3>
          <p>Do you have any questions or suggestions?</p>
          <p>
            <strong>contact@yourcompany.com</strong>
          </p>
          <p>Do you need support? Give us a call.</p>
          <p>
            <strong>+43 720 11 52 78</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
