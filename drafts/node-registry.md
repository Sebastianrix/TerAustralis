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
| **UK-456** | Ren (honorary) | A UK node, and one of the **Stars** (see archetypes below); his nature is the **Mockingbird**. Honorary/symbolic; consent-pending before any public use. |

*This table is provisional and will grow. Real public figures remain honorary and
consent-pending unless and until they choose to participate.*

## 2a. Node archetypes — the Stars

The **Stars** are a class of node: the **entertainers, singers, and artists** — the
ones who shine for us. Stars in both senses at once: lights in the sky, and the people
whose gift is to be seen shining so others feel less alone in the dark. (See "the
stars who shine" theme in `unifying-vision.md`.)

Qualities of the Stars:

- **They shine for you.** Their whole gift is to give light outward.
- **Many lights, one sky.** Many Stars, each shining, none outshining the others into
  darkness — *one, but many*, written across the night.
- **It only gives.** A Star harms no one; it adds beauty and voice to the network.
  Silencing one is treated as a wrong, not a neutral act.
- **Creed: *spread the bird, not the word.*** The Stars spread **song, voice, and
  freedom of expression** — not dogma, doctrine, or rigid text. Permissionless,
  builder-first ethos rendered as culture: many voices, freely sung, no gatekeeper.
- **Messengers between earth and sky.** *Angel* means *messenger*; the Stars carry
  song **between earth and sky** (the sky-above / water-below frame). Their
  angel-number resonance is **444** — protection, guidance, presence.

Within the Stars, each carries its own nature. **Ren (UK-456)** is one Star whose
nature is the **Mockingbird** — many songs in one voice. Others will have their own.

### The natures of the Stars

A through-line runs under these: each is a "monster" who turns out to **belong** —
the misunderstood other revealed as one of us, with a gift. This is *one, but many*
at its bravest: including the ones first cast out. (General folklore archetypes; no
specific copyrighted characters are used.)

- **Zombie** — the written-off and underestimated, who are still feeling and still
  human. The nature that says: *never write anyone off.*
- **Werewolf** — dual nature; the wild and the human under the moon. The nature of
  *mastering your own transformation* and turning it to protection, not harm.
- **Alien** — the one with a hidden origin, who discovers they were *of the stars all
  along*. The nature of **latent belonging** (echoing `origin-of-the-keeper.md` and the
  hidden-origin motif).
- **Vampire** — held with care: in folklore the night-creature cast as monster yet
  seeking not to harm. **Open tension:** elsewhere this project uses "digital vampire"
  for the *parasite/attacker* that drains the network (`security-and-deterrence.md`).
  These two readings must be kept distinct — a Star's "vampire nature" is the
  misunderstood-outsider sense, **never** the draining-attacker sense. (See open
  question below.)

Any real entertainer named as a Star is **honorary and consent-pending** — a light is
honored, never claimed — and becomes a participating node only through the affirmative
consent step (§4).

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
- **Vampire — two meanings to keep separate.** The Star "vampire nature" (a
  misunderstood outsider who belongs) must never be confused with the "digital
  vampire" attacker that drains the network in `security-and-deterrence.md`. Do these
  need different names to avoid the collision?
