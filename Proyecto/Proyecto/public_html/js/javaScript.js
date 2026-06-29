// javaScript.js — Dolly's House
 
/* ── 1. SELECTOR DE CANTIDAD ── */
function crearSelectorCantidad() {
  const btn = document.querySelector('.btn-grande');
  if (!btn) return;
  let n = 1;
  const wrap = document.createElement('div');
  wrap.className = 'cantidad-wrap';
  wrap.innerHTML = `<button class="btn-cantidad" id="btn-menos">−</button>
    <span id="cantidad-val">1</span>
    <button class="btn-cantidad" id="btn-mas">+</button>`;
  btn.insertAdjacentElement('beforebegin', wrap);
  document.getElementById('btn-mas').onclick  = () => document.getElementById('cantidad-val').textContent = ++n;
  document.getElementById('btn-menos').onclick = () => { if (n > 1) document.getElementById('cantidad-val').textContent = --n; };
}
 
/* ── 2. AGREGAR AL CARRITO + TOAST ── */
function mostrarToast(msg) {
  let t = document.getElementById('toast-notif');
  if (!t) { t = document.createElement('div'); t.id = 'toast-notif'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('visible');
  setTimeout(() => t.classList.remove('visible'), 3000);
}
 
function agregarAlCarrito() {
  const btn = document.querySelector('.btn-grande');
  if (!btn) return;
  btn.onclick = () => {
    const n = parseInt(document.getElementById('cantidad-val')?.textContent || 1);
    const c = document.querySelector('.carrito-btn');
    if (c) {
      const total = (parseInt(c.dataset.count || 0)) + n;
      c.dataset.count = total;
      c.innerHTML = `🛒 <span class="label">Carrito</span> <span class="carrito-badge">${total}</span>`;
    }
    mostrarToast(`✅ ${n} producto(s) agregado(s) al carrito`);
  };
}
 
/* ── 3. ACORDEÓN ── */
function iniciarAcordeon() {
  document.querySelectorAll('.detalle-secciones h2').forEach(h => {
    h.style.cursor = 'pointer';
    h.insertAdjacentHTML('beforeend', ' <span class="acord-icon">▼</span>');
    h.onclick = () => {
      let el = h.nextElementSibling;
      while (el && el.tagName !== 'H2') { el.classList.toggle('acord-oculto'); el = el.nextElementSibling; }
      h.querySelector('.acord-icon').textContent = h.querySelector('.acord-icon').textContent === '▼' ? '▲' : '▼';
    };
  });
}
 
/* ── 4. CARRUSEL PRODUCTOS RELACIONADOS ── */
function iniciarCarrusel() {
  const track = document.getElementById('carrusel-track');
  const outer = document.querySelector('.carrusel-outer');
  if (!track || !outer) return;
 
  const VISIBLE = 3, GAP = 20;
  const originales = Array.from(track.querySelectorAll('.producto-card'));
  const total = originales.length;
  const cardWidth = Math.floor((outer.offsetWidth - GAP * (VISIBLE - 1)) / VISIBLE);
  const paso = cardWidth + GAP;
 
  // Fijar ancho y clonar para bucle
  originales.forEach(c => { c.style.cssText += `width:${cardWidth}px;min-width:${cardWidth}px;flex-shrink:0`; });
  originales.forEach(c => track.appendChild(c.cloneNode(true)));
  originales.slice().reverse().forEach(c => track.insertBefore(c.cloneNode(true), track.firstChild));
 
  let cur = total, lock = false;
 
  const ir = (i, anim = true) => {
    track.style.transition = anim ? 'transform 0.4s ease' : 'none';
    track.style.transform = `translateX(-${(cur = i) * paso}px)`;
    if (anim) actualizarDots();
  };
 
  track.addEventListener('transitionend', () => {
    if (cur >= total * 2) ir(total, false);
    else if (cur < total) ir(total * 2 - VISIBLE, false);
    lock = false;
  });
 
  // Dots
  const dots = document.getElementById('carrusel-dots');
  const totalDots = total - VISIBLE + 1;
  for (let i = 0; i < totalDots; i++) {
    const d = document.createElement('span');
    d.className = 'carrusel-dot' + (i === 0 ? ' activo' : '');
    d.onclick = () => ir(total + i);
    dots.appendChild(d);
  }
 
  function actualizarDots() {
    const rel = Math.min(((cur - total) % total + total) % total, totalDots - 1);
    dots.querySelectorAll('.carrusel-dot').forEach((d, i) => d.classList.toggle('activo', i === rel));
  }
 
  setTimeout(() => ir(cur, false), 0);
  document.getElementById('carrusel-prev').onclick = () => { if (!lock) { lock = true; ir(cur - 1); } };
  document.getElementById('carrusel-next').onclick = () => { if (!lock) { lock = true; ir(cur + 1); } };
}
 
/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  crearSelectorCantidad();
  agregarAlCarrito();
  iniciarAcordeon();
  iniciarCarrusel();
});