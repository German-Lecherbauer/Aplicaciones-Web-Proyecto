import { deleteItemStorage, getFromLocalStorage, setItemToLocalStorage } from "../../storage/storage.js";
import { toast } from './toast.js';

export function cartList() {
    let offcanvasbody = document.querySelector('.offcanvas-body');
    let template = '';
    let dataStorage = getFromLocalStorage();

    dataStorage.forEach((item) => {
        template += `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
        <div class="col-md-4 d-flex justify-content-center align-items-center">
        <img src="${item.image}" class="img-fluid rounded-start" style="object-fit: contain; height: 150px" alt="${item.title}">
        </div>
        <div class="col-md-8">
            <div class="card-body">

        <div> 
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">
                Cantidad: 
                <button class="btn btn-sm btn-outline-secondary me-1" id="minus-${item.id}">-</button>
                <span id="qtty-${item.id}">${item.qtty}</span>
                <button class="btn btn-sm btn-outline-secondary ms-1" id="plus-${item.id}">+</button>
                <button class="btn btn-outline-danger border-0" id="deleteItem-${item.id}"><i class="bi bi-trash-fill"></i></button>
              </p>
        </div>
            <div class="d-flex justify-content-between align-items-center">
            <small class="text-body-secondary">Subtotal: $<span id="subtotal-${item.id}">${(item.price * item.qtty).toFixed(2)}</span></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;

    });

    offcanvasbody.innerHTML = template;
    eventsOnClick(dataStorage);
    buttonCartActions();
    updateCartTotal();


}

function eventsOnClick(productsStorage) {
    // boton eliminar
    productsStorage.forEach((item) => {
        let btn = document.querySelector(`#deleteItem-${item.id}`);
        btn.addEventListener('click', () => {
            deleteItemStorage(item.id)
            toast(`${item.title} Eliminado del Carrito`, 'danger');
            cartList();
        });


        // boton +
        let btnPlus = document.querySelector(`#plus-${item.id}`);
        btnPlus.addEventListener('click', () => {
            item.qtty += 1;
            updateItem(item);
        });


        // boton -
        let btnMinus = document.querySelector(`#minus-${item.id}`);
        btnMinus.addEventListener('click', () => {
            if (item.qtty > 1) {
                item.qtty -= 1;
                updateItem(item);
            } else {
                deleteItemStorage(item.id);
                toast(`${item.title} eliminado del carrito`, 'danger');
            }
            cartList();
        });
    })
}

function updateItem(item) {
    let cart = getFromLocalStorage();
    let index = cart.findIndex(p => p.id === item.id);
    if (index !== -1) {
        cart[index].qtty = item.qtty;
        setItemToLocalStorage(cart);
    }

    document.querySelector(`#qtty-${item.id}`).textContent = item.qtty;
    document.querySelector(`#subtotal-${item.id}`).textContent = (item.price * item.qtty).toFixed(2);
    updateCartTotal();
}

function updateCartTotal() {
    let cart = getFromLocalStorage();
    let total = cart.reduce((acc, item) => acc + item.price * item.qtty, 0);
    let totalElement = document.querySelector('#cart-total');
    if (totalElement) totalElement.textContent = total.toFixed(2);
}

function buttonCartActions() {
    // Botón finalizar compra
    let btnFinish = document.querySelector('#btn-finish-cart');
    if (btnFinish) {
        btnFinish.addEventListener('click', () => {
            setItemToLocalStorage([]);
            cartList();
            toast("¡Gracias por tu compra!", "success");
        });
    }

    // Botón vaciar carrito
    let btnEmpty = document.querySelector('#btn-empty-cart');
    if (btnEmpty) {
        btnEmpty.addEventListener('click', () => {
            setItemToLocalStorage([]);
            toast("Carrito vacío", "warning");
            cartList();
        });
    }
}