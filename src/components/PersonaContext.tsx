import * as React from "react"

type Persona = "engineer" | "executive"

interface PersonaContextType {
  persona: Persona
  setPersona: (persona: Persona) => void
}

const PersonaContext = React.createContext<PersonaContextType | undefined>(undefined)

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersonaState] = React.useState<Persona>("executive")

  const setPersona = (newPersona: Persona) => {
    setPersonaState(newPersona)
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("persona-engineer", "persona-executive")
      document.documentElement.classList.add(`persona-${newPersona}`)
      localStorage.setItem("portfolio-persona", newPersona)
    }
  }

  React.useEffect(() => {
    const saved = localStorage.getItem("portfolio-persona") as Persona
    if (saved && (saved === "engineer" || saved === "executive")) {
      setPersona(saved)
    } else {
        setPersona("executive")
    }
  }, [])

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  )
}

export function usePersona() {
  const context = React.useContext(PersonaContext)
  if (context === undefined) {
    throw new Error("usePersona must be used within a PersonaProvider")
  }
  return context
}
