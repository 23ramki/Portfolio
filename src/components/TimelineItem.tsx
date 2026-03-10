/*
  TIMELINE ITEM COMPONENT
  =======================
  Renders a single work experience entry on a vertical timeline.

  KEY CONCEPT — Composition:
  This component doesn't know about the timeline line itself — that's
  handled by the parent's CSS. Each TimelineItem only renders its own
  content: the dot, role, timeline, and description.

  The parent provides the vertical line, and these items position
  themselves along it. This separation of concerns makes each piece
  reusable and testable independently.
*/

import type { Experience } from '../types/portfolio'
import styles from './TimelineItem.module.css'

interface TimelineItemProps {
  experience: Experience
}

export default function TimelineItem({ experience }: TimelineItemProps) {
  // Merge text + optional bullets into one uniform list
  const allPoints = [experience.text, ...(experience.bullets ?? [])]

  return (
    <article className={styles.item}>
      <div className={styles.dot} />
      <div>
        <h3 className={styles.role}>{experience.role}</h3>
        <p className={styles.timeline}>{experience.timeline}</p>
        <ul className={styles.points}>
          {allPoints.map((point) => (
            <li key={point.slice(0, 40)}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
