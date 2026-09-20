export const pathways = [
  {
    slug: "questions",
    number: "01",
    title: "I have questions",
    description: "Make sense of symptoms, terms, and what a first conversation can cover.",
    href: "/care/questions",
  },
  {
    slug: "diagnosed",
    number: "02",
    title: "I've just been diagnosed",
    description: "Slow the moment down. Understand what a diagnosis is — and what it is not yet.",
    href: "/care/diagnosed",
  },
  {
    slug: "preparing",
    number: "03",
    title: "I'm preparing for treatment",
    description: "Know what appointments, tests, and decisions often look like before treatment starts.",
    href: "/care/preparing",
  },
  {
    slug: "treatment",
    number: "04",
    title: "I'm already in treatment",
    description: "Track what may happen next, what to ask, and how to stay oriented between visits.",
    href: "/care/treatment",
  },
  {
    slug: "supporting",
    number: "05",
    title: "I'm supporting someone",
    description: "Find a useful role: questions to ask, what to notice, and how not to guess alone.",
    href: "/care/supporting",
  },
  {
    slug: "specialist",
    number: "06",
    title: "I need a specialist",
    description: "See which clinicians are typically involved, then find people who fit the need.",
    href: "/specialists",
  },
  {
    slug: "report",
    number: "07",
    title: "I have a report I don't understand",
    description: "Turn pathology language into plain language, with questions to take to your doctor.",
    href: "/reports",
  },
] as const;

export const careSteps = [
  {
    id: "understand",
    title: "Understand",
    body: "Start with the cancer type, the words in your notes, and the questions that feel too small to ask.",
  },
  {
    id: "review",
    title: "Review",
    body: "Reports, scans, and staging language become clearer when each term can be opened, not memorized.",
  },
  {
    id: "find-care",
    title: "Find Care",
    body: "Specialists, settings, and second conversations — matched to the cancer, not a generic directory.",
  },
  {
    id: "plan",
    title: "Plan",
    body: "Appointments, questions, and next steps sit in one place so the week ahead feels holdable.",
  },
  {
    id: "treatment",
    title: "Treatment",
    body: "What may be considered depends on biology, stage, goals, and the people on your care team.",
  },
  {
    id: "follow-up",
    title: "Follow-up",
    body: "Recovery, monitoring, and living between visits — still part of care, not an afterthought.",
  },
] as const;

export const cancerTypes = [
  { slug: "breast", name: "Breast cancer", category: "Breast", summary: "Cancers that begin in breast tissue. Evaluation often includes mammography, ultrasound, core needle biopsy, and ER/PR/HER2 receptor testing." },
  { slug: "lung", name: "Lung cancer", category: "Lung", summary: "Cancers of the lung, grouped into Non-Small Cell (NSCLC) and Small Cell (SCLC). Molecular profiling (EGFR, ALK) guides modern therapy." },
  { slug: "colorectal", name: "Colorectal cancer", category: "Colorectal", summary: "Cancers of the colon or rectum. Screening via colonoscopy and pathology help describe depth of invasion and lymph node involvement." },
  { slug: "prostate", name: "Prostate cancer", category: "Prostate", summary: "Cancer of the prostate gland, graded using the Gleason score. Options range from active surveillance to surgery or radiotherapy." },
  { slug: "cervical", name: "Cervical cancer", category: "Cervical", summary: "Cancer of the uterine cervix, strongly associated with persistent high-risk HPV types. Screening with Pap smear & HPV testing saves lives." },
  { slug: "ovarian", name: "Ovarian cancer", category: "Ovarian", summary: "Cancers originating in or near the ovaries or fallopian tubes. CA-125 marker testing and surgical staging form the foundation of evaluation." },
  { slug: "head-neck", name: "Head & neck cancers", category: "Head & Neck", summary: "Cancers of the oral cavity, larynx, and pharynx. Multidisciplinary care preserves speech, swallowing, and quality of life." },
  { slug: "blood", name: "Blood cancers", category: "Blood Cancers", summary: "Hematologic malignancies affecting blood, bone marrow, and lymphatic nodes. Includes acute & chronic leukemias and plasma cell disorders." },
  { slug: "lymphoma", name: "Lymphoma", category: "Lymphoma", summary: "Cancers of the lymphatic system, divided into Hodgkin and Non-Hodgkin Lymphomas. Excisional biopsy and PET CT establish diagnosis." },
  { slug: "leukemia", name: "Leukemia", category: "Leukemia", summary: "Cancers of blood-forming tissue in bone marrow. Categorized as myeloid or lymphoid, acute or chronic, guiding targeted therapies." },
  { slug: "brain-cns", name: "Brain & CNS tumors", category: "Brain & CNS", summary: "Primary and metastatic tumors of the brain and spinal cord. Neurological preservation and molecular testing (IDH, MGMT) drive management." },
  { slug: "liver", name: "Liver cancer", category: "Liver", summary: "Hepatocellular carcinoma and intrahepatic cholangiocarcinoma. Multidisciplinary evaluation addresses liver function and tumor burden." },
  { slug: "pancreatic", name: "Pancreatic cancer", category: "Pancreatic", summary: "Pancreatic ductal adenocarcinoma. Early staging via high-resolution CT/MRI determines surgical resection potential." },
  { slug: "kidney", name: "Kidney cancer", category: "Kidney", summary: "Renal cell carcinoma (RCC). Often discovered incidentally on imaging; nephron-sparing surgery or ablation may be considered." },
  { slug: "bladder", name: "Bladder cancer", category: "Bladder", summary: "Urothelial carcinomas of the urinary bladder. Cystoscopy and TURBT define muscle invasion status and treatment path." },
  { slug: "skin", name: "Skin cancers", category: "Skin", summary: "Melanoma and non-melanoma skin malignancies (BCC/SCC). Breslow thickness and sentinel node biopsy dictate staging in melanoma." },
] as const;

