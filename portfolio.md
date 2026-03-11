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
│   │   ├── AnimatedSection    — Scroll-reveal wrapper (Framer Motion whileInView)
│   │   ├── BackToTop          — Scroll-to-top floating button
│   │   ├── CaseStudyCard      — Case study preview card with tags & hover lift
│   │   ├── ContactForm        — Web3Forms-powered contact form
│   │   ├── DocumentCard       — Downloadable document card
│   │   ├── Footer             — LinkedIn, Email, Resume links
│   │   ├── Header             — Nav bar + mobile hamburger menu + theme toggle
│   │   ├── SectionHeading     — Reusable section title with optional subtitle
│   │   ├── SkillCard          — Skill category card with accent colors
│   │   ├── StatCard           — Stat value + label with hover animation
│   │   ├── ThemeToggle        — Light/dark mode toggle (sun/moon icons)
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
│   └── global.css              # CSS variables, theme definitions, base styles
├── public/assets/              # Static files (PDFs, images) served at /assets/
│   ├── Adithya_Ramakrishnan_Resume.pdf
│   ├── profile-photo.jpg
│   ├── BA_with_R_Project_Final.pdf
│   ├── BA_with_R_Project_PPT.pptx
│   ├── AppML_Project_Group2.pdf
│   ├── route_score_prediction.ipynb
│   ├── BUAN6335_HBR_John_Deere_Group2.pdf
│   ├── Disneys_Strategic_Goals_ML_Use_Cases.pdf
│   ├── DoorDash_Delivering_Convenience.pdf
│   ├── Doordash_Presentation.pdf
│   └── InsurCare_Database_Foundation.docx
├── index.html                  # HTML entry, loads Sora + Source Serif 4 fonts
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

### Animations
- `AnimatedSection` wraps content sections for scroll-reveal (fade + slide up)
- `StatCard`, `SkillCard`, `CaseStudyCard` have Framer Motion hover effects
- HomePage uses stagger animations for grid layouts
- Header mobile drawer uses spring animations

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
| `8d4811a` | 2026-03-10 | Update resume and switch contact form to Web3Forms       |
| `4da52e8` | 2026-03-09 | Fix compiler issues (ESLint config, Footer, HomePage)    |
| `a964900` | 2026-03-09 | Initial portfolio (all components, pages, styles, assets)|
| `b014cc9` | 2026-03-09 | Initial commit (README.md)                               |

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
| Modify theme colors           | `src/global.css` → `:root` and `[data-theme="dark"]` |
| Add a new page                | Create in `src/pages/`, add route in `App.tsx` |

---

## Dev Server

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```
