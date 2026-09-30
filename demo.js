/* Página intermedia de la beta de MangoFi: botones para copiar los datos. */
(() => {
  'use strict';

  const flash = (button, text) => {
    const original = button.dataset.label || button.textContent;
    button.dataset.label = original;
    button.textContent = text;
    button.classList.add('is-done');
    window.setTimeout(() => {
      button.textContent = original;
      button.classList.remove('is-done');
    }, 1600);
  };

  const fallbackCopy = (value) => {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  };

  document.querySelectorAll('.demo-copy').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy || '';
      let ok = false;
      try {
        await navigator.clipboard.writeText(value);
        ok = true;
      } catch {
        ok = fallbackCopy(value);
      }
      flash(button, ok ? 'Copiado' : 'Copialo a mano');
    });
  });
})();
