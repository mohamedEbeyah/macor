import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './locales/ar.json';
import en from './locales/en.json';
import fr from './locales/fr.json';

i18n
  .use(initReactI18next)
  .init({
    lng: Localization.locale.split('-')[0] || 'en', // fallback to 'en' if no locale
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
