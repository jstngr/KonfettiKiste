import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { shouldEnableAnalytics } from "./analyticsGate";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

let analyticsPromise: Promise<Analytics | null> | null = null;

export function getAnalyticsSafe() {
  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      // ✅ do not track localhost / unknown hosts
      if (!shouldEnableAnalytics()) return null;

      const supported = await isSupported();
      if (!supported) return null;

      return getAnalytics(app);
    })();
  }
  return analyticsPromise;
}

export { app };
