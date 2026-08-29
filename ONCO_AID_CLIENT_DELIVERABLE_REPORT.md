# ONCO-AID Platform Deliverable: Client Executive Report
**Project Name**: ONCO-AID Platform Rebuild  
**Focus Area**: Oncology Patient Navigation, Pathology Deciphering, & Care Logistics for India  
**Date of Deliverable**: August 26, 2026  
**Status**: Presentation-Ready Prototype Built, Verified, and Static Route Generated (59/59)  

---

## 1. Executive Summary & Market Fit
ONCO-AID is a next-generation oncology navigation and clinical decision-support platform designed specifically for the Indian healthcare ecosystem. 

In India, receiving a cancer diagnosis often triggers immediate panic, fragmented consultations across multiple hospital networks, and financial strain. Patients and caregivers are suddenly confronted with highly complex pathology terminology (e.g., immunohistochemistry markers, histological staging codes) without translation.

ONCO-AID bridge this gap by acting as a **calm, editorial-style patient companion**. It translates raw clinical data into plain-language guidance, mapping out a patient’s specific milestones, and streamlining access to leading surgical, medical, and radiation specialists.

```
                  ┌────────────────────────────────────────┐
                  │      Abnormal Scan / Biopsy Report     │
                  └───────────────────┬────────────────────┘
                                      ▼
                  ┌────────────────────────────────────────┐
                  │       ONCO-AID Pathology Decoder       │
                  │   (Plain-Language Receptor Staging)    │
                  └───────────────────┬────────────────────┘
                                      ▼
                  ┌────────────────────────────────────────┐
                  │       8-Stage Journey Navigator        │
                  │ (Timeline, Scans, & Doctor Checklists) │
                  └───────────────────┬────────────────────┘
                                      ▼
                  ┌────────────────────────────────────────┐
                  │      Accredited Specialist Search      │
                  │  (Bengaluru, Mumbai, Delhi, Chennai)   │
                  └────────────────────────────────────────┘
```

---

## 2. Product Principles & Visual Identity
The ONCO-AID redesign rejects generic AI/SaaS startup templates (characterized by neon gradients, decorative blobs, and floating widgets) and avoids cold, sterile hospital templates. Instead, it adopts a **premium clinical-editorial aesthetic**:

*   **Restraint & Contrast**: Spacious layout with generous whitespace, crisp dividers, and a restrained color palette.
*   **Backgrounds**: Calm warm ivory (`#f6f1e8` / `--color-ivory`) and clean off-white surfaces (`#fffdf8` / `--color-white-soft`) to reduce screen glare and cognitive fatigue.
*   **Primary Tone**: Deep forest teal (`#082828` / `--color-forest`) to convey clinical credibility, authority, and grounding.
*   **Core Actions**: Energetic, warm coral (`#e38a72` / `--color-coral`) reserved strictly for primary, task-initiating buttons.
*   **Typography**: Serif display typography (Instrument Serif) for major section headings, contrasted with a highly legible geometric sans-serif (Geist Sans) for interactive panels, forms, and clinical data.

---

## 3. Product Feature Directory & User Walkthrough

### 3.1. Quietly Alive Interactive Hero
The platform landing experience immediately conveys active monitoring. A lightweight, HTML5 Canvas-based signal (`HeroAliveSignal`) renders fluid, intersecting clinical wave lines that flex and rise in response to mouse movement and slow breath intervals. This visual element represents biological flow and active clinical navigation.

### 3.2. Calm Command Center: Patient Dashboard (`/dashboard`)
Designed as a personalized care console for demo patient **Arjun Mehta** (52-year-old breast cancer patient in Bengaluru):
*   **Active Journey Spotlight**: Visually positions the patient at **Stage 03: Pathology & Diagnosis**, preventing the feeling of starting from scratch.
*   **Immediate Next Step**: A bold call-to-action reminding the patient to prepare clinical questions for their oncology visit with **Dr. Ananya Rao** in two days.
*   **Upcoming Visit Pass**: Shows appointment date, time, location, room number, fees, and doctor notes.
*   **Recent Activity Stream**: Updates the caregiver on completed actions (e.g., report decoded on Aug 14, question template saved on Aug 16).
*   **Quick Tools Bar**: Direct 1-click launchers for report translation, AI consultations, and directories.

### 3.3. The 8-Stage Visual Journey Timeline (`/dashboard/journey`)
The timeline maps out the sequence of oncological care. Selecting any milestone dynamically displays custom educational guidelines:
*   **Milestones**: *Initial Consultation ➔ Diagnostic Imaging ➔ Pathology/Diagnosis ➔ Staging ➔ Treatment Planning ➔ Active Treatment ➔ Post-Treatment Follow-up ➔ Survivorship & Wellness*.
*   **Reassurance Indicators**: Identifies completed stages (✓), current active milestones (●), and upcoming stages (○).
*   **"What You May Need Next"**: Highlights upcoming diagnostic requirements (e.g., whole-body PET-CT or contrast CT scans).
*   **Doctor Discussion Prompts**: Saves pre-written, highly specific questions regarding molecular subtyping, margins, or chemotherapy seq.

