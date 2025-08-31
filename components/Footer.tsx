import { MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>Built by Ikechukwu Mgbemele</p>
        <p className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> Fisk University
        </p>
      </div>
    </footer>
  );
}

export default Footer;
