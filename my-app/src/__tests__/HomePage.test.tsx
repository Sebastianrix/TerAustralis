import { render, screen, within, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../HomePage'

// jsdom has no IntersectionObserver — stub it so the reveal-on-scroll
// effect doesn't throw.
class IntersectionObserverStub {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)
})

function renderPage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

describe('Hero', () => {
  it('renders the h1 with the brand name', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/TERAUSTRALIS/)
  })

  it('renders the tagline', () => {
    renderPage()
    expect(screen.getByText(/RED DUST TO ROCKETS/)).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    renderPage()
    expect(screen.getByText(/Australia's role in the multiplanetary era/)).toBeInTheDocument()
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

  it('"For Builders" nav link routes to /builders', () => {
    renderPage()
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByRole('link', { name: 'For Builders' })).toHaveAttribute(
      'href',
      '/builders',
    )
  })

  it('footer builders link routes to /builders', () => {
    renderPage()
    expect(
      screen.getByRole('link', { name: /Building the open coordination layer/ }),
    ).toHaveAttribute('href', '/builders')
  })
})

// ---------------------------------------------------------------------------
// The Case
// ---------------------------------------------------------------------------

describe('The Case', () => {
  it.each(['RECOVERY & TURNAROUND', 'LAUNCH FLEXIBILITY', 'CRITICAL MINERALS'])(
    'renders the "%s" pillar',
    (title) => {
      renderPage()
      expect(screen.getByText(title)).toBeInTheDocument()
    },
  )

  it('every pillar has a non-empty body', () => {
    const { container } = renderPage()
    const bodies = container.querySelectorAll('.ta-pillar__body')
    expect(bodies).toHaveLength(3)
    bodies.forEach((body) => {
      expect((body.textContent ?? '').trim().length).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------

describe('Contact form', () => {
  it('shows an error when required fields are missing', () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /request a conversation/i }))
    expect(screen.getByText(/name, email, and message are required/i)).toBeInTheDocument()
  })

  it('shows an error for an invalid email address', () => {
    renderPage()
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Crystal' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'not-an-email' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: /request a conversation/i }))
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument()
  })

  it('shows the sent state after a valid submission', () => {
    renderPage()
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Crystal' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'crystal@example.com' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: /request a conversation/i }))
    expect(screen.getByText(/MESSAGE SENT/)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

describe('Footer', () => {
  it('renders the ABN and handle', () => {
    renderPage()
    expect(screen.getByText(/ABN 70 741 068 059 · @TERAUSTRALIS/)).toBeInTheDocument()
  })
})
