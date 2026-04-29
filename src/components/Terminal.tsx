import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Send } from "lucide-react"
import { usePersona } from "./PersonaContext"
import { useLanguage } from "./LanguageContext"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Log {
  type: 'input' | 'output' | 'error';
  content: string;
}

export default function Terminal() {
  const { persona, setPersona } = usePersona()
  const { t, isRtl } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [logs, setLogs] = React.useState<Log[]>([
    { type: 'output', content: t("terminal.welcome") }
  ])
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim()
    const newLogs: Log[] = [...logs, { type: 'input', content: cmd }]

    switch (cleanCmd) {
      case 'help':
        newLogs.push({ type: 'output', content: 'Available commands: help, clear, skills, bio, persona [engineer|executive], exit' })
        break
      case 'clear':
        setLogs([])
        return
      case 'skills':
        newLogs.push({ type: 'output', content: 'Technical: Java, Node.js, React, Nuxt, SAP, SQL, AI Prompting...' })
        break
      case 'bio':
        newLogs.push({ type: 'output', content: 'Omar Abbas: Techno-Functional Engineer bridging Code and Business.' })
        break
      case 'persona engineer':
      case 'persona e':
        setPersona('engineer')
        newLogs.push({ type: 'output', content: 'Persona switched to: ENGINEER. Theme updated.' })
        break
      case 'persona executive':
      case 'persona x':
        setPersona('executive')
        newLogs.push({ type: 'output', content: 'Persona switched to: EXECUTIVE. Theme updated.' })
        break
      case 'exit':
        setIsOpen(false)
        break
      default:
        newLogs.push({ type: 'error', content: `Command not found: ${cmd}. Type 'help' for options.` })
    }

    setLogs(newLogs)
    setInput("")
  }

  React.useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 lg:bottom-8 z-40 p-4 rounded-full bg-slate-900 text-emerald-500 shadow-2xl border border-emerald-500/30 hover:scale-110 active:scale-95 transition-all",
          isRtl ? "left-6" : "right-6",
          isOpen && "scale-0"
        )}
      >
        <TerminalIcon className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                height: isMinimized ? '40px' : '400px',
                width: 'min(90vw, 500px)'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            drag
            dragConstraints={{ top: 0, left: -1000, right: 1000, bottom: 1000 }}
            className={cn(
              "fixed z-50 overflow-hidden bg-slate-950/90 backdrop-blur-xl border border-emerald-500/30 rounded-xl shadow-2xl flex flex-col font-mono text-xs",
              isRtl ? "left-6" : "right-6",
              "bottom-24 lg:bottom-8"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-white/5 cursor-move">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500/80 font-bold uppercase tracking-tighter">omarterm v1.0.4</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/5 rounded">
                  {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-red-500/20 text-red-400 rounded">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <>
                <ScrollArea className="flex-1 p-4 h-[300px]" viewportRef={scrollRef}>
                  <div className="space-y-2">
                    {logs.map((log, i) => (
                      <div key={i} className={cn(
                        log.type === 'input' ? "text-white" : 
                        log.type === 'error' ? "text-red-400" : "text-emerald-400/90"
                      )}>
                        {log.type === 'input' && <span className="text-emerald-500 mr-2">$</span>}
                        {log.content}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleCommand(input) }}
                  className="p-3 bg-black/20 border-t border-white/5 flex items-center gap-2"
                >
                  <span className="text-emerald-500">$</span>
                  <input 
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="type help..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/20"
                  />
                  <button type="submit">
                    <Send className="w-3 h-3 text-emerald-500/50 hover:text-emerald-500 transition-colors" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
