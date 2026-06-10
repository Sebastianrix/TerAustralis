import { render, screen, within } from '@testing-library/react'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import BuildersPage from '../BuildersPage'

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

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/builders']}>
      <BuildersPage />
    </MemoryRouter>,
  )
}

// ---------------------------------------------------------------------------
// StarCanvas lifecycle
// ---------------------------------------------------------------------------

describe('StarCanvas', () => {
  it('renders a canvas element', () => {
    const { container } = renderPage()
    expect(container.querySelector('canvas.stars-canvas')).toBeInTheDocument()
  })

  it('cancels the animation frame on unmount', () => {
    const { unmount } = renderPage()
    unmount()
    expect(mockCancelAnimationFrame).toHaveBeenCalledWith(42)
  })

  it('removes the resize event listener on unmount', () => {
    const spy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderPage()
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
    renderPage()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('logo links back to the homepage', () => {
    renderPage()
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByRole('link', { name: /TerAustralis/ })).toHaveAttribute('href', '/')
  })

  it('Protocol link points to #protocol', () => {
    renderPage()
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByRole('link', { name: 'Protocol' })).toHaveAttribute('href', '#protocol')
  })

  it('Values link points to #values', () => {
    renderPage()
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByRole('link', { name: 'Values' })).toHaveAttribute('href', '#values')
  })

  it('Roadmap link points to #roadmap', () => {
    renderPage()
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByRole('link', { name: 'Roadmap' })).toHaveAttribute('href', '#roadmap')
  })

  it('Community link points to X.com', () => {
    renderPage()
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
    const { container } = renderPage()
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
    renderPage()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TerAustralis')
  })

  it('renders the Incognita subtitle', () => {
    const { container } = renderPage()
    expect(container.querySelector('.hero-subtitle')).toHaveTextContent('Incognita')
  })

  it('renders the Discovery phase badge', () => {
    renderPage()
    expect(screen.getByText(/Discovery Phase — Live/i)).toBeInTheDocument()
  })

  it('renders the hero description', () => {
    renderPage()
    expect(screen.getByText(/coordination layer for high-cadence/i)).toBeInTheDocument()
  })

  it('renders the "Explore the Protocol" CTA', () => {
    renderPage()
    expect(screen.getByText(/explore the protocol/i)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Stats bar
// ---------------------------------------------------------------------------

describe('Stats bar', () => {
  it.each([
    ['v0.2.4', 'litepaper version'],
    ['< 1s', 'target finality'],
    ['5', 'protocol layers'],
    ['$TINC', 'native token'],
  ])('renders the %s stat', (value) => {
    const { container } = renderPage()
    const statsBar = container.querySelector('.stats-bar')
    expect(statsBar).toHaveTextContent(value)
  })
})

// ---------------------------------------------------------------------------
// Protocol stack section
// ---------------------------------------------------------------------------

describe('Protocol stack section', () => {
  it('renders exactly 5 stack layers', () => {
    const { container } = renderPage()
    expect(container.querySelectorAll('.stack-item')).toHaveLength(5)
  })

  it.each([
    'Coordination Layer',
    'Physical Asset Primitives',
    'Data & Intelligence Layer',
    'Incentive & Settlement Layer',
    'Interplanetary Extension',
  ])('renders the "%s" layer', (title) => {
    renderPage()
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('every stack layer has a non-empty description', () => {
    const { container } = renderPage()
    container.querySelectorAll('.stack-desc').forEach((desc) => {
      expect((desc.textContent ?? '').trim().length).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// Values section
// ---------------------------------------------------------------------------

describe('Values section', () => {
  it('renders exactly 7 value cards', () => {
    const { container } = renderPage()
    expect(container.querySelectorAll('.value-card')).toHaveLength(7)
  })

  it.each([
    'Permissionless & Open',
    'Indigenous Sovereignty & Consent',
    'Blazing Performance',
    'First-Principles',
    'Southern Advantage',
    'Builder-First',
    'Multiplanetary Long-Termism',
  ])('renders the "%s" value card', (title) => {
    renderPage()
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('every value card has a non-empty description', () => {
    const { container } = renderPage()
    container.querySelectorAll('.value-desc').forEach((desc) => {
      expect((desc.textContent ?? '').trim().length).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// Roadmap section
// ---------------------------------------------------------------------------

describe('Roadmap section', () => {
  it('renders exactly 5 roadmap phases', () => {
    const { container } = renderPage()
    expect(container.querySelectorAll('.roadmap-item')).toHaveLength(5)
  })

  it.each(['Genesis', 'Discovery', 'Exploration', 'Settlement', 'Expansion'])(
    'renders the "%s" phase',
    (name) => {
      const { container } = renderPage()
      const roadmapList = container.querySelector('.roadmap-list')
      expect(roadmapList).toHaveTextContent(name)
    },
  )

  it('exactly one phase is marked active', () => {
    const { container } = renderPage()
    expect(container.querySelectorAll('.rm-active')).toHaveLength(1)
  })

  it('the Discovery phase is the active one', () => {
    renderPage()
    expect(screen.getByText('Discovery').closest('.roadmap-item')).toHaveClass('rm-active')
  })

  it('Phase 01 (Genesis) shows the "Complete" badge', () => {
    renderPage()
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('Phase 02 (Discovery) shows the "Live Now" badge', () => {
    renderPage()
    expect(screen.getByText('Live Now')).toBeInTheDocument()
  })

  it('every phase has at least one checklist item', () => {
    const { container } = renderPage()
    container.querySelectorAll('.roadmap-item').forEach((phase) => {
      expect(phase.querySelectorAll('.rm-items li').length).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// CTA section
// ---------------------------------------------------------------------------

describe('CTA section', () => {
  it('renders the CTA headline', () => {
    renderPage()
    expect(screen.getByText(/build the southern starport/i)).toBeInTheDocument()
  })

  it('all CTA section links point to X.com', () => {
    const { container } = renderPage()
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
    renderPage()
    expect(screen.getByText(/© 2026 TerAustralis/)).toBeInTheDocument()
  })

  it('has a "Twitter / X" footer link pointing to X.com', () => {
    renderPage()
    expect(screen.getByRole('link', { name: 'Twitter / X' })).toHaveAttribute(
      'href',
      'https://x.com/TerAustralis',
    )
  })

  it('the social icon button has an aria-label', () => {
    renderPage()
    expect(screen.getByRole('link', { name: 'X / Twitter' })).toBeInTheDocument()
  })
})
