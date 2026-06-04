# $TINC Tokenomics & Incentives (Working Draft)

**Status:** Working draft (v0.1) — exploratory, not yet consolidated into the litepaper.
**Companion to:** litepaper (root `README.md`), `starlines-spec.md`, `navigator.md`, `crystalcore.md`, `unifying-vision.md`.

> Note: All wording is original. Nothing in this draft is legal, financial, or
> investment advice. Token characterization is subject to formal legal/regulatory
> review in the Exploration phase. All numbers are indicative and adjustable.

---

## 1. Design intent

$TINC must encode the litepaper's principles in mechanism, not just prose:

- **Builder-first** — value flows to those who advance physical/technical milestones.
- **Permissionless & open** — anyone can participate, build, or govern.
- **Indigenous Sovereignty & Consent** — consent is a *precondition* to value, not an afterthought.
- **Complement sovereign regulation** — designed to sit alongside the Space (Launches and Returns) Act 2018 and SOCI Act 2018, not around them.

## 2. Token role: work-enabling utility

$TINC does three jobs, kept deliberately narrow to keep the regulatory surface clean:

- **Coordination gas** — pays for launch-window auctions, swarm-coordination txns, data writes, and settlement.
- **Staking collateral** — nodes, attestors, and data providers bond $TINC to participate; misbehavior is slashable.
- **Governance weight** — protocol parameters, treasury allocation, and milestone definitions.

**Regulatory posture (proposed):** utility-first, with an explicit statement that
formal characterization (incl. any ASIC / Corporations Act review) is part of the
Exploration phase. Avoid profit-expectation language in public artifacts.

## 3. Supply model (proposed: hybrid)

- **Hard cap** — fixed maximum supply (scarcity, regulator-legible).
- **Milestone-gated Builder Treasury** — the core incentive engine; releases *only*
  as physical/technical milestones are verifiably traversed (see §5), not on a
  calendar. This is the mechanical form of "builder-first."
- **Fee recycling** — coordination fees recycle into the treasury rather than being
  burned, so once real network activity exists, builder rewards become
  self-sustaining without inflation.

*Alternatives considered: pure fixed-cap (simplest, finite reward budget) and
controlled emissions (sustainable but dilutive and harder to characterize). Hybrid
chosen as the best fit for builder-first + scarcity + sustainability — open to revision.*

## 4. Indicative allocation

| Bucket | % | Notes |
|---|---|---|
| Builder Treasury (milestone-gated) | 35% | Core incentive engine; releases on verified milestones |
| Ecosystem / grants / bounties | 15% | Discovery & Exploration builder recruitment |
| Core contributors | 15% | Long vest (4yr+), milestone cliffs |
| Country & Custodian allocation | 10% | Structured *with* recognized custodians; see §6 |
| Community / public distribution | 15% | Permissionless participation |
| Liquidity & operations | 10% | — |

Founding allocations (incl. any tied to **CrystalCore**, per `crystalcore.md`) sit
within "Core contributors," transparent and vested, with no privileged economics
beyond what is disclosed.

## 5. Milestone verification & reward release

Off-chain hardware/policy work rewarded on-chain is the central oracle problem.
Proposed layered design:

1. **Claim** — a builder claims a Starline waypoint milestone is complete,
   referencing required Knowledge artifacts (signed telemetry, license refs).
2. **Attest** — staked attestors sign completion; attestation bonds are slashable
   for false signatures.
3. **Challenge window** — any bonded party may dispute during a fixed window
   (optimistic verification).
4. **Release** — if Law conditions hold (see §6) and no successful challenge
   occurs, the reward releases from the Builder Treasury.

Genesis will lean on a smaller, reputable attestor set (CrystalCore among them
early), decentralizing over time per `crystalcore.md` §5.

## 6. Consent as a precondition to value

Consent-gating is enforced at the Starline Law layer (`starlines-spec.md` §4) and
therefore at the point of reward release:

- Any land-use / physical-infrastructure milestone carries a `consent(...)` Law
  condition satisfiable **only** by a recognized custodian (e.g. a Prescribed Body
  Corporate) referencing an active ILUA / FPIC determination.
- Until that attestation exists, the milestone is **blocked** and **no reward can
  release**. Consent is mechanical, not promissory.
- The **Country & Custodian allocation (§4)** provides a structural economic stake,
  designed *with* custodians rather than presumed.

## 7. Value flow summary

```
coordination activity ── fees ──▶ Builder Treasury (recycled)
                                      │
   verified milestone (attested, ─────┘
   consent satisfied, unchallenged)
                                      │
                                      ▼
                          reward to the builder
```

Origin (CrystalCore) → paths (Starlines) → wayfinding (Navigator) → **incentive (this doc)**.

## 8. Open questions

- Hard-cap figure, emission/recycling rates, and treasury release curve.
- Attestor-set size, bonding amounts, slashing severity, and challenge-window length.
- Whether the Country & Custodian allocation is a fixed % (as above), a revenue
  share, consent-gated unlocks, or a combination — to be designed *with* custodians.
- Governance model and voting weight (token-weighted vs. contribution-weighted vs. hybrid).
- Legal characterization and jurisdiction strategy (Exploration-phase legal review).
