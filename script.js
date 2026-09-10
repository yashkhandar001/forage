document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Screen 
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('loading-screen');
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            revealElements.forEach(el => revealOnScroll.observe(el));
        }, 2000); 
    });

    // 2. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // 4. Smooth Scrolling
    document.getElementById('explore-btn').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('roles').scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Mobile Nav Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.className = mobileNav.classList.contains('active') ? 'ph ph-x' : 'ph ph-list';
            }
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                if (mobileBtn.querySelector('i')) mobileBtn.querySelector('i').className = 'ph ph-list';
            });
        });
    }

    // 5. Modal Logic & Role Switching
    const modal = document.getElementById('login-modal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const loginForm = document.getElementById('loginForm');
    const roleInput = document.getElementById('selectedRoleInput');
    const loginEmail = document.getElementById('loginEmail');
    const modalRoleCards = document.querySelectorAll('.modal-role-card');

    const roleConfigs = {
        'Farmer': {
            title: 'Enter as Farmer (Producer)',
            email: 'farmer.demo@forage.ag',
            url: 'farmer.html'
        },
        'Shopkeeper': {
            title: 'Enter as Shopkeeper (Middleman)',
            email: 'shopkeeper.demo@forage.ag',
            url: 'shopkeeper.html'
        },
        'Customer': {
            title: 'Enter as End Customer (Kitchen)',
            email: 'kitchen.demo@forage.ag',
            url: 'customer.html'
        },
        'General': {
            title: 'Access Forage Portals',
            email: 'farmer.demo@forage.ag',
            url: 'farmer.html'
        }
    };

    function setModalRole(role) {
        const config = roleConfigs[role] || roleConfigs['Farmer'];
        if (roleInput) roleInput.value = role === 'General' ? 'Farmer' : role;
        if (modalTitle) modalTitle.textContent = config.title;
        if (loginEmail) loginEmail.value = config.email;

        modalRoleCards.forEach(card => {
            const cardRole = card.getAttribute('data-target-role');
            if (cardRole === (role === 'General' ? 'Farmer' : role)) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    modalRoleCards.forEach(card => {
        card.addEventListener('click', () => {
            const role = card.getAttribute('data-target-role');
            setModalRole(role);
        });
    });

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const role = btn.getAttribute('data-role') || 'General';
            setModalRole(role);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    // 6. Password Toggle
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password-input');

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = togglePasswordBtn.querySelector('i');
            if (icon) icon.className = type === 'text' ? 'ph ph-eye-slash' : 'ph ph-eye';
        });
    }

    // 7. Toast Simulator
    const toast = document.getElementById('toast');
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedRole = roleInput ? roleInput.value : 'Farmer';
            const targetUrl = roleConfigs[selectedRole] ? roleConfigs[selectedRole].url : 'farmer.html';
            showToast(`Authenticating as ${selectedRole}... Redirecting to portal`);
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    }
});
