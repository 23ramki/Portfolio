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
  eyebrow: 'AI Implementation & Revenue Operations',
  title: "I'm Adithya Ramakrishnan. I build systems that close the gap between what the technology can do and what the business needs to decide.",
  summary:
    "Revenue operations, sales analytics, and a master's in Business Analytics from UT Dallas. I build systems that close the gap between what the technology can do and what the business needs to decide.",
}

// ─── About ────────────────────────────────────────────────
export const about: AboutContent = {
  paragraphs: [
    "I've worked in three different functions before grad school. Sales and marketing at Tata Hitachi, pipeline and CRM analytics at Frontier, then revenue operations at Orange Care Solutions where I ran monthly performance reviews with Dealer Principals, tracked billing cycles, and managed margin analysis for 70+ dealership service centers. Different titles, same job: make the numbers credible and the conversation worth having.",
    "I went to UT Dallas because I kept hitting a ceiling. I could frame the business problem. I couldn't build the system. So I built that layer: ML pipelines, LLM tooling, Salesforce automation, Snowflake. Not to become an engineer. To stop needing one in the room to get something shipped.",
    "I'm looking for roles in AI implementation, revenue operations, or pre-sales. Places where someone needs to scope what's actually buildable, translate it to the people writing the check, and stay in the room when it ships. That's the work I want.",
  ],
}

// ─── Stats ────────────────────────────────────────────────
export const stats: Stat[] = [
  { value: '70+', label: 'Revenue Accounts Managed' },
  { value: '12%', label: 'Cost Variance Reduction' },
  { value: '35%', label: 'Client Base Growth' },
]

// ─── Skills ───────────────────────────────────────────────
export const skills: Skill[] = [
  {
    title: 'Revenue Operations & GTM',
    text: 'Salesforce (Admin Certified), CRM Workflows, Pipeline Analysis, KPI Governance, Billing Analytics, Forecasting, Snowflake, Recurring Revenue Models',
    icon: '🔗',
  },
  {
    title: 'AI Implementation & Tooling',
    text: 'LLM APIs (Groq, Gemini, Claude), Python, Streamlit, n8n, Prompt Engineering, Workflow Automation, SQLite, API Integration',
    icon: '✨',
  },
  {
    title: 'Data & BI',
    text: 'SQL, Tableau, Power BI (DAX), Snowflake, dbt, Data Modeling, Data Visualization, ETL Design',
    icon: '📊',
  },
  {
    title: 'Pre-Sales & Solutions Consulting',
    text: 'Stakeholder Discovery, Executive Storytelling, Solution Scoping, Technical Translation, Margin Analysis, Competitive Positioning',
    icon: '🎯',
  },
  {
    title: 'ML & Predictive Analytics',
    text: 'XGBoost, SHAP Explainability, scikit-learn, Random Forest, R, Feature Engineering, Classification, Regression, PCA',
    icon: '🤖',
  },
  {
    title: 'Systems & Technical',
    text: 'React, TypeScript, Vite, Database Design, ERD, BeautifulSoup, FPDF2, Pandas, Jupyter, Dask, Vercel',
    icon: '⚙️',
  },
]

