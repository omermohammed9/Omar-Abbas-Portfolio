import * as React from "react"
import { motion } from "framer-motion"
import { usePersona } from "./PersonaContext"
import { useLanguage } from "./LanguageContext"
import { Card, CardContent } from "./ui/card"
import { IconBrain, IconPrompt, IconCode, IconRocket, IconTerminal, IconDeviceLaptop, IconServer } from "@tabler/icons-react"

export default function Showcase() {
  const { persona } = usePersona()
  const { language, isRtl } = useLanguage()

  if (persona !== "engineer") return null

  const steps = [
    {
      id: "prompt",
      icon: <IconPrompt className="w-8 h-8" />,
      labelEn: "AI Prompting",
      labelAr: "هندسة الأوامر",
      color: "bg-amber-500/20 text-amber-500",
    },
    {
      id: "dev",
      icon: <IconCode className="w-8 h-8" />,
      labelEn: "Rapid Development",
      labelAr: "تطوير سريع",
      color: "bg-blue-500/20 text-blue-500",
    },
    {
      id: "deploy",
      icon: <IconRocket className="w-8 h-8" />,
      labelEn: "Robust Deployment",
      labelAr: "نشر الأنظمة",
      color: "bg-emerald-500/20 text-emerald-500",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-12 space-y-8"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary">
          <IconBrain className="w-6 h-6 animate-pulse" />
          <h3 className="text-2xl font-bold tracking-tight">
            {language === "en" ? "AI-Accelerated Engineering" : "الهندسة المعززة بالذكاء الاصطناعي"}
          </h3>
        </div>
        <p className="text-muted-foreground">
          {language === "en" 
            ? "How I leverage advanced AI and Prompt Engineering to build modern, high-performance web systems." 
            : "كيف أوظف الذكاء الاصطناعي المتقدم وهندسة الأوامر لبناء أنظمة ويب حديثة وعالية الأداء."}
        </p>
      </div>

      {/* AI Flow Diagram */}
      <Card className="glass-premium border-primary/10 overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-amber-500/50 via-blue-500/50 to-emerald-500/50 -translate-y-1/2 -z-10">
              <motion.div 
                className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                initial={{ width: "0%", left: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center gap-4 z-10"
              >
                <div className={`p-6 rounded-2xl ${step.color} border border-current/20 shadow-lg backdrop-blur-md transition-transform hover:scale-110`}>
                  {step.icon}
                </div>
                <span className="font-bold text-sm text-center">
                  {language === "en" ? step.labelEn : step.labelAr}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code & Logic Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-950 border-slate-800 text-slate-300 font-mono text-xs overflow-hidden group">
          <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 group-hover:bg-red-500/50 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 group-hover:bg-amber-500/50 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/50 transition-colors" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-500">modern-architecture.ts</span>
          </div>
          <CardContent className="p-4">
            <pre className="overflow-x-auto">
              <code>{`// AI-optimized Backend Logic
export async function createSystem() {
  const blueprint = await AI.generateBlueprint({
    techStack: ['Astro', 'React', 'NodeJS'],
    features: ['Real-time', 'Bilingual', 'ERP-Bridge']
  });

  return deploy(blueprint);
}`}</code>
            </pre>
          </CardContent>
        </Card>

        <div className="flex flex-col justify-center gap-4 p-6 rounded-3xl bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-3 text-primary">
            <IconTerminal className="w-5 h-5" />
            <h4 className="font-bold uppercase tracking-tighter">Techno-Functional Bridge</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {language === "en" 
              ? "I specialize in building bridges between complex business requirements (ERP/SAP) and high-performance digital solutions. My expertise in AI allows me to translate business logic into code with extreme speed and precision."
              : "أنا متخصص في بناء الجسور بين متطلبات الأعمال المعقدة (ERP/SAP) والحلول الرقمية عالية الأداء. تتيح لي خبرتي في الذكاء الاصطناعي ترجمة منطق الأعمال إلى برمجيات بسرعة ودقة فائقتين."}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold border border-amber-500/20">PROMPT ENG</span>
            <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-[10px] font-bold border border-blue-500/20">REACT/NEXT</span>
            <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-500 text-[10px] font-bold border border-purple-500/20">NODE.JS</span>
            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20">ERP ADMIN</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
