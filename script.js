document.addEventListener('DOMContentLoaded', function() {
    // --- Navigation Menu Toggle (for smaller screens) ---
    const nav = document.querySelector('nav');
    const navList = nav ? nav.querySelector('ul') : null;
    const header = document.querySelector('header');

    if (header && navList) {
        header.addEventListener('click', function(event) {
            // Simple toggle - clicking anywhere in the header will toggle nav (for demo)
            // In a real scenario, you'd likely have a specific button.
            navList.classList.toggle('responsive');
        });
    }

    // --- Basic Form Validation (Contact Page) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');
        const successMessage = document.getElementById('success-message');

        contactForm.addEventListener('submit', function(event) {
            let isValid = true;

            // Validate Name
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Please enter your name.';
                isValid = false;
            } else {
                nameError.textContent = '';
            }

            // Validate Email
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Please enter your email address.';
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Please enter your message.';
                isValid = false;
            } else {
                messageError.textContent = '';
            }

            if (!isValid) {
                event.preventDefault(); // Prevent form submission if there are errors
            } else {
                // Simulate successful submission (in a real application, you would send data to a server)
                event.preventDefault();
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
            }
        });

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // --- Simple Image Carousel (Example for Home or Blog Page - Adapt as needed) ---
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.prev-slide');
        const nextButton = carousel.querySelector('.next-slide');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.style.display = 'none');
            slides[index].style.display = 'block';
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        if (slides.length > 0) {
            showSlide(currentIndex); // Show the first slide initially
            if (prevButton && nextButton) {
                nextButton.addEventListener('click', nextSlide);
                prevButton.addEventListener('click', prevSlide);
            } else if (slides.length > 1) {
                // Basic auto-advance if no buttons are present (for simple demos)
                setInterval(nextSlide, 3000);
            }
        }
    });

    // --- Add more interactivity as needed for your specific features ---
    // For example:
    // - Filtering functionality on the Blog page based on categories/tags
    // - Dynamic content loading
    // - Animations on scroll or hover
});

// --- Helper function for debouncing events (for performance on resize etc.) ---
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// --- Responsive Navigation (Alternative using window resize) ---
function handleResponsiveNavigation() {
    const nav = document.querySelector('nav');
    const navList = nav ? nav.querySelector('ul') : null;
    const header = document.querySelector('header');

    if (navList) {
        if (window.innerWidth <= 768) {
            navList.classList.remove('responsive'); // Ensure it's collapsed by default on small screens (if toggled)
            // You might want to add a specific button to toggle on small screens instead of header click
            if (header) {
                // Example: Add a class to the header to indicate small screen
                header.classList.add('small-screen-nav');
                // You'd then style the header to show a toggle button in CSS
            }
        } else {
            navList.classList.remove('responsive'); // Ensure it's not collapsed on larger screens
            if (header) {
                header.classList.remove('small-screen-nav');
            }
        }
    }
}

// Call on initial load and resize
window.addEventListener('load', handleResponsiveNavigation);
window.addEventListener('resize', debounce(handleResponsiveNavigation, 100));
