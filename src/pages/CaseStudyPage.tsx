import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { caseStudies, siteMeta } from '../data/siteData'
import AnimatedSection from '../components/AnimatedSection'
import styles from './CaseStudyPage.module.css'

const smooth = [0.16, 1, 0.3, 1] as const

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smooth },
  },
}

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) {
    return <Navigate to="/" replace />
  }

  return (
    <main className={`container ${styles.page}`}>
      {/* Hero area */}
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: smooth }}
      >
        <p className={styles.eyebrow}>Case Study</p>
        <h1 className={styles.title}>{study.title}</h1>
        <p className={styles.summary}>{study.summary}</p>
      </motion.div>

      <hr className="section-divider" style={{ margin: '1.5rem 0' }} />

      <AnimatedSection direction="up" distance={40} scale={0.98} once>
        <section className={styles.section}>
          <h2>Business Problem</h2>
          <p>{study.problem}</p>
        </section>
      </AnimatedSection>

      <hr className="section-divider" style={{ margin: '0.5rem 0' }} />

      <AnimatedSection direction="up" distance={40} scale={0.98} once>
        <section className={styles.section}>
          <h2>Data & Approach</h2>
          <motion.ul
            className={styles.list}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {study.approach.map((point) => (
              <motion.li key={point} variants={staggerItem}>{point}</motion.li>
            ))}
          </motion.ul>
        </section>
      </AnimatedSection>

      <hr className="section-divider" style={{ margin: '0.5rem 0' }} />

      <AnimatedSection direction="up" distance={40} scale={0.98} once>
        <section className={styles.section}>
          <h2>Results</h2>
          <motion.ul
            className={styles.list}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {study.results.map((point) => (
              <motion.li key={point} variants={staggerItem}>{point}</motion.li>
            ))}
          </motion.ul>
        </section>
      </AnimatedSection>

      {study.documents.length > 0 && (
        <>
          <hr className="section-divider" style={{ margin: '0.5rem 0' }} />
          <AnimatedSection direction="up" distance={40} scale={0.98} once>
            <section className={styles.section}>
              <h2>Documentation</h2>
              <div className={styles.docLinks}>
                {study.documents.map((doc) => (
                  <a
                    key={doc.href}
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.docLink}
                  >
                    {doc.label}
                  </a>
                ))}
              </div>
            </section>
          </AnimatedSection>
        </>
      )}

      <hr className="section-divider" style={{ margin: '1rem 0' }} />

      <AnimatedSection direction="up" distance={30} scale={0.99} once>
        <div className={styles.actions}>
          <Link className={styles.btnPrimary} to="/">
            ← Back to Home
          </Link>
          <a
            className={styles.btnSecondary}
            href={`mailto:${siteMeta.email}?subject=${encodeURIComponent(study.contactSubject)}`}
          >
            Discuss This Case Study
          </a>
        </div>
      </AnimatedSection>
    </main>
  )
}
