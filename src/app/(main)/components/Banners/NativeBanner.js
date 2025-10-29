"use client";
import { useEffect } from "react";

export default function NativeBanner() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl27948983.effectivegatecpm.com/b494f1390b2830188510799240506b2c/invoke.js";
    document.getElementById("container-b494f1390b2830188510799240506b2c")?.appendChild(script);

    // Cleanup on unmount
    return () => {
      const container = document.getElementById("container-b494f1390b2830188510799240506b2c");
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div
      id="container-b494f1390b2830188510799240506b2c"
      className="flex justify-center my-6"
    />
  );
}
