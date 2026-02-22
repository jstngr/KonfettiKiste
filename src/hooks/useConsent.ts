import { useState, useEffect } from "react";

const CONSENT_KEY = "konfettikiste-consent";

export function useConsent() {
  const [consent, setConsent] = useState<boolean | null>(() => {
    // Initial read from localStorage
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "true") return true;
      if (stored === "false") return false;
    } catch (e) {
      console.error("Failed to read consent from localStorage", e);
    }
    return null;
  });

  // Listen for custom event to sync across components if necessary
  useEffect(() => {
    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ consent: boolean }>;
      setConsent(customEvent.detail.consent);
    };

    window.addEventListener("consentChange", handleConsentChange);
    return () => {
      window.removeEventListener("consentChange", handleConsentChange);
    };
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "true");
      setConsent(true);
      window.dispatchEvent(
        new CustomEvent("consentChange", { detail: { consent: true } }),
      );
    } catch (e) {
      console.error("Failed to save consent", e);
    }
  };

  const decline = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "false");
      setConsent(false);
      window.dispatchEvent(
        new CustomEvent("consentChange", { detail: { consent: false } }),
      );
    } catch (e) {
      console.error("Failed to save consent", e);
    }
  };

  return { consent, accept, decline };
}

export function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "true";
  } catch {
    return false;
  }
}
