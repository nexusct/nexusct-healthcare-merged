// =====================================================
// NexusCT Nurse Call System Designer — App Logic
// =====================================================

// CGI_BIN not needed — using NexusStorage backend
const CGI_BIN = null;

// ---- Theme Toggle ----
(function() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = 'light';
  root.setAttribute('data-theme', theme);
  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      toggle.innerHTML = theme === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }
})();

// ---- Pricing Data ----
// ---- Pricing Data (from shared pricing-engine.js) ----
const JERON_PARTS = NexusPricing.JERON_PARTS;

const RCARE_PARTS = NexusPricing.RCARE_PARTS;


// ---- Competitor Pricing Data (Nurse Call) ----
const COMPETITOR_NURSE_CALL = NexusPricing.COMPETITORS;

// ---- SLA Managed Service Packages ----
// Priced 10% below market average
// Market average: Bronze ~$100/user/mo, Silver ~$150/user/mo, Gold ~$200/user/mo
const SLA_PACKAGES = NexusPricing.SLA_PACKAGES;

const MARGIN = NexusPricing.MARGIN;
const sellPrice = NexusPricing.sellPrice;
const fmt = NexusPricing.fmtDec;
const fmtWhole = NexusPricing.fmtWhole;

// ---- Financing ----
const FINANCE_APR = NexusPricing.FINANCE_APR;
const NCAAS_MARKUP = NexusPricing.NCAAS_MARKUP;
const NCAAS_TERM = NexusPricing.NCAAS_TERM;

const calcMonthlyPayment = NexusPricing.calcMonthlyPayment;

// ---- Facility Image ----
let facilityImageData = null;

// ---- State ----
let answers = {};
let currentStep = 0;
const TOTAL_STEPS = 12;

const chatMessages = document.getElementById('chatMessages');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

function updateProgress(step) {
  currentStep = step;
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  progressFill.style.width = pct + '%';
  progressText.textContent = `Step ${step} of ${TOTAL_STEPS}`;
}


// ---- Chat Helpers ----
function addMessage(type, html) {
  const div = document.createElement('div');
  div.className = `message ${type === 'user' ? 'user-msg' : 'ai-msg'}`;
  const avatarClass = type === 'user' ? 'user' : 'ai';
  const avatarText = type === 'user' ? 'You' : 'NC';
  div.innerHTML = `
    <div class="msg-avatar ${avatarClass}">${avatarText}</div>
    <div class="msg-content">
      <div class="msg-bubble">${html}</div>
    </div>
  `;
  chatMessages.appendChild(div);
  scrollToBottom();
  return div;
}

function addOptions(optionsHtml) {
  const div = document.createElement('div');
  div.className = 'message ai-msg';
  div.style.animationDelay = '200ms';
  div.innerHTML = `
    <div class="msg-avatar ai" style="visibility:hidden">NC</div>
    <div class="msg-content">${optionsHtml}</div>
  `;
  chatMessages.appendChild(div);
  scrollToBottom();
  return div;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'message ai-msg';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="msg-avatar ai">NC</div>
    <div class="msg-content">
      <div class="msg-bubble">
        <div class="typing-indicator"><span></span><span></span><span></span></div>
      </div>
    </div>
  `;
  chatMessages.appendChild(div);
  scrollToBottom();
}

function hideTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function scrollToBottom() {
  setTimeout(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, 50);
}

async function typeDelay(ms = 800) {
  showTyping();
  await new Promise(r => setTimeout(r, ms));
  hideTyping();
}

function disableAllOptions() {
  chatMessages.querySelectorAll('.option-card, .option-check, .btn, .rc-form-card').forEach(el => {
    el.style.pointerEvents = 'none';
    el.style.opacity = '0.6';
  });
}

// ---- Shared Form Helpers ----
const _formCSS = {
  card: 'background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-6);max-width:720px;',
  sectionTitle: 'font-size:var(--text-sm);font-weight:700;color:var(--color-primary);text-transform:uppercase;letter-spacing:0.05em;margin:var(--space-5) 0 var(--space-3) 0;padding-bottom:var(--space-2);border-bottom:1px solid var(--color-divider);',
  label: 'font-size:var(--text-sm);font-weight:600;color:var(--color-text);margin-bottom:var(--space-2);display:block;',
  input: 'width:100%;padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);border-radius:var(--radius-md);font-size:var(--text-sm);background:var(--color-surface-2);color:var(--color-text);',
  btnGroup: 'display:flex;gap:var(--space-2);flex-wrap:wrap;',
  btnOpt: 'padding:var(--space-2) var(--space-4);border:2px solid var(--color-border);border-radius:var(--radius-md);font-size:var(--text-sm);font-weight:600;cursor:pointer;background:var(--color-surface-2);color:var(--color-text);transition:all 150ms;',
  btnOptActive: 'border-color:var(--color-primary);background:var(--color-primary-highlight);color:var(--color-primary);',
  checkbox: 'display:flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);border-radius:var(--radius-md);cursor:pointer;font-size:var(--text-sm);background:var(--color-surface-2);transition:all 150ms;margin-bottom:var(--space-2);',
  checkboxChecked: 'border-color:var(--color-primary);background:var(--color-primary-highlight);',
  radio: 'display:flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);border-radius:var(--radius-md);cursor:pointer;font-size:var(--text-sm);background:var(--color-surface-2);transition:all 150ms;margin-bottom:var(--space-2);',
  row: 'display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-3);',
};


// ---- Questions Flow ----
async function startConversation() {
  if (window.location.hash === '#admin') {
    showAdmin();
    return;
  }
  await typeDelay(600);
  addMessage('ai', "Welcome to the <strong>NexusCT Nurse Call System Designer</strong>. I'll walk you through a series of questions to design and price the perfect nurse call system for your facility.");
  await typeDelay(800);
  askFacilityType();
}

// Q1: Facility Type
async function askFacilityType() {
  updateProgress(1);
  addMessage('ai', "What type of facility are you?");
  const types = [
    { id: 'hospital', title: 'Hospital / Acute Care', desc: 'Full-service hospital with ICU, med-surg, specialty units' },
    { id: 'snf', title: 'Skilled Nursing / SNF', desc: 'Post-acute care, rehabilitation, long-term nursing' },
    { id: 'alf', title: 'Assisted Living / ALF', desc: 'Residential care with daily living assistance' },
    { id: 'memory', title: 'Memory Care', desc: 'Specialized dementia and Alzheimer\'s care' },
    { id: 'behavioral', title: 'Behavioral Health', desc: 'Psychiatric and behavioral health facility' },
    { id: 'clinic', title: 'Clinic / Ambulatory', desc: 'Outpatient clinic or ambulatory surgery center' },
    { id: 'rehab', title: 'Rehabilitation Center', desc: 'Physical, occupational, and speech therapy' },
    { id: 'other', title: 'Other', desc: 'Custom facility type' },
  ];
  let html = '<div class="options-grid">';
  types.forEach(t => {
    html += `<button class="option-card" onclick="selectFacilityType('${t.id}','${t.title}')">
      <div class="option-title">${t.title}</div>
      <div class="option-desc">${t.desc}</div>
    </button>`;
  });
  html += '</div>';
  addOptions(html);
}

window.selectFacilityType = async function(id, title) {
  disableAllOptions();
  answers.facilityType = id;
  answers.facilityTypeLabel = title;
  addMessage('user', title);
  await typeDelay();
  askBeds();
};

// Q2: Beds
async function askBeds() {
  updateProgress(2);
  addMessage('ai', "How many total beds/rooms does your facility need to cover?");
  const html = `
    <div class="numeric-input-wrap">
      <input type="number" id="bedInput" min="1" max="999" placeholder="e.g., 120" value="">
      <button class="btn btn-primary" onclick="submitBeds()">Continue</button>
    </div>
    <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:var(--space-1);">Enter a number from 10 to 500+</div>
  `;
  addOptions(html);
  setTimeout(() => document.getElementById('bedInput')?.focus(), 300);
}

window.submitBeds = async function() {
  const val = parseInt(document.getElementById('bedInput')?.value);
  if (!val || val < 1) { alert('Please enter a valid number of beds.'); return; }
  disableAllOptions();
  answers.beds = val;
  addMessage('user', `${val} beds/rooms`);
  await typeDelay();
  askConstructionType();
};

// Q3: Construction Type
async function askConstructionType() {
  updateProgress(3);
  addMessage('ai', "Is this a new construction or a retrofit/upgrade of an existing system?");
  const opts = [
    { id: 'new', title: 'New Construction', desc: 'Brand new facility build' },
    { id: 'retrofit', title: 'Retrofit / Upgrade', desc: 'Replacing or upgrading an existing system' },
    { id: 'expansion', title: 'Expansion of Existing', desc: 'Adding capacity to a current system' },
  ];
  let html = '<div class="options-grid">';
  opts.forEach(o => {
    html += `<button class="option-card" onclick="selectConstruction('${o.id}','${o.title}')">
      <div class="option-title">${o.title}</div>
      <div class="option-desc">${o.desc}</div>
    </button>`;
  });
  html += '</div>';
  addOptions(html);
}

window.selectConstruction = async function(id, title) {
  disableAllOptions();
  answers.constructionType = id;
  answers.constructionTypeLabel = title;
  addMessage('user', title);
  await typeDelay();
  askPlatform();
};

// Q4: Platform
async function askPlatform() {
  updateProgress(4);
  addMessage('ai', "Which nurse call platform are you interested in?");
  const opts = [
    { id: 'jeron790', title: 'Jeron Provider 790', desc: 'IP-based, full acute care features, VoIP, EHR integration', tag: 'Enterprise' },
    { id: 'jeron700', title: 'Jeron Provider 700', desc: 'Networked, skilled/sub-acute, touchscreen, wireless alerting', tag: 'Mid-Range' },
    { id: 'rcare', title: 'RCare G4 Wireless', desc: 'Wireless, UL-1069, assisted living/SNF, mobile alerts, no wiring', tag: 'Wireless' },
    { id: 'help', title: 'Help me decide', desc: 'View a side-by-side comparison of all platforms', tag: '' },
  ];
  let html = '<div class="options-grid">';
  opts.forEach(o => {
    const tagHtml = o.tag ? `<div style="font-size:10px;font-weight:700;color:var(--color-primary);text-transform:uppercase;letter-spacing:0.05em;">${o.tag}</div>` : '';
    html += `<button class="option-card" onclick="selectPlatform('${o.id}','${o.title}')">
      ${tagHtml}
      <div class="option-title">${o.title}</div>
      <div class="option-desc">${o.desc}</div>
    </button>`;
  });
  html += '</div>';
  addOptions(html);
}

window.selectPlatform = async function(id, title) {
  if (id === 'help') {
    disableAllOptions();
    addMessage('user', 'Help me decide');
    await typeDelay(600);
    showComparisonTable();
    return;
  }
  disableAllOptions();
  answers.platform = id;
  answers.platformLabel = title;
  addMessage('user', title);
  await typeDelay();
  askRoomConfigs();
};

function showComparisonTable() {
  addMessage('ai', "Here's a comparison of our available platforms:");
  const html = `
    <div class="comparison-table-wrap">
      <table class="comparison-table">
        <thead><tr><th>Feature</th><th>Jeron 790</th><th>Jeron 700</th><th>RCare G4</th></tr></thead>
        <tbody>
          <tr><td><strong>Type</strong></td><td>IP-Based</td><td>Networked</td><td>Wireless</td></tr>
          <tr><td><strong>Best For</strong></td><td>Hospitals, Acute Care</td><td>SNF, Sub-Acute</td><td>Assisted Living, SNF</td></tr>
          <tr><td><strong>Wiring Required</strong></td><td>Yes (Cat5/6)</td><td>Yes (Cat5)</td><td>No (wireless)</td></tr>
          <tr><td><strong>VoIP Support</strong></td><td>Yes</td><td>Limited</td><td>Optional</td></tr>
          <tr><td><strong>EHR Integration</strong></td><td>Full ADT</td><td>ADT Available</td><td>PointClickCare</td></tr>
          <tr><td><strong>Mobile Alerts</strong></td><td>SIP/Android</td><td>Paging</td><td>RPhone/SMS</td></tr>
          <tr><td><strong>Wander Mgmt</strong></td><td>No</td><td>No</td><td>Yes</td></tr>
          <tr><td><strong>UL-1069</strong></td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
          <tr><td><strong>Install Complexity</strong></td><td>High</td><td>Medium</td><td>Low</td></tr>
        </tbody>
      </table>
    </div>
    <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-top:var(--space-3);">
      <button class="btn btn-primary" onclick="selectPlatform('jeron790','Jeron Provider 790')">Choose Jeron 790</button>
      <button class="btn btn-secondary" onclick="selectPlatform('jeron700','Jeron Provider 700')">Choose Jeron 700</button>
      <button class="btn btn-outline" onclick="selectPlatform('rcare','RCare G4 Wireless')">Choose RCare G4</button>
    </div>
  `;
  addOptions(html);
}


// ---- Q5: Room Configurations ----
answers.roomConfigs = [];

async function askRoomConfigs() {
  updateProgress(5);
  addMessage('ai', "Now let's configure your room types. You can define up to <strong>3 different room configurations</strong> (e.g., Standard Patient Room, ICU Room, Memory Care Room). Each configuration describes a type of room and how many you need.");
  await typeDelay(600);
  showRoomConfigForm(1);
}

function showRoomConfigForm(configNum) {
  const isRCare = answers.platform === 'rcare';
  const isJeron = !isRCare;

  const sensorOpts = isJeron ? `
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="rc_sensor" value="staff_assign" style="display:none;"> <span>&#9634;</span> Staff Assignment Panel</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="rc_sensor" value="code_blue" style="display:none;"> <span>&#9634;</span> Code Blue Station</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="rc_sensor" value="door_monitor" style="display:none;"> <span>&#9634;</span> Door Monitoring Contact</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="rc_sensor" value="bed_exit" style="display:none;"> <span>&#9634;</span> Bed Exit Alarm Interface</label>
  ` : `
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="rc_sensor" value="door_window" style="display:none;"> <span>&#9634;</span> Door/Window Contact</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="rc_sensor" value="activity" style="display:none;"> <span>&#9634;</span> Activity Sensor</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="rc_sensor" value="bed_chair" style="display:none;"> <span>&#9634;</span> Bed/Chair Pad Alarm</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="rc_sensor" value="universal_tx" style="display:none;"> <span>&#9634;</span> Universal Transmitter</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="rc_sensor" value="wander_tx" style="display:none;"> <span>&#9634;</span> Wander Transmitter</label>
  `;

  const html = `
  <div class="rc-form-card" id="rcForm${configNum}" style="${_formCSS.card}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-4);">
      <h3 style="font-size:var(--text-lg);font-weight:700;color:var(--color-text);margin:0;">Room Configuration ${configNum} of 3</h3>
      <span style="font-size:var(--text-xs);color:var(--color-text-muted);background:var(--color-surface-offset);padding:var(--space-1) var(--space-3);border-radius:var(--radius-full);">${isRCare ? 'RCare G4' : 'Jeron'}</span>
    </div>

    <div style="${_formCSS.row}">
      <div>
        <label style="${_formCSS.label}">Room Name</label>
        <input type="text" id="rcName${configNum}" placeholder="e.g., Standard Patient Room" style="${_formCSS.input}">
      </div>
      <div>
        <label style="${_formCSS.label}">Quantity (rooms of this type)</label>
        <input type="number" id="rcQty${configNum}" min="1" max="500" placeholder="e.g., 60" style="${_formCSS.input}">
      </div>
    </div>

    <div style="${_formCSS.sectionTitle}">Patient Bed Setup</div>
    <label style="${_formCSS.label}">Beds per Room</label>
    <div style="${_formCSS.btnGroup}" id="rcBeds${configNum}">
      ${[1,2,3,4,5].map(n => `<button type="button" style="${_formCSS.btnOpt}" onclick="window._selectBtnGroup('rcBeds${configNum}',${n},this)">${n}</button>`).join('')}
    </div>

    <div style="margin-top:var(--space-4);">
      <label style="${_formCSS.label}">Bed Accessories (per bed)</label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);">
        <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
          <input type="checkbox" name="rc_acc" value="pull_cord" style="display:none;"> <span>&#9634;</span> Pull Cord</label>
        <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
          <input type="checkbox" name="rc_acc" value="pressure_pad" style="display:none;"> <span>&#9634;</span> Pressure Pad Sensor</label>
        <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
          <input type="checkbox" name="rc_acc" value="pillow_speaker" style="display:none;"> <span>&#9634;</span> Pillow Speaker</label>
        <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
          <input type="checkbox" name="rc_acc" value="two_way_audio" style="display:none;"> <span>&#9634;</span> Two-Way Audio</label>
      </div>
    </div>

    <div style="${_formCSS.sectionTitle}">Bathroom Configuration</div>
    <label style="${_formCSS.label}">Bathrooms per Room</label>
    <div style="${_formCSS.btnGroup}" id="rcBath${configNum}">
      <button type="button" style="${_formCSS.btnOpt}" onclick="window._selectBtnGroup('rcBath${configNum}',1,this)">1</button>
      <button type="button" style="${_formCSS.btnOpt}" onclick="window._selectBtnGroup('rcBath${configNum}',2,this)">2</button>
    </div>
    <div style="margin-top:var(--space-3);">
      <label style="${_formCSS.label}">Pull Cord Layout</label>
      <label style="${_formCSS.radio}" onclick="this.querySelector('input').checked=true;document.querySelectorAll('input[name=rcPull${configNum}]').forEach(r=>{r.closest('label').style.borderColor=r.checked?'var(--color-primary)':'var(--color-border)';r.closest('label').style.background=r.checked?'var(--color-primary-highlight)':'var(--color-surface-2)';})">
        <input type="radio" name="rcPull${configNum}" value="single" style="display:none;" checked> <span>&#9673;</span> Single shared pull cord (between toilet/shower, reachable from both)</label>
      <label style="${_formCSS.radio}" onclick="this.querySelector('input').checked=true;document.querySelectorAll('input[name=rcPull${configNum}]').forEach(r=>{r.closest('label').style.borderColor=r.checked?'var(--color-primary)':'var(--color-border)';r.closest('label').style.background=r.checked?'var(--color-primary-highlight)':'var(--color-surface-2)';})">
        <input type="radio" name="rcPull${configNum}" value="separate" style="display:none;"> <span>&#9675;</span> Two separate pull cords (one toilet, one shower)</label>
    </div>

    <div style="${_formCSS.sectionTitle}">Room Sensors & Integrations</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);">
      ${sensorOpts}
    </div>

    <div style="${_formCSS.sectionTitle}">Display & Communication</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);">
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="rc_disp" value="tv" style="display:none;"> <span>&#9634;</span> In-Room TV Integration</label>
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="rc_disp" value="ai_assist" style="display:none;"> <span>&#9634;</span> AI Virtual Assistant (Alexa)</label>
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="rc_disp" value="tablet" style="display:none;"> <span>&#9634;</span> Care Coordination Tablet</label>
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="rc_disp" value="infotainment" style="display:none;"> <span>&#9634;</span> Bedside Infotainment Display</label>
    </div>

    <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);">
      <button class="btn btn-primary" onclick="window.saveRoomConfig(${configNum})">Save Room Configuration</button>
    </div>
  </div>
  `;
  addOptions(html);
  setTimeout(() => document.getElementById(`rcName${configNum}`)?.focus(), 300);
}

// Button group helper
window._btnGroupValues = {};
window._selectBtnGroup = function(groupId, value, btn) {
  window._btnGroupValues[groupId] = value;
  const container = document.getElementById(groupId);
  container.querySelectorAll('button').forEach(b => {
    b.style.borderColor = 'var(--color-border)';
    b.style.background = 'var(--color-surface-2)';
    b.style.color = 'var(--color-text)';
  });
  btn.style.borderColor = 'var(--color-primary)';
  btn.style.background = 'var(--color-primary-highlight)';
  btn.style.color = 'var(--color-primary)';
};

window.saveRoomConfig = async function(configNum) {
  const form = document.getElementById(`rcForm${configNum}`);
  const name = document.getElementById(`rcName${configNum}`)?.value.trim();
  const qty = parseInt(document.getElementById(`rcQty${configNum}`)?.value);
  if (!name) { alert('Please enter a room name.'); return; }
  if (!qty || qty < 1) { alert('Please enter a valid room quantity.'); return; }

  const bedsPerRoom = window._btnGroupValues[`rcBeds${configNum}`] || 1;
  const bathsPerRoom = window._btnGroupValues[`rcBath${configNum}`] || 1;
  const pullLayout = form.querySelector(`input[name="rcPull${configNum}"]:checked`)?.value || 'single';

  const accessories = Array.from(form.querySelectorAll('input[name="rc_acc"]:checked')).map(c => c.value);
  const sensors = Array.from(form.querySelectorAll('input[name="rc_sensor"]:checked')).map(c => c.value);
  const displays = Array.from(form.querySelectorAll('input[name="rc_disp"]:checked')).map(c => c.value);

  const config = { name, qty, bedsPerRoom, bathsPerRoom, pullLayout, accessories, sensors, displays };
  answers.roomConfigs.push(config);

  disableAllOptions();

  // Show summary
  const accLabels = accessories.length ? accessories.join(', ') : 'None';
  const sensorLabels = sensors.length ? sensors.join(', ') : 'None';
  const dispLabels = displays.length ? displays.join(', ') : 'None';
  addMessage('user', `<strong>${name}</strong> — ${qty} rooms, ${bedsPerRoom} bed(s)/room, ${bathsPerRoom} bath(s)<br>
    <span style="font-size:var(--text-xs);color:var(--color-text-muted);">Accessories: ${accLabels} | Sensors: ${sensorLabels} | Display: ${dispLabels}</span>`);

  await typeDelay(600);

  // Check if user wants to add more
  const totalConfigured = answers.roomConfigs.reduce((s, c) => s + c.qty, 0);
  if (answers.roomConfigs.length < 3) {
    addMessage('ai', `Room configuration ${configNum} saved. You've configured <strong>${totalConfigured}</strong> of <strong>${answers.beds}</strong> total rooms so far. Would you like to add another room configuration?`);
    const html = `<div style="display:flex;gap:var(--space-3);flex-wrap:wrap;">
      <button class="btn btn-primary" onclick="window.addAnotherRoom()">Add Room Configuration ${configNum + 1}</button>
      <button class="btn btn-secondary" onclick="window.doneWithRooms()">No, continue</button>
    </div>`;
    addOptions(html);
  } else {
    addMessage('ai', `All 3 room configurations saved (${totalConfigured} rooms configured).`);
    await typeDelay(400);
    validateAndContinueRooms();
  }
};

