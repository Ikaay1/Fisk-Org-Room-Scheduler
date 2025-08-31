import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { RoomFeature } from "@/helpers/config";

export function useDebounced<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function FeaturePill({ feature }: { feature: RoomFeature }) {
  const label = feature[0].toUpperCase() + feature.slice(1);
  return (
    <Badge variant="secondary" className="capitalize">
      {label}
    </Badge>
  );
}

export function CapacityBar({
  value,
  max = 200,
}: {
  value: number;
  max?: number;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full h-2 rounded-full bg-muted/60">
      <div
        className="h-2 rounded-full bg-primary"
        style={{ width: `${pct}%` }}
        aria-hidden
      />
      <span className="sr-only">Capacity {value}</span>
    </div>
  );
}
