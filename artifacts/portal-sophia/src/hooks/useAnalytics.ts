import { useCallback, useEffect, useRef } from "react";

function getOrCreateSessionId(): string {
  const key = "sophia_session_id";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

const BASE_URL = import.meta.env.BASE_URL ?? "/";

async function sendEvent(
  eventType: "section_view" | "slider_change" | "cta_click",
  section: string,
  metadata?: Record<string, unknown>
) {
  try {
    await fetch(`${BASE_URL}api/analytics/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType,
        section,
        metadata,
        sessionId: getOrCreateSessionId(),
      }),
    });
  } catch {
  }
}

export function useTrackSectionView(section: string) {
  const tracked = useRef(false);

  const onVisible = useCallback(() => {
    if (!tracked.current) {
      tracked.current = true;
      sendEvent("section_view", section);
    }
  }, [section]);

  return onVisible;
}

export function useTrackSlider(section: string) {
  return useCallback(
    (sliderName: string, value: number) => {
      sendEvent("slider_change", section, { slider: sliderName, value });
    },
    [section]
  );
}

export function useTrackCta() {
  return useCallback((section: string, ctaLabel: string, href?: string) => {
    sendEvent("cta_click", section, { label: ctaLabel, href });
  }, []);
}

export function useSectionViewTracker(
  ref: React.RefObject<HTMLElement | null>,
  section: string,
  threshold = 0.1
) {
  const onVisible = useTrackSectionView(section);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible();
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, onVisible, threshold]);
}
