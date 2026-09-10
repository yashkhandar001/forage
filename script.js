document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Loading Screen Transition
    const loader = document.getElementById('loading-screen');
    function dismissLoader() {
        if (!loader) return;
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            if (typeof revealElements !== 'undefined') {
                revealElements.forEach(el => revealOnScroll.observe(el));
            }
        }, 600);
    }

    if (document.readyState === 'complete') {
        setTimeout(dismissLoader, 800);
    } else {
        window.addEventListener('load', () => setTimeout(dismissLoader, 800));
        setTimeout(dismissLoader, 2000); // Safety fallback
    }

    // 2. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.08, rootMargin: "0px 0px -40px 0px" };
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    revealElements.forEach(el => revealOnScroll.observe(el));

    // 4. Smooth Scrolling
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const rolesSection = document.getElementById('roles');
            if (rolesSection) {
                rolesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Modal Logic & Role Redirection
    const modal = document.getElementById('login-modal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const loginForm = document.getElementById('loginForm');
    let activeRole = 'General';

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            activeRole = btn.getAttribute('data-role') || 'General';
            if (modalTitle) {
                if (activeRole === 'General') {
                    modalTitle.textContent = 'Welcome to Forage';
                } else {
                    modalTitle.textContent = 'Access ' + activeRole + ' Portal';
                }
            }
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModal = () => {
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // 6. Password Toggle
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password-input');

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = togglePasswordBtn.querySelector('i');
            if (icon) {
                icon.className = type === 'text' ? 'ph ph-eye-slash' : 'ph ph-eye';
            }
        });
    }

    // 7. Toast Notification System
    const toast = document.getElementById('toast');
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3200);
    }

    // Form Submit handling with smart routing
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal();
            if (activeRole === 'Farmer') {
                showToast('Welcome Farmer! Launching Command Center...');
                setTimeout(() => { window.location.href = 'farmer.html'; }, 600);
            } else if (activeRole === 'Shopkeeper') {
                showToast('Welcome Merchant! Launching B2B Hub...');
                setTimeout(() => { window.location.href = 'shopkeeper.html'; }, 600);
            } else if (activeRole === 'Customer') {
                showToast('Welcome Foodie! Launching Smart Pantry...');
                setTimeout(() => { window.location.href = 'customer.html'; }, 600);
            } else {
                showToast('Authentication verified! Select any portal to begin.');
            }
            loginForm.reset();
        });
    }

    // 8. Interactive Marketplace Search
    const searchInput = document.querySelector('.search-bar input');
    const cropCards = document.querySelectorAll('.crop-card');
    if (searchInput && cropCards.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            cropCards.forEach(card => {
                const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
                card.style.display = title.includes(query) ? 'block' : 'none';
            });
        });
    }
});
