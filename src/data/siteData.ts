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
    "3+ years of KPI dashboards, performance reviews, and revenue operations across 70+ locations. I make the data credible and the decisions faster.",
}

// ─── About ────────────────────────────────────────────────
export const about: AboutContent = {
  paragraphs: [
    "For the past 3+ years, I've been working closely with senior stakeholders across 70+ OEM-approved dealership service centers, all operating under a distributed B2B recurring revenue model. My day-to-day involves designing and presenting KPI dashboards that tie operational data back to things like margin, upsell conversion, and cost optimization, so the performance reviews actually lead to decisions.",
    "A big part of what I do is tracking conversion performance on value-added services, digging into billing cycles and material consumption, and sitting in on pricing and procurement discussions to make sure the numbers hold up. When reporting discrepancies come up, I work through the data to reinforce credibility and standardize KPIs across teams.",
    "On the tools side, I work across Salesforce, Tableau, Power BI, SQL, and relational database environments. I also have a graduate-level background in predictive modeling and BI architecture. What I'm really looking for is a role where analytics, stakeholder alignment, and measurable revenue impact all come together.",
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
    text: 'Python (pandas), R, React, TypeScript, Streamlit, SQLite, Relational Databases, Data Modeling, Web Scraping (BeautifulSoup), Jupyter Notebooks',
    icon: '⚙️',
  },
  {
    title: 'Pre-Sales & Commercial',
    text: 'Executive Storytelling, Stakeholder Discovery, Solution Alignment, Margin Analysis, Billing Analytics',
    icon: '🎯',
  },
  {
    title: 'ML & Data Science',
    text: 'Predictive Modeling, Classification & Regression, XGBoost, Random Forest, Feature Engineering, PCA, SHAP Explainability',
    icon: '🤖',
  },
  {
    title: 'GenAI',
    text: 'Google Gemini API, Claude Code, Prompt Engineering, LLM Integration, AI-Powered Automation, Vite, Vercel, FPDF2',
    icon: '✨',
  },
]

