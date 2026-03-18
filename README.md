# NexusCT — Healthcare & Business Technology Website

**Unified multi-page website for Nexus Communications Technology (NexusComm LLC)**

Merged site combining the nurse call system configurator, UniFi as a Service (UaaS) section, and primary business website into a single cohesive, Webflow-ready structure.

---

## Architecture

```
nexusct-healthcare-merged/
├── index.html                                    # Homepage
├── about.html                                    # Company info, leadership
├── contact.html                                  # Contact form + info
├── faq.html                                      # Accordion FAQ
├── services.html                                 # All services catalog
│
├── healthcare/                                   # Healthcare division
│   ├── index.html                                # Healthcare overview + SLA preview
│   ├── nurse-call-wired.html                     # Jeron Provider 700/790
│   ├── nurse-call-wireless.html                  # RCare G4 Wireless
│   ├── ncaas.html                                # Nurse Call as a Service
│   ├── rtls.html                                 # RTLS & Wander Management
│   ├── patient-safety.html                       # Patient Safety & Security
│   ├── responsecare360.html                      # ResponseCare360 managed service
│   └── nurse-call-configurator.html              # Full 13-step designer tool
│
├── business/                                     # Business division
│   ├── unifi360.html                             # UniFi360 product page
│   ├── uaas.html                                 # UniFi as a Service
│   ├── configurator.html                         # UaaS System Configurator
│   ├── managed-networks.html                     # Managed Networks
│   ├── cloud-comms.html                          # Cloud Communications
│   ├── security.html                             # Security & Access Control
│   └── smart-building.html                       # Smart Building
│
├── assets/
│   ├── css/
│   │   ├── nexusct.css                           # Main site styles (design system)
│   │   ├── nurse-call.css                        # Nurse call configurator styles
│   │   └── configurator-shared.css               # UaaS configurator styles
│   └── js/
│       ├── pricing-engine.js                     # ★ SHARED pricing module
│       ├── lead-capture.js                       # ★ SHARED lead capture gate
│       ├── nexusct.js                            # Site-wide interactions
│       ├── nurse-call-app.js                     # Nurse call configurator logic
│       └── uaas-configurator.js                  # UaaS configurator logic
│
├── DEPLOYMENT-CHECKLIST.md                       # Webflow migration guide
└── README.md                                     # This file
```

## Key Modules

### Shared Pricing Engine (`assets/js/pricing-engine.js`)

Single source of truth for ALL pricing logic across the site.

```javascript
NexusPricing.fmtWhole(12345)           // → "$12,345"
NexusPricing.fmtDec(12345.678)         // → "$12,345.68"
NexusPricing.fmtRange(100000)          // → "$70,000 — $130,000"
NexusPricing.fmtMonthlyRange(2000)     // → "$1,400 — $2,600/mo"
NexusPricing.fmtPerBedRange(45.50)     // → "$31.85 — $59.15/bed/mo"
NexusPricing.sellPrice(1000)           // → 1333.33 (25% margin)
NexusPricing.calcMonthlyPayment(P,r,n) // → Monthly payment amount
NexusPricing.getFinancingOptions(cost) // → [{months, label, payment}]
NexusPricing.calcNCaaS(cost, beds)     // → {monthlyTotal, perBed}
```

**Contains:**
- 88 Jeron parts with Tier 2 dealer pricing (JERON_PARTS)
- 43 RCare parts with dealer pricing (RCARE_PARTS)
- 3 competitor datasets: Rauland, Hillrom/Westcom, GE Healthcare (COMPETITORS)
- 3 SLA tiers: Bronze ($45/bed/mo), Silver ($68/bed/mo), Gold ($90/bed/mo)
- Combined Quote builder (cross-configurator integration)
- Financing at 7.9% APR for 36/48/60-month terms
- NCaaS: 60-month subscription, 20% service premium

**Rules:**
- All client-visible prices use +/-30% ranges — NEVER exact amounts
- 25% NexusCT margin on all dealer costs
- No line-item pricing shown to clients

### Shared Lead Capture (`assets/js/lead-capture.js`)

Gates pricing calculations behind lead capture across all pages.

