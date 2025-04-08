import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// English
import dashboard_en from "./locales/en/dashboard/dashboard.json";
import alerts_en from "./locales/en/dashboard/alerts/alerts.json";
import accounts_en from "./locales/en/dashboard/accounts/accounts.json";
import navigation_en from "./locales/en/common/navigation.json";
import more_en from "./locales/en/more/more.json";
import settings_en from "./locales/en/more/settings/settings.json";
import profile_en from "./locales/en/more/settings/profile/profile.json";
import language_switcher_en from "./locales/en/more/settings/profile/language_switcher.json";

// Spanish
import dashboard_es from "./locales/es/dashboard/dashboard.json";
import alerts_es from "./locales/es/dashboard/alerts/alerts.json";
import accounts_es from "./locales/es/dashboard/accounts/accounts.json";
import navigation_es from "./locales/es/common/navigation.json";
import more_es from "./locales/es/more/more.json";
import settings_es from "./locales/es/more/settings/settings.json";
import profile_es from "./locales/es/more/settings/profile/profile.json";
import language_switcher_es from "./locales/es/more/settings/profile/language_switcher.json";

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
        alerts: alerts_en,
        accounts: accounts_en,
        navigation: navigation_en,
        more: more_en,
        settings: settings_en,
        profile: profile_en,
        language_switcher: language_switcher_en,
      },
      es: {
        dashboard: dashboard_es,
        alerts: alerts_es,
        accounts: accounts_es,
        navigation: navigation_es,
        more: more_es,
        settings: settings_es,
        profile: profile_es,
        language_switcher: language_switcher_es,
      },
    },
  });

export default i18n;
