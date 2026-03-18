/* app.js — UaaS System Configurator Pricing Engine — v3 Full UniFi Catalog */

// ===== PRICING DATA — FULL UBIQUITI UNIFI CATALOG =====
const PRICING = {
  internet: {
    cb_essential:  { name: "Comcast Business Essential — 150/35 Mbps",                   promoCost: 59.99,  monthlyCost: 99.95,   type: "shared", customerLabel: "Comcast Business Essential (150 Mbps)", speedMbps: 150 },
    cb_standard:   { name: "Comcast Business Standard — 300/35 Mbps",                    promoCost: 74.00,  monthlyCost: 149.95,  type: "shared", customerLabel: "Comcast Business Standard (300 Mbps)", speedMbps: 300 },
    cb_performance:{ name: "Comcast Business Performance — 500/35 Mbps",                 promoCost: 110.00, monthlyCost: 199.95,  type: "shared", customerLabel: "Comcast Business Performance (500 Mbps)", speedMbps: 500 },
    cb_advanced:   { name: "Comcast Business Advanced — 800/300 Mbps",                   promoCost: 120.00, monthlyCost: 249.95,  type: "shared", customerLabel: "Comcast Business Advanced (800 Mbps)", speedMbps: 800 },
    cb_gig_extra:  { name: "Comcast Business Gigabit Extra — 1.25 Gbps/300 Mbps",       promoCost: 150.00, monthlyCost: 399.95,  type: "shared", customerLabel: "Comcast Business Gigabit Extra (1.25 Gbps)", speedMbps: 1250 },
    cb_2gig:       { name: "Comcast Business 2 Gig — 2/0.3 Gbps",                       promoCost: 199.95, monthlyCost: 499.95,  type: "shared", customerLabel: "Comcast Business 2 Gig (2 Gbps)", speedMbps: 2000 },
    edi_50:   { name: "Comcast EDI 50 Mbps (Symmetrical, SLA)",    promoCost: null, monthlyCost: 198.24,  type: "dedicated", customerLabel: "Comcast EDI 50 Mbps Dedicated Fiber", speedMbps: 50 },
    edi_100:  { name: "Comcast EDI 100 Mbps (Symmetrical, SLA)",   promoCost: null, monthlyCost: 279.44,  type: "dedicated", customerLabel: "Comcast EDI 100 Mbps Dedicated Fiber", speedMbps: 100 },
    edi_200:  { name: "Comcast EDI 200 Mbps (Symmetrical, SLA)",   promoCost: null, monthlyCost: 397.04,  type: "dedicated", customerLabel: "Comcast EDI 200 Mbps Dedicated Fiber", speedMbps: 200 },
    edi_300:  { name: "Comcast EDI 300 Mbps (Symmetrical, SLA)",   promoCost: null, monthlyCost: 503.44,  type: "dedicated", customerLabel: "Comcast EDI 300 Mbps Dedicated Fiber", speedMbps: 300 },
    edi_500:  { name: "Comcast EDI 500 Mbps (Symmetrical, SLA)",   promoCost: null, monthlyCost: 685.44,  type: "dedicated", customerLabel: "Comcast EDI 500 Mbps Dedicated Fiber", speedMbps: 500 },
    edi_1000: { name: "Comcast EDI 1 Gbps (Symmetrical, SLA)",     promoCost: null, monthlyCost: 1001.84, type: "dedicated", customerLabel: "Comcast EDI 1 Gbps Dedicated Fiber", speedMbps: 1000 },
    edi_2000: { name: "Comcast EDI 2 Gbps (Symmetrical, SLA)",     promoCost: null, monthlyCost: 1343.44, type: "dedicated", customerLabel: "Comcast EDI 2 Gbps Dedicated Fiber", speedMbps: 2000 },
    edi_3000: { name: "Comcast EDI 3 Gbps (Symmetrical, SLA)",     promoCost: null, monthlyCost: 1668.24, type: "dedicated", customerLabel: "Comcast EDI 3 Gbps Dedicated Fiber", speedMbps: 3000 },
    edi_5000: { name: "Comcast EDI 5 Gbps (Symmetrical, SLA)",     promoCost: null, monthlyCost: 2250.36, type: "dedicated", customerLabel: "Comcast EDI 5 Gbps Dedicated Fiber", speedMbps: 5000 },
    edi_10000:{ name: "Comcast EDI 10 Gbps (Symmetrical, SLA)",    promoCost: null, monthlyCost: 3553.20, type: "dedicated", customerLabel: "Comcast EDI 10 Gbps Dedicated Fiber", speedMbps: 10000 },
  },
  ediInstallation: 560,
  secondaryWan: {
    none:               { name: "None",                                     monthlyCost: 0,      equipCost: 0,    customerLabel: "—" },
    coax_essential:     { name: "Comcast Coax — 150/35 Mbps",              monthlyCost: 99.95,  equipCost: 0,    customerLabel: "Comcast Coax 150 Mbps" },
    coax_standard:      { name: "Comcast Coax — 300/35 Mbps",              monthlyCost: 149.95, equipCost: 0,    customerLabel: "Comcast Coax 300 Mbps" },
    coax_performance:   { name: "Comcast Coax — 500/35 Mbps",              monthlyCost: 199.95, equipCost: 0,    customerLabel: "Comcast Coax 500 Mbps" },
    comcast_lte_backup: { name: "Comcast Connection Pro (4G LTE Backup)",   monthlyCost: 35.00,  equipCost: 0,    customerLabel: "Comcast Connection Pro LTE Backup" },
    tmobile_grow:       { name: "T-Mobile 5G Small Biz Grow",              monthlyCost: 50.00,  equipCost: 0,    customerLabel: "T-Mobile 5G Business (Grow)" },
    tmobile_advanced:   { name: "T-Mobile 5G Business Advanced",           monthlyCost: 70.00,  equipCost: 0,    customerLabel: "T-Mobile 5G Business (Advanced)" },
    verizon_lte_25:     { name: "Verizon LTE Business — 25 Mbps",          monthlyCost: 69.00,  equipCost: 0,    customerLabel: "Verizon LTE 25 Mbps" },
    verizon_lte_50:     { name: "Verizon LTE Business — 50 Mbps",          monthlyCost: 99.00,  equipCost: 0,    customerLabel: "Verizon LTE 50 Mbps" },
    verizon_5g_100:     { name: "Verizon 5G Business — 100 Mbps",          monthlyCost: 69.00,  equipCost: 0,    customerLabel: "Verizon 5G Business 100 Mbps" },
    starlink_50gb:      { name: "Starlink Business — 50 GB Priority",      monthlyCost: 65.00,  equipCost: 1999, customerLabel: "Starlink Business 50 GB" },
    starlink_500gb:     { name: "Starlink Business — 500 GB Priority",     monthlyCost: 165.00, equipCost: 1999, customerLabel: "Starlink Business 500 GB" },
    starlink_1tb:       { name: "Starlink Business — 1 TB Priority",       monthlyCost: 290.00, equipCost: 1999, customerLabel: "Starlink Business 1 TB" },
    starlink_2tb:       { name: "Starlink Business — 2 TB Priority",       monthlyCost: 540.00, equipCost: 1999, customerLabel: "Starlink Business 2 TB" },
  },
  sdwan: { appliance: 799, licenseMonthlyCost: 50, managementMonthlyCost: 100 },

  // ── UniFi Gateways ──
  gateways: [
    { model: "Gateway Lite",              sku: "UXG-Lite",      price: 129,  maxDevices: 15,  tier: "lite" },
    { model: "Cloud Gateway Max",         sku: "UCG-Max",       price: 199,  maxDevices: 30,  tier: "mid" },
    { model: "Cloud Gateway Fiber",       sku: "UCG-Fiber",     price: 279,  maxDevices: 40,  tier: "mid" },
    { model: "Dream Machine Pro",         sku: "UDM-Pro",       price: 379,  maxDevices: 100, tier: "pro" },
    { model: "Dream Machine SE",          sku: "UDM-SE",        price: 499,  maxDevices: 150, tier: "pro" },
    { model: "Dream Machine Pro Max",     sku: "UDM-Pro-Max",   price: 599,  maxDevices: 200, tier: "pro" },
    { model: "Enterprise Fortress Gateway",sku: "EFG",          price: 1999, maxDevices: 500, tier: "enterprise" },
  ],

  // ── UniFi PoE Switches — sorted by port count, then price ──
  switches: [
    // 8-port
    { model: "Lite 8 PoE (52W)",          sku: "USW-Lite-8-PoE",       price: 109,  ports: 8,  poeWatts: 52,   tier: "lite" },
    { model: "Ultra 60W (8-Port)",         sku: "USW-Ultra-60W",        price: 109,  ports: 8,  poeWatts: 60,   tier: "lite" },
    { model: "Pro 8 PoE (120W)",           sku: "USW-Pro-8-PoE",        price: 349,  ports: 8,  poeWatts: 120,  tier: "pro" },
    // 16-port
    { model: "Lite 16 PoE (45W)",          sku: "USW-Lite-16-PoE",      price: 199,  ports: 16, poeWatts: 45,   tier: "lite" },
    { model: "Pro Max 16 PoE (180W)",      sku: "USW-Pro-Max-16-PoE",   price: 399,  ports: 16, poeWatts: 180,  tier: "pro" },
    // 24-port
    { model: "Pro 24 PoE (400W)",          sku: "USW-Pro-24-PoE",       price: 699,  ports: 24, poeWatts: 400,  tier: "pro" },
    { model: "Pro Max 24 PoE (400W)",      sku: "USW-Pro-Max-24-PoE",   price: 799,  ports: 24, poeWatts: 400,  tier: "pro" },
    { model: "Enterprise 24 PoE (400W)",   sku: "USW-Enterprise-24-PoE",price: 899,  ports: 24, poeWatts: 400,  tier: "enterprise" },
    // 48-port
    { model: "Pro 48 PoE (600W)",          sku: "USW-Pro-48-PoE",       price: 1099, ports: 48, poeWatts: 600,  tier: "pro" },
    { model: "Pro Max 48 PoE (720W)",      sku: "USW-Pro-Max-48-PoE",   price: 1299, ports: 48, poeWatts: 720,  tier: "pro" },
    { model: "Enterprise 48 PoE (720W)",   sku: "USW-Enterprise-48-PoE",price: 1499, ports: 48, poeWatts: 720,  tier: "enterprise" },
    // XG / Aggregation
    { model: "Pro Max XG 24 (10G, 400W)",  sku: "USW-Pro-Max-XG-24",    price: 1699, ports: 24, poeWatts: 400,  tier: "xg" },
    { model: "Enterprise XG 24 (10G)",     sku: "USW-Enterprise-XG-24", price: 1999, ports: 24, poeWatts: 0,    tier: "xg" },
    { model: "Pro Max 48 PoE XG (2.5G)",   sku: "USW-Pro-Max-48-PoE-XG",price: 1999,ports: 48, poeWatts: 720,  tier: "xg" },
  ],

  // ── UniFi Access Points — full WiFi 7 / WiFi 6E lineup ──
  accessPoints: [
    // WiFi 7 (U7) Series
    { model: "U7 Lite",           sku: "U7-Lite",         price: 99,   band: "WiFi 7",  use: "indoor",  range: "standard" },
    { model: "U7 In-Wall",        sku: "U7-IW",           price: 149,  band: "WiFi 7",  use: "in-wall", range: "standard" },
    { model: "U7 Long-Range",     sku: "U7-LR",           price: 159,  band: "WiFi 7",  use: "indoor",  range: "long" },
    { model: "U7 Pro",            sku: "U7-Pro",          price: 189,  band: "WiFi 7",  use: "indoor",  range: "standard" },
    { model: "U7 Pro Wall",       sku: "U7-Pro-Wall",     price: 199,  band: "WiFi 7",  use: "in-wall", range: "standard" },
    { model: "U7 Outdoor",        sku: "U7-Outdoor",      price: 199,  band: "WiFi 7",  use: "outdoor", range: "standard" },
    { model: "U7 Pro XG",         sku: "U7-Pro-XG",       price: 199,  band: "WiFi 7",  use: "indoor",  range: "extended" },
    { model: "U7 Pro Max",        sku: "U7-Pro-Max",      price: 279,  band: "WiFi 7",  use: "indoor",  range: "extended" },
    { model: "U7 Pro XG Wall",    sku: "U7-Pro-XG-Wall",  price: 279,  band: "WiFi 7",  use: "in-wall", range: "extended" },
    { model: "U7 Pro Outdoor",    sku: "U7-Pro-Outdoor",  price: 279,  band: "WiFi 7",  use: "outdoor", range: "extended" },
    // WiFi 6E (U6) Series
    { model: "U6 In-Wall",        sku: "U6-IW",           price: 179,  band: "WiFi 6",  use: "in-wall", range: "standard" },
    { model: "U6 Mesh",           sku: "U6-Mesh",         price: 179,  band: "WiFi 6",  use: "outdoor", range: "mesh" },
    { model: "U6 Mesh Pro",       sku: "U6-Mesh-Pro",     price: 199,  band: "WiFi 6",  use: "outdoor", range: "mesh" },
    { model: "U6 Enterprise",     sku: "U6-Enterprise",   price: 279,  band: "WiFi 6E", use: "indoor",  range: "enterprise" },
    { model: "U6 Enterprise IW",  sku: "U6-Enterprise-IW",price: 299,  band: "WiFi 6E", use: "in-wall", range: "enterprise" },
  ],

  // ── UniFi Protect Cameras — full catalog ──
  cameras: {
    indoor: [
      // Budget / Value
      { model: "G5 Turret Ultra",     sku: "UVC-G5-Turret-Ultra",  price: 129, res: "2K",   poe: true },
      { model: "G5 Dome Ultra",       sku: "UVC-G5-Dome-Ultra",    price: 129, res: "2K",   poe: true },
      // Mid-range
      { model: "G6 Turret",           sku: "UVC-G6-Turret",        price: 199, res: "4K",   poe: true },
      { model: "G6 Dome",             sku: "UVC-G6-Dome",          price: 279, res: "4K",   poe: true },
      { model: "G6 180",              sku: "UVC-G6-180",           price: 299, res: "4K",   poe: true },
      // Pro
      { model: "G6 Pro Turret",       sku: "UVC-G6-Pro-Turret",    price: 479, res: "4K",   poe: true },
      { model: "G6 Pro Dome",         sku: "UVC-G6-Pro-Dome",      price: 499, res: "4K",   poe: true },
      { model: "G6 Pro 360",          sku: "UVC-G6-Pro-360",       price: 499, res: "4K",   poe: true },
      // AI-Enabled
      { model: "AI 360",              sku: "UVC-AI-360",           price: 499, res: "4K AI",poe: true },
      { model: "AI Pro",              sku: "UVC-AI-Pro",           price: 499, res: "4K AI",poe: true },
    ],
    outdoor: [
      // Budget / Value
      { model: "G5 Bullet",           sku: "UVC-G5-Bullet",        price: 129, res: "2K",   poe: true },
      // Mid-range
      { model: "G6 Bullet",           sku: "UVC-G6-Bullet",        price: 199, res: "4K",   poe: true },
      // Pro
      { model: "G6 Pro Bullet",       sku: "UVC-G6-Pro-Bullet",    price: 479, res: "4K",   poe: true },
      // PTZ
      { model: "G6 PTZ",              sku: "UVC-G6-PTZ",           price: 399, res: "4K",   poe: true },
      // Specialty
      { model: "AI DSLR",             sku: "UVC-AI-DSLR",          price: 1299,res: "4K AI",poe: true },
    ],
  },

  // ── UniFi NVRs — includes ENVR Core ──
  nvrs: [
    { model: "UNVR Instant",          sku: "UNVR-Instant",    price: 199,  maxCameras4K: 6,   maxCamerasTotal: 10,  driveBays: 0 },
    { model: "Network Video Recorder",sku: "UNVR",            price: 299,  maxCameras4K: 18,  maxCamerasTotal: 30,  driveBays: 1 },
    { model: "UNVR Pro",              sku: "UNVR-Pro",        price: 499,  maxCameras4K: 24,  maxCamerasTotal: 50,  driveBays: 4 },
    { model: "Enterprise NVR",        sku: "ENVR",            price: 1999, maxCameras4K: 70,  maxCamerasTotal: 100, driveBays: 7 },
    { model: "ENVR Core",             sku: "ENVR-Core",       price: 4999, maxCameras4K: 300, maxCamerasTotal: 500, driveBays: 16 },
  ],

  // ── UniFi Access Control — full catalog ──
  accessControl: {
    readers: [
      { model: "Access Ultra",        sku: "UA-Ultra",          price: 129, type: "NFC" },
      { model: "G3 Reader",           sku: "UA-G3",             price: 139, type: "NFC + Fingerprint" },
      { model: "Reader Flex",         sku: "UA-Flex",           price: 199, type: "NFC + Bluetooth" },
      { model: "G6 Entry",            sku: "UA-G6-Entry",       price: 249, type: "NFC + Intercom + Camera" },
      { model: "Reader Pro",          sku: "UA-Pro",            price: 359, type: "NFC + Display + Intercom" },
    ],
    hubs: [
      { model: "Door Hub Mini",       sku: "UA-Hub-Door-Mini",  price: 129, maxDoors: 1, notes: "Single door, compact" },
      { model: "Door Hub",            sku: "UA-Hub-Door",       price: 199, maxDoors: 1, notes: "Single door, full-size" },
      { model: "Retrofit Hub",        sku: "UA-Retrofit-Hub",   price: 229, maxDoors: 2, notes: "Retrofit existing locks" },
      { model: "Gate Hub",            sku: "UA-Hub-Gate",       price: 279, maxDoors: 1, notes: "Gates, parking, barriers" },
      { model: "Enterprise Hub",      sku: "UA-Hub-Enterprise", price: 999, maxDoors: 8, notes: "Multi-door enterprise" },
    ],
    nfcCards20Pack: 30,
    lockHardwarePerDoor: 150,
  },

  // ── Accessories & Dependencies ──
  accessories: {
    poeInjectors: [
      { model: "PoE+ Adapter (30W)",    sku: "U-POE-AT",   price: 12 },
      { model: "PoE++ Adapter (60W)",   sku: "UACC-POE-60W",price: 29 },
    ],
    mounting: [
      { model: "Ceiling Mount (Flush)",  sku: "UACC-CM",     price: 9 },
      { model: "Wall Mount",             sku: "UACC-WM",     price: 9 },
      { model: "Pole Mount",             sku: "UACC-PM",     price: 29 },
      { model: "Corner Mount",           sku: "UACC-Corner", price: 19 },
    ],
    uplink: [
      { model: "10G SFP+ DAC Cable (0.5m)", sku: "UACC-DAC-SFP10-0.5M", price: 12 },
      { model: "10G SFP+ DAC Cable (1m)",   sku: "UACC-DAC-SFP10-1M",   price: 14 },
      { model: "25G SFP28 DAC Cable (0.5m)",sku: "UACC-DAC-SFP28-0.5M", price: 22 },
      { model: "10G SFP+ Module (MM)",      sku: "UACC-OM-MM-10G",      price: 19 },
      { model: "10G SFP+ Module (SM)",      sku: "UACC-OM-SM-10G",      price: 25 },
      { model: "25G SFP28 Module",          sku: "UACC-OM-SFP28",       price: 39 },
    ],
    rackMount: [
      { model: "Rack Mount Kit (1U)",       sku: "UACC-Rack-1U", price: 29 },
    ],
  },

  cabling: { cat6PerDrop: 200, cat6aPerDrop: 325, mdfBuildout: 2500, idfBuildout: 1500 },
  storageDrive8TB: 200,
  labor: { networkConfigPerDevice: 75, cameraInstallPerUnit: 150, accessInstallPerDoor: 200, projectMgmtPercent: 0.10 },
  recurring: { nocPerDevice: 3, helpDeskPerDevice: 5, onSiteSupportBase: 200, onSiteSupportPerDevice: 2 },
  defaultTermMonths: 36,
  defaultMarginPercent: 45,
};

