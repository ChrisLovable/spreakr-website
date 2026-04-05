document.addEventListener('DOMContentLoaded', () => {
  const LOCALES = {
    en: {
      dir: 'ltr',
      nav_features: 'Features',
      nav_languages: 'Languages',
      nav_pricing: 'Pricing',
      nav_earn: 'Earn with us',
      nav_cta: 'Start free trial',
      hero_badge: '🌍 Now supporting 90+ languages',
      hero_h1_1: 'Speak freely in your language.',
      hero_h1_2: 'Formulated professionally. Send in theirs.',
      hero_sub: "The world's first multilingual AI email command centre."
    },
    af: {
      dir: 'ltr',
      nav_features: 'Kenmerke',
      nav_languages: 'Tale',
      nav_pricing: 'Pryse',
      nav_earn: 'Verdien saam',
      nav_cta: 'Begin gratis proef',
      hero_badge: '🌍 Ondersteun nou 90+ tale',
      hero_h1_1: 'Praat vrylik in jou taal.',
      hero_h1_2: 'Professioneel geformuleer. Stuur in hulle s’n.',
      hero_sub: 'Die wêreld se eerste meertalige KI e-pos sentrum.'
    },
    ar: {
      dir: 'rtl',
      nav_features: 'الميزات',
      nav_languages: 'اللغات',
      nav_pricing: 'الأسعار',
      nav_earn: 'اكسب معنا',
      nav_cta: 'ابدأ تجربة مجانية',
      hero_badge: '🌍 يدعم الآن أكثر من 90 لغة',
      hero_h1_1: 'تحدث بحرية بلغتك.',
      hero_h1_2: 'بصياغة احترافية. أرسله بلغتهم.',
      hero_sub: 'أول مركز بريد إلكتروني بالذكاء الاصطناعي متعدد اللغات في العالم.'
    },
    fa: {
      dir: 'rtl',
      nav_features: 'ویژگی‌ها',
      nav_languages: 'زبان‌ها',
      nav_pricing: 'قیمت‌ها',
      nav_earn: 'با ما درآمد کسب کنید',
      nav_cta: 'شروع آزمایش رایگان',
      hero_badge: '🌍 اکنون از بیش از ۹۰ زبان پشتیبانی می‌شود',
      hero_h1_1: 'آزادانه به زبان خودت صحبت کن.',
      hero_h1_2: 'حرفه‌ای تنظیم می‌شود. به زبان آن‌ها ارسال کن.',
      hero_sub: 'اولین مرکز ایمیل هوش مصنوعی چندزبانه جهان.'
    }
  };

  function applyTranslations(lang) {
    const locale = LOCALES[lang] || LOCALES.en;

    document.documentElement.lang = lang;
    document.documentElement.dir = locale.dir || 'ltr';

    const btnLabel = document.getElementById('langBtnLabel');
    if (btnLabel) btnLabel.textContent = lang.toUpperCase();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (locale[key]) {
        el.textContent = locale[key];
      }
    });

    localStorage.setItem('spreakr_lang', lang);
  }

  const pills = [
    { flag: '🇿🇦', name: 'Afrikaans', code: 'af', d: 0 },
    { flag: '🇸🇦', name: 'العربية', code: 'ar', d: 100 },
    { flag: '🇮🇷', name: 'فارسی', code: 'fa', d: 200 },
    { flag: '🇬🇧', name: 'English', code: 'en', d: 300 }
  ];

  const c = document.getElementById('langFloat');
  if (c) {
    c.innerHTML = '';
    pills.forEach(l => {
      const el = document.createElement('div');
      el.className = 'lang-pill';
      el.style.animationDelay = l.d + 'ms';
      el.style.cursor = 'pointer';
      el.innerHTML = `<span>${l.flag}</span><span>${l.name}</span>`;
      el.addEventListener('click', () => applyTranslations(l.code));
      c.appendChild(el);
    });
  }

  const saved = localStorage.getItem('spreakr_lang') || 'en';
  applyTranslations(saved);
});
