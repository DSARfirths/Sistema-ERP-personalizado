document.addEventListener('DOMContentLoaded', () => {

    /**
     * Handles the mobile navigation menu toggle.
     * Toggles the 'hidden' class on the mobile menu when the menu button is clicked.
     * Closes the mobile menu when any link inside it is clicked.
     */
    function setupMobileMenu() {
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close mobile menu when a link is clicked
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    }

    /**
     * Sets up scroll-triggered animations for elements.
     * Adds a 'fade-in' class to elements when they become visible in the viewport.
     */
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    // Optionally, unobserve after animation if it's a one-time effect
                    // observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

        document.querySelectorAll('section > div').forEach(sectionDiv => {
            observer.observe(sectionDiv);
        });
    }

    /**
     * Manages the active state of navigation links based on visible sections.
     * Highlights the corresponding navigation link when a section enters a specific viewport area.
     */
    function setupActiveNavLinkHighlighting() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('header .nav-link');

        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px 0px -60% 0px', // Section is considered active when its top is within the top 40% of the viewport
            threshold: 0 // Trigger as soon as any part of the target enters the root
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            let currentActiveId = null;

            // Find the first section (from top to bottom) that is currently intersecting
            // with the defined rootMargin. This ensures that as you scroll down,
            // the highest visible section's link gets highlighted.
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    currentActiveId = entry.target.getAttribute('id');
                    break; // Found the first intersecting section, stop searching
                }
            }

            // Update active class on navigation links
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (currentActiveId && href === `#${currentActiveId}`) {
                    link.classList.add('active');
                }
            });

        }, observerOptions);

        // Observe each section
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    /**
     * Handles the 'Back to Top' button visibility and functionality.
     * Shows the button when scrolled down, hides it when at the top.
     * Scrolls smoothly to the top of the page when clicked.
     */
    function setupBackToTopButton() {
        const backToTopButton = document.getElementById('back-to-top');

        if (backToTopButton) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) { // Show button after scrolling 300px
                    backToTopButton.classList.remove('opacity-0');
                } else {
                    backToTopButton.classList.add('opacity-0');
                }
            });

            // Scroll to top on click
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Initialize all functionalities
    setupMobileMenu();
    setupScrollAnimations();
    setupActiveNavLinkHighlighting();
    setupBackToTopButton();
});