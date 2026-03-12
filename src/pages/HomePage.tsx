import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
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

  // 3D tilt for profile photo — tracks mouse position
  const photoRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const photoScale = useMotionValue(1)
  const shadowX = useMotionValue(0)
  const shadowY = useMotionValue(8)
  const shadowBlur = useMotionValue(20)
  const shadowOp = useMotionValue(0.25)

  // Smooth spring physics for the tilt
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const smoothRotateX = useSpring(rotateX, springConfig)
  const smoothRotateY = useSpring(rotateY, springConfig)
  const smoothScale = useSpring(photoScale, springConfig)
  const smoothShadowX = useSpring(shadowX, springConfig)
  const smoothShadowY = useSpring(shadowY, springConfig)
  const smoothShadowBlur = useSpring(shadowBlur, springConfig)
  const smoothShadowOp = useSpring(shadowOp, springConfig)

  // Compose dynamic box-shadow from spring values
  const photoShadow = useMotionTemplate`${smoothShadowX}px ${smoothShadowY}px ${smoothShadowBlur}px rgba(0,0,0,${smoothShadowOp})`

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = photoRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    // Normalize -1 to 1
    const nx = (e.clientX - centerX) / (rect.width / 2)
    const ny = (e.clientY - centerY) / (rect.height / 2)
    // Tilt: mouse up → rotateX positive (tilt toward you), mouse right → rotateY positive
    rotateX.set(-ny * 18)
    rotateY.set(nx * 18)
    photoScale.set(1.08)
    // Shadow shifts opposite to tilt for realism
    shadowX.set(-nx * 16)
    shadowY.set(-ny * 16 + 12)
    shadowBlur.set(40)
    shadowOp.set(0.45)
  }, [rotateX, rotateY, photoScale, shadowX, shadowY, shadowBlur, shadowOp])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    photoScale.set(1)
    shadowX.set(0)
    shadowY.set(8)
    shadowBlur.set(20)
    shadowOp.set(0.25)
  }, [rotateX, rotateY, photoScale, shadowX, shadowY, shadowBlur, shadowOp])

  return (
    <AnimatePresence>
      {entered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: smooth }}
        >
          {/* ─── Hero ─── */}
          <section className={`${styles.hero} container`}>
            <div className={styles.heroContent}>
              <motion.h1
                className={styles.title}
                style={{ perspective: 600 }}
              >
                <div>
                  <SplitText text="I turn data into decisions that drive growth." delay={0.2} />
                </div>
                <span>
                  <SplitText text={`I'm ${siteMeta.name}.`} delay={0.7} />
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

            {/* 3D Tilt Profile Photo */}
            <motion.div
              ref={photoRef}
              className={styles.heroImageWrap}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: smooth }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 800 }}
            >
              {/* Glow behind photo */}
              <div className={styles.photoGlow} />
              {/* Photo that tilts in 3D on hover */}
              <motion.img
                className={styles.heroPhoto}
                src={profilePhoto}
                alt={siteMeta.name}
                width={340}
                height={340}
                style={{
                  rotateX: smoothRotateX,
                  rotateY: smoothRotateY,
                  scale: smoothScale,
                  boxShadow: photoShadow,
                }}
              />
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
                subtitle="End-to-end projects — from problem framing to model evaluation and strategic recommendations."
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
                subtitle="Reports, notebooks, and decks behind the case studies."
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
                  {/* Salesforce Trailblazer profile callout */}
                  <a
                    className={styles.trailblazerCallout}
                    href="https://www.salesforce.com/trailblazer/ladrnd2kz9mkex2uwv"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.trailblazerText}>
                      Salesforce Trailblazer
                      <span className={styles.trailblazerSub}> · 29 badges</span>
                    </span>
                    <span className={styles.trailblazerArrow}>→</span>
                  </a>
                  <div className={styles.certGrid}>
                    {education.certifications.map((cert) => {
                      const badgeLink = cert.verifyUrl || cert.docUrl || cert.trailblazerUrl
                      return (
                        <div key={cert.name} className={styles.certCard}>
                          {/* Badge image — clicking opens the cert/verify URL */}
                          {cert.badgeUrl ? (
                            badgeLink ? (
                              <a href={badgeLink} target="_blank" rel="noreferrer" className={styles.certBadgeLink}>
                                <img
                                  className={styles.certBadgeImg}
                                  src={cert.badgeUrl}
                                  alt={`${cert.name} badge`}
                                />
                              </a>
                            ) : (
                              <img
                                className={styles.certBadgeImg}
                                src={cert.badgeUrl}
                                alt={`${cert.name} badge`}
                              />
                            )
                          ) : (
                            <div className={styles.certBadgePlaceholder} />
                          )}
                          <div className={styles.certBody}>
                            <p className={styles.certName}>{cert.name}</p>
                            <p className={styles.certIssuer}>{cert.issuer}</p>
                            <div className={styles.certLinks}>
                              {cert.verifyUrl && (
                                <a className={styles.certLink} href={cert.verifyUrl} target="_blank" rel="noreferrer">
                                  Verify ↗
                                </a>
                              )}
                              {cert.verifyUrl && cert.docUrl && <span className={styles.certDot}>·</span>}
                              {cert.docUrl && (
                                <a className={styles.certLink} href={cert.docUrl} target="_blank" rel="noreferrer">
                                  View Cert ↗
                                </a>
                              )}
                              {cert.validUntil && (
                                <>
                                  {(cert.verifyUrl || cert.docUrl) && <span className={styles.certDot}>·</span>}
                                  <span className={styles.certValid}>{cert.validUntil}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
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
                subtitle="Actively seeking business analyst and revenue operations roles across the US. Let's connect."
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
