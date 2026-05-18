import * as React from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [type, setType] = React.useState<"default" | "pointer" | "text" | "skills">("default")
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      const target = e.target as HTMLElement
      if (!target) return

      if (target.closest('button') || target.closest('a')) {
        setType('pointer')
      } else if (target.closest('input') || target.closest('textarea') || target.closest('.font-mono')) {
        setType('text')
      } else if (target.closest('.skill-card') || target.closest('[data-testid="skill-card"]')) {
        setType('skills')
      } else {
        setType('default')
      }
    }

    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (isFinePointer) {
      document.documentElement.style.cursor = 'none'
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (isFinePointer) {
        document.documentElement.style.cursor = 'auto'
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  if (!isMounted || (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches)) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: position.x - (type === 'pointer' ? 20 : type === 'text' ? 5 : type === 'skills' ? 15 : 10),
        y: position.y - (type === 'pointer' ? 20 : type === 'text' ? 10 : type === 'skills' ? 15 : 10),
        width: type === 'pointer' ? 40 : type === 'text' ? 4 : type === 'skills' ? 30 : 20,
        height: type === 'pointer' ? 40 : type === 'text' ? 20 : type === 'skills' ? 30 : 20,
        borderRadius: type === 'pointer' ? '50%' : type === 'text' ? '2px' : type === 'skills' ? '20%' : '50%',
        backgroundColor: type === 'text' ? '#00ff00' : 'rgba(255, 255, 255, 1)',
        border: type === 'skills' ? '2px solid #00ff00' : 'none'
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 500,
        mass: 0.5
      }}
    >
      {type === 'text' && (
        <span className="text-[#00ff00] font-mono absolute -top-1 left-2">_</span>
      )}
      {type === 'skills' && (
        <span className="text-[#00ff00] font-mono text-xs absolute inset-0 flex items-center justify-center">?</span>
      )}
    </motion.div>
  )
}
