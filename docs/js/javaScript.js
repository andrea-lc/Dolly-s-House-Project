/* ══════════════════════════════════════════
    INDEX
   ══════════════════════════════════════════ */
// Carrusel hero de banners al inicio de index
document.addEventListener("DOMContentLoaded", () => {
    // Traemos el contenedor que tiene todos los slides (la "pista" que se mueve)
    const track = document.querySelector(".hero-track");

    // Traemos TODOS los slides (cada banner individual)
    // Esto devuelve un NodeList, que se comporta como un arreglo 
    const slides = document.querySelectorAll(".hero-slide");

    // Traemos los botones de navegación
    const prevBtn = document.querySelector(".hero-prev");
    const nextBtn = document.querySelector(".hero-next");

    // Traemos el contenedor donde pondremos los puntitos indicadores
    const dotsContainer = document.querySelector(".hero-dots");

    // Variable tipo Integer (número entero) que guarda el índice del slide actual.
    // Empieza en 0 porque es el primer slide.
    let currentIndex = 0;
    // Variable que guardará el ID del temporizador automático.
    // La dejamos vacía (undefined) por ahora.
    let autoPlay;
    slides.forEach((_, index) => {
        const dot = document.createElement("div");

        dot.classList.add("hero-dot");
        if (index === 0) {
            dot.classList.add("active");
        }
        dot.addEventListener("click", () => {
            // Actualizamos el índice al número del slide que clickearon
            currentIndex = index;
            updateCarousel();
            // Reiniciamos el autoplay para que no salte de golpe
            restartAutoPlay();
        });
        dotsContainer.appendChild(dot);
    });

    // Una vez creados, atrapamos todos los puntitos para poder manipularlos después
    const dots = document.querySelectorAll(".hero-dot");
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(dot =>
            dot.classList.remove("active")
        );
        dots[currentIndex].classList.add("active");
    }
    nextBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        updateCarousel();
        restartAutoPlay();
    });
    prevBtn.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        updateCarousel();
        restartAutoPlay();
    });

    function startAutoPlay() {
        autoPlay = setInterval(() => {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
    }

    function restartAutoPlay() {
        clearInterval(autoPlay);
        // Volvemos a iniciarlo desde cero
        startAutoPlay();
    }
    startAutoPlay();
});


// VIDEOS: Reproducir solo con hover del mouse de Categorias en Index

// Seleccionamos todos los videos de la sección de categorías
var videosCategorias = document.querySelectorAll('.videos-categorias video');

// Recorremos cada video
for (var i = 0; i < videosCategorias.length; i++) {
    var video = videosCategorias[i];

    // Cuando el mouse entra al video → reproducir
    video.addEventListener('mouseenter', function () {
        this.play(); // 'this' se refiere al video que disparó el evento
    });

    // Cuando el mouse sale del video → pausar
    video.addEventListener('mouseleave', function () {
        this.pause(); // Pausa el video
        this.currentTime = 0; // Opcional: reinicia al inicio (quita esta línea si quieres que se quede donde quedó)
    });
}
/*  CARRUSEL DE PRODUCTOS DESTACADOS INDEX*/

document.addEventListener('DOMContentLoaded', () => {
    // Tema 1: DOM Manipulation
    const track = document.querySelector('.productos-carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!track || !prevBtn || !nextBtn) return;

    // Responsive Logic - Calcular cuánto debe moverse
    function getScrollAmount() {
        const card = track.querySelector('.producto-card');
        if (!card) return 250;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 20;
        return card.offsetWidth + gap;
    }

    // Conditional Logic - Bucle Infinito (Wrap-around)
    nextBtn.addEventListener('click', () => {
        const maxScroll = track.scrollWidth - track.clientWidth;

        // Si ya estamos al final (con un margen de 10px), volvemos al inicio
        if (track.scrollLeft >= maxScroll - 10) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    });

    prevBtn.addEventListener('click', () => {
        // Si estamos al inicio, vamos al final
        if (track.scrollLeft <= 10) {
            const maxScroll = track.scrollWidth - track.clientWidth;
            track.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        }
    });

    // Touch Events (Swipe para móviles con bucle)
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50; // Mínimo de píxeles para considerar un swipe
        const diff = touchStartX - touchEndX;
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Deslizar a la izquierda (siguiente)
                if (track.scrollLeft >= maxScroll - 10) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
                }
            } else {
                // Deslizar a la derecha (anterior)
                if (track.scrollLeft <= 10) {
                    track.scrollTo({ left: maxScroll, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
                }
            }
        }
    }
});