// ===== FEATURE 1: FACILITY TEMPLATES =====
// AP indices: 0=U7 Lite, 3=U7 Pro, 6=U7 Pro XG, 7=U7 Pro Max
// Indoor cam: 0=G5 Turret Ultra, 2=G6 Turret, 3=G6 Dome, 6=G6 Pro Dome
// Outdoor cam: 0=G5 Bullet, 1=G6 Bullet, 2=G6 Pro Bullet, 3=G6 PTZ
// Reader: 0=Ultra, 1=G3 Reader, 2=Flex, 3=G6 Entry, 4=Reader Pro
const TEMPLATES = {
  custom: null,
  small_clinic: { sqft: 2500, floors: 1, drops: 12, cableType: 'cat6', apModelIndex: 0, indoorCameras: 4, outdoorCameras: 2, indoorCameraModel: 0, outdoorCameraModel: 0, doors: 2, readerModel: 0, internetTier: 'cb_essential', secondaryWan: 'none', tertiaryWan: 'none', sdwanEnabled: false, usePromoPricing: false },
  medium_office: { sqft: 8000, floors: 2, drops: 36, cableType: 'cat6a', apModelIndex: 3, indoorCameras: 6, outdoorCameras: 4, indoorCameraModel: 2, outdoorCameraModel: 1, doors: 4, readerModel: 1, internetTier: 'cb_standard', secondaryWan: 'none', tertiaryWan: 'none', sdwanEnabled: false, usePromoPricing: false },
  skilled_nursing: { sqft: 25000, floors: 2, drops: 96, cableType: 'cat6a', apModelIndex: 3, indoorCameras: 16, outdoorCameras: 8, indoorCameraModel: 3, outdoorCameraModel: 1, doors: 12, readerModel: 1, internetTier: 'cb_performance', secondaryWan: 'coax_standard', tertiaryWan: 'none', sdwanEnabled: false, usePromoPricing: false },
  hospital_wing: { sqft: 50000, floors: 3, drops: 200, cableType: 'cat6a', apModelIndex: 6, indoorCameras: 30, outdoorCameras: 12, indoorCameraModel: 3, outdoorCameraModel: 2, doors: 20, readerModel: 2, internetTier: 'edi_500', secondaryWan: 'coax_performance', tertiaryWan: 'comcast_lte_backup', sdwanEnabled: true, usePromoPricing: false },
  multi_site: { sqft: 100000, floors: 4, drops: 400, cableType: 'cat6a', apModelIndex: 7, indoorCameras: 50, outdoorCameras: 20, indoorCameraModel: 6, outdoorCameraModel: 2, doors: 30, readerModel: 3, internetTier: 'edi_1000', secondaryWan: 'coax_performance', tertiaryWan: 'tmobile_grow', sdwanEnabled: true, usePromoPricing: false },
};


// ---- Competitor Network Pricing Data ----
const COMPETITOR_NETWORK = {
  meraki: {
    name: "Cisco Meraki",
    ap: { model: "MR57", price: 1878 },
    switch24: { model: "MS130-24", price: 1200 },
    switch48: { model: "MS130-48", price: 2200 },
    gateway: { model: "MX68", price: 795 },
    license: {
      enterprise1yr: 112,
      enterprise5yr: 420,
      advanced5yr: 811,
      perAP: true,
      switchLicense1yr: 150,
      switchLicense5yr: 560,
      gatewayLicense1yr: 250,
      gatewayLicense5yr: 990
    },
    notes: "Hardware non-functional without active license. License required per device."
  },
  aruba: {
    name: "HPE Aruba",
    ap: { model: "AP-535", price: 1450 },
    switch24: { model: "CX 6200F-24G", price: 1100 },
    switch48: { model: "CX 6200F-48G", price: 2000 },
    gateway: { model: "9004 Gateway", price: 1200 },
    license: {
      centralFoundation1yr: 150,
      centralFoundation5yr: 705,
      centralAdvanced1yr: 300,
      centralAdvanced5yr: 975,
      switchFoundation1yr: 200,
      switchFoundation5yr: 940,
      gatewayLicense1yr: 200,
      gatewayLicense5yr: 940
    },
    notes: "Aruba Central subscription required for cloud management."
  }
};

const NETWORK_SLA_PACKAGES = {
  bronze: {
    name: "Bronze",
    color: "#cd7f32",
    perDeviceMonth: 15,
    features: [
      "Business hours NOC monitoring (8am–6pm M–F)",
      "48-hour on-site response",
      "Annual network health assessment",
      "Firmware updates included",
      "Remote troubleshooting",
      "Hardware depot repair coverage"
    ]
  },
  silver: {
    name: "Silver",
    color: "#C0C0C0",
    perDeviceMonth: 27,
    popular: true,
    features: [
      "Extended NOC monitoring (7am–10pm, 7 days)",
      "24-hour on-site response",
      "Semi-annual network assessment",
      "Firmware + configuration management",
      "24/7 remote monitoring & auto-alerts",
      "Hardware advance replacement",
      "Quarterly performance reports",
      "VPN & firewall rule management"
    ]
  },
  gold: {
    name: "Gold",
    color: "#FFD700",
    perDeviceMonth: 40,
    features: [
      "24/7/365 priority NOC monitoring",
      "4-hour emergency on-site response",
      "Quarterly network assessments",
      "Full configuration & change management",
      "Proactive monitoring with auto-remediation",
      "Next-business-day hardware replacement",
      "Monthly performance reports",
      "Unlimited configuration changes",
      "Dedicated network engineer",
      "Annual network design review & optimization"
    ]
  }
};

// ===== STATE =====
let state = {
  internetTier: 'cb_standard',
  usePromoPricing: false,
  secondaryWan: 'none',
  tertiaryWan: 'none',
  sdwanEnabled: false,
  sqft: 10000,
  floors: 1,
  drops: 48,
  cableType: 'cat6a',
  apModelIndex: 3,  // U7 Pro (index 3 in expanded catalog)
  indoorCameras: 8,
  outdoorCameras: 4,
  indoorCameraModel: 2,  // G6 Turret (index 2 in expanded catalog)
  outdoorCameraModel: 1, // G6 Bullet (index 1 in expanded catalog)
  doors: 4,
  readerModel: 1,  // G3 Reader
  marginPercent: 45,
  termMonths: 36,
  clientView: false,
  activeTemplate: 'custom',
  savedScenarios: [],
  bandwidthUsers: 25,
  bandwidthVideoRooms: 2,
  bandwidthCloudIntensity: 'medium',
  bandwidthVoipPhones: 10,
  overrideGateway: null,
  overrideApCount: null,
  overrideSwitches: null,
};

