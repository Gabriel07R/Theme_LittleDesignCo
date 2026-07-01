(function () {
  var storageKey = 'ldc:wishlist:v1';
  var groupsKey = 'ldc:wishlist:groups:v1';
  var groupOrderKey = 'ldc:wishlist:group-order:v1';
  var itemOrderKey = 'ldc:wishlist:item-order:v1';
  var proxyBase = '/apps/wishlist-1';
  var ungroupedId = '';
  var createGroupOptionValue = '__create_group__';
  var remoteState = null;
  var remoteReady = false;
  var labelSyncTimer = null;
  var preOrderLookupCache = {};
  var activeWishlistGroupId = null;
  var activeWishlistItemSortGroupId = null;
  var draggedWishlistGroupId = null;
  var draggedWishlistItemId = null;
  var pendingWishlistItemDragCard = null;
  var touchWishlistDrag = null;
  var wishlistBundleDragMoved = false;
  var wishlistBundleDragSuppressUntil = 0;
  var wishlistItemDragMoved = false;
  var wishlistItemDragSuppressUntil = 0;

  function compactShopifyId(value) {
    var stringValue = String(value || '').trim();
    var match = stringValue.match(/\/([^/]+)$/);

    return match ? match[1] : stringValue;
  }

  function readLocalWishlist() {
    try {
      var items = JSON.parse(window.localStorage.getItem(storageKey) || '[]');
      return Array.isArray(items) ? items : [];
    } catch (error) {
      return [];
    }
  }

  function readLocalGroups() {
    try {
      var groups = JSON.parse(window.localStorage.getItem(groupsKey) || '[]');
      if (!Array.isArray(groups)) return [];

      return groups.filter(function (group) {
        return group && group.id && group.name;
      });
    } catch (error) {
      return [];
    }
  }

  function writeLocalGroups(groups) {
    window.localStorage.setItem(groupsKey, JSON.stringify(groups));
    document.dispatchEvent(new CustomEvent('wishlist:groups-updated', { detail: { groups: groups } }));
  }

  function readGroupOrder() {
    try {
      var order = JSON.parse(window.localStorage.getItem(groupOrderKey) || '[]');
      return Array.isArray(order) ? order.map(String) : [];
    } catch (error) {
      return [];
    }
  }

  function writeGroupOrder(order) {
    window.localStorage.setItem(groupOrderKey, JSON.stringify(order.map(String)));
  }

  function getItemOrderGroupKey(groupId) {
    return itemOrderKey + ':' + String(groupId || ungroupedId);
  }

  function readItemOrder(groupId) {
    try {
      var order = JSON.parse(window.localStorage.getItem(getItemOrderGroupKey(groupId)) || '[]');
      return Array.isArray(order) ? order.map(String) : [];
    } catch (error) {
      return [];
    }
  }

  function writeItemOrder(groupId, order) {
    window.localStorage.setItem(getItemOrderGroupKey(groupId), JSON.stringify(order.map(String)));
  }

  function writeLocalWishlist(items) {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { items: items } }));
  }

  function useRemoteWishlist() {
    return remoteReady && remoteState !== null;
  }

  function readWishlist() {
    return useRemoteWishlist() ? remoteState.items : readLocalWishlist();
  }

  function readGroups() {
    return useRemoteWishlist() ? remoteState.groups : readLocalGroups();
  }

  function writeWishlist(items) {
    if (useRemoteWishlist()) return;
    writeLocalWishlist(items);
  }

  function getItemKey(item) {
    var productId = compactShopifyId(item.productId || item.handle || 'product');
    var variantId = compactShopifyId(item.variantId);

    if (variantId) return productId + ':' + variantId;
    return productId;
  }

  function getWishlistItemReference(item) {
    return String((item && item.id) || getItemKey(item));
  }

  function createWishlistItemId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }

    return 'item-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  }

  function isDefaultGroup(group) {
    return !group || group.id === ungroupedId || group.name === 'Default';
  }

  function getDefaultRemoteGroupId(groups) {
    var defaultGroup = groups.find(isDefaultGroup);
    return defaultGroup ? defaultGroup.id : ungroupedId;
  }

  function getDisplayGroupName(group) {
    return isDefaultGroup(group) ? 'Favorites' : group.name;
  }

  function isWishlistItemSortGroupActive(groupId) {
    return activeWishlistItemSortGroupId !== null &&
      String(activeWishlistItemSortGroupId) === String(groupId || ungroupedId);
  }

  function findFormVariantId(button) {
    var form = getAssociatedForm(button);
    if (!form) return button.dataset.variantId;

    var variantInput = form.querySelector('[name="id"]:checked') ||
      form.querySelector('select[name="id"]') ||
      form.querySelector('input[name="id"]') ||
      form.querySelector('.formVariantId');

    return variantInput && variantInput.value ? variantInput.value : button.dataset.variantId;
  }

  function itemFromButton(button) {
    var variantId = findFormVariantId(button);
    var labelHtml = findSourceProductLabelHtml(button);
    var insertVariant = findInsertVariant(button, variantId);

    return {
      id: createWishlistItemId(),
      productId: button.dataset.productId,
      handle: button.dataset.productHandle,
      title: button.dataset.productTitle,
      url: buildVariantUrl(button.dataset.productUrl, variantId),
      image: findVariantImage(button, variantId) || button.dataset.productImage,
      price: findVariantPrice(button, variantId),
      productOriginalPrice: findVariantOriginalPrice(button, variantId),
      variantId: variantId,
      variantTitle: findVariantTitle(button, variantId),
      insertVariantId: insertVariant.id,
      insertVariantTitle: insertVariant.title,
      insertVariantPrice: insertVariant.price,
      insertVariantOriginalPrice: insertVariant.originalPrice,
      labelHtml: labelHtml,
      preOrder: button.dataset.productPreorder === 'true',
      preOrderLabel: button.dataset.productPreorderLabel || 'Pre-order',
      groupId: ungroupedId,
      available: button.dataset.productAvailable === 'true',
      addedAt: new Date().toISOString()
    };
  }

  function buildVariantUrl(url, variantId) {
    if (!url || !variantId) return url;
    var hashIndex = url.indexOf('#');
    var hash = hashIndex > -1 ? url.slice(hashIndex) : '';
    var baseUrl = hashIndex > -1 ? url.slice(0, hashIndex) : url;
    var separator = baseUrl.indexOf('?') > -1 ? '&' : '?';

    return baseUrl + separator + 'variant=' + encodeURIComponent(variantId) + hash;
  }

  function getAssociatedForm(button) {
    var form = button.closest('form');
    if (form) return form;

    var formId = button.getAttribute('form');
    return formId ? document.getElementById(formId) : null;
  }

  function getProductContext(button) {
    var node = button;

    while (node && node !== document) {
      if (node.querySelector && node.querySelector('.product-json')) return node;
      node = node.parentElement;
    }

    return button.closest('[data-section-type="product-section"]') ||
      button.closest('[data-product-id]') ||
      button.closest('.product__section') ||
      button.closest('.js-quickview-wrapper') ||
      document;
  }

  function findSourceProductLabelHtml(button) {
    var context = getProductContext(button);
    var card = button.closest('.product-index, .product-index-inner, [data-product-id]');
    var labels = [];

    if (card) {
      labels = labels.concat(Array.from(card.querySelectorAll('[data-bss-pl-text-id], .bss-countdown-display.bss_pl_label_text, .bss_pl_label_text')));
    }

    if (context && context !== document) {
      labels = labels.concat(Array.from(context.querySelectorAll('[data-bss-pl-text-id], .bss-countdown-display.bss_pl_label_text, .bss_pl_label_text')));
    }

    var label = labels.find(function (entry) {
      return !isPreOrderLabelText(entry.textContent || '');
    });

    return label ? label.outerHTML : '';
  }

  function sanitizeWishlistLabelHtml(html) {
    var template = document.createElement('template');

    template.innerHTML = String(html || '').trim();
    template.content.querySelectorAll('script, style, iframe, object, embed').forEach(function (element) {
      element.remove();
    });
    template.content.querySelectorAll('*').forEach(function (element) {
      Array.from(element.attributes).forEach(function (attribute) {
        if (/^on/i.test(attribute.name)) element.removeAttribute(attribute.name);
      });
    });
    removePreOrderLabelNodes(template.content);

    return template.innerHTML;
  }

  function isPreOrderLabelText(value) {
    return /pre[\s-]*order|back[\s-]*order/i.test(String(value || ''));
  }

  function isPreOrderLabelHtml(html) {
    var template = document.createElement('template');

    template.innerHTML = String(html || '').trim();
    return isPreOrderLabelText(template.content.textContent || '');
  }

  function removePreOrderLabelNodes(root) {
    root.querySelectorAll('[data-bss-pl-text-id], .bss-countdown-display.bss_pl_label_text, .bss_pl_label_text').forEach(function (label) {
      if (!isPreOrderLabelText(label.textContent || '')) return;

      var parent = label.closest('.bss_parent_text');
      var otherLabels = parent ? Array.from(parent.querySelectorAll('[data-bss-pl-text-id], .bss-countdown-display.bss_pl_label_text, .bss_pl_label_text')) : [];
      var hasOtherLabel = otherLabels.some(function (otherLabel) {
        return otherLabel !== label && !isPreOrderLabelText(otherLabel.textContent || '');
      });

      if (parent && !hasOtherLabel) {
        parent.remove();
      } else {
        label.remove();
      }
    });

    root.querySelectorAll('.bss_pl_img, .bss_parent_text').forEach(function (wrapper) {
      if (!String(wrapper.textContent || '').trim() && wrapper.children.length === 0) {
        wrapper.remove();
      }
    });
  }

  function findVariantFromProductJson(button, variantId) {
    var context = getProductContext(button);
    var productJson = context.querySelector('.product-json');
    var compactVariantId = compactShopifyId(variantId);

    if (!productJson || !compactVariantId) return null;

    try {
      var product = JSON.parse(productJson.textContent || '{}');
      var variants = product.variants || [];
      var variant = variants.find(function (entry) {
        return compactShopifyId(entry.id) === compactVariantId;
      });

      if (!variant) return null;

      return {
        product: product,
        variant: variant
      };
    } catch (error) {
      return null;
    }
  }

  function formatVariantTitleFromJson(match) {
    var variant = match.variant;
    var variantOptions = variant.options || [variant.option1, variant.option2, variant.option3].filter(Boolean);

    if (variant.title && variant.title !== 'Default Title' && variantOptions.length === 0) {
      return variant.title;
    }

    var values = variantOptions.filter(function (value) {
      return value && value !== 'Default Title';
    });

    if (values.length > 0) return values.join(' / ');
    return variant.title === 'Default Title' ? '' : variant.title || '';
  }

  function normalizeWishlistImageUrl(url) {
    return String(url || '').trim();
  }

  function findProductMediaImage(product, mediaId) {
    if (!product || !mediaId) return '';

    var media = (product.media || []).find(function (entry) {
      return compactShopifyId(entry.id) === compactShopifyId(mediaId);
    });

    return media ? normalizeWishlistImageUrl(media.src) : '';
  }

  function findVariantImage(button, variantId) {
    var variantMatch = findVariantFromProductJson(button, variantId);
    var image = '';

    if (variantMatch) {
      var variant = variantMatch.variant;
      image = normalizeWishlistImageUrl(variant.featured_image && variant.featured_image.src);

      if (!image && variant.featured_media && variant.featured_media.id) {
        image = findProductMediaImage(variantMatch.product, variant.featured_media.id);
      }
    }

    return image || normalizeWishlistImageUrl(button.dataset.variantImage);
  }

  function collectAssociatedControls(form, context, selector) {
    var controls = [];
    var seen = [];

    if (form) {
      controls = controls.concat(Array.from(form.querySelectorAll(selector)));

      if (form.id) {
        controls = controls.concat(Array.from(document.querySelectorAll(selector + '[form="' + form.id + '"]')));
      }
    }

    if (context && context !== document) {
      controls = controls.concat(Array.from(context.querySelectorAll(selector)));
    }

    return controls.filter(function (control) {
      if (seen.indexOf(control) > -1) return false;
      seen.push(control);
      return true;
    });
  }

  function findVariantTitle(button, variantId) {
    var variantMatch = findVariantFromProductJson(button, variantId);
    if (variantMatch) {
      var jsonTitle = formatVariantTitleFromJson(variantMatch);
      if (jsonTitle) return jsonTitle;
    }

    var form = getAssociatedForm(button);
    var context = getProductContext(button);
    var values = [];

    if (form || context) {
      collectAssociatedControls(form, context, 'select[name^="options["]').forEach(function (select) {
        var value = select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : select.value;
        value = String(value || '').replace(/\s+-\s+Unavailable$/, '').trim();
        if (value) values.push(value);
      });

      collectAssociatedControls(form, context, 'input[name^="options["]:checked').forEach(function (input) {
        if (input.value) values.push(input.value);
      });

      collectAssociatedControls(form, context, 'input[data-option-value-id]:checked').forEach(function (input) {
        if (input.name.indexOf('options[') === 0) return;

        if (input.value) values.push(input.value);
      });
    }

    if (values.length > 0) return values.join(' / ');
    return button.dataset.variantTitle === 'Default Title' ? '' : button.dataset.variantTitle || '';
  }

  function findVariantPrice(button, variantId) {
    var variantMatch = findVariantFromProductJson(button, variantId);
    var moneyFormat = window.jsFormat && window.jsFormat.money;

    if (variantMatch && window.theme && window.theme.Helpers && typeof window.theme.Helpers.formatMoney === 'function') {
      return window.theme.Helpers.formatMoney(variantMatch.variant.price, moneyFormat);
    }

    return button.dataset.productPrice || '';
  }

  function findVariantOriginalPrice(button, variantId) {
    var variantMatch = findVariantFromProductJson(button, variantId);

    if (variantMatch && variantMatch.variant && variantMatch.variant.originalPrice) {
      return variantMatch.variant.originalPrice;
    }

    return button.dataset.productOriginalPrice || '';
  }

  function findInsertVariant(button, variantId) {
    var variantMatch = findVariantFromProductJson(button, variantId);
    var insertVariant = variantMatch && variantMatch.variant ? variantMatch.variant.insertVariant : null;
    var moneyFormat = window.jsFormat && window.jsFormat.money;
    var price = '';

    if (!insertVariant || !insertVariant.id) {
      if (button.dataset.insertVariantId) {
        return {
          id: compactShopifyId(button.dataset.insertVariantId),
          title: button.dataset.insertVariantTitle || '',
          price: button.dataset.insertVariantPrice || '',
          originalPrice: button.dataset.insertVariantOriginalPrice || ''
        };
      }

      return {
        id: '',
        title: '',
        price: '',
        originalPrice: ''
      };
    }

    if (insertVariant.price && window.theme && window.theme.Helpers && typeof window.theme.Helpers.formatMoney === 'function') {
      price = window.theme.Helpers.formatMoney(insertVariant.price, moneyFormat);
    }

    return {
      id: compactShopifyId(insertVariant.id),
      title: insertVariant.title || '',
      price: price,
      originalPrice: variantMatch.variant.insertOriginalPrice || ''
    };
  }

  function formatVariantTitleForDisplay(variantTitle) {
    return String(variantTitle || '')
      .split(' / ')
      .map(function (part) {
        return part.replace(/^[^:]+:\s*/, '').trim();
      })
      .filter(Boolean)
      .join(' / ');
  }

  function normalizeRemoteWishlist(payload) {
    var groups = (payload.groups || []).map(function (group) {
      return {
        id: String(group.id || ''),
        name: String(group.name || 'Default'),
        sortOrder: group.sortOrder || group.sort_order || 0,
        items: []
      };
    }).filter(function (group) {
      return group.id;
    });

    var items = (payload.items || []).map(function (item) {
      var metadata = item.metadata || {};
      var variantId = metadata.variantId || metadata.rawVariantId || compactShopifyId(item.variantId);
      var productId = metadata.productId || metadata.rawProductId || compactShopifyId(item.productId);
      var productUrl = item.productUrl || metadata.url || metadata.productUrl || '';

      return {
        id: item.id,
        groupId: item.groupId || item.group_id || getDefaultRemoteGroupId(groups),
        productId: productId,
        variantId: variantId,
        handle: item.handle || '',
        title: item.title || '',
        image: item.imageUrl || item.image_url || metadata.image || '',
        price: metadata.price || '',
        productOriginalPrice: metadata.productOriginalPrice || '',
        variantTitle: metadata.variantTitle || '',
        insertVariantId: metadata.insertVariantId || '',
        insertVariantTitle: metadata.insertVariantTitle || '',
        insertVariantPrice: metadata.insertVariantPrice || '',
        insertVariantOriginalPrice: metadata.insertVariantOriginalPrice || '',
        labelHtml: metadata.labelHtml || '',
        preOrder: metadata.preOrder === true || metadata.preOrder === 'true' || isPreOrderLabelHtml(metadata.labelHtml),
        preOrderLabel: metadata.preOrderLabel || 'Pre-order',
        sortOrder: item.sortOrder || item.sort_order || 0,
        url: productUrl || (item.handle ? '/products/' + item.handle : ''),
        createdAt: item.createdAt || item.created_at,
        updatedAt: item.updatedAt || item.updated_at
      };
    });
    applySharedPreOrderState(items);

    return {
      groups: groups,
      items: items,
      customerId: payload.customerId || ''
    };
  }

  function setRemoteState(payload) {
    remoteState = normalizeRemoteWishlist(payload);
    remoteReady = true;
  }

  function applySharedPreOrderState(items) {
    var preorderByProduct = {};

    items.forEach(function (item) {
      var productKey = compactShopifyId(item.productId) || item.handle || item.title;
      if (!productKey || !item.preOrder) return;

      preorderByProduct[productKey] = item.preOrderLabel || 'Pre-order';
    });

    items.forEach(function (item) {
      var productKey = compactShopifyId(item.productId) || item.handle || item.title;
      if (!productKey || !preorderByProduct[productKey]) return;

      item.preOrder = true;
      item.preOrderLabel = preorderByProduct[productKey];
    });
  }

 function apiRequest(path, options) {
  options = options || {};

  var method = (options.method || 'GET').toUpperCase();
  var url = proxyBase + path;
  var config = {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  if (method !== 'GET') {
    var params = new URLSearchParams();
    params.set('_method', method);
    if (options.body) params.set('payload', JSON.stringify(options.body));

    url += (url.indexOf('?') > -1 ? '&' : '?') + params.toString();
  }

  return fetch(url, config).then(function (response) {
    return response.json().catch(function () {
      return {};
    }).then(function (payload) {
      if (!response.ok) {
        var error = new Error(payload.error || payload.message || 'Favorites request failed');
        error.status = response.status;
        error.payload = payload;
        throw error;
      }

      return payload;
    });
  });
}

  function loadRemoteWishlist() {
    return apiRequest('').then(function (payload) {
      setRemoteState(payload);
      return migrateLocalWishlistToRemote(payload.customerId);
    }).then(function () {
      updateButtons();
      renderWishlistPage();
    }).catch(function (error) {
      console.error('Favorites load failed:', error.status, error.payload || error);
      remoteState = null;
      remoteReady = false;
      updateButtons();
      renderWishlistPage();
    });

  }

  function migrateLocalWishlistToRemote(customerId) {
    var localItems = readLocalWishlist();
    var localGroups = readLocalGroups();
    var migrationKey = 'ldc:wishlist:migrated:' + (customerId || 'customer');
    var groupMap = {};
    var sequence = Promise.resolve();

    if (!localItems.length || window.localStorage.getItem(migrationKey) === 'true') {
      return Promise.resolve();
    }

    localGroups.forEach(function (group) {
      sequence = sequence.then(function () {
        return apiRequest('/groups', {
          method: 'POST',
          body: { name: group.name }
        }).then(function (payload) {
          setRemoteState(payload);
          var matchingGroup = remoteState.groups.find(function (remoteGroup) {
            return remoteGroup.name.toLowerCase() === group.name.toLowerCase();
          });
          if (matchingGroup) groupMap[group.id] = matchingGroup.id;
        });
      });
    });

    localItems.forEach(function (item) {
      sequence = sequence.then(function () {
        var remoteGroupId = groupMap[item.groupId] || '';
        return addRemoteItem(item, remoteGroupId);
      });
    });

    return sequence.then(function () {
      window.localStorage.setItem(migrationKey, 'true');
    });
  }

  function addRemoteItem(item, groupId) {
    return apiRequest('/items', {
      method: 'POST',
      body: {
        productId: item.productId,
        variantId: item.variantId,
        groupId: groupId || item.groupId || '',
        groupName: 'Default',
        handle: item.handle,
        title: item.title,
        imageUrl: item.image,
        productUrl: item.url,
        metadata: {
          price: item.price || '',
          productOriginalPrice: item.productOriginalPrice || '',
          variantTitle: item.variantTitle || '',
          insertVariantId: item.insertVariantId || '',
          insertVariantTitle: item.insertVariantTitle || '',
          insertVariantPrice: item.insertVariantPrice || '',
          insertVariantOriginalPrice: item.insertVariantOriginalPrice || '',
          labelHtml: item.labelHtml || '',
          preOrder: item.preOrder === true,
          preOrderLabel: item.preOrderLabel || 'Pre-order',
          productId: item.productId || '',
          variantId: item.variantId || ''
        }
      }
    }).then(function (payload) {
      setRemoteState(payload);
      return payload;
    });
  }

  function removeRemoteItem(item) {
    return apiRequest('/items', {
      method: 'DELETE',
      body: item.id ? {
        itemId: item.id
      } : {
        productId: item.productId,
        variantId: item.variantId
      }
    }).then(function (payload) {
      setRemoteState(payload);
      return payload;
    });
  }

  function removeRemoteItems(items) {
    var sequence = Promise.resolve();

    items.forEach(function (item) {
      sequence = sequence.then(function () {
        return removeRemoteItem(item);
      });
    });

    return sequence;
  }

  function createRemoteGroup(name) {
    return apiRequest('/groups', {
      method: 'POST',
      body: { name: name }
    }).then(function (payload) {
      setRemoteState(payload);
      return payload;
    });
  }

  function renameRemoteGroup(groupId, name) {
    return apiRequest('/groups/' + encodeURIComponent(groupId), {
      method: 'PATCH',
      body: { name: name }
    }).then(function (payload) {
      setRemoteState(payload);
      return payload;
    });
  }

  function deleteRemoteGroup(groupId) {
    return apiRequest('/groups/' + encodeURIComponent(groupId), {
      method: 'DELETE'
    }).then(function (payload) {
      setRemoteState(payload);
      return payload;
    });
  }

  function moveRemoteItemToGroup(item, groupId) {
    if (!item || !item.id) return Promise.reject(new Error('Missing favorite item'));

    return apiRequest('/items/' + encodeURIComponent(item.id), {
      method: 'PATCH',
      body: {
        groupId: groupId || '',
        groupName: 'Default'
      }
    }).then(function (payload) {
      setRemoteState(payload);
      return payload;
    });
  }

  function isWishlisted(button, items) {
    var item = itemFromButton(button);
    var key = getItemKey(item);
    return items.some(function (savedItem) {
      return getItemKey(savedItem) === key;
    });
  }

  function updateButtons() {
    var items = readWishlist();

    document.querySelectorAll('[data-wishlist-button]').forEach(function (button) {
      var active = isWishlisted(button, items);
      var label = button.querySelector('[data-wishlist-label]');

      button.setAttribute('aria-pressed', active ? 'true' : 'false');
      if (label) {
        var labelText = active ? 'Remove from favorites' : 'Add to favorites';
        if (label.textContent !== labelText) label.textContent = labelText;
      }
    });

    document.querySelectorAll('[data-wishlist-count]').forEach(function (count) {
      count.textContent = items.length;
      count.hidden = items.length === 0;
    });
  }

  function toggleItem(button) {
    var items = readWishlist();
    var item = itemFromButton(button);
    var key = getItemKey(item);
    var existingItems = items.filter(function (savedItem) {
      return getItemKey(savedItem) === key;
    });

    if (useRemoteWishlist()) {
      var request = existingItems.length ? removeRemoteItems(existingItems) : addRemoteItem(item);
      return request.then(function () {
        updateButtons();
        renderWishlistPage();
      }).catch(function (error) {
        console.error('Favorites update failed:', error.status, error.payload || error);
        showGroupMessage('Favorites could not be updated. Please try again.');
      });
    }

    if (existingItems.length) {
      items = items.filter(function (savedItem) {
        return getItemKey(savedItem) !== key;
      });
    } else {
      items.unshift(item);
    }

    writeWishlist(items);
    updateButtons();
    renderWishlistPage();
  }

  function renderWishlistPage() {
    var container = document.querySelector('[data-wishlist-items]');
    if (!container) return;

    var empty = document.querySelector('[data-wishlist-empty]');
    var items = readWishlist();
    var groups = readGroups();
    var groupedItems = buildGroupedItems(items, groups);
    var hasCustomGroups = groups.some(function (group) {
      return !isDefaultGroup(group);
    });

    container.innerHTML = '';
    if (empty) empty.hidden = items.length > 0 || hasCustomGroups;

    if (!groupedItems.length) return;

    if (activeWishlistGroupId !== null) {
      var activeGroup = groupedItems.find(function (group) {
        return String(group.id) === String(activeWishlistGroupId);
      });

      if (activeGroup) {
        renderWishlistGroup(container, activeGroup, groups, true);
      } else {
        activeWishlistGroupId = null;
        renderWishlistBundleOverview(container, groupedItems);
      }
    } else {
      renderWishlistBundleOverview(container, groupedItems);
    }

    scheduleWishlistLabelSync();
    hydrateWishlistPreOrderBadges();
    removeWishlistPreOrderBssLabels();
  }

  function renderWishlistBundleOverview(container, groupedItems) {
    var section = document.createElement('section');
    section.className = 'wishlist-bundles';

    section.innerHTML = '<header class="wishlist-bundles__header"><h2 class="wishlist-bundles__title h3">Groups</h2></header>';

    var grid = document.createElement('div');
    grid.className = 'wishlist-bundles__grid';

    groupedItems.forEach(function (group) {
      grid.appendChild(renderWishlistBundleCard(group));
    });

    section.appendChild(grid);
    container.appendChild(section);
  }

  function renderWishlistGroup(container, group, groups, showBackButton) {
    var section = document.createElement('section');
    var isSorting = isWishlistItemSortGroupActive(group.id);

    section.className = 'wishlist-group' + (isSorting ? ' is-sorting' : '');
    section.dataset.wishlistGroup = group.id;

    section.innerHTML = renderGroupHeader(group, showBackButton);

    var grid = document.createElement('div');
    grid.className = 'wishlist-page__grid';

    if (group.items.length === 0) {
      grid.innerHTML = '<p class="wishlist-group__empty">No favorites in this bundle yet.</p>';
    } else {
      group.items.forEach(function (item) {
        grid.appendChild(renderWishlistCard(item, groups, isSorting));
      });
    }

    section.appendChild(grid);
    container.appendChild(section);
  }

  function renderWishlistDragHandle(extraClass) {
    return '<span class="wishlist-drag-handle ' + extraClass + '" data-wishlist-drag-handle aria-hidden="true">' +
      '<svg class="wishlist-drag-handle__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
        '<path d="M22 8C21.4477 8 21 7.55228 21 7V4.41421L13.4142 12L21 19.5858V17C21 16.4477 21.4477 16 22 16C22.5523 16 23 16.4477 23 17V21C23 22.1046 22.1046 23 21 23H17C16.4477 23 16 22.5523 16 22C16 21.4477 16.4477 21 17 21H19.5858L12 13.4142L4.41421 21H7C7.55228 21 8 21.4477 8 22C8 22.5523 7.55228 23 7 23H3C1.89543 23 1 22.1046 1 21V17C1 16.4477 1.44772 16 2 16C2.55228 16 3 16.4477 3 17V19.5858L10.5858 12L3 4.41422V7C3 7.55228 2.55228 8 2 8C1.44772 8 1 7.55228 1 7V3C1 1.89543 1.89543 1 3 1H7C7.55228 1 8 1.44772 8 2C8 2.55228 7.55228 3 7 3H4.41421L12 10.5858L19.5858 3H17C16.4477 3 16 2.55228 16 2C16 1.44772 16.4477 1 17 1H21C22.1046 1 23 1.89543 23 3V7C23 7.55228 22.5523 8 22 8Z"></path>' +
      '</svg>' +
    '</span>';
  }

  function renderWishlistMenuBarsIcon() {
    return '<svg class="wishlist-card__summary-menu-icon" viewBox="0 0 27 12.78" aria-hidden="true" focusable="false">' +
      '<path d="M0,6a.67.67,0,0,1,.67-.67H24.83a.67.67,0,0,1,0,1.34H.67A.67.67,0,0,1,0,6Z"></path>' +
      '<path d="M0,11.41a.67.67,0,0,1,.67-.67H24.83a.67.67,0,1,1,0,1.34H.67A.67.67,0,0,1,0,11.41Z"></path>' +
      '<path d="M0,.67A.67.67,0,0,1,.67,0H24.83a.67.67,0,0,1,0,1.34H.67A.67.67,0,0,1,0,.67Z"></path>' +
    '</svg>';
  }

  function renderWishlistQuantitySelector() {
    return '<label class="wishlist-card__quantity">Quantity' +
      '<span class="wishlist-card__quantity-selector">' +
        '<button type="button" style="border-right: 0;" class="wishlist-card__quantity-button" data-wishlist-quantity-adjust="-1" aria-label="Decrease quantity">-</button>' +
        '<input class="wishlist-card__quantity-input" type="number" min="1" inputmode="numeric" value="1" data-wishlist-quantity aria-label="Quantity">' +
        '<button type="button" style="border-left: 0;" class="wishlist-card__quantity-button" data-wishlist-quantity-adjust="1" aria-label="Increase quantity">+</button>' +
      '</span>' +
    '</label>';
  }

  function renderWishlistBundleCard(group) {
    var card = document.createElement('article');
    var previewItems = group.items.slice(0, 4);
    var count = group.items.length;
    var countLabel = count === 1 ? '1 favorite' : count + ' favorites';
    var previewMarkup = '';

    card.className = 'wishlist-bundle-card';
    card.draggable = true;
    card.dataset.wishlistGroupId = group.id;

    previewItems.forEach(function (item) {
      previewMarkup += item.image
        ? '<span class="wishlist-bundle-card__image"><img src="' + escapeAttribute(item.image) + '" alt="' + escapeAttribute(item.title) + '" loading="lazy"></span>'
        : '<span class="wishlist-bundle-card__image wishlist-bundle-card__image--empty"></span>';
    });

    while (previewItems.length < 4) {
      previewMarkup += '<span class="wishlist-bundle-card__image wishlist-bundle-card__image--empty"></span>';
      previewItems.push({});
    }

    card.innerHTML =
      '<button type="button" class="wishlist-bundle-card__open" data-wishlist-open-group data-wishlist-group-id="' + escapeAttribute(group.id) + '">' +
        '<span class="wishlist-bundle-card__preview" aria-hidden="true">' + previewMarkup + '</span>' +
        '<span class="wishlist-bundle-card__meta">' +
          '<span class="wishlist-bundle-card__title-row">' +
            '<span class="wishlist-bundle-card__title">' + escapeHtml(getDisplayGroupName(group)) + '</span>' +
            renderWishlistDragHandle('wishlist-bundle-card__drag-handle') +
          '</span>' +
          '<span class="wishlist-bundle-card__count">' + escapeHtml(countLabel) + '</span>' +
        '</span>' +
      '</button>';

    return card;
  }

  function buildGroupedItems(items, groups) {
    var customGroups = groups.filter(function (group) {
      return !isDefaultGroup(group);
    });

    if (items.length === 0 && customGroups.length === 0) return [];

    var defaultGroupId = getDefaultRemoteGroupId(groups);
    var groupIds = customGroups.map(function (group) {
      return group.id;
    });
    var ungroupedItems = items.filter(function (item) {
      return !item.groupId || item.groupId === defaultGroupId || groupIds.indexOf(item.groupId) === -1;
    });
    var output = [];

    if (ungroupedItems.length > 0) {
      output.push({
        id: defaultGroupId,
        name: 'Default',
        sortOrder: 0,
        items: ungroupedItems
      });
    }

    customGroups.forEach(function (group) {
      output.push({
        id: group.id,
        name: group.name,
        sortOrder: group.sortOrder || 0,
        items: items.filter(function (item) {
          return item.groupId === group.id;
        })
      });
    });

    output = output.map(applyItemOrderToGroup);

    return applyGroupOrder(output);
  }

  function applyItemOrderToGroup(group) {
    var items = (group.items || []).slice();
    var savedOrder = readItemOrder(group.id);

    if (savedOrder.length) {
      group.items = items.sort(function (a, b) {
        var aIndex = savedOrder.indexOf(getWishlistItemReference(a));
        var bIndex = savedOrder.indexOf(getWishlistItemReference(b));

        if (aIndex > -1 && bIndex > -1) return aIndex - bIndex;
        if (aIndex > -1) return -1;
        if (bIndex > -1) return 1;

        return (a.sortOrder || 0) - (b.sortOrder || 0);
      });
      return group;
    }

    if (useRemoteWishlist()) {
      group.items = items.sort(function (a, b) {
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      });
      return group;
    }

    group.items = items;

    return group;
  }

  function applyGroupOrder(groups) {
    if (useRemoteWishlist()) {
      return groups.slice().sort(function (a, b) {
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      });
    }

    var savedOrder = readGroupOrder();

    return groups.slice().sort(function (a, b) {
      var aId = String(a.id);
      var bId = String(b.id);
      var aIndex = savedOrder.indexOf(aId);
      var bIndex = savedOrder.indexOf(bId);

      if (aIndex > -1 && bIndex > -1) return aIndex - bIndex;
      if (aIndex > -1) return -1;
      if (bIndex > -1) return 1;

      return (a.sortOrder || 0) - (b.sortOrder || 0);
    });
  }

  function renderGroupHeader(group, showBackButton) {
    var backButton = showBackButton
      ? '<button type="button" class="text-button wishlist-group__back" data-wishlist-close-group>Back to Groups</button>'
      : '';
    var isSorting = isWishlistItemSortGroupActive(group.id);
    var sortButton = '<button type="button" data-wishlist-toggle-item-sort>' + (isSorting ? 'Done sorting' : 'Sort') + '</button>';

    if (isDefaultGroup(group)) {
      return '<header class="wishlist-group__header">' +
        backButton +
        '<div class="wishlist-group__heading">' +
          '<div class="wishlist-group__title-row">' +
            '<h2 class="wishlist-group__title h3">' + getDisplayGroupName(group) + '</h2>' +
            '<button type="button" class="wishlist-group__menu-toggle" aria-label="Group options" aria-expanded="false" data-wishlist-group-menu-toggle>...</button>' +
          '</div>' +
          '<div class="wishlist-group__menu" data-wishlist-group-menu hidden>' +
            sortButton +
            '<button type="button" data-wishlist-add-group-to-cart data-wishlist-group-id="' + escapeAttribute(group.id) + '">Add all to cart</button>' +
          '</div>' +
        '</div>' +
      '</header>';
    }

    return '<header class="wishlist-group__header">' +
      backButton +
      '<div class="wishlist-group__heading">' +
        '<div class="wishlist-group__title-row">' +
          '<h2 class="wishlist-group__title h3">' + escapeHtml(group.name) + '</h2>' +
          '<button type="button" class="wishlist-group__menu-toggle" aria-label="Group options" aria-expanded="false" data-wishlist-group-menu-toggle>...</button>' +
        '</div>' +
        '<div class="wishlist-group__menu" data-wishlist-group-menu hidden>' +
          sortButton +
          '<button type="button" data-wishlist-add-group-to-cart data-wishlist-group-id="' + escapeAttribute(group.id) + '">Add all to cart</button>' +
          '<button type="button" data-wishlist-edit-group-name>Edit name</button>' +
          '<button type="button" data-wishlist-duplicate-group>Duplicate</button>' +
          '<button type="button" data-wishlist-delete-group>Delete group</button>' +
        '</div>' +
        '<form class="wishlist-group__rename" data-wishlist-rename-form hidden>' +
          '<input type="text" value="' + escapeAttribute(group.name) + '" maxlength="40" data-wishlist-rename-input>' +
          '<button type="submit" class="button">Save</button>' +
          '<button type="button" class="text-button" data-wishlist-cancel-rename>Cancel</button>' +
        '</form>' +
      '</div>' +
    '</header>';
  }

  function renderWishlistCard(item, groups, isSorting) {
    var card = document.createElement('article');
    card.className = 'wishlist-card';
    card.draggable = Boolean(isSorting);
    card.dataset.wishlistItem = getWishlistItemReference(item);
    card.dataset.wishlistKey = getItemKey(item);
    card.dataset.productId = compactShopifyId(item.productId);
    card.dataset.productHandle = item.handle || '';
    card.dataset.productTitle = item.title || '';

    var imageMarkup = item.image
      ? '<img src="' + escapeAttribute(item.image) + '" alt="' + escapeAttribute(item.title) + '" loading="lazy">'
      : '';
    var labelMarkup = item.labelHtml ? sanitizeWishlistLabelHtml(item.labelHtml) : '';
    var preOrderMarkup = item.preOrder
      ? '<span class="wishlist-card__preorder-badge">' + escapeHtml(item.preOrderLabel || 'Pre-order') + '</span>'
      : '';
    var variantTitle = formatVariantTitleForDisplay(item.variantTitle);
    var insertMarkup = renderInsertOption(item);
    var priceMarkup = renderProductPrice(item);
    var defaultGroupId = getDefaultRemoteGroupId(groups);
    var selectedGroupId = !item.groupId || item.groupId === defaultGroupId ? '' : item.groupId;

    card.innerHTML =
      renderWishlistDragHandle('wishlist-card__drag-handle') +
      '<a class="wishlist-card__image" href="' + escapeAttribute(item.url) + '" data-product-id="' + escapeAttribute(compactShopifyId(item.productId)) + '">' + imageMarkup + labelMarkup + preOrderMarkup + '</a>' +
      '<details class="wishlist-card__details">' +
        '<summary class="wishlist-card__summary">' +
          '<span class="wishlist-card__title h5">' + escapeHtml(item.title) + '</span>' +
          '<span class="wishlist-card__summary-icon" aria-hidden="true">' + renderWishlistMenuBarsIcon() + '</span>' +
        '</summary>' +
        '<div class="wishlist-card__details-content">' +
          '<p class="wishlist-card__title-link"><a href="' + escapeAttribute(item.url) + '">View product</a></p>' +
          (variantTitle ? '<p class="wishlist-card__variant">' + escapeHtml(variantTitle) + '</p>' : '') +
          '<p class="wishlist-card__price">' + priceMarkup + '</p>' +
          '<div class="wishlist-card__meta-actions">' +
            '<label class="wishlist-card__group">Group' +
              '<select data-wishlist-group-select data-wishlist-current-group="' + escapeAttribute(selectedGroupId) + '">' + renderGroupOptions(selectedGroupId, groups) + '</select>' +
            '</label>' +
            '<form class="wishlist-card__create-group" data-wishlist-card-group-form hidden>' +
              '<input type="text" name="group_name" placeholder="New group name" maxlength="40" data-wishlist-card-group-input>' +
              '<button type="submit" class="button">Create</button>' +
              '<button type="button" class="text-button" data-wishlist-card-group-cancel>Cancel</button>' +
            '</form>' +
            renderWishlistQuantitySelector() +
            insertMarkup +
          '</div>' +
        '</div>' +
      '</details>' +
      '<div class="wishlist-card__actions">' +
        '<button type="button" class="button wishlist-card__add" data-wishlist-add-to-cart>Add to cart</button>' +
        '<button type="button" class="text-button wishlist-card__remove" data-wishlist-remove>Remove</button>' +
        '<p class="wishlist-card__message" data-wishlist-message role="status"></p>' +
      '</div>';

    return card;
  }

  function renderProductPrice(item) {
    var price = item.price ? '<span class="wishlist-card__current-price">' + escapeHtml(item.price) + '</span>' : '';
    var originalPrice = isTradePricingViewer() && item.productOriginalPrice ? ' <span class="wishlist-card__original-price">' + escapeHtml(item.productOriginalPrice) + '</span>' : '';

    return price + originalPrice;
  }

  function renderInsertOption(item) {
    if (!item.insertVariantId) return '';

    var price = item.insertVariantPrice ? ' <span class="wishlist-card__insert-price">' + escapeHtml(item.insertVariantPrice) + '</span>' : '';
    var originalPrice = isTradePricingViewer() && item.insertVariantOriginalPrice ? ' <span class="wishlist-card__insert-original-price">' + escapeHtml(item.insertVariantOriginalPrice) + '</span>' : '';

    return '<label class="wishlist-card__insert">' +
      '<input type="checkbox" data-wishlist-insert>' +
      '<span>Add insert' + price + originalPrice + '</span>' +
    '</label>';
  }

  function isTradePricingViewer() {
    var wishlistPage = document.querySelector('[data-wishlist-trade-pricing]');
    return Boolean(wishlistPage && wishlistPage.dataset.wishlistTradePricing === 'true');
  }

  function getWishlistLabel(card) {
    var labels = Array.from(card.querySelectorAll('.bss_pl_img, .bss_parent_text, [data-bss-pl-text-id], .bss-countdown-display.bss_pl_label_text, .bss_pl_label_text'));

    return labels.find(function (label) {
      return !isPreOrderLabelText(label.textContent || '');
    });
  }

  function removeWishlistPreOrderBssLabels() {
    document.querySelectorAll('.wishlist-card').forEach(function (card) {
      removePreOrderLabelNodes(card);
    });
  }

  function syncWishlistProductLabels() {
    var cards = Array.from(document.querySelectorAll('.wishlist-card'));
    var cardsByKey = {};

    removeWishlistPreOrderBssLabels();

    function addCard(key, card) {
      if (!key) return;
      if (!cardsByKey[key]) cardsByKey[key] = [];
      if (cardsByKey[key].indexOf(card) === -1) cardsByKey[key].push(card);
    }

    cards.forEach(function (card) {
      addCard('id:' + card.dataset.productId, card);
      addCard('handle:' + card.dataset.productHandle, card);
      addCard('title:' + card.dataset.productTitle, card);
    });

    Object.keys(cardsByKey).forEach(function (key) {
      var productCards = cardsByKey[key];
      var sourceLabel = productCards.map(getWishlistLabel).find(Boolean);

      if (!sourceLabel) return;

      productCards.forEach(function (card) {
        if (getWishlistLabel(card)) return;

        var clonedLabel = sourceLabel.cloneNode(true);
        clonedLabel.setAttribute('data-wishlist-cloned-label', 'true');
        if (clonedLabel.classList && clonedLabel.classList.contains('bss_pl_img')) {
          card.insertBefore(clonedLabel, card.firstChild);
        } else {
        var image = card.querySelector('.wishlist-card__image');
        if (image) image.appendChild(clonedLabel);
        }
      });
    });
  }

  function isPreOrderTagList(tags) {
    var tagList = Array.isArray(tags) ? tags : String(tags || '').split(',');

    return tagList.some(function (tag) {
      var normalizedTag = String(tag || '').trim().toUpperCase();
      return normalizedTag === 'PRE-ORDER' || normalizedTag === 'BACKORDER' || normalizedTag === 'BLOSSOM';
    });
  }

  function applyPreOrderBadgeToCards(item) {
    var selectors = [
      '.wishlist-card[data-product-id="' + escapeSelectorValue(compactShopifyId(item.productId)) + '"]',
      '.wishlist-card[data-product-handle="' + escapeSelectorValue(item.handle || '') + '"]',
      '.wishlist-card[data-product-title="' + escapeSelectorValue(item.title || '') + '"]'
    ];
    var cards = Array.from(document.querySelectorAll(selectors.join(',')));

    cards.forEach(function (card) {
      var image = card.querySelector('.wishlist-card__image');
      if (!image || image.querySelector('.wishlist-card__preorder-badge')) return;

      var badge = document.createElement('span');
      badge.className = 'wishlist-card__preorder-badge';
      badge.textContent = item.preOrderLabel || 'Pre-order';
      image.appendChild(badge);
    });
  }

  function hydrateWishlistPreOrderBadges() {
    readWishlist().forEach(function (item) {
      if (item.preOrder || !item.handle) return;

      if (preOrderLookupCache[item.handle] === true) {
        applyPreOrderBadgeToCards(item);
        return;
      }

      if (preOrderLookupCache[item.handle] === false || preOrderLookupCache[item.handle] === 'loading') return;
      preOrderLookupCache[item.handle] = 'loading';

      fetch('/products/' + encodeURIComponent(item.handle) + '.js', {
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json'
        }
      })
        .then(function (response) {
          if (!response.ok) throw response;
          return response.json();
        })
        .then(function (product) {
          preOrderLookupCache[item.handle] = isPreOrderTagList(product.tags);
          if (preOrderLookupCache[item.handle]) applyPreOrderBadgeToCards(item);
        })
        .catch(function () {
          preOrderLookupCache[item.handle] = false;
        });
    });
  }

  function scheduleWishlistLabelSync() {
    var attempts = 0;

    if (labelSyncTimer) clearInterval(labelSyncTimer);

    syncWishlistProductLabels();
    labelSyncTimer = setInterval(function () {
      attempts += 1;
      syncWishlistProductLabels();

      if (attempts >= 16) {
        clearInterval(labelSyncTimer);
        labelSyncTimer = null;
      }
    }, 500);
  }

  function renderGroupOptions(selectedGroupId, groups) {
    var defaultGroupId = getDefaultRemoteGroupId(groups);
    var selected = !selectedGroupId || selectedGroupId === defaultGroupId ? ' selected' : '';
    var options = '<option value=""' + selected + '>Ungrouped</option>';

    groups.filter(function (group) {
      return !isDefaultGroup(group);
    }).forEach(function (group) {
      selected = selectedGroupId === group.id ? ' selected' : '';
      options += '<option value="' + escapeAttribute(group.id) + '"' + selected + '>' + escapeHtml(group.name) + '</option>';
    });

    options += '<option value="' + createGroupOptionValue + '">Create group</option>';

    return options;
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[character];
    });
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
  }

  function escapeSelectorValue(value) {
    if (window.CSS && CSS.escape) return CSS.escape(String(value || ''));
    return String(value || '').replace(/["\\]/g, '\\$&');
  }

  function normalizeGroupName(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function findGroupByName(groups, name) {
    var normalizedName = normalizeGroupName(name).toLowerCase();

    return groups.find(function (group) {
      return getDisplayGroupName(group).toLowerCase() === normalizedName;
    });
  }

  function createGroup(name) {
    var groups = readGroups();
    var normalizedName = normalizeGroupName(name);
    var existingGroup = findGroupByName(groups, normalizedName);

    if (!normalizedName) return Promise.resolve({ ok: false, message: 'Enter a group name.' });
    if (existingGroup) {
      return Promise.resolve({ ok: false, message: 'That group already exists.' });
    }

    if (useRemoteWishlist()) {
      return createRemoteGroup(normalizedName).then(function () {
        var createdGroup = findGroupByName(readGroups(), normalizedName);
        updateButtons();
        renderWishlistPage();
        return { ok: true, message: 'Group created.', group: createdGroup };
      }).catch(function (error) {
        return { ok: false, message: error.message || 'Group could not be created.' };
      });
    }

    var group = {
      id: 'group-' + Date.now().toString(36),
      name: normalizedName,
      createdAt: new Date().toISOString()
    };

    groups.push(group);

    writeLocalGroups(groups);
    renderWishlistPage();

    return Promise.resolve({ ok: true, message: 'Group created.', group: group });
  }

  function renameGroup(groupId, name) {
    var groups = readGroups();
    var normalizedName = normalizeGroupName(name);

    if (!normalizedName) return Promise.resolve({ ok: false, message: 'Enter a group name.' });
    if (groups.some(function (group) {
      return group.id !== groupId && getDisplayGroupName(group).toLowerCase() === normalizedName.toLowerCase();
    })) {
      return Promise.resolve({ ok: false, message: 'That group already exists.' });
    }

    if (useRemoteWishlist()) {
      return renameRemoteGroup(groupId, normalizedName).then(function () {
        updateButtons();
        renderWishlistPage();
        return { ok: true, message: 'Group renamed.' };
      }).catch(function (error) {
        return { ok: false, message: error.message || 'Group could not be renamed.' };
      });
    }

    groups = groups.map(function (group) {
      if (group.id === groupId) group.name = normalizedName;
      return group;
    });

    writeLocalGroups(groups);
    renderWishlistPage();

    return Promise.resolve({ ok: true, message: 'Group renamed.' });
  }

  function deleteGroup(groupId) {
    if (useRemoteWishlist()) {
      return deleteRemoteGroup(groupId).then(function () {
        if (String(activeWishlistGroupId) === String(groupId)) activeWishlistGroupId = null;
        updateButtons();
        renderWishlistPage();
        return { ok: true, message: 'Group deleted.' };
      }).catch(function (error) {
        return { ok: false, message: error.message || 'Group could not be deleted.' };
      });
    }

    var groups = readLocalGroups().filter(function (group) {
      return group.id !== groupId;
    });
    var items = readLocalWishlist().map(function (item) {
      if (item.groupId === groupId) item.groupId = ungroupedId;
      return item;
    });

    writeLocalGroups(groups);
    writeLocalWishlist(items);
    if (String(activeWishlistGroupId) === String(groupId)) activeWishlistGroupId = null;
    updateButtons();
    renderWishlistPage();

    return Promise.resolve({ ok: true, message: 'Group deleted.' });
  }

  function duplicateGroup(groupId, name) {
    var groups = readGroups();
    var sourceGroup = groups.find(function (group) {
      return group.id === groupId;
    });
    var sourceItems = readWishlist().filter(function (item) {
      return item.groupId === groupId;
    });

    if (!sourceGroup) return Promise.resolve({ ok: false, message: 'Group could not be found.' });

    return createGroup(name).then(function (result) {
      var newGroup = result.group;
      var sequence = Promise.resolve();

      if (!result.ok || !newGroup) return result;

      if (useRemoteWishlist()) {
        sourceItems.forEach(function (item) {
          sequence = sequence.then(function () {
            var copiedItem = Object.assign({}, item, {
              id: '',
              groupId: newGroup.id,
              addedAt: new Date().toISOString()
            });

            return addRemoteItem(copiedItem, newGroup.id);
          });
        });

        return sequence.then(function () {
          updateButtons();
          renderWishlistPage();
          return { ok: true, message: 'Group duplicated.', group: newGroup };
        }).catch(function (error) {
          return { ok: false, message: error.message || 'Group could not be duplicated.' };
        });
      }

      var copiedItems = sourceItems.map(function (item, index) {
        return Object.assign({}, item, {
          id: createWishlistItemId() + '-' + index,
          groupId: newGroup.id,
          addedAt: new Date().toISOString()
        });
      });

      writeLocalWishlist(readLocalWishlist().concat(copiedItems));
      updateButtons();
      renderWishlistPage();

      return { ok: true, message: 'Group duplicated.', group: newGroup };
    });
  }

  function findWishlistItem(reference) {
    var items = readWishlist();

    return items.find(function (item) {
      return item.id && String(item.id) === String(reference);
    }) || items.find(function (item) {
      return getItemKey(item) === reference;
    });
  }

  function moveItemToGroup(key, groupId) {
    var groups = readGroups();
    var item = findWishlistItem(key);

    if (!item) return Promise.resolve({ ok: false, message: 'Favorite could not be found.' });

    if (useRemoteWishlist()) {
      var remoteGroupId = groupId || getDefaultRemoteGroupId(groups);
      return moveRemoteItemToGroup(item, remoteGroupId).then(function () {
        updateButtons();
        renderWishlistPage();
        return { ok: true, message: 'Favorite moved to group.' };
      }).catch(function () {
        showGroupMessage('Favorite could not be moved. Please try again.');
        return { ok: false, message: 'Favorite could not be moved. Please try again.' };
      });
    }

    var groupIds = groups.map(function (group) {
      return group.id;
    });
    var safeGroupId = groupIds.indexOf(groupId) > -1 ? groupId : ungroupedId;
    var items = readLocalWishlist().map(function (savedItem) {
      if ((savedItem.id && String(savedItem.id) === String(key)) || (!savedItem.id && getItemKey(savedItem) === key)) {
        savedItem.groupId = safeGroupId;
      }
      return savedItem;
    });

    writeLocalWishlist(items);
    renderWishlistPage();

    return Promise.resolve({ ok: true, message: 'Favorite moved to group.' });
  }

  function copyItemToGroup(key, groupId) {
    var item = findWishlistItem(key);

    if (!item) return Promise.resolve({ ok: false, message: 'Favorite could not be found.' });

    if (useRemoteWishlist()) {
      var copiedItem = Object.assign({}, item, {
        id: '',
        groupId: groupId || '',
        addedAt: new Date().toISOString()
      });

      return addRemoteItem(copiedItem, groupId).then(function () {
        updateButtons();
        renderWishlistPage();
        return { ok: true, message: 'Favorite copied to group.' };
      }).catch(function (error) {
        return { ok: false, message: error.message || 'Favorite could not be copied.' };
      });
    }

    var copiedItem = Object.assign({}, item, {
      id: createWishlistItemId(),
      groupId: groupId || ungroupedId,
      addedAt: new Date().toISOString()
    });

    writeLocalWishlist(readLocalWishlist().concat(copiedItem));
    updateButtons();
    renderWishlistPage();

    return Promise.resolve({ ok: true, message: 'Favorite copied to group.' });
  }

  function showGroupMessage(message) {
    var messageEl = document.querySelector('[data-wishlist-group-message]');
    if (!messageEl) return;

    messageEl.textContent = message || '';
    if (message) {
      setTimeout(function () {
        if (messageEl.textContent === message) messageEl.textContent = '';
      }, 3000);
    }
  }

  function showCardMessage(card, message) {
    var messageEl = card ? card.querySelector('[data-wishlist-message]') : null;
    if (!messageEl) return;

    messageEl.textContent = message || '';
    if (message) {
      setTimeout(function () {
        if (messageEl.textContent === message) messageEl.textContent = '';
      }, 3000);
    }
  }

  function closeGroupMenus(exceptMenu) {
    document.querySelectorAll('[data-wishlist-group-menu]').forEach(function (menu) {
      if (menu === exceptMenu) return;

      menu.hidden = true;
      var toggle = menu.closest('[data-wishlist-group]').querySelector('[data-wishlist-group-menu-toggle]');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  function setCardCreateGroupFormOpen(card, open) {
    var form = card ? card.querySelector('[data-wishlist-card-group-form]') : null;
    var input = form ? form.querySelector('[data-wishlist-card-group-input]') : null;
    var select = card ? card.querySelector('[data-wishlist-group-select]') : null;

    if (!form) return;

    form.hidden = !open;
    if (open && input) {
      input.value = '';
      input.focus();
    }

    if (!open && select && select.value === createGroupOptionValue) {
      select.value = select.dataset.wishlistCurrentGroup || '';
    }
  }

  function getGroupedWishlistById(groupId) {
    var groupedItems = buildGroupedItems(readWishlist(), readGroups());

    return groupedItems.find(function (group) {
      return String(group.id) === String(groupId);
    });
  }

  function createGroupForCard(form) {
    var card = form.closest('[data-wishlist-item]');
    var input = form.querySelector('[data-wishlist-card-group-input]');
    var submitButton = form.querySelector('button[type="submit"]');
    var name = input ? input.value : '';

    if (!card) return;

    if (submitButton) submitButton.disabled = true;
    showCardMessage(card, '');

    createGroup(name).then(function (result) {
      if (!result.ok || !result.group) {
        showCardMessage(card, result.message || 'Group could not be created.');
        return;
      }

      moveItemToGroup(card.dataset.wishlistItem, result.group.id).then(function (moveResult) {
        showGroupMessage(moveResult.ok ? 'Group created and favorite moved.' : moveResult.message);
      });
    }).finally(function () {
      if (submitButton) submitButton.disabled = false;
    });
  }

  function removeItem(key) {
    var item = findWishlistItem(key);

    if (useRemoteWishlist() && item) {
      removeRemoteItem(item).then(function () {
        updateButtons();
        renderWishlistPage();
      }).catch(function () {
        showGroupMessage('Favorite could not be removed. Please try again.');
      });
      return;
    }

    var items = readLocalWishlist().filter(function (savedItem) {
      if (savedItem.id) return String(savedItem.id) !== String(key);
      return getItemKey(savedItem) !== key;
    });

    writeWishlist(items);
    updateButtons();
    renderWishlistPage();
  }

  function normalizeWishlistQuantityInput(input) {
    var quantity = input ? parseInt(input.value, 10) : 1;

    if (!Number.isFinite(quantity) || quantity < 1) quantity = 1;
    if (input) input.value = String(quantity);

    return quantity;
  }

  function getWishlistCardQuantity(card) {
    return normalizeWishlistQuantityInput(card && card.querySelector('[data-wishlist-quantity]'));
  }

  function adjustWishlistCardQuantity(button) {
    var card = button.closest('[data-wishlist-item]');
    var input = card && card.querySelector('[data-wishlist-quantity]');
    var delta = parseInt(button.dataset.wishlistQuantityAdjust, 10);
    var quantity;

    if (!input || !Number.isFinite(delta)) return;

    quantity = normalizeWishlistQuantityInput(input) + delta;
    input.value = String(Math.max(1, quantity));
  }

  function addWishlistItemToCart(card) {
    var key = card.dataset.wishlistItem;
    var item = findWishlistItem(key);
    var button = card.querySelector('[data-wishlist-add-to-cart]');
    var message = card.querySelector('[data-wishlist-message]');
    var addInsert = Boolean(card.querySelector('[data-wishlist-insert]:checked'));
    var quantity = getWishlistCardQuantity(card);
    var mainVariantId = Number(compactShopifyId(item && item.variantId));
    var insertVariantId = addInsert && item && item.insertVariantId ? Number(compactShopifyId(item.insertVariantId)) : 0;
    var cartItems = [];

    if (!item || !mainVariantId) return;

    cartItems.push({
      id: mainVariantId,
      quantity: quantity
    });

    if (insertVariantId) {
      cartItems.push({
        id: insertVariantId,
        quantity: quantity,
        properties: {
          _insertPillowId: String(compactShopifyId(item.variantId))
        }
      });
    }

    button.disabled = true;
    button.textContent = 'Adding...';
    if (message) message.textContent = '';

    fetch('/cart/add.js', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        items: cartItems
      })
    })
      .then(function (response) {
        if (!response.ok) throw response;
        return response.json();
      })
      .then(function () {
        if (message) message.textContent = 'Added to cart.';
        button.textContent = 'Added';

        apiRequest('/events', {
          method: 'POST',
          body: {
            eventType: 'favorite_added_to_cart',
            itemId: item.id || '',
            groupId: item.groupId || '',
            productId: item.productId,
            variantId: item.variantId,
            handle: item.handle,
            title: item.title,
            imageUrl: item.image,
            productUrl: item.url,
            metadata: {
              price: item.price || '',
              productOriginalPrice: item.productOriginalPrice || '',
              variantTitle: item.variantTitle || '',
              insertVariantId: insertVariantId ? item.insertVariantId : '',
              insertVariantTitle: insertVariantId ? item.insertVariantTitle || '' : '',
              insertVariantPrice: insertVariantId ? item.insertVariantPrice || '' : '',
              insertVariantOriginalPrice: insertVariantId ? item.insertVariantOriginalPrice || '' : ''
            }
          }
        }).catch(function (error) {
          console.error('Favorite cart event failed:', error.status, error.payload || error);
        });

        if (window.Shopify && Shopify.theme && Shopify.theme.cart && Shopify.theme.ajaxCart) {
          refreshAjaxCartView();
        }

        setTimeout(function () {
          button.disabled = false;
          button.textContent = 'Add to cart';
        }, 2500);
      })
      .catch(function () {
        if (message) message.textContent = 'This item could not be added. Please open the product to choose options.';
        button.disabled = false;
        button.textContent = 'Add to cart';
      });
  }

  function refreshAjaxCartView() {
    if (!(window.Shopify && Shopify.theme && Shopify.theme.cart && Shopify.theme.ajaxCart)) return;

    Shopify.theme.cart.getCart().then(function (cart) {
      var configEl = document.getElementById('cart-config');
      var config = configEl ? JSON.parse(configEl.innerHTML || '{}') : {};
      Shopify.theme.ajaxCart.updateView(config, cart);
    });
  }

  function getSelectedGroupInsertIds(groupElement) {
    var selected = {};

    if (!groupElement) return selected;

    groupElement.querySelectorAll('[data-wishlist-item]').forEach(function (card) {
      selected[card.dataset.wishlistKey] = Boolean(card.querySelector('[data-wishlist-insert]:checked'));
    });

    return selected;
  }

  function getSelectedGroupQuantities(groupElement) {
    var selected = {};

    if (!groupElement) return selected;

    groupElement.querySelectorAll('[data-wishlist-item]').forEach(function (card) {
      selected[card.dataset.wishlistKey] = getWishlistCardQuantity(card);
    });

    return selected;
  }

  function buildGroupCartItems(group, selectedInsertByKey, quantityByKey) {
    var cartItems = [];

    group.items.forEach(function (item) {
      var itemKey = getItemKey(item);
      var mainVariantId = Number(compactShopifyId(item && item.variantId));
      var quantity = quantityByKey && quantityByKey[itemKey] ? quantityByKey[itemKey] : 1;
      var shouldAddInsert = selectedInsertByKey && selectedInsertByKey[itemKey];
      var insertVariantId = shouldAddInsert && item.insertVariantId ? Number(compactShopifyId(item.insertVariantId)) : 0;

      if (!mainVariantId) return;

      cartItems.push({
        id: mainVariantId,
        quantity: quantity
      });

      if (insertVariantId) {
        cartItems.push({
          id: insertVariantId,
          quantity: quantity,
          properties: {
            _insertPillowId: String(compactShopifyId(item.variantId))
          }
        });
      }
    });

    return cartItems;
  }

  function addWishlistGroupToCart(button) {
    var groupId = button.dataset.wishlistGroupId;
    var group = getGroupedWishlistById(groupId);
    var groupElement = button.closest('[data-wishlist-group]');
    var selectedInsertByKey = getSelectedGroupInsertIds(groupElement);
    var quantityByKey = getSelectedGroupQuantities(groupElement);
    var cartItems = group ? buildGroupCartItems(group, selectedInsertByKey, quantityByKey) : [];
    var originalText = button.textContent;

    if (!group || cartItems.length === 0) {
      showGroupMessage('This bundle does not have any items that can be added to cart.');
      return;
    }

    button.disabled = true;
    button.textContent = 'Adding...';
    showGroupMessage('');

    fetch('/cart/add.js', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        items: cartItems
      })
    })
      .then(function (response) {
        if (!response.ok) throw response;
        return response.json();
      })
      .then(function () {
        button.textContent = 'Added';
        showGroupMessage('Bundle added to cart.');
        refreshAjaxCartView();

        setTimeout(function () {
          button.disabled = false;
          button.textContent = originalText || 'Add all to cart';
        }, 2500);
      })
      .catch(function () {
        showGroupMessage('This bundle could not be added. Please open the bundle and check item availability.');
        button.disabled = false;
        button.textContent = originalText || 'Add all to cart';
      });
  }

  function persistBundleOrderFromGrid(grid) {
    if (!grid) return;

    var order = Array.from(grid.children).filter(function (card) {
      return card.classList && card.classList.contains('wishlist-bundle-card');
    }).map(function (card) {
      return card.dataset.wishlistGroupId;
    });

    if (useRemoteWishlist()) {
      remoteState.groups = remoteState.groups.map(function (group) {
        var sortIndex = order.indexOf(String(group.id));
        if (sortIndex > -1) group.sortOrder = sortIndex;
        return group;
      });

      apiRequest('/groups/reorder', {
        method: 'PATCH',
        body: {
          groupIds: order
        }
      }).then(function (payload) {
        setRemoteState(payload);
      }).catch(function (error) {
        console.error('Bundle order save failed:', error.status, error.payload || error);
        writeGroupOrder(order);
        showGroupMessage('Bundle order could not be synced. It was saved on this browser only.');
      });

      return;
    }

    writeGroupOrder(order);
  }

  function applyRemoteItemOrder(groupId, order) {
    if (!remoteState || !Array.isArray(remoteState.items)) return;

    remoteState.items = remoteState.items.map(function (item) {
      if (String(item.groupId || '') !== String(groupId || '')) return item;

      var sortIndex = order.indexOf(getWishlistItemReference(item));
      if (sortIndex > -1) item.sortOrder = sortIndex;
      return item;
    });
  }

  function persistWishlistItemOrderFromGrid(grid) {
    if (!grid) return;

    var groupElement = grid.closest('[data-wishlist-group]');
    var groupId = groupElement ? groupElement.dataset.wishlistGroup : ungroupedId;
    var order = Array.from(grid.children).filter(function (card) {
      return card.classList && card.classList.contains('wishlist-card');
    }).map(function (card) {
      return card.dataset.wishlistItem;
    });

    writeItemOrder(groupId, order);

    if (useRemoteWishlist()) {
      applyRemoteItemOrder(groupId, order);

      apiRequest('/items/reorder', {
        method: 'PATCH',
        body: {
          groupId: groupId,
          itemIds: order
        }
      }).then(function (payload) {
        setRemoteState(payload);
        applyRemoteItemOrder(groupId, order);
      }).catch(function (error) {
        console.error('Item order save failed:', error.status, error.payload || error);
        showGroupMessage('Item order could not be synced. It was saved on this browser only.');
      });

      return;
    }
  }

  function getDraggableCardAfterPointer(grid, selector, pointerX, pointerY) {
    var cards = Array.from(grid.querySelectorAll(selector + ':not(.is-dragging)'));

    return cards.reduce(function (closest, card) {
      var box = card.getBoundingClientRect();
      var horizontalOffset = pointerX - box.left - box.width / 2;
      var verticalOffset = pointerY - box.top - box.height / 2;
      var offset = Math.abs(verticalOffset) > box.height / 2 ? verticalOffset : horizontalOffset;

      if (offset < 0 && offset > closest.offset) {
        return {
          offset: offset,
          element: card
        };
      }

      return closest;
    }, {
      offset: Number.NEGATIVE_INFINITY,
      element: null
    }).element;
  }

  function getBundleCardAfterPointer(grid, pointerX, pointerY) {
    return getDraggableCardAfterPointer(grid, '.wishlist-bundle-card', pointerX, pointerY);
  }

  function getWishlistCardAfterPointer(grid, pointerX, pointerY) {
    return getDraggableCardAfterPointer(grid, '.wishlist-card', pointerX, pointerY);
  }

  function animateWishlistGridReorder(grid, selector, updateDom) {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!grid || typeof updateDom !== 'function' || reduceMotion) {
      updateDom();
      return;
    }

    var cards = Array.from(grid.querySelectorAll(selector + ':not(.is-dragging)')).map(function (card) {
      return {
        element: card,
        rect: card.getBoundingClientRect()
      };
    });

    updateDom();

    cards.forEach(function (entry) {
      if (!entry.element.isConnected) return;

      var nextRect = entry.element.getBoundingClientRect();
      var deltaX = entry.rect.left - nextRect.left;
      var deltaY = entry.rect.top - nextRect.top;

      if (!deltaX && !deltaY) return;

      entry.element.style.transition = 'none';
      entry.element.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px)';
      entry.element.style.willChange = 'transform';

      window.requestAnimationFrame(function () {
        entry.element.style.transition = 'transform .18s ease';
        entry.element.style.transform = '';
      });

      window.setTimeout(function () {
        entry.element.style.transition = '';
        entry.element.style.transform = '';
        entry.element.style.willChange = '';
      }, 220);
    });
  }

  function isWishlistItemSortEnabledForCard(card) {
    return Boolean(card && card.closest('.wishlist-group.is-sorting'));
  }

  function rememberWishlistItemDragStart(target) {
    var handle = target.closest('[data-wishlist-drag-handle]');
    var card = handle && handle.closest('.wishlist-card');

    pendingWishlistItemDragCard = card && isWishlistItemSortEnabledForCard(card) ? card : null;
  }

  function isTouchPointer(event) {
    return event.pointerType === 'touch' || event.pointerType === 'pen';
  }

  function getTouchDragContext(target) {
    var handle = target.closest('[data-wishlist-drag-handle]');
    if (!handle) return null;

    var bundleCard = handle.closest('.wishlist-bundle-card');
    if (bundleCard) {
      return {
        type: 'bundle',
        card: bundleCard,
        grid: bundleCard.closest('.wishlist-bundles__grid'),
        id: bundleCard.dataset.wishlistGroupId
      };
    }

    var wishlistCard = handle.closest('.wishlist-card');
    if (wishlistCard && isWishlistItemSortEnabledForCard(wishlistCard)) {
      return {
        type: 'item',
        card: wishlistCard,
        grid: wishlistCard.closest('.wishlist-page__grid'),
        id: wishlistCard.dataset.wishlistItem
      };
    }

    return null;
  }

  function startTouchWishlistDrag(event) {
    if (!isTouchPointer(event) || touchWishlistDrag) return;

    var context = getTouchDragContext(event.target);
    if (!context || !context.card || !context.grid) return;

    touchWishlistDrag = {
      type: context.type,
      card: context.card,
      grid: context.grid,
      id: context.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      active: false
    };

    if (context.card.setPointerCapture) {
      context.card.setPointerCapture(event.pointerId);
    }
  }

  function moveTouchWishlistDrag(event) {
    if (!touchWishlistDrag || touchWishlistDrag.pointerId !== event.pointerId) return;

    var deltaX = event.clientX - touchWishlistDrag.startX;
    var deltaY = event.clientY - touchWishlistDrag.startY;

    if (!touchWishlistDrag.active) {
      if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < 8) return;

      touchWishlistDrag.active = true;
      touchWishlistDrag.card.classList.add('is-dragging');

      if (touchWishlistDrag.type === 'bundle') {
        draggedWishlistGroupId = touchWishlistDrag.id;
        wishlistBundleDragMoved = true;
      } else {
        draggedWishlistItemId = touchWishlistDrag.id;
        wishlistItemDragMoved = true;
      }
    }

    event.preventDefault();

    if (touchWishlistDrag.type === 'bundle') {
      var afterBundleCard = getBundleCardAfterPointer(touchWishlistDrag.grid, event.clientX, event.clientY);
      animateWishlistGridReorder(touchWishlistDrag.grid, '.wishlist-bundle-card', function () {
        if (afterBundleCard) {
          touchWishlistDrag.grid.insertBefore(touchWishlistDrag.card, afterBundleCard);
        } else {
          touchWishlistDrag.grid.appendChild(touchWishlistDrag.card);
        }
      });
      return;
    }

    var afterWishlistCard = getWishlistCardAfterPointer(touchWishlistDrag.grid, event.clientX, event.clientY);
    animateWishlistGridReorder(touchWishlistDrag.grid, '.wishlist-card', function () {
      if (afterWishlistCard) {
        touchWishlistDrag.grid.insertBefore(touchWishlistDrag.card, afterWishlistCard);
      } else {
        touchWishlistDrag.grid.appendChild(touchWishlistDrag.card);
      }
    });
  }

  function endTouchWishlistDrag(event) {
    if (!touchWishlistDrag || touchWishlistDrag.pointerId !== event.pointerId) return;

    if (touchWishlistDrag.card.releasePointerCapture) {
      try {
        touchWishlistDrag.card.releasePointerCapture(event.pointerId);
      } catch (error) {}
    }

    touchWishlistDrag.card.classList.remove('is-dragging');

    if (touchWishlistDrag.active) {
      if (touchWishlistDrag.type === 'bundle') {
        persistBundleOrderFromGrid(touchWishlistDrag.grid);
        wishlistBundleDragSuppressUntil = Date.now() + 300;
      } else {
        persistWishlistItemOrderFromGrid(touchWishlistDrag.grid);
        wishlistItemDragSuppressUntil = Date.now() + 300;
      }
    }

    draggedWishlistGroupId = null;
    draggedWishlistItemId = null;
    touchWishlistDrag = null;
    setTimeout(function () {
      wishlistBundleDragMoved = false;
      wishlistItemDragMoved = false;
    }, 0);
  }

  document.addEventListener('click', function (event) {
    if (Date.now() < wishlistItemDragSuppressUntil && event.target.closest('.wishlist-card')) {
      event.preventDefault();
      wishlistItemDragMoved = false;
      return;
    }

    if (event.target.closest('[data-wishlist-drag-handle]')) {
      event.preventDefault();
      return;
    }

    var quantityButton = event.target.closest('[data-wishlist-quantity-adjust]');
    if (quantityButton) {
      event.preventDefault();
      adjustWishlistCardQuantity(quantityButton);
      return;
    }

    var wishlistButton = event.target.closest('[data-wishlist-button]');
    if (wishlistButton) {
      event.preventDefault();
      toggleItem(wishlistButton);
      return;
    }

    var removeButton = event.target.closest('[data-wishlist-remove]');
    if (removeButton) {
      event.preventDefault();
      removeItem(removeButton.closest('[data-wishlist-item]').dataset.wishlistItem);
      return;
    }

    var addButton = event.target.closest('[data-wishlist-add-to-cart]');
    if (addButton) {
      event.preventDefault();
      addWishlistItemToCart(addButton.closest('[data-wishlist-item]'));
      return;
    }

    var addGroupButton = event.target.closest('[data-wishlist-add-group-to-cart]');
    if (addGroupButton) {
      event.preventDefault();
      addWishlistGroupToCart(addGroupButton);
      return;
    }

    var openGroupButton = event.target.closest('[data-wishlist-open-group]');
    if (openGroupButton) {
      event.preventDefault();
      if (wishlistBundleDragMoved || Date.now() < wishlistBundleDragSuppressUntil) {
        wishlistBundleDragMoved = false;
        return;
      }
      activeWishlistGroupId = openGroupButton.dataset.wishlistGroupId;
      renderWishlistPage();
      return;
    }

    var closeGroupButton = event.target.closest('[data-wishlist-close-group]');
    if (closeGroupButton) {
      event.preventDefault();
      activeWishlistItemSortGroupId = null;
      activeWishlistGroupId = null;
      renderWishlistPage();
      return;
    }

    var cancelCardGroupButton = event.target.closest('[data-wishlist-card-group-cancel]');
    if (cancelCardGroupButton) {
      event.preventDefault();
      setCardCreateGroupFormOpen(cancelCardGroupButton.closest('[data-wishlist-item]'), false);
      return;
    }

    var menuToggle = event.target.closest('[data-wishlist-group-menu-toggle]');
    if (menuToggle) {
      event.preventDefault();
      var menuGroupEl = menuToggle.closest('[data-wishlist-group]');
      var menu = menuGroupEl.querySelector('[data-wishlist-group-menu]');
      var shouldOpen = menu ? menu.hidden : false;

      closeGroupMenus(menu);
      if (menu) menu.hidden = !shouldOpen;
      menuToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      return;
    }

    var sortItemsButton = event.target.closest('[data-wishlist-toggle-item-sort]');
    if (sortItemsButton) {
      event.preventDefault();
      var sortGroupEl = sortItemsButton.closest('[data-wishlist-group]');
      var sortGroupId = sortGroupEl ? sortGroupEl.dataset.wishlistGroup : ungroupedId;

      activeWishlistItemSortGroupId = isWishlistItemSortGroupActive(sortGroupId)
        ? null
        : sortGroupId;
      closeGroupMenus();
      renderWishlistPage();
      return;
    }

    var editGroupNameButton = event.target.closest('[data-wishlist-edit-group-name]');
    if (editGroupNameButton) {
      event.preventDefault();
      var editGroupEl = editGroupNameButton.closest('[data-wishlist-group]');
      var renameForm = editGroupEl.querySelector('[data-wishlist-rename-form]');
      var renameInput = editGroupEl.querySelector('[data-wishlist-rename-input]');

      closeGroupMenus();
      if (renameForm) renameForm.hidden = false;
      if (renameInput) {
        renameInput.focus();
        renameInput.select();
      }
      return;
    }

    var cancelRenameButton = event.target.closest('[data-wishlist-cancel-rename]');
    if (cancelRenameButton) {
      event.preventDefault();
      var cancelGroupEl = cancelRenameButton.closest('[data-wishlist-group]');
      var cancelRenameForm = cancelGroupEl.querySelector('[data-wishlist-rename-form]');

      if (cancelRenameForm) cancelRenameForm.hidden = true;
      return;
    }

    var duplicateButton = event.target.closest('[data-wishlist-duplicate-group]');
    if (duplicateButton) {
      event.preventDefault();
      var duplicateGroupEl = duplicateButton.closest('[data-wishlist-group]');
      var duplicateGroupName = duplicateGroupEl.querySelector('.wishlist-group__title').textContent;
      var newGroupName = window.prompt('Name for duplicated group', duplicateGroupName + ' copy');

      closeGroupMenus();
      if (newGroupName === null) return;

      duplicateGroup(duplicateGroupEl.dataset.wishlistGroup, newGroupName).then(function (result) {
        showGroupMessage(result.message);
      });
      return;
    }

    var deleteButton = event.target.closest('[data-wishlist-delete-group]');
    if (deleteButton) {
      event.preventDefault();
      var deleteGroupEl = deleteButton.closest('[data-wishlist-group]');
      var groupName = deleteGroupEl.querySelector('.wishlist-group__title').textContent;

      if (window.confirm('Delete "' + groupName + '"? Favorites in this group will be removed from this group only.')) {
        deleteGroup(deleteGroupEl.dataset.wishlistGroup).then(function (result) {
          showGroupMessage(result.message);
        });
      }
      return;
    }

    closeGroupMenus();
  });

  document.addEventListener('dragstart', function (event) {
    var card = event.target.closest('.wishlist-bundle-card');
    if (card) {
      draggedWishlistGroupId = card.dataset.wishlistGroupId;
      wishlistBundleDragMoved = false;
      card.classList.add('is-dragging');

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', draggedWishlistGroupId);
      }

      return;
    }

    var wishlistCard = event.target.closest('.wishlist-card');
    var startedFromWishlistHandle = event.target.closest('[data-wishlist-drag-handle]') ||
      (pendingWishlistItemDragCard && pendingWishlistItemDragCard === wishlistCard);

    if (
      !wishlistCard ||
      !isWishlistItemSortEnabledForCard(wishlistCard) ||
      !startedFromWishlistHandle
    ) {
      pendingWishlistItemDragCard = null;
      return;
    }

    pendingWishlistItemDragCard = null;
    draggedWishlistItemId = wishlistCard.dataset.wishlistItem;
    wishlistItemDragMoved = false;
    wishlistCard.classList.add('is-dragging');

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', draggedWishlistItemId);
    }
  });

  document.addEventListener('dragover', function (event) {
    var grid = event.target.closest('.wishlist-bundles__grid');
    var draggingCard = document.querySelector('.wishlist-bundle-card.is-dragging');

    if (grid && draggingCard) {
      event.preventDefault();
      wishlistBundleDragMoved = true;

      var afterCard = getBundleCardAfterPointer(grid, event.clientX, event.clientY);
      animateWishlistGridReorder(grid, '.wishlist-bundle-card', function () {
        if (afterCard) {
          grid.insertBefore(draggingCard, afterCard);
        } else {
          grid.appendChild(draggingCard);
        }
      });

      return;
    }

    var draggingWishlistCard = document.querySelector('.wishlist-card.is-dragging');
    var itemGrid = event.target.closest('.wishlist-page__grid') ||
      (draggingWishlistCard && draggingWishlistCard.closest('.wishlist-page__grid'));

    if (!itemGrid || !draggingWishlistCard) return;

    event.preventDefault();
    wishlistItemDragMoved = true;

    var afterWishlistCard = getWishlistCardAfterPointer(itemGrid, event.clientX, event.clientY);
    animateWishlistGridReorder(itemGrid, '.wishlist-card', function () {
      if (afterWishlistCard) {
        itemGrid.insertBefore(draggingWishlistCard, afterWishlistCard);
      } else {
        itemGrid.appendChild(draggingWishlistCard);
      }
    });
  });

  document.addEventListener('drop', function (event) {
    var grid = event.target.closest('.wishlist-bundles__grid');
    var itemGrid = event.target.closest('.wishlist-page__grid');

    if (grid && draggedWishlistGroupId) {
      event.preventDefault();
      return;
    }

    if (itemGrid && draggedWishlistItemId) {
      event.preventDefault();
    }
  });

  document.addEventListener('pointerdown', function (event) {
    rememberWishlistItemDragStart(event.target);
  });
  document.addEventListener('pointerdown', startTouchWishlistDrag);
  document.addEventListener('pointermove', moveTouchWishlistDrag, { passive: false });
  document.addEventListener('pointerup', endTouchWishlistDrag);
  document.addEventListener('pointercancel', endTouchWishlistDrag);

  document.addEventListener('dragend', function (event) {
    var card = event.target.closest('.wishlist-bundle-card');
    var grid = card ? card.closest('.wishlist-bundles__grid') : document.querySelector('.wishlist-bundles__grid');

    if (card) card.classList.remove('is-dragging');
    if (grid && draggedWishlistGroupId) persistBundleOrderFromGrid(grid);

    draggedWishlistGroupId = null;
    pendingWishlistItemDragCard = null;
    if (wishlistBundleDragMoved) wishlistBundleDragSuppressUntil = Date.now() + 300;
    setTimeout(function () {
      wishlistBundleDragMoved = false;
    }, 0);

    var wishlistCard = event.target.closest('.wishlist-card');
    var itemGrid = wishlistCard ? wishlistCard.closest('.wishlist-page__grid') : document.querySelector('.wishlist-page__grid');

    if (wishlistCard) wishlistCard.classList.remove('is-dragging');
    if (itemGrid && draggedWishlistItemId) persistWishlistItemOrderFromGrid(itemGrid);

    draggedWishlistItemId = null;
    if (wishlistItemDragMoved) wishlistItemDragSuppressUntil = Date.now() + 300;
    setTimeout(function () {
      wishlistItemDragMoved = false;
    }, 0);
  });

  document.addEventListener('submit', function (event) {
    var renameForm = event.target.closest('[data-wishlist-rename-form]');
    if (renameForm) {
      event.preventDefault();
      var renameGroupEl = renameForm.closest('[data-wishlist-group]');
      var renameInput = renameForm.querySelector('[data-wishlist-rename-input]');

      renameGroup(renameGroupEl.dataset.wishlistGroup, renameInput.value).then(function (result) {
        showGroupMessage(result.message);
      });
      return;
    }

    var cardGroupForm = event.target.closest('[data-wishlist-card-group-form]');
    if (cardGroupForm) {
      event.preventDefault();
      createGroupForCard(cardGroupForm);
      return;
    }

    var form = event.target.closest('[data-wishlist-group-form]');
    if (!form) return;

    event.preventDefault();

    var input = form.querySelector('[data-wishlist-group-input]');
    createGroup(input.value).then(function (result) {
      showGroupMessage(result.message);
      if (result.ok) input.value = '';
    });
  });

  document.addEventListener('change', function (event) {
    var quantityInput = event.target.closest('[data-wishlist-quantity]');
    if (quantityInput) {
      normalizeWishlistQuantityInput(quantityInput);
      return;
    }

    var groupSelect = event.target.closest('[data-wishlist-group-select]');
    if (groupSelect) {
      var card = groupSelect.closest('[data-wishlist-item]');

      if (groupSelect.value === createGroupOptionValue) {
        setCardCreateGroupFormOpen(card, true);
        return;
      }

      groupSelect.dataset.wishlistCurrentGroup = groupSelect.value;
      setCardCreateGroupFormOpen(card, false);
      moveItemToGroup(card.dataset.wishlistItem, groupSelect.value);
      return;
    }

    if (event.target.closest('form') && event.target.matches('[name="id"], .formVariantId, .js-variant-selector, [name^="options["], [data-option-value-id]')) {
      setTimeout(updateButtons, 0);
    }
  });

  document.addEventListener('wishlist:updated', renderWishlistPage);
  document.addEventListener('wishlist:groups-updated', renderWishlistPage);
  document.addEventListener('DOMContentLoaded', function () {
    updateButtons();
    renderWishlistPage();
    loadRemoteWishlist();

    if ('MutationObserver' in window) {
      var observerTimer;
      var observer = new MutationObserver(function () {
        clearTimeout(observerTimer);
        observerTimer = setTimeout(function () {
          updateButtons();
          scheduleWishlistLabelSync();
        }, 50);
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  });
  document.addEventListener('shopify:section:load', function () {
    updateButtons();
    renderWishlistPage();
    loadRemoteWishlist();
  });
})();
