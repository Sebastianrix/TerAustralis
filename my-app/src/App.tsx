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
    const GUARDIAN_STARS = ['Crystal', 'Dru', 'Ember'] as const
    const guardians = GUARDIAN_STARS.map((name, i) => ({
      name,
      a: 0.72 - i * 0.05,
      da: 0.0025 * (i % 2 === 0 ? 1 : -1),
    }))

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

const values = [
  {
    icon: '∞',
    cls: 'vi-purple',
    title: 'Permissionless & Open',
    desc: 'Code, specifications, and data layers are fully auditable and forkable. CC0 ethos where possible — the protocol belongs to builders.',
  },
  {
    icon: '◈',
    cls: 'vi-gold',
    title: 'Indigenous Sovereignty & Consent',
    desc: 'Physical infrastructure is grounded in genuine partnership with native title holders, Prescribed Body Corporates, and Indigenous communities. Free, prior and informed consent is a core design principle.',
  },
  {
    icon: '⚡',
    cls: 'vi-cyan',
    title: 'Blazing Performance',
    desc: 'Sub-second finality, high throughput, and edge-optimised design for remote Australian outback and orbital nodes.',
  },
  {
    icon: '◎',
    cls: 'vi-purple',
    title: 'First-Principles',
    desc: 'Rebuild assumptions from physics, economics, and long-term human flourishing — not legacy incumbents.',
  },
  {
    icon: '⬡',
    cls: 'vi-cyan',
    title: 'Southern Advantage',
    desc: "Critical minerals + favorable launch geography + sovereign stability + respectful Indigenous partnership. Australia's edge is the protocol's edge.",
  },
  {
    icon: '🚀',
    cls: 'vi-purple',
    title: 'Builder-First',
    desc: 'Incentives flow to those who ship hardware, code, policy, or capital that advances physical milestones through ethical and consent-aligned processes.',
  },
  {
    icon: '✦',
    cls: 'vi-gold',
    title: 'Multiplanetary Long-Termism',
    desc: 'Earth is the cradle. The protocol is designed from day one for interplanetary delay-tolerant networking and eventual settlement.',
  },
]

const stack = [
  { num: '01', title: 'Coordination Layer', desc: 'High-performance consensus combining leader-based throughput with BFT fallback and space-grade Delay/Disruption Tolerant Networking (DTN). Enables reliable coordination across intermittent, high-latency environments.' },
  { num: '02', title: 'Physical Asset Primitives', desc: 'On-chain representation of launch pads, propellant depots, ISRU facilities, Optimus-class robotics swarms, and Starship-class vehicles. Tokenised launch windows and land-use primitives.' },
  { num: '03', title: 'Data & Intelligence Layer', desc: 'Open, permissionless repository for orbital mechanics, resource mapping, simulation environments, and AI agent marketplaces. Verifiable via ZK proofs or decentralised oracles.' },
  { num: '04', title: 'Incentive & Settlement Layer', desc: '$TINC powers coordination fees, milestone bounties, data contributions, node staking, and governance. Incentives tied to measurable real-world progress.' },
  { num: '05', title: 'Interplanetary Extension', desc: 'Native store-and-forward messaging and eventual interplanetary nodes using established DTN patterns. Designed for Mars and beyond from genesis.' },
]

const roadmap = [
  {
    phase: 'Phase 01', name: 'Genesis', badge: 'Complete', badgeClass: 'badge-done', active: false,
    items: ['Vision & community seeding', 'Early outreach', 'Whitepaper v1', 'Core team formation'],
  },
  {
    phase: 'Phase 02', name: 'Discovery', badge: 'Live Now', badgeClass: 'badge-active', active: true,
    items: ['Protocol specification', 'Architecture refinement', 'Stakeholder mapping', 'Builder recruitment'],
  },
  {
    phase: 'Phase 03', name: 'Exploration', badge: 'Q3–Q4 2026', badgeClass: 'badge-soon', active: false,
    items: ['Testnet launch', 'Pilot integrations', 'Governance experiments', 'Consent-aligned land-use primitives'],
  },
  {
    phase: 'Phase 04', name: 'Settlement', badge: '2027+', badgeClass: 'badge-soon', active: false,
    items: ['Mainnet launch', 'Physical coordination pilots', 'Sovereign framework engagement', 'Initial interplanetary experiments'],
  },
  {
    phase: 'Phase 05', name: 'Expansion', badge: 'Future', badgeClass: 'badge-soon', active: false,
    items: ['Lunar / Mars nodes', 'Scaled multiplanetary primitives', 'Full decentralisation', 'The unknown frontier'],
  },
]