export const cancerCategories = [
  "All",
  "Breast",
  "Lung",
  "Colorectal",
  "Prostate",
  "Cervical",
  "Ovarian",
  "Head & Neck",
  "Blood Cancers",
  "Lymphoma",
  "Leukemia",
  "Brain & CNS",
  "Liver",
  "Pancreatic",
  "Kidney",
  "Bladder",
  "Skin",
] as const;

export const indianCities = [
  "All Cities",
  "Bengaluru",
  "Mumbai",
  "New Delhi",
  "Chennai",
  "Hyderabad",
  "Pune",
] as const;

export const specialists = [
  {
    id: "sp-01",
    name: "Dr. Ananya Rao",
    role: "Medical Oncology",
    degree: "MBBS, MD (General Medicine), DM (Medical Oncology - AIIMS)",
    experience: "16+ years experience",
    hospital: "Manipal Hospital, Old Airport Road",
    city: "Bengaluru",
    focus: "Breast Cancers, Immunotherapy, Precision Medicine",
    languages: ["English", "Kannada", "Hindi"],
    consultationFee: "₹1,200",
    rating: "4.9 (140+ consultations)",
    bio: "Senior Consultant in Medical Oncology with expertise in targeted cancer therapies, genomic-guided medicine, and comprehensive breast cancer care.",
    note: "Demo clinician profile for ONCO-AID platform preview. Fictional dataset.",
  },
  {
    id: "sp-02",
    name: "Dr. Suresh Gowda",
    role: "Surgical Oncology",
    degree: "MS (General Surgery), MCh (Surgical Oncology - Tata Memorial)",
    experience: "20+ years experience",
    hospital: "HCG Cancer Centre, Kalinga Rao Road",
    city: "Bengaluru",
    focus: "Gastrointestinal, Colorectal & Hepato-Pancreato-Biliary Surgery",
    languages: ["English", "Kannada", "Telugu"],
    consultationFee: "₹1,500",
    rating: "4.9 (210+ consultations)",
    bio: "Pioneer in minimally invasive and robotic surgical oncology for gastrointestinal malignancies with over two decades of clinical leadership.",
    note: "Demo clinician profile for ONCO-AID platform preview. Fictional dataset.",
  },
  {
    id: "sp-03",
    name: "Dr. Vikram Nanjappa",
    role: "Radiation Oncology",
    degree: "MBBS, MD (Radiation Oncology), Fellowship (IMRT/IGRT - UK)",
    experience: "14+ years experience",
    hospital: "Apollo Proton Cancer Centre",
    city: "Chennai",
    focus: "Head & Neck Cancers, Brain Tumors, CyberKnife & Stereotactic Radiosurgery",
    languages: ["English", "Tamil", "Kannada"],
    consultationFee: "₹1,400",
    rating: "4.8 (95+ consultations)",
    bio: "Specialist in high-precision radiation techniques including CyberKnife, IGRT, and proton therapy for cranial and head & neck tumors.",
    note: "Demo clinician profile for ONCO-AID platform preview. Fictional dataset.",
  },
  {
    id: "sp-04",
    name: "Dr. Priya Krishnan",
    role: "Hematology-Oncology",
    degree: "MD (Pediatrics), DM (Clinical Hematology), FRCPath (UK)",
    experience: "18+ years experience",
    hospital: "Tata Memorial Centre",
    city: "Mumbai",
    focus: "Leukemia, Lymphoma, Bone Marrow & CAR-T Cell Therapy",
    languages: ["English", "Hindi", "Marathi", "Tamil"],
    consultationFee: "₹1,600",
    rating: "5.0 (310+ consultations)",
    bio: "Leading hematologist specializing in stem cell transplantation, cellular therapies, and pediatric/adult blood disorders.",
    note: "Demo clinician profile for ONCO-AID platform preview. Fictional dataset.",
  },
  {
    id: "sp-05",
    name: "Dr. Rajesh Iyer",
    role: "Thoracic Surgical Oncology",
    degree: "MS, MCh (Surgical Oncology), FACS",
    experience: "17+ years experience",
    hospital: "Max Super Speciality Hospital, Saket",
    city: "New Delhi",
    focus: "Lung Cancer, Mediastinal Tumors, VATS & Robotic Thoracic Surgery",
    languages: ["English", "Hindi", "Tamil"],
    consultationFee: "₹1,500",
    rating: "4.9 (180+ consultations)",
    bio: "Renowned thoracic surgeon specializing in video-assisted thoracic surgery (VATS) and lung-sparing cancer procedures.",
    note: "Demo clinician profile for ONCO-AID platform preview. Fictional dataset.",
  },
  {
    id: "sp-06",
    name: "Dr. Sunita Sharma",
    role: "Gynecologic Oncology",
    degree: "MD (OBG), Fellowship in Gynae-Oncology (TMH Mumbai)",
    experience: "15+ years experience",
    hospital: "Fortis Memorial Research Institute",
    city: "New Delhi",
    focus: "Ovarian Cancer, Cervical Cancer Screening, Cytoreductive Surgery & HIPEC",
    languages: ["English", "Hindi", "Punjabi"],
    consultationFee: "₹1,300",
    rating: "4.8 (160+ consultations)",
    bio: "Expert in radical gynecologic surgeries, HIPEC for advanced ovarian malignancies, and cervical cancer prevention programs.",
    note: "Demo clinician profile for ONCO-AID platform preview. Fictional dataset.",
  },
  {
    id: "sp-07",
    name: "Dr. Ramesh Menon",
    role: "Neuro-Oncology",
    degree: "MBBS, MCh (Neurosurgery), Post-Doc Neuro-Oncology",
    experience: "19+ years experience",
    hospital: "KIMS Hospitals, Gachibowli",
    city: "Hyderabad",
    focus: "Gliomas, Skull Base Tumors, Awake Craniotomy & Image-Guided Surgery",
    languages: ["English", "Telugu", "Malayalam", "Hindi"],
    consultationFee: "₹1,500",
    rating: "4.9 (220+ consultations)",
    bio: "Senior neurosurgeon specializing in awake brain tumor surgery, intraoperative MRI guidance, and skull base oncology.",
    note: "Demo clinician profile for ONCO-AID platform preview. Fictional dataset.",
  },
  {
    id: "sp-08",
    name: "Dr. Kavitha Reddy",
    role: "Medical Oncology",
    degree: "MD (General Medicine), DM (Medical Oncology)",
    experience: "12+ years experience",
    hospital: "Yashoda Cancer Institute, Somajiguda",
    city: "Hyderabad",
    focus: "Gastrointestinal Cancers, Lung Cancer, Targeted Therapies",
    languages: ["English", "Telugu", "Hindi"],
    consultationFee: "₹1,100",
    rating: "4.8 (115+ consultations)",
    bio: "Compassionate medical oncologist committed to patient-centered evidence-based chemotherapy, immunotherapy, and palliative protocols.",
    note: "Demo clinician profile for ONCO-AID platform preview. Fictional dataset.",
  },
  {
    id: "sp-09",
    name: "Dr. Anand Patil",
    role: "Urologic Oncology",
    degree: "MS, MCh (Urology), Fellowship in Uro-Oncology",
    experience: "15+ years experience",
    hospital: "Sahyadri Super Speciality Hospital",
    city: "Pune",
    focus: "Prostate Cancer, Bladder & Kidney Malignancies, Robotic Prostatectomy",
    languages: ["English", "Marathi", "Hindi"],
    consultationFee: "₹1,250",
    rating: "4.9 (135+ consultations)",
    bio: "Uro-oncologist specializing in nerve-sparing robotic radical prostatectomy and partial nephrectomy for renal tumors.",
    note: "Demo clinician profile for ONCO-AID platform preview. Fictional dataset.",
  },
  {
    id: "sp-10",
    name: "Dr. Meera Kulkarni",
    role: "Palliative & Supportive Oncology",
    degree: "MD (Anaethesia), Diploma in Palliative Medicine (Cardiff, UK)",
    experience: "13+ years experience",
    hospital: "Deenanath Mangeshkar Hospital",
    city: "Pune",
    focus: "Cancer Pain Management, Symptom Control, Holistic Supportive Care",
    languages: ["English", "Marathi", "Hindi"],
    consultationFee: "₹1,000",
    rating: "5.0 (190+ consultations)",
    bio: "Dedicated palliative medicine specialist focusing on pain management, symptom relief, and emotional support throughout treatment.",
    note: "Demo clinician profile for ONCO-AID platform preview. Fictional dataset.",
  },
] as const;

