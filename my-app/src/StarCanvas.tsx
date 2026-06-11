import { useEffect, useRef } from 'react'

// Animated starfield background shared by the landing page and /builders.
// Twinkling stars drift upward; occasional shooting stars streak across.
export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = window.innerWidth
    let h = window.innerHeight

    interface Star {
      x: number; y: number; r: number; a: number; da: number; speed: number
    }

    const stars: Star[] = Array.from({ length: 260 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.2,
      a: Math.random(),
      da: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
      speed: Math.random() * 0.06 + 0.01,
    }))

    // The Guardian Constellation — three guiding stars the sky always keeps lit:
    // the keeper and her two girls, one family. First names only, by design
    // (see drafts/guardian-constellation.md).
//     const GUARDIAN_STARS = ['Crystal', 'Dru', 'Ember'] as const
//     const guardians = GUARDIAN_STARS.map((name, i) => ({
//       name,
//       a: 0.72 - i * 0.05,
//       da: 0.0025 * (i % 2 === 0 ? 1 : -1),
//     }))

    const shooters: { x: number; y: number; len: number; speed: number; a: number; life: number; maxLife: number }[] = []

    function spawn() {
      shooters.push({
        x: Math.random() * w, y: Math.random() * h * 0.5,
        len: Math.random() * 120 + 60, speed: Math.random() * 6 + 4,
        a: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
        life: 0, maxLife: Math.random() * 40 + 30,
      })
    }

    let shootTimer = 0

    function draw() {
      canvas!.width = w; canvas!.height = h
      ctx!.clearRect(0, 0, w, h)

      for (const s of stars) {
        s.a += s.da
        if (s.a > 1 || s.a < 0) s.da *= -1
        s.y -= s.speed
        if (s.y < 0) { s.y = h; s.x = Math.random() * w }
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255,255,255,${Math.max(0, s.a * 0.8)})`
        ctx!.fill()
      }

      if (++shootTimer > 160) { spawn(); shootTimer = 0 }

      for (let i = shooters.length - 1; i >= 0; i--) {
        const ss = shooters[i]; ss.life++
        const t = ss.life / ss.maxLife
        const alpha = t < 0.5 ? t * 2 : (1 - t) * 2
        const tx = ss.x - Math.cos(ss.a) * ss.len
        const ty = ss.y + Math.sin(ss.a) * ss.len
        const g = ctx!.createLinearGradient(tx, ty, ss.x, ss.y)
        g.addColorStop(0, `rgba(155,92,255,0)`)
        g.addColorStop(0.5, `rgba(200,160,255,${alpha * 0.5})`)
        g.addColorStop(1, `rgba(255,255,255,${alpha})`)
        ctx!.beginPath(); ctx!.moveTo(tx, ty); ctx!.lineTo(ss.x, ss.y)
        ctx!.strokeStyle = g; ctx!.lineWidth = 1.5; ctx!.stroke()
        ss.x += Math.cos(ss.a) * ss.speed
        ss.y += Math.sin(ss.a) * ss.speed
        if (ss.life >= ss.maxLife) shooters.splice(i, 1)
      }

      animId = requestAnimationFrame(draw)
    }

    function resize() { w = window.innerWidth; h = window.innerHeight }
    window.addEventListener('resize', resize)
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="stars-canvas" />
}
