# Brave New Globe — Quest Line Working List

Guidance-only FTB Quests. **No line is gated behind another** — all attemptable anytime.
Framework: `SPECTRUM.md` (a SIG = baseline → specialized career curve).

**Create Core** (line 1) shipped in **0.8.0** and was reworked in **0.8.7**
(`pack/config/ftbquests/quests/chapters/create_core.snbt`) — **12 purpose-driven
quests** (use/produce + automate, CAB-style) with bootstrap-kit rewards. IDs are
deterministic as of **0.8.1** (SHA-1 of stable keys); **0.8.7** is a content
rewrite (new keys / fewer quests), not a same-key regen. Other lines are still pending.
**PonderJS is in** as of **0.8.5** (required by Delivery Required). **0.8.6** is
a packwiz hash-only fix (no quest changes). Optional: point
players at in-world Ponder scenes. Do not make KubeJS scripting a quest line.

Two families of lines:
- **Industry / Career (SIG)** — Create specializations + economy; each is a baseline→specialized curve.
- **Exploration / World** — dimensions & dungeons. SPECTRUM classifies these as "non-SIG world stage";
  here they're **guidance/exploration** lines (find the portal, find the dungeon), not career curves.

---

## Locked lines

> No parent umbrella. Every industry line is a **flat peer** (like Rails, Aero, Cannons). The old
> "Engineer's/Metalworking" grouping is dropped — Metallurgy, Power, Logistics, and Enchanting each stand alone.

### Lines — all flat peers (no groups)
1. **Create Core** — purpose-driven onboarding (use a machine to produce an output or do a task; checkmarks for fan / saw / deployer / belts / fluids; capstone = a passive Andesite Alloy line). Shared substrate every other line reuses.
2. **Rails & Trains** — Tracks, Signalworks, Train Physics Reloaded, Threaded Trains (+ Trotting Wagons, Doped Horses).
3. **Aeronautics** — Aeronautics, Sable, Aeroworks, Gyro, hose connectors, radars; capstone = reach the sky structures.
4. **Cannons & Warfare (Ordnance)** — Gunpowder, Gunsmithing (CGS), Big Cannons + Going Ballistic + Terminal Ballistics; Warnautics = aerial-gunnery capstone.
5. **Metalworking & Metallurgy** — Create: Metallurgy (foundries, alloys, bulk yields).
6. **Power & Fuel** — Diesel Generators, Power Grid, Power Chip.
7. **Logistics & Storage** — Factory Logistics, Aero Automated Logistics, Delivery Required, Create: Storage.
8. **Industrial Enchanting** — Create: Enchantment Industry (small line: enchant by hand → automate → supply gear).
9. **Commerce** — Numismatics (+ Villager Currency, Tradeworks, Marketplace, Stock Market, Bountiful/Bounties, **Villager Commerce**). Earned currency, physical fulfillment; no minting. Villagers buy from player Merchant Stalls.
10. **Agriculture & Husbandry** — Farmer's Delight, Brewin' & Chewin', Burnt Basic, Realistic Farmland, Food Spoilage, Ratatouille, Animal Weights. (Serene Seasons / Project Atmosphere are environmental rules, not part of the line.)
11. **Naval / High Seas** — Create: Better High Seas shipbuilding + WDA sea structures + Aquamirae as sea hazards/loot. The sea counterpart to Aeronautics.
12. **Astronautics** — Creating Space rocketry & space logistics. Late-game capstone after Aeronautics + Power & Fuel; engineering-heavy, no "space magic."

_(13–15 are exploration/guidance lines — find the dungeon / find the portal — not career curves.)_
13. **When Dungeons Arise** — guide toward finding dungeons (locate/exploration hints; ties to our custom sky/sea/large_dungeon sets).
14. **The Twilight Forest** — diamond-ring portal → boss progression lockstep.
15. **The Aether** — glowstone+water portal → dungeons/gear.

---

## Candidate additions (still deciding)
- **Settlement & Civic (MCA Reborn)** — optional social line; feeds Commerce.
- **Medicine (More Diseases & Treatments)** — optional niche survival line.

## Fold / skip (v1)
- **Textiles (Create: Cotton)** — too thin alone; fold into Agriculture or Civil Works, or skip.
- **Civil Works (Struts, Supplementaries, Copycats+)** — supporting/soft; not its own line for v1.
- **Industrial Enchanting** — already a locked standalone line (8); the old "under Engineer's" grouping is dropped.

---

## Reward philosophy (from SPECTRUM)
Tools / site-kits / reputation + Numismatics coins. Create Core uses **bootstrap-kit**
item rewards (casings, sheets, brass, precision mechanisms) that seed the next step.
Never delete the baseline; no player-minted coins;
physical fulfillment for logistics/commerce (no remote/teleport shortcuts).
