import * as React from "react"
import { skills } from "@/lib/skills-data"
import SkillCard from "./SkillCard"
import { useLanguage } from "./LanguageContext"

export default function SkillsGrid() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8 mt-16">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-black tracking-tight">{t("resume.skills")}</h2>
        <div className="h-px flex-1 bg-border/50"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </div>
  )
}
