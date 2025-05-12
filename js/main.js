/**
 * Portfolio Website - Main JavaScript
 * A collection of functions to handle animations, interactions,
 * form validation, and responsive features.
 */

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileNav();
    initTypingEffect();
    initSkillBars();
    initProjectExpand();
    initFormValidation();
    initScrollReveal();
});

/**
 * Mobile Navigation Handler
 * Toggles the mobile navigation menu and hamburger icon
 */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle active class for both hamburger and nav links
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close the menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close the menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

/**
 * Typing Effect
 * Creates a typewriter effect for the heading on the home page
 */
function initTypingEffect() {
    const element = document.getElementById('typing');
    
    if (element) {
        const phrases = [
            'Android app developer',
            'Android recovery porter',
            'Android kernel developer',
            'Android ROM Porter'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Remove a character
                element.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Faster when deleting
            } else {
                // Add a character
                element.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; // Slower when typing
            }
            
            // Handle end of phrase (start deleting)
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 1500; // Pause at the end of phrase
            } 
            // Handle deletion complete (move to next phrase)
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before starting new phrase
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start the typing effect
        setTimeout(type, 1000);
    }
}

/**
 * Skill Progress Bars
 * Animates the skill progress bars on the about page
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Function to animate skill bars when they're in view
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            const position = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                bar.style.width = progress + '%';
            }
        });
    }
    
    // Run on initial load and on scroll
    if (skillBars.length > 0) {
        animateSkillBars();
        window.addEventListener('scroll', animateSkillBars);
    }
}

/**
 * Project Expand/Collapse
 * Handles the expand and collapse functionality for project details
 */
function initProjectExpand() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const expandedSection = document.getElementById(projectId);
            
            if (expandedSection) {
                expandedSection.style.display = 'block';
                // Add click event to close button
                expandedSection.querySelector('.close-expanded').addEventListener('click', function() {
                    expandedSection.style.display = 'none';
                });
            }
        });
    });
}

/**
 * Form Validation
 * Validates the contact form before submission and shows success message
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const resetFormButton = document.getElementById('reset-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            clearErrors();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Validate name (at least 2 characters)
            if (name.value.trim().length < 2) {
                showError('name-error', 'Please enter your name (at least 2 characters)');
                isValid = false;
            }
            
            // Validate email with regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject (at least 2 characters)
            if (subject.value.trim().length < 2) {
                showError('subject-error', 'Please enter a subject (at least 2 characters)');
                isValid = false;
            }
            
            // Validate message (at least 10 characters)
            if (message.value.trim().length < 10) {
                showError('message-error', 'Please enter a message (at least 10 characters)');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Clear form fields
                contactForm.reset();
            }
        });
        
        // Reset form on button click
        if (resetFormButton) {
            resetFormButton.addEventListener('click', function() {
                formSuccess.style.display = 'none';
                contactForm.style.display = 'grid';
            });
        }
    }
    
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }
}

/**
 * Scroll Reveal
 * Adds animation to elements as they scroll into view
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Run on initial load and on scroll
    if (revealElements.length > 0) {
        revealOnScroll();
        window.addEventListener('scroll', revealOnScroll);
    }
}

/**
 * Utility function to detect if user is on a mobile device
 * Used for optimizing certain animations
 */
function isMobileDevice() {
    return (window.innerWidth <= 768);
}

/**
 * Page transition effects
 * Adds subtle fade-in effect when navigating between pages
 */
window.addEventListener('pageshow', function(event) {
    // Fade in the page content on load
    document.body.classList.add('loaded');
});
