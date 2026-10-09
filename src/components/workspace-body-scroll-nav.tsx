"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode
} from "react";
import { animate, type AnimationPlaybackControls } from "motion";
import { motion, useDragControls } from "motion/react";
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";
import styles from "./workspace-body-scroll-nav.module.css";

const SCROLL_DURATION = 0.55;
const SCROLL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clampScroll(scroller: HTMLElement, next: number): number {
  const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
  return Math.min(max, Math.max(0, next));
}

function canScrollY(el: HTMLElement): boolean {
  return el.scrollHeight - el.clientHeight > 2;
}

/**
 * Prefer marked desk panels / visible tabpanels / nested overflow areas,
 * then fall back to the outer Workspace scroller.
 */
function resolveScrollTarget(root: HTMLElement): HTMLElement {
  const marked = root.querySelectorAll<HTMLElement>("[data-ws-body-scroll]");
  for (const el of marked) {
    if (el.offsetParent === null && getComputedStyle(el).position !== "fixed") continue;
    if (canScrollY(el)) return el;
  }

  const tabpanel = root.querySelector<HTMLElement>(".ops-stu2-tabpanel:not([hidden])");
  if (tabpanel) {
    const nested = tabpanel.querySelectorAll<HTMLElement>("*");
    let best: HTMLElement | null = null;
    let bestOverflow = 0;
    for (const el of nested) {
      const style = getComputedStyle(el);
      if (!/(auto|scroll)/.test(style.overflowY)) continue;
      const overflow = el.scrollHeight - el.clientHeight;
      if (overflow > bestOverflow) {
        bestOverflow = overflow;
        best = el;
      }
    }
    if (best && bestOverflow > 2) return best;
    if (canScrollY(tabpanel)) return tabpanel;
  }

  const candidates = root.querySelectorAll<HTMLElement>("*");
  let best: HTMLElement | null = null;
  let bestOverflow = 0;
  for (const el of candidates) {
    if (el === root) continue;
    const style = getComputedStyle(el);
    if (!/(auto|scroll)/.test(style.overflowY)) continue;
    const overflow = el.scrollHeight - el.clientHeight;
    if (overflow > bestOverflow) {
      bestOverflow = overflow;
      best = el;
    }
  }
  if (best && bestOverflow > 2) return best;

  return root;
}

/**
 * WS-CHROME-FIX QC — Ops-style ◀ · grip · ▶ body page scroll dock.
 * Pages that scroll inside a panel (Desk Comments / Reviews / …) still page via this dock.
 */
export function WorkspaceBodyScrollNav({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLElement | null>(null);
  const animRef = useRef<AnimationPlaybackControls | null>(null);
  const pendingY = useRef(0);
  const dragControls = useDragControls();

  const [canPageUp, setCanPageUp] = useState(false);
  const [canPageDown, setCanPageDown] = useState(false);
  const [dragging, setDragging] = useState(false);

  const bindActive = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return null;
    const next = resolveScrollTarget(root);
    activeRef.current = next;
    return next;
  }, []);

  const syncEdges = useCallback(() => {
    const scroller = bindActive();
    if (!scroller) return;
    const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const top = scroller.scrollTop;
    setCanPageUp(top > 1);
    setCanPageDown(top < max - 1);
  }, [bindActive]);

  const scrollToY = useCallback(
    (targetY: number) => {
      const scroller = bindActive();
      if (!scroller) return;

      const next = clampScroll(scroller, targetY);
      pendingY.current = next;
      animRef.current?.stop();

      if (prefersReducedMotion() || Math.abs(next - scroller.scrollTop) < 1) {
        scroller.scrollTop = next;
        syncEdges();
        return;
      }

      const from = scroller.scrollTop;
      animRef.current = animate(from, next, {
        duration: SCROLL_DURATION,
        ease: SCROLL_EASE,
        onUpdate: (value) => {
          scroller.scrollTop = value;
        },
        onComplete: () => {
          animRef.current = null;
          syncEdges();
        }
      });
    },
    [bindActive, syncEdges]
  );

  const pageBy = useCallback(
    (direction: -1 | 1) => {
      const scroller = bindActive();
      if (!scroller) return;
      const page = Math.max(scroller.clientHeight * 0.92, 120);
      const base = animRef.current ? pendingY.current : scroller.scrollTop;
      scrollToY(base + direction * page);
    },
    [bindActive, scrollToY]
  );

  const startDockDrag = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragControls.start(event, { snapToCursor: false });
      setDragging(true);
    },
    [dragControls]
  );

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const onScroll = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (activeRef.current && target !== activeRef.current && !activeRef.current.contains(target)) {
        return;
      }
      if (!animRef.current) {
        pendingY.current = (activeRef.current ?? root).scrollTop;
        syncEdges();
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      const scroller = bindActive();
      if (!scroller) return;
      const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      if (max <= 0) return;

      /* When the outer root cannot scroll but an inner panel can, drive that panel. */
      if (scroller !== root && !canScrollY(root)) {
        event.preventDefault();
        const base = animRef.current ? pendingY.current : scroller.scrollTop;
        scrollToY(base + event.deltaY);
      }
    };

    root.addEventListener("scroll", onScroll, { passive: true, capture: true });
    root.addEventListener("wheel", onWheel, { passive: false });

    const ro = new ResizeObserver(() => syncEdges());
    ro.observe(root);

    const mo = new MutationObserver(() => syncEdges());
    mo.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "class", "style"] });

    syncEdges();

    return () => {
      animRef.current?.stop();
      root.removeEventListener("scroll", onScroll, true);
      root.removeEventListener("wheel", onWheel);
      ro.disconnect();
      mo.disconnect();
    };
  }, [bindActive, scrollToY, syncEdges]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <div ref={scrollerRef} className={styles.scroller}>
        {children}
      </div>

      <motion.div
        className={`${styles.nav}${dragging ? ` ${styles.navDragging}` : ""}`}
        role="navigation"
        aria-label="Body page scroll"
        drag
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={wrapRef}
        dragElastic={0}
        dragMomentum={false}
        dragTransition={{ power: 0, timeConstant: 0 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      >
        <button
          type="button"
          className={styles.btn}
          aria-label="Scroll up one page"
          disabled={!canPageUp}
          onClick={() => pageBy(-1)}
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        <button
          type="button"
          className={styles.drag}
          aria-label="Drag to reposition page controls. Refresh restores default position."
          onPointerDown={startDockDrag}
        >
          <GripVertical aria-hidden="true" />
        </button>

        <button
          type="button"
          className={styles.btn}
          aria-label="Scroll down one page"
          disabled={!canPageDown}
          onClick={() => pageBy(1)}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </motion.div>
    </div>
  );
}
