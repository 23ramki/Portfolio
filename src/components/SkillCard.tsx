import { motion } from 'framer-motion'
import type { Skill } from '../types/portfolio'
import type { CSSProperties } from 'react'
import TiltCard from './TiltCard'
import styles from './SkillCard.module.css'

const ACCENTS = [
  '#006d77', // teal — Analytics
  '#e2954d', // orange — CRM
  '#4a90d9', // blue — Technical
  '#9b8fc4', // purple — Pre-Sales
  '#2cb67d', // green — ML
  '#c8ff00', // lime — GenAI
]

interface SkillCardProps {
  skill: Skill
  index?: number
}

const skillItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

function SkillIcon({ title }: { title: string }) {
  const s = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (title) {
    case 'Analytics & BI':
      return (
        <svg {...s}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      )
    case 'CRM & Revenue Systems':
      return (
        <svg {...s}>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
          <line x1="12" y1="7" x2="5.5" y2="17.2" />
          <line x1="12" y1="7" x2="18.5" y2="17.2" />
          <line x1="7" y1="19" x2="17" y2="19" />
        </svg>
      )
    case 'Technical Foundations':
      return (
        <svg {...s}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    case 'Pre-Sales & Commercial':
      return (
        <svg {...s}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'ML & Data Science':
      return (
        <svg {...s}>
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'GenAI':
      return (
        <svg {...s}>
          <path d="M12 3l1.8 5.5L19 10.5l-5.2 2-1.8 5.5-1.8-5.5L5 10.5l5.2-2z" />
          <path d="M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8z" />
        </svg>
      )
    default:
      return (
        <svg {...s}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )
  }
}

export default function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const accent = ACCENTS[index % ACCENTS.length]

  return (
    <TiltCard tilt={10} hoverScale={1.03}>
      <motion.article
        className={styles.card}
        style={{ '--skill-accent': accent } as CSSProperties}
        variants={skillItemVariants}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <span className={styles.icon}>
          <SkillIcon title={skill.title} />
        </span>
        <h3 className={styles.title}>{skill.title}</h3>
        <p className={styles.text}>{skill.text}</p>
      </motion.article>
    </TiltCard>
  )
}
