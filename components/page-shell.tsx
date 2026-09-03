import type { ReactNode } from "react";
import styles from "./page-shell.module.css";

type PageShellProps = {
  children: ReactNode;
  tone?: "default" | "krang";
};

export function PageShell({ children, tone = "default" }: PageShellProps) {
  return (
    <main
      className={styles.shell}
      data-tone={tone}
    >
      <div className={styles.inner}>{children}</div>
    </main>
  );
}
