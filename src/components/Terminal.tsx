import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconTerminal2, IconX, IconMinus, IconMaximize, IconSend, IconMicrophone } from "@tabler/icons-react"
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
  const { t, isRtl, language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  const [triggerConfetti, setTriggerConfetti] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [isListening, setIsListening] = React.useState(false)
  const [isServiceAvailable, setIsServiceAvailable] = React.useState(true)
  const [retryInterval, setRetryInterval] = React.useState(60000)
  const [history, setHistory] = React.useState<{role: 'user' | 'model', parts: {text: string}[]}[]>([])
  const [hasCleared, setHasCleared] = React.useState(false)
  const [logs, setLogs] = React.useState<Log[]>([])
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Initial and periodic service check
  React.useEffect(() => {
    const checkService = async () => {
      try {
        const response = await fetch('/api/chat')
        const data = await response.json()
        setIsServiceAvailable(!!data.isServiceAvailable)
        // Reset retry interval on success
        if (data.isServiceAvailable) setRetryInterval(60000)
      } catch (e) {
        setIsServiceAvailable(false)
      }
    }

    checkService()
    const interval = setInterval(checkService, retryInterval)
    return () => clearInterval(interval)
  }, [retryInterval])

  const startListening = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(isRtl ? "متصفحك لا يدعم التعرف على الصوت." : "Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleCommand(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleCommand = async (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim()
    if (!cleanCmd) return

    const newLogs: Log[] = [...logs, { type: 'input', content: cmd }]
    setLogs(newLogs)
    setInput("")

    switch (cleanCmd) {
      case 'help':
        newLogs.push({ type: 'output', content: isRtl 
          ? '💡 طريقة الاستخدام:\n- الهاتف: استخدم أزرار "اختراقات سريعة" أدناه أو الميكروفون.\n- الحاسوب: اكتب الأوامر أو اسحب النافذة.\n\nالأوامر المتاحة: help, clear, skills, bio, persona [engineer|executive], models, exit, matrix, sudo rm -rf / (أو sude rmf), hire-omar.\nيمكنك أيضاً سؤالي عن سيرتي الذاتية أو التحدث معي عبر الميكروفون!' 
          : '💡 Usage:\n- Mobile: Use the "Quick Hacks" buttons below or the microphone.\n- Desktop: Type commands or drag this window.\n\nAvailable commands: help, clear, skills, bio, persona [engineer|executive], models, exit, matrix, sudo rm -rf / (or sude rmf), hire-omar.\nYou can also ask me anything about my CV or use the mic to speak to me!' })
        setLogs([...newLogs])
        break
      case 'matrix':
        document.documentElement.classList.add('matrix-mode')
        newLogs.push({ type: 'output', content: isRtl ? 'جاري تشغيل مصفوفة الرمز...' : 'Entering the Matrix...' })
        setLogs([...newLogs])
        setTimeout(() => {
          document.documentElement.classList.remove('matrix-mode')
        }, 10000)
        break
      case 'sudo rm -rf /':
      case 'sude rmf':
        newLogs.push({ type: 'error', content: isRtl ? 'فشل النظام. جاري الحذف...' : 'System critical failure. Deleting all files...' })
        setLogs([...newLogs])
        setTimeout(() => {
          document.documentElement.classList.add('system-failure')
          setTimeout(() => {
            document.documentElement.classList.remove('system-failure')
            window.location.reload()
          }, 3000)
        }, 1000)
        break
      case 'hire-omar':
        newLogs.push({ type: 'output', content: isRtl ? 'خيار رائع! جاري فتح نموذج الاتصال...' : 'Excellent choice! Opening contact form...' })
        setLogs([...newLogs])
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
        setTriggerConfetti(true)
        setTimeout(() => setTriggerConfetti(false), 3000)
        break
      case 'clear':
        setLogs([])
        setHistory([])
        setHasCleared(true)
        return
      case 'skills':
        newLogs.push({ type: 'output', content: isRtl ? 'المهارات التقنية: جافا، نود جي اس، رياكت، نكست، ساب، إس كيو إل، هندسة الأوامر...' : 'Technical: Java, Node.js, React, Nuxt, SAP, SQL, AI Prompting...' })
        setLogs([...newLogs])
        break
      case 'bio':
        newLogs.push({ type: 'output', content: isRtl ? 'عمر عباس: مهندس تقني وظيفي يجمع بين البرمجة وإدارة الأعمال.' : 'Omar Abbas: Techno-Functional Engineer bridging Code and Business.' })
        setLogs([...newLogs])
        break
      case 'persona engineer':
      case 'persona e':
        setPersona('engineer')
        newLogs.push({ type: 'output', content: isRtl ? 'تم تغيير الشخصية إلى: مهندس. تم تحديث المظهر.' : 'Persona switched to: ENGINEER. Theme updated.' })
        setLogs([...newLogs])
        break
      case 'persona executive':
      case 'persona x':
        setPersona('executive')
        newLogs.push({ type: 'output', content: isRtl ? 'تم تغيير الشخصية إلى: تنفيذي. تم تحديث المظهر.' : 'Persona switched to: EXECUTIVE. Theme updated.' })
        setLogs([...newLogs])
        break
      case 'models':
        newLogs.push({ type: 'output', content: isRtl ? 'نماذج Gemini المتاحة: 2.5 Flash, 2.0 Flash, 2.5 Pro. يتم التبديل بينها تلقائياً عند الحاجة.' : 'Available Gemini Models: 2.5 Flash, 2.0 Flash, 2.5 Pro. Auto-switching enabled.' })
        setLogs([...newLogs])
        break
      case 'exit':
        setIsOpen(false)
        break
      default:
        // Try AI Answer
        setIsTyping(true)
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ 
              message: cmd, 
              language,
              history: history.slice(-6) // Send last 6 turns for context
            }),
            headers: { 'Content-Type': 'application/json' }
          })
          const data = await response.json()
          
          if (data.isFatal) {
            setIsServiceAvailable(false)
            setIsOpen(false)
            if (data.retryAfter) {
              setRetryInterval(data.retryAfter)
            }
          }

          if (data.reply) {
            newLogs.push({ type: 'output', content: data.reply })
            
            // Handle Magic Actions
            if (data.action) {
              console.log(`AI Triggered Action: ${data.action}`, data.value);
              
              switch (data.action) {
                case 'SET_PERSONA':
                  if (data.value === 'executive' || data.value === 'engineer') {
                    setPersona(data.value);
                  }
                  break;
                case 'SET_LANGUAGE':
                  if (data.value === 'en' || data.value === 'ar') {
                    setLanguage(data.value);
                  }
                  break;
                case 'SET_THEME':
                  if (data.value === 'dark') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                  } else if (data.value === 'light') {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                  }
                  break;
              }
            }

            // Update history
            setHistory(prev => [
              ...prev,
              { role: 'user', parts: [{ text: cmd }] },
              { role: 'model', parts: [{ text: data.reply }] }
            ])
          } else if (data.message) {
             newLogs.push({ type: 'error', content: isRtl ? `خطأ في الاتصال: ${data.message}` : `API Error: ${data.message}` })
          } else {
            newLogs.push({ type: 'error', content: isRtl ? `لم يتم العثور على الأمر: ${cmd}` : `Command not found: ${cmd}. Type 'help' for options.` })
          }
        } catch (error) {
          newLogs.push({ type: 'error', content: isRtl ? "فشل الاتصال بالمساعد الذكي." : "Error connecting to AI assistant." })
        }
        setIsTyping(false)
        setLogs([...newLogs])
    }
  }

  React.useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, isTyping])

  if (!isServiceAvailable) return null;

  return (
    <>
      {triggerConfetti && (
        <div className="fixed inset-0 pointer-events-none z-100">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              initial={{ 
                top: -10, 
                left: `${Math.random() * 100}vw`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
              }}
              animate={{ 
                top: '100vh',
                rotate: 360,
                x: [0, Math.random() * 50 - 25, 0]
              }}
              transition={{ 
                duration: Math.random() * 2 + 1,
                ease: "linear",
                repeat: 0
              }}
            />
          ))}
        </div>
      )}
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 lg:bottom-8 z-40 p-4 rounded-full bg-slate-100 dark:bg-slate-900 text-emerald-600 dark:text-emerald-500 shadow-2xl border border-emerald-500/30 hover:scale-110 active:scale-95 transition-all",
          isRtl ? "left-6" : "right-6",
          isOpen && "scale-0"
        )}
      >
        <IconTerminal2 className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                height: isMinimized ? '40px' : 'min(400px, 60vh)',
                width: 'min(92vw, 500px)'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            drag={typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches}
            dragConstraints={{ top: 0, left: -1000, right: 1000, bottom: 1000 }}
            className={cn(
              "fixed z-50 overflow-hidden bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl flex flex-col font-mono text-xs",
              isRtl ? "left-4 sm:left-6" : "right-4 sm:right-6",
              "bottom-24 lg:bottom-8"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border cursor-move">
              <div className="flex items-center gap-2">
                <IconTerminal2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-bold uppercase tracking-tighter">omarterm v1.1.0</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-accent rounded">
                  {isMinimized ? <IconMaximize className="w-3 h-3" /> : <IconMinus className="w-3 h-3" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-destructive/20 text-destructive rounded">
                  <IconX className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <>
                <ScrollArea className="flex-1 p-4" viewportRef={scrollRef}>
                  <div className="space-y-2">
                    {!hasCleared && (
                      <div className={cn(
                        "wrap-break-word whitespace-pre-wrap",
                        isRtl ? "text-right" : "text-left",
                        "text-emerald-500 dark:text-emerald-400"
                      )}>
                        {t("terminal.welcome")}
                      </div>
                    )}
                    {logs.map((log, i) => (
                      <div key={i} className={cn(
                        "wrap-break-word whitespace-pre-wrap",
                        isRtl ? "text-right" : "text-left",
                        log.type === 'input' ? "text-foreground font-bold" : 
                        log.type === 'error' ? "text-destructive" : "text-emerald-500 dark:text-emerald-400"
                      )}>
                        {log.type === 'input' && <span className="text-emerald-500 me-2">$</span>}
                        {log.content}
                      </div>
                    ))}
                    {isTyping && (
                      <div className={cn("text-emerald-500/50 italic animate-pulse", isRtl ? "text-right" : "text-left")}>
                         {isRtl ? "...جاري المعالجة" : "Processing..."}
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Easter Eggs / Quick Hacks */}
                <div className="px-3 py-2 bg-muted/20 border-t border-border flex flex-wrap gap-2 items-center" dir={isRtl ? "rtl" : "ltr"}>
                  <span className="text-xs text-muted-foreground opacity-70">
                    {isRtl ? "اختراقات سريعة:" : "Quick Hacks:"}
                  </span>
                  <button 
                    onClick={() => handleCommand('matrix')}
                    className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/30 transition-all hover:scale-105"
                  >
                    {isRtl ? "مصفوفة الرمز 🟩" : "Matrix Mode 🟩"}
                  </button>
                  <button 
                    onClick={() => handleCommand('hire-omar')}
                    className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/30 transition-all hover:scale-105"
                  >
                    {isRtl ? "وظّف عمر 🎉" : "Hire Omar 🎉"}
                  </button>
                  <button 
                    onClick={() => handleCommand('sudo rm -rf /')}
                    className="text-[10px] px-2 py-1 rounded bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/30 transition-all hover:scale-105 animate-pulse"
                  >
                    {isRtl ? "لا تنقر ☠️" : "DO NOT CLICK ☠️"}
                  </button>
                </div>

                {/* Input */}
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleCommand(input) }}
                  className="p-3 bg-muted/30 border-t border-border flex items-center gap-2"
                >
                  <label htmlFor="terminal-input" className="sr-only">
                    {isRtl ? "مدخلات الطرفية" : "Terminal input"}
                  </label>
                  <span className="text-emerald-500">$</span>
                  <input 
                    id="terminal-input"
                    name="command"
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      isListening 
                        ? (isRtl ? "...جاري الاستماع (بالعربية)" : "Listening (English)...") 
                        : (isRtl ? "اكتب أو انقر على الميكروفون للتحدث..." : "Type or click mic to speak...")
                    }
                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                    dir={isRtl ? "rtl" : "ltr"}
                  />
                  <button 
                    type="button" 
                    onClick={startListening} 
                    disabled={isTyping || isListening} 
                    aria-label={isRtl ? "التحدث (بالعربية)" : "Speak (English)"}
                    title={isRtl ? "التحدث (بالعربية)" : "Speak (English)"}
                    className={cn("p-1 transition-colors", isListening ? "text-red-500 animate-pulse" : "text-emerald-500/50 hover:text-emerald-500")}
                  >
                    <IconMicrophone className={cn("w-4 h-4", isListening && "scale-110")} />
                  </button>
                  <button type="submit" disabled={isTyping} aria-label={isRtl ? "إرسال" : "Send"}>
                    <IconSend className={cn("w-3 h-3 transition-colors", isTyping ? "text-muted" : "text-emerald-500/50 hover:text-emerald-500")} />
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
