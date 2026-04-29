import * as React from "react"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { useLanguage } from "./LanguageContext"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export default function MobileMenu() {
  const { t, isRtl } = useLanguage()
  const [open, setOpen] = React.useState(false)

  const menuItems = [
    { href: "#", label: t("nav.home") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#services", label: t("nav.services") },
    { href: "#education", label: t("nav.education") },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="text-muted-foreground hover:bg-muted p-2 rounded-xl transition-all active:scale-90 focus:outline-none">
        <span className="sr-only">Open Menu</span>
        <IconMenu2 className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side={isRtl ? "right" : "left"} className="bg-background/95 border-border text-foreground p-8 backdrop-blur-2xl w-[85%] sm:max-w-xs rounded-l-[2rem] rtl:rounded-r-[2rem] rtl:rounded-l-none">
        <div className="flex flex-col space-y-8 mt-12">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-black tracking-tighter uppercase">{t("nav.home")}</h2>
             <SheetClose className="p-2 rounded-full bg-muted/50">
                <IconX className="w-5 h-5" />
             </SheetClose>
          </div>
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                onClick={() => setOpen(false)}
                className="text-3xl font-black tracking-tighter hover:text-primary transition-all active:scale-95 py-2 border-b border-border/50"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-12 space-y-6">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{t("nav.preferences")}</p>
             <div className="grid grid-cols-1 gap-4">
                {/* We can add quick toggles here if needed */}
             </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
