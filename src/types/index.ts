// Project types and interfaces

export interface Project {
  id: string;
  title: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  image?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | '3d' | 'tools';
  proficiency: number; // 0-100
  yearsOfExperience: number;
  icon?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verificationLink?: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
