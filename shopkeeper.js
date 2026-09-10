/**
 * FORAGE B2B SHOPKEEPER & MIDDLEMAN HUB
 * Frontend Architecture & Mock Data Store
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * All datasets below are structured as JSON-compatible JavaScript arrays.
 * To integrate with Node.js/Express & MongoDB, simply replace these initial
 * arrays with `await fetch('/api/v1/...')` calls!
 */

// ==========================================================
// 1. MOCK DATA ARRAYS (TOP OF FILE AS REQUIRED)
// ==========================================================

let farmersListings = [
    {
        id: 'CROP-001',
        crop: 'Tomatoes',
        category: 'Vegetables',
        variety: 'Roma Grade-A',
        farmerName: 'Ramesh Patil',
        farmerId: 'FARM-901',
        location: 'Nashik',
        state: 'Maharashtra',
        availableQtyKg: 850,
        minOrderQtyKg: 100,
        farmGatePrice: 27.45,
        wholesalePrice: 32.01,
        retailPrice: 45.19,
        harvestDate: '2026-09-09',
        freshnessScore: 94,
        bannerClass: 'tomato'
    },
    {
        id: 'CROP-002',
        crop: 'Onions',
        category: 'Vegetables',
        variety: 'Nashik Red Premium',
        farmerName: 'Dnyaneshwar Shinde',
        farmerId: 'FARM-902',
        location: 'Nashik',
        state: 'Maharashtra',
        availableQtyKg: 1400,
        minOrderQtyKg: 200,
        farmGatePrice: 31.01,
        wholesalePrice: 35.67,
        retailPrice: 44.36,
        harvestDate: '2026-09-08',
        freshnessScore: 92,
        bannerClass: 'onion'
    },
    {
        id: 'CROP-003',
        crop: 'Potatoes',
        category: 'Vegetables',
        variety: 'Kufri Jyoti Cleaned',
        farmerName: 'Mahesh Gaikwad',
        farmerId: 'FARM-903',
        location: 'Pune',
        state: 'Maharashtra',
        availableQtyKg: 1800,
        minOrderQtyKg: 250,
        farmGatePrice: 24.55,
        wholesalePrice: 28.30,
        retailPrice: 37.12,
        harvestDate: '2026-09-07',
        freshnessScore: 96,
        bannerClass: 'potato'
    },
    {
        id: 'CROP-004',
        crop: 'Carrots',
        category: 'Vegetables',
        variety: 'Orange Super-Crunch',
        farmerName: 'Suresh Patel',
        farmerId: 'FARM-904',
        location: 'Ahmedabad',
        state: 'Gujarat',
        availableQtyKg: 950,
        minOrderQtyKg: 100,
        farmGatePrice: 41.94,
        wholesalePrice: 52.95,
        retailPrice: 67.85,
        harvestDate: '2026-09-08',
        freshnessScore: 89,
        bannerClass: 'carrot'
    },
    {
        id: 'CROP-005',
        crop: 'Wheat Grain',
        category: 'Grains',
        variety: 'Sharbati Gold MP',
        farmerName: 'Gurpreet Singh',
        farmerId: 'FARM-905',
        location: 'Punjab',
        state: 'Punjab',
        availableQtyKg: 3500,
        minOrderQtyKg: 500,
        farmGatePrice: 38.50,
        wholesalePrice: 43.00,
        retailPrice: 54.00,
        harvestDate: '2026-08-30',
        freshnessScore: 99,
        bannerClass: 'wheat'
    },
    {
        id: 'CROP-006',
        crop: 'Baby Spinach',
        category: 'Vegetables',
        variety: 'Hydroponic Tender Leaf',
        farmerName: 'Vinayak Jadhav',
        farmerId: 'FARM-906',
        location: 'Pune',
        state: 'Maharashtra',
        availableQtyKg: 400,
        minOrderQtyKg: 50,
        farmGatePrice: 35.00,
        wholesalePrice: 44.00,
        retailPrice: 65.00,
        harvestDate: '2026-09-10',
        freshnessScore: 98,
        bannerClass: 'spinach'
    },
    {
        id: 'CROP-007',
        crop: 'Green Chillies',
        category: 'Vegetables',
        variety: 'G4 Spiced Green',
        farmerName: 'Anil Deshmukh',
        farmerId: 'FARM-907',
        location: 'Nashik',
        state: 'Maharashtra',
        availableQtyKg: 600,
        minOrderQtyKg: 50,
        farmGatePrice: 48.00,
        wholesalePrice: 56.50,
        retailPrice: 78.00,
        harvestDate: '2026-09-09',
        freshnessScore: 91,
        bannerClass: 'general'
    },
    {
        id: 'CROP-008',
        crop: 'Pomegranates',
        category: 'Fruits',
        variety: 'Bhagwa Export Grade',
        farmerName: 'Sunil Rao',
        farmerId: 'FARM-908',
        location: 'Bengaluru',
        state: 'Karnataka',
        availableQtyKg: 1100,
        minOrderQtyKg: 150,
        farmGatePrice: 95.00,
        wholesalePrice: 115.00,
        retailPrice: 160.00,
        harvestDate: '2026-09-08',
        freshnessScore: 93,
        bannerClass: 'tomato'
    },
    {
        id: 'CROP-009',
        crop: 'Robusta Bananas',
        category: 'Fruits',
        variety: 'Semi-Ripe Cluster',
        farmerName: 'Kishore Hegde',
        farmerId: 'FARM-909',
        location: 'Bengaluru',
        state: 'Karnataka',
        availableQtyKg: 2200,
        minOrderQtyKg: 300,
        farmGatePrice: 22.00,
        wholesalePrice: 28.50,
        retailPrice: 42.00,
        harvestDate: '2026-09-09',
        freshnessScore: 90,
        bannerClass: 'potato'
    },
    {
        id: 'CROP-010',
        crop: 'Apples',
        category: 'Fruits',
        variety: 'Himachal Royal Delicious',
        farmerName: 'Devinder Thakur',
        farmerId: 'FARM-910',
        location: 'Punjab',
        state: 'Himachal/PB Depot',
        availableQtyKg: 1500,
        minOrderQtyKg: 200,
        farmGatePrice: 88.00,
        wholesalePrice: 104.00,
        retailPrice: 145.00,
        harvestDate: '2026-09-05',
        freshnessScore: 92,
        bannerClass: 'tomato'
    },
    {
        id: 'CROP-011',
        crop: 'Organic Lentils (Toor)',
        category: 'Grains',
        variety: 'Unpolished Desi Dal',
        farmerName: 'Balwant Verma',
        farmerId: 'FARM-911',
        location: 'Pune',
        state: 'Maharashtra',
        availableQtyKg: 1900,
        minOrderQtyKg: 200,
        farmGatePrice: 108.00,
        wholesalePrice: 122.00,
        retailPrice: 155.00,
        harvestDate: '2026-08-25',
        freshnessScore: 99,
        bannerClass: 'wheat'
    },
    {
        id: 'CROP-012',
        crop: 'Basmati Rice',
        category: 'Grains',
        variety: '1121 Extra Long Steam',
        farmerName: 'Harpreet Gill',
        farmerId: 'FARM-912',
        location: 'Punjab',
        state: 'Punjab',
        availableQtyKg: 4200,
        minOrderQtyKg: 500,
        farmGatePrice: 72.00,
        wholesalePrice: 84.00,
        retailPrice: 110.00,
        harvestDate: '2026-08-28',
        freshnessScore: 99,
        bannerClass: 'wheat'
    }
];

