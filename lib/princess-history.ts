import history from "@/data/princess-price-history.json";
import type { CabinSeries, CuratedVoyage } from "@/components/princess-price-dashboard";

type CruiseRecord = {
  itinerary?: string;
  ship?: string;
  sail_date?: string;
  cabin?: string;
  price?: number;
};

type HistoryRun = {
  checked_at: string;
  results?: CruiseRecord[];
};

type VoyageDefinition = {
  itinerary: string;
  ship: string;
  sailDate: string;
};

const CURATED_VOYAGES: VoyageDefinition[] = [
  {
    itinerary: "14-Day Mediterranean Adventurer",
    ship: "Sky Princess",
    sailDate: "Saturday, July 18, 2026",
  },
  {
    itinerary: "12-Day British Isles with France & Belfast",
    ship: "Majestic Princess",
    sailDate: "Thursday, July 09, 2026",
  },
  {
    itinerary: "7-Day Eastern Caribbean with St. Thomas",
    ship: "Regal Princess",
    sailDate: "Saturday, July 04, 2026",
  },
  {
    itinerary: "7-Day Eastern Caribbean with Puerto Rico",
    ship: "Caribbean Princess",
    sailDate: "Sunday, July 26, 2026",
  },
  {
    itinerary: "7-Day Eastern Caribbean with Turks & Caicos",
    ship: "Caribbean Princess",
    sailDate: "Sunday, July 19, 2026",
  },
];

export const DEFAULT_CABIN = "Oceanview";

function formatDisplayDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

function formatVoyageDate(rawDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(rawDate));
}

function toVoyageId(voyage: VoyageDefinition) {
  return `${voyage.itinerary}__${voyage.ship}__${voyage.sailDate}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCabinSeries(runs: HistoryRun[], voyage: VoyageDefinition): CabinSeries[] {
  const seriesMap = new Map<string, CabinSeries>();

  for (const run of runs) {
    for (const result of run.results ?? []) {
      if (
        result.itinerary !== voyage.itinerary ||
        result.ship !== voyage.ship ||
        result.sail_date !== voyage.sailDate ||
        typeof result.price !== "number" ||
        !result.cabin
      ) {
        continue;
      }

      const existing = seriesMap.get(result.cabin) ?? {
        cabin: result.cabin,
        observations: [],
      };

      existing.observations.push({
        isoDate: run.checked_at,
        label: formatDisplayDate(run.checked_at),
        price: result.price,
      });

      seriesMap.set(result.cabin, existing);
    }
  }

  return Array.from(seriesMap.values())
    .map((series) => ({
      ...series,
      observations: [...series.observations].sort(
        (a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime(),
      ),
    }))
    .filter((series) => series.observations.length > 0)
    .sort((a, b) => {
      if (a.cabin === DEFAULT_CABIN) return -1;
      if (b.cabin === DEFAULT_CABIN) return 1;
      return a.cabin.localeCompare(b.cabin);
    });
}

export function getPrincessVoyages(): CuratedVoyage[] {
  const runs = history.runs as HistoryRun[];
  const voyages = CURATED_VOYAGES.map((voyage) => ({
    ...voyage,
    id: toVoyageId(voyage),
    sailDateLabel: formatVoyageDate(voyage.sailDate),
    seriesByCabin: getCabinSeries(runs, voyage),
  })).filter((voyage) => voyage.seriesByCabin.length > 0);

  if (!voyages.length) {
    throw new Error("No curated voyage series found in the historical dataset.");
  }

  return voyages;
}
