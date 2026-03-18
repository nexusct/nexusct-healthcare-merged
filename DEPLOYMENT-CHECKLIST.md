# NexusCT Website — Webflow Deployment Checklist

## Pre-Migration Preparation

### 1. Webflow Project Setup
- [ ] Create new Webflow project (or use existing nxsct.com project)
- [ ] Set site name: "NexusCT — Communications Technology"
- [ ] Configure custom domain: `nxsct.com` and `www.nxsct.com`
- [ ] Enable SSL certificate (auto-provisioned by Webflow)

### 2. Design System Configuration in Webflow
- [ ] Add Google Fonts via Project Settings → Fonts:
  - Manrope (400, 500, 600, 700, 800) — headings
  - Inter (300, 400, 500, 600, 700) — body
- [ ] Create global color swatches in Webflow:
  | Token | Value | Usage |
  |---|---|---|
  | Primary | `#0066B3` | CTAs, links, accents |
  | Primary Dark | `#004f8c` | Hover states |
  | Secondary | `#4CAF50` | Success, healthcare accents |
  | Dark BG | `#0b1220` | Heroes, dark sections |
  | Body BG | `#f8f9fc` | Page background |
  | Text Dark | `#1a1a2e` | Headings |
  | Text Body | `#4a5568` | Body copy |
  | Text Light | `#718096` | Muted text |
  | Border | `#e2e8f0` | Dividers, card borders |

### 3. Asset Preparation
- [ ] Export all images from current WordPress site (if any)
- [ ] Upload product images to Webflow Asset Manager
- [ ] Generate favicon from SVG logo (32x32, 180x180 apple-touch)
- [ ] Create Open Graph images (1200x630) for each major page

---

## Page-by-Page Migration

### Phase 1: Core Pages (Week 1)
| Page | Source File | Webflow Slug | Priority |
|---|---|---|---|
| Homepage | `index.html` | `/` | P0 |
| About | `about.html` | `/about` | P0 |
| Contact | `contact.html` | `/contact` | P0 |
| Services | `services.html` | `/services` | P0 |
| FAQ | `faq.html` | `/faq` | P1 |

### Phase 2: Healthcare Pages (Week 2)
| Page | Source File | Webflow Slug | Priority |
|---|---|---|---|
| Healthcare Overview | `healthcare/index.html` | `/healthcare` | P0 |
| Wired Nurse Call | `healthcare/nurse-call-wired.html` | `/healthcare/nurse-call-wired` | P0 |
| Wireless Nurse Call | `healthcare/nurse-call-wireless.html` | `/healthcare/nurse-call-wireless` | P0 |
| NCaaS | `healthcare/ncaas.html` | `/healthcare/ncaas` | P0 |
| RTLS | `healthcare/rtls.html` | `/healthcare/rtls` | P1 |
| Patient Safety | `healthcare/patient-safety.html` | `/healthcare/patient-safety` | P1 |
| ResponseCare360 | `healthcare/responsecare360.html` | `/healthcare/responsecare360` | P0 |

### Phase 3: Business Pages (Week 2)
| Page | Source File | Webflow Slug | Priority |
|---|---|---|---|
| UniFi360 | `business/unifi360.html` | `/business/unifi360` | P0 |
| UaaS | `business/uaas.html` | `/business/uaas` | P0 |
| Managed Networks | `business/managed-networks.html` | `/business/managed-networks` | P1 |
| Cloud Comms | `business/cloud-comms.html` | `/business/cloud-comms` | P1 |
| Security | `business/security.html` | `/business/security` | P1 |
| Smart Building | `business/smart-building.html` | `/business/smart-building` | P1 |

### Phase 4: Interactive Tools (Week 3)
| Tool | Source File | Integration Method | Priority |
|---|---|---|---|
| Nurse Call Designer | `healthcare/nurse-call-configurator.html` | Webflow Embed + Custom Code | P0 |
| UaaS Configurator | `business/configurator.html` | Webflow Embed + Custom Code | P0 |

---

## Custom Code Integration

### Global Custom Code (Project Settings → Custom Code)

#### Head Code
```html
<!-- NexusCT Shared Modules -->
<script src="/assets/js/pricing-engine.js"></script>
<script src="/assets/js/lead-capture.js"></script>
```

#### Footer Code
```html
<!-- No additional footer scripts needed — loaded per-page -->
```

### Configurator Pages — Custom Code Strategy

The nurse call designer and UaaS configurator are JavaScript-heavy interactive tools. Two options for Webflow:

#### Option A: Embedded Pages (Recommended)
1. Host configurator HTML files on a subdomain (e.g., `tools.nxsct.com`) via S3/CloudFront or Vercel
2. Embed via `<iframe>` in Webflow with full-width responsive sizing
3. Use `postMessage` API for cross-frame communication (lead data, combined quotes)

```html
<!-- In Webflow Custom Code block -->
<iframe
  src="https://tools.nxsct.com/nurse-call-configurator.html"
  style="width:100%;min-height:100vh;border:none;"
  id="ncConfigurator"
></iframe>
```

#### Option B: Webflow Custom Code Blocks
1. Create a blank Webflow page with no Webflow components
2. Paste the full HTML into a Custom Code Embed element
3. Add JS/CSS via page-level Custom Code settings

**Recommendation:** Option A is cleaner for maintenance. The configurators are self-contained apps that benefit from independent deployment cycles.

### Lead Capture Integration Points

The shared `lead-capture.js` module uses `sessionStorage` which persists across pages within the same domain. For Webflow:

1. Include `lead-capture.js` in global Head code
2. Include `pricing-engine.js` in global Head code
3. Any page that displays pricing calls `NexusLeadCapture.gate(callback, context)`
4. Lead data is also written to `localStorage` under `nexus_leads` for admin access

