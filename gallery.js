const dialog = document.querySelector('#viewer');
const links = [...document.querySelectorAll('.screen-link')];
let current = 0;
let opener;
const image = document.querySelector('#viewer-image');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
function show(index) {
  current = index;
  const link = links[index];
  const figure = link.closest('figure');
  document.querySelector('#viewer-title').textContent = figure.querySelector('h4').textContent;
  document.querySelector('#viewer-caption').textContent = figure.querySelector('figcaption p').textContent;
  image.src = link.href;
  image.alt = link.querySelector('img').alt;
  document.querySelector('#original').href = link.href;
  document.querySelector('#position').textContent = `${index + 1} / ${links.length}`;
  previous.disabled = index === 0;
  next.disabled = index === links.length - 1;
}
if (typeof dialog.showModal === 'function') {
  links.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    show(index);
    dialog.showModal();
  }));
  document.querySelector('.close').addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => { if (current > 0) show(current - 1); });
  next.addEventListener('click', () => { if (current < links.length - 1) show(current + 1); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && current > 0) { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight' && current < links.length - 1) { event.preventDefault(); show(current + 1); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }});
  dialog.addEventListener('close', () => opener?.focus());
}
