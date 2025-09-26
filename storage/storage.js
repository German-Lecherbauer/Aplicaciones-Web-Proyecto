const STORAGE_KEY = 'cart';

export function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

export function getFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function setItemToLocalStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items || []));
}

export function clearCart() {
  
  setItemToLocalStorage([]);
}


export function saveToLocalStorage(item) {
  const cart = getFromLocalStorage();
  const i = cart.findIndex(p => p.id === item.id);
  if (i !== -1) {
    cart[i].qtty = (cart[i].qtty || 0) + (item.qtty || 1);
  } else {
    cart.push({ ...item, qtty: item.qtty || 1 });
  }
  setItemToLocalStorage(cart);
}

export function updateItemStorage(itemId, qtty) {
  const dataStorage = getFromLocalStorage();
  const idx = dataStorage.findIndex(p => p.id === itemId);
  if (idx !== -1) {
    dataStorage[idx].qtty += qtty;
    // evita cantidades <= 0
    if (dataStorage[idx].qtty <= 0) {
      dataStorage.splice(idx, 1);
    }
    setItemToLocalStorage(dataStorage);
  }
  return idx;
}

export function deleteItemStorage(itemId) {
  const productsStorage = getFromLocalStorage();
  const newDataStorage = productsStorage.filter(p => p.id !== itemId);
  setItemToLocalStorage(newDataStorage);
}
