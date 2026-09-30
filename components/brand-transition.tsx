"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ShiftyEyesVector } from "@/components/shifty-eyes-vector";
import { capabilityLinks } from "@/app/capability-routes";
import styles from "./brand-transition.module.css";

type BrandClickHandler = (event: MouseEvent<HTMLElement>, destination?: string) => void;
const TransitionContext = createContext<BrandClickHandler | null>(null);
const TOTAL_MS = 1000;
const NAVIGATE_AT_MS = 780;

export function useBrandTransitionClick() {
  return useContext(TransitionContext);
}

export function BrandEyesButton({ className }: { className: string }) {
  const onClick = useBrandTransitionClick();

  return (
    <button
      type="button"
      className={className}
      data-shifty-eyes
      aria-label="Explore a random capability"
      onClick={onClick ?? undefined}
    >
      <ShiftyEyesVector />
    </button>
  );
}

export function BrandCapabilityLink({
  href,
  className,
  children,
  ariaLabel,
  current,
}: {
  href: string;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
  current?: boolean;
}) {
  const onClick = useBrandTransitionClick();

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      aria-current={current ? "page" : undefined}
      data-current={current || undefined}
      onClick={(event) => onClick?.(event, href)}
    >
      {children}
    </Link>
  );
}

export function BrandTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const [bounds, setBounds] = useState<DOMRect | null>(null);
  const busy = useRef(false);
  const originPath = useRef<string | null>(null);
  const destinationPath = useRef<string | null>(null);
  const startedAt = useRef(0);
  const timers = useRef<number[]>([]);
  const reducedMotion = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    document.documentElement.removeAttribute("data-brand-transition");
    setPhase("idle");
    setBounds(null);
    busy.current = false;
    originPath.current = null;
    destinationPath.current = null;
  }, [clearTimers]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { reducedMotion.current = query.matches; };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!busy.current || pathname === originPath.current) return;
    if (pathname !== destinationPath.current) {
      reset();
      return;
    }
    if (reducedMotion.current) {
      reset();
      return;
    }

    setPhase("in");
    document.documentElement.dataset.brandTransition = "in";
    const remaining = Math.max(0, TOTAL_MS - (Date.now() - startedAt.current));
    timers.current.push(window.setTimeout(reset, remaining));
  }, [pathname, reset]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const onBrandClick: BrandClickHandler = (event, selectedDestination) => {
    const isAnchor = event.currentTarget instanceof HTMLAnchorElement;
    const opensNewTab = isAnchor && (event.currentTarget as HTMLAnchorElement).target === "_blank";
    if (
      event.defaultPrevented || event.button !== 0 ||
      (isAnchor && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || opensNewTab))
    ) return;
    if (busy.current) {
      event.preventDefault();
      return;
    }
    if (selectedDestination === pathname) return;

    const destination = selectedDestination ?? (pathname === "/"
      ? capabilityLinks[Math.floor(Math.random() * capabilityLinks.length)]?.href
      : "/");
    if (!destination) return;

    event.preventDefault();
    busy.current = true;
    originPath.current = pathname;
    destinationPath.current = destination;
    const prefersReducedMotion =
      reducedMotion.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      reducedMotion.current = true;
      router.push(destination);
      timers.current.push(window.setTimeout(reset, 3000));
      return;
    }

    startedAt.current = Date.now();
    clearTimers();
    const eyes = document.querySelector<HTMLElement>("[data-shifty-eyes]");
    setBounds((eyes ?? event.currentTarget).getBoundingClientRect());
    setPhase("out");
    document.documentElement.dataset.brandTransition = "out";

    timers.current.push(window.setTimeout(() => router.push(destination), NAVIGATE_AT_MS));
    timers.current.push(window.setTimeout(reset, 3000));
  };

  return (
    <TransitionContext.Provider value={onBrandClick}>
      <div className={styles.route} data-phase={phase}>{children}</div>
      {bounds && phase !== "idle" ? (
        <div
          className={styles.overlay}
          aria-hidden="true"
          style={{ left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height }}
        >
          <ShiftyEyesVector pose="sequence" replayKey={1} />
        </div>
      ) : null}
    </TransitionContext.Provider>
  );
}
