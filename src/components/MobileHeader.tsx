import * as React from "react"
import { useLanguage } from "./LanguageContext"
import MobileMenu from "./MobileMenu"

interface MobileHeaderProps {
  frontmatter: any
  profileImage?: { src: string }
  setActiveTab: (tab: string) => void
}

export default function MobileHeader({ frontmatter, profileImage, setActiveTab }: MobileHeaderProps) {
  return (
    <header className="lg:hidden sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl transition-all duration-500 pt-safe">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={profileImage?.src || "/profile.jpg"} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none truncate max-w-[120px]">{frontmatter.title}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-tighter truncate max-w-[120px]">{frontmatter.tagline}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MobileMenu setActiveTab={setActiveTab} />
        </div>
      </div>
    </header>
  )
}
