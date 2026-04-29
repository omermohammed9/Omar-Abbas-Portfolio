import * as React from "react"
import { IconUser, IconBriefcase, IconSettings, IconRocket } from "@tabler/icons-react"
import { useLanguage } from "./LanguageContext"

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const { t, isRtl } = useLanguage()

  const tabs = [
    { id: "profile", label: t("nav.home"), icon: IconUser },
    { id: "experience", label: t("nav.experience"), icon: IconBriefcase },
    { id: "services", label: t("nav.services"), icon: IconRocket },
    { id: "settings", label: t("nav.preferences"), icon: IconSettings },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`p-1 rounded-xl transition-all duration-300 ${isActive ? "bg-primary/10 scale-110" : ""}`}>
                <Icon className={`w-6 h-6 ${isActive ? "fill-primary/20" : ""}`} />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary animate-pulse" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
