export function toast(message, color){
    let template = `
    <div class="toast align-items-center text-bg-${color} border-0" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body">
      ${message}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
`;
    let toastContainer = document.querySelector('.toast-container');
    toastContainer.innerHTML += template;

    const toasts = document.querySelectorAll('.toast');
    let lastToast = toasts[toasts.length -1];

    const bootstrapToast = new bootstrap.Toast(lastToast, {delay:2000});
    bootstrapToast.show();
}