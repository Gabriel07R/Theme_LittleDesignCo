(() => {
  const findOptionSelect = (section, optionName) => {
    const normalizedOptionName = optionName.toLowerCase();

    return Array.from(section.querySelectorAll('.js-variant-selector')).find((select) => {
      const name = (select.getAttribute('name') || '').toLowerCase();
      return name === `options[${normalizedOptionName}]`;
    });
  };

  const getProductSection = (target) => {
    return target?.closest?.('[data-section-type="product-section"]') ||
      document.querySelector('[data-section-type="product-section"]');
  };

  const toggleFields = (fields, show) => {
    fields.forEach((field) => {
      field.style.display = show ? 'block' : 'none';

      field.querySelectorAll('input').forEach((input) => {
        input.disabled = !show;

        if (input.hasAttribute('data-com-required')) {
          input.required = show;
          input.classList.toggle('required', show);
        }

        if (!show) {
          input.classList.remove('required-error');
          input.value = '';
        }
      });
    });
  };

  const updateCustomFields = (section = getProductSection()) => {
    if (!section) return;

    const edgeFinishSelect = findOptionSelect(section, 'Edge Finish');
    const tapeTrimSelect = findOptionSelect(section, 'Tape Trim');
    const boxBandSelect = findOptionSelect(section, 'Box Band');
    const edgeFinishFields = section.querySelectorAll('.com-edge-finish-field');
    const trimFields = section.querySelectorAll('.com-trim-field');
    const insetFields = section.querySelectorAll('.com-inset-field');
    const boxBandFields = section.querySelectorAll('.com-box-band-field');

    const edgeFinish = (edgeFinishSelect?.value || '').trim().toLowerCase();
    const tapeTrim = (tapeTrimSelect?.value || '').trim().toLowerCase();
    const boxBand = (boxBandSelect?.value || '').trim().toLowerCase();
    const hasTrim = tapeTrim !== '' && !tapeTrim.includes('no trim');
    const hasParallelTrim = hasTrim && (tapeTrim.includes('parralel') || tapeTrim.includes('parallel'));

    toggleFields(edgeFinishFields, edgeFinish !== '' && !edgeFinish.includes('knife edge'));
    toggleFields(trimFields, hasTrim);
    toggleFields(insetFields, hasParallelTrim);
    toggleFields(boxBandFields, boxBand !== '' && !boxBand.includes('no box band'));
  };

  const scheduleUpdate = (section) => {
    updateCustomFields(section);
    setTimeout(() => updateCustomFields(section), 100);
    setTimeout(() => updateCustomFields(section), 300);
    setTimeout(() => updateCustomFields(section), 700);
  };

  const init = () => {
    const section = getProductSection();
    if (!section) return;

    scheduleUpdate(section);

    document.addEventListener('change', (event) => {
      if (!event.target.matches('.js-variant-selector')) return;

      scheduleUpdate(getProductSection(event.target));
    });

    const observer = new MutationObserver((mutations) => {
      const variantsChanged = mutations.some((mutation) => {
        return Array.from(mutation.addedNodes).some((node) => {
          return node instanceof Element && (
            node.matches?.('.product__variants-select') ||
            node.querySelector?.('.product__variants-select') ||
            node.matches?.('.com-edge-finish-field, .com-trim-field, .com-inset-field, .com-box-band-field') ||
            node.querySelector?.('.com-edge-finish-field, .com-trim-field, .com-inset-field, .com-box-band-field')
          );
        });
      });

      if (variantsChanged) {
        scheduleUpdate(section);
      }
    });

    observer.observe(section, {
      childList: true,
      subtree: true
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
