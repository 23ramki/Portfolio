/*
  SITE DATA
  =========
  All portfolio content lives here as typed constants.
*/

import type {
  SiteMeta,
  HeroContent,
  AboutContent,
  Stat,
  Skill,
  Experience,
  CaseStudy,
  ProjectDocument,
  Education,
  Certification,
} from '../types/portfolio'

// ─── Personal info ────────────────────────────────────────
export const siteMeta: SiteMeta = {
  name: 'Adithya Ramakrishnan',
  email: 'adithyaramakrishnan2309@gmail.com',
  linkedin: 'https://www.linkedin.com/in/23ramki/',
}

export const profilePhoto: string = '/assets/profile-photo.jpg'

// ─── Hero ─────────────────────────────────────────────────
export const hero: HeroContent = {
  eyebrow: 'Business Analyst Portfolio',
  title: "I'm Adithya Ramakrishnan. I turn data into decisions that drive growth.",
  summary:
    '3+ years designing KPI dashboards for B2B recurring revenue operations. I make data credible, decisions faster, and stakeholder reviews sharper — across 70+ locations.',
}

// ─── About ────────────────────────────────────────────────
export const about: AboutContent = {
  paragraphs: [
    "I specialize in translating operational and CRM data into commercial clarity. Over the past 3+ years, I've partnered with senior stakeholders across 70+ OEM-approved dealership service centers in a distributed B2B recurring revenue model — designing and presenting KPI dashboards used in structured performance reviews that align operational visibility with margin, upsell conversion, and cost optimization goals.",
    'My work sits at the intersection of analytics and business impact. I track conversion performance of value-added services, analyze billing cycles and material consumption, and participate in pricing and procurement discussions to support data-informed decisions. When reporting discrepancies arise, I reinforce data credibility through deeper analysis and KPI standardization.',
    "Technically, I work across Salesforce, Tableau, Power BI, SQL, and relational database environments — with graduate-level grounding in predictive modeling and BI architecture. I'm particularly drawn to roles where analytics, stakeholder alignment, and measurable revenue impact converge.",
  ],
}

// ─── Stats ────────────────────────────────────────────────
export const stats: Stat[] = [
  { value: '35%', label: 'Client Base Increase' },
  { value: '70+', label: 'Locations Managed' },
  { value: '25%', label: 'Manual Data Entry Reduced' },
]

// ─── Skills ───────────────────────────────────────────────
export const skills: Skill[] = [
  {
    title: 'Analytics & BI',
    text: 'SQL, Tableau, Power BI (DAX), Snowflake, Dashboard Design, Data Visualization',
    icon: '📊',
  },
  {
    title: 'CRM & Revenue Systems',
    text: 'Salesforce (Admin Certified), Pipeline Analysis, KPI Governance, CRM Workflows',
    icon: '🔗',
  },
  {
    title: 'Technical Foundations',
    text: 'Relational Databases, Data Modeling, Python (pandas), R, Jupyter Notebooks',
    icon: '⚙️',
  },
  {
    title: 'Pre-Sales & Commercial',
    text: 'Executive Storytelling, Stakeholder Discovery, Solution Alignment, Margin Analysis, Billing Analytics',
    icon: '🎯',
  },
  {
    title: 'ML & Data Science',
    text: 'Predictive Modeling, Classification & Regression, XGBoost, Random Forest, Feature Engineering, PCA',
    icon: '🤖',
  },
]

// ─── Experience ───────────────────────────────────────────
export const experiences: Experience[] = [
  {
    role: 'Revenue Operations & Analytics Analyst | Orange Care Solutions',
    timeline: 'Oct 2022 - Jan 2024',
    text: 'Delivered structured monthly KPI performance reviews to Dealer Principals and Directors across 70+ OEM-approved dealership service centers.',
    bullets: [
      'Designed Tableau dashboards translating operational and CRM data into executive-ready narratives tied to revenue, margin, and SLA performance.',
      'Analyzed 30-day recurring billing cycles, technician deployment, and material consumption to improve cost visibility and margin control (contributed to 12% reduction in labor cost variance).',
    ],
  },
  {
    role: 'Sales Analyst | Frontier',
    timeline: 'Jan 2022 - Sep 2022',
    text: 'Automated weekly revenue reporting using Excel VBA + Power Query, reducing manual data entry by 25% and improving reporting reliability for leadership.',
    bullets: [
      'Monitored pipeline health and conversion gaps to improve forecasting accuracy; aligned Salesforce reporting logic with stakeholder expectations for quarterly planning.',
      'Supported CRM data integrity through recurring audits and stakeholder follow-ups (definitions, stage hygiene, missing fields).',
    ],
  },
  {
    role: 'Sales & Marketing Intern | Tata Hitachi',
    timeline: 'Jan 2021 - Sep 2021',
    text: 'Analyzed segmentation and GTM data to improve campaign performance, contributing to a 35% client base increase and over 200% growth in registrations.',
    bullets: [
      'Evaluated digital touchpoints to identify friction in the sales funnel, implementing UI/UX changes that improved customer retention.',
    ],
  },
]

