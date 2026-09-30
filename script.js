/* ------------------------------------------------------------------
   Home: dibuja proyectos, experiencia y trayectoria desde content.js.
------------------------------------------------------------------- */

(() => {
  'use strict';

  const data = window.PORTFOLIO_DATA || {
    projects: [],
    education: [],
    certifications: [],
  };

  const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const isExternal = (href) => /^https?:\/\//.test(href || '');

  const hostOf = (href) => {
    try {
      return new URL(href).hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  };

  const caseUrl = (project) => `proyectos/${project.slug}.html`;

  const externalLink = (className, label, href) => {
    const link = createElement('a', className);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.append(createElement('span', '', label), createElement('i', '', '↗'));
    return link;
  };

  /* --- Proyectos ---------------------------------------------------- */

  const buildCoverImage = (project) => {
    const image = createElement('img');
    image.src = project.cover;
    image.alt = project.coverAlt || `Captura real de ${project.title}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    return image;
  };

  /* Captura de celular: el mockup ya trae su propio marco, así que flota
     sobre el panel en vez de ir dentro de una ventana de navegador. */
  const buildPhoneCover = (project) => {
    const phone = createElement('div', 'project-phone');
    const image = buildCoverImage(project);
    image.width = 798;
    image.height = 1628;
    phone.append(image);
    return phone;
  };

  const buildBrowserCover = (project) => {
    const shot = createElement('div', 'project-shot');

    const bar = createElement('div', 'shot-bar');
    bar.setAttribute('aria-hidden', 'true');
    const dots = createElement('span', 'shot-dots');
    dots.append(createElement('i'), createElement('i'), createElement('i'));
    bar.append(dots, createElement('span', 'shot-url', hostOf(project.href)));

    const frame = createElement('div', 'shot-frame');
    const image = buildCoverImage(project);
    image.width = 1600;
    image.height = 1000;
    frame.append(image);

    shot.append(bar, frame);
    return shot;
  };

  const buildProjectVisual = (project) => {
    const visual = createElement('a', 'project-visual');
    visual.href = caseUrl(project);
    visual.setAttribute('aria-label', `Ver el caso completo de ${project.title}`);
    visual.tabIndex = -1;

    const label = createElement('div', 'project-visual-label');
    label.setAttribute('aria-hidden', 'true');
    label.append(createElement('i'), document.createTextNode(project.visualLabel || ''));

    visual.append(label);

    if (project.cover) {
      visual.append(project.coverDevice === 'mobile' ? buildPhoneCover(project) : buildBrowserCover(project));
    }

    if (project.status) {
      visual.append(createElement('span', 'project-status', project.status));
    }

    return visual;
  };

  const buildProjectContent = (project) => {
    const content = createElement('div', 'project-content');
    const top = createElement('div');

    const meta = createElement('div', 'project-meta');
    meta.append(createElement('span', '', project.number), createElement('span', '', project.category));

    const copy = createElement('div', 'project-copy');
    const heading = createElement('h3');
    const headingLink = createElement('a', 'project-title-link', project.title);
    headingLink.href = caseUrl(project);
    heading.append(headingLink);
    copy.append(heading, createElement('p', '', project.description));

    const tags = createElement('div', 'project-tags');
    project.technologies?.forEach((technology) => {
      tags.append(createElement('span', '', technology));
    });

    top.append(meta, copy, tags);

    const actions = createElement('div', 'project-actions');

    const primary = createElement('a', 'project-link');
    primary.href = caseUrl(project);
    primary.setAttribute('aria-label', `Ver el caso completo de ${project.title}`);
    primary.append(createElement('span', '', 'Ver el caso completo'), createElement('i', '', '↗'));

    const secondary = createElement('div', 'project-secondary-links');
    if (isExternal(project.href)) {
      secondary.append(externalLink('mini-link', project.linkLabel || 'Ver proyecto', project.href));
    }
    if (isExternal(project.source)) {
      secondary.append(externalLink('mini-link', project.sourceLabel || 'Código', project.source));
    }

    actions.append(primary);
    if (secondary.childElementCount) actions.append(secondary);

    content.append(top, actions);
    return content;
  };

  const renderProjects = () => {
    const list = document.querySelector('#project-list');
    if (!list) return;

    if (!data.projects?.length) {
      list.append(createElement('p', 'project-empty', 'Los proyectos estarán disponibles próximamente.'));
      return;
    }

    const featured = data.projects.filter((project) => project.featured !== false);
    const others = data.projects.filter((project) => project.featured === false);

    featured.forEach((project) => {
      const article = createElement('article', 'project-card reveal');
      article.style.setProperty('--project-color', project.accent || '#9381ff');
      article.append(buildProjectVisual(project), buildProjectContent(project));
      list.append(article);
    });

    renderMoreProjects(others, data.upcoming || []);
  };

  /* Carrusel compacto: miniatura + título, sin ocupar alto. */
  const renderMoreProjects = (others, upcoming) => {
    const wrap = document.querySelector('#more-projects');
    const track = document.querySelector('#more-track');
    if (!wrap || !track || !(others.length || upcoming.length)) return;

    others.forEach((project) => {
      const card = createElement('a', 'more-card');
      card.href = caseUrl(project);
      card.style.setProperty('--project-color', project.accent || '#9381ff');

      const thumb = createElement('span', 'more-thumb');
      if (project.cover) {
        const image = createElement('img');
        image.src = project.cover;
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';
        thumb.append(image);
      }

      const text = createElement('span', 'more-text');
      text.append(
        createElement('strong', '', project.title),
        createElement('span', 'more-meta', `${project.category.split(' · ')[0]} · ${project.year}`),
      );
      card.append(thumb, text, createElement('i', '', '↗'));
      track.append(card);
    });

    upcoming.forEach((item) => {
      const card = createElement('div', 'more-card is-soon');
      const thumb = createElement('span', 'more-thumb');
      thumb.setAttribute('aria-hidden', 'true');
      const text = createElement('span', 'more-text');
      text.append(createElement('strong', '', item.title), createElement('span', 'more-meta', item.label || 'Próximamente'));
      card.append(thumb, text);
      track.append(card);
    });

    wrap.hidden = false;

    const step = () => Math.max(track.clientWidth * 0.8, 240);
    wrap.querySelectorAll('.more-arrow').forEach((button) => {
      button.addEventListener('click', () => {
        track.scrollBy({ left: Number(button.dataset.dir) * step(), behavior: 'smooth' });
      });
    });

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const arrows = wrap.querySelectorAll('.more-arrow');
      arrows[0].disabled = track.scrollLeft <= 2;
      arrows[1].disabled = track.scrollLeft >= max - 2;
      wrap.classList.toggle('is-scrollable', max > 2);
    };
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  };

  /* --- Trayectoria --------------------------------------------------- */

  const renderJourney = (selector, items, type) => {
    const list = document.querySelector(selector);
    if (!list) return;

    if (!items?.length) {
      const empty = createElement('div', 'journey-empty');
      empty.append(createElement('span', '', 'PENDIENTE'));

      const content = createElement('div');
      const title = type === 'education' ? 'Formación por incorporar' : 'Credenciales por incorporar';
      const description =
        type === 'education'
          ? 'Esta información se completará cuando el CV esté disponible.'
          : 'Esta información se completará desde el CV o el perfil público.';
      content.append(createElement('strong', '', title), createElement('p', '', description));
      empty.append(content);
      list.append(empty);
      return;
    }

    items.forEach((item) => {
      const row = createElement('article', 'journey-item');
      row.append(createElement('time', '', item.period || item.year || ''));

      const content = createElement('div');
      const title = createElement('h4');
      if (item.href) {
        const link = createElement('a', 'journey-link', item.title);
        link.href = item.href;
        if (isExternal(item.href)) {
          link.target = '_blank';
          link.rel = 'noreferrer';
        }
        title.append(link);
      } else {
        title.textContent = item.title;
      }

      content.append(title, createElement('p', '', item.institution || item.issuer || ''));

      if (typeof item.progress === 'number') {
        const progress = createElement('div', 'journey-progress');
        progress.setAttribute('role', 'progressbar');
        progress.setAttribute('aria-valuenow', String(item.progress));
        progress.setAttribute('aria-valuemin', '0');
        progress.setAttribute('aria-valuemax', '100');
        progress.setAttribute('aria-label', `${item.progress}% completado`);

        const track = createElement('span', 'journey-progress-track');
        const fill = createElement('span', 'journey-progress-fill');
        fill.style.width = `${Math.max(0, Math.min(100, item.progress))}%`;
        track.append(fill);

        progress.append(track, createElement('span', 'journey-progress-label', `${item.progress}% completado`));
        content.append(progress);
      }

      row.append(content);
      list.append(row);
    });
  };

  const renderExperience = () => {
    const grid = document.querySelector('.journey-grid');
    if (!grid || !data.experience?.length) return;

    const block = createElement('section', 'experience-block reveal');
    block.setAttribute('aria-labelledby', 'experience-heading-title');

    const heading = createElement('div', 'experience-heading');
    const headingTitle = createElement('span', '', 'Experiencia');
    headingTitle.id = 'experience-heading-title';
    heading.append(headingTitle, createElement('small', '', 'Freelance · Soporte técnico · Testing'));

    const entries = createElement('div', 'experience-entries');
    data.experience.forEach((item) => {
      const entry = createElement(item.href ? 'a' : 'article', 'experience-entry');
      if (item.href) {
        entry.href = item.href;
        if (isExternal(item.href)) {
          entry.target = '_blank';
          entry.rel = 'noreferrer';
        }
      }
      entry.append(createElement('span', 'experience-period', item.period));
      const copy = createElement('div');
      copy.append(createElement('h3', '', item.title), createElement('p', '', item.description));
      entry.append(copy, createElement('i', '', '↗'));
      entries.append(entry);
    });

    block.append(heading, entries);
    grid.parentElement.insertBefore(block, grid);
  };

  const updateDataNotice = () => {
    const notice = document.querySelector('#data-notice');
    if (!notice) return;
    notice.hidden = Boolean(data.education?.length && data.certifications?.length);
  };

  /* --- Navegación activa --------------------------------------------- */

  const setupActiveNavigation = () => {
    if (!('IntersectionObserver' in window)) return;
    const links = [...document.querySelectorAll('.desktop-nav a')];
    const sections = links
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            const active = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
  };

  /* --- Datos personales en el layout ---------------------------------- */

  const hydratePerson = () => {
    const person = data.person || {};

    document.querySelectorAll('[data-person-link="linkedin"]').forEach((link) => {
      if (person.linkedin) link.href = person.linkedin;
    });

    document.querySelectorAll('[data-person-link="github"]').forEach((link) => {
      if (person.github) link.href = person.github;
    });

    document.querySelectorAll('[data-person-link="whatsapp"]').forEach((link) => {
      if (person.whatsapp) link.href = person.whatsapp;
    });

    document.querySelectorAll('[data-person-link="cv"]').forEach((link) => {
      if (person.cv) link.href = person.cv;
    });

    document.querySelectorAll('[data-person-link="email"]').forEach((link) => {
      if (!person.email) return;
      link.href = `mailto:${person.email}`;
      link.setAttribute('aria-label', `Enviar un email a ${person.email}`);
    });

    document.querySelectorAll('[data-person-text="location"]').forEach((node) => {
      if (person.location) node.textContent = person.location;
    });
  };

  renderProjects();
  renderExperience();
  renderJourney('#education-list', data.education, 'education');
  renderJourney('#certifications-list', data.certifications, 'certifications');
  updateDataNotice();
  hydratePerson();
  setupActiveNavigation();
})();
