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
