import * as React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { Card, CardContent } from "./ui/card"
import { 
  IconCode, 
  IconCpu, 
  IconFileText, 
  IconPresentation, 
  IconMessage2, 
  IconLanguage, 
  IconMail, 
  IconBrain, 
  IconSparkles, 
  IconBrandLinkedin,
  IconRocket,
  IconGlobe
} from "@tabler/icons-react"

const services = [
  {
    id: "web_api",
    icon: IconGlobe,
    titleKey: "services.web_api.title",
    descKey: "services.web_api.desc",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  },
  {
    id: "ai_integration",
    icon: IconCpu,
    titleKey: "services.ai_integration.title",
    descKey: "services.ai_integration.desc",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  },
  {
    id: "ai_coding",
    icon: IconSparkles,
    titleKey: "services.ai_coding.title",
    descKey: "services.ai_coding.desc",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500"
  },
  {
    id: "ats_cv",
    icon: IconFileText,
    titleKey: "services.ats_cv.title",
    descKey: "services.ats_cv.desc",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500"
  },
  {
    id: "linkedin_audit",
    icon: IconBrandLinkedin,
    titleKey: "services.linkedin_audit.title",
    descKey: "services.linkedin_audit.desc",
    color: "from-blue-600/20 to-indigo-600/20",
    iconColor: "text-blue-600"
  },
  {
    id: "ai_lectures",
    icon: IconPresentation,
    titleKey: "services.ai_lectures.title",
    descKey: "services.ai_lectures.desc",
    color: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-500"
  },
  {
    id: "comm_training",
    icon: IconMessage2,
    titleKey: "services.comm_training.title",
    descKey: "services.comm_training.desc",
    color: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-500"
  },
  {
    id: "english_training",
    icon: IconLanguage,
    titleKey: "services.english_training.title",
    descKey: "services.english_training.desc",
    color: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-500"
  },
  {
    id: "email_writing",
    icon: IconMail,
    titleKey: "services.email_writing.title",
    descKey: "services.email_writing.desc",
    color: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-500"
  },
  {
    id: "eq_training",
    icon: IconBrain,
    titleKey: "services.eq_training.title",
    descKey: "services.eq_training.desc",
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function ServicesSection() {
  const { t, isRtl } = useLanguage()

  return (
    <section id="services" className="mt-16 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3 whitespace-nowrap">
          <IconRocket className="w-6 h-6 text-primary" />
          {t("nav.services")}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
      >
        {services.map((service) => {
          const Icon = service.icon
          return (
            <motion.div key={service.id} variants={item}>
              <Card className="group relative overflow-hidden glass-premium border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl bg-background/50 border border-border group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500 ${service.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className={`text-lg font-bold tracking-tight group-hover:text-primary transition-colors duration-300 ${isRtl ? 'font-arabic' : ''}`}>
                        {t(service.titleKey)}
                      </h3>
                      <p className={`text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 ${isRtl ? 'font-arabic' : ''}`}>
                        {t(service.descKey)}
                      </p>
                    </div>
                  </div>
                </CardContent>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
