import * as React from "react"
import { useLanguage } from "./LanguageContext"
import LanguageToggle from "./LanguageToggle"
import ThemeToggle from "./ThemeToggle"
import PersonaToggle from "./PersonaToggle"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { IconMail, IconPhone, IconMapPin, IconBrandGithub, IconBrandLinkedin, IconBrandWhatsapp, IconUser, IconBriefcase, IconRocket } from "@tabler/icons-react"

interface DesktopSidebarProps {
  frontmatter: any
  profileImage?: { src: string }
}

export default function DesktopSidebar({ frontmatter, profileImage }: DesktopSidebarProps) {
  const { isRtl, t } = useLanguage()

  return (
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

        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-1">{t("nav.navigation")}</span>
          <nav className="flex flex-col gap-1">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-muted transition-colors text-sm font-medium group text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <IconUser className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              {t("nav.home")}
            </button>
            <button onClick={() => document.getElementById('resume-content')?.scrollIntoView({behavior: 'smooth'})} className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-muted transition-colors text-sm font-medium group text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <IconBriefcase className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              {t("nav.experience")}
            </button>
            <button onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})} className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-muted transition-colors text-sm font-medium group text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <IconRocket className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              {t("nav.services")}
            </button>
          </nav>
        </div>

        <Card className="glass-premium border-border backdrop-blur-2xl shadow-2xl shadow-primary/5 transition-all duration-700 hover:shadow-primary/10 hover:border-primary/20">
          <CardContent className={`p-6 text-center ${isRtl ? 'font-arabic' : ''}`}>
            <img src={profileImage?.src || "/profile.jpg"} alt="Profile" className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-border shadow-xl shadow-primary/20 ring-2 ring-primary/50 ring-offset-2 ring-offset-background transition-all duration-500" />
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2 transition-colors duration-500">{frontmatter.title}</h1>
            <p className="text-primary font-medium mb-6 transition-colors duration-500">{frontmatter.tagline}</p>

            <Separator className="bg-border mb-6" />

            <div className="space-y-4 text-sm text-muted-foreground text-start">
              <div className="flex items-center gap-3">
                <IconMail className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                <a href={`mailto:${frontmatter.contact}`} className="hover:text-foreground transition-colors truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 -mx-1">{frontmatter.contact}</a>
              </div>
              {frontmatter.phone && (
                <div className="flex items-center gap-3">
                  <IconPhone className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                  <a href={`tel:${frontmatter.phone}`} dir="ltr" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 -mx-1">{frontmatter.phone}</a>
                </div>
              )}
              <div className="flex items-center gap-3">
                <IconMapPin className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                <span>{frontmatter.location}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              {frontmatter.github && (
                <a href={frontmatter.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-[#24292e] text-slate-400 hover:text-white border border-slate-700 hover:border-[#24292e] shadow-lg hover:shadow-[#24292e]/30 transition-all duration-300 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title={t("github")} aria-label="GitHub Profile">
                  <IconBrandGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {frontmatter.linkedin && (
                <a href={frontmatter.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-[#0a66c2] text-slate-400 hover:text-white border border-slate-700 hover:border-[#0a66c2] shadow-lg hover:shadow-[#0a66c2]/30 transition-all duration-300 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title={t("linkedin")} aria-label="LinkedIn Profile">
                  <IconBrandLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {frontmatter.whatsapp && (
                <a href={frontmatter.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-[#25D366] text-slate-400 hover:text-white border border-slate-700 hover:border-[#25D366] shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title={t("whatsapp")} aria-label="WhatsApp Contact">
                  <IconBrandWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}
