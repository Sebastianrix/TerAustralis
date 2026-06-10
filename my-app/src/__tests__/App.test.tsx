import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

// Stubs for jsdom gaps: IntersectionObserver (HomePage reveal effect) and
// canvas + animation frames (BuildersPage starfield).
class IntersectionObserverStub {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  })) as unknown as typeof HTMLCanvasElement.prototype.getContext
  vi.stubGlobal('requestAnimationFrame', vi.fn(() => 42))
  vi.stubGlobal('cancelAnimationFrame', vi.fn())
})

describe('Routing', () => {
  it('renders the advocacy homepage at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(/RED DUST TO ROCKETS/)).toBeInTheDocument()
  })

  it('renders the builders page at /builders', () => {
    render(
      <MemoryRouter initialEntries={['/builders']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Discovery Phase — Live/)).toBeInTheDocument()
  })
})
