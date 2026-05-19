import * as React from "react"
import { useAnimation } from "framer-motion"
import { PersonaProvider, usePersona } from "./PersonaContext"
import { LanguageProvider, useLanguage } from "./LanguageContext"
import BottomNav from "./BottomNav"
import Terminal from "./Terminal"
import CustomCursor from "./CustomCursor"
import Background from "./Background"
import MobileHeader from "./MobileHeader"
import DesktopSidebar from "./DesktopSidebar"
import MainContentAreas from "./MainContentAreas"


interface PortfolioContentProps {
  resumeEnFrontmatter: any
  resumeArFrontmatter: any
  en?: React.ReactNode
  ar?: React.ReactNode
  children?: React.ReactNode
  profileImage?: { src: string }
  initialLanguage?: "en" | "ar"
}

function PortfolioInner({ resumeEnFrontmatter, resumeArFrontmatter, en, ar, profileImage }: PortfolioContentProps) {
  const { language, isRtl, t } = useLanguage()
  const { persona } = usePersona()
  const [activeTab, setActiveTab] = React.useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return window.location.hash.replace('#', '');
    }
    return "profile";
  })

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = activeTab;
    }
  }, [activeTab]);
  const frontmatter = language === "en" ? resumeEnFrontmatter : resumeArFrontmatter
  const content = language === "en" ? en : ar

  const controls = useAnimation()
  
  // Flip animation when persona changes
  React.useEffect(() => {
    const flip = async () => {
      // Rotate out and shrink slightly
      await controls.start({ rotateY: 90, scale: 0.95, opacity: 0, transition: { duration: 0.25 } })
      // By the time this awaits, CSS has likely applied the new persona styles.
      // Rotate in
      await controls.start({ rotateY: 0, scale: 1, opacity: 1, transition: { duration: 0.3 } })
    }
    flip()
  }, [persona, controls])

  // Scroll to top when tab changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <div className={`min-h-screen bg-background transition-colors duration-500 ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? "rtl" : "ltr"}>
      <Background />
      <CustomCursor />
      
      <MobileHeader frontmatter={frontmatter} profileImage={profileImage} setActiveTab={setActiveTab} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-32 lg:pb-12 flex flex-col lg:flex-row gap-12 relative">
        <DesktopSidebar frontmatter={frontmatter} profileImage={profileImage} />
        <MainContentAreas controls={controls} activeTab={activeTab} frontmatter={frontmatter} profileImage={profileImage} content={content} />
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <Terminal />
    </div>
  )
}

export default function PortfolioContent(props: PortfolioContentProps) {
  return (
    <LanguageProvider initialLanguage={props.initialLanguage}>
      <PersonaProvider>
        <PortfolioInner {...props} />
      </PersonaProvider>
    </LanguageProvider>
  )
}
