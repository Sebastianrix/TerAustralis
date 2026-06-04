# CrystalCore — Genesis Steward Concept (Working Draft)

**Status:** Working draft (v0.1) — exploratory, not yet consolidated into the litepaper.
**Companion to:** litepaper (root `README.md`), `starlines-spec.md`, `unifying-vision.md`.

> Note: All wording in this document is original. No song lyric or other
> copyrighted text is incorporated. If a lyric or external phrase is ever wanted
> for a public artifact, it must be licensed/cleared first (see
> `unifying-vision.md`).

---

## 1. What CrystalCore is

**CrystalCore** is the protocol's **genesis keystone** — the founding stewardship
identity from which the first Starlines are seeded and the initial shared state is
held in trust. It connects to **Crystal Elle Arena-Turner**, named in the litepaper
as the initiator and maintainer of the vision.

CrystalCore is a **keeper-in-trust role**, not a seat of permanent authority. It
holds the founding parameters — the genesis configuration, the first canonical
Starline, and the initial law/consent conventions — until the network is ready to
carry them itself.

**Genesis identifier.** The founder is associated with the genesis seed
**`29091991`** — the origin stamp that marks the first canonical Starline and the
genesis identity. The human counterpart to this *who* is the *why*: the Guardian
Constellation (see `guardian-constellation.md`), the next generation the flame is
kept for.

## 2. Why it exists

Every decentralized system has a genesis moment: someone defines the first state,
the first rules, and the first canonical path before anyone else can build on them.
Naming and bounding that role honestly is healthier than pretending it doesn't
exist. CrystalCore makes the founding stewardship **explicit, accountable, and
time-bounded** rather than implicit and indefinite.

## 3. Role in the architecture

- **Starlines** — CrystalCore is the **origin waypoint**: the first node every early
  Starline traces back to, and the issuer of the first canonical route + knowledge +
  law template.
- **Attestation** — CrystalCore acts as an early **genesis attestor** while the
  staked attestor set bootstraps, then steps back as that set matures.
- **Governance** — CrystalCore holds founding parameters in trust and is designed to
  **dissolve into the community** over a defined path (see §5).
- **"One, but many"** — CrystalCore is the single point the many first gather
  around: the keystone that lets the arch stand, then carries no special weight once
  the arch is complete.

## 4. Explicit non-goals (guardrails)

To keep the role credible and avoid a permanent throne or personality cult:

- **Not** a permanent governance seat or veto.
- **Not** a privileged economic position beyond transparent, vested founding
  allocations already described in the tokenomics draft.
- **Not** a unilateral controller of consent decisions — custodian/ILUA attestations
  remain with recognized custodians, never with CrystalCore.
- **Not** a required dependency once decentralization milestones are met.

## 5. Sunset / decentralization path

CrystalCore is designed to **hand the flame onward**. Indicative milestones:

1. **Genesis** — CrystalCore defines initial parameters, the first canonical
   Starline, and the law/consent conventions.
2. **Bootstrap** — staked attestor set and early governance come online; CrystalCore
   co-signs but no longer signs alone.
3. **Distribution** — founding parameters become community-amendable; CrystalCore's
   special signing rights are time-locked toward expiry.
4. **Dissolution** — CrystalCore's privileged roles formally retire; it persists only
   as a historical origin waypoint, with no ongoing special authority.

Each transition should be **on-chain, auditable, and irreversible** in the
decentralizing direction — consistent with the litepaper's "auditable evolution"
and "permissionless" commitments.

## 6. Open questions

- Should CrystalCore be a single key, a multisig, or a small founding council from
  the outset?
- What concretely triggers each sunset milestone — time, network metrics, governance
  vote, or a combination?
- How is the "historical origin waypoint" preserved meaningfully without becoming a
  de facto center of gravity?
- How does CrystalCore's genesis attestation interact with the consent-gating in
  `starlines-spec.md` (it must never substitute for custodian consent)?
