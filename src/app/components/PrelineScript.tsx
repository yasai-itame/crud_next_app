"use client";

import { usePathname } from "next/navigation";
import { HSDropdown } from "preline/preline";
import { useEffect } from "react";

const isBrowser = typeof window !== undefined; // check if component is rendered in a browser

import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    if (isBrowser) {
      // if this component is rendered on a browser, import preline
      import("preline/preline");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isBrowser) {
        // if this component is rendered on a browser, import relevant preline plugins
        import("preline/preline").then(({ HSAccordion, HSDropdown, HSOverlay }) => {
          HSAccordion.autoInit();
          HSDropdown.autoInit();
          HSOverlay.autoInit();
        })
      }
    }, 100)
  }, [path]);

  return null;
}