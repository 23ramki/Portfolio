import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
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

const smooth = [0.16, 1, 0.3, 1] as const

// Stagger container for grid layouts
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: smooth },
  },
}

const photos = [
  '/assets/photography/photo-1.jpg',
  '/assets/photography/photo-2.jpg',
  '/assets/photography/photo-3.jpg',
  '/assets/photography/photo-4.jpg',
  '/assets/photography/photo-5.jpg',
  '/assets/photography/photo-6.jpg',
]

// Split text into words for stagger animation
function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
          variants={{
            hidden: { opacity: 0, y: 30, rotateX: -40 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { duration: 0.6, ease: smooth },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function HomePage() {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [entered, setEntered] = useState(false)

  // Entrance animation state
  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const nextPhoto = useCallback(() => {
    setPhotoIndex((prev) => (prev + 1) % photos.length)
  }, [])

  const prevPhoto = useCallback(() => {
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextPhoto, 5000)
    return () => clearInterval(timer)
  }, [nextPhoto])

  // 3D parallax for profile photo
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(heroScroll, [0, 1], [0, -60])
  const photoScale = useTransform(heroScroll, [0, 0.4], [1, 1.12])
  const photoRotateX = useTransform(heroScroll, [0, 0.5], [0, -12])
  const photoRotateY = useTransform(heroScroll, [0, 0.5], [0, 6])
  const glowScale = useTransform(heroScroll, [0, 0.5], [1, 1.6])
  const glowOpacity = useTransform(heroScroll, [0, 0.5], [0.18, 0.45])
  const glowBlur = useTransform(heroScroll, [0, 0.5], [16, 28])
  const glowFilter = useTransform(glowBlur, (v) => `blur(${v}px)`)

  return (
    <AnimatePresence>
      {entered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: smooth }}
        >
          {/* ─── Hero ─── */}
          <section ref={heroRef} className={`${styles.hero} container`}>
            <div className={styles.heroContent}>
              <motion.h1
                className={styles.title}
                style={{ perspective: 600 }}
              >
                <SplitText text="Hi, I'm" delay={0.2} />
                {' '}
                <span>
                  <SplitText text={siteMeta.name} className={styles.titleAccent} delay={0.5} />
                </span>
              </motion.h1>

              <motion.p
                className={styles.summary}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1, ease: smooth }}
              >
                {hero.summary}
              </motion.p>

              <motion.div
                className={styles.heroActions}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.9, ease: smooth }}
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

            {/* 3D Parallax Profile Photo */}
            <motion.div
              className={styles.heroImageWrap}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: smooth }}
              style={{ perspective: 600 }}
            >
              <motion.div
                className={styles.photoInner}
                style={{
                  y: photoY,
                  scale: photoScale,
                  rotateX: photoRotateX,
                  rotateY: photoRotateY,
                }}
              >
                <motion.img
                  className={styles.heroPhoto}
                  src={profilePhoto}
                  alt={siteMeta.name}
                  width={340}
                  height={340}
                />
                <motion.div
                  className={styles.photoGlow}
                  style={{ scale: glowScale, opacity: glowOpacity, filter: glowFilter }}
                />
              </motion.div>
            </motion.div>
          </section>

          {/* ─── Stats ─── */}
          <motion.section
            className={`${styles.statsRow} container`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem}>
                <StatCard stat={stat} />
              </motion.div>
            ))}
          </motion.section>

          <hr className="section-divider container" />

          {/* ─── About ─── */}
          <section id="about" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
            <AnimatedSection direction="up" distance={60} scale={0.97}>
              <SectionHeading title="About Me" />
            </AnimatedSection>
            <AnimatedSection delay={0.15} direction="up" distance={50} scale={0.98}>
              <div className={styles.aboutText}>
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
              </div>
            </AnimatedSection>
          </section>

          <hr className="section-divider container" />

          {/* ─── Skills ─── */}
          <section id="skills" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
            <AnimatedSection direction="up" distance={60} scale={0.97}>
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
                <motion.div key={skill.title} variants={staggerItem}>
                  <SkillCard skill={skill} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </section>

          <hr className="section-divider container" />

          {/* ─── Experience ─── */}
          <section id="experience" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
            <AnimatedSection direction="up" distance={60} scale={0.97}>
              <SectionHeading title="Experience" />
            </AnimatedSection>
            <div className={styles.timeline}>
              {experiences.map((exp, i) => (
                <AnimatedSection key={exp.role} delay={i * 0.12} direction="left" distance={40} scale={0.98}>
                  <TimelineItem experience={exp} />
                </AnimatedSection>
              ))}
            </div>
          </section>

          <hr className="section-divider container" />

          {/* ─── Case Studies ─── */}
          <section id="case-studies" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
            <AnimatedSection direction="up" distance={60} scale={0.97}>
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
                <motion.div key={study.slug} variants={staggerItem}>
                  <CaseStudyCard study={study} />
                </motion.div>
              ))}
            </motion.div>
          </section>

          <hr className="section-divider container" />

          {/* ─── Project Documents ─── */}
          <section id="documents" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
            <AnimatedSection direction="up" distance={60} scale={0.97}>
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
                <motion.div key={doc.title} variants={staggerItem}>
                  <DocumentCard doc={doc} />
                </motion.div>
              ))}
            </motion.div>
          </section>

          <hr className="section-divider container" />

          {/* ─── Education ─── */}
          <section id="education" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
            <AnimatedSection direction="up" distance={60} scale={0.97}>
              <SectionHeading title="Education & Certifications" />
            </AnimatedSection>
            <div className={styles.eduGrid}>
              <div className={styles.eduStudies}>
                {education.studies.map((item, i) => (
                  <AnimatedSection key={item.name} delay={i * 0.12} direction="left" distance={40} scale={0.97}>
                    <article
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
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection delay={0.15} direction="right" distance={40} scale={0.97}>
                <article className={styles.card}>
                  <h3>Certifications</h3>
                  {education.certifications.map((cert) => (
                    <p key={cert} className={styles.certItem}>✓ {cert}</p>
                  ))}
                </article>
              </AnimatedSection>
            </div>
          </section>

          <hr className="section-divider container" />

          {/* ─── Beyond Work ─── */}
          <section id="beyond-work" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
            <AnimatedSection direction="up" distance={60} scale={0.97}>
              <SectionHeading
                title="Beyond Work"
                subtitle="When I'm not working with data, I'm out capturing the world through my lens."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1} direction="none" scale={0.95} duration={1.1}>
              <div className={styles.photoShowcase}>
                <div className={styles.slideshow}>
                  <button className={styles.slideBtn} onClick={prevPhoto} aria-label="Previous photo">&lsaquo;</button>
                  <div className={styles.slideWindow}>
                    <AnimatePresence mode="popLayout">
                      <motion.img
                        key={photoIndex}
                        src={photos[photoIndex]}
                        alt={`Photography by Adithya — ${photoIndex + 1} of ${photos.length}`}
                        className={styles.slideImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: [1, 1.05], transition: {
                          opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                          scale: { duration: 5, ease: 'linear' },
                        }}}
                        exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
                      />
                    </AnimatePresence>
                  </div>
                  <button className={styles.slideBtn} onClick={nextPhoto} aria-label="Next photo">&rsaquo;</button>
                </div>
                <div className={styles.slideDots}>
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${i === photoIndex ? styles.dotActive : ''}`}
                      onClick={() => setPhotoIndex(i)}
                      aria-label={`Go to photo ${i + 1}`}
                    />
                  ))}
                </div>
                <a
                  className={styles.unsplashLink}
                  href="https://unsplash.com/@theadithyar"
                  target="_blank"
                  rel="noreferrer"
                >
                  View more on Unsplash &rarr;
                </a>
              </div>
            </AnimatedSection>
          </section>

          <hr className="section-divider container" />

          {/* ─── Contact ─── */}
          <section
            id="contact"
            className={`${styles.section} ${styles.contact} container`}
            style={{ scrollMarginTop: '80px' }}
          >
            <AnimatedSection direction="up" distance={60} scale={0.97}>
              <SectionHeading
                title="Contact"
                subtitle="Open to business analyst, revenue operations, and analytics roles across the United States (remote, hybrid, or on-site). Send a message and I'll follow up directly."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.12} direction="up" distance={40} scale={0.98}>
              <ContactForm />
            </AnimatedSection>
          </section>
        </motion.main>
      )}
    </AnimatePresence>
  )
}
