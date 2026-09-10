
const API_BASE = 'http://localhost:3000/api';

async function syncFarmerDataWithBackend() {
    try {
        const res = await fetch(`${API_BASE}/listings`);
        if (res.ok) {
            const liveListings = await res.json();
            if (liveListings && liveListings.length > 0) {
                const liveMapped = liveListings.map(item => ({
                    id: item.id || item.record_id || ('F-CROP-' + Math.floor(Math.random()*1000)),
                    name: item.name || item.crop || 'Fresh Harvest Crop',
                    category: item.category || 'Vegetables',
                    variety: item.variety || 'Standard Grade',
                    quantity: Number(item.quantity || item.availableQtyKg || 500),
                    capacityMax: Number(item.capacityMax || 1000),
                    unit: item.unit || 'kg',
                    pricePerUnit: Number(item.pricePerUnit || item.farmGatePrice || item.farm_gate_price_inr_per_kg || 25),
                    mandiBenchmark: Number(item.mandiBenchmark || 22),
                    harvestDate: item.harvestDate || item.date || '2026-09-09',
                    location: item.location || 'Local Farm Storage',
                    status: item.status || 'Available',
                    color: item.color || '#10B981',
                    image: item.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
                }));
                farmerCrops = [...liveMapped, ...farmerCrops.filter(fc => !liveMapped.some(lm => lm.id === fc.id))];
                if (typeof renderAllViews === 'function') renderAllViews();
                console.log('✅ Farmer data synced with MongoDB / Express API');
            }
        }
    } catch (e) {
        console.log('ℹ️ Farmer portal running in standalone mode');
    }
}

/**
 * FORAGE FARMER COMMAND CENTER
 * Frontend Architecture, Charts, Interactive Simulator & Mock Data Store
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * The data structures below are stored as JSON-compatible JavaScript arrays
 * at the top of the file so they can be replaced directly with MongoDB/Node.js
 * API fetch calls when transitioning to full-stack!
 */

// ==========================================================
// 1. MOCK DATA ARRAYS (TOP OF FILE AS REQUIRED)
// ==========================================================

let farmerCrops = [
    {
        id: 'F-CROP-101',
        name: 'Fresh Roma Tomatoes',
        category: 'Vegetables',
        variety: 'Roma Grade-A Export',
        quantity: 850,
        capacityMax: 1000,
        unit: 'kg',
        pricePerUnit: 27.45,
        mandiBenchmark: 23.00,
        harvestDate: '2026-09-09',
        location: 'Patil Farm Cold Storage #1',
        status: 'Available',
        color: '#E11D48', // Ruby Red
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 'F-CROP-102',
        name: 'Nashik Red Onions',
        category: 'Vegetables',
        variety: 'Piquant Red Export',
        quantity: 1200,
        capacityMax: 1500,
        unit: 'kg',
        pricePerUnit: 31.01,
        mandiBenchmark: 26.50,
        harvestDate: '2026-09-08',
        location: 'Ventilated Silo B',
        status: 'Available',
        color: '#9333EA', // Purple / Red Onion
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 'F-CROP-103',
        name: 'Kufri Jyoti Potatoes',
        category: 'Vegetables',
        variety: 'A-Grade Cleaned',
        quantity: 950,
        capacityMax: 1000,
        unit: 'kg',
        pricePerUnit: 24.55,
        mandiBenchmark: 21.00,
        harvestDate: '2026-09-07',
        location: 'Underground Cellar #4',
        status: 'Available',
        color: '#D97706', // Amber / Golden Potato
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 'F-CROP-104',
        name: 'Baby Leaf Spinach',
        category: 'Vegetables',
        variety: 'Hydroponic Tender',
        quantity: 280,
        capacityMax: 500,
        unit: 'kg',
        pricePerUnit: 35.00,
        mandiBenchmark: 28.00,
        harvestDate: '2026-09-10',
        location: 'Hydro Greenhouse Bay 2',
        status: 'Available',
        color: '#10B981', // Emerald Green
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80'
    }
];

let incomingOrders = [
    {
        id: 'ORD-WH-4101',
        buyer: 'Apex Agri-Wholesale (Vashi)',
        crop: 'Fresh Roma Tomatoes',
        quantity: 500,
        unit: 'kg',
        pricePerUnit: 27.45,
        totalAmount: 13725,
        route: 'Nashik to APMC Vashi (Reefer Freight)',
        orderDate: 'Today, 10:15 AM',
        status: 'Pending',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 'ORD-WH-4102',
        buyer: 'Kalyan Fresh Direct',
        crop: 'Nashik Red Onions',
        quantity: 400,
        unit: 'kg',
        pricePerUnit: 31.01,
        totalAmount: 12404,
        route: 'Nashik to Kalyan Hub',
        orderDate: 'Today, 09:30 AM',
        status: 'Pending',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 'ORD-WH-4088',
        buyer: 'Metro Cash & Carry',
        crop: 'Kufri Jyoti Potatoes',
        quantity: 600,
        unit: 'kg',
        pricePerUnit: 24.55,
        totalAmount: 14730,
        route: 'Nashik to Thane Depot',
        orderDate: 'Yesterday',
        status: 'Accepted',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 'ORD-WH-4075',
        buyer: 'GreenRoots Organics',
        crop: 'Baby Leaf Spinach',
        quantity: 150,
        unit: 'kg',
        pricePerUnit: 35.00,
        totalAmount: 5250,
        route: 'Nashik to Bandra West Kitchens',
        orderDate: '08 Sept 2026',
        status: 'Accepted',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 'ORD-WH-4050',
        buyer: 'Sahyadri Farmer Producer Co.',
        crop: 'Nashik Red Onions',
        quantity: 1000,
        unit: 'kg',
        pricePerUnit: 29.50,
        totalAmount: 29500,
        route: 'Nashik to Pune Agro-Park',
        orderDate: '05 Sept 2026',
        status: 'Completed',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80'
    }
];

let marketPrices = [
    { crop: 'Roma Tomatoes (Grade A)', mandi: 'APMC Vashi', rate: '₹23.00/kg', forageRate: '₹27.45/kg', trend: '+8.4%', direction: 'up' },
    { crop: 'Nashik Red Onions', mandi: 'Lasalgaon Mandi', rate: '₹26.50/kg', forageRate: '₹31.01/kg', trend: '+14.2%', direction: 'up' },
    { crop: 'Kufri Jyoti Potatoes', mandi: 'Pune Market Yard', rate: '₹21.00/kg', forageRate: '₹24.55/kg', trend: '+4.1%', direction: 'up' },
    { crop: 'Baby Spinach Leaves', mandi: 'Dadar Wholesale', rate: '₹28.00/kg', forageRate: '₹35.00/kg', trend: '+6.5%', direction: 'up' },
    { crop: 'Green Bell Peppers', mandi: 'Nashik Main', rate: '₹38.20/kg', forageRate: '₹44.00/kg', trend: '-1.5%', direction: 'down' }
];

