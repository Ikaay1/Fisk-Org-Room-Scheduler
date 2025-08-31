import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoomFeature } from "@/helpers/config";
import MultiFeatureSelect from "./MultiFeatureSelect";
import { FeaturePill } from "./Utilities";

function FiltersBar(props: {
  q: string;
  setQ: (v: string) => void;
  capacity: number;
  setCapacity: (v: number) => void;
  features: RoomFeature[];
  setFeatures: (v: RoomFeature[]) => void;
  startAt: string;
  setStartAt: (v: string) => void;
  endAt: string;
  setEndAt: (v: string) => void;
}) {
  const {
    q,
    setQ,
    capacity,
    setCapacity,
    features,
    setFeatures,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
  } = props;
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Filter className="h-4 w-4" /> Find an available room
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2">
          <Label htmlFor="q" className="text-xs">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by building or name"
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <Label className="text-xs">Min capacity</Label>
          <Input
            type="number"
            min={1}
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value || 0))}
          />
        </div>
        <div>
          <Label className="text-xs">Features</Label>
          <MultiFeatureSelect value={features} onChange={setFeatures} />
          {/* {features.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {features.map((f) => (
                <FeaturePill key={f} feature={f} />
              ))}
            </div>
          )} */}
        </div>
        <div>
          <Label className="text-xs">Start</Label>
          <Input
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
          />
        </div>
        <div>
          <Label className="text-xs">End</Label>
          <Input
            type="datetime-local"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default FiltersBar;