// ===== FORMATTING =====
const fmt = NexusPricing.fmtWhole;
const fmtDec = NexusPricing.fmtDec;
const fmtPct = NexusPricing.fmtPct;
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// ===== CALCULATION ENGINE =====
function calculate() {
  const p = PRICING, s = state;
  const termMonths = s.termMonths;

  const apCount = s.overrideApCount != null ? s.overrideApCount : Math.ceil(s.sqft / 1500);
  const apModel = p.accessPoints[s.apModelIndex];
  const totalCameras = s.indoorCameras + s.outdoorCameras;
  const indoorModel = p.cameras.indoor[s.indoorCameraModel];
  const outdoorModel = p.cameras.outdoor[s.outdoorCameraModel];

  let nvr = null, nvrQty = 0;
  if (totalCameras > 0) {
    for (const n of p.nvrs) { if (totalCameras <= n.maxCameras4K) { nvr = n; nvrQty = 1; break; } }
    if (!nvr) { nvr = p.nvrs[p.nvrs.length - 1]; nvrQty = Math.ceil(totalCameras / nvr.maxCameras4K); }
  }
  const storageCount = totalCameras > 0 ? Math.ceil(totalCameras / 8) : 0;

  const reader = p.accessControl.readers[s.readerModel];
  let hubs = [];
  if (s.doors > 0) {
    if (s.doors <= 1) hubs = [{ ...p.accessControl.hubs[0], qty: 1 }];          // Door Hub Mini (1 door)
    else if (s.doors === 2) hubs = [{ ...p.accessControl.hubs[2], qty: 1 }];    // Retrofit Hub (2 doors)
    else hubs = [{ ...p.accessControl.hubs[4], qty: Math.ceil(s.doors / 8) }];  // Enterprise Hub (8 doors)
  }
  const nfcPacks = s.doors > 0 ? Math.ceil(s.doors / 2) : 0;

  // Switch sizing
  const totalPortsNeeded = Math.ceil((s.drops + totalCameras + apCount + s.doors) * 1.2);
  let switchConfig = [], portsAllocated = 0;
  // Switch indices: 0=Lite 8(52W), 1=Ultra 60W(8), 2=Pro 8(120W),
  //   3=Lite 16(45W), 4=ProMax 16(180W), 5=Pro 24(400W), 6=ProMax 24(400W),
  //   7=Ent 24(400W), 8=Pro 48(600W), 9=ProMax 48(720W), 10=Ent 48(720W),
  //   11=ProMax XG 24, 12=Ent XG 24, 13=ProMax 48 XG
  if (s.overrideSwitches != null) {
    switchConfig = s.overrideSwitches;
    portsAllocated = switchConfig.reduce((sum, sw) => sum + sw.ports * sw.qty, 0);
  } else {
    let remaining = totalPortsNeeded;
    if (remaining <= 8) { switchConfig.push({ ...p.switches[1], qty: 1 }); }          // Ultra 60W 8-port
    else if (remaining <= 16) { switchConfig.push({ ...p.switches[4], qty: 1 }); }     // Pro Max 16 PoE
    else if (remaining <= 24) { switchConfig.push({ ...p.switches[5], qty: 1 }); }     // Pro 24 PoE
    else {
      const total48 = Math.ceil(remaining / 48);
      const coveredBy48 = (total48 - 1) * 48;
      const leftover = remaining - coveredBy48;
      if (total48 > 1 && leftover <= 24) {
        switchConfig.push({ ...p.switches[9], qty: total48 - 1 });                     // Pro Max 48 PoE
        if (leftover > 16) switchConfig.push({ ...p.switches[5], qty: 1 });             // Pro 24 PoE
        else if (leftover > 8) switchConfig.push({ ...p.switches[4], qty: 1 });         // Pro Max 16 PoE
        else if (leftover > 0) switchConfig.push({ ...p.switches[1], qty: 1 });         // Ultra 60W 8-port
      } else { switchConfig.push({ ...p.switches[9], qty: total48 }); }                // Pro Max 48 PoE
    }
    portsAllocated = switchConfig.reduce((sum, sw) => sum + sw.ports * sw.qty, 0);
  }
  const totalSwitchCount = switchConfig.reduce((sum, sw) => sum + sw.qty, 0);

  // Gateway
  const totalDevices = totalSwitchCount + apCount + totalCameras + s.doors + nvrQty;
  let gateway = null;
  if (s.overrideGateway != null) { gateway = p.gateways[s.overrideGateway]; }
  else { for (const g of p.gateways) { if (totalDevices <= g.maxDevices) { gateway = g; break; } } if (!gateway) gateway = p.gateways[p.gateways.length - 1]; }

  const internetTierData = p.internet[s.internetTier];
  const ediInstallCost = internetTierData.type === 'dedicated' ? p.ediInstallation : 0;
  const wan2Data = p.secondaryWan[s.secondaryWan];
  const wan3Data = p.secondaryWan[s.tertiaryWan];
  const wan2EquipCost = wan2Data.equipCost || 0;
  const wan3EquipCost = wan3Data.equipCost || 0;
  const sdwanEquipCost = s.sdwanEnabled ? p.sdwan.appliance : 0;

  const dropCost = s.cableType === 'cat6a' ? p.cabling.cat6aPerDrop : p.cabling.cat6PerDrop;
  const cablingHardware = s.drops * dropCost;
  const mdfCost = p.cabling.mdfBuildout;
  const idfCost = Math.max(0, s.floors - 1) * p.cabling.idfBuildout;
  const totalCabling = cablingHardware + mdfCost + idfCost;

  const networkHardware = gateway.price + switchConfig.reduce((sum, sw) => sum + sw.price * sw.qty, 0) + apCount * apModel.price;
  const surveillanceHardware = (s.indoorCameras * indoorModel.price) + (s.outdoorCameras * outdoorModel.price) + (nvrQty > 0 ? nvrQty * nvr.price : 0) + (storageCount * p.storageDrive8TB);
  const accessHardware = (s.doors * reader.price) + hubs.reduce((sum, h) => sum + h.price * h.qty, 0) + (nfcPacks * p.accessControl.nfcCards20Pack) + (s.doors * p.accessControl.lockHardwarePerDoor);
  const totalHardware = networkHardware + surveillanceHardware + accessHardware;

  const networkDeviceCount = 1 + totalSwitchCount + apCount;
  const networkConfigLabor = networkDeviceCount * p.labor.networkConfigPerDevice;
  const cameraLabor = totalCameras * p.labor.cameraInstallPerUnit;
  const accessLabor = s.doors * p.labor.accessInstallPerDoor;
  const projectMgmt = Math.round(totalHardware * p.labor.projectMgmtPercent);
  const totalLabor = networkConfigLabor + cameraLabor + accessLabor + projectMgmt;

  const totalCapex = totalHardware + totalCabling + totalLabor + ediInstallCost + wan2EquipCost + wan3EquipCost + sdwanEquipCost;
  const amortizedMonthly = totalCapex / termMonths;

  const primaryTier = p.internet[s.internetTier];
  const internetCost = (s.usePromoPricing && primaryTier.promoCost != null) ? primaryTier.promoCost : primaryTier.monthlyCost;
  const internetRegularCost = primaryTier.monthlyCost;
  const internetPromoCost = primaryTier.promoCost;

  const wan2MonthlyCost = wan2Data.monthlyCost;
  const wan3MonthlyCost = wan3Data.monthlyCost;
  const sdwanLicenseCost = s.sdwanEnabled ? p.sdwan.licenseMonthlyCost : 0;
  const sdwanMgmtCost = s.sdwanEnabled ? p.sdwan.managementMonthlyCost : 0;
  const sdwanTotalMonthlyCost = sdwanLicenseCost + sdwanMgmtCost;

  const allDeviceCount = totalDevices;
  const nocCost = allDeviceCount * p.recurring.nocPerDevice;
  const helpDeskCost = allDeviceCount * p.recurring.helpDeskPerDevice;
  const onSiteCost = p.recurring.onSiteSupportBase + (allDeviceCount * p.recurring.onSiteSupportPerDevice);
  const totalRecurring = internetCost + wan2MonthlyCost + wan3MonthlyCost + sdwanTotalMonthlyCost + nocCost + helpDeskCost + onSiteCost;

  const nexusMonthlyCost = amortizedMonthly + totalRecurring;
  const marginDecimal = s.marginPercent / 100;
  const customerMonthlyFee = nexusMonthlyCost / (1 - marginDecimal);
  const monthlyGrossProfit = customerMonthlyFee - nexusMonthlyCost;

  const contractValue = customerMonthlyFee * termMonths;
  const totalCostOverTerm = nexusMonthlyCost * termMonths;
  const totalProfitOverTerm = monthlyGrossProfit * termMonths;

  return {
    internetTier: primaryTier, apCount, apModel, totalCameras, indoorModel, outdoorModel,
    nvr, nvrQty, storageCount, reader, hubs, nfcPacks,
    gateway, switchConfig, totalSwitchCount, portsAllocated, totalPortsNeeded, dropCost,
    wan2Data, wan3Data, wan2EquipCost, wan3EquipCost, wan2MonthlyCost, wan3MonthlyCost,
    sdwanEquipCost, sdwanLicenseCost, sdwanMgmtCost, sdwanTotalMonthlyCost,
    ediInstallCost, cablingHardware, mdfCost, idfCost, totalCabling,
    networkHardware, surveillanceHardware, accessHardware, totalHardware,
    networkDeviceCount, networkConfigLabor, cameraLabor, accessLabor, projectMgmt, totalLabor,
    totalCapex, amortizedMonthly, termMonths,
    internetCost, internetRegularCost, internetPromoCost,
    nocCost, helpDeskCost, onSiteCost, totalRecurring, nexusMonthlyCost,
    marginDecimal, customerMonthlyFee, monthlyGrossProfit,
    contractValue, totalCostOverTerm, totalProfitOverTerm, allDeviceCount,
  };
}

// ===== RENDER =====
function render() {
  const c = calculate();

  // Big number
  const dollars = Math.floor(c.customerMonthlyFee);
  const cents = Math.round((c.customerMonthlyFee - dollars) * 100);
  document.getElementById('bigNumber').innerHTML = fmt(dollars) + '<span class="cents">.' + String(cents).padStart(2, '0') + '</span>';
  document.getElementById('termNote').textContent = `per month / ${c.termMonths}-month agreement`;

  // Badges
  const promoBadge = document.getElementById('promoBadge');
  if (promoBadge) { promoBadge.style.display = (state.usePromoPricing && c.internetPromoCost != null) ? '' : 'none'; promoBadge.textContent = 'Promo pricing applied — reverts after promo term'; }
  const sdwanBadge = document.getElementById('sdwanBadge');
  if (sdwanBadge) sdwanBadge.style.display = state.sdwanEnabled ? '' : 'none';
  const wanCountBadge = document.getElementById('wanCountBadge');
  if (wanCountBadge) {
    const wanCount = 1 + (state.secondaryWan !== 'none' ? 1 : 0) + (state.tertiaryWan !== 'none' ? 1 : 0);
    if (wanCount > 1) { wanCountBadge.style.display = ''; wanCountBadge.textContent = wanCount + ' WAN links' + (state.sdwanEnabled ? ' + SD-WAN' : ''); }
    else wanCountBadge.style.display = 'none';
  }

  renderAutoItems(c);
  renderBreakdownTable(c);
  renderFormula(c);
  renderMarginDisplay(c);
  renderProfitability(c);
  renderTopology(c);
  renderCharts(c);
  renderWhatIf(c);
  renderClientView(c);
  renderBandwidthAdvisor();
  renderNetworkCompetitorComparison(c);
  renderNetworkSLA(c);
  updateHash();
}

// ===== RENDER AUTO ITEMS =====
function renderAutoItems(c) {
  const apCountEl = document.getElementById('autoApCount');
  if (apCountEl) apCountEl.textContent = c.apCount + '×';
  const apModelEl = document.getElementById('autoApModel');
  if (apModelEl) apModelEl.textContent = c.apModel.model;
  const apCostEl = document.getElementById('autoApCost');
  if (apCostEl) apCostEl.textContent = fmt(c.apCount * c.apModel.price);

  const gwEl = document.getElementById('autoGateway');
  if (gwEl) gwEl.textContent = c.gateway.model;
  const gwCostEl = document.getElementById('autoGatewayCost');
  if (gwCostEl) gwCostEl.textContent = fmt(c.gateway.price);

  const swEl = document.getElementById('autoSwitches');
  if (swEl) swEl.innerHTML = c.switchConfig.map(sw => `<div class="auto-item"><span class="auto-item-label">${sw.qty}× ${sw.model}</span><span class="auto-item-value">${fmt(sw.price * sw.qty)}</span></div>`).join('');

  const portsEl = document.getElementById('autoPorts');
  if (portsEl) portsEl.textContent = `${c.portsAllocated} ports (${c.totalPortsNeeded} needed)`;

  const nvrEl = document.getElementById('autoNvr');
  if (nvrEl) {
    if (c.nvr && c.nvrQty > 0) { nvrEl.innerHTML = `<div class="auto-item"><span class="auto-item-label">${c.nvrQty}× ${c.nvr.model}</span><span class="auto-item-value">${fmt(c.nvrQty * c.nvr.price)}</span></div><div class="auto-item"><span class="auto-item-label">${c.storageCount}× 8TB HDD</span><span class="auto-item-value">${fmt(c.storageCount * PRICING.storageDrive8TB)}</span></div>`; }
    else nvrEl.innerHTML = '<div class="auto-item"><span class="auto-item-label">No cameras configured</span></div>';
  }

  const hubEl = document.getElementById('autoHubs');
  if (hubEl) {
    if (state.doors > 0) {
      hubEl.innerHTML = c.hubs.map(h => `<div class="auto-item"><span class="auto-item-label">${h.qty}× ${h.model}</span><span class="auto-item-value">${fmt(h.price * h.qty)}</span></div>`).join('') +
        `<div class="auto-item"><span class="auto-item-label">${c.nfcPacks}× NFC Cards (20-pack)</span><span class="auto-item-value">${fmt(c.nfcPacks * PRICING.accessControl.nfcCards20Pack)}</span></div>` +
        `<div class="auto-item"><span class="auto-item-label">Lock hardware (${state.doors} doors)</span><span class="auto-item-value">${fmt(state.doors * PRICING.accessControl.lockHardwarePerDoor)}</span></div>`;
    } else hubEl.innerHTML = '<div class="auto-item"><span class="auto-item-label">No doors configured</span></div>';
  }

  const cableEl = document.getElementById('autoCabling');
  if (cableEl) {
    cableEl.innerHTML = `<div class="auto-item"><span class="auto-item-label">${state.drops} drops × ${fmt(c.dropCost)}</span><span class="auto-item-value">${fmt(c.cablingHardware)}</span></div>` +
      `<div class="auto-item"><span class="auto-item-label">MDF buildout</span><span class="auto-item-value">${fmt(c.mdfCost)}</span></div>` +
      (c.idfCost > 0 ? `<div class="auto-item"><span class="auto-item-label">IDF buildout (${state.floors - 1} add'l floors)</span><span class="auto-item-value">${fmt(c.idfCost)}</span></div>` : '');
  }
}

