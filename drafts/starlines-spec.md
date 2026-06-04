# Starlines — Coordination Primitive Spec (Working Draft)

**Status:** Working draft (v0.1) — exploratory, not yet consolidated into the litepaper.
**Companion to:** TerAustralis Incognita Protocol litepaper (root `README.md`).

> ⚠️ **Naming is provisional and consent-pending.** "Starlines" is inspired by
> Aboriginal **songlines** (Dreaming tracks) — sacred cultural and intellectual
> property of specific Aboriginal nations, including their celestial/navigational
> dimensions (Aboriginal astronomy). Under the protocol's own **Indigenous
> Sovereignty & Consent (FPIC)** principle, the *name and cultural framing of this
> primitive must not be finalized or published externally without genuine
> partnership and free, prior, and informed consent* from the relevant custodians.
> The **technical structure** below stands on its own engineering merits and can be
> developed in parallel; the **framing** is held as provisional pending that
> engagement. If consent is not granted, the primitive is renamed and reframed
> while keeping the underlying mechanism.

---

## 1. Motivation

The litepaper describes a coordination layer, physical-asset primitives, an
incentive/settlement layer, and an interplanetary extension as separate modules.
In practice these need a single organizing object that operations attach to.

Songlines encode three things simultaneously: a **route** across Country, the
**knowledge** required to travel it, and the **law / custodianship** that governs
passage. That triad maps almost exactly onto what a multi-domain coordination
path requires. A **Starline** adopts this structure as a first-class protocol
primitive.

## 2. Definition

A **Starline** is a verifiable, ordered coordination path connecting nodes,
assets, and milestones across Earth → orbit → interplanetary space. Every
Starline bundles three fields:

| Field | Songline analogue | Protocol content |
|---|---|---|
| **Route** | The track across Country/sky | Ordered sequence of **waypoints** (assets, locations, milestones) |
| **Knowledge** | Song, story, star map | Blueprints, signed telemetry, reproducible simulations, capability attestations attached to each waypoint |
| **Law** | Custodianship, lore, permission to travel | Rules, attestations, and **consent conditions** that determine whether the path is *open* |

A Starline is **open** only when every waypoint's Law conditions are satisfied.
Otherwise it is **blocked** at the first unsatisfied waypoint.

### 2.1 Waypoints

A waypoint is a node on the route. Examples:

```
Pilbara ISRU → propellant depot → Bowen pad → launch window
            → recovery → refurbishment → orbital node → transfer
```

Each waypoint carries:
- **Type** — e.g. ISRU site, depot, launch pad, recovery zone, orbital node.
- **Capability attestations** — verifiable status (operational, certified, available).
- **Knowledge refs** — content-addressed pointers to blueprints/telemetry/sims.
- **Law conditions** — preconditions that must hold to traverse (see §4).
- **Milestone(s)** — optional reward-bearing achievements (see §5).

## 3. How Starlines unify the stack

- **Coordination layer** — operations are scheduled *along* a Starline rather than
  as loose transactions; the Starline is the unit of high-cadence orchestration.
- **Physical-asset primitives** — pads, depots, ISRU facilities, and robotics
  swarms are waypoints; their capability attestations gate progression.
- **Incentive & settlement layer** — milestones live on waypoints; rewards unlock
  when a waypoint is verifiably traversed. "Builder-first" becomes literal: you
  earn by advancing a Starline.
- **Interplanetary extension** — Starlines extend off-world; DTN store-and-forward
  paths *are* the lines reaching outward. The metaphor and the mechanism are the
  same object.

## 4. The Law field (consent as a native property)

Because each waypoint carries its own **Law** conditions, consent is not a
bolt-on — it is intrinsic to traversal.

A Law condition is a verifiable predicate, e.g.:
- `attestation(capability=operational, signer ∈ stakedAttestors)`
- `consent(ILUA_ref, status=active, signer ∈ recognizedCustodians)`
- `regulatory(license_ref, valid=true)` (e.g. Space (Launches and Returns) Act 2018)
- `challengeWindow(elapsed=true, disputes=0)`

**Consent-gating example:** a Starline whose route crosses Country includes, at
the relevant waypoint, a `consent(...)` Law condition that can only be satisfied
by an attestation from a recognized custodian (e.g. a Prescribed Body Corporate)
referencing an active ILUA / FPIC determination. Until that attestation exists,
the Starline is **blocked** at that waypoint and **no downstream milestone reward
can release**. Consent becomes a hard precondition in code, not a promise in prose.

## 5. Milestones, traversal, and rewards

Reward release is tied to **verified traversal** of a milestone-bearing waypoint:

1. **Claim** — a builder/operator claims a waypoint milestone is complete,
   referencing the required Knowledge artifacts (signed telemetry, license refs).
2. **Attest** — one or more **staked attestors** sign completion. Attestation
   bonds are slashable for false signatures.
3. **Challenge window** — any bonded party may dispute during a fixed window
   (optimistic verification).
4. **Release** — if the Law conditions hold and no successful challenge occurs,
   the milestone reward releases from the Builder Treasury (see tokenomics draft).

This layering keeps the system permissionless-leaning while acknowledging that
genesis will rely on a smaller, reputable attestor set that decentralizes over
time.

## 6. Open questions

- **Composition** — can Starlines branch/merge, or are they strictly linear? (A
  DAG of waypoints is more expressive but harder to reason about for rewards.)
- **Ownership** — who "holds" a Starline? Proposer, custodians collectively, or no
  one (purely a shared object)?
- **Law expressiveness** — how rich should the predicate language be without
  becoming an unbounded scripting surface (security/attack consideration)?
- **Off-world Law** — how do consent/regulatory predicates degrade gracefully
  under DTN latency where attestors are hours/days away?
- **Naming & framing** — pending the consent/partnership engagement above.

## 7. Relationship to other drafts

- **Tokenomics** — the Builder Treasury and milestone-gated unlocks referenced in
  §5 are specified in the tokenomics working draft (to be added).
- **Litepaper** — once Starlines stabilizes *and* the naming/framing consent
  question is resolved, the strongest elements consolidate back into `main` with a
  minor version bump and a changelog entry, per the litepaper's iteration rules.
