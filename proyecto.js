/* ------------------------------------------------------------------
   Página de proyecto. Toma el slug de `<body data-project="...">` y
   arma el caso completo desde content.js.
------------------------------------------------------------------- */

(() => {
  'use strict';

  const BASE = '../';
  const data = window.PORTFOLIO_DATA || { projects: [] };
  const root = document.querySelector('#case-root');
  const slug = document.body.dataset.project;
  const projects = data.projects || [];
  const project = projects.find((item) => item.slug === slug);

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const asset = (path) => (/^(https?:)?\/\//.test(path) ? path : BASE + path);

  /* El número del kicker se asigna al final, según las secciones que
     realmente existan: así agregar o sacar una no deja huecos. */
  const section = (id, label, title, extraClass = '') => {
    const node = el('section', `case-section ${extraClass}`.trim());
    if (id) node.id = id;

    const header = el('header', 'case-section-head reveal');
    if (label) {
      const kickerNode = el('div', 'section-kicker');
      kickerNode.append(el('span', 'case-section-number'), document.createTextNode(label));
      header.append(kickerNode);
    }
    header.append(el('h2', '', title));
    node.append(header);
    return node;
  };

  const linkOut = (href, label, className) => {
    const node = el('a', className);
    node.href = href;
    if (/^https?:\/\//.test(href)) {
      node.target = '_blank';
      node.rel = 'noreferrer';
    }
    node.append(el('span', '', label), el('i', '', '↗'));
    return node;
  };

  if (!project || !root) {
    if (root) {
      const missing = el('div', 'container case-missing');
      missing.append(
        el('h1', '', 'Proyecto no encontrado'),
        el('p', '', 'El caso que buscás todavía no está publicado.'),
      );
      const back = el('a', 'button button-primary');
      back.href = `${BASE}index.html#proyectos`;
      back.textContent = 'Volver a los proyectos';
      missing.append(back);
      root.append(missing);
    }
    return;
  }

  const caseData = project.case || {};
  document.documentElement.style.setProperty('--project-color', project.accent || '#9381ff');
  /* Versión oscura del acento para texto e íconos sobre fondo claro:
     un verde ácido o un coral no llegan a leerse sobre papel. */
  document.documentElement.style.setProperty('--project-ink', project.accentInk || project.accent || '#5b46d6');

  /* --- 1. Portada ---------------------------------------------------- */

  const buildHero = () => {
    const hero = el('header', 'case-hero');
    hero.style.setProperty('--project-color', project.accent || '#9381ff');

    const grid = el('div', 'case-hero-grid');
    grid.setAttribute('aria-hidden', 'true');

    const inner = el('div', 'container case-hero-inner');

    const back = el('a', 'case-back');
    back.href = `${BASE}index.html#proyectos`;
    back.append(el('i', '', '←'), el('span', '', 'Todos los proyectos'));

    const eyebrow = el('p', 'eyebrow case-eyebrow');
    eyebrow.append(
      el('span', 'case-number', project.number),
      document.createTextNode(project.category),
      el('i', '', '/'),
      document.createTextNode(project.year),
    );

    const title = el('h1', 'case-title', project.title);
    const tagline = el('p', 'case-tagline', caseData.tagline || project.description);

    const actions = el('div', 'case-actions');
    (caseData.links || []).forEach((link) => {
      actions.append(
        linkOut(
          link.href,
          link.label,
          link.kind === 'primary' ? 'button button-primary magnetic' : 'button button-ghost',
        ),
      );
    });

    const facts = el('dl', 'case-facts');
    (caseData.facts || []).forEach((fact) => {
      const item = el('div', 'case-fact');
      item.append(el('dt', '', fact.label), el('dd', '', fact.value));
      facts.append(item);
    });

    const tags = el('div', 'case-tags');
    (project.technologies || []).forEach((technology) => {
      tags.append(el('span', '', technology));
    });

    inner.append(back, eyebrow, title, tagline, actions);
    if (facts.childElementCount) inner.append(facts);
    if (tags.childElementCount) inner.append(tags);

    hero.append(grid, inner);
    return hero;
  };

  /* --- 2. Pantallas --------------------------------------------------- */

  const buildScreens = () => {
    const screens = caseData.screens;
    if (!screens?.items?.length) return null;

    const node = section('pantallas', 'Producto', screens.title || 'Pantallas reales');

    if (screens.note) {
      node.querySelector('.case-section-head').append(el('p', 'case-section-note', screens.note));
    }

    /* Si todas las capturas son de celular se muestran como una tira:
       una fila en escritorio y un carrusel deslizable en el teléfono. */
    const allPhones = screens.items.every((screen) => screen.device === 'mobile');
    const gallery = el('div', allPhones ? 'screen-gallery is-phones reveal' : 'screen-gallery');
    if (allPhones) {
      gallery.setAttribute('role', 'list');
      gallery.tabIndex = 0;
      gallery.setAttribute('aria-label', `${screens.items.length} capturas, deslizá para ver todas`);
    }

    screens.items.forEach((screen, index) => {
      /* `deviceFrame` marca las capturas que ya vienen con el marco del
         teléfono: no hay que dibujarles uno encima. En la tira de celulares
         se revela el carrusel entero, no cada captura al entrar de costado. */
      const classes = ['screen-card', `screen-${screen.device || 'desktop'}`];
      if (!allPhones) classes.push('reveal');
      if (screen.deviceFrame) classes.push('screen-framed');
      const figure = el('figure', classes.join(' '));
      if (allPhones) figure.setAttribute('role', 'listitem');

      const button = el('button', 'screen-shot');
      button.type = 'button';
      button.setAttribute('aria-label', `Ampliar captura: ${screen.caption || screen.alt}`);
      button.dataset.index = String(index);

      const image = el('img');
      image.src = asset(screen.src);
      image.alt = screen.alt || '';
      image.loading = index < 2 ? 'eager' : 'lazy';
      image.decoding = 'async';
      button.append(image, el('span', 'screen-zoom', '⤢'));

      const caption = el('figcaption', 'screen-caption');
      if (screen.caption) caption.append(el('strong', '', screen.caption));
      if (screen.text) caption.append(el('p', '', screen.text));

      figure.append(button, caption);
      gallery.append(figure);
    });

    node.append(gallery);
    if (allPhones) {
      const hint = el('p', 'screen-swipe-hint');
      hint.setAttribute('aria-hidden', 'true');
      hint.append(document.createTextNode(`Deslizá para ver las ${screens.items.length} pantallas `), el('i', '', '→'));
      node.append(hint);
    }
    return node;
  };

  /* --- 3. Narrativa ---------------------------------------------------- */

  const buildProblem = () => {
    const problem = caseData.problem;
    if (!problem) return null;

    const node = section('problema', 'Contexto', problem.title || 'El problema');
    const layout = el('div', 'case-split reveal');

    const main = el('div', 'case-prose');
    if (problem.lead) main.append(el('p', 'case-lead', problem.lead));
    (problem.paragraphs || []).forEach((text) => main.append(el('p', '', text)));

    layout.append(main);

    if (problem.bullets?.length) {
      const aside = el('aside', 'case-checklist');
      aside.append(el('span', 'card-label', 'Restricciones'));
      const list = el('ul');
      problem.bullets.forEach((text) => {
        const item = el('li');
        item.append(el('i', '', '→'), el('span', '', text));
        list.append(item);
      });
      aside.append(list);
      layout.append(aside);
    }

    node.append(layout);
    return node;
  };

  const buildOrigin = () => {
    const origin = caseData.origin;
    if (!origin) return null;

    const node = section('origen', 'Origen', origin.title || 'Cómo nació');
    const timeline = el('div', 'case-timeline reveal');
    (origin.paragraphs || []).forEach((text, index) => {
      const step = el('div', 'timeline-step');
      step.append(el('span', 'timeline-marker', String(index + 1).padStart(2, '0')), el('p', '', text));
      timeline.append(step);
    });
    node.append(timeline);
    return node;
  };

  const buildSolves = () => {
    const solves = caseData.solves;
    if (!solves?.items?.length) return null;

    const node = section('resuelve', 'Producto', solves.title || 'Qué resuelve');
    const grid = el('div', 'feature-grid');
    solves.items.forEach((item, index) => {
      const card = el('article', 'feature-card reveal');
      card.append(
        el('span', 'feature-number', String(index + 1).padStart(2, '0')),
        el('h3', '', item.title),
        el('p', '', item.text),
      );
      grid.append(card);
    });
    node.append(grid);
    return node;
  };

  const buildImpact = () => {
    const impact = caseData.impact;
    if (!impact?.stats?.length) return null;

    const node = section('impacto', 'Resultados', impact.title || 'Impacto medible');

    if (impact.lead) {
      node.querySelector('.case-section-head').append(el('p', 'case-lead perf-lead', impact.lead));
    }

    const grid = el('div', 'impact-grid');
    impact.stats.forEach((stat) => {
      const card = el('article', 'impact-stat reveal');
      card.append(el('strong', '', stat.value), el('span', '', stat.label));
      grid.append(card);
    });
    node.append(grid);

    if (impact.note) node.append(el('p', 'case-section-note impact-note', impact.note));
    return node;
  };

  /* --- 4. Técnica ------------------------------------------------------ */

  const buildStack = () => {
    const stack = caseData.stack;
    if (!stack?.groups?.length) return null;

    const node = section('stack', 'Tecnología', stack.title || 'Stack y por qué', 'case-section-dark');
    const groups = el('div', 'stack-groups');

    stack.groups.forEach((group) => {
      const block = el('div', 'stack-group reveal');
      block.append(el('h3', 'stack-group-title', group.name));
      const items = el('div', 'stack-items');
      group.items.forEach((item) => {
        const row = el('article', 'stack-item');
        row.append(el('h4', '', item.name), el('p', '', item.why));
        items.append(row);
      });
      block.append(items);
      groups.append(block);
    });

    node.append(groups);
    return node;
  };

  const buildPerformance = () => {
    const performance = caseData.performance;
    if (!performance?.items?.length) return null;

    const node = section(
      'rendimiento',
      'Rendimiento',
      performance.title || 'Rendimiento como parte de la experiencia',
    );

    if (performance.lead) {
      node.querySelector('.case-section-head').append(el('p', 'case-lead perf-lead', performance.lead));
    }

    const list = el('div', 'perf-list');
    performance.items.forEach((item) => {
      const row = el('article', 'perf-item reveal');
      row.append(el('i', 'perf-bullet', '↗'));
      const copy = el('div');
      copy.append(el('h3', '', item.title), el('p', '', item.text));
      row.append(copy);
      list.append(row);
    });

    node.append(list);
    return node;
  };

  const buildPatterns = () => {
    const patterns = caseData.patterns;
    if (!patterns?.items?.length) return null;

    const node = section(
      'patrones',
      'Arquitectura',
      patterns.title || 'Patrones y decisiones de diseño',
    );

    if (patterns.intro) {
      node.querySelector('.case-section-head').append(el('p', 'case-section-note', patterns.intro));
    }

    const grid = el('div', 'pattern-grid');
    patterns.items.forEach((item) => {
      const card = el('article', 'pattern-card reveal');
      const head = el('div', 'pattern-head');
      head.append(el('h3', '', item.name), el('i', '', '◇'));
      card.append(head);
      if (item.where) card.append(el('code', 'pattern-where', item.where));
      card.append(el('p', '', item.why));
      grid.append(card);
    });

    node.append(grid);
    return node;
  };

  const buildDecisions = () => {
    const decisions = caseData.decisions;
    if (!decisions?.items?.length) return null;

    const node = section(
      'decisiones',
      'Criterio',
      decisions.title || 'Decisiones que costaron',
    );

    const list = el('div', 'decision-list');
    decisions.items.forEach((item) => {
      const card = el('article', 'decision-card reveal');
      card.append(el('h3', '', item.title));

      const rows = el('div', 'decision-rows');
      const add = (label, text, className) => {
        if (!text) return;
        const row = el('div', `decision-row ${className}`.trim());
        row.append(el('span', 'decision-label', label), el('p', '', text));
        rows.append(row);
      };
      add('Qué hice', item.choice, 'is-choice');
      add('Por qué', item.why, 'is-why');
      add('A cambio', item.tradeoff, 'is-tradeoff');

      card.append(rows);
      list.append(card);
    });

    node.append(list);
    return node;
  };

  const buildLearned = () => {
    const learned = caseData.learned;
    if (!learned?.items?.length) return null;

    const node = section('aprendizajes', 'Cierre', learned.title || 'Lo que me llevo');
    const list = el('ul', 'learned-list reveal');
    learned.items.forEach((text) => {
      const item = el('li');
      item.append(el('i', '', '✦'), el('span', '', text));
      list.append(item);
    });
    node.append(list);
    return node;
  };

  /* --- 5. Pie: siguiente proyecto -------------------------------------- */

  const buildNext = () => {
    if (projects.length < 2) return null;

    const index = projects.findIndex((item) => item.slug === project.slug);
    const next = projects[(index + 1) % projects.length];

    const node = el('section', 'case-next');
    const inner = el('div', 'container case-next-inner reveal');

    const link = el('a', 'case-next-link');
    link.href = `${next.slug}.html`;
    link.style.setProperty('--project-color', next.accent || '#9381ff');
    link.append(
      el('span', 'case-next-label', 'Siguiente proyecto'),
      el('strong', '', next.title),
      el('span', 'case-next-meta', next.category),
      el('i', '', '↗'),
    );

    const contact = el('div', 'case-next-contact');
    contact.append(el('p', '', '¿Querés que construya algo así para vos?'));
    const mail = el('a', 'line-link');
    mail.href = `mailto:${data.person?.email || ''}`;
    mail.append(document.createTextNode('Escribime por email '), el('span', '', '↗'));
    contact.append(mail);

    inner.append(link, contact);
    node.append(inner);
    return node;
  };

  /* --- Lightbox --------------------------------------------------------- */

  const setupLightbox = () => {
    const items = caseData.screens?.items || [];
    if (!items.length) return;

    const overlay = el('div', 'lightbox');
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Captura ampliada');

    const image = el('img', 'lightbox-image');
    /* Placeholder transparente: evita una petición vacía antes de abrir. */
    image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    image.alt = '';
    const caption = el('p', 'lightbox-caption');
    const close = el('button', 'lightbox-close', '✕');
    close.type = 'button';
    close.setAttribute('aria-label', 'Cerrar');

    const figure = el('figure', 'lightbox-figure');
    figure.append(image, caption);
    overlay.append(close, figure);
    document.body.append(overlay);

    let lastFocused = null;

    const open = (index) => {
      const screen = items[index];
      if (!screen) return;
      image.src = asset(screen.src);
      image.alt = screen.alt || '';
      image.classList.toggle('is-framed', Boolean(screen.deviceFrame));
      caption.textContent = [screen.caption, screen.text].filter(Boolean).join(' — ');
      overlay.hidden = false;
      document.body.classList.add('lightbox-open');
      lastFocused = document.activeElement;
      close.focus();
    };

    const hide = () => {
      overlay.hidden = true;
      document.body.classList.remove('lightbox-open');
      if (lastFocused instanceof HTMLElement) lastFocused.focus();
    };

    document.querySelectorAll('.screen-shot').forEach((button) => {
      button.addEventListener('click', () => open(Number(button.dataset.index)));
    });

    close.addEventListener('click', hide);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) hide();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !overlay.hidden) hide();
    });
  };

  /* --- Render ----------------------------------------------------------- */

  const fragment = document.createDocumentFragment();
  fragment.append(buildHero());

  const body = el('div', 'case-body');
  [
    buildScreens(),
    buildProblem(),
    buildOrigin(),
    buildSolves(),
    buildImpact(),
    buildStack(),
    buildPerformance(),
    buildPatterns(),
    buildDecisions(),
    buildLearned(),
  ]
    .filter(Boolean)
    .forEach((node) => body.append(node));

  /* Numeración correlativa sobre las secciones que quedaron. */
  body.querySelectorAll('.case-section-number').forEach((node, index) => {
    node.textContent = String(index + 1).padStart(2, '0');
  });

  fragment.append(body);

  const next = buildNext();
  if (next) fragment.append(next);

  root.append(fragment);
  setupLightbox();

  /* Índice lateral: enlaza las secciones que realmente existen. */
  const nav = document.querySelector('#case-nav');
  if (nav) {
    const entries = [...root.querySelectorAll('.case-section[id]')];
    entries.forEach((node) => {
      const heading = node.querySelector('h2');
      const link = el('a', '', heading ? heading.textContent : node.id);
      link.href = `#${node.id}`;
      nav.append(link);
    });

    if ('IntersectionObserver' in window) {
      const links = [...nav.querySelectorAll('a')];
      const observer = new IntersectionObserver(
        (observed) => {
          observed.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
          });
        },
        { rootMargin: '-25% 0px -65% 0px' },
      );
      entries.forEach((node) => observer.observe(node));
    }
  }

  /* Enlaces del layout que dependen de los datos personales. */
  const person = data.person || {};
  document.querySelectorAll('[data-person-link="linkedin"]').forEach((link) => {
    if (person.linkedin) link.href = person.linkedin;
  });
  document.querySelectorAll('[data-person-link="github"]').forEach((link) => {
    if (person.github) link.href = person.github;
  });
  document.querySelectorAll('[data-person-text="location"]').forEach((node) => {
    if (person.location) node.textContent = person.location;
  });
})();
