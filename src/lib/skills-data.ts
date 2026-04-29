export interface Skill {
  name: string;
  nameAr: string;
  category: "technical" | "management" | "ai";
  technicalDesc: string;
  technicalDescAr: string;
  businessValue: string;
  businessValueAr: string;
  icon: string;
}

export const skills: Skill[] = [
  {
    name: "Java & Node.js",
    nameAr: "جافا ونود جي اس",
    category: "technical",
    technicalDesc: "Microservices architecture, RBAC, and secure DAO patterns.",
    technicalDescAr: "بنية الخدمات المصغرة، التحكم في الوصول المستند إلى الأدوار، وأنماط DAO الآمنة.",
    businessValue: "Built scalable, secure backends that reduced downtime and improved system reliability.",
    businessValueAr: "بناء أنظمة خلفية قابلة للتوسع وآمنة قللت من وقت التوقف وحسنت موثوقية النظام.",
    icon: "Code"
  },
  {
    name: "SAP S/4HANA",
    nameAr: "ساب S/4HANA",
    category: "management",
    technicalDesc: "Business Process Integration and SAP Activate methodology.",
    technicalDescAr: "تكامل عمليات الأعمال ومنهجية SAP Activate.",
    businessValue: "Optimized enterprise workflows and aligned IT infrastructure with business KPIs.",
    businessValueAr: "تحسين سير عمل المؤسسة ومواءمة البنية التحتية لتكنولوجيا المعلومات مع مؤشرات الأداء الرئيسية للأعمال.",
    icon: "Briefcase"
  },
  {
    name: "PostgreSQL & MySQL",
    nameAr: "بوستجري كيو إل وماي إس كيو إل",
    category: "technical",
    technicalDesc: "Complex query optimization and database normalization.",
    technicalDescAr: "تحسين الاستعلامات المعقدة وتطبيع قواعد البيانات.",
    businessValue: "Enhanced data integrity and reporting speed for data-driven decision making.",
    businessValueAr: "تعزيز سلامة البيانات وسرعة إعداد التقارير لاتخاذ القرارات القائمة على البيانات.",
    icon: "Database"
  },
  {
    name: "AI & Prompt Engineering",
    nameAr: "الذكاء الاصطناعي وهندسة الأوامر",
    category: "ai",
    technicalDesc: "LLM API integration and automated AI-augmented workflows.",
    technicalDescAr: "تكامل واجهة برمجة تطبيقات LLM وسير العمل المؤتمت المعزز بالذكاء الاصطناعي.",
    businessValue: "Drastically reduced development time and cost through rapid prototyping and AI force-multipliers.",
    businessValueAr: "تقليل وقت وتكلفة التطوير بشكل كبير من خلال النمذجة السريعة ومضاعفات قوة الذكاء الاصطناعي.",
    icon: "Cpu"
  },
  {
    name: "React & Nuxt 3",
    nameAr: "رياكت ونكست 3",
    category: "technical",
    technicalDesc: "High-performance SSR applications with Tailwind CSS and Shadcn UI.",
    technicalDescAr: "تطبيقات SSR عالية الأداء باستخدام Tailwind CSS و Shadcn UI.",
    businessValue: "Delivered premium user experiences that increased client engagement and retention.",
    businessValueAr: "تقديم تجارب مستخدم متميزة زادت من تفاعل العملاء والاحتفاظ بهم.",
    icon: "Layers"
  },
  {
    name: "Project Coordination",
    nameAr: "تنسيق المشاريع",
    category: "management",
    technicalDesc: "Managing cross-functional teams and technical volunteer events.",
    technicalDescAr: "إدارة الفرق المتعددة الوظائف وفعاليات المتطوعين التقنيين.",
    businessValue: "Successfully delivered complex projects on time and within budget through strategic planning.",
    businessValueAr: "تقديم مشاريع معقدة بنجاح في الوقت المحدد وفي حدود الميزانية من خلال التخطيط الاستراتيجي.",
    icon: "Users"
  }
];
