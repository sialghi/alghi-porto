// =============================================
// DARK MODE TOGGLE
// =============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
});

// =============================================
// NAVBAR SHADOW ON SCROLL
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 1px 12px rgba(15,23,42,0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}, { passive: true });

// =============================================
// FADE-IN ON SCROLL
// =============================================
const faders = document.querySelectorAll('.fade-in');

const appearObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

faders.forEach(el => appearObserver.observe(el));

// Hero fades in immediately on load
window.addEventListener('load', () => {
    const hero = document.getElementById('hero');
    if (hero) hero.classList.add('appear');
});

// =============================================
// MODAL LOGIC
// =============================================
const openBtns = document.querySelectorAll('.open-modal-btn');
const closeBtns = document.querySelectorAll('.close-btn');

const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => modal.classList.add('show'));
    });
    document.body.style.overflow = 'hidden';
};

const closeModal = (modal) => {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 280);
    document.body.style.overflow = '';
};

openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        openModal(btn.getAttribute('data-modal'));
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        closeModal(e.target.closest('.modal'));
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Close modal with ESC key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const visibleModal = document.querySelector('.modal.show');
        if (visibleModal) closeModal(visibleModal);
    }
});

// =============================================
// PROJECT FILTERING
// =============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hide');
            } else {
                if (card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            }
        });
    });
});