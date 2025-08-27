document.addEventListener('DOMContentLoaded', () => {

    // Lógica del menú móvil
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
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
    
    // Lógica para resaltar enlace activo en el menú
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header .nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60% 0px', // Activa cuando la sección está en el 40% superior de la pantalla
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        let activeId = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                 if(!activeId){ // Solo toma el primero que intersecta desde arriba
                    activeId = entry.target.getAttribute('id');
                 }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            }
        });

    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Lógica para botón 'Volver Arriba'
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('opacity-0');
            } else {
                backToTopButton.classList.add('opacity-0');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});