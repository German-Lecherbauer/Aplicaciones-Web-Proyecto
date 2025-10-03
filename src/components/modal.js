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
      <div class="modal-body d-flex flex-column align-items-center text-center">
        <img src="${prod.image}" class="img-fluid mb-3" alt="${prod.title}" style="max-height: 250px;">
        <p>${prod.description}</p>
        <h4 class="fw-bold mb-3">USD $${prod.price}</h4>
        ${contador(prod.id)}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="addToCartBtn-${prod.id}">Agregar a Carrito</button>
      </div>
  </div>
    `;

    container.innerHTML = template;
    const bootstrapModal = new bootstrap.Modal(container);
    bootstrapModal.show();

    const btnTop = document.querySelector('#btn-top');

    container.addEventListener('show.bs.modal', () => {
      if (window.innerWidth < 768) {
        btnTop.style.display = 'none';
      }
    });

    container.addEventListener('hide.bs.modal', () => {
      if (window.innerWidth < 768 && window.scrollY > 200) {
        btnTop.style.display = 'block';
      }
    });

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