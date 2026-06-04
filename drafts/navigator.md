# The Southern Navigator — Wayfinding Layer (Working Draft)

**Status:** Working draft (v0.1) — exploratory, not yet consolidated into the litepaper.
**Companion to:** `starlines-spec.md`, `crystalcore.md`, `unifying-vision.md`, tokenomics draft.

> Note: All wording is original. No copyrighted lyric or external text is incorporated.

---

## 1. What the Navigator is

The **Navigator** is the protocol's **wayfinding layer** — the function that
selects and sequences waypoints into an *open* Starline and resolves how to
traverse it. If Starlines are the paths, the Navigator is how you choose and walk
one. It is anchored, by design, in the Southern Hemisphere.

## 2. Two anchors

- **Geographic anchor (south of the equator).** The protocol's center of gravity
  sits below the equator: Pilbara critical minerals, northern-Australian rotational
  boost corridors, southern-ocean ranges, and southern polar access. The Navigator
  turns that asymmetric geography into routable infrastructure.
- **Celestial anchor (the southern sky).** Northern navigation orients by Polaris;
  the south orients by the **Southern Cross**. This is the literal reference frame
  for southern wayfinding and ties directly into the Constellation Network motif
  already used in the project's public materials.

## 3. Role in the architecture

Navigation is the act of resolving a goal into a concrete, traversable Starline:

1. **Goal** — a desired outcome (e.g. place a payload in a target orbit).
2. **Candidate paths** — all Starlines whose endpoints satisfy the goal.
3. **Openness filter** — discard any Starline that is *blocked* (an unsatisfied
   Law/consent condition at any waypoint — see `starlines-spec.md` §4).
4. **Selection** — among open paths, rank by latency, cadence, cost (coordination
   fees), and reliability.
5. **Sequencing** — emit the ordered traversal plan the coordination layer executes.

The Navigator never overrides Law conditions; a blocked Starline stays blocked.
Consent and regulatory predicates are inputs to routing, never bypassed by it.

## 4. Where it sits in the stack

- **CrystalCore** seeds the origin waypoint.
- **Starlines** are the paths (route + knowledge + law).
- **The Navigator** chooses and sequences an open path — the southern-sky
  wayfinding layer.
- **Tokenomics** rewards advancing the chosen path.

Origin → paths → wayfinding → incentive.

## 5. "One, but many"

Many possible paths exist; navigation is how the many collapse into the one route
actually travelled. The Navigator is the moment "many" becomes "one" in practice.

## 6. Open questions

- Is the Navigator a protocol service, a client-side capability, or both?
- How does ranking degrade under DTN latency, where the openness of distant
  waypoints may be hours/days stale?
- Should routing preferences (e.g. favour consent-rich or lower-impact paths) be
  governance parameters?
- How are competing simultaneous traversals of a shared waypoint arbitrated
  (this connects to launch-window auctions in the litepaper)?