let salesHistory = {
    '6m': [
        { month: 'Apr', sales: 48500, target: 45000 },
        { month: 'May', sales: 52000, target: 50000 },
        { month: 'Jun', sales: 44200, target: 48000 },
        { month: 'Jul', sales: 61800, target: 55000 },
        { month: 'Aug', sales: 68400, target: 60000 },
        { month: 'Sep (MTD)', sales: 67900, target: 65000 }
    ],
    '1y': [
        { month: 'Oct 25', sales: 41000, target: 40000 },
        { month: 'Nov 25', sales: 46200, target: 42000 },
        { month: 'Dec 25', sales: 39000, target: 40000 },
        { month: 'Jan 26', sales: 51200, target: 48000 },
        { month: 'Feb 26', sales: 47800, target: 46000 },
        { month: 'Mar 26', sales: 55400, target: 50000 },
        { month: 'Apr 26', sales: 48500, target: 45000 },
        { month: 'May 26', sales: 52000, target: 50000 },
        { month: 'Jun 26', sales: 44200, target: 48000 },
        { month: 'Jul 26', sales: 61800, target: 55000 },
        { month: 'Aug 26', sales: 68400, target: 60000 },
        { month: 'Sep 26', sales: 67900, target: 65000 }
    ]
};

// ==========================================================
// 2. STATE & INITIALIZATION
// ==========================================================

let currentSalesPeriod = '6m';
let currentDonutMode = 'volume'; // 'volume' or 'value'
let hoveredDonutSlice = null;
let currentCropFilter = 'all';
let currentOrderFilter = 'all';
let currentSimCropId = 'F-CROP-101';
let currentCropsViewMode = 'cards'; // 'cards' or 'table'
let isAudioPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    syncFarmerDataWithBackend();
    initNavigation();
    renderAllViews();
    initCharts();
    initSimulator();
    initModals();
    initVoiceAdvisor();
    initPresetChips();
});

// ==========================================================
// 3. NAVIGATION & VIEW ROUTING
// ==========================================================

function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', () => sidebar.classList.add('mobile-open'));
    }
    if (sidebarCloseBtn && sidebar) {
        sidebarCloseBtn.addEventListener('click', () => sidebar.classList.remove('mobile-open'));
    }

    // View mode toggle for crops: Cards vs Table
    const viewCardsBtn = document.getElementById('viewCardsBtn');
    const viewTableBtn = document.getElementById('viewTableBtn');
    const cropsGrid = document.getElementById('cropsVisualGrid');
    const cropsTableContainer = document.getElementById('cropsTableContainer');

    if (viewCardsBtn && viewTableBtn) {
        viewCardsBtn.addEventListener('click', () => {
            currentCropsViewMode = 'cards';
            viewCardsBtn.classList.add('active');
            viewTableBtn.classList.remove('active');
            if (cropsGrid) cropsGrid.style.display = 'grid';
            if (cropsTableContainer) cropsTableContainer.style.display = 'none';
        });

        viewTableBtn.addEventListener('click', () => {
            currentCropsViewMode = 'table';
            viewTableBtn.classList.add('active');
            viewCardsBtn.classList.remove('active');
            if (cropsGrid) cropsGrid.style.display = 'none';
            if (cropsTableContainer) cropsTableContainer.style.display = 'block';
        });
    }

    // Crop filter pills
    const cropFilterPills = document.querySelectorAll('.crop-filter-pill');
    cropFilterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            cropFilterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCropFilter = pill.getAttribute('data-filter');
            renderCrops();
        });
    });

    // Order filter buttons
    const orderFilterBtns = document.querySelectorAll('.o-tab-btn');
    orderFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            orderFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentOrderFilter = btn.getAttribute('data-filter');
            renderOrders();
        });
    });

    // Donut chart toggle: volume vs value
    const pieToggleBtns = document.querySelectorAll('.pie-toggle-btn');
    pieToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pieToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDonutMode = btn.getAttribute('data-mode');
            renderDonutChart();
        });
    });
}

function switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.spa-tab').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabId}`);
    const targetNav = document.querySelector(`.nav-tab-btn[data-tab="${tabId}"]`);

    if (targetTab) targetTab.classList.add('active');
    if (targetNav) targetNav.classList.add('active');

    // Update Titles
    const titleMap = {
        'dashboard': { title: 'Kisan Agricultural Hub', subtitle: 'Empowering farmers with direct shopkeeper sales, live mandi intelligence, and transparent earnings.' },
        'crops': { title: 'Harvest Listings & Crop Management', subtitle: 'Manage available batches, real-time farm-gate prices, and cold storage allotments.' },
        'orders': { title: 'Incoming Wholesale Purchase Orders', subtitle: 'Review contracts from verified shopkeepers and schedule freight dispatches.' },
        'inventory': { title: 'Farm Storage Silos & Capacity', subtitle: 'Real-time telemetry across temperature-controlled cold rooms and dry silos.' },
        'simulator': { title: 'Harvest Revenue & Profit Calculator', subtitle: 'Simulate volume and selling price to forecast earnings and buyer demand.' },
        'intelligence': { title: 'Market Intelligence & Mandi AI', subtitle: 'Daily price benchmarks, arrival surges, and conversational agronomist advisory.' }
    };

    if (titleMap[tabId]) {
        document.getElementById('pageTitle').textContent = titleMap[tabId].title;
        document.getElementById('pageSubtitle').textContent = titleMap[tabId].subtitle;
    }

    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');

    // Redraw canvases on tab show
    if (tabId === 'dashboard') {
        setTimeout(() => {
            renderSalesChart();
            renderDonutChart();
            renderPriceComparisonChart();
        }, 50);
    }
}

// ==========================================================
// 4. RENDERING VIEWS
// ==========================================================

function renderAllViews() {
    renderKPIs();
    renderCrops();
    renderOrders();
    renderInventory();
    renderMandiTicker();
    renderQuickOrdersList();
    renderSimCropChips();
}

function renderKPIs() {
    const totalHarvestKg = farmerCrops.reduce((sum, c) => sum + c.quantity, 0);
    const stockEl = document.getElementById('kpiAvailableStock');
    if (stockEl) stockEl.innerHTML = `${totalHarvestKg.toLocaleString()} <span class="unit">kg</span>`;

    const cropBadge = document.getElementById('sidebarCropsCount');
    if (cropBadge) cropBadge.textContent = farmerCrops.length;

    const pendingCount = incomingOrders.filter(o => o.status === 'Pending').length;
    const pendingBadge = document.getElementById('sidebarPendingOrders');
    if (pendingBadge) pendingBadge.textContent = `${pendingCount} New`;

    const bannerOrderCount = document.getElementById('bannerOrderCount');
    if (bannerOrderCount) bannerOrderCount.textContent = `${pendingCount} Urgent`;

    const filterCountEl = document.getElementById('cropFilterAllCount');
    if (filterCountEl) filterCountEl.textContent = farmerCrops.length;
}

