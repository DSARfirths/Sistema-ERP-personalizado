document.addEventListener('DOMContentLoaded', () => {

    // Lógica del menú móvil
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('#mobile-menu a, #mobile-menu button').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Lógica para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section > div').forEach(sectionDiv => {
        observer.observe(sectionDiv);
    });
    
    // --- NUEVA LÓGICA PARA EL ACORDEÓN DE PREGUNTAS FRECUENTES ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');

            // Cierra otros acordeones abiertos si quieres que solo uno esté abierto a la vez
            // Comenta este bloque si prefieres que varios puedan estar abiertos
            document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                if (openAnswer !== answer) {
                    openAnswer.classList.remove('open');
                    openAnswer.previousElementSibling.querySelector('.faq-icon').classList.remove('open');
                }
            });

            // Abre o cierra el actual
            answer.classList.toggle('open');
            icon.classList.toggle('open');
        });
    });


    // --- LÓGICA PARA INICIALIZAR EL CARRUSEL (SWIPER.JS) ---
    const swiper = new Swiper('.swiper-container', {
        // Cuántos slides se ven a la vez (responsive)
        slidesPerView: 1,
        spaceBetween: 20, // Espacio entre slides
        breakpoints: {
            // para pantallas mayores a 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // para pantallas mayores a 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },

        // Paginación (los puntos de abajo)
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navegación (las flechas)
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Para que se pueda arrastrar con el mouse
        mousewheel: true,
        keyboard: true,
    });
    
});