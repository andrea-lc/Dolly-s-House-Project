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
    PRODUCTOS ALIMENTOS
   ══════════════════════════════════════════ */
/*   Barra de filtros para buscar productos y boton de filtrado de precios*/
document.addEventListener('DOMContentLoaded', function () {
    // Guardamos todos los elementos que vamos a usar
    var productos = document.querySelectorAll('.producto-card'); // NodeList (similar a arreglo)
    var checksCategoria = document.querySelectorAll('#alimentos, #pequenos, #aves, #corral, #conejo, #hamster, #chinchilla, #erizo'); // NodeList
    var checksPrecio = document.querySelectorAll('#f-p1, #f-p2, #f-p3, #f-p4'); // NodeList
    var selectOrdenar = document.getElementById('ordenar');
    var btnBorrar = document.getElementById('btn-borrar'); // Botón eliminar filtros
    var contador = document.getElementById('resultados');
    var grid = document.getElementById('grid-productos');

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


    //  Función principal: filtra los productos
    function aplicarFiltros() {
        var categorias = obtenerCategoriasMarcadas();
        var rangos = obtenerRangosMarcados();
        var visibles = 0;

        // Recorremos cada producto
        for (var i = 0; i < productos.length; i++) { // Estructura repetitiva FOR
            var prod = productos[i];

            // Leemos sus datos (categoria y precio)
            var cat = prod.getAttribute('data-categoria');
            var precio = parseFloat(prod.getAttribute('data-precio')); // Conversión String a Double

            // Revisamos si pasa ambos filtros
            var pasaCat = categoriaValida(cat, categorias);
            var pasaPrec = precioEnRango(precio, rangos);

            // Si pasa ambos, lo mostramos. Si no, lo ocultamos.
            if (pasaCat == true && pasaPrec == true) { // IF simple con operador lógico AND
                prod.style.display = '';
                visibles = visibles + 1; // Operación matemática: adición
            } else { // ELSE (condicional doble IF-ELSE)
                prod.style.display = 'none';
            }
        }

        // Actualizamos el contador de resultados
        if (visibles == 1) { // IF-ELSE doble
            contador.textContent = visibles + " resultado encontrado"; // Concatenación de cadenas
        } else {
            contador.textContent = visibles + " resultados encontrados"; // Concatenación de cadenas
        }

        // Después de filtrar, ordenamos
        ordenarProductos();
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

                var precioA = parseFloat(arreglo[j].getAttribute('data-precio')); // Conversión String a Double
                var precioB = parseFloat(arreglo[j + 1].getAttribute('data-precio')); // Conversión String a Double
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
                    arreglo[j] = arreglo[j + 1]; // Operación de asignación
                    arreglo[j + 1] = temp; // Operación de asignación
                }
            }
        }

        // Ahora que el arreglo está ordenado, los ponemos en el grid en ese orden
        for (var i = 0; i < arreglo.length; i++) { // Estructura repetitiva FOR
            grid.appendChild(arreglo[i]);
        }
    }


    // 8Escuchamos los cambios de los checkboxes de categoría
    for (var i = 0; i < checksCategoria.length; i++) { // Estructura repetitiva FOR
        checksCategoria[i].addEventListener('change', aplicarFiltros);
    }

    // Escuchamos los cambios de los checkboxes de precio
    for (var i = 0; i < checksPrecio.length; i++) { // Estructura repetitiva FOR
        checksPrecio[i].addEventListener('change', aplicarFiltros);
    }

    // Escuchamos el cambio del select de ordenar
    selectOrdenar.addEventListener('change', aplicarFiltros);


    // 9Botón para borrar todos los filtros
    btnBorrar.addEventListener('click', function () { // Evento click del botón eliminar
        // Desmarcamos todos los checkboxes de categoría
        for (var i = 0; i < checksCategoria.length; i++) { // Estructura repetitiva FOR
            checksCategoria[i].checked = false;
        }

        // Desmarcamos todos los checkboxes de precio
        for (var i = 0; i < checksPrecio.length; i++) { // Estructura repetitiva FOR
            checksPrecio[i].checked = false;
        }

        // Reseteamos el select
        selectOrdenar.value = '';

        // Volvemos a aplicar filtros (mostrará todo)
        aplicarFiltros();
    });

});

/* ══════════════════════════════════════════
    INICIO DE SESION - REGISTRO
   ══════════════════════════════════════════ */
// USO DE VARIABLES (CONST Y LET) — Declaración de constantes
const formLogin = document.getElementById("form-login");
const formRegistro = document.getElementById("form-registro");

function mostrarError(id, mensaje) {
    let span = document.getElementById(id);   // USO DE VARIABLES LET
    span.textContent = mensaje;                // USO DE INTERACCIÓN CON FORMULARIOS (textContent)
    span.style.color = "#9f4451";              // USO DE MANIPULACIÓN CSS VÍA JS
}
// USO DE FUNCIONES — Función para limpiar errores
function limpiarError(id) {
    document.getElementById(id).textContent = "";
}


// USO DE FUNCIONES CON PARÁMETROS — Valida si el email tiene "@" y "."
// USO DE IF ELSE DOBLE — Condicional con && (AND)
function emailValido(email) {
    if (email.includes("@") && email.includes(".")) {  // USO DE OPERADORES DE CADENAS
        return true;    // USO DE TIPO BOOLEAN
    } else {
        return false;
    }
}

