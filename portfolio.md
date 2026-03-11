# Portfolio Project — Development Log & Reference

**Owner:** Adithya Ramakrishnan
**Repository:** https://github.com/23ramki/Portfolio
**Live Site:** Deployed on Vercel (auto-deploys from `main` branch)
**Created:** March 9, 2026

---

## Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Framework     | React 19 + TypeScript 5.9         |
| Build Tool    | Vite 7.3                          |
| Routing       | React Router DOM 7.13             |
| Animations    | Framer Motion 12.35               |
| Styling       | CSS Modules + CSS Variables       |
| Hosting       | Vercel (auto-deploy from GitHub)  |
| Contact Form  | Web3Forms API                     |

---

## Project Structure

```
Portfolio/
├── src/
│   ├── components/          # Reusable UI components (each with .module.css)
│   │   ├── AnimatedSection    — Scroll-driven fade-in/fade-out wrapper (useScroll + useTransform)
│   │   ├── BackToTop          — Scroll-to-top floating button
│   │   ├── CaseStudyCard      — Case study preview card with 3D tilt hover
│   │   ├── ContactForm        — Web3Forms-powered contact form
│   │   ├── DocumentCard       — Downloadable document card with 3D tilt hover
│   │   ├── Footer             — LinkedIn, Email, Resume links
│   │   ├── Header             — Auto-hide nav bar + mobile drawer + theme toggle + animated underlines
│   │   ├── PageTransition     — Route transition wrapper (fade + slide, for AnimatePresence)
│   │   ├── ScrollProgress     — Thin accent-colored progress bar fixed at top of viewport
│   │   ├── SectionHeading     — Reusable section title with optional subtitle
│   │   ├── SkillCard          — Skill category card with accent colors + 3D tilt hover
│   │   ├── StatCard           — Stat value + label with 3D tilt hover
│   │   ├── ThemeToggle        — Light/dark mode toggle (sun/moon icons), inside Header
│   │   ├── TiltCard           — Reusable mouse-tracking 3D tilt wrapper (spring physics + dynamic shadow)
│   │   └── TimelineItem       — Experience entry with timeline styling
│   ├── context/
│   │   └── ThemeContext.tsx    # Dark/light mode via React Context + localStorage
│   ├── data/
│   │   └── siteData.ts        # ALL portfolio content lives here (single source of truth)
│   ├── pages/
│   │   ├── HomePage.tsx        # Main landing page with all sections
│   │   └── CaseStudyPage.tsx   # Detail page for individual case studies
│   ├── types/
│   │   └── portfolio.ts        # TypeScript interfaces for all data
│   ├── App.tsx                 # Router setup
│   ├── main.tsx                # React entry point + ThemeProvider wrapper
│   └── global.css              # CSS variables, theme definitions, base styles, section-divider
├── public/
│   ├── favicon.svg               # Orange "AR" serif favicon (transparent bg)
│   └── assets/
│       ├── Adithya_Ramakrishnan_Resume.pdf
│       ├── profile-photo.jpg
│       ├── photography/           # 6 compressed photos for slideshow (~450KB total)
│       │   ├── photo-1.jpg through photo-6.jpg
│       ├── BA_with_R_Project_Final.pdf
│       ├── BA_with_R_Project_PPT.pptx
│       ├── AppML_Project_Group2.pdf
│       ├── route_score_prediction.ipynb
│       ├── BUAN6335_HBR_John_Deere_Group2.pdf
│       ├── Disneys_Strategic_Goals_ML_Use_Cases.pdf
│       ├── DoorDash_Delivering_Convenience.pdf
│       ├── Doordash_Presentation.pdf
│       └── InsurCare_Database_Foundation.docx
├── index.html                  # HTML entry, loads Sora + Source Serif 4 fonts, favicon link
├── vite.config.ts              # Vite config with React plugin
├── package.json
└── tsconfig.app.json           # Strict TS: ES2022 target, react-jsx
```

---

## Routing

| Path                     | Page            | Behavior                                    |
|--------------------------|-----------------|---------------------------------------------|
| `/`                      | HomePage        | Main portfolio with all sections            |
| `/case-studies/:slug`    | CaseStudyPage   | Detail view; looks up slug in siteData      |
| `*` (anything else)      | —               | Redirects to `/`                            |

