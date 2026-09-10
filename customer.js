
const API_BASE = 'http://localhost:3000/api';

async function syncCustomerDataWithBackend() {
    try {
        const res = await fetch(`${API_BASE}/pantry`);
        if (res.ok) {
            const pantryData = await res.json();
            if (pantryData && pantryData.length > 0) {
                pantryInventory = pantryData.map((item, idx) => ({
                    id: item.record_id || item.id || ('PANTRY-' + (idx + 1).toString().padStart(3, '0')),
                    ingredient: item.ingredient || item.name,
                    category: item.storage_condition || item.category || 'Produce',
                    quantity: Number(item.quantity || 1),
                    unit: item.unit || 'kg',
                    storageCondition: item.storage_condition || item.storageCondition || 'Cool/Dry',
                    expectedShelfLifeDays: Number(item.expected_shelf_life_days || item.expectedShelfLifeDays || 10),
                    remainingDays: Number(item.remaining_shelf_life_days !== undefined ? item.remaining_shelf_life_days : (item.remainingDays || 5)),
                    farmOrigin: item.farmOrigin || 'Nashik Organic Direct Harvest',
                    bannerClass: (item.ingredient || '').toLowerCase().includes('tomato') ? 'tomato' : 
                                 ((item.ingredient || '').toLowerCase().includes('onion') ? 'onion' : 'spinach')
                }));
                if (typeof renderAllViews === 'function') renderAllViews();
                console.log('✅ Customer Pantry synced with MongoDB / Express API');
            }
        }
    } catch (e) {
        console.log('ℹ️ Customer Hub in standalone mode');
    }
}

/**
 * FORAGE CONSUMER KITCHEN & SMART PANTRY
 * Frontend Architecture & Mock Data Store
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * The data arrays below match MongoDB document schemas.
 * To connect to Express / MongoDB, simply swap these arrays
 * with `await fetch('/api/v1/pantry')` calls.
 */

// ==========================================================
// 1. MOCK DATA ARRAYS (TOP OF FILE AS REQUIRED)
// ==========================================================

let pantryInventory = [
    {
        id: 'PANTRY-001',
        ingredient: 'Fresh Roma Tomatoes',
        category: 'Vegetables',
        quantity: 1.5,
        unit: 'kg',
        storageCondition: 'Refrigerated',
        expectedShelfLifeDays: 14,
        remainingDays: 2, // CRITICAL < 3
        farmOrigin: 'Nashik, MH (Ramesh Patil Farm)',
        bannerClass: 'tomato'
    },
    {
        id: 'PANTRY-002',
        ingredient: 'Baby Spinach',
        category: 'Vegetables',
        quantity: 0.5,
        unit: 'kg',
        storageCondition: 'Refrigerated',
        expectedShelfLifeDays: 7,
        remainingDays: 1, // CRITICAL < 3
        farmOrigin: 'Pune, MH (Vinayak Hydroponics)',
        bannerClass: 'spinach'
    },
    {
        id: 'PANTRY-003',
        ingredient: 'Nashik Red Onions',
        category: 'Vegetables',
        quantity: 2.0,
        unit: 'kg',
        storageCondition: 'Cool/Dry',
        expectedShelfLifeDays: 30,
        remainingDays: 5, // WARNING 3-7
        farmOrigin: 'Nashik, MH (Dnyaneshwar Shinde)',
        bannerClass: 'onion'
    },
    {
        id: 'PANTRY-004',
        ingredient: 'Crunchy Carrots',
        category: 'Vegetables',
        quantity: 1.0,
        unit: 'kg',
        storageCondition: 'Refrigerated',
        expectedShelfLifeDays: 21,
        remainingDays: 9, // GREEN > 7
        farmOrigin: 'Ahmedabad, GJ (Suresh Patel)',
        bannerClass: 'carrot'
    },
    {
        id: 'PANTRY-005',
        ingredient: 'Kufri Potatoes',
        category: 'Vegetables',
        quantity: 3.0,
        unit: 'kg',
        storageCondition: 'Cool/Dry',
        expectedShelfLifeDays: 45,
        remainingDays: 24, // GREEN > 7
        farmOrigin: 'Pune, MH (Mahesh Gaikwad)',
        bannerClass: 'potato'
    },
    {
        id: 'PANTRY-006',
        ingredient: 'Organic Toor Lentils',
        category: 'Grains',
        quantity: 1.5,
        unit: 'kg',
        storageCondition: 'Dry',
        expectedShelfLifeDays: 180,
        remainingDays: 140, // GREEN > 7
        farmOrigin: 'Pune, MH (Balwant Verma)',
        bannerClass: 'wheat'
    },
    {
        id: 'PANTRY-007',
        ingredient: 'Basmati Long Rice',
        category: 'Grains',
        quantity: 2.5,
        unit: 'kg',
        storageCondition: 'Dry',
        expectedShelfLifeDays: 200,
        remainingDays: 165, // GREEN > 7
        farmOrigin: 'Punjab (Harpreet Gill)',
        bannerClass: 'wheat'
    },
    {
        id: 'PANTRY-008',
        ingredient: 'Royal Himachal Apples',
        category: 'Fruits',
        quantity: 1.2,
        unit: 'kg',
        storageCondition: 'Refrigerated',
        expectedShelfLifeDays: 18,
        remainingDays: 11, // GREEN > 7
        farmOrigin: 'Himachal (Devinder Thakur)',
        bannerClass: 'fruit'
    }
];

