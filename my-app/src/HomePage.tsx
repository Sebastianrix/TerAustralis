import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import StarCanvas from "./StarCanvas";
import "./HomePage.css";

/* ────────────────────────────────────────────────────────────────
   TerAustralis Incognita — Homepage (advocacy front door)
   Visual language shared with /builders: cosmic dark (#060814),
   purple/cyan gradients, animated starfield, Space Grotesk + Inter.
   Copy approved 5 June 2026. Styling: plain CSS — see HomePage.css
   ──────────────────────────────────────────────────────────────── */

const MILESTONES = [
  {
    phase: "Phase 01", name: "Genesis", badge: "Complete", state: "done" as const,
    items: ["Vision & community seeding", "Early outreach", "Whitepaper v1", "Core team formation"],
  },
  {
    phase: "Phase 02", name: "Discovery", badge: "Live Now", state: "active" as const,
    items: ["Protocol specification", "Architecture refinement", "Stakeholder mapping", "Builder recruitment"],
  },
  {
    phase: "Phase 03", name: "Exploration", badge: "Q3–Q4 2026", state: "soon" as const,
    items: ["Test launch", "Pilot integrations", "Governance experiments", "Consent-aligned land-use primitives"],
  },
  {
    phase: "Phase 04", name: "Settlement", badge: "2027+", state: "soon" as const,
    items: ["Mainnet launch", "Physical coordination pilots", "Sovereign framework engagement", "Initial interplanetary experiments"],
  },
  {
    phase: "Phase 05", name: "Expansion", badge: "Future", state: "soon" as const,
    items: ["Lunar / Mars nodes", "Scaled multiplanetary primitives", "Full decentralisation", "The unknown frontier"],
  },
];

const PILLARS = [
  {
    coord: "20.66°S · 116.71°E — DAMPIER / KARRATHA",
    title: "RECOVERY & TURNAROUND",
    body: "Dampier and Karratha are deep-water industrial ports aligned with the Indian Ocean splashdown zones SpaceX already uses — with the skilled workforce, logistics corridors, and natural gas for on-site propellant. A southern recovery hub means more Starship flights per year, and less single-point dependency.",
  },
  {
    coord: "19.92°S · 148.25°E — BOWEN, QLD",
    title: "LAUNCH FLEXIBILITY",
    body: "Bowen, North Queensland gives the Southern Hemisphere licensed orbital capability and redundancy for weather, range safety, and geopolitical resilience.",
  },
  {
    coord: "THE PILBARA — CRITICAL MINERALS PROVINCE",
    title: "CRITICAL MINERALS",
    body: "Australia leads the world in lithium and is a major source of rare earths and gallium — the materials advanced spacecraft and chips depend on. A trusted, allied supply chain, sovereign and secure.",
  },
];

