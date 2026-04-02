# Portfolio Redesign — Inspired by landonorris.com

## Overview

Lando Norris's website is a premium, high-energy, performance-driven design built around **bold typography, a striking lime-on-dark color palette, and cinematic scroll-based animations**. This document captures the key design ideas to adapt for your portfolio, blending Norris's visual intensity with your existing React + Framer Motion stack.

---

## 1. Color Palette Overhaul

### Current State
- Apple-inspired monochrome: `#fbfbfd` / `#000000` backgrounds, `#0071e3` blue accent.
- Clean but safe. Doesn't command attention.

### Norris Inspiration
| Role | Light Mode | Dark Mode (Default) | Notes |
|------|-----------|---------------------|-------|
| Background | `#f5f5f5` (off-white) | `#0a0f0a` (near-black green) | Slight green tint in dark bg gives depth |
| Surface | `#ffffff` | `#141a14` | Subtle warm-dark card surfaces |
| Primary Accent | `#c8ff00` (lime/neon green) | `#c8ff00` | The signature color — electric, impossible to ignore |
| Text | `#1a1a1a` | `#f0f0f0` | High contrast against both modes |
| Muted Text | `#6b6b6b` | `#8a8a8a` | Softer supporting text |
| Borders | `#e0e0e0` | `#2a2f2a` | Green-tinted borders in dark mode |
| Selection | black on lime | lime on black | Context-aware text selection colors |

### Recommended Approach
- **Default to dark mode** — it's where the palette shines hardest.
- Use the lime accent sparingly but boldly: on CTAs, hover states, section dividers, and the scroll progress bar.
- Keep one secondary accent (a muted teal or cool grey) for less prominent interactive elements.
- Apply the **green-tinted dark background** (`#0a0f0a` instead of pure `#000000`) for a richer, less flat feel.

### CSS Variable Updates
```css
:root {
  --bg: #f5f5f5;
  --surface: #ffffff;
  --text: #1a1a1a;
  --muted: #6b6b6b;
  --line: #e0e0e0;
  --primary: #c8ff00;        /* Lime accent */
  --primary-strong: #d4ff33;
  --accent: #c8ff00;
  --glow-primary: rgba(200, 255, 0, 0.15);
  --glow-accent: rgba(200, 255, 0, 0.08);
}

[data-theme="dark"] {
  --bg: #0a0f0a;
  --surface: #141a14;
  --text: #f0f0f0;
  --muted: #8a8a8a;
  --line: #2a2f2a;
  --primary: #c8ff00;
  --primary-strong: #d4ff33;
  --accent: #c8ff00;
  --glow-primary: rgba(200, 255, 0, 0.12);
  --glow-accent: rgba(200, 255, 0, 0.06);
  --header-bg: rgba(10, 15, 10, 0.85);
  --shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

/* Context-aware selection */
::selection {
  background: var(--primary);
  color: var(--bg);
}
```

---

## 2. Typography

### Current State
- Inter font, tight letter-spacing (`-0.022em`), clean and readable.

### Norris Inspiration
- **Impact font (Brier)** for headlines — ultra-bold, condensed, commanding.
- **Variable-weight body font (Mona)** with fluid sizing using `clamp()`.
- Line-height as low as `0.83` on hero text — letters practically touching for visual density.
- Negative letter-spacing up to `-0.19rem` on large text.

