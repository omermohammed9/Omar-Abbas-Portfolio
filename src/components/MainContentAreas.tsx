import * as React from "react"
import { motion, useAnimation } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { usePersona } from "./PersonaContext"
import { Card, CardContent } from "./ui/card"
import { IconMail, IconPhone, IconMapPin, IconBrandGithub, IconBrandLinkedin, IconBrandWhatsapp } from "@tabler/icons-react"
import FilterGroup from "./FilterGroup"
import SkillsGrid from "./SkillsGrid"
import ServicesSection from "./ServicesSection"
import Showcase from "./Showcase"
import ContactForm from "./ContactForm"
import PersonaToggle from "./PersonaToggle"
import LanguageToggle from "./LanguageToggle"
import ThemeToggle from "./ThemeToggle"

interface MainContentAreasProps {
  controls: ReturnType<typeof useAnimation>
  activeTab: string
  frontmatter: any
  profileImage?: { src: string }
  content: React.ReactNode
}

export default function MainContentAreas({ controls, activeTab, frontmatter, profileImage, content }: MainContentAreasProps) {
  const { language, isRtl, t } = useLanguage()
  const { persona } = usePersona()

  return (
    <main id="main-content" className="flex-1 min-w-0" style={{ perspective: 1000 }}>
      <motion.div
        animate={controls}
        initial={{ rotateY: 0, scale: 1, opacity: 1 }}
        className="w-full"
      >
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
                    <a href={`mailto:${frontmatter.contact}`} className="font-bold truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 -mx-1">{frontmatter.contact}</a>
                  </div>
                </div>
                {frontmatter.phone && (
                  <div className="flex items-center gap-4 p-3 rounded-2xl bg-background/40">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20"><IconPhone className="w-6 h-6 text-primary" /></div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">{t("contact.phone")}</span>
                      <a href={`tel:${frontmatter.phone}`} dir="ltr" className="font-bold text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 -mx-1">{frontmatter.phone}</a>
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
                  <a href={frontmatter.github} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-slate-800/50 hover:bg-[#24292e] text-slate-400 hover:text-white border border-slate-700 hover:border-[#24292e] shadow-xl hover:shadow-[#24292e]/30 transition-all duration-300 active:scale-90 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title={t("github")} aria-label="GitHub Profile">
                    <IconBrandGithub className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                )}
                {frontmatter.linkedin && (
                  <a href={frontmatter.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-slate-800/50 hover:bg-[#0a66c2] text-slate-400 hover:text-white border border-slate-700 hover:border-[#0a66c2] shadow-xl hover:shadow-[#0a66c2]/30 transition-all duration-300 active:scale-90 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title={t("linkedin")} aria-label="LinkedIn Profile">
                    <IconBrandLinkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                )}
                {frontmatter.whatsapp && (
                  <a href={frontmatter.whatsapp} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-slate-800/50 hover:bg-[#25D366] text-slate-400 hover:text-white border border-slate-700 hover:border-[#25D366] shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 active:scale-90 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title={t("whatsapp")} aria-label="WhatsApp Contact">
                    <IconBrandWhatsapp className="w-6 h-6 group-hover:scale-110 transition-transform" />
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
              <div className="mt-16 space-y-16">
                <SkillsGrid />
                <div className="hidden lg:block">
                  <ServicesSection />
                </div>
                <Showcase />
                <ContactForm />
              </div>
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
      </motion.div>
    </main>
  )
}
