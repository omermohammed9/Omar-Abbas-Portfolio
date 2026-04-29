import * as React from "react"

export type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRtl: boolean
  t: (key: string) => string
}

const translations = {
  en: {
    "nav.preferences": "Preferences",
    "nav.persona": "Persona",
    "nav.language": "Language",
    "nav.home": "Home",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.theme": "Theme",
    "filter.all": "All",
    "filter.technical": "Technical",
    "filter.management": "Management",
    "persona.mode": "Persona Mode",
    "persona.executive": "Executive",
    "persona.engineer": "Engineer",
    "persona.desc.engineer": "Focusing on systems, code architecture, and technical execution.",
    "persona.desc.executive": "Focusing on business value, SAP integration, and strategic leadership.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "github": "GitHub",
    "linkedin": "LinkedIn",
    "site.title": "Omar Abbas | Portfolio",
    "resume.skills": "Core Competencies",
    "terminal.welcome": "Welcome to Omar's Interactive Terminal. Type 'help' to begin.",
    "chat.welcome": "Hi! I'm Omar's AI assistant. Ask me anything about his experience!",
    "chat.placeholder": "Type a question...",
    "nav.services": "Services",
    "services.title": "Specialized Techno-Functional Offerings",
    "services.web_api.title": "Custom Web & API Development",
    "services.web_api.desc": "Scalable backend systems (Node.js) and responsive frontends. using Nuxt, Astro, TypeScript, react, Next, Astro, Postresql, Supabase, TypeORM, Prisma ORM",
    "services.ai_integration.title": "AI Integration & Prototyping",
    "services.ai_integration.desc": "Workflow automation, modern AI APIs, and prompt engineering.",
    "services.ats_cv.title": "ATS CV & Professional Creation",
    "services.ats_cv.desc": "Specialized creation of ATS-friendly and professional CVs.",
    "services.ai_lectures.title": "Prompt Engineering & AI Lectures",
    "services.ai_lectures.desc": "Lectures about Prompt Engineering & use AI tools",
    "services.comm_training.title": "Professional Communication Training",
    "services.comm_training.desc": "Training for professional communication",
    "services.english_training.title": "English Language Training",
    "services.english_training.desc": "Training for English language",
    "services.email_writing.title": "Professional Email Writing",
    "services.email_writing.desc": "Training for Professional Email writing",
    "services.eq_training.title": "Emotional Intelligence Training",
    "services.eq_training.desc": "Training for Emotional intelligence",
    "services.ai_coding.title": "Coding using AI & Prompts",
    "services.ai_coding.desc": "Coding using AI, prompts, and Md files",
    "services.linkedin_audit.title": "LinkedIn Services",
    "services.linkedin_audit.desc": "Electronic services like full Linkedin profile auditing, creating, editing reviewing",
    "skill.technical": "Technical",
    "skill.business": "Business Value",
  },
  ar: {
    "nav.preferences": "التفضيلات",
    "nav.persona": "الشخصية",
    "nav.language": "اللغة",
    "nav.home": "الرئيسية",
    "nav.experience": "الخبرة",
    "nav.education": "التعليم",
    "nav.theme": "المظهر",
    "filter.all": "الكل",
    "filter.technical": "تقني",
    "filter.management": "إداري",
    "persona.mode": "وضع الشخصية",
    "persona.executive": "تنفيذي",
    "persona.engineer": "مهندس",
    "persona.desc.engineer": "التركيز على الأنظمة، بنية الكود، والتنفيذ التقني.",
    "persona.desc.executive": "التركيز على قيمة الأعمال، تكامل SAP، والقيادة الاستراتيجية.",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "الهاتف",
    "contact.location": "الموقع",
    "github": "جيت هاب",
    "linkedin": "لينكد إن",
    "site.title": "عمر عباس | معرض الأعمال",
    "resume.skills": "الكفاءات الأساسية",
    "terminal.welcome": "مرحباً بك في محطة عمر التفاعلية. اكتب 'help' للبدء.",
    "chat.welcome": "مرحباً! أنا المساعد الذكي الخاص بعمر. اسألني أي شيء عن خبرته!",
    "chat.placeholder": "اكتب سؤالاً...",
    "nav.services": "الخدمات",
    "services.title": "عروض تقنية وظيفية متخصصة",
    "services.web_api.title": "تطوير المواقع والبرمجيات المخصصة",
    "services.web_api.desc": "أنظمة خلفية قابلة للتوسع (Node.js) وواجهات أمامية مستجيبة باستخدام Nuxt و Astro و TypeScript و React و Next و Postgresql و Supabase و TypeORM و Prisma.",
    "services.ai_integration.title": "تكامل الذكاء الاصطناعي وبناء النماذج الأولية",
    "services.ai_integration.desc": "أتمتة سير العمل، واجهات برمجة تطبيقات الذكاء الاصطناعي الحديثة، وهندسة الأوامر (Prompt Engineering).",
    "services.ats_cv.title": "إنشاء السير الذاتية المهنية و ATS",
    "services.ats_cv.desc": "إنشاء متخصص للسير الذاتية الاحترافية والمتوافقة مع أنظمة تتبع المتقدمين (ATS).",
    "services.ai_lectures.title": "محاضرات هندسة الأوامر والذكاء الاصطناعي",
    "services.ai_lectures.desc": "محاضرات حول هندسة الأوامر واستخدام أدوات الذكاء الاصطناعي.",
    "services.comm_training.title": "التدريب على التواصل المهني",
    "services.comm_training.desc": "تدريب على مهارات التواصل المهني الفعال.",
    "services.english_training.title": "التدريب على اللغة الإنجليزية",
    "services.english_training.desc": "تدريب متخصص في اللغة الإنجليزية للمحترفين.",
    "services.email_writing.title": "كتابة البريد الإلكتروني المهني",
    "services.email_writing.desc": "تدريب على كتابة رسائل البريد الإلكتروني المهنية والفعالة.",
    "services.eq_training.title": "التدريب على الذكاء العاطفي",
    "services.eq_training.desc": "ورش عمل حول تطوير الذكاء العاطفي في بيئة العمل.",
    "services.ai_coding.title": "البرمجة باستخدام الذكاء الاصطناعي",
    "services.ai_coding.desc": "التدريب على البرمجة باستخدام الذكاء الاصطناعي وهندسة الأوامر وملفات Markdown.",
    "services.linkedin_audit.title": "خدمات لينكد إن",
    "services.linkedin_audit.desc": "خدمات إلكترونية تشمل التدقيق الكامل لملف لينكد إن، الإنشاء، التعديل والمراجعة.",
    "skill.technical": "تقني",
    "skill.business": "قيمة الأعمال",
  }
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>("en")

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      document.documentElement.lang = lang
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
      document.title = translations[lang]["site.title"]
      localStorage.setItem("portfolio-language", lang)
    }
  }

  React.useEffect(() => {
    const saved = localStorage.getItem("portfolio-language") as Language
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguage(saved)
    } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0]
        if (browserLang === 'ar') {
            setLanguage('ar')
        } else {
            setLanguage('en')
        }
    }
  }, [])

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  const isRtl = language === "ar"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
