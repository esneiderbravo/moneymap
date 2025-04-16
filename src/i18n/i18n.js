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
import manage_en from "./locales/en/more/manage/manage.json";
import manage_accounts_en from "./locales/en/more/manage/accounts/accounts.json";
import register_en from "./locales/en/common/account/register.json";
import account_info_en from "./locales/en/common/account/account_info.json";
import keyboard_en from "./locales/en/common/keyboard.json";
import logout_en from "./locales/en/containers/logout.json";
import login_en from "./locales/en/containers/login.json";
import categories_en from "./locales/en/more/manage/categories/categories.json";
import transaction_en from "./locales/en/common/transaction/transaction.json";

// Spanish
import dashboard_es from "./locales/es/dashboard/dashboard.json";
import alerts_es from "./locales/es/dashboard/alerts/alerts.json";
import accounts_es from "./locales/es/dashboard/accounts/accounts.json";
import navigation_es from "./locales/es/common/navigation.json";
import more_es from "./locales/es/more/more.json";
import settings_es from "./locales/es/more/settings/settings.json";
import profile_es from "./locales/es/more/settings/profile/profile.json";
import language_switcher_es from "./locales/es/more/settings/profile/language_switcher.json";
import manage_es from "./locales/es/more/manage/manage.json";
import manage_accounts_es from "./locales/es/more/manage/accounts/accounts.json";
import register_es from "./locales/es/common/account/register.json";
import account_info_es from "./locales/es/common/account/account_info.json";
import keyboard_es from "./locales/es/common/keyboard.json";
import logout_es from "./locales/es/containers/logout.json";
import login_es from "./locales/es/containers/login.json";
import categories_es from "./locales/es/more/manage/categories/categories.json";
import transaction_es from "./locales/es/common/transaction/transaction.json";

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
        manage: manage_en,
        manage_accounts: manage_accounts_en,
        register_account: register_en,
        account_info: account_info_en,
        keyboard: keyboard_en,
        logout: logout_en,
        login: login_en,
        categories: categories_en,
        transaction: transaction_en,
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
        manage: manage_es,
        manage_accounts: manage_accounts_es,
        register_account: register_es,
        account_info: account_info_es,
        keyboard: keyboard_es,
        logout: logout_es,
        login: login_es,
        categories: categories_es,
        transaction: transaction_es,
      },
    },
  });

export default i18n;
