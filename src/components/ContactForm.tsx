import * as React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { Card, CardContent } from "./ui/card"
import { IconMail, IconSend, IconUser, IconMessage } from "@tabler/icons-react"

export default function ContactForm() {
  const { t, isRtl, language } = useLanguage()

  return (
    <section id="contact-form" className="mt-16 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3 whitespace-nowrap">
          <IconMail className="w-6 h-6 text-primary" />
          {t("nav.contact") !== "nav.contact" ? t("nav.contact") : (language === "ar" ? "اتصل بنا" : "Contact Me")}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="glass-premium border-border/50 shadow-2xl shadow-primary/5">
          <CardContent className="p-6 sm:p-8">
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              className="space-y-6"
              action="/thanks"
            >
              <input type="hidden" name="form-name" value="contact" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <IconUser className="w-4 h-4" />
                    {language === "ar" ? "الاسم" : "Name"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    placeholder={language === "ar" ? "اسمي هو..." : "John Doe"}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <IconMail className="w-4 h-4" />
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    placeholder={language === "ar" ? "بريدي هو..." : "john@example.com"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <IconMessage className="w-4 h-4" />
                  {language === "ar" ? "الرسالة" : "Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm resize-none"
                  placeholder={language === "ar" ? "رسالتي هي..." : "Tell me about your project or inquiry..."}
                />
              </div>

              <div data-netlify-recaptcha="true"></div>

              <motion.button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 active:scale-95 transform"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconSend className="w-4 h-4" />
                {language === "ar" ? "إرسال" : "Send Message"}
              </motion.button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
