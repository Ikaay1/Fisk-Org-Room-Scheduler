import { CLUBS } from "./config";

export function CLIBS_SAFE() {
  return CLUBS;
}

export function isoLocalNextHour(offsetHours = 1) {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  now.setHours(now.getHours() + Math.ceil(now.getMinutes() / 60) + offsetHours);
  const z = (n: number) => String(n).padStart(2, "0");
  const yyyy = now.getFullYear();
  const mm = z(now.getMonth() + 1);
  const dd = z(now.getDate());
  const hh = z(now.getHours());
  const mi = z(now.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

export function fmtTimeRange(startAt: string, endAt: string) {
  try {
    const s = new Date(startAt);
    const e = new Date(endAt);
    const fmt = (d: Date) =>
      d.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    return `${fmt(s)} – ${fmt(e)}`;
  } catch {
    return "";
  }
}

export function isRoomFree(roomId: string, start: string, end: string) {
  const day = new Date(start).getDate();
  // Simple deterministic mock: even-numbered days block r2 in the afternoon
  if (roomId === "r2" && day % 2 === 0) return false;
  return true;
}

export async function safeFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) {
    let errorBody;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { error: res.statusText };
    }

    const error = new Error(errorBody.error || "Request failed");
    (error as any).status = res.status;
    (error as any).body = errorBody;
    throw error;
  }

  return res.json();
}