let marketProducts = [
    {
        id: 'PROD-001',
        title: 'Vine-Ripened Roma Tomatoes',
        category: 'Vegetables',
        pricePerKg: 45.00,
        farmGatePrice: 27.45,
        unit: 'kg',
        farmOrigin: 'Nashik, Maharashtra',
        farmerName: 'Ramesh Patil',
        harvestDate: 'Yesterday',
        storageCondition: 'Refrigerated',
        defaultShelfLife: 14,
        bannerClass: 'tomato'
    },
    {
        id: 'PROD-002',
        title: 'Nashik Red Piquant Onions',
        category: 'Vegetables',
        pricePerKg: 44.00,
        farmGatePrice: 31.01,
        unit: 'kg',
        farmOrigin: 'Nashik, Maharashtra',
        farmerName: 'Dnyaneshwar Shinde',
        harvestDate: '2 days ago',
        storageCondition: 'Cool/Dry',
        defaultShelfLife: 30,
        bannerClass: 'onion'
    },
    {
        id: 'PROD-003',
        title: 'Baby Leaf Hydroponic Spinach',
        category: 'Vegetables',
        pricePerKg: 65.00,
        farmGatePrice: 35.00,
        unit: 'kg',
        farmOrigin: 'Pune, Maharashtra',
        farmerName: 'Vinayak Jadhav',
        harvestDate: 'Today morning',
        storageCondition: 'Refrigerated',
        defaultShelfLife: 7,
        bannerClass: 'spinach'
    },
    {
        id: 'PROD-004',
        title: 'Organic Sweet Carrots',
        category: 'Vegetables',
        pricePerKg: 68.00,
        farmGatePrice: 41.94,
        unit: 'kg',
        farmOrigin: 'Ahmedabad, Gujarat',
        farmerName: 'Suresh Patel',
        harvestDate: '2 days ago',
        storageCondition: 'Refrigerated',
        defaultShelfLife: 21,
        bannerClass: 'carrot'
    },
    {
        id: 'PROD-005',
        title: 'Cleaned Kufri Jyoti Potatoes',
        category: 'Vegetables',
        pricePerKg: 37.00,
        farmGatePrice: 24.55,
        unit: 'kg',
        farmOrigin: 'Pune, Maharashtra',
        farmerName: 'Mahesh Gaikwad',
        harvestDate: '3 days ago',
        storageCondition: 'Cool/Dry',
        defaultShelfLife: 45,
        bannerClass: 'potato'
    },
    {
        id: 'PROD-006',
        title: 'Bhagwa Export Pomegranates',
        category: 'Fruits',
        pricePerKg: 160.00,
        farmGatePrice: 95.00,
        unit: 'kg',
        farmOrigin: 'Bengaluru, Karnataka',
        farmerName: 'Sunil Rao',
        harvestDate: '3 days ago',
        storageCondition: 'Refrigerated',
        defaultShelfLife: 20,
        bannerClass: 'fruit'
    },
    {
        id: 'PROD-007',
        title: 'Sharbati Whole Wheat Atta',
        category: 'Grains',
        pricePerKg: 54.00,
        farmGatePrice: 38.50,
        unit: 'kg',
        farmOrigin: 'Ludhiana, Punjab',
        farmerName: 'Gurpreet Singh',
        harvestDate: 'Freshly Milled',
        storageCondition: 'Dry',
        defaultShelfLife: 120,
        bannerClass: 'wheat'
    },
    {
        id: 'PROD-008',
        title: 'Unpolished Desi Toor Dal',
        category: 'Grains',
        pricePerKg: 155.00,
        farmGatePrice: 108.00,
        unit: 'kg',
        farmOrigin: 'Pune, Maharashtra',
        farmerName: 'Balwant Verma',
        harvestDate: 'Harvest Season',
        storageCondition: 'Dry',
        defaultShelfLife: 180,
        bannerClass: 'wheat'
    }
];

