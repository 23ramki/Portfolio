# Portfolio Project Reference

**Owner:** Adithya Ramakrishnan (GitHub: 23ramki)
**Stack:** React 19 + TypeScript 5.9 + Vite 7.3, Framer Motion 12.35, CSS Modules
**Deployed:** Vercel (auto-deploys from `main`)
**Repo:** https://github.com/23ramki/Portfolio

---

## Architecture

- **All content** lives in `src/data/siteData.ts` — single source of truth
- **Theme:** `ThemeContext.tsx` → `localStorage` key `portfolio-theme` → `data-theme` attr on `<html>` → CSS variables swap
- **Contact form:** Web3Forms API (access key in `ContactForm.tsx` line 17)
- **Routing:** `/` (HomePage), `/case-studies/:slug` (CaseStudyPage), `*` → redirect `/`

## Key Components

| Component | Purpose |
|-----------|---------|
| `TiltCard` | Reusable mouse-tracking 3D tilt wrapper (spring physics + dynamic shadow) |
| `AnimatedSection` | Scroll-driven fade-in/fade-out via `useScroll` + `useTransform` |
| `ScrollProgress` | Thin accent bar at viewport top (**created, not yet in App.tsx**) |
| `PageTransition` | Route fade+slide wrapper (**created, not yet in App.tsx**) |
| `Header` | Auto-hide on scroll, animated underlines, mobile drawer (opaque bg), ThemeToggle inside |
| `SplitText` | Word-by-word stagger reveal with `rotateX` (defined in HomePage.tsx) |

## Animation Details

- **Profile photo:** Mouse-tracking 3D tilt (±18°, scale 1.08, spring: stiffness 150/damping 20/mass 0.5), dynamic box-shadow via `useMotionTemplate`
- **Cards (Stat/Skill/CaseStudy/Document):** Wrapped in `TiltCard` with per-card tilt/scale values (spring: stiffness 200/damping 22/mass 0.4)
- **Scroll animations:** Bidirectional fade — opacity maps `[0,0.25,0.75,1]→[0,1,1,0]`, supports `once` prop
- **Photo slideshow:** 5s interval, Ken Burns zoom, `AnimatePresence mode="popLayout"` crossfade
- **Header:** `translateY(-100%)` hide on scroll down, reappear on scroll up
- **Mobile drawer:** Rendered outside `<header>` (avoids `backdrop-filter` containing block bug)

## Pending Work

- Integrate `ScrollProgress` and `PageTransition` into `App.tsx` (wrap routes with `AnimatePresence` + `useLocation` key)
- Polish `CaseStudyPage.tsx` with animations (hero banner, sticky nav, animated sections)

## File Quick Reference

| Task | Edit |
|------|------|
| Update content | `src/data/siteData.ts` |
| Change hero greeting | `src/pages/HomePage.tsx` → `SplitText` lines ~180-184 |
| Change theme colors | `src/global.css` → `:root` / `[data-theme="dark"]` |
| Update resume | Replace `public/assets/Adithya_Ramakrishnan_Resume.pdf` |
| Update photos | `public/assets/photography/`, update `photos` array in `HomePage.tsx` |
| Change contact email | Update Web3Forms access key at web3forms.com |

## Content Decisions

- **Hero greeting:** "I build dashboards that drive revenue. I'm Adithya Ramakrishnan."
- **Stats:** 7 End-to-End Case Studies · 4 Industry Certifications · 200%+ Registration Growth (deliberately distinct from experience bullets)
- **Experience bullets:** Sourced from LinkedIn for consistency; Orange Care trimmed to 3 strongest
- **Beyond Work:** Photography slideshow — left as-is by design

## Git History

| Commit | Description |
|--------|-------------|
| `809e728` | Revamp stats, sharpen experience bullets (LinkedIn-sourced) |
| `cbb2ecf` | Slim portfolio.md to essentials |
| `57aed8a` | 3D tilt hovers, content sharpening, About width fix |
| `1c5b35a` | Animations, header auto-hide, scroll effects, section dividers |
| `ab6cb90` | Favicon, photography slideshow, project docs |
| `8d4811a` | Resume update, Web3Forms contact form |
| `a964900` | Initial portfolio |