// ==========================================================
// 5. CROP MANAGEMENT (VISUAL CARDS & TABLE)
// ==========================================================

function renderCrops() {
    renderCropsVisualGrid();
    renderCropsTable();
}

function renderCropsVisualGrid() {
    const grid = document.getElementById('cropsVisualGrid');
    if (!grid) return;

    let filtered = farmerCrops;
    if (currentCropFilter === 'high-margin') {
        filtered = farmerCrops.filter(c => (c.pricePerUnit - (c.mandiBenchmark || 20)) >= 4);
    } else if (currentCropFilter !== 'all') {
        filtered = farmerCrops.filter(c => c.category.toLowerCase().includes(currentCropFilter.toLowerCase()));
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">No crops found matching this filter.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(crop => {
        const pct = Math.round((crop.quantity / crop.capacityMax) * 100);
        const mandiDiff = (crop.pricePerUnit - (crop.mandiBenchmark || 22)).toFixed(2);
        const isUp = mandiDiff >= 0;

        return `
            <div class="crop-visual-card" data-id="${crop.id}">
                <div class="crop-card-img-wrap">
                    <img src="${crop.image}" alt="${crop.name}" class="crop-card-img" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'">
                    <span class="crop-card-category-tag">${crop.category}</span>
                    <span class="crop-card-status-pill">${crop.status}</span>
                </div>
                <div class="crop-card-body">
                    <div class="crop-card-title-row">
                        <strong>${crop.name}</strong>
                        <span>${crop.variety} • ${crop.location}</span>
                    </div>

                    <div class="crop-qty-meter">
                        <div class="meter-label-row">
                            <span>Storage Occupied:</span>
                            <strong>${crop.quantity.toLocaleString()} ${crop.unit} / ${crop.capacityMax} ${crop.unit} (${pct}%)</strong>
                        </div>
                        <div class="meter-track-mini">
                            <div class="meter-fill-mini" style="width: ${pct}%; background: ${crop.color || '#10B981'};"></div>
                        </div>
                    </div>

                    <div class="crop-card-price-row">
                        <div class="price-block">
                            <span class="p-label">Farm-Gate Rate:</span>
                            <span class="p-val">₹${crop.pricePerUnit.toFixed(2)}</span>
                            <span class="p-unit">/ ${crop.unit}</span>
                            <div style="font-size: 0.72rem; font-weight: 700; color: ${isUp ? '#059669' : '#DC2626'}; margin-top: 2px;">
                                ${isUp ? '▲ +' : '▼ -'}₹${Math.abs(mandiDiff)} vs Mandi
                            </div>
                        </div>
                        <div class="crop-card-actions">
                            <button type="button" class="btn-crop-edit-price" onclick="openEditPriceModal('${crop.id}')">
                                <i class="ph-bold ph-pencil-simple"></i> Edit
                            </button>
                            <button type="button" class="btn-crop-sell" onclick="openSimulatorForCrop('${crop.id}')">
                                <i class="ph-bold ph-rocket-launch"></i> Sell
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderCropsTable() {
    const tbody = document.getElementById('cropsTableBody');
    if (!tbody) return;

    let filtered = farmerCrops;
    if (currentCropFilter !== 'all') {
        filtered = farmerCrops.filter(c => c.category.toLowerCase().includes(currentCropFilter.toLowerCase()));
    }

    tbody.innerHTML = filtered.map(crop => {
        return `
            <tr>
                <td>
                    <div class="crop-cell-wrap">
                        <img src="${crop.image}" alt="${crop.name}" class="table-crop-img" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'">
                        <div>
                            <strong>${crop.name}</strong>
                            <div style="font-size: 0.74rem; color: var(--text-muted);">${crop.variety}</div>
                        </div>
                    </div>
                </td>
                <td><span class="status-pill accepted">${crop.category}</span></td>
                <td><strong>${crop.quantity.toLocaleString()} ${crop.unit}</strong></td>
                <td><strong style="color: var(--primary);">₹${crop.pricePerUnit.toFixed(2)}</strong> <span style="font-size: 0.75rem; color: var(--text-muted);">/ ${crop.unit}</span></td>
                <td>${crop.harvestDate}</td>
                <td>${crop.location}</td>
                <td><span class="status-pill available">${crop.status}</span></td>
                <td>
                    <div class="table-action-btns">
                        <button type="button" class="btn-table-view" onclick="openEditPriceModal('${crop.id}')">Price</button>
                        <button type="button" class="btn-table-accept" onclick="openSimulatorForCrop('${crop.id}')">Simulate</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ==========================================================
// 6. ORDER MANAGEMENT & QUICK LIST
// ==========================================================

function renderOrders() {
    const tbody = document.getElementById('farmerOrdersTableBody');
    const totalCountEl = document.getElementById('totalOrdersTabCount');
    if (totalCountEl) totalCountEl.textContent = incomingOrders.length;
    if (!tbody) return;

    let filtered = incomingOrders;
    if (currentOrderFilter !== 'all') {
        filtered = incomingOrders.filter(o => o.status === currentOrderFilter);
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);">No orders in "${currentOrderFilter}" status.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(order => {
        let statusBadge = `<span class="status-pill pending">Pending</span>`;
        if (order.status === 'Accepted') statusBadge = `<span class="status-pill accepted">Accepted & Packing</span>`;
        if (order.status === 'Completed') statusBadge = `<span class="status-pill completed">Completed</span>`;

        let actionButtons = '';
        if (order.status === 'Pending') {
            actionButtons = `
                <div class="table-action-btns">
                    <button type="button" class="btn-table-accept" onclick="acceptOrder('${order.id}')">Accept</button>
                    <button type="button" class="btn-table-reject" onclick="rejectOrder('${order.id}')">Decline</button>
                </div>
            `;
        } else if (order.status === 'Accepted') {
            actionButtons = `
                <div class="table-action-btns">
                    <button type="button" class="btn-table-view" onclick="completeOrder('${order.id}')">Dispatch & Complete</button>
                </div>
            `;
        } else {
            actionButtons = `<span style="font-size: 0.78rem; color: #059669; font-weight: 700;">✓ Dispatched</span>`;
        }

        return `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td><strong>${order.buyer}</strong></td>
                <td>
                    <div class="crop-cell-wrap">
                        <img src="${order.image}" alt="${order.crop}" class="table-crop-img" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'">
                        <span>${order.crop}</span>
                    </div>
                </td>
                <td>${order.quantity} ${order.unit}</td>
                <td><strong style="color: var(--primary);">₹${order.totalAmount.toLocaleString()}</strong></td>
                <td style="font-size: 0.78rem; color: var(--text-muted);">${order.route}</td>
                <td>${statusBadge}</td>
                <td>${actionButtons}</td>
            </tr>
        `;
    }).join('');
}

