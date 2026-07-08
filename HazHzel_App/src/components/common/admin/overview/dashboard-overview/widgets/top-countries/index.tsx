"use client";

import styles from "./style.module.scss";

// Dummy Data
const countriesData = [
  {
    id: "us",
    name: "United States",
    percent: "45%",
    amount: "$54,240",
    flag: "🇺🇸",
    color: "rgba(79, 70, 229, 1)", // bg-primary
  },
  {
    id: "uk",
    name: "United Kingdom",
    percent: "22%",
    amount: "$26,510",
    flag: "🇬🇧",
    color: "rgba(79, 70, 229, 0.8)", // bg-primary/80
  },
  {
    id: "de",
    name: "Germany",
    percent: "15%",
    amount: "$18,075",
    flag: "🇩🇪",
    color: "rgba(79, 70, 229, 0.6)", // bg-primary/60
  },
  {
    id: "ca",
    name: "Canada",
    percent: "10%",
    amount: "$12,050",
    flag: "🇨🇦",
    color: "rgba(79, 70, 229, 0.4)", // bg-primary/40
  },
  {
    id: "au",
    name: "Australia",
    percent: "8%",
    amount: "$9,555",
    flag: "🇦🇺",
    color: "rgba(79, 70, 229, 0.3)", // bg-primary/30
  },
];

const TopCountries = () => {
  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <h3>Top Countries</h3>
        <span className={styles.subtitle}>By Revenue</span>
      </div>

      {/* List */}
      <div className={styles.list}>
        {countriesData.map((item) => (
          <div key={item.id} className={styles.item}>
            <span className={styles.flag}>{item.flag}</span>

            <div className={styles.content}>
              <div className={styles.info}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.percent}>{item.percent}</span>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: item.percent,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>

            <span className={styles.amount}>{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCountries;
