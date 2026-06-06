import * as React from "react";
import { useState, useEffect } from "react";
import { btnAmber } from "./ui";
import { getStoredConsent, setStoredConsent } from "../utils/consent";
import type { ConsentValue } from "../utils/consent";

const declineBtn =
  "inline-flex items-center justify-center px-5 py-[11px] rounded-sm border-2 border-white/20 text-bone text-[15px] font-bold no-underline cursor-pointer transition-colors duration-200 hover:border-forge hover:text-forge";

/**
 * Analytics consent banner. Shows once (until a choice is stored) and drives
 * Google Consent Mode via setStoredConsent. Only rendered when GA is configured
 * (see Layout) so there's nothing to consent to otherwise.
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getStoredConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (value: ConsentValue) => {
    setStoredConsent(value);
    setVisible(false);
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[200] bg-graphite text-[#cbc5ba] border-t-[3px] border-forge"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-site mx-auto px-6 py-4 flex items-center justify-between gap-4 max-[640px]:flex-col max-[640px]:items-stretch">
        <p className="text-[13px] leading-relaxed max-w-[640px] m-0">
          We use Google Analytics cookies to measure site traffic and improve
          your experience. Nothing is stored until you accept. You can decline
          and still use the site normally.
        </p>
        <div className="flex gap-2 shrink-0 max-[640px]:flex-col">
          <button
            type="button"
            className={declineBtn}
            onClick={() => choose("denied")}
          >
            Decline
          </button>
          <button
            type="button"
            className={btnAmber}
            onClick={() => choose("granted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