// ===== RENDER BREAKDOWN TABLE =====
function renderBreakdownTable(c) {
  const tbody = document.getElementById('breakdownBody');
  if (!tbody) return;
  let rows = '';
  const ispType = c.internetTier.type === 'dedicated' ? 'Comcast Enterprise EDI (Dedicated Fiber)' : 'Comcast Business Internet (Shared)';
  rows += catRow('Primary Internet — ' + ispType);
  const promoNote = (state.usePromoPricing && c.internetPromoCost != null) ? ' <span style="color:var(--color-accent-green,#3fb950);font-size:0.85em">PROMO</span>' : '';
  rows += itemRow(c.internetTier.customerLabel + promoNote, '', '', '', fmtDec(c.internetCost) + '/mo');
  if (state.usePromoPricing && c.internetPromoCost != null) rows += itemRow('<span style="color:var(--color-text-faint);font-size:0.85em">Regular rate after promo</span>', '', '', '', '<span style="color:var(--color-text-faint);font-size:0.85em">' + fmtDec(c.internetRegularCost) + '/mo</span>');
  if (c.ediInstallCost > 0) rows += itemRow('EDI Fiber Installation', 'one-time', 1, fmt(c.ediInstallCost), fmt(c.ediInstallCost) + ' (amortized)');

  if (state.secondaryWan !== 'none') {
    rows += catRow('Secondary WAN — Failover / Redundancy');
    rows += itemRow(c.wan2Data.customerLabel, '', '', '', fmtDec(c.wan2MonthlyCost) + '/mo');
    if (c.wan2EquipCost > 0) rows += itemRow('Equipment (amortized)', 'one-time', 1, fmt(c.wan2EquipCost), fmt(c.wan2EquipCost));
  }
  if (state.tertiaryWan !== 'none') {
    rows += catRow('Tertiary WAN — Additional Redundancy');
    rows += itemRow(c.wan3Data.customerLabel, '', '', '', fmtDec(c.wan3MonthlyCost) + '/mo');
    if (c.wan3EquipCost > 0) rows += itemRow('Equipment (amortized)', 'one-time', 1, fmt(c.wan3EquipCost), fmt(c.wan3EquipCost));
  }
  if (state.sdwanEnabled) {
    rows += catRow('SD-WAN Service');
    rows += itemRow('SD-WAN Edge Appliance', 'one-time', 1, fmt(PRICING.sdwan.appliance), fmt(c.sdwanEquipCost) + ' (amortized)');
    rows += itemRow('SD-WAN Software License', '', '', '', fmtDec(c.sdwanLicenseCost) + '/mo');
    rows += itemRow('Nexus Managed SD-WAN (NOC/Policy)', '', '', '', fmtDec(c.sdwanMgmtCost) + '/mo');
  }

  rows += catRow('Structured Cabling');
  rows += itemRow(`${state.cableType === 'cat6a' ? 'Cat6A' : 'Cat6'} Network Drops`, '', state.drops, fmt(c.dropCost), fmt(c.cablingHardware));
  rows += itemRow('MDF Buildout', '', 1, fmt(c.mdfCost), fmt(c.mdfCost));
  if (c.idfCost > 0) rows += itemRow('IDF Buildout', '', state.floors - 1, fmt(PRICING.cabling.idfBuildout), fmt(c.idfCost));

  rows += catRow('Network Hardware');
  rows += itemRow(c.gateway.model, c.gateway.sku, 1, fmt(c.gateway.price), fmt(c.gateway.price));
  c.switchConfig.forEach(sw => rows += itemRow(sw.model, sw.sku, sw.qty, fmt(sw.price), fmt(sw.price * sw.qty)));
  rows += itemRow(c.apModel.model, c.apModel.sku, c.apCount, fmt(c.apModel.price), fmt(c.apCount * c.apModel.price));

  if (c.totalCameras > 0) {
    rows += catRow('Surveillance Hardware');
    if (state.indoorCameras > 0) rows += itemRow(c.indoorModel.model, c.indoorModel.sku, state.indoorCameras, fmt(c.indoorModel.price), fmt(state.indoorCameras * c.indoorModel.price));
    if (state.outdoorCameras > 0) rows += itemRow(c.outdoorModel.model, c.outdoorModel.sku, state.outdoorCameras, fmt(c.outdoorModel.price), fmt(state.outdoorCameras * c.outdoorModel.price));
    if (c.nvrQty > 0) rows += itemRow(c.nvr.model, c.nvr.sku, c.nvrQty, fmt(c.nvr.price), fmt(c.nvrQty * c.nvr.price));
    if (c.storageCount > 0) rows += itemRow('8TB Enterprise HDD', '', c.storageCount, fmt(PRICING.storageDrive8TB), fmt(c.storageCount * PRICING.storageDrive8TB));
  }
  if (state.doors > 0) {
    rows += catRow('Access Control Hardware');
    rows += itemRow(c.reader.model, c.reader.sku, state.doors, fmt(c.reader.price), fmt(state.doors * c.reader.price));
    c.hubs.forEach(h => rows += itemRow(h.model, h.sku, h.qty, fmt(h.price), fmt(h.price * h.qty)));
    rows += itemRow('NFC Cards (20-pack)', '', c.nfcPacks, fmt(PRICING.accessControl.nfcCards20Pack), fmt(c.nfcPacks * PRICING.accessControl.nfcCards20Pack));
    rows += itemRow('Lock Hardware', '', state.doors, fmt(PRICING.accessControl.lockHardwarePerDoor), fmt(state.doors * PRICING.accessControl.lockHardwarePerDoor));
  }
  rows += catRow('Installation Labor');
  rows += itemRow('Network Config', '', c.networkDeviceCount, '$75/device', fmt(c.networkConfigLabor));
  if (c.totalCameras > 0) rows += itemRow('Camera Install', '', c.totalCameras, '$150/cam', fmt(c.cameraLabor));
  if (state.doors > 0) rows += itemRow('Access Install', '', state.doors, '$200/door', fmt(c.accessLabor));
  rows += itemRow('Project Management', '10% of hardware', '', '', fmt(c.projectMgmt));
  rows += catRow('Monthly Management');
  rows += itemRow('NOC Monitoring', '', c.allDeviceCount + ' dev', '$3/dev/mo', fmt(c.nocCost) + '/mo');
  rows += itemRow('Help Desk & Mgmt', '', c.allDeviceCount + ' dev', '$5/dev/mo', fmt(c.helpDeskCost) + '/mo');
  rows += itemRow('On-site Support', '', '', '', fmt(c.onSiteCost) + '/mo');
  tbody.innerHTML = rows;
}

function catRow(label) { return `<tr class="cat-header"><td colspan="5">${label}</td></tr>`; }
function itemRow(name, model, qty, unit, total) { return `<tr><td>${name}</td><td>${model}</td><td class="qty-cell">${qty}</td><td class="unit-cell">${unit}</td><td>${total}</td></tr>`; }

// ===== RENDER FORMULA =====
function renderFormula(c) {
  const el = document.getElementById('formulaContent');
  if (!el) return;
  let connectivityLines = '';
  const primaryLabel = c.internetTier.type === 'dedicated' ? 'Comcast EDI Circuit' : 'Comcast Business Internet';
  const promoTag = (state.usePromoPricing && c.internetPromoCost != null) ? ' (PROMO)' : '';
  connectivityLines += fLine(primaryLabel + promoTag, fmtDec(c.internetCost) + '/mo', c.internetTier.name);
  if (state.usePromoPricing && c.internetPromoCost != null) connectivityLines += fLine('Regular rate after promo', fmtDec(c.internetRegularCost) + '/mo', 'Price reverts after promotional period');
  if (state.secondaryWan !== 'none') connectivityLines += fLine('Secondary WAN: ' + c.wan2Data.customerLabel, fmtDec(c.wan2MonthlyCost) + '/mo');
  if (state.tertiaryWan !== 'none') connectivityLines += fLine('Tertiary WAN: ' + c.wan3Data.customerLabel, fmtDec(c.wan3MonthlyCost) + '/mo');
  if (state.sdwanEnabled) { connectivityLines += fLine('SD-WAN License', fmtDec(c.sdwanLicenseCost) + '/mo'); connectivityLines += fLine('Nexus Managed SD-WAN', fmtDec(c.sdwanMgmtCost) + '/mo'); }
  const totalConnectivityMonthly = c.internetCost + c.wan2MonthlyCost + c.wan3MonthlyCost + c.sdwanTotalMonthlyCost;
  let equipLines = '';
  if (c.ediInstallCost > 0) equipLines += fLine('EDI Fiber Installation', fmt(c.ediInstallCost));
  if (c.wan2EquipCost > 0) equipLines += fLine('Secondary WAN Equipment', fmt(c.wan2EquipCost));
  if (c.wan3EquipCost > 0) equipLines += fLine('Tertiary WAN Equipment', fmt(c.wan3EquipCost));
  if (c.sdwanEquipCost > 0) equipLines += fLine('SD-WAN Edge Appliance', fmt(c.sdwanEquipCost));

  el.innerHTML = `
    <div class="formula-block"><div class="formula-block-title">Hardware Costs (One-Time)</div>${fLine('Network Hardware', fmt(c.networkHardware))}${c.totalCameras > 0 ? fLine('Surveillance Hardware', fmt(c.surveillanceHardware)) : ''}${state.doors > 0 ? fLine('Access Control Hardware', fmt(c.accessHardware)) : ''}${fLine('Structured Cabling', fmt(c.totalCabling))}${equipLines}${fLineTotal('Total Hardware + Install', fmt(c.totalHardware + c.totalCabling + c.ediInstallCost + c.wan2EquipCost + c.wan3EquipCost + c.sdwanEquipCost))}</div>
    <div class="formula-block"><div class="formula-block-title">Installation Labor</div>${fLine('Network Config (' + c.networkDeviceCount + ' devices × $75)', fmt(c.networkConfigLabor))}${c.totalCameras > 0 ? fLine('Camera Install ($150/camera)', fmt(c.cameraLabor)) : ''}${state.doors > 0 ? fLine('Access Install ($200/door)', fmt(c.accessLabor)) : ''}${fLine('Project Management (10% of hardware)', fmt(c.projectMgmt))}${fLineTotal('Total Labor', fmt(c.totalLabor))}</div>
    <hr class="formula-divider">
    <div class="formula-block">${fLineGrand('TOTAL CAPEX', fmt(c.totalCapex))}</div>
    <div class="formula-block"><div class="formula-block-title">Amortization</div>${fLine('Term', c.termMonths + ' months')}${fLine('Hardware + Labor ÷ ' + c.termMonths, fmtDec(c.amortizedMonthly) + '/mo')}</div>
    <div class="formula-block"><div class="formula-block-title">Monthly Recurring Costs (Nexus Cost)</div>${connectivityLines}${totalConnectivityMonthly > 0 ? fLineTotal('Total Connectivity', fmtDec(totalConnectivityMonthly) + '/mo') : ''}${fLine('NOC Monitoring ($3/device/mo)', fmt(c.nocCost) + '/mo')}${fLine('On-site Support Allocation', fmt(c.onSiteCost) + '/mo')}${fLine('Help Desk & Mgmt ($5/device/mo)', fmt(c.helpDeskCost) + '/mo')}${fLineTotal('Total Recurring (Nexus Cost)', fmtDec(c.totalRecurring) + '/mo')}</div>
    <hr class="formula-divider">
    <div class="formula-block"><div class="formula-block-title">Monthly Cost to Nexus</div>${fLine('Amortized CapEx', fmtDec(c.amortizedMonthly) + '/mo')}${fLine('+ Monthly Recurring', fmtDec(c.totalRecurring) + '/mo')}${fLineTotal('Total Nexus Monthly Cost', fmtDec(c.nexusMonthlyCost) + '/mo')}</div>
    <div class="formula-block"><div class="formula-block-title">Margin & Customer Price</div>${fLine('Target Gross Margin', fmtPct(state.marginPercent))}${fLine('Formula', 'Cost ÷ (1 − ' + fmtPct(state.marginPercent) + ')')}${fLineGrand('Customer Monthly Fee', fmtDec(c.customerMonthlyFee) + '/mo')}</div>`;
}

