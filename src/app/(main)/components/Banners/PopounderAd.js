"use client";
import { useEffect } from "react";

export default function PopunderAd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//pl27949037.effectivegatecpm.com/e3/bc/fc/e3bcfc5fb50e038f3cb5a2fb5f65babc.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
