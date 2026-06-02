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

## 2. Registry (provisional)

| Identifier | Who / what | Notes |
|---|---|---|
| **451 — Bradbury** | The founder / keeper node | Homage to *Fahrenheit 451* — the keeper of knowledge and stories; aligns with the genesis-keeper role (`crystalcore.md`) and genesis seed `29091991`. |
| **UK-456** | Ren (honorary) | A UK node. Honorary/symbolic; consent-pending before any public use. |

*This table is provisional and will grow. Real public figures remain honorary and
consent-pending unless and until they choose to participate.*

## 3. Relationship to the architecture

- **CrystalCore** (`crystalcore.md`) is the genesis keystone; **451 — Bradbury** is
  the founder's node handle within the registry, consistent with that role.
- **Starlines** (`starlines-spec.md`) reference nodes by identifier when describing
  routes and waypoints.
- **Australian node network** (`australian-node-network.md`) covers physical
  Australian sites; this registry is broader (people and international nodes too).

## 4. Open questions

- Region tags: fixed list (AU, UK, …) or open-ended?
- How are identifiers issued and verified (self-assigned, attested, governance-granted)?
- How does an honorary node become an actual participating node (the consent step)?
- Should symbolic names be optional, encouraged, or reserved for specific roles?
