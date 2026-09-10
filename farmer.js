/**
 * FORAGE FARMER COMMAND CENTER
 * Frontend Architecture & Mock Data Store
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
        harvestDate: '2026-09-09',
        location: 'Patil Farm Cold Storage #1',
        status: 'Available'
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
        harvestDate: '2026-09-08',
        location: 'Ventilated Silo B',
        status: 'Available'
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
        harvestDate: '2026-09-07',
        location: 'Underground Cellar #4',
        status: 'Available'
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
        harvestDate: '2026-09-10',
        location: 'Hydro Greenhouse Bay 2',
        status: 'Available'
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
        status: 'Pending' // Actions: Accept, Reject, Mark as Completed
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
        status: 'Pending'
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
        status: 'Accepted'
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
        status: 'Accepted'
    },
    {
        id: 'ORD-WH-4050',
        buyer: 'Sahyadri Farmer Consortium',
        crop: 'Fresh Roma Tomatoes',
        quantity: 1000,
        unit: 'kg',
        pricePerUnit: 26.00,
        totalAmount: 26000,
        route: 'Nashik to Pune Central',
        orderDate: '05 Sept 2026',
        status: 'Completed'
    }
];

let marketPrices = [
    { crop: 'Tomatoes (Roma)', mandi: 'APMC Vashi', currentPrice: 32.01, changePct: 8.4, isUp: true, state: 'Bullish' },
    { crop: 'Onions (Red)', mandi: 'Nashik Mandi', currentPrice: 35.67, changePct: 14.2, isUp: true, state: 'Supply constrained' },
    { crop: 'Potatoes (Kufri)', mandi: 'Pune Market', currentPrice: 28.30, changePct: -1.5, isUp: false, state: 'Stable arrivals' },
    { crop: 'Carrots (Local)', mandi: 'Ahmedabad APMC', currentPrice: 52.95, changePct: 4.6, isUp: true, state: 'High quality' },
    { crop: 'Baby Spinach', mandi: 'Mumbai Dadar', currentPrice: 48.00, changePct: 11.0, isUp: true, state: 'Perishable premium' }
];

let salesHistory = {
    '6m': [
        { month: 'Apr', revenue: 38000, target: 35000 },
        { month: 'May', revenue: 46000, target: 40000 },
        { month: 'Jun', revenue: 52000, target: 48000 },
        { month: 'Jul', revenue: 64000, target: 55000 },
        { month: 'Aug', revenue: 69800, target: 60000 },
        { month: 'Sep', revenue: 73000, target: 65000 }
    ],
    '1y': [
        { month: 'Oct 25', revenue: 28000, target: 25000 },
        { month: 'Nov 25', revenue: 32000, target: 30000 },
        { month: 'Dec 25', revenue: 34000, target: 32000 },
        { month: 'Jan 26', revenue: 41000, target: 35000 },
        { month: 'Feb 26', revenue: 44000, target: 38000 },
        { month: 'Mar 26', revenue: 49000, target: 40000 },
        { month: 'Apr 26', revenue: 52000, target: 45000 },
        { month: 'May 26', revenue: 58000, target: 50000 },
        { month: 'Jun 26', revenue: 62000, target: 55000 },
        { month: 'Jul 26', revenue: 67000, target: 58000 },
        { month: 'Aug 26', revenue: 71000, target: 62000 },
        { month: 'Sep 26', revenue: 73000, target: 65000 }
    ]
};


// ==========================================================
// 2. INITIALIZATION & STATE
// ==========================================================

let activeChartPeriod = '6m';
let currentOrderFilter = 'all';
let activeDrawerOrder = null;

document.addEventListener('DOMContentLoaded', () => {
    initNavigationTabs();
    initMobileSidebar();
    initAddCropModal();
    initOrderDrawer();
    initChartControls();
    initOrderFilters();
    initAIChat();

    // Render views
    renderAllViews();
    initSalesCanvasChart();
});

function renderAllViews() {
    renderCropsTable();
    renderFarmerOrdersTable();
    renderQuickOrdersList();
    renderInventoryBars();
    renderMandiPrices();
    updateBadges();
}


// ==========================================================
// 3. SPA NAVIGATION TABS
// ==========================================================

function initNavigationTabs() {
    document.querySelectorAll('.sidebar-nav .nav-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            switchTab(target);
        });
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.sidebar-nav .nav-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.spa-tab').forEach(sec => sec.classList.remove('active'));

    const activeSec = document.getElementById(`tab-${tabId}`);
    if (activeSec) {
        activeSec.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const titleMap = {
        'dashboard': { title: 'Agricultural Command Center', sub: 'Run your entire farming business, active harvest listings, and shopkeeper orders in one place.' },
        'crops': { title: 'Crop Management ("My Crops")', sub: 'Manage active harvest batches, set farm-gate pricing, and add certified listings dynamically.' },
        'orders': { title: 'Wholesale Order Management', sub: 'Review incoming bulk contracts from shopkeepers, accept delivery timelines, or mark completed.' },
        'inventory': { title: 'Inventory Volume & Silo Visualizer', sub: 'Visual capacity progress bars showing current storage volume utilization and available headroom.' },
        'intelligence': { title: 'Market Intelligence & Mandi AI Desk', sub: 'Live Mandi pricing index trends and real-time advisory from your Forage AI Assistant.' }
    };

    if (titleMap[tabId]) {
        document.getElementById('pageTitle').textContent = titleMap[tabId].title;
        document.getElementById('pageSubtitle').textContent = titleMap[tabId].sub;
    }

    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');

    // Redraw canvas if returning to dashboard
    if (tabId === 'dashboard') {
        setTimeout(initSalesCanvasChart, 50);
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
// 4. VANILLA HTML5 CANVAS LINE CHART ENGINE (ZERO DEPENDENCIES)
// ==========================================================

function initChartControls() {
    const filterBtns = document.querySelectorAll('.chart-controls .chart-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeChartPeriod = btn.getAttribute('data-period');
            initSalesCanvasChart();
        });
    });

    window.addEventListener('resize', () => {
        initSalesCanvasChart();
    });
}

function initSalesCanvasChart() {
    const canvas = document.getElementById('salesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const data = salesHistory[activeChartPeriod] || salesHistory['6m'];

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 30, right: 30, bottom: 45, left: 65 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    // Find max value
    const maxVal = Math.max(...data.map(d => Math.max(d.revenue, d.target))) * 1.15;

    // Draw horizontal grid lines
    const gridLines = 4;
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'right';

    for (let i = 0; i <= gridLines; i++) {
        const y = padding.top + (chartH / gridLines) * i;
        const val = Math.round(maxVal - (maxVal / gridLines) * i);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        ctx.fillText(`₹${(val / 1000).toFixed(0)}k`, padding.left - 10, y + 4);
    }

    // Coordinates calculation
    const points = data.map((d, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (d.revenue / maxVal) * chartH;
        const yTarget = padding.top + chartH - (d.target / maxVal) * chartH;
        return { x, y, yTarget, data: d };
    });

    // Draw target dashed line
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 1.5;
    points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.yTarget);
        else ctx.lineTo(p.x, p.yTarget);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Gradient Area under Revenue
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.01)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, padding.top + chartH);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Main Emerald Line
    ctx.beginPath();
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    // Draw Points & X-axis Labels
    ctx.textAlign = 'center';
    points.forEach(p => {
        // Dot outer
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#10B981';
        ctx.stroke();

        // X label
        ctx.fillStyle = '#64748B';
        ctx.fillText(p.data.month, p.x, height - 15);
    });

    // Interactive Tooltip on hover
    const tooltip = document.getElementById('chartTooltip');
    canvas.onmousemove = (e) => {
        const mouseX = e.clientX - rect.left;
        let closest = null;
        let minDiff = Infinity;

        points.forEach(p => {
            const diff = Math.abs(p.x - mouseX);
            if (diff < minDiff) {
                minDiff = diff;
                closest = p;
            }
        });

        if (closest && minDiff < 40) {
            tooltip.style.display = 'block';
            tooltip.style.left = `${closest.x}px`;
            tooltip.style.top = `${closest.y}px`;
            tooltip.innerHTML = `
                <div>${closest.data.month}</div>
                <div style="color: #34D399; font-size: 0.85rem;">₹${closest.data.revenue.toLocaleString()}</div>
                <div style="color: #94A3B8; font-size: 0.68rem;">Target: ₹${closest.data.target.toLocaleString()}</div>
            `;
        } else {
            tooltip.style.display = 'none';
        }
    };

    canvas.onmouseleave = () => {
        tooltip.style.display = 'none';
    };
}


// ==========================================================
// 5. CROP MANAGEMENT ("MY CROPS") & ADD CROP MODAL
// ==========================================================

function initAddCropModal() {
    const modal = document.getElementById('addCropModal');
    const closeBtn = document.getElementById('closeAddCropModal');
    const openTopBtn = document.getElementById('topAddCropBtn');
    const openTableBtn = document.getElementById('openAddCropModalBtn');
    const form = document.getElementById('addCropForm');

    const openModal = () => {
        if (modal) modal.classList.add('active');
        // Set default harvest date to today
        const dateInput = document.getElementById('newCropHarvestDate');
        if (dateInput && !dateInput.value) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    };

    const closeModal = () => {
        if (modal) modal.classList.remove('active');
    };

    if (openTopBtn) openTopBtn.addEventListener('click', openModal);
    if (openTableBtn) openTableBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('newCropName').value.trim();
            const category = document.getElementById('newCropCategory').value;
            const qty = parseFloat(document.getElementById('newCropQty').value);
            const unit = document.getElementById('newCropUnit').value;
            const price = parseFloat(document.getElementById('newCropPrice').value);
            const date = document.getElementById('newCropHarvestDate').value;
            const location = document.getElementById('newCropLocation').value.trim() || 'Patil Farm Silo #1';

            if (!name || isNaN(qty) || isNaN(price)) {
                showToast('Please fill in all required crop fields.');
                return;
            }

            // Create new crop listing object
            const newCrop = {
                id: `F-CROP-${Math.floor(100 + Math.random() * 900)}`,
                name: name,
                category: category,
                variety: 'Farm Standard A-Grade',
                quantity: qty,
                capacityMax: Math.round(qty * 1.3),
                unit: unit,
                pricePerUnit: price,
                harvestDate: date,
                location: location,
                status: 'Available'
            };

            // Prepend to array
            farmerCrops.unshift(newCrop);

            form.reset();
            closeModal();
            renderAllViews();
            showToast(`Listing for "${name}" (${qty} ${unit}) added dynamically!`);
        });
    }
}

function renderCropsTable() {
    const tbody = document.getElementById('cropsTableBody');
    if (!tbody) return;

    tbody.innerHTML = farmerCrops.map(crop => `
        <tr>
            <td>
                <strong>${crop.name}</strong>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${crop.variety}</div>
            </td>
            <td>${crop.category}</td>
            <td><strong>${crop.quantity.toLocaleString()} ${crop.unit}</strong></td>
            <td><strong style="color: #059669; font-size: 0.95rem;">₹${crop.pricePerUnit.toFixed(2)} / ${crop.unit}</strong></td>
            <td>${crop.harvestDate}</td>
            <td><span style="font-size: 0.75rem; color: var(--text-muted);"><i class="ph ph-map-pin"></i> ${crop.location}</span></td>
            <td>
                <span class="status-pill active">
                    <i class="ph-fill ph-circle" style="font-size: 0.5rem;"></i> ${crop.status}
                </span>
            </td>
            <td>
                <button type="button" class="btn-text-action" onclick="deleteCrop('${crop.id}')" title="Remove Listing" style="color: #DC2626;">
                    <i class="ph-bold ph-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function deleteCrop(cropId) {
    const idx = farmerCrops.findIndex(c => c.id === cropId);
    if (idx !== -1) {
        const name = farmerCrops[idx].name;
        farmerCrops.splice(idx, 1);
        renderAllViews();
        showToast(`Removed listing for "${name}".`);
    }
}


// ==========================================================
// 6. ORDER MANAGEMENT & DETAILS DRAWER (ACCEPT / REJECT / COMPLETE)
// ==========================================================

function initOrderFilters() {
    const tabs = document.querySelectorAll('.order-filter-tabs .o-tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentOrderFilter = tab.getAttribute('data-filter');
            renderFarmerOrdersTable();
        });
    });
}

function renderFarmerOrdersTable() {
    const tbody = document.getElementById('farmerOrdersTableBody');
    if (!tbody) return;

    const filtered = incomingOrders.filter(o => {
        if (currentOrderFilter === 'all') return true;
        return o.status === currentOrderFilter;
    });

    tbody.innerHTML = filtered.map(order => {
        let statusClass = 'pending';
        if (order.status === 'Accepted') statusClass = 'active';
        if (order.status === 'Completed') statusClass = 'completed';
        if (order.status === 'Rejected') statusClass = 'rejected';

        return `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>
                    <div><strong>${order.buyer}</strong></div>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">${order.orderDate}</span>
                </td>
                <td>${order.crop}</td>
                <td>${order.quantity} ${order.unit}</td>
                <td><strong style="color: #059669;">₹${order.totalAmount.toLocaleString()}</strong></td>
                <td><span style="font-size: 0.75rem; color: var(--text-muted);">${order.route}</span></td>
                <td>
                    <span class="status-pill ${statusClass}">${order.status}</span>
                </td>
                <td>
                    <button type="button" class="btn-primary-action" onclick="openOrderDrawer('${order.id}')" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
                        Review Order &rarr;
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function renderQuickOrdersList() {
    const list = document.getElementById('quickOrdersList');
    if (!list) return;

    const pending = incomingOrders.filter(o => o.status === 'Pending');
    if (pending.length === 0) {
        list.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: #64748B; font-size: 0.82rem;">No pending orders awaiting confirmation!</div>';
        return;
    }

    list.innerHTML = pending.map(o => `
        <div class="quick-order-row" onclick="openOrderDrawer('${o.id}')">
            <div>
                <div class="qo-crop"><i class="ph-bold ph-package"></i> ${o.crop} (${o.quantity} ${o.unit})</div>
                <div class="qo-buyer">${o.buyer} • ${o.orderDate}</div>
            </div>
            <div class="qo-price">
                ₹${o.totalAmount.toLocaleString()}
                <div style="font-size: 0.68rem; color: #D97706; font-weight: 700;">Action Needed &rarr;</div>
            </div>
        </div>
    `).join('');
}

function initOrderDrawer() {
    const modal = document.getElementById('orderDrawerModal');
    const closeBtn = document.getElementById('closeOrderDrawer');
    const acceptBtn = document.getElementById('drawerAcceptBtn');
    const completeBtn = document.getElementById('drawerCompleteBtn');
    const rejectBtn = document.getElementById('drawerRejectBtn');

    const closeModal = () => {
        if (modal) modal.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            if (!activeDrawerOrder) return;
            activeDrawerOrder.status = 'Accepted';
            closeModal();
            renderAllViews();
            showToast(`Order ${activeDrawerOrder.id} Accepted! Packaging started.`);
        });
    }

    if (completeBtn) {
        completeBtn.addEventListener('click', () => {
            if (!activeDrawerOrder) return;
            activeDrawerOrder.status = 'Completed';
            closeModal();
            renderAllViews();
            showToast(`Order ${activeDrawerOrder.id} marked as Completed & Dispatched!`);
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            if (!activeDrawerOrder) return;
            activeDrawerOrder.status = 'Rejected';
            closeModal();
            renderAllViews();
            showToast(`Order ${activeDrawerOrder.id} rejected.`);
        });
    }
}

window.openOrderDrawer = function(orderId) {
    const order = incomingOrders.find(o => o.id === orderId);
    if (!order) return;

    activeDrawerOrder = order;
    document.getElementById('drawerOrderId').textContent = `Order ${order.id}`;
    document.getElementById('drawerShopkeeper').textContent = `Buyer: ${order.buyer} (${order.orderDate})`;
    document.getElementById('drawerCrop').textContent = `${order.crop} @ ₹${order.pricePerUnit.toFixed(2)}/${order.unit}`;
    document.getElementById('drawerQty').textContent = `${order.quantity} ${order.unit}`;
    document.getElementById('drawerAmount').textContent = `₹${order.totalAmount.toLocaleString()}`;
    document.getElementById('drawerRoute').textContent = order.route;
    document.getElementById('drawerStatusBadge').textContent = `Current Status: ${order.status}`;

    // Adjust button visibility depending on status
    const acceptBtn = document.getElementById('drawerAcceptBtn');
    const completeBtn = document.getElementById('drawerCompleteBtn');
    const rejectBtn = document.getElementById('drawerRejectBtn');

    if (order.status === 'Completed') {
        acceptBtn.style.display = 'none';
        completeBtn.style.display = 'none';
        rejectBtn.style.display = 'none';
    } else if (order.status === 'Accepted') {
        acceptBtn.style.display = 'none';
        completeBtn.style.display = 'flex';
        rejectBtn.style.display = 'flex';
    } else {
        acceptBtn.style.display = 'flex';
        completeBtn.style.display = 'none';
        rejectBtn.style.display = 'flex';
    }

    const modal = document.getElementById('orderDrawerModal');
    modal.classList.add('active');
};


// ==========================================================
// 7. INVENTORY VISUALIZER (CAPACITY PROGRESS BARS)
// ==========================================================

function renderInventoryBars() {
    const grid = document.getElementById('capacityBarsGrid');
    if (!grid) return;

    grid.innerHTML = farmerCrops.map((crop, idx) => {
        const pct = Math.min(100, Math.round((crop.quantity / crop.capacityMax) * 100));
        let fillClass = 'emerald';
        let badgeClass = 'high';

        if (pct < 40) {
            fillClass = 'amber';
            badgeClass = 'low';
        } else if (pct > 80) {
            fillClass = 'emerald';
            badgeClass = 'high';
        } else {
            fillClass = 'blue';
            badgeClass = 'mid';
        }

        return `
            <div class="capacity-card">
                <div class="cap-top">
                    <span class="cap-crop-title">${crop.name}</span>
                    <span class="cap-badge-pct ${badgeClass}">${pct}% Full</span>
                </div>
                <div class="cap-bar-track">
                    <div class="cap-bar-fill ${fillClass}" style="width: ${pct}%;"></div>
                </div>
                <div class="cap-numbers-row">
                    <span>Current In Stock: <strong>${crop.quantity.toLocaleString()} ${crop.unit}</strong></span>
                    <span>Max Silo Capacity: <strong>${crop.capacityMax.toLocaleString()} ${crop.unit}</strong></span>
                </div>
                <div style="font-size: 0.72rem; color: var(--text-muted); display: flex; justify-content: space-between;">
                    <span>Storage: ${crop.location}</span>
                    <span>Headroom: <strong>${(crop.capacityMax - crop.quantity).toLocaleString()} ${crop.unit} left</strong></span>
                </div>
            </div>
        `;
    }).join('');
}


// ==========================================================
// 8. MARKET INTELLIGENCE & FORAGE AI CHAT ASSISTANT
// ==========================================================

function renderMandiPrices() {
    const list = document.getElementById('mandiPricesList');
    if (!list) return;

    list.innerHTML = marketPrices.map(item => `
        <div class="mandi-price-row">
            <div>
                <div class="mp-crop">${item.crop}</div>
                <div class="mp-market">${item.mandi} • ${item.state}</div>
            </div>
            <div class="mp-pricing">
                <div class="mp-current">₹${item.currentPrice.toFixed(2)} / kg</div>
                <div class="mp-arrow ${item.isUp ? 'up' : 'down'}">
                    ${item.isUp ? '&#9650;' : '&#9660;'} ${item.isUp ? '+' : ''}${item.changePct}%
                </div>
            </div>
        </div>
    `).join('');
}

const farmerAIKnowledge = {
    'tomato': 'Tomato prices jumped +8.4% in Vashi APMC today due to high hotel demand in Mumbai. Current mandi benchmark is ₹32.01/kg. Recommend raising your listing from ₹27.45/kg to at least ₹30.50/kg.',
    'onion': 'Nashik wholesale prices are climbing (+14.2%). With rain expected on Tuesday, harvest and dry your remaining onion field batches immediately to preserve skin quality.',
    'potato': 'Potato prices are flat (₹28.30/kg) with strong arrivals from Pune. Safe to hold in storage for 2-3 weeks without price penalties.',
    'weather': 'Nashik region forecast: 30°C daytime temperature with 46% humidity. Ideal 3-day dry harvesting window before convective rain on Tuesday.',
    'default': 'Namaste! Based on real-time APMC arrivals across Maharashtra, prices are tracking higher for perishables. Which crop or listing would you like me to evaluate?'
};

function initAIChat() {
    const form = document.getElementById('farmerChatForm');
    const input = document.getElementById('farmerChatInput');
    const body = document.getElementById('farmerChatBody');
    const promptChips = document.querySelectorAll('.farmer-prompts-bar .f-prompt-chip');

    function appendUserMsg(text) {
        const div = document.createElement('div');
        div.className = 'ai-msg-bubble user';
        div.innerHTML = `
            <div class="ai-bubble-text">
                <p>${escapeHtml(text)}</p>
            </div>
        `;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    function appendAIMsg(text, actionCallout = null) {
        const div = document.createElement('div');
        div.className = 'ai-msg-bubble assistant';
        div.innerHTML = `
            <div class="ai-bubble-avatar"><i class="ph-fill ph-sparkle"></i></div>
            <div class="ai-bubble-text">
                <p>${text}</p>
                ${actionCallout ? `<div class="actionable-box">${actionCallout}</div>` : ''}
            </div>
        `;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    function generateResponse(query) {
        const q = query.toLowerCase();
        let reply = farmerAIKnowledge['default'];
        let callout = null;

        if (q.includes('tomato')) {
            reply = farmerAIKnowledge['tomato'];
            callout = 'Suggested Listing Action: Update Tomato listing to ₹30.50/kg';
        } else if (q.includes('onion')) {
            reply = farmerAIKnowledge['onion'];
            callout = 'Weather Alert: 4-day harvesting window active in Nashik belt';
        } else if (q.includes('potato') || q.includes('harvest')) {
            reply = farmerAIKnowledge['potato'];
            callout = 'Market Tip: Hold potato lots until late September when cold-storage withdrawals start';
        } else if (q.includes('weather') || q.includes('rain')) {
            reply = farmerAIKnowledge['weather'];
            callout = 'Optimal conditions: 30.2°C, 46% humidity';
        }

        setTimeout(() => {
            appendAIMsg(reply, callout);
        }, 500);
    }

    if (form && input) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;
            appendUserMsg(text);
            input.value = '';
            generateResponse(text);
        });
    }

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            appendUserMsg(prompt);
            generateResponse(prompt);
        });
    });
}


// ==========================================================
// 9. UTILS & BADGES
// ==========================================================

function updateBadges() {
    const cropsCount = document.getElementById('sidebarCropsCount');
    if (cropsCount) cropsCount.textContent = farmerCrops.length;

    const pendingOrders = incomingOrders.filter(o => o.status === 'Pending').length;
    const pendingPill = document.getElementById('sidebarPendingOrders');
    if (pendingPill) pendingPill.textContent = `${pendingOrders} New`;

    const totalOrdersCount = document.getElementById('totalOrdersTabCount');
    if (totalOrdersCount) totalOrdersCount.textContent = incomingOrders.length;
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
