import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoomFeature } from "@/helpers/config";
import MultiFeatureSelect from "./MultiFeatureSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FiltersBar(props: {
  q: string;
  setQ: (v: string) => void;
  capacity: number;
  setCapacity: (v: number) => void;
  features: RoomFeature[];
  setFeatures: (v: RoomFeature[]) => void;
  startAt: Date;
  setStartAt: (v: Date) => void;
  endAt: Date;
  setEndAt: (v: Date) => void;
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
        </div>
        <div>
          <Label className="text-xs">Start</Label>
          <DatePicker
            selected={startAt}
            onChange={(date) => setStartAt(date!)}
            showTimeSelect
            minDate={new Date()}
            dateFormat="Pp"
            className="text-sm border-1 p-1 rounded"
          />
        </div>
        <div>
          <Label className="text-xs">End</Label>
          <DatePicker
            selected={endAt}
            onChange={(date) => setEndAt(date!)}
            showTimeSelect
            minDate={new Date()}
            dateFormat="Pp"
            className="text-sm border-1 p-1 rounded"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default FiltersBar;
