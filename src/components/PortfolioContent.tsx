import * as React from "react"
import { PersonaProvider } from "./PersonaContext"
import PersonaToggle from "./PersonaToggle"
import ThemeToggle from "./ThemeToggle"
import FilterGroup from "./FilterGroup"
import MobileMenu from "./MobileMenu"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { Mail, Phone, MapPin, Code, Globe } from "lucide-react"

interface PortfolioContentProps {
  children: React.ReactNode
  resumeFrontmatter: any
}

export default function PortfolioContent({ children, resumeFrontmatter }: PortfolioContentProps) {
  return (
    <PersonaProvider>
      {/* Mobile Nav (Sticky Top) */}
      <div className="lg:hidden sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur transition-colors duration-500">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <img src="/profile.jpg" alt="Profile" className="w-8 h-8 rounded-full object-cover border border-primary/50 transition-all duration-500" />
            <span className="text-xl font-bold text-white transition-colors duration-500">{resumeFrontmatter.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 relative">
        
        {/* Sidebar / Sticky Profile */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-12 space-y-8">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Preferences</span>
              <ThemeToggle />
            </div>
            <PersonaToggle />
            
            <Card className="bg-card/40 border-border backdrop-blur shadow-2xl shadow-primary/5 transition-all duration-500">
              <CardContent className="p-6 text-center">
                <img src="/profile.jpg" alt="Profile" className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-border shadow-xl shadow-primary/20 ring-2 ring-primary/50 ring-offset-2 ring-offset-background transition-all duration-500" />
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2 transition-colors duration-500">{resumeFrontmatter.title}</h1>
                <p className="text-primary font-medium mb-6 transition-colors duration-500">{resumeFrontmatter.tagline}</p>
                
                <Separator className="bg-border mb-6" />

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3 justify-center">
                    <Mail className="w-4 h-4 text-muted-foreground/60" />
                    <a href={`mailto:${resumeFrontmatter.contact}`} className="hover:text-foreground transition-colors">{resumeFrontmatter.contact}</a>
                  </div>
                  {resumeFrontmatter.phone && (
                    <div className="flex items-center gap-3 justify-center">
                      <Phone className="w-4 h-4 text-muted-foreground/60" />
                      <span>{resumeFrontmatter.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 justify-center">
                    <MapPin className="w-4 h-4 text-muted-foreground/60" />
                    <span>{resumeFrontmatter.location}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4">
                  {resumeFrontmatter.github && (
                    <a href={resumeFrontmatter.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-slate-400 border border-slate-700 hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95" title="GitHub">
                      <Code className="w-5 h-5" />
                    </a>
                  )}
                  {resumeFrontmatter.linkedin && (
                    <a href={resumeFrontmatter.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-slate-400 border border-slate-700 hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95" title="LinkedIn">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <Card className="bg-card/40 border-border backdrop-blur shadow-2xl transition-all duration-500">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <FilterGroup />
              {children}
            </CardContent>
          </Card>
        </main>
      </div>
    </PersonaProvider>
  )
}
