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