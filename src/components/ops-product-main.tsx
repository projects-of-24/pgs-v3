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
import { cn } from "@/lib/utils";

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

type OpsProductMainProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Body scroll + floating ◀ ▶ dock.
 * Drag = Motion `drag` + `useDragControls` (motion.dev floating-panel pattern):
 * cursor stays on the control, GPU transform, constrained to the main wrap.
 * Refresh remounts → CSS default position (no persistence).
 */
export function OpsProductMain({ children, className }: OpsProductMainProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLElement>(null);
  const animRef = useRef<AnimationPlaybackControls | null>(null);
  const pendingY = useRef(0);
  const dragControls = useDragControls();

  const [canPageUp, setCanPageUp] = useState(false);
  const [canPageDown, setCanPageDown] = useState(false);
  const [dragging, setDragging] = useState(false);

  const syncEdges = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const top = scroller.scrollTop;
    setCanPageUp(top > 1);
    setCanPageDown(top < max - 1);
  }, []);

  const scrollToY = useCallback(
    (targetY: number) => {
      const scroller = scrollerRef.current;
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
    [syncEdges]
  );

  const pageBy = useCallback(
    (direction: -1 | 1) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const page = Math.max(scroller.clientHeight * 0.92, 120);
      const base = animRef.current ? pendingY.current : scroller.scrollTop;
      scrollToY(base + direction * page);
    },
    [scrollToY]
  );

  const startDockDrag = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      // Motion owns grab-point math — cursor stays on the dock UI
      event.preventDefault();
      event.stopPropagation();
      dragControls.start(event, { snapToCursor: false });
      setDragging(true);
    },
    [dragControls]
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    pendingY.current = scroller.scrollTop;
    syncEdges();

    const onScroll = () => {
      if (!animRef.current) {
        pendingY.current = scroller.scrollTop;
        syncEdges();
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      if (prefersReducedMotion()) return;

      const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      if (max <= 0) return;

      event.preventDefault();
      const base = animRef.current ? pendingY.current : scroller.scrollTop;
      scrollToY(base + event.deltaY);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: false });

    const ro = new ResizeObserver(() => syncEdges());
    ro.observe(scroller);
    if (scroller.firstElementChild) ro.observe(scroller.firstElementChild);

    return () => {
      animRef.current?.stop();
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("wheel", onWheel);
      ro.disconnect();
    };
  }, [scrollToY, syncEdges]);

  return (
    <div ref={wrapRef} className="ops-system-main-wrap">
      <main ref={scrollerRef} className={cn("ops-system-main", className)}>
        <div className="ops-system-body">{children}</div>
      </main>

      <motion.div
        className={cn("ops-body-page-nav", dragging && "ops-body-page-nav--dragging")}
        role="navigation"
        aria-label="Body page scroll"
        drag
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={wrapRef}
        dragElastic={0}
        dragMomentum={false}
        dragTransition={{ power: 0, timeConstant: 0 }}
        onDragEnd={() => setDragging(false)}
      >
        <button
          type="button"
          className="ops-body-page-nav-btn"
          aria-label="Scroll up one page"
          disabled={!canPageUp}
          onClick={() => pageBy(-1)}
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        <button
          type="button"
          className="ops-body-page-nav-drag"
          aria-label="Drag to reposition page controls. Refresh restores default position."
          onPointerDown={startDockDrag}
        >
          <GripVertical aria-hidden="true" />
        </button>

        <button
          type="button"
          className="ops-body-page-nav-btn"
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
