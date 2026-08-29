/**
 * Domain models for ONCO-AID platform.
 */

export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

export type User = {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

export type Patient = {
  id: string;
  userId: string;
  displayName: string;
};

export type Doctor = {
  id: string;
  userId?: string;
  name: string;
  role: string;
  degree?: string;
  experience?: string;
  hospital: string;
  city: string;
  focus: string;
  languages: string[];
  consultationFee?: string;
  rating?: string;
  bio: string;
  note?: string;
  placeholder?: boolean;
};

export type Admin = {
  id: string;
  userId: string;
};

export type CancerType = {
  slug: string;
  name: string;
  category: string;
  summary: string;
};

export type CancerContent = {
  id: string;
  cancerSlug: string;
  section: string;
  body: string;
  clinicallyReviewed: boolean;
};

export type CarePathway = {
  slug: string;
  title: string;
  description: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  startsAt: string;
  status: "requested" | "confirmed" | "cancelled";
};

export type Hospital = {
  id: string;
  name: string;
  city: string;
  placeholder?: boolean;
};

export type Specialty = {
  id: string;
  name: string;
};

export type Resource = {
  slug: string;
  title: string;
  excerpt: string;
  kind: "story" | "guide" | "explainer";
  readTime?: string;
  author?: string;
  date?: string;
};

export type AIConversation = {
  id: string;
  userId?: string;
  createdAt: string;
};

export type AIMessage = {
  id: string;
  conversationId: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export type Report = {
  id: string;
  title: string;
  date: string;
  facility: string;
  excerpt: string;
};

export type Notification = {
  id: string;
  userId: string;
  body: string;
  read: boolean;
};
