import { Modal } from "./modal.js";

export function RenderCards(products = []) {
  const productList = document.querySelector('#product-list');
  if (!productList) return;

  productList.innerHTML = ''; // Clear the list before rendering

  let template = '';
  products.forEach((p) => {
    template += `
      <div class="col d-flex justify-content-center">
        <div class="card h-100 w-100">
          <img src="${p.image}" class="card-img-top card-img-custom" alt="${p.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate">${p.title}</h5>
            <div class="mt-auto">
              <button class="btn btn-dark btn-sm w-100" id="btn-${p.id}">Más Detalles</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  productList.innerHTML = template;

  products.forEach((p) => {
    const btn = document.querySelector(`#btn-${p.id}`);
    if (btn) btn.addEventListener('click', () => Modal(p));
  });
}