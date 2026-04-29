import * as React from "react"
import { useLanguage } from "./LanguageContext"
import { Button } from "./ui/button"
import { IconLanguage } from "@tabler/icons-react"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="flex items-center gap-2 px-3 py-1.5 h-auto font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary"
    >
      <IconLanguage className="w-4 h-4" />
      <span>{language === "en" ? "العربية" : "English"}</span>
    </Button>
  )
}
