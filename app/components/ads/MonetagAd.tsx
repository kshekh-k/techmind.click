"use client";

import { useEffect, memo } from "react";

export interface MonetagAdProps {
  /**
   * The Monetag zone ID. Defaults to "12175963".
   */
  zoneId?: string;
  /**
   * Optional custom CSS class name for the wrapper container.
   */
  className?: string;
}

const DEFAULT_ZONE_ID = "12175963";

function MonetagAd({
  zoneId = DEFAULT_ZONE_ID,
  className = "",
}: MonetagAdProps) {
  useEffect(() => {
    if (typeof window === "undefined" || !zoneId) return;

    try {
      // Check if script for this zone already exists to prevent duplicate loading
      const existingScript = document.querySelector(
        `script[data-zone="${zoneId}"][src*="nap5k.com/tag.min.js"]`
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.dataset.zone = zoneId;
        script.src = "https://nap5k.com/tag.min.js";
        script.async = true;

        // Append to document.body or document.documentElement as per Monetag tag snippet
        const target =
          [document.documentElement, document.body].filter(Boolean).pop() ||
          document.body ||
          document.documentElement;

        if (target) {
          target.appendChild(script);
        }
      }
    } catch (e) {
      console.warn("Unable to load Monetag ad script:", e);
    }
  }, [zoneId]);

  return (
    <div
      className={`monetag-ad-wrapper w-full flex justify-center items-center ${className}`.trim()}
      data-zone={zoneId}
      aria-label="Advertisement"
    />
  );
}

export { MonetagAd, MonetagAd as MonetagBanner, MonetagAd as MonetagTag };
export default memo(MonetagAd);