function fLine(label, value, tooltip) { const tip = tooltip ? `<span class="info-tip" tabindex="0">?<span class="tip-content">${tooltip}</span></span>` : ''; return `<div class="formula-line"><span class="fl-label">${label}${tip}</span><span class="fl-dots"></span><span class="fl-value">${value}</span></div>`; }
function fLineTotal(label, value) { return `<div class="formula-line formula-total"><span class="fl-label">${label}</span><span class="fl-dots"></span><span class="fl-value">${value}</span></div>`; }
function fLineGrand(label, value) { return `<div class="formula-line formula-grand"><span class="fl-label">${label}</span><span class="fl-dots"></span><span class="fl-value">${value}</span></div>`; }

function renderMarginDisplay(c) {
  const valueEl = document.getElementById('marginValue'), indicatorEl = document.getElementById('marginIndicator');
  if (!valueEl || !indicatorEl) return;
  valueEl.textContent = fmtPct(state.marginPercent);
  let cls, text;
  if (state.marginPercent <= 35) { cls = 'margin-red'; text = 'Low Margin'; }
  else if (state.marginPercent <= 42) { cls = 'margin-amber'; text = 'Acceptable'; }
  else if (state.marginPercent <= 55) { cls = 'margin-green'; text = 'Target Range'; }
  else { cls = 'margin-blue'; text = 'Premium'; }
  indicatorEl.className = 'margin-indicator ' + cls; indicatorEl.textContent = text;
}

function renderProfitability(c) {
  const card = document.getElementById('profitCard'); if (!card) return;
  let cls;
  if (state.marginPercent <= 35) cls = 'profit-low'; else if (state.marginPercent <= 42) cls = 'profit-ok'; else if (state.marginPercent <= 55) cls = 'profit-healthy'; else cls = 'profit-premium';
  card.className = 'profitability-card ' + cls + ' internal-only';
  document.getElementById('profRevenue').textContent = fmtDec(c.customerMonthlyFee);
  document.getElementById('profCost').textContent = fmtDec(c.nexusMonthlyCost);
  document.getElementById('profProfit').textContent = fmtDec(c.monthlyGrossProfit);
  document.getElementById('profMargin').textContent = fmtPct(state.marginPercent);
  const el1 = document.getElementById('profContractLabel'); if (el1) el1.textContent = c.termMonths + '-Month Contract Value';
  const el2 = document.getElementById('profTotalCostLabel'); if (el2) el2.textContent = c.termMonths + '-Month Total Cost';
  const el3 = document.getElementById('profTotalProfitLabel'); if (el3) el3.textContent = c.termMonths + '-Month Gross Profit';
  document.getElementById('profContractValue').textContent = fmt(Math.round(c.contractValue));
  document.getElementById('profTotalCost').textContent = fmt(Math.round(c.totalCostOverTerm));
  document.getElementById('profTotalProfit').textContent = fmt(Math.round(c.totalProfitOverTerm));
  document.getElementById('profEquipValue').textContent = fmt(c.totalHardware);
}

// ===== FEATURE 5: NETWORK TOPOLOGY =====
function renderTopology(c) {
  const wrap = document.getElementById('topologySvg'); if (!wrap) return;
  const w = 600, h = 380;
  const cx = w / 2;
  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">`;
  const col = 'var(--color-primary)'; const txt = 'var(--color-text)'; const mutd = 'var(--color-text-muted)'; const line = 'var(--color-border)';
  const box = (x, y, label, count, icon, wide) => { const bw = wide ? 140 : 100; return `<rect x="${x-bw/2}" y="${y-16}" width="${bw}" height="32" rx="6" fill="var(--color-surface-offset)" stroke="${col}" stroke-width="1.5"/><text x="${x}" y="${y+1}" text-anchor="middle" fill="${txt}" font-size="10" font-family="var(--font-body)">${icon ? icon+' ' : ''}${label}</text>${count ? `<text x="${x}" y="${y+14}" text-anchor="middle" fill="${mutd}" font-size="9" font-family="var(--font-mono)">${count}</text>` : ''}`; };
  const ln = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${line}" stroke-width="1.2" stroke-dasharray="4 2"/>`;

  // WAN sources at top
  let wanSources = [{ label: 'Primary', sub: c.internetTier.customerLabel.split('(')[0].trim().substring(0, 18) }];
  if (state.secondaryWan !== 'none') wanSources.push({ label: 'Secondary', sub: c.wan2Data.customerLabel.substring(0, 18) });
  if (state.tertiaryWan !== 'none') wanSources.push({ label: 'Tertiary', sub: c.wan3Data.customerLabel.substring(0, 18) });
  const wanSpacing = Math.min(160, (w - 100) / wanSources.length);
  const wanStartX = cx - (wanSources.length - 1) * wanSpacing / 2;

  // Internet cloud
  wanSources.forEach((ws, i) => {
    const wx = wanStartX + i * wanSpacing;
    svg += `<ellipse cx="${wx}" cy="28" rx="52" ry="18" fill="none" stroke="${col}" stroke-width="1.2"/>`;
    svg += `<text x="${wx}" y="24" text-anchor="middle" fill="${txt}" font-size="9" font-family="var(--font-body)">${ws.label}</text>`;
    svg += `<text x="${wx}" y="36" text-anchor="middle" fill="${mutd}" font-size="7.5" font-family="var(--font-mono)">${ws.sub}</text>`;
  });

  // SD-WAN appliance if enabled
  let gwY = 110;
  if (state.sdwanEnabled) {
    const sdY = 72;
    svg += box(cx, sdY, 'SD-WAN', 'Aggregation', '');
    wanSources.forEach((ws, i) => { svg += ln(wanStartX + i * wanSpacing, 46, cx, sdY - 16); });
    svg += ln(cx, sdY + 16, cx, gwY - 16);
  } else {
    wanSources.forEach((ws, i) => { svg += ln(wanStartX + i * wanSpacing, 46, cx, gwY - 16); });
  }

  // Gateway
  svg += box(cx, gwY, c.gateway.model.substring(0, 22), '', '🔒', true);

  // Switches
  const swY = 180;
  const totalSW = c.switchConfig.reduce((s, sw) => s + sw.qty, 0);
  const swLabel = totalSW + '× ' + (c.switchConfig[0]?.model || 'Switch').substring(0, 14);
  svg += ln(cx, gwY + 16, cx, swY - 16);
  svg += box(cx, swY, 'Switches', swLabel, '');

  // Endpoints
  const endY = 280;
  const endpoints = [];
  if (c.apCount > 0) endpoints.push({ label: 'WiFi APs', count: c.apCount + '× ' + c.apModel.model.substring(0, 8) });
  if (c.totalCameras > 0) endpoints.push({ label: 'Cameras', count: c.totalCameras + ' total' });
  if (state.doors > 0) endpoints.push({ label: 'Access', count: state.doors + ' doors' });
  endpoints.push({ label: 'Network', count: state.drops + ' drops' });

  const epSpacing = Math.min(140, (w - 60) / endpoints.length);
  const epStartX = cx - (endpoints.length - 1) * epSpacing / 2;
  endpoints.forEach((ep, i) => {
    const ex = epStartX + i * epSpacing;
    svg += ln(cx, swY + 16, ex, endY - 16);
    svg += box(ex, endY, ep.label, ep.count, '');
  });

  // Device count
  svg += `<text x="${w - 10}" y="${h - 8}" text-anchor="end" fill="${mutd}" font-size="8" font-family="var(--font-mono)">${c.allDeviceCount} managed devices</text>`;
  svg += '</svg>';
  wrap.innerHTML = svg;
}

// ===== FEATURE 10: CHARTS =====
function renderCharts(c) {
  renderDonutChart(c);
  renderCapexOpexBar(c);
  renderWaterfallChart(c);
}

function renderDonutChart(c) {
  const wrap = document.getElementById('donutChart'); if (!wrap) return;
  const total = c.nexusMonthlyCost;
  if (total <= 0) { wrap.innerHTML = ''; return; }
  const totalConnectivity = c.internetCost + c.wan2MonthlyCost + c.wan3MonthlyCost + c.sdwanTotalMonthlyCost;
  const slices = [
    { label: 'Internet/WAN', value: totalConnectivity, color: 'var(--chart-internet)' },
    { label: 'Hardware', value: c.amortizedMonthly * (c.totalHardware / (c.totalCapex || 1)), color: 'var(--chart-hardware)' },
    { label: 'Labor', value: c.amortizedMonthly * (c.totalLabor / (c.totalCapex || 1)), color: 'var(--chart-labor)' },
    { label: 'Cabling', value: c.amortizedMonthly * (c.totalCabling / (c.totalCapex || 1)), color: 'var(--chart-cabling)' },
    { label: 'Management', value: c.nocCost + c.helpDeskCost + c.onSiteCost, color: 'var(--chart-management)' },
  ].filter(s => s.value > 0);

  let cumDeg = 0;
  const gradientParts = slices.map(s => { const deg = (s.value / total) * 360; const part = `${s.color} ${cumDeg}deg ${cumDeg + deg}deg`; cumDeg += deg; return part; });
  const legend = slices.map(s => `<div class="donut-legend-item"><span class="donut-swatch" style="background:${s.color}"></span>${s.label} <span style="color:var(--color-text-muted)">${((s.value/total)*100).toFixed(0)}%</span></div>`).join('');

  wrap.innerHTML = `<div class="donut-outer"><div class="donut-ring" style="background:conic-gradient(${gradientParts.join(',')})"><div class="donut-center"><span class="donut-center-value">${fmtDec(total)}</span><span class="donut-center-label">Nexus Cost/mo</span></div></div></div><div class="donut-legend">${legend}</div>`;
}

function renderCapexOpexBar(c) {
  const wrap = document.getElementById('capexOpexBar'); if (!wrap) return;
  const total = c.totalCapex + (c.totalRecurring * c.termMonths);
  if (total <= 0) { wrap.innerHTML = ''; return; }
  const capexPct = (c.totalCapex / total) * 100;
  const opexPct = 100 - capexPct;
  wrap.innerHTML = `<div class="co-bar"><div class="co-segment co-capex" style="width:${capexPct}%"><span>${capexPct.toFixed(0)}%</span></div><div class="co-segment co-opex" style="width:${opexPct}%"><span>${opexPct.toFixed(0)}%</span></div></div><div class="co-labels"><div><span class="co-dot" style="background:var(--chart-hardware)"></span>CapEx ${fmt(c.totalCapex)}</div><div><span class="co-dot" style="background:var(--chart-internet)"></span>OpEx ${fmt(Math.round(c.totalRecurring * c.termMonths))} (${c.termMonths}mo)</div></div>`;
}

function renderWaterfallChart(c) {
  const wrap = document.getElementById('waterfallChart'); if (!wrap) return;
  const maxVal = c.customerMonthlyFee;
  if (maxVal <= 0) { wrap.innerHTML = ''; return; }
  const bars = [
    { label: 'Nexus Cost', value: c.nexusMonthlyCost, color: 'var(--chart-cabling)' },
    { label: '+ Margin', value: c.monthlyGrossProfit, color: 'var(--chart-hardware)' },
    { label: 'Revenue', value: c.customerMonthlyFee, color: 'var(--chart-internet)' },
  ];
  wrap.innerHTML = `<div class="wf-bars">${bars.map(b => `<div class="wf-bar-col"><div class="wf-bar" style="height:${(b.value/maxVal)*100}%;background:${b.color}"></div><div class="wf-bar-value">${fmtDec(b.value)}</div><div class="wf-bar-label">${b.label}</div></div>`).join('')}</div>`;
}

// ===== FEATURE 7: WHAT-IF ANALYSIS =====
function renderWhatIf(c) {
  const el = document.getElementById('whatifContent'); if (!el) return;
  const years = Math.ceil(c.termMonths / 12);
  const hasPromo = state.usePromoPricing && c.internetPromoCost != null;
  const promoMonths = 12;

  let html = '<table class="whatif-table"><thead><tr><th>Period</th><th>Internet Rate</th><th>Monthly Fee</th><th>Annual Revenue</th><th>Annual Cost</th><th>Annual Profit</th></tr></thead><tbody>';
  let totalRevenue = 0, totalCost = 0;

  for (let yr = 1; yr <= years; yr++) {
    const monthsInYear = yr === years ? (c.termMonths - (years - 1) * 12) : 12;
    const isPromoYear = hasPromo && yr === 1;
    const promoMonthsThisYear = isPromoYear ? Math.min(promoMonths, monthsInYear) : 0;
    const regularMonthsThisYear = monthsInYear - promoMonthsThisYear;

    // Recalculate with regular pricing for non-promo months
    const promoInternetCost = hasPromo ? c.internetPromoCost : c.internetRegularCost;
    const regularInternetCost = c.internetRegularCost;
    const costDiff = regularInternetCost - promoInternetCost;

    const promoNexusCost = c.nexusMonthlyCost;
    const regularNexusCost = c.nexusMonthlyCost + (hasPromo ? costDiff : 0);
    const promoFee = promoNexusCost / (1 - c.marginDecimal);
    const regularFee = regularNexusCost / (1 - c.marginDecimal);

    const annualRevenue = (promoMonthsThisYear * promoFee) + (regularMonthsThisYear * regularFee);
    const annualCost = (promoMonthsThisYear * promoNexusCost) + (regularMonthsThisYear * regularNexusCost);
    const annualProfit = annualRevenue - annualCost;
    totalRevenue += annualRevenue; totalCost += annualCost;

    const highlight = isPromoYear ? ' class="whatif-promo-row"' : '';
    const rateLabel = isPromoYear ? `${fmtDec(promoInternetCost)} → ${fmtDec(regularInternetCost)}` : fmtDec(regularInternetCost);
    const feeLabel = isPromoYear ? `${fmtDec(promoFee)} → ${fmtDec(regularFee)}` : fmtDec(regularFee);
    html += `<tr${highlight}><td>Year ${yr}${isPromoYear ? ' ★' : ''}</td><td>${rateLabel}</td><td>${feeLabel}</td><td>${fmt(Math.round(annualRevenue))}</td><td>${fmt(Math.round(annualCost))}</td><td>${fmt(Math.round(annualProfit))}</td></tr>`;
  }
  html += `<tr class="whatif-total-row"><td>Total (${c.termMonths} mo)</td><td></td><td></td><td>${fmt(Math.round(totalRevenue))}</td><td>${fmt(Math.round(totalCost))}</td><td>${fmt(Math.round(totalRevenue - totalCost))}</td></tr>`;
  html += '</tbody></table>';
  if (hasPromo) html += '<div class="whatif-note">★ Promo rate applies for first 12 months, then reverts to regular pricing</div>';
  el.innerHTML = html;
}

