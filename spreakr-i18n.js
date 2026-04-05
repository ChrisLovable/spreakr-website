document.addEventListener('DOMContentLoaded', () => {
  const LOCALES = {
    en: { dir: 'ltr' },
    af: { dir: 'ltr' },
    ar: { dir: 'rtl' },
    fa: { dir: 'rtl' },
    hi: { dir: 'ltr' },
    yo: { dir: 'ltr' },
    ha: { dir: 'ltr' },
    fr: { dir: 'ltr' },
    pt: { dir: 'ltr' },
    zh: { dir: 'ltr' },
    de: { dir: 'ltr' },
    sw: { dir: 'ltr' },
    ja: { dir: 'ltr' },
    ru: { dir: 'ltr' },
    ko: { dir: 'ltr' },
    nl: { dir: 'ltr' },
    tr: { dir: 'ltr' }
  };

  function applyTranslations(lang) {
    const locale = LOCALES[lang] || LOCALES.en;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', locale.dir || 'ltr');

    const btn = document.getElementById('langBtnLabel');
    if (btn) btn.textContent = lang.toUpperCase();

    localStorage.setItem('spreakr_lang', lang);
  }

  const saved = localStorage.getItem('spreakr_lang') || 'en';
  applyTranslations(saved);

  const pills = [
    { flag: '🇿🇦', name: 'Afrikaans', code: 'af', d: 0 },
    { flag: '🇸🇦', name: 'العربية', code: 'ar', d: 100 },
    { flag: '🇮🇷', name: 'فارسی', code: 'fa', d: 200 },
    { flag: '🇮🇳', name: 'हिंदी', code: 'hi', d: 300 },
    { flag: '🇳🇬', name: 'Yorùbá', code: 'yo', d: 400 },
    { flag: '🇳🇬', name: 'Hausa', code: 'ha', d: 500 },
    { flag: '🇫🇷', name: 'Français', code: 'fr', d: 600 },
    { flag: '🇧🇷', name: 'Português', code: 'pt', d: 700 },
    { flag: '🇨🇳', name: '中文', code: 'zh', d: 800 },
    { flag: '🇩🇪', name: 'Deutsch', code: 'de', d: 900 },
    { flag: '🇰🇪', name: 'Swahili', code: 'sw', d: 1000 },
    { flag: '🇯🇵', name: '日本語', code: 'ja', d: 1100 },
    { flag: '🇷🇺', name: 'Русский', code: 'ru', d: 1200 },
    { flag: '🇰🇷', name: '한국어', code: 'ko', d: 1300 },
    { flag: '🇳🇱', name: 'Nederlands', code: 'nl', d: 1400 },
    { flag: '🇹🇷', name: 'Türkçe', code: 'tr', d: 1500 }
  ];

  const c = document.getElementById('langFloat');
  if (!c) return;

  c.innerHTML = '';

  pills.forEach(l => {
    const el = document.createElement('div');
    el.className = 'lang-pill';
    el.style.animationDelay = l.d + 'ms';
    el.style.cursor = 'pointer';
    el.innerHTML = `<span>${l.flag}</span><span>${l.name}</span>`;
    el.title = `View site in ${l.name}`;

    el.addEventListener('click', () => {
      applyTranslations(l.code);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    el.addEventListener('mouseenter', () => {
      el.style.borderColor = 'var(--accent)';
      el.style.color = '#fff';
      el.style.transform = 'translateY(-2px)';
    });

    el.addEventListener('mouseleave', () => {
      el.style.borderColor = '';
      el.style.color = '';
      el.style.transform = '';
    });

    c.appendChild(el);
  });
});
