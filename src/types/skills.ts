export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number; // 0-100
  yearsOfExperience: number;
  color: string;
  position: [number, number, number];
  connections: number[]; // IDs of related skills
}

export const skillsData: Skill[] = [
  // Data Science & ML
  { id: 1, name: 'Python', category: 'Programming', proficiency: 95, yearsOfExperience: 6, color: '#3776AB', position: [0, 0, 0], connections: [2, 3, 4, 5, 6, 7] },
  { id: 2, name: 'TensorFlow', category: 'ML Framework', proficiency: 85, yearsOfExperience: 4, color: '#FF6F00', position: [2, 1, 0], connections: [1, 3, 5] },
  { id: 3, name: 'Scikit-Learn', category: 'ML Framework', proficiency: 90, yearsOfExperience: 5, color: '#F7931E', position: [2, -1, 0], connections: [1, 2, 5] },
  { id: 4, name: 'Apache Spark', category: 'Big Data', proficiency: 88, yearsOfExperience: 5, color: '#E25A1C', position: [-2, 1, 0], connections: [1, 7, 8] },
  { id: 5, name: 'Prophet', category: 'Forecasting', proficiency: 82, yearsOfExperience: 3, color: '#4267B2', position: [1, 2, 1], connections: [1, 2, 3, 13] },
  { id: 6, name: 'ARIMA', category: 'Forecasting', proficiency: 80, yearsOfExperience: 3, color: '#00D9FF', position: [1, -2, 1], connections: [1, 5] },

  // Cloud & Data Engineering
  { id: 7, name: 'Azure', category: 'Cloud', proficiency: 90, yearsOfExperience: 5, color: '#0078D4', position: [-2, -1, 0], connections: [1, 4, 8, 9] },
  { id: 8, name: 'Databricks', category: 'Big Data', proficiency: 85, yearsOfExperience: 4, color: '#FF3621', position: [-3, 0, 1], connections: [4, 7, 1] },
  { id: 9, name: 'AWS', category: 'Cloud', proficiency: 78, yearsOfExperience: 2, color: '#FF9900', position: [-2, 0, 2], connections: [7, 1] },
  { id: 10, name: 'PostgreSQL', category: 'Database', proficiency: 85, yearsOfExperience: 4, color: '#336791', position: [0, 1, -2], connections: [1, 11, 14] },
  { id: 11, name: 'MySQL', category: 'Database', proficiency: 82, yearsOfExperience: 5, color: '#4479A1', position: [0, -1, -2], connections: [1, 10] },

  // AI & LLMs
  { id: 12, name: 'LLMs', category: 'AI', proficiency: 88, yearsOfExperience: 2, color: '#10A37F', position: [3, 0, 1], connections: [1, 13, 14] },
  { id: 13, name: 'FastAPI', category: 'Backend', proficiency: 85, yearsOfExperience: 2, color: '#009688', position: [2, 0, 2], connections: [1, 12, 10] },
  { id: 14, name: 'Semantic Search', category: 'AI', proficiency: 80, yearsOfExperience: 1, color: '#8B5CF6', position: [3, 0, -1], connections: [12, 1] },

  // Data Visualization & Analytics
  { id: 15, name: 'Power BI', category: 'Visualization', proficiency: 90, yearsOfExperience: 5, color: '#F2C811', position: [0, 2, -1], connections: [1, 16] },
  { id: 16, name: 'Tableau', category: 'Visualization', proficiency: 75, yearsOfExperience: 3, color: '#E97627', position: [0, 3, 0], connections: [15, 1] },

  // Programming Languages
  { id: 17, name: 'Scala', category: 'Programming', proficiency: 75, yearsOfExperience: 3, color: '#DC322F', position: [-1, 0, -2], connections: [1, 4] },
  { id: 18, name: 'SQL', category: 'Query Language', proficiency: 92, yearsOfExperience: 6, color: '#CC2927', position: [0, 0, -3], connections: [1, 10, 11] },

  // DevOps & Tools
  { id: 19, name: 'Git', category: 'Version Control', proficiency: 90, yearsOfExperience: 6, color: '#F05032', position: [-1, -2, 0], connections: [1] },
  { id: 20, name: 'Docker', category: 'DevOps', proficiency: 70, yearsOfExperience: 2, color: '#2496ED', position: [-1, -3, 1], connections: [1, 7, 9] },
];

export const skillCategories = [
  { name: 'Programming', color: '#3776AB' },
  { name: 'ML Framework', color: '#FF6F00' },
  { name: 'Big Data', color: '#E25A1C' },
  { name: 'Cloud', color: '#0078D4' },
  { name: 'Database', color: '#336791' },
  { name: 'AI', color: '#10A37F' },
  { name: 'Visualization', color: '#F2C811' },
  { name: 'Backend', color: '#009688' },
  { name: 'Forecasting', color: '#4267B2' },
  { name: 'Query Language', color: '#CC2927' },
  { name: 'Version Control', color: '#F05032' },
  { name: 'DevOps', color: '#2496ED' },
];
