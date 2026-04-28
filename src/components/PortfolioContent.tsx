import * as React from "react"
import { PersonaProvider } from "./PersonaContext"
import { LanguageProvider, useLanguage } from "./LanguageContext"
import PersonaToggle from "./PersonaToggle"
import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"
import FilterGroup from "./FilterGroup"
import MobileMenu from "./MobileMenu"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { Mail, Phone, MapPin, Code, Globe } from "lucide-react"

interface PortfolioContentProps {
  resumeEnFrontmatter: any
  resumeArFrontmatter: any
  en: React.ReactNode
  ar: React.ReactNode
}

function PortfolioInner({ resumeEnFrontmatter, resumeArFrontmatter, en, ar }: PortfolioContentProps) {
  const { language, isRtl, t } = useLanguage()
  const frontmatter = language === "en" ? resumeEnFrontmatter : resumeArFrontmatter
  const content = language === "en" ? en : ar

  return (
    <div className={`min-h-screen bg-background transition-colors duration-500 ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Mobile Nav (Sticky Top) */}
      <div className="lg:hidden sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur transition-colors duration-500">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <img src="/profile.jpg" alt="Profile" className="w-8 h-8 rounded-full object-cover border border-primary/50 transition-all duration-500" />
            <span className="text-xl font-bold transition-colors duration-500">{frontmatter.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 relative">
        
        {/* Sidebar / Sticky Profile */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-12 space-y-8">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{t("nav.preferences")}</span>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
            <PersonaToggle />
            
            <Card className="bg-card/40 border-border backdrop-blur shadow-2xl shadow-primary/5 transition-all duration-500">
              <CardContent className={`p-6 text-center ${isRtl ? 'font-arabic' : ''}`}>
                <img src="/profile.jpg" alt="Profile" className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-border shadow-xl shadow-primary/20 ring-2 ring-primary/50 ring-offset-2 ring-offset-background transition-all duration-500" />
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2 transition-colors duration-500">{frontmatter.title}</h1>
                <p className="text-primary font-medium mb-6 transition-colors duration-500">{frontmatter.tagline}</p>
                
                <Separator className="bg-border mb-6" />

                <div className="space-y-4 text-sm text-muted-foreground text-start">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                    <a href={`mailto:${frontmatter.contact}`} className="hover:text-foreground transition-colors truncate">{frontmatter.contact}</a>
                  </div>
                  {frontmatter.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                      <a href={`tel:${frontmatter.phone}`} dir="ltr" className={`hover:text-foreground transition-colors ${isRtl ? 'text-right' : ''}`}>{frontmatter.phone}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                    <span>{frontmatter.location}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4">
                  {frontmatter.github && (
                    <a href={frontmatter.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-slate-400 border border-slate-700 hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95" title={t("github")}>
                      <Code className="w-5 h-5" />
                    </a>
                  )}
                  {frontmatter.linkedin && (
                    <a href={frontmatter.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-slate-400 border border-slate-700 hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95" title={t("linkedin")}>
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <Card className="bg-card/40 border-border backdrop-blur shadow-2xl transition-all duration-500">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <FilterGroup />
              <div key={language} id="resume-content" className={`prose prose-slate dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 dark:hover:prose-a:text-blue-300 max-w-none 
                  prose-h2:border-b prose-h2:border-border prose-h2:pb-4 prose-h2:mt-16 first:prose-h2:mt-0 prose-h2:text-3xl
                  prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4
                  prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-li:leading-relaxed ${isRtl ? 'font-arabic' : ''}`}>
                {content}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
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