let shopkeeperOrders = [
    {
        orderId: 'ORD-B2B-7801',
        crop: 'Tomatoes (Roma A)',
        farmer: 'Ramesh Patil',
        route: 'Nashik &rarr; Mumbai',
        qtyKg: 500,
        pricePerKg: 27.45,
        totalValue: 13725,
        status: 'In Transit',
        eta: 'In 2.5 hrs',
        temperature: '18.8°C',
        vibration: '4.1',
        damagePct: 8.55,
        freshnessScore: 87.17,
        logId: 'TD001'
    },
    {
        orderId: 'ORD-B2B-7802',
        crop: 'Potatoes (Kufri)',
        farmer: 'Mahesh Gaikwad',
        route: 'Pune &rarr; Mumbai',
        qtyKg: 800,
        pricePerKg: 24.55,
        totalValue: 19640,
        status: 'In Transit',
        eta: 'In 45 mins',
        temperature: '36.0°C',
        vibration: '3.23',
        damagePct: 12.18,
        freshnessScore: 81.73,
        logId: 'TD002'
    },
    {
        orderId: 'ORD-B2B-7803',
        crop: 'Onions (Nashik Red)',
        farmer: 'Dnyaneshwar Shinde',
        route: 'Ahmedabad &rarr; Mumbai',
        qtyKg: 1000,
        pricePerKg: 31.01,
        totalValue: 31010,
        status: 'In Transit',
        eta: 'In 7 hrs',
        temperature: '33.6°C',
        vibration: '4.4',
        damagePct: 14.31,
        freshnessScore: 78.53,
        logId: 'TD003'
    },
    {
        orderId: 'ORD-B2B-7798',
        crop: 'Baby Spinach Hydroponic',
        farmer: 'Vinayak Jadhav',
        route: 'Pune &rarr; Mumbai',
        qtyKg: 150,
        pricePerKg: 35.00,
        totalValue: 5250,
        status: 'Pending',
        eta: 'Awaiting Farmer Dispatch',
        temperature: '14.0°C',
        vibration: '1.2',
        damagePct: 2.10,
        freshnessScore: 97.90,
        logId: 'TD005'
    },
    {
        orderId: 'ORD-B2B-7790',
        crop: 'Carrots (Super-Crunch)',
        farmer: 'Suresh Patel',
        route: 'Bengaluru &rarr; Mumbai',
        qtyKg: 650,
        pricePerKg: 41.94,
        totalValue: 27261,
        status: 'Delivered',
        eta: 'Delivered Today 08:30 AM',
        temperature: '15.3°C',
        vibration: '4.03',
        damagePct: 10.97,
        freshnessScore: 83.55,
        logId: 'TD004'
    },
    {
        orderId: 'ORD-B2B-7782',
        crop: 'Wheat Sharbati Gold',
        farmer: 'Gurpreet Singh',
        route: 'Ludhiana &rarr; Mumbai',
        qtyKg: 2000,
        pricePerKg: 38.50,
        totalValue: 77000,
        status: 'Delivered',
        eta: 'Delivered 2 days ago',
        temperature: '24.0°C',
        vibration: '3.1',
        damagePct: 1.50,
        freshnessScore: 98.50,
        logId: 'TD006'
    }
];

