// =====================================================
// NexusCT Shared Lead Capture Gate v1.0
// Gates all pricing calculations across configurators
// Uses NexusStorage for cross-page persistence (safe fallback)
// =====================================================

const NexusLeadCapture = (() => {
  'use strict';

  let _isOpen = false;
  let _leadData = null;

  const STORAGE_KEY = 'nexus_lead';

  // ---- Check if lead already captured ----
  function checkGate() {
    const stored = NexusStorage.session.getItem(STORAGE_KEY);
    if (stored) {
      try {
        _leadData = JSON.parse(stored);
        _isOpen = true;
        return true;
      } catch (e) {
        NexusStorage.session.removeItem(STORAGE_KEY);
      }
    }
    return false;
  }

  function getLeadData() {
    if (!_leadData) checkGate();
    return _leadData;
  }

  function isGateOpen() {
    if (!_isOpen) checkGate();
    return _isOpen;
  }

  // ---- Show lead capture modal ----
  // Returns Promise<leadData|null>
  function showGate(context = 'general') {
    return new Promise((resolve, reject) => {
      // If already captured, resolve immediately
      if (checkGate()) {
        resolve(_leadData);
        return;
      }

      const contextMessages = {
        'nurse-call': 'To generate your personalized nurse call system estimate, please provide your contact information.',
        'uaas': 'To view your custom UniFi as a Service pricing, please provide your contact information.',
        'combined': 'To view your combined system quote, please provide your contact information.',
        'general': 'To access detailed pricing and estimates, please provide your contact information.'
      };

      const overlay = document.createElement('div');
      overlay.id = 'nexusLeadGate';
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);animation:leadFadeIn 0.3s ease;';

      overlay.innerHTML = `
        <style>
          @keyframes leadFadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes leadSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .lead-gate-card {
            background: #fff;
            border-radius: 16px;
            padding: 36px;
            max-width: 520px;
            width: 100%;
            box-shadow: 0 25px 60px rgba(0,0,0,0.3);
            animation: leadSlideUp 0.4s ease;
            font-family: 'Inter', -apple-system, sans-serif;
          }
          .lead-gate-card h2 {
            font-family: 'Manrope', 'Inter', sans-serif;
            font-size: 22px;
            font-weight: 700;
            color: #1a1a2e;
            margin: 0 0 8px 0;
          }
          .lead-gate-card .lead-subtitle {
            font-size: 14px;
            color: #718096;
            margin-bottom: 24px;
            line-height: 1.5;
          }
          .lead-gate-field {
            margin-bottom: 16px;
          }
          .lead-gate-field label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 6px;
          }
          .lead-gate-field label .req {
            color: #ef4444;
            margin-left: 2px;
          }
          .lead-gate-field input,
          .lead-gate-field textarea {
            width: 100%;
            padding: 10px 14px;
            border: 1.5px solid #e2e8f0;
            border-radius: 8px;
            font-size: 14px;
            font-family: 'Inter', sans-serif;
            color: #1a1a2e;
            background: #f8f9fc;
            transition: border-color 0.2s, box-shadow 0.2s;
            outline: none;
            box-sizing: border-box;
          }
          .lead-gate-field input:focus,
          .lead-gate-field textarea:focus {
            border-color: #0066B3;
            box-shadow: 0 0 0 3px rgba(0,102,179,0.1);
            background: #fff;
          }
          .lead-gate-field input.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
          }
          .lead-gate-error {
            color: #ef4444;
            font-size: 12px;
            margin-top: 4px;
            display: none;
          }
          .lead-gate-submit {
            width: 100%;
            padding: 14px;
            background: #0066B3;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            transition: background 0.2s;
            margin-top: 8px;
          }
          .lead-gate-submit:hover {
            background: #004f8c;
          }
          .lead-gate-privacy {
            font-size: 11px;
            color: #a0aec0;
            text-align: center;
            margin-top: 12px;
            line-height: 1.5;
          }
          .lead-gate-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          @media (max-width: 480px) {
            .lead-gate-card { padding: 24px; }
            .lead-gate-row { grid-template-columns: 1fr; }
          }
        </style>
        <div class="lead-gate-card">
          <h2>Almost There</h2>
          <p class="lead-subtitle">${contextMessages[context] || contextMessages.general}</p>
          <div class="lead-gate-field">
            <label>Full Name <span class="req">*</span></label>
            <input type="text" id="lgName" placeholder="John Smith" autocomplete="name">
          </div>
          <div class="lead-gate-row">
            <div class="lead-gate-field">
              <label>Email <span class="req">*</span></label>
              <input type="email" id="lgEmail" placeholder="john@facility.com" autocomplete="email">
            </div>
            <div class="lead-gate-field">
              <label>Phone <span class="req">*</span></label>
              <input type="tel" id="lgPhone" placeholder="(555) 123-4567" autocomplete="tel">
            </div>
          </div>
          <div class="lead-gate-field">
            <label>Facility Name <span class="req">*</span></label>
            <input type="text" id="lgFacility" placeholder="e.g., Sunrise Senior Living">
          </div>
          <div class="lead-gate-field">
            <label>Additional Notes <span style="color:#a0aec0;font-weight:400;">(optional)</span></label>
            <textarea id="lgNotes" rows="2" placeholder="Timeline, special requirements, etc." style="resize:vertical;"></textarea>
          </div>
          <div id="lgError" class="lead-gate-error"></div>
          <button class="lead-gate-submit" id="lgSubmit">
            Generate My Estimate
          </button>
          <p class="lead-gate-privacy">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px;margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Your information is kept confidential and used only to prepare your estimate.
          </p>
        </div>
      `;

      document.body.appendChild(overlay);

      // Focus first field
      setTimeout(() => document.getElementById('lgName')?.focus(), 100);

      // Submit handler
      document.getElementById('lgSubmit').addEventListener('click', () => {
        const name = document.getElementById('lgName').value.trim();
        const email = document.getElementById('lgEmail').value.trim();
        const phone = document.getElementById('lgPhone').value.trim();
        const facility = document.getElementById('lgFacility').value.trim();
        const notes = document.getElementById('lgNotes').value.trim();
        const errEl = document.getElementById('lgError');

        // Reset errors
        document.querySelectorAll('.lead-gate-field input').forEach(i => i.classList.remove('error'));
        errEl.style.display = 'none';

        // Validate
        const errors = [];
        if (!name) { errors.push('name'); document.getElementById('lgName').classList.add('error'); }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errors.push('email'); document.getElementById('lgEmail').classList.add('error'); }
        if (!phone) { errors.push('phone'); document.getElementById('lgPhone').classList.add('error'); }
        if (!facility) { errors.push('facility'); document.getElementById('lgFacility').classList.add('error'); }

        if (errors.length > 0) {
          errEl.textContent = 'Please fill in all required fields.';
          errEl.style.display = 'block';
          return;
        }

        // Store
        _leadData = { name, email, phone, facility, notes, timestamp: new Date().toISOString(), context };
        _isOpen = true;
        NexusStorage.session.setItem(STORAGE_KEY, JSON.stringify(_leadData));

        // Also store in local storage for admin panel access
        const allLeads = JSON.parse(NexusStorage.local.getItem('nexus_leads') || '[]');
        allLeads.push(_leadData);
        NexusStorage.local.setItem('nexus_leads', JSON.stringify(allLeads));

        // Animate out
        overlay.style.animation = 'leadFadeIn 0.2s ease reverse';
        setTimeout(() => {
          overlay.remove();
          resolve(_leadData);
        }, 200);
      });

      // Close on overlay click (not card)
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.style.animation = 'leadFadeIn 0.2s ease reverse';
          setTimeout(() => {
            overlay.remove();
            resolve(null);
          }, 200);
        }
      });

      // Enter key to submit
      overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
          document.getElementById('lgSubmit').click();
        }
      });
    });
  }

  // ---- Gate a callback ----
  // If lead exists, run immediately; otherwise show gate first
  async function gate(callback, context = 'general') {
    if (checkGate()) {
      callback(_leadData);
    } else {
      const data = await showGate(context);
      if (data) callback(data);
    }
  }

  // ---- Inline form version (for nurse call chat flow) ----
  // Returns HTML string for embedding in chat messages
  function getInlineFormHtml() {
    return `
      <div class="lead-form" style="max-width:480px;">
        <div class="lead-field" style="margin-bottom:12px;">
          <label style="display:block;font-size:13px;font-weight:600;color:var(--text-dark,#1a1a2e);margin-bottom:4px;">Full Name <span style="color:#ef4444;">*</span></label>
          <input type="text" id="leadName" placeholder="John Smith" autocomplete="name" style="width:100%;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
          <div class="lead-field">
            <label style="display:block;font-size:13px;font-weight:600;color:var(--text-dark,#1a1a2e);margin-bottom:4px;">Email <span style="color:#ef4444;">*</span></label>
            <input type="email" id="leadEmail" placeholder="john@facility.com" autocomplete="email" style="width:100%;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;">
          </div>
          <div class="lead-field">
            <label style="display:block;font-size:13px;font-weight:600;color:var(--text-dark,#1a1a2e);margin-bottom:4px;">Phone <span style="color:#ef4444;">*</span></label>
            <input type="tel" id="leadPhone" placeholder="(555) 123-4567" autocomplete="tel" style="width:100%;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;">
          </div>
        </div>
        <div class="lead-field" style="margin-bottom:12px;">
          <label style="display:block;font-size:13px;font-weight:600;color:var(--text-dark,#1a1a2e);margin-bottom:4px;">Facility Name <span style="color:#ef4444;">*</span></label>
          <input type="text" id="leadFacility" placeholder="e.g., Sunrise Senior Living" style="width:100%;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;">
        </div>
        <div class="lead-field" style="margin-bottom:12px;">
          <label style="display:block;font-size:13px;font-weight:600;color:var(--text-dark,#1a1a2e);margin-bottom:4px;">Notes <span style="color:#a0aec0;font-weight:400;">(optional)</span></label>
          <textarea id="leadNotes" rows="2" placeholder="Timeline, special requirements, etc." style="width:100%;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;resize:vertical;"></textarea>
        </div>
        <div id="leadError" style="color:#ef4444;font-size:12px;margin-bottom:8px;display:none;"></div>
        <button class="btn btn-primary lead-submit" onclick="submitLeadForm()" style="width:100%;padding:14px;background:#0066B3;color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;">
          Generate My Estimate
        </button>
        <div style="font-size:11px;color:#a0aec0;text-align:center;margin-top:8px;">
          Your information is kept confidential and used only to prepare your estimate.
        </div>
      </div>
    `;
  }

  // ---- Clear lead data (for testing) ----
  function clear() {
    _leadData = null;
    _isOpen = false;
    NexusStorage.session.removeItem(STORAGE_KEY);
  }

  // ---- Public API ----
  return {
    checkGate,
    getLeadData,
    isGateOpen,
    showGate,
    gate,
    getInlineFormHtml,
    clear,
  };
})();

// Make available globally
if (typeof window !== 'undefined') window.NexusLeadCapture = NexusLeadCapture;
