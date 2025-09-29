import { getFromLocalStorage, saveToLocalStorage, setItemToLocalStorage, updateItemStorage } from '../../storage/storage.js';
import {addEventListener, contador} from './contador.js';
import { cartList } from './cartList.js';
import { toast } from './toast.js';


export function Modal(prod) {

    let container = document.querySelector('#productModal');

    let template = `
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-md-down">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${prod.title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="row">
      <div class="col-md-5 d-flex justify-content-center align-items-center">
        <img src="${prod.image}" class="img-fluid" alt="${prod.title}" style="max-height: 200px; max-width: 100%; margin: auto; display: block;">
      </div>
      <div class="col-md-7 d-flex justify-content-center align-items-center">
      <div class="d-flex flex-column gap-3 text-center text-md-start align-items-center align-items-md-start">
         <p>${prod.description}</p>
         <p style="width:150px;"> Precio:<small> USD $${prod.price}</small>
          </p>
          ${contador(prod.id)}
          </div>
        </div>
      </div>
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-dark" id="addToCartBtn-${prod.id}">Agregar a Carrito</button>
      </div>
  </div>
    `;

    container.innerHTML = template;
    const bootstrapModal = new bootstrap.Modal(container);
    bootstrapModal.show();

    addEventListener(prod.id, 1);
    let btnAddToCart = document.querySelector(`#addToCartBtn-${prod.id}`);
        btnAddToCart.addEventListener('click', () => {
        let inptcantidad = document.querySelector(`#contador-${prod.id}`);
        let qtty = parseInt(inptcantidad.textContent);
        let idx = updateItemStorage(prod.id, qtty);
        console.log(idx);

        if (idx == -1){
          prod.qtty = qtty;
          saveToLocalStorage(prod);
        } 
        toast(`${prod.title} Agregado al carrito`, 'dark');
        cartList();
    });

}