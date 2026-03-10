/*
  SECTION HEADING COMPONENT
  =========================
  A reusable heading used at the top of every section.

  KEY CONCEPTS:

  1. Props Interface:
     `interface SectionHeadingProps` defines what data this component expects.
     Think of it as a contract: "To use this component, you MUST provide a title
     and you MAY provide a subtitle."

  2. Destructuring:
     `({ title, subtitle }: SectionHeadingProps)` pulls `title` and `subtitle`
     out of the props object. It's shorthand for:
       function SectionHeading(props: SectionHeadingProps) {
         const title = props.title
         const subtitle = props.subtitle
       }

  3. Conditional rendering:
     `{subtitle && <p>...</p>}` means "if subtitle exists, render the <p>."
     If subtitle is undefined (not provided), nothing renders. This is called
     "short-circuit evaluation."
*/

import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  title: string
  subtitle?: string  // The ? makes this optional
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <h2>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