export default function HomePage() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const els = document.querySelectorAll(".ta-reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("ta-in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email, and message are required.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    // TODO (Sebastianrix): wire to real endpoint before launch.
    // Options: Formspree / Web3Forms / a small serverless function.
    // e.g. await fetch("https://formspree.io/f/XXXXXXXX", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    setSent(true);
  };

  return (
    <>
      <StarCanvas />
      <div className="ta-page">
      {/* ── Nav ── */}
      <header className="ta-nav">
        <div className="ta-container ta-nav__inner">
          <a href="#top" className="ta-nav__brand">
            TERAUSTRALIS <span>INCOGNITA</span>
          </a>
          <nav className="ta-nav__links">
            <a href="#vision">The Vision</a>
            <a href="#case">The Case</a>
            <a href="#milestones">Milestones</a>
            <Link to="/builders">For Builders</Link>
            <a href="#contact" className="ta-nav__contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="ta-hero">
        <div className="ta-hero__glow" aria-hidden="true">
          <div className="ta-orb ta-orb--1" />
          <div className="ta-orb ta-orb--2" />
          <div className="ta-orb ta-orb--3" />
        </div>
        <div className="ta-container ta-hero__content">
          <div className="ta-eyebrow">
            SOUTH-OF-THE-EQUATOR NAVIGATOR · ABN 70 741 068 059
          </div>
          <h1 className="ta-hero__title">
            TERAUSTRALIS
            <br />
            <span>INCOGNITA</span>
          </h1>
          <p className="ta-hero__sub">Australia's role in the multiplanetary era.</p>
          <p className="ta-hero__lede">
            On the old maps, the great southern land was the part no one had
            charted — <em>Terra Australis Incognita</em>, the unknown south. We are
            not the unknown land. We are the navigator who charts it.
          </p>
          <p className="ta-hero__tagline">
            RED DUST TO ROCKETS<span className="ta-violet">.</span>
          </p>
          <div className="ta-hero__ctas">
            <a href="#case" className="ta-btn ta-btn--ghost">Read the case</a>
            <a href="#contact" className="ta-btn ta-btn--violet">Request a conversation</a>
          </div>
        </div>
      </section>

      {/* ── Thesis ── */}
      <section id="vision" className="ta-section ta-reveal">
        <div className="ta-container ta-split">
          <div className="ta-eyebrow">THE THESIS</div>
          <p className="ta-thesis">
            Australia is the natural Southern Hemisphere partner for Starship
            recovery, refurbishment, and the critical minerals the multiplanetary
            economy runs on. The geography is already here. The minerals are
            already here.{" "}
            <span className="ta-violet">What's missing is the decision to lead.</span>
          </p>
        </div>
        <div className="ta-rule" />
      </section>

      {/* ── The Case ── */}
      <section id="case" className="ta-section ta-reveal">
        <div className="ta-container">
          <div className="ta-eyebrow">THE CASE</div>
          <h2 className="ta-h2">THREE PILLARS, ONE SOUTHERN ANCHOR</h2>
          <div className="ta-pillars">
            {PILLARS.map((p) => (
              <article key={p.title} className="ta-pillar">
                <div className="ta-pillar__coord">{p.coord}</div>
                <h3 className="ta-pillar__title">{p.title}</h3>
                <p className="ta-pillar__body">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="ta-rule" />
      </section>

      {/* ── Why now ── */}
      <section className="ta-section ta-reveal">
        <div className="ta-container ta-split">
          <div className="ta-eyebrow">WHY NOW</div>
          <div>
            <p className="ta-whynow">
              The recovery bottleneck is real, the minerals leverage is real, and
              the AUKUS framework already exists to build on. This is a starting
              point, openly developed — not a finished blueprint. The invitation
              is to help chart it.
            </p>
            <p className="ta-partnership">
              PARTNERSHIP WITH TRADITIONAL OWNERS IS FOUNDATIONAL — THE STARTING
              POINT, NOT AN APPROVAL STEP.
            </p>
          </div>
        </div>
        <div className="ta-rule" />
      </section>

      {/* ── Milestones ── */}
      <section id="milestones" className="ta-section ta-reveal">
        <div className="ta-container">
          <div className="ta-roadmap__head">
            <div className="ta-eyebrow">MILESTONES</div>
            <h2 className="ta-roadmap__title">THE EXPEDITION PLAN</h2>
            <p className="ta-roadmap__sub">
              From genesis to multiplanetary settlement — each phase charts new
              territory in the open frontier.
            </p>
          </div>
          <div className="ta-roadmap-list">
            {MILESTONES.map((m, i) => (
              <div key={m.phase} className={`ta-rm-item ta-rm-item--${m.state}`}>
                <div className="ta-rm-line">
                  <div className="ta-rm-dot" />
                  {i < MILESTONES.length - 1 && <div className="ta-rm-connector" />}
                </div>
                <div className="ta-rm-body">
                  <div className="ta-rm-header">
                    <span className="ta-rm-phase">{m.phase}</span>
                    <span className={`ta-rm-badge ta-rm-badge--${m.state}`}>{m.badge}</span>
                  </div>
                  <div className="ta-rm-name">{m.name}</div>
                  <ul className="ta-rm-items">
                    {m.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ta-rule" />
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="ta-contact ta-reveal">
        <div className="ta-container ta-contact__grid">
          <div>
            <div className="ta-eyebrow">CONTACT</div>
            <h2 className="ta-h2 ta-contact__title">
              IF YOU CAN MOVE THIS FORWARD — LET'S TALK.
            </h2>
            <p className="ta-contact__sub">
              In government, at SpaceX, in industry. Serious conversations
              welcome; detailed materials available under NDA.
            </p>
          </div>

          {sent ? (
            <div className="ta-sent">
              <div className="ta-sent__title">
                MESSAGE SENT<span className="ta-violet">.</span>
              </div>
              <p>Thank you — your request has been received. You'll hear back directly.</p>
            </div>
          ) : (
            <form className="ta-form" onSubmit={submit} noValidate>
              <div className="ta-form__row">
                <label>
                  <span>Name</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                  />
                </label>
                <label>
                  <span>Organisation</span>
                  <input
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    autoComplete="organization"
                  />
                </label>
              </div>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
              </label>
              <label>
                <span>Message</span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>
              {error && <p className="ta-error">{error}</p>}
              <button type="submit" className="ta-btn ta-btn--violet">
                Request a conversation
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="ta-footer">
        <div className="ta-container ta-footer__inner">
          <div className="ta-footer__meta">
            TERAUSTRALIS INCOGNITA · ABN 70 741 068 059 · @TERAUSTRALIS
          </div>
          <Link to="/builders" className="ta-footer__builders">
            Building the open coordination layer underneath all this? → For Builders
          </Link>
        </div>
      </footer>
      </div>
    </>
  );
}
