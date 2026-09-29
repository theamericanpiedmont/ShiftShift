import { useId } from "react";
import styles from "./shifty-eyes-vector.module.css";

export type ShiftyEyesPose = "neutral" | "right" | "left" | "blink" | "sequence";

/** Isolated reconstruction; the approved PNG remains the production artwork. */
export function ShiftyEyesVector({ pose = "neutral", replayKey = 0 }: { pose?: ShiftyEyesPose; replayKey?: number }) {
  const id = useId().replace(/:/g, "");
  const ref = (name: string) => `url(#${id}-${name})`;
  const poseClass = pose === "neutral" ? "" : styles[pose];

  return (
    <svg className={styles.mark} viewBox="0 0 457 225" width="457" height="225"
      role="img" aria-label="Shifty Eyes vector reconstruction">
      <defs>
        <linearGradient id={`${id}-top-band`} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="50">
          <stop stopColor="#ffc81b" />
          <stop offset="0.25" stopColor="#ffb916" />
          <stop offset="1" stopColor="#ff8e00" />
        </linearGradient>
        <linearGradient id={`${id}-middle-band`} gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="0" y2="149">
          <stop stopColor="#ff7300" />
          <stop offset="0.55" stopColor="#ff8000" />
          <stop offset="1" stopColor="#ff8900" />
        </linearGradient>
        <linearGradient id={`${id}-lower-band`} gradientUnits="userSpaceOnUse" x1="0" y1="149" x2="0" y2="201">
          <stop stopColor="#f94c00" />
          <stop offset="0.55" stopColor="#f44200" />
          <stop offset="0.88" stopColor="#ec4000" />
          <stop offset="1" stopColor="#ff5908" />
        </linearGradient>
        <linearGradient id={`${id}-top-edge-light`} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="13">
          <stop stopColor="#fff89a" stopOpacity="0.98" />
          <stop offset="0.42" stopColor="#fff04b" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffd22a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-left-bevel-light`} gradientUnits="userSpaceOnUse" x1="10" y1="0" x2="13" y2="0">
          <stop stopColor="#ffd52a" stopOpacity="0.4" />
          <stop offset="0.35" stopColor="#fff795" stopOpacity="1" />
          <stop offset="0.68" stopColor="#fff04b" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffe13c" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`${id}-front-light`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#ffe34a" stopOpacity="0.26" />
          <stop offset="0.3" stopColor="#ffe34a" stopOpacity="0.13" />
          <stop offset="0.7" stopColor="#ffe34a" stopOpacity="0" />
          <stop offset="1" stopColor="#ffe34a" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id={`${id}-depth`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f99b00" />
          <stop offset="0.5" stopColor="#e95b00" />
          <stop offset="1" stopColor="#bd2100" />
        </linearGradient>
        <linearGradient id={`${id}-side`} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="217">
          <stop stopColor="#ffad0a" />
          <stop offset="0.19" stopColor="#ff7600" />
          <stop offset="0.67" stopColor="#ed4b00" />
          <stop offset="1" stopColor="#c53200" />
        </linearGradient>
        <linearGradient id={`${id}-side-shade`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#8d2100" stopOpacity="0" />
          <stop offset="1" stopColor="#8d2100" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${id}-top-facet`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffe33e" stopOpacity="0.15" />
          <stop offset="1" stopColor="#ff9a00" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id={`${id}-bottom`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#d83b00" />
          <stop offset="0.52" stopColor="#b92b00" />
          <stop offset="1" stopColor="#941d00" />
        </linearGradient>
        <linearGradient id={`${id}-corner-shadow`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#721900" stopOpacity="0.05" />
          <stop offset="1" stopColor="#701600" stopOpacity="0.3" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-24%" y="-24%" width="148%" height="148%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="11" />
        </filter>
        <filter id={`${id}-glow-core`} x="-24%" y="-24%" width="148%" height="148%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={`${id}-slit-light`} filterUnits="userSpaceOnUse" x="-48" y="-48" width="310" height="321" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="2.4" result="expanded-opening" />
          <feComposite in="expanded-opening" in2="SourceAlpha" operator="out" result="crisp-edge" />
          <feFlood floodColor="#ffda18" floodOpacity="1" result="gold-edge" />
          <feComposite in="gold-edge" in2="crisp-edge" operator="in" result="edge-catch" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.9" result="bloom-shape" />
          <feFlood floodColor="#ffb900" floodOpacity="0.16" result="bloom-gold" />
          <feComposite in="bloom-gold" in2="bloom-shape" operator="in" result="faint-bloom" />
          <feMerge>
            <feMergeNode in="faint-bloom" />
            <feMergeNode in="edge-catch" />
          </feMerge>
        </filter>
      </defs>
      {[{ name: "left", x: 0, edge: 193 }, { name: "right", x: 235, edge: 195 }].map(({ name, x, edge }) => {
        const frontRight = edge + 8;
        const frontBottom = 201;
        const body = `M 20 9 H ${edge + 4} L ${edge + 18} 23 V 207 L ${edge + 18} 217 H 29 L 10 199 V 19 Z`;
        const front = `M 20 10 H ${edge + 4} L ${frontRight} 19 V ${frontBottom} H 13 V 19 Z`;
        const side = `M ${frontRight} 19 L ${edge + 18} 23 V 207 L ${frontRight} ${frontBottom} Z`;
        const topFace = `M 20 10 H ${edge + 4} L ${frontRight} 19 V 50 H 13 V 19 Z`;
        const middleFace = `M 13 50 H ${frontRight} V 149 H 13 Z`;
        const lowerFace = `M 13 149 H ${frontRight} V ${frontBottom} H 13 Z`;
        return (
          <g key={name} id={`${id}-${name}-eye`} data-eye={name} transform={`translate(${x} 0)`}>
            <defs>
              <clipPath id={`${id}-${name}-light-bounds`}>
                <path d={body} />
              </clipPath>
              <mask id={`${id}-${name}-opening`} maskUnits="userSpaceOnUse" x="-48" y="-48" width="310" height="321" style={{ maskType: "luminance" }}>
                <rect x="-48" y="-48" width="310" height="321" fill="white" />
                <path
                  key={`${name}-cutout-${pose === "blink" || pose === "sequence" ? replayKey : "static"}`}
                  className={`${styles.cutout} ${poseClass}`}
                  id={`${id}-${name}-slit`}
                  data-slit={name}
                  data-slit-cutout={name}
                  d="M -12 70 H 114 Q 118 70 118 74 V 109 Q 118 113 114 113 H -12 Z"
                  fill="black"
                />
              </mask>
            </defs>
            {/* Blur the cut-out silhouette so bloom fades naturally around the opening. */}
            <g filter={ref("glow")} opacity="0.65">
              <path d={body} fill="#ff8a00" mask={ref(`${name}-opening`)} />
            </g>
            <g filter={ref("glow-core")} opacity="0.45">
              <path d={body} fill="#ffb51b" mask={ref(`${name}-opening`)} />
            </g>
            <g mask={ref(`${name}-opening`)}>
              <path d={body} fill={ref("depth")} />
              <path d={side} fill={ref("side")} />
              <path d={side} fill={ref("side-shade")} />
              <path d={`M ${edge + 4} 9 L ${edge + 18} 23 H ${edge + 4} Z`} fill={ref("top-facet")} />
              <path d={`M 13 ${frontBottom} H ${frontRight} L ${edge + 18} 207 V 217 H 29 L 10 199 Z`} fill={ref("bottom")} />
              <path d={front} fill="#ff7900" />
              <path d={topFace} fill={ref("top-band")} />
              <path d={middleFace} fill={ref("middle-band")} />
              <path d={lowerFace} fill={ref("lower-band")} />
              <path d={topFace} fill={ref("front-light")} opacity="0.5" />
              <path d={middleFace} fill={ref("front-light")} />
              <path d={lowerFace} fill={ref("front-light")} opacity="0.5" />
              <path d={`M 20 10 H ${edge + 4} L ${edge + 6} 13 H 17 Z`} fill={ref("top-edge-light")} />
              <path d={`M 10 19 H 13 V ${frontBottom} L 10 199 Z`} fill={ref("left-bevel-light")} />
              <path d={`M ${frontRight} ${frontBottom} L ${edge + 18} 207 V 217 Z`} fill={ref("corner-shadow")} />
            </g>
            {/* Build a crisp filled edge catch and faint bloom from the animated opening alpha; no stroke. */}
            <g clipPath={ref(`${name}-light-bounds`)} mask={ref(`${name}-opening`)}>
              <g filter={ref("slit-light")}>
                <use href={`#${id}-${name}-slit`} />
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
