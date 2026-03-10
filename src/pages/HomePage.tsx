/*
  HOME PAGE — with Framer Motion animations throughout
  =====================================================
  This page uses several Framer Motion patterns:

  1. Hero cascade: motion elements with increasing `delay` so they animate
     in sequence (eyebrow → h1 → summary → buttons → photo)

  2. staggerChildren variant: the skills and case-study grid containers
     use a `staggerChildren` transition so each card animates in 0.08s
     after the previous one, creating a wave effect.

  3. AnimatedSection wrapper: each section fades+rises in as it scrolls
     into view (whileInView), but only once (once: true).

  4. whileHover on cards: defined inside each card component (StatCard,
     SkillCard, etc.) for a lift effect on mouse-over.
*/

import { motion } from 'framer-motion'
import {
  about,
  caseStudies,
  education,
  experiences,
  hero,
  profilePhoto,
  projectDocuments,
  siteMeta,
  skills,
  stats,
} from '../data/siteData'
import SectionHeading from '../components/SectionHeading'
import StatCard from '../components/StatCard'
import SkillCard from '../components/SkillCard'
import TimelineItem from '../components/TimelineItem'
import CaseStudyCard from '../components/CaseStudyCard'
import DocumentCard from '../components/DocumentCard'
import ContactForm from '../components/ContactForm'
import AnimatedSection from '../components/AnimatedSection'
import styles from './HomePage.module.css'

// Stagger container: animates children one after another
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

// Individual item inside a stagger grid
const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.44 } },
}

export default function HomePage() {

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className={`${styles.hero} container`}>
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
          >
            Hi, I'm <span>{siteMeta.name}</span>
          </motion.h1>

          <motion.p
            className={styles.summary}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.55 }}
          >
            {hero.summary}
          </motion.p>

          <motion.div
            className={styles.heroActions}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
          >
            <a className={styles.btnPrimary} href="#case-studies">
              View Case Studies
            </a>
            <a
              className={styles.btnSecondary}
              href="/assets/Adithya_Ramakrishnan_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
            <a
              className={styles.btnSecondary}
              href={siteMeta.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn Profile
            </a>
          </motion.div>
        </div>

        {/* Profile photo on the right */}
        <motion.div
          className={styles.heroImageWrap}
          initial={{ opacity: 0, scale: 0.88, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            className={styles.heroPhoto}
            src={profilePhoto}
            alt={siteMeta.name}
            width={340}
            height={340}
          />
          <div className={styles.photoGlow} />
        </motion.div>
      </section>

      {/* ─── Stats (horizontal row) ─── */}
      <AnimatedSection delay={0.05}>
        <section className={`${styles.statsRow} container`}>
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </section>
      </AnimatedSection>

      {/* ─── About ─── */}
      <section id="about" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
        <AnimatedSection>
          <SectionHeading title="About Me" />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className={styles.aboutText}>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ─── Skills ─── */}
      <section id="skills" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
        <AnimatedSection>
          <SectionHeading title="Skills" />
        </AnimatedSection>
        <motion.div
          className={styles.skillsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </motion.div>
      </section>

      {/* ─── Experience ─── */}
      <section id="experience" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
        <AnimatedSection>
          <SectionHeading title="Experience" />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className={styles.timeline}>
            {experiences.map((exp) => (
              <TimelineItem key={exp.role} experience={exp} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ─── Case Studies ─── */}
      <section id="case-studies" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
        <AnimatedSection>
          <SectionHeading
            title="Case Studies"
            subtitle="Project case studies with documented methods, modeling decisions, and outcomes."
          />
        </AnimatedSection>
        <motion.div
          className={styles.caseGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </motion.div>
      </section>

      {/* ─── Project Documents ─── */}
      <section id="documents" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
        <AnimatedSection>
          <SectionHeading
            title="Project Documents"
            subtitle="Original project documentation and deliverables."
          />
        </AnimatedSection>
        <motion.div
          className={styles.docGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projectDocuments.map((doc) => (
            <DocumentCard key={doc.title} doc={doc} />
          ))}
        </motion.div>
      </section>

      {/* ─── Education & Certifications ─── */}
      <section id="education" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
        <AnimatedSection>
          <SectionHeading title="Education & Certifications" />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className={styles.eduGrid}>

            {/* Studies — each degree gets its own card */}
            <div className={styles.eduStudies}>
              {education.studies.map((item) => (
                <article
                  key={item.name}
                  className={`${styles.eduCard} ${item.isMasters ? styles.eduCardMasters : styles.eduCardBachelors}`}
                >
                  <div className={styles.eduCardHeader}>
                    <div>
                      <p className={styles.eduDegree}>{item.name}</p>
                      <p className={styles.eduInstitution}>{item.institution}</p>
                    </div>
                    <span className={styles.eduBadge}>{item.timeline}</span>
                  </div>
                  {item.highlights && (
                    <ul className={styles.eduHighlights}>
                      {item.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                  {item.coursework && (
                    <div className={styles.courseworkWrap}>
                      {item.coursework.map((c) => (
                        <span key={c} className={styles.coursePill}>{c}</span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Certifications */}
            <article className={styles.card}>
              <h3>Certifications</h3>
              {education.certifications.map((cert) => (
                <p key={cert} className={styles.certItem}>✓ {cert}</p>
              ))}
            </article>

          </div>
        </AnimatedSection>
      </section>

      {/* ─── Contact ─── */}
      <section
        id="contact"
        className={`${styles.section} ${styles.contact} container`}
        style={{ scrollMarginTop: '80px' }}
      >
        <AnimatedSection>
          <SectionHeading
            title="Contact"
            subtitle="Open to business analyst, revenue operations, and analytics roles across the United States (remote, hybrid, or on-site). Send a message and I'll follow up directly."
          />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <ContactForm />
        </AnimatedSection>
      </section>
    </main>
  )
}