let purchaseHistory = [
    {
        orderNo: 'ORD-RET-9411',
        items: 'Fresh Roma Tomatoes (1.5 kg), Baby Spinach (0.5 kg)',
        origin: 'Nashik & Pune, MH',
        farmer: 'Ramesh Patil & Vinayak Jadhav',
        harvestDate: '08 Sept 2026',
        amount: 100.00,
        certificate: 'MH-AG-2026-9921 (Pesticide residue tested < 0.01 mg/kg)'
    },
    {
        orderNo: 'ORD-RET-9390',
        items: 'Nashik Red Onions (2 kg), Kufri Potatoes (3 kg)',
        origin: 'Nashik & Pune, MH',
        farmer: 'Dnyaneshwar Shinde & Mahesh Gaikwad',
        harvestDate: '05 Sept 2026',
        amount: 199.00,
        certificate: 'MH-AG-2026-8814 (Geo-tagged harvest verified)'
    },
    {
        orderNo: 'ORD-RET-9350',
        items: 'Crunchy Carrots (1 kg), Royal Apples (1.2 kg)',
        origin: 'Ahmedabad & Himachal',
        farmer: 'Suresh Patel & Devinder Thakur',
        harvestDate: '02 Sept 2026',
        amount: 242.00,
        certificate: 'GJ-AG-2026-7731 (Cold-chain sensor verified)'
    }
];

