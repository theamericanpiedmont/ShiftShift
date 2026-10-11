import Image from "next/image";
import styles from "./brand-divider.module.css";

export function BrandDivider({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div
      className={`${styles.divider} ${tone === "dark" ? styles.dark : ""}`}
      aria-hidden="true"
    >
      <span />
      <Image src="/shifty-eyes2.png" alt="" width={457} height={225} />
      <span />
    </div>
  );
}