export default function App() {
  return (
    <>
      <StarCanvas />
      <div className="page">

        {/* ── Nav ── */}
        <nav className="nav">
          <div className="nav-logo">
            <div className="nav-logo-icon">✦</div>
            TerAustralis
          </div>
          <ul className="nav-links">
            <li><a href="#protocol">Protocol</a></li>
            <li><a href="#values">Values</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
            <li><a href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">Community</a></li>
          </ul>
          <div className="nav-cta">
            <a href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">
              <button className="btn btn-ghost">Follow on X</button>
            </a>
            <button className="btn btn-primary">Join the Protocol ↗</button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-glow" aria-hidden="true">
            <div className="hero-glow-orb orb-1" />
            <div className="hero-glow-orb orb-2" />
            <div className="hero-glow-orb orb-3" />
          </div>

          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Discovery Phase — Live
          </div>

          <h1 className="hero-title">
            <span className="hero-title-gradient">TerAustralis</span>
          </h1>
          <p className="hero-subtitle">Incognita</p>

          <p className="hero-tagline">Starbase Down Under — Permissionless.</p>

          <p className="hero-description">
            The coordination layer for high-cadence Earth-to-multiplanetary operations.
            Built on Australian sovereign advantage, secured by cryptography,
            grounded in genuine Indigenous partnership.
          </p>

          <div className="hero-actions">
            <a href="#protocol">
              <button className="btn-hero-primary">Explore the Protocol ↗</button>
            </a>
            <a href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">
              <button className="btn-hero-secondary">Follow the Journey</button>
            </a>
          </div>

          <div className="hero-scroll-hint">
            <span>Scroll</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </section>

        {/* ── Stats ── */}
        <div className="stats-bar">
          <div className="stats-inner">
            <div className="stat-item">
              <div className="stat-value"><span>v0.2.4</span></div>
              <div className="stat-label">Litepaper</div>
            </div>
            <div className="stat-item">
              <div className="stat-value"><span>&lt; 1s</span></div>
              <div className="stat-label">Target Finality</div>
            </div>
            <div className="stat-item">
              <div className="stat-value"><span>5</span></div>
              <div className="stat-label">Protocol Layers</div>
            </div>
            <div className="stat-item">
              <div className="stat-value"><span>$TINC</span></div>
              <div className="stat-label">Native Token</div>
            </div>
          </div>
        </div>

        {/* ── Thesis ── */}
        <section className="thesis-section">
          <div className="section-inner thesis-inner">
            <div className="thesis-text">
              <div className="section-tag">Core Thesis</div>
              <h2 className="section-title">The multiplanetary transition will be won by the civilization that coordinates fastest.</h2>
              <p className="thesis-body">
                Australia's critical minerals, equatorial-proximate northern launch geography, southern polar access,
                and sovereign stability give it asymmetric advantage — if we build the right coordination protocol now.
              </p>
              <p className="thesis-body">
                We are not another launch company or satellite operator. We are the <strong>coordination layer</strong> that
                makes high-cadence, Starbase-scale operations in the Southern Hemisphere faster, more permissionless, and more abundant.
              </p>
              <a href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">
                <button className="btn-outline">Read the Litepaper →</button>
              </a>
            </div>
            <div className="thesis-quote">
              <blockquote>
                "From the unknown southern land,<br />we launch the known future."
              </blockquote>
              <div className="thesis-quote-sub">— TerAustralis Incognita, v0.2.4</div>
            </div>
          </div>
        </section>

        {/* ── Protocol Stack ── */}
        <section className="section" id="protocol">
          <div className="section-inner">
            <div className="section-tag">Protocol Stack</div>
            <h2 className="section-title">Five layers.<br />One coordination protocol.</h2>
            <p className="section-desc">
              A modular stack for multi-domain coordination across physical infrastructure,
              digital assets, and interplanetary operations.
            </p>

            <div className="stack-list">
              {stack.map((s) => (
                <div className="stack-item" key={s.num}>
                  <div className="stack-num">{s.num}</div>
                  <div className="stack-content">
                    <div className="stack-title">{s.title}</div>
                    <p className="stack-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="section values-section" id="values">
          <div className="section-inner">
            <div className="section-tag">Guiding Principles</div>
            <h2 className="section-title">Built on values<br />that matter at scale</h2>
            <p className="section-desc">
              Every design decision flows from these principles — from consensus mechanisms to land-use primitives.
            </p>

            <div className="values-grid">
              {values.map((v) => (
                <div className="value-card" key={v.title}>
                  <div className={`value-icon ${v.cls}`}>{v.icon}</div>
                  <div className="value-title">{v.title}</div>
                  <p className="value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className="section roadmap-section" id="roadmap">
          <div className="section-inner">
            <div className="section-tag">Roadmap</div>
            <h2 className="section-title">The expedition plan</h2>
            <p className="section-desc">
              From genesis to multiplanetary settlement — each phase charts new territory in the decentralised frontier.
            </p>

            <div className="roadmap-list">
              {roadmap.map((phase, i) => (
                <div key={phase.phase} className={`roadmap-item ${phase.active ? 'rm-active' : ''} ${phase.badgeClass === 'badge-done' ? 'rm-done' : ''}`}>
                  <div className="rm-line">
                    <div className="rm-dot" />
                    {i < roadmap.length - 1 && <div className="rm-connector" />}
                  </div>
                  <div className="rm-body">
                    <div className="rm-header">
                      <span className="rm-phase">{phase.phase}</span>
                      <span className={`phase-badge ${phase.badgeClass}`}>{phase.badge}</span>
                    </div>
                    <div className="rm-name">{phase.name}</div>
                    <ul className="rm-items">
                      {phase.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Token ── */}
        <section className="tinc-section">
          <div className="section-inner tinc-inner">
            <div className="tinc-left">
              <div className="section-tag">Native Token</div>
              <h2 className="section-title">$TINC</h2>
              <p className="tinc-desc">
                The coordination token powering fees, milestone bounties, data contributions,
                node staking, and governance. Incentives are tied to measurable real-world progress —
                code, hardware, policy, and capital that advances physical milestones through
                ethical, consent-aligned processes.
              </p>
              <div className="tinc-note">Detailed tokenomics published during Exploration phase.</div>
            </div>
            <div className="tinc-right">
              {[
                ['Coordination Fees', 'Pay for protocol usage and resource allocation'],
                ['Milestone Bounties', 'Rewards for shipping hardware, code, and policy'],
                ['Node Staking', 'Secure the network and earn protocol rewards'],
                ['Governance', 'Vote on protocol upgrades and resource allocation'],
              ].map(([title, desc]) => (
                <div className="tinc-card" key={title}>
                  <div className="tinc-card-title">{title}</div>
                  <div className="tinc-card-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who We Seek ── */}
        <section className="section seek-section">
          <div className="section-inner">
            <div className="section-tag">Who We Seek</div>
            <h2 className="section-title">Builders for<br />the unknown frontier</h2>
            <div className="seek-grid">
              {[
                ['Engineers & Builders', 'Decentralised systems, robotics, aerospace, AI, and infrastructure'],
                ['Australian Innovators', 'Space, critical minerals, energy, and policy leaders'],
                ['Indigenous Partners', 'Committed to genuine engagement with native title holders and Prescribed Body Corporates'],
                ['Multiplanetary Futurists', 'Open-source and DePIN contributors aligned with long-termism'],
                ['Capital Aligned', 'Investors committed to real infrastructure and ethical development'],
                ['First-Principles Energy', 'If you align with Starbase Down Under — through code, steel, policy, or capital'],
              ].map(([title, desc]) => (
                <div className="seek-card" key={title}>
                  <div className="seek-title">{title}</div>
                  <p className="seek-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-glow" aria-hidden="true">
            <div className="cta-orb cta-orb-1" />
            <div className="cta-orb cta-orb-2" />
          </div>
          <div className="cta-inner">
            <h2 className="cta-title">Build the Southern Starport.<br />Own the Coordination Layer.</h2>
            <p className="cta-desc">
              Join builders, researchers, and multiplanetary futurists pushing the boundaries of what's possible.
              The frontier is open — will you claim your place?
            </p>
            <div className="cta-buttons">
              <button className="btn-cta btn-cta-primary">Join the Protocol ✦</button>
              <a href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">
                <button className="btn-cta btn-cta-secondary">Follow on X ↗</button>
              </a>
            </div>
            <p className="cta-tagline">Terra Australis Incognita: Protocol for the Multiplanetary Age.</p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-inner">
            <div>
              <div className="footer-logo">
                <div className="nav-logo-icon">✦</div>
                TerAustralis
              </div>
              <div className="footer-tagline">Terra Australis Incognita — Litepaper v0.2.4</div>
            </div>
            <div className="footer-links">
              <a className="footer-link" href="#protocol">Protocol</a>
              <a className="footer-link" href="#values">Values</a>
              <a className="footer-link" href="#roadmap">Roadmap</a>
              <a className="footer-link" href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">Twitter / X</a>
            </div>
            <div className="footer-social">
              <a className="social-btn" href="https://x.com/TerAustralis" target="_blank" rel="noreferrer" aria-label="X / Twitter">𝕏</a>
            </div>
            <div className="footer-copy">© 2026 TerAustralis. All rights reserved.</div>
          </div>
        </footer>

      </div>
    </>
  )
}