let transitTelemetryLogs = [
    { logId: 'TD001', route: 'Nashik-Mumbai', produce: 'Tomato', hours: 12, temp: 18.8, humidity: 73, vibration: 4.1, damage: 8.55, freshness: 87.17, condition: 'Optimal' },
    { logId: 'TD002', route: 'Pune-Mumbai', produce: 'Potato', hours: 6, temp: 36.0, humidity: 63, vibration: 3.23, damage: 12.18, freshness: 81.73, condition: 'Moderate Heat' },
    { logId: 'TD003', route: 'Ahmedabad-Mumbai', produce: 'Onion', hours: 26, temp: 33.6, humidity: 76, vibration: 4.4, damage: 14.31, freshness: 78.53, condition: 'Warning' },
    { logId: 'TD004', route: 'Bengaluru-Mumbai', produce: 'Carrot', hours: 19, temp: 15.3, humidity: 61, vibration: 4.03, damage: 10.97, freshness: 83.55, condition: 'Reefer Locked' }
];

let priceIndexData = [
    { crop: 'Tomato', market: 'Mumbai', farmGate: 27.45, wholesale: 32.01, retail: 45.19, marginPct: 29.1, spread: 13.18 },
    { crop: 'Potato', market: 'Pune', farmGate: 24.55, wholesale: 28.30, retail: 37.12, marginPct: 23.7, spread: 8.82 },
    { crop: 'Onion', market: 'Nashik', farmGate: 31.01, wholesale: 35.67, retail: 44.36, marginPct: 24.3, spread: 8.69 },
    { crop: 'Carrot', market: 'Ahmedabad', farmGate: 41.94, wholesale: 52.95, retail: 67.85, marginPct: 28.1, spread: 14.90 }
];

