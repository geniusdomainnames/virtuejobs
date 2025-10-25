"use client";

import React, { useState } from "react";

export default function ApplicationLinkComponent({ applicationLink }) {
  const [showApplicationLink, setShowApplicationLink] = useState(false);

  // Your Adsterra Smart Link here
  const smartLink = "https://www.effectivegatecpm.com/j863baf13?key=5eb09c6845d00a31a42c2e5b01f7280e";

  const handleClick = () => {
    // Open Adsterra Smart Link in a new tab (simulate ad click)
    window.open(smartLink, "_blank");

    // Then reveal the actual application link
    setShowApplicationLink(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Application Link</h2>

      {showApplicationLink ? (
        <p className="overflow-hidden">
          <a
            href={applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-full text-blue-500 hover:underline break-all"
          >
            {applicationLink}
          </a>
        </p>
      ) : (
        <button
          onClick={handleClick}
          className="flex justify-between mt-2 bg-green-500 text-white p-2 rounded max-w-[120px]"
        >
          Show Link
        </button>
      )}
    </div>
  );
}