#### Zoho CRM Integration
Replace the `localStorage` write in `lead-capture.js` with a Zoho webhook:

```javascript
// After line: localStorage.setItem('nexus_leads', JSON.stringify(allLeads));
// Add:
fetch('https://www.zohoapis.com/crm/v2/Leads', {
  method: 'POST',
  headers: {
    'Authorization': 'Zoho-oauthtoken YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: [{
      Last_Name: leadData.name.split(' ').pop(),
      First_Name: leadData.name.split(' ')[0],
      Email: leadData.email,
      Phone: leadData.phone,
      Company: leadData.facility,
      Description: leadData.notes,
      Lead_Source: 'Website Configurator — ' + leadData.context
    }]
  })
});
```

Or use Webflow's native form integration to sync with Zoho via Zapier/Make.

---

## Form Integrations

### Contact Form
- [ ] Connect Webflow form to email (office@nexusct.com)
- [ ] Set up Zoho CRM lead creation webhook
- [ ] Configure form success/error messages
- [ ] Add reCAPTCHA or hCaptcha for spam protection

### Lead Capture (Configurators)
- [ ] Verify sessionStorage persistence works across Webflow pages
- [ ] If using iframe embed (Option A), implement postMessage bridge for lead data
- [ ] Connect lead capture to Zoho CRM via webhook or Zapier

### Quote Request (Combined Quote Builder)
- [ ] Configure `mailto:` links to open with pre-filled subject/body
- [ ] Or replace with Webflow form submission to office@nexusct.com

---

## SEO & Redirects

### 301 Redirects (from current WordPress URLs)
Set up in Webflow under Project Settings → Hosting → 301 Redirects:

| Old Path | New Path |
|---|---|
| `/product-and-services/` | `/services` |
| `/professional-services/` | `/services` |
| `/ict-solutions/` | `/services` |
| `/customer-portfolio/` | `/about` |
| `/nurse-call-systems/` | `/healthcare/nurse-call-wired` |
| `/response-care-360/` | `/healthcare/responsecare360` |
| `/unifi-360/` | `/business/unifi360` |

### Meta Tags
- [ ] Verify each page has unique `<title>` and `<meta name="description">`
- [ ] Add Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] Add Twitter Card tags
- [ ] Create and submit `sitemap.xml`
- [ ] Create `robots.txt`

### Structured Data
- [ ] Add Organization schema to homepage
- [ ] Add LocalBusiness schema with address and contact
- [ ] Add FAQPage schema to FAQ page
- [ ] Add Service schema to service detail pages

---

## Analytics & Tracking

- [ ] Install Google Analytics 4 (GA4) via Webflow Custom Code
- [ ] Set up Google Tag Manager container
- [ ] Configure conversion events:
  - Contact form submission
  - Lead capture form completion
  - Configurator tool launch
  - Quote PDF download
  - Phone number click
  - Email link click
- [ ] Set up Google Search Console and verify domain
- [ ] Install Microsoft Clarity for heatmaps (optional)

---

## DNS Configuration

### If moving from WordPress hosting:
1. [ ] Update DNS A record to point to Webflow: `75.2.70.75`
2. [ ] Add CNAME for `www`: `proxy-ssl.webflow.com`
3. [ ] Remove old WordPress hosting DNS records
4. [ ] Wait for DNS propagation (up to 48 hours)
5. [ ] Verify SSL certificate is active in Webflow

### If using subdomain for configurator tools:
1. [ ] Create `tools.nxsct.com` CNAME pointing to S3/CloudFront/Vercel
2. [ ] Configure CORS headers for cross-origin iframe embedding
3. [ ] Set up SSL for the subdomain

---

## Testing Plan

### Pre-Launch Testing
- [ ] Desktop browsers: Chrome, Firefox, Safari, Edge
- [ ] Mobile browsers: iOS Safari, Chrome Android
- [ ] Tablet: iPad (landscape + portrait)
- [ ] Test all navigation links (main nav, footer, in-page CTAs)
- [ ] Test nurse call configurator: full 13-step flow → lead capture → estimate
- [ ] Test UaaS configurator: full config → pricing → scenarios
- [ ] Test combined quote builder across both configurators
- [ ] Test contact form submission
- [ ] Verify all phone/email links work
- [ ] Check page load speed (target: <3s on 3G)
- [ ] Run Lighthouse audit (target: 90+ Performance, 100 Accessibility)
- [ ] Validate HTML with W3C validator
- [ ] Test 301 redirects from old URLs

### Post-Launch Monitoring (First 48 Hours)
- [ ] Monitor Google Search Console for crawl errors
- [ ] Check GA4 for page tracking
- [ ] Verify form submissions are reaching inbox + Zoho CRM
- [ ] Test configurator tools on production domain
- [ ] Check for mixed content warnings (HTTP resources on HTTPS)

---

## Rollback Procedure

If critical issues are found post-launch:

1. **DNS Rollback:** Point A record back to WordPress hosting IP
2. **Staging:** Webflow staging link remains active for testing
3. **Data:** Lead capture data in localStorage survives rollback (browser-side)
4. **Timeline:** Keep WordPress hosting active for 30 days after Webflow launch

---

## Post-Launch Enhancements (Phase 2)

- [ ] Webflow CMS for blog/news content
- [ ] Customer portal login integration (Zoho Desk)
- [ ] DirecTV headend configurator tool
- [ ] Case studies / project portfolio (Webflow CMS collection)
- [ ] Zoho SalesIQ live chat widget
- [ ] A/B testing on hero sections and CTAs
- [ ] Automated quote PDF emailing (Zoho Flow + pricing-engine.js server-side)
