import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import np from "./locales/np.json";

i18n
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      np: { translation: np },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"], // first check saved language
      caches: ["localStorage"], // store selected language
    },
  });

export default i18n;
