"use client";

import { useEffect } from "react";
import { onCLS } from "web-vitals/attribution";

export default function WebVitalsDebugger() {
  useEffect(() => {
    onCLS((metric) => {
      if (metric.attribution) {
        console.group("🔍 CLS Attribution");
        console.log("CLS value:", metric.value);

        // The most important field: CSS selector of the element
        // that moved the most in the largest single shift
        console.log(
          "Largest shift target:",
          metric.attribution.largestShiftTarget,
        );

        // When the shift happened (ms since navigation start)
        console.log("Largest shift time:", metric.attribution.largestShiftTime);

        // Full attribution object for deeper analysis
        console.log("Full attribution:", metric.attribution);
        console.groupEnd();
      }
    });
  }, []);

  return null; // renders nothing
}
