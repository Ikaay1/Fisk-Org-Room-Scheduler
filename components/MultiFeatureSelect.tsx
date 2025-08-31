import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RoomFeature } from "@/helpers/config";
import { ChevronRight } from "lucide-react";

function MultiFeatureSelect({
  value,
  onChange,
}: {
  value: RoomFeature[];
  onChange: (v: RoomFeature[]) => void;
}) {
  const options: { label: string; value: RoomFeature }[] = [
    { label: "Projector", value: "projector" },
    { label: "Whiteboard", value: "whiteboard" },
    { label: "Audio", value: "audio" },
    { label: "Accessible", value: "accessible" },
    { label: "Outlets", value: "outlets" },
  ];

  const toggle = (f: RoomFeature) => {
    const has = value.includes(f);
    onChange(has ? value.filter((v) => v !== f) : [...value, f]);
  };

  const buttonLabel =
    value.length === 0
      ? "Any feature"
      : value.length <= 2
      ? value.map((v) => v[0].toUpperCase() + v.slice(1)).join(", ")
      : `${value.length} selected`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={false}
          className="w-full justify-between"
        >
          {buttonLabel}
          <ChevronRight className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
        <Command>
          <CommandInput placeholder="Filter features..." />
          <CommandList>
            <CommandEmpty>No features found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => toggle(opt.value)}
                  className="gap-2"
                >
                  <Checkbox
                    checked={value.includes(opt.value)}
                    onCheckedChange={() => toggle(opt.value)}
                  />
                  <span>{opt.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default MultiFeatureSelect;