// Pre-defined AI scenarios & conversational responses
const aiDemandKnowledge = {
    'onion': 'Nashik wholesale mandis are facing tight arrivals due to unseasonal rain. Current farm-gate is ₹31.01/kg, projected to touch ₹36/kg next week (+14%). Recommendation: Lock in 1,000–1,500 kg immediately.',
    'tomato': 'Pune & Nashik harvests are healthy with strong supply coming in from Karnataka as well. Farm-gate has stabilized around ₹27.45/kg. Buy in medium batches to minimize shelf-life degradation.',
    'margin': 'The highest spread right now is in Ahmedabad Carrots (₹41.94 farm-gate vs ₹67.85 retail, yielding 28.1% net margin) and Roma Tomatoes (₹27.45 farm-gate vs ₹45.19 retail, yielding 29.1%).',
    'weather': 'Heavy humidity on the Nashik-Mumbai NH-160 corridor. Ensure truck temperature is kept below 20°C and dispatch during evening windows to prevent premature leaf decay.',
    'potato': 'Potato prices remain extremely steady at ₹24.55/kg farm-gate. Bulk storage in cool warehouses is safe for up to 30 days without degradation.',
    'default': 'Based on our real-time Mandi price feeds and APMC data, fresh produce prices are experiencing a moderate +4.8% upward index. What specific crop or route would you like strategic procurement guidance for?'
};


// ==========================================================
// 2. STATE & EVENT HANDLERS INITIALIZATION
// ==========================================================

let currentCropCategory = 'all';
let currentLocation = 'all';
let currentSort = 'price-asc';
let currentOrderFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initNavigationTabs();
    initMobileSidebar();
    initProcurementFilters();
    initOrderFilters();
    initQuickSearch();
    initOrderModal();
    initAIChat();

    // Initial Renders
    renderAllViews();
});

function renderAllViews() {
    renderQuickTransitList();
    renderOverviewProcurement();
    renderB2BMarketplace();
    renderOrdersTable();
    renderTelemetryLogs();
    renderMarginCards();
    updateCountBadges();
}


// ==========================================================
// 3. SPA NAVIGATION
// ==========================================================

function initNavigationTabs() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabId) {
    // Update sidebar buttons
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update active tab section
    document.querySelectorAll('.spa-tab').forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(`tab-${tabId}`);
    if (activeSection) {
        activeSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update page title contextually
    const titleMap = {
        'overview': { title: 'Middleman & B2B Trading Dashboard', sub: 'Source bulk farm harvests, track cold-chain degradation & audit transparent retail margins.' },
        'procurement': { title: 'B2B Procurement Marketplace', sub: 'Explore direct farmer listings with certified harvest grade, location, and transparent farm-gate rates.' },
        'orders': { title: 'Active Bulk Orders & Logistics Tracking', sub: 'Monitor shipments across agricultural corridors with real-time ETA and dispatch statuses.' },
        'transit-monitor': { title: 'Transit Health & Degradation Monitor', sub: 'IoT sensor telemetry predicting produce shelf-life degradation using live temperature, humidity, and vibration.' },
        'profit-analytics': { title: 'Profit Margin & Supply Chain Analytics', sub: 'Verifiable Farm-Gate Buy vs. Wholesale & Retail selling price spreads enforcing fair trade markups.' },
        'ai-forecasting': { title: 'Forage AI Demand & Price Forecasting', sub: 'Actionable advisory powered by 2026 APMC price trends, seasonal weather forecasts, and route congestion.' }
    };

    if (titleMap[tabId]) {
        document.getElementById('pageTitle').textContent = titleMap[tabId].title;
        document.getElementById('pageSubtitle').textContent = titleMap[tabId].sub;
    }

    // Close mobile sidebar if open
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
}

function initMobileSidebar() {
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const closeBtn = document.getElementById('sidebarCloseBtn');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
    }
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }
}


// ==========================================================
// 4. PROCUREMENT MARKETPLACE LOGIC
// ==========================================================

function initProcurementFilters() {
    // Category chips
    const categoryChips = document.querySelectorAll('#cropTypeFilters .filter-chip');
    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentCropCategory = chip.getAttribute('data-filter');
            renderB2BMarketplace();
        });
    });

    // Location select
    const locationSelect = document.getElementById('locationFilter');
    if (locationSelect) {
        locationSelect.addEventListener('change', (e) => {
            currentLocation = e.target.value;
            renderB2BMarketplace();
        });
    }

    // Price Sort select
    const sortSelect = document.getElementById('priceSortFilter');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderB2BMarketplace();
        });
    }

    // Quick Procure header button
    document.querySelectorAll('.open-procure-quick').forEach(btn => {
        btn.addEventListener('click', () => switchTab('procurement'));
    });
}