// ===== FEATURE 8: CLIENT VIEW =====
function renderClientView(c) {
  const el = document.getElementById('clientSummaryContent');
  const termsEl = document.getElementById('clientTermsContent');
  if (!el || !termsEl) return;

  const items = [];
  items.push(`<div class="client-item">✓ ${c.internetTier.customerLabel} — High-speed business internet</div>`);
  if (state.secondaryWan !== 'none') items.push(`<div class="client-item">✓ ${c.wan2Data.customerLabel} — Failover connectivity</div>`);
  if (state.tertiaryWan !== 'none') items.push(`<div class="client-item">✓ ${c.wan3Data.customerLabel} — Additional redundancy</div>`);
  if (state.sdwanEnabled) items.push('<div class="client-item">✓ SD-WAN — Intelligent traffic management & failover</div>');
  items.push(`<div class="client-item">✓ ${c.apCount}× ${c.apModel.model} WiFi Access Points — Enterprise wireless coverage</div>`);
  items.push(`<div class="client-item">✓ ${c.gateway.model} Security Gateway — Advanced threat protection</div>`);
  if (c.totalCameras > 0) items.push(`<div class="client-item">✓ ${c.totalCameras} UniFi Protect Cameras (${state.indoorCameras} indoor, ${state.outdoorCameras} outdoor) — 24/7 surveillance</div>`);
  if (c.nvrQty > 0) items.push(`<div class="client-item">✓ ${c.nvr.model} Network Video Recorder — Local storage & playback</div>`);
  if (state.doors > 0) items.push(`<div class="client-item">✓ ${state.doors} UniFi Access Control Points — Secure entry management</div>`);
  items.push(`<div class="client-item">✓ ${state.drops} ${state.cableType === 'cat6a' ? 'Cat6A' : 'Cat6'} Network Drops — Modern structured cabling</div>`);
  items.push('<div class="client-item">✓ 24/7 NOC Monitoring & Help Desk Support</div>');
  items.push('<div class="client-item">✓ On-site Support & Maintenance Coverage</div>');
  items.push('<div class="client-item">✓ Professional Installation & Project Management</div>');
  el.innerHTML = items.join('');

  termsEl.innerHTML = `<div class="client-term-item">${c.termMonths}-month service agreement</div><div class="client-term-item">All equipment included — customer owns at term end</div><div class="client-term-item">24/7 remote monitoring & management</div><div class="client-term-item">On-site support included</div><div class="client-term-item">Hardware replacement coverage</div>`;
}

function toggleClientView() {
  state.clientView = !state.clientView;
  document.body.classList.toggle('client-view-mode', state.clientView);
  const label = document.getElementById('viewToggleLabel');
  if (label) label.textContent = state.clientView ? 'Client View' : 'Internal View';
  const summaryEl = document.getElementById('clientViewSummary');
  if (summaryEl) summaryEl.style.display = state.clientView ? '' : 'none';
  document.querySelectorAll('.internal-only').forEach(el => { el.style.display = state.clientView ? 'none' : ''; });
}

// ===== FEATURE 9: BANDWIDTH ADVISOR =====
function renderBandwidthAdvisor() {
  const el = document.getElementById('bandwidthResult'); if (!el) return;
  const s = state;
  const cloudMultiplier = s.bandwidthCloudIntensity === 'light' ? 1 : s.bandwidthCloudIntensity === 'medium' ? 1.5 : 2;
  const needed = Math.ceil(s.bandwidthUsers * 5 * cloudMultiplier + s.bandwidthVideoRooms * 10 + s.bandwidthVoipPhones * 0.1);

  // Find recommended tier
  let recommended = null, recommendedKey = null;
  for (const [key, tier] of Object.entries(PRICING.internet)) {
    if (tier.speedMbps >= needed) { recommended = tier; recommendedKey = key; break; }
  }
  if (!recommended) { const keys = Object.keys(PRICING.internet); recommendedKey = keys[keys.length - 1]; recommended = PRICING.internet[recommendedKey]; }

  const isEDI = recommended.type === 'dedicated';
  el.innerHTML = `<div class="bw-result-box"><div class="bw-needed"><span class="bw-number">${needed}</span> Mbps needed</div><div class="bw-formula">${s.bandwidthUsers} users × 5 Mbps × ${cloudMultiplier}x + ${s.bandwidthVideoRooms} video rooms × 10 Mbps + ${s.bandwidthVoipPhones} VoIP × 0.1 Mbps</div><div class="bw-rec">Recommended: <strong>${recommended.customerLabel}</strong> (${recommended.speedMbps} Mbps${isEDI ? ', dedicated' : ''})</div><button class="btn btn-primary btn-sm" id="btnApplyBandwidth" data-tier="${recommendedKey}">Apply Recommendation</button></div>`;
  document.getElementById('btnApplyBandwidth')?.addEventListener('click', () => {
    state.internetTier = recommendedKey;
    setVal('internetTier', recommendedKey);
    state.activeTemplate = 'custom';
    updateTemplatePills();
    render();
    showToast('Applied: ' + recommended.customerLabel);
  });
}


// ===== COMPETITOR COMPARISON (Network) =====
function renderNetworkCompetitorComparison(c) {
  let el = document.getElementById('networkCompetitorSection');
  if (!el) {
    // Create the section in the DOM
    const parent = document.querySelector('.results-panel') || document.querySelector('#main-content') || document.body;
    if (!parent) return;
    el = document.createElement('div');
    el.id = 'networkCompetitorSection';
    el.className = 'panel competitor-panel';
    parent.appendChild(el);
  }
  
  const apCount = c.apCount;
  const switchCount = c.totalSwitchCount;
  const termYears = 5;
  
  // UniFi TCO (5-year)
  const unifiHardware = c.totalHardware;
  const unifiLicensing5yr = 0; // $0 licensing!
  const unifi5yrTCO = unifiHardware;
  
  // Meraki TCO (5-year)
  const m = COMPETITOR_NETWORK.meraki;
  const merakiAPCost = apCount * m.ap.price;
  const merakiSwitchCost = switchCount * m.switch48.price;
  const merakiGWCost = m.gateway.price;
  const merakiHardware = merakiAPCost + merakiSwitchCost + merakiGWCost;
  const merakiLicensing5yr = (apCount * m.license.enterprise5yr) + (switchCount * m.license.switchLicense5yr) + m.license.gatewayLicense5yr;
  const meraki5yrTCO = merakiHardware + merakiLicensing5yr;
  const merakiPctMore = Math.round(((meraki5yrTCO - unifi5yrTCO) / unifi5yrTCO) * 100);
  
  // Aruba TCO (5-year)
  const a = COMPETITOR_NETWORK.aruba;
  const arubaAPCost = apCount * a.ap.price;
  const arubaSwitchCost = switchCount * a.switch48.price;
  const arubaGWCost = a.gateway.price;
  const arubaHardware = arubaAPCost + arubaSwitchCost + arubaGWCost;
  const arubaLicensing5yr = (apCount * a.license.centralFoundation5yr) + (switchCount * a.license.switchFoundation5yr) + a.license.gatewayLicense5yr;
  const aruba5yrTCO = arubaHardware + arubaLicensing5yr;
  const arubaPctMore = Math.round(((aruba5yrTCO - unifi5yrTCO) / unifi5yrTCO) * 100);
  
  el.innerHTML = `
    <div class="panel-header">
      <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg> 5-Year TCO Comparison</h2>
    </div>
    <div class="panel-body">
      <p style="color:var(--muted);font-size:13px;margin-bottom:12px;">Compare total cost of ownership over 5 years including hardware and mandatory licensing.</p>
      <div class="competitor-table-wrap">
        <table class="competitor-table" style="width:100%;border-collapse:collapse;">
          <thead>
            <tr><th>Vendor</th><th>Hardware</th><th>5-Year Licensing</th><th>5-Year TCO</th><th>vs UniFi</th></tr>
          </thead>
          <tbody>
            <tr style="background:rgba(74,222,128,0.08);">
              <td><strong>UniFi (NexusCT)</strong><br><span style="color:#4ade80;font-size:11px;">✓ $0 licensing forever</span></td>
              <td>${fmt(Math.round(unifiHardware))}</td>
              <td style="color:#4ade80;font-weight:700;">$0</td>
              <td><strong>${fmt(Math.round(unifi5yrTCO))}</strong></td>
              <td style="color:#4ade80;">Baseline</td>
            </tr>
            <tr>
              <td><strong>Cisco Meraki</strong><br><span style="color:#f87171;font-size:11px;">⚠ License required — hardware disabled without it</span></td>
              <td>${fmt(Math.round(merakiHardware))}</td>
              <td style="color:#f87171;font-weight:700;">${fmt(Math.round(merakiLicensing5yr))}</td>
              <td>${fmt(Math.round(meraki5yrTCO))}</td>
              <td style="color:#f87171;font-weight:700;">+${merakiPctMore}%</td>
            </tr>
            <tr>
              <td><strong>HPE Aruba</strong><br><span style="color:#f87171;font-size:11px;">⚠ Aruba Central subscription required</span></td>
              <td>${fmt(Math.round(arubaHardware))}</td>
              <td style="color:#f87171;font-weight:700;">${fmt(Math.round(arubaLicensing5yr))}</td>
              <td>${fmt(Math.round(aruba5yrTCO))}</td>
              <td style="color:#f87171;font-weight:700;">+${arubaPctMore}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:8px;padding:12px 16px;margin-top:12px;display:flex;align-items:flex-start;gap:10px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" style="flex-shrink:0;margin-top:2px;"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 010 4H8"/><path d="M12 18V6"/></svg>
        <div style="font-size:12px;">
          <strong style="color:#4ade80;">Save up to ${fmt(Math.round(meraki5yrTCO - unifi5yrTCO))} over 5 years vs Cisco Meraki</strong>
          <p style="color:var(--muted);margin-top:4px;">UniFi equipment is fully functional with no licensing fees — ever. Meraki hardware becomes a paperweight when the license expires. Aruba requires Central subscriptions for cloud management features.</p>
        </div>
      </div>
    </div>
  `;
  
  // Store for combined quote
  if (!NexusPricing.getCombinedQuotes()) NexusPricing.getCombinedQuotes() = {};
  NexusPricing.getCombinedQuotes().network = {
    type: 'Network Infrastructure',
    platform: 'UniFi',
    facility: '',
    total: c.contractValue,
    rangeLow: Math.round(c.customerMonthlyFee * c.termMonths * 0.95),
    rangeHigh: Math.round(c.customerMonthlyFee * c.termMonths * 1.05),
    monthlyFee: c.customerMonthlyFee,
    devices: c.allDeviceCount
  };
  renderCombinedQuoteButtonNetwork();
}

// ===== NETWORK SLA PACKAGES =====
function renderNetworkSLA(c) {
  let el = document.getElementById('networkSLASection');
  if (!el) {
    const parent = document.querySelector('.results-panel') || document.querySelector('#main-content') || document.body;
    if (!parent) return;
    el = document.createElement('div');
    el.id = 'networkSLASection';
    el.className = 'panel sla-panel';
    parent.appendChild(el);
  }
  
  const devices = c.allDeviceCount;
  let cards = '';
  for (const [key, pkg] of Object.entries(NETWORK_SLA_PACKAGES)) {
    const monthly = pkg.perDeviceMonth * devices;
    const annual = monthly * 12;
    const features = pkg.features.map(f => `<li style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;font-size:12px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${pkg.color}" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>${f}</li>`).join('');
    cards += `<div style="flex:1;min-width:200px;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:16px;position:relative;${pkg.popular ? 'border-color:' + pkg.color + ';box-shadow:0 0 0 1px ' + pkg.color + ';' : ''}">
      ${pkg.popular ? '<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:' + pkg.color + ';color:#000;font-size:10px;font-weight:700;padding:2px 10px;border-radius:10px;">MOST POPULAR</div>' : ''}
      <div style="text-align:center;margin-bottom:12px;">
        <div style="font-size:18px;font-weight:700;color:${pkg.color};">${pkg.name}</div>
        <div style="font-size:24px;font-weight:800;margin:4px 0;">${fmtDec(monthly)}<span style="font-size:13px;font-weight:400;">/mo</span></div>
        <div style="font-size:11px;color:var(--muted);">$${pkg.perDeviceMonth}/device × ${devices} devices</div>
        <div style="font-size:11px;color:var(--muted);">${fmt(Math.round(annual))}/year</div>
      </div>
      <ul style="list-style:none;padding:0;margin:0;">${features}</ul>
      <div style="text-align:center;margin-top:12px;font-size:10px;color:var(--muted);border-top:1px solid var(--border);padding-top:8px;">10% below industry average</div>
    </div>`;
  }
  
  el.innerHTML = `
    <div class="panel-header">
      <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Managed Service Plans</h2>
    </div>
    <div class="panel-body">
      <p style="color:var(--muted);font-size:13px;margin-bottom:16px;">Protect your network investment with ongoing expert support — priced 10% below industry average.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">${cards}</div>
    </div>
  `;
}

