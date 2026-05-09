import React from 'https://esm.sh/react@19.2.0';
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client';
import htm from 'https://esm.sh/htm@3.1.1';

const html = htm.bind(React.createElement);

const Icon = ({ children, size = 20 }) => html`
  <span className="inline-icon" style=${{ '--icon-size': `${size}px` }} aria-hidden="true">${children}</span>
`;

const icons = {
  Activity: (props) => html`<${Icon} ...${props}>⌁</${Icon}>`,
  AlertTriangle: (props) => html`<${Icon} ...${props}>⚠</${Icon}>`,
  BellRing: (props) => html`<${Icon} ...${props}>◉</${Icon}>`,
  Bot: (props) => html`<${Icon} ...${props}>⚙</${Icon}>`,
  CalendarClock: (props) => html`<${Icon} ...${props}>◷</${Icon}>`,
  CheckCircle2: (props) => html`<${Icon} ...${props}>✓</${Icon}>`,
  ClipboardList: (props) => html`<${Icon} ...${props}>☷</${Icon}>`,
  HeartPulse: (props) => html`<${Icon} ...${props}>♥</${Icon}>`,
  MessageCircle: (props) => html`<${Icon} ...${props}>●</${Icon}>`,
  PhoneCall: (props) => html`<${Icon} ...${props}>☎</${Icon}>`,
  RadioTower: (props) => html`<${Icon} ...${props}>◌</${Icon}>`,
  ShieldCheck: (props) => html`<${Icon} ...${props}>盾</${Icon}>`,
  Stethoscope: (props) => html`<${Icon} ...${props}>⚕</${Icon}>`,
  Users: (props) => html`<${Icon} ...${props}>◍</${Icon}>`,
};

const patients = [
  { id: 'TL-2048', name: 'Somchai P.', age: 68, risk: 'red', ward: 'Home D+3', nihss: 9, bp: '176/98', lineStatus: 'No reply 18h', caregiver: 'Overloaded', followUp: 'Stroke clinic in 2d', tasks: 4 },
  { id: 'TL-2051', name: 'Malee K.', age: 74, risk: 'amber', ward: 'Rehab D+9', nihss: 5, bp: '148/86', lineStatus: 'Symptoms form late', caregiver: 'Needs coaching', followUp: 'Televisit today', tasks: 2 },
  { id: 'TL-2054', name: 'Anan S.', age: 59, risk: 'green', ward: 'Home D+21', nihss: 2, bp: '124/78', lineStatus: 'Checked in', caregiver: 'Stable', followUp: 'Clinic complete', tasks: 0 },
  { id: 'TL-2060', name: 'Rada W.', age: 63, risk: 'amber', ward: 'Discharge D+1', nihss: 4, bp: '152/90', lineStatus: 'Medication question', caregiver: 'Stable', followUp: 'Book CT review', tasks: 3 },
];

const journeySteps = [
  { label: 'Acute stroke unit', status: 'complete', metric: '38 discharged' },
  { label: 'Medication reconciliation', status: 'complete', metric: '96% done' },
  { label: 'LINE OA onboarding', status: 'active', metric: '31 active chats' },
  { label: 'Home monitoring', status: 'active', metric: '12 escalations' },
  { label: 'Stroke clinic follow-up', status: 'pending', metric: '7 due <72h' },
  { label: '90-day continuity', status: 'pending', metric: '84% retained' },
];

const clinicQueue = [
  { patient: 'Malee K.', reason: 'BP trend + dizziness', slot: 'Today 14:30', priority: 'amber' },
  { patient: 'Somchai P.', reason: 'FAST symptom reassessment', slot: 'May 11', priority: 'red' },
  { patient: 'Rada W.', reason: 'CT report review', slot: 'Needs booking', priority: 'amber' },
];

const tasks = [
  'Call red-risk patient with missed LINE OA response',
  'Confirm caregiver can administer anticoagulant safely',
  'Route 2 elevated BP logs to nurse navigator',
  'Sync Google Sheet discharge roster at 18:00',
];

