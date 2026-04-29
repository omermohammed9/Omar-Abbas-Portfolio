import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Skill } from "@/lib/skills-data"
import { usePersona } from "./PersonaContext"
import { useLanguage } from "./LanguageContext"
import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const { persona } = usePersona()
  const { isRtl } = useLanguage()
  const [isFlipped, setIsFlipped] = React.useState(false)
  
  // Choose icon dynamically
  const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Code

  // Auto-flip based on persona, but allow manual override
  React.useEffect(() => {
    setIsFlipped(persona === "executive")
  }, [persona])

  return (
    <div 
      className="perspective-1000 w-full h-40 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => persona === 'engineer' && setIsFlipped(true)}
      onMouseLeave={() => persona === 'engineer' && setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? (isRtl ? -180 : 180) : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side (Technical) */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5 flex flex-col justify-between overflow-hidden group-hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Technical</span>
            </div>
            <div>
                <h3 className="font-bold text-foreground text-sm mb-1">{skill.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{skill.technicalDesc}</p>
            </div>
            {/* Ambient Background Tech Pattern */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <IconComponent className="w-24 h-24 rotate-12" />
            </div>
        </div>

        {/* Back Side (Business Value) */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-md p-5 flex flex-col justify-between overflow-hidden",
            isRtl ? "rotate-y-[-180deg]" : "rotate-y-[180deg]"
          )}
        >
            <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    <LucideIcons.TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Business Value</span>
            </div>
            <div>
                <h3 className="font-bold text-primary text-sm mb-1">{skill.name}</h3>
                <p className="text-xs text-foreground/80 leading-relaxed italic">"{skill.businessValue}"</p>
            </div>
             {/* Ambient Background Business Pattern */}
             <div className="absolute -bottom-2 -right-2 opacity-[0.1] text-primary">
                <LucideIcons.BarChart3 className="w-16 h-16 -rotate-12" />
            </div>
        </div>
      </motion.div>
    </div>
  )
}
