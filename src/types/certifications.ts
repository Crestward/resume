export interface Certification {
  id: number;
  title: string;
  issuer: string;
  year: number;
  description: string;
  color: string;
  verificationLink?: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    year: 2025,
    description: 'AWS Certified Solutions Architect - Designing distributed systems on AWS',
    color: '#FF9900',
    verificationLink: '#',
  },
  {
    id: 2,
    title: 'Microsoft DP-300',
    issuer: 'Microsoft',
    year: 2025,
    description: 'Azure Database Administrator Associate - Managing Azure SQL databases',
    color: '#0078D4',
    verificationLink: '#',
  },
  {
    id: 3,
    title: 'Microsoft PL-300',
    issuer: 'Microsoft',
    year: 2025,
    description: 'Power BI Data Analyst Associate - Data analysis and visualization',
    color: '#F2C811',
    verificationLink: '#',
  },
  {
    id: 4,
    title: 'Google Cybersecurity Professional',
    issuer: 'Google',
    year: 2023,
    description: 'Cybersecurity Professional Certificate - Security fundamentals and practices',
    color: '#4285F4',
    verificationLink: '#',
  },
  {
    id: 5,
    title: 'IBM Data Science Professional',
    issuer: 'IBM',
    year: 2023,
    description: 'Data Science Professional Certificate - ML, Python, and data analysis',
    color: '#0F62FE',
    verificationLink: '#',
  },
  {
    id: 6,
    title: 'Cisco Cybersecurity Essentials',
    issuer: 'Cisco',
    year: 2023,
    description: 'Cybersecurity Essentials - Network security and threat protection',
    color: '#1BA0D7',
    verificationLink: '#',
  },
  {
    id: 7,
    title: 'AWS Machine Learning Foundations',
    issuer: 'Amazon Web Services',
    year: 2023,
    description: 'Machine Learning Foundations - ML fundamentals on AWS',
    color: '#FF9900',
    verificationLink: '#',
  },
  {
    id: 8,
    title: 'Open Source Intelligence (OSINT)',
    issuer: 'Immersive Labs',
    year: 2023,
    description: 'OSINT - Intelligence gathering and analysis techniques',
    color: '#6366F1',
    verificationLink: '#',
  },
  {
    id: 9,
    title: 'Math for Corporate Finance',
    issuer: 'CFI',
    year: 2022,
    description: 'Math for Corporate Finance - Financial mathematics and modeling',
    color: '#10B981',
    verificationLink: '#',
  },
];