function resetMarketFilters() {
    currentCropCategory = 'all';
    currentLocation = 'all';
    currentSort = 'price-asc';

    document.querySelectorAll('#cropTypeFilters .filter-chip').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-filter') === 'all');
    });
    const locSel = document.getElementById('locationFilter');
    const sortSel = document.getElementById('priceSortFilter');
    if (locSel) locSel.value = 'all';
    if (sortSel) sortSel.value = 'price-asc';

    renderB2BMarketplace();
}

function getFilteredListings() {
    return farmersListings.filter(item => {
        const matchesCat = currentCropCategory === 'all' || item.category === currentCropCategory;
        const matchesLoc = currentLocation === 'all' || item.location === currentLocation;
        return matchesCat && matchesLoc;
    }).sort((a, b) => {
        if (currentSort === 'price-asc') return a.farmGatePrice - b.farmGatePrice;
        if (currentSort === 'price-desc') return b.farmGatePrice - a.farmGatePrice;
        if (currentSort === 'qty-desc') return b.availableQtyKg - a.availableQtyKg;
        if (currentSort === 'fresh-desc') return b.freshnessScore - a.freshnessScore;
        return 0;
    });
}

function renderB2BMarketplace() {
    const grid = document.getElementById('b2bMarketGrid');
    const emptyState = document.getElementById('marketEmptyState');
    if (!grid) return;

    const filtered = getFilteredListings();

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    grid.innerHTML = filtered.map(item => `
        <div class="b2b-crop-card">
            <div class="crop-card-banner ${item.bannerClass}">
                <span class="crop-badge-top">${item.category}</span>
                <span class="crop-badge-grade">${item.variety}</span>
            </div>
            <div class="crop-card-body">
                <div class="crop-title-row">
                    <div>
                        <h4 class="crop-name">${item.crop}</h4>
                        <span class="price-subtext">Harvest: ${item.harvestDate}</span>
                    </div>
                    <div class="crop-farm-gate-price">
                        ₹${item.farmGatePrice.toFixed(2)}
                        <span class="price-subtext">per kg (Farm-gate)</span>
                    </div>
                </div>

                <div class="farmer-origin-row">
                    <i class="ph-fill ph-user-check"></i>
                    <span><strong>${item.farmerName}</strong> • ${item.location}, ${item.state}</span>
                </div>

                <div class="crop-specs-grid">
                    <div class="spec-item">
                        <span class="spec-label">Available Volume</span>
                        <span class="spec-value">${item.availableQtyKg.toLocaleString()} kg</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Min. Order Lot</span>
                        <span class="spec-value">${item.minOrderQtyKg} kg</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Retail Value Spread</span>
                        <span class="spec-value" style="color: #059669;">₹${item.retailPrice.toFixed(2)}/kg</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Freshness Index</span>
                        <span class="spec-value">${item.freshnessScore}%</span>
                    </div>
                </div>

                <div class="crop-card-footer">
                    <button type="button" class="btn-procure" onclick="openOrderModal('${item.id}')">
                        <i class="ph-bold ph-shopping-bag"></i> Procure Bulk Batch
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderOverviewProcurement() {
    const grid = document.getElementById('overviewProcureGrid');
    if (!grid) return;

    // Show top 3 recommended listings
    const top3 = farmersListings.slice(0, 3);
    grid.innerHTML = top3.map(item => `
        <div class="b2b-crop-card">
            <div class="crop-card-banner ${item.bannerClass}">
                <span class="crop-badge-top">${item.category}</span>
                <span class="crop-badge-grade">${item.variety}</span>
            </div>
            <div class="crop-card-body">
                <div class="crop-title-row">
                    <h4 class="crop-name">${item.crop}</h4>
                    <div class="crop-farm-gate-price">₹${item.farmGatePrice.toFixed(2)}/kg</div>
                </div>
                <div class="farmer-origin-row">
                    <i class="ph-fill ph-user-check"></i>
                    <span>${item.farmerName} • ${item.location}</span>
                </div>
                <div class="crop-card-footer">
                    <button type="button" class="btn-procure" onclick="openOrderModal('${item.id}')">
                        <i class="ph-bold ph-shopping-bag"></i> Procure Batch
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


// ==========================================================
// 5. ACTIVE ORDERS & LOGISTICS TRACKING
// ==========================================================

function initOrderFilters() {
    const chips = document.querySelectorAll('.orders-filter-chips .tab-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentOrderFilter = chip.getAttribute('data-order-filter');
            renderOrdersTable();
        });
    });
}

function renderOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    const filtered = shopkeeperOrders.filter(order => {
        if (currentOrderFilter === 'all') return true;
        return order.status === currentOrderFilter;
    });

    tbody.innerHTML = filtered.map(order => {
        let statusClass = 'pending';
        if (order.status === 'In Transit') statusClass = 'in-transit';
        if (order.status === 'Delivered') statusClass = 'delivered';

        return `
            <tr>
                <td><strong>${order.orderId}</strong></td>
                <td>${order.crop}</td>
                <td>${order.farmer}</td>
                <td>
                    <div>${order.route}</div>
                    <span class="price-subtext" style="color: #64748B;">ETA: ${order.eta}</span>
                </td>
                <td><strong>${order.qtyKg.toLocaleString()} kg</strong></td>
                <td><strong>₹${order.totalValue.toLocaleString()}</strong></td>
                <td>
                    <span class="status-badge ${statusClass}">
                        <i class="ph-fill ph-circle" style="font-size: 0.5rem;"></i> ${order.status}
                    </span>
                </td>
                <td>
                    <button type="button" class="btn-text-sm" onclick="switchTab('transit-monitor')">
                        <i class="ph-bold ph-heartbeat"></i> Live Telemetry
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function renderQuickTransitList() {
    const list = document.getElementById('quickTransitList');
    if (!list) return;

    const inTransitOrders = shopkeeperOrders.filter(o => o.status === 'In Transit').slice(0, 3);
    list.innerHTML = inTransitOrders.map(order => `
        <div class="transit-quick-card">
            <div class="tq-top">
                <span class="tq-crop"><i class="ph-bold ph-truck"></i> ${order.crop}</span>
                <span class="tq-badge transit">${order.status}</span>
            </div>
            <div class="tq-route">Route: ${order.route} • ETA: ${order.eta}</div>
            <div class="tq-metrics">
                <span>Temp: <strong>${order.temperature}</strong> (Controlled)</span>
                <span>Freshness: <strong>${order.freshnessScore}%</strong></span>
            </div>
            <div class="tq-health-bar">
                <div class="tq-health-fill" style="width: ${order.freshnessScore}%;"></div>
            </div>
        </div>
    `).join('');
}


// ==========================================================
// 6. TRANSIT HEALTH MONITOR & TELEMETRY
// ==========================================================

function renderTelemetryLogs() {
    const tbody = document.getElementById('telemetryLogsBody');
    if (!tbody) return;

    tbody.innerHTML = transitTelemetryLogs.map(log => `
        <tr>
            <td><strong>${log.logId}</strong></td>
            <td>${log.route}</td>
            <td><strong>${log.produce}</strong></td>
            <td>${log.hours} hrs</td>
            <td>${log.temp}°C</td>
            <td>${log.humidity}%</td>
            <td>${log.vibration} / 10</td>
            <td><span style="color: #DC2626; font-weight: 700;">-${log.damage}%</span></td>
            <td><strong style="color: #059669;">${log.freshness}%</strong></td>
            <td>
                <span class="badge-safe">${log.condition}</span>
            </td>
        </tr>
    `).join('');
}


// ==========================================================
// 7. PROFIT MARGIN ANALYTICS
// ==========================================================

function renderMarginCards() {
    const grid = document.getElementById('marginCardsGrid');
    if (!grid) return;

    grid.innerHTML = priceIndexData.map(item => `
        <div class="margin-card">
            <div class="mc-header">
                <span class="mc-crop">${item.crop}</span>
                <span class="mc-margin-badge">+${item.marginPct}% Net Margin</span>
            </div>
            <div class="price-cascade">
                <div class="cascade-row farmer">
                    <span>Farm-Gate Buy Price:</span>
                    <strong>₹${item.farmGate.toFixed(2)}/kg</strong>
                </div>
                <div class="cascade-row wholesale">
                    <span>Wholesale B2B Rate:</span>
                    <strong>₹${item.wholesale.toFixed(2)}/kg</strong>
                </div>
                <div class="cascade-row retail">
                    <span>Estimated Retail Price:</span>
                    <strong>₹${item.retail.toFixed(2)}/kg</strong>
                </div>
            </div>
            <div class="margin-calc-box">
                <span>Value Spread:</span>
                <strong>+₹${item.spread.toFixed(2)} / kg</strong>
            </div>
        </div>
    `).join('');
}


// ==========================================================
// 8. AI DEMAND FORECASTING CHAT ASSISTANT
// ==========================================================

function initAIChat() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatContainer = document.getElementById('chatContainer');
    const promptChips = document.querySelectorAll('.suggested-prompts .prompt-chip');
    const clearBtn = document.getElementById('clearChatBtn');

    function appendUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-bubble user';
        msgDiv.innerHTML = `
            <div class="bubble-content">
                <p>${escapeHtml(text)}</p>
                <span class="bubble-time">Just now</span>
            </div>
        `;
        chatContainer.appendChild(msgDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function appendAIMessage(text, callout = null) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-bubble ai';
        msgDiv.innerHTML = `
            <div class="bubble-avatar"><i class="ph-fill ph-sparkle"></i></div>
            <div class="bubble-content">
                <p>${text}</p>
                ${callout ? `<div class="bubble-callout">${callout}</div>` : ''}
                <span class="bubble-time">Just now</span>
            </div>
        `;
        chatContainer.appendChild(msgDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function generateAIResponse(userText) {
        const query = userText.toLowerCase();
        let response = aiDemandKnowledge['default'];
        let callout = null;

        if (query.includes('onion')) {
            response = aiDemandKnowledge['onion'];
            callout = 'Target Buy Price: ₹31.00/kg from Nashik belt before Monday spike.';
        } else if (query.includes('tomato')) {
            response = aiDemandKnowledge['tomato'];
            callout = 'Karnataka arrivals are boosting overall supply. Safe procurement rate: ₹27.00 - ₹28.50/kg.';
        } else if (query.includes('margin') || query.includes('highest') || query.includes('profit')) {
            response = aiDemandKnowledge['margin'];
            callout = 'Top recommendation: Source Ahmedabad Carrots (₹41.94 vs ₹67.85 retail).';
        } else if (query.includes('weather') || query.includes('rain') || query.includes('route')) {
            response = aiDemandKnowledge['weather'];
            callout = 'Highway sensor telemetry shows peak road temperatures between 1:00 PM and 4:30 PM.';
        } else if (query.includes('potato')) {
            response = aiDemandKnowledge['potato'];
            callout = 'Storage longevity: 30+ days in ventilated crates.';
        }

        setTimeout(() => {
            appendAIMessage(response, callout);
        }, 600);
    }

    if (chatForm && chatInput) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            appendUserMessage(text);
            chatInput.value = '';
            generateAIResponse(text);
        });
    }

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const promptText = chip.getAttribute('data-prompt');
            appendUserMessage(promptText);
            generateAIResponse(promptText);
        });
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            chatContainer.innerHTML = `
                <div class="chat-bubble ai">
                    <div class="bubble-avatar"><i class="ph-fill ph-sparkle"></i></div>
                    <div class="bubble-content">
                        <p>Chat cleared. Ask me about mandi arrivals, price trends, cold-chain routes, or profitable crop spreads!</p>
                        <span class="bubble-time">Just now</span>
                    </div>
                </div>
            `;
        });
    }
}


// ==========================================================
// 9. BULK ORDER MODAL & TRANSACTION ENGINE
// ==========================================================

let activeModalCrop = null;

function initOrderModal() {
    const modal = document.getElementById('orderModal');
    const closeBtn = document.getElementById('closeOrderModal');
    const form = document.getElementById('bulkOrderForm');
    const qtyInput = document.getElementById('orderQuantityInput');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    if (qtyInput) {
        qtyInput.addEventListener('input', updateOrderCalculation);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!activeModalCrop) return;

            const qty = parseInt(qtyInput.value, 10);
            if (isNaN(qty) || qty < activeModalCrop.minOrderQtyKg) {
                showToast(`Minimum order quantity for this crop is ${activeModalCrop.minOrderQtyKg} kg`);
                return;
            }

            // Create new order object
            const newOrder = {
                orderId: `ORD-B2B-${Math.floor(1000 + Math.random() * 9000)}`,
                crop: `${activeModalCrop.crop} (${activeModalCrop.variety})`,
                farmer: activeModalCrop.farmerName,
                route: `${activeModalCrop.location} &rarr; Mumbai Central Hub`,
                qtyKg: qty,
                pricePerKg: activeModalCrop.farmGatePrice,
                totalValue: Math.round(qty * activeModalCrop.farmGatePrice + 650),
                status: 'In Transit',
                eta: 'In 5.5 hrs',
                temperature: '17.5°C',
                vibration: '3.8',
                damagePct: 4.5,
                freshnessScore: 92.5,
                logId: `TD0${Math.floor(10 + Math.random() * 90)}`
            };

            // Deduct available qty
            activeModalCrop.availableQtyKg = Math.max(0, activeModalCrop.availableQtyKg - qty);

            // Prepend to orders array
            shopkeeperOrders.unshift(newOrder);

            modal.classList.remove('active');
            showToast(`Bulk Order ${newOrder.orderId} placed successfully with ${activeModalCrop.farmerName}!`);

            // Re-render UI
            renderAllViews();
        });
    }
}

window.openOrderModal = function(cropId) {
    const crop = farmersListings.find(c => c.id === cropId);
    if (!crop) return;

    activeModalCrop = crop;
    document.getElementById('orderCropId').value = crop.id;
    document.getElementById('modalCropTitle').textContent = `Procure Bulk ${crop.crop}`;
    document.getElementById('modalFarmerSub').textContent = `Direct Contract with ${crop.farmerName} (${crop.location}, ${crop.state})`;
    document.getElementById('modalPrice').textContent = `₹${crop.farmGatePrice.toFixed(2)} / kg`;
    document.getElementById('modalAvailQty').textContent = `${crop.availableQtyKg.toLocaleString()} kg available`;
    document.getElementById('modalLocation').textContent = `${crop.location}, ${crop.state}`;

    const qtyInput = document.getElementById('orderQuantityInput');
    qtyInput.min = crop.minOrderQtyKg;
    qtyInput.value = crop.minOrderQtyKg;
    qtyInput.max = crop.availableQtyKg;

    updateOrderCalculation();

    const modal = document.getElementById('orderModal');
    modal.classList.add('active');
};

function updateOrderCalculation() {
    if (!activeModalCrop) return;
    const qtyInput = document.getElementById('orderQuantityInput');
    const qty = parseInt(qtyInput.value, 10) || 0;
    const subtotal = qty * activeModalCrop.farmGatePrice;
    const logistics = 650;
    const total = subtotal + logistics;

    document.getElementById('calcSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    document.getElementById('calcLogistics').textContent = `₹${logistics}`;
    document.getElementById('calcTotal').textContent = `₹${total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}


// ==========================================================
// 10. UTILS & SEARCH
// ==========================================================

function updateCountBadges() {
    const marketCount = document.getElementById('marketCropsCount');
    if (marketCount) marketCount.textContent = farmersListings.length;

    const inTransit = shopkeeperOrders.filter(o => o.status === 'In Transit').length;
    const inTransitBadge = document.getElementById('inTransitBadge');
    if (inTransitBadge) inTransitBadge.textContent = `${inTransit} Transit`;

    const countAll = document.getElementById('countAllOrders');
    if (countAll) countAll.textContent = shopkeeperOrders.length;
}

function initQuickSearch() {
    const searchInput = document.getElementById('quickSearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
            renderB2BMarketplace();
            return;
        }

        const filtered = farmersListings.filter(item => {
            return item.crop.toLowerCase().includes(query) ||
                   item.farmerName.toLowerCase().includes(query) ||
                   item.location.toLowerCase().includes(query) ||
                   item.category.toLowerCase().includes(query);
        });

        const grid = document.getElementById('b2bMarketGrid');
        if (grid) {
            if (filtered.length === 0) {
                grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><h3>No crops match "${query}"</h3><p>Try searching for "Tomatoes", "Onions", or "Nashik".</p></div>`;
            } else {
                grid.innerHTML = filtered.map(item => `
                    <div class="b2b-crop-card">
                        <div class="crop-card-banner ${item.bannerClass}">
                            <span class="crop-badge-top">${item.category}</span>
                            <span class="crop-badge-grade">${item.variety}</span>
                        </div>
                        <div class="crop-card-body">
                            <div class="crop-title-row">
                                <h4 class="crop-name">${item.crop}</h4>
                                <div class="crop-farm-gate-price">₹${item.farmGatePrice.toFixed(2)}/kg</div>
                            </div>
                            <div class="farmer-origin-row">
                                <i class="ph-fill ph-user-check"></i>
                                <span>${item.farmerName} • ${item.location}</span>
                            </div>
                            <div class="crop-card-footer">
                                <button type="button" class="btn-procure" onclick="openOrderModal('${item.id}')">
                                    <i class="ph-bold ph-shopping-bag"></i> Procure Batch
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