window.addAnotherRoom = async function() {
  disableAllOptions();
  addMessage('user', 'Add another room configuration');
  await typeDelay(400);
  showRoomConfigForm(answers.roomConfigs.length + 1);
};

window.doneWithRooms = async function() {
  disableAllOptions();
  addMessage('user', 'Continue');
  await typeDelay(400);
  validateAndContinueRooms();
};

async function validateAndContinueRooms() {
  const totalConfigured = answers.roomConfigs.reduce((s, c) => s + c.qty, 0);
  if (totalConfigured !== answers.beds) {
    addMessage('ai', `<strong>Note:</strong> Your room configurations total <strong>${totalConfigured}</strong> rooms, but you specified <strong>${answers.beds}</strong> beds earlier. Would you like to adjust, or continue with the configured rooms?`);
    answers.beds = totalConfigured; // Auto-adjust
    const html = `<div style="display:flex;gap:var(--space-3);flex-wrap:wrap;">
      <button class="btn btn-primary" onclick="window.continueAfterRoomValidation()">Continue with ${totalConfigured} rooms</button>
    </div>`;
    addOptions(html);
  } else {
    askNurseStations();
  }
}

window.continueAfterRoomValidation = async function() {
  disableAllOptions();
  addMessage('user', `Continue with ${answers.beds} rooms`);
  await typeDelay(400);
  askNurseStations();
};


// ---- Q6: Nurses Stations ----
answers.nurseStations = [];

async function askNurseStations() {
  updateProgress(6);
  addMessage('ai', "Now let's configure your nurses stations. How many nursing stations does your facility need?");
  await typeDelay(400);
  showNurseStationForm(1);
}

