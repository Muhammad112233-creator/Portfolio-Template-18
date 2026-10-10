"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { SUBJECT_NAME } from "@/lib/data";

const noopSubscribe = () => () => {};

function setIntroCookie() {
  try {
    document.cookie = "rt_intro_seen=1; path=/; SameSite=Lax";
  } catch {}
}

function interp(val: number, domain: number[], range: number[]) {
  if (val <= domain[0]) return range[0];
  for (let i = 1; i < domain.length; i++) {
    if (val <= domain[i]) {
      const t = (val - domain[i - 1]) / (domain[i] - domain[i - 1]);
      return range[i - 1] + (range[i] - range[i - 1]) * t;
    }
  }
  return range[range.length - 1];
}

function calcRadius(w: number, h: number) {
  return Math.round(Math.min(104, Math.max(82, 0.12 * Math.min(w, h))));
}

const SceneContent = memo(function SceneContent() {
  const cols = [
    "The Morning Brief",
    "Notes from the Desk",
    "Field Report",
    "Late Edition",
    "On the Record",
  ];
  return (
    <>
      {cols.map((heading, colIdx) => (
        <div className="fm-col" key={colIdx}>
          <div className="fm-col-h">{heading}</div>
          <div className="fm-col-r" />
          {Array.from({ length: 60 }).map((_, rowIdx) => {
            const mod = (7 * rowIdx + 5 * colIdx) % 13;
            const extra = mod === 0 ? "x" : mod % 4 === 0 ? "s" : "";
            return (
              <div
                key={rowIdx}
                className={"fm-col-l " + extra}
              />
            );
          })}
        </div>
      ))}
      <div className="fm-masthead">
        <div className="fm-masthead-k">Wanted</div>
        <div className="fm-masthead-t">{SUBJECT_NAME}</div>
        <div className="fm-masthead-r" />
      </div>
    </>
  );
});

interface Bounds {
  W: number;
  H: number;
  R: number;
  bw: number;
  bh: number;
}

interface FrameStyles {
  focusFilter: string;
  zoomTransform: string;
  zoomOpacity: string;
  zoomFilter: string;
  winTransform: string;
  magTransform: string;
  spotTransform: string;
  dimOpacity: string;
  lensTransform: string;
  lensOpacity: string;
  sheetOpacity: string;
  stampOpacity: string;
  stampTransform: string;
  hintOpacity: string;
}

function computeFrame(
  bounds: Bounds,
  x: number,
  y: number,
  rot: number,
  pr: number,
  showHint: boolean
): FrameStyles {
  const { W, H, R } = bounds;
  let mx = x;
  let my = y;
  let mr = rot;

  if (pr > 0.5 && pr < 0.59) {
    const t = (pr - 0.5) / 0.09;
    const decay = 1 - t;
    mx += 8 * Math.sin(t * Math.PI * 11) * decay;
    my += 5 * Math.cos(t * Math.PI * 9) * decay;
    mr += 5 * Math.sin(t * Math.PI * 13) * decay;
  }

  const cx = W / 2 + mx;
  const cy = H / 2 + my;
  const endT = Math.min(1, Math.max(0, (pr - 0.94) / 0.06));
  const easeEnd =
    endT < 0.5 ? 4 * endT * endT * endT : 1 - Math.pow(-2 * endT + 2, 3) / 2;
  const endBlur = 5 * easeEnd;
  const focusBlur = interp(pr, [0.93, 0.96, 0.99, 1], [0, 10, 3, 0]);

  return {
    focusFilter: focusBlur > 0.1 ? `blur(${focusBlur}px)` : "none",
    zoomTransform: `scale(${interp(
      pr,
      [0.94, 0.98, 1],
      [1, 1.035, 1.02]
    )})`,
    zoomOpacity: String(1 - easeEnd),
    zoomFilter: endBlur > 0.01 ? `blur(${endBlur}px)` : "none",
    winTransform: `translate(${cx - R}px, ${cy - R}px)`,
    magTransform: `translate(${R - 1.9 * cx}px, ${R - 1.9 * cy}px) scale(1.9)`,
    spotTransform: `translate(${mx}px, ${my}px)`,
    dimOpacity: String(interp(pr, [0.48, 0.56], [0, 0.3])),
    lensTransform: `translate(${mx}px, ${my}px) rotate(${mr}deg)`,
    lensOpacity: String(interp(pr, [0.68, 0.74], [1, 0])),
    sheetOpacity: String(interp(pr, [0.66, 0.74], [0, 1])),
    stampOpacity: String(interp(pr, [0.76, 0.785], [0, 1])),
    stampTransform: `translateY(${interp(
      pr,
      [0.76, 0.798],
      [-54, 0]
    )}px) scale(${interp(
      pr,
      [0.76, 0.798, 0.83, 0.86],
      [2, 0.8, 1.1, 1]
    )}) rotate(${interp(pr, [0.76, 0.86], [-14, -10])}deg)`,
    hintOpacity: showHint ? "1" : "0",
  };
}

