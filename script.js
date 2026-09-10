document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar Effect
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

    // 2. Smooth Scrolling for Internal Hash Links
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

    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const rolesSection = document.getElementById('roles');
            if (rolesSection) rolesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 3. Mobile Nav Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = '#ffffff';
            navLinks.style.padding = '1.5rem 2rem';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.06)';
            navLinks.style.borderBottom = '1px solid #e2e8f0';
        });
    }

    // 4. Modal Logic & Role Switching
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
            title: 'Enter Farmer Portal (Producer)',
            email: 'farmer.demo@forage.ag',
            url: 'farmer.html'
        },
        'Shopkeeper': {
            title: 'Enter Shopkeeper Hub (Wholesale)',
            email: 'shopkeeper.demo@forage.ag',
            url: 'shopkeeper.html'
        },
        'Customer': {
            title: 'Enter Consumer Kitchen (Pantry)',
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
        const target = role === 'General' ? 'Farmer' : role;
        const config = roleConfigs[target] || roleConfigs['Farmer'];
        if (roleInput) roleInput.value = target;
        if (modalTitle) modalTitle.textContent = config.title;
        if (loginEmail) loginEmail.value = config.email;

        modalRoleCards.forEach(card => {
            const cardRole = card.getAttribute('data-target-role');
            if (cardRole === target) {
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
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => { 
            if (e.target === modal) closeModal(); 
        });
    }

    // 5. Password Toggle
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

    // 6. Toast Notification
    const toast = document.getElementById('toast');
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // 7. Login Submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedRole = roleInput ? roleInput.value : 'Farmer';
            const targetUrl = roleConfigs[selectedRole] ? roleConfigs[selectedRole].url : 'farmer.html';
            showToast(`Entering ${selectedRole} Portal...`);
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 400);
        });
    }
});