/* ══════════════════════════════════════════
    PRODUCTOS EN GENERAL
   ══════════════════════════════════════════ */
// Función que revisa qué categorías están marcadas
// Ejemplo: si marcas "alimentos" y "aves", devuelve ["alimentos", "aves"]
function obtenerCategoriasMarcadas() {
    var marcadas = []; // Arreglo unidimensional
    for (var i = 0; i < checksCategoria.length; i++) { // Estructura repetitiva FOR
        if (checksCategoria[i].checked == true) { // IF simple
            var idLimpio = checksCategoria[i].id;
            marcadas.push(idLimpio); // Operación: agregar elemento al arreglo
        }
    }
    return marcadas;
}


// Función que revisa qué rangos de precio están marcados
function obtenerRangosMarcados() {
    var marcados = []; // Arreglo unidimensional
    for (var i = 0; i < checksPrecio.length; i++) { // Estructura repetitiva FOR
        if (checksPrecio[i].checked == true) { // IF simple
            marcados.push(checksPrecio[i].id);
        }
    }
    return marcados;
}


// Función que revisa si un precio entra en algún rango marcado
// Si no hay rangos marcados, devuelve true (pasa todos)
function precioEnRango(precio, rangos) {
    // Si no hay ningún rango marcado, pasa el filtro
    if (rangos.length == 0) { // IF simple
        return true;
    }

    // Recorremos cada rango marcado
    for (var i = 0; i < rangos.length; i++) { // Estructura repetitiva FOR
        var rango = rangos[i];

        if (rango == 'f-p1' && precio >= 0 && precio <= 20) { // IF con operadores lógicos (AND) y matemáticos (>=, <=)
            return true;
        }
        if (rango == 'f-p2' && precio >= 21 && precio <= 50) { // IF con operadores lógicos y matemáticos
            return true;
        }
        if (rango == 'f-p3' && precio >= 51 && precio <= 100) { // IF con operadores lógicos y matemáticos
            return true;
        }
        if (rango == 'f-p4' && precio > 100) { // IF con operadores lógicos y matemáticos (>)
            return true;
        }
    }

    // Si ningún rango coincidió, no pasa
    return false;
}


//  Función que revisa si una categoría está en la lista de marcadas
function categoriaValida(cat, categorias) {
    // Si no hay ninguna marcada, pasan todas
    if (categorias.length == 0) { // IF simple
        return true;
    }

    // Buscamos si la categoría está en el arreglo
    for (var i = 0; i < categorias.length; i++) { // Estructura repetitiva FOR (búsqueda lineal)
        if (categorias[i] == cat) { // IF simple con operador de comparación (==)
            return true;
        }
    }
    return false;
}


