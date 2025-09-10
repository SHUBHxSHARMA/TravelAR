// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll-based animations
const cards = document.querySelectorAll('.card');
const aboutSection = document.querySelector('#about');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 1s ${entry.target.dataset.delay || '0s'} forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach((card, index) => {
    card.style.opacity = 0; // Hide cards initially
    card.dataset.delay = `${index * 0.2}s`;
    observer.observe(card);
});

if (aboutSection) {
    aboutSection.style.opacity = 0;
    observer.observe(aboutSection);
}

// Add a simple animation to the demo placeholder
const demoPlaceholder = document.querySelector('.demo-placeholder');
if (demoPlaceholder) {
    demoPlaceholder.style.opacity = 0;
    observer.observe(demoPlaceholder);
}

// Keyframes for animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(styleSheet);