export const specialties = [
  "Medical Oncology",
  "Surgical Oncology",
  "Radiation Oncology",
  "Hematology-Oncology",
  "Gynecologic Oncology",
  "Neuro-Oncology",
  "Urologic Oncology",
  "Palliative & Supportive Oncology",
];

export interface ReportMarker {
  name: string;
  value: string;
  normalRange: string;
  meaning: string;
}

export interface SampleReportItem {
  id: string;
  title: string;
  category: "pathology" | "blood" | "imaging" | "discharge";
  date: string;
  facility: string;
  status: "Decoded" | "Processing" | "Ready";
  excerpt: string;
  executiveSummary: string;
  clinicalImpact: string;
  markers?: ReportMarker[];
}

export const sampleReports: SampleReportItem[] = [
  {
    id: "rep-breast",
    title: "Left Breast Core Biopsy & IHC Markers",
    category: "pathology",
    date: "14 Aug 2026",
    facility: "Manipal Hospital Pathology Lab, Bengaluru",
    status: "Decoded",
    excerpt: "Specimen labeled Left Breast (11 o'clock position). Diagnosis: Invasive Ductal Carcinoma, Grade 2. Estrogen Receptor (ER): Positive (90%), Progesterone Receptor (PR): Positive (80%), HER2: Negative (1+ score). Pathologic T2 N0 M0.",
    executiveSummary: "Your biopsy confirmed an invasive ductal tumor that is hormone receptor positive (ER/PR 90%) and HER2 negative, measuring between 2 to 5 cm with no regional lymph node involvement.",
    clinicalImpact: "Hormone positivity means the tumor is highly sensitive to endocrine therapies. Because HER2 is negative, targeted anti-HER2 infusions are not required.",
    markers: [
      { name: "Histological Grade", value: "Grade 2", normalRange: "Grade 1 (Well) - 3 (Poor)", meaning: "Moderately differentiated cells growing at a controlled moderate pace." },
      { name: "Estrogen Receptor (ER)", value: "Positive (90%)", normalRange: "Negative (<1%)", meaning: "Tumor growth is driven by estrogen hormones; responsive to tamoxifen or aromatase inhibitors." },
      { name: "Progesterone Receptor (PR)", value: "Positive (80%)", normalRange: "Negative (<1%)", meaning: "Further confirmation of hormonal responsiveness and favorable prognosis." },
      { name: "HER2/neu Oncoprotein", value: "Negative (1+ IHC)", normalRange: "Negative (0 or 1+)", meaning: "Does not overexpress HER2; no specialized anti-HER2 antibody therapy indicated." },
      { name: "Pathologic Staging", value: "pT2 N0 M0", normalRange: "Stage 0 - IV", meaning: "Primary lesion 2-5 cm; regional sentinel lymph nodes clear; no distant spread." },
    ],
  },
  {
    id: "rep-blood",
    title: "Complete Blood Count & Baseline Chemistry",
    category: "blood",
    date: "12 Aug 2026",
    facility: "Dr. Lal PathLabs, Bengaluru",
    status: "Decoded",
    excerpt: "Hemoglobin: 13.4 g/dL. Total Leukocyte Count (WBC): 7,200 /uL. Absolute Neutrophil Count (ANC): 4,300 /uL. Platelets: 245,000 /uL. Serum Creatinine: 0.88 mg/dL. SGPT/ALT: 28 U/L.",
    executiveSummary: "All baseline hematological and organ function parameters are within standard clinical limits, establishing safe clearance for systemic therapies or surgical anesthesia.",
    clinicalImpact: "Normal kidney (creatinine) and liver enzymes (SGPT) confirm your organs can safely metabolize oncological medications.",
    markers: [
      { name: "Hemoglobin (Hb)", value: "13.4 g/dL", normalRange: "13.0 - 17.0 g/dL", meaning: "Normal oxygen-carrying capacity; no evidence of anemia." },
      { name: "Absolute Neutrophil Count", value: "4,300 /uL", normalRange: "2,000 - 7,000 /uL", meaning: "Robust first-line immune defense prior to treatment." },
      { name: "Platelet Count", value: "245,000 /uL", normalRange: "150,000 - 450,000 /uL", meaning: "Healthy clotting function for biopsy or surgery." },
      { name: "Serum Creatinine", value: "0.88 mg/dL", normalRange: "0.70 - 1.20 mg/dL", meaning: "Normal kidney filtration, suitable for contrast scans." },
    ],
  },
  {
    id: "rep-imaging",
    title: "Bilateral Contrast Mammogram & Breast USG",
    category: "imaging",
    date: "08 Aug 2026",
    facility: "Apex Diagnostics & Imaging, Bengaluru",
    status: "Decoded",
    excerpt: "Digital breast tomosynthesis reveals an irregular, hyperdense mass with microlobulated margins measuring 2.4 x 1.8 cm at left breast 11 o'clock axis. BI-RADS Category 4C (High suspicion).",
    executiveSummary: "Imaging detected a localized 2.4 cm tissue abnormality in the left breast corresponding to the palpable node, requiring histology confirmation.",
    clinicalImpact: "Confirmed the exact millimeter coordinates used by the radiologist to perform precision core biopsy.",
    markers: [
      { name: "BI-RADS Classification", value: "Category 4C", normalRange: "Category 1-2 (Benign)", meaning: "Suspicious abnormality with >50% probability; mandated needle tissue biopsy." },
      { name: "Lesion Dimensions", value: "2.4 x 1.8 cm", normalRange: "No discrete lesion", meaning: "Localized primary mass without chest wall invasion." },
      { name: "Axillary Lymph Nodes", value: "Normal oval morphology", normalRange: "Normal fatty hilum", meaning: "No enlarged or cortical thickening in armpit lymph nodes." },
    ],
  },
  {
    id: "rep-discharge",
    title: "Core Biopsy Daycare Procedure Summary",
    category: "discharge",
    date: "11 Aug 2026",
    facility: "Manipal Hospital Daycare Surgical Unit",
    status: "Decoded",
    excerpt: "Patient underwent uneventful ultrasound-guided 14-gauge core needle biopsy of left breast mass under 2% lignocaine local anesthesia. 4 core specimens dispatched to histopathology lab.",
    executiveSummary: "Smooth completion of the minor outpatient biopsy procedure without bleeding or immediate complications.",
    clinicalImpact: "Specimens successfully delivered with intact chain-of-custody to NABL histopathology.",
    markers: [
      { name: "Procedure Type", value: "USG-Guided 14G Core Biopsy", normalRange: "Standard Protocol", meaning: "Gold-standard tissue collection preserving cellular architecture." },
      { name: "Specimen Cores Retrieved", value: "4 cores (1.5 cm length)", normalRange: "3-5 cores", meaning: "Adequate volume for standard IHC and reflex molecular testing." },
      { name: "Post-Procedure Status", value: "Hemostasis achieved, ice pack applied", normalRange: "Normal", meaning: "Discharged home safely after 1 hour observation." },
    ],
  },
  {
    id: "rep-lung",
    title: "Sample Lung CT Scan & Biopsy",
    category: "pathology",
    date: "18 Aug 2026",
    facility: "Apex Diagnostics & Imaging, Mumbai",
    status: "Decoded",
    excerpt: "CT Chest: 2.8 cm spiculated right upper lobe nodule without mediastinal lymphadenopathy. Histology: Non-Small Cell Lung Carcinoma (Adenocarcinoma subtype). Molecular panel: EGFR exon 19 deletion detected; ALK & ROS1 negative.",
    executiveSummary: "Non-small cell lung carcinoma with an EGFR exon 19 deletion mutation, making it an ideal candidate for targeted oral kinase inhibitors.",
    clinicalImpact: "Enables first-line oral targeted pills (Osimertinib) with high response rates compared to standard chemotherapy.",
    markers: [
      { name: "Histological Subtype", value: "Adenocarcinoma (NSCLC)", normalRange: "Non-malignant", meaning: "Most common lung cancer subtype originating in peripheral glandular tissue." },
      { name: "EGFR Mutation", value: "Exon 19 Deletion Detected", normalRange: "Wild-type (negative)", meaning: "Activating mutation sensitive to oral targeted therapies." },
      { name: "ALK / ROS1 Fusions", value: "Negative", normalRange: "Negative", meaning: "Alternative targeted kinase fusions are not present." },
    ],
  },
  {
    id: "rep-colon",
    title: "Sample Colonoscopy Pathology Excerpt",
    category: "pathology",
    date: "20 Aug 2026",
    facility: "National Cancer Institute Laboratory, New Delhi",
    status: "Decoded",
    excerpt: "Specimen: Sigmoid colon polyp endoscopic resection. Histology: Adenocarcinoma arising in tubulovillous adenoma. Surgical margins clear (2.5 mm). Lymphovascular invasion: Not identified. Microsatellite Instability (MSI): Stable (MSS).",
    executiveSummary: "Early adenocarcinoma resected cleanly during colonoscopy with negative margins and microsatellite stability.",
    clinicalImpact: "Complete local resection; tumor board will determine whether surveillance or adjuvant therapy is required based on staging scans.",
    markers: [
      { name: "Surgical Margins", value: "Clear (>2 mm)", normalRange: "Clear margins", meaning: "Tumor was completely removed during the endoscopic procedure." },
      { name: "Mismatch Repair / MSI", value: "Microsatellite Stable (MSS)", normalRange: "MSS", meaning: "Normal DNA mismatch repair machinery in tumor cells." },
    ],
  },
];

