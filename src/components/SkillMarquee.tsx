import styles from './SkillMarquee.module.css'

const SKILL_ITEMS = [
  'SQL', 'Tableau', 'Power BI', 'Snowflake', 'Python', 'R',
  'Salesforce', 'Excel', 'Jupyter', 'DAX', 'XGBoost',
  'Pandas', 'Data Modeling', 'Dashboard Design', 'KPI Governance',
  'Random Forest', 'Feature Engineering', 'PCA',
]

export default function SkillMarquee() {
  // Duplicate items for seamless loop
  const items = [...SKILL_ITEMS, ...SKILL_ITEMS]

  return (
    <div className={styles.container}>
      <div className={styles.track}>
        {items.map((skill, i) => (
          <span key={`${skill}-${i}`} className={styles.pill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