// Combined quote button for network page
function renderCombinedQuoteButtonNetwork() {
  const existing = document.getElementById('combinedQuoteBtnNet');
  if (existing) existing.remove();
  
  const quotes = NexusPricing.getCombinedQuotes() || {};
  const count = Object.keys(quotes).length;
  if (count === 0) return;
  
  const btn = document.createElement('div');
  btn.id = 'combinedQuoteBtnNet';
  btn.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;';
  btn.innerHTML = `<button onclick="showCombinedQuoteNet()" style="display:flex;align-items:center;gap:8px;padding:12px 20px;background:var(--accent,#0070f3);color:#fff;border:none;border-radius:999px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 24px rgba(0,0,0,0.3);transition:transform 0.15s;">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/></svg>
    Combined Quote (${count})
  </button>`;
  document.body.appendChild(btn);
}

window.showCombinedQuoteNet = function() {
  const quotes = NexusPricing.getCombinedQuotes() || {};
  if (Object.keys(quotes).length === 0) return;
  
  let rows = '', totalLow = 0, totalHigh = 0;
  for (const [key, q] of Object.entries(quotes)) {
    totalLow += q.rangeLow; totalHigh += q.rangeHigh;
    rows += `<tr><td><strong>${q.type}</strong></td><td>${fmtWhole(q.rangeLow)} — ${fmtWhole(q.rangeHigh)}</td></tr>`;
  }
  
  const modal = document.createElement('div');
  modal.id = 'combinedQuoteModalNet';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;';
  modal.innerHTML = `<div style="background:var(--surface,#fff);border-radius:12px;padding:24px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;box-shadow:0 25px 50px rgba(0,0,0,0.25);">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;"><h2 style="margin:0;">Combined System Quote</h2><button onclick="document.getElementById('combinedQuoteModalNet').remove()" style="background:none;border:none;font-size:24px;cursor:pointer;color:var(--text,#333);">&times;</button></div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;"><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid var(--border,#ddd);">System</th><th style="text-align:right;padding:8px;border-bottom:2px solid var(--border,#ddd);">Range</th></tr></thead><tbody>${rows}</tbody><tfoot><tr style="font-weight:700;font-size:18px;"><td style="padding:12px 8px;border-top:2px solid var(--border,#ddd);">Combined Total</td><td style="text-align:right;padding:12px 8px;border-top:2px solid var(--border,#ddd);">${fmtWhole(totalLow)} — ${fmtWhole(totalHigh)}</td></tr></tfoot></table>
    <button onclick="window.open('mailto:jmazza@nexusct.com?subject=Combined System Quote&body=Requesting combined proposal for ${Object.values(quotes).map(q=>q.type).join(' + ')}','_blank')" style="width:100%;padding:12px;background:var(--accent,#0070f3);color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;">Request Combined Proposal</button>
  </div>`;
  document.body.appendChild(modal);
};

// ===== FEATURE 2: SCENARIOS =====
function saveScenario() {
  if (state.savedScenarios.length >= 3) { showToast('Maximum 3 scenarios. Delete one first.'); return; }
  const c = calculate();
  const name = prompt('Scenario name:', `Config ${state.savedScenarios.length + 1}`) || `Config ${state.savedScenarios.length + 1}`;
  state.savedScenarios.push({ name, monthlyFee: c.customerMonthlyFee, capex: c.totalCapex, margin: state.marginPercent, contractValue: c.contractValue, termMonths: c.termMonths, template: state.activeTemplate, state: JSON.parse(JSON.stringify(state)) });
  renderScenarios();
  showToast('Scenario saved: ' + name);
}

function renderScenarios() {
  const drawer = document.getElementById('scenarioDrawer');
  const cards = document.getElementById('scenarioCards');
  const compareBtn = document.getElementById('btnCompare');
  if (!drawer || !cards) return;
  if (state.savedScenarios.length === 0) { drawer.style.display = 'none'; return; }
  drawer.style.display = '';
  cards.innerHTML = state.savedScenarios.map((sc, i) => `<div class="scenario-card"><div class="scenario-card-header"><span class="scenario-name">${sc.name}</span><button class="scenario-delete" data-idx="${i}">&times;</button></div><div class="scenario-metrics"><div class="sc-metric"><span class="sc-label">Monthly</span><span class="sc-value">${fmtDec(sc.monthlyFee)}</span></div><div class="sc-metric"><span class="sc-label">CapEx</span><span class="sc-value">${fmt(sc.capex)}</span></div><div class="sc-metric"><span class="sc-label">Margin</span><span class="sc-value">${sc.margin}%</span></div><div class="sc-metric"><span class="sc-label">${sc.termMonths}mo Value</span><span class="sc-value">${fmt(Math.round(sc.contractValue))}</span></div></div><button class="btn btn-ghost btn-sm scenario-load" data-idx="${i}">Load</button></div>`).join('');
  if (compareBtn) compareBtn.style.display = state.savedScenarios.length >= 2 ? '' : 'none';
  cards.querySelectorAll('.scenario-delete').forEach(btn => btn.addEventListener('click', (e) => { state.savedScenarios.splice(parseInt(e.target.dataset.idx), 1); renderScenarios(); }));
  cards.querySelectorAll('.scenario-load').forEach(btn => btn.addEventListener('click', (e) => { loadScenarioState(parseInt(e.target.dataset.idx)); }));
}

function loadScenarioState(idx) {
  const sc = state.savedScenarios[idx];
  if (!sc) return;
  const saved = state.savedScenarios;
  Object.assign(state, sc.state);
  state.savedScenarios = saved;
  syncFormFromState();
  render();
  showToast('Loaded: ' + sc.name);
}

function showCompareModal() {
  const modal = document.getElementById('compareModal');
  const body = document.getElementById('compareBody');
  if (!modal || !body) return;
  const scenarios = state.savedScenarios;
  if (scenarios.length < 2) return;
  let html = '<table class="compare-table"><thead><tr><th>Metric</th>';
  scenarios.forEach(sc => { html += `<th>${sc.name}</th>`; });
  html += '</tr></thead><tbody>';
  const rows = [
    ['Monthly Fee', sc => fmtDec(sc.monthlyFee)],
    ['Total CapEx', sc => fmt(sc.capex)],
    ['Margin', sc => sc.margin + '%'],
    ['Term', sc => sc.termMonths + ' months'],
    ['Contract Value', sc => fmt(Math.round(sc.contractValue))],
  ];
  rows.forEach(([label, fn]) => {
    html += `<tr><td>${label}</td>`;
    scenarios.forEach(sc => { html += `<td>${fn(sc)}</td>`; });
    html += '</tr>';
  });
  html += '</tbody></table>';
  body.innerHTML = html;
  modal.style.display = 'flex';
}

// ===== FEATURE 3: PDF EXPORT =====
function exportPDF() {
  const c = calculate();
  if (typeof window.jspdf === 'undefined') { showToast('PDF library loading... try again.'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const pw = 210, ph = 297, margin = 20;
  const usable = pw - margin * 2;

  // Cover page
  doc.setFillColor(13, 17, 23);
  doc.rect(0, 0, pw, ph, 'F');
  doc.setFillColor(88, 166, 255);
  doc.roundedRect(margin, 40, 40, 40, 6, 6, 'F');
  doc.setTextColor(13, 17, 23);
  doc.setFontSize(24); doc.setFont('helvetica', 'bold');
  doc.text('NCT', margin + 20, 66, { align: 'center' });
  doc.setTextColor(230, 237, 243);
  doc.setFontSize(28); doc.text('Nexus Communications Technology', margin, 110);
  doc.setFontSize(18); doc.setFont('helvetica', 'normal');
  doc.text('UniFi as a Service — System Proposal', margin, 125);
  doc.setFontSize(12); doc.setTextColor(139, 148, 158);
  doc.text('Date: ' + new Date().toLocaleDateString(), margin, 150);
  doc.text('Monthly Fee: ' + fmtDec(c.customerMonthlyFee), margin, 160);
  doc.text('Term: ' + c.termMonths + ' months', margin, 170);
  doc.text('Contract Value: ' + fmt(Math.round(c.contractValue)), margin, 180);

  // BOM page
  doc.addPage();
  doc.setFillColor(255, 255, 255); doc.rect(0, 0, pw, ph, 'F');
  doc.setTextColor(26, 31, 43); doc.setFontSize(16); doc.setFont('helvetica', 'bold');
  doc.text('Bill of Materials', margin, 25);
  let y = 40;
  doc.setFontSize(9); doc.setFont('helvetica', 'normal');

  const addBomSection = (title, items) => {
    if (y > 260) { doc.addPage(); y = 25; }
    doc.setFont('helvetica', 'bold'); doc.setFillColor(240, 243, 247);
    doc.rect(margin, y - 4, usable, 7, 'F');
    doc.text(title, margin + 2, y + 1); y += 10;
    doc.setFont('helvetica', 'normal');
    items.forEach(item => {
      if (y > 275) { doc.addPage(); y = 25; }
      doc.text(item.name, margin + 2, y);
      doc.text(item.detail || '', margin + usable - 2, y, { align: 'right' });
      y += 5;
    });
    y += 3;
  };

  addBomSection('Connectivity', [
    { name: c.internetTier.customerLabel, detail: fmtDec(c.internetCost) + '/mo' },
    ...(state.secondaryWan !== 'none' ? [{ name: 'Secondary: ' + c.wan2Data.customerLabel, detail: fmtDec(c.wan2MonthlyCost) + '/mo' }] : []),
    ...(state.tertiaryWan !== 'none' ? [{ name: 'Tertiary: ' + c.wan3Data.customerLabel, detail: fmtDec(c.wan3MonthlyCost) + '/mo' }] : []),
    ...(state.sdwanEnabled ? [{ name: 'SD-WAN Service', detail: fmtDec(c.sdwanTotalMonthlyCost) + '/mo' }] : []),
  ]);
  addBomSection('Network Hardware', [
    { name: c.gateway.model + ' (Gateway)', detail: fmt(c.gateway.price) },
    ...c.switchConfig.map(sw => ({ name: sw.qty + '× ' + sw.model, detail: fmt(sw.price * sw.qty) })),
    { name: c.apCount + '× ' + c.apModel.model + ' (APs)', detail: fmt(c.apCount * c.apModel.price) },
  ]);
  if (c.totalCameras > 0) addBomSection('Surveillance', [
    ...(state.indoorCameras > 0 ? [{ name: state.indoorCameras + '× ' + c.indoorModel.model + ' (Indoor)', detail: fmt(state.indoorCameras * c.indoorModel.price) }] : []),
    ...(state.outdoorCameras > 0 ? [{ name: state.outdoorCameras + '× ' + c.outdoorModel.model + ' (Outdoor)', detail: fmt(state.outdoorCameras * c.outdoorModel.price) }] : []),
    ...(c.nvrQty > 0 ? [{ name: c.nvrQty + '× ' + c.nvr.model, detail: fmt(c.nvrQty * c.nvr.price) }] : []),
  ]);
  if (state.doors > 0) addBomSection('Access Control', [
    { name: state.doors + '× ' + c.reader.model, detail: fmt(state.doors * c.reader.price) },
    ...c.hubs.map(h => ({ name: h.qty + '× ' + h.model, detail: fmt(h.price * h.qty) })),
  ]);
  addBomSection('Structured Cabling', [
    { name: state.drops + ' ' + (state.cableType === 'cat6a' ? 'Cat6A' : 'Cat6') + ' drops', detail: fmt(c.cablingHardware) },
    { name: 'MDF Buildout', detail: fmt(c.mdfCost) },
  ]);

  // Pricing summary page
  doc.addPage();
  doc.setFillColor(255, 255, 255); doc.rect(0, 0, pw, ph, 'F');
  doc.setTextColor(26, 31, 43); doc.setFontSize(16); doc.setFont('helvetica', 'bold');
  doc.text('Pricing Summary', margin, 25);
  y = 45;
  doc.setFontSize(11); doc.setFont('helvetica', 'normal');
  const addPriceLine = (label, val) => { doc.text(label, margin, y); doc.text(val, margin + usable, y, { align: 'right' }); y += 7; };
  addPriceLine('Total Hardware Investment', fmt(c.totalCapex));
  addPriceLine('Amortized Monthly', fmtDec(c.amortizedMonthly) + '/mo');
  addPriceLine('Monthly Recurring Services', fmtDec(c.totalRecurring) + '/mo');
  y += 5;
  doc.setFont('helvetica', 'bold'); doc.setFontSize(14);
  addPriceLine('Monthly Service Fee', fmtDec(c.customerMonthlyFee));
  addPriceLine(c.termMonths + '-Month Contract Value', fmt(Math.round(c.contractValue)));

  // Terms page
  doc.addPage();
  doc.setFillColor(255, 255, 255); doc.rect(0, 0, pw, ph, 'F');
  doc.setTextColor(26, 31, 43); doc.setFontSize(16); doc.setFont('helvetica', 'bold');
  doc.text('Terms & Conditions', margin, 25);
  doc.setFontSize(10); doc.setFont('helvetica', 'normal'); y = 40;
  const terms = [
    `This proposal covers a ${c.termMonths}-month Unified Infrastructure as a Service agreement.`,
    'All hardware, installation, and managed services are included in the monthly fee.',
    'Customer owns all equipment at the end of the service term.',
    '24/7 remote monitoring via Nexus Network Operations Center (NOC).',
    'Help desk support included during business hours with 24/7 emergency coverage.',
    'On-site support and hardware replacement coverage included.',
    'Internet connectivity provided via Comcast Business / Enterprise services.',
    'Standard SLA: 99.9% network uptime guarantee.',
    'Equipment warranty: covered for duration of service agreement.',
    'Early termination: remaining months of service fee applies.',
  ];
  terms.forEach(t => {
    const lines = doc.splitTextToSize('• ' + t, usable - 10);
    lines.forEach(l => { doc.text(l, margin + 5, y); y += 5; });
    y += 2;
  });

  y += 15;
  doc.setFontSize(9); doc.setTextColor(139, 148, 158);
  doc.text('Nexus Communications Technology | (847) 796-5585 | info@nxsct.com', margin, y);
  doc.text('Prepared: ' + new Date().toLocaleDateString(), margin, y + 5);

  doc.save('NexusCT-UaaS-Proposal.pdf');
  showToast('PDF proposal downloaded');
}

// ===== FEATURE 4: URL HASH STATE =====
function updateHash() {
  const s = { ...state };
  delete s.savedScenarios; // Don't persist scenarios in URL
  try { window.history.replaceState(null, '', '#' + btoa(JSON.stringify(s))); } catch (e) {}
}

function restoreFromHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) return false;
  try {
    const decoded = JSON.parse(atob(hash));
    Object.assign(state, decoded);
    state.savedScenarios = state.savedScenarios || [];
    return true;
  } catch (e) { return false; }
}