export function Intro() {
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  const [gone, setGone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [phase, setPhase] = useState<"hunt" | "locked">("hunt");

  const [initMetrics] = useState(() => {
    const W = typeof window !== "undefined" ? window.innerWidth || 1200 : 1200;
    const H = typeof window !== "undefined" ? window.innerHeight || 800 : 800;
    return {
      W,
      H,
      R: calcRadius(W, H),
      x: -(0.3 * W),
      y: -(0.2 * H),
    };
  });

  const defaultBounds: Bounds = {
    W: initMetrics.W,
    H: initMetrics.H,
    R: initMetrics.R,
    bw: initMetrics.W,
    bh: initMetrics.H,
  };

  const initialFrame = computeFrame(
    defaultBounds,
    initMetrics.x,
    initMetrics.y,
    -10,
    0.48,
    true
  );

  const isCoarsePointer = useSyncExternalStore(
    noopSubscribe,
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false
  );

  const rafRef = useRef<number>(0);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(0);
  const lockStartTime = useRef(0);
  const initializedRef = useRef(false);
  const stateRef = useRef({ x: 0, y: 0, r: -10, pr: 0.48 });
  const boundsRef = useRef<Bounds>(defaultBounds);
  const prevStylesRef = useRef<FrameStyles | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const zoomRef = useRef<HTMLDivElement | null>(null);
  const winRef = useRef<HTMLDivElement | null>(null);
  const magRef = useRef<HTMLDivElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);
  const dimRef = useRef<HTMLDivElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const stampRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const applyFrame = useCallback((next: FrameStyles) => {
    const prev = prevStylesRef.current;
    const setStyle = (
      el: HTMLElement | null,
      prop: "transform" | "opacity" | "filter",
      val: string,
      oldVal?: string
    ) => {
      if (el && val !== oldVal) {
        el.style[prop] = val;
      }
    };

    const focusEl = focusRef.current;
    if (focusEl && next.focusFilter !== prev?.focusFilter) {
      focusEl.style.backdropFilter = next.focusFilter;
      focusEl.style.setProperty("-webkit-backdrop-filter", next.focusFilter);
    }

    setStyle(zoomRef.current, "transform", next.zoomTransform, prev?.zoomTransform);
    setStyle(zoomRef.current, "opacity", next.zoomOpacity, prev?.zoomOpacity);
    setStyle(zoomRef.current, "filter", next.zoomFilter, prev?.zoomFilter);
    setStyle(winRef.current, "transform", next.winTransform, prev?.winTransform);
    setStyle(magRef.current, "transform", next.magTransform, prev?.magTransform);
    setStyle(spotRef.current, "transform", next.spotTransform, prev?.spotTransform);
    setStyle(dimRef.current, "opacity", next.dimOpacity, prev?.dimOpacity);
    setStyle(lensRef.current, "transform", next.lensTransform, prev?.lensTransform);
    setStyle(lensRef.current, "opacity", next.lensOpacity, prev?.lensOpacity);
    setStyle(sheetRef.current, "opacity", next.sheetOpacity, prev?.sheetOpacity);
    setStyle(stampRef.current, "opacity", next.stampOpacity, prev?.stampOpacity);
    setStyle(
      stampRef.current,
      "transform",
      next.stampTransform,
      prev?.stampTransform
    );
    setStyle(hintRef.current, "opacity", next.hintOpacity, prev?.hintOpacity);

    prevStylesRef.current = next;
  }, []);

  const applyBounds = useCallback((b: Bounds) => {
    const winEl = winRef.current;
    if (winEl) {
      winEl.style.width = `${2 * b.R}px`;
      winEl.style.height = `${2 * b.R}px`;
    }
    const magEl = magRef.current;
    if (magEl) {
      magEl.style.width = `${b.bw}px`;
      magEl.style.height = `${b.bh}px`;
    }
    const spotEl = spotRef.current;
    if (spotEl) {
      spotEl.style.setProperty("--s0", `${b.R - 4}px`);
      spotEl.style.setProperty("--s1", `${b.R + 200}px`);
    }
    const lensEl = lensRef.current;
    if (lensEl) {
      lensEl.style.width = `${2 * b.R}px`;
      lensEl.style.height = `${2 * b.R}px`;
      lensEl.style.marginLeft = `${-b.R}px`;
      lensEl.style.marginTop = `${-b.R}px`;
    }
  }, []);

  const finishIntro = useCallback(() => {
    setIntroCookie();
    setExiting(true);
    setTimeout(() => {
      setGone(true);
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("rt-intro-done"));
    }, 460);
  }, []);

  useLayoutEffect(() => {
    if (!hydrated) return;
    const onResize = () => {
      const W = window.innerWidth || 1200;
      const H = window.innerHeight || 800;
      const rect = rootRef.current?.getBoundingClientRect();
      const b: Bounds = {
        W,
        H,
        R: calcRadius(W, H),
        bw: rect?.width || W,
        bh: rect?.height || H,
      };
      boundsRef.current = b;
      applyBounds(b);
      if (!initializedRef.current) {
        initializedRef.current = true;
        const ix = -(0.3 * W);
        const iy = -(0.2 * H);
        stateRef.current = { x: ix, y: iy, r: -10, pr: 0.48 };
        currentPos.current = { x: ix, y: iy };
        targetPos.current = { x: ix, y: iy };
      }
      const st = stateRef.current;
      applyFrame(computeFrame(b, st.x, st.y, st.r, st.pr, phase === "hunt"));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hydrated, phase, applyBounds, applyFrame]);

  useEffect(() => {
    if (!hydrated) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finishIntro();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hydrated, finishIntro]);

  useEffect(() => {
    if (!hydrated || phase !== "hunt") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroCookie();
      return;
    }

    lastMoveTime.current = performance.now();
    const mountTime = performance.now();

    const onPointerMove = (e: PointerEvent) => {
      const b = boundsRef.current;
      targetPos.current = {
        x: e.clientX - b.W / 2,
        y: e.clientY - b.H / 2,
      };
      lastMoveTime.current = performance.now();
    };

    window.addEventListener("pointermove", onPointerMove);

    const loop = (now: number) => {
      const b = boundsRef.current;
      const tgt = targetPos.current;
      const cur = currentPos.current;

      if (now - lastMoveTime.current > 3000) {
        tgt.x += (0 - tgt.x) * 0.02;
        tgt.y += (0 - tgt.y) * 0.02;
      }

      cur.x += (tgt.x - cur.x) * 0.12;
      cur.y += (tgt.y - cur.y) * 0.12;

      stateRef.current = {
        x: cur.x,
        y: cur.y,
        r: -10,
        pr: stateRef.current.pr,
      };

      applyFrame(computeFrame(b, cur.x, cur.y, -10, stateRef.current.pr, true));

      if (Math.hypot(cur.x, cur.y) < 0.6 * b.R && now - mountTime > 800) {
        if (lockStartTime.current) {
          if (now - lockStartTime.current > 250) {
            setPhase("locked");
            return;
          }
        } else {
          lockStartTime.current = now;
        }
      } else {
        lockStartTime.current = 0;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [hydrated, phase, applyFrame]);

  useEffect(() => {
    if (!hydrated || phase !== "locked") return;
    const startPos = { ...currentPos.current };
    let t0 = 0;
    let doneScheduled = false;

    const loop = (now: number) => {
      if (!t0) t0 = now;
      const b = boundsRef.current;
      const snapT = 1 - Math.pow(1 - Math.min(1, (now - t0) / 320), 3);
      const x = startPos.x * (1 - snapT);
      const y = startPos.y * (1 - snapT);
      const r = -10 + 12 * snapT;
      const seqT = Math.min(1, (now - t0 - 320) / 3400);
      const pr = seqT > 0 ? 0.48 + 0.52 * seqT : stateRef.current.pr;

      stateRef.current = { x, y, r, pr };
      applyFrame(computeFrame(b, x, y, r, pr, false));

      if (seqT >= 1) {
        if (!doneScheduled) {
          doneScheduled = true;
          setTimeout(finishIntro, 320);
        }
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hydrated, phase, finishIntro, applyFrame]);

  if (gone) return null;

  if (!hydrated) {
    return (
      <div className="fm-intro">
        <div className="fm-zoom">
          <div className="fm-scene fm-scene--base">
            <SceneContent />
          </div>
        </div>
        <div className="fm-hint">Take the glass — find the subject</div>
        <button className="fm-skip" type="button" onClick={finishIntro}>
          Skip intro →
        </button>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={"fm-intro" + (exiting ? " fm-intro--exit" : "")}
    >
      <div
        ref={focusRef}
        aria-hidden="true"
        className="fm-focus"
        style={{
          backdropFilter: initialFrame.focusFilter,
          WebkitBackdropFilter: initialFrame.focusFilter,
        }}
      />
      <div
        ref={zoomRef}
        className="fm-zoom"
        style={{
          transform: initialFrame.zoomTransform,
          opacity: initialFrame.zoomOpacity,
          filter: initialFrame.zoomFilter,
          transformOrigin: "50% 50%",
        }}
      >
        <div className="fm-scene fm-scene--base">
          <SceneContent />
        </div>
        <div
          ref={winRef}
          className="fm-magwin"
          style={{
            width: 2 * defaultBounds.R,
            height: 2 * defaultBounds.R,
            transform: initialFrame.winTransform,
          }}
        >
          <div
            ref={magRef}
            className="fm-maginner"
            style={{
              width: defaultBounds.bw,
              height: defaultBounds.bh,
              transform: initialFrame.magTransform,
              transformOrigin: "0px 0px",
            }}
          >
            <div className="fm-scene fm-scene--mag">
              <SceneContent />
            </div>
          </div>
        </div>
        <div
          ref={spotRef}
          className="fm-spot"
          style={
            {
              transform: initialFrame.spotTransform,
              "--s0": `${defaultBounds.R - 4}px`,
              "--s1": `${defaultBounds.R + 200}px`,
            } as React.CSSProperties
          }
        />
        <div
          ref={dimRef}
          className="fm-dim"
          style={{ opacity: initialFrame.dimOpacity }}
        />
        <div
          ref={lensRef}
          className="fm-lens"
          style={{
            width: 2 * defaultBounds.R,
            height: 2 * defaultBounds.R,
            marginLeft: -defaultBounds.R,
            marginTop: -defaultBounds.R,
            transform: initialFrame.lensTransform,
            opacity: initialFrame.lensOpacity,
          }}
        >
          <div className="fm-lens-handle" />
          <div className="fm-lens-glass" />
          <div className="fm-lens-rim" />
        </div>
        <div className="fm-grain" />
        <div
          ref={sheetRef}
          className="fm-sheet"
          style={{ opacity: initialFrame.sheetOpacity }}
        />
        <div className="fm-stampwrap" style={{ zIndex: 9 }}>
          <div
            ref={stampRef}
            className="fm-stampmove"
            style={{
              opacity: initialFrame.stampOpacity,
              transform: initialFrame.stampTransform,
            }}
          >
            <div className="fm-stamp">Identified</div>
          </div>
        </div>
      </div>
      <div
        ref={hintRef}
        className="fm-hint"
        style={{
          opacity: initialFrame.hintOpacity,
          transition: "opacity .3s ease",
        }}
      >
        {isCoarsePointer
          ? "Drag the glass — find the subject"
          : "Take the glass — find the subject"}
      </div>
      <button className="fm-skip" type="button" onClick={finishIntro}>
        Skip intro →
      </button>
    </div>
  );
}
