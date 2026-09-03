import styles from "./site-footer.module.css";

type SiteFooterProps = {
  children: React.ReactNode;
};

export function SiteFooter({ children }: SiteFooterProps) {
  return <footer className={styles.footer}>{children}</footer>;
}