Header and Footer render on every page (outside `<Routes>`).

---

## Key Architectural Patterns

### Content Management
All portfolio content is centralized in `src/data/siteData.ts`. To update text, stats, experiences, case studies, or links — edit that single file. No content is hardcoded in components.

### Theme System (Dark/Light Mode)
- `ThemeContext.tsx` manages theme state
- Persists choice to `localStorage` (key: `portfolio-theme`)
- Falls back to OS preference (`prefers-color-scheme`)
- Sets `data-theme` attribute on `<html>` — CSS variables swap automatically
- `global.css` defines `:root` (light) and `[data-theme="dark"]` variable overrides

### Styling
- Each component has a scoped `.module.css` file
- Global theme colors use CSS variables (`--bg-grad`, `--surface`, `--text`, `--primary`, etc.)
- No CSS-in-JS library — pure CSS Modules

### Animations (Updated March 11, 2026)

#### Header
- **Auto-hide on scroll**: Header slides up (`translateY(-100%)`) when scrolling down, reappears on scroll up
- **Animated nav underlines**: `::after` pseudo-element with `scaleX(0→1)` on hover, cubic-bezier easing
- **Mobile drawer**: Opaque backgrounds (`#f4f1eb` light / `#0e1a22` dark), rendered outside `<header>` to avoid `backdrop-filter` containing block issue

#### Scroll Animations
- `AnimatedSection` uses `useScroll` + `useTransform` for scroll-driven fade-in/fade-out
  - Bidirectional: content fades out when scrolled past, fades in when scrolled to
  - Supports `once` prop for fade-in only (no fade-out)
  - Opacity maps: `[0, 0.25, 0.75, 1] → [0, 1, 1, 0]`
- Section dividers (`<hr className="section-divider">`) between every major section

#### Hero Section
- **Word-by-word stagger text reveal**: `SplitText` component with `rotateX` perspective transform
- **3D tilt profile photo**: Mouse-tracking via `useMotionValue` + `useSpring`
  - Tilts up to ±18° following cursor position
  - Scales to 1.08 on hover
  - Dynamic box-shadow shifts opposite to tilt direction (via `useMotionTemplate`)
  - Spring physics: `stiffness: 150, damping: 20, mass: 0.5`
  - Teal radial glow behind photo
- **Entrance animation**: `AnimatePresence` + `entered` state with fade-in

#### Card Hover Effects
- **`TiltCard` wrapper component** (reusable): Mouse-tracking 3D tilt with spring physics + dynamic shadow
  - Used by: `StatCard` (tilt 10°, scale 1.05), `SkillCard` (tilt 10°, scale 1.03), `CaseStudyCard` (tilt 8°, scale 1.02), `DocumentCard` (tilt 10°, scale 1.03)
  - Spring config: `stiffness: 200, damping: 22, mass: 0.4`
  - Shadow shifts opposite to tilt, blur increases from 12→28px on hover

#### Photography Slideshow
- Ken Burns effect (slow zoom `scale: [1, 1.05]` over 5s during display)
- `AnimatePresence mode="popLayout"` for overlapping crossfade transitions
- 5-second auto-advance interval

#### Other
- `ScrollProgress` component: thin accent bar at top of viewport (created, not yet integrated into App.tsx)
- `PageTransition` component: route transition wrapper with fade + slide (created, not yet integrated into App.tsx)
- Stagger animations for grid layouts (`staggerChildren: 0.1`)

---

## Favicon

**Added:** March 10, 2026
**File:** `public/favicon.svg`
- Orange (`#e2954d`) bold serif "AR" on transparent background
- Georgia font, SVG format for crisp rendering at any size
- Referenced in `index.html` via `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`

---

## "Beyond Work" Photography Section

**Added:** March 10, 2026
**Unsplash profile:** https://unsplash.com/@theadithyar

- Auto-rotating slideshow (6 photos, 5-second interval)
- Left/right navigation arrows + dot indicators
- Ken Burns zoom + crossfade transitions (`AnimatePresence mode="popLayout"`)
- Photos stored in `public/assets/photography/` (resized to 800px wide, ~450KB total)
- "View more on Unsplash" link to full profile
- Located between Education and Contact sections on HomePage