// ─── Experience ───────────────────────────────────────────
export const experiences: Experience[] = [
  {
    role: 'MS, Business Analytics & AI | University of Texas at Dallas',
    timeline: 'Jan 2024 – Dec 2025 (Graduated)',
    text: 'Full-time graduate program. The ML pipelines, LLM tooling, Salesforce configuration, and most of the case studies on this site were built here, alongside coursework in predictive modeling, BI architecture, and applied AI.',
    bullets: [
      'Served as a certified peer mentor for the MS Business Analytics & AI cohort.',
    ],
  },
  {
    role: 'Revenue Operations & Analytics Analyst | Orange Care Solutions',
    timeline: 'Oct 2022 - Jan 2024',
    text: 'Owned revenue analytics for a B2B recurring revenue business across 70+ OEM-approved dealership service centers. Monthly performance reviews, billing cycle analysis, and margin tracking. All tied directly to what Dealer Principals and Directors would do with the numbers.',
    bullets: [
      'Designed Tableau dashboards that translated CRM and operational data into revenue, margin, and SLA narratives for Dealer Principals and Directors. Built for the decision, not for the report.',
      'Analyzed 30-day recurring billing cycles and technician deployment data to surface cost variance, contributing to a 12% reduction in labor cost variance across service operations.',
    ],
  },
  {
    role: 'Sales Analyst | Frontier',
    timeline: 'Jan 2022 - Sep 2022',
    text: 'Automated weekly revenue reporting using Excel VBA and Power Query, cutting manual data entry by 25% and stabilizing the reporting foundation that quarterly planning depended on.',
    bullets: [
      'Monitored pipeline health and aligned Salesforce reporting logic with stakeholder definitions so forecasting conversations started from consistent data.',
      'Ran recurring CRM data quality audits covering stage hygiene, missing fields, and definition drift, improving leadership confidence in pipeline numbers.',
    ],
  },
  {
    role: 'Sales & Marketing Intern | Tata Hitachi',
    timeline: 'Jan 2021 - Sep 2021',
    text: 'Analyzed segmentation and GTM data to improve campaign targeting. The work contributed to a 35% client base increase and over 200% growth in event registrations.',
    bullets: [
      'Evaluated digital touchpoints to identify friction in the sales funnel and implemented UI changes that improved customer retention.',
    ],
  },
]

