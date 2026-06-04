import { render, screen, within } from '@testing-library/react'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import App from '../App'

// jsdom has no canvas rendering — provide minimal stubs so StarCanvas'
// useEffect doesn't bail out or throw.
const mockCtx = {
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  closePath: vi.fn(),
  createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
}

const mockCancelAnimationFrame = vi.fn()
const mockRequestAnimationFrame = vi.fn(() => 42)

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(
    () => mockCtx,
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext
  vi.stubGlobal('requestAnimationFrame', mockRequestAnimationFrame)
  vi.stubGlobal('cancelAnimationFrame', mockCancelAnimationFrame)
})

// ---------------------------------------------------------------------------
// StarCanvas lifecycle
// ---------------------------------------------------------------------------

describe('StarCanvas', () => {
  it('renders a canvas element', () => {
    const { container } = render(<App />)
    expect(container.querySelector('canvas.stars-canvas')).toBeInTheDocument()
  })

  it('cancels the animation frame on unmount', () => {
    const { unmount } = render(<App />)
    unmount()
    expect(mockCancelAnimationFrame).toHaveBeenCalledWith(42)
  })

  it('removes the resize event listener on unmount', () => {
    const spy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<App />)
    unmount()
    expect(spy).toHaveBeenCalledWith('resize', expect.any(Function))
    spy.mockRestore()
  })
})

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

describe('Navigation', () => {
  it('renders a <nav> landmark', () => {
    render(<App />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('Features link points to #features', () => {
    render(<App />)
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByRole('link', { name: 'Features' })).toHaveAttribute('href', '#features')
  })

  it('Roadmap link points to #roadmap', () => {
    render(<App />)
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByRole('link', { name: 'Roadmap' })).toHaveAttribute('href', '#roadmap')
  })

  it('Community link points to X.com', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      'https://x.com/TerAustralis',
    )
  })
})

// ---------------------------------------------------------------------------
// External link safety
// ---------------------------------------------------------------------------

describe('External link safety', () => {
  it('every target="_blank" link carries rel="noreferrer"', () => {
    const { container } = render(<App />)
    const externalLinks = container.querySelectorAll('a[target="_blank"]')
    expect(externalLinks.length).toBeGreaterThan(0)
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })
})

// ---------------------------------------------------------------------------
// Hero section
// ---------------------------------------------------------------------------

describe('Hero section', () => {
  it('renders the h1 with the brand name', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TerAustralis')
  })

  it('renders the Incognita subtitle', () => {
    const { container } = render(<App />)
    expect(container.querySelector('.hero-subtitle')).toHaveTextContent('Incognita')
  })

  it('renders the live testnet badge', () => {
    render(<App />)
    expect(screen.getByText(/now live on testnet/i)).toBeInTheDocument()
  })

  it('renders the hero description', () => {
    render(<App />)
    expect(screen.getByText(/mapping the unknown frontier/i)).toBeInTheDocument()
  })

  it('renders the "Explore the Protocol" CTA', () => {
    render(<App />)
    expect(screen.getByText(/explore the protocol/i)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Stats bar
// ---------------------------------------------------------------------------

describe('Stats bar', () => {
  it.each([
    ['10K+', 'community members'],
    ['99.9%', 'uptime'],
    ['< 2s', 'finality'],
    ['∞', 'possibilities'],
  ])('renders the %s stat', (value) => {
    render(<App />)
    expect(screen.getByText(value)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Features section
// ---------------------------------------------------------------------------

describe('Features section', () => {
  it('renders exactly 6 feature cards', () => {
    const { container } = render(<App />)
    expect(container.querySelectorAll('.feature-card')).toHaveLength(6)
  })

  it.each([
    'Decentralized Security',
    'Frontier Exploration',
    'Constellation Network',
    'Blazing Performance',
    'Open & Permissionless',
    'Deep Research',
  ])('renders the "%s" feature card', (title) => {
    render(<App />)
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('every feature card has a non-empty description', () => {
    const { container } = render(<App />)
    container.querySelectorAll('.feature-desc').forEach((desc) => {
      expect((desc.textContent ?? '').trim().length).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// Roadmap section
// ---------------------------------------------------------------------------

describe('Roadmap section', () => {
  it('renders exactly 4 roadmap phases', () => {
    const { container } = render(<App />)
    expect(container.querySelectorAll('.roadmap-phase')).toHaveLength(4)
  })

  it.each(['Genesis', 'Discovery', 'Expansion', 'Incognita'])(
    'renders the "%s" phase',
    (name) => {
      const { container } = render(<App />)
      const roadmapGrid = container.querySelector('.roadmap-grid')
      expect(roadmapGrid).toHaveTextContent(name)
    },
  )

  it('exactly one phase is marked active', () => {
    const { container } = render(<App />)
    expect(container.querySelectorAll('.phase-active')).toHaveLength(1)
  })

  it('the Discovery phase is the active one', () => {
    render(<App />)
    expect(screen.getByText('Discovery').closest('.roadmap-phase')).toHaveClass('phase-active')
  })

  it('Phase 01 (Genesis) shows the "Complete" badge', () => {
    render(<App />)
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('Phase 02 (Discovery) shows the "Live Now" badge', () => {
    render(<App />)
    expect(screen.getByText('Live Now')).toBeInTheDocument()
  })

  it('every phase has at least one checklist item', () => {
    const { container } = render(<App />)
    container.querySelectorAll('.roadmap-phase').forEach((phase) => {
      expect(phase.querySelectorAll('.phase-items li').length).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// CTA section
// ---------------------------------------------------------------------------

describe('CTA section', () => {
  it('renders the CTA headline', () => {
    render(<App />)
    expect(screen.getByText(/ready to explore/i)).toBeInTheDocument()
  })

  it('all CTA buttons link to X.com', () => {
    const { container } = render(<App />)
    container.querySelectorAll('.cta-buttons a').forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://x.com/TerAustralis')
    })
  })
})

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

describe('Footer', () => {
  it('renders the copyright notice', () => {
    render(<App />)
    expect(screen.getByText(/© 2026 TerAustralis/)).toBeInTheDocument()
  })

  it('has a "Twitter / X" footer link pointing to X.com', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Twitter / X' })).toHaveAttribute(
      'href',
      'https://x.com/TerAustralis',
    )
  })

  it('the social icon button has an aria-label', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'X / Twitter' })).toBeInTheDocument()
  })
})