### Recommended Approach
Keep Inter for body text (it's excellent), but add a **display font** for hero headlines and section headings to create typographic contrast.

**Suggested display fonts (free):**
- **Space Grotesk** — geometric, modern, tight. Available on Google Fonts.
- **Syne** — bold, slightly quirky, great for personality.
- **Unbounded** — futuristic, wide, premium feel.
- **Outfit** — clean variable-weight, works at extremes.

```css
:root {
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;

  /* Fluid type scale */
  --text-hero: clamp(3rem, 8vw, 6rem);
  --text-h1: clamp(2rem, 5vw, 3.5rem);
  --text-h2: clamp(1.5rem, 3vw, 2.25rem);
  --text-body: clamp(0.95rem, 1.2vw, 1.1rem);
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.04em;
}
```

---

## 3. Animations & Transitions

### What Norris Does Differently
Norris's site uses **cinematic, scroll-driven choreography** rather than simple fade-ins. Key techniques:

### 3a. Split-Text Reveal (Hero)
Characters animate in one-by-one with rotation and vertical offset.

```tsx
// Enhance your existing hero word animation
const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.06,
      ease: [0.65, 0.05, 0, 1],  // Norris's custom easing
    },
  }),
};
```

### 3b. Clip-Path Reveals
Instead of simple opacity fades, elements reveal through expanding clip-paths — like a spotlight opening.

```css
/* Circular reveal on scroll */
.reveal-element {
  clip-path: ellipse(0% 0% at 50% 50%);
  transition: clip-path 0.8s cubic-bezier(0.65, 0.05, 0, 1);
}

.reveal-element.visible {
  clip-path: ellipse(100% 100% at 50% 50%);
}
```

```tsx
// Framer Motion version for scroll-triggered reveal
<motion.div
  initial={{ clipPath: "ellipse(0% 0% at 50% 50%)" }}
  whileInView={{ clipPath: "ellipse(100% 100% at 50% 50%)" }}
  transition={{ duration: 0.9, ease: [0.65, 0.05, 0, 1] }}
  viewport={{ once: true, amount: 0.3 }}
>
```

### 3c. Marquee / Infinite Scroll Text
A horizontally scrolling text band — great for skill tags, tools, or a personal tagline.

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
  gap: 3rem;
}

.marquee-container {
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}
```

### 3d. Smooth Scroll (Lenis)
Replace native scroll with Lenis for buttery, momentum-based scrolling.

```bash
npm install lenis
```

```tsx
// In App.tsx or a layout component
import Lenis from 'lenis';
import { useEffect } from 'react';

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return () => lenis.destroy();
}, []);
```

### 3e. Global Easing Curve
Norris uses a single signature easing throughout: `cubic-bezier(0.65, 0.05, 0, 1)`. This creates a distinctive "fast start, slow finish" feel. Apply consistently to all transitions for cohesion.

```css
:root {
  --ease-out-expo: cubic-bezier(0.65, 0.05, 0, 1);
  --duration-default: 0.75s;
  --duration-fast: 0.3s;
  --duration-slow: 1.2s;
}
```

---

## 4. Layout & Structure Upgrades

### 4a. Full-Bleed Hero
Instead of a contained hero, go edge-to-edge with a full viewport hero.

```css
.hero {
  min-height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  padding: 0;  /* Break out of container */
}
```

### 4b. Horizontal Scroll Section
For case studies or a project gallery — a horizontal scroll section breaks the vertical monotony.

```tsx
// Horizontal scroll section using Framer Motion + useScroll
const targetRef = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({ target: targetRef });
const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

<section ref={targetRef} style={{ height: "300vh" }}>
  <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
    <motion.div style={{ x, display: "flex", gap: "2rem" }}>
      {projects.map(p => <ProjectCard key={p.id} {...p} />)}
    </motion.div>
  </div>
</section>
```

### 4c. Section Dividers
Replace empty space between sections with visual dividers — a thin lime line, a marquee band, or an SVG wave.

```css
.section-divider {
  width: 60px;
  height: 3px;
  background: var(--primary);
  margin: 0 auto;
  border-radius: 2px;
}
```

---

## 5. Interactive Elements

### 5a. Buttons — Shadow Offset Style
Norris uses text-shadow offsets that shift on hover instead of traditional background fills.

```css
.btn-primary {
  background: var(--primary);
  color: var(--bg);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  border: none;
  border-radius: 0;            /* Sharp edges — bold, intentional */
  cursor: pointer;
  position: relative;
  transition: transform var(--duration-fast) var(--ease-out-expo),
              box-shadow var(--duration-fast) var(--ease-out-expo);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px var(--glow-primary);
}

.btn-primary:active {
  transform: translateY(0);
}
```

### 5b. Card Hover — Clip-Path + Scale
Enhance TiltCard with a lime glow border on hover.

```css
.project-card {
  position: relative;
  overflow: hidden;
  transition: transform var(--duration-default) var(--ease-out-expo);
}

