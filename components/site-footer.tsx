import styles from "./site-footer.module.css";

type SiteFooterProps = {
  children: React.ReactNode;
  transitionFade?: boolean;
};

export function SiteFooter({ children, transitionFade = false }: SiteFooterProps) {
  return <footer className={styles.footer} data-transition-fade={transitionFade || undefined}>{children}</footer>;
}