// Función para ordenar con BURBUJA 
function ordenarProductos() {
    var criterio = selectOrdenar.value;

    // Si está en "Ordenar por" (vacío), no hacemos nada
    if (criterio == '') { // IF simple
        return;
    }

    // Convertimos a arreglo para poder ordenar
    var arreglo = []; // Arreglo unidimensional
    for (var i = 0; i < productos.length; i++) { // Estructura repetitiva FOR
        arreglo.push(productos[i]);
    }

    // BUBBLE SORT: comparamos pares y los intercambiamos si están mal
    for (var i = 0; i < arreglo.length - 1; i++) { // Estructura repetitiva FOR (externa)
        for (var j = 0; j < arreglo.length - 1 - i; j++) { // Estructura repetitiva FOR (interna - FOR anidado)

            var precioA = parseFloat(arreglo[j].getAttribute('data-precio')); // lee el precio y lo convierte a Double
            var precioB = parseFloat(arreglo[j + 1].getAttribute('data-precio')); // Lee el precio del producto b y lo convierte tambien
            var intercambiar = false;
            // Si queremos menor precio: el grande debe ir al final
            if (criterio == 'menor' && precioA > precioB) { // IF con operadores lógicos y matemáticos (>)
                intercambiar = true;
            }
            // Si queremos mayor precio: el chico debe ir al final
            if (criterio == 'mayor' && precioA < precioB) { // IF con operadores lógicos y matemáticos (<)
                intercambiar = true;
            }

            // Intercambiamos las posiciones en el arreglo
            if (intercambiar == true) { // IF simple
                var temp = arreglo[j]; // Variable auxiliar para intercambio
                arreglo[j] = arreglo[j + 1]; // guarda el producto j +1 en una anterior
                arreglo[j + 1] = temp; // guarda en la posicion sigiente el producto que estaba antes
            }
        }
    }

    // Ahora que el arreglo está ordenado, los ponemos en el grid en ese orden
    // toma cada producto delarreglo ya ordenado y lo agrega en el contenedor de productos
    // con apprendChilde que agrega el producto alfinal delcontenedor
    for (var i = 0; i < arreglo.length; i++) { // Estructura repetitiva FOR
        grid.appendChild(arreglo[i]);
    }
}
/* ══════════════════════════════════════════
    INICIO DE SESION - REGISTRO
   ══════════════════════════════════════════ */
// USO DE VARIABLES (CONST Y LET) — Declaración de constantes
const formLogin = document.getElementById("form-login");
const formRegistro = document.getElementById("form-registro");

function mostrarError(id, mensaje) {
    let span = document.getElementById(id);   // USO DE VARIABLES LET
    span.textContent = mensaje;                // USO DE INTERACCIÓN CON FORMULARIOS (textContent) indica un mensaje en caso de error
    span.style.color = "#9f4451";              // USO DE MANIPULACIÓN CSS VÍA JS al haber un error cambia el color 
}

// USO DE FUNCIONES — Función para limpiar errores
function limpiarError(id) {
    document.getElementById(id).textContent = "";
}

// USO DE FUNCIONES CON PARÁMETROS — Valida si el email tiene "@" y "."
// USO DE IF ELSE DOBLE — Condicional con && (AND)
function emailValido(email) {
    // el email debe incluir "@" y "." para ser considerado válido
    if (email.includes("@") && email.includes(".")) {  // USO DE OPERADORES DE CADENAS
        return true;    // USO DE TIPO BOOLEAN
    } else {
        return false;
    }
}

/* BARRA DE FUERZA DE CONTRASEÑA */
// USO DE FUNCIONES CON PARÁMETROS — Calcula la fuerza
// USO DE IF ELSE IF ANIDADO — Suma puntos según reglas
function calcularFuerza(pass) {
    let puntos = 0;   // USO DE TIPO INTEGER

    if (pass.length >= 6) puntos++;   // USO DE OPERADOR INCREMENTO (++)
    if (pass.length >= 10) puntos++;
    if (pass !== pass.toLowerCase()) puntos++;   // USO DE OPERADORES DE CADENAS

    // USO DE FOR (BUCLE REPETITIVO) — Recorre cada carácter
    for (let i = 0; i < pass.length; i++) {      // USO DE TIPO INTEGER I
        let c = pass[i];                           // USO DE TIPO CARÁCTER
        if (c >= "0" && c <= "9") {                // USO DE OPERADORES LÓGICOS &&
            puntos++;
            break;   // USO DE BREAK — Sale del bucle
        }
    }
    return puntos;
}

// USO DE SWITCH CASE — Devuelve texto y color según puntos
function nivelFuerza(puntos) {
    let texto, color, ancho;

    switch (puntos) {
        case 0: case 1:
            texto = "Muy débil"; color = "#9f4451"; ancho = "25%"; break;
        case 2:
            texto = "Débil"; color = "#cc8747"; ancho = "50%"; break;
        case 3:
            texto = "Buena"; color = "#4e9ba9"; ancho = "75%"; break;
        case 4:
            texto = "Fuerte"; color = "#4c4f3e"; ancho = "100%"; break;
        default:
            texto = ""; color = "#e2d5c0"; ancho = "0%";
    }

    // USO DE OBJETOS — Retorna un objeto literal (Módulo E)
    return { texto: texto, color: color, ancho: ancho };
}

