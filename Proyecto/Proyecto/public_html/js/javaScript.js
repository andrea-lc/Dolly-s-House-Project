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

/*  CARRUSEL DE PRODUCTOS DESTACADOS INDEX*/

document.addEventListener('DOMContentLoaded', () => {
    // Tema 1: DOM Manipulation
    const track = document.querySelector('.productos-carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!track || !prevBtn || !nextBtn) return;

    // Tema 5: Responsive Logic - Calcular cuánto debe moverse
    function getScrollAmount() {
        const card = track.querySelector('.producto-card');
        if (!card) return 250;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 20;
        return card.offsetWidth + gap;
    }

    // Tema 6: Conditional Logic - Bucle Infinito (Wrap-around)
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

    // Tema 4: Touch Events (Swipe para móviles con bucle)
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