// Rich, exotic zero-waste recipes database
const recipeDatabase = [
    {
        id: 'RECIPE-001',
        title: 'Charred Tomato & Wilted Spinach Shakshuka with Cumin Butter',
        origin: 'North African / Levantine Fusion',
        description: 'A deeply comforting, aromatic skillet simmer of sweet Roma tomatoes simmered down with garlic, cumin, and baby spinach ribbons.',
        targetedIngredients: ['Fresh Roma Tomatoes', 'Baby Spinach'],
        prepTime: '20 mins',
        difficulty: 'Easy',
        servings: '2-3 people',
        zeroWasteNote: 'Saves 2.0 kg of perishable greens & tomatoes from spoilage.',
        ingredientsNeeded: [
            { name: 'Fresh Roma Tomatoes', amount: '1 kg', fromPantry: true },
            { name: 'Baby Spinach', amount: '0.4 kg', fromPantry: true },
            { name: 'Nashik Red Onions', amount: '1 medium', fromPantry: true },
            { name: 'Eggs or Spiced Paneer', amount: '2-3 pcs', fromPantry: false },
            { name: 'Garlic & Cumin powder', amount: 'Pinch', fromPantry: false }
        ],
        steps: [
            'Coarsely dice the ripe Roma tomatoes and slice the red onions into thin half-moons.',
            'Heat olive oil or ghee in a heavy skillet. Sauté onions until translucent, then add crushed garlic, cumin, and red chili flakes.',
            'Toss in the diced tomatoes and simmer gently for 8-10 minutes until they break down into a luscious, jammy sauce.',
            'Fold in the baby spinach leaves in the last 2 minutes until just gently wilted and bright emerald.',
            'Make small wells in the sauce, crack in eggs (or nestle grilled paneer slices), cover and let gently set. Garnish with fresh herbs.'
        ]
    },
    {
        id: 'RECIPE-002',
        title: 'Crispy Spiced Potato & Caramelized Onion Bhaji with Tomato Chutney',
        origin: 'Maharashtrian Coastal Heritage',
        description: 'Golden, crackling potato rounds gently tossed with sweet caramelized onions, tempered mustard seeds, and freshly crushed spices.',
        targetedIngredients: ['Nashik Red Onions', 'Fresh Roma Tomatoes', 'Kufri Potatoes'],
        prepTime: '25 mins',
        difficulty: 'Easy',
        servings: '3-4 people',
        zeroWasteNote: 'Utilizes mature onions and soft tomatoes for maximum caramel sweetness.',
        ingredientsNeeded: [
            { name: 'Nashik Red Onions', amount: '1.0 kg', fromPantry: true },
            { name: 'Kufri Potatoes', amount: '1.0 kg', fromPantry: true },
            { name: 'Fresh Roma Tomatoes', amount: '0.5 kg', fromPantry: true },
            { name: 'Mustard seeds & Curry leaves', amount: 'To temper', fromPantry: false },
            { name: 'Turmeric & Green chilies', amount: 'To taste', fromPantry: false }
        ],
        steps: [
            'Boil the Kufri potatoes with their skin on until just fork-tender, peel and cube into bite-sized morsels.',
            'Slice the Nashik red onions thinly. In a skillet, slowly caramelize the onions over medium heat until sweet and amber brown.',
            'Temper mustard seeds, curry leaves, and green chilies, then toss in the cubed potatoes and ground turmeric.',
            'Pan-fry until the potato edges turn golden and delightfully crisp.',
            'Blend the remaining soft tomatoes with garlic, salt, and cumin into a fresh, piquant raw chutney to serve alongside!'
        ]
    },
    {
        id: 'RECIPE-003',
        title: 'Silky Creamed Spinach & Herb-Infused Basmati Pulao',
        origin: 'Persian-Mughlai Herbaceous Pilaf',
        description: 'Fragrant, steam-cooked aged basmati rice layered with a velvety emerald puree of wilted baby spinach and toasted spices.',
        targetedIngredients: ['Baby Spinach', 'Basmati Long Rice'],
        prepTime: '30 mins',
        difficulty: 'Medium',
        servings: '4 people',
        zeroWasteNote: 'Rescues vulnerable spinach leaves and pairs with dry pantry rice.',
        ingredientsNeeded: [
            { name: 'Baby Spinach', amount: '0.5 kg', fromPantry: true },
            { name: 'Basmati Long Rice', amount: '1.0 kg', fromPantry: true },
            { name: 'Nashik Red Onions', amount: '1 large', fromPantry: true },
            { name: 'Cardamom, Cloves & Cinnamon', amount: 'Whole spices', fromPantry: false },
            { name: 'Ghee or Olive Oil', amount: '2 tbsp', fromPantry: false }
        ],
        steps: [
            'Rinse and blanch the baby spinach for 60 seconds in boiling water, then plunge into cold water to lock in the vibrant green hue.',
            'Puree the blanched spinach with a clove of garlic and a pinch of roasted cumin.',
            'Rinse the aged basmati rice and drain well.',
            'In a deep pot, heat ghee and sizzle whole cardamom, cloves, and bay leaf. Sauté sliced onions until golden.',
            'Stir in the rice and warm water, cook until 80% done, then gently fold through the silky spinach puree and steam under a tight lid for 6 minutes.'
        ]
    },
    {
        id: 'RECIPE-004',
        title: 'Slow-Glazed Caramelized Carrots & Lentil Dal with Crispy Garlic',
        origin: 'Nordic-Indian Modern Culinary',
        description: 'Sweet, earthy roasted carrots glazed with raw honey and served over a bed of slow-simmered creamy Toor lentils.',
        targetedIngredients: ['Crunchy Carrots', 'Organic Toor Lentils'],
        prepTime: '35 mins',
        difficulty: 'Easy',
        servings: '4 people',
        zeroWasteNote: 'Turns root vegetables into an elegant centerpiece.',
        ingredientsNeeded: [
            { name: 'Crunchy Carrots', amount: '0.8 kg', fromPantry: true },
            { name: 'Organic Toor Lentils', amount: '0.5 kg', fromPantry: true },
            { name: 'Nashik Red Onions', amount: '1 small', fromPantry: true },
            { name: 'Honey or Jaggery', amount: '1 tbsp', fromPantry: false },
            { name: 'Coriander seeds & Garlic', amount: 'Crushed', fromPantry: false }
        ],
        steps: [
            'Wash and pressure-cook the organic Toor lentils with turmeric, salt, and water until creamy and smooth.',
            'Slice the carrots into long diagonal batons. Toss with olive oil, crushed coriander seeds, and a drizzle of honey.',
            'Roast in a hot oven or heavy pan until the carrots are deeply caramelized and tender.',
            'Prepare a fragrant garlic-onion tarka in ghee and stir it into the warm lentil dal.',
            'Ladle the comforting dal into wide bowls and crown with the roasted glazed carrots.'
        ]
    }
];


// ==========================================================
// 2. INITIALIZATION & STATE
// ==========================================================

let currentStorageFilter = 'all';
let currentMarketCategory = 'all';
let activeGeneratedRecipe = null;

document.addEventListener('DOMContentLoaded', () => {
    syncCustomerDataWithBackend();
    initNavigationTabs();
    initMobileSidebar();
    initStorageFilters();
    initMarketCategoryFilters();
    initSearch();
    initChefButtons();
    initCookModal();

    // Initial render
    renderAllViews();
});

function renderAllViews() {
    renderPantryGrid();
    renderExpiryTable();
    renderStorefrontGrid();
    renderPurchaseHistory();
    updatePantryStats();
    updateChefTargetChips();
}


