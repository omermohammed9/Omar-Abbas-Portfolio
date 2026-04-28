import * as React from "react"
import { Menu } from "lucide-react"
import { useLanguage } from "./LanguageContext"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function MobileMenu() {
  const { t, isRtl } = useLanguage()

  return (
    <Sheet>
      <SheetTrigger className="text-slate-300 hover:bg-slate-800 hover:text-white p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400">
        <span className="sr-only">Open Menu</span>
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side={isRtl ? "right" : "left"} className="bg-background border-slate-800 text-foreground p-6 backdrop-blur-xl">
        <div className="flex flex-col space-y-6 mt-12">
          <a href="#" className="text-2xl font-semibold hover:text-blue-400 transition-all active:scale-95">{t("nav.home")}</a>
          <a href="#experience" className="text-2xl font-semibold hover:text-blue-400 transition-all active:scale-95">{t("nav.experience")}</a>
          <a href="#education" className="text-2xl font-semibold hover:text-blue-400 transition-all active:scale-95">{t("nav.education")}</a>
        </div>
      </SheetContent>
    </Sheet>
  )
}
