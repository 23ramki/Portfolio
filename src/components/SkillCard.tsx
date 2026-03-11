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
]

interface SkillCardProps {
  skill: Skill
  index?: number
}

const skillItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
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
        <span className={styles.icon}>{skill.icon}</span>
        <h3 className={styles.title}>{skill.title}</h3>
        <p className={styles.text}>{skill.text}</p>
      </motion.article>
    </TiltCard>
  )
}