function showNurseStationForm(stationNum) {
  const isRCare = answers.platform === 'rcare';

  const consoleOpts = isRCare ? `
    <button type="button" class="option-card" style="padding:var(--space-3);text-align:left;" data-console="rcare_cc980" onclick="window._selectConsoleCard('nsConsole${stationNum}','rcare_cc980',this)">
      <div class="option-title" style="font-size:var(--text-sm);">CC980 Touchscreen (15")</div>
      <div class="option-desc" style="font-size:var(--text-xs);">Full-featured 15" touchscreen console</div>
    </button>
    <button type="button" class="option-card" style="padding:var(--space-3);text-align:left;" data-console="rcare_cc10" onclick="window._selectConsoleCard('nsConsole${stationNum}','rcare_cc10',this)">
      <div class="option-title" style="font-size:var(--text-sm);">CC-10 Compact (10")</div>
      <div class="option-desc" style="font-size:var(--text-xs);">Compact 10" touchscreen console</div>
    </button>
  ` : `
    <button type="button" class="option-card" style="padding:var(--space-3);text-align:left;" data-console="jeron_7965" onclick="window._selectConsoleCard('nsConsole${stationNum}','jeron_7965',this)">
      <div class="option-title" style="font-size:var(--text-sm);">Touchscreen Console (7965)</div>
      <div class="option-desc" style="font-size:var(--text-xs);">Full touchscreen nurse console</div>
    </button>
    <button type="button" class="option-card" style="padding:var(--space-3);text-align:left;" data-console="jeron_7965b" onclick="window._selectConsoleCard('nsConsole${stationNum}','jeron_7965b',this)">
      <div class="option-title" style="font-size:var(--text-sm);">Touchscreen w/Bluetooth (7965-B)</div>
      <div class="option-desc" style="font-size:var(--text-xs);">Console with Bluetooth wireless handset</div>
    </button>
    <button type="button" class="option-card" style="padding:var(--space-3);text-align:left;" data-console="jeron_7985" onclick="window._selectConsoleCard('nsConsole${stationNum}','jeron_7985',this)">
      <div class="option-title" style="font-size:var(--text-sm);">PC Console Software (7985)</div>
      <div class="option-desc" style="font-size:var(--text-xs);">Software-based console on PC</div>
    </button>
    <button type="button" class="option-card" style="padding:var(--space-3);text-align:left;" data-console="jeron_7967" onclick="window._selectConsoleCard('nsConsole${stationNum}','jeron_7967',this)">
      <div class="option-title" style="font-size:var(--text-sm);">Touchscreen Terminal (7967)</div>
      <div class="option-desc" style="font-size:var(--text-xs);">Compact touchscreen terminal</div>
    </button>
  `;

  const hwOpts = isRCare ? `
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="ns_hw" value="secondary_display" style="display:none;"> <span>&#9634;</span> Secondary/Annunciator Display</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="ns_hw" value="staff_assign_display" style="display:none;"> <span>&#9634;</span> Staff Assignment Display</label>
  ` : `
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="ns_hw" value="secondary_display" style="display:none;"> <span>&#9634;</span> Secondary/Annunciator Display</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="ns_hw" value="bt_handset" style="display:none;"> <span>&#9634;</span> Bluetooth Wireless Handset</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="ns_hw" value="duty_terminal" style="display:none;"> <span>&#9634;</span> Duty Station Terminal</label>
    <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
      <input type="checkbox" name="ns_hw" value="staff_assign_display" style="display:none;"> <span>&#9634;</span> Staff Assignment Display</label>
  `;

  const html = `
  <div class="rc-form-card" id="nsForm${stationNum}" style="${_formCSS.card}">
    <h3 style="font-size:var(--text-lg);font-weight:700;margin-bottom:var(--space-4);">Nurses Station ${stationNum}</h3>

    <div style="${_formCSS.row}">
      <div>
        <label style="${_formCSS.label}">Station Name</label>
        <input type="text" id="nsName${stationNum}" placeholder="e.g., 2nd Floor Main" style="${_formCSS.input}">
      </div>
      <div>
        <label style="${_formCSS.label}">Console Count</label>
        <input type="number" id="nsCount${stationNum}" min="1" max="10" value="1" style="${_formCSS.input}">
      </div>
    </div>

    <div style="${_formCSS.sectionTitle}">Console Type</div>
    <div id="nsConsole${stationNum}" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);">
      ${consoleOpts}
    </div>

    <div style="${_formCSS.sectionTitle}">Additional Hardware</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);">
      ${hwOpts}
    </div>

    <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);">
      <button class="btn btn-primary" onclick="window.saveNurseStation(${stationNum})">Save Station</button>
      <button class="btn btn-secondary" onclick="window.doneWithStations()">Done with Stations</button>
    </div>
  </div>
  `;
  addOptions(html);
}

window._consoleValues = {};
window._selectConsoleCard = function(groupId, value, btn) {
  window._consoleValues[groupId] = value;
  const container = document.getElementById(groupId);
  container.querySelectorAll('.option-card').forEach(c => {
    c.style.borderColor = 'var(--color-border)';
    c.style.background = '';
  });
  btn.style.borderColor = 'var(--color-primary)';
  btn.style.background = 'var(--color-primary-highlight)';
};

window.saveNurseStation = async function(stationNum) {
  const form = document.getElementById(`nsForm${stationNum}`);
  const name = document.getElementById(`nsName${stationNum}`)?.value.trim() || `Station ${stationNum}`;
  const count = parseInt(document.getElementById(`nsCount${stationNum}`)?.value) || 1;
  const consoleType = window._consoleValues[`nsConsole${stationNum}`] || '';
  if (!consoleType) { alert('Please select a console type.'); return; }

  const hardware = Array.from(form.querySelectorAll('input[name="ns_hw"]:checked')).map(c => c.value);

  answers.nurseStations.push({ name, count, consoleType, hardware });
  disableAllOptions();
  addMessage('user', `<strong>${name}</strong> — ${count} console(s), ${consoleType.replace(/_/g,' ')}`);
  await typeDelay(400);

  addMessage('ai', `Station ${stationNum} saved. Add another station or continue?`);
  const html = `<div style="display:flex;gap:var(--space-3);">
    <button class="btn btn-primary" onclick="window.addAnotherStation()">Add Station ${stationNum + 1}</button>
    <button class="btn btn-secondary" onclick="window.doneWithStations()">Continue</button>
  </div>`;
  addOptions(html);
};

window.addAnotherStation = async function() {
  disableAllOptions();
  addMessage('user', 'Add another station');
  await typeDelay(400);
  showNurseStationForm(answers.nurseStations.length + 1);
};

window.doneWithStations = async function() {
  disableAllOptions();
  if (answers.nurseStations.length === 0) {
    // Need at least one
    addMessage('ai', 'You need at least one nurses station. Please configure one.');
    await typeDelay(400);
    showNurseStationForm(1);
    return;
  }
  addMessage('user', 'Continue');
  await typeDelay(400);
  askHallwayConfig();
};


// ---- Q7: Hallway Configuration ----
async function askHallwayConfig() {
  updateProgress(7);
  addMessage('ai', "Let's configure your hallway indicators and displays.");
  await typeDelay(400);

  const html = `
  <div class="rc-form-card" id="hallForm" style="${_formCSS.card}">
    <h3 style="font-size:var(--text-lg);font-weight:700;margin-bottom:var(--space-4);">Hallway Configuration</h3>

    <div style="${_formCSS.sectionTitle}">Nurse Call LED Corridor Indicators</div>
    <label style="${_formCSS.label}">LED Type</label>
    <div>
      <label style="${_formCSS.radio}" onclick="this.querySelector('input').checked=true;document.querySelectorAll('input[name=hall_led_type]').forEach(r=>{r.closest('label').style.borderColor=r.checked?'var(--color-primary)':'var(--color-border)';r.closest('label').style.background=r.checked?'var(--color-primary-highlight)':'var(--color-surface-2)';})">
        <input type="radio" name="hall_led_type" value="single" style="display:none;" checked> <span>&#9673;</span> Single-color dome (standard)</label>
      <label style="${_formCSS.radio}" onclick="this.querySelector('input').checked=true;document.querySelectorAll('input[name=hall_led_type]').forEach(r=>{r.closest('label').style.borderColor=r.checked?'var(--color-primary)':'var(--color-border)';r.closest('label').style.background=r.checked?'var(--color-primary-highlight)':'var(--color-surface-2)';})">
        <input type="radio" name="hall_led_type" value="prism" style="display:none;"> <span>&#9675;</span> Multi-color Prism dome (priority by color)</label>
      <label style="${_formCSS.radio}" onclick="this.querySelector('input').checked=true;document.querySelectorAll('input[name=hall_led_type]').forEach(r=>{r.closest('label').style.borderColor=r.checked?'var(--color-primary)':'var(--color-border)';r.closest('label').style.background=r.checked?'var(--color-primary-highlight)':'var(--color-surface-2)';})">
        <input type="radio" name="hall_led_type" value="prism_tone" style="display:none;"> <span>&#9675;</span> Prism dome with audible tone</label>
      <label style="${_formCSS.radio}" onclick="this.querySelector('input').checked=true;document.querySelectorAll('input[name=hall_led_type]').forEach(r=>{r.closest('label').style.borderColor=r.checked?'var(--color-primary)':'var(--color-border)';r.closest('label').style.background=r.checked?'var(--color-primary-highlight)':'var(--color-surface-2)';})">
        <input type="radio" name="hall_led_type" value="none" style="display:none;"> <span>&#9675;</span> None</label>
    </div>

    <div style="margin-top:var(--space-3);">
      <label style="${_formCSS.label}">Placement</label>
      <label style="${_formCSS.radio}" onclick="this.querySelector('input').checked=true;document.querySelectorAll('input[name=hall_placement]').forEach(r=>{r.closest('label').style.borderColor=r.checked?'var(--color-primary)':'var(--color-border)';r.closest('label').style.background=r.checked?'var(--color-primary-highlight)':'var(--color-surface-2)';})">
        <input type="radio" name="hall_placement" value="per_room" style="display:none;" checked> <span>&#9673;</span> One per room</label>
      <label style="${_formCSS.radio}" onclick="this.querySelector('input').checked=true;document.querySelectorAll('input[name=hall_placement]').forEach(r=>{r.closest('label').style.borderColor=r.checked?'var(--color-primary)':'var(--color-border)';r.closest('label').style.background=r.checked?'var(--color-primary-highlight)':'var(--color-surface-2)';})">
        <input type="radio" name="hall_placement" value="per_2rooms" style="display:none;"> <span>&#9675;</span> One per two rooms (shared)</label>
    </div>

    <div style="${_formCSS.sectionTitle}">Zone & Directional Indicators</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);">
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="hall_opt" value="zone_lights" style="display:none;"> <span>&#9634;</span> Zone indicator lights</label>
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="hall_opt" value="directional" style="display:none;"> <span>&#9634;</span> Directional arrow indicators</label>
    </div>

    <div style="${_formCSS.sectionTitle}">Audio & Visual Displays</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);">
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="hall_opt" value="audio_annunciator" style="display:none;"> <span>&#9634;</span> Hallway audio annunciator</label>
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="hall_opt" value="digital_display" style="display:none;"> <span>&#9634;</span> Digital hallway display</label>
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="hall_opt" value="master_display" style="display:none;"> <span>&#9634;</span> Master display panel</label>
    </div>

    <div style="${_formCSS.sectionTitle}">External Room Indicators</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);">
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="hall_opt" value="room_led" style="display:none;"> <span>&#9634;</span> Room-number LED panel</label>
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="hall_opt" value="status_display" style="display:none;"> <span>&#9634;</span> Patient status display</label>
      <label style="${_formCSS.checkbox}" onclick="this.querySelector('input').checked=!this.querySelector('input').checked;this.style.borderColor=this.querySelector('input').checked?'var(--color-primary)':'var(--color-border)';this.style.background=this.querySelector('input').checked?'var(--color-primary-highlight)':'var(--color-surface-2)';">
        <input type="checkbox" name="hall_opt" value="rgb_strip" style="display:none;"> <span>&#9634;</span> Multi-color room LED strip</label>
    </div>

    <div style="margin-top:var(--space-6);">
      <button class="btn btn-primary" onclick="window.saveHallwayConfig()">Continue</button>
    </div>
  </div>
  `;
  addOptions(html);
}

window.saveHallwayConfig = async function() {
  const form = document.getElementById('hallForm');
  const ledType = form.querySelector('input[name="hall_led_type"]:checked')?.value || 'none';
  const placement = form.querySelector('input[name="hall_placement"]:checked')?.value || 'per_room';
  const options = Array.from(form.querySelectorAll('input[name="hall_opt"]:checked')).map(c => c.value);

  answers.hallway = { ledType, placement, options };
  disableAllOptions();

  const summary = [ledType !== 'none' ? `LED: ${ledType} (${placement})` : 'No corridor LEDs'];
  if (options.length) summary.push(options.join(', '));
  addMessage('user', summary.join(' | '));
  await typeDelay();
  askSoftwareIntegrations();
};


// ---- Q8: Software & Integrations ----
let selectedIntegrations = [];

async function askSoftwareIntegrations() {
  updateProgress(8);
  const isRCare = answers.platform === 'rcare';
  addMessage('ai', "Select any software and integration add-ons for your system. <em>(Select all that apply, then click Continue)</em>");

  let opts;
  if (isRCare) {
    opts = [
      { id: 'int_ehr', title: 'PointClickCare Integration' },
      { id: 'int_wander', title: 'Wander Management Integration' },
      { id: 'int_mcube', title: 'RCare Mobile (MCube)' },
      { id: 'int_vcube', title: 'Voice-to-Voice (VCube)' },
      { id: 'int_pager', title: 'Pager Integration' },
      { id: 'int_rphone', title: 'RPhone Mobile Integration' },
      { id: 'int_activity', title: 'Activity Monitoring & Reporting' },
    ];
  } else {
    opts = [
      { id: 'int_ehr', title: 'EHR/ADT Integration' },
      { id: 'int_sip', title: 'SIP Phone Integration' },
      { id: 'int_paging', title: 'Pocket Paging' },
      { id: 'int_staff', title: 'Staff Assignment Software' },
      { id: 'int_rtls', title: 'RTLS Integration' },
      { id: 'int_barcode', title: 'Barcode Staff Management' },
      { id: 'int_reporting', title: 'EIS Logging/Reporting' },
      { id: 'int_pc_console', title: 'PC Console Software' },
      { id: 'int_mapview', title: 'PC Console MapView' },
      { id: 'int_android', title: 'Android Push Notifications' },
      { id: 'int_voice_pa', title: 'Automated Voice PA' },
    ];
  }

  selectedIntegrations = [];
  let html = '<div class="options-multi">';
  opts.forEach(o => {
    html += `<button class="option-check" id="intopt_${o.id}" onclick="toggleIntegration('${o.id}','${o.title}')">
      <div class="checkbox"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
      <div class="option-info">
        <div class="option-title">${o.title}</div>
      </div>
    </button>`;
  });
  html += `<div class="multi-submit-wrap">
    <button class="btn btn-primary" onclick="submitIntegrations()">Continue</button>
    <button class="btn btn-secondary" style="margin-left:var(--space-2);" onclick="submitIntegrations()">Skip — None Needed</button>
  </div></div>`;
  addOptions(html);
}

window.toggleIntegration = function(id, title) {
  const el = document.getElementById('intopt_' + id);
  const idx = selectedIntegrations.findIndex(i => i.id === id);
  if (idx >= 0) {
    selectedIntegrations.splice(idx, 1);
    el.classList.remove('checked');
  } else {
    selectedIntegrations.push({ id, title });
    el.classList.add('checked');
  }
};

