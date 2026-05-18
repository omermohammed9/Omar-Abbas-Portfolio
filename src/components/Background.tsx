import * as React from "react"
import { usePersona } from "./PersonaContext"

export default function Background() {
  const { persona } = usePersona()
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const mouseRef = React.useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    // Engineer: Nodes
    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    const nodeCount = 50
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }

    // Executive: Gradient Mesh
    let tick = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (persona === 'engineer') {
        // Draw nodes
        ctx.fillStyle = 'rgba(16, 185, 129, 0.5)' // Emerald
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)'
        
        nodes.forEach(node => {
          node.x += node.vx
          node.y += node.vy

          if (node.x < 0 || node.x > canvas.width) node.vx *= -1
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1

          ctx.beginPath()
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
          ctx.fill()

          // Connect to mouse
          const dx = node.x - mouseRef.current.x
          const dy = node.y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${1 - dist / 150})`
            ctx.stroke()
          }

          // Connect to other nodes
          nodes.forEach(other => {
            const dx = node.x - other.x
            const dy = node.y - other.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 50) {
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(other.x, other.y)
              ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - dist / 50)})`
              ctx.stroke()
            }
          })
        })
      } else {
        // Executive: Flowing Gradient Mesh
        tick += 0.01
        const gradient = ctx.createRadialGradient(
          canvas.width / 2 + Math.cos(tick) * 100,
          canvas.height / 2 + Math.sin(tick) * 100,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width
        )
        
        // Gold/Bronze palette
        gradient.addColorStop(0, 'rgba(212, 175, 55, 0.1)')
        gradient.addColorStop(0.5, 'rgba(139, 69, 19, 0.05)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add some subtle moving lines
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)'
        ctx.beginPath()
        for (let i = 0; i < canvas.width; i += 50) {
          ctx.moveTo(i, 0)
          ctx.quadraticCurveTo(i + Math.sin(tick + i) * 50, canvas.height / 2, i, canvas.height)
        }
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [persona])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
