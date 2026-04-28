import * as React from "react"
import { Terminal, Briefcase } from "lucide-react"
import { usePersona } from "./PersonaContext"
import { useLanguage } from "./LanguageContext"
import { cn } from "@/lib/utils"

export default function PersonaToggle() {
  const { persona, setPersona } = usePersona()
  const { t, isRtl } = useLanguage()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground/80 font-bold px-1">
        <span>{t("persona.mode")}</span>
        <span className={cn(
          "transition-colors",
          persona === 'engineer' ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"
        )}>
          {t(`persona.${persona}`)}
        </span>
      </div>
      
      <div className="relative flex p-1 bg-muted/50 border border-border rounded-2xl backdrop-blur-sm shadow-inner group">
        {/* Animated Background Slider */}
        <div 
          className={cn(
            "absolute inset-y-1 w-[calc(50%-4px)] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg",
            persona === "engineer" 
              ? (isRtl ? "right-1" : "left-1") + " bg-emerald-600/20 border border-emerald-500/30" 
              : (isRtl ? "right-[calc(50%+1px)]" : "left-[calc(50%+1px)]") + " bg-blue-600/20 border border-blue-500/30"
          )}
        />

        <button
          onClick={() => setPersona("engineer")}
          className={cn(
            "relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold transition-all duration-300",
            persona === "engineer" ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Terminal className={cn("w-3.5 h-3.5 transition-transform duration-500", persona === 'engineer' && "scale-110")} />
          <span>{t("persona.engineer")}</span>
        </button>

        <button
          onClick={() => setPersona("executive")}
          className={cn(
            "relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold transition-all duration-300",
            persona === "executive" ? "text-blue-700 dark:text-blue-400" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Briefcase className={cn("w-3.5 h-3.5 transition-transform duration-500", persona === 'executive' && "scale-110")} />
          <span>{t("persona.executive")}</span>
        </button>
      </div>
      
      <p className="text-[11px] text-muted-foreground italic px-1 leading-tight">
        {t(`persona.desc.${persona}`)}
      </p>
    </div>
  )
}