/* ══════════════════════════════════════════
    CLASES Y OBJETOS — USUARIOS (POO)
   ══════════════════════════════════════════ */

// USO DE CLASES — molde para crear un usuario
class Usuario {
    // USO DE CONSTRUCTOR — se ejecuta al hacer "new Usuario(...)"
    constructor(nombre, email, password) {
        this.nombre = nombre;      // USO DE ATRIBUTOS
        this.email = email;
        this.password = password;

    }

    // USO DE MÉTODO — compara si la contraseña ingresada coincide
    validarPassword(passwordIngresada) {
        return this.password === passwordIngresada; // USO DE OPERADOR DE COMPARACIÓN
    }
}

// USO DE ARREGLO — aquí se guardan todos los objetos Usuario (nuestra lista de usuarios)
// Al recargar la página, reconstruimos cada uno con "new Usuario(...)" para que conserven sus métodos
let usuarios = (JSON.parse(localStorage.getItem("usuarios")) || []).map(function (u) {
    //.map() recorre cada dato plano (JSON) guardado para reconstruirlo.
    let usuario = new Usuario(u.nombre, u.email, u.password);
    return usuario;
});

// Guarda el arreglo de usuarios en el navegador
function guardarUsuarios() {
    //// JSON.stringify convierte el arreglo de objetos complejos a una cadena de texto.
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Busca un usuario por su correo dentro del arreglo
function buscarUsuario(email) {
    for (let i = 0; i < usuarios.length; i++) { // Estructura repetitiva FOR
        if (usuarios[i].email.toLowerCase() === email.toLowerCase()) {
            return usuarios[i];
        }
    }
    return null;
}

// Crea un nuevo objeto Usuario y lo agrega al arreglo (si el correo no existe ya)
function registrarUsuario(nombre, email, password) {
    if (buscarUsuario(email)) {
        return { exito: false, mensaje: "Ese correo ya está registrado" };
    }
    let nuevoUsuario = new Usuario(nombre, email, password); // USO DE OBJETOS
    usuarios.push(nuevoUsuario);
    guardarUsuarios();
    return { exito: true, usuario: nuevoUsuario };
}

// Verifica correo + contraseña
function autenticar(email, password) {
    // Intenta obtener el objeto usuario asociado a ese correo.
    let usuario = buscarUsuario(email);
    // Si buscarUsuario devolvió null, el usuario no existe.
    if (!usuario) {
        return { exito: false, mensaje: "No existe una cuenta con ese correo" };
    }  
     // Si el usuario existe, verifica si la contraseña coincide. 
    if (usuario.password !== password) {
        return { exito: false, mensaje: "Contraseña incorrecta" };
    }
    return { exito: true, usuario: usuario };
}

// Actualiza los datos (nombre, correo y opcionalmente contraseña) de un usuario existente
function actualizarUsuario(emailOriginal, nuevoNombre, nuevoEmail, nuevaPassword) {
     // Busca al usuario usando su correo actual (que actúa como clave primaria lógica).
    let usuario = buscarUsuario(emailOriginal);
    if (!usuario) {
        return { exito: false, mensaje: "No se encontró el usuario" };
    }

    // Si cambia de correo, verificamos que ninguna otra cuenta ya lo use
    if (nuevoEmail.toLowerCase() !== emailOriginal.toLowerCase() && buscarUsuario(nuevoEmail)) {
        return { exito: false, mensaje: "Ese correo ya está en uso por otra cuenta" };
    }
// Actualiza las propiedades del objeto en memoria con los nuevos valores.
    usuario.nombre = nuevoNombre;
    usuario.email = nuevoEmail;
    // Evalúa si se proporcionó una nueva contraseña (una cadena con texto).
    if (nuevaPassword) { // solo la cambiamos si el usuario escribió una nueva
        usuario.password = nuevaPassword;
    }
 // Persiste los cambios realizados en el navegador.
    guardarUsuarios();

    // Si el correo cambió, la sesión activa debe seguir apuntando al usuario correcto
    if (localStorage.getItem("sesionActual") === emailOriginal) {
        localStorage.setItem("sesionActual", nuevoEmail);
    }

    return { exito: true, usuario: usuario };
}

/* ══════════════════════════════════════════
    SESIÓN ACTIVA — HEADER DINÁMICO
   ══════════════════════════════════════════ */

// Guarda en localStorage el correo del usuario que acaba de iniciar sesión
function iniciarSesion(usuario) {
    localStorage.setItem("sesionActual", usuario.email);
}

// Devuelve el objeto Usuario que tiene la sesión activa, o null si nadie ha iniciado sesión
function obtenerSesionActual() {
    let email = localStorage.getItem("sesionActual");
    if (!email) return null;
    return buscarUsuario(email);
}

// Cierra la sesión activa y recarga la página para que el header vuelva a su estado normal
function cerrarSesion() {
    localStorage.removeItem("sesionActual");
    location.reload();
}

// Reemplaza los enlaces "Iniciar Sesion / Registrarse" del header por un saludo
// con el nombre del usuario, si es que hay una sesión activa
function actualizarHeaderSesion() {
        // Buscamos el contenedor en el HTML donde deberían ir los botones de login/registro
    const cont = document.getElementById("auth-area");
     // Cláusula de Guarda: Si este archivo se carga en una página que NO tiene "auth-area",
    // la función se detiene aquí silenciosamente. Evita que el script rompa otras páginas
    if (!cont) return; // esta página aún no tiene el header actualizado

    const usuario = obtenerSesionActual();
    if (!usuario) return; // nadie ha iniciado sesión, dejamos el header tal cual está

    const primerNombre = usuario.nombre.split(" ")[0];

    cont.innerHTML = `
        <div class="usuario-menu" style="position:relative;">
            <button type="button" id="usuario-toggle" class="login-btn"
                style="background:none;border:none;cursor:pointer;font:inherit;">
                Hola, ${primerNombre} ▾
            </button>
            <div id="usuario-dropdown" style="display:none;position:absolute;right:0;top:100%;
                background:#1b171e;color:#dcc594;min-width:170px;padding:8px 0;z-index:50;
                border-radius:4px;box-shadow:0 6px 16px rgba(0,0,0,0.25);">
                <a href="../html/Perfil.html" style="display:block;padding:8px 16px;color:#dcc594;text-decoration:none;">Editar perfil</a>
                <button type="button" id="btn-cerrar-sesion"
                    style="display:block;width:100%;text-align:left;padding:8px 16px;background:none;
                    border:none;color:#dcc594;cursor:pointer;font:inherit;">Cerrar sesión</button>
            </div>
        </div>
    `;

    const toggle = document.getElementById("usuario-toggle");
    const dropdown = document.getElementById("usuario-dropdown");
    toggle.addEventListener("click", () => {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
    // Cierra el menú si el usuario hace click fuera de él
    document.addEventListener("click", (e) => {
        if (!cont.contains(e.target)) dropdown.style.display = "none";
    });
    document.getElementById("btn-cerrar-sesion").addEventListener("click", cerrarSesion);
}

// Se ejecuta en TODAS las páginas que incluyan este archivo (por eso va fuera de otros listeners)
document.addEventListener("DOMContentLoaded", actualizarHeaderSesion);


/* ══════════════════════════════════════════
    PRODUCTOS DETALLE
   ══════════════════════════════════════════ */

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
    document.getElementById('btn-mas').onclick = () => document.getElementById('cantidad-val').textContent = ++n;
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

/* ══════════════════════════════════════════
    CARRITO — CRUD (persistido en localStorage)
    Cada item: { id, nombre, marca, precio, imagen, cantidad }
   ══════════════════════════════════════════ */
const CARRITO_KEY = 'dollyCarrito';

// Genera un id "slug" a partir del nombre (ej: "Croquetas Zeus" -> "croquetas-zeus")
function generarIdProducto(nombre) {
    return nombre
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// READ — devuelve el arreglo completo del carrito
function obtenerCarrito() {
    try {
        return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    } catch (e) {
        return [];
    }
}

// (privado) guarda el arreglo completo y refresca el badge del header
function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    actualizarBadgeCarrito();
}

// CREATE — agrega un producto; si ya existe, suma la cantidad en vez de duplicar
function crearItemCarrito(producto, cantidad = 1) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(p => p.id === producto.id);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }
    guardarCarrito(carrito);
    return carrito;
}

// UPDATE — cambia la cantidad de un producto puntual
function actualizarCantidadCarrito(id, nuevaCantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === id);
    if (!item) return carrito;
    item.cantidad = Math.max(1, parseInt(nuevaCantidad) || 1);
    guardarCarrito(carrito);
    return carrito;
}

