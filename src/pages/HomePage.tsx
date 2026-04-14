import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import {
  about,
  caseStudies,
  education,
  experiences,
  hero,
  profilePhoto,
  siteMeta,
  skills,
  stats,
} from '../data/siteData'
import SectionHeading from '../components/SectionHeading'
import StatCard from '../components/StatCard'
import SkillCard from '../components/SkillCard'
import TimelineItem from '../components/TimelineItem'
import CaseStudyCard from '../components/CaseStudyCard'
import ContactForm from '../components/ContactForm'
import AnimatedSection from '../components/AnimatedSection'
import MagneticButton from '../components/MagneticButton'
import styles from './HomePage.module.css'

// Norris-inspired easing: fast start, slow finish
const smooth = [0.65, 0.05, 0, 1] as const

// Stagger container for grid layouts
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: smooth },
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
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: i < words.length - 1 ? '0.3em' : 0 }}
          variants={{
            hidden: { opacity: 0, y: 30, rotateX: -40, filter: 'blur(4px)' },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.45, ease: smooth },
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
  const nextPhoto = useCallback(() => {
    setPhotoIndex((prev) => (prev + 1) % photos.length)
  }, [])

  const prevPhoto = useCallback(() => {
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }, [])

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
        <motion.main
          id="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: smooth }}
        >
          {/* ─── Hero ─── */}
          <section className={`${styles.hero} container`}>
            <div className={styles.heroContent}>
              {/* Availability badge */}
              <motion.div
                className={styles.availabilityBadge}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.4, ease: smooth }}
              >
                <span className={styles.badgeDot} />
                Open to full-time roles
              </motion.div>

              <motion.h1
                className={styles.title}
                style={{ perspective: 600 }}
              >
                <div>
                  <SplitText text="I turn data into decisions that drive growth." delay={0.1} />
                </div>
                <span>
                  <SplitText text={`I'm ${siteMeta.name}.`} delay={0.45} />
                </span>
              </motion.h1>

              <motion.p
                className={styles.summary}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease: smooth }}
              >
                {hero.summary}
              </motion.p>

              <motion.div
                className={styles.heroActions}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.45, ease: smooth }}
              >
                <MagneticButton className={styles.btnPrimary} href="#case-studies">
                  View Case Studies
                </MagneticButton>
                <MagneticButton
                  className={styles.btnSecondary}
                  href="/assets/Adithya_Ramakrishnan_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download Resume
                </MagneticButton>
              </motion.div>

              {/* Scroll cue */}
              <motion.div
                className={styles.scrollCue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6, ease: smooth }}
              >
                <motion.span
                  className={styles.scrollCueArrow}
                  animate={{ y: [0, 7, 0] }}
                  transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
                >
                  ↓
                </motion.span>
                scroll
              </motion.div>
            </div>

            {/* 3D Tilt Profile Photo */}
            <motion.div
              ref={photoRef}
              className={styles.heroImageWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: smooth }}
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

          {/* ─── About ─── */}
          <section id="about" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
            <AnimatedSection direction="up" distance={60} scale={0.97}>
              <SectionHeading title="About Me" />
            </AnimatedSection>
            <AnimatedSection delay={0.15} direction="up" distance={50} scale={0.98}>
              <div className={styles.aboutText}>
                {about.paragraphs.slice(0, -1).map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
              </div>
              <p className={styles.aboutCallout}>{about.paragraphs[about.paragraphs.length - 1]}</p>
            </AnimatedSection>
          </section>

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
                <motion.div
                  key={study.slug}
                  variants={staggerItem}
                  style={study.featured ? { gridColumn: '1 / -1' } : undefined}
                >
                  <CaseStudyCard study={study} featured={study.featured} />
                </motion.div>
              ))}
            </motion.div>
          </section>

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

          {/* ─── Beyond Work ─── */}
          <section id="beyond-work" className={`${styles.section} container`} style={{ scrollMarginTop: '80px' }}>
            <AnimatedSection direction="up" distance={60} scale={0.97}>
              <SectionHeading
                title="Beyond Work"
                subtitle="Not everything needs a KPI. Some recent shots."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1} direction="none" scale={0.95} duration={1.1} clipReveal>
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
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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

          {/* ─── Contact ─── */}
          <section
            id="contact"
            className={`${styles.section} ${styles.contact} container`}
            style={{ scrollMarginTop: '80px' }}
          >
            <AnimatedSection direction="up" distance={60} scale={0.97}>
              <SectionHeading
                title="Contact"
                subtitle="Drop me a line."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1} direction="up" distance={30} scale={0.99}>
              <div className={styles.contactIntro}>
                <p>
                  If you're hiring for a business analyst, revenue ops, or data role, I'd love to hear from you. Same goes if you just want to talk about the work. I'm based in the Greater Seattle Area and open to anywhere in the US.
                </p>
                <div className={styles.contactMeta}>
                  <span className={styles.contactMetaItem}>Greater Seattle Area</span>
                  <span className={styles.contactMetaItem}>Available immediately</span>
                  <span className={styles.contactMetaItem}>Open to all US locations</span>
                  <span className={styles.contactMetaItem}>US work authorized</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="up" distance={40} scale={0.98}>
              <ContactForm />
            </AnimatedSection>
          </section>
        </motion.main>
  )
}
