export interface Skill {
  name: string;
  category: "technical" | "management" | "ai";
  technicalDesc: string;
  businessValue: string;
  icon: string;
}

export const skills: Skill[] = [
  {
    name: "Java & Node.js",
    category: "technical",
    technicalDesc: "Microservices architecture, RBAC, and secure DAO patterns.",
    businessValue: "Built scalable, secure backends that reduced downtime and improved system reliability.",
    icon: "Code"
  },
  {
    name: "SAP S/4HANA",
    category: "management",
    technicalDesc: "Business Process Integration and SAP Activate methodology.",
    businessValue: "Optimized enterprise workflows and aligned IT infrastructure with business KPIs.",
    icon: "Briefcase"
  },
  {
    name: "PostgreSQL & MySQL",
    category: "technical",
    technicalDesc: "Complex query optimization and database normalization.",
    businessValue: "Enhanced data integrity and reporting speed for data-driven decision making.",
    icon: "Database"
  },
  {
    name: "AI & Prompt Engineering",
    category: "ai",
    technicalDesc: "LLM API integration and automated AI-augmented workflows.",
    businessValue: "Drastically reduced development time and cost through rapid prototyping and AI force-multipliers.",
    icon: "Cpu"
  },
  {
    name: "React & Nuxt 3",
    category: "technical",
    technicalDesc: "High-performance SSR applications with Tailwind CSS and Shadcn UI.",
    businessValue: "Delivered premium user experiences that increased client engagement and retention.",
    icon: "Layers"
  },
  {
    name: "Project Coordination",
    category: "management",
    technicalDesc: "Managing cross-functional teams and technical volunteer events.",
    businessValue: "Successfully delivered complex projects on time and within budget through strategic planning.",
    icon: "Users"
  }
];
