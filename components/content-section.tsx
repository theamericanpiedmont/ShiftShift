import type { ReactNode } from "react";
import styles from "./content-section.module.css";

type ContentSectionProps = {
  children: ReactNode;
};

export function ContentSection({ children }: ContentSectionProps) {
  return <section className={styles.section}>{children}</section>;
}
