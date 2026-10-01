"use client";

import type { PointerEvent, ReactNode } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import "./princess-price-dashboard.css";

export type Observation = {
  isoDate: string;
  label: string;
  price: number;
};

export type CabinSeries = {
  cabin: string;
  observations: Observation[];
};

export type CuratedVoyage = {
  id: string;
  itinerary: string;
  ship: string;
  sailDate: string;
  sailDateLabel: string;
  seriesByCabin: CabinSeries[];
};

type DashboardProps = {
  voyages: CuratedVoyage[];
  defaultVoyageId: string;
  historicalLabel: string;
  defaultCabin: string;
  scrollToInterfaceOnMount?: boolean;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildChartPoints(
  observations: Observation[],
  width: number,
  height: number,
  padding: { top: number; right: number; bottom: number; left: number },
) {
  const prices = observations.map((item) => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = Math.max(maxPrice - minPrice, 1);
  const stepX = observations.length > 1 ? (width - padding.left - padding.right) / (observations.length - 1) : 0;
  const chartHeight = height - padding.top - padding.bottom;

  return observations.map((item, index) => {
    const x = padding.left + stepX * index;
    const y = padding.top + chartHeight - ((item.price - minPrice) / range) * chartHeight;
    return { ...item, x, y };
  });
}

const CHART_WIDTH = 960;
const CHART_HEIGHT = 440;
const CHART_PADDING = { top: 28, right: 28, bottom: 52, left: 28 };
const CABIN_LABELS: Record<string, string> = {
  Oceanview: "OCEANVIEW",
  Balcony: "BALCONY",
  "Mini-Suite": "MINI-SUITE",
};
const VOYAGE_LABELS: Record<string, string> = {
  "14-Day Mediterranean Adventurer": "Mediterranean Adventurer",
  "12-Day British Isles with France & Belfast": "British Isles",
  "7-Day Eastern Caribbean with St. Thomas": "St. Thomas",
  "7-Day Eastern Caribbean with Puerto Rico": "Puerto Rico",
  "7-Day Eastern Caribbean with Turks & Caicos": "Turks & Caicos",
};

export function PriceDashboard({
  voyages,
  defaultVoyageId,
  historicalLabel,
  defaultCabin,
  scrollToInterfaceOnMount = false,
}: DashboardProps) {
  const [selectedVoyageId, setSelectedVoyageId] = useState(defaultVoyageId);
  const [selectedCabin, setSelectedCabin] = useState(defaultCabin);
  const [inspection, setInspection] = useState<{ series: CabinSeries; index: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const voyageRailRef = useRef<HTMLDivElement>(null);
  const tapStart = useRef<{ x: number; y: number; id: number } | null>(null);
  const [plotWidth, setPlotWidth] = useState(CHART_WIDTH);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new ResizeObserver(([entry]) => setPlotWidth(entry.contentRect.width));
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!scrollToInterfaceOnMount || !window.matchMedia("(max-width: 760px)").matches) return;

    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      voyageRailRef.current?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [scrollToInterfaceOnMount]);
  const chartId = useId();

  const selectedVoyage = useMemo(
    () => voyages.find((voyage) => voyage.id === selectedVoyageId) ?? voyages[0],
    [selectedVoyageId, voyages],
  );

  const cabinSeries = useMemo(
    () => selectedVoyage.seriesByCabin.find((series) => series.cabin === selectedCabin) ?? selectedVoyage.seriesByCabin[0],
    [selectedCabin, selectedVoyage],
  );

  useEffect(() => {
    setSelectedVoyageId(defaultVoyageId);
  }, [defaultVoyageId]);

  useEffect(() => {
    const matchingCabin = selectedVoyage.seriesByCabin.find((series) => series.cabin === selectedCabin);
    if (!matchingCabin) {
      setSelectedCabin(selectedVoyage.seriesByCabin[0]?.cabin ?? defaultCabin);
    }
  }, [defaultCabin, selectedCabin, selectedVoyage]);

  const derived = useMemo(() => {
    const observations = cabinSeries.observations;
    const firstObservation = observations[0];
    const latestObservation = observations[observations.length - 1];
    const lowObservation = observations.reduce((lowest, current) => (current.price < lowest.price ? current : lowest));
    const highObservation = observations.reduce((highest, current) => (current.price > highest.price ? current : highest));
    const latestPrice = latestObservation.price;
    const lowPrice = lowObservation.price;
    const highPrice = highObservation.price;
    const changeAmount = latestPrice - firstObservation.price;
    const changePercent = (changeAmount / firstObservation.price) * 100;
    const observationLabel = `${observations.length} observations · ${observations[0].label}–${observations[observations.length - 1].label}`;
    const percentFromHigh = highPrice === 0 ? 0 : ((latestPrice - highPrice) / highPrice) * 100;
    const roundedPercentFromHigh = Math.round(Math.abs(percentFromHigh));
    let insightEmphasis = "at";
    const insightSuffix = "the observed high.";

    if (latestPrice < highPrice) {
      insightEmphasis = `${roundedPercentFromHigh}% below`;
    } else if (latestPrice > highPrice) {
      insightEmphasis = `${roundedPercentFromHigh}% above`;
    }

    const insight: ReactNode = (
      <>
        Current fare is <strong>{insightEmphasis}</strong> {insightSuffix}
      </>
    );

    return {
      observations,
      firstObservation,
      latestObservation,
      lowObservation,
      highObservation,
      latestPrice,
      lowPrice,
      highPrice,
      changeAmount,
      changePercent,
      observationLabel,
      percentFromHigh,
      insight,
    };
  }, [cabinSeries]);

  const chart = useMemo(() => {
    const points = buildChartPoints(derived.observations, CHART_WIDTH, CHART_HEIGHT, CHART_PADDING);
    const prices = derived.observations.map((item) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const latestIndex = derived.observations.length - 1;
    const path = points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");

    const yTicks = [maxPrice, Math.round((maxPrice + minPrice) / 2), minPrice];

    return { points, path, minPrice, maxPrice, yTicks, latestIndex };
  }, [derived.observations]);

  const inspectedPoint = inspection?.series === cabinSeries ? chart.points[inspection.index] : null;
  const activePoint = chart.points[chart.latestIndex];
  const markerPoint = inspectedPoint ?? activePoint;
  const readoutWidth = Math.min(132, Math.max(96, plotWidth / 2 - 20));
  const inspectedX = inspectedPoint ? (inspectedPoint.x / CHART_WIDTH) * plotWidth : 0;
  // High observations have no headroom: put the text beside the guide so the node stays visible.
  const readoutBeside = inspectedPoint && (inspectedPoint.y / CHART_WIDTH) * plotWidth < 64;
  const readoutLeft = Math.max(0, Math.min(plotWidth - readoutWidth,
    readoutBeside
      ? inspectedX + (inspectedX < plotWidth / 2 ? 14 : -readoutWidth - 14)
      : inspectedX - readoutWidth / 2,
  ));

  function inspectPointer(event: PointerEvent<SVGSVGElement>) {
    const matrix = event.currentTarget.getScreenCTM();
    if (!matrix) return;
    const position = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    if (position.y < 0 || position.y > CHART_HEIGHT - CHART_PADDING.bottom) {
      setInspection(null);
      return;
    }
    // The existing chart spaces real observations evenly, including repeated fares.
    const fraction = (position.x - CHART_PADDING.left) / (CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right);
    const index = Math.max(0, Math.min(chart.latestIndex, Math.round(fraction * chart.latestIndex)));
    setInspection({ series: cabinSeries, index });
  }
  const activeChange = activePoint.price - derived.observations[0].price;
  const activeChangeText = `${activeChange >= 0 ? "+" : "-"}${formatCurrency(Math.abs(activeChange))}`;

  return (
    <div className="princess-demo">
      <header className="demo-context">
        <div>
          <p className="demo-context-label">Selected voyage</p>
          <h2 className="demo-voyage-title">{selectedVoyage.itinerary}</h2>
          <p className="voyage-meta">{`${selectedVoyage.ship} · ${selectedVoyage.sailDateLabel} · ${selectedCabin}`}</p>
        </div>
        <div className="demo-context-detail">
          <p className="historical-note">{historicalLabel}</p>
          <p className="observation-note">{derived.observationLabel}</p>
        </div>
      </header>

      <section className="metrics-grid" aria-label="Voyage pricing summary">
        {[
          {
            label: "Latest observed fare",
            value: formatCurrency(derived.latestPrice),
            detail: `Recorded on ${derived.latestObservation.label}`,
          },
          {
            label: "Lowest observed",
            value: formatCurrency(derived.lowPrice),
            detail: `First reached on ${derived.lowObservation.label}`,
          },
          {
            label: "Highest observed",
            value: formatCurrency(derived.highPrice),
            detail: `Recorded on ${derived.highObservation.label}`,
          },
          {
            label: "Change since first observation",
            value: `${derived.changeAmount >= 0 ? "+" : "-"}${formatCurrency(Math.abs(derived.changeAmount))}`,
            detail: `${derived.changePercent >= 0 ? "+" : ""}${derived.changePercent.toFixed(1)}% across the observed period`,
          },
        ].map((metric) => (
          <article className="metric" key={metric.label}>
            <p className="metric-label">{metric.label}</p>
            <p className="metric-value">{metric.value}</p>
            <p className="metric-detail">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="visual-panel">
        <div className="chart-layout">
          <div ref={voyageRailRef} className="voyage-rail" role="tablist" aria-label="Curated voyage">
            <div className="voyage-rail-track" aria-hidden="true" />
            {voyages.map((voyage) => {
              const isActive = voyage.id === selectedVoyage.id;
              return (
                <button
                  key={voyage.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={voyage.itinerary}
                  className={`voyage-stop ${isActive ? "is-active" : ""}`}
                  onClick={() => { setInspection(null); setSelectedVoyageId(voyage.id); }}
                >
                  <span className="voyage-stop-dot" aria-hidden="true" />
                  <span className="voyage-stop-copy">
                    <span className="voyage-stop-label">{VOYAGE_LABELS[voyage.itinerary] ?? voyage.itinerary}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="chart-main">
            <div className="panel-header">
              <div>
                <p className="panel-label">Historical fare movement</p>
                <h2 className="panel-title">{`Observed ${selectedCabin} fare across time`}</h2>
              </div>
              <div className="panel-controls">
                <div className="switcher-control" role="tablist" aria-label="Cabin category">
                  <div className="switcher-track" aria-hidden="true" />
                  {selectedVoyage.seriesByCabin.map((series) => {
                    const isActive = series.cabin === selectedCabin;
                    return (
                      <button
                        key={series.cabin}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`switcher-stop ${isActive ? "is-active" : ""}`}
                        onClick={() => { setInspection(null); setSelectedCabin(series.cabin); }}
                      >
                        <span className="switcher-label">{CABIN_LABELS[series.cabin] ?? series.cabin.toUpperCase()}</span>
                        <span className="switcher-dot" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>

                <div className="active-readout" aria-live="polite">
                  <span className="active-readout-label">{activePoint.label}</span>
                  <strong>{formatCurrency(activePoint.price)}</strong>
                  <span>{activeChangeText} vs. first observation</span>
                </div>
              </div>
            </div>
            <div className="chart-frame">
              <div className="chart-ylabels" aria-hidden="true">
                {chart.yTicks.map((tick) => (
                  <span key={tick}>{formatCurrency(tick)}</span>
                ))}
              </div>

              <div className="chart-plot">
                <svg
                  ref={svgRef}
                  className="price-chart"
                  viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                  role="slider"
                  tabIndex={0}
                  aria-label="Historical fare observation"
                  aria-describedby={`${chartId}-desc`}
                  aria-valuemin={1}
                  aria-valuemax={chart.points.length}
                  aria-valuenow={(inspection?.series === cabinSeries ? inspection.index : chart.latestIndex) + 1}
                  aria-valuetext={`${markerPoint.label}: ${formatCurrency(markerPoint.price)}`}
                  onPointerMove={(event) => {
                    if (event.pointerType === "mouse") inspectPointer(event);
                    else if (tapStart.current && Math.hypot(event.clientX - tapStart.current.x, event.clientY - tapStart.current.y) > 10) tapStart.current = null;
                  }}
                  onPointerEnter={(event) => { if (event.pointerType === "mouse") inspectPointer(event); }}
                  onPointerLeave={(event) => {
                    tapStart.current = null;
                    if (event.pointerType === "mouse") setInspection(null);
                  }}
                  onPointerDown={(event) => {
                    if (event.isPrimary && event.button === 0) tapStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
                  }}
                  onPointerUp={(event) => {
                    const start = tapStart.current;
                    if (start?.id === event.pointerId && Math.hypot(event.clientX - start.x, event.clientY - start.y) <= 10) inspectPointer(event);
                    tapStart.current = null;
                  }}
                  onPointerCancel={() => { tapStart.current = null; }}
                  onBlur={() => setInspection(null)}
                  onKeyDown={(event) => {
                    const index = inspection?.series === cabinSeries ? inspection.index : chart.latestIndex;
                    const next = { ArrowLeft: index - 1, ArrowDown: index - 1, ArrowRight: index + 1, ArrowUp: index + 1, Home: 0, End: chart.latestIndex }[event.key];
                    if (event.key === "Escape") setInspection(null);
                    if (next !== undefined) {
                      event.preventDefault();
                      setInspection({ series: cabinSeries, index: Math.max(0, Math.min(chart.latestIndex, next)) });
                    }
                  }}
                >
                  <desc id={`${chartId}-desc`}>
                    {`A chronological line chart of observed ${selectedCabin} fares from ${derived.firstObservation.label} through ${derived.latestObservation.label}. Use arrow keys to inspect observations, Home or End to jump, and Escape to return to the latest fare.`}
                  </desc>

                  {chart.yTicks.map((tick) => {
                    const y =
                      CHART_PADDING.top +
                      (CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom) *
                        (1 - (tick - chart.minPrice) / Math.max(chart.maxPrice - chart.minPrice, 1));

                    return (
                      <g key={tick}>
                        <line className="chart-gridline" x1={CHART_PADDING.left} y1={y} x2={CHART_WIDTH - CHART_PADDING.right} y2={y} />
                      </g>
                    );
                  })}

                  <path className="chart-area" d={`${chart.path} L ${CHART_WIDTH - CHART_PADDING.right} ${CHART_HEIGHT - CHART_PADDING.bottom} L ${CHART_PADDING.left} ${CHART_HEIGHT - CHART_PADDING.bottom} Z`} />
                  <path className="chart-line" d={chart.path} />

                  {chart.points.map((point, index) => {
                    const isLatest = index === chart.latestIndex;

                    return (
                      <g key={`${point.isoDate}-${point.price}`}>
                        <circle
                          className={`chart-point ${isLatest ? "latest" : ""}`}
                          cx={point.x}
                          cy={point.y}
                          r={isLatest ? 6 : 4}
                        />
                      </g>
                    );
                  })}

                  {inspectedPoint && (
                    <g className="chart-inspection" aria-hidden="true">
                      <line className="chart-guide" x1={inspectedPoint.x} x2={inspectedPoint.x}
                        y1={4} y2={inspectedPoint.y} />
                      <circle className="chart-pulse" cx={inspectedPoint.x} cy={inspectedPoint.y} r={12} />
                    </g>
                  )}
                  <circle
                    className="chart-point active-marker"
                    cx={markerPoint.x}
                    cy={markerPoint.y}
                    r={7}
                  />

                  <text className="axis-label axis-label-start" x={CHART_PADDING.left} y={CHART_HEIGHT - 16}>
                    {derived.observations[0].label}
                  </text>
                  <text className="axis-label axis-label-end" x={CHART_WIDTH - CHART_PADDING.right} y={CHART_HEIGHT - 16}>
                    {derived.observations[derived.observations.length - 1].label}
                  </text>
                </svg>
                {inspectedPoint && (
                  <div className="chart-history-readout" aria-hidden="true"
                    style={{ left: readoutLeft, width: readoutWidth, textAlign: readoutBeside ? (inspectedX < plotWidth / 2 ? "left" : "right") : "center" }}>
                    <span>{inspectedPoint.label}</span>
                    <strong>{formatCurrency(inspectedPoint.price)}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="insight-row">
          <p className="insight-kicker">Decision insight</p>
          <p className="insight-copy">{derived.insight}</p>
        </div>
      </section>

      <section className="milestone-strip" aria-label="Notable historical observations">
        {[
          {
            label: "First observed",
            price: formatCurrency(derived.firstObservation.price),
            date: derived.firstObservation.label,
          },
          {
            label: "Observed low",
            price: formatCurrency(derived.lowObservation.price),
            date: derived.lowObservation.label,
          },
          {
            label: "Observed high",
            price: formatCurrency(derived.highObservation.price),
            date: derived.highObservation.label,
          },
          {
            label: "Latest observed",
            price: formatCurrency(derived.latestObservation.price),
            date: derived.latestObservation.label,
          },
        ].map((milestone) => (
          <article className="milestone" key={milestone.label}>
            <p className="milestone-label">{milestone.label}</p>
            <p className="milestone-price">{milestone.price}</p>
            <p className="milestone-date">{milestone.date}</p>
          </article>
        ))}
      </section>

      <section className="footnote">
        <p>Historical dataset only. Values are derived from archived observations and exclude zero-result runs.</p>
        <p>
          Latest observed fare: {formatCurrency(derived.latestPrice)}. Observed range: {formatCurrency(derived.highPrice - derived.lowPrice)}.
          Change since first observation: {derived.changeAmount >= 0 ? "+" : "-"}
          {formatCurrency(Math.abs(derived.changeAmount))} ({derived.changePercent >= 0 ? "+" : ""}
          {derived.changePercent.toFixed(1)}%).
        </p>
      </section>
    </div>
  );
}
