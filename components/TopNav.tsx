import { CalendarDays, DoorOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function TopNav() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DoorOpen className="h-5 w-5" />
          <span className="font-semibold tracking-tight">Campus Rooms</span>
          <Badge variant="outline" className="ml-2">
            MVP
          </Badge>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            Calendar
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Admin
          </Button>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
