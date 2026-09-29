import type { ReactNode } from "react";
import styles from "./page-shell.module.css";

type PageShellProps = {
  children: ReactNode;
  tone?: "default" | "krang";
  size?: "default" | "wide";
};

export function PageShell({ children, tone = "default", size = "default" }: PageShellProps) {
  return (
    <main
      className={styles.shell}
      data-tone={tone}
      data-size={size}
    >
      <div className={styles.inner}>{children}</div>
    </main>
  );
}
