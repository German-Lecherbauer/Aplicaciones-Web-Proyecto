const STORAGE_KEY = 'cart';

export function initLocalStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
}

export function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function saveToLocalStorage(item) {
    let cart = getFromLocalStorage();
    cart.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function setItemToLocalStorage(items){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function updateItemStorage(itemId, qtty) {
    let dataStorage = getFromLocalStorage();
    let idx = dataStorage.findIndex((p) => p.id === itemId);
    if(idx !== -1) {
        dataStorage[idx].qtty += qtty;
        setItemToLocalStorage(dataStorage);  
    }
    return idx;   
}

export function deleteItemStorage(itemId){
    let productsStorage = getFromLocalStorage();
    let newDataStorage = productsStorage.filter((p => p.id !== itemId));
    setItemToLocalStorage(newDataStorage);
}