// ─── Case Studies ─────────────────────────────────────────
export const caseStudies: CaseStudy[] = [
  {
    slug: 'job-eligibility-engine',
    featured: true,
    title: 'Job Eligibility Engine & Automated CRM',
    summary:
      "I had a real problem: hours spent reading job descriptions, comparing requirements, and rewriting resumes for every application. I built the system to solve it. A dual-LLM pipeline that scrapes any job posting, scores resume fit, surfaces gaps, and generates an ATS-optimized tailored resume with zero fabricated content, tracked in a custom Kanban board.",
    tags: ['Python', 'Streamlit', 'Groq', 'Gemini', 'SQLite', 'BeautifulSoup', 'FPDF2'],
    highlight: 'From job URL to tailored resume in minutes. Dual-LLM routing (Groq + Gemini), drag-and-drop Kanban, and a strict zero-fabrication policy enforced at the prompt level.',
    problem:
      "Job seekers spend hours on a process that's almost entirely manual and repetitive: read the description, compare it to your experience, identify gaps, rewrite your resume, start over for the next one. The cost is time. The risk is either underselling what you have or accidentally overstating it. I built this because I needed it.",
    approach: [
      'Built a one-click job extraction pipeline using BeautifulSoup for scraping and LLM-powered structured field extraction (title, company, location, salary, description) from any LinkedIn or Indeed URL.',
      'Implemented a dual-LLM routing layer that automatically sends short prompts (fit scoring, quick lookups) to Groq for low latency, and routes long prompts (resume generation, deep fit analysis) to Gemini, with graceful fallback between APIs and a daily quota tracker to stay within free-tier limits.',
      'Built a custom drag-and-drop Kanban board as a native Streamlit component using SortableJS, with real-time card moves syncing back to SQLite and fit score badges displayed on every card.',
      'Implemented a multi-step AI tailoring workflow: the LLM first analyzes fit between the master resume and the job description, surfaces a scored breakdown of strong matches and gaps, and asks targeted clarifying questions before generating anything.',
      "Enforced a strict zero-fabrication policy across all LLM prompts. Every skill, metric, and claim in the tailored resume must trace back to the master resume or the candidate's own answers. No invented content.",
      'Added a conversational AI edit mode for natural language refinement of the generated resume, and generates downloadable one-page PDFs using FPDF2 with ATS-safe formatting.',
    ],
    results: [
      'End-to-end pipeline from job URL to downloadable tailored resume and cover letter, reducing per-application prep time from hours to minutes.',
      'Custom drag-and-drop Kanban board with four pipeline stages and per-card fit score badges for at-a-glance prioritization.',
      'Dual-LLM backend with automatic prompt routing and daily quota monitoring. Runs entirely on free-tier APIs.',
      "Fit analysis with scored match breakdown and iterative clarifying questions, so the generated resume is grounded in the candidate's actual experience.",
    ],
    documents: [],
    liveLinks: [
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/job-eligibility-engine' },
      { label: 'Streamlit App', href: 'https://job-eligibility-engine.streamlit.app/', note: 'This is a representation of what it would look like once fully set up. It does not have the API keys required for the full functionality to work.' },
    ],
    preview: '/assets/previews/job-eligibility-engine.svg',
    contactSubject: 'Job Eligibility Engine Discussion',
  },
  {
    slug: 'crm-process-automation',
    title: 'CRM Process Automation & Security Configuration',
    summary:
      'Sales teams lose hours to CRM tasks that should never be manual. I built the automation layer that eliminates them: lead conversion lifecycle automation, data quality validation at the point of entry, and role-based security that mirrors a real enterprise org hierarchy. All in Salesforce, no code.',
    tags: ['Salesforce', 'Flow Automation', 'Security', 'CRM'],
    highlight: 'Automated lead conversion lifecycle, validation rules, and enterprise-grade security model. All in Salesforce, no code.',
    problem:
      "Sales teams lose time to manual CRM tasks that should be automatic: data entry on lead conversion, chasing reps for missing fields, managing access across an org hierarchy. Most organizations treat this as a people problem. It's a systems problem. The fix is knowing how to configure the system.",
    approach: [
      'Configured Custom Objects, Fields, and Page Layouts to model the sales process inside a Salesforce developer org.',
      'Built Validation Rules to enforce data quality at the point of entry across lead and opportunity records, before bad data gets in, not after.',
      'Designed and deployed Flows to automate the Lead-to-Opportunity conversion lifecycle, eliminating the manual steps that introduce errors.',
      'Implemented role-based security using Profiles, Roles, Permission Sets, and Sharing Rules to simulate an enterprise org-chart hierarchy with appropriate data visibility at each level.',
    ],
    results: [
      'Automated lead conversion eliminates repetitive manual data entry and ensures every converted opportunity starts with complete, validated data.',
      'Validation rules enforce data integrity at the source, reducing CRM data quality issues before they compound downstream.',
      'Role-based access model mirrors real enterprise hierarchies, making the configuration template deployable in production environments.',
      'Demonstrates Salesforce Admin-level configuration capability without code, the fastest path to CRM automation for most sales teams.',
    ],
    documents: [],
    contactSubject: 'CRM Process Automation Case Study Discussion',
  },
  {
    slug: 'telco-customer-churn',
    preview: 'https://public.tableau.com/static/images/Te/Telco_17745732908030/QuadrantAnalysis/1.png',
    title: 'Telco Customer Churn Analysis',
    summary:
      'More than 1 in 4 customers were churning. I built a Python and SQL analysis pipeline to find which contract types, service tiers, and tenure cohorts drove the risk, then designed a Tableau dashboard that lets retention teams interrogate those segments without writing a single query.',
    tags: ['Python', 'SQL', 'Tableau', 'Feature Engineering'],
    highlight: 'Month-to-month contracts: 42.7% churn. Fiber optic: 41.9% churn. The 6-month tenure mark is where attrition peaks.',
    problem:
      'With 26.5% of customers churning, the telecom provider needed more than a churn rate. They needed to know which segments were most at risk, which interventions would have the highest ROI, and how to surface that clearly to the people making retention decisions without requiring them to dig through raw data.',
    approach: [
      'Cleaned and profiled a 7,043-customer dataset, engineering tenure buckets and monthly-charge brackets to expose the behavioral segments hidden in raw transaction data.',
      'Built structured SQL queries to quantify churn rates across contract type, internet service, tenure cohorts, and charge tiers, answering the specific questions a retention team would actually ask.',
      'Designed a Churn Risk Matrix: a customer-level scatterplot with quadrant overlays that isolates the highest-revenue, highest-risk cohort. High-paying, low-tenure customers with the greatest combined revenue exposure.',
      'Built a Dynamic Metric Swapper in Tableau using Parameter Actions, consolidating five categorical churn-rate views into one panel. Designed for executives who need answers in three clicks, not five dashboards.',
      'Used Claude Code to accelerate exploratory analysis workflows, keeping strategic focus on the framing and recommendations rather than the mechanics.',
    ],
    results: [
      'Month-to-month contracts drive 42.7% churn versus 2.8% for two-year contracts. Migrating at-risk customers to longer terms is the single highest-leverage retention intervention.',
      'Fiber optic customers churn at 41.9%, nearly 2.5x the DSL rate of 19.0%, signaling a retention problem in the premium service tier that pricing or quality changes should address.',
      'The 24-month tenure mark is a critical survival threshold. Churn among customers with 6 months or less is 52.9%, falling to 14.0% beyond 24 months, making early-lifecycle engagement the highest-ROI retention spend.',
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
      'Catching 78% of churners before they leave. I built an end-to-end ML pipeline on 7,043 customers, tuned an XGBoost model with SHAP explainability, and deployed a Streamlit dashboard where retention teams can test any customer profile in real time.',
    tags: ['Python', 'XGBoost', 'SHAP', 'Streamlit', 'scikit-learn'],
    highlight: '78% churn recall. Contract type drives 33% of model gain. Month-to-month customers are the single highest-risk segment.',
    problem:
      'Acquiring a new telecom customer costs 5 to 10 times more than retaining one. The business needed a model that could flag at-risk customers before they cancelled, with explanations clear enough for customer success teams to act on without a data scientist in the room.',
    approach: [
      'Cleaned and encoded a 7,043-customer dataset into a 29-feature model-ready matrix, applying one-hot encoding with multicollinearity removal and StandardScaler on continuous features, fit on train only to prevent leakage.',
      'Trained a baseline XGBoost classifier with class-imbalance correction on a stratified 80/20 split preserving the 26.5% churn rate.',
      'Tuned hyperparameters via RandomizedSearchCV across 30 candidates and 3-fold cross-validation, optimizing for F1 score to balance precision and recall on the minority class.',
      'Generated model-level explainability using SHAP TreeExplainer, producing beeswarm plots that show both global feature importance and directional impact on churn probability. Designed for a non-technical audience.',
      'Deployed an interactive Streamlit dashboard where anyone can configure a customer profile via sidebar controls and get instant churn probability, risk level, and a breakdown chart. No button press required.',
    ],
    results: [
      '78% churn recall gives retention teams meaningful lead time to intervene before cancellation. That is the metric that matters for a proactive retention program.',
      'Contract type is the single strongest predictor. Month-to-month contracts drive the highest churn, making contract migration the top-ROI retention lever.',
      'Fiber optic internet ranks second in model gain at 14.1%, signaling a satisfaction gap among premium-tier customers paying higher charges.',
      'Security and support add-ons are negatively correlated with churn, suggesting bundling these services could improve retention in high-risk segments.',
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
      'Built and evaluated four classification models to predict loan repayment failure, with a sensitivity-first decision lens designed for the cost asymmetry of credit risk. Logistic Regression won on what actually matters.',
    tags: ['R', 'Logistic Regression', 'PCA', 'Risk Analytics'],
    highlight: '99.91% accuracy, 99.58% sensitivity. Logistic Regression outperforms more complex models on the metric that matters: catching actual defaults.',
    problem:
      'In credit risk, a false negative is far more expensive than a false positive. A lender who misclassifies a defaulting loan as safe bears the full cost of that decision. The model had to be evaluated on sensitivity first, accuracy second.',
    approach: [
      'Started with 38,480 records and standardized missing-value handling.',
      'Removed 17 highly correlated columns and retained 14,094 complete observations.',
      'Applied one-hot encoding, 60/40 train-test split, and compared ZeroR, Logistic Regression, Decision Tree, and Bagging models.',
      'Evaluated all models using confusion-matrix metrics with sensitivity as the primary decision criterion, not accuracy.',
    ],
    results: [
      'Logistic Regression: 99.91% accuracy, 99.58% sensitivity. The right model for risk-sensitive lending decisions.',
      'Bagging matched accuracy at 99.91% but underperformed on sensitivity at 99.48%, making it the second choice.',
      'Decision Tree degraded to 90.55% sensitivity at 97.36% accuracy. Too much missed risk for the lending context.',
      'Recommendation: Logistic Regression for production deployment in default-risk scoring.',
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
      'Engineered 701 route-level features from 139M+ travel-time pairs and trained Random Forest and XGBoost models to predict route quality at scale. The best regression explained 86% of variance in route scores.',
    tags: ['Python', 'XGBoost', 'Random Forest', 'Optimization'],
    highlight: 'R squared 0.8626. Processed 139M+ travel-time pairs using Dask to cut feature creation from hours to seconds.',
    problem:
      'Route quality in last-mile delivery determines delivery time, driver utilization, and logistics cost. Predicting route scores at scale lets operations teams catch bad routing before trucks leave the dock, not after.',
    approach: [
      'Built features from 6,112 historical routes and 3,072 evaluation routes, processing 904,527 stop rows, 1,457,175 package rows, and 139,748,173 travel-time pairs.',
      'Used Dask-based parallelization to reduce feature creation cycle time from hours to seconds on the full dataset.',
      'Final feature matrix: 6,112 routes by 701 features, including stop-rank encoding, geographic area, and route-level aggregates.',
      'Trained and evaluated Random Forest, Ridge Regression, and XGBoost models on both route quality classification and route score regression tasks.',
    ],
    results: [
      'Random Forest Regression: RMSE 0.0969, R squared 0.8626. Best regression performance.',
      'XGBoost Classifier: 63.94% test accuracy on route quality tier prediction.',
      'Top predictors: AvgPackagesPerStop, AvgTotalTimePerStop, avg_travel_time, and GeographicArea.',
      'Dask parallelization made the 139M+ travel-time computation tractable on a single machine, a prerequisite for any real deployment at Amazon data scale.',
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
      'Designed the data architecture for a B2C insurance management platform: project charter, entity model, and SQL schema covering customers, policies, claims, billing, and agent workflows.',
    tags: ['SQL', 'Data Modeling', 'ERD', 'Documentation'],
    highlight: 'Six core entities, full DDL, and a requirements-to-schema traceability map.',
    problem:
      'Insurance operations span customers, policies, claims, billing, and agent workflows, all with different access requirements and business rules. Before building anything, the system needed a clear data model and a charter that connected business requirements to schema decisions.',
    approach: [
      'Defined project charter with objectives, scope, constraints, milestones, and risk management.',
      'Modeled six core entities: Customer, Policy, Claims, Incident, Billing, and InsuranceProvider.',
      'Drafted starter SQL DDL and test inserts to reduce implementation friction and validate schema assumptions early.',
      'Mapped requirements traceability from business rules to schema-level design artifacts.',
    ],
    results: [
      'Delivered a structured foundation for a mobile-first insurance platform with clear schema-level traceability from business requirements.',
      'Enabled development teams to start implementation with validated entity relationships and starter data.',
      'Established a reusable design artifact process: charter to ERD to DDL to test inserts.',
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
      "Delivered a consulting-style adoption strategy for Deere's 500M-acre precision-ag bet. The technology worked. The go-to-market didn't. Cost barriers, usability gaps, and farmer trust were leaving the small and mid-size farms that make up most of the market behind. Structured as a client-ready strategic advisory, not a technology assessment.",
    tags: ['Strategic Analysis', 'AI/IoT', 'Adoption Design'],
    highlight: 'Adoption strategy for a 500M-acre precision-ag bet. Small and mid-size farms were being left behind.',
    problem:
      "Deere's digital transformation strategy was built for scale. The barrier to adoption wasn't the technology. It was cost, data governance concerns, and usability gaps that made precision-ag inaccessible for the small and mid-size farms that make up most of the market.",
    approach: [
      'Analyzed Leap Ambitions strategy, autonomous machinery roadmap, IoT sensor integration, and digital platform positioning.',
      'Mapped adoption blockers by farm segment: cost barriers, retrofit feasibility, data privacy concerns, training gaps, and remote support limitations.',
      'Designed recommendations for flexible pricing models, retrofit pathways for existing equipment, training programs, and remote support infrastructure.',
    ],
    results: [
      'Delivered a client-ready adoption strategy playbook: problem scoped, market segmented by farm size, adoption barriers mapped, and go-to-market recommendations structured for executive decision-making.',
      'Balanced innovation scale with affordability, trust-building, and practical rollout feasibility across farm sizes.',
      'Structured the analysis as a go-to-market adoption problem, not just a technology assessment.',
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
      "Delivered a strategy-to-ML decision framework for a streaming platform stakeholder: which business problems are worth solving with ML, which model types fit each one, what data they require, and how to govern them responsibly. Built to drive investment decisions, not just demonstrate ML knowledge.",
    tags: ['Product Analytics', 'ML Strategy', 'Personalization'],
    highlight: 'Strategy-to-ML decision framework: recommendation, churn, content valuation, and targeted marketing.',
    problem:
      "Streaming platforms need to grow subscribers, reduce churn, and optimize content investment in a crowded market. The question isn't whether ML can help. It's which problems are worth solving with ML and how to govern those models responsibly.",
    approach: [
      "Mapped Disney+ business objectives to four ML use cases: personalized recommendation, targeted acquisition marketing, churn prediction, and content valuation modeling.",
      'Defined data inputs for each use case: viewing history, user interactions, content metadata, social sentiment, and market signals.',
      'Added model governance considerations for bias risk and responsible AI decision-making across content and audience segments.',
    ],
    results: [
      'Produced a reusable strategy-to-ML decision framework that connects business goals to specific model types and data requirements.',
      'Established a practical roadmap balancing experimentation speed with governance quality.',
      'Demonstrated how ML investment decisions should be made from business objectives down, not from available models up.',
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
      "GTM strategy analysis of a marketplace platform under margin pressure. DoorDash holds market leadership but the unit economics are tight and regulatory risk is real. This surfaces the specific levers worth pulling next and what the unit economics actually support.",
    tags: ['Product Strategy', 'KPI Design', 'SWOT', 'Execution'],
    highlight: 'Marketplace leader with unit economics pressure. The growth opportunity is in experimentation speed and dasher experience, not market share.',
    problem:
      'Delivery platforms face a three-way tension: user experience quality, dasher economic stability, and platform profitability. DoorDash holds market leadership but faces margin pressure and regulatory risk. The question is which levers to pull next.',
    approach: [
      "Reviewed DoorDash's strategy canvas, product roadmap, execution model, and investment criteria.",
      'Benchmarked competitive positioning against Uber Eats, Grubhub, and Postmates across market share, pricing, and user experience.',
      'Synthesized growth metrics, operational constraints, and user pain points into a prioritized set of improvement recommendations.',
    ],
    results: [
      'Identified three improvement levers: experimentation speed, personalization at the order level, and dasher experience design.',
      'Mapped regulatory and margin risk to specific operational choices, giving the strategy team a clear set of variables to monitor.',
      'Structured the analysis as a product and operations strategy problem, not just a competitive benchmarking exercise.',
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
      'Built this portfolio from scratch using React 19, TypeScript, and Vite. Animated sections, magnetic cursor, dark/light theming, and a contact form with no backend. Deployed on Vercel.',
    tags: ['React', 'TypeScript', 'Vite', 'Vercel', 'Web3Forms'],
    highlight: 'Fully responsive, animated portfolio with dark/light theming and live contact form.',
    problem:
      'Needed a polished, centralized place to present case studies, certifications, work experience, and downloadable project documents in a way that reflects both analytical depth and frontend capability.',
    approach: [
      'Structured all content in a single typed data file (siteData.ts) so every section pulls from one source of truth, making updates fast and consistent.',
      'Built reusable components for case study cards, skill marquees, timeline entries, and document cards, all driven by TypeScript interfaces.',
      'Added scroll-triggered animations, a magnetic cursor effect, and a tilt card interaction layer.',
      'Implemented dark and light theme support with a global context provider and CSS variables for seamless toggling.',
      'Integrated Web3Forms for a serverless contact form that delivers messages directly to email with no backend.',
    ],
    results: [
      'Live portfolio site consolidating all projects, certifications, and experience into a single navigable page.',
      'Fully responsive across desktop, tablet, and mobile.',
      'Dark/light theme toggle with persistent preference.',
      'Contact form works with no server infrastructure.',
    ],
    documents: [],
    contactSubject: 'Portfolio Website Discussion',
  },
]

// ─── Project Documents ────────────────────────────────────
export const projectDocuments: ProjectDocument[] = [
  {
    title: 'Telco Customer Churn Analysis',
    description:
      'Python and SQL churn analysis uncovering a 26.5% attrition rate, with a quadrant risk matrix and dynamic metric swapper built in Tableau for retention teams.',
    links: [
      { label: 'Tableau Dashboard', href: 'https://public.tableau.com/views/Telco_17745732908030/QuadrantAnalysis?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link' },
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/telco-churn/tree/main' },
    ],
  },
  {
    title: 'Telco Churn Prediction — ML Pipeline',
    description:
      'XGBoost pipeline with SHAP explainability and a live Streamlit dashboard for real-time customer churn prediction. 78% recall on churners.',
    links: [
      { label: 'Streamlit App', href: 'https://telco-churn-predictionn-avveaen4nsz44zcyinqgsa.streamlit.app/' },
      { label: 'GitHub Repository', href: 'https://github.com/23ramki/telco-churn-prediction' },
    ],
  },
  {
    title: 'Loan Repayment Modeling',
    description:
      'Report and presentation for loan repayment prediction in R. Sensitivity-first model evaluation for credit risk contexts.',
    links: [
      { label: 'Open Report (PDF)', href: '/assets/BA_with_R_Project_Final.pdf' },
      { label: 'Open Deck (PPTX)', href: '/assets/BA_with_R_Project_PPT.pptx' },
    ],
  },
  {
    title: 'Amazon Last Mile Routing',
    description:
      'Route feature engineering and model training across 139M+ travel-time pairs. R squared 0.8626 on route score prediction.',
    links: [
      { label: 'Open Report (PDF)', href: '/assets/AppML_Project_Group2.pdf' },
      { label: 'Open Notebook (IPYNB)', href: '/assets/route_score_prediction.ipynb' },
    ],
  },
  {
    title: 'InsurCare Database Foundation',
    description: 'Project charter and schema foundation for a B2C insurance platform. Six core entities, full DDL, requirements-to-schema traceability.',
    links: [
      { label: 'Open DOCX', href: '/assets/InsurCare_Database_Foundation.docx' },
    ],
  },
  {
    title: 'Enterprise AI Strategy Case Analyses',
    description:
      'John Deere adoption strategy and Disney+ ML roadmap. Both structured as business-first problems, not technology assessments.',
    links: [
      { label: 'Open Disney+ Analysis (PDF)', href: '/assets/Disneys_Strategic_Goals_ML_Use_Cases.pdf' },
      { label: 'Open John Deere Analysis (PDF)', href: '/assets/BUAN6335_HBR_John_Deere_Group2.pdf' },
    ],
  },
  {
    title: 'DoorDash Strategy Documents',
    description:
      'Product strategy and competitive analysis covering marketplace economics, KPI structure, SWOT, and growth levers.',
    links: [
      { label: 'Open Strategy PDF', href: '/assets/DoorDash_Delivering_Convenience.pdf' },
      { label: 'Open Presentation PDF', href: '/assets/Doordash_Presentation.pdf' },
    ],
  },
  {
    title: 'Portfolio Website',
    description:
      'Responsive portfolio built with React 19, TypeScript, and Vite. Animated sections, dark/light theming, and a Web3Forms contact form.',
    links: [],
  },
  {
    title: 'Job Eligibility Engine & Automated CRM',
    description:
      'Dual-LLM Streamlit app that scrapes job postings, scores resume fit, and generates ATS-optimized tailored resumes with zero fabrication. Includes a custom drag-and-drop Kanban pipeline.',
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
      timeline: 'Jan 2024 – Dec 2025 (Graduated)',
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
