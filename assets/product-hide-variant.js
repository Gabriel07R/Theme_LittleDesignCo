(() => {
  const initialized = new WeakSet();

  const initialize = (section) => {
    if (initialized.has(section)) return;
    const picker = section.querySelector('[data-hide-variant-picker]');
    if (!picker) return;
    initialized.add(section);

    let scheduled = false;
    let lastCorrection = '';

    const synchronize = () => {
      scheduled = false;
      if (!picker.isConnected || picker.classList.contains('is-loading')) return;

      const groups = Array.from(picker.querySelectorAll('[data-hide-variant-option]'));
      const selections = groups.map((group) => {
        const control = group.matches('select')
          ? (group.disabled ? null : group)
          : group.querySelector('input[type="radio"]:checked:not(:disabled)');
        return { group, control };
      });
      const correction = selections.find(({ group, control }) => {
        return control && control.value !== group.dataset.selectedValue;
      });

      if (!correction) {
        lastCorrection = '';
        return;
      }

      const signature = JSON.stringify(selections.map(({ group, control }) => {
        return [group.dataset.selectedValue, control?.value];
      }));
      if (signature === lastCorrection) return;
      lastCorrection = signature;
      correction.control.dispatchEvent(new Event('change', { bubbles: true }));
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(synchronize);
    };

    const observer = new MutationObserver(schedule);
    observer.observe(picker, { childList: true, subtree: true });
    picker.addEventListener('change', (event) => {
      if (event.isTrusted) lastCorrection = '';
    });
    document.addEventListener('shopify:section:unload', (event) => {
      if (event.target.contains(section)) observer.disconnect();
    });
    schedule();
  };

  const initializeAll = () => {
    document.querySelectorAll('[data-hide-unavailable-variants]').forEach(initialize);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
  } else {
    initializeAll();
  }
  document.addEventListener('shopify:section:load', initializeAll);
})();
