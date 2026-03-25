import { createRoot } from 'react-dom/client';
import i18n from 'i18next';
import {  initReactI18next } from 'react-i18next';
import detector from "i18next-browser-languagedetector";
i18n
.use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage)
    resources: {
      en: {
        translation: {
          "Home": "Home",
          "Login":"Login",
          "Register":"Register",
          "Cart":"Cart",
          "Categories":"Categories",
          "Products":"Products",
          "Profile":"Profile"
        }
      },
      ar: {
        translation: {
          "Home": "الرئيسية",
          "Login":"تسجيل الدخول",
          "Logout":"تسجيل الخروج",
          "Register":"إنشاء حساب",
          "Cart":"السلة",
          "Categories":"التصنيفات",
          "Products":"المنتجات",
          "Profile":"الصفحة الشخصية"
        }
      },

    },
   
    fallbackLng: "en",

  
  });
  export default i18n 