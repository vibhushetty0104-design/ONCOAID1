# ONCO-AID Platform Rebuild: Clinical Navigation & Education Report
*Comprehensive Overview of Features, Architecture, Clinical Safety, and Setup Guide*

---

## 📋 Executive Summary
**ONCO-AID** is an oncology clinical navigation, education, and patient-support platform tailored for the Indian healthcare context. Recognizing that cancer care in India is often complex, fragmented, and emotionally overwhelming, the platform acts as a calm, editorial-style "clinical command center." 

By translating clinical jargon (like pathology IHC markers) into plain language, offering a visual 8-stage journey tracker, and providing a localized specialist directory, ONCO-AID empowers patients and caregivers to participate actively in shared decision-making with their oncologists.

---

## ✨ Core Features & Visual Experience

### 1. Interactive Landing Experience
- **Quietly Alive Clinical Signal (`HeroAliveSignal`)**: The hero background features a delicate, flowing medical wave pattern that gently fluctuates with breathing cycles and reacts subtly to mouse cursor coordinates. This reinforces a feeling of care, calm, and active clinical monitoring without flashy 3D graphics or high-energy startup blobs.
- **Editorial Typography**: Focused on high-contrast, premium healthcare editorial type scales. Spacing is optimized to prevent hero headlines from being obscured by the floating header on any mobile, tablet, or desktop screen.

### 2. Patient Dashboard / Command Center (`/dashboard`)
- **Journey Status**: Immediately answers *"Where am I in my care?"* by placing the patient's active milestone prominently at the top.
- **Priority Next Step**: Highlighted action banner prompting the patient to prepare question checklists or review newly decoded report results before their upcoming consultation.
- **Upcoming Consultation Panel**: Displays doctor details, specialty, hospital location, consultation mode, custom clinic preparation notes, and a direct link to prepare for the appointment.
- **Recent Activity Stream**: A chronological log of care events, such as pathology reports decoded, guides saved, or questions formulated.
- **Notifications & Locker**: Houses critical updates (e.g., visit confirmations, completed test reviews) alongside saved guides and checklists.

### 3. Visual 8-Stage Patient Journey Timeline (`/dashboard/journey`)
To reduce ambiguity, care is framed across eight clinical milestones. Users can click any stage to view contextual guidance:
1. **01. Initial Consultation** — Post-symptom clinical evaluation.
2. **02. Diagnostic Tests & Imaging** — Mammography, scans, and core biopsy procedures.
3. **03. Pathology & Diagnosis [Active Demo Stage]** — Biopsy and IHC biomarker evaluation.
4. **04. Staging Evaluation** — Whole-body scans (PET-CT) to rule out metastasis.
5. **05. Treatment Planning & Tumor Board** — Interdisciplinary consensus.
6. **06. Active Treatment** — Surgery, systemic infusions, and precise radiation.
7. **07. Post-Treatment Follow-up** — Surveillance scans and blood normalization.
8. **08. Survivorship & Wellness** — Supportive maintenance, nutrition, and recovery.

### 4. Interactive Pathology Report Decoder (`/reports`)
- **Biomarker Translation**: Clicking highlighted medical terms (like *Invasive Ductal Carcinoma*, *ER/PR Positive*, *HER2 Negative 1+*, *pT2 N0 M0*, or *EGFR mutations*) launches a sidebar breaking down:
  - **What this means** in simple, non-alarmist language.
  - **Clinical significance** (e.g., how receptor positivity guides targeted pill treatments).
  - **Questions for your doctor** (pre-templated questions to clarify margins or neoadjuvant sequence).
- **Custom Report Decoder**: Allows patients to paste raw pathology text blocks for immediate server-side AI translation.

### 5. Task-Oriented AI Assistant (`/ai` & `/api/ai`)
- **Chatbot Fatigue Prevention**: The assistant is organized around specific patient tasks (*Understand a Report*, *Prepare for an Appointment*, *Understand My Journey*, *Ask a Question*) rather than presenting a generic chat input.
- **Pre-loaded Task Chips**: Clickable prompt options speed up common user queries.
- **Clinically Safe Abstraction**: All LLM processing is handled via secure server-side routes (`app/api/ai/route.ts`), keeping API keys fully hidden from the browser.

### 6. Localized Indian Specialist Directory (`/specialists`)
- **Accredited Facilities**: Matches patients with medical, surgical, and radiation oncologists across top Indian cancer centers (Manipal Hospitals, Tata Memorial Centre, Apollo Proton Cancer Centre, Max Super Speciality, Fortis, HCG) in 6 metro hubs: **Bengaluru, Mumbai, Chennai, New Delhi, Hyderabad, and Pune**.
- **Advanced Filtering**: Filters by City, Specialty, search keywords, and tumor/cancer focus.
- **Fictional Demo Transparency**: Clinician profiles are explicitly badged as "Demo Clinician Profiles" to uphold safety and transparency guidelines.

### 7. Progressive Appointment Booking Stepper (`/appointments`)
- Prevents cognitive overload by progressively disclosing choices:
  - *Select Specialty* ➔ *Select City & Doctor* ➔ *Select Mode* (In-person/Video/Review) ➔ *Choose Date & Time Slot* ➔ *Enter Patient Demographics* ➔ *Review Final Pass Summary*.

---

## 🛠️ Architecture & Technology Stack

- **Framework**: Next.js (App Router) + TypeScript.
- **Styling**: Tailwind CSS + custom theme tokens configured in `app/globals.css` (midnight navy, forest green, warm ivory, and restrained coral accents).
- **Animations**: Lightweight Framer Motion (`motion/react`) tuned to soft, cubic-bezier tokens with fallback support for `prefers-reduced-motion`.
- **Database/Auth Ready**: Codebase schemas and routing layers are constructed to easily bind with Supabase Auth, DB, and Storage.

---

## ⚠️ Clinical Safety, Data Privacy & Regulatory Compliance
- **Non-Diagnostic Boundaries**: Prominent safety disclosures are styled across the homepage, dashboard, AI portal, and reports area. The platform repeatedly details that it does not diagnose, prescribe, or substitute real care teams.
- **Regulatory Frameworks**: Built with layouts ready to enforce the Digital Personal Data Protection (DPDP) Act (India) and the Digital Information Security in Healthcare Act (DISHA), protecting patient clinical records with server-side isolation.

---

## 🧑‍💻 How to Run and Build the Platform

### Prerequisites
Ensure you have **Node.js (v18.x or above)** and **npm** installed.

### 1. Installation
In your terminal, navigate to the project directory and install dependencies:
```bash
npm install
```

### 2. Development Server
Run the local development server with Turbopack acceleration:
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser. To jump directly to the patient experience, visit **`http://localhost:3000/dashboard`** or click **Portal** in the header.

### 3. Production Build
Compile and verify all routes for production deployment:
```bash
npm run build
```
This will compile all 59 static and dynamic paths successfully.

---
*Report prepared for the ONCO-AID Platform Review. All patient credentials and clinical milestones are simulated demo records.*
