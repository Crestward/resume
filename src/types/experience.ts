export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  metrics?: {
    label: string;
    value: number;
    suffix: string;
  }[];
}

export const workExperiences: WorkExperience[] = [
  {
    id: 1,
    company: 'Beck-AI',
    position: 'Co-Founder',
    location: 'Lagos, Nigeria',
    duration: 'September 2025 - Present',
    startDate: '2025-09',
    endDate: 'Present',
    description: 'Architecting AI-driven models combining LLMs, multi-agent systems, and semantic search to build intelligent career guidance platforms.',
    achievements: [
      'Architecting AI-driven models combining LLMs, multi-agent systems, and semantic search',
      'Designed data pipelines and embeddings for AI models',
      'Built cloud-native backends (FastAPI + PostgreSQL) with auto-scaling, monitoring, and security compliance',
      'Integrated front-end dashboards with backend AI services',
      'Led development of personalized recommendation engines and adaptive learning systems',
      'Implemented caching, request optimization, and retrieval grounding to reduce latency and hallucinations',
      'Oversaw API integrations with external job boards, career services, and exam content providers',
      'Collaborating with coaches, educators, and employers to validate product-market fit and refine features',
    ],
    technologies: ['Python', 'LLMs', 'FastAPI', 'PostgreSQL', 'Multi-Agent Systems', 'Semantic Search'],
    metrics: [
      { label: 'AI Models', value: 10, suffix: '+' },
      { label: 'API Integrations', value: 20, suffix: '+' },
      { label: 'Latency Reduction', value: 70, suffix: '%' },
    ],
  },
  {
    id: 2,
    company: 'ZEEH AFRICA',
    position: 'Automation Software Engineer',
    location: 'Lagos, Nigeria',
    duration: 'August 2019 - July 2025',
    startDate: '2019-08',
    endDate: '2025-07',
    description: 'Built predictive analytics pipelines and reverse-engineered partner APIs to create unified data platforms that reduced operational bottlenecks by 40%.',
    achievements: [
      'Designed and deployed predictive analytics pipelines using Python, Spark, and Azure Data Lake, forecasting throughput and processing times',
      'Reduced operational bottlenecks by 40% through smarter resource planning',
      'Reverse engineered API endpoints from 8 partner apps, integrating them into central platform',
      'Enabled real-time streaming data to feed into Databricks and Azure ML pipelines',
      'Productionized 10+ ML automation scripts covering failure prediction, anomaly detection, and workflow optimization',
      'Built time series forecasting models (Prophet, ARIMA) alongside regression and classification models',
      'Developed interactive dashboards with Power BI connected to operational databases',
      'Introduced automation for recurring data engineering tasks using Python and SQL',
      'Mentored 5 colleagues on system maintenance, reverse engineering, and ML pipeline management',
    ],
    technologies: ['Python', 'Apache Spark', 'Azure', 'Databricks', 'TensorFlow', 'Scikit-Learn', 'Power BI', 'SQL'],
    metrics: [
      { label: 'Bottleneck Reduction', value: 40, suffix: '%' },
      { label: 'API Integrations', value: 8, suffix: '' },
      { label: 'ML Scripts', value: 10, suffix: '+' },
      { label: 'Team Mentored', value: 5, suffix: '' },
    ],
  },
];
