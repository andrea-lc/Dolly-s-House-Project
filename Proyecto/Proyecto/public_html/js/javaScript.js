//producto-detalle.js

/* ══════════════════════════════════════════
   1. SELECTOR DE CANTIDAD
   ══════════════════════════════════════════ */
function crearSelectorCantidad() {
  const btnComprar = document.querySelector('.btn-grande');
  if (!btnComprar) return;
 
  const wrapper = document.createElement('div');
  wrapper.className = 'cantidad-wrap';
  wrapper.innerHTML = `
    <button class="btn-cantidad" id="btn-menos">−</button>
    <span id="cantidad-val">1</span>
    <button class="btn-cantidad" id="btn-mas">+</button>
  `;
  btnComprar.insertAdjacentElement('beforebegin', wrapper);
 
  let cantidad = 1;
  document.getElementById('btn-mas').addEventListener('click', () => {
    cantidad++;
    document.getElementById('cantidad-val').textContent = cantidad;
  });
  document.getElementById('btn-menos').addEventListener('click', () => {
    if (cantidad > 1) {
      cantidad--;
      document.getElementById('cantidad-val').textContent = cantidad;
    }
  });
}
 
/* ══════════════════════════════════════════
   2. NOTIFICACIÓN AL AGREGAR AL CARRITO
   ══════════════════════════════════════════ */
function agregarAlCarrito() {
  const btn = document.querySelector('.btn-grande');
  if (!btn) return;
 
  btn.addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidad-val')?.textContent || 1);
 
    const carritoBtn = document.querySelector('.carrito-btn');
    if (carritoBtn) {
      let actual = parseInt(carritoBtn.dataset.count || 0);
      actual += cantidad;
      carritoBtn.dataset.count = actual;
      carritoBtn.innerHTML = `🛒 <span class="label">Carrito</span> <span class="carrito-badge">${actual}</span>`;
    }
 
    mostrarToast(`✅ ${cantidad} producto(s) agregado(s) al carrito`);
  });
}
 
/* ══════════════════════════════════════════
   3. TOAST DE NOTIFICACIÓN
   ══════════════════════════════════════════ */
function mostrarToast(mensaje) {
  let toast = document.getElementById('toast-notif');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notif';
    document.body.appendChild(toast);
  }
  toast.textContent = mensaje;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 3000);
}
 
/* ══════════════════════════════════════════
   4. ACORDEÓN EN SECCIONES
   ══════════════════════════════════════════ */
function iniciarAcordeon() {
  const secciones = document.querySelectorAll('.detalle-secciones h2');
  secciones.forEach(titulo => {
    titulo.style.cursor = 'pointer';
    titulo.insertAdjacentHTML('beforeend', ' <span class="acord-icon">▼</span>');
 
    let siguiente = titulo.nextElementSibling;
    while (siguiente && siguiente.tagName !== 'H2') {
      siguiente.classList.add('acord-contenido');
      siguiente = siguiente.nextElementSibling;
    }
 
    titulo.addEventListener('click', () => {
      const icon = titulo.querySelector('.acord-icon');
      let el = titulo.nextElementSibling;
      while (el && el.tagName !== 'H2') {
        el.classList.toggle('acord-oculto');
        el = el.nextElementSibling;
      }
      icon.textContent = icon.textContent === '▼' ? '▲' : '▼';
    });
  });
}
 
/* ══════════════════════════════════════════
   5. CARRUSEL BUCLE INFINITO
   ══════════════════════════════════════════ */
function iniciarCarrusel() {
  const track = document.getElementById('carrusel-track');
  const outer = document.querySelector('.carrusel-outer');
  if (!track || !outer) return;
 
  const dotsContainer = document.getElementById('carrusel-dots');
  const VISIBLE = 3;
  const GAP = 20;
 
  // Guardar tarjetas originales ANTES de clonar
  const originales = Array.from(track.querySelectorAll('.producto-card'));
  const total = originales.length; // 8
 
  // Calcular ancho de cada tarjeta según el outer
  const outerWidth = outer.offsetWidth;
  const cardWidth = Math.floor((outerWidth - GAP * (VISIBLE - 1)) / VISIBLE);
 
  // Aplicar ancho fijo a cada tarjeta original
  originales.forEach(card => {
    card.style.width = cardWidth + 'px';
    card.style.minWidth = cardWidth + 'px';
    card.style.flexShrink = '0';
  });
 
  // Clonar DESPUÉS de fijar el ancho
  originales.forEach(card => {
    const clon = card.cloneNode(true);
    track.appendChild(clon);
  });
  originales.slice().reverse().forEach(card => {
    const clon = card.cloneNode(true);
    track.insertBefore(clon, track.firstChild);
  });
 
  // Paso = ancho tarjeta + gap
  const paso = cardWidth + GAP;
 
  // Empieza en la primera tarjeta real (índice = total, porque hay 'total' clones al inicio)
  let current = total;
  let bloqueado = false;
 
  function saltar(index) {
    track.style.transition = 'none';
    current = index;
    track.style.transform = `translateX(-${current * paso}px)`;
  }
 
  function mover(index) {
    if (bloqueado) return;
    bloqueado = true;
    track.style.transition = 'transform 0.4s ease';
    current = index;
    track.style.transform = `translateX(-${current * paso}px)`;
    actualizarDots();
  }
 
  // Cuando termina la animación: si estamos en un clon, saltamos al original
  track.addEventListener('transitionend', () => {
    // Pasamos del último original → saltar al primero
    if (current >= total * 2) {
      saltar(total);
    }
    // Pasamos del primer clon → saltar al último original
    else if (current < total) {
      saltar(total * 2 - VISIBLE);
    }
    bloqueado = false;
  });
 
  // totalDots = posiciones únicas (3 visibles a la vez sobre 8 = 6 posiciones)
  const totalDots = total - VISIBLE + 1;
 
  function actualizarDots() {
    const rel = ((current - total) % total + total) % total;
    const dotIndex = Math.min(rel, totalDots - 1);
    dotsContainer.querySelectorAll('.carrusel-dot').forEach((d, i) => {
      d.classList.toggle('activo', i === dotIndex);
    });
  }
 
  // Crear dots
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('span');
    dot.className = 'carrusel-dot' + (i === 0 ? ' activo' : '');
    dot.addEventListener('click', () => { mover(total + i); });
    dotsContainer.appendChild(dot);
  }
 
  // Posición inicial sin animación
  setTimeout(() => { saltar(current); }, 0);
 
  document.getElementById('carrusel-prev').addEventListener('click', () => {
    mover(current - 1);
  });
 
  document.getElementById('carrusel-next').addEventListener('click', () => {
    mover(current + 1);
  });
}

/* ══════════════════════════════════════════
   6. CARRUSEL IMAGEN PRINCIPAL DEL PRODUCTO
   ══════════════════════════════════════════ */
function iniciarImagenProducto() {
  const track = document.getElementById('img-track');
  if (!track) return;

  const imgs = track.querySelectorAll('img');
  const miniaturas = document.querySelectorAll('.miniatura');
  let actual = 0;

  function irA(index) {
    actual = index;
    track.style.transform = `translateX(-${actual * 100}%)`;
    miniaturas.forEach((m, i) => m.classList.toggle('activa', i === actual));
  }

  miniaturas.forEach((min, i) => {
    min.addEventListener('click', () => irA(i));
  });
}
 
/* ══════════════════════════════════════════
   INIT — UN SOLO DOMContentLoaded
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  crearSelectorCantidad();
  agregarAlCarrito();
  iniciarAcordeon();
  iniciarCarrusel();
  iniciarImagenProducto();
});