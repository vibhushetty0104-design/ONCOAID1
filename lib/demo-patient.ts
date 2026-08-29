/**
 * Realistic Demo Patient Data for ONCO-AID Platform Presentation.
 * Fictional dataset for clinical navigation evaluation.
 */

export type JourneyStageStatus = "completed" | "current" | "upcoming";

export interface JourneyStage {
  id: string;
  number: string;
  title: string;
  status: JourneyStageStatus;
  dateCompleted?: string;
  description: string;
  nextSteps: string[];
  questionsForDoctor: string[];
  keyDocuments: string[];
}

export const demoPatient = {
  id: "pat-001",
  name: "Arjun Mehta",
  age: 52,
  gender: "Male",
  city: "Bengaluru",
  state: "Karnataka",
  bloodGroup: "B+",
  diagnosisSummary: "Invasive Ductal Carcinoma (Left Breast tissue biopsy, Grade 2)",
  currentStageId: "03",
  currentStageTitle: "Pathology & Diagnosis",
  primaryHospital: "Manipal Hospital, Old Airport Road, Bengaluru",
  primaryOncologist: "Dr. Ananya Rao (Medical Oncology)",
  emergencyContact: "Priya Mehta (Spouse) · +91 98450 12345",
  healthId: "ABHA: 91-4521-8890-1234",
};

export const patientJourneyStages: JourneyStage[] = [
  {
    id: "01",
    number: "01",
    title: "Initial Consultation",
    status: "completed",
    dateCompleted: "04 Aug 2026",
    description: "First clinical physical evaluation following noticed lump and local symptom review.",
    nextSteps: ["Completed diagnostic mammogram and ultrasound imaging."],
    questionsForDoctor: ["What initial scans are required before tissue sampling?"],
    keyDocuments: ["Clinical examination summary", "Initial ultrasound notes"],
  },
  {
    id: "02",
    number: "02",
    title: "Diagnostic Tests & Imaging",
    status: "completed",
    dateCompleted: "11 Aug 2026",
    description: "High-resolution bilateral mammogram, ultrasound-guided core needle biopsy, and baseline blood profile.",
    nextSteps: ["Biopsy specimen submitted to NABL accredited histopathology lab."],
    questionsForDoctor: ["How long will immunohistochemistry (IHC) marker results take?"],
    keyDocuments: ["Mammogram DICOM report", "Core needle biopsy procedure note"],
  },
  {
    id: "03",
    number: "03",
    title: "Pathology & Diagnosis",
    status: "current",
    description: "Tissue histopathology confirmed Invasive Ductal Carcinoma Grade 2. ER/PR positive (90%), HER2 1+ negative. pT2 N0 M0.",
    nextSteps: [
      "Review IHC biomarker report with medical oncologist Dr. Ananya Rao on 28 Aug 2026.",
      "Discuss whether neoadjuvant chemotherapy or upfront surgery is optimal.",
      "Check if whole-body PET-CT staging scan is recommended prior to final tumor board.",
    ],
    questionsForDoctor: [
      "Does ER/PR positive (90%) mean hormone therapy will be a core part of my regimen?",
      "Will we do surgery first or systemic treatment first?",
      "Are any further molecular genomic tests (like Oncotype DX or MammaPrint) needed?",
    ],
    keyDocuments: ["Histopathology & IHC Marker Report (Aug 2026)", "Baseline CBC & Metabolic Panel"],
  },
  {
    id: "04",
    number: "04",
    title: "Staging Evaluation",
    status: "upcoming",
    description: "Whole-body PET-CT or contrast CT to evaluate regional lymph nodes and confirm localized staging.",
    nextSteps: ["Schedule contrast staging scan at hospital diagnostic wing."],
    questionsForDoctor: ["What preparations are needed 24 hours before the PET scan?"],
    keyDocuments: [],
  },
  {
    id: "05",
    number: "05",
    title: "Treatment Planning & Tumor Board",
    status: "upcoming",
    description: "Multi-disciplinary tumor board review involving surgical, medical, and radiation oncology specialists.",
    nextSteps: ["Receive unified treatment protocol consensus document."],
    questionsForDoctor: ["What clinical trial or standard-of-care protocols were discussed?"],
    keyDocuments: [],
  },
  {
    id: "06",
    number: "06",
    title: "Active Treatment",
    status: "upcoming",
    description: "Execution of surgical resection, systemic infusions/targeted pills, and/or radiation therapy sessions.",
    nextSteps: ["Chemotherapy daycare orientation and supportive medication protocol."],
    questionsForDoctor: ["Who do I call immediately if fever or severe nausea occurs at home?"],
    keyDocuments: [],
  },
  {
    id: "07",
    number: "07",
    title: "Post-Treatment Follow-up",
    status: "upcoming",
    description: "Post-operative monitoring, blood count normalization, and periodic surveillance scans.",
    nextSteps: ["Establish 3-month clinical monitoring calendar."],
    questionsForDoctor: ["What symptoms should trigger an unscheduled clinic visit?"],
    keyDocuments: [],
  },
  {
    id: "08",
    number: "08",
    title: "Survivorship & Wellness",
    status: "upcoming",
    description: "Long-term endocrine maintenance, rehabilitation, nutritional guidance, and emotional well-being.",
    nextSteps: ["Long-term survivorship care plan."],
    questionsForDoctor: ["What lifestyle and exercise modifications are proven to aid recovery?"],
    keyDocuments: [],
  },
];

