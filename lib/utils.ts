export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const site = {
  name: "ONCO—AID",
  namePlain: "ONCO-AID",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://onco-aid.example",
  description:
    "ONCO-AID helps you understand your cancer journey, prepare for care, find the right specialists, and know what comes next. Educational guidance — not a replacement for your care team.",
};

export const navLinks = [
  { href: "/care", label: "Care Pathways" },
  { href: "/cancer-types", label: "Cancer Types" },
  { href: "/reports", label: "Reports" },
  { href: "/specialists", label: "Specialists" },
  { href: "/resources", label: "Journal" },
] as const;
