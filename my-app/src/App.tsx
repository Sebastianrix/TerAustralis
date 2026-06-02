import { useEffect, useRef } from 'react'
import './App.css'

function StarCanvas() {
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
      x: number
      y: number
      r: number
      a: number
      da: number
      speed: number
    }

    const N = 220
    const stars: Star[] = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      da: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
      speed: Math.random() * 0.08 + 0.02,
    }))

    const shootingStars: { x: number; y: number; len: number; speed: number; a: number; life: number; maxLife: number }[] = []

    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.5,
        len: Math.random() * 100 + 60,
        speed: Math.random() * 6 + 4,
        a: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
        life: 0,
        maxLife: Math.random() * 40 + 30,
      })
    }

    let shootTimer = 0

    function draw() {
      canvas!.width = w
      canvas!.height = h
      ctx!.clearRect(0, 0, w, h)

      // background twinkle stars
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

      // shooting stars
      shootTimer++
      if (shootTimer > 180) {
        spawnShootingStar()
        shootTimer = 0
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i]
        ss.life++
        const t = ss.life / ss.maxLife
        const alpha = t < 0.5 ? t * 2 : (1 - t) * 2
        const tailX = ss.x - Math.cos(ss.a) * ss.len
        const tailY = ss.y + Math.sin(ss.a) * ss.len

        const grad = ctx!.createLinearGradient(tailX, tailY, ss.x, ss.y)
        grad.addColorStop(0, `rgba(155,92,255,0)`)
        grad.addColorStop(0.5, `rgba(200,160,255,${alpha * 0.5})`)
        grad.addColorStop(1, `rgba(255,255,255,${alpha})`)

        ctx!.beginPath()
        ctx!.moveTo(tailX, tailY)
        ctx!.lineTo(ss.x, ss.y)
        ctx!.strokeStyle = grad
        ctx!.lineWidth = 1.5
        ctx!.stroke()

        ss.x += Math.cos(ss.a) * ss.speed
        ss.y += Math.sin(ss.a) * ss.speed

        if (ss.life >= ss.maxLife) shootingStars.splice(i, 1)
      }

      animId = requestAnimationFrame(draw)
    }

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
    }

    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="stars-canvas" />
}

const features = [
  {
    icon: '🛡️',
    iconClass: 'feature-icon-purple',
    title: 'Decentralized Security',
    desc: 'Built on immutable infrastructure, TerAustralis ensures your assets are protected by cryptographic guarantees—not promises.',
  },
  {
    icon: '🚀',
    iconClass: 'feature-icon-cyan',
    title: 'Frontier Exploration',
    desc: 'Venture into unknown territory. We push beyond the edges of what\'s possible in the decentralized landscape.',
  },
  {
    icon: '✦',
    iconClass: 'feature-icon-pink',
    title: 'Constellation Network',
    desc: 'A connected ecosystem of nodes forming a resilient, self-governing network inspired by the Southern Cross.',
  },
  {
    icon: '⚡',
    iconClass: 'feature-icon-purple',
    title: 'Blazing Performance',
    desc: 'Optimised for speed at every layer. Transaction finality in seconds, not minutes.',
  },
  {
    icon: '🌐',
    iconClass: 'feature-icon-cyan',
    title: 'Open & Permissionless',
    desc: 'No gatekeepers. Anyone can build, participate, or govern. The protocol belongs to the community.',
  },
  {
    icon: '🔭',
    iconClass: 'feature-icon-pink',
    title: 'Deep Research',
    desc: 'Grounded in rigorous on-chain analysis and cutting-edge cryptographic research before every deployment.',
  },
]

const roadmap = [
  {
    phase: 'Phase 01',
    name: 'Genesis',
    badge: 'Complete',
    badgeClass: 'badge-done',
    active: false,
    items: ['Community launch', 'Whitepaper v1', 'Token generation', 'Core team formation'],
  },
  {
    phase: 'Phase 02',
    name: 'Discovery',
    badge: 'Live Now',
    badgeClass: 'badge-active',
    active: true,
    items: ['Protocol v1 testnet', 'Explorer dashboard', 'Early adopter program', 'Ecosystem grants'],
  },
  {
    phase: 'Phase 03',
    name: 'Expansion',
    badge: 'Coming Soon',
    badgeClass: 'badge-soon',
    active: false,
    items: ['Mainnet launch', 'Cross-chain bridges', 'DAO governance', 'Developer SDK'],
  },
  {
    phase: 'Phase 04',
    name: 'Incognita',
    badge: 'Future',
    badgeClass: 'badge-soon',
    active: false,
    items: ['Full decentralisation', 'Layer-2 scaling', 'Institutional onboarding', 'The unknown frontier'],
  },
]