// ==========================================================
// 3. SPA NAVIGATION
// ==========================================================

function initNavigationTabs() {
    document.querySelectorAll('.sidebar-nav .nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            switchTab(target);
        });
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.sidebar-nav .nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.spa-tab').forEach(sec => sec.classList.remove('active'));

    const activeSec = document.getElementById(`tab-${tabId}`);
    if (activeSec) {
        activeSec.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const titleMap = {
        'pantry': { title: 'My Pantry & Kitchen Inventory', sub: 'Track shelf-life countdowns, prevent kitchen spoilage & cook intelligent zero-waste recipes.' },
        'recipe-generator': { title: 'Forage Zero-Waste AI Recipe Chef', sub: 'Generate gourmet meals specifically tailored to rescue the ingredients closest to expiry in your kitchen.' },
        'expiry-alerts': { title: 'Kitchen Expiry Radar & Spoilage Prevention', sub: 'Calculated countdowns and storage guidelines to ensure zero food is wasted in your household.' },
        'storefront': { title: 'Direct Farm Produce Storefront', sub: 'Browse freshly harvested produce direct from local farmers with verified provenance certificates.' },
        'history': { title: 'Farm Purchase History & Traceability', sub: 'Verify farm provenance certificates and digital harvest logs for your household produce.' }
    };

    if (titleMap[tabId]) {
        document.getElementById('pageTitle').textContent = titleMap[tabId].title;
        document.getElementById('pageSubtitle').textContent = titleMap[tabId].sub;
    }

    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');

    // Auto-generate recipe if user navigated to recipe tab
    if (tabId === 'recipe-generator' && !activeGeneratedRecipe) {
        generateSmartRecipe();
    }
}

function initMobileSidebar() {
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const closeBtn = document.getElementById('sidebarCloseBtn');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.add('open'));
    }
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));
    }
}


// ==========================================================
// 4. MY PANTRY (INVENTORY TRACKER)
// ==========================================================

function initStorageFilters() {
    const chips = document.querySelectorAll('#storageFilters .storage-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentStorageFilter = chip.getAttribute('data-storage');
            renderPantryGrid();
        });
    });
}

function getExpiryTagInfo(days) {
    if (days < 3) {
        return {
            cls: 'red',
            label: `Expires in ${days} ${days === 1 ? 'day' : 'days'}!`,
            icon: 'ph-fill ph-warning-circle',
            action: 'Cook immediately'
        };
    } else if (days <= 7) {
        return {
            cls: 'yellow',
            label: `Use within ${days} days`,
            icon: 'ph-fill ph-clock',
            action: 'Cook this week'
        };
    } else {
        return {
            cls: 'green',
            label: `Fresh • ${days} days left`,
            icon: 'ph-fill ph-check-circle',
            action: 'Peak freshness'
        };
    }
}