function copyLink() {
  updateHash();
  navigator.clipboard.writeText(window.location.href).then(() => showToast('Link copied to clipboard'));
}

// ===== FEATURE 1: TEMPLATES =====
function applyTemplate(key) {
  const tpl = TEMPLATES[key];
  state.activeTemplate = key;
  if (tpl) {
    Object.assign(state, tpl);
    state.overrideGateway = null; state.overrideApCount = null; state.overrideSwitches = null;
    syncFormFromState();
  }
  updateTemplatePills();
  render();
}

function updateTemplatePills() {
  document.querySelectorAll('.template-pill').forEach(p => { p.classList.toggle('active', p.dataset.template === state.activeTemplate); });
}

// ===== SYNC FORM FROM STATE =====
function syncFormFromState() {
  setVal('internetTier', state.internetTier);
  const promoEl = document.getElementById('usePromoPricing'); if (promoEl) promoEl.checked = state.usePromoPricing;
  setVal('secondaryWan', state.secondaryWan);
  setVal('tertiaryWan', state.tertiaryWan);
  const sdwanEl = document.getElementById('sdwanEnabled'); if (sdwanEl) sdwanEl.checked = state.sdwanEnabled;
  setVal('sqft', state.sqft);
  setVal('floors', state.floors);
  setVal('drops', state.drops);
  setVal('cableType', state.cableType);
  setVal('apModel', state.apModelIndex);
  setVal('indoorCameras', state.indoorCameras);
  setVal('outdoorCameras', state.outdoorCameras);
  setVal('indoorCameraModel', state.indoorCameraModel);
  setVal('outdoorCameraModel', state.outdoorCameraModel);
  setVal('doors', state.doors);
  setVal('readerModel', state.readerModel);
  setVal('marginSlider', state.marginPercent);
  // Term pills
  document.querySelectorAll('.term-pill').forEach(p => { p.classList.toggle('active', parseInt(p.dataset.term) === state.termMonths); });
  // Bandwidth
  setVal('bandwidthUsers', state.bandwidthUsers);
  setVal('bandwidthVideoRooms', state.bandwidthVideoRooms);
  setVal('bandwidthCloudIntensity', state.bandwidthCloudIntensity);
  setVal('bandwidthVoipPhones', state.bandwidthVoipPhones);
  const buVal = document.getElementById('bandwidthUsersVal'); if (buVal) buVal.textContent = state.bandwidthUsers;
  const bvVal = document.getElementById('bandwidthVideoRoomsVal'); if (bvVal) bvVal.textContent = state.bandwidthVideoRooms;
  const bpVal = document.getElementById('bandwidthVoipPhonesVal'); if (bpVal) bpVal.textContent = state.bandwidthVoipPhones;
}

// ===== UTILITY =====
function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val; }
function showToast(msg) { const toast = document.getElementById('toast'); if (!toast) return; toast.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500); }

function copyToClipboard() {
  const c = calculate();
  const lines = ['═══════════════════════════════════════════', 'NEXUS COMMUNICATIONS TECHNOLOGY', 'UniFi as a Service — System Configuration', '═══════════════════════════════════════════', '', `Date: ${new Date().toLocaleDateString()}`, '', 'CONNECTIVITY', `  Primary: ${c.internetTier.name}`, `  Primary Cost: ${fmtDec(c.internetCost)}/mo`];
  if (state.secondaryWan !== 'none') lines.push(`  Secondary: ${c.wan2Data.name} — ${fmtDec(c.wan2MonthlyCost)}/mo`);
  if (state.tertiaryWan !== 'none') lines.push(`  Tertiary: ${c.wan3Data.name} — ${fmtDec(c.wan3MonthlyCost)}/mo`);
  if (state.sdwanEnabled) lines.push(`  SD-WAN: Enabled — ${fmtDec(c.sdwanTotalMonthlyCost)}/mo`);
  lines.push('', 'FACILITY & HARDWARE', `  Facility: ${state.sqft.toLocaleString()} sq ft, ${state.floors} floor(s)`, `  Network Drops: ${state.drops} (${state.cableType === 'cat6a' ? 'Cat6A' : 'Cat6'})`, `  Access Points: ${c.apCount}× ${c.apModel.model}`, `  Gateway: ${c.gateway.model}`, `  Cameras: ${state.indoorCameras} indoor + ${state.outdoorCameras} outdoor`, `  Access Control: ${state.doors} doors`, '', 'PRICING SUMMARY', `  Total CapEx: ${fmt(c.totalCapex)}`, `  Monthly Fee: ${fmtDec(c.customerMonthlyFee)}/mo`, `  ${c.termMonths}-Month Contract Value: ${fmt(Math.round(c.contractValue))}`, '', '═══════════════════════════════════════════');
  navigator.clipboard.writeText(lines.join('\n')).then(() => showToast('Summary copied to clipboard'));
}

function resetConfig() {
  const saved = state.savedScenarios;
  state = { internetTier: 'cb_standard', usePromoPricing: false, secondaryWan: 'none', tertiaryWan: 'none', sdwanEnabled: false, sqft: 10000, floors: 1, drops: 48, cableType: 'cat6a', apModelIndex: 3, indoorCameras: 8, outdoorCameras: 4, indoorCameraModel: 2, outdoorCameraModel: 1, doors: 4, readerModel: 1, marginPercent: 45, termMonths: 36, clientView: false, activeTemplate: 'custom', savedScenarios: saved, bandwidthUsers: 25, bandwidthVideoRooms: 2, bandwidthCloudIntensity: 'medium', bandwidthVoipPhones: 10, overrideGateway: null, overrideApCount: null, overrideSwitches: null };
  syncFormFromState();
  updateTemplatePills();
  if (state.clientView) toggleClientView();
  render();
  showToast('Configuration reset to defaults');
}

// ===== EVENT BINDINGS =====
function bindInputs() {
  bind('internetTier', 'change', v => { state.internetTier = v; state.activeTemplate = 'custom'; updateTemplatePills(); });
  bind('usePromoPricing', 'change', () => { state.usePromoPricing = document.getElementById('usePromoPricing').checked; });
  bind('secondaryWan', 'change', v => { state.secondaryWan = v; state.activeTemplate = 'custom'; updateTemplatePills(); });
  bind('tertiaryWan', 'change', v => { state.tertiaryWan = v; state.activeTemplate = 'custom'; updateTemplatePills(); });
  bind('sdwanEnabled', 'change', () => { state.sdwanEnabled = document.getElementById('sdwanEnabled').checked; });
  bind('sqft', 'input', v => { state.sqft = clamp(parseInt(v) || 1000, 1000, 200000); state.overrideApCount = null; state.overrideSwitches = null; state.activeTemplate = 'custom'; updateTemplatePills(); });
  bind('floors', 'input', v => { state.floors = clamp(parseInt(v) || 1, 1, 10); state.activeTemplate = 'custom'; updateTemplatePills(); });
  bind('drops', 'input', v => { state.drops = clamp(parseInt(v) || 1, 1, 500); state.overrideSwitches = null; state.activeTemplate = 'custom'; updateTemplatePills(); });
  bind('cableType', 'change', v => { state.cableType = v; });
  bind('apModel', 'change', v => { state.apModelIndex = parseInt(v); });
  bind('indoorCameras', 'input', v => { state.indoorCameras = clamp(parseInt(v) || 0, 0, 100); state.overrideSwitches = null; });
  bind('outdoorCameras', 'input', v => { state.outdoorCameras = clamp(parseInt(v) || 0, 0, 100); state.overrideSwitches = null; });
  bind('indoorCameraModel', 'change', v => { state.indoorCameraModel = parseInt(v); });
  bind('outdoorCameraModel', 'change', v => { state.outdoorCameraModel = parseInt(v); });
  bind('doors', 'input', v => { state.doors = clamp(parseInt(v) || 0, 0, 50); state.overrideSwitches = null; });
  bind('readerModel', 'change', v => { state.readerModel = parseInt(v); });
  bind('marginSlider', 'input', v => { state.marginPercent = parseInt(v); render(); });

  // Bandwidth advisor sliders
  bind('bandwidthUsers', 'input', v => { state.bandwidthUsers = parseInt(v); const el = document.getElementById('bandwidthUsersVal'); if (el) el.textContent = v; });
  bind('bandwidthVideoRooms', 'input', v => { state.bandwidthVideoRooms = parseInt(v); const el = document.getElementById('bandwidthVideoRoomsVal'); if (el) el.textContent = v; });
  bind('bandwidthCloudIntensity', 'change', v => { state.bandwidthCloudIntensity = v; });
  bind('bandwidthVoipPhones', 'input', v => { state.bandwidthVoipPhones = parseInt(v); const el = document.getElementById('bandwidthVoipPhonesVal'); if (el) el.textContent = v; });

  // Quick actions
  document.getElementById('btnExport')?.addEventListener('click', exportPDF);
  document.getElementById('btnClipboard')?.addEventListener('click', copyToClipboard);
  document.getElementById('btnCopyLink')?.addEventListener('click', copyLink);
  document.getElementById('btnSaveScenario')?.addEventListener('click', saveScenario);
  document.getElementById('btnReset')?.addEventListener('click', resetConfig);
  document.getElementById('btnViewToggle')?.addEventListener('click', toggleClientView);
  document.getElementById('btnCompare')?.addEventListener('click', showCompareModal);
  document.getElementById('btnCloseCompare')?.addEventListener('click', () => { document.getElementById('compareModal').style.display = 'none'; });

  // Template pills
  document.querySelectorAll('.template-pill').forEach(p => { p.addEventListener('click', () => applyTemplate(p.dataset.template)); });

  // Term pills
  document.querySelectorAll('.term-pill').forEach(p => {
    p.addEventListener('click', () => { state.termMonths = parseInt(p.dataset.term); document.querySelectorAll('.term-pill').forEach(pp => pp.classList.toggle('active', pp === p)); render(); });
  });

  // Bandwidth advisor toggle
  const bwHeader = document.getElementById('bandwidthToggleHeader');
  if (bwHeader) {
    bwHeader.addEventListener('click', () => {
      const body = document.getElementById('bandwidthBody');
      const chev = document.getElementById('bandwidthChevron');
      if (body) { const open = body.style.display !== 'none'; body.style.display = open ? 'none' : ''; if (chev) chev.style.transform = open ? '' : 'rotate(180deg)'; bwHeader.classList.toggle('expanded', !open); }
    });
  }
}

function bind(id, event, handler) { const el = document.getElementById(id); if (!el) return; el.addEventListener(event, e => { handler(e.target.value); render(); }); }

// ===== THEME TOGGLE =====
(function() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = 'dark';
  root.setAttribute('data-theme', theme);
  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      toggle.innerHTML = theme === 'dark' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }
})();

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  const restoredFromHash = restoreFromHash();
  if (restoredFromHash) syncFormFromState();
  updateTemplatePills();
  bindInputs();
  render();
  renderScenarios();
});


// ---- Lead Capture Integration (shared module) ----
// Gate the quote generation behind lead capture
const _originalSaveQuote = window.saveScenario;
document.addEventListener("DOMContentLoaded", function() {
  NexusPricing.getCombinedQuotes();
  NexusPricing.renderCombinedQuoteButton();
});