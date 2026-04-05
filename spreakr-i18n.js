document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // TRANSLATIONS — paste your full LOCALES object below
  // ============================================================
  const LOCALES = {
    // PASTE YOUR FULL LOCALES OBJECT HERE
  };

  // Language metadata for switcher
  const LANG_LIST = [
    {code:'en',flag:'🇬🇧',name:'English'},
    {code:'af',flag:'🇿🇦',name:'Afrikaans'},
    {code:'ar',flag:'🇸🇦',name:'العربية'},
    {code:'fa',flag:'🇮🇷',name:'فارسی'},
    {code:'hi',flag:'🇮🇳',name:'हिंदी'},
    {code:'yo',flag:'🇳🇬',name:'Yorùbá'},
    {code:'fr',flag:'🇫🇷',name:'Français'},
    {code:'de',flag:'🇩🇪',name:'Deutsch'},
    {code:'pt',flag:'🇧🇷',name:'Português'},
    {code:'es',flag:'🇪🇸',name:'Español'},
    {code:'sw',flag:'🇰🇪',name:'Swahili'},
  ];

  // Country → language mapping
  const COUNTRY_LANG = {
    ZA:'af', NG:'yo', IR:'fa', IN:'hi', FR:'fr', DE:'de',
    BR:'pt', ES:'es', MX:'es', AR:'es', CO:'es',
    SA:'ar', AE:'ar', EG:'ar', MA:'ar',
    KE:'sw', TZ:'sw', UG:'sw',
    PK:'ur', BD:'bn', JP:'ja', KR:'ko', CN:'zh',
    NL:'nl', TR:'tr', RU:'ru',
  };

  let currentLang = 'en';

  function applyTranslations(lang) {
    const locale = LOCALES[lang] || LOCALES.en;
    currentLang = lang;

    document.documentElement.setAttribute('dir', locale.dir || 'ltr');
    document.documentElement.setAttribute('lang', lang);

    if (['ar','fa','ur'].includes(lang)) {
      if (!document.getElementById('rtl-font')) {
        const link = document.createElement('link');
        link.id = 'rtl-font';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap';
        document.head.appendChild(link);
      }
      document.body.style.fontFamily = "'Cairo', sans-serif";
    } else if (lang === 'hi') {
      if (!document.getElementById('deva-font')) {
        const link = document.createElement('link');
        link.id = 'deva-font';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800&display=swap';
        document.head.appendChild(link);
      }
      document.body.style.fontFamily = "'Noto Sans Devanagari', 'DM Sans', sans-serif";
    } else {
      document.body.style.fontFamily = "'DM Sans', system-ui, sans-serif";
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (locale[key]) el.textContent = locale[key];
    });

    const btnLabel = document.getElementById('langBtnLabel');
    if (btnLabel) btnLabel.textContent = lang.toUpperCase();

    document.querySelectorAll('.lang-option').forEach(el => {
      el.classList.toggle('active', el.dataset.lang === lang);
    });

    localStorage.setItem('spreakr_lang', lang);
  }

  function detectLanguage() {
    const saved = localStorage.getItem('spreakr_lang');
    if (saved && LOCALES[saved]) return saved;

    const browser = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
    if (LOCALES[browser]) return browser;

    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => {
        const lang = COUNTRY_LANG[d.country_code];
        if (lang && LOCALES[lang]) applyTranslations(lang);
      })
      .catch(() => {});

    return 'en';
  }

  function buildDropdown() {
    const dd = document.getElementById('langDropdown');
    if (!dd) return;

    dd.innerHTML = '';
    LANG_LIST.forEach(l => {
      const opt = document.createElement('div');
      opt.className = 'lang-option';
      opt.dataset.lang = l.code;
      opt.innerHTML = '<span>' + l.flag + '</span><span>' + l.name + '</span>';
      opt.addEventListener('click', () => {
        applyTranslations(l.code);
        dd.classList.remove('open');
      });
      dd.appendChild(opt);
    });
  }

  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', e => {
      e.stopPropagation();
      document.getElementById('langDropdown')?.classList.toggle('open');
    });
  }

  document.addEventListener('click', () => {
    document.getElementById('langDropdown')?.classList.remove('open');
  });

  const PILLS = [
    {flag:'🇿🇦',name:'Afrikaans',code:'af',d:0},
    {flag:'🇸🇦',name:'العربية',code:'ar',d:100},
    {flag:'🇮🇷',name:'فارسی',code:'fa',d:200},
    {flag:'🇮🇳',name:'हिंदी',code:'hi',d:300},
    {flag:'🇳🇬',name:'Yorùbá',code:'yo',d:400},
    {flag:'🇳🇬',name:'Hausa',code:'ha',d:500},
    {flag:'🇫🇷',name:'Français',code:'fr',d:600},
    {flag:'🇧🇷',name:'Português',code:'pt',d:700},
    {flag:'🇨🇳',name:'中文',code:'zh',d:800},
    {flag:'🇩🇪',name:'Deutsch',code:'de',d:900},
    {flag:'🇰🇪',name:'Swahili',code:'sw',d:1000},
    {flag:'🇯🇵',name:'日本語',code:'ja',d:1100},
    {flag:'🇷🇺',name:'Русский',code:'ru',d:1200},
    {flag:'🇰🇷',name:'한국어',code:'ko',d:1300},
    {flag:'🇳🇱',name:'Nederlands',code:'nl',d:1400},
    {flag:'🇹🇷',name:'Türkçe',code:'tr',d:1500},
  ];

  const c = document.getElementById('langFloat');
  if (c) {
    c.innerHTML = '';
    PILLS.forEach(l => {
      const el = document.createElement('div');
      el.className = 'lang-pill';
      el.style.animationDelay = l.d + 'ms';
      el.style.cursor = LOCALES[l.code] ? 'pointer' : 'default';
      el.innerHTML = '<span>' + l.flag + '</span><span>' + l.name + '</span>';

      if (LOCALES[l.code]) {
        el.title = 'View site in ' + l.name;
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
      }

      c.appendChild(el);
    });
  }

  buildDropdown();
  applyTranslations(detectLanguage());
});
