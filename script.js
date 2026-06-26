// PAGE NAVIGATION
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const header = document.querySelector('header');

let isTransitioning = false;

function showPage(pageId) {
    if (isTransitioning) return;
    const target = document.getElementById('page-' + pageId);
    if (!target || target.classList.contains('active')) return;

    isTransitioning = true;
    const current = document.querySelector('.page.active');

    if (current) {
        current.classList.remove('active');
        current.classList.add('leaving');
    }

    void target.offsetWidth;
    target.classList.add('active');

    setTimeout(() => {
        if (current) current.classList.remove('leaving');
        isTransitioning = false;
    }, 500);

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    hideBackToTop();
}

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page) {
            showPage(page);
            closeMobileMenu();
        }
    });
});

document.querySelector('.logo-link')?.addEventListener('click', e => {
    e.preventDefault();
    showPage('home');
    closeMobileMenu();
});

function closeMobileMenu() {
    const nav = document.getElementById('nav');
    const menuBtn = document.querySelector('.menu');
    if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        menuBtn.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// SCROLL-BASED NAVBAR STYLING + BACK TO TOP
const backToTop = document.getElementById('backToTop');

function hideBackToTop() {
    backToTop?.classList.remove('visible');
}

function updateScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
    if (backToTop) {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    }
}

window.addEventListener('scroll', updateScroll, { passive: true });
window.addEventListener('load', updateScroll);

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// MOBILE MENU TOGGLE
function toggle() {
    const nav = document.getElementById('nav');
    const menuBtn = document.querySelector('.menu');
    nav.classList.toggle('is-open');
    menuBtn.classList.toggle('is-open');
    const isOpen = nav.classList.contains('is-open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const nav = document.getElementById('nav');
        const menuBtn = document.querySelector('.menu');
        if (nav.classList.contains('is-open')) {
            nav.classList.remove('is-open');
            menuBtn.classList.remove('is-open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.focus();
            document.body.style.overflow = '';
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// COPY EMAIL
function copyEmail() {
    const email = document.getElementById('emailAddr').textContent;
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.querySelector('.copy-btn');
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 2000);
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    });
}

// ROTATING QUOTES
const quotes = [
    'Dark psychological fiction designed for readers who prefer tension over resolution.',
    'Exploring the shadows of 1930s America — one untold story at a time.',
    'Where history meets the human heart in all its complexity.',
    'Every character has a secret. Every secret has a cost.',
    'For readers who believe the best stories live in the grey areas.'
];

const quoteEl = document.getElementById('rotatingQuote');
if (quoteEl) {
    let quoteIndex = 0;
    quoteEl.textContent = quotes[0];

    setInterval(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteEl.classList.add('fade');
        setTimeout(() => {
            quoteEl.textContent = quotes[quoteIndex];
            quoteEl.classList.remove('fade');
        }, 600);
    }, 5000);
}