function renderPantryGrid() {
    const grid = document.getElementById('pantryGrid');
    const emptyState = document.getElementById('pantryEmptyState');
    if (!grid) return;

    const filtered = pantryInventory.filter(item => {
        if (currentStorageFilter === 'all') return true;
        return item.storageCondition === currentStorageFilter;
    });

    if (pantryInventory.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    grid.innerHTML = filtered.map(item => {
        const tag = getExpiryTagInfo(item.remainingDays);
        const progressPct = Math.min(100, Math.max(5, (item.remainingDays / item.expectedShelfLifeDays) * 100));

        return `
            <div class="pantry-card">
                <div class="pantry-card-top">
                    <div>
                        <span class="expiry-tag ${tag.cls}">
                            <i class="${tag.icon}"></i> ${tag.label}
                        </span>
                        <h4 class="pantry-item-name" style="margin-top: 0.4rem;">${item.ingredient}</h4>
                    </div>
                </div>

                <span class="pantry-storage-type">
                    <i class="ph ph-package"></i> Storage: <strong>${item.storageCondition}</strong>
                </span>

                <div class="pantry-qty-block">
                    <span>Available in Pantry</span>
                    <span class="qty-val">${item.quantity} ${item.unit}</span>
                </div>

                <div class="shelf-life-meter">
                    <div class="meter-labels">
                        <span>Shelf-Life Countdown</span>
                        <strong>${item.remainingDays} / ${item.expectedShelfLifeDays} days</strong>
                    </div>
                    <div class="meter-track">
                        <div class="meter-fill ${tag.cls}" style="width: ${progressPct}%;"></div>
                    </div>
                </div>

                <div class="pantry-card-actions">
                    <button type="button" class="btn-cook-item" onclick="cookSpecificPantryItem('${item.id}')">
                        <i class="ph-fill ph-cooking-pot"></i> Recipe with this
                    </button>
                    <button type="button" class="btn-del-item" onclick="removePantryItem('${item.id}')" title="Remove / Consumed">
                        <i class="ph ph-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updatePantryStats() {
    const total = pantryInventory.length;
    const urgent = pantryInventory.filter(i => i.remainingDays < 3).length;
    const warning = pantryInventory.filter(i => i.remainingDays >= 3 && i.remainingDays <= 7).length;
    const fresh = pantryInventory.filter(i => i.remainingDays > 7).length;

    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    setTxt('totalPantryCount', total);
    setTxt('urgentPantryCount', urgent);
    setTxt('warningPantryCount', warning);
    setTxt('freshPantryCount', fresh);
    setTxt('sidebarPantryCount', total);
    setTxt('headerPantryCount', total);
    setTxt('sidebarExpiringCount', `${urgent + warning} Expiring`);

    const alertBanner = document.getElementById('expiringAlertBanner');
    if (alertBanner) {
        alertBanner.textContent = `${urgent + warning} items expiring soon`;
    }
}

function removePantryItem(itemId) {
    const idx = pantryInventory.findIndex(i => i.id === itemId);
    if (idx !== -1) {
        const name = pantryInventory[idx].ingredient;
        pantryInventory.splice(idx, 1);
        renderAllViews();
        showToast(`Removed "${name}" from your kitchen.`);
    }
}


// ==========================================================
// 5. HERO AI RECIPE GENERATOR ("WHAT SHOULD I COOK?")
// ==========================================================

function initChefButtons() {
    const genBtn = document.getElementById('generateRecipeBtn');
    const randBtn = document.getElementById('randomizeRecipeBtn');

    if (genBtn) {
        genBtn.addEventListener('click', () => {
            generateSmartRecipe();
        });
    }
    if (randBtn) {
        randBtn.addEventListener('click', () => {
            const randomRecipe = recipeDatabase[Math.floor(Math.random() * recipeDatabase.length)];
            renderRecipeCard(randomRecipe);
            showToast('AI synthesized an alternative gourmet recipe!');
        });
    }
}

function updateChefTargetChips() {
    const container = document.getElementById('targetedExpiringChips');
    if (!container) return;

    // Pick expiring items (remaining days < 7)
    const expiring = [...pantryInventory].sort((a, b) => a.remainingDays - b.remainingDays).slice(0, 3);

    if (expiring.length === 0) {
        container.innerHTML = '<span style="color: #94A3B8; font-size: 0.8rem;">All pantry ingredients are fully fresh!</span>';
        return;
    }

    container.innerHTML = expiring.map(item => `
        <span class="exp-chip">
            <i class="ph-fill ph-warning-circle"></i>
            ${item.ingredient} (${item.remainingDays}d left)
        </span>
    `).join('');
}

function generateSmartRecipe() {
    // Find recipe that matches expiring ingredients
    const expiringNames = pantryInventory
        .filter(i => i.remainingDays <= 7)
        .map(i => i.ingredient);

    let bestRecipe = recipeDatabase[0];
    for (const recipe of recipeDatabase) {
        const matches = recipe.targetedIngredients.some(ing => expiringNames.includes(ing));
        if (matches) {
            bestRecipe = recipe;
            break;
        }
    }

    renderRecipeCard(bestRecipe);
    showToast('AI Chef generated a zero-waste recipe using your expiring items!');
}

function cookSpecificPantryItem(itemId) {
    const item = pantryInventory.find(i => i.id === itemId);
    if (!item) return;

    // Find recipe that includes this item
    const matched = recipeDatabase.find(r => r.targetedIngredients.includes(item.ingredient)) || recipeDatabase[0];
    switchTab('recipe-generator');
    renderRecipeCard(matched);
    showToast(`Focused recipe on ${item.ingredient}!`);
}

function renderRecipeCard(recipe) {
    activeGeneratedRecipe = recipe;
    const area = document.getElementById('recipeResultsArea');
    if (!area) return;

    area.innerHTML = `
        <div class="recipe-card-full">
            <div class="recipe-header-block">
                <div>
                    <span class="recipe-origin-tag"><i class="ph-bold ph-globe-hemisphere-west"></i> ${recipe.origin}</span>
                    <h3 class="recipe-name">${recipe.title}</h3>
                    <p class="recipe-desc">${recipe.description}</p>
                </div>
                <div class="recipe-telemetry-meta">
                    <div class="meta-chip"><i class="ph-bold ph-clock"></i> ${recipe.prepTime}</div>
                    <div class="meta-chip"><i class="ph-bold ph-chart-bar"></i> ${recipe.difficulty}</div>
                    <div class="meta-chip"><i class="ph-bold ph-users"></i> ${recipe.servings}</div>
                </div>
            </div>

            <div class="recipe-content-grid">
                <!-- Ingredients checklist -->
                <div class="ingredients-pane">
                    <h4><i class="ph-bold ph-basket"></i> Ingredients Needed</h4>
                    <ul class="ingredients-list">
                        ${recipe.ingredientsNeeded.map(ing => `
                            <li class="ingredient-row">
                                <span>${ing.name} (<strong>${ing.amount}</strong>)</span>
                                ${ing.fromPantry ? '<span class="ing-from-pantry">From Your Pantry</span>' : '<span style="font-size:0.65rem; color:#64748B;">Kitchen staple</span>'}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Step by step cooking instructions -->
                <div class="steps-pane">
                    <h4><i class="ph-bold ph-fire"></i> Culinary Steps</h4>
                    <ol class="steps-list">
                        ${recipe.steps.map((step, idx) => `
                            <li class="step-item">
                                <div class="step-number">${idx + 1}</div>
                                <div class="step-text">${step}</div>
                            </li>
                        `).join('')}
                    </ol>
                </div>
            </div>

            <div class="recipe-footer-actions">
                <div class="savings-indicator">
                    <i class="ph-fill ph-leaf"></i>
                    <span>${recipe.zeroWasteNote}</span>
                </div>
                <button type="button" class="btn-cook-now" onclick="executeCookRecipe()">
                    <i class="ph-bold ph-check"></i> Cook This Recipe & Deduct Ingredients
                </button>
            </div>
        </div>
    `;
}

function executeCookRecipe() {
    if (!activeGeneratedRecipe) return;

    // Deduct or remove targeted ingredients from pantry
    const deductedNames = [];
    activeGeneratedRecipe.targetedIngredients.forEach(targetName => {
        const item = pantryInventory.find(i => i.ingredient === targetName);
        if (item) {
            deductedNames.push(`${item.ingredient} (${item.quantity} ${item.unit})`);
            // Reduce quantity or remove
            if (item.quantity > 1) {
                item.quantity = Math.max(0.5, item.quantity - 1.0);
            } else {
                const idx = pantryInventory.indexOf(item);
                pantryInventory.splice(idx, 1);
            }
        }
    });

    // Populate and open celebration modal
    const modal = document.getElementById('cookModal');
    document.getElementById('cookedRecipeTitle').textContent = `Cooked: ${activeGeneratedRecipe.title}`;
    document.getElementById('cookedDetailsBox').innerHTML = `
        <strong>Successfully rescued and utilized:</strong><br>
        • ${deductedNames.length > 0 ? deductedNames.join('<br>• ') : 'Expiring fresh vegetables'}<br><br>
        <span style="color: #059669; font-weight: 700;">+50 Eco-Points earned for zero food waste!</span>
    `;

    modal.classList.add('active');
    renderAllViews();
}

function initCookModal() {
    const modal = document.getElementById('cookModal');
    const closeBtn = document.getElementById('closeCookModal');
    const doneBtn = document.getElementById('confirmCookDoneBtn');

    const closeModal = () => {
        if (modal) modal.classList.remove('active');
        switchTab('pantry');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (doneBtn) doneBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
}


// ==========================================================
// 6. EXPIRY RADAR TABLE
// ==========================================================

function renderExpiryTable() {
    const tbody = document.getElementById('expiryTableBody');
    if (!tbody) return;

    // Sort by remaining days ascending
    const sorted = [...pantryInventory].sort((a, b) => a.remainingDays - b.remainingDays);

    tbody.innerHTML = sorted.map(item => {
        const tag = getExpiryTagInfo(item.remainingDays);
        return `
            <tr>
                <td><strong>${item.ingredient}</strong></td>
                <td>${item.quantity} ${item.unit}</td>
                <td><span class="storage-tag-pill">${item.storageCondition}</span></td>
                <td>${item.expectedShelfLifeDays} days</td>
                <td><strong style="color: ${tag.cls === 'red' ? '#DC2626' : tag.cls === 'yellow' ? '#D97706' : '#059669'}; font-size: 0.95rem;">${item.remainingDays} days</strong></td>
                <td>
                    <span class="expiry-tag ${tag.cls}">
                        <i class="${tag.icon}"></i> ${tag.label}
                    </span>
                </td>
                <td>
                    <button type="button" class="btn-text-sm" onclick="cookSpecificPantryItem('${item.id}')" style="color: var(--primary); font-weight: 700;">
                        ${tag.action} &rarr;
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}


// ==========================================================
// 7. FRESH MARKET (RETAIL STOREFRONT)
// ==========================================================

function initMarketCategoryFilters() {
    const buttons = document.querySelectorAll('#marketCategoryFilters .market-cat-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMarketCategory = btn.getAttribute('data-cat');
            renderStorefrontGrid();
        });
    });
}

function renderStorefrontGrid() {
    const grid = document.getElementById('retailProductsGrid');
    if (!grid) return;

    const filtered = marketProducts.filter(prod => {
        if (currentMarketCategory === 'all') return true;
        return prod.category === currentMarketCategory;
    });

    grid.innerHTML = filtered.map(prod => `
        <div class="retail-product-card">
            <div class="retail-banner ${prod.bannerClass}">
                <span class="farm-badge"><i class="ph-bold ph-tractor"></i> Direct Farm</span>
                <span class="farm-badge" style="background: rgba(255,255,255,0.9); color: #183A2B;">${prod.category}</span>
            </div>
            <div class="retail-body">
                <div class="retail-title-row">
                    <div>
                        <h4 class="item-title">${prod.title}</h4>
                        <span style="font-size: 0.72rem; color: var(--text-muted);">${prod.farmOrigin}</span>
                    </div>
                    <div class="item-price">
                        ₹${prod.pricePerKg.toFixed(2)}
                        <span class="item-unit">per ${prod.unit}</span>
                    </div>
                </div>

                <div class="farm-gate-transparency">
                    <i class="ph-fill ph-check-shield"></i>
                    <span>Farmer received: <strong>₹${prod.farmGatePrice.toFixed(2)}/kg</strong></span>
                </div>

                <div style="font-size: 0.72rem; color: var(--text-muted); display: flex; justify-content: space-between;">
                    <span>Harvest: <strong>${prod.harvestDate}</strong></span>
                    <span>Storage: <strong>${prod.storageCondition}</strong></span>
                </div>

                <div class="retail-footer">
                    <button type="button" class="btn-add-pantry" onclick="buyItemToPantry('${prod.id}')">
                        <i class="ph-bold ph-shopping-bag"></i> Buy & Add to Pantry
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function buyItemToPantry(productId) {
    const product = marketProducts.find(p => p.id === productId);
    if (!product) return;

    // Check if already in pantry
    const existing = pantryInventory.find(item => item.ingredient.toLowerCase() === product.title.toLowerCase());
    if (existing) {
        existing.quantity += 1.0;
        existing.remainingDays = product.defaultShelfLife;
    } else {
        const newItem = {
            id: `PANTRY-${Math.floor(100 + Math.random() * 900)}`,
            ingredient: product.title,
            category: product.category,
            quantity: 1.0,
            unit: product.unit,
            storageCondition: product.storageCondition,
            expectedShelfLifeDays: product.defaultShelfLife,
            remainingDays: product.defaultShelfLife,
            farmOrigin: `${product.farmOrigin} (${product.farmerName})`,
            bannerClass: product.bannerClass
        };
        pantryInventory.unshift(newItem);
    }

    renderAllViews();
    showToast(`Purchased ${product.title}! Stored safely in your Kitchen Pantry.`);
}


// ==========================================================
// 8. PURCHASE HISTORY & SEARCH
// ==========================================================

function renderPurchaseHistory() {
    const tbody = document.getElementById('purchaseHistoryBody');
    if (!tbody) return;

    tbody.innerHTML = purchaseHistory.map(order => `
        <tr>
            <td><strong>${order.orderNo}</strong></td>
            <td>${order.items}</td>
            <td>${order.origin}</td>
            <td>${order.farmer}</td>
            <td>${order.harvestDate}</td>
            <td><strong>₹${order.amount.toFixed(2)}</strong></td>
            <td>
                <span style="font-size: 0.72rem; color: #059669; font-weight: 600; display: inline-flex; align-items: center; gap: 0.3rem;">
                    <i class="ph-fill ph-seal-check"></i> ${order.certificate}
                </span>
            </td>
        </tr>
    `).join('');
}

function initSearch() {
    const searchInput = document.getElementById('pantrySearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const pantryCards = document.querySelectorAll('.pantry-card');

        pantryCards.forEach(card => {
            const title = card.querySelector('.pantry-item-name').textContent.toLowerCase();
            card.style.display = title.includes(query) ? 'flex' : 'none';
        });
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}