const automationRules = [
  'Apps Script imports discharge rows from Google Sheets every 15 minutes.',
  'Risk rules assign red / amber / green labels from BP, NIHSS, symptoms, and response latency.',
  'LINE OA webhook writes chat events back to the care-transition timeline.',
  'Calendar triggers create clinic follow-up tasks and escalation emails.',
];

function riskClass(risk) {
  return `risk-pill risk-${risk}`;
}

function PanelHeader({ icon, title, subtitle }) {
  return html`
    <header className="panel-header">
      <div className="panel-icon">${icon}</div>
      <div>
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
    </header>
  `;
}

function Kpi({ icon, label, value, detail, tone }) {
  return html`
    <article className=${`kpi panel ${tone}`}>
      <div className="kpi-icon">${icon}</div>
      <div>
        <span>${label}</span>
        <strong>${value}</strong>
        <p>${detail}</p>
      </div>
    </article>
  `;
}

function Metric({ label, value }) {
  return html`
    <div className="metric">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `;
}

function App() {
  const redCount = patients.filter((patient) => patient.risk === 'red').length;
  const amberCount = patients.filter((patient) => patient.risk === 'amber').length;
  const greenCount = patients.filter((patient) => patient.risk === 'green').length;
  const pendingTasks = patients.reduce((sum, patient) => sum + patient.tasks, 0);

  return html`
    <main className="command-center">
      <section className="hero panel">
        <div>
          <p className="eyebrow">STROKE-TL Digital Transitional Care Platform</p>
          <h1>Hospital Command Center</h1>
          <p className="hero-copy">
            Real-time traffic-light surveillance for stroke patients moving from acute care to home,
            clinic, caregiver support, and 90-day readmission prevention.
          </p>
        </div>
        <div className="hero-actions">
          <div className="live-badge"><${icons.RadioTower} size=${16} /> Live LINE OA + Apps Script feed</div>
          <button>Escalation huddle</button>
        </div>
      </section>

      <section className="kpi-grid">
        <${Kpi} icon=${html`<${icons.AlertTriangle} />`} label="Red risk" value=${redCount} tone="red" detail="Immediate nurse navigator review" />
        <${Kpi} icon=${html`<${icons.BellRing} />`} label="Pending tasks" value=${pendingTasks} tone="amber" detail="Across discharge, clinic, LINE OA" />
        <${Kpi} icon=${html`<${icons.MessageCircle} />`} label="LINE OA check-ins" value="31/36" tone="blue" detail="86% response in last 24h" />
        <${Kpi} icon=${html`<${icons.ShieldCheck} />`} label="Readmission watch" value="8" tone="green" detail="Patients under 30-day surveillance" />
      </section>

      <section className="dashboard-grid">
        <div className="panel risk-dashboard span-7">
          <${PanelHeader} icon=${html`<${icons.Activity} />`} title="Traffic-light risk dashboard" subtitle="Prioritized by symptoms, BP, NIHSS, response latency, and caregiver strain" />
          <div className="risk-summary">
            <span className="risk-dot red"></span> Red ${redCount}
            <span className="risk-dot amber"></span> Amber ${amberCount}
            <span className="risk-dot green"></span> Green ${greenCount}
          </div>
          <div className="patient-table">
            ${patients.map((patient) => html`
              <article className="patient-row" key=${patient.id}>
                <div>
                  <strong>${patient.name}</strong>
                  <span>${patient.id} · ${patient.age}y · ${patient.ward}</span>
                </div>
                <span className=${riskClass(patient.risk)}>${patient.risk}</span>
                <span>NIHSS ${patient.nihss}</span>
                <span>${patient.bp}</span>
                <span>${patient.lineStatus}</span>
                <span className="task-chip">${patient.tasks} tasks</span>
              </article>
            `)}
          </div>
        </div>

        <div className="panel span-5">
          <${PanelHeader} icon=${html`<${icons.ClipboardList} />`} title="Pending task alerts" subtitle="Closed-loop worklist for transition coordinators" />
          <ul className="task-list">
            ${tasks.map((task, index) => html`<li key=${task}><span>${index + 1}</span>${task}</li>`)}
          </ul>
        </div>

        <div className="panel span-8">
          <${PanelHeader} icon=${html`<${icons.CalendarClock} />`} title="Patient journey tracking" subtitle="Continuum from discharge readiness through 90-day outcomes" />
          <div className="timeline">
            ${journeySteps.map((step, index) => html`
              <div className=${`timeline-step ${step.status}`} key=${step.label}>
                <div className="timeline-node">${index + 1}</div>
                <h3>${step.label}</h3>
                <p>${step.metric}</p>
              </div>
            `)}
          </div>
        </div>

        <div className="panel span-4 readmission-card">
          <${PanelHeader} icon=${html`<${icons.HeartPulse} />`} title="Readmission surveillance" subtitle="30-day risk signals" />
          <div className="gauge">72<span>%</span></div>
          <p>Prevention bundle completion</p>
          <div className="surveillance-list">
            <span>2 recurrent symptom alerts</span>
            <span>5 uncontrolled BP trends</span>
            <span>1 medication gap</span>
          </div>
        </div>

        <div className="panel span-4">
          <${PanelHeader} icon=${html`<${icons.Stethoscope} />`} title="Stroke clinic follow-up" subtitle="Upcoming reviews and unresolved bookings" />
          <div className="clinic-list">
            ${clinicQueue.map((item) => html`
              <div className="clinic-item" key=${item.patient}>
                <span className=${riskClass(item.priority)}>${item.priority}</span>
                <strong>${item.patient}</strong>
                <p>${item.reason}</p>
                <small>${item.slot}</small>
              </div>
            `)}
          </div>
        </div>

        <div className="panel span-4">
          <${PanelHeader} icon=${html`<${icons.MessageCircle} />`} title="LINE OA monitoring" subtitle="Chatbot check-ins, forms, and escalation flags" />
          <div className="line-grid">
            <${Metric} label="Unread red chats" value="3" />
            <${Metric} label="Late symptom forms" value="5" />
            <${Metric} label="Medication FAQs" value="12" />
            <${Metric} label="Auto-replies sent" value="148" />
          </div>
          <div className="bot-card"><${icons.Bot} size=${18} /> Next broadcast: FAST + BP reminder at 19:00</div>
        </div>

        <div className="panel span-4">
          <${PanelHeader} icon=${html`<${icons.Users} />`} title="Caregiver status" subtitle="Capacity, education, and fatigue indicators" />
          <div className="caregiver-list">
            ${patients.map((patient) => html`
              <div key=${patient.id} className="caregiver-row">
                <span>${patient.name}</span>
                <strong className=${patient.caregiver === 'Overloaded' ? 'danger' : patient.caregiver === 'Needs coaching' ? 'warning' : 'ok'}>${patient.caregiver}</strong>
              </div>
            `)}
          </div>
        </div>

        <div className="panel span-8 automation-panel">
          <${PanelHeader} icon=${html`<${icons.Bot} />`} title="Google Apps Script automation" subtitle="Prototype orchestration layer for Sheets, Calendar, Gmail, and LINE OA webhooks" />
          <div className="automation-grid">
            ${automationRules.map((rule) => html`<div key=${rule} className="automation-rule"><${icons.CheckCircle2} size=${18} />${rule}</div>`)}
          </div>
          <pre>${`function strokeTlRiskTrigger() {
  const rows = SpreadsheetApp.getActive().getSheetByName('DischargeRoster').getDataRange().getValues();
  rows.slice(1).forEach(row => scoreAndEscalate(row));
  CalendarApp.getDefaultCalendar().createAllDayEvent('STROKE-TL follow-up audit', new Date());
}`}</pre>
        </div>

        <div className="panel span-4 contact-panel">
          <${PanelHeader} icon=${html`<${icons.PhoneCall} />`} title="Rapid response lane" subtitle="Command center handoff" />
          <h2>2 patients need same-day outreach</h2>
          <p>Escalate unresolved red flags to stroke nurse navigator, attending neurologist, and caregiver hotline.</p>
          <button>Open escalation script</button>
        </div>
      </section>
    </main>
  `;
}

createRoot(document.getElementById('root')).render(html`<${App} />`);