window.submitIntegrations = async function() {
  disableAllOptions();
  answers.integrations = selectedIntegrations.map(i => i.id);
  answers.integrationsLabels = selectedIntegrations.map(i => i.title);
  const label = selectedIntegrations.length > 0 ? selectedIntegrations.map(i => i.title).join(', ') : 'None';
  addMessage('user', label);
  await typeDelay();
  askInstallation();
};

// Q9: Installation
async function askInstallation() {
  updateProgress(9);
  addMessage('ai', "What about installation support?");
  const opts = [
    { id: 'professional', title: 'NexusCT Professional Installation', desc: 'On-site installation by NexusCT technicians' },
    { id: 'turnkey', title: 'NexusCT Full Turnkey', desc: 'Installation + commissioning + staff training' },
  ];
  let html = '<div class="options-grid">';
  opts.forEach(o => {
    html += `<button class="option-card" onclick="selectInstall('${o.id}','${o.title}')">
      <div class="option-title">${o.title}</div>
      <div class="option-desc">${o.desc}</div>
    </button>`;
  });
  html += '</div>';
  addOptions(html);
}

window.selectInstall = async function(id, title) {
  disableAllOptions();
  answers.installation = id;
  answers.installationLabel = title;
  addMessage('user', title);
  await typeDelay(500);
  askLeadCapture();
};


// Q10: Lead Capture
async function askLeadCapture() {
  updateProgress(10);
  // Use shared lead capture gate
  if (NexusLeadCapture.isGateOpen()) {
    const ld = NexusLeadCapture.getLeadData();
    answers.lead = ld;
    addMessage("user", ld.name + " — " + ld.facility);
    await typeDelay();
    showDesigning();
    return;
  }
  addMessage("ai", "Almost done! To generate your personalized system estimate, please provide your contact information.");
  addOptions(NexusLeadCapture.getInlineFormHtml());
}

window.submitLeadForm = async function() {
  const name = document.getElementById('leadName')?.value?.trim();
  const email = document.getElementById('leadEmail')?.value?.trim();
  const phone = document.getElementById('leadPhone')?.value?.trim();
  const facility = document.getElementById('leadFacility')?.value?.trim();
  const notes = document.getElementById('leadNotes')?.value?.trim();
  const errEl = document.getElementById('leadError');
  if (!name || !email || !phone || !facility) {
    if (errEl) { errEl.textContent = 'Please fill in all required fields.'; errEl.style.display = 'block'; }
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (errEl) { errEl.textContent = 'Please enter a valid email address.'; errEl.style.display = 'block'; }
    return;
  }
  // Store via shared module
  const leadData = { name, email, phone, facility, notes, timestamp: new Date().toISOString(), context: 'nurse-call' };
  NexusStorage.session.setItem('nexus_lead', JSON.stringify(leadData));
  const allLeads = JSON.parse(NexusStorage.local.getItem('nexus_leads') || '[]');
  allLeads.push(leadData);
  NexusStorage.local.setItem('nexus_leads', JSON.stringify(allLeads));
  answers.lead = leadData;
  disableAllOptions();
  addMessage('user', name + ' — ' + facility);
  await typeDelay();
  showDesigning();
};


// ---- System Design Engine ----
function showDesigning() {
  document.getElementById('chatView').style.display = 'none';
  document.getElementById('progressWrap').style.display = 'none';
  const dv = document.getElementById('designingView');
  dv.style.display = 'flex';

  const subtexts = [
    'Analyzing facility requirements and optimizing component selection',
    'Processing room configurations',
    'Calculating infrastructure needs',
    'Configuring nurses stations',
    'Selecting hallway indicators and displays',
    'Searching for facility imagery',
    'Applying NexusCT preferred pricing',
    'Calculating financing options',
    'Generating your system proposal',
  ];
  let idx = 0;
  const subEl = document.getElementById('designingSubtext');
  const interval = setInterval(() => {
    idx++;
    if (idx < subtexts.length) subEl.textContent = subtexts[idx];
  }, 600);

  facilityImageData = null;
  const facilityName = answers.leadFacility || '';
  if (facilityName) fetchFacilityImage(facilityName).catch(() => {});

  setTimeout(() => {
    clearInterval(interval);
    dv.style.display = 'none';
    const result = buildSystemDesign();
    renderQuote(result);
    saveQuote(result);
  }, 5000);
}

