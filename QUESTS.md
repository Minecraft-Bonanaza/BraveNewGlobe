# Brave New Globe — Quest Book (shipped)

Guidance-only FTB Quests. **No line is gated behind another** — all attemptable anytime.
Framework: `SPECTRUM.md` (a SIG = baseline → specialized career curve).

**As of 0.9.10** the book is **17 chapters, 242 quests** (0.9.0 shipped 15 / 230; 0.9.10 added
Cataclysm + Bosses' Rise). Every gate is objective — **no self-attest checkmarks**. Industry
lines use a three-phase arc (**Awareness → Functional → late-stage Achievement**); exploration
lines are locate-and-progress. 0.9.1–0.9.9 did not touch the 0.9.0 chapters (LootJS / Simply
Swords / Nether content / Simply More bump / Cataclysm datapack — see [LOOT.md](LOOT.md) and
[Notes.md](Notes.md)).

Gates are item count / mod advancement / dimension / stat on the original 15 chapters.
**Cataclysm and Bosses' Rise use FTB kill tasks** (unlike Twilight / Aether / WDA, which stay
advancement-gated). Do not convert those three to kill tasks.

Currency throughout is **Create: Numismatics** (Spur / Cog / Crown / Sun). Do not quest
player-minted coins or remote/mailbox checkout.

Committed `pack/config/ftbquests/**/*.snbt` is the **source of truth**. Generated
deterministically from `bigGlobeAero/quest_lines/*.py` via `build_ftbquests.py` (IDs are
SHA-1 of stable keys as of 0.8.1). Re-runs with the same keys are progress-safe; changing
keys is a content rewrite (Create Core was rewritten in **0.8.7** and again in **0.9.0**).
Do not overwrite via in-game edit mode.

Two families of lines:
- **Industry / Career (SIG)** — Create specializations + economy; each is a baseline→specialized curve.
- **Exploration / World** — dimensions & dungeons. SPECTRUM classifies these as "non-SIG world stage";
  here they're **guidance/exploration** lines (find the portal, find the dungeon), not career curves.

---

## Shipped lines (flat peers, no groups)

> No parent umbrella. Every industry line is a **flat peer**. The old "Engineer's/Metalworking"
> grouping is dropped — Metallurgy, Power, Logistics, and Enchanting each stand alone.

| # | Chapter | Quests | File | Notes |
|---|---------|-------:|------|-------|
| 1 | **Create Core** | 15 | `create_core.snbt` | Kinetics, stress, first automation. Shared substrate. Rewritten in 0.9.0 (was 12 checkmark quests in 0.8.7). |
| 2 | **Rails & Trains** | 15 | `rails.snbt` | Tracks, Signalworks, Train Physics Reloaded, Threaded Trains (+ Trotting Wagons, Doped Horses). |
| 3 | **Aeronautics** | 15 | `aeronautics.snbt` | Aeronautics, Sable, Aeroworks, Gyro, hose connectors, radars; capstone = reach the sky structures. |
| 4 | **Cannons & Warfare** | 11 | `cannons.snbt` | Gunpowder → CGS firearm → cast-iron → Steel cannon → autocannon → Nethersteel. |
| 5 | **Metalworking & Metallurgy** | 17 | `metallurgy.snbt` | Create: Metallurgy foundries, alloys, bulk yields → Steel / Tungsten / Obdurium. |
| 6 | **Power & Fuel** | 23 | `power.snbt` | Three parallel tracks: Diesel, Steam (base Create), Power Grid electricity. |
| 7 | **Logistics & Storage** | 16 | `logistics.snbt` | Create package-logistics spine + Factory Logistics / FXNT / Aero Automated Logistics / Delivery Required. |
| 8 | **Industrial Enchanting** | 7 | `enchanting.snbt` | Blaze Enchanter → liquid-XP loop → mass enchanted books. Standalone (not under an Engineer's umbrella). |
| 9 | **Commerce** | 14 | `commerce.snbt` | Numismatics (+ Villager Currency, Tradeworks, Marketplace, Stock Market, Bountiful / Bounties, Villager Commerce). Earned currency; physical fulfillment. |
| 10 | **Agriculture & Husbandry** | 16 | `agriculture.snbt` | Farmer's Delight, Brewin' & Chewin', Burnt Basic, Realistic Farmland, Food Spoilage, Ratatouille, Animal Weights. Seasons / atmosphere are environmental rules, not part of the line. |
| 11 | **Naval & High Seas** | 17 | `naval.snbt` | Create: Better High Seas shipbuilding + Aquamirae + Sea Myths + fishing. Sea counterpart to Aeronautics. |
| 12 | **Astronautics** | 16 | `astronautics.snbt` | Creating Space rocketry → `reach_earth_orbit` → foundry / propellant depot. Engineering-heavy, no space magic. |
| 13 | **When Dungeons Arise** | 22 | `wda.snbt` | Structure-discovery ladder (common → sea → sky Y 700–750 → large dungeons). Some stock WDA advancements (Coliseum, monastery, lighthouse, …) point at structures this pack does **not** generate — see Notes. |
| 14 | **The Twilight Forest** | 14 | `twilight.snbt` | Diamond-ring portal → Naga → Lich → … → Final Castle boss ladder (advancement-gated). |
| 15 | **The Aether** | 12 | `aether.snbt` | Glowstone+water portal → Bronze / Silver / Gold dungeon bosses → Phoenix armor. |
| 16 | **L_Ender's Cataclysm** | 7 | `cataclysm.snbt` | Kill-gated boss ladder (0.9.10): Wadjet → Maledictus / Leviathan → Netherite Monstrosity → Ignis / Harbinger → Ender Guardian. Points at cannons / airships over 1v1 melee. Structures via `bigglobe_cataclysm.zip` (Cursed Pyramid on badlands+savanna+plains as of 0.9.9). |
| 17 | **Bosses' Rise** | 5 | `bossesrise.snbt` | Kill-gated boss ladder (0.9.10): Sandworm → Yeti / Kraken → Underworld Knight → Infernal Dragon. Structures via `bigglobe_bossesrise.zip`. |

Three hand-authored loot-crate reward tables live under `pack/config/ftbquests/quests/reward_tables/`.

---

## Candidate additions (not in the 0.9.10 book)
- **Nether (Incendium / Born in Chaos / Better Fortresses)** — exploration line; still not in
  the book. Overworld BiC gameplay structures generate as of 0.9.5; Incendium is Nether-only.
  Overworld BiC mob spawns are still pending review. Cataclysm / Bosses'Rise **are** in the book
  (they are arena-boss lines, not a Nether biome tour).
- **Settlement & Civic (MCA Reborn)** — optional social line; feeds Commerce.
- **Medicine (More Diseases & Treatments)** — optional niche survival line.

## Fold / skip (v1)
- **Textiles (Create: Cotton)** — too thin alone; fold into Agriculture or Civil Works, or skip.
- **Civil Works (Struts, Supplementaries, Copycats+)** — supporting/soft; not its own line for v1.

---

## Reward philosophy (from SPECTRUM)
Tools / site-kits / reputation + Numismatics coins. Never delete the baseline; no player-minted coins;
physical fulfillment for logistics/commerce (no remote/teleport shortcuts).