function renderQuickOrdersList() {
    const list = document.getElementById('quickOrdersList');
    if (!list) return;

    const pending = incomingOrders.filter(o => o.status === 'Pending').slice(0, 3);
    if (pending.length === 0) {
        list.innerHTML = `<div style="text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: 0.85rem;">All incoming orders reviewed! Great job! 🎉</div>`;
        return;
    }

    list.innerHTML = pending.map(order => {
        return `
            <div class="quick-order-row">
                <div class="order-crop-thumb-wrap">
                    <img src="${order.image}" alt="${order.crop}" class="order-crop-img" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'">
                    <div class="order-row-info">
                        <strong>${order.crop} (${order.quantity} ${order.unit})</strong>
                        <span>Buyer: ${order.buyer} • ${order.orderDate}</span>
                    </div>
                </div>
                <div class="order-row-amount">
                    <span class="amount">₹${order.totalAmount.toLocaleString()}</span>
                    <div class="order-row-actions">
                        <button type="button" class="btn-quick-accept" onclick="acceptOrder('${order.id}')">Accept</button>
                        <button type="button" class="btn-quick-reject" onclick="rejectOrder('${order.id}')">Decline</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function acceptOrder(orderId) {
    const order = incomingOrders.find(o => o.id === orderId);
    if (!order) return;
    order.status = 'Accepted';
    
    // Trigger celebration confetti!
    triggerCelebration();
    
    renderKPIs();
    renderOrders();
    renderQuickOrdersList();
    showToast(`🎉 Order ${orderId} Accepted! ₹${order.totalAmount.toLocaleString()} locked in.`);
}

function rejectOrder(orderId) {
    const idx = incomingOrders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
        incomingOrders.splice(idx, 1);
        renderKPIs();
        renderOrders();
        renderQuickOrdersList();
        showToast(`Order ${orderId} declined.`);
    }
}

function completeOrder(orderId) {
    const order = incomingOrders.find(o => o.id === orderId);
    if (!order) return;
    order.status = 'Completed';
    triggerCelebration();
    renderOrders();
    showToast(`Batch ${orderId} marked dispatched and completed! 🚚`);
}

// ==========================================================
// 7. INVENTORY / STORAGE SILO VISUALIZER
// ==========================================================

function renderInventory() {
    const grid = document.getElementById('capacityBarsGrid');
    if (!grid) return;

    grid.innerHTML = farmerCrops.map(crop => {
        const pct = Math.round((crop.quantity / crop.capacityMax) * 100);
        return `
            <div class="silo-card">
                <div class="silo-top-row">
                    <img src="${crop.image}" alt="${crop.name}" class="silo-crop-img" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'">
                    <div class="silo-info">
                        <strong>${crop.name}</strong>
                        <span>${crop.location}</span>
                    </div>
                </div>
                <div class="silo-progress-wrap">
                    <div class="silo-stat-labels">
                        <span>Current Stock: <strong>${crop.quantity.toLocaleString()} ${crop.unit}</strong></span>
                        <span>Capacity: <strong>${crop.capacityMax.toLocaleString()} ${crop.unit}</strong></span>
                    </div>
                    <div class="silo-track">
                        <div class="silo-fill" style="width: ${pct}%; background: ${crop.color || '#10B981'};"></div>
                    </div>
                </div>
                <div class="silo-meta-tags">
                    <span class="silo-tag">${pct}% Filled</span>
                    <span class="silo-tag">Temp: 14.5°C Controlled</span>
                    <span class="silo-tag">Moisture: 68%</span>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================================
// 8. MANDI TICKER
// ==========================================================

function renderMandiTicker() {
    const list = document.getElementById('mandiPricesList');
    if (!list) return;

    list.innerHTML = marketPrices.map(item => {
        return `
            <div class="mandi-price-row">
                <div class="mandi-crop-info">
                    <strong>${item.crop}</strong>
                    <span>Yard: ${item.mandi} • APMC: ${item.rate}</span>
                </div>
                <div>
                    <div class="mandi-price-val">${item.forageRate}</div>
                    <div class="mandi-trend-tag ${item.direction}">
                        ${item.direction === 'up' ? '▲' : '▼'} ${item.trend} vs mandi
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================================
// 9. PIE / DONUT CHART ENGINE (VANILLA HTML5 CANVAS)
// ==========================================================

function initCharts() {
    renderSalesChart();
    renderDonutChart();
    renderPriceComparisonChart();

    // Resize handlers
    window.addEventListener('resize', () => {
        renderSalesChart();
        renderDonutChart();
        renderPriceComparisonChart();
    });

    // Chart filter 6m / 1y
    document.querySelectorAll('.chart-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.chart-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSalesPeriod = btn.getAttribute('data-period');
            renderSalesChart();
        });
    });
}

function renderDonutChart() {
    const canvas = document.getElementById('cropDonutCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 300;
    const height = 300;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    // Calculate totals
    const isVolume = currentDonutMode === 'volume';
    let total = 0;
    const slices = farmerCrops.map(crop => {
        const value = isVolume ? crop.quantity : Math.round(crop.quantity * crop.pricePerUnit);
        total += value;
        return {
            id: crop.id,
            name: crop.name,
            value: value,
            unit: isVolume ? crop.unit : '₹',
            color: crop.color || '#10B981',
            crop: crop
        };
    });

    // Update center readout
    const totalValEl = document.getElementById('donutTotalVal');
    const totalCapEl = document.getElementById('donutTotalCap');
    if (totalValEl) {
        totalValEl.textContent = isVolume ? `${total.toLocaleString()} kg` : `₹${total.toLocaleString()}`;
    }
    if (totalCapEl) {
        totalCapEl.textContent = isVolume ? 'Total Harvest' : 'Stock Value';
    }

    // Draw donut arcs
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = 110;
    const innerRadius = 72;

    let startAngle = -Math.PI / 2;

    slices.forEach((slice, idx) => {
        const sliceAngle = (slice.value / total) * (Math.PI * 2);
        const endAngle = startAngle + sliceAngle;

        slice.startAngle = startAngle;
        slice.endAngle = endAngle;

        const isHovered = hoveredDonutSlice === slice.id;
        const currentOuter = isHovered ? outerRadius + 8 : outerRadius;
        const currentInner = isHovered ? innerRadius - 2 : innerRadius;

        ctx.beginPath();
        ctx.arc(centerX, centerY, currentOuter, startAngle, endAngle, false);
        ctx.arc(centerX, centerY, currentInner, endAngle, startAngle, true);
        ctx.closePath();

        ctx.fillStyle = slice.color;
        ctx.fill();

        // Slice separation border
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();

        startAngle = endAngle;
    });

    // Render legend list beside the chart
    renderDonutLegend(slices, total, isVolume);

    // Attach interactive hover
    canvas.onmousemove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let angle = Math.atan2(dy, dx);
        if (angle < -Math.PI / 2) angle += Math.PI * 2;

        let found = null;
        if (dist >= innerRadius - 5 && dist <= outerRadius + 12) {
            slices.forEach(slice => {
                let s = slice.startAngle;
                let end = slice.endAngle;
                if (angle >= s && angle <= end) {
                    found = slice;
                }
            });
        }

        const tooltip = document.getElementById('donutTooltip');
        if (found) {
            hoveredDonutSlice = found.id;
            canvas.style.cursor = 'pointer';
            if (tooltip) {
                const pct = Math.round((found.value / total) * 100);
                tooltip.style.display = 'block';
                tooltip.style.left = `${mouseX + 10}px`;
                tooltip.style.top = `${mouseY - 20}px`;
                tooltip.innerHTML = `<strong>${found.name}</strong>: ${isVolume ? found.value.toLocaleString() + ' kg' : '₹' + found.value.toLocaleString()} (${pct}%)`;
            }
        } else {
            hoveredDonutSlice = null;
            canvas.style.cursor = 'default';
            if (tooltip) tooltip.style.display = 'none';
        }
        renderDonutChartArcsOnly(ctx, width, height, centerX, centerY, outerRadius, innerRadius, slices, total);
    };

    canvas.onmouseleave = () => {
        hoveredDonutSlice = null;
        const tooltip = document.getElementById('donutTooltip');
        if (tooltip) tooltip.style.display = 'none';
        renderDonutChartArcsOnly(ctx, width, height, centerX, centerY, outerRadius, innerRadius, slices, total);
    };
}

function renderDonutChartArcsOnly(ctx, width, height, centerX, centerY, outerRadius, innerRadius, slices, total) {
    ctx.clearRect(0, 0, width, height);

    slices.forEach((slice) => {
        const isHovered = hoveredDonutSlice === slice.id;
        const currentOuter = isHovered ? outerRadius + 8 : outerRadius;
        const currentInner = isHovered ? innerRadius - 2 : innerRadius;

        ctx.beginPath();
        ctx.arc(centerX, centerY, currentOuter, slice.startAngle, slice.endAngle, false);
        ctx.arc(centerX, centerY, currentInner, slice.endAngle, slice.startAngle, true);
        ctx.closePath();

        ctx.fillStyle = slice.color;
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    });
}

function renderDonutLegend(slices, total, isVolume) {
    const list = document.getElementById('donutLegendList');
    if (!list) return;

    list.innerHTML = slices.map(slice => {
        const pct = Math.round((slice.value / total) * 100);
        return `
            <div class="legend-card-row" onmouseenter="hoverDonutFromLegend('${slice.id}')" onmouseleave="leaveDonutFromLegend()">
                <div class="legend-card-left">
                    <span class="legend-dot" style="background: ${slice.color};"></span>
                    <span class="legend-crop-title">${slice.name}</span>
                </div>
                <div class="legend-card-right">
                    <span class="legend-qty">${isVolume ? slice.value.toLocaleString() + ' kg' : '₹' + slice.value.toLocaleString()}</span>
                    <span class="legend-pct-pill">${pct}%</span>
                </div>
            </div>
        `;
    }).join('');
}

window.hoverDonutFromLegend = function(cropId) {
    hoveredDonutSlice = cropId;
    renderDonutChart();
};

window.leaveDonutFromLegend = function() {
    hoveredDonutSlice = null;
    renderDonutChart();
};

// ==========================================================
// 10. PRICE ADVANTAGE COMPARISON BAR GRAPH (VANILLA CANVAS)
// ==========================================================

function renderPriceComparisonChart() {
    const canvas = document.getElementById('priceBarCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 460;
    const height = 240;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const padding = { top: 35, right: 25, bottom: 45, left: 45 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const data = farmerCrops;
    const groupCount = data.length;
    const groupWidth = chartW / groupCount;
    const barWidth = Math.min(24, (groupWidth - 20) / 2);

    const maxPrice = 45; // baseline ceiling

    // Draw horizontal grid lines
    ctx.strokeStyle = 'rgba(24, 58, 43, 0.06)';
    ctx.lineWidth = 1;
    for (let p = 0; p <= maxPrice; p += 10) {
        const y = padding.top + chartH - (p / maxPrice) * chartH;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();

        ctx.fillStyle = '#8A908A';
        ctx.font = '11px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`₹${p}`, padding.left - 8, y + 4);
    }

    // Draw Bars
    data.forEach((crop, i) => {
        const groupX = padding.left + i * groupWidth + (groupWidth - barWidth * 2 - 8) / 2;
        const mandiRate = crop.mandiBenchmark || 22;
        const forageRate = crop.pricePerUnit;

        const mandiH = (mandiRate / maxPrice) * chartH;
        const forageH = (forageRate / maxPrice) * chartH;

        const mandiY = padding.top + chartH - mandiH;
        const forageY = padding.top + chartH - forageH;

        // 1. Mandi Bar (Gray)
        ctx.fillStyle = '#94A3B8';
        ctx.beginPath();
        ctx.roundRect(groupX, mandiY, barWidth, mandiH, [4, 4, 0, 0]);
        ctx.fill();

        // 2. Forage Bar (Emerald)
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.roundRect(groupX + barWidth + 6, forageY, barWidth, forageH, [4, 4, 0, 0]);
        ctx.fill();

        // Top callout pill: extra profit
        const extra = (forageRate - mandiRate).toFixed(1);
        ctx.fillStyle = '#065F46';
        ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`+₹${extra}`, groupX + barWidth + 3, forageY - 8);

        // Crop label at bottom
        ctx.fillStyle = '#1A1C1A';
        ctx.font = '600 11px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        const shortName = crop.name.split(' ')[1] || crop.name;
        ctx.fillText(shortName, groupX + barWidth + 3, height - padding.bottom + 18);
    });
}

// ==========================================================
// 11. SALES TRAJECTORY LINE CHART (VANILLA HTML5 CANVAS)
// ==========================================================

function renderSalesChart() {
    const canvas = document.getElementById('salesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 950;
    const height = 280;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const historyData = salesHistory[currentSalesPeriod] || salesHistory['6m'];
    const padding = { top: 30, right: 30, bottom: 40, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxSales = Math.max(...historyData.map(d => Math.max(d.sales, d.target))) * 1.15;
    const minSales = 30000;

    // Draw horizontal grid lines
    ctx.strokeStyle = 'rgba(24, 58, 43, 0.06)';
    ctx.lineWidth = 1;
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
        const val = minSales + ((maxSales - minSales) / gridSteps) * i;
        const y = padding.top + chartH - (i / gridSteps) * chartH;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();

        ctx.fillStyle = '#8A908A';
        ctx.font = '11px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`₹${Math.round(val / 1000)}k`, padding.left - 10, y + 4);
    }

    const getX = idx => padding.left + (idx / (historyData.length - 1)) * chartW;
    const getY = val => padding.top + chartH - ((val - minSales) / (maxSales - minSales)) * chartH;

    // 1. Draw Target Line (Dashed Slate)
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2;
    historyData.forEach((d, i) => {
        const x = getX(i);
        const y = getY(d.target);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // 2. Draw Sales Gradient Area
    ctx.beginPath();
    historyData.forEach((d, i) => {
        const x = getX(i);
        const y = getY(d.sales);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.lineTo(getX(historyData.length - 1), padding.top + chartH);
    ctx.lineTo(getX(0), padding.top + chartH);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // 3. Draw Sales Line
    ctx.beginPath();
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    historyData.forEach((d, i) => {
        const x = getX(i);
        const y = getY(d.sales);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 4. Draw Sales Dots & Month Labels
    historyData.forEach((d, i) => {
        const x = getX(i);
        const y = getY(d.sales);

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#1A1C1A';
        ctx.font = '600 11px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.month, x, height - padding.bottom + 18);
    });

    // Hover Tooltip on Sales Canvas
    canvas.onmousemove = (e) => {
        const mouseX = e.offsetX;
        let nearest = null;
        let nearestDist = Infinity;

        historyData.forEach((d, i) => {
            const x = getX(i);
            const dist = Math.abs(x - mouseX);
            if (dist < nearestDist && dist < 45) {
                nearestDist = dist;
                nearest = { ...d, x: x, y: getY(d.sales) };
            }
        });

        const tooltip = document.getElementById('chartTooltip');
        if (nearest && tooltip) {
            tooltip.style.display = 'block';
            tooltip.style.left = `${nearest.x}px`;
            tooltip.style.top = `${nearest.y - 45}px`;
            tooltip.innerHTML = `<strong>${nearest.month}</strong>: ₹${nearest.sales.toLocaleString()} <span style="color:#94A3B8;">(Target: ₹${nearest.target.toLocaleString()})</span>`;
        } else if (tooltip) {
            tooltip.style.display = 'none';
        }
    };

    canvas.onmouseleave = () => {
        const tooltip = document.getElementById('chartTooltip');
        if (tooltip) tooltip.style.display = 'none';
    };
}

// ==========================================================
// 12. INTERACTIVE PROFIT SIMULATOR
// ==========================================================

function initSimulator() {
    renderSimCropChips();

    const qtySlider = document.getElementById('simQtySlider');
    const priceSlider = document.getElementById('simPriceSlider');
    const publishBtn = document.getElementById('btnPublishSimBatch');

    if (qtySlider) {
        qtySlider.addEventListener('input', updateSimulatorCalculations);
    }
    if (priceSlider) {
        priceSlider.addEventListener('input', updateSimulatorCalculations);
    }
    if (publishBtn) {
        publishBtn.addEventListener('click', publishSimulatedBatch);
    }

    updateSimulatorCalculations();
}

function renderSimCropChips() {
    const container = document.getElementById('simCropChips');
    if (!container) return;

    container.innerHTML = farmerCrops.map(crop => {
        const isActive = crop.id === currentSimCropId ? 'active' : '';
        return `
            <button type="button" class="sim-chip-btn ${isActive}" onclick="selectSimCrop('${crop.id}')">
                <img src="${crop.image}" alt="${crop.name}" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'">
                <span>${crop.name.split(' ')[1] || crop.name}</span>
            </button>
        `;
    }).join('');
}

window.selectSimCrop = function(cropId) {
    currentSimCropId = cropId;
    renderSimCropChips();

    const crop = farmerCrops.find(c => c.id === cropId);
    if (crop) {
        const priceSlider = document.getElementById('simPriceSlider');
        if (priceSlider) priceSlider.value = crop.pricePerUnit;
    }
    updateSimulatorCalculations();
};

window.openSimulatorForCrop = function(cropId) {
    selectSimCrop(cropId);
    switchTab('simulator');
};

function updateSimulatorCalculations() {
    const qtySlider = document.getElementById('simQtySlider');
    const priceSlider = document.getElementById('simPriceSlider');
    if (!qtySlider || !priceSlider) return;

    const qty = parseInt(qtySlider.value, 10);
    const price = parseFloat(priceSlider.value);

    // Displays
    const qtyDisplay = document.getElementById('simQtyDisplay');
    const priceDisplay = document.getElementById('simPriceDisplay');
    const btnPriceTag = document.getElementById('btnSimPriceTag');
    if (qtyDisplay) qtyDisplay.textContent = `${qty.toLocaleString()} kg`;
    if (priceDisplay) priceDisplay.textContent = `₹${price.toFixed(2)} / kg`;
    if (btnPriceTag) btnPriceTag.textContent = `₹${price.toFixed(2)}/kg`;

    const crop = farmerCrops.find(c => c.id === currentSimCropId) || farmerCrops[0];
    const mandiRate = crop.mandiBenchmark || (crop.pricePerUnit * 0.82);

    const projectedTotal = Math.round(qty * price);
    const mandiTotal = Math.round(qty * mandiRate);
    const bonusProfit = Math.max(0, projectedTotal - mandiTotal);

    const projTotalEl = document.getElementById('simProjectedTotal');
    const mandiTotalEl = document.getElementById('simMandiTotal');
    const mandiRateEl = document.getElementById('simMandiRate');
    const forageTotalEl = document.getElementById('simForageTotal');
    const forageRateEl = document.getElementById('simForageRate');
    const bonusProfitText = document.getElementById('simBonusProfitText');

    if (projTotalEl) projTotalEl.textContent = `₹${projectedTotal.toLocaleString()}`;
    if (mandiTotalEl) mandiTotalEl.textContent = `₹${mandiTotal.toLocaleString()}`;
    if (mandiRateEl) mandiRateEl.textContent = `@ ₹${mandiRate.toFixed(2)}/kg`;
    if (forageTotalEl) forageTotalEl.textContent = `₹${projectedTotal.toLocaleString()}`;
    if (forageRateEl) forageRateEl.textContent = `@ ₹${price.toFixed(2)}/kg`;
    if (bonusProfitText) bonusProfitText.textContent = `+₹${bonusProfit.toLocaleString()} Extra Pure Profit!`;

    // Buyer Demand rating calculation
    // Lower price = higher demand; sweet spot = +10% over mandi
    const ratio = price / mandiRate;
    let demandPct = 95;
    let demandText = '🔥 Very High Demand: 96% chance to receive purchase bid within 12 hours!';

    if (ratio > 1.45) {
        demandPct = 42;
        demandText = '⚠️ Lower Demand: Price is high. Expect 3–5 days to match buyer.';
    } else if (ratio > 1.25) {
        demandPct = 70;
        demandText = '⚡ Moderate Demand: Balanced pricing. High probability in 48 hours.';
    } else if (ratio > 1.1) {
        demandPct = 88;
        demandText = '🔥 High Demand: 90% chance to match with restaurant / supermarket buyers!';
    }

    const demandBar = document.getElementById('simDemandBar');
    const demandPercent = document.getElementById('simDemandPercent');
    const demandDesc = document.getElementById('simDemandDesc');

    if (demandBar) demandBar.style.width = `${demandPct}%`;
    if (demandPercent) demandPercent.textContent = `${demandPct}% (${demandPct >= 80 ? 'Very High' : demandPct >= 65 ? 'High' : 'Moderate'})`;
    if (demandDesc) demandDesc.textContent = demandText;
}

function publishSimulatedBatch() {
    const qtySlider = document.getElementById('simQtySlider');
    const priceSlider = document.getElementById('simPriceSlider');
    const qty = parseInt(qtySlider.value, 10);
    const price = parseFloat(priceSlider.value);
    const crop = farmerCrops.find(c => c.id === currentSimCropId) || farmerCrops[0];

    // Create a new simulated batch or add quantity
    const newBatch = {
        id: `F-CROP-${Date.now().toString().slice(-4)}`,
        name: `${crop.name} (Simulated Lot)`,
        category: crop.category,
        variety: crop.variety,
        quantity: qty,
        capacityMax: Math.round(qty * 1.2),
        unit: 'kg',
        pricePerUnit: price,
        mandiBenchmark: crop.mandiBenchmark,
        harvestDate: new Date().toISOString().split('T')[0],
        location: crop.location,
        status: 'Available',
        color: crop.color,
        image: crop.image
    };

    farmerCrops.unshift(newBatch);

    triggerCelebration();
    renderAllViews();
    renderDonutChart();
    renderPriceComparisonChart();
    showToast(`🚀 Success! New batch of ${newBatch.name} published at ₹${price}/kg!`);

    setTimeout(() => {
        switchTab('crops');
    }, 1200);
}

// ==========================================================
// 13. CONFETTI CELEBRATION ENGINE
// ==========================================================

function triggerCelebration() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#10B981', '#34D399', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];
    const particles = [];

    for (let i = 0; i < 75; i++) {
        particles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 14,
            vy: (Math.random() - 0.8) * 16,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 12,
            alpha: 1
        });
    }

    let frames = 0;
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frames++;

        let stillActive = false;
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // gravity
            p.rotation += p.vRot;
            p.alpha -= 0.012;

            if (p.alpha > 0) {
                stillActive = true;
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }
        });

        if (stillActive && frames < 120) {
            requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    requestAnimationFrame(animateConfetti);
}

// ==========================================================
// 14. VOICE ADVISOR (TEXT-TO-SPEECH)
// ==========================================================

function initVoiceAdvisor() {
    const playBtn = document.getElementById('btnPlayVoiceAdvice');
    if (!playBtn) return;

    playBtn.addEventListener('click', () => {
        if (isAudioPlaying) {
            window.speechSynthesis.cancel();
            isAudioPlaying = false;
            playBtn.classList.remove('playing');
            document.getElementById('voiceBtnText').textContent = 'Listen (Awaaz Se Suno)';
            return;
        }

        const adviceText = "Namaste Ramesh ji! Tomato wholesale prices have surged 8.4 percent today in the Mumbai and Pune APMC yards. We strongly recommend adjusting your Roma Tomato rate to 30 rupees and 50 paise per kilo. Also, the Nashik valley has four clear sunny harvesting days ahead. Optimal timing to gather your red onions!";

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(adviceText);
            utterance.rate = 0.95;
            utterance.pitch = 1.0;

            utterance.onstart = () => {
                isAudioPlaying = true;
                playBtn.classList.add('playing');
                document.getElementById('voiceBtnText').textContent = 'Playing Audio...';
            };

            utterance.onend = () => {
                isAudioPlaying = false;
                playBtn.classList.remove('playing');
                document.getElementById('voiceBtnText').textContent = 'Listen (Awaaz Se Suno)';
            };

            utterance.onerror = () => {
                isAudioPlaying = false;
                playBtn.classList.remove('playing');
                document.getElementById('voiceBtnText').textContent = 'Listen (Awaaz Se Suno)';
            };

            window.speechSynthesis.speak(utterance);
        } else {
            showToast('Voice playback is not supported on this browser.');
        }
    });
}

// ==========================================================
// 15. MODALS & PRESET CHIPS
// ==========================================================

function initModals() {
    // Add Crop Modal
    const addModal = document.getElementById('addCropModal');
    const openAddBtn = document.getElementById('openAddCropModalBtn');
    const topAddBtn = document.getElementById('topAddCropBtn');
    const bannerAddBtn = document.getElementById('bannerAddCropBtn');
    const closeAddBtn = document.getElementById('closeAddCropModal');
    const cancelAddBtn = document.getElementById('cancelAddCropBtn');
    const addForm = document.getElementById('addCropForm');

    const openAdd = () => {
        if (addModal) {
            addModal.classList.add('active');
            const dateInput = document.getElementById('newCropHarvestDate');
            if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        }
    };
    const closeAdd = () => {
        if (addModal) addModal.classList.remove('active');
    };

    if (openAddBtn) openAddBtn.addEventListener('click', openAdd);
    if (topAddBtn) topAddBtn.addEventListener('click', openAdd);
    if (bannerAddBtn) bannerAddBtn.addEventListener('click', openAdd);
    if (closeAddBtn) closeAddBtn.addEventListener('click', closeAdd);
    if (cancelAddBtn) cancelAddBtn.addEventListener('click', closeAdd);

    if (addForm) {
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('newCropName').value;
            const category = document.getElementById('newCropCategory').value;
            const quantity = parseInt(document.getElementById('newCropQty').value, 10);
            const unit = document.getElementById('newCropUnit').value;
            const price = parseFloat(document.getElementById('newCropPrice').value);
            const harvestDate = document.getElementById('newCropHarvestDate').value;
            const location = document.getElementById('newCropLocation').value;
            const image = document.getElementById('newCropImage').value || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80';

            const newCrop = {
                id: `F-CROP-${Date.now().toString().slice(-4)}`,
                name,
                category,
                variety: 'Certified Fresh',
                quantity,
                capacityMax: Math.round(quantity * 1.25),
                unit,
                pricePerUnit: price,
                mandiBenchmark: Math.round(price * 0.85),
                harvestDate,
                location,
                status: 'Available',
                color: category === 'Vegetables' ? '#10B981' : category === 'Fruits' ? '#F59E0B' : '#8B5CF6',
                image
            };

            farmerCrops.unshift(newCrop);
            fetch(`${API_BASE}/listings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCrop) }).catch(() => {});
            triggerCelebration();
            closeAdd();
            renderAllViews();
            renderDonutChart();
            renderPriceComparisonChart();
            showToast(`🌱 Success! "${name}" added to active harvest listings!`);
        });
    }

    // Edit Price Modal
    const editPriceModal = document.getElementById('editPriceModal');
    const closeEditPriceBtn = document.getElementById('closeEditPriceModal');
    const cancelEditPriceBtn = document.getElementById('cancelEditPriceBtn');
    const editPriceForm = document.getElementById('editPriceForm');

    const closeEdit = () => {
        if (editPriceModal) editPriceModal.classList.remove('active');
    };

    if (closeEditPriceBtn) closeEditPriceBtn.addEventListener('click', closeEdit);
    if (cancelEditPriceBtn) cancelEditPriceBtn.addEventListener('click', closeEdit);

    if (editPriceForm) {
        editPriceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cropId = document.getElementById('editPriceCropId').value;
            const newPrice = parseFloat(document.getElementById('editPriceInput').value);

            const crop = farmerCrops.find(c => c.id === cropId);
            if (crop) {
                crop.pricePerUnit = newPrice;
                closeEdit();
                renderCrops();
                renderPriceComparisonChart();
                renderDonutChart();
                updateSimulatorCalculations();
                showToast(`✅ Price for "${crop.name}" updated to ₹${newPrice.toFixed(2)}/kg!`);
            }
        });
    }
}

