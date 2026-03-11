import { motion } from 'framer-motion'
import type { ProjectDocument } from '../types/portfolio'
import TiltCard from './TiltCard'
import styles from './DocumentCard.module.css'

interface DocumentCardProps {
  doc: ProjectDocument
}

const docCardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42 } },
}

export default function DocumentCard({ doc }: DocumentCardProps) {
  return (
    <TiltCard tilt={10} hoverScale={1.03}>
      <motion.article
        className={styles.card}
        variants={docCardVariants}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <h3 className={styles.title}>{doc.title}</h3>
        <p className={styles.description}>{doc.description}</p>
        <div className={styles.links}>
          {doc.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.article>
    </TiltCard>
  )
}
