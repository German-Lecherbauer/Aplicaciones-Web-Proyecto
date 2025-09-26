import { Modal } from "./modal.js";

export function RenderCards(products = []) {
  const productList = document.querySelector('#product-list');
  if (!productList) return;

  productList.innerHTML = ''; // <-- ÚNICA línea agregada: limpiar antes de pintar

  let template = '';
  products.forEach((p) => {
    template += `
      <div class="col">
        <div class="card justify-content-center align-items-center" style="width: 300px;">
          <img src="${p.image}" class="card-img-top" alt="${p.title}"
               style="height: 300px; width: 250px; object-fit: contain;">
          <div class="card-body" style="width: 300px;">
            <h5 class="card-title text-truncate">${p.title}</h5>
          </div>
          <div class="mb-3 d-flex justify-content-center align-items-center">
            <button class="btn btn-dark" id="btn-${p.id}">Más Detalles</button>
          </div>
        </div>
      </div>
    `;
  });

  // Reemplaza SIEMPRE el contenido
  productList.innerHTML = template;

  // Eventos solo sobre lo renderizado
  products.forEach((p) => {
    const btn = document.querySelector(`#btn-${p.id}`); 
    if (btn) btn.addEventListener('click', () => Modal(p));
  });
}