// DELETE — elimina un producto puntual del carrito
function eliminarItemCarrito(id) {
    const carrito = obtenerCarrito().filter(p => p.id !== id);
    guardarCarrito(carrito);
    return carrito;
}

// DELETE — vacía todo el carrito
function vaciarCarrito() {
    guardarCarrito([]);
}

// Refresca el número sobre el ícono 🛒 en TODAS las páginas
function actualizarBadgeCarrito() {
    const total = obtenerCarrito().reduce((acc, p) => acc + p.cantidad, 0);
    document.querySelectorAll('.carrito-btn').forEach(c => {
        c.innerHTML = `🛒 <span class="label">Carrito</span>` +
            (total > 0 ? ` <span class="carrito-badge">${total}</span>` : '');
    });
}

// Lee el precio/cantidad del producto en la página de DETALLE y lo agrega (CREATE)
function agregarAlCarrito() {
    const btn = document.querySelector('.btn-grande');
    if (!btn) return;
    btn.onclick = () => {
        const n = parseInt(document.getElementById('cantidad-val')?.textContent || 1);
        const nombre = document.querySelector('.detalle-titulo')?.textContent.trim() || 'Producto';
        const marca = document.querySelector('.marca')?.textContent.trim() || '';
        const precioTexto = document.getElementById('precio-final')?.textContent
            || document.querySelector('.precio-grande')?.textContent || '0';
        const precio = parseFloat(precioTexto.replace(/S\/\.?/, '').replace(',', '.').trim()) || 0;
        const imagen = document.querySelector('#img-track img')?.getAttribute('src') || '';

        crearItemCarrito({ id: generarIdProducto(nombre), nombre, marca, precio, imagen }, n);
        mostrarToast(`✅ ${n} producto(s) agregado(s) al carrito`);
    };
}

