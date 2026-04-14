import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { CaseStudy } from '../types/portfolio'
import TiltCard from './TiltCard'
import styles from './CaseStudyCard.module.css'

interface CaseStudyCardProps {
  study: CaseStudy
  featured?: boolean
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

// Map primary tag to a band color + gradient pair
const TAG_COLORS: Record<string, [string, string]> = {
  'Python':            ['#2cb67d', '#1a6b4a'],
  'SQL':               ['#4a90d9', '#2a5fa8'],
  'R':                 ['#9b8fc4', '#5e519e'],
  'Tableau':           ['#e97c4e', '#c45a2a'],
  'Salesforce':        ['#e2954d', '#b86d25'],
  'React':             ['#c8ff00', '#7aa800'],
  'Product Strategy':  ['#e2954d', '#b86d25'],
  'Strategic Analysis':['#e2954d', '#b86d25'],
  'XGBoost':           ['#2cb67d', '#1a6b4a'],
}

function getBandColors(tags: string[]): [string, string] {
  for (const tag of tags) {
    if (TAG_COLORS[tag]) return TAG_COLORS[tag]
  }
  return ['#4a90d9', '#2a5fa8']
}

export default function CaseStudyCard({ study, featured }: CaseStudyCardProps) {
  const [bandColor, bandDark] = getBandColors(study.tags)
  const hasPreview = Boolean(study.preview)

  return (
    <TiltCard tilt={featured ? 4 : 8} hoverScale={featured ? 1.01 : 1.02}>
      <motion.article
        className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}
        variants={cardVariants}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        {/* Visual band header */}
        <div
          className={`${styles.cardBand} ${hasPreview ? styles.cardBandPreview : ''}`}
          style={
            hasPreview
              ? { backgroundImage: `url(${study.preview})`, backgroundSize: 'cover', backgroundPosition: 'center top' }
              : { background: `linear-gradient(135deg, ${bandColor} 0%, ${bandDark} 100%)` }
          }
        >
          {/* Darkening overlay so tags stay readable over the screenshot */}
          {hasPreview && <div className={styles.bandImgOverlay} />}
          {!hasPreview && <div className={styles.bandGrid} />}
          {featured && <span className={styles.featuredBadge}>Featured</span>}
          <div className={styles.bandTags}>
            {study.tags.slice(0, 3).map(tag => (
              <span key={tag} className={styles.bandTag}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Card body */}
        <div className={styles.cardBody}>
          <h3 className={styles.title}>{study.title}</h3>
          <p className={styles.summary}>{study.summary}</p>
          <p className={styles.highlight}>{study.highlight}</p>
          <Link className={styles.link} to={`/case-studies/${study.slug}`}>
            View Case Study <span className={styles.linkArrow}>→</span>
          </Link>
        </div>
      </motion.article>
    </TiltCard>
  )
}
