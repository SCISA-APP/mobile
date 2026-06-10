export type ListingType = 'Internship' | 'Job' | 'NSS';

export type Department =
  | 'Computer Science'
  | 'Food Science'
  | 'Actuarial Science'
  | 'Environmental Science'
  | 'Optometry'
  | 'Mathematics'
  | 'Physics'
  | 'Chemistry'
  | 'Biological Science'
  | 'Statistics'
  | 'Biochemistry';

export interface Listing {
  id: string;
  company: string;
  logo?: string; // URL to company logo image
  location: string;
  role: string;
  department: Department;
  type: ListingType;
  stipend?: {
    amount: number;
    currency: string;
    period: 'monthly' | 'weekly' | 'total';
  };
  duration: string;
  deadline: string;
  description: string;
  skills: string[];
  contact: {
    email?: string;
    phone?: string;
    name?: string;
  };
  tint: string;
}

export const DEPARTMENTS: Department[] = [
  'Computer Science',
  'Food Science',
  'Actuarial Science',
  'Environmental Science',
  'Optometry',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biological Science',
  'Statistics',
  'Biochemistry',
];

export const LISTINGS: Listing[] = [
  // ── Computer Science ──────────────────────────────────────
  {
    id: '1',
    company: 'TechCorp Ghana',
    logo: "https://www.techcorp.com/images/AI_Conf_Room.webp",
    location: 'Accra, Ghana',
    role: 'Software Engineering Intern',
    department: 'Computer Science',
    type: 'Internship',
    stipend: { amount: 800, currency: 'GHS', period: 'monthly' },
    duration: '3 months',
    deadline: 'Jul 30, 2026',
    description:
      "TechCorp Ghana is a leading software development company building digital infrastructure for West Africa's growing tech ecosystem. As a Software Engineering Intern, you will work alongside experienced engineers on live production systems, contributing to both web and mobile platforms used by thousands of Ghanaians daily.\n\nYou will participate in our two-week onboarding bootcamp to get familiar with our stack — React, Node.js, and PostgreSQL — before being embedded in a product squad. Your responsibilities will include implementing new features, writing unit tests, and participating in code reviews. We follow agile sprints with weekly demos, so you will have regular opportunities to present your work to the broader team.\n\nBeyond coding, interns at TechCorp Ghana attend bi-weekly engineering talks and have access to our internal learning library with over 200 courses. We strongly believe in giving interns real ownership — you will ship code to production within your first month. Past interns have gone on to full-time roles here and at top companies across the continent.\n\nThis is a paid, on-site internship based in our Cantonments office, Accra. You will be expected to work Monday to Friday, 8 AM–5 PM.",
    skills: ['JavaScript', 'React', 'Node.js', 'Git', 'REST APIs', 'PostgreSQL'],
    contact: { email: 'internships@techcorpghana.com', phone: '+233 30 277 0001', name: 'Ama Asante (HR)' },
    tint: '#1a5fb4',
  },
  {
    id: '2',
    company: 'Hubtel',
    logo: "https://www.itedgenews.africa/wp-content/uploads/2025/06/Hubtel.jpeg",
    location: 'Accra, Ghana',
    role: 'Mobile Developer Intern',
    department: 'Computer Science',
    type: 'Internship',
    stipend: { amount: 1000, currency: 'GHS', period: 'monthly' },
    duration: '4 months',
    deadline: 'Aug 10, 2026',
    description:
      "Hubtel is Ghana's largest digital commerce platform, processing millions of transactions monthly across mobile money, payments, and food delivery. Our engineering team is behind some of the most-used apps in the country, and we are looking for a Mobile Developer Intern to join us for four months.\n\nYou will work on our consumer-facing Android or iOS application — depending on your background — fixing bugs, building UI components, and improving performance. Our mobile stack is React Native for the cross-platform app and Kotlin/Swift for platform-specific modules. You do not need experience in all of these; a strong foundation in one is enough to get started.\n\nThe internship is structured around two-week cycles: you pick up tasks from the backlog, implement them, get a code review, and ship. You will be paired with a senior engineer who conducts weekly 1:1 check-ins to guide your growth. Hubtel runs a vibrant intern programme with social events, mentorship dinners, and an end-of-term hackathon where interns present their best ideas to company leadership.\n\nWe are based in the Airport City area of Accra. Hybrid working is available after the first month.",
    skills: ['React Native', 'JavaScript', 'TypeScript', 'Mobile UI', 'Git', 'Agile'],
    contact: { email: 'talent@hubtel.com', phone: '+233 30 270 0800', name: 'Kwame Boateng (Talent)' },
    tint: '#6200EE',
  },

  // ── Food Science ───────────────────────────────────────────
  {
    id: '3',
    company: 'Kasapreko Company',
    logo: "https://kasapreko.com/storage/2024/08/STEM-Blog-FI.jpg",
    location: 'Accra, Ghana',
    role: 'Food Quality Assurance Intern',
    department: 'Food Science',
    type: 'Internship',
    stipend: { amount: 600, currency: 'GHS', period: 'monthly' },
    duration: '3 months',
    deadline: 'Jul 20, 2026',
    description:
      "Kasapreko is one of Ghana's foremost beverage manufacturers, producing a wide range of drinks enjoyed across the continent. Our Quality Assurance department ensures every product that leaves our facility meets both internal standards and national food safety regulations.\n\nAs a Food Quality Assurance Intern, you will be stationed on the production floor and in the QA laboratory, supporting daily quality checks at multiple stages of the manufacturing process. You will learn to conduct sensory evaluations, microbiological testing, and physical/chemical analysis on raw materials and finished goods. You will also assist in maintaining documentation for our ISO 22000 food safety management system.\n\nThis role is ideal for a student in the second or third year of a Food Science programme who wants hands-on manufacturing experience. You will be mentored by our lead QA technologist, attend internal training sessions on HACCP principles, and contribute to our continuous improvement register — a log of quality ideas submitted by every team member.\n\nOur facility is located in the Tema Industrial Area. Transport is provided from Accra Central daily.",
    skills: ['Food Safety', 'HACCP', 'Lab Analysis', 'ISO 22000', 'Sensory Evaluation', 'Documentation'],
    contact: { email: 'hr@kasapreko.com', phone: '+233 30 290 2222', name: 'Abena Mensah (HR)' },
    tint: '#E65100',
  },
  {
    id: '4',
    company: 'Nestlé Ghana',
    logo: "https://ghanachocolatehub.com/storage/2021/04/NESTLE-CWA.jpg",
    location: 'Tema, Ghana',
    role: 'Product Development Intern',
    department: 'Food Science',
    type: 'NSS',
    stipend: { amount: 559, currency: 'GHS', period: 'monthly' },
    duration: '12 months',
    deadline: 'Aug 31, 2026',
    description:
      "Nestlé Ghana is part of one of the world's largest food and beverage companies and has been present in Ghana for over 60 years. Our R&D team works closely with the global Nestlé network to adapt and innovate products for the West African palate.\n\nThis NSS placement is within our Product Development team at the Tema factory. You will assist food technologists in developing and reformulating products, conducting shelf-life studies, preparing lab-scale batches, and evaluating consumer sensory panels. You will gain exposure to the full product development cycle — from concept to pilot trial to production handover.\n\nNestlé Ghana offers a structured National Service experience with quarterly performance reviews, access to e-learning via the Nestlé global training platform, and networking events with other NSS staff across the company. Outstanding performers are frequently offered internship extensions or considered for future graduate roles.\n\nTransport and lunch are provided. The facility operates Monday to Friday, 7 AM–4 PM. Suitable for Food Science, Nutrition, or Home Science graduates.",
    skills: ['Product Formulation', 'Shelf-life Testing', 'Sensory Panels', 'Lab Techniques', 'GMP', 'Microsoft Excel'],
    contact: { email: 'nss@gh.nestle.com', name: 'Priscilla Owusu (NSS Coordinator)' },
    tint: '#B71C1C',
  },

  // ── Actuarial Science ──────────────────────────────────────
  {
    id: '5',
    company: 'Enterprise Group',
    logo: undefined,
    location: 'Accra, Ghana',
    role: 'Actuarial Analyst Intern',
    department: 'Actuarial Science',
    type: 'Internship',
    stipend: { amount: 900, currency: 'GHS', period: 'monthly' },
    duration: '3 months',
    deadline: 'Aug 5, 2026',
    description:
      "Enterprise Group is Ghana's leading insurance and financial services conglomerate, operating across life insurance, general insurance, asset management, and pensions. Our Actuarial department provides the mathematical backbone for pricing, reserving, and risk management across the group.\n\nAs an Actuarial Analyst Intern, you will be embedded in the Life Insurance actuarial team. Your day-to-day tasks will include data reconciliation, mortality analysis, preparation of actuarial valuation workbooks in Excel and R, and assisting in drafting regulatory returns. You will attend weekly actuarial team meetings and be assigned a Fellow of the Actuarial Society of Ghana as your supervisor.\n\nThis internship is designed to complement your professional exam journey. We will expose you to content relevant to CT1, CT3, and CT4 in practical settings. Interns receive a study-leave policy that allows up to two exam days off. Past interns have passed multiple exams while working with us and several now hold full-time analyst positions at Enterprise.\n\nOur head office is on the High Street, Accra Central, with flexible hybrid arrangements in the second half of the placement.",
    skills: ['Actuarial Modelling', 'Excel', 'R or Python', 'Statistics', 'Life Insurance Principles', 'Data Analysis'],
    contact: { email: 'actuarial.internship@enterprisegroup.com.gh', phone: '+233 30 266 7062', name: 'Frank Adu-Poku (Chief Actuary)' },
    tint: '#1B5E20',
  },
  {
    id: '6',
    company: 'National Insurance Commission',
    logo: undefined,
    location: 'Accra, Ghana',
    role: 'Actuarial Research Intern',
    department: 'Actuarial Science',
    type: 'NSS',
    stipend: { amount: 559, currency: 'GHS', period: 'monthly' },
    duration: '12 months',
    deadline: 'Sep 1, 2026',
    description:
      "The National Insurance Commission (NIC) is the regulatory body for the insurance industry in Ghana, responsible for licensing, supervision, and consumer protection. Our Actuarial and Statistics Department leads industry-wide data collection, analysis, and regulatory policy development.\n\nThis NSS placement will see you contributing to the department's research agenda. Responsibilities include compiling quarterly industry statistics, assisting in the development of regulatory guidance notes, reviewing actuarial reports submitted by insurers, and supporting the NIC's mortality table project — one of the first Ghana-specific tables to be constructed. This is genuinely impactful work that will be cited by practitioners across the industry.\n\nYou will work alongside qualified actuaries and gain unique insight into how the insurance sector is regulated. The NIC provides a structured NSS orientation programme, monthly progress reviews, and subsidised study materials for actuarial exams. The public sector environment means you will also develop skills in policy writing and stakeholder communication that are invaluable for a long career in financial services.",
    skills: ['Statistical Analysis', 'Actuarial Concepts', 'Policy Writing', 'Excel', 'Report Writing', 'Research Methods'],
    contact: { email: 'nss@nic.org.gh', phone: '+233 30 248 9900', name: 'Maame Serwah Asante (HR)' },
    tint: '#004D40',
  },

  // ── Environmental Science ──────────────────────────────────
  {
    id: '7',
    company: 'Environmental Protection Agency',
    logo: undefined,
    location: 'Accra, Ghana',
    role: 'Environmental Monitoring Intern',
    department: 'Environmental Science',
    type: 'NSS',
    stipend: { amount: 559, currency: 'GHS', period: 'monthly' },
    duration: '12 months',
    deadline: 'Sep 15, 2026',
    description:
      "The Environmental Protection Agency (EPA) of Ghana is the lead public body for environmental management and protection in the country. Our monitoring division undertakes regular assessment of air quality, water bodies, and industrial emissions across all 16 regions.\n\nAs an Environmental Monitoring NSS intern, you will support field teams in conducting environmental assessments at industrial sites, participating in water sampling along key river systems, and assisting in the preparation of Environmental Impact Assessment (EIA) review reports. You will also contribute to the EPA's public reporting database — helping ensure Ghana's environmental data is accessible and accurate.\n\nThe role involves both office work and regular field visits, so a willingness to travel is important. You will be paired with a licensed environmental scientist and receive training on EPA monitoring protocols, GIS mapping tools, and report writing. This is an exceptional opportunity to understand environmental governance in a developing-country context — skills that are increasingly valued by international organisations, NGOs, and the private sector.\n\nThe EPA head office is located in Accra. Regional postings may be available for candidates who express a preference.",
    skills: ['Environmental Monitoring', 'EIA Review', 'Field Sampling', 'GIS Basics', 'Report Writing', 'Water Quality Analysis'],
    contact: { email: 'nss@epa.gov.gh', phone: '+233 30 266 4697', name: 'Dr. Kofi Nyarko (Monitoring Division)' },
    tint: '#2E7D32',
  },

  // ── Optometry ──────────────────────────────────────────────
  {
    id: '8',
    company: 'Yeboah Eye Clinic',
    logo: undefined,
    location: 'Kumasi, Ghana',
    role: 'Optometry Clinical Intern',
    department: 'Optometry',
    type: 'Internship',
    duration: '6 months',
    deadline: 'Jul 15, 2026',
    description:
      "Yeboah Eye Clinic is one of the Ashanti Region's most respected ophthalmology and optometry centres, seeing over 150 patients weekly across its two sites in Kumasi. We provide comprehensive eye care services including refraction, contact lens fitting, low vision rehabilitation, and paediatric eye exams.\n\nOur clinical internship programme is designed for final-year or recently graduated optometry students who want supervised clinical exposure before or alongside their licensure process. Interns rotate through all clinic areas under the direct supervision of registered optometrists: conducting visual acuity tests, refractions, tonometry, and ocular health assessments. You will also participate in our monthly outreach programmes in surrounding districts, providing free screening to underserved communities.\n\nThis internship is unpaid but we provide a daily transport allowance and lunch. We accommodate a maximum of two interns per cycle, ensuring close mentorship and genuine one-on-one clinical time. Past interns have praised the programme's ability to rapidly build confidence and competence before sitting their board examinations. A strong letter of recommendation is provided to all interns who complete the programme satisfactorily.",
    skills: ['Refraction', 'Tonometry', 'Slit Lamp Use', 'Patient Communication', 'Ocular Health Assessment', 'Record Keeping'],
    contact: { email: 'info@yeboaheyeclinic.com', phone: '+233 32 202 6644', name: 'Dr. Adwoa Yeboah (Lead Optometrist)' },
    tint: '#0277BD',
  },

  // ── Mathematics ───────────────────────────────────────────
  {
    id: '9',
    company: 'Ghana Statistical Service',
    logo: undefined,
    location: 'Accra, Ghana',
    role: 'Statistical Methods Intern',
    department: 'Mathematics',
    type: 'NSS',
    stipend: { amount: 559, currency: 'GHS', period: 'monthly' },
    duration: '12 months',
    deadline: 'Sep 1, 2026',
    description:
      "The Ghana Statistical Service (GSS) is the government agency responsible for producing and disseminating official national statistics. Our work underpins policy decisions across every sector of the economy — from health to agriculture to education — and is cited by the World Bank, IMF, and United Nations.\n\nThis NSS placement is within the Methods and Standards Division, which is responsible for the statistical methodology used across GSS surveys and censuses. You will assist in reviewing and documenting survey instruments, applying quality assurance protocols to incoming data, and writing up methodological notes for publication. There is also the opportunity to contribute to ongoing analysis for the Ghana Living Standards Survey — one of the country's largest household surveys.\n\nMathematics graduates bring a rigorous quantitative foundation that complements our statistician teams. You will be expected to work with SPSS, Stata, or R, and to communicate technical findings in plain language for non-specialist audiences. GSS provides structured orientation, quarterly reviews, and study support for candidates pursuing professional statistics qualifications. This is an ideal placement for mathematics graduates considering careers in data science, public policy, or academic research.",
    skills: ['Statistical Analysis', 'R or SPSS or Stata', 'Survey Methodology', 'Data Cleaning', 'Report Writing', 'Excel'],
    contact: { email: 'nss@statsghana.gov.gh', phone: '+233 30 267 5751', name: 'Samuel Tetteh (HR)' },
    tint: '#4527A0',
  },

  // ── Physics ────────────────────────────────────────────────
  {
    id: '10',
    company: 'Atomic Energy Commission Ghana',
    logo: undefined,
    location: 'Legon, Accra',
    role: 'Nuclear Physics Intern',
    department: 'Physics',
    type: 'Internship',
    stipend: { amount: 700, currency: 'GHS', period: 'monthly' },
    duration: '3 months',
    deadline: 'Aug 20, 2026',
    description:
      "The Ghana Atomic Energy Commission (GAEC) is a research and regulatory institution that applies nuclear science and technology in medicine, agriculture, food safety, and energy planning. Our Ghana Research Reactor (GHARR-1) is one of only a handful of operational research reactors on the African continent.\n\nThis internship is based at the National Nuclear Research Institute within the GAEC campus at Legon. Interns will rotate through the Radiation Protection Institute and the Radiological and Medical Sciences Research Institute, gaining exposure to applied radiation physics in real-world settings. Tasks include radiation measurement and data logging, supporting reactor utilisation experiments, and assisting in the preparation of technical reports.\n\nAll interns undergo mandatory radiation safety training in the first week. You will be issued a personal dosimeter and work under the direct supervision of a senior physicist. This is a rare opportunity to interact with operating nuclear infrastructure, and past interns have leveraged this experience into postgraduate programmes in nuclear engineering, medical physics, and energy policy both in Ghana and abroad.\n\nThe GAEC campus is located at East Legon, Accra. Lunch and transport allowance are provided.",
    skills: ['Radiation Measurement', 'Nuclear Safety Protocols', 'Data Logging', 'Technical Report Writing', 'Laboratory Skills', 'Physics Fundamentals'],
    contact: { email: 'internships@gaec.gov.gh', phone: '+233 30 240 0309', name: 'Dr. Emmanuel Boateng (Research Institute)' },
    tint: '#37474F',
  },

  // ── Chemistry ─────────────────────────────────────────────
  {
    id: '11',
    company: 'Tobinco Pharmaceuticals',
    logo: undefined,
    location: 'Accra, Ghana',
    role: 'Analytical Chemistry Intern',
    department: 'Chemistry',
    type: 'Internship',
    stipend: { amount: 750, currency: 'GHS', period: 'monthly' },
    duration: '3 months',
    deadline: 'Jul 25, 2026',
    description:
      "Tobinco Pharmaceuticals is one of Ghana's largest pharmaceutical manufacturers, producing generic medicines distributed across West Africa. Our Quality Control Laboratory is ISO-certified and processes hundreds of samples weekly, ensuring every batch that leaves our facility is safe, effective, and compliant with FDA Ghana standards.\n\nAs an Analytical Chemistry Intern, you will be stationed in the QC Lab, working under the supervision of experienced analytical chemists. You will be trained in and expected to perform HPLC, UV-Vis spectrophotometry, titration, and dissolution testing on pharmaceutical raw materials and finished products. You will also assist in maintaining instrument logbooks and preparing batch analysis reports.\n\nThe internship follows a structured four-stage rotation — raw material testing, in-process testing, finished product testing, and stability studies — giving you a comprehensive view of pharmaceutical quality control. We hold a weekly journal club where interns present a recent paper relevant to analytical chemistry or pharmaceutical science, developing both scientific literacy and presentation skills.\n\nTobinco's manufacturing facility is in the Dzorwulu area, Accra. We provide lunch daily.",
    skills: ['HPLC', 'UV-Vis Spectrophotometry', 'Titration', 'GMP', 'Lab Safety', 'Analytical Instrumentation'],
    contact: { email: 'hr@tobincopharma.com', phone: '+233 30 276 1234', name: 'Nana Ama Osei (QC Manager)' },
    tint: '#00838F',
  },

  // ── Biological Science ────────────────────────────────────
  {
    id: '12',
    company: 'Noguchi Memorial Institute',
    logo: undefined,
    location: 'Legon, Accra',
    role: 'Biomedical Research Intern',
    department: 'Biological Science',
    type: 'Internship',
    duration: '4 months',
    deadline: 'Jul 10, 2026',
    description:
      "The Noguchi Memorial Institute for Medical Research (NMIMR) is a premier biomedical research facility affiliated with the University of Ghana, conducting high-impact research in virology, parasitology, bacteriology, and clinical trials. Our work has contributed to global understanding of diseases including malaria, HIV, and emerging viral pathogens.\n\nThis research internship is available in one of our five research departments depending on current project needs and the intern's background. You will assist researchers in laboratory protocols — DNA extraction, PCR, gel electrophoresis, ELISA — contribute to data entry and management, and attend departmental seminars. Senior interns may also be included as contributing authors on publications arising from the project.\n\nNoguchi has a proud tradition of training the next generation of Ghanaian biomedical scientists. Interns work alongside PhD students and international collaborators, creating a uniquely stimulating environment. There is no stipend for this position, but the experience is widely recognised as one of the most prestigious available to biological science students in Ghana. A letter of recommendation and certificate are provided upon successful completion.",
    skills: ['PCR', 'ELISA', 'Gel Electrophoresis', 'Lab Safety', 'Data Management', 'Scientific Writing'],
    contact: { email: 'research@noguchi.ug.edu.gh', phone: '+233 30 250 2700', name: 'Prof. Lydia Mosi (Research Office)' },
    tint: '#AD1457',
  },

  // ── Statistics ─────────────────────────────────────────────
  {
    id: '13',
    company: 'Ecobank Ghana',
    logo: undefined,
    location: 'Accra, Ghana',
    role: 'Risk & Data Analytics Intern',
    department: 'Statistics',
    type: 'Internship',
    stipend: { amount: 1000, currency: 'GHS', period: 'monthly' },
    duration: '6 months',
    deadline: 'Sep 5, 2026',
    description:
      "Ecobank Ghana is part of the pan-African Ecobank Group, operating across 35 countries. Our Risk and Analytics division is responsible for credit risk modelling, market risk measurement, and the data infrastructure that supports decision-making across the bank.\n\nAs a Risk & Data Analytics Intern, you will support the analytics team in building and validating scorecard models, cleaning and preparing large datasets, and producing regular risk dashboards for senior management. You will work primarily in Python and SQL, with some Excel. The role sits at the intersection of statistics, data engineering, and finance, making it ideal for statistics students who want to see their quantitative skills applied to real business problems.\n\nEcobank runs a formal internship programme with structured goals set at the start of each placement. You will have a designated line manager and a senior mentor from outside your team — ensuring you get both task-level guidance and broader career perspective. Monthly intern cohort events bring together interns from all departments for networking and skills workshops. Outstanding performers are considered for our graduate associate programme.",
    skills: ['Python', 'SQL', 'Statistical Modelling', 'Risk Analytics', 'Data Visualisation', 'Excel'],
    contact: { email: 'ghanaHR@ecobank.com', phone: '+233 30 268 1111', name: 'Selasie Kpodo (HR Business Partner)' },
    tint: '#00695C',
  },

  // ── Biochemistry ──────────────────────────────────────────
  {
    id: '14',
    company: 'Dannex Ayrton Starwin',
    logo: undefined,
    location: 'Accra, Ghana',
    role: 'Biochemistry Lab Intern',
    department: 'Biochemistry',
    type: 'Internship',
    stipend: { amount: 650, currency: 'GHS', period: 'monthly' },
    duration: '3 months',
    deadline: 'Aug 12, 2026',
    description:
      "Dannex Ayrton Starwin (DAS) is a leading pharmaceutical company in Ghana, manufacturing and marketing a wide range of medicines and healthcare products. Our biochemistry laboratory supports both product quality testing and early-stage research activities.\n\nThis internship will give you experience in enzyme assays, protein quantification, cell culture maintenance, and biochemical analysis of pharmaceutical compounds. You will work with HPLC, microplate readers, and centrifuges, following GMP-compliant standard operating procedures. Interns are expected to keep detailed lab notebooks and submit a technical report at the end of the placement summarising their work.\n\nDAS believes strongly in practical training. Within your first week, you will complete our in-house GMP and laboratory safety certification — a credential that is recognised across the pharmaceutical industry in Ghana. You will be supported by a senior biochemist who conducts weekly progress reviews and helps you link your practical experience to the theoretical content of your degree.\n\nOur facility is located in the Industrial Area, Accra. We offer lunch and a monthly transport contribution.",
    skills: ['Enzyme Assays', 'Protein Quantification', 'Cell Culture', 'HPLC', 'GMP Compliance', 'Lab Notebook Keeping'],
    contact: { email: 'hr@daspharmaceuticals.com', phone: '+233 30 277 8900', name: 'Joyce Asare (HR Manager)' },
    tint: '#6A1B9A',
  },
];

export const LISTINGS_BY_DEPARTMENT: Record<Department, Listing[]> = DEPARTMENTS.reduce(
  (acc, dept) => {
    acc[dept] = LISTINGS.filter((l) => l.department === dept);
    return acc;
  },
  {} as Record<Department, Listing[]>,
);