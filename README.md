# Forage — From Farm to Market to You

> **A connected, transparent digital agricultural ecosystem empowering farmers to sell smarter, middlemen to source with transit telemetry, and consumers to cook sustainably with zero waste.**

![Forage Logo](forage-logo.png)

---

## 🌟 The Three Perspectives

Forage connects all three key stakeholders of the agricultural supply chain into one unified platform:

### 1. 🚜 Farmer (Producer) Command Center (`farmer.html`)
The farmer's operational cockpit:
- **Executive KPIs**: Total Gross Revenue, Active B2B Orders, Inventory Volume, and Mandi Price Index benchmark.
- **Sales Trajectory Chart**: Zero-dependency, lightweight **Vanilla HTML5 Canvas line chart** with gradient fill and interactive hover tooltips.
- **Crop Management ("My Crops")**: Active harvest listings data table with a dynamic **"Add Crop" Modal** that immediately updates listings and inventory headroom.
- **Wholesale Order Management**: Incoming bulk orders with an **"Order Details Drawer"** modal to *Accept*, *Reject*, or *Mark as Completed*.
- **Inventory Visualizer**: Visual capacity progress bars (e.g., *Tomatoes: 850kg / 1000kg - 85% Full*).
- **Market Intelligence & Agri-AI**: Live Mandi price tickers with momentum indicators (▲ / ▼) and an interactive **Forage AI Advisor** chat desk.

### 2. 🏪 Shopkeeper (Middleman) B2B Hub (`shopkeeper.html`)
Wholesale procurement and cold-chain logistics:
- **Procurement Marketplace**: B2B bulk catalog with filters for Crop Category, Origin Location (Nashik, Pune, Ahmedabad, Bengaluru, Punjab), and Price sorting.
- **Bulk Order Modal**: Instant calculations for produce subtotal, cold-chain telemetry logistics, and total payable contract value.
- **Active Orders & Transit Tracking**: Live logistics table tracking route, ETA, and status (`Pending`, `In Transit`, `Delivered`).
- **Transit Health Monitor**: Real-time SVG arc gauge and breakdown bars predicting produce shelf-life degradation from live IoT sensors (Temperature, Humidity, Vibration Index, and Transit Duration).
- **Profit Margin Analytics**: Verifiable Farm-Gate Buy vs. Wholesale & Retail selling price spreads enforcing transparent, fair-trade markups.
- **AI Demand Forecasting**: Interactive chat analyst advising on price spikes (e.g. Nashik onion supply constraint).

### 3. 🍳 Consumer Kitchen & Smart Pantry (`customer.html`)
Sustainable retail shopping and zero-waste cooking:
- **Direct Fresh Market**: Clean retail storefront featuring farm-fresh produce with complete origin transparency and *"Farmer received: ₹X/kg"* badges.
- **My Pantry**: Household food inventory tracker organized by storage condition (`Refrigerated`, `Cool/Dry`, `Dry`).
- **Expiry Radar Matrix**: Color-coded countdown tags:
  - 🔴 **Critical (< 3 Days)**: Immediate cooking required.
  - 🟡 **Warning (3–7 Days)**: Use this week.
  - 🟢 **Fresh (7+ Days)**: Peak freshness.
- **Hero Feature: AI Recipe Generator ("What Should I Cook?")**:
  - Scans expiring pantry ingredients and generates gourmet zero-waste recipes (e.g., *Charred Tomato Shakshuka*, *Crispy Spiced Potato & Onion Bhaji*, *Herb Spinach Basmati Pulao*).
  - **"Cook This Recipe"** button: automatically consumes expiring ingredients from the pantry, rewards eco-points, and tracks food waste prevention!

---

## 🎨 Design System & Aesthetics

- **Curated Palette**:
  - Primary Forest: `#183A2B`
  - Emerald Accent: `#10B981`
  - Soft Sage Background: `#F4F7F5`
  - Crisp Glassmorphism Surfaces: `rgba(255, 255, 255, 0.85)` with blur
- **Ambient GLSL Fluid Background (`gl.js`)**: Real-time WebGL noise shader giving all pages an organic, breathing background.
- **Typography**: `Plus Jakarta Sans`
- **Iconography**: Phosphor Icons (`@phosphor-icons/web`)

---

## 🚀 Backend-Ready Architecture

All mock data arrays are structured in clean JSON format at the very top of each JavaScript file:
- `farmer.js`: `farmerCrops`, `incomingOrders`, `marketPrices`, `salesHistory`
- `shopkeeper.js`: `farmersListings`, `shopkeeperOrders`, `transitTelemetryLogs`, `priceIndexData`
- `customer.js`: `pantryInventory`, `marketProducts`, `purchaseHistory`, `recipeDatabase`

To connect to a Node.js / Express & MongoDB backend, simply swap out these initial arrays with `await fetch('/api/v1/...')` API calls.

---

## 📁 Repository Structure

```text
├── index.html           # Main Landing Page & Perspectives Overview
├── style.css            # Landing Page design tokens & styles
├── script.js            # Landing Page routing & role modal logic
├── farmer.html          # Farmer Command Center
├── farmer.css           # Farmer portal styling & canvas styles
├── farmer.js            # Farmer mock data, canvas chart & state
├── shopkeeper.html      # Shopkeeper & Middleman B2B Hub
├── shopkeeper.css       # Shopkeeper portal styling & gauge styles
├── shopkeeper.js        # Shopkeeper mock data, telemetry & B2B state
├── customer.html        # Consumer Kitchen & Smart Pantry
├── customer.css         # Customer portal styling & recipe styles
├── customer.js          # Customer pantry, expiry radar & AI chef
├── gl.js                # WebGL GLSL ambient fluid background shader
├── forage-logo.png      # Brand mark
└── data/                # Sample sensor telemetry & agricultural CSVs
```

---

## 💻 Running Locally

Simply open `index.html` in any modern web browser, or run a local HTTP server:

```bash
# Python
python -m http.server 8080

# Node / npx
npx serve ./
```
