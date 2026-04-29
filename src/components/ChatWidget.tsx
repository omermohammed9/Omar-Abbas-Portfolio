import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, User, Bot, Loader2 } from "lucide-react"
import { usePersona } from "./PersonaContext"
import { useLanguage } from "./LanguageContext"
import { chatData } from "@/lib/chat-data"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import Fuse from "fuse.js"

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const fuse = new Fuse(chatData, {
  keys: ["keywords"],
  threshold: 0.4
});

export default function ChatWidget() {
  const { persona } = usePersona()
  const { t, isRtl } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'assistant', content: t("chat.welcome") }
  ])
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = input
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000))

    const results = fuse.search(userMsg)
    let reply = ""

    if (results.length > 0) {
      reply = results[0].item.answer[persona]
    } else {
      reply = persona === 'engineer' 
        ? "I couldn't find a direct match for that in my documentation. Try asking about my tech stack or projects!"
        : "I'm not sure I have that information at hand. Please feel free to reach out to me directly for more details!"
    }

    setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    setIsTyping(false)
  }

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 lg:bottom-8 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-110 active:scale-95 transition-all ring-4 ring-primary/20",
          isRtl ? "right-6" : "left-6",
          isOpen && "scale-0"
        )}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={cn(
              "fixed z-50 w-[min(90vw,380px)] bg-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col",
              isRtl ? "right-6" : "left-6",
              "bottom-24 lg:bottom-8"
            )}
          >
            {/* Header */}
            <div className="p-5 bg-primary text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-none">Ask Omar</h3>
                  <span className="text-[10px] opacity-70 uppercase tracking-widest font-bold">AI Assistant</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-4 h-[350px]" viewportRef={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? (isRtl ? "mr-auto flex-row-reverse" : "ml-auto flex-row-reverse") : ""
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-full shrink-0 flex items-center justify-center",
                      msg.role === 'user' ? "bg-muted" : "bg-primary/10 text-primary"
                    )}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-xs leading-relaxed",
                      msg.role === 'user' ? "bg-muted rounded-tr-none" : "bg-primary/5 text-foreground border border-primary/10 rounded-tl-none"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10 rounded-tl-none flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span className="text-[10px] italic">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend() }}
              className="p-4 bg-muted/30 border-t border-border flex items-center gap-2"
            >
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                className="flex-1 bg-background border border-border rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-primary text-primary-foreground rounded-xl disabled:opacity-50 active:scale-95 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
