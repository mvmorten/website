// Michael Mortensen — portfolio scripts
// Minimal: sticky nav state, mobile menu, scroll-reveal, year stamp.

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navLinks = document.querySelector('.nav-links');
  const navToggle = document.querySelector('.nav-toggle');
  const themeToggle = document.querySelector('.nav-themetoggle');

  // Theme toggle. Initial theme is set inline in <head> to avoid FOUC;
  // here we just sync button state and react to clicks + OS changes.
  const getTheme = () =>
    document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (themeToggle) {
      const isLight = theme === 'light';
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.setAttribute(
        'aria-label',
        isLight ? 'Switch to dark theme' : 'Switch to light theme'
      );
    }
  };

  applyTheme(getTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = getTheme() === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', next); } catch (e) {}
      applyTheme(next);
    });
  }

  // Follow OS changes only when the user hasn't pinned a choice.
  const mql = window.matchMedia('(prefers-color-scheme: light)');
  const onSchemeChange = (e) => {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) {}
    if (!saved) applyTheme(e.matches ? 'light' : 'dark');
  };
  if (mql.addEventListener) mql.addEventListener('change', onSchemeChange);
  else if (mql.addListener) mql.addListener(onSchemeChange);

  // Nav scrolled state
  const setNavState = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Reveal-on-scroll: tag content we want animated, then observe.
  const revealSelectors = [
    '.section-head',
    '.about-copy',
    '.stats li',
    '.timeline-item',
    '.case',
    '.skill-group',
    '.contact-card'
  ];
  document.querySelectorAll(revealSelectors.join(',')).forEach((el) => {
    el.classList.add('reveal');
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  }

  // Year stamp
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