// ─── Case Studies ─────────────────────────────────────────
export const caseStudies: CaseStudy[] = [
  {
    slug: 'telco-customer-churn',
    title: 'Telco Customer Churn Analysis',
    summary:
      'Analyzed a 7,000+ customer dataset using Python and SQL to identify key drivers of a 26.5% overall churn rate, and built an interactive Tableau dashboard with a quadrant risk matrix.',
    tags: ['Python', 'SQL', 'Tableau', 'Feature Engineering'],
    highlight: 'Month-to-month contracts: 42.7% churn; fiber optic: 41.9% churn.',
    problem:
      'Telecom providers need to identify high-risk customer segments to reduce churn and prioritize retention strategies.',
    approach: [
      'Analyzed a 7,000+ customer dataset using Python and SQL to identify key drivers of a 26.5% overall churn rate.',
      'Engineered features using pandas to reveal that month-to-month contracts and fiber optic services hold the highest flight risk (42.7% and 41.9% churn, respectively).',
      'Designed an interactive Tableau dashboard featuring a dynamic metric swapper (parameter actions) and a customer-level quadrant risk matrix.',
      'Accelerated exploratory data analysis and data profiling workflows by integrating Claude Code, optimizing execution time while maintaining strategic oversight.',
    ],
    results: [
      'Identified month-to-month contracts (42.7%) and fiber optic services (41.9%) as highest churn segments.',
      'Built a quadrant risk matrix enabling customer-level prioritization for retention campaigns.',
      'Created a dynamic metric swapper using Tableau parameter actions for flexible executive exploration.',
    ],
    documents: [],
    liveLinks: [
      { label: 'Tableau Dashboard', href: 'https://public.tableau.com/views/Telco_17745732908030/QuadrantAnalysis?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link' },
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/telco-churn/tree/main' },
    ],
    contactSubject: 'Telco Customer Churn Analysis Discussion',
  },
  {
    slug: 'loan-repayment-modeling',
    title: 'Loan Repayment Risk Modeling',
    summary:
      'Built and evaluated ZeroR, Logistic Regression, Decision Tree, and Bagging models to predict repayment failure from anonymized loan data.',
    tags: ['R', 'Logistic Regression', 'PCA', 'Risk Analytics'],
    highlight: 'Best model: 99.91% accuracy, 99.58% sensitivity.',
    problem:
      'Lenders need reliable default-risk signals to reduce false negatives when evaluating loan applications.',
    approach: [
      'Started with 38,480 records and standardized missing-value handling.',
      'Removed 17 highly correlated columns and retained 14,094 complete observations.',
      'Applied one-hot encoding, 60/40 train-test split, and compared ZeroR, Logistic Regression, Decision Tree, and Bagging.',
      'Evaluated confusion-matrix metrics with a sensitivity-first decision lens.',
    ],
    results: [
      'Logistic Regression: 99.91% accuracy, 99.58% sensitivity.',
      'Bagging: 99.91% accuracy, 99.48% sensitivity.',
      'Decision Tree: 97.36% accuracy, 90.55% sensitivity.',
      'Recommendation: Logistic Regression for risk-sensitive lending decisions.',
    ],
    documents: [
      { label: 'BA with R Project Final (PDF)', href: '/assets/BA_with_R_Project_Final.pdf' },
      { label: 'BA with R Project Deck (PPTX)', href: '/assets/BA_with_R_Project_PPT.pptx' },
    ],
    contactSubject: 'Loan Repayment Risk Modeling Discussion',
  },
  {
    slug: 'amazon-last-mile-routing',
    title: 'Amazon Last-Mile Routing Intelligence',
    summary:
      'Engineered route-level features and trained classification and regression models on Amazon routing challenge data.',
    tags: ['Python', 'XGBoost', 'Random Forest', 'Optimization'],
    highlight: 'Best regression: RMSE 0.0969, R² 0.8626.',
    problem:
      'Last-mile delivery efficiency directly impacts logistics cost and customer experience, and route quality needed prediction at scale.',
    approach: [
      'Built features from 6,112 historical routes and 3,072 evaluation routes.',
      'Processed 904,527 stop rows, 1,457,175 package rows, and 139,748,173 travel-time pairs.',
      'Used Dask-based parallelization to reduce feature creation cycle time from hours to seconds.',
      'Final model matrix reached 6,112 routes and 701 features with stop-rank encoding and route metrics.',
    ],
    results: [
      'Random Forest Regression: RMSE 0.0969, R² 0.8626.',
      'Ridge Regression: RMSE 0.1219, R² 0.7825.',
      'Best classification test accuracy: XGBoost at 63.94%.',
      'Top features included AvgPackagesPerStop, AvgTotalTimePerStop, avg_travel_time, and GeographicArea.',
    ],
    documents: [
      { label: 'AppML Project Group2 (PDF)', href: '/assets/AppML_Project_Group2.pdf' },
      { label: 'Route Score Prediction Notebook (IPYNB)', href: '/assets/route_score_prediction.ipynb' },
    ],
    contactSubject: 'Amazon Last-Mile Routing Case Study Discussion',
  },
  {
    slug: 'insurcare-database-foundation',
    title: 'InsurCare Database Foundation',
    summary:
      'Produced project charter, entity design, and SQL starter schema for a B2C insurance management platform.',
    tags: ['SQL', 'Data Modeling', 'ERD', 'Documentation'],
    highlight: 'Designed customer, policy, claims, and billing entities.',
    problem:
      'Insurance operations were fragmented across customers, policies, claims, billing, and agent workflows.',
    approach: [
      'Defined project charter with objectives, scope, constraints, milestones, and risk management.',
      'Modeled core entities including Customer, Policy, Claims, Incident, Billing, and InsuranceProvider.',
      'Drafted starter SQL DDL and test inserts to accelerate implementation readiness.',
      'Mapped requirements for policy management, claims submission, premium payment, renewals, and secure access.',
    ],
    results: [
      'Created a structured foundation for a mobile-first insurance platform.',
      'Improved system clarity for future development and testing.',
      'Enabled traceability from business requirements to schema-level design artifacts.',
    ],
    documents: [
      { label: 'InsurCare Database Foundation (DOCX)', href: '/assets/InsurCare_Database_Foundation.docx' },
    ],
    contactSubject: 'InsurCare Database Foundation Discussion',
  },
  {
    slug: 'john-deere-leap-strategy',
    title: 'John Deere Leap Strategy Analysis',
    summary:
      "Evaluated Deere's precision-ag transformation strategy and designed adoption recommendations focused on affordability and trust.",
    tags: ['Strategic Analysis', 'AI/IoT', 'Adoption Design'],
    highlight: 'Targets assessed: 50% farmers, 500M acres by 2026.',
    problem:
      "Precision-ag adoption had barriers for small and mid-size farms, despite Deere's ambitious digital transformation goals.",
    approach: [
      'Analyzed Leap Ambitions strategy and the role of autonomous machinery, IoT sensors, and digital platforms.',
      'Mapped adoption blockers including cost, usability, and data-governance concerns.',
      'Prepared recommendations for flexible pricing, retrofit paths, training programs, and remote support.',
    ],
    results: [
      'Structured an adoption-centered strategy playbook aligned to technology and business outcomes.',
      'Balanced innovation scale with farmer trust, affordability, and practical rollout feasibility.',
    ],
    documents: [
      { label: 'BUAN6335 HBR John Deere Group2 (PDF)', href: '/assets/BUAN6335_HBR_John_Deere_Group2.pdf' },
    ],
    contactSubject: 'John Deere Strategy Case Study Discussion',
  },
  {
    slug: 'disney-plus-ml-strategy',
    title: 'Disney+ ML Growth Strategy',
    summary:
      'Mapped strategic goals to machine learning use-cases for acquisition, retention, content ROI, and competitive advantage.',
    tags: ['Product Analytics', 'ML Strategy', 'Personalization'],
    highlight: 'Framework includes recommendation, churn, and bias controls.',
    problem:
      'Streaming platforms need to grow subscribers while minimizing churn and optimizing content investment in a crowded market.',
    approach: [
      'Mapped business objectives to recommendation, targeted marketing, churn prediction, and content valuation models.',
      'Defined data inputs across viewing history, user interactions, content metadata, social sentiment, and market signals.',
      'Added model-governance considerations for bias risk and responsible decision-making.',
    ],
    results: [
      'Produced a reusable strategy-to-ML decision framework.',
      'Established a practical roadmap balancing experimentation speed and governance quality.',
    ],
    documents: [
      { label: 'Disney Strategic Goals and ML Use-Cases (PDF)', href: '/assets/Disneys_Strategic_Goals_ML_Use_Cases.pdf' },
    ],
    contactSubject: 'Disney Plus ML Strategy Case Study Discussion',
  },
  {
    slug: 'doordash-product-strategy',
    title: 'DoorDash Product Strategy Review',
    summary:
      'Assessed marketplace strategy, execution model, KPI structure, and SWOT to propose product and operations improvements.',
    tags: ['Product Strategy', 'KPI Design', 'SWOT', 'Execution'],
    highlight: 'Included market-share, growth, and pain-point analysis.',
    problem:
      'Delivery platforms must balance delivery speed, user quality, dasher economics, and profitability while scaling.',
    approach: [
      'Reviewed strategy canvas, roadmap, execution model, and investment criteria.',
      'Benchmarked competition and marketplace positioning against Uber Eats, Grubhub, and Postmates.',
      'Synthesized growth metrics, operational constraints, and user pain points into actionable recommendations.',
    ],
    results: [
      'Defined strengths and risks across market leadership, operations cost, and regulatory pressure.',
      'Identified improvement levers in experimentation, personalization, and dasher experience design.',
    ],
    documents: [
      { label: 'DoorDash Delivering Convenience (PDF)', href: '/assets/DoorDash_Delivering_Convenience.pdf' },
      { label: 'DoorDash Presentation (PDF)', href: '/assets/Doordash_Presentation.pdf' },
    ],
    contactSubject: 'DoorDash Product Strategy Case Study Discussion',
  },
  {
    slug: 'crm-process-automation',
    title: 'CRM Process Automation & Security Configuration',
    summary:
      'Configured a Salesforce developer org with Custom Objects, Validation Rules, and Flows to automate the Lead-to-Opportunity lifecycle and enforce enterprise security models.',
    tags: ['Salesforce', 'Flow Automation', 'Security', 'CRM'],
    highlight: 'Automated Lead-to-Opportunity lifecycle, reducing manual data entry.',
    problem:
      'Sales teams rely on manual CRM processes that introduce data entry errors, slow down lead conversion, and lack proper data access controls across organizational hierarchies.',
    approach: [
      'Configured Custom Objects, Fields, and Page Layouts to model the sales process within a Salesforce developer org.',
      'Built Validation Rules to enforce data quality at the point of entry across lead and opportunity records.',
      'Designed and deployed Flows to automate the Lead-to-Opportunity conversion lifecycle, reducing manual steps.',
      'Implemented complex security models using Profiles, Roles, Permission Sets, and Sharing Rules to simulate real-world hierarchy and data access requirements.',
    ],
    results: [
      'Automated lead conversion workflow, eliminating repetitive manual data entry for sales reps.',
      'Enforced data integrity through validation rules, reducing CRM data quality issues.',
      'Established role-based access control that mirrors enterprise org-chart hierarchies.',
      'Created a reusable Salesforce configuration template applicable to real-world CRM deployments.',
    ],
    documents: [],
    contactSubject: 'CRM Process Automation Case Study Discussion',
  },
]

