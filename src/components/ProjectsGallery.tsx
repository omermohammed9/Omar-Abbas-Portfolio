import * as React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { Card, CardContent } from "./ui/card"
import { IconExternalLink, IconBrandGithub, IconBriefcase, IconCode, IconChartBar, IconMessage2, IconFileText } from "@tabler/icons-react"

const projects = [
  {
    id: "erp_dashboard",
    titleKey: "projects.erp_dashboard.title",
    descKey: "projects.erp_dashboard.desc",
    tech: ["React", "Astro", "Gemini API", "TailwindCSS"],
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    icon: IconChartBar,
    repo: "https://github.com/username/erp-dashboard",
    live: "https://erp-dashboard.example.com"
  },
  {
    id: "comm_hub",
    titleKey: "projects.comm_hub.title",
    descKey: "projects.comm_hub.desc",
    tech: ["Next.js", "Node.js", "WebRTC", "OpenAI"],
    gradient: "from-amber-500 via-orange-600 to-red-600",
    icon: IconMessage2,
    repo: "https://github.com/username/comm-hub",
    live: "https://comm-hub.example.com"
  },
  {
    id: "doc_processor",
    titleKey: "projects.doc_processor.title",
    descKey: "projects.doc_processor.desc",
    tech: ["Python", "FastAPI", "TensorFlow", "Astro"],
    gradient: "from-cyan-500 via-teal-600 to-emerald-600",
    icon: IconFileText,
    repo: "https://github.com/username/doc-processor",
    live: "https://doc-processor.example.com"
  }
]

export default function ProjectsGallery() {
  const { t, isRtl, language } = useLanguage()

  // Fallback data if translations are missing
  const getTitle = (project: typeof projects[0]) => {
    const key = project.titleKey
    const val = t(key)
    if (val === key) {
      // Return English fallback if translation key not found
      if (project.id === "erp_dashboard") return "AI-Powered ERP Dashboard"
      if (project.id === "comm_hub") return "Smart Communication Hub"
      if (project.id === "doc_processor") return "Automated Document Processor"
    }
    return val
  }

  const getDesc = (project: typeof projects[0]) => {
    const key = project.descKey
    const val = t(key)
    if (val === key) {
      if (project.id === "erp_dashboard") return "A sleek dashboard showing AI insights and predictive analytics for ERP systems."
      if (project.id === "comm_hub") return "A platform for communication training with real-time AI feedback and video analysis."
      if (project.id === "doc_processor") return "An automated tool that scans documents, extracts data, and populates ERP systems."
    }
    return val
  }

  return (
    <section id="projects" className="mt-16 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3 whitespace-nowrap">
          <IconBriefcase className="w-6 h-6 text-primary" />
          {t("nav.projects") !== "nav.projects" ? t("nav.projects") : (language === "ar" ? "المشاريع" : "Projects")}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const Icon = project.icon
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="group overflow-hidden glass-premium border-border/50 hover:border-primary/50 transition-all duration-500 h-full flex flex-col">
                {/* Visual Header with Gradient and Icon */}
                <div className={`h-40 bg-gradient-to-br ${project.gradient} relative flex items-center justify-center p-6 overflow-hidden`}>
                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:14px_24px]" />
                  
                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.div 
                    className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Abstract shapes */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className={`text-lg font-bold tracking-tight group-hover:text-primary transition-colors duration-300 ${isRtl ? 'font-arabic' : ''}`}>
                      {getTitle(project)}
                    </h3>
                    <p className={`text-sm text-muted-foreground leading-relaxed ${isRtl ? 'font-arabic' : ''}`}>
                      {getDesc(project)}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <a 
                      href={project.repo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                    >
                      <IconBrandGithub className="w-4 h-4" />
                      Code
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors"
                    >
                      <IconExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
