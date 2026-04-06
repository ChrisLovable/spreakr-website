/**
 * Spreakr marketing landing — language switcher + flag pills.
 * Depends on: /marketing-site-locales.js (sets window.MARKETING_LOCALES)
 */
(function () {
  const LOCALES = window.MARKETING_LOCALES || {};
  const FLAG_CC = {
    en: 'gb',
    af: 'za',
    ar: 'sa',
    fa: 'ir',
    hi: 'in',
    yo: 'ng',
    fr: 'fr',
    de: 'de',
    pt: 'br',
    es: 'es',
    sw: 'ke',
  };

  const LANG_LIST = [
    { code: 'en', name: 'English' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'ar', name: 'العربية' },
    { code: 'fa', name: 'فارسی' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'yo', name: 'Yorùbá' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
    { code: 'es', name: 'Español' },
    { code: 'sw', name: 'Swahili' },
  ];

  function flagImg(code) {
    const cc = FLAG_CC[code] || 'un';
    const src = `https://flagcdn.com/24x18/${cc}.png`;
    return `<img class="site-flag-img" src="${src}" width="24" height="18" alt="" loading="lazy" decoding="async">`;
  }

  function t(locale, key) {
    if (locale && locale[key] != null) return locale[key];
    const en = LOCALES.en || {};
    return en[key] != null ? en[key] : '';
  }

  function applyTranslations(lang) {
    const locale = LOCALES[lang] || LOCALES.en;
    if (!locale) return;

    document.documentElement.setAttribute('dir', locale.dir || 'ltr');
    document.documentElement.setAttribute('lang', lang);

    if (['ar', 'fa', 'ur'].includes(lang)) {
      if (!document.getElementById('rtl-font')) {
        const link = document.createElement('link');
        link.id = 'rtl-font';
        link.rel = 'stylesheet';
        link.href =
          'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap';
        document.head.appendChild(link);
      }
      document.body.style.fontFamily = "'Cairo', sans-serif";
    } else if (lang === 'hi') {
      if (!document.getElementById('deva-font')) {
        const link = document.createElement('link');
        link.id = 'deva-font';
        link.rel = 'stylesheet';
        link.href =
          'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800&display=swap';
        document.head.appendChild(link);
      }
      document.body.style.fontFamily = "'Noto Sans Devanagari', 'DM Sans', sans-serif";
    } else {
      document.body.style.fontFamily = '';
    }

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(locale, key);
      if (val) el.textContent = val;
    });

    const btnLabel = document.getElementById('langBtnLabel');
    if (btnLabel) {
      btnLabel.innerHTML = `${flagImg(lang)}<span>${lang.toUpperCase()}</span>`;
    }

    document.querySelectorAll('.lang-option').forEach((el) => {
      el.classList.toggle('active', el.dataset.lang === lang);
    });

    localStorage.setItem('spreakr_marketing_lang', lang);
  }

  function detectLanguage() {
    const saved = localStorage.getItem('spreakr_marketing_lang');
    if (saved && LOCALES[saved]) return saved;
    const browser = (navigator.language || '').split('-')[0];
    if (LOCALES[browser]) return browser;

    const COUNTRY_LANG = {
      ZA: 'af',
      NG: 'yo',
      IR: 'fa',
      IN: 'hi',
      FR: 'fr',
      DE: 'de',
      BR: 'pt',
      ES: 'es',
      MX: 'es',
      SA: 'ar',
      AE: 'ar',
      EG: 'ar',
      MA: 'ar',
      KE: 'sw',
      TZ: 'sw',
      UG: 'sw',
    };
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((d) => {
        const guess = COUNTRY_LANG[d.country_code];
        if (guess && LOCALES[guess]) applyTranslations(guess);
      })
      .catch(() => {});

    return 'en';
  }

  function buildDropdown() {
    const dd = document.getElementById('langDropdown');
    if (!dd) return;
    dd.innerHTML = '';
    LANG_LIST.forEach((l) => {
      const opt = document.createElement('button');
      opt.type = 'button';
      opt.className = 'lang-option';
      opt.dataset.lang = l.code;
      opt.innerHTML = `${flagImg(l.code)}<span>${l.name}</span>`;
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        applyTranslations(l.code);
        dd.classList.remove('open');
        const lb = document.getElementById('langBtn');
        if (lb) lb.setAttribute('aria-expanded', 'false');
      });
      dd.appendChild(opt);
    });
  }

  function buildPills() {
    const c = document.getElementById('langFloat');
    if (!c) return;
    c.innerHTML = '';
    LANG_LIST.forEach((l, i) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'lang-pill';
      el.style.animationDelay = `${i * 80}ms`;
      el.innerHTML = `${flagImg(l.code)}<span>${l.name}</span>`;
      el.title = `View site in ${l.name}`;
      el.addEventListener('click', () => {
        applyTranslations(l.code);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      c.appendChild(el);
    });
  }

  function bindNav() {
    const langBtn = document.getElementById('langBtn');
    const dd = document.getElementById('langDropdown');
    const switcher = document.querySelector('.lang-switcher');

    if (langBtn && dd) {
      langBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const open = !dd.classList.contains('open');
        dd.classList.toggle('open', open);
        langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    document.addEventListener('click', (e) => {
      if (switcher && switcher.contains(e.target)) return;
      if (dd) {
        dd.classList.remove('open');
        if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initHeroSliders() {
    const es = document.getElementById('h-emailSlider');
    const ts = document.getElementById('h-teamSlider');
    if (!es || !ts) return;

    function setVal(id, subId, mins) {
      const el = document.getElementById(id);
      const sub = document.getElementById(subId);
      if (!el) return;
      if (mins < 60) {
        el.textContent = `${Math.round(mins)} min`;
        if (sub) sub.textContent = '';
      } else {
        const h = mins / 60;
        el.textContent = `${h % 1 === 0 ? h : h.toFixed(1)} hrs`;
        if (sub) {
          if (h > 8) {
            const days = h / 8;
            sub.textContent = `(${days % 1 === 0 ? days : days.toFixed(1)} workdays)`;
          } else sub.textContent = '';
        }
      }
    }

    function upd() {
      const e = +es.value;
      const t = +ts.value;
      const day = e * 7.5;
      const month = day * 22;
      const ec = document.getElementById('h-emailCount');
      const tc = document.getElementById('h-teamCount');
      if (ec) ec.textContent = String(e);
      if (tc) tc.textContent = t === 1 ? '1 person' : `${t} people`;
      setVal('h-saveDay', 'h-saveDaySub', day);
      setVal('h-saveMonth', 'h-saveMonthSub', month);
      setVal('h-saveTeam', 'h-saveTeamSub', month * t);
    }
    es.addEventListener('input', upd);
    ts.addEventListener('input', upd);
    upd();
  }

  function initAffiliateCalc() {
    const slider = document.getElementById('aff-slider');
    const country = document.getElementById('aff-country');
    if (!slider || !country) return;

    function fmt(val, currency) {
      const n = Math.round(val);
      const s = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return currency + s;
    }

    function update() {
      const subs = +slider.value;
      const opt = country.options[country.selectedIndex];
      const price = +opt.value;
      const currency = opt.getAttribute('data-currency');
      const commission = price * 0.3;
      const monthly = commission * subs;
      const yearly = monthly * 12;
      const elSub = document.getElementById('aff-sub-count');
      const elM = document.getElementById('aff-month');
      const elY = document.getElementById('aff-year');
      const elP = document.getElementById('aff-per');
      const elNote = document.getElementById('aff-note');
      if (elSub) elSub.textContent = String(subs);
      if (elM) elM.textContent = fmt(monthly, currency);
      if (elY) elY.textContent = fmt(yearly, currency);
      if (elP) elP.textContent = fmt(commission, currency);
      if (elNote) {
        elNote.innerHTML = `${subs} people sign up once → you earn <strong style="color:var(--text)">${fmt(
          monthly,
          currency
        )} every month</strong> without doing anything more.`;
      }
    }
    slider.addEventListener('input', update);
    country.addEventListener('change', update);
    update();
  }

  function boot() {
    if (!window.MARKETING_LOCALES) {
      console.warn('[marketing-site] Missing MARKETING_LOCALES — load marketing-site-locales.js first');
      return;
    }
    buildDropdown();
    buildPills();
    bindNav();
    initHeroSliders();
    initAffiliateCalc();
    applyTranslations(detectLanguage());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