.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid var(--primary);
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out-expo);
  pointer-events: none;
  border-radius: inherit;
}

.project-card:hover::before {
  opacity: 1;
}

.project-card:hover {
  transform: scale(1.02);
}
```

### 5c. Navigation — Minimal with Theme Awareness
Norris's nav changes appearance per-section via `data-theme` attributes.

```tsx
// Detect which section is in view and update nav theme
const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark');

// Use IntersectionObserver to detect section changes
// and apply data-theme to the header dynamically
```

---

## 6. Scroll Progress Bar

### Upgrade
Change from blue to lime, add a glow effect.

```css
.scroll-progress {
  background: var(--primary);
  box-shadow: 0 0 10px var(--glow-primary), 0 0 30px var(--glow-accent);
  height: 3px;
}
```

---

## 7. Specific Section Ideas

### 7a. Skills Section — Marquee Strip
Replace the static grid with an auto-scrolling marquee of skill icons/tags, similar to the Norris helmet scroll.

```
[ React ]  [ TypeScript ]  [ Python ]  [ SQL ]  [ Tableau ]  →  (loops)
```

### 7b. Experience Timeline — Animated Draw
Animate the timeline line drawing downward as the user scrolls, with dots pulsing as they enter view.

```css
.timeline-line {
  background: linear-gradient(to bottom, var(--primary), transparent);
  /* Animate height with scroll progress */
}

.timeline-dot {
  background: var(--primary);
  box-shadow: 0 0 0 0 var(--glow-primary);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(200, 255, 0, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(200, 255, 0, 0); }
}
```

### 7c. Case Studies — Full-Width Cards with Image Reveal
Each case study card takes full width with a large image that reveals via clip-path on scroll.

### 7d. Hero — Animated Greeting
Instead of static hero text, cycle through greetings or roles with a typewriter/split-text effect:

```
I'm Adithya.
Data Analyst. Problem Solver. Storyteller.
```

---

## 8. Micro-Interactions

| Element | Current | Upgrade |
|---------|---------|---------|
| Link hover | Underline scale | Lime underline that draws left-to-right + slight lift |
| Theme toggle | Icon swap | Smooth rotation + color morph (sun rays animate) |
| Back to top | Fade + scale | Slide up from below viewport edge + lime ring pulse |
| Stat numbers | Static | Count-up animation on scroll into view |
| Section headings | Fade in | Split-text character reveal with stagger |
| Form inputs | Border focus | Bottom-border-only that glows lime on focus |

---

## 9. Performance Considerations

- **Lenis smooth scroll** can conflict with Framer Motion's `useScroll`. Test integration carefully.
- **Clip-path animations** are GPU-accelerated and performant.
- **Marquee** should use `will-change: transform` for smooth rendering.
- **Reduce motion**: Respect `prefers-reduced-motion` — disable marquee, simplify reveals to fades.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .marquee-track { animation: none; }
}
```

---

## 10. Implementation Priority

| Priority | Change | Impact | Effort |
|----------|--------|--------|--------|
| 1 | Color palette swap (lime + dark green bg) | Huge — instantly transforms the vibe | Low |
| 2 | Display font for headings | High — adds typographic personality | Low |
| 3 | Custom easing curve everywhere | Medium — creates cohesive motion feel | Low |
| 4 | Split-text hero animation | High — dramatic first impression | Medium |
| 5 | Clip-path section reveals | High — cinematic scroll experience | Medium |
| 6 | Lenis smooth scroll | Medium — premium scroll feel | Low |
| 7 | Marquee skills strip | Medium — visual energy | Medium |
| 8 | Horizontal scroll case studies | High — memorable interaction | High |
| 9 | Stat count-up animation | Medium — adds polish | Low |
| 10 | Timeline line draw animation | Medium — storytelling enhancement | Medium |

---

## Summary

The core shift is from **"clean Apple minimalism"** to **"high-contrast, kinetic, premium dark"**. The lime accent on dark green creates instant visual identity. The animation philosophy moves from "things fade in" to "things reveal cinematically." Typography gets bolder and more expressive. The result: a portfolio that feels like it belongs to someone who builds things with energy and precision.