export default function App() {
  return (
    <>
      <StarCanvas />

      <div className="page">
        {/* Nav */}
        <nav className="nav">
          <div className="nav-logo">
            <div className="nav-logo-icon">✦</div>
            TerAustralis
          </div>

          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
            <li><a href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">Community</a></li>
          </ul>

          <div className="nav-cta">
            <a href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">
              <button className="btn btn-ghost">Follow on X</button>
            </a>
            <button className="btn btn-primary">
              Join Waitlist ↗
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-glow" aria-hidden="true">
            <div className="hero-glow-orb hero-glow-orb-1" />
            <div className="hero-glow-orb hero-glow-orb-2" />
          </div>

          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Now live on testnet
          </div>

          <h1 className="hero-title">
            <span className="hero-title-gradient">TerAustralis</span>
          </h1>

          <p className="hero-subtitle">Incognita</p>

          <p className="hero-description">
            Mapping the unknown frontier of decentralised technology.
            Built for explorers, secured by cryptography, governed by the community.
          </p>

          <div className="hero-actions">
            <a href="#features">
              <button className="btn-hero-primary">
                Explore the Protocol ↗
              </button>
            </a>
            <a href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">
              <button className="btn-hero-secondary">
                Follow the Journey
              </button>
            </a>
          </div>

          <div className="hero-scroll-hint">
            <span>Scroll</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </section>

        {/* Stats */}
        <div className="stats-bar">
          <div className="stats-inner">
            <div className="stat-item">
              <div className="stat-value"><span>10K+</span></div>
              <div className="stat-label">Community Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-value"><span>99.9%</span></div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-value"><span>&lt; 2s</span></div>
              <div className="stat-label">Finality</div>
            </div>
            <div className="stat-item">
              <div className="stat-value"><span>∞</span></div>
              <div className="stat-label">Possibilities</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="section" id="features">
          <div className="section-inner">
            <div className="section-tag">What we build</div>
            <h2 className="section-title">Built for the<br />unknown frontier</h2>
            <p className="section-desc">
              Every feature of TerAustralis is designed to push the boundaries of what decentralised networks can achieve.
            </p>

            <div className="features-grid">
              {features.map((f) => (
                <div className="feature-card" key={f.title}>
                  <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
                  <div className="feature-title">{f.title}</div>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="section roadmap-section" id="roadmap">
          <div className="section-inner">
            <div className="section-tag">Roadmap</div>
            <h2 className="section-title">The expedition plan</h2>
            <p className="section-desc">
              From genesis to the Incognita—each phase charts new territory in the decentralised frontier.
            </p>

            <div className="roadmap-grid">
              {roadmap.map((phase) => (
                <div
                  key={phase.phase}
                  className={`roadmap-phase ${phase.active ? 'phase-active' : ''} ${phase.badgeClass === 'badge-done' ? 'phase-done' : ''}`}
                >
                  <div className="phase-label">{phase.phase}</div>
                  <div className="phase-name">{phase.name}</div>
                  <div className={`phase-badge ${phase.badgeClass}`}>{phase.badge}</div>
                  <ul className="phase-items">
                    {phase.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-glow" aria-hidden="true">
            <div className="cta-glow-orb cta-orb-1" />
          </div>
          <div className="cta-inner">
            <h2 className="cta-title">Ready to explore<br />the unknown?</h2>
            <p className="cta-desc">
              Join thousands of explorers pushing the boundaries of what's possible.
              The frontier is open—will you claim your place?
            </p>
            <div className="cta-buttons">
              <button className="btn-cta btn-cta-primary">
                Join Waitlist ✦
              </button>
              <a href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">
                <button className="btn-cta btn-cta-secondary">
                  Follow on X ↗
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <div>
              <div className="footer-logo">
                <div className="nav-logo-icon">✦</div>
                TerAustralis
              </div>
              <div className="footer-tagline">Terra Australis Incognita</div>
            </div>

            <div className="footer-links">
              <a className="footer-link" href="#features">Features</a>
              <a className="footer-link" href="#roadmap">Roadmap</a>
              <a className="footer-link" href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">Twitter / X</a>
            </div>

            <div className="footer-social">
              <a className="social-btn" href="https://x.com/TerAustralis" target="_blank" rel="noreferrer" aria-label="X / Twitter">
                𝕏
              </a>
            </div>

            <div className="footer-copy">© 2026 TerAustralis. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </>
  )
}