async function fetchFacilityImage(facilityName) {
  try {
    const url = `${CGI_BIN}/image_proxy.py?q=${encodeURIComponent(facilityName)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return;
    const data = await res.json();
    if (data.base64) facilityImageData = data.base64;
  } catch (e) {
    console.warn('Facility image fetch failed:', e);
  }
}

function buildSystemDesign() {
  const beds = answers.beds;
  const isRCare = answers.platform === 'rcare';
  const isJeron = !isRCare;
  const bom = [];
  const hall = answers.hallway || {};
  const hallOpts = hall.options || [];
  const totalConsoles = answers.nurseStations.reduce((s, ns) => s + ns.count, 0);

  // ---- JERON INFRASTRUCTURE WITH FULL DEPENDENCY CHAIN ----
  if (isJeron) {
    // Determine room controller part based on hallway LED selection (Rule 11)
    // Prism/prism_tone domes are BUILT INTO the room controller (7953/7953-T replaces 7950)
    let rcPn;
    if (hall.ledType === 'prism_tone') rcPn = '7953-T';
    else if (hall.ledType === 'prism') rcPn = '7953';
    else rcPn = '7950';
    bom.push({ cat: 'Infrastructure', pn: rcPn, name: JERON_PARTS[rcPn].name, qty: beds, cost: JERON_PARTS[rcPn].cost });

    // Gateways: 1 per 8 rooms (Rule 1)
    const gwCount = Math.ceil(beds / 8);
    bom.push({ cat: 'Infrastructure', pn: '7993', name: JERON_PARTS['7993'].name, qty: gwCount, cost: JERON_PARTS['7993'].cost });

    // Power Supply w/Battery Backup: 1 per gateway (Rule 2 — CRITICAL)
    bom.push({ cat: 'Infrastructure', pn: '7995', name: JERON_PARTS['7995'].name, qty: gwCount, cost: JERON_PARTS['7995'].cost });

    // Switches: 1 per 8 gateways (Rule 3)
    const swCount = Math.ceil(gwCount / 8);
    bom.push({ cat: 'Infrastructure', pn: '7991', name: JERON_PARTS['7991'].name, qty: swCount, cost: JERON_PARTS['7991'].cost });

    // Cabinets: 1 per 4 gateways (Rule 4 — holds ~4 gateways + power supplies)
    const cabCount = Math.ceil(gwCount / 4);
    bom.push({ cat: 'Infrastructure', pn: '7989', name: JERON_PARTS['7989'].name, qty: cabCount, cost: JERON_PARTS['7989'].cost });

    // J-Bus Terminators: 1 per gateway (Rule 5)
    bom.push({ cat: 'Infrastructure', pn: '9778', name: JERON_PARTS['9778'].name, qty: gwCount, cost: JERON_PARTS['9778'].cost });

    // J-Bus Splitters: ~1 per 3 rooms to branch daisy chain (Rule 6)
    const splitterCount = Math.ceil(beds / 3);
    bom.push({ cat: 'Infrastructure', pn: '9779', name: JERON_PARTS['9779'].name, qty: splitterCount, cost: JERON_PARTS['9779'].cost });

    // Console controllers: choose 7963 (w/zone light) if zone lights selected, else 7960 (Rule 13)
    const ccPn = hallOpts.includes('zone_lights') ? '7963' : '7960';
    bom.push({ cat: 'Infrastructure', pn: ccPn, name: JERON_PARTS[ccPn].name, qty: totalConsoles, cost: JERON_PARTS[ccPn].cost });

    // Console Receptacle: 1 per console (Rule 7)
    bom.push({ cat: 'Infrastructure', pn: '7969', name: JERON_PARTS['7969'].name, qty: totalConsoles, cost: JERON_PARTS['7969'].cost });

    // Rack Mount Adaptors (Rule 8)
    bom.push({ cat: 'Infrastructure', pn: '9840', name: JERON_PARTS['9840'].name, qty: gwCount, cost: JERON_PARTS['9840'].cost });
    bom.push({ cat: 'Infrastructure', pn: '9842', name: JERON_PARTS['9842'].name, qty: swCount, cost: JERON_PARTS['9842'].cost });

    // Admin software (1 per system)
    bom.push({ cat: 'Software', pn: '7990', name: JERON_PARTS['7990'].name, qty: 1, cost: JERON_PARTS['7990'].cost });
    // LAN Bridge: required when multiple switches (Rule 10)
    if (swCount > 1) bom.push({ cat: 'Software', pn: '7984', name: JERON_PARTS['7984'].name, qty: 1, cost: JERON_PARTS['7984'].cost });

  } else {
    // ---- RCARE INFRASTRUCTURE WITH DEPENDENCY CHAIN ----

    // Count total wireless devices for server sizing (Rule 14)
    let totalDevices = 0;
    answers.roomConfigs.forEach(rc => {
      const totalBeds = rc.qty * rc.bedsPerRoom;
      const totalRooms = rc.qty;
      totalDevices += Math.ceil(totalBeds * 1.2); // pendants
      if (rc.accessories.includes('pull_cord')) totalDevices += totalBeds;
      if (rc.accessories.includes('pillow_speaker')) totalDevices += totalBeds;
      if (rc.accessories.includes('pressure_pad')) totalDevices += totalBeds;
      totalDevices += totalRooms; // wall buttons (UL-1069)
      rc.sensors.forEach(() => { totalDevices += totalRooms; });
      rc.displays.forEach(() => { totalDevices += totalRooms; });
      // bathroom pull cords
      const bathPulls = rc.pullLayout === 'separate' ? totalRooms * rc.bathsPerRoom * 2 : totalRooms * rc.bathsPerRoom;
      totalDevices += bathPulls;
    });

    // Server: BCube up to 128 devices, RCube above (Rule 14)
    if (totalDevices <= 128) {
      bom.push({ cat: 'Infrastructure', pn: 'BCube', name: RCARE_PARTS['BCube'].name, qty: 1, cost: RCARE_PARTS['BCube'].cost });
    } else {
      const serverCount = totalDevices > 500 ? 2 : 1;
      bom.push({ cat: 'Infrastructure', pn: 'RCube', name: RCARE_PARTS['RCube'].name, qty: serverCount, cost: RCARE_PARTS['RCube'].cost });
    }

    const locCount = Math.max(1, Math.ceil(beds / 18));
    bom.push({ cat: 'Infrastructure', pn: 'LT-490-G4', name: RCARE_PARTS['LT-490-G4'].name, qty: locCount, cost: RCARE_PARTS['LT-490-G4'].cost });
    const repCount = Math.max(1, Math.ceil(beds / 35));
    bom.push({ cat: 'Infrastructure', pn: 'RP-990-G4', name: RCARE_PARTS['RP-990-G4'].name, qty: repCount, cost: RCARE_PARTS['RP-990-G4'].cost });

    // Master Receiver: supports up to 100 locators+repeaters combined (Rule 15)
    const mrCount = Math.max(1, Math.ceil((locCount + repCount) / 100));
    bom.push({ cat: 'Infrastructure', pn: 'MR-500-G4', name: RCARE_PARTS['MR-500-G4'].name, qty: mrCount, cost: RCARE_PARTS['MR-500-G4'].cost });

    // Outdoor Enclosures: 1 per 3 repeaters (Rule 17)
    const encCount = Math.ceil(repCount / 3);
    if (encCount > 0) bom.push({ cat: 'Infrastructure', pn: 'Outdoor-Enc', name: RCARE_PARTS['Outdoor-Enc'].name, qty: encCount, cost: RCARE_PARTS['Outdoor-Enc'].cost });

    // Help Buttons for common areas: 1 per 30 beds (Rule 18)
    const helpBtnCount = Math.max(1, Math.ceil(beds / 30));
    bom.push({ cat: 'Infrastructure', pn: 'Help-Btn', name: RCARE_PARTS['Help-Btn'].name, qty: helpBtnCount, cost: RCARE_PARTS['Help-Btn'].cost });

    // Staff Emergency Pendants: 1 per 10 beds (Rule 20)
    const staffPendCount = Math.max(1, Math.ceil(beds / 10));
    bom.push({ cat: 'Infrastructure', pn: 'Staff-Pend', name: RCARE_PARTS['Staff-Pend'].name, qty: staffPendCount, cost: RCARE_PARTS['Staff-Pend'].cost });
  }

  // ---- ROOM CONFIGURATIONS ----
  // Pre-calculate gwCount for Jeron software licensing (need it later)
  const gwCount = isJeron ? Math.ceil(beds / 8) : 0;

  answers.roomConfigs.forEach(rc => {
    const totalBeds = rc.qty * rc.bedsPerRoom;
    const totalRooms = rc.qty;

    if (isJeron) {
      // Patient stations (1 per bed)
      const hasTwoWay = rc.accessories.includes('two_way_audio');
      const stPn = hasTwoWay ? '7923' : '7920';
      bom.push({ cat: `Patient Stations (${rc.name})`, pn: stPn, name: JERON_PARTS[stPn].name, qty: totalBeds, cost: JERON_PARTS[stPn].cost });

      // DIN Call Cord: ALWAYS 1 per bed — every patient station needs one to connect (Rule 12)
      bom.push({ cat: `Accessories (${rc.name})`, pn: '7910', name: JERON_PARTS['7910'].name, qty: totalBeds, cost: JERON_PARTS['7910'].cost });

      if (rc.accessories.includes('pull_cord')) bom.push({ cat: `Accessories (${rc.name})`, pn: '7932', name: JERON_PARTS['7932'].name + ' (Bed Pull Cord)', qty: totalBeds, cost: JERON_PARTS['7932'].cost });
      if (rc.accessories.includes('pillow_speaker')) bom.push({ cat: `Accessories (${rc.name})`, pn: '7901', name: JERON_PARTS['7901'].name, qty: totalBeds, cost: JERON_PARTS['7901'].cost });
      if (rc.accessories.includes('pressure_pad')) bom.push({ cat: `Accessories (${rc.name})`, pn: 'PP-SENSOR', name: JERON_PARTS['PP-SENSOR'].name, qty: totalBeds, cost: JERON_PARTS['PP-SENSOR'].cost });

      // Bathrooms
      const totalPullCords = rc.pullLayout === 'separate' ? totalRooms * rc.bathsPerRoom * 2 : totalRooms * rc.bathsPerRoom;
      if (totalPullCords > 0) bom.push({ cat: `Bathroom (${rc.name})`, pn: '7932', name: JERON_PARTS['7932'].name, qty: totalPullCords, cost: JERON_PARTS['7932'].cost });

      // Room sensors
      if (rc.sensors.includes('staff_assign')) bom.push({ cat: `Room Sensors (${rc.name})`, pn: '7912-STA', name: JERON_PARTS['7912-STA'].name, qty: totalRooms, cost: JERON_PARTS['7912-STA'].cost });
      if (rc.sensors.includes('code_blue')) bom.push({ cat: `Room Sensors (${rc.name})`, pn: '7930', name: JERON_PARTS['7930'].name + ' (Code Blue)', qty: totalRooms, cost: JERON_PARTS['7930'].cost });
      if (rc.sensors.includes('door_monitor')) bom.push({ cat: `Room Sensors (${rc.name})`, pn: '7950-DB', name: JERON_PARTS['7950-DB'].name, qty: totalRooms, cost: JERON_PARTS['7950-DB'].cost });
      if (rc.sensors.includes('bed_exit')) bom.push({ cat: `Room Sensors (${rc.name})`, pn: '7950-BE', name: JERON_PARTS['7950-BE'].name, qty: totalBeds, cost: JERON_PARTS['7950-BE'].cost });

      // Display/communication
      if (rc.displays.includes('tv')) bom.push({ cat: `Display (${rc.name})`, pn: 'TV-INT', name: JERON_PARTS['TV-INT'].name, qty: totalRooms, cost: JERON_PARTS['TV-INT'].cost });
      if (rc.displays.includes('ai_assist')) bom.push({ cat: `Display (${rc.name})`, pn: 'AI-ASST', name: JERON_PARTS['AI-ASST'].name, qty: totalRooms, cost: JERON_PARTS['AI-ASST'].cost });
      if (rc.displays.includes('tablet')) bom.push({ cat: `Display (${rc.name})`, pn: 'TAB-CC', name: JERON_PARTS['TAB-CC'].name, qty: totalRooms, cost: JERON_PARTS['TAB-CC'].cost });
      if (rc.displays.includes('infotainment')) bom.push({ cat: `Display (${rc.name})`, pn: 'DIS-INFO', name: JERON_PARTS['DIS-INFO'].name, qty: totalRooms, cost: JERON_PARTS['DIS-INFO'].cost });

    } else {
      // RCare room equipment
      const pendantQty = Math.ceil(totalBeds * 1.2);
      bom.push({ cat: `Resident Devices (${rc.name})`, pn: 'Pretty-G4', name: RCARE_PARTS['Pretty-G4'].name, qty: pendantQty, cost: RCARE_PARTS['Pretty-G4'].cost });

      // Wall Push Button: 1 per room for UL-1069 compliance (Rule 16)
      bom.push({ cat: `Resident Devices (${rc.name})`, pn: 'WM-8', name: RCARE_PARTS['WM-8'].name, qty: totalRooms, cost: RCARE_PARTS['WM-8'].cost });

      if (rc.accessories.includes('pull_cord')) bom.push({ cat: `Resident Devices (${rc.name})`, pn: 'BP-7RWR', name: RCARE_PARTS['BP-7RWR'].name, qty: totalBeds, cost: RCARE_PARTS['BP-7RWR'].cost });
      if (rc.accessories.includes('pillow_speaker')) bom.push({ cat: `Resident Devices (${rc.name})`, pn: 'JR-14', name: RCARE_PARTS['JR-14'].name + ' (Bedside)', qty: totalBeds, cost: RCARE_PARTS['JR-14'].cost });
      if (rc.accessories.includes('pressure_pad')) bom.push({ cat: `Resident Devices (${rc.name})`, pn: 'RC-PP', name: RCARE_PARTS['RC-PP'].name, qty: totalBeds, cost: RCARE_PARTS['RC-PP'].cost });

      // Bathrooms
      const totalPullCords = rc.pullLayout === 'separate' ? totalRooms * rc.bathsPerRoom * 2 : totalRooms * rc.bathsPerRoom;
      if (totalPullCords > 0) bom.push({ cat: `Bathroom (${rc.name})`, pn: 'BP-7RWR', name: RCARE_PARTS['BP-7RWR'].name + ' (Bath)', qty: totalPullCords, cost: RCARE_PARTS['BP-7RWR'].cost });

      // Sensors
      if (rc.sensors.includes('door_window')) bom.push({ cat: `Room Sensors (${rc.name})`, pn: 'WD-3', name: RCARE_PARTS['WD-3'].name, qty: totalRooms, cost: RCARE_PARTS['WD-3'].cost });
      if (rc.sensors.includes('activity')) bom.push({ cat: `Room Sensors (${rc.name})`, pn: 'MS-6', name: RCARE_PARTS['MS-6'].name, qty: totalRooms, cost: RCARE_PARTS['MS-6'].cost });
      if (rc.sensors.includes('bed_chair')) bom.push({ cat: `Room Sensors (${rc.name})`, pn: 'RC-BCA9', name: RCARE_PARTS['RC-BCA9'].name, qty: totalBeds, cost: RCARE_PARTS['RC-BCA9'].cost });
      if (rc.sensors.includes('universal_tx')) bom.push({ cat: `Room Sensors (${rc.name})`, pn: 'UT-RE3', name: RCARE_PARTS['UT-RE3'].name, qty: totalRooms, cost: RCARE_PARTS['UT-RE3'].cost });
      if (rc.sensors.includes('wander_tx')) bom.push({ cat: `Room Sensors (${rc.name})`, pn: 'RC-WTC', name: RCARE_PARTS['RC-WTC'].name, qty: totalBeds, cost: RCARE_PARTS['RC-WTC'].cost });

      // Display
      if (rc.displays.includes('tv')) bom.push({ cat: `Display (${rc.name})`, pn: 'RC-TV', name: RCARE_PARTS['RC-TV'].name, qty: totalRooms, cost: RCARE_PARTS['RC-TV'].cost });
      if (rc.displays.includes('ai_assist')) bom.push({ cat: `Display (${rc.name})`, pn: 'RC-AI', name: RCARE_PARTS['RC-AI'].name, qty: totalRooms, cost: RCARE_PARTS['RC-AI'].cost });
      if (rc.displays.includes('tablet')) bom.push({ cat: `Display (${rc.name})`, pn: 'RC-TAB', name: RCARE_PARTS['RC-TAB'].name, qty: totalRooms, cost: RCARE_PARTS['RC-TAB'].cost });
      if (rc.displays.includes('infotainment')) bom.push({ cat: `Display (${rc.name})`, pn: 'RC-INFO', name: RCARE_PARTS['RC-INFO'].name, qty: totalRooms, cost: RCARE_PARTS['RC-INFO'].cost });
    }
  });

  // ---- NURSES STATIONS ----
  answers.nurseStations.forEach(ns => {
    if (isJeron) {
      const cMap = { 'jeron_7965':'7965', 'jeron_7965b':'7965-B', 'jeron_7985':'7985', 'jeron_7967':'7967-M' };
      const cPn = cMap[ns.consoleType] || '7965';
      bom.push({ cat: `Nurse Station (${ns.name})`, pn: cPn, name: JERON_PARTS[cPn].name, qty: ns.count, cost: JERON_PARTS[cPn].cost });
      if (ns.hardware.includes('secondary_display')) bom.push({ cat: `Nurse Station (${ns.name})`, pn: '7967-DIS', name: JERON_PARTS['7967-DIS'].name, qty: ns.count, cost: JERON_PARTS['7967-DIS'].cost });
      if (ns.hardware.includes('bt_handset')) bom.push({ cat: `Nurse Station (${ns.name})`, pn: '7965-B', name: 'Bluetooth Handset Add-on', qty: ns.count, cost: 487.50 });
      if (ns.hardware.includes('duty_terminal')) bom.push({ cat: `Nurse Station (${ns.name})`, pn: '7967-S', name: JERON_PARTS['7967-S'].name, qty: ns.count, cost: JERON_PARTS['7967-S'].cost });
      if (ns.hardware.includes('staff_assign_display')) bom.push({ cat: `Nurse Station (${ns.name})`, pn: '7912-STA', name: JERON_PARTS['7912-STA'].name, qty: ns.count, cost: JERON_PARTS['7912-STA'].cost });
    } else {
      const rMap = { 'rcare_cc980':'CC980', 'rcare_cc10':'CC-10' };
      const rPn = rMap[ns.consoleType] || 'CC980';
      bom.push({ cat: `Nurse Station (${ns.name})`, pn: rPn, name: RCARE_PARTS[rPn].name, qty: ns.count, cost: RCARE_PARTS[rPn].cost });
      if (ns.hardware.includes('secondary_display')) bom.push({ cat: `Nurse Station (${ns.name})`, pn: 'CC-10', name: 'Secondary Display Console', qty: ns.count, cost: RCARE_PARTS['CC-10'].cost });
      if (ns.hardware.includes('staff_assign_display')) bom.push({ cat: `Nurse Station (${ns.name})`, pn: 'RK-77', name: 'Staff Assignment Keypad', qty: ns.count, cost: RCARE_PARTS['RK-77'].cost });
    }
  });

  // ---- RCare Wander Management — Remote Keypads (Rule 19) ----
  if (isRCare) {
    const wInts = answers.integrations || [];
    if (wInts.includes('int_wander')) {
      const keypadCount = Math.max(1, Math.ceil(beds / 20));
      bom.push({ cat: 'Wander Management', pn: 'RK-77', name: RCARE_PARTS['RK-77'].name, qty: keypadCount, cost: RCARE_PARTS['RK-77'].cost });
    }
  }

  // ---- HALLWAY ----
  if (hall.ledType && hall.ledType !== 'none') {
    const domeQty = hall.placement === 'per_2rooms' ? Math.ceil(beds / 2) : beds;
    if (isJeron) {
      // Rule 11: For prism/prism_tone, the dome is built into the room controller (7953/7953-T)
      // so we only add SEPARATE dome lights for 'single' (standard) LED type
      if (hall.ledType === 'single') {
        // Standard dome — added as separate items (not built into room controller)
        bom.push({ cat: 'Hallway Indicators', pn: '7953', name: 'Standard Dome Light', qty: domeQty, cost: 180 });
      }
      // For 'prism' and 'prism_tone', the dome is already part of the room controller above — no separate line
    } else {
      bom.push({ cat: 'Hallway Indicators', pn: 'Dome-LED', name: RCARE_PARTS['Dome-LED'].name, qty: domeQty, cost: RCARE_PARTS['Dome-LED'].cost });
    }
  }

  if (hallOpts.includes('zone_lights')) bom.push({ cat: 'Hallway Indicators', pn: isJeron?'7973':'Dome-LED', name: 'Zone Indicator Light', qty: Math.ceil(beds / 15), cost: isJeron?312:180 });
  if (hallOpts.includes('audio_annunciator')) bom.push({ cat: 'Hallway Displays', pn: isJeron?'7970-PA':'RC-HAUD', name: isJeron?JERON_PARTS['7970-PA'].name:RCARE_PARTS['RC-HAUD'].name, qty: Math.ceil(beds/30), cost: isJeron?JERON_PARTS['7970-PA'].cost:RCARE_PARTS['RC-HAUD'].cost });
  if (hallOpts.includes('digital_display')) bom.push({ cat: 'Hallway Displays', pn: isJeron?'7973-D':'RC-HDIS', name: isJeron?JERON_PARTS['7973-D'].name:RCARE_PARTS['RC-HDIS'].name, qty: Math.ceil(beds/30), cost: isJeron?JERON_PARTS['7973-D'].cost:RCARE_PARTS['RC-HDIS'].cost });
  if (hallOpts.includes('master_display')) bom.push({ cat: 'Hallway Displays', pn: isJeron?'7973-M':'RC-MDIS', name: isJeron?JERON_PARTS['7973-M'].name:RCARE_PARTS['RC-MDIS'].name, qty: 1, cost: isJeron?JERON_PARTS['7973-M'].cost:RCARE_PARTS['RC-MDIS'].cost });
  if (hallOpts.includes('room_led')) bom.push({ cat: 'Room Indicators', pn: isJeron?'7973-RM':'RC-RMPN', name: isJeron?JERON_PARTS['7973-RM'].name:RCARE_PARTS['RC-RMPN'].name, qty: beds, cost: isJeron?JERON_PARTS['7973-RM'].cost:RCARE_PARTS['RC-RMPN'].cost });
  if (hallOpts.includes('status_display')) bom.push({ cat: 'Room Indicators', pn: isJeron?'7973-ST':'RC-STPN', name: isJeron?JERON_PARTS['7973-ST'].name:RCARE_PARTS['RC-STPN'].name, qty: beds, cost: isJeron?JERON_PARTS['7973-ST'].cost:RCARE_PARTS['RC-STPN'].cost });
  if (hallOpts.includes('rgb_strip')) bom.push({ cat: 'Room Indicators', pn: isJeron?'7973-RGB':'RC-RGB', name: isJeron?JERON_PARTS['7973-RGB'].name:RCARE_PARTS['RC-RGB'].name, qty: beds, cost: isJeron?JERON_PARTS['7973-RGB'].cost:RCARE_PARTS['RC-RGB'].cost });

  // ---- SOFTWARE/INTEGRATIONS ----
  const ints = answers.integrations || [];
  if (isJeron) {
    // Rule 9: Per-gateway licenses — each gateway needs its own license
    const perGwParts = { 'int_ehr':'7977', 'int_sip':'7978', 'int_paging':'7979', 'int_staff':'7980',
                         'int_rtls':'7981', 'int_barcode':'7982', 'int_reporting':'7983', 'int_voice_pa':'7970' };
    for (const [intId, pn] of Object.entries(perGwParts)) {
      if (ints.includes(intId)) bom.push({ cat: 'Software', pn, name: JERON_PARTS[pn].name, qty: gwCount, cost: JERON_PARTS[pn].cost });
    }
    // Per-system licenses (Rule 9 exceptions)
    if (ints.includes('int_pc_console')) bom.push({ cat: 'Software', pn: '7985', name: JERON_PARTS['7985'].name, qty: 1, cost: JERON_PARTS['7985'].cost });
    if (ints.includes('int_mapview')) bom.push({ cat: 'Software', pn: '7986', name: JERON_PARTS['7986'].name, qty: 1, cost: JERON_PARTS['7986'].cost });
    if (ints.includes('int_android')) bom.push({ cat: 'Software', pn: '7987', name: JERON_PARTS['7987'].name, qty: 1, cost: JERON_PARTS['7987'].cost });
  } else {
    if (ints.includes('int_ehr')) bom.push({ cat: 'Software', pn: 'PCC-Int', name: RCARE_PARTS['PCC-Int'].name, qty: 1, cost: RCARE_PARTS['PCC-Int'].cost });
    if (ints.includes('int_wander')) bom.push({ cat: 'Software', pn: 'Wander-Int', name: RCARE_PARTS['Wander-Int'].name, qty: 1, cost: RCARE_PARTS['Wander-Int'].cost });
    if (ints.includes('int_mcube')) bom.push({ cat: 'Software', pn: 'MCube', name: RCARE_PARTS['MCube'].name, qty: 1, cost: RCARE_PARTS['MCube'].cost });
    if (ints.includes('int_vcube')) bom.push({ cat: 'Software', pn: 'VCube', name: RCARE_PARTS['VCube'].name, qty: 1, cost: RCARE_PARTS['VCube'].cost });
    if (ints.includes('int_pager')) bom.push({ cat: 'Software', pn: 'Pager-Int', name: RCARE_PARTS['Pager-Int'].name, qty: 1, cost: RCARE_PARTS['Pager-Int'].cost });
    if (ints.includes('int_rphone')) bom.push({ cat: 'Software', pn: 'RPhone', name: RCARE_PARTS['RPhone'].name, qty: totalConsoles * 2, cost: RCARE_PARTS['RPhone'].cost });
    if (ints.includes('int_activity')) bom.push({ cat: 'Software', pn: 'RC-ACT', name: RCARE_PARTS['RC-ACT'].name, qty: 1, cost: RCARE_PARTS['RC-ACT'].cost });
  }

  // ---- TOTALS ----
  let equipDealerTotal = 0, equipSellTotal = 0;
  const bomWithPricing = bom.map(item => {
    const lineDealer = item.cost * item.qty;
    const lineSell = sellPrice(item.cost) * item.qty;
    equipDealerTotal += lineDealer;
    equipSellTotal += lineSell;
    return { ...item, lineDealer, lineSell, unitSell: sellPrice(item.cost) };
  });

  let installCost = 0;
  if (answers.installation === 'professional') installCost = 150 * beds;
  if (answers.installation === 'turnkey') installCost = 250 * beds;

  const grandTotal = equipSellTotal + installCost;
  const marginTotal = equipSellTotal - equipDealerTotal;

  const financing = {
    apr: FINANCE_APR,
    terms: [
      { months: 36, monthly: calcMonthlyPayment(grandTotal, FINANCE_APR, 36) },
      { months: 48, monthly: calcMonthlyPayment(grandTotal, FINANCE_APR, 48) },
      { months: 60, monthly: calcMonthlyPayment(grandTotal, FINANCE_APR, 60) },
    ],
  };

  const ncaasMonthly = (grandTotal * NCAAS_MARKUP) / NCAAS_TERM;
  const ncaas = {
    termMonths: NCAAS_TERM,
    monthly: ncaasMonthly,
    perBed: ncaasMonthly / beds,
    includes: [
      'All system equipment and components',
      'Professional installation and commissioning',
      'Preventive maintenance and inspections',
      '24/7 remote monitoring and support',
      'Software updates and firmware upgrades',
      'Hardware replacement coverage',
    ],
  };

  return { bom: bomWithPricing, equipDealerTotal, equipSellTotal, installCost, grandTotal, marginTotal, financing, ncaas, facilityImage: facilityImageData, answers };
}



// ---- Competitor Comparison Builder ----
function buildCompetitorTable(result, a) {
  const beds = a.beds;
  const nexusEquipTotal = result.equipSellTotal;
  const nexusInstall = result.installCost;
  const nexusTotal = result.grandTotal;
  const nexusPerBed = nexusTotal / beds;
  
  let rows = '';
  // NexusCT row (highlighted)
  rows += `<tr class="competitor-row competitor-row--nexus">
    <td><strong>NexusCT (${a.platformLabel})</strong><br><span class="comp-note" style="color:#4ade80;">✓ $0 recurring software fees</span></td>
    <td>${fmt(nexusEquipTotal)}</td>
    <td>${fmt(nexusInstall)}</td>
    <td><strong style="color:#4ade80;">$0/year</strong></td>
    <td><strong style="color:#4ade80;">$0/year</strong></td>
    <td>${fmt(nexusPerBed)}</td>
    <td><strong>${fmt(nexusTotal)}</strong><br><span class="comp-note" style="color:#4ade80;">+ $0 ongoing fees</span></td>
  </tr>`;
  
  for (const [key, comp] of Object.entries(COMPETITOR_NURSE_CALL)) {
    const equipTotal = comp.perBedEquipment * beds;
    const installTotal = comp.installPerBed * beds;
    const yearOneCost = equipTotal + installTotal;
    const perBed = yearOneCost / beds;
    const annualSoftware = comp.annualSoftwareFee * beds;
    const annualMaint = comp.annualMaintenanceFee * beds;
    const fiveYearRecurring = (annualSoftware + annualMaint) * 5;
    const fiveYearTotal = yearOneCost + fiveYearRecurring;
    const pctMore = Math.round(((fiveYearTotal - nexusTotal) / nexusTotal) * 100);
    
    rows += `<tr class="competitor-row competitor-row--other">
      <td><strong>${comp.name}</strong><br><span class="comp-note" style="color:#f87171;">⚠ Recurring fees required</span></td>
      <td>${fmt(equipTotal)}</td>
      <td>${fmt(installTotal)}</td>
      <td style="color:#f87171;"><strong>${fmt(annualSoftware)}/yr</strong></td>
      <td style="color:#f87171;"><strong>${fmt(annualMaint)}/yr</strong></td>
      <td>${fmt(perBed)}</td>
      <td>${fmt(fiveYearTotal)}<br><span class="comp-note" style="color:#f87171;">${pctMore}% more over 5 years</span></td>
    </tr>`;
  }
  
  return `<div class="competitor-table-wrap">
    <table class="competitor-table">
      <thead>
        <tr>
          <th>Solution</th>
          <th>Equipment</th>
          <th>Installation</th>
          <th>Annual Software</th>
          <th>Annual Maint.</th>
          <th>Per Bed</th>
          <th>5-Year TCO</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
  <div class="competitor-savings-callout">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 010 4H8"/><path d="M12 18V6"/></svg>
    <div>
      <strong>$0 Recurring Software Fees</strong>
      <p>Both Jeron and RCare include all software at no recurring cost — no annual licensing, no per-bed software subscriptions. Competitors charge ${fmt(COMPETITOR_NURSE_CALL.rauland.annualSoftwareFee)}/bed/year or more in mandatory software fees alone.</p>
    </div>
  </div>`;
}

function buildSLACards(beds) {
  let cards = '';
  for (const [key, pkg] of Object.entries(SLA_PACKAGES)) {
    const monthlyTotal = pkg.perBedMonth * beds;
    const annualTotal = monthlyTotal * 12;
    const features = pkg.features.map(f => 
      `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${pkg.color}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ${f}</li>`
    ).join('');
    
    cards += `<div class="sla-card${pkg.popular ? ' sla-card--popular' : ''}">
      ${pkg.popular ? '<div class="sla-badge" style="background:' + pkg.color + ';">Most Popular</div>' : ''}
      <div class="sla-tier" style="color:${pkg.color};">${pkg.name}</div>
      <div class="sla-price">${fmtWhole(monthlyTotal)}<span>/mo</span></div>
      <div class="sla-perbed">$${pkg.perBedMonth}/bed/month</div>
      <div class="sla-annual">${fmt(annualTotal)}/year</div>
      <ul class="sla-features">${features}</ul>
      <div class="sla-note">10% below industry average</div>
    </div>`;
  }
  return `<div class="sla-cards">${cards}</div>`;
}

// ---- Render Quote ----
function renderQuote(result) {
  const qv = document.getElementById('quoteView');
  qv.style.display = 'block';
  const a = result.answers;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const intLabels = a.integrationsLabels && a.integrationsLabels.length > 0 ? a.integrationsLabels.join(', ') : 'None';
  const rangeLow = Math.round(result.grandTotal * 0.70);
  const rangeHigh = Math.round(result.grandTotal * 1.30);

  // Build system summary grouped by category
  const categories = {};
  result.bom.forEach(item => {
    if (!categories[item.cat]) categories[item.cat] = [];
    categories[item.cat].push(item);
  });
  let summaryHtml = '';
  for (const [cat, items] of Object.entries(categories)) {
    summaryHtml += `<div class="summary-category"><h3 class="summary-cat-title">${cat}</h3><ul class="summary-list">`;
    items.forEach(item => { summaryHtml += `<li>${item.name} <span class="summary-qty">\u00d7${item.qty}</span></li>`; });
    summaryHtml += '</ul></div>';
  }

  // Facility image
  const facilityImgHtml = result.facilityImage
    ? `<div class="facility-image-wrap"><img src="${result.facilityImage}" alt="${a.leadFacility || 'Facility'}" class="facility-image" /><div class="facility-image-label">${a.leadFacility || ''}</div></div>`
    : '';

  // Room configs summary
  let roomConfigHtml = '';
  (a.roomConfigs || []).forEach((rc, i) => {
    roomConfigHtml += `<div style="background:var(--color-surface-offset);padding:var(--space-3);border-radius:var(--radius-md);margin-bottom:var(--space-3);">
      <strong>${rc.name}</strong> — ${rc.qty} rooms, ${rc.bedsPerRoom} bed(s)/room, ${rc.bathsPerRoom} bath(s)
      <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:var(--space-1);">
        Accessories: ${rc.accessories.length ? rc.accessories.join(', ') : 'None'} |
        Sensors: ${rc.sensors.length ? rc.sensors.join(', ') : 'None'} |
        Display: ${rc.displays.length ? rc.displays.join(', ') : 'None'}
      </div>
    </div>`;
  });

  // Nurse stations summary
  let nsHtml = '';
  (a.nurseStations || []).forEach(ns => {
    nsHtml += `<div style="background:var(--color-surface-offset);padding:var(--space-3);border-radius:var(--radius-md);margin-bottom:var(--space-2);">
      <strong>${ns.name}</strong> — ${ns.count} console(s), ${ns.consoleType.replace(/_/g,' ')}
      ${ns.hardware.length ? `<div style="font-size:var(--text-xs);color:var(--color-text-muted);">Add-ons: ${ns.hardware.join(', ')}</div>` : ''}
    </div>`;
  });

  // Hallway summary
  const h = a.hallway || {};
  const hallSummary = h.ledType && h.ledType !== 'none'
    ? `LED: ${h.ledType} (${h.placement})${h.options && h.options.length ? ' | ' + h.options.join(', ') : ''}`
    : 'No corridor LEDs' + (h.options && h.options.length ? ' | ' + h.options.join(', ') : '');

  // Financing
  const fin = result.financing;
  let finCardsHtml = '';
  fin.terms.forEach(t => {
    const low = Math.round(t.monthly * 0.70);
    const high = Math.round(t.monthly * 1.30);
    const label = t.months === 36 ? '3-Year' : t.months === 48 ? '4-Year' : '5-Year';
    const highlight = t.months === 60 ? ' financing-card--popular' : '';
    finCardsHtml += `<div class="financing-card${highlight}">
      ${t.months === 60 ? '<div class="financing-badge">Lowest Payment</div>' : ''}
      <div class="financing-term">${label}</div>
      <div class="financing-months">${t.months} months</div>
      <div class="financing-amount">${fmtWhole(low)} \u2014 ${fmtWhole(high)}</div>
      <div class="financing-per">per month</div>
    </div>`;
  });

  // NCaaS
  const nc = result.ncaas;
  const ncMonthLow = Math.round(nc.monthly * 0.70);
  const ncMonthHigh = Math.round(nc.monthly * 1.30);
  const ncBedLow = (nc.perBed * 0.70).toFixed(2);
  const ncBedHigh = (nc.perBed * 1.30).toFixed(2);
  let ncIncludes = '';
  nc.includes.forEach(item => {
    ncIncludes += `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ${item}</li>`;
  });

  qv.innerHTML = `
    ${facilityImgHtml}
    <div class="quote-header">
      <div class="quote-header-left">
        <h1>System Estimate</h1>
        <p>${a.leadFacility ? a.leadFacility + ' \u2014 ' : ''}${a.facilityTypeLabel || ''} \u2014 ${a.beds} Beds | ${today}</p>
        ${a.leadName ? `<p style="font-size:var(--text-sm);color:var(--color-text-muted);margin-top:var(--space-1);">Prepared for ${a.leadName}</p>` : ''}
      </div>
      <div class="quote-header-right">
        <div class="quote-total-label">Estimated Investment</div>
        <div class="quote-total-value">${fmt(rangeLow)} \u2014 ${fmt(rangeHigh)}</div>
        <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:var(--space-1);">Final pricing determined after site survey</div>
      </div>
    </div>
    <div class="quote-body">
      <div class="quote-section">
        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg> Facility Profile</h2>
        <div class="facility-grid">
          <div class="facility-item"><div class="label">Facility Type</div><div class="value">${a.facilityTypeLabel}</div></div>
          <div class="facility-item"><div class="label">Total Beds</div><div class="value">${a.beds}</div></div>
          <div class="facility-item"><div class="label">Project Type</div><div class="value">${a.constructionTypeLabel}</div></div>
          <div class="facility-item"><div class="label">Platform</div><div class="value">${a.platformLabel}</div></div>
          <div class="facility-item"><div class="label">Installation</div><div class="value">${a.installationLabel}</div></div>
          <div class="facility-item"><div class="label">Integrations</div><div class="value">${intLabels}</div></div>
        </div>
      </div>

      <div class="quote-section">
        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> Room Configurations</h2>
        ${roomConfigHtml}
      </div>

      <div class="quote-section">
        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> Nurses Stations</h2>
        ${nsHtml}
      </div>

      <div class="quote-section">
        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> Hallway Configuration</h2>
        <p style="color:var(--color-text-muted);">${hallSummary}</p>
      </div>

      <div class="quote-section">
        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg> System Components</h2>
        <div class="system-summary">${summaryHtml}</div>
      </div>

      <div class="quote-section">
        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Estimated Investment</h2>
        <div class="estimate-box">
          <div class="estimate-range">
            <div class="estimate-low">${fmt(rangeLow)}</div>
            <div class="estimate-dash">\u2014</div>
            <div class="estimate-high">${fmt(rangeHigh)}</div>
          </div>
          <p class="estimate-note">This estimate is based on the specifications above. Final pricing will be determined after an on-site survey and detailed engineering review by NexusCT.</p>
        </div>
      </div>

      <div class="quote-section">
        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> Financing Options</h2>
        <p class="section-subtitle">Spread your investment over time with flexible financing at ${(fin.apr * 100).toFixed(1)}% APR.</p>
        <div class="financing-cards">${finCardsHtml}</div>
        <p class="financing-disclaimer">Financing subject to credit approval. Rates and terms may vary.</p>
      </div>

      <div class="quote-section">
        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4z"/><path d="M2 10h20"/></svg> Nurse Call as a Service (NCaaS)</h2>
        <p class="section-subtitle">Eliminate capital expenditure entirely with a monthly operating expense.</p>
        <div class="ncaas-box">
          <div class="ncaas-pricing">
            <div class="ncaas-amount">${fmtWhole(ncMonthLow)} \u2014 ${fmtWhole(ncMonthHigh)}<span>/mo</span></div>
            <div class="ncaas-perbed">$${ncBedLow} \u2014 $${ncBedHigh} per bed/month</div>
            <div class="ncaas-term">${nc.termMonths}-month service agreement</div>
          </div>
          <div class="ncaas-includes"><h4>Everything Included:</h4><ul>${ncIncludes}</ul></div>
        </div>
      </div>


      <div class="quote-section competitor-comparison-section">
        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg> How We Compare</h2>
        <p class="section-subtitle">See how NexusCT's ${a.platformLabel} solution compares to leading competitors.</p>
        ${buildCompetitorTable(result, a)}
      </div>

      <div class="quote-section sla-packages-section">
        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Managed Service &amp; Support Plans</h2>
        <p class="section-subtitle">Protect your investment with ongoing expert support — priced below industry average.</p>
        ${buildSLACards(a.beds)}
      </div>

      <div class="quote-section" style="margin-top:var(--space-6);">
        <div style="background:var(--color-surface-offset);border-radius:var(--radius-lg);padding:var(--space-4);font-size:var(--text-xs);color:var(--color-text-muted);line-height:1.7;">
          <strong style="color:var(--color-text);">Disclaimer</strong><br>
          This is a preliminary budget estimate only and does not constitute a formal quote or proposal.
          Final pricing requires an on-site assessment. 5-year manufacturer warranty included with all platforms.
          Tax not included. Contact NexusCT to schedule your complimentary site survey.
        </div>
      </div>

      <div class="quote-actions">
        <button class="btn btn-primary" onclick="downloadPDF()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Estimate PDF
        </button>
        <a class="btn btn-success" href="mailto:jmazza@nexusct.com?subject=Nurse Call Estimate \u2014 ${encodeURIComponent(a.leadFacility || a.facilityTypeLabel)} \u2014 ${a.beds} Beds&body=${encodeURIComponent('Name: ' + (a.leadName || '') + '\nFacility: ' + (a.leadFacility || '') + '\nBeds: ' + a.beds + '\n\nPlease contact me to schedule a site survey.\n\nGenerated by NexusCT System Designer.')}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Request Site Survey
        </a>
        <button class="btn btn-secondary" onclick="startOver()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Start Over
        </button>
      </div>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window._quoteResult = result;
  
  // Store for combined quote builder
  if (!NexusPricing.getCombinedQuotes()) NexusPricing.getCombinedQuotes() = {};
  NexusPricing.getCombinedQuotes().nurseCall = {
    type: 'Nurse Call System',
    platform: result.answers.platformLabel,
    facility: result.answers.leadFacility || result.answers.facilityTypeLabel,
    beds: result.answers.beds,
    total: result.grandTotal,
    rangeLow: Math.round(result.grandTotal * 0.70),
    rangeHigh: Math.round(result.grandTotal * 1.30),
    monthly: result.ncaas.monthly,
    slaSelected: null
  };
  renderCombinedQuoteButton();
}



// ---- Combined Quote Builder ----
function renderCombinedQuoteButton() {
  // Remove existing if present
  const existing = document.getElementById('combinedQuoteBtn');
  if (existing) existing.remove();
  
  const quotes = NexusPricing.getCombinedQuotes() || {};
  const count = Object.keys(quotes).length;
  if (count === 0) return;
  
  const btn = document.createElement('div');
  btn.id = 'combinedQuoteBtn';
  btn.className = 'combined-quote-float';
  btn.innerHTML = `
    <button class="btn btn-primary" onclick="showCombinedQuote()" style="display:flex;align-items:center;gap:8px;padding:12px 20px;font-size:var(--text-sm);border-radius:var(--radius-full);box-shadow:0 4px 24px rgba(0,0,0,0.3);">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/></svg>
      Combined Quote (${count} system${count > 1 ? 's' : ''})
    </button>
  `;
  document.body.appendChild(btn);
}

window.showCombinedQuote = function() {
  const quotes = NexusPricing.getCombinedQuotes() || {};
  if (Object.keys(quotes).length === 0) { alert('No quotes generated yet. Complete at least one configurator first.'); return; }
  
  let systemRows = '';
  let grandTotalLow = 0, grandTotalHigh = 0;
  
  for (const [key, q] of Object.entries(quotes)) {
    grandTotalLow += q.rangeLow;
    grandTotalHigh += q.rangeHigh;
    systemRows += `<tr>
      <td><strong>${q.type}</strong>${q.platform ? '<br><span style="font-size:var(--text-xs);color:var(--color-text-muted);">' + q.platform + '</span>' : ''}</td>
      <td>${q.facility || '—'}</td>
      <td style="text-align:right;">${fmtWhole(q.rangeLow)} — ${fmtWhole(q.rangeHigh)}</td>
    </tr>`;
  }
  
  // SLA add-on row
  let slaHtml = '';
  const beds = quotes.nurseCall ? quotes.nurseCall.beds : (quotes.network ? 25 : 0);
  if (beds > 0) {
    slaHtml = `<div style="margin-top:var(--space-4);">
      <h3 style="margin-bottom:var(--space-2);">Add Managed Service Plan</h3>
      <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;">
        <button class="btn btn-secondary btn-sm combined-sla-btn" data-tier="none" onclick="setCombinedSLA('none')">No SLA</button>
        <button class="btn btn-secondary btn-sm combined-sla-btn" data-tier="bronze" onclick="setCombinedSLA('bronze')">Bronze — ${fmtWhole(SLA_PACKAGES.bronze.perBedMonth * beds)}/mo</button>
        <button class="btn btn-secondary btn-sm combined-sla-btn" data-tier="silver" onclick="setCombinedSLA('silver')">Silver — ${fmtWhole(SLA_PACKAGES.silver.perBedMonth * beds)}/mo</button>
        <button class="btn btn-secondary btn-sm combined-sla-btn" data-tier="gold" onclick="setCombinedSLA('gold')">Gold — ${fmtWhole(SLA_PACKAGES.gold.perBedMonth * beds)}/mo</button>
      </div>
      <div id="combinedSLADetail" style="margin-top:var(--space-2);font-size:var(--text-xs);color:var(--color-text-muted);"></div>
    </div>`;
  }
  
  const modal = document.createElement('div');
  modal.id = 'combinedQuoteModal';
  modal.className = 'combined-modal-overlay';
  modal.innerHTML = `
    <div class="combined-modal">
      <div class="combined-modal-header">
        <h2>Combined System Quote</h2>
        <button onclick="document.getElementById('combinedQuoteModal').remove();" style="background:none;border:none;color:var(--color-text);font-size:24px;cursor:pointer;">&times;</button>
      </div>
      <div class="combined-modal-body">
        <table class="competitor-table" style="margin-bottom:var(--space-4);">
          <thead><tr><th>System</th><th>Details</th><th style="text-align:right;">Estimated Range</th></tr></thead>
          <tbody>${systemRows}</tbody>
          <tfoot><tr style="font-weight:700;font-size:var(--text-lg);"><td colspan="2">Combined Total</td><td style="text-align:right;" id="combinedGrandTotal">${fmtWhole(grandTotalLow)} — ${fmtWhole(grandTotalHigh)}</td></tr></tfoot>
        </table>
        ${slaHtml}
        <div style="margin-top:var(--space-4);display:flex;gap:var(--space-2);flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="emailCombinedQuote()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Request Combined Proposal
          </button>
          <button class="btn btn-secondary" onclick="document.getElementById('combinedQuoteModal').remove();">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

window.setCombinedSLA = function(tier) {
  document.querySelectorAll('.combined-sla-btn').forEach(b => b.classList.remove('btn-primary'));
  document.querySelectorAll('.combined-sla-btn').forEach(b => b.classList.add('btn-secondary'));
  const activeBtn = document.querySelector(`.combined-sla-btn[data-tier="${tier}"]`);
  if (activeBtn) { activeBtn.classList.remove('btn-secondary'); activeBtn.classList.add('btn-primary'); }
  
  const detail = document.getElementById('combinedSLADetail');
  const totalEl = document.getElementById('combinedGrandTotal');
  const quotes = NexusPricing.getCombinedQuotes() || {};
  let grandTotalLow = 0, grandTotalHigh = 0;
  for (const q of Object.values(quotes)) { grandTotalLow += q.rangeLow; grandTotalHigh += q.rangeHigh; }
  
  if (tier === 'none' || !SLA_PACKAGES[tier]) {
    if (detail) detail.textContent = '';
    if (totalEl) totalEl.textContent = fmtWhole(grandTotalLow) + ' — ' + fmtWhole(grandTotalHigh);
    return;
  }
  
  const beds = quotes.nurseCall ? quotes.nurseCall.beds : 25;
  const pkg = SLA_PACKAGES[tier];
  const annualSLA = pkg.perBedMonth * beds * 12;
  if (detail) detail.textContent = `${pkg.name} plan: $${pkg.perBedMonth}/bed/mo × ${beds} beds = ${fmtWhole(annualSLA)}/year — includes: ${pkg.features.slice(0,3).join(', ')}...`;
  if (totalEl) totalEl.innerHTML = fmtWhole(grandTotalLow) + ' — ' + fmtWhole(grandTotalHigh) + `<br><span style="font-size:var(--text-sm);color:${pkg.color};">+ ${pkg.name} SLA: ${fmtWhole(pkg.perBedMonth * beds)}/mo</span>`;
};

window.emailCombinedQuote = function() {
  const quotes = NexusPricing.getCombinedQuotes() || {};
  let body = 'Combined System Quote Request:\n\n';
  for (const q of Object.values(quotes)) {
    body += `${q.type} (${q.platform || ''})\n  Estimated: ${fmtWhole(q.rangeLow)} — ${fmtWhole(q.rangeHigh)}\n\n`;
  }
  body += '\nPlease contact me to discuss a combined proposal.\n';
  window.open('mailto:jmazza@nexusct.com?subject=Combined System Quote Request&body=' + encodeURIComponent(body), '_blank');
};

// ---- Start Over ----
window.startOver = function() {
  answers = {};
  answers.roomConfigs = [];
  answers.nurseStations = [];
  currentStep = 0;
  selectedIntegrations = [];
  window._btnGroupValues = {};
  window._consoleValues = {};
  document.getElementById('quoteView').style.display = 'none';
  document.getElementById('quoteView').innerHTML = '';
  document.getElementById('chatView').style.display = 'flex';
  document.getElementById('progressWrap').style.display = 'block';
  chatMessages.innerHTML = '';
  updateProgress(0);
  startConversation();
};


// ---- PDF Generation ----
window.downloadPDF = function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const result = window._quoteResult;
  const a = result.answers;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const rangeLow = Math.round(result.grandTotal * 0.70);
  const rangeHigh = Math.round(result.grandTotal * 1.30);
  const refNo = `NC-${Date.now().toString(36).toUpperCase()}`;

  function addFooter() {
    doc.setFontSize(7);
    doc.setTextColor(130, 130, 130);
    doc.text('NexusCT | Nexus Communications Technology | (847) 796-5585 | info@nxsct.com | Schaumburg, IL', pw / 2, ph - 8, { align: 'center' });
  }

  // PAGE 1: COVER
  doc.setFillColor(26, 26, 46);
  doc.rect(0, 0, pw, 50, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('NexusCT', 14, 22);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Nexus Communications Technology', 14, 32);
  doc.text('(847) 796-5585  |  info@nxsct.com  |  Schaumburg, IL', 14, 40);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SYSTEM ESTIMATE', pw - 14, 22, { align: 'right' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(today, pw - 14, 32, { align: 'right' });
  doc.text(`Ref #${refNo}`, pw - 14, 40, { align: 'right' });

  let yPos = 65;
  if (result.facilityImage) {
    try { doc.addImage(result.facilityImage, 'JPEG', 14, yPos, pw - 28, 60); yPos += 68; } catch (e) {}
  }

  if (a.leadName || a.leadFacility) {
    doc.setTextColor(0, 86, 179);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Prepared For', 14, yPos); yPos += 8;
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    if (a.leadFacility) { doc.setFont('helvetica', 'bold'); doc.text(a.leadFacility, 14, yPos); yPos += 6; }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    if (a.leadName) { doc.text(a.leadName, 14, yPos); yPos += 5; }
    if (a.leadEmail) { doc.text(a.leadEmail, 14, yPos); yPos += 5; }
    if (a.leadPhone) { doc.text(a.leadPhone, 14, yPos); yPos += 5; }
    yPos += 5;
  }

  // Investment range box
  doc.setFillColor(26, 26, 46);
  doc.roundedRect(14, yPos, pw - 28, 30, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Estimated Investment Range', 20, yPos + 10);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(74, 222, 128);
  doc.text(`${fmt(rangeLow)}  \u2014  ${fmt(rangeHigh)}`, pw - 20, yPos + 21, { align: 'right' });
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 200);
  doc.text('Including equipment + installation | Final pricing after site survey', 20, yPos + 20);
  addFooter();

  // PAGE 2: Components
  doc.addPage();
  doc.setFillColor(26, 26, 46);
  doc.rect(0, 0, pw, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('NexusCT System Estimate', 14, 12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Ref #${refNo}`, pw - 14, 12, { align: 'right' });

  yPos = 28;
  doc.setTextColor(0, 86, 179);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('System Components', 14, yPos);
  yPos += 3;

  const tableData = [];
  const categories = {};
  result.bom.forEach(item => {
    if (!categories[item.cat]) categories[item.cat] = [];
    categories[item.cat].push(item);
  });
  for (const [cat, items] of Object.entries(categories)) {
    tableData.push([{ content: cat, colSpan: 2, styles: { fontStyle: 'bold', fillColor: [227, 239, 252], textColor: [0, 86, 179], fontSize: 8 } }]);
    items.forEach(item => { tableData.push([item.name, String(item.qty)]); });
  }

  doc.autoTable({
    startY: yPos,
    head: [['Component', 'Qty']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [0, 86, 179], textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    columnStyles: { 0: { cellWidth: 140 }, 1: { halign: 'center', cellWidth: 25 } },
    margin: { left: 14, right: 14 },
    didDrawPage: function() { addFooter(); }
  });

  // PAGE 3: Financing + NCaaS
  doc.addPage();
  doc.setFillColor(26, 26, 46);
  doc.rect(0, 0, pw, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('NexusCT System Estimate', 14, 12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Ref #${refNo}`, pw - 14, 12, { align: 'right' });

  yPos = 28;
  doc.setTextColor(0, 86, 179);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Financing Options', 14, yPos);
  yPos += 7;
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Flexible financing at ${(result.financing.apr * 100).toFixed(1)}% APR.`, 14, yPos);
  yPos += 4;

  const finTableData = result.financing.terms.map(t => {
    const low = Math.round(t.monthly * 0.70);
    const high = Math.round(t.monthly * 1.30);
    const label = t.months === 36 ? '3-Year (36 mo)' : t.months === 48 ? '4-Year (48 mo)' : '5-Year (60 mo)';
    return [label, `${fmtWhole(low)} \u2014 ${fmtWhole(high)} /mo`];
  });

  doc.autoTable({
    startY: yPos,
    head: [['Term', 'Estimated Monthly Payment']],
    body: finTableData,
    theme: 'striped',
    headStyles: { fillColor: [0, 86, 179], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 14, right: 14 },
  });

  yPos = doc.lastAutoTable.finalY + 12;

  // NCaaS
  const nc = result.ncaas;
  const ncMonthLow = Math.round(nc.monthly * 0.70);
  const ncMonthHigh = Math.round(nc.monthly * 1.30);
  const ncBedLow = (nc.perBed * 0.70).toFixed(2);
  const ncBedHigh = (nc.perBed * 1.30).toFixed(2);

  doc.setTextColor(0, 86, 179);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Nurse Call as a Service (NCaaS)', 14, yPos);
  yPos += 8;

  doc.setFillColor(240, 247, 255);
  doc.roundedRect(14, yPos, pw - 28, 40, 3, 3, 'F');
  doc.setDrawColor(0, 86, 179);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, yPos, pw - 28, 40, 3, 3, 'S');

  doc.setTextColor(0, 86, 179);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`${fmtWhole(ncMonthLow)} \u2014 ${fmtWhole(ncMonthHigh)} /month`, pw / 2, yPos + 14, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  doc.text(`$${ncBedLow} \u2014 $${ncBedHigh} per bed/month  |  ${nc.termMonths}-month agreement`, pw / 2, yPos + 22, { align: 'center' });
  doc.setFontSize(8);
  doc.text('Includes: ' + nc.includes.join('  |  '), 20, yPos + 32, { maxWidth: pw - 40 });

  addFooter();

  // Save PDF
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `NexusCT_Estimate_${a.beds}beds_${new Date().toISOString().slice(0,10)}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};


// ---- Save Quote to Backend ----
async function saveQuote(result) {
  try {
    await fetch(`${CGI_BIN}/api.py/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        facility_name: result.answers.leadFacility || (result.answers.facilityTypeLabel + ' \u2014 ' + result.answers.beds + ' beds'),
        facility_type: result.answers.facilityType,
        beds: result.answers.beds,
        platform: result.answers.platformLabel,
        total_price: result.grandTotal,
        equipment_total: result.equipSellTotal,
        installation_total: result.installCost,
        margin_total: result.marginTotal,
        components: result.bom.map(b => ({ pn: b.pn, name: b.name, qty: b.qty, sell: b.lineSell })),
        answers: result.answers,
        lead_name: result.answers.leadName || '',
        lead_email: result.answers.leadEmail || '',
        lead_phone: result.answers.leadPhone || '',
        lead_facility: result.answers.leadFacility || '',
        lead_notes: result.answers.leadNotes || '',
      }),
    });
  } catch (e) {
    console.warn('Could not save quote:', e);
  }
}

// ---- Admin View ----
async function showAdmin() {
  document.getElementById('chatView').style.display = 'none';
  document.getElementById('progressWrap').style.display = 'none';
  const av = document.getElementById('adminView');
  av.style.display = 'block';
  av.innerHTML = `
    <div class="admin-login">
      <h2>Admin Access</h2>
      <p style="color:var(--color-text-muted);font-size:var(--text-sm);margin-bottom:var(--space-4);">Enter the admin password to view saved quotes.</p>
      <input type="password" id="adminPwd" placeholder="Password">
      <button class="btn btn-primary" style="width:100%;" onclick="adminLogin()">Sign In</button>
      <button class="btn btn-secondary" style="width:100%;margin-top:var(--space-2);" onclick="window.location.hash='';window.location.reload();">Back to Designer</button>
    </div>
  `;
}

window.adminLogin = async function() {
  const pwd = document.getElementById('adminPwd').value;
  if (!pwd) return;
  const av = document.getElementById('adminView');
  try {
    const res = await fetch(`${CGI_BIN}/api.py/admin?password=${encodeURIComponent(pwd)}`);
    if (!res.ok) {
      av.innerHTML = `<div class="admin-login"><h2>Access Denied</h2><p style="color:var(--color-error);">Invalid password.</p><button class="btn btn-secondary" style="margin-top:var(--space-4);" onclick="showAdmin()">Try Again</button></div>`;
      return;
    }
    const quotes = await res.json();
    renderAdminQuotes(quotes);
  } catch (e) {
    av.innerHTML = `<div class="admin-login"><h2>Error</h2><p style="color:var(--color-error);">Could not connect to server.</p><button class="btn btn-secondary" style="margin-top:var(--space-4);" onclick="showAdmin()">Try Again</button></div>`;
  }
};

function renderAdminQuotes(quotes) {
  const av = document.getElementById('adminView');
  if (quotes.length === 0) {
    av.innerHTML = `<h1>Saved Quotes</h1><p style="color:var(--color-text-muted);">No quotes have been generated yet.</p><button class="btn btn-secondary" style="margin-top:var(--space-4);" onclick="window.location.hash='';window.location.reload();">Back to Designer</button>`;
    return;
  }
  let html = `<h1>Saved Quotes (${quotes.length})</h1>
    <button class="btn btn-secondary" style="margin-bottom:var(--space-4);" onclick="window.location.hash='';window.location.reload();">Back to Designer</button>
    <div class="admin-quotes-list">`;
  quotes.forEach(q => {
    const date = new Date(q.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const hasLead = q.lead_name || q.lead_email || q.lead_phone;
    const leadHtml = hasLead ? `<div class="admin-lead-info">
      <strong style="color:var(--color-primary);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.05em;">Lead Contact</strong>
      <div style="margin-top:var(--space-1);font-size:var(--text-sm);line-height:1.6;">
        ${q.lead_name ? `<div><strong>Name:</strong> ${q.lead_name}</div>` : ''}
        ${q.lead_email ? `<div><strong>Email:</strong> <a href="mailto:${q.lead_email}" style="color:var(--color-primary);">${q.lead_email}</a></div>` : ''}
        ${q.lead_phone ? `<div><strong>Phone:</strong> <a href="tel:${q.lead_phone}" style="color:var(--color-primary);">${q.lead_phone}</a></div>` : ''}
        ${q.lead_facility ? `<div><strong>Facility:</strong> ${q.lead_facility}</div>` : ''}
        ${q.lead_notes ? `<div><strong>Notes:</strong> ${q.lead_notes}</div>` : ''}
      </div>
    </div>` : '';
    html += `<div class="admin-quote-card">
      <h3>${q.facility_name}</h3>
      ${leadHtml}
      <div class="meta">
        <span>Platform: ${q.platform || 'N/A'}</span>
        <span>Beds: ${q.beds}</span>
        <span>Type: ${q.facility_type}</span>
        <span>Date: ${date}</span>
      </div>
      <div class="total">${fmt(q.total_price)}</div>
    </div>`;
  });
  html += '</div>';
  av.innerHTML = html;
}

// ---- Hash routing ----
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#admin') showAdmin();
});

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (document.activeElement?.id === 'bedInput') window.submitBeds();
      if (document.activeElement?.id === 'adminPwd') window.adminLogin();
      const leadFields = ['leadName', 'leadEmail', 'leadPhone', 'leadFacility'];
      if (leadFields.includes(document.activeElement?.id)) window.submitLeadForm();
    }
  });
  startConversation();
});


// ---- Combined Quote Integration (shared module) ----
// On page load, check for existing combined quotes
document.addEventListener("DOMContentLoaded", function() {
  NexusPricing.getCombinedQuotes();
  NexusPricing.renderCombinedQuoteButton();
});