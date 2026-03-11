import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { CaseStudy } from '../types/portfolio'
import TiltCard from './TiltCard'
import styles from './CaseStudyCard.module.css'

interface CaseStudyCardProps {
  study: CaseStudy
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <TiltCard tilt={8} hoverScale={1.02}>
      <motion.article
        className={styles.card}
        variants={cardVariants}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <h3 className={styles.title}>{study.title}</h3>
        <p className={styles.summary}>{study.summary}</p>
        <p className={styles.tags}>{study.tags.join(' \u2022 ')}</p>
        <p className={styles.highlight}>{study.highlight}</p>
        <Link className={styles.link} to={`/case-studies/${study.slug}`}>
          View Case Study →
        </Link>
      </motion.article>
    </TiltCard>
  )
}