window.openEditPriceModal = function(cropId) {
    const crop = farmerCrops.find(c => c.id === cropId);
    if (!crop) return;

    const modal = document.getElementById('editPriceModal');
    const nameEl = document.getElementById('editPriceCropName');
    const inputEl = document.getElementById('editPriceInput');
    const idEl = document.getElementById('editPriceCropId');
    const refEl = document.getElementById('editPriceMandiRef');

    if (idEl) idEl.value = crop.id;
    if (nameEl) nameEl.textContent = `Updating farm-gate rate for ${crop.name}`;
    if (inputEl) inputEl.value = crop.pricePerUnit;
    if (refEl) {
        refEl.innerHTML = `<span>Current APMC Benchmark: <strong>₹${(crop.mandiBenchmark || 22).toFixed(2)}/kg</strong></span>`;
    }

    if (modal) modal.classList.add('active');
};

function initPresetChips() {
    const chips = document.querySelectorAll('.preset-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const name = chip.getAttribute('data-crop');
            const cat = chip.getAttribute('data-category');
            const price = chip.getAttribute('data-price');
            const img = chip.getAttribute('data-img');

            const nameInput = document.getElementById('newCropName');
            const catInput = document.getElementById('newCropCategory');
            const priceInput = document.getElementById('newCropPrice');
            const imgInput = document.getElementById('newCropImage');

            if (nameInput) nameInput.value = name;
            if (catInput) catInput.value = cat;
            if (priceInput) priceInput.value = price;
            if (imgInput) imgInput.value = img;
        });
    });
}

