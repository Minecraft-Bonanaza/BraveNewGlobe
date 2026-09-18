# Brave New Globe — Quest Line Working List

Guidance-only FTB Quests. **No line is gated behind another** — all attemptable anytime.
Framework: `SPECTRUM.md` (a SIG = baseline → specialized career curve).

**Shipped book (as of 1.0.0):** **17 chapters / 246 quests**.
**1.0.0** is the first production release (content stack including in-house
**Create: Market Maker** is in). Survival-layer polish may continue in `1.x`; not new
quest chapters.
Committed `pack/config/ftbquests/**/*.snbt` is the source of truth
(`bigGlobeAero/build_ftbquests.py` + `quest_lines/*.py`; IDs are SHA-1 of stable keys).
Changing keys is a content rewrite, not a progress-safe regen. **No self-attest checkmarks.**
Twilight / Aether / WDA stay advancement-gated. **Cataclysm** and **Bosses' Rise** are the only
chapters that use FTB kill tasks.

Two families of lines:
- **Industry / Career (SIG)** — Create specializations + economy; each is a baseline→specialized curve.
- **Exploration / World** — dimensions & dungeons. SPECTRUM classifies these as "non-SIG world stage";
  here they're **guidance/exploration** lines (find the portal, find the dungeon), not career curves.

---

## Locked lines

> No parent umbrella. Every industry line is a **flat peer** (like Rails, Aero, Cannons). The old
> "Engineer's/Metalworking" grouping is dropped — Metallurgy, Power, Logistics, and Enchanting each stand alone.

### Lines — all flat peers (no groups)
1. **Create Core** — onboarding: kinetics, stress, first automation. Shared substrate every other line reuses.
2. **Rails & Trains** — Tracks, Signalworks, Train Physics Reloaded, Threaded Trains (+ Trotting Wagons, Doped Horses).
3. **Aeronautics** — Aeronautics 1.3.2, Sable, Aeroworks 1.5.0, Gyro, hose connectors, radars, Gadgets &
   Gizmos thrusters/flight-control (real quest gated behind `gyro`), Radiologistics comms towers
   (real quest gated behind `nav_radar`), Climbable Ropes, WarHorn, AeroPortals (informational); CC: Tweaked scripts the
   ship's brain; capstone = reach the sky structures.
4. **Cannons & Warfare (Ordnance)** — Gunpowder, Gunsmithing (CGS), Big Cannons + Going Ballistic + Terminal Ballistics; **CC:CBC** for programmable fire-control; Warnautics = aerial-gunnery capstone.
5. **Metalworking & Metallurgy** — Create: Metallurgy (foundries, alloys, bulk yields).
6. **Power & Fuel** — Diesel Generators, Power Grid, Power Chip.
7. **Logistics & Storage** — Factory Logistics, Aero Automated Logistics, Delivery Required, Create: Storage.
8. **Industrial Enchanting** — Create: Enchantment Industry (small line: enchant by hand → automate → supply gear).
9. **Commerce** — Numismatics (+ Villager Currency, Tradeworks, Marketplace, Stock Market,
   Bountiful/Bounties) plus in-house **Create: Market Maker** (informational nudge, gated behind
   `stall`). Earned currency, physical fulfillment; no minting.
10. **Agriculture & Husbandry** — Farmer's Delight, Brewin' & Chewin', Burnt Basic, Realistic Farmland, Food Spoilage, Ratatouille, Animal Weights. (Serene Seasons / Project Atmosphere are environmental rules, not part of the line.)
11. **Naval / High Seas** — Create: Better High Seas shipbuilding + WDA sea structures + Aquamirae as sea hazards/loot. The sea counterpart to Aeronautics.
12. **Astronautics** — Creating Space rocketry & space logistics. Late-game capstone after Aeronautics + Power & Fuel; engineering-heavy, no "space magic."

_(13–17 are exploration/guidance lines — find the dungeon / find the portal / kill the named boss — not career curves.)_
13. **When Dungeons Arise** — guide toward finding dungeons (locate/exploration hints; ties to our custom sky/sea/large_dungeon/nest sets). Combat-dungeon chests also get the 0.9.17 LootJS pools (`LOOT.md`).
14. **The Twilight Forest** — diamond-ring portal → boss progression lockstep.
15. **The Aether** — glowstone+water portal → dungeons/gear.
16. **L_Ender's Cataclysm** (shipped, 7 kill quests) — Wadjet → Maledictus / Leviathan → Netherite Monstrosity → Ignis / Harbinger → Ender Guardian. Points at Create cannons / airships over 1v1 melee.
17. **Bosses' Rise** (shipped, 5 kill quests) — Sandworm → Yeti / Kraken → Underworld Knight → Infernal Dragon capstone.

---

## Candidate additions (still deciding)
- **Settlement & Civic (MCA Reborn)** — optional social line; feeds Commerce.
- **Medicine (More Diseases & Treatments)** — optional niche survival line.
- **Programmable control** — not a standalone v1 line; fold CC: Tweaked / CC:CBC / Radiologistics into Aeronautics and Ordnance as the ship's/gun's brain.

## Fold / skip (v1)
- **Textiles (Create: Cotton)** — too thin alone; fold into Agriculture or Civil Works, or skip.
- **Civil Works (Struts, Supplementaries, Copycats+)** — supporting/soft; not its own line for v1.
- **Industrial Enchanting** — keep as a short chapter under Engineer's, not a standalone line.

---

## Reward philosophy (from SPECTRUM)
Tools / site-kits / reputation + Numismatics coins. Never delete the baseline; no player-minted coins;
physical fulfillment for logistics/commerce (no remote/teleport shortcuts).