export const reportTerms = [
  {
    term: "Invasive Ductal Carcinoma",
    category: "Diagnosis",
    explanation:
      "This indicates that cancer started in the milk ducts of the breast and has moved into surrounding breast tissue. 'Invasive' means it has the potential to spread beyond the initial duct, which guides the medical team to evaluate local and regional treatment options.",
    ask: "What is the exact size of the invasive component, and how does this affect whether surgery comes before or after systemic therapy?",
  },
  {
    term: "ER / PR Positive",
    category: "Biomarker",
    explanation:
      "Estrogen Receptor (ER) and Progesterone Receptor (PR) positive means the cancer cells use natural female hormones to grow. This is very common and usually opens up endocrine (hormone) therapy options, which are targeted daily medications.",
    ask: "What percentage of cells tested positive for ER/PR, and what hormonal treatments are typically recommended for this subtype?",
  },
  {
    term: "HER2 Negative (1+)",
    category: "Biomarker",
    explanation:
      "HER2 is a protein receptor on cell surfaces. A score of 1+ or 0 is classified as HER2 Negative, meaning the tumor does not overexpress this specific growth protein. This helps doctors select the exact therapy combination appropriate for your tumor biology.",
    ask: "Does this HER2 result require FISH testing confirmation, or is the 1+ score definitive for treatment planning?",
  },
  {
    term: "pT2 N0 M0",
    category: "Staging",
    explanation:
      "T2 indicates a tumor size between 2 cm and 5 cm. N0 means no cancer cells were detected in nearby lymph nodes examined. M0 means no evidence of distant spread. This combination represents an early to localized stage.",
    ask: "Can you draw out the T and N staging for my understanding, and explain if any further scans are recommended before finalizing treatment?",
  },
  {
    term: "EGFR Exon 19 Deletion",
    category: "Genomic Mutation",
    explanation:
      "A specific change in the EGFR gene found in lung cancer cells. This genetic alteration often makes the tumor highly responsive to oral targeted medications (tyrosine kinase inhibitors) rather than traditional intravenous chemotherapy.",
    ask: "What oral EGFR inhibitor options exist for this mutation, and what are their typical side effects and daily routines?",
  },
  {
    term: "Microsatellite Stable (MSS)",
    category: "Molecular Marker",
    explanation:
      "MSS means the DNA repair machinery inside tumor cells is functioning normally. In colon cancer, knowing MSI status helps oncologists decide whether standard chemotherapy or immunotherapy is most effective.",
    ask: "How does MSS status influence the postoperative chemotherapy regimen for my stage of colon cancer?",
  },
];