// Conecta el botón "Agregar al carrito" de cada tarjeta en páginas de categoría (CREATE)
function iniciarBotonesCarritoCards() {
    document.querySelectorAll('.producto-card').forEach(card => {
        const btn = card.querySelector('.btn-comprar');
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const nombre = card.querySelector('.nombre')?.textContent.trim() || 'Producto';
            const marca = card.querySelector('.marca')?.textContent.trim() || '';
            const precioTexto = card.querySelector('.precio')?.textContent || '0';
            const precio = parseFloat(precioTexto.replace(/S\/\.?/, '').replace(',', '.').trim()) || 0;
            const imagen = card.querySelector('img')?.getAttribute('src') || '';

            crearItemCarrito({ id: generarIdProducto(nombre), nombre, marca, precio, imagen }, 1);
            mostrarToast(`✅ ${nombre} agregado al carrito`);
        });
    });
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
    const primera    = track.firstElementChild;   // firstElementChild
    const ultima     = track.lastElementChild;    // lastElementChild
    const originales = [];
    let el = primera;
    while (el) { originales.push(el); el = el.nextElementSibling; }  // nextElementSibling
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
    actualizarBadgeCarrito();
    iniciarBotonesCarritoCards();
    crearSelectorCantidad();
    agregarAlCarrito();
    iniciarAcordeon();
    iniciarCarrusel();
});