// ─── Project Documents ────────────────────────────────────
export const projectDocuments: ProjectDocument[] = [
  {
    title: 'Telco Customer Churn Analysis',
    description:
      'Python and SQL analysis of 7,000+ customer records identifying churn drivers, with an interactive Tableau dashboard featuring quadrant risk matrix.',
    links: [
      { label: 'Tableau Dashboard', href: 'https://public.tableau.com/views/Telco_17745732908030/QuadrantAnalysis?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link' },
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/telco-churn/tree/main' },
    ],
  },
  {
    title: 'Loan Repayment Modeling',
    description:
      'Report and presentation deck for loan repayment prediction in R, including preprocessing, model comparisons, and lending-risk recommendations.',
    links: [
      { label: 'Open Report (PDF)', href: '/assets/BA_with_R_Project_Final.pdf' },
      { label: 'Open Deck (PPTX)', href: '/assets/BA_with_R_Project_PPT.pptx' },
    ],
  },
  {
    title: 'Amazon Last Mile Routing',
    description:
      'Project report and implementation notebook for route feature engineering, model training, and route quality prediction.',
    links: [
      { label: 'Open Report (PDF)', href: '/assets/AppML_Project_Group2.pdf' },
      { label: 'Open Notebook (IPYNB)', href: '/assets/route_score_prediction.ipynb' },
    ],
  },
  {
    title: 'InsurCare Database Foundation',
    description: 'Project charter and schema foundation for a B2C insurance management platform.',
    links: [
      { label: 'Open DOCX', href: '/assets/InsurCare_Database_Foundation.docx' },
    ],
  },
  {
    title: 'Enterprise AI Strategy Case Analyses',
    description:
      'Strategic analyses connecting business goals to AI/ML-led transformation and adoption design across media and industrial domains.',
    links: [
      { label: 'Open Disney+ Analysis (PDF)', href: '/assets/Disneys_Strategic_Goals_ML_Use_Cases.pdf' },
      { label: 'Open John Deere Analysis (PDF)', href: '/assets/BUAN6335_HBR_John_Deere_Group2.pdf' },
    ],
  },
  {
    title: 'DoorDash Strategy Documents',
    description:
      'Product strategy document and presentation covering roadmap, KPI metrics, SWOT, and competitive analysis.',
    links: [
      { label: 'Open Strategy PDF', href: '/assets/DoorDash_Delivering_Convenience.pdf' },
      { label: 'Open Presentation PDF', href: '/assets/Doordash_Presentation.pdf' },
    ],
  },
]

