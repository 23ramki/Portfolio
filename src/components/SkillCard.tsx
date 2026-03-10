/*
  SKILL CARD — with icon, accent color, and hover animation
  ==========================================================
  KEY CONCEPTS:
  - `index` prop: used to pick a different accent color per card
  - CSS Custom Properties from JS: `style={{ '--skill-accent': color } as React.CSSProperties}`
    We can pass CSS variables as inline styles! TypeScript needs the cast to CSSProperties
    because it doesn't know about custom properties by default.
  - Framer Motion variants: named animation states that the parent can trigger
    (used here for stagger animations from the grid container)
*/

import { motion } from 'framer-motion'
import type { Skill } from '../types/portfolio'
import type { CSSProperties } from 'react'
import styles from './SkillCard.module.css'

// Each skill gets a distinct accent color
const ACCENTS = [
  '#006d77', // teal — Analytics
  '#e2954d', // orange — CRM
  '#4a90d9', // blue — Technical
  '#9b8fc4', // purple — Pre-Sales
  '#2cb67d', // green — ML
]

interface SkillCardProps {
  skill: Skill
  index?: number
}

// Variants let the parent container stagger-animate children
const skillItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const accent = ACCENTS[index % ACCENTS.length]

  return (
    <motion.article
      className={styles.card}
      style={{ '--skill-accent': accent } as CSSProperties}
      variants={skillItemVariants}
      whileHover={{ y: -4, boxShadow: '0 10px 28px rgba(0,0,0,0.15)' }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <span className={styles.icon}>{skill.icon}</span>
      <h3 className={styles.title}>{skill.title}</h3>
      <p className={styles.text}>{skill.text}</p>
    </motion.article>
  )
}