// ─── Experience ───────────────────────────────────────────
export const experiences: Experience[] = [
  {
    role: 'MS, Business Analytics & AI | University of Texas at Dallas',
    timeline: 'Jan 2024 – Dec 2025',
    text: 'Full-time graduate program. The ML projects, Tableau work, and most of the case studies on this site were built during this period, alongside coursework in predictive modeling, BI architecture, and applied AI.',
    bullets: [
      'Served as a certified peer mentor for the MS Business Analytics & AI cohort.',
    ],
  },
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
    featured: true,
    preview: 'https://public.tableau.com/static/images/Te/Telco_17745732908030/QuadrantAnalysis/1.png',
    title: 'Telco Customer Churn Analysis',
    summary:
      'Analyzed a 7,000+ customer dataset using Python and SQL to uncover a 26.5% churn rate, then built an interactive Tableau dashboard with a quadrant risk matrix and dynamic metric swapper for executive-ready exploration.',
    tags: ['Python', 'SQL', 'Tableau', 'Feature Engineering'],
    highlight: 'Month-to-month contracts: 42.7% churn; fiber optic: 41.9% churn.',
    problem:
      'With more than 1 in 4 customers churning (26.5%), the telecom provider needed to pinpoint which behavioral and contractual factors were driving attrition — and surface actionable retention levers like contract structure, service tier, and tenure thresholds that the business could target immediately.',
    approach: [
      'Cleaned and profiled a 7,043-customer dataset (Python/pandas), engineering features such as tenure buckets and monthly-charges brackets to expose non-obvious churn segments.',
      'Ran structured analytical queries in SQL (SQLite) to quantify churn rates across contract type, internet service, tenure cohorts, and charge tiers.',
      'Built a Churn Risk Matrix — a customer-level scatterplot (tenure vs. MonthlyCharges) with quadrant analysis overlaid to isolate the high-risk upper-left cohort: high-paying, low-tenure customers with the greatest combined revenue risk.',
      'Designed a Dynamic Metric Swapper using Tableau Parameter Actions, consolidating five categorical churn-rate views into a single chart panel for a compact, executive-ready layout.',
      'Accelerated exploratory data analysis and data profiling workflows by integrating Claude Code, maintaining strategic oversight while optimizing execution time.',
    ],
    results: [
      'Month-to-month contracts drive 42.7% churn vs. 2.8% for two-year contracts — migrating at-risk customers to longer terms is the single highest-leverage retention intervention.',
      'Fiber optic customers churn at 41.9%, nearly 2.5x the DSL rate (19.0%), signaling a retention problem in the premium service tier that pricing or quality changes should address.',
      'The 24-month tenure mark is a critical survival threshold — churn among customers with ≤6 months is 52.9%, falling to 14.0% beyond 24 months, making early-lifecycle engagement the highest-ROI retention spend.',
      'Recommended targeted contract-migration campaigns for month-to-month fiber optic customers approaching their 6-month mark, and a price-value audit of the high monthly-charge bracket.',
    ],
    documents: [],
    liveLinks: [
      { label: 'Tableau Dashboard', href: 'https://public.tableau.com/views/Telco_17745732908030/QuadrantAnalysis?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link' },
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/telco-churn/tree/main' },
    ],
    contactSubject: 'Telco Customer Churn Analysis Discussion',
  },
  {
    slug: 'telco-churn-prediction',
    title: 'Telco Customer Churn Prediction — ML Pipeline & Dashboard',
    summary:
      'Built an end-to-end ML pipeline that predicts customer churn using a hyperparameter-tuned XGBoost model with SHAP explainability, served through a live Streamlit dashboard for real-time predictions.',
    tags: ['Python', 'XGBoost', 'SHAP', 'Streamlit', 'scikit-learn'],
    highlight: '78% churn recall — contract type alone accounts for 33% of model gain.',
    problem:
      'Customer churn is one of the most costly challenges in telecom — acquiring a new customer costs 5-10x more than retaining one. The business needed a predictive model that could identify at-risk customers before cancellation, with explanations clear enough for customer success teams to act on.',
    approach: [
      'Cleaned and encoded a 7,043-customer dataset into a 29-feature model-ready matrix, applying one-hot encoding with multicollinearity removal and StandardScaler on continuous features (fit on train only to prevent leakage).',
      'Trained a baseline XGBoost classifier with class-imbalance correction (scale_pos_weight ≈ 2.77) on a stratified 80/20 split preserving the 26.5% churn rate.',
      'Tuned hyperparameters via RandomizedSearchCV (30 candidates × 3-fold CV = 90 fits), optimizing for F1 score to balance precision and recall on the minority class.',
      'Generated model-level explainability using SHAP TreeExplainer, producing beeswarm plots that show both global feature importance and directional impact on churn probability.',
      'Deployed an interactive Streamlit dashboard where users configure a customer profile via sidebar controls and receive instant churn probability, risk level, and a breakdown chart — no button press required.',
    ],
    results: [
      'Final model catches 78% of actual churners (recall), giving retention teams meaningful lead time to intervene with targeted offers before cancellation.',
      'Contract type is the single strongest predictor — month-to-month contracts drive the highest churn, making contract migration the top-ROI retention lever.',
      'Fiber optic internet ranks as the second most important feature (14.1% of model gain), signaling a satisfaction gap among premium-tier customers paying higher charges.',
      'Security and support add-ons (OnlineSecurity, TechSupport) are negatively correlated with churn, suggesting bundling these services could improve retention in high-risk segments.',
    ],
    documents: [],
    liveLinks: [
      { label: 'Streamlit App', href: 'https://telco-churn-predictionn-avveaen4nsz44zcyinqgsa.streamlit.app/' },
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/telco-churn-prediction' },
    ],
    preview: '/assets/previews/telco-churn-prediction.svg',
    contactSubject: 'Telco Churn Prediction ML Pipeline Discussion',
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
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    summary:
      'Designed and built a responsive, single-page portfolio from scratch using React 19, TypeScript, and Vite, with animated sections, a magnetic cursor, dark/light theming, and a contact form powered by Web3Forms, deployed on Vercel.',
    tags: ['React', 'TypeScript', 'Vite', 'Vercel', 'Web3Forms'],
    highlight: 'Fully responsive, animated portfolio with dark/light theming and live contact form.',
    problem:
      'Needed a polished, centralized place to present case studies, certifications, work experience, and downloadable project documents in a way that reflects both analytical depth and frontend capability.',
    approach: [
      'Structured all content in a single typed data file (siteData.ts) so every section pulls from one source of truth, making updates fast and consistent.',
      'Built reusable components for case study cards, skill marquees, timeline entries, and document cards, all driven by TypeScript interfaces for type safety.',
      'Added scroll-triggered animations, a magnetic cursor effect, and a tilt card interaction layer to create a modern, engaging browsing experience.',
      'Implemented dark and light theme support with a global context provider and CSS variables for seamless toggling.',
      'Integrated Web3Forms for a serverless contact form that delivers messages directly to email without a backend.',
    ],
    results: [
      'Live portfolio site that consolidates all projects, certifications, and experience into a single, easy-to-navigate page.',
      'Fully responsive across desktop, tablet, and mobile breakpoints.',
      'Dark/light theme toggle with persistent preference support.',
      'Contact form works out of the box with no server infrastructure, reducing maintenance overhead to zero.',
    ],
    documents: [],
    contactSubject: 'Portfolio Website Discussion',
  },
  {
    slug: 'job-eligibility-engine',
    title: 'Job Eligibility Engine & Automated CRM',
    summary:
      'Built an LLM-powered Job CRM using Python, Streamlit, Groq, and Google Gemini that scrapes job postings from any URL, scores resume fit automatically, and generates ATS-optimized tailored resumes and cover letters with zero fabricated content — tracked in a custom drag-and-drop Kanban board.',
    tags: ['Python', 'Streamlit', 'Groq', 'Gemini', 'SQLite', 'BeautifulSoup', 'FPDF2'],
    highlight: 'Dual-LLM routing (Groq + Gemini) with automatic fit scoring, a custom drag-and-drop Kanban board, and a strict zero-fabrication resume engine — all running locally for free.',
    problem:
      'Job seekers spend hours manually reading job descriptions, comparing requirements against their own experience, and rewriting resumes for each application. The process is repetitive, error-prone, and often results in either underselling relevant qualifications or accidentally overstating them. There is also no centralized way to track multiple applications across different stages.',
    approach: [
      'Built a one-click job extraction pipeline using BeautifulSoup for scraping and LLM-powered structured field extraction (title, company, location, salary, description) from any LinkedIn or Indeed URL.',
      'Implemented a dual-LLM routing layer that automatically sends short prompts (fit scoring, quick lookups) to Groq for low latency, and routes long prompts (resume generation, deep fit analysis) to Gemini — with graceful fallback between the two APIs and a daily quota tracker to stay within free-tier limits.',
      'Built a custom drag-and-drop Kanban board as a native Streamlit component using SortableJS, with real-time card moves syncing back to SQLite and fit score badges displayed on every card.',
      'Implemented a multi-step AI tailoring workflow: the LLM first analyzes fit between the master resume and the job description, surfaces a scored breakdown of strong matches and gaps, and asks the candidate targeted clarifying questions before generating anything.',
      'Enforced a strict zero-fabrication policy across all LLM prompts — every skill, metric, and claim in the tailored resume must trace back to the master resume or the candidate\'s own answers, with no invented content.',
      'Added a conversational AI edit mode so the candidate can refine the generated resume in natural language (e.g., "make the summary more concise"), and generates downloadable one-page PDFs using FPDF2 with ATS-safe formatting.',
    ],
    results: [
      'End-to-end pipeline from job URL to downloadable tailored resume and cover letter, reducing per-application prep time from hours to minutes.',
      'Custom drag-and-drop Kanban board with four pipeline stages (New, Applied, Interviewing, Rejected) and per-card fit score badges for at-a-glance prioritization.',
      'Dual-LLM backend (Groq + Gemini) with automatic prompt routing and daily quota monitoring — runs entirely on free-tier APIs.',
      'Fit analysis with scored match breakdown and iterative clarifying questions, so the generated resume is grounded in the candidate\'s actual experience.',
    ],
    documents: [],
    liveLinks: [
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/job-eligibility-engine' },
      { label: 'Streamlit App', href: 'https://job-eligibility-engine.streamlit.app/', note: 'This is just a representation of what it would look like once fully setup, it doesn\'t have any of the functionalities required for the project to work fully.' },
    ],
    preview: '/assets/previews/job-eligibility-engine.svg',
    contactSubject: 'Job Eligibility Engine Discussion',
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
      'End-to-end churn analysis (Python, SQL, Tableau) uncovering a 26.5% attrition rate, with a quadrant risk matrix and dynamic metric swapper for executive-ready exploration.',
    links: [
      { label: 'Tableau Dashboard', href: 'https://public.tableau.com/views/Telco_17745732908030/QuadrantAnalysis?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link' },
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/telco-churn/tree/main' },
    ],
  },
  {
    title: 'Telco Churn Prediction — ML Pipeline',
    description:
      'End-to-end XGBoost pipeline with SHAP explainability and a live Streamlit dashboard for real-time customer churn prediction.',
    links: [
      { label: 'Streamlit App', href: 'https://telco-churn-predictionn-avveaen4nsz44zcyinqgsa.streamlit.app/' },
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/telco-churn-prediction' },
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
  {
    title: 'Portfolio Website',
    description:
      'Responsive single-page portfolio built with React 19, TypeScript, and Vite, featuring animated sections, dark/light theming, and a Web3Forms contact form.',
    links: [],
  },
  {
    title: 'Job Eligibility Engine & Automated CRM',
    description:
      'LLM-powered Streamlit app that scrapes job postings, runs fit analysis with Gemini, and generates ATS-optimized tailored resumes and cover letters with zero fabrication, plus a Kanban pipeline for tracking applications.',
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/job-eligibility-engine' },
      { label: 'Streamlit App', href: 'https://job-eligibility-engine.streamlit.app/' },
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
