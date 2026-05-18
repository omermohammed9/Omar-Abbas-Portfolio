import * as React from "react"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { useLanguage } from "./LanguageContext"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import LanguageToggle from "./LanguageToggle"
import ThemeToggle from "./ThemeToggle"
import PersonaToggle from "./PersonaToggle"

interface MobileMenuProps {
  setActiveTab: (tab: string) => void
}

export default function MobileMenu({ setActiveTab }: MobileMenuProps) {
  const { t, isRtl } = useLanguage()
  const [open, setOpen] = React.useState(false)

  const menuItems = [
    { id: "profile", label: t("nav.home") },
    { id: "experience", label: t("nav.experience") },
    { id: "services", label: t("nav.services") },
    { id: "settings", label: t("nav.preferences") },
  ]

  const handleNav = (id: string) => {
    setActiveTab(id)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="text-muted-foreground hover:bg-muted p-2 rounded-xl transition-all active:scale-90 focus:outline-none">
        <span className="sr-only">Open Menu</span>
        <IconMenu2 className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side={isRtl ? "right" : "left"} className="bg-background/95 border-border text-foreground p-8 backdrop-blur-2xl w-[85%] sm:max-w-xs rounded-l-[2rem] rtl:rounded-r-[2rem] rtl:rounded-l-none overflow-y-auto">
        <div className="flex flex-col space-y-8 mt-12">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-black tracking-tighter uppercase">{t("nav.home")}</h2>
             <SheetClose className="p-2 rounded-full bg-muted/50">
                <IconX className="w-5 h-5" />
             </SheetClose>
          </div>
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="text-left rtl:text-right text-3xl font-black tracking-tighter hover:text-primary transition-all active:scale-95 py-2 border-b border-border/50"
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="pt-8 space-y-6">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{t("nav.preferences")}</p>
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                <div>
                  <PersonaToggle />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isRtl ? "استخدم القائمة السفلية للتنقل السريع بين الأقسام." : "Use the bottom navigation for quick access to different sections."}
                </p>
             </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
