import React from "react"
import { usePersona } from "./PersonaContext"
import { useLanguage } from "./LanguageContext"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function FilterGroup() {
  const [filter, setFilter] = React.useState<string>("All")
  const { persona } = usePersona()
  const { language, t, isRtl } = useLanguage()

  const activeColor = persona === "engineer" ? "data-[state=on]:bg-emerald-600" : "data-[state=on]:bg-blue-600"

  React.useEffect(() => {
    const container = document.getElementById("resume-content")
    if (!container) return

    const headers = container.querySelectorAll("h3")
    
    headers.forEach((h3) => {
      // Always use current textContent for filtering to handle language changes
      const tags = h3.textContent || ""
      
      let isMatch = false
      if (filter === "All") {
        isMatch = true
      } else if (filter === "Technical" && tags.includes("[Technical]")) {
        isMatch = true
      } else if (filter === "Management" && tags.includes("[Management]")) {
        isMatch = true
      }

      // Transform tags to badges if not already transformed
      if (h3.innerHTML.includes("[Technical]")) {
        h3.innerHTML = h3.innerHTML.replace(
          "[Technical]", 
          `<span class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold transition-colors border-blue-200 dark:border-blue-500/30 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 shadow-sm ${isRtl ? 'mr-3' : 'ml-3'} align-middle backdrop-blur-sm">${t("filter.technical")}</span>`
        )
      }
      if (h3.innerHTML.includes("[Management]")) {
        h3.innerHTML = h3.innerHTML.replace(
          "[Management]", 
          `<span class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold transition-colors border-emerald-200 dark:border-emerald-500/30 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shadow-sm ${isRtl ? 'mr-3' : 'ml-3'} align-middle backdrop-blur-sm">${t("filter.management")}</span>`
        )
      }

      h3.style.display = isMatch ? "" : "none"
      h3.style.opacity = isMatch ? "1" : "0"
      h3.style.transition = "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      
      let nextElement = h3.nextElementSibling
      while (nextElement && nextElement.tagName !== "H3" && nextElement.tagName !== "H2") {
        const el = nextElement as HTMLElement;
        if (isMatch) {
            el.style.display = ""
            setTimeout(() => { el.style.opacity = "1" }, 10)
        } else {
            el.style.opacity = "0"
            setTimeout(() => { el.style.display = "none" }, 400)
        }
        el.style.transition = "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        nextElement = nextElement.nextElementSibling
      }
    })
  }, [filter, language]) // Re-run when language changes too

  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div />
      <ToggleGroup 
        value={[filter]} 
        onValueChange={(v: string[]) => setFilter(v.length > 0 ? v[0] : "All")} 
        className="bg-muted/50 border border-border p-1 rounded-xl backdrop-blur-sm shadow-inner"
      >

        <ToggleGroupItem value="All" aria-label="Toggle All" className={`data-[state=on]:text-white transition-all text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg px-4 active:scale-95 ${activeColor}`}>
          {t("filter.all")}
        </ToggleGroupItem>
        <ToggleGroupItem value="Technical" aria-label="Toggle Technical" className={`data-[state=on]:text-white transition-all text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg px-4 active:scale-95 ${activeColor}`}>
          {t("filter.technical")}
        </ToggleGroupItem>
        <ToggleGroupItem value="Management" aria-label="Toggle Management" className={`data-[state=on]:text-white transition-all text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg px-4 active:scale-95 ${activeColor}`}>
          {t("filter.management")}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