export const demoAppointments = [
  {
    id: "apt-101",
    doctorName: "Dr. Ananya Rao",
    specialty: "Medical Oncology",
    hospital: "Manipal Hospital, Old Airport Road",
    city: "Bengaluru",
    date: "28 Aug 2026",
    time: "10:30 AM",
    mode: "In-Person Consultation",
    status: "Confirmed",
    room: "Oncology OPD, Block B, Room 204",
    prepNotes: "Bring original biopsy slides, paraffin block receipt, and insurance TPA card.",
    fee: "₹1,200",
  },
  {
    id: "apt-102",
    doctorName: "Dr. Suresh Gowda",
    specialty: "Surgical Oncology",
    hospital: "HCG Cancer Centre, Kalinga Rao Road",
    city: "Bengaluru",
    date: "14 Aug 2026",
    time: "02:00 PM",
    mode: "In-Person Consultation",
    status: "Completed",
    room: "Surgical OPD Room 12",
    prepNotes: "Initial biopsy wound check and pathology dispatch review.",
    fee: "₹1,500",
  },
];

export const demoSavedReports = [
  {
    id: "rep-01",
    title: "Core Needle Tissue Histopathology & IHC Biomarkers",
    date: "14 Aug 2026",
    facility: "NABL Accredited Central Pathology, Bengaluru",
    summary: "Invasive Ductal Carcinoma Grade 2 · ER+ (90%), PR+ (80%), HER2- (1+) · pT2 N0",
    decoded: true,
  },
  {
    id: "rep-02",
    title: "High-Resolution Bilateral Digital Mammogram",
    date: "08 Aug 2026",
    facility: "Manipal Hospital Imaging Services",
    summary: "2.6 cm spiculated mass at 11 o'clock position left breast · BIRADS 5",
    decoded: true,
  },
];

export const demoSavedResources = [
  {
    slug: "first-weeks",
    title: "Navigating the First 3 Weeks After a Cancer Diagnosis in India",
    readTime: "6 min read",
  },
  {
    slug: "questions-to-take",
    title: "Essential Questions to Ask Your Oncologist Before Starting Treatment",
    readTime: "4 min read",
  },
];

export const demoNotifications = [
  {
    id: "notif-1",
    date: "Today, 09:15 AM",
    title: "Upcoming Visit in 2 Days",
    message: "Consultation with Dr. Ananya Rao at Manipal Hospital on 28 Aug 2026 at 10:30 AM is confirmed.",
    type: "appointment",
    actionHref: "/appointments",
  },
  {
    id: "notif-2",
    date: "Yesterday",
    title: "Pathology Summary Decoded",
    message: "Your ER/PR and HER2 biomarker analysis breakdown is available in your reports locker.",
    type: "report",
    actionHref: "/reports",
  },
];
