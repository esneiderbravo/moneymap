import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// English
import dashboard_en from "./locales/en/dashboard.json";

// Spanish
import dashboard_es from "./locales/es/dashboard.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    ns: ["dashboard"],
    defaultNS: "dashboard",
    resources: {
      en: {
        dashboard: dashboard_en,
      },
      es: {
        dashboard: dashboard_es,
      },
    },
  });

export default i18n;