// ─── Education ────────────────────────────────────────────
export const education: Education = {
  studies: [
    {
      name: 'MS in Business Analytics & AI',
      institution: 'University of Texas at Dallas',
      timeline: 'Jan 2024 – Dec 2025',
      isMasters: true,
      highlights: [
        'Graduate Certificates: Business Decision Analytics & Analytics for Managers',
        'Certified Mentor — MS Business Analytics & AI cohort',
      ],
      coursework: [
        'Applied Machine Learning',
        'Advanced Statistics for Data Science',
        'Business Analytics with R',
        'Predictive Analytics for Data Science',
        'Applied Econometrics & Time Series Analysis',
        'Data Visualization',
        'Database Foundations for Business Analytics',
        'Organizational Analytics Platforms',
        'Foundations of Digital Product Management',
      ],
    },
    {
      name: 'BTech in Mechanical Engineering',
      institution: 'SRM Institute of Science and Technology',
      timeline: 'Aug 2016 – Jun 2020',
      isMasters: false,
    },
  ],
  certifications: [
    {
      name: 'Salesforce Certified Platform Administrator',
      issuer: 'Salesforce',
      badgeUrl: '/assets/salesforce-admin-badge.png',
      docUrl: '/assets/Salesforce_PlatformAdministrator_Cert.pdf',
      trailblazerUrl: 'https://www.salesforce.com/trailblazer/ladrnd2kz9mkex2uwv',
    },
    {
      name: 'SnowPro Associate: Platform Certification',
      issuer: 'Snowflake',
      badgeUrl: '/assets/snowpro-associate-badge.png',
      verifyUrl: 'https://www.credential.net/d8ddca5c-c4d3-43f6-9b91-f6d0cbe8bfb8',
      validUntil: 'Valid until Jun 2027',
    },
    {
      name: 'Graduate Certificate in Business Decision Analytics',
      issuer: 'University of Texas at Dallas',
      badgeUrl: '/assets/utd-logo.png',
      docUrl: '/assets/UTD_GradCert_BusinessDecisionAnalytics.pdf',
      validUntil: 'Awarded May 2025',
    },
    {
      name: 'Graduate Certificate in Analytics for Managers',
      issuer: 'University of Texas at Dallas',
      badgeUrl: '/assets/utd-logo.png',
      docUrl: '/assets/UTD_GradCert_AnalyticsForManagers.pdf',
      validUntil: 'Awarded May 2025',
    },
  ] as Certification[],
}
