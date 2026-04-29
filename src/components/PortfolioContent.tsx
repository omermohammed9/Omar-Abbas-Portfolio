import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PersonaProvider } from "./PersonaContext"
import { LanguageProvider, useLanguage } from "./LanguageContext"
import PersonaToggle from "./PersonaToggle"
import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"
import FilterGroup from "./FilterGroup"
import BottomNav from "./BottomNav"
import MobileMenu from "./MobileMenu"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { IconMail, IconPhone, IconMapPin, IconCode, IconGlobe, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react"
import SkillsGrid from "./SkillsGrid"
import Terminal from "./Terminal"
import ServicesSection from "./ServicesSection"
import Showcase from "./Showcase"


interface PortfolioContentProps {
  resumeEnFrontmatter: any
  resumeArFrontmatter: any
  en: React.ReactNode
  ar: React.ReactNode
  profileImage?: { src: string }
}

function PortfolioInner({ resumeEnFrontmatter, resumeArFrontmatter, en, ar, profileImage }: PortfolioContentProps) {
  const { language, isRtl, t } = useLanguage()
  const [activeTab, setActiveTab] = React.useState("profile")
  const frontmatter = language === "en" ? resumeEnFrontmatter : resumeArFrontmatter
  const content = language === "en" ? en : ar

  // Scroll to top when tab changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <div className={`min-h-screen bg-background transition-colors duration-500 ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl transition-all duration-500 pt-safe">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={profileImage?.src || "/profile.jpg"} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none truncate max-w-[120px]">{frontmatter.title}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-tighter truncate max-w-[120px]">{frontmatter.tagline}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MobileMenu />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-32 flex flex-col lg:flex-row gap-12 relative">

        {/* Desktop Sidebar (Hidden on Mobile) */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="lg:sticky lg:top-12 space-y-8">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{t("nav.preferences")}</span>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
            <PersonaToggle />

            <Card className="glass-premium border-border backdrop-blur-2xl shadow-2xl shadow-primary/5 transition-all duration-700 hover:shadow-primary/10 hover:border-primary/20">
              <CardContent className={`p-6 text-center ${isRtl ? 'font-arabic' : ''}`}>
                <img src={profileImage?.src || "/profile.jpg"} alt="Profile" className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-border shadow-xl shadow-primary/20 ring-2 ring-primary/50 ring-offset-2 ring-offset-background transition-all duration-500" />
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2 transition-colors duration-500">{frontmatter.title}</h1>
                <p className="text-primary font-medium mb-6 transition-colors duration-500">{frontmatter.tagline}</p>

                <Separator className="bg-border mb-6" />

                <div className="space-y-4 text-sm text-muted-foreground text-start">
                  <div className="flex items-center gap-3">
                    <IconMail className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                    <a href={`mailto:${frontmatter.contact}`} className="hover:text-foreground transition-colors truncate">{frontmatter.contact}</a>
                  </div>
                  {frontmatter.phone && (
                    <div className="flex items-center gap-3">
                      <IconPhone className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                      <a href={`tel:${frontmatter.phone}`} dir="ltr" className={`hover:text-foreground transition-colors ${isRtl ? 'text-right' : ''}`}>{frontmatter.phone}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <IconMapPin className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                    <span>{frontmatter.location}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4">
                  {frontmatter.github && (
                    <a href={frontmatter.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-slate-400 border border-slate-700 hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95" title={t("github")}>
                      <IconBrandGithub className="w-5 h-5" />
                    </a>
                  )}
                  {frontmatter.linkedin && (
                    <a href={frontmatter.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-slate-400 border border-slate-700 hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95" title={t("linkedin")}>
                      <IconBrandLinkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {/* Profile Tab (Mobile Only) */}
          <div className={`${activeTab === 'profile' ? 'block animate-slide-up' : 'hidden'} lg:hidden`}>
            <Card className="glass-premium border-border backdrop-blur-2xl shadow-2xl mb-8">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block mb-8">
                  <img src={profileImage?.src || "/profile.jpg"} alt="Profile" className="w-48 h-48 mx-auto rounded-full object-cover border-8 border-primary/10 shadow-2xl" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-card rounded-full shadow-lg"></div>
                </div>
                <h1 className="text-4xl font-black tracking-tighter mb-2">{frontmatter.title}</h1>
                <p className="text-primary font-bold text-lg mb-10 uppercase tracking-[0.2em]">{frontmatter.tagline}</p>

                <div className="grid grid-cols-1 gap-4 text-start bg-muted/20 p-6 rounded-[2rem] border border-border/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4 p-3 rounded-2xl bg-background/40">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20"><IconMail className="w-6 h-6 text-primary" /></div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">{t("contact.email")}</span>
                      <a href={`mailto:${frontmatter.contact}`} className="font-bold truncate">{frontmatter.contact}</a>
                    </div>
                  </div>
                  {frontmatter.phone && (
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-background/40">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20"><IconPhone className="w-6 h-6 text-primary" /></div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">{t("contact.phone")}</span>
                        <a href={`tel:${frontmatter.phone}`} dir="ltr" className="font-bold">{frontmatter.phone}</a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 p-3 rounded-2xl bg-background/40">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20"><IconMapPin className="w-6 h-6 text-primary" /></div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">{t("contact.location")}</span>
                      <span className="font-bold">{frontmatter.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-center gap-6">
                  {frontmatter.github && (
                    <a href={frontmatter.github} className="p-4 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-900/20 active:scale-90 transition-transform">
                      <IconBrandGithub className="w-6 h-6" />
                    </a>
                  )}
                  {frontmatter.linkedin && (
                    <a href={frontmatter.linkedin} className="p-4 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20 active:scale-90 transition-transform">
                      <IconBrandLinkedin className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experience Tab (Desktop always shows this, Mobile shows when active) */}
          <div className={`${activeTab === 'experience' ? 'block animate-slide-up' : 'hidden'} lg:block`}>
            <Card className="glass border-border backdrop-blur-xl shadow-2xl transition-all duration-700 hover:shadow-primary/5">
              <CardContent className="p-6 sm:p-10">
                <div className="mb-10">
                  <FilterGroup />
                </div>
                <motion.div
                  layout
                  key={language}
                  id="resume-content"
                  className={`prose prose-slate dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 dark:hover:prose-a:text-blue-300 max-w-none 
                      prose-h2:border-b prose-h2:border-border prose-h2:pb-4 prose-h2:mt-16 first:prose-h2:mt-0 prose-h2:text-3xl
                      prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4
                      prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-li:leading-relaxed ${isRtl ? 'font-arabic' : ''}`}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {content}
                </motion.div>
                <SkillsGrid />
                <ServicesSection />
                <Showcase />
              </CardContent>
            </Card>
          </div>

          {/* Services Tab (Mobile Only) */}
          <div className={`${activeTab === 'services' ? 'block animate-slide-up' : 'hidden'} lg:hidden`}>
            <Card className="glass border-border backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                <ServicesSection />
              </CardContent>
            </Card>
          </div>


          {/* Settings Tab (Mobile Only) */}
          <div className={`${activeTab === 'settings' ? 'block animate-slide-up' : 'hidden'} lg:hidden`}>
            <Card className="glass border-border backdrop-blur-xl shadow-2xl">
              <CardContent className="p-8 space-y-10">
                <h2 className="text-3xl font-black tracking-tight mb-8">{t("nav.preferences")}</h2>
                <div className="space-y-8">
                  <div className="p-6 rounded-[2rem] bg-muted/20 border border-border backdrop-blur-sm">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 block text-center">{t("nav.persona")}</label>
                    <PersonaToggle />
                  </div>
                  <div className="p-6 rounded-[2rem] bg-muted/20 border border-border backdrop-blur-sm flex items-center justify-between">
                    <span className="font-bold text-sm uppercase tracking-widest">{t("nav.language")}</span>
                    <LanguageToggle />
                  </div>
                  <div className="p-6 rounded-[2rem] bg-muted/20 border border-border backdrop-blur-sm flex items-center justify-between">
                    <span className="font-bold text-sm uppercase tracking-widest">{t("nav.theme")}</span>
                    <ThemeToggle />
                  </div>
                </div>

                <div className="pt-10 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">© 2024 Omar Abbas • Built with Astro</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <Terminal />
    </div>

  )
}

export default function PortfolioContent(props: PortfolioContentProps) {
  return (
    <LanguageProvider>
      <PersonaProvider>
        <PortfolioInner {...props} />
      </PersonaProvider>
    </LanguageProvider>
  )
}
