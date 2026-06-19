// SMOOTH SCROLL
const links = document.querySelectorAll('.animate-link');
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu on link click
        const nav = document.getElementById("nav");
        const menuBtn = document.querySelector(".menu");
        if (nav.classList.contains("is-open")) {
            nav.classList.remove("is-open");
            if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
        }
    });
});

// MOBILE MENU
function toggle() {
    const nav = document.getElementById("nav");
    const menuBtn = document.querySelector(".menu");
    nav.classList.toggle("is-open");
    const isOpen = nav.classList.contains("is-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

// Close menu on Escape key
document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        const nav = document.getElementById("nav");
        const menuBtn = document.querySelector(".menu");
        if (nav.classList.contains("is-open")) {
            nav.classList.remove("is-open");
            if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
            if (menuBtn) menuBtn.focus();
        }
    }
});

// ENTRANCE ANIMATIONS
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('section, .book, .review, .award').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
    observer.observe(el);
});

// MOUSE FOLLOW GLOW (only on devices that support hover)
if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth * 100;
        const y = e.clientY / window.innerHeight * 100;
        document.body.style.setProperty('--mouse-x', `${x}%`);
        document.body.style.setProperty('--mouse-y', `${y}%`);
    });
}
