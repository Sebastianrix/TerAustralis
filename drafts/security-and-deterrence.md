# Honesty & Truth — Security and Deterrence (Working Draft)

**Status:** Working draft (v0.1) — exploratory, not yet consolidated into the litepaper.
**Companion to:** `tokenomics.md`, `starlines-spec.md`, `navigator.md`, `crystalcore.md`.

> Note: All wording is original. No copyrighted character, story, or text is used.

---

## 1. The guardian is the truth

TerAustralis does not protect itself with secrecy or with a scary face. It protects
itself with **honesty and truth made structural** — the system is built so that the
truth always surfaces, and honest behavior always pays better than dishonest
behavior. To a bad actor, that is the real deterrent: a place where lies cannot
survive and cheating cannot win.

This is both a **value** (truth as a first principle) and a **mechanism** (the
crypto-economic design below). The two are the same thing pointed in one direction.

### The adversary: the Noise

If truth is **signal**, the adversary is **the Noise** — everything that corrupts the
signal, drowns out the true voices, and muddies what is real: false attestations,
spam, Sybil swarms, consent violations, fraud, tampering. The Noise does not need a
scary face; it is simply interference against the truth.

This naming matters across the project: the **Stars** (`node-registry.md`) are the
true *signal* — voices that shine and sing — and the **Noise** is what works against
them. (It also keeps "vampire" free for its proper, misunderstood-outsider meaning
among the Star natures, rather than the attacker.) Everything below is how the
protocol turns the Noise down until honesty is the only signal that carries.

## 2. What truth looks like in the protocol

- **Verifiable, not trusted.** Claims are backed by signed telemetry, license
  references, capability attestations, and reproducible simulations — checkable
  facts, not assurances.
- **Transparent and permanent.** State and history are auditable by anyone, with no
  quiet "undo." The record is the receipts.
- **Consequences attached to claims.** Telling the truth is rewarded; lying is
  bonded against and slashed. Honesty is the profitable strategy by design.

## 3. The deterrents (who is stopped, and how)

| Bad actor | What they try | What stops them |
|---|---|---|
| **False attestor** | Sign that a milestone happened when it didn't | Bonded stake is **slashed**; the lie is disputable in the challenge window |
| **Consent violator** | Push a land-use path without custodian consent | The Starline **Law field stays closed** — the path cannot open (`starlines-spec.md` §4) |
| **Griefer / spammer** | Flood coordination with junk | Coordination fees + staking make spam costly and unrewarding |
| **Sybil attacker** | Fake many identities to outvote/outsign | Staking and reputation requirements make identities expensive; influence tracks real, bonded contribution |
| **Reward thief** | Claim a milestone they didn't earn | Claim → **staked attestation** → **challenge window** → release; watchers are rewarded for catching fraud |
| **Rewriter of history** | Quietly alter past records | Auditable, append-only state — tampering is visible to everyone |

## 4. Why attacking TerAustralis is a bad idea (plain-language deterrent)

> To take part, you put real value on the line. The moment you try to lie, you lose
> it. Thousands of eyes can catch you, and catching liars is rewarded. The gate you
> are trying to force will not open unless the rules and consent are genuinely met.
> Everything you do is on a permanent record with no undo. And the whole system is
> tuned so that **being honest simply pays more than cheating.**
>
> So the smart move — the *only* winning move — is to tell the truth and build.

## 5. The deepest layer: crypto-economic security

The foundation beneath every row above is a single tuning goal: **make honesty the
dominant strategy.** When the expected payoff of truthful behavior always exceeds
the expected payoff of any attack, rational bad actors stop trying — not because
they are forced to be good, but because dishonesty is the losing move. Truth wins
on the merits.

## 6. Relationship to principles

This draft argues for elevating **Honesty & Truth** to an explicit **Guiding
Principle** in the litepaper's Vision & Core Values — sitting alongside
Permissionless & Open, Indigenous Sovereignty & Consent, and Builder-First — since
it is the value that makes all the others enforceable.

## 7. Open questions

- Exact bond sizes, slashing severity, and challenge-window lengths (shared with
  `tokenomics.md` §8).
- Sybil-resistance approach (stake-based, reputation-based, proof-of-contribution, or hybrid).
- How truth-verification degrades gracefully under DTN latency, where confirmation
  is hours or days away.
- Whistleblower / dispute reward sizing — enough to motivate honest watchers without
  inviting frivolous challenges.