/* VALIDACIÓN DEL LOGIN */
// USO DE FUNCIONES CON PARÁMETROS — Recibe el evento del submit
function validarLogin(e) {
    e.preventDefault();   // USO DE MÉTODOS DEL OBJETO EVENT

    // USO DE INTERACCIÓN CON FORMULARIOS — Leer valor de inputs
    let email = document.getElementById("email-login").value.trim();
    let password = document.getElementById("password-login").value.trim();
    let valido = true;   // USO DE TIPO BOOLEAN

    limpiarError("error-email");
    limpiarError("error-password");

    // USO DE IF ELSE ANIDADO — Valida email vacío o inválido
    if (email === "") {                        // USO DE OPERADOR DE COMPARACIÓN ===
        mostrarError("error-email", "El correo es obligatorio");
        valido = false;
    } else if (!emailValido(email)) {          // USO DE IF ELSE IF ANIDADO
        mostrarError("error-email", "Correo no válido");
        valido = false;
    }

    // USO DE IF ELSE DOBLE — Valida contraseña
    if (password === "") {
        mostrarError("error-password", "La contraseña es obligatoria");
        valido = false;
    } else if (password.length < 6) {          // USO DE OPERADORES MATEMÁTICOS (COMPARACIÓN <)
        mostrarError("error-password", "Mínimo 6 caracteres");
        valido = false;
    }

    // USO DE IF SIMPLE — Si todo está bien
    if (valido) {
        // USO DE CONCATENACIÓN DE CADENAS — Une texto con +
        alert("Bienvenida " + email + "!");
    }
}

/*  VALIDACIÓN DEL REGISTRO */
function validarRegistro(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email-registro").value.trim();
    let pass = document.getElementById("password-registro").value.trim();
    let confirm = document.getElementById("password-confirm").value.trim();
    let terminos = document.getElementById("terminos").checked;   // USO DE TIPO BOOLEAN
    let valido = true;

    // Limpiar errores previos
    limpiarError("error-nombre");
    limpiarError("error-email-reg");
    limpiarError("error-pass-reg");
    limpiarError("error-confirm");
    limpiarError("error-terminos");

    // USO DE IF SIMPLE — Valida nombre vacío
    if (nombre === "") {
        mostrarError("error-nombre", "El nombre es obligatorio");
        valido = false;
    }

    // USO DE IF ELSE DOBLE — Valida email
    if (email === "") {
        mostrarError("error-email-reg", "El correo es obligatorio");
        valido = false;
    } else if (!emailValido(email)) {
        mostrarError("error-email-reg", "Correo no válido");
        valido = false;
    }

    // USO DE IF ELSE IF ANIDADO — Valida contraseña
    if (pass === "") {
        mostrarError("error-pass-reg", "La contraseña es obligatoria");
        valido = false;
    } else if (pass.length < 6) {
        mostrarError("error-pass-reg", "Mínimo 6 caracteres");
        valido = false;
    }

    // USO DE IF SIMPLE — Compara contraseñas
    if (pass !== confirm) {                    // USO DE OPERADOR DE COMPARACIÓN !==
        mostrarError("error-confirm", "Las contraseñas no coinciden");
        valido = false;
    }

    // USO DE IF SIMPLE — Valida checkbox
    if (!terminos) {                           // USO DE OPERADOR LÓGICO NOT (!)
        mostrarError("error-terminos", "Acepta los términos");
        valido = false;
    }

    if (valido) {
        alert("🎉 Cuenta creada, bienvenida " + nombre);
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

// USO DE FUNCIONES — Actualiza la barra visual
// USO DE MANIPULACIÓN CSS VÍA JS — Cambia width y background
function actualizarFuerza(pass) {
    let barra = document.getElementById("strength-fill");
    let texto = document.getElementById("strength-text");
    if (!barra || !texto) return;

    if (pass.length === 0) {
        barra.style.width = "0%";
        barra.style.background = "#e2d5c0";
        texto.textContent = "Escribe una contraseña";
        return;
    }

    let nivel = nivelFuerza(calcularFuerza(pass));
    barra.style.width = nivel.ancho;             // USO DE MANIPULACIÓN CSS
    barra.style.background = nivel.color;
    texto.textContent = nivel.texto;
    texto.style.color = nivel.color;
}


/* MOSTRAR / OCULTAR CONTRASEÑA  */
function activarOjo(idBoton, idInput) {
    let boton = document.getElementById(idBoton);
    let input = document.getElementById(idInput);
    if (!boton || !input) return;

    // USO DE ADD EVENT LISTENER — Evento click
    boton.addEventListener("click", function () {
        // USO OF HASATTRIBUTE — Verifica atributo type
        if (input.getAttribute("type") === "password") {
            input.setAttribute("type", "text");      // USO DE SETATTRIBUTE
            boton.textContent = "🙈";
        } else {
            input.setAttribute("type", "password");  // USO DE SETATTRIBUTE
            boton.textContent = "👁";
        }
    });
}

/* INICIALIZACIÓN — Cuando carga la página */
// USO DEL OBJETO WINDOW — Evento DOMContentLoaded
window.addEventListener("DOMContentLoaded", function () {

    activarOjo("toggle-pass-login", "password-login");
    activarOjo("toggle-pass-reg", "password-registro");

    // USO DE IF SIMPLE — Solo si existe el formulario
    if (formLogin) {
        formLogin.addEventListener("submit", validarLogin);   // USO DE ADD EVENT LISTENER
    }

    if (formRegistro) {
        formRegistro.addEventListener("submit", validarRegistro);

        // USO DE ADD EVENT LISTENER — Evento input (mientras escribe)
        let inputPass = document.getElementById("password-registro");
        if (inputPass) {
            inputPass.addEventListener("input", function () {
                actualizarFuerza(inputPass.value);
            });
        }
    }
});