// =====================================================
// NexusCT Shared Pricing Engine v1.0
// Used by ALL configurators and pricing displays
// =====================================================

const NexusPricing = (() => {
  'use strict';

  // ---- Constants ----
  const MARGIN = 0.25;
  const FINANCE_APR = 0.079;
  const NCAAS_MARKUP = 1.20;
  const NCAAS_TERM = 60;
  const RANGE_FACTOR = 0.30; // +/- 30%

  // ---- Format Functions ----
  // All client-visible pricing MUST use these formatters

  /** Format as whole dollar: "$12,345" */
  function fmtWhole(n) {
    if (n == null || isNaN(n)) return '$0';
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  /** Format with cents: "$12,345.00" */
  function fmtDec(n) {
    if (n == null || isNaN(n)) return '$0.00';
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  /** Format as +/-30% range: "$8,642 — $16,048" */
  function fmtRange(n) {
    const low = Math.round(n * (1 - RANGE_FACTOR));
    const high = Math.round(n * (1 + RANGE_FACTOR));
    return fmtWhole(low) + ' — ' + fmtWhole(high);
  }

  /** Format as monthly range: "$1,234 — $2,290/mo" */
  function fmtMonthlyRange(n) {
    return fmtRange(n) + '/mo';
  }

  /** Format as per-bed monthly range: "$24.44 — $45.38/bed/mo" */
  function fmtPerBedRange(n) {
    const low = (n * (1 - RANGE_FACTOR)).toFixed(2);
    const high = (n * (1 + RANGE_FACTOR)).toFixed(2);
    return '$' + low + ' — $' + high + '/bed/mo';
  }

  /** Format percentage: "25.0%" */
  function fmtPct(n) {
    return n.toFixed(1) + '%';
  }

  // ---- Calculation Functions ----

  /** Calculate sell price from dealer cost (25% margin) */
  function sellPrice(cost) {
    return cost / (1 - MARGIN);
  }

  /** Calculate monthly payment for financing */
  function calcMonthlyPayment(principal, apr, months) {
    const r = apr / 12;
    if (r === 0) return principal / months;
    return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  }

  /** Get all financing term options for a given total cost */
  function getFinancingOptions(totalCost) {
    return [
      { months: 36, label: '3-Year', payment: calcMonthlyPayment(totalCost, FINANCE_APR, 36) },
      { months: 48, label: '4-Year', payment: calcMonthlyPayment(totalCost, FINANCE_APR, 48) },
      { months: 60, label: '5-Year', payment: calcMonthlyPayment(totalCost, FINANCE_APR, 60), highlight: true }
    ];
  }

  /** Calculate NCaaS (Nurse Call as a Service) pricing */
  function calcNCaaS(totalCost, beds) {
    const monthlyTotal = (totalCost * NCAAS_MARKUP) / NCAAS_TERM;
    return {
      monthlyTotal,
      perBed: monthlyTotal / beds,
      includedServices: [
        'Equipment lease & installation',
        '24/7 system monitoring',
        'Preventive maintenance',
        'Software updates',
        'Hardware replacement',
        'Priority support'
      ]
    };
  }

  // ---- Jeron Parts Database (Tier 2 Dealer Cost) ----
  const JERON_PARTS = {
    // Infrastructure
    "7950":  { name: "Room Controller", cost: 214.50 },
    "7953":  { name: "Room Controller w/Prism Dome", cost: 259.50 },
    "7953-T":{ name: "Room Controller w/Dome+Tone", cost: 333.00 },
    "7991":  { name: "8-Port Ethernet Switch", cost: 1215.00 },
    "7992":  { name: "Gateway 2-Channel", cost: 930.00 },
    "7993":  { name: "Gateway 8-Channel", cost: 1087.50 },
    "7989":  { name: "Cabinet (30x24)", cost: 315.00 },
    "7960":  { name: "Console Controller", cost: 202.50 },
    "7963":  { name: "Console Controller w/Zone Light", cost: 342.00 },
    // Patient Stations
    "7920":  { name: "Single Patient Station", cost: 252.00 },
    "7922":  { name: "Dual Patient Station", cost: 297.00 },
    "7923":  { name: "Enhanced Single Patient Station", cost: 300.00 },
    "7924":  { name: "Enhanced Dual Patient Station", cost: 396.00 },
    "7925":  { name: "Single Patient (DIN only)", cost: 201.00 },
    "7926":  { name: "Dual Patient (DIN only)", cost: 225.00 },
    "7912":  { name: "Staff Station/Pushbutton", cost: 159.00 },
    "7919":  { name: "Pullcord/Bath Audio Station", cost: 159.00 },
    "7930":  { name: "Single Pushbutton Station", cost: 69.00 },
    "7932":  { name: "Pullcord and Pushbutton", cost: 72.00 },
    "7958":  { name: "Pullcord Shower Station", cost: 73.50 },
    // Behavioral
    "7912-PC": { name: "Behavioral Intercom w/Call", cost: 442.50 },
    "7912-PCC":{ name: "Behavioral Intercom w/Call+Cancel", cost: 495.00 },
    "7912-PCK":{ name: "Behavioral w/Panic+Remote Cancel", cost: 547.50 },
    "7920-PC": { name: "Behavioral Patient w/Cancel", cost: 592.50 },
    "7930-PC": { name: "Behavioral Call w/Cancel", cost: 306.00 },
    // Consoles
    "7965":  { name: "Touchscreen Nurse Console", cost: 1200.00 },
    "7965-B":{ name: "Touchscreen Console w/Bluetooth", cost: 1687.50 },
    "7967-M":{ name: "Touchscreen Nurse Terminal", cost: 933.00 },
    "7967-P":{ name: "Touchscreen Workflow Terminal", cost: 933.00 },
    "7967-S":{ name: "Touchscreen Staff Duty Terminal", cost: 933.00 },
    // Dome/Zone
    "7973":  { name: "Prism Zone Light", cost: 312.00 },
    "7973-T":{ name: "Prism Zone Light w/Tone", cost: 385.50 },
    // Accessories
    "7901":  { name: "Standard Pillow Speaker", cost: 121.50 },
    "7905":  { name: "Enhanced Pillow Speaker w/Light", cost: 202.50 },
    "7908":  { name: "10ft DIN Call Cord Sealed", cost: 49.50 },
    "7910":  { name: "10ft DIN Call Cord", cost: 34.50 },
    "7914":  { name: "Geriatric Call Cord", cost: 202.50 },
    // Software
    "7970":  { name: "Automated Voice PA", cost: 750.00 },
    "7977":  { name: "ADT Integration", cost: 1125.00 },
    "7978":  { name: "SIP Phone Integration", cost: 1875.00 },
    "7979":  { name: "Pocket Paging", cost: 375.00 },
    "7979D": { name: "Dual Pocket Paging", cost: 975.00 },
    "7980":  { name: "Staff Assignment", cost: 1500.00 },
    "7981":  { name: "RTLS Integration", cost: 750.00 },
    "7982":  { name: "Barcode Staff Mgmt", cost: 375.00 },
    "7983":  { name: "EIS Logging/Reporting", cost: 1125.00 },
    "7984":  { name: "LAN Bridge Standard", cost: 1650.00 },
    "7985":  { name: "PC Console Software", cost: 1500.00 },
    "7986":  { name: "PC Console MapView", cost: 1500.00 },
    "7987":  { name: "Android Notification (w/2 devices)", cost: 4500.00 },
    "7987-05":{ name: "Additional Android Devices (5-pack)", cost: 1500.00 },
    "7990":  { name: "Admin/Programming Software", cost: 727.50 },
    // Services
    "9965":  { name: "Jeron Commissioning", cost: 3000.00 },
    "9967":  { name: "Jeron Integration Support", cost: 3750.00 },
    "9971":  { name: "Jeron Clinical In-Service", cost: 2250.00 },
    // Room/Hallway/Display
    "7912-STA": { name: "Staff Assignment Display Panel", cost: 285.00 },
    "7967-DIS": { name: "Annunciator/Secondary Display", cost: 750.00 },
    "7950-DB":  { name: "Door Monitor Contact Interface", cost: 145.00 },
    "7950-BE":  { name: "Bed Exit Alarm Interface", cost: 175.00 },
    "7970-PA":  { name: "Hallway Audio Annunciator", cost: 425.00 },
    "7973-D":   { name: "Digital Hallway Display Panel", cost: 1250.00 },
    "7973-M":   { name: "Master Display Panel", cost: 1875.00 },
    "7973-RM":  { name: "Room Number LED Panel", cost: 165.00 },
    "7973-ST":  { name: "Patient Status Display", cost: 245.00 },
    "7973-RGB": { name: "Multi-Color Room LED Strip", cost: 125.00 },
    "TV-INT":   { name: "In-Room TV Integration Module", cost: 350.00 },
    "AI-ASST":  { name: "AI Virtual Assistant (Alexa Healthcare)", cost: 275.00 },
    "TAB-CC":   { name: "Patient Care Coordination Tablet", cost: 850.00 },
    "DIS-INFO": { name: "Bedside Patient Infotainment Display", cost: 650.00 },
    "PP-SENSOR":{ name: "Pressure Pad Sensor", cost: 165.00 },
    // Infrastructure Dependencies
    "7995":  { name: "Power Supply w/Battery Backup", cost: 1065.00 },
    "9778":  { name: "J-Bus Terminator", cost: 3.00 },
    "9779":  { name: "J-Bus Splitter", cost: 2.50 },
    "7969":  { name: "Console Receptacle", cost: 24.00 },
    "9840":  { name: "Rack Mount Adaptor (Gateway)", cost: 199.50 },
    "9842":  { name: "Rack Mount Adaptor (Switch)", cost: 199.50 },
  };

  // ---- RCare Parts Database (Dealer Cost) ----
  const RCARE_PARTS = {
    "RCube":      { name: "RCube Enterprise Server", cost: 4500 },
    "BCube":      { name: "BCube Small Facility Server", cost: 2600 },
    "MR-500-G4": { name: "Master Receiver", cost: 800 },
    "LT-490-G4": { name: "Locator", cost: 350 },
    "RP-990-G4": { name: "Repeater", cost: 450 },
    "Outdoor-Enc":{ name: "Outdoor Enclosure", cost: 200 },
    "WTC-G4":    { name: "Wireless Pendant (Standard)", cost: 72 },
    "Pretty-G4": { name: "Pretty Pretty Pendant (G4)", cost: 96 },
    "RC-WTC":    { name: "Wearable Transmitter", cost: 68 },
    "Staff-Pend":{ name: "Staff Emergency Pendant", cost: 68 },
    "BP-7RWR":   { name: "Emergency Pull Cord", cost: 90 },
    "JR-14":     { name: "Bedside Station", cost: 110 },
    "WM-8":      { name: "Wall Push Button", cost: 55 },
    "Help-Btn":  { name: "Help Button (large)", cost: 65 },
    "WD-3":      { name: "Door/Window Contact", cost: 75 },
    "MS-6":      { name: "Activity Sensor", cost: 120 },
    "UT-RE3":    { name: "Universal Transmitter", cost: 85 },
    "RC-BCA9":   { name: "Bed/Chair Pad Alarm", cost: 140 },
    "RK-77":     { name: "Remote Keypad", cost: 95 },
    "CC980":     { name: 'CC980 Touchscreen Console 15"', cost: 1875 },
    "CC-10":     { name: 'CC-10 Compact Console 10"', cost: 1350 },
    "RC-3900":   { name: "Voice Communicator", cost: 280 },
    "RC-5200":   { name: "Cellular Voice Dialer", cost: 350 },
    "Indoor-Int":{ name: "Indoor Intercom", cost: 220 },
    "RPhone":    { name: "RPhone (locked smartphone)", cost: 340 },
    "Pager-Int": { name: "Pager Integration", cost: 225 },
    "Dome-LED":  { name: "Corridor Dome Light (3-color LED)", cost: 180 },
    "PCC-Int":   { name: "PointClickCare Integration", cost: 1500 },
    "Wander-Int":{ name: "Wander Management Integration", cost: 1875 },
    "VCube":     { name: "Voice-to-Voice (VCube) Upgrade", cost: 2000 },
    "MCube":     { name: "RCare Mobile (MCube) Upgrade", cost: 2500 },
    "RC-TV":    { name: "In-Room TV Integration", cost: 325 },
    "RC-AI":    { name: "AI Virtual Assistant (Alexa Healthcare)", cost: 275 },
    "RC-TAB":   { name: "Patient Care Coordination Tablet", cost: 850 },
    "RC-INFO":  { name: "Bedside Patient Infotainment Display", cost: 650 },
    "RC-HAUD":  { name: "Hallway Audio Annunciator", cost: 400 },
    "RC-HDIS":  { name: "Digital Hallway Display", cost: 1200 },
    "RC-MDIS":  { name: "Master Display Panel", cost: 1800 },
    "RC-RMPN":  { name: "Room Number LED Panel", cost: 160 },
    "RC-STPN":  { name: "Patient Status Display", cost: 235 },
    "RC-RGB":   { name: "Multi-Color Room LED Strip", cost: 120 },
    "RC-PP":    { name: "Pressure Pad Sensor", cost: 155 },
    "RC-ACT":   { name: "Activity Monitoring & Reporting License", cost: 500 },
  };

  // ---- Competitor Pricing Data ----
  const COMPETITORS = {
    rauland: {
      name: "Rauland Responder (AMETEK)",
      perBedEquipment: 3200,
      installPerBed: 400,
      annualSoftwareFee: 85,
      annualMaintenanceFee: 120,
      softwareFeeLabel: "$85/bed/year",
      maintenanceFeeLabel: "$120/bed/year",
      notes: "Requires annual software licensing + maintenance contract"
    },
    westcom: {
      name: "Hillrom Versacare (Westcom)",
      perBedEquipment: 2800,
      installPerBed: 350,
      annualSoftwareFee: 75,
      annualMaintenanceFee: 100,
      softwareFeeLabel: "$75/bed/year",
      maintenanceFeeLabel: "$100/bed/year",
      notes: "Requires annual software licensing + maintenance contract"
    },
    ge: {
      name: "GE Healthcare Nurse Call",
      perBedEquipment: 3500,
      installPerBed: 450,
      annualSoftwareFee: 95,
      annualMaintenanceFee: 140,
      softwareFeeLabel: "$95/bed/year",
      maintenanceFeeLabel: "$140/bed/year",
      notes: "Requires annual software licensing + maintenance contract"
    }
  };

  // ---- SLA Managed Service Packages ----
  // Priced 10% below market average
  const SLA_PACKAGES = {
    bronze: {
      name: "Bronze",
      color: "#cd7f32",
      perBedMonth: 45,
      features: [
        "Business hours phone support (8am–6pm M–F)",
        "48-hour on-site response time",
        "Annual preventive maintenance inspection",
        "Software updates included",
        "Remote system monitoring",
        "Parts coverage (depot repair)"
      ]
    },
    silver: {
      name: "Silver",
      color: "#C0C0C0",
      perBedMonth: 68,
      popular: true,
      features: [
        "Extended hours support (7am–10pm, 7 days)",
        "24-hour on-site response time",
        "Semi-annual preventive maintenance",
        "Software updates + firmware upgrades",
        "24/7 remote monitoring & diagnostics",
        "Parts + labor coverage",
        "Quarterly system health reports",
        "Staff training refresher (annual)"
      ]
    },
    gold: {
      name: "Gold",
      color: "#FFD700",
      perBedMonth: 90,
      features: [
        "24/7/365 priority phone & email support",
        "4-hour emergency on-site response",
        "Quarterly preventive maintenance",
        "All software, firmware & feature updates",
        "24/7 proactive monitoring with auto-alerts",
        "Full parts + labor + loaner equipment",
        "Monthly system health reports",
        "Unlimited staff training sessions",
        "Dedicated account manager",
        "Annual technology review & upgrade planning"
      ]
    }
  };

  // ---- Combined Quote System ----
  // Stores quotes across configurators (nurse call + UaaS)
  const _combinedQuotes = {};

  function addToCombinedQuote(key, quoteData) {
    _combinedQuotes[key] = quoteData;
    NexusStorage.session.setItem('nexus_combined_quotes', JSON.stringify(_combinedQuotes));
    renderCombinedQuoteButton();
  }

  function getCombinedQuotes() {
    const stored = NexusStorage.session.getItem('nexus_combined_quotes');
    if (stored) {
      Object.assign(_combinedQuotes, JSON.parse(stored));
    }
    return _combinedQuotes;
  }

  function renderCombinedQuoteButton() {
    const quotes = getCombinedQuotes();
    const count = Object.keys(quotes).length;
    if (count < 1) return;

    let btn = document.getElementById('combinedQuoteFloater');
    if (!btn) {
      btn = document.createElement('div');
      btn.id = 'combinedQuoteFloater';
      btn.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;';
      document.body.appendChild(btn);
    }
    btn.innerHTML = `<button onclick="NexusPricing.showCombinedQuote()" style="display:flex;align-items:center;gap:8px;padding:12px 20px;background:var(--primary,#0066B3);color:#fff;border:none;border-radius:999px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 24px rgba(0,0,0,0.3);transition:transform 0.15s;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
      Combined Quote (${count})
    </button>`;
  }

  function showCombinedQuote() {
    const quotes = getCombinedQuotes();
    if (Object.keys(quotes).length === 0) return;

    let rows = '', totalLow = 0, totalHigh = 0;
    for (const [key, q] of Object.entries(quotes)) {
      totalLow += q.rangeLow;
      totalHigh += q.rangeHigh;
      rows += `<tr><td style="padding:10px 8px;border-bottom:1px solid #eee;"><strong>${q.type}</strong></td><td style="text-align:right;padding:10px 8px;border-bottom:1px solid #eee;">${fmtWhole(q.rangeLow)} — ${fmtWhole(q.rangeHigh)}</td></tr>`;
    }

    const modal = document.createElement('div');
    modal.id = 'combinedQuoteModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;';
    modal.innerHTML = `<div style="background:#fff;border-radius:16px;padding:32px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;box-shadow:0 25px 50px rgba(0,0,0,0.25);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h2 style="margin:0;font-family:'Manrope',sans-serif;font-size:22px;">Combined System Quote</h2>
        <button onclick="document.getElementById('combinedQuoteModal').remove()" style="background:none;border:none;font-size:24px;cursor:pointer;color:#555;">&times;</button>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <thead><tr>
          <th style="text-align:left;padding:10px 8px;border-bottom:2px solid #ddd;font-size:13px;text-transform:uppercase;color:#718096;">System</th>
          <th style="text-align:right;padding:10px 8px;border-bottom:2px solid #ddd;font-size:13px;text-transform:uppercase;color:#718096;">Estimated Range</th>
        </tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr style="font-weight:700;font-size:18px;">
          <td style="padding:14px 8px;border-top:2px solid #333;">Combined Total</td>
          <td style="text-align:right;padding:14px 8px;border-top:2px solid #333;">${fmtWhole(totalLow)} — ${fmtWhole(totalHigh)}</td>
        </tr></tfoot>
      </table>
      <button onclick="window.open('mailto:jmazza@nexusct.com?subject=Combined System Quote Request&body=Requesting combined proposal for: ${Object.values(quotes).map(q=>q.type).join(', ')}','_blank')" style="width:100%;padding:14px;background:var(--primary,#0066B3);color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;">
        Request Combined Proposal
      </button>
    </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }

  // ---- Public API ----
  return {
    // Constants
    MARGIN,
    FINANCE_APR,
    NCAAS_MARKUP,
    NCAAS_TERM,
    RANGE_FACTOR,

    // Formatting
    fmtWhole,
    fmtDec,
    fmtRange,
    fmtMonthlyRange,
    fmtPerBedRange,
    fmtPct,

    // Calculations
    sellPrice,
    calcMonthlyPayment,
    getFinancingOptions,
    calcNCaaS,

    // Data
    JERON_PARTS,
    RCARE_PARTS,
    COMPETITORS,
    SLA_PACKAGES,

    // Combined Quotes
    addToCombinedQuote,
    getCombinedQuotes,
    renderCombinedQuoteButton,
    showCombinedQuote,
  };
})();

// Make available globally
if (typeof window !== 'undefined') window.NexusPricing = NexusPricing;
