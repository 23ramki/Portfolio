/*
  DOCUMENT CARD — with Framer Motion hover animation
*/

import { motion } from 'framer-motion'
import type { ProjectDocument } from '../types/portfolio'
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
    <motion.article
      className={styles.card}
      variants={docCardVariants}
      whileHover={{ y: -4, boxShadow: '0 10px 28px rgba(0,0,0,0.15)' }}
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
  )
}
