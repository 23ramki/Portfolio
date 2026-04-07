/*
  TYPE DEFINITIONS
  ================
  These interfaces define the "shape" of every data structure in the portfolio.

  KEY CONCEPTS:

  1. `interface` vs `type`:
     - `interface` defines the shape of an object. It's extendable (you can add to it later).
     - `type` creates an alias for any type. It's more flexible (can represent unions, primitives, etc).
     - For object shapes, either works. We use `interface` for objects, `type` for simpler aliases.

  2. The `?` operator:
     - `company?: string` means the field is OPTIONAL — it can be undefined or omitted entirely.
     - Without `?`, the field is REQUIRED — TypeScript will error if you forget it.

  3. `string[]` means "an array of strings". Same as `Array<string>`.
*/

// ─── Site-wide metadata ───────────────────────────────────
export interface SiteMeta {
  name: string
  email: string
  linkedin: string
  // phone omitted — avoid exposing personal contact on a public website
}

// ─── Hero section content ─────────────────────────────────
export interface HeroContent {
  eyebrow: string
  title: string
  summary: string
}

// ─── About section content ────────────────────────────────
export interface AboutContent {
  paragraphs: string[]  // string[] = an array where every item is a string
}

// ─── Stats displayed below hero ───────────────────────────
export interface Stat {
  value: string   // e.g. "3+" or "70+"
  label: string   // e.g. "Years of Experience"
}

// ─── Skill categories ─────────────────────────────────────
export interface Skill {
  title: string
  text: string
  icon: string   // emoji icon for visual differentiation between skill cards
}

// ─── Work experience entries ──────────────────────────────
export interface Experience {
  role: string
  timeline: string
  text: string
  bullets?: string[]  // Optional additional bullet points below the main text
}

// ─── Links to downloadable documents ──────────────────────
export interface DocumentLink {
  label: string
  href: string
  note?: string   // Optional warning or disclaimer shown below the link
}

// ─── Case study projects ──────────────────────────────────
export interface CaseStudy {
  slug: string             // URL-friendly identifier, e.g. "loan-repayment-modeling"
  title: string
  summary: string
  tags: string[]           // e.g. ["R", "Logistic Regression", "PCA"]
  highlight: string        // One-line key result
  problem: string
  approach: string[]       // Array of approach steps
  results: string[]        // Array of result points
  documents: DocumentLink[]  // Nested type! An array of DocumentLink objects
  liveLinks?: DocumentLink[] // Optional external links (Tableau, GitHub, etc.)
  contactSubject: string
}

// ─── Project documents section ────────────────────────────
export interface ProjectDocument {
  title: string
  description: string
  links: DocumentLink[]
}

// ─── Education entries ────────────────────────────────────
export interface EducationEntry {
  name: string          // Degree title
  institution: string   // School name
  timeline: string
  isMasters?: boolean   // true = show with teal accent & expanded detail
  highlights?: string[] // Key achievements / graduate certificates
  coursework?: string[] // Relevant courses to display as pills
}

// ─── Individual certification ─────────────────────────────
export interface Certification {
  name: string           // Certification title
  issuer: string         // Issuing organization
  badgeUrl?: string      // Badge image URL
  verifyUrl?: string     // External credential verification link
  docUrl?: string        // Internal PDF document path
  trailblazerUrl?: string // Salesforce Trailblazer profile link
  validUntil?: string    // Expiry label, e.g. "Jun 2027"
}

// ─── Education + certifications combined ──────────────────
export interface Education {
  studies: EducationEntry[]
  certifications: Certification[]
}
