"use client";
import { useEffect } from "react";

export default function DesktopBanner() {
  useEffect(() => {
    // Create the first script (atOptions)
    const inlineScript = document.createElement("script");
    inlineScript.type = "text/javascript";
    inlineScript.innerHTML = `
      atOptions = {
        'key' : '55095d0e4a9fa3c128613a18caf3b1b0',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;
    document.getElementById("ad-container").appendChild(inlineScript);

    // Create the external script
    const externalScript = document.createElement("script");
    externalScript.type = "text/javascript";
    externalScript.src = "//www.highperformanceformat.com/55095d0e4a9fa3c128613a18caf3b1b0/invoke.js";
    document.getElementById("ad-container").appendChild(externalScript);

    // Cleanup when component unmounts
    return () => {
      const container = document.getElementById("ad-container");
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div
      id="ad-container"
      className="flex justify-center items-center my-6"
      style={{ width: 160, height: 600 }}
    />
  );
}