export const aiPrompts = [
  "Explain my diagnosis in simple words",
  "Decode pathology report markers (ER, PR, HER2, EGFR)",
  "What questions should I ask my oncologist at my first visit?",
  "How should I prepare for my upcoming chemotherapy session?",
  "What is the difference between radiation therapy and chemotherapy?",
  "How do I seek a second opinion in India?",
  "What support & diet guidelines are safe during treatment?",
];

export const resources = [
  {
    slug: "first-weeks",
    kind: "story" as const,
    featured: true,
    title: "Navigating the First 3 Weeks After a Cancer Diagnosis in India",
    excerpt: "A structured, reassuring guide to handling biopsy reports, multi-specialty consultations, PET scans, and family conversations without feeling overwhelmed.",
    readTime: "6 min read",
    author: "ONCO-AID Editorial Team",
    date: "Aug 2026",
  },
  {
    slug: "questions-to-take",
    kind: "guide" as const,
    featured: false,
    title: "Essential Questions to Ask Your Oncologist Before Starting Treatment",
    excerpt: "A practical appointment preparation checklist covering tumor biology, treatment goals, clinical trials, insurance authorization, and emergency contact procedures.",
    readTime: "4 min read",
    author: "Dr. Ananya Rao & Editorial Team",
    date: "Aug 2026",
  },
  {
    slug: "between-appointments",
    kind: "explainer" as const,
    featured: false,
    title: "Understanding Cancer Health Insurance & Ayushman Bharat Coverage",
    excerpt: "Clarity on cashless pre-authorization, TPA approvals, daycare chemotherapy coverage, and financial navigation in Indian private and government hospitals.",
    readTime: "8 min read",
    author: "ONCO-AID Healthcare Advisory",
    date: "Aug 2026",
  },
  {
    slug: "side-effects-home-care",
    kind: "guide" as const,
    featured: false,
    title: "Managing Chemotherapy Side Effects Safely at Home",
    excerpt: "Evidence-based home management for nausea, fatigue, low blood counts, and when to seek urgent emergency care at your hospital.",
    readTime: "5 min read",
    author: "Dr. Meera Kulkarni",
    date: "Aug 2026",
  },
];
