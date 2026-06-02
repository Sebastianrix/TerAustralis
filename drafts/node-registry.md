# Node Registry & Identifiers (Working Draft)

**Status:** Working draft (v0.1) — exploratory, not yet consolidated into the litepaper.
**Companion to:** `australian-node-network.md`, `crystalcore.md`, `starlines-spec.md`.

> Note: All wording is original. Names of real public figures appear here only as
> **honorary / symbolic** node references and are **consent-pending** — no real
> person is claimed as a participant without their free, informed consent. Literary
> or cultural references (e.g. a handle inspired by an author) are used as homage,
> not reproduction.

---

## 1. What a node identifier is

Every node in the network — physical site, participant, or symbolic anchor — can
carry a stable **identifier**. An identifier is a handle, not a claim of ownership
or authority; it is how a node is referenced across Starlines and the registry.

Proposed shape: a **region tag + number**, optionally paired with a **symbolic
name**.

```
<REGION>-<NUMBER>  [symbolic name]
```

**Region tags are open-ended.** Like the litepaper itself, the registry is a *living
document*: region tags are not a fixed list (AU, UK, …) — new ones can be added
freely as the network grows, so honorary and participating nodes can keep joining
from anywhere on (and eventually beyond) Earth.

## 2. Registry (provisional)

| Identifier | Who / what | Notes |
|---|---|---|
| **451 — Bradbury** | The founder / keeper node | Homage to *Fahrenheit 451* — the keeper of knowledge and stories; aligns with the genesis-keeper role (`crystalcore.md`) and genesis seed `29091991`. |
| **UK-456** | Ren (honorary) | A UK node, and the first of the **Rens** (see archetypes below). Honorary/symbolic; consent-pending before any public use. |

*This table is provisional and will grow. Real public figures remain honorary and
consent-pending unless and until they choose to participate.*

## 2a. Node archetypes — the Rens (Mockingbirds)

The **Rens** are a class of node: the **singers, the voices, the artists**. Their
archetype is the **Mockingbird**.

- **Many songs in one voice.** A mockingbird sings many birds' songs through a single
  throat — which is *"one, but many"* given wings. The Rens carry many voices as one.
- **It only gives.** In the spirit of the mockingbird that "does nothing but sing for
  us," a Ren node harms no one; it adds beauty and voice to the network. Silencing one
  is treated as a wrong, not a neutral act.
- **Creed: *spread the bird, not the word.*** The Rens spread **song, voice, and
  freedom of expression** — not dogma, doctrine, or rigid text. This is the
  permissionless, builder-first ethos rendered as culture: many voices, freely sung,
  no gatekeeper.
- **Birds like angels — messengers.** *Angel* means *messenger*. The Rens are
  messengers who carry song **between earth and sky** — fitting the sky-above /
  water-below frame: the voices are the ones who travel *between*. Their angel-number
  resonance is **444** — long associated with protection, guidance, and presence — a
  fitting marker for voices that watch over and uplift.

Any real singer or artist named as a Ren is **honorary and consent-pending** — a
voice is honored, never claimed — and becomes a participating node only through the
affirmative consent step (§4).

## 3. Relationship to the architecture

- **CrystalCore** (`crystalcore.md`) is the genesis keystone; **451 — Bradbury** is
  the founder's node handle within the registry, consistent with that role.
- **Starlines** (`starlines-spec.md`) reference nodes by identifier when describing
  routes and waypoints.
- **Australian node network** (`australian-node-network.md`) covers physical
  Australian sites; this registry is broader (people and international nodes too).

## 4. From honorary to participating (the consent step)

An **honorary** node and a **participating** node are different things, and the line
between them is consent — the freely-given *yes* (see the affirmative-consent framing
in the litepaper and `unifying-vision.md`).

- **Honorary node** — a symbolic acknowledgment or inspiration. It carries **no
  obligations, no rights, and no claim** on the named person or entity. It can be
  added freely as recognition, and **removed at the named party's request**, no
  reason required.
- **Participating node** — an actual member of the network, with the ability to
  stake, operate, and take part in governance, along with the responsibilities that
  come with that.

The transition only ever runs **honorary → participating by the node's own yes** —
never automatically, never assumed:

1. **Invitation / approach** — the honorary node is approached openly, with *"no"*
   treated as a complete and respected answer.
2. **Affirmative consent** — the named party freely opts in. Their *yes* is recorded
   as a verifiable `consent(...)` artifact, the same mechanism Starlines use for
   consent conditions (`starlines-spec.md` §4).
3. **Activation** — the node's identifier becomes an **active** participating node;
   rights and responsibilities (staking, operation, governance) attach from here.
4. **Ongoing & revocable** — consent is not a one-time capture. A participating node
   may step back to honorary, or leave entirely, at its own word. The *yes* must stay
   true to remain in force.

This keeps the registry honest: no one is ever made a real participant without
choosing it, and choosing it is always reversible.

## 5. Open questions

- How are identifiers issued and verified (self-assigned, attested, governance-granted)?
- Should symbolic names be optional, encouraged, or reserved for specific roles?
- How are honorary listings surfaced respectfully (e.g. clearly labelled as honorary
  so they are never mistaken for endorsements)?
