# Brave New Globe — Quest Line Working List

Guidance-only FTB Quests. **No line is gated behind another** — all attemptable anytime.
Framework: `SPECTRUM.md` (a SIG = baseline → specialized career curve).

**Shipped book (as of 0.9.10, still current in 0.9.15):** **17 chapters / 242 quests**.
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
3. **Aeronautics** — Aeronautics, Sable, Aeroworks, Gyro, hose connectors, radars; capstone = reach the sky structures.
4. **Cannons & Warfare (Ordnance)** — Gunpowder, Gunsmithing (CGS), Big Cannons + Going Ballistic + Terminal Ballistics; Warnautics = aerial-gunnery capstone.
5. **Metalworking & Metallurgy** — Create: Metallurgy (foundries, alloys, bulk yields).
6. **Power & Fuel** — Diesel Generators, Power Grid, Power Chip.
7. **Logistics & Storage** — Factory Logistics, Aero Automated Logistics, Delivery Required, Create: Storage.
8. **Industrial Enchanting** — Create: Enchantment Industry (small line: enchant by hand → automate → supply gear).
9. **Commerce** — Numismatics (+ Villager Currency, Tradeworks, Marketplace, Stock Market, Bountiful/Bounties). Earned currency, physical fulfillment; no minting.
10. **Agriculture & Husbandry** — Farmer's Delight, Brewin' & Chewin', Burnt Basic, Realistic Farmland, Food Spoilage, Ratatouille, Animal Weights. (Serene Seasons / Project Atmosphere are environmental rules, not part of the line.)
11. **Naval / High Seas** — Create: Better High Seas shipbuilding + WDA sea structures + Aquamirae as sea hazards/loot. The sea counterpart to Aeronautics.
12. **Astronautics** — Creating Space rocketry & space logistics. Late-game capstone after Aeronautics + Power & Fuel; engineering-heavy, no "space magic."

_(13–17 are exploration/guidance lines — find the dungeon / find the portal / kill the named boss — not career curves.)_
13. **When Dungeons Arise** — guide toward finding dungeons (locate/exploration hints; ties to our custom sky/sea/large_dungeon/nest sets). Combat-dungeon chests also get the 0.9.15 LootJS pools (`LOOT.md`).
14. **The Twilight Forest** — diamond-ring portal → boss progression lockstep.
15. **The Aether** — glowstone+water portal → dungeons/gear.
16. **L_Ender's Cataclysm** (shipped, 7 kill quests) — Wadjet → Maledictus / Leviathan → Netherite Monstrosity → Ignis / Harbinger → Ender Guardian. Points at Create cannons / airships over 1v1 melee.
17. **Bosses' Rise** (shipped, 5 kill quests) — Sandworm → Yeti / Kraken → Underworld Knight → Infernal Dragon capstone.

---

## Candidate additions (still deciding)
- **Settlement & Civic (MCA Reborn)** — optional social line; feeds Commerce.
- **Medicine (More Diseases & Treatments)** — optional niche survival line.

## Fold / skip (v1)
- **Textiles (Create: Cotton)** — too thin alone; fold into Agriculture or Civil Works, or skip.
- **Civil Works (Struts, Supplementaries, Copycats+)** — supporting/soft; not its own line for v1.
- **Industrial Enchanting** — keep as a short chapter under Engineer's, not a standalone line.

---

## Reward philosophy (from SPECTRUM)
Tools / site-kits / reputation + Numismatics coins. Never delete the baseline; no player-minted coins;
physical fulfillment for logistics/commerce (no remote/teleport shortcuts).
