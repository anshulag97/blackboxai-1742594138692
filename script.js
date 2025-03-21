document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });
    
    menuClose.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });

    // Close mobile menu when clicking menu items
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });

    // Typing animation
    const typingElement = document.querySelector('.typing');
    const technologies = [
        'JavaScript',
        'React',
        'Node.js',
        'Python',
        'MongoDB',
        'AWS',
        'Docker'
    ];
    let techIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;

    function typeLoop() {
        const currentTech = technologies[techIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTech.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 100;
        } else {
            typingElement.textContent = currentTech.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }

        if (!isDeleting && charIndex === currentTech.length) {
            isDeleting = true;
            typingDelay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            techIndex = (techIndex + 1) % technologies.length;
            typingDelay = 500;
        }

        setTimeout(typeLoop, typingDelay);
    }

    setTimeout(typeLoop, 1000);

    // Form handling with validation and animations
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show success message with animation
                contactForm.innerHTML = `
                    <div class="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg relative text-center transform transition-all duration-500 animate-fade-in">
                        <p class="text-lg font-medium mb-2">Thank you for your message!</p>
                        <p class="text-sm">I'll get back to you soon.</p>
                    </div>
                `;
            }
        });
    }

    function validateForm(data) {
        let isValid = true;
        const errors = {};

        if (!data.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!data.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!data.message.trim()) {
            errors.message = 'Message is required';
            isValid = false;
        }

        // Show errors if any
        Object.keys(errors).forEach(field => {
            const input = document.getElementById(field);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'text-red-500 text-sm mt-1 animate-fade-in';
            errorDiv.textContent = errors[field];
            input.classList.add('border-red-500');
            
            // Remove existing error message if any
            const existingError = input.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            input.parentNode.appendChild(errorDiv);
        });

        return isValid;
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
        observer.observe(el);
    });
});