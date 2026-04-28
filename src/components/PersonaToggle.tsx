import * as React from "react"
import { Terminal, Briefcase, ChevronRight, ChevronLeft } from "lucide-react"
import { usePersona } from "./PersonaContext"
import { cn } from "@/lib/utils"

export default function PersonaToggle() {
  const { persona, setPersona } = usePersona()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground/80 font-bold px-1">
        <span>Persona Mode</span>
        <span className={cn(
          "transition-colors",
          persona === 'engineer' ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"
        )}>
          {persona}
        </span>
      </div>
      
      <div className="relative flex p-1 bg-muted/50 border border-border rounded-2xl backdrop-blur-sm shadow-inner group">
        {/* Animated Background Slider */}
        <div 
          className={cn(
            "absolute inset-y-1 w-[calc(50%-4px)] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg",
            persona === "engineer" 
              ? "left-1 bg-emerald-600/20 border border-emerald-500/30" 
              : "left-[calc(50%+1px)] bg-blue-600/20 border border-blue-500/30"
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
          <span>Engineer</span>
        </button>

        <button
          onClick={() => setPersona("executive")}
          className={cn(
            "relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold transition-all duration-300",
            persona === "executive" ? "text-blue-700 dark:text-blue-400" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Briefcase className={cn("w-3.5 h-3.5 transition-transform duration-500", persona === 'executive' && "scale-110")} />
          <span>Executive</span>
        </button>
      </div>
      
      <p className="text-[11px] text-muted-foreground italic px-1 leading-tight">
        {persona === 'engineer' 
          ? "Focusing on systems, code architecture, and technical execution."
          : "Focusing on business value, SAP integration, and strategic leadership."}
      </p>
    </div>
  )
}
