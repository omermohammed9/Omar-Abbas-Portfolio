import * as React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { Card, CardContent } from "./ui/card"
import { IconBook, IconCalendar, IconArrowRight } from "@tabler/icons-react"

const articles = [
  {
    id: 1,
    titleEn: "The Future of ERP: AI-Driven Insights",
    titleAr: "مستقبل أنظمة ERP: الرؤى المدفوعة بالذكاء الاصطناعي",
    descEn: "How artificial intelligence is transforming legacy ERP systems into predictive powerhouses.",
    descAr: "كيف يحول الذكاء الاصطناعي أنظمة ERP القديمة إلى قوى تنبؤية.",
    date: "2026-05-15",
    link: "#"
  },
  {
    id: 2,
    titleEn: "Bridging the Gap: Engineer to Executive",
    titleAr: "سد الفجوة: من مهندس إلى تنفيذي",
    descEn: "Key strategies for engineers to communicate effectively with C-level executives.",
    descAr: "استراتيجيات رئيسية للمهندسين للتواصل الفعال مع الإدارة التنفيذية.",
    date: "2026-04-20",
    link: "#"
  },
  {
    id: 3,
    titleEn: "Mastering Prompt Engineering for Web Dev",
    titleAr: "إتقان هندسة الأوامر لتطوير الويب",
    descEn: "A guide to using Gemini and other LLMs to accelerate your development workflow.",
    descAr: "دليل لاستخدام Gemini ونماذج اللغة الكبيرة الأخرى لتسريع سير عمل التطوير الخاص بك.",
    date: "2026-03-10",
    link: "#"
  }
]

export default function BlogSection() {
  const { t, isRtl, language } = useLanguage()

  return (
    <section id="blog" className="mt-16 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-transparent" />
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3 whitespace-nowrap">
          <IconBook className="w-6 h-6 text-primary" />
          {t("nav.blog") !== "nav.blog" ? t("nav.blog") : (language === "ar" ? "المدونة" : "Blog")}
        </h2>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group glass-premium border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <IconCalendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <h3 className={`text-lg font-bold tracking-tight group-hover:text-primary transition-colors duration-300 ${isRtl ? 'font-arabic' : ''}`}>
                      {language === "ar" ? article.titleAr : article.titleEn}
                    </h3>
                    <p className={`text-sm text-muted-foreground leading-relaxed ${isRtl ? 'font-arabic' : ''}`}>
                      {language === "ar" ? article.descAr : article.descEn}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all cursor-pointer">
                    <span>{language === "ar" ? "اقرأ المزيد" : "Read More"}</span>
                    <IconArrowRight className={`w-4 h-4 ${isRtl ? 'transform rotate-180' : ''}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
