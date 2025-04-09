// filepath: d:\Sem-6-project\Smart-automation-iot\client\app\components\ClientHydrationLogger.tsx
"use client";

import { useEffect } from "react";

export default function ClientHydrationLogger() {
  useEffect(() => {
    console.log("Hydration complete");

    return () => {
      console.log("Cleanup on unmount");
    };
  }, []);

  return null; // This component doesn't render anything
}