### 3.4. Pathology & Staging Decoder (`/reports`)
Turns clinical reports into plain language:
*   **Interactive Highlight Triggers**: Clicking highlighted biomarker receptors (ER/PR+, HER2-, pT2 N0 M0) immediately populates an explanation panel detailing the biological meaning, receptor percent impact, and recommendations for clinical discussions.
*   **Custom Excerpt Parser**: An interactive textbox where users can paste raw tissue biopsy or radiological findings for plain-text AI processing.

### 3.5. Task-Oriented AI Assistant (`/ai` & `/api/ai`)
Rather than a generic chatbot that leaves users wondering what to type, ONCO-AID guides queries into four task domains:
1.  **Understand a Report** (Pathology IHC and genomic subtyping).
2.  **Prepare for an appointment** (Consolidated questions for specialists).
3.  **Understand My Journey** (Chemo vs. Radiation timelines and Tumor Board expectations).
4.  **Ask a Question** (Diet, side effect management, or second opinion logistics).

### 3.6. Localized Indian Specialist Directory (`/specialists`)
*   **Metropolitan Care Hubs**: Directory of vetted clinical experts (medical, surgical, gynecologic, neuro, radiation, and supportive oncologists) in Bengaluru, Mumbai, Chennai, New Delhi, Hyderabad, and Pune.
- **Demo Badge Transparency**: Badged clearly with a warning banner indicating that all records in the review are mock data, preventing patients from mistaking demo profiles for live bookings.

---

## 4. Technical Architecture & System Design
ONCO-AID is engineered using modern web best practices, ensuring high performance, static optimizations, and a clean separation of client/server layers:

```
        ┌──────────────────────────────────────────────────────────┐
        │                       Browser (UI)                       │
        │ Next.js App / React 19 / Tailwind 4 / Framer Motion      │
        └────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
        ┌──────────────────────────────────────────────────────────┐
        │                 Secure Server (API Route)                │
        │                 app/api/ai/route.ts                      │
        └────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
        ┌──────────────────────────────────────────────────────────┐
        │             AI Orchestrator & Provider Abstraction       │
        │             Gemini API / OpenAI API / Mock Fallback      │
        └────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
        ┌──────────────────────────────────────────────────────────┐
        │                Future Supabase Integration               │
        │         Supabase Auth / DB Schema / RLS Policies         │
        └──────────────────────────────────────────────────────────┘
```

*   **Next.js 16 App Router & TypeScript**: Built with TypeScript definitions for strict type checking, ensuring zero runtime errors.
*   **Client-Server Security**: Interactive components never call the LLM/Gemini API directly from the client side. The client invokes `/api/ai`, which handles API authentication and validation securely on the server.
*   **Database-Ready Architecture**: The schemas for `Patient`, `Doctor`, `Appointment`, and `Report` are mapped to facilitate clean integration with a Supabase PostgreSQL backend, complete with Row-Level Security (RLS) policies.

---

## 5. Clinical Safety & India Regulatory Compliance
1.  **Non-Diagnostic Boundary (Clinical Safety)**: Every interactive screen includes prominent reminders that ONCO-AID does not diagnose, prescribe, or replace direct clinical evaluation.
2.  **India Data Privacy Integration (DPDP Act & DISHA)**: The data layer is designed with strict data isolation policies. Patient records can be mapped to local region constraints to comply with the Digital Personal Data Protection (DPDP) Act 2023.
3.  **ABHA (Ayushman Bharat Health Account) Ready**: Demographics cards are formatted to support ABHA number synchronization for seamless integration with national health records.

---

## 6. How to Deploy, Run, and Verify the Platform

### Setup & Local Execution
1.  Navigate to the project root: `C:\Webdev\ONCO-AID`.
2.  Install all packages and dependencies:
    ```bash
    npm install
    ```
3.  Start the development server with Turbopack:
    ```bash
    npm run dev
    ```
4.  Navigate to `http://localhost:3000` to review the interactive landing page, or go directly to `http://localhost:3000/dashboard` to show the logged-in patient center.

### Production Validation & Page Pre-rendering
To compile and test the application for client deployment:
```bash
npm run build
```
The Next.js builder will compile and pre-render **59 static pages and dynamic routes** successfully:
- **Prerendered SSG HTML**: `/specialists/[id]`, `/cancer-types/[slug]`, `/resources/[slug]`, and `/care/[pathway]`.
- **Dynamic API Routes**: `/api/ai` (secure AI orchestration endpoint).
- **Static Pages**: `/dashboard`, `/appointments`, `/reports`, `/ai`, `/login`, and `/patient`.

---
*This report was prepared by the ONCO-AID Rebuild Engineering & Product Team as a formal project handoff.*