```javascript
// Check if lead already captured (persists via sessionStorage)
NexusLeadCapture.isGateOpen()          // → true/false

// Show modal gate (returns Promise<leadData|null>)
await NexusLeadCapture.showGate('nurse-call')

// Gate a callback
NexusLeadCapture.gate(callback, 'uaas')

// Get captured lead data
NexusLeadCapture.getLeadData()
// → { name, email, phone, facility, notes, timestamp, context }
```

**Behavior:**
- Modal appears before any pricing/estimate is revealed
- Data persists in `sessionStorage` — survives page navigation
- Lead data also saved to `localStorage` under `nexus_leads` for admin access
- Once captured, user can navigate between configurators without re-entering info

### Nurse Call System Designer

Full 13-step AI-style questionnaire:

| Step | Question | Type |
|---|---|---|
| 1 | Facility type | 8 options (Hospital, SNF, ALF, Memory, Behavioral, Clinic, Rehab, Other) |
| 2 | Bed count | Numeric input |
| 3 | Construction type | New / Retrofit / Expansion |
| 4 | Platform selection | Jeron 790, Jeron 700, RCare G4, "Help me decide" |
| 5 | Room configuration | Patient stations, accessories per room wing |
| 6 | Bathroom stations | Pull cord type, shower stations |
| 7 | Nurse consoles | Console type and quantity per wing |
| 8 | Dome/zone lights | Prism zone lights, hallway displays |
| 9 | Software integrations | ADT, SIP, paging, RTLS, EHR, etc. |
| 10 | Lead capture | Name, email, phone, facility (GATE) |
| 11 | Installation type | Professional / Full Turnkey |
| 12 | Additional services | Commissioning, training, integration support |
| — | System design | Auto-calculates BOM, shows estimate |

**Output includes:**
- Investment range (+/-30%)
- Competitor comparison (Rauland, Hillrom/Westcom, GE)
- Financing options (36/48/60 months at 7.9% APR)
- NCaaS subscription pricing (per-bed monthly)
- SLA managed service packages (Bronze/Silver/Gold)
- 5-page PDF estimate via jsPDF
- Admin panel at `#admin`

### UaaS System Configurator

Interactive pricing tool for UniFi as a Service:
- Internet tier selection (fiber, cable, bonded)
- Facility sizing (sqft, floors, drops)
- UniFi hardware selection (APs, switches, gateway)
- Camera configuration (indoor/outdoor)
- Access control (doors)
- Adjustable margin slider (admin-only)
- Customer pricing as +/-30% ranges
- Scenario save/compare (up to 3)
- CapEx vs OpEx breakdown with donut chart
- Combined quote integration with nurse call

## Tech Stack

| Component | Technology |
|---|---|
| Framework | Bootstrap 5.3.2 (CDN) |
| Icons | Font Awesome 6.5.0 (CDN) |
| Fonts | Manrope (headings) + Inter (body) — Google Fonts |
| PDF Generation | jsPDF 2.5.1 (CDN) — nurse call estimates |
| Data Storage | localStorage + sessionStorage (no server required) |
| Deployment | Static files — S3, Webflow, Netlify, Vercel, GitHub Pages |

## Brand

| Element | Value |
|---|---|
| Primary Blue | `#0066B3` |
| Primary Dark | `#004f8c` |
| Secondary Green | `#4CAF50` |
| Dark Background | `#0b1220` |
| Font — Headings | Manrope 600–800 |
| Font — Body | Inter 400–600 |

## Company

- **NexusComm LLC** — d/b/a Nexus Communications Technology (NexusCT)
- **Address:** 1171 Tower Rd, Schaumburg, IL 60173
- **General:** 847.443.9900 / office@nexusct.com
- **Support:** 847.443.9500 / support@nexusct.com
- **CEO:** Jim Mazzarella | **COO:** Alan Messner
- **Founded:** 2016

## Development

```bash
# Clone
git clone https://github.com/nexusct/nexusct-healthcare-merged.git
cd nexusct-healthcare-merged

# Serve locally
python3 -m http.server 8000
# Open http://localhost:8000
```

No build step required — all static HTML/CSS/JS with CDN dependencies.

## Webflow Migration

See `DEPLOYMENT-CHECKLIST.md` for the complete Webflow rollout guide including:
- DNS configuration
- CMS collection setup
- Custom code injection points
- Form integrations (Zoho CRM)
- SEO redirects from WordPress
- Testing plan
- Rollback procedure
