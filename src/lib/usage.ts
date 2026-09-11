import { useCallback, useEffect, useState } from "react";

/**
 * Client-side daily usage tracker for anonymous/free visitors.
 * Server-side rate limiting is the real enforcement; this drives the UI counter.
 * When Supabase auth lands, read the plan from the session instead of "free".
 */
export const FREE_DAILY_LIMIT = 5;
const STORAGE_KEY = "mediadrop.usage.v1";

type UsageState = { date: string; used: number };

const today = () => new Date().toISOString().slice(0, 10);

function read(): UsageState {
  if (typeof window === "undefined") return { date: today(), used: 0 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as UsageState) : null;
    if (!parsed || parsed.date !== today()) return { date: today(), used: 0 };
    return parsed;
  } catch {
    return { date: today(), used: 0 };
  }
}

export function useDailyUsage() {
  const [used, setUsed] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUsed(read().used);
    setHydrated(true);
  }, []);

  const increment = useCallback(() => {
    const next = { date: today(), used: read().used + 1 };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — counter is best effort */
    }
    setUsed(next.used);
  }, []);

  const remaining = Math.max(0, FREE_DAILY_LIMIT - used);

  return { used, remaining, limitReached: hydrated && remaining === 0, hydrated, increment };
}
