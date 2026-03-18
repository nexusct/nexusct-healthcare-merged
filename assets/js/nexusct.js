/* NexusCT Site — Main JS */
(function () {
  'use strict';

  // ---- Preloader ----
  const pre = document.getElementById('preloader');
  if (pre) {
    // Hide immediately once DOM + scripts are ready
    pre.classList.add('hidden');
    // Also set a hard fallback in case something blocks
    setTimeout(() => pre.classList.add('hidden'), 800);
  }

  // ---- Sticky Header ----
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 60);
    scrollTopBtn && scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  // ---- Scroll-to-top ----
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- Mobile Nav ----
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Mobile sub-menu toggle
  document.querySelectorAll('.mobile-sub-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      const sub = this.nextElementSibling;
      if (sub) {
        const isOpen = sub.style.display === 'block';
        sub.style.display = isOpen ? 'none' : 'block';
        this.querySelector('.toggle-icon') && (this.querySelector('.toggle-icon').textContent = isOpen ? '+' : '−');
      }
    });
  });

  // ---- Scroll Reveal ----
  const revealEls = document.querySelectorAll('.fade-up, .fade-in');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('visible'), parseInt(delay));
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const body = item.querySelector('.faq-body');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-body').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ---- Counter Animation ----
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        animateCounter(el, target, 2000);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  // ---- Testimonial Slider (simple auto-rotate) ----
  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    let current = 0;
    const cards = slider.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    function showSlide(n) {
      cards.forEach((c, i) => c.style.display = i === n ? 'block' : 'none');
      dots.forEach((d, i) => d.classList.toggle('active', i === n));
    }
    if (cards.length) {
      showSlide(0);
      setInterval(() => { current = (current + 1) % cards.length; showSlide(current); }, 5000);
      dots.forEach((d, i) => d.addEventListener('click', () => { current = i; showSlide(i); }));
    }
  }

})();
