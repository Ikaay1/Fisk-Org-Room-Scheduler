export function isoLocalNextHour(offsetHours = 1) {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  now.setHours(now.getHours() + offsetHours);
  return now;
}

export const getStringDate = (now: Date) => {
  const z = (n: number) => String(n).padStart(2, "0");
  const yyyy = now.getFullYear();
  const mm = z(now.getMonth() + 1);
  const dd = z(now.getDate());
  const hh = z(now.getHours());
  const mi = z(now.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

export function fmtTimeRange(startAt: Date, endAt: Date) {
  try {
    const fmt = (d: Date) =>
      d.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    return `${fmt(startAt)} – ${fmt(endAt)}`;
  } catch {
    return "";
  }
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

export const toUtc = (local: Date) => local.toISOString();
