import * as React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { Card, CardContent } from "./ui/card"
import { IconQuote, IconMessage2, IconStar } from "@tabler/icons-react"

const testimonials = [
  {
    id: 1,
    quoteEn: "Omar's integration of AI into our legacy ERP system was flawless. He understands both the business logic and the technical execution.",
    quoteAr: "كان دمج عمر للذكاء الاصطناعي في نظام ERP القديم لدينا لا تشوبه شائبة. إنه يفهم كلاً من منطق العمل والتنفيذ التقني.",
    author: "Ahmed R.",
    roleEn: "IT Director",
    roleAr: "مدير تقنية المعلومات",
    company: "Gulf Tech Solutions"
  },
  {
    id: 2,
    quoteEn: "The communication training provided by Omar transformed our support team. His approach is practical and highly effective.",
    quoteAr: "التدريب على التواصل الذي قدمه عمر أحدث تحولاً في فريق الدعم لدينا. أسلوبه عملي وفعال للغاية.",
    author: "Sarah M.",
    roleEn: "Operations Manager",
    roleAr: "مدير العمليات",
    company: "Innovate Ltd."
  },
  {
    id: 3,
    quoteEn: "As a bridge between technical teams and executive management, Omar is unparalleled. He translates complex ideas into actionable strategies.",
    quoteAr: "كجسر بين الفرق الفنية والإدارة التنفيذية، عمر لا مثيل له. إنه يترجم الأفكار المعقدة إلى استراتيجيات قابلة للتنفيذ.",
    author: "John D.",
    roleEn: "CEO",
    roleAr: "الرئيس التنفيذي",
    company: "Apex Global"
  }
]

export default function Testimonials() {
  const { t, isRtl, language } = useLanguage()

  return (
    <section id="testimonials" className="mt-16 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3 whitespace-nowrap">
          <IconMessage2 className="w-6 h-6 text-primary" />
          {t("nav.testimonials") !== "nav.testimonials" ? t("nav.testimonials") : (language === "ar" ? "التوصيات" : "Testimonials")}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group relative overflow-hidden glass-premium border-border/50 hover:border-primary/50 transition-all duration-500 h-full flex flex-col justify-between">
              <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
                <IconQuote className="w-12 h-12 transform -scale-x-100" />
              </div>
              
              <CardContent className="p-6 pt-10 flex flex-col justify-between h-full space-y-4">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                
                <p className={`text-sm text-muted-foreground leading-relaxed relative z-10 italic ${isRtl ? 'font-arabic' : ''}`}>
                  "{language === "ar" ? testimonial.quoteAr : testimonial.quoteEn}"
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold truncate">{testimonial.author}</span>
                    <span className="text-[10px] text-muted-foreground truncate">
                      {language === "ar" ? testimonial.roleAr : testimonial.roleEn} @ {testimonial.company}
                    </span>
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
