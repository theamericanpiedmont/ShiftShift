"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "@/app/page.module.css";

type HomeHorizontalScrollerProps = {
  children: ReactNode;
  label: string;
  className: string;
};

export function HomeHorizontalScroller({ children, label, className }: HomeHorizontalScrollerProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setCanScrollBack(rail.scrollLeft > 1);
    setCanScrollForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.78, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className={styles.scroller}>
      <div className={styles.scrollerControls} role="group" aria-label={`${label} controls`}>
        <button type="button" aria-label={`Scroll ${label} backward`} disabled={!canScrollBack} onClick={() => scroll(-1)}>
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" aria-label={`Scroll ${label} forward`} disabled={!canScrollForward} onClick={() => scroll(1)}>
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div ref={railRef} className={className} tabIndex={0} role="region" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
