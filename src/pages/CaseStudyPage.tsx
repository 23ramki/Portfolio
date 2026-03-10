/*
  CASE STUDY DETAIL PAGE
  ======================
  Displays a single case study based on the URL parameter.

  KEY CONCEPTS:
  - useParams<{ slug: string }>(): extracts :slug from the URL
  - Array.find(): searches the array for a matching slug
  - Navigate: redirects to home if no match found
*/

import { useParams, Navigate, Link } from 'react-router-dom'
import { caseStudies, siteMeta } from '../data/siteData'
import styles from './CaseStudyPage.module.css'

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) {
    return <Navigate to="/" replace />
  }

  return (
    <main className={`container ${styles.page}`}>
      <p className={styles.eyebrow}>Case Study</p>
      <h1 className={styles.title}>{study.title}</h1>
      <p className={styles.summary}>{study.summary}</p>

      <section className={styles.section}>
        <h2>Business Problem</h2>
        <p>{study.problem}</p>
      </section>

      <section className={styles.section}>
        <h2>Data & Approach</h2>
        <ul className={styles.list}>
          {study.approach.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Results</h2>
        <ul className={styles.list}>
          {study.results.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      {study.documents.length > 0 && (
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
      )}

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
    </main>
  )
}
