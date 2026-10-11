import type { ReactNode } from "react";
import styles from "./page-shell.module.css";

type PageShellProps = {
  children: ReactNode;
  tone?: "default" | "krang";
  size?: "default" | "wide";
  flushTop?: boolean;
};

export function PageShell({ children, tone = "default", size = "default", flushTop = false }: PageShellProps) {
  return (
    <main
      className={styles.shell}
      data-tone={tone}
      data-size={size}
      data-flush-top={flushTop || undefined}
    >
      <div className={styles.inner}>{children}</div>
    </main>
  );
}
