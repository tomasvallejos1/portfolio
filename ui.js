/* ------------------------------------------------------------------
   Comportamiento de interfaz compartido entre el home y las páginas
   de proyecto: menú, scroll, revelados, cursor y botones magnéticos.
------------------------------------------------------------------- */

(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const setupMenu = () => {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#mobile-menu');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      menu.setAttribute('aria-hidden', String(!open));
    };

    toggle.addEventListener('click', () => {
      setOpen(!document.body.classList.contains('menu-open'));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) setOpen(false);
    });
  };

  const setupScroll = () => {
    const header = document.querySelector('[data-header]');
    let ticking = false;

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
      header?.classList.toggle('scrolled', window.scrollY > 24);
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true },
    );
    update();
  };

  const setupReveal = () => {
    const elements = [...document.querySelectorAll('.reveal')];
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    );

    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
      observer.observe(element);
    });
  };

  const setupPointer = () => {
    if (!finePointer || reducedMotion) return;
    let pointerX = -500;
    let pointerY = -500;
    let frame = 0;

    const paint = () => {
      document.documentElement.style.setProperty('--pointer-x', `${pointerX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${pointerY}px`);
      frame = 0;
    };

    window.addEventListener(
      'pointermove',
      (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        document.body.classList.add('pointer-active');
        if (!frame) frame = window.requestAnimationFrame(paint);
      },
      { passive: true },
    );
  };

  const setupTilt = () => {
    if (!finePointer || reducedMotion) return;
    document.querySelectorAll('[data-tilt]').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        element.style.transform = `rotateY(${7 + x * 6}deg) rotateX(${2 - y * 6}deg) translate3d(0, 0, 0)`;
      });
      element.addEventListener('pointerleave', () => {
        element.style.transform = 'rotateY(7deg) rotateX(2deg)';
      });
    });
  };

  const setupMagnetic = () => {
    if (!finePointer || reducedMotion) return;
    document.querySelectorAll('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const bounds = element.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        element.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });
      element.addEventListener('pointerleave', () => {
        element.style.transform = '';
      });
    });
  };

  const setupYear = () => {
    const year = document.querySelector('#current-year');
    if (year) year.textContent = String(new Date().getFullYear());
  };

  /* Este archivo se carga último, después de los scripts que dibujan
     contenido, para que los revelados alcancen a los nodos generados. */
  window.PORTFOLIO_UI = Object.freeze({ reducedMotion, finePointer });

  setupMenu();
  setupScroll();
  setupPointer();
  setupTilt();
  setupMagnetic();
  setupYear();
  setupReveal();
})();