// AI CHAT SUBMIT
const chatForm = document.getElementById('farmerChatForm');
if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('farmerChatInput');
        const query = input.value.trim();
        if (!query) return;

        appendChatMessage('user', query);
        input.value = '';

        setTimeout(() => {
            const aiResponse = generateAIResponse(query);
            appendChatMessage('assistant', aiResponse);
        }, 600);
    });
}

// PROMPT CHIPS
document.querySelectorAll('.f-prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        const input = document.getElementById('farmerChatInput');
        if (input) {
            input.value = prompt;
            chatForm.dispatchEvent(new Event('submit'));
        }
    });
});

function appendChatMessage(sender, text) {
    const chatBody = document.getElementById('farmerChatBody');
    if (!chatBody) return;

    const div = document.createElement('div');
    div.className = `ai-msg-bubble ${sender}`;

    if (sender === 'assistant') {
        div.innerHTML = `
            <div class="ai-bubble-avatar"><i class="ph-fill ph-sparkle"></i></div>
            <div class="ai-bubble-text">${text}</div>
        `;
    } else {
        div.innerHTML = `<div class="ai-bubble-text"><p>${text}</p></div>`;
    }

    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function generateAIResponse(q) {
    const l = q.toLowerCase();
    if (l.includes('tomato') || l.includes('price')) {
        return `<p>Tomatoes are currently commanding a <strong>+8.4% premium in Vashi wholesale yard</strong>. You can safely price your Roma export crop at <strong>₹30.50/kg</strong>. Shopkeeper demand is high due to festival arrivals.</p>`;
    } else if (l.includes('onion')) {
        return `<p>Onion arrivals in Lasalgaon have tightened slightly. Anticipate prices staying firm between <strong>₹31.00 and ₹33.50/kg</strong> for the next 7 days. Excellent time to dispatch dry lots.</p>`;
    } else if (l.includes('potato') || l.includes('harvest')) {
        return `<p>Kufri Jyoti potatoes in your underground cellar #4 have optimal skin maturity. With dry weather forecasted for 4 days, early harvest packaging will preserve grade-A value.</p>`;
    } else {
        return `<p>Based on today's APMC price curves and transit logs, your farm portfolio has a <strong>strong direct buyer margin (+₹4.60/kg average)</strong>. Let me know if you want price forecasts for specific produce!</p>`;
    }
}

// TOAST HELPER
function showToast(msg) {
    let toast = document.getElementById('farmerToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'farmerToast';
        toast.style.cssText = `
            position: fixed; bottom: 25px; right: 25px; z-index: 10000;
            background: #0B1D15; color: #FFFFFF; padding: 0.85rem 1.4rem;
            border-radius: 12px; font-size: 0.88rem; font-weight: 700;
            box-shadow: 0 10px 25px rgba(0,0,0,0.25); border: 1px solid rgba(16, 185, 129, 0.4);
            display: flex; align-items: center; gap: 0.5rem; transition: opacity 0.3s ease;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 3500);
}
