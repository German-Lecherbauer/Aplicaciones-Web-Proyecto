export function contador(id) {
    let template = `
        <div class="d-flex justify-content-center align-items-center gap-3 my-3">
            <button id="decrementBtn-${id}" class="btn btn-dark">-</button>
            <span id="contador-${id}">1</span>
            <button id="incrementBtn-${id}" class="btn btn-dark">+</button>
        </div>
    `;

    return template;
}

export function addEventListener(id, cantidad) {
    let btnIncrement = document.querySelector(`#incrementBtn-${id}`);
    let btnDecrement = document.querySelector(`#decrementBtn-${id}`);
    let spanContador = document.querySelector(`#contador-${id}`);

    btnIncrement.addEventListener('click', () => {
        spanContador.textContent = ++cantidad;
    });

    btnDecrement.addEventListener('click', () => {
       if (cantidad > 1 ){
        spanContador.textContent = --cantidad;
       }
       spanContador.textContent = cantidad;
    });
    
}