### To update photos:
1. Resize new photos to 800px wide (use `sips --resampleWidth 800`)
2. Save as `photo-N.jpg` in `public/assets/photography/`
3. Update the `photos` array in `HomePage.tsx` if count changes

---

## Contact Form — Web3Forms Integration

**Changed on:** March 10, 2026
**Previous implementation:** `mailto:` link — opened visitor's email client, required them to click Send again
**New implementation:** Web3Forms API — form submits instantly via `fetch()`, no redirect

### How it works
1. Visitor fills out Name, Email, Company (optional), Message
2. On submit, form data is POSTed to `https://api.web3forms.com/submit`
3. Web3Forms delivers the message to `adithyaramakrishnan2309@gmail.com`
4. Visitor sees a success message; form clears
5. If network fails, an error message is shown

### Configuration
- Access key is stored in `ContactForm.tsx` line 17
- Web3Forms dashboard: https://web3forms.com
- Free tier: unlimited submissions
- To change the receiving email: update the access key at web3forms.com

---

## Deployment Workflow

The site is deployed on Vercel and auto-deploys from the `main` branch.

### To push updates:
```bash
cd "/Users/ramki/Desktop/untitled folder/Portfolio"
git add .
git commit -m "Describe your change"
git push origin main
```

Vercel detects the push and redeploys automatically (~1-2 minutes).

### To update the resume:
1. Replace `public/assets/Adithya_Ramakrishnan_Resume.pdf` with the new file (keep the same filename)
2. Commit and push

### To update portfolio content (text, skills, experiences, case studies):
1. Edit `src/data/siteData.ts`
2. Commit and push

### To add a new case study:
1. Add the entry to the `caseStudies` array in `siteData.ts` (follow existing structure)
2. Add any associated PDFs/documents to `public/assets/`
3. The case study card auto-appears on the homepage, and the detail page route (`/case-studies/<slug>`) works automatically

---

## Git History

| Commit   | Date       | Description                                              |
|----------|------------|----------------------------------------------------------|
| `1c5b35a` | 2026-03-11 | Update portfolio from local MacBook (animations, header, drawer, scroll effects) |
| `ab6cb90` | 2026-03-10 | Add favicon, photography slideshow, and project docs     |
| `8d4811a` | 2026-03-10 | Update resume and switch contact form to Web3Forms       |
| `4da52e8` | 2026-03-09 | Fix compiler issues (ESLint config, Footer, HomePage)    |
| `a964900` | 2026-03-09 | Initial portfolio (all components, pages, styles, assets)|
| `b014cc9` | 2026-03-09 | Initial commit (README.md)                               |

---

## Pending / Not Yet Integrated

- **ScrollProgress**: Component created (`src/components/ScrollProgress.tsx`) but not yet added to `App.tsx`
- **PageTransition**: Component created (`src/components/PageTransition.tsx`) but not yet wrapping routes in `App.tsx` with `AnimatePresence` + `useLocation` key
- **CaseStudyPage polish**: No animations yet — could add entrance animations, animated sections, hero banner, sticky sidebar nav

---

## Common Tasks Quick Reference

| Task                          | What to edit                              |
|-------------------------------|-------------------------------------------|
| Update resume                 | Replace `public/assets/Adithya_Ramakrishnan_Resume.pdf` |
| Change bio/about text         | `src/data/siteData.ts` → `hero`, `about`  |
| Add/edit work experience      | `src/data/siteData.ts` → `experiences`    |
| Add/edit skills               | `src/data/siteData.ts` → `skills`         |
| Add case study                | `src/data/siteData.ts` → `caseStudies`    |
| Change contact email          | Update Web3Forms access key + `siteData.ts` → `siteMeta.email` |
| Change profile photo          | Replace `public/assets/profile-photo.jpg` |
| Change favicon                | Edit `public/favicon.svg` |
| Update photography slideshow  | Replace/add images in `public/assets/photography/`, update `photos` array in `HomePage.tsx` |
| Modify theme colors           | `src/global.css` → `:root` and `[data-theme="dark"]` |
| Add a new page                | Create in `src/pages/`, add route in `App.tsx` |
| Change hero greeting text     | `HomePage.tsx` → `SplitText text="..."` lines (~180-181) |

---

## Dev Server

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```
